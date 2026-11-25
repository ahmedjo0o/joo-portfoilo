# ahmedyoussef.net

Portfolio of Ahmed Youssef, motion graphics & VFX artist. Next.js (static export), Tailwind v4, Framer Motion and Lenis.

The site is built like an edit: a timeline pinned to the bottom follows the scroll, each section is a clip on it.

- Copy and content: `data/content.ts` (projects, experience, tools, contact).
- Sections: `components/site/` (Hero image sequence, About, Showreel, Work, Toolkit, Experience, Contact).
- Accent colour: `--color-accent` in `app/globals.css`.
- Launch switch: `LAUNCHED` in `lib/site.ts`.

```bash
npm run dev   # full site at http://localhost:3000
```

## Deploy (Firebase Hosting)

The site is a static export (`output: "export"` in `next.config.ts`), so `npm run build` writes plain files to `out/`, which Firebase Hosting serves.

- Push to `main`: GitHub Actions builds and deploys to the live site.
- Open a pull request: the same workflow deploys a 7-day preview URL and posts it on the PR. Previews show the full site even before launch.

The workflow needs the `FIREBASE_SERVICE_ACCOUNT` repository secret and the project ID in `.firebaserc`.

Manual deploy: `npm run build && npx firebase-tools deploy --only hosting`.
