# Traceback, the Lost and Found Platform

A lost-and-found web application built for FBLA Website Coding &amp; Development.
Traceback lets students and staff report lost or found items, search listings, and coordinate item returns all in one place.

---

## Features

| Feature | Description |
|---|---|
| **Item Submissions** | Report lost or found items with a photo, description, location, tags, and date |
| **Image Cropping** | In-browser crop before upload using CropperJS |
| **Search &amp; Filter** | Keyword search across title, tags, and location with category/date filters |
| **Admin Panel** | Dedicated /admin page to approve, reject, or delete any listing |
| **Authentication** | Email/password and Google OAuth sign-in via Appwrite with email verification |
| **Account Management** | Update display name, change password, view/delete own listings |
| **Multi-language** | 7 languages: English, Spanish, French, Italian, Hindi, Chinese, and Arabic |
| **Dark Mode** | Automatically detects user preference and can be overwritten with a settings toggle |
| **Dyslexic Font** | OpenDyslexic font via Settings panel for improved readability |
| **Responsive Design** | Tested on multiple platforms to ensure a good UX for everyone |
| **Reduced Motion** | Animations suppressed when `prefers-reduced-motion: reduce` is active |
| **Keyboard Navigation** | Full keyboard access to nav, modals, settings popup, and forms |
| **ARIA Labels** | `aria-label`, `aria-current`, and `aria-hidden` throughout the app |

---

## Main Resources Used

| Layer | Technology |
|---|---|
| **Backend** | [Appwrite Cloud](https://appwrite.io) |
| **Appwrite SDK** | `appwrite` v22.4.1 loaded as ES module via jsDelivr |
| **Image Cropping** | [CropperJS](https://github.com/fengyuanchen/cropperjs) v1.6.2 via jsDelivr |
| **CSS Reset** | [normalize.css](https://github.com/necolas/normalize.css) v8.0.1 |
| **Fonts** | Inter, Poppins (Google Fonts); OpenDyslexic (cdnfonts) |

## Accessibility

Traceback was designed with accessibility in mind, targeting WCAG 2.1 compliance:

- **ARIA labels and landmarks** — all icon-only buttons carry `aria-label`; decorative images use `aria-hidden="true"` while landmarks exist on every page
- **Keyboard navigation** — all interactive elements are focusable and navigable
- **Color contrast** — Colors exceeding 4.5:1 ratio
- **Dyslexic font** — OpenDyslexic font available in settings for users with dyslexia
- **Reduced motion** — suppresses animations for users who prefer reduced motion

## References &amp; Licenses

Full citations for all libraries, fonts, standards, and tools used are listed on the
[References page](references.html).

## Load Testing

A `k6` recovery-oriented load test is included at
`load-tests/k6/traceback-recovery.js`.

Default target:

- `https://traceback.appwrite.network`

Example run:

```bash
k6 run load-tests/k6/traceback-recovery.js
```

Example tuned run:

```bash
TARGET_URL=https://traceback.appwrite.network \
MAX_VUS=180 \
SPIKE_VUS=260 \
RECOVERY_VUS=40 \
WARMUP_STAGE1_DURATION=2m \
WARMUP_STAGE2_DURATION=3m \
SUSTAINED_STAGE1_DURATION=4m \
SUSTAINED_STAGE2_DURATION=10m \
SPIKE_HOLD_DURATION=2m \
RECOVERY_MINUTES=8 \
PAGE_PATHS=/,/lost.html,/found.html,/references.html \
ASSET_PATHS=/favicon.ico \
npm run loadtest:k6
```

Optional overrides:

- `TARGET_URL` to point at staging or another environment
- `RESULTS_FILE` to choose a different summary output path
- `MAX_VUS`, `SPIKE_VUS`, and `RECOVERY_VUS` to control concurrency levels
- `WARMUP_START_VUS`, `WARMUP_STAGE1_TARGET`, `WARMUP_STAGE2_TARGET`, and `SUSTAINED_STAGE1_TARGET` to override stage targets directly
- `WARMUP_STAGE1_DURATION`, `WARMUP_STAGE2_DURATION`, `SUSTAINED_STAGE1_DURATION`, `SUSTAINED_STAGE2_DURATION`, `SPIKE_RAMP_DURATION`, `SPIKE_HOLD_DURATION`, `SPIKE_RAMPDOWN_DURATION`, and `GRACEFUL_RAMPDOWN` to change timings
- `RECOVERY_MINUTES` to lengthen or shorten the steady recovery window
- `PAGE_PATHS` and `ASSET_PATHS` as comma-separated lists to change which routes are sampled
- `SLEEP_MIN_SECONDS` and `SLEEP_MAX_SECONDS` to change think time between iterations
- `PAGE_LATENCY_LIMIT_MS`, `ASSET_LATENCY_LIMIT_MS`, `HTTP_P95_MS`, `HTTP_P99_MS`, `HTTP_ERROR_RATE`, and `CHECK_RATE` to tune pass/fail thresholds

The script writes artifacts to `load-tests/results/`, which is ignored by git.

## Developers

Made by Luke Collingridge and Eli Nelson.
