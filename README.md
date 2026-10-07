# Right Homes website

Static site for righthomesestates.com, hosted on Netlify. No dependencies.

## Change something

| What | Where |
|---|---|
| Phone, address, email, opening hours, rating, reviews, fees | `src/config.mjs` |
| Page copy, FAQs, the guide | `src/pages.mjs` |
| Header, footer, form, schema, page shell | `src/layout.mjs` |
| Design | `src/styles.css` |

Then:

```
node build.mjs
git add -A && git commit -m "Update site" && git push
```

`site/` is the built output and is what Netlify serves (`netlify.toml` sets `publish = "site"`).
Never edit files in `site/` by hand: the next build overwrites them.

## Things that switch on when you fill them in (`src/config.mjs`)

- `email`: appears in the footer, contact panels, privacy notice and schema.
- `hours`: appears in the footer, contact panels and schema.
- `reviews`: adds a "What clients say" section to the homepage.
- `whatsapp: true`: adds a WhatsApp button using the office mobile number.
- `compliance`: once redress scheme, client money protection and both fee
  lists are filled, a `/fees/` page is built and linked from every footer.

## Enquiry forms

Every form is the same Netlify form, named `enquiry`. In Netlify:
Forms > enable form detection, then Forms > Form notifications > add an email
notification. Until detection is on, the form tells the visitor to call instead.

## Photos

Free-licence photographs from Unsplash, loaded from Unsplash's image CDN at
the right size for each screen. They are illustrative and the footer says so.
To swap one, change its `id` in `src/config.mjs` (the id is the part after
`photo-` in an Unsplash image address).
