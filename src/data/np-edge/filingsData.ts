// Types are inlined to avoid import errors
type Form990Variant = any;
type StateRequirement = any;
type DonorFilingRequirement = any;
type EmploymentTaxForm = any;
type GrantReportingRequirement = any;

// IRS Form 990 Variants Reference Data
export const form990Variants: Form990Variant[] = [
  {
    formType: '990-N',
    name: 'Form 990-N (e-Postcard)',
    description: 'Electronic notice for small tax-exempt organizations',
    eligibility: {
      maxReceipts: 50000,
      organizationType: ['501c3', '501c4', '501c6'],
    },
    requirements: [
      'Gross receipts normally ≤ $50,000',
      'Must be filed electronically',
      'No financial details required',
      'Organization name, EIN, mailing address',
      'Principal officer information',
      'Website address if applicable',
    ],
    eFileRequired: true,
    publicDisclosure: false,
  },
  {
    formType: '990-EZ',
    name: 'Form 990-EZ (Short Form)',
    description: 'Short Form Return of Organization Exempt From Income Tax',
    eligibility: {
      maxReceipts: 200000,
      maxAssets: 500000,
      organizationType: ['501c3', '501c4', '501c6'],
    },
    requirements: [
      'Gross receipts < $200,000',
      'Total assets < $500,000',
      'Revenue and expense summary',
      'Balance sheet',
      'Officer compensation',
      'Program service accomplishments',
    ],
    schedules: ['Schedule A', 'Schedule B', 'Schedule O (if needed)'],
    eFileRequired: true,
    publicDisclosure: true,
  },
  {
    formType: '990',
    name: 'Form 990 (Full Return)',
    description: 'Return of Organization Exempt From Income Tax',
    eligibility: {
      minReceipts: 200000,
      organizationType: ['501c3', '501c4', '501c6', 'public-charity'],
    },
    requirements: [
      'Gross receipts ≥ $200,000 OR Total assets ≥ $500,000',
      'Detailed financial statements',
      'Statement of functional expenses',
      'Governance and management policies',
      'Compensation disclosures',
      'Related organizations',
      'Programs and accomplishments',
      'Schedule A (Public Charity Status)',
      'Schedule B (Contributors)',
    ],
    schedules: [
      'Schedule A (Public Charity)',
      'Schedule B (Contributors)',
      'Schedule C (Political Activities)',
      'Schedule D (Supplemental Financial)',
      'Schedule F (Foreign Activities)',
      'Schedule G (Fundraising)',
      'Schedule H (Hospitals)',
      'Schedule I (Grants)',
      'Schedule J (Compensation)',
      'Schedule K (Tax-Exempt Bonds)',
      'Schedule L (Transactions)',
      'Schedule M (Non-Cash Contributions)',
      'Schedule N (Liquidation)',
      'Schedule O (Supplemental Information)',
      'Schedule R (Related Organizations)',
    ],
    eFileRequired: true,
    publicDisclosure: true,
  },
  {
    formType: '990-PF',
    name: 'Form 990-PF (Private Foundation)',
    description: 'Return of Private Foundation',
    eligibility: {
      organizationType: ['private-foundation'],
    },
    requirements: [
      'Required for ALL private foundations regardless of size',
      'Financial statements',
      'Grant distributions',
      'Investment income',
      'Excise tax calculation (2% or 1%)',
      'Minimum distribution requirements',
      'Self-dealing transactions',
      'Grants to individuals',
      'List of officers, directors, trustees',
      'Substantial contributors list',
    ],
    schedules: ['Schedule B (Contributors)'],
    eFileRequired: true,
    publicDisclosure: true,
  },
];

// State-Specific Filing Requirements (Sample - Top 10 States)
export const stateRequirements: StateRequirement[] = [
  {
    state: 'CA',
    stateName: 'California',
    filings: {
      annualReport: {
        required: true,
        formName: 'Statement of Information',
        formCode: 'SI-100',
        dueDate: 'Every 2 years',
        fee: 20,
        url: 'https://bizfilesonline.sos.ca.gov/',
      },
      charitableRegistration: {
        required: true,
        formName: 'Registration Renewal Fee Report',
        formCode: 'RRF-1',
        renewalFrequency: 'Annual',
        fee: 0, // Sliding scale based on revenue
        url: 'https://oag.ca.gov/charities',
      },
      agRegistration: {
        required: true,
        formName: 'Attorney General Charity Registration',
        description: 'Required for organizations soliciting donations in CA',
        url: 'https://oag.ca.gov/charities/registration',
      },
    },
    notes: 'CA has strict charitable solicitation laws. Form CT-1 also required initially.',
  },
  {
    state: 'NY',
    stateName: 'New York',
    filings: {
      annualReport: {
        required: true,
        formName: 'Biennial Statement',
        dueDate: 'Every 2 years',
        fee: 25,
        url: 'https://www.charitiesnys.com/',
      },
      charitableRegistration: {
        required: true,
        formName: 'Charitable Registration',
        formCode: 'CHAR500',
        renewalFrequency: 'Annual',
        url: 'https://www.charitiesnys.com/',
      },
      agRegistration: {
        required: true,
        formName: 'NY Attorney General Registration',
        description: 'Registration with NY Charities Bureau',
        url: 'https://www.charitiesnys.com/',
      },
    },
    notes: 'CHAR500 must be filed even if no solicitation. Form CHAR410 for paid fundraisers.',
  },
  {
    state: 'FL',
    stateName: 'Florida',
    filings: {
      annualReport: {
        required: true,
        formName: 'Annual Report',
        dueDate: 'By May 1st',
        fee: 61.25,
        url: 'https://dos.myflorida.com/sunbiz/',
      },
      charitableRegistration: {
        required: true,
        formName: 'Solicitation of Contributions Registration',
        formCode: 'CH-410',
        renewalFrequency: 'Annual',
        fee: 10,
        url: 'https://csapp.800helpfla.com/',
      },
      agRegistration: {
        required: true,
        formName: 'FL Department of Agriculture Registration',
        url: 'https://csapp.800helpfla.com/',
      },
    },
  },
  {
    state: 'TX',
    stateName: 'Texas',
    filings: {
      annualReport: {
        required: false,
      },
      charitableRegistration: {
        required: true,
        formName: 'Charitable Organization Registration',
        renewalFrequency: 'Annual',
        url: 'https://www.texasattorneygeneral.gov/charities',
      },
      agRegistration: {
        required: true,
        formName: 'TX Attorney General Registration',
        description: 'Required if soliciting in TX',
      },
    },
    notes: 'TX does not require state corporate annual reports for nonprofits.',
  },
  {
    state: 'PA',
    stateName: 'Pennsylvania',
    filings: {
      annualReport: {
        required: true,
        formName: 'Annual Report - Form 990',
        dueDate: 'Annual',
        url: 'https://file.dos.pa.gov/',
      },
      charitableRegistration: {
        required: true,
        formName: 'Charitable Organization Registration',
        formCode: 'BCO-10',
        renewalFrequency: 'Annual',
        url: 'https://www.dos.pa.gov/BusinessCharities/Charities/',
      },
      agRegistration: {
        required: true,
        formName: 'PA Bureau of Corporations Registration',
      },
    },
  },
  {
    state: 'IL',
    stateName: 'Illinois',
    filings: {
      annualReport: {
        required: true,
        formName: 'Annual Report',
        dueDate: 'First day of anniversary month',
        fee: 0,
        url: 'https://apps.ilsos.gov/',
      },
      charitableRegistration: {
        required: true,
        formName: 'Charitable Organization Registration',
        formCode: 'CO-1',
        renewalFrequency: 'Annual',
        url: 'https://www.illinoisattorneygeneral.gov/charities/',
      },
      agRegistration: {
        required: true,
        formName: 'IL Attorney General Registration',
      },
    },
  },
  {
    state: 'OH',
    stateName: 'Ohio',
    filings: {
      annualReport: {
        required: false,
      },
      charitableRegistration: {
        required: true,
        formName: 'Charitable Registration',
        renewalFrequency: 'Annual',
        url: 'https://www.ohioattorneygeneral.gov/charities',
      },
      agRegistration: {
        required: true,
        formName: 'OH Attorney General Registration',
      },
    },
  },
  {
    state: 'GA',
    stateName: 'Georgia',
    filings: {
      annualReport: {
        required: true,
        formName: 'Annual Registration',
        dueDate: 'April 1st',
        fee: 30,
        url: 'https://ecorp.sos.ga.gov/',
      },
      charitableRegistration: {
        required: true,
        formName: 'Charitable Organization Registration',
        renewalFrequency: 'Annual',
        url: 'https://sos.ga.gov/how-to-guide/how-guide-charities',
      },
      agRegistration: {
        required: false,
      },
    },
  },
  {
    state: 'NC',
    stateName: 'North Carolina',
    filings: {
      annualReport: {
        required: true,
        formName: 'Annual Report',
        dueDate: '15th day of 4th month after fiscal year end',
        fee: 25,
        url: 'https://www.sosnc.gov/',
      },
      charitableRegistration: {
        required: true,
        formName: 'Charitable Solicitation License',
        formCode: 'CSL-1',
        renewalFrequency: 'Annual',
        url: 'https://www.sosnc.gov/divisions/charities',
      },
      agRegistration: {
        required: true,
        formName: 'NC Secretary of State Registration',
      },
    },
  },
  {
    state: 'MI',
    stateName: 'Michigan',
    filings: {
      annualReport: {
        required: true,
        formName: 'Annual Statement',
        dueDate: 'October 1st',
        fee: 20,
        url: 'https://cofs.lara.state.mi.us/',
      },
      charitableRegistration: {
        required: true,
        formName: 'Charitable Organization Registration',
        renewalFrequency: 'Annual',
        url: 'https://www.michigan.gov/ag/charities',
      },
      agRegistration: {
        required: true,
        formName: 'MI Attorney General Registration',
      },
    },
  },
];

// Donor-Related Filing Requirements
export const donorFilingRequirements: DonorFilingRequirement[] = [
  {
    type: 'acknowledgment-letter',
    name: 'Donation Acknowledgment Letter',
    description: 'Written acknowledgment required for donations of $250 or more',
    threshold: 250,
    deadline: 'Before donor files tax return or organization files Form 990',
    automated: true,
    template: 'donor-acknowledgment-250plus',
  },
  {
    type: 'quid-pro-quo',
    name: 'Quid Pro Quo Disclosure',
    description: 'Required when donor receives goods/services in exchange for donation > $75',
    threshold: 75,
    automated: true,
    template: 'quid-pro-quo-disclosure',
  },
  {
    type: 'vehicle-donation',
    name: 'Vehicle Donation Form 1098-C',
    description: 'Required for vehicle donations claimed over $500',
    threshold: 500,
    deadline: '30 days from sale or donation',
    automated: false,
    template: 'form-1098-c',
  },
  {
    type: 'raffle-gaming',
    name: 'Raffle & Gaming Reports',
    description: 'State-specific reporting for raffles, bingo, and gaming activities',
    automated: false,
  },
];

// Employment Tax Forms
export const employmentTaxForms: EmploymentTaxForm[] = [
  {
    formType: '941',
    name: 'Form 941 - Quarterly Payroll Tax',
    description: "Employer's quarterly federal tax return for wages paid",
    frequency: 'quarterly',
    deadline: 'Last day of month following quarter end',
    eFileRequired: true,
  },
  {
    formType: '940',
    name: 'Form 940 - Annual FUTA Tax',
    description: 'Federal Unemployment Tax Act (FUTA) annual return',
    frequency: 'annual',
    deadline: 'January 31st',
    eFileRequired: true,
  },
  {
    formType: 'W-2',
    name: 'Form W-2 - Wage and Tax Statement',
    description: 'Annual wage statement for each employee',
    frequency: 'annual',
    deadline: 'January 31st (to employees and SSA)',
    eFileRequired: false,
  },
  {
    formType: 'W-3',
    name: 'Form W-3 - Transmittal of Wage Statements',
    description: 'Summary transmittal of W-2 forms to SSA',
    frequency: 'annual',
    deadline: 'January 31st',
    eFileRequired: false,
  },
  {
    formType: '1099-NEC',
    name: 'Form 1099-NEC - Nonemployee Compensation',
    description: 'Reports payments to independent contractors',
    frequency: 'annual',
    threshold: '$600 or more paid to contractor',
    deadline: 'January 31st',
    eFileRequired: false,
  },
];

// Grant Reporting Requirements
export const grantReportingRequirements: GrantReportingRequirement[] = [
  {
    formType: 'SF-425',
    name: 'Federal Financial Report (SF-425)',
    description: 'Standard form for federal grant financial reporting',
    usedFor: ['Federal grants', 'Cooperative agreements'],
    frequency: 'Quarterly or as specified in grant agreement',
    submissionMethod: 'Grants.gov or grantor portal',
  },
  {
    formType: 'SF-424',
    name: 'Application for Federal Assistance (SF-424)',
    description: 'Standard application form for federal grants',
    usedFor: ['New grant applications', 'Grant renewals'],
    frequency: 'Per application cycle',
    submissionMethod: 'Grants.gov',
  },
  {
    formType: 'SF-270',
    name: 'Request for Advance or Reimbursement (SF-270)',
    description: 'Request payment from federal grantor',
    usedFor: ['Federal grant drawdowns'],
    frequency: 'As needed for cash disbursements',
    submissionMethod: 'Grantor payment system',
  },
  {
    formType: 'SF-272',
    name: 'Federal Cash Transactions Report (SF-272)',
    description: 'Report cash status for federal grants',
    usedFor: ['Federal grant cash management'],
    frequency: 'Quarterly or as required',
    submissionMethod: 'Grantor reporting system',
  },
  {
    formType: 'foundation-annual',
    name: 'Foundation Annual Report',
    description: 'Annual narrative and financial report for foundation grants',
    usedFor: ['Private foundation grants'],
    frequency: 'Annual or as specified',
    submissionMethod: 'Foundation portal or email',
  },
  {
    formType: 'foundation-impact',
    name: 'Foundation Impact Report',
    description: 'Outcomes and impact assessment for foundation funders',
    usedFor: ['Impact-focused foundation grants'],
    frequency: 'End of grant period or annual',
    submissionMethod: 'Foundation portal or custom format',
  },
];

// Filing Deadlines Calendar (Standard Dates)
export const standardFilingDeadlines = {
  irs990: {
    standard: '5th month after fiscal year end',
    extension: '6 months additional (11th month after FYE)',
    note: 'Form 7004 required for extension',
  },
  form941: {
    Q1: 'April 30',
    Q2: 'July 31',
    Q3: 'October 31',
    Q4: 'January 31',
  },
  form940: 'January 31',
  w2w3: 'January 31',
  '1099NEC': 'January 31',
};

// Organization Type Filing Requirements
export const orgTypeFilingMatrix = {
  '501c3': {
    required: ['990-series', 'state-annual', 'charitable-registration'],
    conditional: ['990-T (if UBIT)', 'employment-taxes', 'grant-reports'],
    optional: ['sales-tax (state-dependent)'],
  },
  '501c4': {
    required: ['990-series', 'state-annual'],
    conditional: ['990-T (if UBIT)', 'employment-taxes', 'charitable-registration (some states)'],
    optional: ['sales-tax'],
  },
  'private-foundation': {
    required: ['990-PF', 'state-annual', 'excise-tax'],
    conditional: ['employment-taxes'],
    optional: [],
  },
  church: {
    required: [],
    conditional: ['990 (if gross receipts > $50k and not exempt)', 'employment-taxes'],
    optional: ['voluntary 990 filing'],
    note: 'Churches have special exemptions but may choose to file for transparency',
  },
};
