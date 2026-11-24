# Experiment 12: AI Image Generation or Image Captioning Application

## Aim
Develop an AI-enabled image generation or image captioning web application using publicly available AI APIs.

## Technologies Used
Node.js, Express.js, native fetch, Pollinations public image API, Gemini vision API, React 18, Tailwind CSS, TypeScript

## AI Tool Used
Antigravity

## AI-Assisted Implementation Prompt
```
Build an AI image generation and captioning web app using public AI APIs.

GENERATION (Pollinations AI public API — keyless, fast, reliable)
- Styles and prompt suffixes:
  * photoreal: "photorealistic, 8k, sharp focus, natural studio lighting"
  * 3d: "3D render, octane render, soft studio volumetric lighting"
  * watercolor: "watercolor painting, soft brush strokes, textured art paper"
  * anime: "modern anime aesthetic, vibrant saturated colors, crisp linework"
  * neon: "cyberpunk neon aesthetic, dramatic volumetric lighting"
  * pixel: "16-bit retro pixel art, clean pixel clusters"
- Aspect ratios: 1:1 (1024x1024), 2:3 (768x1152), 3:2 (1152x768).
- Accept optional seed for reproducible generations.

ENHANCE & CAPTION
- POST /api/image/enhance { prompt } -> richer, more visual prompt.
- POST /api/image/caption { image } -> descriptive caption.

UI
- Two tabs: Generate and Caption. Style selection grid, aspect ratio buttons, seed randomizer, high-resolution preview, and download action.
```

## Conclusion
An AI image studio supporting text-to-image synthesis and automated vision captioning was implemented using Pollinations AI and vision models. Seed-controlled generation, artistic style prompts, and prompt enhancement were successfully demonstrated.
