# Design System Specification: Editorial Gastronomy

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Artisan."** 

Moving beyond the utilitarian "grid of food photos" typical of most marketplaces, this system treats Nigerian cuisine with editorial reverence. We are not just building a directory; we are creating a digital culinary magazine. We break the "template" look through **Intentional Asymmetry**—where high-quality food photography breaks out of container bounds—and **Tonal Depth**, using a sophisticated palette of warm ochres and deep umbers to evoke the hearth and the market. 

By prioritizing breathing room (whitespace) and high-contrast typography scales, we shift the user's perception from "fast food" to "curated experience."

---

## 2. Colors & Surface Philosophy
The palette is rooted in the warmth of Nigerian soil and the vibrance of local spices, structured through a rigorous Material Design 3 logic.

### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders for sectioning or containment. 
Boundaries must be defined solely through:
1.  **Background Color Shifts:** Placing a `surface-container-low` (#f0f1f1) card on a `surface` (#f6f6f6) background.
2.  **Tonal Transitions:** Using soft shadows or subtle shifts in saturation.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine paper. 
*   **Base:** `surface` (#f6f6f6) – The canvas.
*   **Low Elevation:** `surface-container-low` (#f0f1f1) – For large background sections.
*   **High Elevation:** `surface-container-highest` (#dbdddd) – For interactive elements that need to pop.
*   **Nesting:** Place a `surface-container-lowest` (#ffffff) card inside a `surface-container` (#e7e8e8) section to create a soft, natural lift without a border.

### The "Glass & Gradient" Rule
To elevate the "Modern" feel, use **Glassmorphism** for floating headers or navigation bars. Use `surface` at 80% opacity with a `24px` backdrop-blur. 
For Hero CTAs, use a **Signature Gradient**: `primary` (#8c4a00) to `primary-container` (#fd8b00) at a 135-degree angle. This adds "soul" and prevents the orange from feeling flat or "cheap."

---

## 3. Typography: The Editorial Voice
We utilize a pairing of **Plus Jakarta Sans** (Display/Headlines) for a modern, premium feel and **Inter** (Body/Labels) for maximum legibility at scale.

*   **Display-LG (Plus Jakarta Sans, 3.5rem):** Reserved for hero marketing moments. Use tight letter-spacing (-0.02em).
*   **Headline-MD (Plus Jakarta Sans, 1.75rem):** For restaurant names and category titles. This is the "voice" of the brand.
*   **Body-LG (Inter, 1rem):** Used for food descriptions. High line-height (1.6) is required to maintain the editorial feel.
*   **Label-MD (Inter, 0.75rem, All-Caps):** Used for metadata (e.g., "30 MINS", "N1,500 DELIVERY"). 

The hierarchy conveys authority: Large headlines command attention, while generous spacing between body paragraphs ensures the user never feels overwhelmed by "data."

---

## 4. Elevation & Depth
We eschew traditional structural lines in favor of **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by "stacking." A search bar shouldn't have a border; it should be a `surface-container-lowest` (#ffffff) shape sitting on a `surface-container-low` (#f0f1f1) header.
*   **Ambient Shadows:** When a "floating" effect is required (e.g., a floating action button or a modal), use a shadow with a blur of `32px` at `6%` opacity. The shadow color must be a tint of `on-surface` (#2d2f2f), never pure black.
*   **The "Ghost Border" Fallback:** If accessibility requires a container edge, use the `outline-variant` (#acadad) token at **15% opacity**. 100% opaque borders are strictly forbidden.
*   **Glassmorphism:** Use for "floating" elements like checkout summaries. This allows the vibrant food photography to bleed through, making the app feel integrated and airy.

---

## 5. Components

### Cards (The "Food Editorial" Card)
*   **Style:** `rounded-lg` (1rem). No borders. 
*   **Layout:** Image-first. The image should occupy 60% of the card height.
*   **Separation:** Do not use dividers between items in a list. Use `spacing-4` (1.4rem) of vertical white space to separate content blocks.

### Buttons
*   **Primary:** Background `primary` (#8c4a00), text `on-primary` (#fff0e7). Shape: `rounded-full`. 
*   **Secondary:** Background `secondary-container` (#fed7d0), text `on-secondary-container` (#654945).
*   **Tertiary:** Ghost style. No background. `primary` text.

### Input Fields
*   **Style:** `surface-container-high` (#e1e3e3) background, `rounded-md` (0.75rem).
*   **States:** On focus, transition the background to `surface-container-lowest` (#ffffff) and add a `2px` "Ghost Border" of `primary`.

### Navigation (Cultural Context)
*   **Floating Bottom Bar:** Use a glassmorphic `surface` container. 
*   **Selection:** Instead of a simple color change, use a `primary-container` pill background behind the active icon.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical image placement. Let a plate of Jollof rice slightly overlap a container edge to create depth.
*   **Do** use `spacing-16` (5.5rem) or `spacing-20` (7rem) for section breathing room. High-end design requires space.
*   **Do** use the `tertiary` (#a33700) color for "Spicy" or "Hot" indicators—it provides a sophisticated tonal match to the primary orange.

### Don't:
*   **Don't** use pure black (#000000) for text. Use `on-surface` (#2d2f2f) to keep the "warmth."
*   **Don't** use 1px dividers. If you feel you need a line, use a `2px` gap of the background color instead.
*   **Don't** use standard 4px corners. Stay within the `rounded-md` (12px) to `rounded-xl` (24px) range to maintain a "soft" and "appetizing" feel.