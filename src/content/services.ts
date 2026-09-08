export type Service = {
  id: string;
  title: string;
  summary: string;
  examples: string[];
};

export const services: Service[] = [
  {
    id: 'reporting',
    title: 'Dashboards & Business Reporting',
    summary: 'Turn scattered business data into clear reporting you can actually use.',
    examples: [
      'Management dashboards',
      'KPI reporting',
      'Revenue and profitability tracking',
      'Sales or pipeline reporting',
    ],
  },
  {
    id: 'forecasting',
    title: 'Financial Modeling & Forecasting',
    summary:
      'See how pricing, growth, costs, and capacity could affect the business before making the decision.',
    examples: [
      'Financial forecasts',
      'Scenario analysis',
      'Break-even analysis',
      'Budget and planning models',
    ],
  },
  {
    id: 'systems',
    title: 'Spreadsheet Automation & Business Systems',
    summary: 'Reduce repetitive spreadsheet work and make important operating processes easier to manage.',
    examples: [
      'Automated calculations',
      'Linked operating data',
      'Workflow tracking',
      'Alerts and status monitoring',
    ],
  },
];
