export type Problem = {
  title: string;
  body: string;
};

/** Homepage "Most projects start with one of three problems" section. */
export const problems: Problem[] = [
  {
    title: 'The numbers are there. The answer isn’t.',
    body: 'Revenue, costs, jobs, customers, or leads may already be tracked—but finding a clear answer means digging through multiple sheets or rebuilding the same report.',
  },
  {
    title: 'Planning is mostly guesswork.',
    body: 'You know the decisions you need to make, but you don’t have a practical way to see how changes in sales, pricing, costs, or capacity could affect the business.',
  },
  {
    title: 'The spreadsheet takes too much work.',
    body: 'Important processes depend on repetitive updates, copy-and-paste steps, or workbooks that have become harder to maintain as the business has grown.',
  },
];
