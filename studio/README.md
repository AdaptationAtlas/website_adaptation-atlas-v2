# Sanity Studio

The content editor for the Atlas site. Hosted by Sanity, so it needs no server of ours.

It is available at https://africa-adaptation-atlas.sanity.studio or at `/admin` on the site. Both work and edit the same dataset.

```sh
cd studio
npm install
npm run dev      # local Studio at http://localhost:3333
npm run deploy   # publish to https://africa-adaptation-atlas.sanity.studio
```

`npm run deploy` needs `npx sanity login` once. Re-run it after any change to `schemas/`.
