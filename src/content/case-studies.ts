import manifest from '@/lib/image-manifest.json';

export type Shot = {
  src: string;
  width: number;
  height: number;
  /** Worksheet name, shown in the frame's title bar. */
  sheet: string;
  alt: string;
  caption: string;
};

export type CaseStudy = {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  challenge: string;
  solution: string[];
  result: string;
  capabilities: string[];
  builtWith: string;
  shots: [Shot, Shot];
};

type ManifestKey = keyof typeof manifest;

function shot(key: ManifestKey, sheet: string, alt: string, caption: string): Shot {
  const { width, height } = manifest[key];
  return { src: `/work/${key}.webp`, width, height, sheet, alt, caption };
}

/**
 * Every project below is a self-directed demonstration build, not client work.
 * The disclosure is part of the data so it cannot be rendered without it.
 * The full explanation lives in the "A note on these projects" callout at the
 * top of the Work section (see Work.tsx) — this shorter line repeats per case
 * study without restating the whole thing each time.
 */
export const demonstrationDisclosure = 'Fictional demonstration project built by Cedarline Analytics.';

export const caseStudies: CaseStudy[] = [
  {
    id: 'carolina-landscaping',
    name: 'Carolina Landscaping',
    subtitle: 'Management Reporting & Dashboard System',
    category: 'Dashboards & Business Reporting',
    challenge:
      'Management needed a clear way to see financial and operating performance without manually reviewing metrics scattered across the workbook.',
    solution: [
      'A centralized Excel reporting system that organizes operating data on one sheet and calculates KPIs, profitability, trends and performance-versus-target automatically — turning the monthly reporting step into a review rather than a rebuild.',
    ],
    result:
      'A streamlined reporting system that converts underlying business data into an easy-to-read management dashboard.',
    capabilities: [
      'Management dashboards',
      'Revenue and profitability analysis',
      'Performance versus target',
      'Operational performance tracking',
      'Automated calculations',
    ],
    builtWith: 'Microsoft Excel',
    shots: [
      shot(
        'carolina-landscaping-dashboard',
        'Dashboard',
        'Carolina Landscaping management dashboard in Excel, showing six KPI tiles including annual revenue and operating margin, a business performance summary, a performance-versus-target table, and monthly revenue and operating profit charts.',
        'Management dashboard — KPI tiles, performance versus target, and monthly trend charts.',
      ),
      shot(
        'carolina-landscaping-data',
        'Monthly Data',
        'The monthly data table behind the dashboard, with a row per month and columns for revenue, jobs completed, customers, labor, materials, overhead, gross profit, operating profit and margin, with conditional formatting highlighting the best and worst months.',
        'The single monthly data table every dashboard figure is calculated from.',
      ),
    ],
  },
  {
    id: 'queen-city-cleaning',
    name: 'Queen City Cleaning',
    subtitle: 'Financial Forecasting & Scenario Analysis',
    category: 'Financial Modeling & Forecasting',
    challenge:
      'Management needed a structured way to test future performance under different assumptions about growth, pricing and costs.',
    solution: [
      'A 12-month forecasting model driven by one assumptions sheet, with downside, base and upside scenarios selectable from a dropdown — break-even, seasonality and staffing capacity all flow through automatically.',
    ],
    result:
      'A flexible decision-support model that shows how changes in growth, pricing or cost assumptions affect revenue, profitability and operating requirements.',
    capabilities: [
      'Financial forecasting',
      'Scenario analysis',
      'Break-even analysis',
      'Assumption-driven modeling',
      'Capacity planning',
    ],
    builtWith: 'Microsoft Excel',
    shots: [
      shot(
        'queen-city-cleaning-dashboard',
        'Dashboard',
        'Queen City Cleaning forecast dashboard in Excel, showing projected annual revenue, operating profit and margin, break-even monthly revenue, a downside/base/upside scenario comparison table, a 2026 actual versus 2027 forecast table, and four charts covering revenue, operating profit, margin and customer growth.',
        'Forecast dashboard — the selected scenario drives every figure and chart on the sheet.',
      ),
      shot(
        'queen-city-cleaning-scenarios',
        'Assumptions',
        'The forecast assumptions sheet, listing monthly customer growth, jobs per customer, average revenue per job, labor, supplies, transportation and overhead assumptions across downside, base and upside columns, alongside a monthly seasonality index table.',
        'Assumptions sheet — every driver is editable, labeled, and shown across all three scenarios.',
      ),
    ],
  },
  {
    id: 'blue-ridge-home-services',
    name: 'Blue Ridge Home Services',
    subtitle: 'Operations Automation & Process Improvement',
    category: 'Spreadsheet Automation & Business Systems',
    challenge:
      'Lead, job and expense information was maintained separately, so understanding sales performance, job profitability and outstanding work meant combining it by hand.',
    solution: [
      'A centralized Excel operating system connecting lead tracking, job management, expenses and profitability in one workbook — job costs and margins calculate themselves, overdue work is flagged automatically, and everything rolls up into a single management dashboard.',
    ],
    result:
      'A centralized system that cuts manual consolidation and gives management a clear view of sales, jobs, profitability and work needing attention.',
    capabilities: [
      'Spreadsheet automation',
      'Data consolidation',
      'Lead and pipeline tracking',
      'Job profitability analysis',
      'Automated operational alerts',
      'Expense tracking',
    ],
    builtWith: 'Microsoft Excel',
    shots: [
      shot(
        'blue-ridge-dashboard',
        'Dashboard',
        'Blue Ridge Home Services management dashboard in Excel, showing total revenue, gross profit and estimated operating profit, lead conversion rate, completed and outstanding jobs, a red "needs attention" band counting overdue jobs, open leads and jobs in progress, and a revenue-by-month chart.',
        'Management dashboard — including a needs-attention band that counts overdue jobs on its own.',
      ),
      shot(
        'blue-ridge-job-automation',
        'Job Log',
        'The job log sheet, with a row per job recording customer, service type, scheduled and completion dates and status, followed by calculated columns for revenue, labor, materials and other costs, total direct cost, gross profit and gross margin, and an attention-required column flagging overdue and in-progress jobs.',
        'Job log — entered columns on the left, calculated cost, margin and status columns on the right.',
      ),
    ],
  },
];
