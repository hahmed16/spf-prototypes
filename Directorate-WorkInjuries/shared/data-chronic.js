/* ================================================================
   data-chronic.js — طلبات الأمراض المستديمة
   ================================================================ */

/* ================================================================
   Standard Template for Chronic Disease Request
   ================================================================ */

const CHRONIC_TEMPLATE = {
  // Basic Request Information
  id: '', // Unique request identifier (e.g., 'CHR-2025-000123')
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
    role: '', // Role
  },

  // Chronic Disease Information
  chronic: {
    chronicDisease: '', // Name of chronic disease
    diagnosisDate: '', // Date of diagnosis
    severity: '', // Disease severity
    treatment: '', // Current treatment
    medications: [], // List of medications
    complications: '', // Any complications
    lastAssessment: '', // Date of last assessment
    nextAssessment: '', // Date of next assessment
    path: '', // Path: 'المسار المؤسسات الصحية الخاصة' or 'الاستحقاق المباشر'
  },

  // Insurance Information
  insurance: {
    status: '', // Insurance status
    regDate: '', // Registration date
    subType: '', // Subscription type
    otherBenefits: '', // Other benefits
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

  // Referral Information
  referral: null, // Referral object if applicable

  // Session Information
  session: null, // Session object if applicable

  // Committee Decision
  committeeDecision: null, // Committee decision object if applicable
};

/* ================================================================
   Helper Functions for Chronic Disease Data
   ================================================================ */

/**
 * Create a new chronic disease request with default structure
 * @param {object} data - Request data to override defaults
 * @returns {object} Complete chronic disease request object
 */
function createChronicRequest(data = {}) {
  return {
    ...CHRONIC_TEMPLATE,
    ...data,
    applicant: { ...CHRONIC_TEMPLATE.applicant, ...data.applicant },
    chronic: { ...CHRONIC_TEMPLATE.chronic, ...data.chronic },
    insurance: { ...CHRONIC_TEMPLATE.insurance, ...data.insurance },
    disbursement: data.disbursement ? { ...CHRONIC_TEMPLATE.disbursement, ...data.disbursement } : null,
    referral: data.referral ? { ...CHRONIC_TEMPLATE.referral, ...data.referral } : null,
    session: data.session ? { ...CHRONIC_TEMPLATE.session, ...data.session } : null,
    committeeDecision: data.committeeDecision ? { ...CHRONIC_TEMPLATE.committeeDecision, ...data.committeeDecision } : null,
  };
}

/**
 * Validate chronic disease request data
 * @param {object} request - Request object to validate
 * @returns {object} Validation result with isValid and errors array
 */
function validateChronicRequest(request) {
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

  // Chronic disease validation
  if (!request.chronic || !request.chronic.chronicDisease) {
    errors.push('Chronic disease name is required');
  }

  if (!request.chronic || !request.chronic.diagnosisDate) {
    errors.push('Diagnosis date is required');
  }

  // Path validation
  if (!request.chronic || !request.chronic.path) {
    errors.push('Path is required');
  } else if (!['المسار المؤسسات الصحية الخاصة', 'الاستحقاق المباشر'].includes(request.chronic.path)) {
    errors.push('Path must be either "المسار المؤسسات الصحية الخاصة" or "الاستحقاق المباشر"');
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
 * Get chronic disease request by ID
 * @param {string} id - Request ID
 * @param {array} chronicRequests - Array of chronic disease requests
 * @returns {object|null} Request object or null if not found
 */
function getChronicById(id, chronicRequests) {
  return chronicRequests.find(req => req.id === id) || null;
}

/**
 * Get chronic disease requests by status
 * @param {string} status - Request status
 * @param {array} chronicRequests - Array of chronic disease requests
 * @returns {array} Filtered array of requests
 */
function getChronicByStatus(status, chronicRequests) {
  return chronicRequests.filter(req => req.status === status);
}

/**
 * Check if reassessment is due
 * @param {object} request - Chronic disease request object
 * @param {number} daysThreshold - Days threshold for reassessment warning
 * @returns {boolean} True if reassessment is due within threshold
 */
function isReassessmentDue(request, daysThreshold = 30) {
  if (!request.chronic || !request.chronic.nextAssessment) {
    return false;
  }

  const assessmentDate = new Date(request.chronic.nextAssessment);
  const today = new Date();
  const diffTime = assessmentDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays <= daysThreshold && diffDays > 0;
}

/* ================================================================
   Sample Data - Chronic Diseases
   ================================================================ */

const CHRONIC_DATA = [
  {
    id: 'CHR-2025-000123',
    status: 'تم تقديم طلب مرض مستديم — بانتظار مراجعة موظف قسم الإعاقة والأمراض المستديمة',
    submitDate: '2025-01-20',
    lastUpdate: '2025-01-20 09:00',
    lastUpdatedBy: null,
    expectedClosureDate: null,
    remainingDays: null,
    applicant: { name: 'محمد بن سالم البوسعيدي', civil: '9045678901', phone: '96894567890', email: 'mohammed.b@mail.com', role: 'المواطن' },
    chronic: {
      chronicDisease: 'داء السكري من النوع الثاني',
      diagnosisDate: '2020-05-15',
      severity: 'متوسط',
      treatment: 'الأنسولين والمراقبة المستمرة لمستوى السكر',
      medications: ['ميتفورمين', 'الأنسولين طويل المفعول'],
      complications: 'بدون مضاعفات خطيرة',
      lastAssessment: '2024-12-01',
      nextAssessment: '2025-06-01',
      path: 'الاستحقاق المباشر',
    },
    insurance: { status: 'نشط', regDate: '2018-03-01', subType: 'إلزامي', otherBenefits: 'لا يوجد' },
    disbursement: null,
    attachments: [
      { id: 'catt1', type: 'تقرير طبي', name: 'تقرير_السكري.pdf', uploadDate: '2025-01-20', uploadedBy: 'محمد البوسعيدي', role: 'العامل', size: '1.5 MB', icon: 'pdf' },
    ],
    notes: [],
    timeline: [
      { action: 'تم تقديم الطلب', actor: 'محمد بن سالم البوسعيدي', role: 'العامل', time: '2025-01-20 09:00', fromStatus: '', toStatus: 'تم تقديم طلب مرض مستديم', note: '', type: 'default' },
    ],
    assignedTo: 'نورة بنت سالم الزدجالية',
    checkedOutBy: 'نورة بنت سالم الزدجالية',
    referral: null,
    session: null,
    committeeDecision: null,
  },
  {
    id: 'CHR-2025-000156',
    status: 'تم اعتماد الطلب — الصرف جارٍ',
    submitDate: '2025-01-05',
    lastUpdate: '2025-01-18 10:30',
    lastUpdatedBy: 'بدر بن خميس العبري',
    expectedClosureDate: null,
    remainingDays: null,
    applicant: { name: 'سعيد بن علي الحبسي', civil: '9001234567', phone: '96891234567', email: 'said.h@mail.com', role: 'المواطن' },
    chronic: {
      chronicDisease: 'القصور الكلوي المزمن — المرحلة الثالثة',
      diagnosisDate: '2022-08-10',
      severity: 'متقدم',
      treatment: 'الغسيل الكلوي الدوري',
      medications: ['مضادات للالتهاب', 'فيتامينات'],
      complications: 'فقر دم خفيف',
      lastAssessment: '2024-12-15',
      nextAssessment: '2025-03-15',
      path: 'المسار المؤسسات الصحية الخاصة',
    },
    insurance: { status: 'نشط', regDate: '2015-06-01', subType: 'إلزامي', otherBenefits: 'لا يوجد' },
    disbursement: { approved: true, approvalDate: '2025-01-18', monthlyDay: 15, status: 'الصرف جارٍ', expiryDate: null, stopReason: null, lastCheck: '2025-01-18' },
    attachments: [
      { id: 'catt2', type: 'تقرير طبي', name: 'تقرير_الكلى.pdf', uploadDate: '2025-01-05', uploadedBy: 'سعيد الحبسي', role: 'العامل', size: '2.0 MB', icon: 'pdf' },
    ],
    notes: [],
    timeline: [
      { action: 'تم تقديم الطلب', actor: 'سعيد بن علي الحبسي', role: 'العامل', time: '2025-01-05 14:00', fromStatus: '', toStatus: 'تم تقديم طلب مرض مستديم', note: '', type: 'default' },
      { action: 'اعتماد الطلب', actor: 'بدر بن خميس العبري', role: 'رئيس قسم الإعاقة والأمراض المستديمة', time: '2025-01-18 10:30', fromStatus: 'بانتظار اعتماد رئيس القسم', toStatus: 'تم اعتماد الطلب — الصرف جارٍ', note: 'مستوفية للشروط', type: 'success' },
    ],
    assignedTo: 'نورة بنت سالم الزدجالية',
    checkedOutBy: 'بدر بن خميس العبري',
    referral: null,
    session: null,
    committeeDecision: null,
  },
];

/* ================================================================
   Chronic Incoming Diagnoses (from external hospitals)
   ================================================================ */

const CHRONIC_INCOMING_DATA = [
  {
    refId: 'CHR-IN-2025-00089',
    applicantName: 'نادية بنت ناصر الوقفية',
    civil: '9090123456',
    hospital: 'مستشفى السلطاني — مسقط',
    diagnosis: 'داء السكري من النوع الأول',
    detailedDiagnosis: 'داء السكري من النوع الأول مع تذبذب مرتفع في HbA1c ومضاعفات وعائية دقيقة',
    permanentDiseaseReport: 'تم تشخيص الحالة بداء السكري من النوع الأول مع حاجة مستمرة للعلاج والمتابعة الدورية.\nأظهرت الفحوصات المخبرية تذبذباً مرتفعاً في HbA1c مع مؤشرات لمضاعفات وعائية دقيقة.\nالحالة ذات طبيعة مزمنة غير عابرة وتتطلب خطة علاج طويلة الأمد مع تقييم دوري منتظم.\nوبناءً على ذلك تُعد الحالة ضمن الأمراض المستديمة المثبتة طبياً وفق التقارير المعتمدة.',
    provenDate: '2024-12-01',
    visitDateTime: '2024-12-01 10:30',
    doctor: 'د. محمد بن حسين المنذري',
    expectedPath: 'مسار مباشر',
    severityDate: '2024-11-15',
    uniqueRequestId: 'MOH-CHR-2025-00089',
    chronicDisease: 'داء السكري',
    affectedSystem: 'الغدد الصماء',
    severityIndex: 'MSI: 3/5 — Treatment Burden: متوسط',
    firstRequestRef: null,
    overallCondition: null,
    hasRequest: false,
    requestId: null,
  },
  {
    refId: 'CHR-IN-2025-00078',
    applicantName: 'سعيد بن علي الحبسي',
    civil: '9001234567',
    hospital: 'مستشفى ابن سينا — نزوى',
    diagnosis: 'الفشل الكلوي المزمن',
    detailedDiagnosis: 'فشل كلوي مزمن متقدم (المرحلة الرابعة) مع حاجة لمتابعة غسيل دوري',
    permanentDiseaseReport: 'تشير التقارير الطبية إلى فشل كلوي مزمن متقدم (المرحلة الرابعة) مع انخفاض مستمر في كفاءة وظائف الكلى.\nالحالة تستلزم متابعة تخصصية مستمرة مع احتمال الحاجة لغسيل كلوي دوري حسب الخطة العلاجية.\nالفحوصات السريرية والمخبرية تؤكد الطابع المزمن التراكمي للحالة وعدم كونها حالة حادة مؤقتة.\nوبناءً على المعطيات الطبية المعتمدة، تصنف الحالة كمرض مستديم يحتاج متابعة علاجية طويلة المدى.',
    provenDate: '2024-11-20',
    visitDateTime: '2024-11-20 08:45',
    doctor: 'د. فاطمة بنت خلفان الخروصية',
    expectedPath: 'مسار اللجان الطبية',
    severityDate: '2024-10-10',
    uniqueRequestId: 'MOH-CHR-2025-00078',
    chronicDisease: 'الفشل الكلوي المزمن',
    affectedSystem: 'الجهاز البولي',
    severityIndex: 'MSI: 4/5 — Treatment Burden: مرتفع',
    firstRequestRef: 'CHR-2023-000092',
    overallCondition: 'استقرار نسبي مع تدهور وظيفي بطيء',
    hasRequest: true,
    requestId: 'CHR-2025-000156',
    requestSubmitDate: '2025-01-05',
    requestLastUpdate: '2025-01-05 14:00',
    requestStatus: 'تم تقديم الطلب — بانتظار مراجعة موظف قسم الإعاقة والأمراض المستديمة',
    assignedTo: 'نورة بنت سالم الزدجالية',
  },
];

/* ================================================================
   Export for use in main data.js (Global Scope)
   ================================================================ */

// Make data available globally for browser loading
window.CHRONIC_TEMPLATE = CHRONIC_TEMPLATE;
window.CHRONIC_DATA = CHRONIC_DATA;
window.CHRONIC_INCOMING_DATA = CHRONIC_INCOMING_DATA;
window.createChronicRequest = createChronicRequest;
window.validateChronicRequest = validateChronicRequest;
window.getChronicById = getChronicById;
window.getChronicByStatus = getChronicByStatus;
window.isReassessmentDue = isReassessmentDue;
