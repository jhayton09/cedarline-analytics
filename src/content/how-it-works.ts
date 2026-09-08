export type Step = {
  title: string;
  body: string;
};

/** Homepage "From business problem to working system in three steps." */
export const homeSteps: Step[] = [
  {
    title: 'Show me the problem',
    body: 'Tell me what you’re trying to understand, forecast, or stop doing manually.',
  },
  {
    title: 'Agree on the solution',
    body: 'We define the deliverable, scope, data needed, price, and timeline before work begins.',
  },
  {
    title: 'Build & hand over',
    body: 'I build the system, walk you through it, make the included revision, and support you afterward.',
  },
];

/** /founding-offer "How it works" — same three-step shape, third-person wording for a cold-traffic landing page. */
export const offerSteps: Step[] = [
  {
    title: 'Show me the problem',
    body: 'Tell Cedarline what you need to understand, forecast, or stop doing manually.',
  },
  {
    title: 'Agree on the scope',
    body: 'The deliverable, information needed, price, and timeline are confirmed before work begins.',
  },
  {
    title: 'Get the finished system',
    body: 'Cedarline builds it, walks you through it, handles the included revision, and provides support afterward.',
  },
];
