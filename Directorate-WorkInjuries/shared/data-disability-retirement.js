/* ================================================================
   data-disability-retirement.js — استعلامات تقاعد الأشخاص ذوي الإعاقة
   ================================================================ */

/* ================================================================
   Standard Template for Disability Retirement Inquiry
   ================================================================ */

const DISABILITY_RETIREMENT_TEMPLATE = {
  // Basic Request Information
  id: '', // Unique inquiry identifier (e.g., 'RET-2025-000123')
  status: '', // Current status
  receivedDate: '', // Date when inquiry was received
  lastUpdate: '', // Last update date and time
  lastUpdatedBy: '', // Last updater name
  expectedClosureDate: '', // Expected closure date
  remainingDays: null, // Remaining days until closure

  // Applicant Information
  applicant: {
    name: '', // Full name
    civil: '', // Civil ID number
    phone: '', // Phone number
    email: '', // Email address
    dob: '', // Date of birth
    gender: '', // Gender
    nationality: '', // Nationality
    address: '', // Address
  },

  // Employment History
  employmentHistory: [], // Array of employment history entries

  // Disability card details from MOSD
  mosdCard: {
    number: '',
    issueDate: '',
    expiryDate: '',
    status: '',
    disabilities: [],
  },

  // Disability Information
  disabilityCard: '', // Disability card number
  cardIssueDate: '', // Card issue date
  disabilityType: '', // Type of disability
  disabilityLevel: '', // Level of disability
  disabilityDetails: '', // Detailed description of disability

  // Employment Information
  currentEmployer: '', // Current employer
  retirementDate: '', // Requested retirement date
  lastJobTitle: '', // Last held job title

  // Current disability benefit status
  activeBenefit: {
    hasActiveRequest: false,
    requestId: '',
    currentStatus: '',
    isDisbursed: false,
    lastDepositedMonth: '',
  },

  // Reviews
  employeeRecommendation: null,
  headDecision: null,
  closedBy: '',
  closedDate: '',
  workflowType: 'disabilityRetirement',
  slaDays: 5,

  // Decision Information
  decision: {
    type: '', // Decision type: 'معتمد', 'مرفوض', 'قيد المراجعة'
    date: '', // Decision date
    issuer: '', // Name of issuer
    details: '', // Decision details
    retirementEligible: false, // Whether eligible for retirement
    retirementDate: '', // Approved retirement date
    pensionAmount: null, // Pension amount if applicable
  },

  // Attachments
  attachments: [], // Array of attachment objects

  // Notes
  notes: [], // Array of note objects

  // Timeline
  timeline: [], // Array of timeline event objects with structure: { action, actor, role, time, fromStatus, toStatus, note, type, phone (optional - for employee contact) }

  // Assignment Information
  assignedTo: '', // Name of assigned person
  checkedOutBy: '', // Name of person who checked out

  // Suspend/Resume Information
  suspended: false, // Whether request is currently suspended
  suspensionReason: '', // Reason for suspension
  suspensionNotes: '', // Additional notes about suspension
  suspendedBy: '', // Name of person who suspended the request
  suspendedDate: '', // Date when request was suspended
  resumedBy: '', // Name of person who resumed the request
  resumedDate: '', // Date when request was resumed
};

/* ================================================================
   Helper Functions for Disability Retirement Data
   ================================================================ */

/**
 * Create a new disability retirement inquiry with default structure
 * @param {object} data - Inquiry data to override defaults
 * @returns {object} Complete disability retirement inquiry object
 */
function createDisabilityRetirementInquiry(data = {}) {
  return {
    ...DISABILITY_RETIREMENT_TEMPLATE,
    ...data,
    applicant: { ...DISABILITY_RETIREMENT_TEMPLATE.applicant, ...data.applicant },
    mosdCard: { ...DISABILITY_RETIREMENT_TEMPLATE.mosdCard, ...data.mosdCard },
    activeBenefit: { ...DISABILITY_RETIREMENT_TEMPLATE.activeBenefit, ...data.activeBenefit },
    decision: data.decision ? { ...DISABILITY_RETIREMENT_TEMPLATE.decision, ...data.decision } : null,
    employeeRecommendation: data.employeeRecommendation ? { ...data.employeeRecommendation } : null,
    headDecision: data.headDecision ? { ...data.headDecision } : null,
  };
}

/**
 * Validate disability retirement inquiry data
 * @param {object} inquiry - Inquiry object to validate
 * @returns {object} Validation result with isValid and errors array
 */
function validateDisabilityRetirementInquiry(inquiry) {
  const errors = [];

  // Required fields
  if (!inquiry.id || typeof inquiry.id !== 'string') {
    errors.push('Inquiry ID is required and must be a string');
  }

  if (!inquiry.status || typeof inquiry.status !== 'string') {
    errors.push('Inquiry status is required and must be a string');
  }

  if (!inquiry.receivedDate || typeof inquiry.receivedDate !== 'string') {
    errors.push('Received date is required and must be a string');
  }

  // Applicant validation
  if (!inquiry.applicant || !inquiry.applicant.name) {
    errors.push('Applicant name is required');
  }

  if (!inquiry.applicant || !inquiry.applicant.civil) {
    errors.push('Applicant civil ID is required');
  }

  // Disability validation
  if (!inquiry.disabilityCard || typeof inquiry.disabilityCard !== 'string') {
    errors.push('Disability card number is required');
  }

  if (!inquiry.disabilityType || typeof inquiry.disabilityType !== 'string') {
    errors.push('Disability type is required');
  }

  if (!inquiry.disabilityLevel || typeof inquiry.disabilityLevel !== 'string') {
    errors.push('Disability level is required');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

/**
 * Get disability retirement inquiry by ID
 * @param {string} id - Inquiry ID
 * @param {array} inquiries - Array of disability retirement inquiries
 * @returns {object|null} Inquiry object or null if not found
 */
function getDisabilityRetirementById(id, inquiries) {
  return inquiries.find(inquiry => inquiry.id === id) || null;
}

/**
 * Get disability retirement inquiries by status
 * @param {string} status - Inquiry status
 * @param {array} inquiries - Array of disability retirement inquiries
 * @returns {array} Filtered array of inquiries
 */
function getDisabilityRetirementByStatus(status, inquiries) {
  return inquiries.filter(inquiry => inquiry.status === status);
}

/**
 * Check if retirement inquiry is approaching deadline
 * @param {object} inquiry - Disability retirement inquiry object
 * @param {number} daysThreshold - Days threshold for deadline warning
 * @returns {boolean} True if inquiry is approaching deadline
 */
function isRetirementInquiryApproachingDeadline(inquiry, daysThreshold = 5) {
  if (!inquiry.expectedClosureDate) {
    return false;
  }

  const closureDate = new Date(inquiry.expectedClosureDate);
  const today = new Date();
  const diffTime = closureDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays <= daysThreshold && diffDays > 0;
}

/* ================================================================
   Sample Data - Disability Retirement Inquiries
   ================================================================ */

const DISABILITY_RETIREMENT_DATA = [
  {
    id: 'RET-2025-000123',
    status: 'تم استلام الاستعلام — بانتظار مراجعة موظف قسم الإعاقة والأمراض المستديمة',
    receivedDate: '2025-01-20',
    lastUpdate: '2025-01-20 09:00',
    lastUpdatedBy: null,
    expectedClosureDate: '2025-01-30',
    remainingDays: 10,
    applicant: {
      name: 'محمد بن سالم البوسعيدي',
      civil: '9045678901',
      phone: '96894567890',
      email: 'mohammed.b@mail.com',
      dob: '1983-02-15',
      gender: 'ذكر',
      nationality: 'عُماني',
      address: 'مسقط — ولاية السيب — المعبيلة الجنوبية',
    },
    employmentHistory: [
      { employerName: 'وزارة الصحة', cr: 'GOV-001', jobTitle: 'فني أجهزة طبية', startDate: '2017-04-01', endDate: null, current: true },
      { employerName: 'شركة الجسور الهندسية', cr: '3344556', jobTitle: 'فني صيانة', startDate: '2011-09-01', endDate: '2017-03-30', current: false },
    ],
    mosdCard: {
      number: 'DIS-CARD-0087654',
      issueDate: '2020-05-15',
      expiryDate: '2028-05-14',
      status: 'سارية',
      disabilities: [
        { source: 'MOH', name: 'إعاقة حركية', level: 'درجة ثانية', examinationDate: '2020-04-22' },
      ],
    },
    disabilityCard: 'DIS-CARD-0087654',
    cardIssueDate: '2020-05-15',
    disabilityType: 'إعاقة حركية',
    disabilityLevel: 'درجة ثانية',
    disabilityDetails: 'إعاقة حركية في الأطراف السفلية نتيجة حادث مروري',
    currentEmployer: 'وزارة الصحة',
    retirementDate: '2025-06-01',
    lastJobTitle: 'فني أجهزة طبية',
    activeBenefit: {
      hasActiveRequest: true,
      requestId: 'DIS-2025-000234',
      currentStatus: 'منفعة قيد الإجراء',
      isDisbursed: true,
      lastDepositedMonth: 'مارس 2026',
    },
    employeeRecommendation: null,
    headDecision: null,
    decision: null,
    attachments: [
      { id: 'ret1', type: 'بطاقة إعاقة', name: 'بطاقة_الاعاقة.pdf', uploadDate: '2025-01-20', uploadedBy: 'نظام المستحقات', role: 'نظام', size: '0.8 MB', icon: 'pdf' },
    ],
    notes: [],
    timeline: [
      { action: 'تم استلام الاستعلام', actor: 'نظام المستحقات', role: 'نظام', time: '2025-01-20 09:00', fromStatus: '', toStatus: 'تم استلام الاستعلام — بانتظار مراجعة موظف قسم الإعاقة والأمراض المستديمة', note: 'تم استلام الاستعلام تلقائياً من نظام المستحقات', type: 'default' },
    ],
    assignedTo: 'نورة بنت سالم الزدجالية',
    checkedOutBy: null,
    suspended: false,
  },
  {
    id: 'RET-2025-000124',
    status: 'تم إغلاق الاستعلام — مؤهل للتقاعد المبكر',
    receivedDate: '2025-01-15',
    lastUpdate: '2025-01-18 14:30',
    lastUpdatedBy: 'بدر بن خميس العبري',
    expectedClosureDate: '2025-01-25',
    remainingDays: 7,
    applicant: {
      name: 'سعيد بن علي الحبسي',
      civil: '9001234567',
      phone: '96891234567',
      email: 'said.h@mail.com',
      dob: '1977-11-04',
      gender: 'ذكر',
      nationality: 'عُماني',
      address: 'شمال الباطنة — صحار — حي الوقيبة',
    },
    employmentHistory: [
      { employerName: 'شركة عُمان للاتصالات', cr: '2233445', jobTitle: 'فني شبكات أول', startDate: '2008-06-01', endDate: null, current: true },
      { employerName: 'مؤسسة الرؤية الرقمية', cr: '5566778', jobTitle: 'فني دعم', startDate: '2001-03-01', endDate: '2008-05-20', current: false },
    ],
    mosdCard: {
      number: 'DIS-CARD-0076543',
      issueDate: '2018-08-10',
      expiryDate: '2028-08-09',
      status: 'سارية',
      disabilities: [
        { source: 'MOH', name: 'إعاقة بصرية', level: 'درجة أولى', examinationDate: '2018-07-20' },
        { source: 'MOSD', name: 'ضعف بصري شديد', level: 'درجة أولى', examinationDate: '2018-08-02' },
      ],
    },
    disabilityCard: 'DIS-CARD-0076543',
    cardIssueDate: '2018-08-10',
    disabilityType: 'إعاقة بصرية',
    disabilityLevel: 'درجة أولى',
    disabilityDetails: 'فقدان بصر كلي في العين اليمنى مع ضعف جزئي في العين اليسرى',
    currentEmployer: 'شركة عُمان للاتصالات',
    retirementDate: '2025-05-01',
    lastJobTitle: 'فني شبكات أول',
    activeBenefit: {
      hasActiveRequest: false,
      requestId: 'DIS-2024-000991',
      currentStatus: 'لا توجد منفعة نشطة قيد الإجراء',
      isDisbursed: true,
      lastDepositedMonth: 'فبراير 2026',
    },
    employeeRecommendation: {
      type: 'معتمد',
      date: '2025-01-17',
      issuer: 'نورة بنت سالم الزدجالية',
      details: 'الحالة مستوفية لشروط التقاعد المبكر وتم رفع التوصية لرئيس القسم',
      retirementEligible: true,
    },
    headDecision: {
      type: 'معتمد',
      date: '2025-01-18',
      issuer: 'بدر بن خميس العبري',
      details: 'تمت الموافقة على توصية الموظف وإغلاق الاستعلام',
      retirementEligible: true,
    },
    decision: {
      type: 'معتمد',
      date: '2025-01-18',
      issuer: 'بدر بن خميس العبري',
      details: 'مستوفية لشروط التقاعد المبكر للأشخاص ذوي الإعاقة',
      retirementEligible: true,
      retirementDate: '2025-05-01',
      pensionAmount: 450,
    },
    attachments: [
      { id: 'ret2', type: 'بطاقة إعاقة', name: 'بطاقة_الحبسي.pdf', uploadDate: '2025-01-15', uploadedBy: 'نظام المستحقات', role: 'نظام', size: '0.7 MB', icon: 'pdf' },
      { id: 'ret3', type: 'تقرير طبي', name: 'تقرير_طبي_بصري.pdf', uploadDate: '2025-01-15', uploadedBy: 'نظام المستحقات', role: 'نظام', size: '1.2 MB', icon: 'pdf' },
    ],
    notes: [],
    timeline: [
      { action: 'تم استلام الاستعلام', actor: 'نظام المستحقات', role: 'نظام', time: '2025-01-15 10:00', fromStatus: '', toStatus: 'تم استلام الاستعلام — بانتظار مراجعة موظف قسم الإعاقة والأمراض المستديمة', note: 'تم استلام الاستعلام تلقائياً من نظام المستحقات', type: 'default' },
      { action: 'رفع توصية الموظف', actor: 'نورة بنت سالم الزدجالية', role: 'موظف قسم الإعاقة والأمراض المستديمة', time: '2025-01-17 11:20', fromStatus: 'تم استلام الاستعلام — بانتظار مراجعة موظف قسم الإعاقة والأمراض المستديمة', toStatus: 'بانتظار اعتماد رئيس قسم الإعاقة والأمراض المستديمة', note: 'التوصية: اعتماد الأهلية للتقاعد المبكر', type: 'info', phone: '96895557777' },
      { action: 'إغلاق الاستعلام', actor: 'بدر بن خميس العبري', role: 'رئيس قسم الإعاقة والأمراض المستديمة', time: '2025-01-18 14:30', fromStatus: 'بانتظار اعتماد رئيس قسم الإعاقة والأمراض المستديمة', toStatus: 'تم إغلاق الاستعلام — مؤهل للتقاعد المبكر', note: 'مستوفية لشروط التقاعد المبكر', type: 'success', phone: '96895558888' },
    ],
    assignedTo: 'نورة بنت سالم الزدجالية',
    checkedOutBy: 'بدر بن خميس العبري',
    suspended: false,
    closedBy: 'بدر بن خميس العبري',
    closedDate: '2025-01-18',
  },
];

/* ================================================================
   Export for use in main data.js (Global Scope)
   ================================================================ */

// Make data available globally for browser loading
window.DISABILITY_RETIREMENT_TEMPLATE = DISABILITY_RETIREMENT_TEMPLATE;
window.DISABILITY_RETIREMENT_DATA = DISABILITY_RETIREMENT_DATA;
window.createDisabilityRetirementInquiry = createDisabilityRetirementInquiry;
window.validateDisabilityRetirementInquiry = validateDisabilityRetirementInquiry;
window.getDisabilityRetirementById = getDisabilityRetirementById;
window.getDisabilityRetirementByStatus = getDisabilityRetirementByStatus;
window.isRetirementInquiryApproachingDeadline = isRetirementInquiryApproachingDeadline;
