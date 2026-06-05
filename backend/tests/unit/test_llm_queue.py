# ============================================
# Deep Research Platform - LLM Queue Unit Tests
# ============================================

from __future__ import annotations

import asyncio
import pytest
from unittest.mock import patch

from app.core import AppSettings, get_settings
from app.services.llm import LLMService


def test_llm_concurrency_settings() -> None:
    """Verify that the new llm_max_concurrency config is loaded with a default of 1."""
    settings = AppSettings()
    assert hasattr(settings, "llm_max_concurrency")
    assert settings.llm_max_concurrency == 1


@pytest.mark.asyncio
async def test_llm_service_queue_serial_execution() -> None:
    """Verify that LLM requests are queued and processed.

    We mock the underlying implementation calls to delay them, then call
    multiple requests concurrently. We track when each request starts and finishes
    to prove they run sequentially (concurrency=1).
    """
    # Force max concurrency to 1 and ensure queue is clean
    await LLMService.shutdown_queue()
    
    settings = get_settings()
    original_concurrency = settings.llm_max_concurrency
    settings.llm_max_concurrency = 1
    
    try:
        llm_service = LLMService()
        
        call_times = []
        
        async def mock_summarize(text: str, context_hint: str) -> str:
            # Record start time
            start_idx = len(call_times)
            call_times.append(("start", start_idx))
            await asyncio.sleep(0.05)
            # Record end time
            call_times.append(("end", start_idx))
            return f"summary-{text}"
        
        # Patch the internal implementation method
        with patch.object(llm_service, "_summarize_text_impl", side_effect=mock_summarize):
            # Fire 3 requests concurrently
            tasks = [
                llm_service.summarize_text(f"doc-{i}", f"hint-{i}")
                for i in range(3)
            ]
            
            results = await asyncio.gather(*tasks)
            
            # Assert results are returned correctly
            assert results == ["summary-doc-0", "summary-doc-1", "summary-doc-2"]
            
            # Since concurrency is 1, they must run strictly sequentially.
            # So start, end, start, end, start, end.
            expected_pattern = [
                ("start", 0), ("end", 0),
                ("start", 1), ("end", 1),
                ("start", 2), ("end", 2)
            ]
            
            # The indices might map in a different order depending on task scheduling,
            # but each start must be immediately followed by its corresponding end,
            # with no other start in between.
            for i in range(0, len(call_times), 2):
                assert call_times[i][0] == "start"
                assert call_times[i+1][0] == "end"
                assert call_times[i][1] == call_times[i+1][1]
    finally:
        # Restore original settings
        settings.llm_max_concurrency = original_concurrency
        # Clean up queue
        await LLMService.shutdown_queue()
