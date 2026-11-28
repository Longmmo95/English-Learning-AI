# English Learning AI — Implementation Roadmap

Updated: 2026-11-28

## Safety boundary

- This work is isolated to `Longmmo95/English-Learning-AI`.
- Work branch: `feature/pronunciada-integration`.
- Do not edit, delete, deploy, or overwrite `https://sansalecunglong.github.io/hoc-tieng-anh/`.
- Do not push to or merge into `main`; do not merge PR #1.
- Do not publish a new GitHub Pages build without explicit owner approval.
- No paid APIs, paid hosting, paid model endpoints, secrets, or tokens in source control.
- Every milestone must have a test result and a short evidence-based report before proceeding.

## Baseline inspected

Repository state at start:
- Existing A1 frontend: 12 topics, 114 vocabulary items, 60 example phrases, 12 grammar practice items.
- Existing browser features: dashboard, lesson path, vocabulary with IPA and browser TTS, listening comprehension, flashcards, speaking capture, review, local progress and JSON backup/merge.
- Existing backend: FastAPI lesson endpoints and optional OpenPronounce 0.4.0 pronunciation adapter.
- Existing CI run #164 on commit `b8e14d607335da8c3e46a8e7b2db88c8a9ec171f`: all five jobs succeeded (frontend integration, backend API tests, Hugging Face adapter syntax, Docker health smoke test, Pronunciada 1.1.1 CPU inference smoke test).
- The Pronunciada smoke test verifies that the package can load its INT8 model and return per-word probabilities on deterministic eSpeak audio. It does not yet mean the website API uses Pronunciada, and it is not a learner-accent accuracy study.
- The current PR #1 is still open and draft. GitHub reports its merge state as dirty; do not merge or rebase it as part of this work.

## Milestones

### M0 — Safety and baseline audit (complete)
- Record repository state, existing features, CI evidence and non-negotiable safety rules.
- Add CI trigger for this isolated work branch.
- No production deployment and no change to the legacy site.

### M1 — Pronunciation engine integration (in progress)
- Add Pronunciada 1.1.1 as an optional backend engine, without silently replacing the existing OpenPronounce adapter.
- Convert supported uploads to a bounded mono 16 kHz WAV before inference; retain file-size and duration preflight checks.
- Return honest, schema-versioned sentence, word and phoneme probabilities, plus audio-quality warnings.
- Never fabricate a score when model weights or inference are unavailable.
- Add unit tests for result validation, malformed output, file cleanup, timeouts, and API response shape.
- Keep the existing browser speech-recognition comparison as a clearly labelled fallback, not AI pronunciation scoring.

### M2 — Learner-facing pronunciation coaching
- Display sentence and per-word probabilities, phoneme details and timestamps only when returned by the engine.
- Explain that probabilities are estimates, not exam grades.
- Add repeat-practice flow for low-confidence words and accessible controls.
- Test desktop/mobile layouts and microphone permission/error states.

### M3 — Learning quality and spaced repetition
- Validate every lesson's word/phrase/grammar counts and answer keys.
- Add deterministic content tests for duplicates, missing translations, IPA fields and distractor correctness.
- Introduce local spaced-repetition scheduling with transparent review intervals and export/import compatibility.
- Preserve existing local progress and backup schema through versioned migrations.

### M4 — Nini guided tutor and speaking practice
- Build a beginner-friendly Vietnamese-guided tutor flow from the actual lesson content.
- Start with deterministic, offline-safe practice and correction; do not call a fixed-script feature a generative AI model.
- Any optional local model or third-party service must be opt-in, documented, and free to run; no paid API dependency.

### M5 — Accessibility, PWA and release readiness
- Add real browser-level tests for core flows and mobile viewports.
- Verify keyboard navigation, labels, focus states, contrast, offline update behavior and backup/restore.
- Produce a release checklist and preview evidence.
- Publish only after explicit approval; never alter the legacy site.

## Acceptance criteria

A milestone is complete only when:
1. The feature branch contains the reviewed changes.
2. Relevant automated tests pass.
3. The app's user-facing wording matches the real capability (especially speech recognition vs acoustic pronunciation scoring).
4. No secrets or paid dependencies are introduced.
5. The legacy site and `main` remain untouched.
6. The report lists commit, test run, known limitations and next step.

## Known constraints

- GitHub Pages serves static frontend assets; it cannot host the Python inference API.
- Real microphone upload to the API requires an independently hosted HTTPS backend. A free local CPU deployment is possible for personal use, but public always-on hosting is not assumed to be free or available.
- Pronunciada's own upstream benchmarks do not guarantee equivalent accuracy for every Vietnamese learner. Test with real learner recordings before describing it as reliable for this audience.
- Pronunciada includes third-party model/data licensing obligations; retain upstream attribution and review its NOTICE/licensing files before redistribution.


## Delivery update — 2026-11-28

Implemented on `feature/pronunciada-integration`:
- Added an isolated Pronunciada 1.1.1 adapter and separate `/precise-status` + `/analyze-precise` endpoints; the OpenPronounce endpoint remains available.
- Added CPU INT8 scoring, 16 kHz mono WAV normalization, upload/duration checks, temporary-file cleanup, serialized inference and strict probability validation.
- Connected the speaking UI to the precise endpoint and added sentence, word and phoneme feedback.
- Added API contract tests, CI assertions, setup documentation and third-party notices.
- The new branch has its own CI trigger. No Pages deployment, main-branch change, PR merge or legacy-site modification was made.

Still required before M1 is complete:
- Confirm the latest CI run succeeds on the final branch head, including Docker build/health test.
- Test actual recorded speech (not only eSpeak synthetic audio), including quiet, noisy, clipped and Vietnamese-accented learner samples.
- Verify backend CORS/HTTPS and model cache on the target host; no public backend is deployed.
- Confirm the UI end-to-end against a running backend and real microphone permissions.
