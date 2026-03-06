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

## Developers

Made by Luke Collingridge and Eli Nelson.