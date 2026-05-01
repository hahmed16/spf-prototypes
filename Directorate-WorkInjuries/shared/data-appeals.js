/* ================================================================
   data-appeals.js — طلبات التظلم
   ================================================================ */

/* ================================================================
   Standard Template for Appeal Request
   ================================================================ */

const APPEAL_TEMPLATE = {
  // Basic Request Information
  id: '', // Unique request identifier (e.g., 'APP-2025-000067')
  originalRequestId: '', // ID of original request being appealed
  originalRequestType: '', // Type of original request
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
    role: '', // Role
    phone: '', // Phone number
    email: '', // Email address
  },

  // Insured Person Information
  insured: {
    name: '', // Full name
    civil: '', // Civil ID number
    insurance: '', // Insurance number
    dob: '', // Date of birth
    gender: '', // Gender
    nationality: '', // Nationality
    insuranceStatus: '', // Insurance status
    regDate: '', // Registration date
    subType: '', // Subscription type
  },

  // Employer Information
  employer: {
    name: '', // Name of employer
    cr: '', // Commercial registration number
    establishment: '', // Establishment number
    jobTitle: '', // Job title
    joinDate: '', // Date of joining
    location: '', // Work location
    sector: '', // Sector
    employerType: '', // Employer type
    branch: { // Branch information
      id: '', // Branch ID
      name: '', // Branch name
      state: '', // State
      governorate: '', // Governorate
    },
  },

  // Original Decision Information
  decision: {
    type: '', // Decision type
    date: '', // Date of original decision
    issuer: '', // Name of issuer
    details: '', // Details of the decision
    knowledgeDate: '', // Date when applicant became aware of the decision
  },

  // Appeal Information
  appealReason: '', // Reason for appeal
  appealDetails: '', // Detailed explanation of appeal
  additionalNotes: '', // Additional notes

  // Session Information
  session: {
    id: '', // Session ID
    institution: '', // Health institution name
    date: '', // Session date
    time: '', // Session time
    quorum: false, // Quorum status
    members: [], // Array of committee members
  },

  // Final Decision
  finalDecision: {
    type: '', // Final decision type
    date: '', // Date of final decision
    content: '', // Content of final decision
    signatories: [], // Array of signing member names
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
   Helper Functions for Appeals Data
   ================================================================ */

/**
 * Create a new appeal request with default structure
 * @param {object} data - Request data to override defaults
 * @returns {object} Complete appeal request object
 */
function createAppealRequest(data = {}) {
  return {
    ...APPEAL_TEMPLATE,
    ...data,
    applicant: { ...APPEAL_TEMPLATE.applicant, ...data.applicant },
    insured: { ...APPEAL_TEMPLATE.insured, ...data.insured },
    employer: { ...APPEAL_TEMPLATE.employer, ...data.employer },
    decision: { ...APPEAL_TEMPLATE.decision, ...data.decision },
    session: data.session ? { ...APPEAL_TEMPLATE.session, ...data.session } : null,
    finalDecision: data.finalDecision ? { ...APPEAL_TEMPLATE.finalDecision, ...data.finalDecision } : null,
  };
}

/**
 * Validate appeal request data
 * @param {object} request - Request object to validate
 * @returns {object} Validation result with isValid and errors array
 */
function validateAppealRequest(request) {
  const errors = [];

  // Required fields
  if (!request.id || typeof request.id !== 'string') {
    errors.push('Request ID is required and must be a string');
  }

  if (!request.originalRequestId || typeof request.originalRequestId !== 'string') {
    errors.push('Original request ID is required');
  }

  if (!request.originalRequestType || typeof request.originalRequestType !== 'string') {
    errors.push('Original request type is required');
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

  // Original decision validation
  if (!request.decision || !request.decision.type) {
    errors.push('Original decision type is required');
  }

  if (!request.decision || !request.decision.date) {
    errors.push('Original decision date is required');
  }

  // Appeal information validation
  if (!request.appealReason || typeof request.appealReason !== 'string') {
    errors.push('Appeal reason is required');
  }

  if (!request.appealDetails || typeof request.appealDetails !== 'string') {
    errors.push('Appeal details are required');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

/**
 * Get appeal request by ID
 * @param {string} id - Request ID
 * @param {array} appeals - Array of appeal requests
 * @returns {object|null} Request object or null if not found
 */
function getAppealById(id, appeals) {
  return appeals.find(req => req.id === id) || null;
}

/**
 * Get appeals by original request ID
 * @param {string} originalRequestId - Original request ID
 * @param {array} appeals - Array of appeal requests
 * @returns {array} Filtered array of appeals
 */
function getAppealsByOriginalRequestId(originalRequestId, appeals) {
  return appeals.filter(req => req.originalRequestId === originalRequestId);
}

/**
 * Get appeals by status
 * @param {string} status - Request status
 * @param {array} appeals - Array of appeal requests
 * @returns {array} Filtered array of requests
 */
function getAppealsByStatus(status, appeals) {
  return appeals.filter(req => req.status === status);
}

/**
 * Check if appeal is within deadline
 * @param {object} request - Appeal request object
 * @param {number} deadlineDays - Deadline in days (default: 30)
 * @returns {object} Result with isWithinDeadline and daysRemaining
 */
function checkAppealDeadline(request, deadlineDays = 30) {
  if (!request.decision || !request.decision.knowledgeDate) {
    return { isWithinDeadline: false, daysRemaining: 0 };
  }

  const knowledgeDate = new Date(request.decision.knowledgeDate);
  const today = new Date();
  const diffTime = today - knowledgeDate;
  const daysRemaining = deadlineDays - Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    isWithinDeadline: daysRemaining > 0,
    daysRemaining: daysRemaining
  };
}

/* ================================================================
   Sample Data - Appeals
   ================================================================ */

const APPEALS_DATA = [
  {
    id: 'APP-2025-000067',
    originalRequestId: 'WI-2024-000987',
    originalRequestType: 'بدلات انقطاع عن العمل',
    status: 'تم تقديم طلب التظلم — بانتظار مراجعة موظف قسم اللجان الطبية',
    submitDate: '2025-01-10',
    lastUpdate: '2025-01-10 14:30',
    lastUpdatedBy: null,
    expectedClosureDate: null,
    remainingDays: null,
    applicant: { name: 'ليلى بنت سيف الحوسنية', civil: '9056789012', role: 'العامل / المؤمن عليه / المواطن', phone: '96895432109', email: 'laila.h@mail.com' },
    insured: { name: 'ليلى بنت سيف الحوسنية', civil: '9056789012', insurance: 'IN-20200089012', dob: '1990-12-10', gender: 'أنثى', nationality: 'عُمانية', insuranceStatus: 'نشط', regDate: '2020-05-01', subType: 'إلزامي' },
    employer: { name: 'دار الرعاية الصحية الخاصة', cr: '5678901', establishment: 'EST-0054321', jobTitle: 'ممرضة', joinDate: '2020-05-01', location: 'مطرح', sector: null, employerType: null, branch: null },
    decision: { type: 'رفض', date: '2024-11-15', issuer: 'رئيس قسم التحقيق في إصابات العمل', details: 'رُفض الطلب لعدم استيفاء شروط إصابة العمل — غياب الأدلة الكافية وعدم وجود شهود.', knowledgeDate: '2024-11-20' },
    appealReason: 'القرار مخالف للأنظمة',
    appealDetails: 'لم يُؤخذ بعين الاعتبار شهادة المشرف المباشر الذي أكد وقوع الحادثة أثناء العمل. أرفق شهادة المشرف وتقريراً طبياً مفصلاً.',
    additionalNotes: '',
    session: null,
    finalDecision: null,
    attachments: [
      { id: 'aatt1', type: 'مستند داعم', name: 'شهادة_المشرف.pdf', uploadDate: '2025-01-10', uploadedBy: 'ليلى الحوسنية', role: 'العامل', size: '0.6 MB', icon: 'pdf' },
      { id: 'aatt2', type: 'تقرير طبي', name: 'تقرير_طبي_مفصل.pdf', uploadDate: '2025-01-10', uploadedBy: 'ليلى الحوسنية', role: 'العامل', size: '1.8 MB', icon: 'pdf' },
    ],
    notes: [],
    timeline: [
      { action: 'تم تقديم التظلم', actor: 'ليلى بنت سيف الحوسنية', role: 'العامل', time: '2025-01-10 14:30', fromStatus: '', toStatus: 'تم تقديم طلب التظلم', note: '', type: 'default' },
    ],
    assignedTo: 'سعاد بنت أحمد الريامية',
    checkedOutBy: 'سعاد بنت أحمد الريامية',
  },
  {
    id: 'APP-2025-000068',
    originalRequestId: 'WI-2025-001090',
    originalRequestType: 'بدلات انقطاع عن العمل',
    status: 'بانتظار اعتماد رئيس قسم اللجان الطبية',
    submitDate: '2025-01-15',
    lastUpdate: '2025-01-20 12:00',
    lastUpdatedBy: 'محمد بن راشد الهنائي',
    expectedClosureDate: '2025-02-15',
    remainingDays: 17,
    applicant: { name: 'خالد بن عيسى المعمري', civil: '9022334455', role: 'المؤمن عليه', phone: '96892233445', email: 'khaled.m@mail.com' },
    insured: { name: 'خالد بن عيسى المعمري', civil: '9022334455', insurance: 'IN-20120033442', dob: '1975-02-10', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2012-01-01', subType: 'إلزامي' },
    employer: { name: 'شركة عُمان للبتروكيماويات', cr: '5544332', establishment: 'EST-0022334', jobTitle: 'فني غرف تحكم', joinDate: '2012-01-01', location: 'صحار', sector: 'الإنشاءات والمقاولات', employerType: 'خاص', branch: { id: 'BR-001', name: 'الفرع الرئيسي', state: 'مسقط', governorate: 'بوشر' } },
    decision: {
      type: 'اعتراض على الإحالة',
      date: '2025-01-14',
      issuer: 'موظف قسم اللجان الطبية',
      details: 'أوصى الموظف بإحالة الحالة إلى مؤسسة صحية مرخصة لتحديد نسبة العجز الدائم، مع اعتماد ملف الفحوصات العينية والتقارير التخصصية.',
      knowledgeDate: '2025-01-15'
    },
    appealReason: 'القرار يحتاج مراجعة طبية أدق',
    appealDetails: 'يرى مقدم التظلم أن التقرير المرفوع يحتاج إلى عرض الحالة على مؤسسة صحية ذات تخصص دقيق في إصابات الوجه والعيون قبل اعتماد مسار اللجنة، وأرفق تقريراً إضافياً من استشاري العيون.',
    additionalNotes: 'الحالة مرتبطة بطلب أصلي جسيم وتحتاج قراراً سريعاً قبل تثبيت الجلسة.',
    session: null,
    finalDecision: null,
    attachments: [
      { id: 'aatt68-1', type: 'تقرير طبي تخصصي', name: 'تقرير_استشاري_العيون.pdf', uploadDate: '2025-01-15', uploadedBy: 'خالد بن عيسى المعمري', role: 'المؤمن عليه', size: '1.4 MB', icon: 'pdf' },
      { id: 'aatt68-2', type: 'خطاب تظلم', name: 'خطاب_التظلم_الطبي.pdf', uploadDate: '2025-01-15', uploadedBy: 'خالد بن عيسى المعمري', role: 'المؤمن عليه', size: '0.3 MB', icon: 'pdf' },
    ],
    notes: [
      { id: 'app68-n1', author: 'سعاد بنت أحمد الريامية', role: 'موظف قسم اللجان الطبية', text: 'تمت مراجعة مستندات التظلم ورفع التوصية إلى رئيس القسم لاعتماد المسار المناسب للحالة.', time: '2025-01-19 15:10' }
    ],
    timeline: [
      { action: 'تم تقديم التظلم', actor: 'خالد بن عيسى المعمري', role: 'المؤمن عليه', time: '2025-01-15 09:30', fromStatus: '', toStatus: 'تم تقديم طلب التظلم — بانتظار مراجعة موظف قسم اللجان الطبية', note: '', type: 'default' },
      { action: 'رفع التوصية إلى رئيس القسم', actor: 'سعاد بنت أحمد الريامية', role: 'موظف قسم اللجان الطبية', time: '2025-01-19 15:15', fromStatus: 'تم تقديم طلب التظلم — بانتظار مراجعة موظف قسم اللجان الطبية', toStatus: 'بانتظار اعتماد رئيس قسم اللجان الطبية', note: 'التوصية: اعتماد التظلم وإعادة تقييم المسار الطبي', type: 'success' },
    ],
    assignedTo: 'محمد بن راشد الهنائي',
    checkedOutBy: 'محمد بن راشد الهنائي',
  },
  {
    id: 'APP-2025-000069',
    originalRequestId: 'REF-2025-000124',
    originalRequestType: 'عرض مباشر',
    status: 'تم جدولة جلسة لجنة التظلمات',
    submitDate: '2025-01-27',
    lastUpdate: '2025-01-29 10:40',
    lastUpdatedBy: 'سعاد بنت أحمد الريامية',
    expectedClosureDate: '2025-02-20',
    remainingDays: 12,
    applicant: { name: 'خالد بن سعيد البلوشي', civil: '9087654321', role: 'الشخص المفوض من جهة العمل', phone: '96891234567', email: 'khalid.b@company.com' },
    insured: { name: 'حمد بن سلطان العزري', civil: '9049911223', insurance: 'INS-998812', dob: '1988-04-09', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2020-02-11', subType: 'إلزامي' },
    employer: { name: 'مجموعة النور للإنشاءات', cr: '1234567', establishment: 'EST-2023', jobTitle: 'مشرف موقع', joinDate: '2020-02-11', location: 'صحار', sector: 'الإنشاءات والمقاولات', employerType: 'خاص', branch: null },
    decision: { type: 'موافقة', date: '2025-01-26', issuer: 'اللجان الطبية', details: 'قرار اللجنة الطبية بشأن طلب العرض المباشر المرتبط بالحالة المهنية.', knowledgeDate: '2025-01-27' },
    appealReason: 'الاعتراض على القرار الطبي النهائي الصادر في طلب العرض المباشر',
    appealDetails: 'ترى جهة العمل أن القرار يحتاج إعادة نظر لوجود تقارير إضافية لم تُعرض ضمن الجلسة الأصلية.',
    additionalNotes: 'تم إنشاء التظلم من سياق قرار اللجنة الطبية.',
    session: { id: 'APP-SES-2025-004', institution: 'لجنة التظلمات', date: '2025-02-05', time: '11:00', quorum: true, members: ['د. خالد الهاشمي', 'ليلى الفارسية'] },
    finalDecision: null,
    attachments: [
      { id: 'aatt69-1', type: 'تقرير داعم', name: 'تقرير_طبي_إضافي.pdf', uploadDate: '2025-01-27', uploadedBy: 'خالد بن سعيد البلوشي', role: 'الشخص المفوض من جهة العمل', size: '0.9 MB', icon: 'pdf' },
    ],
    notes: [],
    timeline: [
      { action: 'تم تقديم التظلم', actor: 'خالد بن سعيد البلوشي', role: 'الشخص المفوض من جهة العمل', time: '2025-01-27 09:15', fromStatus: '', toStatus: 'تم تقديم طلب التظلم — بانتظار مراجعة موظف قسم اللجان الطبية', note: 'تم إنشاء التظلم على قرار مرتبط بطلب عرض مباشر', type: 'default' },
      { action: 'جدولة جلسة لجنة التظلمات', actor: 'سعاد بنت أحمد الريامية', role: 'موظف قسم اللجان الطبية', time: '2025-01-29 10:40', fromStatus: 'تم تقديم طلب التظلم — بانتظار مراجعة موظف قسم اللجان الطبية', toStatus: 'تم جدولة جلسة لجنة التظلمات', note: 'ربط التظلم بسجل القرار الطبي السابق لعرضه على لجنة التظلمات', type: 'info', phone: '96895559999' },
    ],
    assignedTo: 'سعاد بنت أحمد الريامية',
    checkedOutBy: '',
  },
];

/* ================================================================
   Export for use in main data.js (Global Scope)
   ================================================================ */

// Make data available globally for browser loading
window.APPEAL_TEMPLATE = APPEAL_TEMPLATE;
window.APPEALS_DATA = APPEALS_DATA;
window.createAppealRequest = createAppealRequest;
window.validateAppealRequest = validateAppealRequest;
window.getAppealById = getAppealById;
window.getAppealsByOriginalRequestId = getAppealsByOriginalRequestId;
window.getAppealsByStatus = getAppealsByStatus;
window.checkAppealDeadline = checkAppealDeadline;
