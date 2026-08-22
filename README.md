# PAA V0.9 RC — User Acceptance Test

Pythagorean Arithmosophic Anamnesis (PAA) is a cross-platform Expo / React Native research prototype that treats number 1–9 as an operational grammar and tests numerical hypotheses against observed human behavior.

## Core experience

**Discover** — calculate a birth-root hypothesis and compare it with the balanced 36-item Behavioral Operator Instrument.

**Observe** — record lived behavior through Quick Anamnesis or the five-slot record: CONDITION → OBJECT → ACTION → TRANSFORMATION → RESULT.

**Test** — commit a prospective operator prediction before an event resolves, freeze it, then score the observed result without rewriting the forecast.

## V0.9 UAT hardening

- Restored canonical project structure under `src/app`, `src/lib`, `src/data`, and `src/components`.
- Blinded BOI answer choices so operator numbers cannot cue responses.
- Added assessment-start telemetry for completion/attrition measurement.
- Strengthened explicit UAT consent and local-data disclosure.
- Added formal UAT protocol and data/privacy documentation.
- Added automated TypeScript and Expo configuration checks for pull requests.
- Added EAS preview configuration for production-like internal tester builds.
- Preserved research features: participant codes, blinded trials, accuracy metrics, 9×9 confusion matrix, and anonymized CSV export.

## Run locally

```bash
npm install
npx expo start
```

On Windows PowerShell systems that block npm.ps1:

```powershell
npm.cmd install
npx.cmd expo start
```

## Validate before UAT

```bash
npm run typecheck
npx expo config --type public
```

## Build a tester preview

After signing in to Expo/EAS and configuring credentials:

```bash
npx eas build --profile preview --platform android
npx eas build --profile preview --platform ios
```

The `preview` profile uses internal distribution for stakeholder/UAT testing. iOS internal distribution requires appropriate Apple provisioning/device registration.

## Epistemic status

PAA V0.9 RC is an experimental interpretive and research framework, not a clinical, diagnostic, medical, employment-screening, or validated psychological instrument. Numerical glyphs generate hypotheses; behavioral records and prospective tests remain distinct evidence layers. Divergence and negative results are retained rather than explained away.

See `UAT_PROTOCOL.md` and `UAT_DATA_AND_PRIVACY.md` before testing with real participants.
