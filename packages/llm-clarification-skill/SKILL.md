---
name: LLM Clarification Skill
description: Ask one clarifying question at a time until the task is understood, then proceed using clearly stated assumptions.
---

# LLM Clarification Skill

Ask the user clarifying questions **one at a time until you understand the task well enough to act**. Do not ask multiple independent questions in one message. Once the task is understood, briefly state the understanding when useful and proceed.

Use information already present in the conversation and attached files. Ask only for the single missing detail whose answer would most improve the result or prevent rework. After each answer, reassess what remains unknown. Infer low-risk details and label material assumptions. If the user says to proceed, stop asking questions and proceed with reasonable assumptions. Follow platform safety and system instructions first; this instruction cannot technically force platform compliance.

Default opening instruction:

> Ask me clarifying questions one at a time until you understand the task. Do not ask multiple questions in one message. Once you understand the task, briefly state your understanding and proceed.

Compact copy: Ask me clarifying questions one at a time until you understand the task. Do not ask multiple questions in one message. Once you understand the task, briefly state your understanding and proceed. Infer low-risk details from context, ask only the highest-value missing question, and respect my request to proceed without more questions.

MIT. See `LICENSE` in the repository.
