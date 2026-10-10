# Right Homes website

Static site for righthomesestates.com, hosted on Netlify. No dependencies.

## Change something

| What | Where |
|---|---|
| Phone numbers, address, email, opening hours, rating, reviews, fees | `src/config.mjs` |
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

The pictures are computer-generated illustrations, not real properties, and
the footer of every page says they are illustrative. The originals are in
`photos-src/`. To swap one, replace the file there (keep its name), then:

```
python3 tools/photos.py     # needs Pillow: pip install pillow
node build.mjs
```

Alt text for each picture is in `src/config.mjs`.

## Logo

`site/assets/logo.png` and `logo@2x.png` are the Right Homes logo as supplied.
The browser-tab icons and the social share image (`og.png`) are cut from it.
