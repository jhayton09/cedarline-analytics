/**
 * Shared facts behind the Founding Client Offer — used by both the homepage
 * section and the /founding-offer landing page so the terms can't drift
 * between the two.
 */
export const offer = {
  price: '$150 total',
  paymentSplit: '$75 to begin · $75 upon completion',
  clientsAvailable: 'Available to Cedarline’s first three paying clients.',
  scopeExplanation:
    'We’ll identify one reporting, forecasting, or spreadsheet-system problem and agree on the scope before work begins.',
  included: [
    'One focused deliverable',
    'Target turnaround: 3 business days after required information is received',
    'One reasonable revision',
    '5–10 minute walkthrough',
    '7 days of email support',
  ],
  functionalityCommitmentHeading: 'Functionality commitment',
  functionalityCommitment:
    'If the finished deliverable does not perform the functionality agreed before the project begins, Cedarline will correct it at no additional charge.',
  /**
   * Homepage teaser only — the exact wording given for that compact section.
   * Kept separate from `paymentSplit` above (used by /founding-offer, which
   * this pass leaves untouched) so the two sections' copy can't drift into
   * each other by editing one shared string.
   */
  teaserPaymentSplit: '$75 to begin · $75 on completion',
  teaserInclusion:
    'Includes one focused deliverable, one reasonable revision, a walkthrough, and 7 days of email support.',
} as const;

/** /founding-offer "What You Get" — worded slightly more specifically than the homepage's Included list. */
export const offerPageIncluded = [
  'One agreed reporting, forecasting, or spreadsheet-system deliverable',
  'Target completion within 3 business days after required information is received',
  'One reasonable revision',
  '5–10 minute walkthrough',
  '7 days of email support',
];

export const goodFit = [
  'Monthly reporting takes too much manual work',
  'Important information lives across multiple spreadsheets',
  'You need a practical forecast or scenario model',
  'A spreadsheet process has become difficult to maintain',
  'You need clearer visibility into jobs, revenue, costs, customers, or leads',
];

export const notFit = [
  'Bookkeeping or tax preparation',
  'Accounting or audit services',
  'Personalized investment advice',
  'Large custom software applications',
  'Major website-development projects',
  'Projects without a reasonably defined business problem',
];
