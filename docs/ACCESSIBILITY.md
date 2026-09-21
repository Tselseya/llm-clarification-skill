# Accessibility and Interface QA

**Last updated:** 2026-09-22

## Current interface

The browser plugin does not create a clarification dialog or block submission. It inserts editable text directly into the host page's composer. The user can edit or delete that text using the host editor's normal keyboard and pointer controls. The options page provides a labeled enable/disable checkbox, a labeled instruction textarea, a labeled retention checkbox, an endpoint field, a save button, and a live save-status message.

The enable toggle is explicitly described as non-destructive: turning it off stops automatic insertion but preserves the saved instruction. The selected logo is a symbolic mark rather than a text-bearing image; documentation should provide descriptive alternative text when displaying it.

## Review checklist

Keyboard-only users should be able to reach the options toggle, instruction textarea, optional settings, and save button. The focus indicator must remain visible. Screen-reader users should hear the toggle's description, including that disabling it preserves the instruction, and should receive the save result through the status region. Text should remain readable when zoomed and the textarea should be resizable.

The plugin must not trap focus, replace user-entered composer text, or require the user to interact with a custom dialog. Deleting the inserted instruction must remain a complete and understandable bypass path.

## Remaining risks

The content script runs on changing third-party websites whose DOM, focus behavior, shadow DOM, and accessibility trees are outside project control. The generic extractor may not recognize a custom editor, and the host page may expose its composer inconsistently. Test representative sites and keyboard flows before claiming broad compatibility. Accessibility conformance has not been certified.

This document records engineering intent, not a legal accessibility guarantee.
