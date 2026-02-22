# Void Chronicler's Image Redirect (extension for Chromium browsers (Chrome, Edge, Brave))

Redirects image requests from:

- https://ledercardcdn.seiyria.com/cards/.../*.webp

to:

- https://cardcdn.buriedgiantstudios.com/cards/.../*.webp

How to use:

1. Open `chrome://extensions` in Chrome.
2. Enable "Developer mode".
3. Click "Load unpacked" and select the folder with the extension

The extension uses a declarativeNetRequest rule (`rules.json`) to perform the redirect.