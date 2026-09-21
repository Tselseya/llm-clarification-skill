# Risk Register

**Last updated:** 2026-09-22

This register flags material risks found in the current personal open-source project. It is not a legal opinion and does not prove that the project complies with every jurisdiction or platform policy.

| Area | Current finding | Risk | Mitigation or next action |
|---|---|---|---|
| Model behavior | The skill guides models but cannot force them to comply. | Users may assume clarification is guaranteed. | Keep the limitation in the README, skill, and Terms; avoid “guaranteed,” “always,” or “enforced” claims. |
| Thread detection | Generic URL, history, DOM, and “new chat” labels are used to identify a new thread. | A site may fail to signal a new thread or may cause a repeated or missed insertion. | Keep insertion one-time and non-destructive, test the fixture and representative sites, and document generic coverage limits. |
| Prompt extraction | The plugin reads local composer text from common form and editable elements. | A custom editor may not be recognized, or a site may expose text differently. | Keep extraction deterministic and local; add site-specific selectors only with tests and documentation. |
| User control | The opening instruction is inserted into an empty composer and remains editable. | Users may send an instruction they did not want or assume it cannot be removed. | Explain edit/delete bypass in the UI, README, SOP, and fixture; never overwrite non-empty composer text. |
| Prompt privacy | The extension reads composer text in the content-script context. | Sensitive prompts may be exposed to the browser extension context or host page. | Use local-first behavior, no project server, no automatic archive, clear permissions, and sensitive-data warnings. |
| Disable toggle | The enable setting controls insertion separately from the saved instruction. | Users may believe disabling deletes their customized instruction. | State that disabling is non-destructive, preserve the value in storage, and test disable/re-enable behavior. |
| Optional endpoint | The settings UI contains an endpoint field reserved for future functionality. | Users may misunderstand whether text is transmitted. | Keep it empty by default, do not call it in the current release, and document any future network behavior before enabling it. |
| Third-party platforms | ChatGPT, Claude, Manus, GitHub, and browser policies are independent. | Terms, plans, file limits, or upload behavior may change. | Link to official docs, state availability varies, and re-check before each release. |
| Skills/code upload | Skill packages can contain instructions or executable resources. | A malicious or modified package could affect an agent workflow. | Keep packages Markdown-only, review contents, use Git history/releases, and warn users to inspect files. |
| Cookies/analytics | No analytics, telemetry, cookies, pixels, iframes, or third-party embeds were found in the current repo. | Future additions could create consent and disclosure obligations. | Do not add tracking by default; update Cookie Policy and consent design before adding it. |
| Accessibility | Options controls have labels, help text, live status, focus styles, and a non-destructive toggle explanation. | Host pages and dynamic DOM can still create inaccessible or incompatible states. | Add automated and manual screen-reader/keyboard testing before store publication. |
| Security | The plugin has broad host access to support generic sites. | Broad permissions increase trust and review burden. | Minimize permissions where feasible, explain them in the README, avoid remote code, and review every release. |
| External side effects | The skill may be used before publishing, deleting, purchasing, or submitting. | Users may mistake clarification for approval or professional review. | Require human review and appropriate confirmation for high-impact actions; do not make unsupported safety claims. |
