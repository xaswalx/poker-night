# Development workflow

- Work on a separate feature branch for each phase; never overwrite unrelated work.
- Use meaningful conventional commits and run relevant tests and the production build before committing. Report blocked checks explicitly.
- Push completed feature branches and open a pull request against main. Never merge without the owner's approval or force-push.
- Never commit credentials, .env files, node_modules, caches, or build artifacts.
- Phase 1 uses mock data only: no room networking, dealing, betting, or chip transfers.
