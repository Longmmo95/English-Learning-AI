# Third-party notices

This project optionally uses the following pronunciation-scoring components when the
Pronunciada backend extra is installed.

## Pronunciada 1.1.1

- Project: https://github.com/moglearn/pronunciada
- PyPI release: https://pypi.org/project/pronunciada/1.1.1/
- Code license: Apache License 2.0.
- The upstream package includes data and lexicons with additional licenses. The upstream
  SPDX expression is Apache-2.0 AND CC-BY-SA-4.0 AND BSD-2-Clause AND MIT.
- Preserve the upstream `NOTICE`, `LICENSE`, `docs/LICENSING.md` and per-file lexicon
  attribution when redistributing the package or a container that includes it.

## ZIPA acoustic model

- Model: `anyspeech/zipa-small-crctc-500k`, downloaded by Pronunciada at first use.
- License: Creative Commons Attribution 4.0 International (CC BY 4.0).
- Citation: Zhu et al., “ZIPA: A family of efficient models for multilingual phone recognition”.
- Model card: https://huggingface.co/anyspeech/zipa-small-crctc-500k

## Scope

The English learning backend uses Pronunciada's English scoring path. The Python package
may include lexicons for other languages; those files retain their respective upstream
licenses even though this project currently exposes English-only pronunciation practice.

The probabilities returned by the model are estimates, not examination grades or a
guarantee of correct assessment for every learner accent. See
[backend/PRONUNCIATION.md](backend/PRONUNCIATION.md) for operational limits.
