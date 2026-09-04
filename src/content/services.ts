export type Service = {
  id: string;
  index: string;
  title: string;
  summary: string;
  detail: string;
  /** What the client actually receives — shown alongside the service title. */
  deliverable: string;
  capabilities: string[];
};

export const services: Service[] = [
  {
    id: 'reporting',
    index: '01',
    title: 'Dashboards & Business Reporting',
    summary:
      'One place to see how the business is actually performing, updated from your own data instead of assembled by hand each month.',
    detail:
      'Reporting built around the handful of numbers that change decisions — what you sold, what it cost to deliver, and where the month landed against plan.',
    deliverable:
      'Usually a single workbook with a dashboard sheet that recalculates itself whenever the underlying data is updated.',
    capabilities: [
      'KPI dashboards',
      'Monthly management reporting',
      'Revenue and financial reporting',
      'Profitability tracking',
      'Sales and pipeline reporting',
      'Operational performance',
      'Performance versus target',
      'Automated calculations',
    ],
  },
  {
    id: 'forecasting',
    index: '02',
    title: 'Financial Modeling & Forecasting',
    summary:
      'Models that let you test a decision before you make it — pricing, hiring, capacity, or a slower quarter than you planned for.',
    detail:
      'Assumptions live in one place and are clearly labeled, so you can change a number and see what it does to revenue, margin, and cash requirements.',
    deliverable:
      'Usually a model workbook with one assumptions sheet you control, and a dashboard that responds to whatever you change.',
    capabilities: [
      'Revenue and expense forecasts',
      'Annual budgets',
      'Downside / base / upside scenarios',
      'Break-even analysis',
      'Capacity and staffing planning',
      'Seasonality modeling',
      'Pricing analysis',
      'Decision-support models',
    ],
  },
  {
    id: 'systems',
    index: '03',
    title: 'Spreadsheet Automation & Business Systems',
    summary:
      'The recurring spreadsheet work that quietly consumes hours every week, rebuilt so the workbook does the assembling.',
    detail:
      'Fragmented trackers get consolidated, repetitive calculations get automated, and the things that need attention surface on their own.',
    deliverable:
      'Usually a rebuilt workbook with clear entry sheets, calculations that run themselves, and reporting sitting on top.',
    capabilities: [
      'Rebuilding inefficient workbooks',
      'Consolidating fragmented trackers',
      'Automated reporting workflows',
      'Lead and job tracking systems',
      'Job and project profitability',
      'Automated status flags and alerts',
      'Standardized operating workbooks',
      'Excel and Google Sheets',
    ],
  },
];
