# V0.10 QA Checklist

Before merging or distributing V0.10:

- [ ] `npm install` succeeds from a clean checkout.
- [ ] `npm run typecheck` passes.
- [ ] `npx expo config --type public` resolves.
- [ ] Expo launches on a physical device.
- [ ] New tester can complete onboarding and consent.
- [ ] BOI choices show letters only, never operator numbers.
- [ ] Interrupted BOI resumes correctly.
- [ ] Profile result completes and routes to the final UAT survey.
- [ ] Final UAT survey requires all four ratings and return intent.
- [ ] Researcher dashboard displays submitted survey metrics.
- [ ] UAT CSV export contains session, feedback, and survey rows.
- [ ] Prepare-device reset returns to onboarding and removes prior current-session/profile cues.
- [ ] Historical cohort records remain after prepare-device reset.
- [ ] Prospective prediction and research-trial flows still function.
- [ ] No blocker crash in Discover, Observe, Test, Feedback, Researcher View, or shared-device reset.
