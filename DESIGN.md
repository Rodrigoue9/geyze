# Design System Strategy: The Clinical Editorial

## 1. Overview & Creative North Star
The Creative North Star for this system is **"The Clinical Editorial."** 

This design system moves away from the sterile, rigid layouts of traditional medical manuals and instead adopts the sophisticated, spacious aesthetic of a high-end luxury wellness publication. It balances the precision required for micropigmentation instruction with the soft, welcoming atmosphere of a premium aesthetic clinic. 

To break the "template" look, we utilize **Intentional Asymmetry**. Instead of centering every element, we use a heavy left-aligned typographic anchor with generous, purposeful "white space" (utilizing the `surface` tokens) to allow the eye to rest. Elements should feel layered and organic, as if they are high-quality vellum sheets resting on a stone treatment table.

---

## 2. Colors & Surface Philosophy
The palette is a sophisticated blend of medical precision (`secondary` blue) and human warmth (`primary` rose-taupe).

### The "No-Line" Rule
**Strict Prohibition:** Designers are prohibited from using 1px solid borders to define sections or cards. 
Structure must be achieved through **Tonal Transitions**. To separate a sidebar from a main instructional block, use a shift from `surface` to `surface-container-low`. This creates a sophisticated, "borderless" interface that feels more like a modern architectural space than a digital form.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of materials.
*   **Base Layer:** `surface` (#fbf9f7) – The canvas.
*   **Content Blocks:** `surface-container-low` (#f5f3f1) – For primary instructional text.
*   **Floating Tips/Sidebars:** `surface-container-lowest` (#ffffff) – For high-contrast prominence.
*   **Deep Interaction:** `surface-container-high` (#eae8e6) – For inactive states or secondary utility panels.

### The "Glass & Gradient" Rule
For "Hero" sections or primary Call-to-Actions, use a subtle linear gradient from `primary` (#8a4853) to `primary_container` (#a6606b) at a 135-degree angle. This adds "soul" and depth. For floating navigation or modal overlays, apply **Glassmorphism**: use `surface` at 70% opacity with a `20px` backdrop-blur to maintain the clinical, airy feel.

---

## 3. Typography
The typographic pairing is designed to mirror the "Clinical Editorial" theme: the authority of a textbook with the elegance of a fashion journal.

*   **Display & Headlines (Noto Serif):** Used for chapter titles and section breaks. The high contrast of the serif letterforms communicates prestige and history.
    *   *Scale Tip:* Use `display-lg` for chapter starts with `primary` color to establish an immediate "high-end" tone.
*   **Body & Titles (Inter):** Used for all instructional content. Inter’s tall x-height ensures maximum readability during technical procedures.
    *   *Scale Tip:* Use `body-lg` for core instructions. For technical sub-steps, use `label-md` in `secondary` (#206393) to provide a "medical-note" aesthetic.

---

## 4. Elevation & Depth
We eschew traditional "Material" shadows in favor of **Ambient Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by placing a `surface-container-lowest` card on top of a `surface-container-low` background. This creates a "soft lift" that mimics natural light.
*   **Ambient Shadows:** If an element must float (e.g., a "Pro Tip" popover), use a shadow with a 40px blur at 6% opacity, tinted with `on_surface` (#1b1c1b). Never use pure black shadows.
*   **The "Ghost Border" Fallback:** If accessibility requires a stroke (e.g., in a high-glare environment), use the `outline_variant` token at **15% opacity**. It should be felt, not seen.

---

## 5. Components & Layout Patterns

### Instructional Cards
*   **Style:** No borders. Use `surface-container-low`.
*   **Padding:** Utilize `spacing-6` (2rem) for internal padding to ensure the content doesn't feel "cramped," maintaining the spa-like breathing room.
*   **Image Placeholders:** Use `surface-dim` with a `lg` (0.5rem) corner radius. Imagery should always feel "inset" into the layout.

### Buttons (The "Procedure" Action)
*   **Primary:** Solid `primary` (#8a4853) with `on_primary` text. Use `full` roundedness (pill-shape) for a soft, human feel.
*   **Secondary:** `surface-container-highest` background with `on_secondary_container` text. This is for less urgent instructional steps.

### Clinical Sidebars (Tips & Safety)
*   **Structure:** Forbid divider lines. Use a `3.5rem` (`spacing-10`) left-margin gutter. 
*   **Visual Cue:** Use a vertical accent bar (4px wide) of `secondary` (#206393) on the left side of "Safety Warnings" instead of a full box.

### Input Fields
*   **State:** Standard inputs should use `surface-container-lowest` with a "Ghost Border" of `outline-variant` at 20%. 
*   **Focus:** Transition the border to `secondary` (#206393) to signal a "Clinical/Active" state.

---

## 6. Do’s and Don’ts

### Do
*   **DO** use `spacing-16` and `spacing-20` for section margins. Large gaps are a hallmark of premium design.
*   **DO** use `secondary_fixed_dim` for background accents in diagrams to keep the "medical blue" subtle and professional.
*   **DO** overlap high-quality photography across two background containers (e.g., an image of a needle-tip sitting half-on `surface` and half-on `surface-container-low`) to create editorial depth.

### Don’t
*   **DON'T** use 100% black text. Always use `on_surface` (#1b1c1b) to maintain a soft, high-end ink-on-paper look.
*   **DON'T** use sharp 0px corners. Even the most "clinical" element should use at least the `DEFAULT` (0.25rem) radius to feel welcoming.
*   **DON'T** use more than one Serif font weight on a single screen. Let the size (`display-lg` vs `headline-sm`) do the work, not the thickness.