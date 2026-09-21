# Browser Extension MVP

This is a no-build Manifest V3/WebExtension prototype. Load the directory as an unpacked extension in Chrome, Edge, Brave, Firefox, or another compatible desktop browser.

## Behavior

The content script uses local heuristics to estimate whether a prompt is long or complex and whether it appears to omit audience, format, constraints, or success criteria. When it decides clarification may help, it intercepts common Enter and Send-button submission paths and opens a floating panel. The user answers one question at a time, then the extension appends a structured clarification brief and sends the prompt. **Bypass and send** is always available.

## Known MVP limits

Websites use different editors, event handlers, shadow DOM, and accessibility labels. Generic interception cannot guarantee coverage. A production release should add tested site adapters, a manual command to open the panel, stronger event isolation, accessibility review, and browser-store packaging. The extension does not itself understand every task like an LLM; it is a local heuristic companion to the portable skill.
