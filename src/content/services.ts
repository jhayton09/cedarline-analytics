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
    summary: 'Clear reporting from the data your business already produces.',
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
      'Understand how changes in pricing, growth, costs, or capacity could affect the business.',
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
    summary: 'Reduce repetitive work and fragile spreadsheet processes.',
    examples: [
      'Automated calculations',
      'Linked operating data',
      'Workflow tracking',
      'Alerts and status monitoring',
    ],
  },
];
