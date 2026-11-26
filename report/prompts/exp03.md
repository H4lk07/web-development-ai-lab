# Experiment 3 — AI Prompt Specification

```text
[ROLE]: Senior Systems JavaScript Engineer & Web Standards Specialist.
[OBJECTIVE]: Design an interactive DOM Manipulation Workbench demonstrating native browser runtime APIs.
[STACK]: Vanilla JavaScript (ES2022), W3C DOM Level 3 APIs, CSS Custom Properties, HTML5 semantic structure.
[INTERACTIVE MODULES]:
- Clock & Greeting: Real-time digital clock driven by window.setInterval updating textContent.
- Theme Switcher: Root attribute mutation (data-theme) dynamically swapping CSS custom property variable maps.
- Dynamic Filters: Event delegation via parent container listener and classList toggling for tag filtering.
- Performance Animation: Progress indicators driven by window.requestAnimationFrame for 60fps tear-free repaints.
- Accessible Modal: Dynamic dialog injection with focus trapping, backdrop click listeners, and Escape key dismissal.
[ENGINEERING CONSTRAINTS]:
- Zero external libraries or jQuery; all event listeners, intervals, and animation frames must be cleaned up on unmount.
- Provide explicit inline code annotations identifying the exact DOM API method utilized in every interaction.
```
