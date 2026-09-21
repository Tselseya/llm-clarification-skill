# Privacy

The portable skill is text and has no data collection behavior.

The browser-extension MVP runs its ambiguity heuristic in the browser. By default, prompt text, answers, and conversation context are not sent to a project server. The extension may keep ordinary browser extension settings in local storage. The optional retention setting is user-controlled.

The options page includes an optional analysis endpoint field for advanced users. It is empty by default. If a user enters an endpoint and a future implementation enables it, the user is responsible for reviewing that service's privacy terms and sending only content they are authorized to share. The current MVP does not call an external endpoint.

No analytics or telemetry is included. Users should treat prompts as potentially sensitive and review the permissions shown by their browser before installation.
