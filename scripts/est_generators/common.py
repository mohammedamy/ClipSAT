import random
import math

def make_est_mcq(domain, text, choices, correct_idx, sol, difficulty="medium", fig=None):
    """
    Format a valid EST MCQ question.
    choices: list of 4 strings (or numbers).
    correct_idx: index 0..3 of the correct choice.
    sol: step-by-step explanation (must be >= 25 chars).
    """
    # ensure choices are strings
    str_choices = [str(c) for c in choices]
    # verify no duplicates
    seen = set()
    for c in str_choices:
        if c in seen:
            raise ValueError(f"Duplicate choice '{c}' in EST question: {text[:50]}")
        seen.add(c)
    
    # ensure correct_idx in 0..3
    if correct_idx < 0 or correct_idx >= len(str_choices):
        raise ValueError(f"Invalid correct_idx {correct_idx} for choices: {str_choices}")

    q = {
        "type": "mcq",
        "domain": domain,
        "text": text,
        "choices": str_choices,
        "answer": correct_idx,
        "sol": sol,
        "difficulty": difficulty
    }
    if fig is not None:
        q["fig"] = fig
    return q

def shuffle_choices(correct_val, distractors):
    """
    Shuffle correct choice with distractors and return (choices_list, correct_index).
    Guarantees 4 unique choices.
    """
    correct_str = str(correct_val)
    unique_distractors = []
    for d in distractors:
        ds = str(d)
        if ds != correct_str and ds not in unique_distractors:
            unique_distractors.append(ds)
        if len(unique_distractors) == 3:
            break
    
    if len(unique_distractors) < 3:
        # Generate generic fallbacks
        base = 1
        while len(unique_distractors) < 3:
            cand = f"\\({base}\\)"
            if cand != correct_str and cand not in unique_distractors:
                unique_distractors.append(cand)
            base += 1

    all_opts = [correct_str] + unique_distractors[:3]
    random.shuffle(all_opts)
    idx = all_opts.index(correct_str)
    return all_opts, idx
