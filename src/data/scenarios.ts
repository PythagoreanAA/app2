export type ScenarioOption = {
  operator: number;
  text: string;
};

export type Scenario = {
  id: string;
  domain: 'work' | 'conflict' | 'uncertainty' | 'relationship' | 'failure' | 'opportunity' | 'leadership' | 'completion' | 'identity';
  prompt: string;
  options: ScenarioOption[];
};

/**
 * BOI V0.2 — 36 forced-choice scenarios.
 *
 * Design rule: each of the nine operators appears in exactly 12 option-slots,
 * preventing raw score inflation from unequal exposure. Questions are written
 * so that every response is defensible; the instrument asks which transformation
 * is attempted FIRST, not which value the participant admires most.
 *
 * This is a research prototype, not a validated psychometric instrument.
 */
export const SCENARIOS: Scenario[] = [
  {
    id: 'unclear-mandate', domain: 'leadership',
    prompt: 'A group has energy but no clear mandate. Your first move is to…',
    options: [
      { operator: 1, text: 'Name a direction and establish a point everyone can act from.' },
      { operator: 2, text: 'Separate the competing aims before anyone commits.' },
      { operator: 4, text: 'Define roles, limits, and a structure for deciding.' },
    ],
  },
  {
    id: 'tense-disagreement', domain: 'conflict',
    prompt: 'A disagreement is growing because people keep talking past one another. You first…',
    options: [
      { operator: 2, text: 'Clarify the exact difference each side is defending.' },
      { operator: 3, text: 'Create a new relation or language that lets the sides meet.' },
      { operator: 5, text: 'Break the stale pattern by trying a route outside the usual exchange.' },
    ],
  },
  {
    id: 'fragile-collaboration', domain: 'relationship',
    prompt: 'A useful collaboration is becoming unstable. Your first concern is to…',
    options: [
      { operator: 3, text: 'Reconnect the people or parts that have stopped relating well.' },
      { operator: 4, text: 'Clarify the boundaries and commitments holding the collaboration together.' },
      { operator: 6, text: 'Repair the damaged whole without erasing legitimate differences.' },
    ],
  },
  {
    id: 'rule-failing', domain: 'work',
    prompt: 'A rule that once helped now creates obvious friction. You tend first to…',
    options: [
      { operator: 4, text: 'Examine whether the rule can be tightened or reframed.' },
      { operator: 5, text: 'Cross the rule where necessary and test an alternative.' },
      { operator: 7, text: 'Interrogate the assumption that the rule deserves to survive at all.' },
    ],
  },
  {
    id: 'fragmented-project', domain: 'failure',
    prompt: 'A project has split into too many competing pieces. Your first instinct is to…',
    options: [
      { operator: 5, text: 'Open a new path rather than force the pieces back into the old plan.' },
      { operator: 6, text: 'Reintegrate the useful pieces into a coherent whole.' },
      { operator: 8, text: 'Concentrate resources behind the pieces with the greatest leverage.' },
    ],
  },
  {
    id: 'almost-coherent', domain: 'completion',
    prompt: 'A solution mostly works, but one unresolved tension remains. You first…',
    options: [
      { operator: 6, text: 'Repair the remaining fracture so the whole can hold.' },
      { operator: 7, text: 'Test whether the apparent coherence survives hard scrutiny.' },
      { operator: 9, text: 'Determine what final consequence must be accepted to finish the matter.' },
    ],
  },
  {
    id: 'untested-success', domain: 'opportunity',
    prompt: 'An idea is succeeding quickly before anyone fully understands why. You first want to…',
    options: [
      { operator: 7, text: 'Stress-test the claim before trusting the success.' },
      { operator: 8, text: 'Scale what is working while the opportunity is alive.' },
      { operator: 1, text: 'Establish the governing direction before momentum decides it for you.' },
    ],
  },
  {
    id: 'growth-choice', domain: 'opportunity',
    prompt: 'You can expand something successful, but expansion will create new obligations. You first ask…',
    options: [
      { operator: 8, text: 'How much capability or reach can this realistically gain?' },
      { operator: 9, text: 'What consequences will this expansion eventually force us to carry?' },
      { operator: 2, text: 'Which obligations belong to the opportunity and which do not?' },
    ],
  },
  {
    id: 'ending-uncertain', domain: 'completion',
    prompt: 'A long chapter may be finished, but nobody wants to name the ending. You first…',
    options: [
      { operator: 9, text: 'Bring the trajectory to a definite conclusion and accept its result.' },
      { operator: 1, text: 'State the next position so movement can begin again.' },
      { operator: 3, text: 'Create a transition that relates what is ending to what comes next.' },
    ],
  },

  {
    id: 'silent-room', domain: 'leadership',
    prompt: 'Everyone is waiting for someone else to begin. Your natural first move is to…',
    options: [
      { operator: 1, text: 'Place the first proposal on the table and give the room a starting point.' },
      { operator: 3, text: 'Invite a connection between the people who hold different pieces.' },
      { operator: 6, text: 'Gather what is already present into a workable shared whole.' },
    ],
  },
  {
    id: 'mixed-signal', domain: 'uncertainty',
    prompt: 'The evidence is mixed and everyone is drawing different conclusions. You first…',
    options: [
      { operator: 2, text: 'Separate the evidence into meaningful distinctions.' },
      { operator: 4, text: 'Set criteria that define what counts as a valid conclusion.' },
      { operator: 7, text: 'Attack the strongest conclusion and see whether it survives.' },
    ],
  },
  {
    id: 'new-connection', domain: 'opportunity',
    prompt: 'Two ideas from different fields suddenly seem connected. Your first impulse is to…',
    options: [
      { operator: 3, text: 'Develop the relation and see what the connection makes possible.' },
      { operator: 5, text: 'Use the connection to escape the assumptions of both original fields.' },
      { operator: 8, text: 'Ask whether the connection can multiply reach, power, or usefulness.' },
    ],
  },
  {
    id: 'team-recovery', domain: 'failure',
    prompt: 'A team has survived a difficult failure and must decide what comes next. You first…',
    options: [
      { operator: 4, text: 'Re-establish dependable roles and operating boundaries.' },
      { operator: 6, text: 'Repair trust and reintegrate what the failure divided.' },
      { operator: 9, text: 'Close the failed chapter clearly before beginning another.' },
    ],
  },
  {
    id: 'blocked-route', domain: 'work',
    prompt: 'The accepted route to your goal is blocked. Your first tendency is to…',
    options: [
      { operator: 5, text: 'Find a way across, around, or outside the blockage.' },
      { operator: 7, text: 'Question whether the accepted route was ever necessary.' },
      { operator: 1, text: 'Establish a new direction and commit to it.' },
    ],
  },
  {
    id: 'damaged-trust', domain: 'relationship',
    prompt: 'Trust has been damaged, but the relationship still matters. You first focus on…',
    options: [
      { operator: 6, text: 'What must be repaired for the relationship to become whole enough to continue.' },
      { operator: 8, text: 'What concrete capacity or support is needed to make repair possible.' },
      { operator: 2, text: 'What exactly was violated and what was not.' },
    ],
  },
  {
    id: 'near-finish', domain: 'completion',
    prompt: 'A difficult undertaking is nearly complete. Before declaring victory, you want to…',
    options: [
      { operator: 7, text: 'Test the result for hidden weakness.' },
      { operator: 9, text: 'Carry the undertaking through its final consequence and close it.' },
      { operator: 3, text: 'Connect the result to the people or context it now needs to enter.' },
    ],
  },
  {
    id: 'resource-surge', domain: 'leadership',
    prompt: 'You suddenly receive far more resources than expected. Your first concern is to…',
    options: [
      { operator: 8, text: 'Convert the new capacity into meaningful scale.' },
      { operator: 1, text: 'Set the direction so the resources serve a definite aim.' },
      { operator: 4, text: 'Create controls and boundaries before scale creates disorder.' },
    ],
  },
  {
    id: 'finished-but-lingering', domain: 'identity',
    prompt: 'Something is technically over, but you keep carrying it psychologically. You first need to…',
    options: [
      { operator: 9, text: 'Accept the consequence, release the completed trajectory, and let it end.' },
      { operator: 2, text: 'Distinguish what still belongs to you from what no longer does.' },
      { operator: 5, text: 'Cross into a different pattern before the old one re-forms.' },
    ],
  },

  {
    id: 'competing-futures', domain: 'uncertainty',
    prompt: 'Several futures are possible and none is guaranteed. Your first move is to…',
    options: [
      { operator: 1, text: 'Choose a position and make one future more real through commitment.' },
      { operator: 5, text: 'Enter the most revealing alternative and learn by crossing into it.' },
      { operator: 8, text: 'Identify which future could compound capability most strongly.' },
    ],
  },
  {
    id: 'ethical-disagreement', domain: 'conflict',
    prompt: 'People agree on the facts but disagree about what ought to be done. You first…',
    options: [
      { operator: 2, text: 'Make the value distinction explicit so the real disagreement is visible.' },
      { operator: 6, text: 'Search for a resolution that preserves what is valid on both sides.' },
      { operator: 9, text: 'Ask which choice can actually be carried through to an acceptable consequence.' },
    ],
  },
  {
    id: 'conversation-stalled', domain: 'relationship',
    prompt: 'A conversation has become circular and nothing new is emerging. You first…',
    options: [
      { operator: 3, text: 'Introduce a relation or perspective that changes how the parts connect.' },
      { operator: 7, text: 'Question the premise that keeps regenerating the same conversation.' },
      { operator: 1, text: 'State a definite position so the conversation has something firm to meet.' },
    ],
  },
  {
    id: 'rapid-growth-chaos', domain: 'work',
    prompt: 'Rapid growth is creating confusion faster than people can adapt. You first…',
    options: [
      { operator: 4, text: 'Create boundaries, roles, and repeatable structure.' },
      { operator: 8, text: 'Increase capacity where the bottlenecks are limiting scale.' },
      { operator: 2, text: 'Separate the different kinds of confusion before solving them.' },
    ],
  },
  {
    id: 'old-identity', domain: 'identity',
    prompt: 'An identity that once protected you is now restricting you. Your first impulse is to…',
    options: [
      { operator: 5, text: 'Cross the boundary of the old identity and behave beyond it.' },
      { operator: 9, text: 'Let the old identity complete its work and consciously end it.' },
      { operator: 3, text: 'Relate the old identity to the emerging one so the transition is intelligible.' },
    ],
  },
  {
    id: 'repair-or-restart', domain: 'failure',
    prompt: 'Something valuable is damaged badly enough that starting over would be easier. You first…',
    options: [
      { operator: 6, text: 'Determine whether the damaged parts can be restored into a viable whole.' },
      { operator: 1, text: 'Establish a clean new beginning rather than remain governed by the damage.' },
      { operator: 4, text: 'Rebuild the structure that should prevent the damage from recurring.' },
    ],
  },
  {
    id: 'popular-claim', domain: 'uncertainty',
    prompt: 'A claim is widely accepted and socially costly to question. You first…',
    options: [
      { operator: 7, text: 'Test the claim precisely because consensus can hide weakness.' },
      { operator: 2, text: 'Distinguish the claim itself from the social identities attached to it.' },
      { operator: 5, text: 'Step outside the accepted frame to see what alternatives become visible.' },
    ],
  },
  {
    id: 'strong-product', domain: 'opportunity',
    prompt: 'A small project has become unusually effective. Your first instinct is to…',
    options: [
      { operator: 8, text: 'Amplify what survived and discover how far it can scale.' },
      { operator: 3, text: 'Connect it with the people, systems, or contexts that can use it.' },
      { operator: 6, text: 'Strengthen the whole so growth does not destroy its coherence.' },
    ],
  },
  {
    id: 'deadline-with-flaw', domain: 'completion',
    prompt: 'A deadline has arrived, but the work still contains a meaningful flaw. You first…',
    options: [
      { operator: 9, text: 'Decide what consequence can be accepted and complete the run.' },
      { operator: 4, text: 'Protect the standard and refuse completion until the requirement is met.' },
      { operator: 7, text: 'Test whether the flaw actually invalidates the result.' },
    ],
  },

  {
    id: 'authority-vacuum', domain: 'leadership',
    prompt: 'A decision must be made, but no one clearly owns it. You first…',
    options: [
      { operator: 1, text: 'Take responsibility for establishing a decision.' },
      { operator: 4, text: 'Clarify who has authority and what the decision boundary is.' },
      { operator: 7, text: 'Test whether the decision is being framed correctly before assigning ownership.' },
    ],
  },
  {
    id: 'ambiguous-boundary', domain: 'relationship',
    prompt: 'Someone repeatedly approaches a boundary neither of you has clearly defined. You first…',
    options: [
      { operator: 2, text: 'Distinguish what feels acceptable from what does not.' },
      { operator: 5, text: 'Explore beyond the old assumption to learn where the real boundary lies.' },
      { operator: 8, text: 'Strengthen your capacity to enforce whichever boundary proves necessary.' },
    ],
  },
  {
    id: 'public-misunderstanding', domain: 'conflict',
    prompt: 'Your work is being publicly misunderstood. Your first response is to…',
    options: [
      { operator: 3, text: 'Build a clearer bridge between your meaning and the audience.' },
      { operator: 6, text: 'Repair the damaged relationship between the work and the people receiving it.' },
      { operator: 9, text: 'Decide what misunderstanding must simply be accepted as a consequence of finishing the work publicly.' },
    ],
  },
  {
    id: 'procedure-versus-truth', domain: 'work',
    prompt: 'A procedure is being followed correctly but producing an obviously wrong outcome. You first…',
    options: [
      { operator: 4, text: 'Rework the procedure so the structure produces the intended result.' },
      { operator: 7, text: 'Interrogate the premise that makes the wrong outcome look procedurally correct.' },
      { operator: 1, text: 'Establish the correct outcome as the governing point and act from it.' },
    ],
  },
  {
    id: 'sudden-opening', domain: 'opportunity',
    prompt: 'A rare opening appears and may disappear quickly. You first…',
    options: [
      { operator: 5, text: 'Cross into it before the old structure closes around you again.' },
      { operator: 8, text: 'Use the opening to gain disproportionate reach or capacity.' },
      { operator: 2, text: 'Distinguish a genuine opening from urgency disguised as opportunity.' },
    ],
  },
  {
    id: 'family-fracture', domain: 'relationship',
    prompt: 'A family conflict has hardened into separate camps. You first…',
    options: [
      { operator: 6, text: 'Seek a form of repair that can hold the differences without pretending they vanished.' },
      { operator: 9, text: 'Ask whether some part of the relationship must be allowed to end.' },
      { operator: 3, text: 'Create a channel of relation where none currently exists.' },
    ],
  },
  {
    id: 'mentor-challenge', domain: 'identity',
    prompt: 'A respected teacher makes a claim that conflicts with your own observation. You first…',
    options: [
      { operator: 7, text: 'Test the claim independently, even if the teacher is usually right.' },
      { operator: 1, text: 'Stand in the position your own observation currently supports.' },
      { operator: 4, text: 'Clarify the standard of evidence that should govern both claims.' },
    ],
  },
  {
    id: 'pressure-to-expand', domain: 'leadership',
    prompt: 'Others want you to expand faster than you think is wise. You first…',
    options: [
      { operator: 8, text: 'Measure whether the underlying capacity can support greater scale.' },
      { operator: 2, text: 'Separate real demand from social pressure and excitement.' },
      { operator: 5, text: 'Experiment beyond the current limit without committing the whole system.' },
    ],
  },
  {
    id: 'last-ten-percent', domain: 'completion',
    prompt: 'The final ten percent of a project is tedious and no longer exciting. You first…',
    options: [
      { operator: 9, text: 'Carry the trajectory through to its consequence because completion matters.' },
      { operator: 3, text: 'Reconnect the remaining work to the people or purpose it serves.' },
      { operator: 6, text: 'Integrate the unfinished pieces so the whole is genuinely complete.' },
    ],
  },
];

export const OPERATOR_EXPOSURE = SCENARIOS.reduce<Record<number, number>>((acc, scenario) => {
  scenario.options.forEach(({ operator }) => {
    acc[operator] = (acc[operator] || 0) + 1;
  });
  return acc;
}, {});
