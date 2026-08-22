# PAA V0.10 UAT Data Dictionary

This document defines the fields produced by the UAT and research exports. It exists so a reviewer can interpret the dataset without relying on oral explanation from the creator.

## UAT session records
- `participant_code`: anonymous study code; never use a name or contact detail.
- `session_id`: generated local identifier for one UAT run.
- `started_at` / `completed_at`: ISO timestamps for the guided core flow.
- `assessment_started` / `assessment_completed`: flow-state flags used for attrition and completion analysis.
- `survey_completed`: whether the post-reading product survey was submitted.
- `birth_root`: numerical hypothesis used by the core reading, when supplied.
- `observed_operator`: highest BOI behavioral signal after the blinded assessment.
- `clarity`: descriptive separation of the leading BOI signal from rivals.

## UAT feedback records
- `screen`: screen/question context where feedback was submitted.
- `feedback_kind`: confusing, bug, wrong, helpful, or other.
- `feedback_message`: tester-authored qualitative observation.
- `feedback_at`: ISO timestamp.

## Final UAT survey records
All ratings are 1–5 and evaluate the product experience, not scientific validity.
- `comprehension`: how clearly the tester understood the method/result.
- `result_fit`: how well the result seemed to describe the tester's behavior.
- `usefulness`: perceived practical value.
- `trust_in_method`: confidence in the transparency/fairness of how the app reached the result.
- `would_use_again`: voluntary return intent.
- `strongest_value`: free-text statement of distinctive value.
- `biggest_friction`: free-text statement of confusion, tedium, disbelief, or weakness.

## Research trial records
Prospective prediction records must preserve the prediction before the outcome.
- participant code / participant id
- prediction source
- predicted operator
- rival operator where recorded
- confidence
- blinded flag
- prediction timestamp
- observed operator after resolution
- resolution timestamp

## Interpretation rule
Do not combine product acceptance and predictive/model accuracy into one score. A product may be highly usable and wrong; an experimental signal may be interesting and poorly communicated. V0.10 deliberately keeps those questions separate.
