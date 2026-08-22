# PAA UAT Data & Privacy

## Purpose
This release is for user-acceptance and instrument-behavior testing. It is not a clinical, diagnostic, medical, employment-screening, or validated psychological product.

## Data collected in the current build
- anonymous tester code supplied by the researcher/tester;
- birth-root value when the tester chooses to calculate it;
- BOI response-derived operator scores;
- Anamnesis episode text entered by the tester;
- prospective prediction/trial records;
- in-app feedback;
- local completion timestamps and UAT status.

## Storage
The current prototype stores records locally on the device with AsyncStorage. It does not include a production account system or server-side database. Export occurs only when a user/researcher deliberately invokes an export/share action.

## UAT rules
- Do not use names, email addresses, phone numbers, addresses, employee IDs, or other identifying information as participant codes.
- Do not collect sensitive personal narratives that are unnecessary to the study purpose.
- Tell testers before testing what will be recorded and how exports will be handled.
- Keep exported datasets access-controlled and separated from any external identity key.
- Delete test data when it is no longer needed.

## Before commercial release
A production release must add a formal privacy policy, retention/deletion controls, production data architecture review, security review, store privacy disclosures, and any consent requirements appropriate to the target market and use case.
