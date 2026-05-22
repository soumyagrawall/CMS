---
name: Lumora Editorial System
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1b1b1b'
  on-surface-variant: '#434750'
  inverse-surface: '#303030'
  inverse-on-surface: '#f1f1f1'
  outline: '#737781'
  outline-variant: '#c3c6d1'
  surface-tint: '#385f97'
  primary: '#30578f'
  on-primary: '#ffffff'
  primary-container: '#4a70a9'
  on-primary-container: '#f0f3ff'
  inverse-primary: '#a8c8ff'
  secondary: '#446085'
  on-secondary: '#ffffff'
  secondary-container: '#b7d3fe'
  on-secondary-container: '#3f5b80'
  tertiary: '#575750'
  on-tertiary: '#ffffff'
  tertiary-container: '#706f68'
  on-tertiary-container: '#f6f3ea'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#a8c8ff'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#1c477d'
  secondary-fixed: '#d3e3ff'
  secondary-fixed-dim: '#acc8f3'
  on-secondary-fixed: '#001c39'
  on-secondary-fixed-variant: '#2b486c'
  tertiary-fixed: '#e5e2d9'
  tertiary-fixed-dim: '#c9c6be'
  on-tertiary-fixed: '#1c1c17'
  on-tertiary-fixed-variant: '#484741'
  background: '#f9f9f9'
  on-background: '#1b1b1b'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.4'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter-xs: 8px
  gutter-md: 16px
  gutter-lg: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  max-width: 1440px
---

## Brand & Style
This design system is anchored in a soft, warm, editorial aesthetic that prioritizes content as art. It bridges the gap between the tactile feel of a high-end physical magazine and the fluidity of a modern social platform. The brand personality is poised and intentional, avoiding the frantic energy of typical social media in favor of a "mood board" experience. 

The visual style leans into **Minimalism** with a **Tactile** edge, utilizing a cream-based palette to reduce eye strain and provide a premium "paper" feel. It targets a creative audience that values curation, aesthetics, and a quiet, focused interface.

## Colors
The palette is designed to be receding and warm, allowing user-generated imagery to remain the focal point. 

- **Primary Background (#EFECE3):** A soft cream that acts as the canvas, providing a more organic feel than pure white.
- **Surface/Cards (#FFFFFF):** Pure white is reserved for interactive cards and content containers to create a subtle lift from the background.
- **Accent/Icons (#8FABD4):** A muted, dusty blue used for non-critical secondary actions and iconography.
- **Primary Actions (#4A70A9):** A deep, trustworthy blue used exclusively for high-priority calls to action and active navigation states.
- **Borders (#DDD9CE):** Low-contrast lines that define structure without creating visual noise.

## Typography
The typographic scale relies on a high-contrast pairing:
- **Playfair Display** provides an editorial, literary authority for headings and brand moments. It should be used with generous leading to maintain a breathable feel.
- **DM Sans** offers a clean, low-contrast counterpoint for functional text. Its geometric clarity ensures legibility at small sizes for labels and navigation.

Keep text blocks centered or left-aligned with ample margins. Use `label-sm` (uppercase) for category tags or meta-data to create a distinct visual hierarchy against body copy.

## Layout & Spacing
The design system utilizes a **fixed grid** model for desktop and a **fluid grid** for mobile to maintain the curated mood board appearance.

- **Desktop:** 12-column grid, 1440px max width, 24px gutters. Content is centered with wide 64px margins to emphasize the "gallery" feel.
- **Mobile:** 2-column or 4-column fluid grid, 16px gutters, 20px side margins.
- **Rhythm:** All spacing (padding, margins) should be increments of 4px. Use generous vertical whitespace (80px+) between major sections to denote a change in content context.

## Elevation & Depth
This design system avoids heavy drop shadows in favor of **Tonal Layers** and **Subtle Hover Lifts**. 

Depth is communicated by placing White (#FFFFFF) surfaces on top of the Cream (#EFECE3) background. To indicate interactivity, elements should utilize a "subtle lift" on hover: a very soft, diffused shadow (0px 4px 20px rgba(0,0,0,0.04)) and a slight Y-axis translation (-2px). Borders are used as the primary method of containment, keeping the interface flat but structured.

## Shapes
The shape language is defined by the **Rounded (0.5rem / 8px)** base. 

For the primary content vehicle—the Image Card—a larger **16px (rounded-lg)** radius is applied to evoke a friendlier, softer feel. This distinct difference between UI utility (buttons/inputs) and content (cards) helps the user differentiate between the "tool" and the "art." Interactive elements like pills or tags may use the **rounded-xl (24px)** setting to create a softer, more organic silhouette.

## Components
- **Buttons:** Primary buttons use a solid Deep Blue (#4A70A9) with White text and an 8px radius. Secondary buttons use a transparent background with a 1px Border (#DDD9CE) and Black text.
- **Cards:** White background, 16px border radius, and a 1px border (#DDD9CE). No default shadow; use the "subtle lift" only on hover states.
- **Input Fields:** 8px border radius, White background, and a #DDD9CE border. On focus, the border transitions to Soft Blue (#8FABD4).
- **Chips/Tags:** Use a Pill-shape (rounded-xl) with the Cream (#EFECE3) background and Black text for a subtle, integrated look.
- **Navigation:** Top-bar style with high horizontal padding. Active states are indicated by a 2px Deep Blue underline or the `label-md` weight change.
- **Imagery:** All images should have a subtle 1px inner stroke of `rgba(0,0,0,0.05)` to ensure light images don't bleed into the White cards.