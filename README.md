# EazySnap: A real-time photo editor with an easy-to-use UI

EazySnap is a browser-based photo editor built with Vue 3. Filters are rendered on the GPU through WebGL, so adjustments preview in real time as you drag a slider. Images never leave the browser: uploading, editing, and downloading all happen client-side.

The goal of this project was to learn more about usability testing, analytics, user experience, and software iteration. Every edit and file action is instrumented with Google Analytics 4 events, which were used to see which tools people actually reached for and to iterate on the UI.

## Features

Edits are grouped into three tabs, each with its own route:

| Tab | Route | Tools |
| --- | --- | --- |
| **Light** | `/#/transformations/light` | Brightness, Contrast, Sepia, Noise, Ink, Smooth (denoise) |
| **Color** | `/#/transformations/color` | Vibrance, Hue, Saturation, Red / Green / Blue curves |
| **Shape** | `/#/transformations/shape` | Crop (hold Shift to lock aspect ratio), Straighten (±45°), Rotate (±180°), Resize, Flip horizontal / vertical |

Also:

- **Upload & download** JPG/JPEG/PNG images, exported in the original format at full quality
- **Undo all** to return to the original image in one click
- **Per-control reset** on every slider and number input
- **Responsive layouts** for mobile, tablet, desktop, large desktop, and ultrawide screens
- **Hints page** (`/#/hints`) with tips for cropping and moving the image

## How it works

- **Filters (WebGL):** The uploaded image is loaded into a [glfx.js](https://evanw.github.io/glfx.js/) canvas as a texture. Filters are applied as a chain of GPU passes (`brightnessContrast`, `vibrance`, `hueSaturation`, `curves`, `denoise`, `sepia`, `noise`, `ink`), reloading the texture between passes so each effect builds on the last.
- **Shape (Cropper.js):** Crop, straighten, rotate, flip, and resize are handled by [Cropper.js](https://fengyuanchen.github.io/cropperjs/) via `vue-cropperjs`. Shape changes produce a new base image that the filter chain is then re-applied to.
- **State (Vuex):** Every adjustment value and its default live in a single Vuex store. Keeping defaults in the store gives one source of truth for both per-control resets and "undo all."
- **Export:** The final canvas is serialized with `toDataURL` and saved with [FileSaver.js](https://github.com/eligrey/FileSaver.js/).
- **Analytics:** `src/utils/GoogleAnalytics.js` sends `photo_edit` and `file_option` GA4 events tagged with the feature used.

### Known limitation: Safari / iOS

WebKit (Safari on macOS and every browser on iOS) flips WebGL canvas output vertically when it is read back with `toDataURL`. The app detects WebKit via `navigator.vendor` and warns users to switch to Firefox or a desktop browser. There is partial flip-correction code in `flipGLCanvasIfNeeded`.

## Stack

- [Vue 3](https://vuejs.org/) + [Vuex 4](https://vuex.vuejs.org/) + [Vue Router 4](https://router.vuejs.org/) (hash history)
- [glfx.js](https://evanw.github.io/glfx.js/) (WebGL image filters)
- [Cropper.js](https://fengyuanchen.github.io/cropperjs/) / `vue-cropperjs`
- [Bulma](https://bulma.io/) + SCSS
- [Font Awesome](https://fontawesome.com/)
- Google Analytics 4 via `vue-gtag-next`
- Vue CLI 4 (webpack)
- Google Cloud: App Engine + Cloud Build

## Project structure

```
src/
├── components/
│   ├── App.vue               # Navbar, footer, global styles
│   ├── ImageForm.vue         # Editor core: upload, canvases, WebGL filter chain, cropper, download
│   ├── EffectSliderComp.vue  # Reusable slider with reset
│   └── EffectNumberComp.vue  # Reusable number input with reset
├── views/
│   ├── Light.vue             # Light tab controls
│   ├── Color.vue             # Color tab controls
│   ├── Shape.vue             # Crop / straighten / flip / rotate / resize controls
│   └── Hints.vue             # Usage tips
├── router/index.js           # Routes; /transformations/* are children of ImageForm
├── store/index.js            # Vuex store: image state, adjustment values, defaults
└── utils/
    ├── DeviceTesting.js      # Breakpoint + WebKit detection
    └── GoogleAnalytics.js    # GA4 event helpers
```

## Getting started

### Prerequisites

- **Node.js 14** (matches the App Engine runtime). Newer Node versions fail to build the `fibers` dependency.
- npm

### Install and run

```bash
npm install
npm run serve     # dev server with hot reload at http://localhost:8080
```

### Other scripts

```bash
npm run build     # production build into dist/
npm run lint      # ESLint
npm run sitemap   # regenerate sitemap.xml from vue.config.js
```

## Deployment

The app is deployed to **Google App Engine** as a static site.

- `app.yaml` serves files from `dist/` and falls back to `index.html` for all other routes, over HTTPS only.
- `cloudbuild.yaml` defines a Cloud Build pipeline: `npm install` → `npm run build` → `gcloud app deploy`.

To deploy manually:

```bash
npm run build
gcloud app deploy
```

