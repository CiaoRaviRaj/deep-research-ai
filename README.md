# Deep Research Platform

> **Enterprise AI Research Agent Platform**
> LangGraph + FastAPI + Next.js + Redis + PostgreSQL + SSE

---

## 🏗️ System Architecture

The Deep Research Platform is built as a **Modular Monolith** adhering to Clean Architecture principles. It features real-time agent telemetry stream integration via Server-Sent Events (SSE).

```mermaid
graph TD
    subgraph Client ["Frontend (Next.js & React)"]
        UI["React Dashboard UI"]
        ZS["Zustand Store (State)"]
        SSE_C["SSE EventSource Client"]
    end

    subgraph API ["Backend (FastAPI)"]
        RTR["API Routers (v1)"]
        SSE_S["SSE Stream Publisher"]
        LGE["LangGraph Engine"]
    end

    subgraph Data ["Data & Messaging Layer"]
        PG[(PostgreSQL 16 DB)]
        RD[(Redis Cache & Pub/Sub)]
    end

    UI -->|"1. Create Session / POST"| RTR
    RTR -->|"2. Initialize Session"| PG
    UI -->|"3. Establish SSE Connection"| SSE_C
    SSE_C -->|"SSE Handshake / GET"| SSE_S
    SSE_S -->|"4. Listen for Events"| RD
    RTR -->|"5. Trigger Agent Run"| LGE
    LGE -->|"6. Write Status/Telemetry/Report"| PG
    LGE -->|"7. Publish Live Step Updates"| RD
    RD -->|"8. Stream Updates"| SSE_C
    SSE_C -->|"9. Dispatch State Updates"| ZS
    ZS -->|"10. Reactive UI Render"| UI
```

---

## 🤖 LangGraph Agent Workflow

The backend leverages a LangGraph state machine directed by a **Supervisor Agent** acting as an orchestrator. The supervisor evaluates the state at each step and routes execution dynamically.

```mermaid
flowchart TD
    START([Start Agent Workflow]) --> SUP[Supervisor Agent]

    SUP -->|"State: No source_ids"| SRCH[Search & Scraper Agent]
    SRCH -->|"1. Search Queries<br/>2. Scrape Webs<br/>3. Save Sources"| SUP

    SUP -->|"State: Unsummarized Sources"| SUM[Summarizer Agent]
    SUM -->|"1. Extract Semantic Chunks<br/>2. Summarize Content"| SUP

    SUP -->|"State: Summaries Done, No Report"| SYN[Synthesizer Agent]
    SYN -->|"1. Compile Summaries<br/>2. Format Report (Markdown)<br/>3. Save to DB"| SUP

    SUP -->|"State: Report Generated"| END([End Workflow])

    style START fill:#4c1d95,stroke:#7c3aed,stroke-width:2px,color:#fff
    style END fill:#064e3b,stroke:#059669,stroke-width:2px,color:#fff
    style SUP fill:#1e1b4b,stroke:#4f46e5,stroke-width:2px,color:#fff
    style SRCH fill:#1f2937,stroke:#6b7280,stroke-width:1px,color:#fff
    style SUM fill:#1f2937,stroke:#6b7280,stroke-width:1px,color:#fff
    style SYN fill:#1f2937,stroke:#6b7280,stroke-width:1px,color:#fff
```

---

## 📁 Repository Structure

```
deep-research/
├── backend/          # FastAPI async backend (Python 3.12+)
├── frontend/         # Next.js App Router (TypeScript)
├── shared/           # Cross-platform contracts & constants
├── infrastructure/   # Service configs (Nginx, Postgres, Redis)
├── scripts/          # Automation & CI/CD scripts
└── docker-compose.yml
```

---

## 🚀 Quick Start

### Prerequisites

- Python 3.12+
- Node.js 20+
- Docker & Docker Compose
- Make (optional, for ergonomics)

### Setup

```bash
# 1. Clone and setup
make setup

# 2. Start infrastructure (Postgres + Redis)
make infra-up

# 3. Run database migrations
make migrate

# 4. Start development servers
make dev
```

Or run everything inside Docker containers:

```bash
docker compose up --build
```

### Access Points

| Service  | URL                                 |
| -------- | ----------------------------------- |
| Frontend | http://localhost:4000               |
| Backend  | http://localhost:8000               |
| API Docs | http://localhost:8000/docs          |
| Health   | http://localhost:8000/api/v1/health |

---

## 🛠️ Development Tools

```bash
make help        # Show all available commands
make dev         # Start all dev servers
make lint        # Run all linters
make format      # Format all code
make test        # Run all tests
make migrate     # Run database migrations
make clean       # Clean generated files
```

---

## 💎 Design & Architecture Principles

- **Modular Monolith** — Feature-based modules with clear boundaries.
- **Clean Architecture** — Segmented layers: API ➔ Service ➔ Repository ➔ Infrastructure.
- **SOLID Principles** — Strict single responsibility and dependency inversion.
- **Event-Driven Telemetry** — Async publisher/subscriber pattern with Redis backplane.
- **Robust Markdown Rendering** — Renders real-time report compiles safely via standard `react-markdown`.
- **Type-safe Contracts** — Pydantic v2 validation schemas on backend, strict TypeScript on frontend.

---

## ⚙️ Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Supports three environments: `development`, `staging`, `production`

---

## 📊 Technical Stack

| Layer    | Technology                           |
| -------- | ------------------------------------ |
| Backend  | FastAPI, SQLAlchemy 2.x, Pydantic v2 |
| Frontend | Next.js 15, TypeScript, TailwindCSS  |
| Database | PostgreSQL 16+                       |
| Cache    | Redis 7+                             |
| Infra    | Docker, Docker Compose, Nginx        |
| Agents   | LangGraph Orchestrator               |

---

## 📄 License

Built by CiaoRaviRaj — © 2026 All rights reserved.
