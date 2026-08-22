export type Operator = {
  n: number;
  verb: string;
  title: string;
  movement: string;
  strength: string;
  distortion: string;
  question: string;
};

export const OPERATORS: Operator[] = [
  { n: 1, verb: 'POSIT', title: 'The Initiating Term', movement: 'possibility → position', strength: 'Establishes direction where none yet exists.', distortion: 'Imposes a position before the field is understood.', question: 'What must be placed before anything else can happen?' },
  { n: 2, verb: 'DISTINGUISH', title: 'The Edge', movement: 'term → difference', strength: 'Detects meaningful difference and makes choice possible.', distortion: 'Divides what should remain related.', question: 'What difference actually matters here?' },
  { n: 3, verb: 'RELATE', title: 'The Mediating Third', movement: 'difference → relation', strength: 'Connects terms without erasing their difference.', distortion: 'Creates relation without sufficient distinction.', question: 'What becomes possible when these terms are related?' },
  { n: 4, verb: 'BOUND', title: 'The Frame', movement: 'relation → structure', strength: 'Creates durable order, limits, roles, and form.', distortion: 'Treats the frame as more important than what it serves.', question: 'What boundary makes this coherent?' },
  { n: 5, verb: 'BREACH', title: 'The Crossing', movement: 'structure → alternative', strength: 'Finds the opening beyond an exhausted frame.', distortion: 'Crosses merely because a boundary exists.', question: 'Is this limit protective, obsolete, or imprisoning?' },
  { n: 6, verb: 'RESTORE', title: 'The Reintegrator', movement: 'plurality → coherence', strength: 'Repairs fragmentation without pretending difference never happened.', distortion: 'Forces harmony prematurely.', question: 'What must be brought back into workable relation?' },
  { n: 7, verb: 'TEST', title: 'The Examiner', movement: 'coherence → warranted claim', strength: 'Subjects claims to pressure before trusting them.', distortion: 'Confuses suspicion with examination.', question: 'What evidence would make this claim survive—or fail?' },
  { n: 8, verb: 'MAGNIFY', title: 'The Amplifier', movement: 'warrant → scale', strength: 'Adds force, capacity, reach, and consequence.', distortion: 'Amplifies what has not earned amplification.', question: 'What deserves more force—and what does not?' },
  { n: 9, verb: 'CULMINATE', title: 'The Consequence', movement: 'trajectory → result', strength: 'Carries a process through to its actual outcome.', distortion: 'Mistakes exhaustion for completion.', question: 'What is the real consequence if this continues?' }
];
