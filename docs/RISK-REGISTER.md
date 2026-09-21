# Risk Register

**Last updated:** 2026-09-21

This register flags material risks found in the current personal open-source project. It is not a legal opinion and does not prove that the project complies with every jurisdiction or platform policy.

| Area | Current finding | Risk | Mitigation or next action |
|---|---|---|---|
| Model behavior | The skill guides models but cannot force them to comply. | Users may assume clarification is guaranteed. | Keep the limitation in the README, skill, and Terms; avoid “guaranteed,” “always,” or “enforced” claims. |
| Browser interception | Generic DOM/event heuristics may miss or mishandle a site. | A prompt may send without clarification or be duplicated/altered. | Keep bypass visible, test adapters per site, add an event audit, and describe the MVP as generic/prototype. |
| Prompt privacy | The extension reads composer text during interception. | Sensitive prompts may be exposed to the host page or browser extension context. | Local-first behavior, no project server, clear permissions, no automatic prompt archive, and prominent sensitive-data warnings. |
| Optional endpoint | The settings UI contains an endpoint field reserved for future functionality. | Users may misunderstand whether text is transmitted. | The current MVP does not call it; document any future network behavior before enabling it and default to empty/off. |
| Third-party platforms | ChatGPT, Claude, Manus, GitHub, and browser policies are independent. | Terms, plans, file limits, or upload behavior may change. | Link to official docs, state availability varies, and re-check before each release. |
| Skills/code upload | Skill packages can contain instructions or executable resources. | A malicious or modified package could affect an agent workflow. | Keep packages Markdown-only, review contents, use Git history/releases, and warn users to inspect files. |
| Cookies/analytics | No analytics, telemetry, cookies, pixels, iframes, or third-party embeds were found in the current repo. | Future additions could create consent and disclosure obligations. | Do not add tracking by default; update Cookie Policy and consent design before adding it. |
| Legal identity | Only GitHub username and repository URL are disclosed. | A commercial launch without legal/business details could create disclosure and liability issues. | Keep the project personal/non-commercial or add accurate legal entity, jurisdiction, contact, and tax details before commercialization. |
| Copyright/trademark | Logo is generated and no external images are packaged. | AI-output rights and brand similarity may be uncertain. | Do not claim exclusivity; perform rights/trademark review before commercial or trademark use. |
| Accessibility | Semantic labels, live status, contrast, focus styles, and keyboard paths were added. | Host pages and dynamic DOM can still create inaccessible or incompatible states. | Add automated and manual screen-reader/keyboard testing before store publication. |
| User consent | No project-operated forms or marketing collection exist. | A future form, newsletter, or analytics feature may collect data without a valid notice/choice. | Keep FORM-CONSENT as a launch gate; separate necessary submission from optional marketing consent. |
| Security | The extension has broad host access to support generic sites. | Broad permissions increase trust and review burden. | Minimize permissions where feasible, explain them in the README, avoid remote code, and review every release. |
| External side effects | The skill may be used before publishing, deleting, purchasing, or submitting. | Users may mistake clarification for approval or professional review. | Require human review and appropriate confirmation for high-impact actions; do not make unsupported safety claims. |
