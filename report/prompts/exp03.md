# Experiment 3: Interactive Web Page with JavaScript and DOM Manipulation

## Aim
Design and implement an interactive web page using JavaScript, DOM manipulation, and AI-generated scripts.

## Technologies Used
HTML5, CSS3 custom properties, vanilla JavaScript (DOM APIs, events, observers, animation frames, timers), React 18, TypeScript

## AI Tool Used
Antigravity

## AI-Assisted Implementation Prompt
```
You are a JavaScript instructor. Build an interactive "DOM Lab" page where core behaviours demonstrate direct DOM manipulation principles.

WIDGETS
1. Live clock + time-based greeting (setInterval -> textContent).
2. Light/dark theme toggle (setAttribute / class toggle -> CSS variables).
3. Project filter (event delegation -> classList toggling).
4. Live search that filters cards as the user types.
5. Click counter with increment, decrement, and reset.
6. Progress bar animated with requestAnimationFrame.
7. Accessible modal (open/close, Esc key, backdrop click).
8. Accordion with aria-expanded attributes.
9. Newsletter form with inline validation messages.

RULES
- Clean event binding and state reflection.
- Every listener, interval and animation frame must be cleaned up on unmount.
- Provide a light and a dark theme using CSS custom properties.
- Annotate each block with the exact DOM API it illustrates.
```

## Conclusion
An interactive DOM manipulation workbench was developed using native JavaScript APIs including setInterval, requestAnimationFrame, and event delegation. All dynamic controls, live filtering, and modal dialogs executed without layout shifts or memory leaks.
