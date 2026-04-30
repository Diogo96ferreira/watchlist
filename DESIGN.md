---
name: Horological Heritage
colors:
  surface: '#faf9f7'
  surface-dim: '#dadad8'
  surface-bright: '#faf9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f1'
  surface-container: '#efeeec'
  surface-container-high: '#e9e8e6'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1a1c1b'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1ef'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#655d51'
  on-secondary: '#ffffff'
  secondary-container: '#e9decf'
  on-secondary-container: '#696255'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1c1b'
  on-tertiary-container: '#848482'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#ece1d2'
  secondary-fixed-dim: '#cfc5b6'
  on-secondary-fixed: '#201b12'
  on-secondary-fixed-variant: '#4c463b'
  tertiary-fixed: '#e3e2e0'
  tertiary-fixed-dim: '#c7c6c4'
  on-tertiary-fixed: '#1b1c1b'
  on-tertiary-fixed-variant: '#464746'
  background: '#faf9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e3e2e0'
typography:
  display-lg:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  title-sm:
    fontFamily: Noto Serif
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.6'
  label-uppercase:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
  stat-value:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1'
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 32px
  margin-mobile: 20px
  margin-desktop: 64px
  section-gap: 120px
---

## Brand & Style

This design system is anchored in the concept of "Quiet Luxury." It moves away from the ephemeral nature of digital trends toward a timeless, editorial aesthetic inspired by high-end Swiss watchmaking catalogs. The brand personality is authoritative yet understated, valuing craftsmanship, precision, and legacy over loud visual noise.

The style is a sophisticated blend of **Minimalism** and **Editorial Design**. It prioritizes vast amounts of whitespace, razor-sharp alignment, and a restrained color palette to ensure the watches—the subjects of the platform—remain the primary focus. This system evokes the feeling of leafing through a heavy-weight, matte-printed Patek Philippe archive, translating tactile luxury into a digital interface.

## Colors

The palette is intentionally monochromatic and desaturated, relying on tonal shifts rather than hue. 
- **Ivory (#F9F8F6):** Used as the primary canvas to provide a warmer, more premium feel than sterile white.
- **Deep Charcoal (#1A1A1A):** Replaces pure black for all typography and primary icons to soften the contrast while maintaining legibility.
- **Taupe and Warm Greys:** Used for borders, secondary text, and subtle backgrounds to create depth without introducing color.
- **Pale Silver:** Reserved for hair-line dividers and metallic accents in UI state changes.

## Typography

The typography strategy employs a classic serif/sans-serif pairing to establish a hierarchy that feels like a published journal.
- **Noto Serif:** Utilized for headlines and hero moments. It conveys a sense of history and permanence. For larger displays, tighter letter spacing is used to increase the "luxury" feel.
- **Inter:** Chosen for its utilitarian precision. It handles all functional UI elements, body copy, and metadata.
- **Formatting:** Use all-caps with generous tracking for labels and category tags to mimic the technical specifications found in watch movements.

## Layout & Spacing

This design system uses a **Fixed Grid** model for desktop and a fluid model for mobile. 
- **The 12-Column Grid:** A strict 12-column structure with wide 32px gutters ensures that content has room to "breathe."
- **Rhythm:** Spacing follows an 8px base unit, but emphasizes large "macro-white-space" (e.g., 120px gaps between major sections) to denote exclusivity and calm.
- **Alignment:** All elements should be top-aligned to the grid. Avoid centering text unless it is a primary hero statement; left-aligned "ragged right" typography is preferred for the editorial look.

## Elevation & Depth

Depth is achieved through **Tonal Layering** and **Subtle Shadows** rather than traditional elevation.
- **Surfaces:** Use subtle shifts between Ivory and a slightly darker Taupe-Grey to define different functional areas.
- **Shadows:** Use only one level of shadow—an extremely diffused, low-opacity (4-6%) shadow with a large blur radius and no spread. This should make elements appear as though they are resting lightly on a paper surface rather than floating in 3D space.
- **Dividers:** Use 0.5px or 1px hairlines in Pale Silver or light taupe for structural separation.

## Shapes

To maintain the "Classic" and "Swiss Editorial" aesthetic, the design system utilizes **Sharp (0px)** corners for almost all containers, buttons, and images. 
- **Exceptions:** Very small UI elements like checkboxes or status dots may have a 1px radius to prevent them from feeling "harsh" at small scales, but the overall architectural language is strictly rectangular.
- **Images:** Photography should always be square or 4:5 aspect ratios with sharp edges, reinforcing the grid-based layout.

## Components

### Buttons & Interaction
- **Primary Action:** Sharp-edged rectangles with a Deep Charcoal background and Ivory text. Transitions should be slow (300ms) and fade into a slightly lighter charcoal on hover.
- **Ghost Buttons:** 1px charcoal border with no fill. These are used for secondary actions to maintain the lightness of the page.

### Editorial Stat Cards
- Minimalist containers with a 1px border.
- The "value" (e.g., "Reference No.") is set in Noto Serif, while the "label" is set in small-cap Inter above it.
- No background fill; let the page ivory show through.

### Status Badges
- Instead of colorful "pills," use small text labels in all-caps Inter with a tiny 4px square "status dot" next to them. 
- Use muted tones (e.g., a desaturated forest green for 'Available', a soft ochre for 'Pending').

### Grid Lists
- Watch collections should be displayed in a clean grid with high padding. 
- Labels and pricing should be positioned directly below the image in a left-aligned stack, avoiding any "card" containers where possible to keep the layout feeling like a magazine page.

### Input Fields
- Underline-only inputs or very light 1px borders. 
- Focus states should be indicated by a weight change in the border (from 1px to 2px) rather than a color change.