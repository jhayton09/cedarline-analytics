export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Homepage FAQ — four questions only. The full objection inventory (the
 * previous eight-question set) now lives on /founding-offer as `offerFaq`;
 * this shorter list still doubles as FAQPage structured data in `page.tsx`.
 */
export const homeFaq: FaqItem[] = [
  {
    question: 'Do I need to know exactly what I want built?',
    answer:
      'No. You can start with the problem. Cedarline will help define the appropriate reporting, forecasting, or spreadsheet-system solution before the scope is agreed.',
  },
  {
    question: 'What if my data is messy or incomplete?',
    answer:
      'That’s common. Cedarline can help organize the information you already have and identify what is usable, what is missing, and what needs to be cleaned up before building the final system.',
  },
  {
    question: 'How much work will this require from me?',
    answer:
      'The goal is to keep your part simple. You’ll typically need to explain the problem, provide the relevant files or information, and review the finished deliverable.',
  },
  {
    question: 'Why is the Founding Client price only $150?',
    answer:
      'Cedarline is offering a limited introductory price to its first three paying clients while building its initial client base and refining the delivery process. The scope, payment terms, and deliverable are agreed before work begins.',
  },
];

/** /founding-offer landing-page FAQ — a shorter, cold-traffic-focused subset. */
export const offerFaq: FaqItem[] = [
  {
    question: 'Why is the price only $150?',
    answer:
      'Cedarline is offering a limited introductory price to its first three paying clients while building its initial client base and refining the delivery process. The deliverable and scope are still agreed before work begins.',
  },
  {
    question: 'Do I need to know exactly what I want?',
    answer:
      'No. Start with the business problem. Cedarline can help determine the appropriate reporting, forecasting, or spreadsheet-system solution before the scope is finalized.',
  },
  {
    question: 'What if my spreadsheets or data are messy?',
    answer:
      'That’s common. Cedarline will identify what is usable, what needs cleanup, and whether the available information is sufficient before committing to the build.',
  },
  {
    question: 'How much work will this require from me?',
    answer:
      'You’ll generally need to explain the problem, provide the relevant files or information, and review the finished deliverable.',
  },
  {
    question: 'What happens if the project is bigger than the Founding Offer?',
    answer:
      'Cedarline will identify that before work begins rather than forcing a larger project into the $150 scope. You can then decide whether to proceed under a separately agreed scope.',
  },
  {
    question: 'Are the examples real client projects?',
    answer:
      'No. The current examples use fictional demonstration businesses created to show the kinds of systems Cedarline can build. They are not presented as client work.',
  },
];
