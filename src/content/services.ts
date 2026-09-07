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
      'Reporting built around the handful of numbers that change decisions — revenue, cost to deliver, and performance against plan.',
    deliverable:
      'Usually a single workbook with a dashboard sheet that recalculates itself whenever the underlying data is updated.',
    capabilities: [
      'KPI dashboards',
      'Monthly management reporting',
      'Profitability tracking',
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
      'Assumptions live in one place and are clearly labeled, so changing a number shows its effect on revenue, margin, and cash.',
    deliverable:
      'Usually a model workbook with one assumptions sheet you control, and a dashboard that responds to whatever you change.',
    capabilities: [
      'Revenue and expense forecasts',
      'Downside / base / upside scenarios',
      'Break-even analysis',
      'Capacity and staffing planning',
      'Seasonality modeling',
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
      'Consolidating fragmented trackers',
      'Lead and job tracking systems',
      'Job and project profitability',
      'Automated status flags and alerts',
      'Standardized operating workbooks',
    ],
  },
];
