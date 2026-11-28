#!/usr/bin/env python3
"""Run a real CPU inference smoke test for the optional Pronunciada engine.

This script deliberately has no mock/fallback path: missing weights, a failed
inference, or missing per-word probabilities must make the CI job fail.
"""
from __future__ import annotations

import argparse
import json
import math
from pathlib import Path

from pronunciada import Scorer


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--audio", required=True, type=Path)
    parser.add_argument("--text", required=True)
    args = parser.parse_args()

    if not args.audio.is_file():
        raise SystemExit(f"Audio fixture does not exist: {args.audio}")
    if not args.text.strip():
        raise SystemExit("Reference text must not be empty.")

    # INT8 keeps the CPU-only smoke test small and avoids requiring a GPU.
    scorer = Scorer("en", precision="int8")
    result = scorer.score(str(args.audio), args.text.strip())

    sentence_probability = float(result.prob)
    if not math.isfinite(sentence_probability) or not 0.0 <= sentence_probability <= 1.0:
        raise RuntimeError("Pronunciada returned an invalid sentence probability.")

    words = list(result.words)
    if not words:
        raise RuntimeError("Pronunciada returned no word-level alignment.")

    word_probabilities: list[float] = []
    for index, word in enumerate(words, start=1):
        probability = float(word.prob)
        if not math.isfinite(probability) or not 0.0 <= probability <= 1.0:
            raise RuntimeError(f"Invalid probability for aligned word #{index}.")
        word_probabilities.append(round(probability, 4))

    print(
        json.dumps(
            {
                "engine": "Pronunciada 1.1.1",
                "device": "CPU",
                "precision": "int8",
                "sentence_probability": round(sentence_probability, 4),
                "aligned_word_count": len(word_probabilities),
                "word_probabilities": word_probabilities,
                "inference_verified": True,
                "note": "Synthetic eSpeak audio; runtime smoke test only, not learner-accuracy validation.",
            },
            ensure_ascii=False,
        )
    )


if __name__ == "__main__":
    main()
