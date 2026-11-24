This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy (Firebase Hosting)

The site is a static export (`output: "export"` in `next.config.ts`), so `npm run build` writes plain files to `out/`, which Firebase Hosting serves.

- Push to `main`: GitHub Actions builds and deploys to the live site.
- Open a pull request: the same workflow deploys a 7-day preview URL and posts it on the PR.

The workflow needs the `FIREBASE_SERVICE_ACCOUNT` repository secret and the project ID in `.firebaserc`.

Manual deploy: `npm run build && npx firebase-tools deploy --only hosting`.
