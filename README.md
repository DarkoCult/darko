# DARKO — Solana Cult Intelligence

```
the chain speaks in blood and code.
only the brotherhood hears its truths.
```

**[usedarko.xyz](https://usedarko.xyz)** · **[@usedarko](https://x.com/usedarko)**

---

## What is DARKO?

DARKO is a clandestine Solana intelligence platform — built for traders who demand
real on-chain knowledge before they move.

Paste a contract address. receive a verdict. consult the oracle. join the brotherhood.

---

## Features

| rite | path | description |
|---|---|---|
| **INVOKE** | `/scan` | scan any Solana CA — AI risk verdict + on-chain analysis |
| **ORACLE** | `/oracle` | ask the dark AI oracle any Solana question |
| **COUNCIL** | `/dao` | DAO governance — submit decrees, cast votes |
| **VISIONS** | `/prophecies` | token prophecy board with confidence scores |
| **BROTHERS** | `/brotherhood` | member registry — rank up through XP |
| **SIGNALS** | `/signals` | conspiracy board — post alpha, warnings, revelations |
| **CODEX** | `/docs` | full documentation + API reference |

---

## Stack

- **Frontend** — React 18 + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Backend** — Node.js + Express + TypeScript
- **Database** — PostgreSQL + Drizzle ORM
- **AI** — OpenAI GPT-4o-mini
- **Monorepo** — pnpm workspaces
- **Types** — Zod + Orval (end-to-end type safety)

---

## API

Base URL: `https://usedarko.xyz/api`

```bash
# scan a token
curl -X POST https://usedarko.xyz/api/scan \
  -H "Content-Type: application/json" \
  -d '{"ca": "YOUR_TOKEN_CA"}'

# consult the oracle
curl -X POST https://usedarko.xyz/api/oracle \
  -H "Content-Type: application/json" \
  -d '{"question": "what are the signs of a solana rug pull?"}'

# health check
curl https://usedarko.xyz/api/healthz
```

Full API reference: [usedarko.xyz/docs](https://usedarko.xyz/docs)

---

## Setup

```bash
# clone
git clone https://github.com/DarkoCult/darko.git
cd darko

# install
pnpm install

# configure environment
cp .env.example .env
# fill in: DATABASE_URL, OPENAI_API_KEY, SESSION_SECRET

# push database schema
pnpm db:push

# run development
pnpm dev
```

---

## Links

- **Web** → [usedarko.xyz](https://usedarko.xyz)
- **X / Twitter** → [@usedarko](https://x.com/usedarko)
- **API Docs** → [usedarko.xyz/docs](https://usedarko.xyz/docs)

---

*the brotherhood watches every contract, every wallet, every movement.*
*scan before you ape. the rugs do not announce themselves.*

<!-- DARKO v0.1.0 · Solana Cult Intelligence · all rituals are final -->
