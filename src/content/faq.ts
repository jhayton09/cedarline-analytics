export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Homepage FAQ — eight questions. Kept as plain answers (no lists, no links)
 * so this doubles directly as FAQPage structured data in `page.tsx` without
 * a second, paraphrased copy of the same facts.
 */
export const homeFaq: FaqItem[] = [
  {
    question: 'Will this work with the spreadsheets I already use?',
    answer:
      'Usually, yes. Cedarline can often build around your existing Excel files and current workflow rather than forcing you to start over. If the current structure is too limiting, that will be identified before the project begins.',
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
    question: 'Do I need to know exactly what I want built?',
    answer:
      'No. You can start with the problem. Cedarline will help define the appropriate reporting, forecasting, or spreadsheet-system solution before the scope is agreed. Most current work is built in Microsoft Excel. In some cases, a lightweight website or web-based interface may also make sense when it directly supports the reporting, workflow, or system being built.',
  },
  {
    question: 'How long does a project take?',
    answer:
      'The Founding Client Offer targets a three-business-day turnaround after the required information and data are received. Larger or differently scoped future projects may require more time.',
  },
  {
    question: 'Why is the Founding Client price only $150?',
    answer:
      'Cedarline is offering a limited introductory price to its first three paying clients while building its initial client base and refining the delivery process. The scope, payment terms, and deliverable are agreed before work begins.',
  },
  {
    question: 'What happens if the finished system doesn’t do what we agreed?',
    answer:
      'If the deliverable does not perform the functionality agreed before the project begins, Cedarline will correct it at no additional charge.',
  },
  {
    question: 'Are the examples on this site real client projects?',
    answer:
      'The current portfolio uses fictional demonstration businesses built specifically to show the kinds of systems Cedarline can create. They are clearly identified as demonstration projects and are not presented as client work.',
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
