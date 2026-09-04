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
 */
export const demonstrationDisclosure =
  'Fictional demonstration project created to showcase Cedarline Analytics capabilities. Not a client engagement — the business, figures and names are invented.';

export const caseStudies: CaseStudy[] = [
  {
    id: 'carolina-landscaping',
    name: 'Carolina Landscaping',
    subtitle: 'Management Reporting & Dashboard System',
    category: 'Dashboards & Business Reporting',
    challenge:
      'Management needed a clearer way to understand financial and operating performance without manually reviewing multiple monthly metrics scattered across a workbook.',
    solution: [
      'A centralized Excel management reporting system that organizes operating data on one sheet and calculates the reporting layer from it automatically.',
      'Headline KPIs, profitability metrics, monthly trends and performance against target all update from the same underlying data, so the monthly reporting step is a review rather than a rebuild.',
    ],
    result:
      'A streamlined reporting system that converts underlying business data into an easy-to-read management dashboard.',
    capabilities: [
      'Management dashboards',
      'KPI reporting',
      'Revenue and profitability analysis',
      'Operational performance tracking',
      'Automated calculations',
      'Performance versus target',
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
      'Management needed a structured way to evaluate future performance under different assumptions about growth, pricing, costs and operating conditions.',
    solution: [
      'A 12-month forecasting model driven by a single assumptions sheet: customer growth, jobs per customer, revenue per job, labor and supply costs, and overhead growth.',
      'Downside, base and upside scenarios are calculated side by side and selected from a dropdown, with break-even analysis, monthly seasonality and implied staffing capacity flowing through to the dashboard.',
    ],
    result:
      'A flexible decision-support model that allows management to evaluate how changes in business assumptions affect revenue, profitability, customer growth and operating requirements.',
    capabilities: [
      'Financial forecasting',
      'Scenario analysis',
      'Break-even analysis',
      'Assumption-driven modeling',
      'Profitability forecasting',
      'Capacity planning',
      'Management dashboards',
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
      'Lead, job and operating-expense information was maintained separately, so understanding sales performance, job profitability, outstanding work and overall performance meant combining it by hand.',
    solution: [
      'A centralized Excel operating system that connects lead tracking, job management, expenses, profitability and management reporting in one workbook.',
      'Job costs and margins calculate themselves, overdue and in-progress work is flagged automatically, and lead conversion and profitability roll up into a single management dashboard.',
    ],
    result:
      'A centralized operating system that reduces manual consolidation and gives management a clearer view of sales, jobs, profitability, and work requiring attention.',
    capabilities: [
      'Spreadsheet automation',
      'Process improvement',
      'Data consolidation',
      'Lead and pipeline tracking',
      'Job profitability analysis',
      'Automated operational alerts',
      'Expense tracking',
      'KPI reporting',
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
