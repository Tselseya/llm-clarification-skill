# Privacy

For the complete public policy set, see [`docs/PRIVACY-POLICY.md`](docs/PRIVACY-POLICY.md), [`docs/COOKIE-POLICY.md`](docs/COOKIE-POLICY.md), and [`docs/FORM-CONSENT.md`](docs/FORM-CONSENT.md).

The portable skill is text and has no data collection behavior.

The browser plugin uses the local `prompt-extractor.js` module to detect common composers and read their text only in the page context. By default, prompt text and conversation context are not sent to a project server, and the plugin does not archive prompts or intercept submissions. It reads the composer locally to decide whether an empty composer is ready for the one-time opening instruction. The plugin stores settings, including the customized opening instruction and the enable/disable state, in browser extension local storage.

Disabling automatic insertion stops new insertions without deleting the saved instruction. The optional analysis endpoint field is empty by default and is not called by the current release.

No analytics, telemetry, cookies, tracking pixels, iframes, or third-party embeds are included. Users should treat prompts as potentially sensitive and review the permissions shown by their browser before installation.
