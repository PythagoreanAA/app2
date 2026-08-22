# PAA App — V0.4 Zayin/Xiphos Research Prototype

A React Native + Expo prototype for **Pythagorean Arithmosophic Anamnesis (PAA)**.

The governing rule is:

> Number generates a behavioral hypothesis. Behavior supplies evidence. Counterevidence is allowed to defeat the hypothesis.

## V0.4 core loop

1. Calculate a birth-root glyph.
2. Explore the nine operational hypotheses.
3. Complete the balanced 36-item Behavioral Operator Instrument (BOI).
4. Compare numerical prediction with forced-choice behavior.
5. Record lived episodes as:
   `CONDITION → OBJECT → ACTION → TRANSFORMATION → RESULT`
6. Tag each episode by behavioral domain.
7. Choose a **primary operator** and the strongest **competing operator**.
8. Optionally test an emerging operator hypothesis and mark the episode as **supports / contradicts / ambiguous**.
9. Review longitudinal operator frequency, context dependence, classification friction, and an explicit counterevidence ledger.

## What V0.4 adds

- **Domain tagging** so context cannot silently impersonate character.
- **Competing classifications** so every interpretation can face a serious rival.
- **Counterevidence ledger** that preserves contradictions rather than explaining them away.
- **Classification-friction analysis** showing which operator pairs are repeatedly confused.
- **Cross-domain signal view** showing whether an operator recurs beyond one environment.
- Automatic migration of local V0.3 episode records into the V0.4 data shape.

## Epistemic status

This is a research prototype, **not a validated psychological, clinical, diagnostic, employment-selection, or medical instrument**. Scores are descriptive signals. Reliability, inter-rater classification, test–retest stability, construct discrimination, predictive validity, and calibration remain empirical questions.

A PAA claim becomes stronger only when it survives:

- independent behavioral observation,
- serious competing interpretations,
- counterexamples,
- multiple contexts,
- and prospective testing.

## Run locally

```bash
npm install
npx expo start
```

Then open in Expo Go or launch the iOS/Android simulator through Expo tooling.

## Main files

- `src/data/operators.ts` — 1–9 operator canon used by the prototype.
- `src/data/scenarios.ts` — balanced 36-item BOI scenario bank.
- `src/lib/boi.ts` — scenario scoring.
- `src/lib/episodes.ts` — persistent behavioral records + V0.4 analyses.
- `src/app/episode.tsx` — actual episode capture / Zayin-Xiphos classification.
- `src/app/episodes.tsx` — longitudinal Anamnesis record.
- `src/app/profile.tsx` — birth glyph vs forced-choice convergence reading.

## Next research threshold

V0.5 should add **prospective prediction**: before an event or decision, PAA records which operator it predicts will appear, then compares that prediction with the later observed transformation. Retrospective fitting is easy; prediction is the harder blade.
