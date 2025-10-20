# Hulu Job Portal – Brand Color

This project uses Tailwind CSS. The site-wide brand color is set to the hex value `#2b78ac`.

## Where it’s defined
- `tailwind.config.js`
  - `theme.extend.colors.primary = '#2b78ac'`
  - The Tailwind `blue` palette is remapped so that `blue-600` equals the brand color. This means existing classes like `bg-blue-600`, `text-blue-600`, `hover:bg-blue-700`, etc., automatically use the brand color scale.

## How to change the brand color
1. Open `tailwind.config.js`.
2. Update `theme.extend.colors.primary` to your new hex.
3. Optionally adjust the `blue` scale shades to match your brand ramp.
4. Restart the dev server (or run a fresh build) so JIT picks up the changes.

## Usage in the codebase
- Primarily uses `blue-*` Tailwind classes for actionable UI (buttons, links, accents) and `bg-gradient-to-* from-blue-* to-blue-*` for gradients.
- Status colors (green/red/yellow, etc.) remain for semantic meaning (success, error, warning).

## Dev commands
- Run locally: `npm run dev`
- Build for production: `npm run build`
- Preview build: `npm run preview`

## Notes
- You can also reference `primary` directly via `bg-primary`, `text-primary`, etc., since it’s added to the theme.
- A CSS variable `--color-primary` is defined in `src/index.css` for any custom CSS you might add.
# hulujobs
