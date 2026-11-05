#!/usr/bin/env python3
"""
scripts/ci/verify_bank_sympy.py — CI Gate #2: Deterministic SymPy Symbolic Math Gate

Delegates to scripts/quality_engine/verify_bank_sympy.py (--all by default) to verify:
  - 0 legacy shadow keys ('correct', 'ans', etc.)
  - 0 algebraically or textually duplicate MCQ distractors
  - 100% of active bank items carry an executable sympy_cert matching the keyed answer
    OR a valid SHA-256 educator_review_hash.
"""

from __future__ import annotations
import os
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, os.path.join(ROOT, 'scripts', 'quality_engine'))

import verify_bank_sympy as engine  # noqa: E402


if __name__ == '__main__':
    if len(sys.argv) == 1:
        sys.argv.append('--all')
    rc = engine.main()
    if rc == 0:
        print('✅ CI Gate #2 PASSED: SymPy symbolic verification & review-hash gate succeeded.')
    sys.exit(rc)
