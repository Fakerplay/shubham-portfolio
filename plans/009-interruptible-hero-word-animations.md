# 009 — Rebuild InteractiveCodeWord and SplitFlapWord as interruptible animations

- **Status**: TODO
- **Commit**: fcd47cc
- **Severity**: MEDIUM
- **Category**: Interruptibility
- **Estimated scope**: 1 file, 2 component rewrites

## Problem

Both hero-copy word-cycling components in `app/page.tsx` use hand-rolled `setTimeout`/`setInterval` chains instead of Framer Motion transitions/springs. AUDIT.md: "keyframes restart from zero" and rapidly-retriggerable UI needs transitions/springs that retarget from the current state instead.

```tsx
// app/page.tsx:182-211 — current (InteractiveCodeWord)
const cycleWord = () => {
  if (isAnimating.current) return;
  isAnimating.current = true;

  if (reduceMotion) {
    setWordIndex((prev) => (prev + 1) % words.length);
    isAnimating.current = false;
    return;
  }

  setRotateX(-90);
  setOpacity(0);

  setTimeout(() => {
    setWordIndex((prev) => (prev + 1) % words.length);
    setRotateX(90);

    setTimeout(() => {
      setRotateX(0);
      setOpacity(1);

      setTimeout(() => {
        isAnimating.current = false;
      }, 150);
    }, 30);
  }, 150);
};
```

A click that lands mid-sequence is silently dropped (`if (isAnimating.current) return;`) rather than retargeted — the button appears briefly unresponsive.

```tsx
// app/page.tsx:90-148 — current (SplitFlapWord, per-character setInterval scramble)
const interval = setInterval(() => {
  count++;
  if (count >= settleCount) {
    clearInterval(interval);
    box.style.transform = "scaleY(0.1)";
    charSpan.textContent = final[i];
    setTimeout(() => {
      box.style.transform = "scaleY(1)";
    }, 80);
  } else {
    const randIdx = Math.floor(Math.random() * chars.length);
    charSpan.textContent = chars[randIdx];
  }
}, 45);
```

Re-triggering via `onMouseEnter` (`triggerEffect` is also called on hover, `:164`) clears all intervals and rebuilds every character box from scratch (`el.innerHTML = ""`, `:99`), causing a hard visual reset if the user hovers again mid-scramble rather than a smooth continuation.

## Target

**InteractiveCodeWord**: replace the 3-stage `setTimeout` chain with a single Framer Motion `AnimatePresence`+`key`-based crossfade, which Framer already retargets/interrupts correctly if `wordIndex` changes again mid-transition.

```tsx
// app/page.tsx — target (InteractiveCodeWord body, replacing the setTimeout chain)
const cycleWord = () => {
  if (reduceMotion) {
    setWordIndex((prev) => (prev + 1) % words.length);
    return;
  }
  setWordIndex((prev) => (prev + 1) % words.length);
};

// ...inside the JSX, replace the manual rotateX/opacity motion.span with:
<span style={{ perspective: 600 }} className="inline-block overflow-hidden">
  <AnimatePresence mode="popLayout" initial={false}>
    <motion.span
      key={wordIndex}
      initial={{ rotateX: -90, opacity: 0 }}
      animate={{ rotateX: 0, opacity: 1 }}
      exit={{ rotateX: 90, opacity: 0 }}
      transition={{ duration: 0.18, ease: "easeInOut" }}
      style={{ transformOrigin: "center", display: "inline-block" }}
    >
      {words[wordIndex]}
    </motion.span>
  </AnimatePresence>
</span>
```

This removes the `rotateX`/`opacity`/`isAnimating` state entirely — `AnimatePresence` with `mode="popLayout"` handles overlap-free crossfade, and rapid clicks simply update `wordIndex` again, which Framer retargets smoothly instead of dropping.

**SplitFlapWord**: keep the visual design (it's a deliberate split-flap board effect, not being redesigned), but guard re-entry the same way Framer would — only rebuild if not already scrambling, and let an in-flight scramble finish before a new hover can restart it, rather than hard-clearing mid-flight.

```tsx
// app/page.tsx — target (SplitFlapWord, replacing the isAnimating-less re-entry with a guarded one)
const isScrambling = useRef(false);

const triggerEffect = useCallback(() => {
  if (isScrambling.current) return; // let an in-flight scramble finish instead of hard-resetting
  isScrambling.current = true;
  const el = containerRef.current;
  if (!el) return;

  activeIntervals.current.forEach((interval) => clearInterval(interval));
  activeIntervals.current = [];

  const final = el.getAttribute("data-final") || targetText;
  el.innerHTML = "";

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let remaining = final.length;

  for (let i = 0; i < final.length; i++) {
    // ...existing box-building code unchanged...
    const interval = setInterval(() => {
      count++;
      if (count >= settleCount) {
        clearInterval(interval);
        box.style.transform = "scaleY(0.1)";
        charSpan.textContent = final[i];
        setTimeout(() => {
          box.style.transform = "scaleY(1)";
          remaining--;
          if (remaining === 0) isScrambling.current = false;
        }, 80);
      } else {
        const randIdx = Math.floor(Math.random() * chars.length);
        charSpan.textContent = chars[randIdx];
      }
    }, 45);
    activeIntervals.current.push(interval);
  }
}, [reduceMotion]);
```

## Repo conventions to follow

- `AnimatePresence`/`motion` are already imported at the top of `app/page.tsx:9` — no new import needed for `InteractiveCodeWord`.
- Keep `reduceMotion` branching exactly as it already exists in both components — this plan only changes the non-reduced-motion animation mechanism, not the reduced-motion fallback.
- If plan 006 (shared easing constants) has landed, use `EASE_IN_OUT` from `@/lib/motion` in place of the bare `"easeInOut"` string shown above for `InteractiveCodeWord`.

## Steps

1. In `app/page.tsx`, inside `InteractiveCodeWord` (currently `:172-262`): remove the `rotateX`, `opacity`, and `isAnimating` state/ref declarations (`:175-177`); simplify `cycleWord` to just advance `wordIndex` (both branches become identical, so the `if (reduceMotion)` special case can also be removed if desired, or kept as a no-op passthrough for clarity).
2. Replace the inner `<span style={{ perspective: 600 }}>...<motion.span animate={{ rotateX, opacity }}>...</motion.span></span>` block (`:234-243`) with the `AnimatePresence`/`key={wordIndex}` version shown in Target above.
3. In `SplitFlapWord` (currently `:85-169`): add `const isScrambling = useRef(false);` near the other refs; add the early-return guard and `remaining` counter as shown in Target; keep every other line (box-building HTML, styling, `settleCount` stagger math) exactly as-is.
4. Verify `cycleWord`'s `onKeyDown`/`onClick` wiring on the `motion.button` (`:220-233`) still works unchanged — only the inner content and state model changed, not the button's event handlers.

## Boundaries

- Do NOT change the visual design of either component (colors, box styling, character-cycling look) — only the animation/interruption mechanism.
- Do NOT change `TerminalTypewriter.tsx` — it is confirmed dead code (unused import), not part of this plan.
- Do NOT remove the `reduceMotion` prop/branch from either component.

## Verification

- **Mechanical**: `npx tsc --noEmit` clean; confirm no unused-variable lint errors from removed `rotateX`/`opacity`/`isAnimating` state.
- **Feel check**:
  - Click "sharper/trusted/memorable" rapidly several times in a row — each click should smoothly crossfade to the next word with no dropped clicks and no visual glitch, even when clicked faster than the transition duration.
  - Hover on/off "MOMENTUM" repeatedly and quickly — the scramble should never visually snap/reset mid-flight; a fast re-hover should just be ignored until the current scramble finishes, then play cleanly.
  - Toggle `prefers-reduced-motion: reduce` and confirm `InteractiveCodeWord` still instantly swaps words with no animation.
- **Done when**: neither component can be visually broken by rapid re-triggering, and reduced-motion behavior is unchanged.
