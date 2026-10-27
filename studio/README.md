# Sanity Studio

The content editor for the Atlas site. Hosted by Sanity, so it needs no server of ours.

```sh
cd studio
npm install
npm run dev      # local Studio at http://localhost:3333
npm run deploy   # publish to https://<name>.sanity.studio (asks for the name the first time)
```

`npm run deploy` needs `npx sanity login` once. Re-run it after any change to `schemas/`.
