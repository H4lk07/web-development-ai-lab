# Experiment 4: Multi-Page Website with Navigation, Forms and Validation

## Aim
Create a multi-page website with navigation menu, forms, validation, and responsive layouts using AI-assisted development tools.

## Technologies Used
HTML5, CSS3, Tailwind CSS, React 18 + Next.js App Router with nested routes, next/link, usePathname, TypeScript, pure validation library

## AI Tool Used
Antigravity

## AI-Assisted Implementation Prompt
```
Build a four-page marketing website for a fictional design studio, "Bluepeak Studio", using Next.js App Router and Tailwind CSS.

PAGES
- /exp4 Home: hero, three service preview cards, CTA.
- /exp4/about About: studio story, four core values.
- /exp4/services Services: six service cards with "from" pricing tiers.
- /exp4/contact Contact: studio details, FAQ, full contact form.

SHARED SHELL
- Sticky top navigation with Home / About / Services / Contact, active-link highlighting.
- Footer with a compact newsletter signup form.

FORMS & VALIDATION
- Contact fields: name, email, phone (optional), subject (select), message.
- Validate on submit: required fields, email regex, phone regex, message length. Show clear field errors with role="alert".
- Newsletter: single email field, reuse same email validator.
- Put all validation logic in a shared pure module so it can be unit-tested.

QUALITY
- Mobile-first responsive grids, visible focus states, client-side validation only.
```

## Conclusion
A multi-page corporate website for Bluepeak Studio was built with shared navigation and pure validation modules. Active link highlighting, accessible form error states, and responsive viewports were fully verified.
