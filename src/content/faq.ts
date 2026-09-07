export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Six questions, in order. Kept as plain answers (no lists, no links) so this
 * doubles directly as FAQPage structured data in `page.tsx` without needing a
 * second, paraphrased copy of the same facts.
 */
export const faq: FaqItem[] = [
  {
    question: 'What kinds of businesses does Cedarline work with?',
    answer:
      'Small businesses that need clearer reporting, forecasting, or internal business systems. The work is especially useful when important information currently lives across disconnected spreadsheets or requires repetitive manual work.',
  },
  {
    question: 'What can Cedarline build?',
    answer:
      'Management dashboards, financial forecasts, scenario models, reporting systems, spreadsheet automations, and other focused business-analysis tools.',
  },
  {
    question: 'Do I need to know exactly what I need?',
    answer:
      'No. A project can begin with the business problem rather than a predetermined solution. Cedarline can help define the scope before work begins.',
  },
  {
    question: 'What software do you work in?',
    answer:
      'Most current engagements are built in Microsoft Excel, depending on the business problem and available data. In some cases, a lightweight website or web-based interface may also make sense when it directly supports the reporting, workflow, or business system being built.',
  },
  {
    question: 'How long does a project take?',
    answer:
      'The Founding Client Offer targets a three-business-day turnaround after the required information and data are received. Larger or differently scoped future engagements may require different timelines.',
  },
  {
    question: 'Are the projects shown on the website real client projects?',
    answer:
      'The current portfolio contains fictional demonstration businesses created specifically to show the kinds of systems Cedarline can build. They are clearly identified as demonstration projects and are not presented as client work.',
  },
];
