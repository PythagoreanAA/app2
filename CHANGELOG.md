# Changelog

## 0.10.0 — UAT Productization
- Added structured final UAT survey: comprehension, perceived result fit, usefulness, trust in method, return intent, strongest value, and biggest friction.
- Added researcher dashboard metrics that keep product acceptance separate from model/predictive evidence.
- Added shared-device handoff: prepare the device for the next tester without deleting historical study records.
- Preserved the established V0.8/V0.9 UAT storage namespace so V0.10 extends existing local records.
- Extended UAT CSV export with final-survey records.
- Added `UAT_DATA_DICTIONARY.md` for reproducible dataset interpretation.
- Added `PILOT_GATES.md` defining build, comprehension, cohort, instrument, and institutional licensing thresholds.
- Updated home flow so completed testers are routed to the final UAT survey before deeper exploration.
- Updated result screen language and versioning; removed stale V0.7/V0.8 interface references.
- Bumped package and Expo metadata to 0.10.0.

## V0.9 RC — UAT Hardening & Distribution
- Restored the canonical Expo project structure under `src/app`, `src/lib`, `src/data`, and `src/components` and removed flattened duplicate source files.
- Blinded BOI answer choices so participants cannot use operator-number cues to steer their result.
- Added assessment-start telemetry for real completion/attrition measurement.
- Strengthened explicit voluntary UAT consent and local-data disclosure.
- Added `UAT_PROTOCOL.md` with acceptance gates for real-person testing.
- Added `UAT_DATA_AND_PRIVACY.md` with prototype data-governance boundaries.
- Added TypeScript and Expo configuration checks through GitHub Actions.
- Added EAS `preview` internal-distribution configuration for stakeholder/tester builds.
- Added standard project hygiene (`.gitignore`, `typecheck` script) and bumped app/package version to 0.9.0.
- Preserved divergence, counterevidence, blinded trials, prospective forecasts, confusion-matrix analysis, and anonymized exports.

## V0.8 RC1 — User Acceptance Testing
- Frozen core operator canon for comparable UAT sessions.
- Three-step first-run onboarding and explicit non-diagnostic framing.
- Anonymous UAT participant codes; no name/email required.
- Persistent UAT session state and completion telemetry.
- Assessment resume support retained; per-question confusion reporting added.
- Result-screen feedback captures wrong/confusing/helpful reactions.
- Research screen now summarizes UAT completion and recent feedback.
- Exportable UAT session + feedback CSV.
- Version language audited to distinguish hypothesis, observation, convergence, and evidence.

## 0.7.0 — Product Experience
- Rebuilt the home screen around three comprehensible paths: Discover, Observe, Test.
- Added a persistent latest behavioral profile so the app feels cumulative between sessions.
- Added a 60-second Quick Anamnesis check-in for low-friction daily observation.
- Added operator detail screens with structure, distortion, Zayin discriminator, rival reading, and direct episode capture.
- Added a Relationship Field for comparing two operators without compatibility percentages or personality reduction.
- Reorganized the Ennead around the three canonical triads: Genesis of Relation, Transformation of Order, Warrant of Becoming.
- Expanded the design system with hero surfaces, operator badges, pills, metrics, progress components, navigation cards, and clearer hierarchy.
- Updated BOI, Anamnesis, Prospective Prediction, and Research Engine surfaces to V0.7 while preserving earlier records.
- Preserved the methodological rule that glyph hypotheses, observed behavior, and prospective forecasts remain distinguishable evidence layers.

## 0.6.0 — Research Engine
- Anonymous participant records, blinded prospective trials, cohort metrics, confusion matrix, birth-glyph/behavior comparison, anonymized CSV export.
- Restored cumulative V0.5 prospective prediction functionality.
