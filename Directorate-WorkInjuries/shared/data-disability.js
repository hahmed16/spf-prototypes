/* ================================================================
   data-disability.js — طلبات منفعة الإعاقة
   ================================================================ */

/* ================================================================
   Standard Template for Disability Benefit Request
   ================================================================ */

const DISABILITY_TEMPLATE = {
  // Basic Request Information
  id: '', // Unique request identifier (e.g., 'DIS-2025-000234')
  status: '', // Current status
  submitDate: '', // Submission date (YYYY-MM-DD)
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
    role: '', // Role (e.g., 'المواطن', 'العامل')
  },

  // Disability Card Information
  card: {
    number: '', // Disability card number
    status: '', // Card status: 'سارية' or other
    activationDate: '', // Card activation date
    expiryDate: '', // Card expiry date
    issueDate: '', // Card issue date
    disabilities: [], // Array of disability objects with structure: { source: 'MOH'|'MOSD', name: '', level: '', examinationDate: '' }
    provenDate: '', // Date when disability was proven
    lastCheck: '', // Date of last check
  },

  // Insurance Information
  insurance: {
    status: '', // Insurance status: 'نشط' or other
    regDate: '', // Registration date
    subType: '', // Subscription type: 'إلزامي' or 'اختياري'
    otherBenefits: '', // Other benefits: 'لا يوجد' or other
  },

  // Disbursement Information
  disbursement: {
    approved: false, // Approval status
    approvalDate: '', // Date of approval
    monthlyDay: null, // Day of month for disbursement
    status: '', // Disbursement status
    expiryDate: '', // Expiry date
    stopReason: '', // Reason for stopping
    lastCheck: '', // Date of last check
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
   Helper Functions for Disability Data
   ================================================================ */

/**
 * Create a new disability request with default structure
 * @param {object} data - Request data to override defaults
 * @returns {object} Complete disability request object
 */
function createDisabilityRequest(data = {}) {
  return {
    ...DISABILITY_TEMPLATE,
    ...data,
    applicant: { ...DISABILITY_TEMPLATE.applicant, ...data.applicant },
    card: { ...DISABILITY_TEMPLATE.card, ...data.card },
    insurance: { ...DISABILITY_TEMPLATE.insurance, ...data.insurance },
    disbursement: data.disbursement ? { ...DISABILITY_TEMPLATE.disbursement, ...data.disbursement } : null,
  };
}

/**
 * Validate disability request data
 * @param {object} request - Request object to validate
 * @returns {object} Validation result with isValid and errors array
 */
function validateDisabilityRequest(request) {
  const errors = [];

  // Required fields
  if (!request.id || typeof request.id !== 'string') {
    errors.push('Request ID is required and must be a string');
  }

  if (!request.status || typeof request.status !== 'string') {
    errors.push('Request status is required and must be a string');
  }

  if (!request.submitDate || typeof request.submitDate !== 'string') {
    errors.push('Submit date is required and must be a string');
  }

  // Applicant validation
  if (!request.applicant || !request.applicant.name) {
    errors.push('Applicant name is required');
  }

  if (!request.applicant || !request.applicant.civil) {
    errors.push('Applicant civil ID is required');
  }

  // Card validation
  if (!request.card || !request.card.number) {
    errors.push('Disability card number is required');
  }

  if (!request.card || !request.card.status) {
    errors.push('Card status is required');
  }

  if (!request.card || !request.card.expiryDate) {
    errors.push('Card expiry date is required');
  }

  // Disabilities validation
  if (!request.card || !request.card.disabilities || !Array.isArray(request.card.disabilities) || request.card.disabilities.length === 0) {
    errors.push('At least one disability is required');
  } else {
    request.card.disabilities.forEach((disability, index) => {
      if (!disability.source || !['MOH', 'MOSD'].includes(disability.source)) {
        errors.push(`Disability ${index + 1}: source must be either 'MOH' or 'MOSD'`);
      }
      if (!disability.name || typeof disability.name !== 'string') {
        errors.push(`Disability ${index + 1}: name is required`);
      }
      if (!disability.level || typeof disability.level !== 'string') {
        errors.push(`Disability ${index + 1}: level is required`);
      }
      if (!disability.examinationDate || typeof disability.examinationDate !== 'string') {
        errors.push(`Disability ${index + 1}: examination date is required`);
      }
    });
  }

  // Insurance validation
  if (!request.insurance || !request.insurance.status) {
    errors.push('Insurance status is required');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

/**
 * Get disability request by ID
 * @param {string} id - Request ID
 * @param {array} disabilities - Array of disability requests
 * @returns {object|null} Request object or null if not found
 */
function getDisabilityById(id, disabilities) {
  return disabilities.find(req => req.id === id) || null;
}

/**
 * Get disability requests by status
 * @param {string} status - Request status
 * @param {array} disabilities - Array of disability requests
 * @returns {array} Filtered array of requests
 */
function getDisabilitiesByStatus(status, disabilities) {
  return disabilities.filter(req => req.status === status);
}

/**
 * Check if disability card is expiring soon
 * @param {object} request - Disability request object
 * @param {number} daysThreshold - Days threshold for expiry warning
 * @returns {boolean} True if card is expiring within threshold
 */
function isCardExpiringSoon(request, daysThreshold = 30) {
  if (!request.card || !request.card.expiryDate) {
    return false;
  }

  const expiryDate = new Date(request.card.expiryDate);
  const today = new Date();
  const diffTime = expiryDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays <= daysThreshold && diffDays > 0;
}

/* ================================================================
   Sample Data - Disability Benefits
   ================================================================ */

const DISABILITY_DATA = [
  {
    id: 'DIS-2025-000234',
    status: 'تم تقديم طلب منفعة الأشخاص ذوي الإعاقة — بانتظار مراجعة موظف قسم الإعاقة والأمراض المستديمة',
    submitDate: '2025-01-15',
    lastUpdate: '2025-01-15 11:00',
    lastUpdatedBy: null,
    expectedClosureDate: null,
    remainingDays: null,
    applicant: { name: 'خلود بنت سعيد الرواسية', civil: '9078901234', phone: '96893210987', email: 'kholoud.r@mail.com', role: 'المواطن' },
    card: { number: 'DIS-CARD-0056789', status: 'سارية', activationDate: '2022-03-10', expiryDate: '2027-03-09', issueDate: '2022-03-10', disabilities: [{ source: 'MOSD', name: 'إعاقة حركية — الأطراف السفلية', level: 'درجة ثانية', examinationDate: '2022-02-01' }], provenDate: '2022-02-01', lastCheck: '2025-01-01' },
    insurance: { status: 'نشط', regDate: '2020-01-15', subType: 'إلزامي', otherBenefits: 'لا يوجد' },
    disbursement: null,
    attachments: [
      { id: 'datt1', type: 'صورة بطاقة الإعاقة', name: 'بطاقة_الاعاقة.pdf', uploadDate: '2025-01-15', uploadedBy: 'خلود الرواسية', role: 'العامل', size: '0.8 MB', icon: 'pdf' },
      { id: 'datt2', type: 'تقرير طبي', name: 'تقرير_طبي_حديث.pdf', uploadDate: '2025-01-15', uploadedBy: 'خلود الرواسية', role: 'العامل', size: '1.3 MB', icon: 'pdf' },
    ],
    notes: [],
    timeline: [
      { action: 'تم تقديم الطلب', actor: 'خلود بنت سعيد الرواسية', role: 'العامل', time: '2025-01-15 11:00', fromStatus: '', toStatus: 'تم تقديم طلب منفعة الأشخاص ذوي الإعاقة', note: '', type: 'default' },
    ],
    assignedTo: 'نورة بنت سالم الزدجالية',
    checkedOutBy: 'نورة بنت سالم الزدجالية',
  },
  {
    id: 'DIS-2024-000198',
    status: 'تم اعتماد الطلب — الصرف جارٍ',
    submitDate: '2024-08-20',
    lastUpdate: '2024-09-10 10:00',
    lastUpdatedBy: 'بدر بن خميس العبري',
    expectedClosureDate: null,
    remainingDays: null,
    applicant: { name: 'عبدالله بن حمود الهاشمي', civil: '9089012345', phone: '96892109876', email: 'abdullah.h@mail.com', role: 'المواطن' },
    card: { number: 'DIS-CARD-0045678', status: 'سارية', activationDate: '2020-06-15', expiryDate: '2025-06-14', issueDate: '2020-06-15', disabilities: [{ source: 'MOH', name: 'إعاقة بصرية جزئية', level: 'درجة أولى', examinationDate: '2020-05-01' }], provenDate: '2020-05-01', lastCheck: '2025-01-18' },
    insurance: { status: 'نشط', regDate: '2018-06-01', subType: 'إلزامي', otherBenefits: 'لا يوجد' },
    disbursement: { approved: true, approvalDate: '2024-09-10', monthlyDay: 18, status: 'الصرف جارٍ', expiryDate: '2025-06-14', stopReason: null, lastCheck: '2025-01-18' },
    attachments: [
      { id: 'datt3', type: 'صورة بطاقة الإعاقة', name: 'بطاقة_هاشمي.pdf', uploadDate: '2024-08-20', uploadedBy: 'عبدالله الهاشمي', role: 'العامل', size: '0.7 MB', icon: 'pdf' },
    ],
    notes: [],
    timeline: [
      { action: 'تم تقديم الطلب', actor: 'عبدالله بن حمود الهاشمي', role: 'العامل', time: '2024-08-20 09:00', fromStatus: '', toStatus: 'تم تقديم طلب منفعة الأشخاص ذوي الإعاقة', note: '', type: 'default' },
      { action: 'اعتماد الطلب', actor: 'بدر بن خميس العبري', role: 'رئيس قسم الإعاقة والأمراض المستديمة', time: '2024-09-10 10:00', fromStatus: 'بانتظار اعتماد رئيس القسم', toStatus: 'تم اعتماد الطلب — الصرف جارٍ', note: 'تم التحقق من صحة البطاقة وسريانها', type: 'success' },
    ],
    assignedTo: 'نورة بنت سالم الزدجالية',
    checkedOutBy: 'نورة بنت سالم الزدجالية',
  },
  {
    id: 'DIS-2025-000235',
    status: 'بانتظار اعتماد رئيس قسم الإعاقة والأمراض المستديمة',
    submitDate: '2025-01-05',
    lastUpdate: '2025-01-18 10:30',
    lastUpdatedBy: 'نورة بنت سالم الزدجالية',
    expectedClosureDate: null,
    remainingDays: null,
    applicant: { name: 'منى بنت أحمد البلوشية', civil: '9012233446', phone: '96891223349', email: 'mona.b@mail.com', role: 'المواطن' },
    card: { number: 'DIS-CARD-0011223', status: 'سارية', activationDate: '2023-01-01', expiryDate: '2028-01-01', issueDate: '2023-01-01', disabilities: [{ source: 'MOSD', name: 'إعاقة سمعية تامة', level: 'فقدان سمع كلي', examinationDate: '2022-12-15' }], provenDate: '2022-12-15', lastCheck: null },
    insurance: { status: 'نشط', regDate: '2015-05-01', subType: 'إلزامي', otherBenefits: 'لا يوجد' },
    disbursement: null,
    attachments: [],
    notes: [],
    timeline: [
      { action: 'توصية بالموافقة والرفع للاعتماد', actor: 'نورة بنت سالم الزدجالية', role: 'موظف قسم الإعاقة', time: '2025-01-18 10:30', fromStatus: 'قيد المراجعة', toStatus: 'بانتظار اعتماد رئيس قسم الإعاقة والأمراض المستديمة', note: 'مستوفية للشروط', type: 'success' }
    ],
    assignedTo: 'بدر بن خميس العبري',
    checkedOutBy: 'بدر بن خميس العبري',
  },
  {
    id: 'DIS-2025-000236',
    status: 'تم تقديم طلب منفعة الأشخاص ذوي الإعاقة — بانتظار مراجعة موظف قسم الإعاقة والأمراض المستديمة',
    submitDate: '2025-01-25',
    lastUpdate: '2025-01-25 14:00',
    lastUpdatedBy: null,
    expectedClosureDate: null,
    remainingDays: null,
    applicant: { name: 'سالم بن محمد البوسعيدي', civil: '9033456789', phone: '96893345678', email: 'salem.b@mail.com', role: 'المواطن' },
    card: { number: 'DIS-CARD-0098765', status: 'سارية', activationDate: '2021-07-15', expiryDate: '2026-07-14', issueDate: '2021-07-15', disabilities: [{ source: 'MOH', name: 'إعاقة حركية', level: 'درجة ثالثة', examinationDate: '2021-06-20' }, { source: 'MOSD', name: 'إعاقة بصرية', level: 'درجة أولى', examinationDate: '2021-06-25' }], provenDate: '2021-06-20', lastCheck: '2025-01-20' },
    insurance: { status: 'نشط', regDate: '2019-03-01', subType: 'إلزامي', otherBenefits: 'لا يوجد' },
    disbursement: null,
    attachments: [
      { id: 'datt4', type: 'صورة بطاقة الإعاقة', name: 'بطاقة_البوسعيدي.pdf', uploadDate: '2025-01-25', uploadedBy: 'سالم البوسعيدي', role: 'العامل', size: '0.9 MB', icon: 'pdf' },
    ],
    notes: [],
    timeline: [
      { action: 'تم تقديم الطلب', actor: 'سالم بن محمد البوسعيدي', role: 'العامل', time: '2025-01-25 14:00', fromStatus: '', toStatus: 'تم تقديم طلب منفعة الأشخاص ذوي الإعاقة', note: '', type: 'default' },
    ],
    assignedTo: 'نورة بنت سالم الزدجالية',
    checkedOutBy: 'نورة بنت سالم الزدجالية',
  },
];

/* ================================================================
   Export for use in main data.js (Global Scope)
   ================================================================ */

// Make data available globally for browser loading
window.DISABILITY_TEMPLATE = DISABILITY_TEMPLATE;
window.DISABILITY_DATA = DISABILITY_DATA;
window.createDisabilityRequest = createDisabilityRequest;
window.validateDisabilityRequest = validateDisabilityRequest;
window.getDisabilityById = getDisabilityById;
window.getDisabilitiesByStatus = getDisabilitiesByStatus;
window.isCardExpiringSoon = isCardExpiringSoon;
