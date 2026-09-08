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

export type View = {
  /** Tab label for this interactive view. */
  label: string;
  shot: Shot;
};

export type CaseStudy = {
  id: string;
  name: string;
  /** Short label used in the /work top navigation list — e.g. "Operations & Automation". */
  navLabel: string;
  /** Longer category heading shown within the case study itself. */
  category: string;
  challenge: string;
  solution: string;
  result: string;
  capabilities: string[];
  views: [View, View];
};

type ManifestKey = keyof typeof manifest;

function shot(key: ManifestKey, sheet: string, alt: string, caption: string): Shot {
  const { width, height } = manifest[key];
  return { src: `/work/${key}.webp`, width, height, sheet, alt, caption };
}

/**
 * Every project below is a self-directed demonstration build, not client work.
 * The disclosure is a single constant reused verbatim everywhere it appears —
 * the homepage, /work, /founding-offer, and each case study — so it can't
 * drift into a differently worded (and weaker) claim in any one place.
 */
export const demonstrationDisclosure = 'Fictional demonstration project built by Cedarline Analytics.';

/** /work top navigation order: Blue Ridge, Queen City Cleaning, Carolina Landscaping. */
export const caseStudies: CaseStudy[] = [
  {
    id: 'blue-ridge-home-services',
    name: 'Blue Ridge Home Services',
    navLabel: 'Operations & Automation',
    category: 'Operations Automation & Business Systems',
    challenge:
      'Lead, job, expense, and profitability information lives in separate places, making it harder to see outstanding work and overall operating performance.',
    solution:
      'Cedarline built a centralized Excel system linking leads, jobs, expenses, job profitability, pipeline activity, and attention flags in one workflow.',
    result:
      'The finished system gives management one place to track work, monitor profitability, and surface overdue or unfinished jobs.',
    capabilities: [
      'Lead and pipeline tracking',
      'Job profitability',
      'Linked operating data',
      'Expense tracking',
      'Automated overdue flags',
      'Management reporting',
    ],
    views: [
      {
        label: 'Management Dashboard',
        shot: shot(
          'blue-ridge-dashboard',
          'Management Dashboard',
          'Blue Ridge Home Services management dashboard in Excel, showing total revenue, gross profit and estimated operating profit, lead conversion rate, completed and outstanding jobs, a red "needs attention" band counting overdue jobs, open leads and jobs in progress, and a revenue-by-month chart.',
          'Management dashboard — including a needs-attention band that counts overdue jobs on its own.',
        ),
      },
      {
        label: 'Job & Attention Tracking',
        shot: shot(
          'blue-ridge-job-automation',
          'Job & Attention Tracking',
          'The job log sheet, with a row per job recording customer, service type, scheduled and completion dates and status, followed by calculated columns for revenue, labor, materials and other costs, total direct cost, gross profit and gross margin, and an attention-required column flagging overdue and in-progress jobs.',
          'Job log — entered columns on the left, calculated cost, margin, and attention-required status on the right.',
        ),
      },
    ],
  },
  {
    id: 'queen-city-cleaning',
    name: 'Queen City Cleaning',
    navLabel: 'Forecasting & Scenario Analysis',
    category: 'Financial Forecasting & Scenario Analysis',
    challenge:
      'Management needs a practical way to evaluate how growth, pricing, costs, seasonality, and staffing assumptions could affect future performance.',
    solution:
      'Cedarline built a 12-month financial model with configurable assumptions, Downside/Base/Upside scenarios, break-even analysis, seasonality, and capacity planning.',
    result:
      'The model turns changing business assumptions into a clear view of revenue, profitability, customer growth, and operating requirements.',
    capabilities: [
      'Financial forecasting',
      'Scenario analysis',
      'Break-even analysis',
      'Assumption-driven modeling',
      'Capacity planning',
    ],
    views: [
      {
        label: 'Forecast Dashboard',
        shot: shot(
          'queen-city-cleaning-dashboard',
          'Forecast Dashboard',
          'Queen City Cleaning forecast dashboard in Excel, showing projected annual revenue, operating profit and margin, break-even monthly revenue, a downside/base/upside scenario comparison table, a 2026 actual versus 2027 forecast table, and four charts covering revenue, operating profit, margin and customer growth.',
          'Forecast dashboard — the selected scenario drives every figure and chart on the sheet.',
        ),
      },
      {
        label: 'Scenario & Assumptions Model',
        shot: shot(
          'queen-city-cleaning-scenarios',
          'Scenario & Assumptions Model',
          'The forecast assumptions sheet, listing monthly customer growth, jobs per customer, average revenue per job, labor, supplies, transportation and overhead assumptions across downside, base and upside columns, alongside a monthly seasonality index table.',
          'Assumptions sheet — every driver is editable, labeled, and shown across all three scenarios.',
        ),
      },
    ],
  },
  {
    id: 'carolina-landscaping',
    name: 'Carolina Landscaping',
    navLabel: 'Management Reporting',
    category: 'Management Reporting & Dashboard System',
    challenge:
      'Business performance is recorded, but reviewing revenue, profitability, jobs, and customer activity requires too much manual monthly analysis.',
    solution:
      'Cedarline built a centralized management-reporting workbook that turns monthly operating data into clear financial and operational reporting.',
    result:
      'The finished dashboard makes performance, trends, and results versus targets easier to review from one place.',
    capabilities: [
      'Management dashboards',
      'Revenue and profitability tracking',
      'Performance vs. target',
      'Operational reporting',
      'Automated calculations',
    ],
    views: [
      {
        label: 'Management Dashboard',
        shot: shot(
          'carolina-landscaping-dashboard',
          'Management Dashboard',
          'Carolina Landscaping management dashboard in Excel, showing six KPI tiles including annual revenue and operating margin, a business performance summary, a performance-versus-target table, and monthly revenue and operating profit charts.',
          'Management dashboard — KPI tiles, performance versus target, and monthly trend charts.',
        ),
      },
      {
        label: 'Underlying Monthly Data',
        shot: shot(
          'carolina-landscaping-data',
          'Underlying Monthly Data',
          'The monthly data table behind the dashboard, with a row per month and columns for revenue, jobs completed, customers, labor, materials, overhead, gross profit, operating profit and margin, with conditional formatting highlighting the best and worst months.',
          'The single monthly data table every dashboard figure is calculated from.',
        ),
      },
    ],
  },
];

export function findCaseStudy(id: string): CaseStudy {
  const study = caseStudies.find((item) => item.id === id);
  if (!study) throw new Error(`Unknown case study id: ${id}`);
  return study;
}
