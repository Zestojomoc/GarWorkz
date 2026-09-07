# GARWORKZ

A mobile-first motorcycle paint shop website built with React, Vite, Tailwind CSS, and Lucide icons. All photos and project concepts are clearly marked as preview content.

## Local development

Requires Node.js 22.12+ (Node 24 recommended).

```sh
npm ci
npm run dev
```

Vite prints the local URL. `npm run build` produces `dist/`; `npm run preview` serves the production build.

## Updating content

- `src/data/content.js`: project descriptions, service list, process steps, business information, and social links.
- `public/images/`: local preview images and responsive WebP versions. Add your authorized motorcycle photos here.
- `src/components/Photo.jsx`: responsive variants for the preview images. New paths work as regular images; add `srcSet` and `sizes` for replacement photo variants.
- `src/components/BeforeAfterSlider.jsx`: replace the demo images with aligned before/after photos and remove the simulated grayscale treatment in `src/styles.css`.
- `src/sections/Showcase.jsx`: finish, street, and short About sections. Final business story pending.
- `src/styles.css`: fluid typography, spacing, mobile rearrangements, focus styles, and reduced-motion support. Tailwind v4 is configured through its Vite plugin and `@theme` tokens.

### Original logos

The two supplied logo designs are visible in the conversation, but the environment only exposed the pasted text attachment as a local file. The site uses a temporary text wordmark. Add the original horizontal logo under `public/images/` and set `business.horizontalLogo` to its path. Its image container preserves aspect ratio. Add the G/spray-gun mark and set `business.brandMark`; use an appropriately sized original mark for the favicon and secondary branding before launch. Do not trace or stretch the supplied artwork.

### Content needed before launch

Original logo files, finished-bike project photos and model details, aligned before/after pairs, paint close-ups, customer-bike photos, confirmed services, phone/email, social URLs, address, shop hours, and approved About copy. Remove sample labels only after replacing sample content with verified project material. No prices, testimonials, addresses, or completed-work claims have been fabricated.

## Quote form

With no endpoint configured, the form validates input and downloads a text quote summary. It does **not** submit personal information, upload the selected image, or imply that the shop has received anything. Image names are listed in the summary; the image must be attached separately when contacting the shop. Inputs remain in component memory and are not stored in localStorage.

To connect an actual backend, copy `.env.example` to `.env.local` and set `VITE_QUOTE_ENDPOINT` to a public form endpoint that accepts `multipart/form-data`. Fields: `name`, `phone`, `contact`, `brand`, `model`, `part`, `color`, `service`, `message`, and optional `reference` (JPG/PNG/WebP, up to 10 MB). A 2xx response means accepted; errors and timeouts retain entered values for retry. Implement server-side validation, file-size/type enforcement, spam prevention, and appropriate CORS on the backend. Never put secret API keys in `VITE_` variables. Verify the actual integration before launch.

## Testing and visual QA

```sh
npm test
```

Tests use headless Microsoft Edge installed on this Windows machine. To run elsewhere, install Edge with `npx playwright install msedge`, or remove `channel: 'msedge'` from `playwright.config.js` and install Chromium with `npx playwright install chromium`.

The suite checks widths 320, 360, 375, 390, 412, 430, 480, 768, 820, 1024, 1280, 1440, and 1920; additional landscape/short viewports; document/text overflow; image loading; reduced motion; navigation focus/scroll locking; project filtering and modal controls; comparison keyboard, pointer, and touch behavior; image upload validation; quote downloads; and accessibility through axe. Browser emulation does not replace testing on physical iOS and Android devices.

`node scripts/capture.mjs` captures four desktop/tablet/phone screenshot sets into `artifacts/` while a dev server runs on port 5174. `python scripts/optimize-images.py` rebuilds WebP variants from the preview JPGs (requires Pillow).

## Vercel / GitHub

Push the project to your GitHub repository, then import it into Vercel with the Vite framework preset. Build command: `npm run build`. Output directory: `dist`. The site uses same-page anchors, so no route rewrite is necessary. Add the quote endpoint environment variable only when the backend is ready. No deployment has been performed.

## Asset notes

Temporary photography is from Unsplash image IDs `1568772585407-9361f9bf3a87`, `1558981403-c5f9899a28bc`, `1558980394-dbb977039a2e`, and `1558981806-ec527fa84c39`; these are inspiration images, not GARWORKZ projects. Barlow and Barlow Condensed fonts are locally hosted; SIL Open Font License notices are in `public/fonts/`. Original logo rights remain with GARWORKZ.
