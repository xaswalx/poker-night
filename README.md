# Poker Night

A free Texas Hold'em night for 2–9 friends. Phase 1 is a local UI demo only: no live rooms, dealing, betting, or chip transfers.

## Windows development

```powershell
cd C:\Users\XRIG\Projects\poker-night
npm install
npm run dev
```

Open the localhost URL printed by Vite. Use Node.js 24 LTS or newer supported LTS.

```powershell
npm test
npm run typecheck
npm run build
npm run preview
```

React + TypeScript + Vite, with Tailwind CSS. `src/components` holds reusable UI; `src/demo.ts` holds mock data. A future Node.js + Socket.IO service belongs in `server/`, with shared transport types in `shared/` once real contracts exist. Neither service nor networking is implemented.

Avatar uploads are validated raster images, previewed in memory, never sent or persisted. Demo chip values are static. Betting buttons are disabled intentionally.

Work on feature branches, run checks, use conventional commits, push branches and open PRs against `main`. Never merge without owner approval. Never commit secrets, environment files, dependencies or build output.

## Phase 1 verification (2026-11-13)

The existing home, nickname and avatar selection flows and custom blue/pink neon table remain frontend-only. Five fixed community-card slots now include FLOP, TURN and RIVER labels. No live poker gameplay is implemented.

All three mock-data validation tests pass. Dependency installation is blocked by denied access to registry.npmjs.org; TypeScript and production build cannot complete without the dependencies. Desktop/mobile browser verification remains unverified because the Vite app cannot start without those dependencies.

The local feature branch is `feat/poker-night-ui`, based on the existing local `main`. Fetching GitHub fails to connect, and GitHub CLI reports invalid authentication. Remote `main` existence and history are therefore unknown. No merge, remote base creation, push or pull request is claimed; reconcile the actual remote history before publishing.
