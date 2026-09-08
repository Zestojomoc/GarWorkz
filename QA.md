# GARWORKZ prototype QA

Verified on September 7, 2026, using headless Microsoft Edge on Windows.

- Production build: passed (`npm run build`).
- Browser suite: 20 tests passed (`npm test`).
- Formatting: passed (`npm run format:check`).
- Viewport widths: 320, 360, 375, 390, 412, 430, 480, 768, 820, 1024, 1280, 1440, 1920. No document overflow or tested text/control overflow.
- Additional sizes: 568×320, 844×390, 1024×500, 1920×600, 280×700.
- Interactions: menu focus trap, Escape, scroll lock/unlock, section navigation, project filters and empty states, modal photo navigation and focus return, keyboard/pointer/touch comparison, and touch gallery swipe.
- Form: service preselection, required-field focus and errors, image type validation, local quote download, and explicit unsent status.
- Accessibility: axe WCAG A/AA checks passed on the mobile page, menu, photo dialog, and desktop page after animations settled. Reduced-motion behavior and image loading also passed. Automated results are not a claim of complete WCAG conformance.
- Visual inspection: desktop 1440px, tablet 820px, phone 390px, small phone 320px; hero, work, services, process, and quote screenshots in `artifacts/`.
- Bundle: initial JavaScript 70.88 KB gzip, CSS 8.05 KB gzip; project modal 0.96 KB gzip, loaded on demand. Preview photos use local responsive WebP files and local fonts.

## Remaining content and integration

Logo update verified September 9, 2026: the original GARWORKZ artwork is used in navigation, mobile menu, hero, footer, favicon, and touch icon. Production build and formatting passed. All 13 responsive widths, interactions, and accessibility passed; the image-loading test passed on rerun after being updated to skip the intentionally hidden mobile hero logo. Desktop, tablet, and phone screenshots were inspected. Original PNGs are retained in `assets/brand/`.

Real GARWORKZ project images, before/after pairs, detail photography, and confirmed business information are pending. The original GARWORKZ logos are integrated. Project concepts, comparison treatment, and contact information are placeholders. The form currently saves a local summary; no live backend or deployment has been configured. Physical iPhone/Android and Safari testing has not been performed.
