# PAA V0.10 — User Acceptance Test Release Candidate

Pythagorean Arithmosophic Anamnesis (PAA) is a cross-platform Expo / React Native research prototype that treats number 1–9 as an operational grammar and tests numerical hypotheses against observed human behavior.

## Core experience

**Discover** — calculate a birth-root hypothesis, complete a blinded 36-item Behavioral Operator Instrument, and compare numerical hypothesis with observed behavioral signal.

**Observe** — record lived behavior through Quick Anamnesis or the rigorous five-slot record:

CONDITION → OBJECT → ACTION → TRANSFORMATION → RESULT

**Test** — commit a prospective operator prediction before an event resolves, freeze it, then compare it with the observed result without rewriting the forecast.

## V0.10 UAT productization

- Structured post-test UAT survey measuring comprehension, perceived result fit, usefulness, trust in method, and voluntary return intent.
- Researcher dashboard separates product-acceptance metrics from model-evidence metrics.
- Shared-device tester reset clears current-session cues while preserving historical study records.
- BOI answer choices remain blinded to operator identity during response selection.
- Existing V0.8/V0.9 UAT records remain readable; V0.10 extends rather than discards the local study history.
- UAT CSV now includes final survey records.
- Added UAT data dictionary and explicit pilot/licensing gates.
- Retains V0.9 build hardening: canonical `src` structure, typecheck command, CI workflow, privacy/UAT documentation, and EAS preview profile.

## Run locally

```bash
npm install
npm run typecheck
npx expo start
```

On Windows PowerShell systems that block npm.ps1:

```powershell
npm.cmd install
npm.cmd run typecheck
npx.cmd expo start
```

Scan the QR code with Expo Go for development testing, or use the configured EAS `preview` profile for internal-distribution builds.

## UAT rule

Do not teach testers which answer corresponds to which operator before they complete the BOI. Do not coach toward agreement. Record confusion, disagreement, abandonment, and negative reactions as evidence rather than noise.

## Epistemic status

PAA V0.10 is an experimental interpretive and research framework, not a clinical, diagnostic, medical, employment-screening, or validated psychological instrument. Numerical glyphs generate hypotheses; BOI signals, lived observations, prospective predictions, and product-acceptance ratings remain distinct evidence layers.

See `UAT_PROTOCOL.md`, `UAT_DATA_AND_PRIVACY.md`, `UAT_DATA_DICTIONARY.md`, `PILOT_GATES.md`, and `COMMERCIALIZATION_GATES.md` before broader testing or institutional use.
