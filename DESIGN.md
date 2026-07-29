---
name: Binary Creative
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#bfc8cb'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#899295'
  outline-variant: '#3f484a'
  surface-tint: '#8dd1e0'
  primary: '#8dd1e0'
  on-primary: '#00363e'
  primary-container: '#226d7a'
  on-primary-container: '#a8ecfb'
  inverse-primary: '#1a6774'
  secondary: '#9fcfd7'
  on-secondary: '#00363d'
  secondary-container: '#1f5057'
  on-secondary-container: '#91c0c9'
  tertiary: '#c6c6c7'
  on-tertiary: '#2f3131'
  tertiary-container: '#626464'
  on-tertiary-container: '#e1e1e1'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#a9edfc'
  primary-fixed-dim: '#8dd1e0'
  on-primary-fixed: '#001f25'
  on-primary-fixed-variant: '#004e5a'
  secondary-fixed: '#bbebf4'
  secondary-fixed-dim: '#9fcfd7'
  on-secondary-fixed: '#001f24'
  on-secondary-fixed-variant: '#1c4d55'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 84px
    fontWeight: '700'
    lineHeight: 90px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
  body-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  margin-page: 4rem
  margin-mobile: 1.5rem
  gutter: 2rem
  stack-xl: 8rem
  stack-md: 4rem
---

## Brand & Style

This design system is built upon a "Dual Identity" narrative, balancing the systematic precision of a Coder with the expressive elegance of a Designer. The aesthetic is rooted in **Editorial Minimalism** with a technical edge, utilizing high-contrast visuals to create a clear separation of concerns.

The personality is sophisticated, intellectual, and meticulous. It leverages heavy whitespace and a strictly governed color palette to evoke a premium, agency-level feel. The UI transitions between two states: a "Logic" state characterized by monospaced precision and a "Creative" state defined by graceful, high-contrast serifs.

Key design principles include:
- **Symmetry & Asymmetry:** Using a balanced grid that is occasionally broken by oversized typography or overlapping elements.
- **High-Contrast Clarity:** A dark-mode default that prioritizes legibility and focus.
- **Dual Visual Language:** Technical elements use borders and monospaced type; creative elements use depth, blurs, and serif type.

## Colors

The palette is anchored in a deep charcoal nearly-black (`#0A0A0A`) to provide a void-like canvas that allows content to pop. 

- **Primary (`#226D7A`):** Used as a sophisticated bridge between the two identities, appearing in subtle gradients or interactive states.
- **Secondary (`#B0E0E9`):** The "Coder" accent. High-vibrancy and technical, used for syntax highlighting, code blocks, and terminal-style labels.
- **Neutral/White (`#FFFFFF`):** The "Designer" accent. Used for large editorial headings and primary actions to signify clarity and purity.

Backgrounds should remain dark, using `surface-raised` for cards and `border-low` for structural separation.

## Typography

Typography is the primary vehicle for the dual-identity concept. 

**The Designer (Playfair Display):** Used for large-scale storytelling, headings, and quotes. It should feel literary and intentional. Use `headline-lg` sparingly for maximum impact.

**The Coder (Inter & JetBrains Mono):** `Inter` provides a neutral, highly readable foundation for body copy. `JetBrains Mono` is utilized for technical labels, metadata, and "logic" markers. 

Text should strictly follow a white-on-black hierarchy, with secondary text using a 60% opacity rather than a mid-gray hex to maintain the color integrity of the dark background.

## Layout & Spacing

The layout utilizes a **12-column fixed grid** on desktop (max-width 1440px) and a **fluid 4-column grid** on mobile.

- **Asymmetry:** Content should frequently be offset. For example, a heading might span columns 1-8, while the supporting body copy sits in columns 6-12.
- **Visual Breathing Room:** Use `stack-xl` (128px) between major sections to emphasize the minimalist editorial feel. 
- **The "Grid" Motif:** A subtle, low-opacity (5%) pixel grid pattern or "blueprint" line should occasionally appear in the background of "Coder" sections to provide texture without clutter.

## Elevation & Depth

This system avoids traditional shadows in favor of **Tonal Layers** and **Low-Contrast Outlines**.

- **Surfaces:** Depth is created by stepping up from `#0A0A0A` to `#161616`. 
- **Borders:** Use 1px solid borders (`#262626`) to define technical containers. 
- **Glassmorphism:** For overlays or navigation bars, use a heavy backdrop blur (20px) with a 10% opacity white fill. This creates a "frosted" look that feels premium and modern.
- **Interactive Depth:** On hover, cards should not lift with shadows; instead, they should transition their border color to the primary accent (`#226D7A`) or increase the brightness of their background fill slightly.

## Shapes

To maintain a professional editorial feel while introducing a touch of modern accessibility, the system uses **Rounded (8px)** corners for structural elements. 

- **Exceptions:** Very small UI indicators (like status dots) may be circular. 
- **Containers:** All cards, buttons, and input fields utilize a consistent corner radius to soften the technical edge, moving away from purely sharp angles to a more refined, contemporary look.

## Components

### Buttons
Buttons are clean rectangles with defined rounded corners. The "Primary" button uses a 1px white border with no fill, transitioning to a white fill with black text on hover. "Code" buttons use the `#B0E0E9` accent for borders and text.

### Cards
Cards are defined by thin `#262626` borders and standard `rounded-lg` corners. For the "Designer" side, use large imagery with overlapping serif text. For the "Coder" side, cards should look like terminal windows or data modules with `label-code` headers.

### Input Fields
Inputs are simple bottom-borders only. When focused, the border color slides in from the left using the primary accent color. Labels always use `label-caps` for a structured, metadata-heavy look.

### Navigation
The navigation is a minimalist top bar. Use a monospaced font for menu items to give it a "navigating a directory" feel.

### Transitions
Motion should be "Snappy but Smooth." Use `cubic-bezier(0.16, 1, 0.3, 1)` for all transitions. Content should fade in with a slight vertical slide (20px) to simulate page loading in a high-end portfolio.