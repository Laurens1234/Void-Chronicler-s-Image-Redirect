# Void Chronicler's Image Redirect (Chrome extension)

Void Chronicler's Image Redirect redirects image requests from:

- https://ledercardcdn.seiyria.com/cards/.../*.webp

to:

- https://cardcdn.buriedgiantstudios.com/cards/.../*.webp

Install (Developer mode):

1. Open `chrome://extensions` in Chrome.
2. Enable "Developer mode".
3. Click "Load unpacked" and select this folder:

   - c:\Users\laure\random coding projects\voidchronimages

Test URLs:

- https://ledercardcdn.seiyria.com/cards/arcs/en-US/FATE07.webp

The extension uses a declarativeNetRequest rule (`rules.json`) to perform the redirect.

How it works:

- A content script (`content_script.js`) runs at `document_start` and rewrites in-page image URLs and common lazy-load attributes so the browser never attempts DNS resolution for `ledercardcdn.seiyria.com`.
- A declarativeNetRequest rule in `rules.json` also redirects matching network requests when applicable.

- When the content script rewrites any in-page image URL it briefly shows a small "Redirected" popup for 1 second in the bottom-right corner.

"# Void-Chronicler-s-Image-Redirect" 
