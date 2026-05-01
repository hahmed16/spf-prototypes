/* ================================================================
   data-allowances.js — طلبات بدلات الانقطاع عن العمل
   ================================================================ */

/* ================================================================
   Standard Template for Work Injury Allowances Request
   ================================================================ */

const ALLOWANCE_TEMPLATE = {
  // Basic Request Information
  id: '', // Unique request identifier (e.g., 'WI-2025-001234')
  type: '', // Request type: 'إصابة عمل' or 'مرض مهني'
  subtype: '', // Specific subtype
  isRelapse: '', // Relapse indicator: 'نعم' or 'لا'
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
    region: '', // Region
    wilayat: '', // Wilayat
    country: '', // Country
    civilExpiry: '', // Civil ID expiry date
    employeeId: '', // Employee ID (if applicable)
  },

  // Insured Person Information
  insured: {
    name: '', // Full name
    civil: '', // Civil ID number
    insurance: '', // Insurance number
    dob: '', // Date of birth
    gender: '', // Gender: 'ذكر' or 'أنثى'
    nationality: '', // Nationality
    insuranceStatus: '', // Insurance status
    regDate: '', // Registration date
    subType: '', // Subscription type
    phone: '', // Phone number
    email: '', // Email address
    civilExpiry: '', // Civil ID expiry date
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
    phone: '', // Employer phone number
  },

  // Injury/Disease Information
  injury: {
    // For Work Injury
    caseType: '', // Type of case
    description: '', // Detailed description
    location: '', // Location where incident occurred
    bodyPart: '', // Body part injured
    witnesses: '', // Witnesses indicator
    witnessNames: '', // Names of witnesses
    incidentDate: '', // Date of incident
    insuredStatus: '', // Status of insured person
    accidentDirection: '', // Direction of accident

    // For Occupational Disease
    caseDescription: '', // Description of disease case
    chemicalAgents: '', // Chemical agents or causative factors
    exposureDuration: '', // Duration of occupational exposure
    firstSuspicion: '', // Date of first suspicion
    workEnvironment: '', // Description of work environment
  },

  // Investigation Report
  investigation: {
    summary: '', // Summary of investigation
    findings: '', // Findings from data verification
    employeeRecommendation: '', // Employee recommendation
    employeeNotes: '', // Notes from employee
    headDecision: '', // Decision from section head
    headNotes: '', // Notes from section head
  },

  // Field Visits
  fieldVisits: [], // Array of field visit objects

  // Sick Leave Periods
  sickLeavePeriods: [], // Array of sick leave period objects

  // Referral Information
  referral: {
    institution: '', // Name of licensed health institution
    rapporteur: '', // Name of rapporteur
    referralDate: '', // Date of referral
    reason: '', // Reason for referral
    referrer: '', // Referring entity
    notes: '', // Referral notes
  },

  // Session Information
  session: {
    id: '', // Session ID
    institution: '', // Health institution name
    date: '', // Session date
    time: '', // Session time
    quorum: false, // Quorum status
    members: [], // Array of committee members
  },

  // Committee Decision
  committeeDecision: {
    type: '', // Decision type
    date: '', // Decision date
    disabilityPercent: null, // Disability percentage
    sickLeavePeriod: '', // Recommended sick leave period
    content: '', // Detailed decision content
    signatories: [], // Array of signing member names
  },

  // Disbursement Information
  disbursement: {
    status: '', // Disbursement status
    periods: null, // Number of approved periods
    totalDays: null, // Total number of days
    totalAmount: null, // Total amount due
    lastDisbursement: '', // Date of last disbursement
    nextDisbursement: '', // Date of next disbursement
    stopReason: '', // Reason for stopping
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

  // Return Information (for returned requests)
  returnReason: '', // Reason for returning request
};

/* ================================================================
   Helper Functions for Allowances Data
   ================================================================ */

/**
 * Create a new allowance request with default structure
 * @param {object} data - Request data to override defaults
 * @returns {object} Complete allowance request object
 */
function createAllowanceRequest(data = {}) {
  return {
    ...ALLOWANCE_TEMPLATE,
    ...data,
    applicant: { ...ALLOWANCE_TEMPLATE.applicant, ...data.applicant },
    insured: { ...ALLOWANCE_TEMPLATE.insured, ...data.insured },
    employer: { ...ALLOWANCE_TEMPLATE.employer, ...data.employer },
    injury: { ...ALLOWANCE_TEMPLATE.injury, ...data.injury },
    investigation: data.investigation ? { ...ALLOWANCE_TEMPLATE.investigation, ...data.investigation } : null,
    referral: data.referral ? { ...ALLOWANCE_TEMPLATE.referral, ...data.referral } : null,
    session: data.session ? { ...ALLOWANCE_TEMPLATE.session, ...data.session } : null,
    committeeDecision: data.committeeDecision ? { ...ALLOWANCE_TEMPLATE.committeeDecision, ...data.committeeDecision } : null,
    disbursement: data.disbursement ? { ...ALLOWANCE_TEMPLATE.disbursement, ...data.disbursement } : null,
  };
}

/**
 * Validate allowance request data
 * @param {object} request - Request object to validate
 * @returns {object} Validation result with isValid and errors array
 */
function validateAllowanceRequest(request) {
  const errors = [];

  // Required fields
  if (!request.id || typeof request.id !== 'string') {
    errors.push('Request ID is required and must be a string');
  }

  if (!request.type || !['إصابة عمل', 'مرض مهني'].includes(request.type)) {
    errors.push('Request type must be either "إصابة عمل" or "مرض مهني"');
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

  // Insured validation
  if (!request.insured || !request.insured.name) {
    errors.push('Insured name is required');
  }

  if (!request.insured || !request.insured.civil) {
    errors.push('Insured civil ID is required');
  }

  // Employer validation
  if (!request.employer || !request.employer.name) {
    errors.push('Employer name is required');
  }

  if (!request.employer || !request.employer.cr) {
    errors.push('Employer CR number is required');
  }

  // Injury validation
  if (!request.injury || !request.injury.caseType) {
    errors.push('Injury case type is required');
  }

  if (!request.injury || !request.injury.description) {
    errors.push('Injury description is required');
  }

  // Type-specific validation
  if (request.type === 'إصابة عمل') {
    if (!request.injury.incidentDate) {
      errors.push('Incident date is required for work injury requests');
    }
  } else if (request.type === 'مرض مهني') {
    if (!request.injury.firstSuspicion) {
      errors.push('First suspicion date is required for occupational disease requests');
    }
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

/**
 * Get allowance request by ID
 * @param {string} id - Request ID
 * @param {array} allowances - Array of allowance requests
 * @returns {object|null} Request object or null if not found
 */
function getAllowanceById(id, allowances) {
  return allowances.find(req => req.id === id) || null;
}

/**
 * Get allowance requests by type
 * @param {string} type - Request type ('إصابة عمل' or 'مرض مهني')
 * @param {array} allowances - Array of allowance requests
 * @returns {array} Filtered array of requests
 */
function getAllowancesByType(type, allowances) {
  return allowances.filter(req => req.type === type);
}

/**
 * Get allowance requests by status
 * @param {string} status - Request status
 * @param {array} allowances - Array of allowance requests
 * @returns {array} Filtered array of requests
 */
function getAllowancesByStatus(status, allowances) {
  return allowances.filter(req => req.status === status);
}

/* ================================================================
   Sample Data - Work Injury Allowances
   ================================================================ */

const ALLOWANCES_DATA = [
  {
    id: 'WI-2025-001234',
    type: 'إصابة عمل',
    subtype: 'حادث طريق',
    isRelapse: 'لا',
    status: 'قيد التحقيق — إصابات العمل',
    submitDate: '2025-01-10',
    lastUpdate: '2025-01-12 09:45',
    lastUpdatedBy: null,
    expectedClosureDate: null,
    remainingDays: null,
    applicant: { name: 'سالم بن ناصر الحارثي', civil: '9012345678', role: 'العامل / المؤمن عليه / المواطن', phone: '96898765432', email: 'salem.h@gmail.com', region: null, wilayat: null, country: null, civilExpiry: null, employeeId: null },
    insured: { name: 'سالم بن ناصر الحارثي', civil: '9012345678', insurance: 'IN-20190045678', dob: '1985-06-15', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2019-03-01', subType: 'إلزامي', phone: '96898765432', email: 'salem.h@gmail.com', civilExpiry: null },
    employer: { name: 'مجموعة النور للإنشاءات ش.م.م', cr: '1234567', establishment: 'EST-0087654', jobTitle: 'مهندس مدني', joinDate: '2019-03-01', location: 'مسقط — الخوض', sector: 'الإنشاءات والمقاولات', employerType: 'خاص', branch: { id: 'BR-001', name: 'الفرع الرئيسي', state: 'مسقط', governorate: 'بوشر' }, phone: null },
    injury: { caseType: 'حادث طريق', description: 'تعرّض العامل لحادث مروري أثناء توجهه من محل إقامته إلى موقع العمل الصباح الباكر على طريق السيب — الخوض، إذ اصطدمت سيارته بمركبة أخرى أدت إلى إصابته في الكتف الأيسر وكسر في الضلوع.', location: 'طريق السيب — الخوض، أمام بوابة المنطقة الصناعية', bodyPart: 'الكتف الأيسر والضلوع', witnesses: 'نعم', witnessNames: 'محمد بن سالم الريامي — زميل عمل', incidentDate: '2025-01-09', insuredStatus: 'تحت العلاج', accidentDirection: 'السكن الدائم إلى مقر العمل', caseDescription: null, chemicalAgents: null, exposureDuration: null, firstSuspicion: null, workEnvironment: null },
    investigation: null,
    fieldVisits: [],
    sickLeavePeriods: [],
    referral: null,
    session: null,
    committeeDecision: null,
    disbursement: null,
    attachments: [
      { id: 'att1', type: 'تقرير طبي أولي', name: 'تقرير_مستشفى_خولة.pdf', uploadDate: '2025-01-10', uploadedBy: 'سالم الحارثي', role: 'العامل', size: '1.2 MB', icon: 'pdf' },
      { id: 'att2', type: 'تقرير الشرطة', name: 'تقرير_شرطة_السيب.pdf', uploadDate: '2025-01-10', uploadedBy: 'سالم الحارثي', role: 'العامل', size: '0.8 MB', icon: 'pdf' },
      { id: 'att3', type: 'كشف حضور وانصراف', name: 'كشف_الحضور_يناير.pdf', uploadDate: '2025-01-10', uploadedBy: 'سالم الحارثي', role: 'العامل', size: '0.5 MB', icon: 'pdf' },
    ],
    notes: [
      { id: 'n1', author: 'سالم الحارثي', role: 'العامل', text: 'تم إرفاق جميع المستندات المطلوبة. أرجو سرعة المعالجة نظراً للوضع الصحي.', time: '2025-01-10 10:30' }
    ],
    timeline: [
      { action: 'تم تقديم الطلب', actor: 'سالم بن ناصر الحارثي', role: 'العامل', time: '2025-01-10 10:15', fromStatus: '', toStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', note: '', type: 'default' },
      { action: 'تم توجيه الطلب لقسم التحقيق في إصابات العمل', actor: 'النظام', role: 'آلي', time: '2025-01-10 10:16', fromStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', toStatus: 'قيد التحقيق — إصابات العمل', note: 'تم توجيهه تلقائياً بناءً على نوع الطلب', type: 'default' },
      { action: 'تم حجز الطلب', actor: 'عائشة بنت محمد الرواحي', role: 'موظف قسم التحقيق في إصابات العمل', time: '2025-01-12 09:45', fromStatus: 'قيد التحقيق — إصابات العمل', toStatus: 'قيد التحقيق — إصابات العمل', note: '', type: 'default' },
    ],
    assignedTo: 'عائشة بنت محمد الرواحي',
    checkedOutBy: 'عائشة بنت محمد الرواحي',
    returnReason: null,
  },
  {
    id: 'WI-2025-001198',
    type: 'إصابة عمل',
    subtype: 'إصابة في موقع العمل',
    isRelapse: 'لا',
    status: 'بانتظار اعتماد رئيس قسم التحقيق في إصابات العمل',
    submitDate: '2025-01-05',
    lastUpdate: '2025-01-14 14:20',
    lastUpdatedBy: null,
    expectedClosureDate: null,
    remainingDays: null,
    applicant: { name: 'حمد بن سلطان العزري', civil: '9023456789', role: 'العامل / المؤمن عليه / المواطن', phone: '96899876543', email: 'hamad.a@mail.com', region: null, wilayat: null, country: null, civilExpiry: null, employeeId: null },
    insured: { name: 'حمد بن سلطان العزري', civil: '9023456789', insurance: 'IN-20170056789', dob: '1982-11-20', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2017-07-01', subType: 'إلزامي', phone: '96899876543', email: 'hamad.a@mail.com', civilExpiry: null },
    employer: { name: 'شركة عُمان للحديد والصلب', cr: '2345678', establishment: 'EST-0054321', jobTitle: 'فني تشغيل آلات', joinDate: '2017-07-01', location: 'صحار — المنطقة الصناعية', sector: 'الإنشاءات والمقاولات', employerType: 'خاص', branch: { id: 'BR-001', name: 'الفرع الرئيسي', state: 'مسقط', governorate: 'بوشر' }, phone: null },
    injury: { caseType: 'إصابة في موقع العمل', description: 'أثناء تشغيل ماكينة القطع الثقيلة، انزلقت قطعة معدنية وأصابت يد العامل اليمنى مما أدى إلى كسر في أصابع السبابة والوسطى.', location: 'قاعة الإنتاج الرئيسية — خط إنتاج 3', bodyPart: 'اليد اليمنى', witnesses: 'نعم', witnessNames: 'سعيد بن خميس المحرزي — مشرف الإنتاج', incidentDate: '2025-01-04', insuredStatus: 'تحت العلاج', accidentDirection: null, caseDescription: null, chemicalAgents: null, exposureDuration: null, firstSuspicion: null, workEnvironment: null },
    investigation: {
      summary: 'بعد مراجعة المستندات المقدمة والاطلاع على تقرير السلامة والصحة المهنية وإفادة المشرف المباشر، تبيّن أن الحادثة وقعت أثناء ساعات العمل الرسمية وفي موقع العمل المعتمد. وأن العامل كان يؤدي مهامه الوظيفية المعتادة. لا يوجد ما يشير إلى إهمال أو مخالفة للتعليمات.',
      findings: 'الحادثة مستوفية لشروط إصابة العمل وفقاً للمادة (4) من اللائحة. لا توجد مؤشرات على تعمّد الإصابة أو تناول مواد مؤثرة على الوعي.',
      employeeRecommendation: 'موافقة',
      employeeNotes: 'يوصى بإحالة الطلب لقسم الإجازات المرضية بعد اعتماد رئيس القسم.',
      headNotes: null,
      headDecision: null,
    },
    fieldVisits: [
      { date: '2025-01-08', time: '10:00', reason: 'معاينة موقع الحادثة والتحقق من ملابسات الواقعة', staff: 'عائشة بنت محمد الرواحي، سليم بن راشد الغيلاني', summary: 'تم الاطلاع على موقع الحادثة وفحص الآلة المسببة للإصابة. تبيّن أن الآلة في وضع تشغيل اعتيادي وأن لوحات التحذير موجودة.', results: 'لا توجد مخالفات واضحة لمعايير السلامة في الموقع. الإصابة ناجمة عن ظرف طارئ غير متوقع.', attachments: ['صور_موقع_الحادثة.zip'] }
    ],
    sickLeavePeriods: [],
    referral: null,
    session: null,
    committeeDecision: null,
    disbursement: null,
    attachments: [
      { id: 'att4', type: 'تقرير طبي أولي', name: 'تقرير_مشفى_صحار.pdf', uploadDate: '2025-01-05', uploadedBy: 'حمد العزري', role: 'العامل', size: '0.9 MB', icon: 'pdf' },
      { id: 'att5', type: 'تقرير السلامة والصحة المهنية', name: 'تقرير_حادثة_صحار.pdf', uploadDate: '2025-01-06', uploadedBy: 'خالد البلوشي', role: 'الشخص المفوض من جهة العمل', size: '1.5 MB', icon: 'pdf' },
    ],
    notes: [
      { id: 'n1198-1', author: 'عائشة بنت محمد الرواحي', role: 'موظف قسم التحقيق في إصابات العمل', text: 'تم استكمال معاينة الموقع وإرفاق الصور المطلوبة. الحالة واضحة ومطابقة لشروط إصابة العمل.', time: '2025-01-14 14:00' }
    ],
    timeline: [
      { action: 'تم تقديم الطلب', actor: 'حمد بن سلطان العزري', role: 'العامل', time: '2025-01-05 08:30', fromStatus: '', toStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', note: '', type: 'default' },
      { action: 'توجيه لقسم التحقيق في إصابات العمل', actor: 'النظام', role: 'آلي', time: '2025-01-05 08:31', fromStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', toStatus: 'قيد التحقيق — إصابات العمل', note: '', type: 'default' },
      { action: 'إضافة زيارة ميدانية', actor: 'عائشة بنت محمد الرواحي', role: 'موظف قسم التحقيق في إصابات العمل', time: '2025-01-08 11:30', fromStatus: 'قيد التحقيق — إصابات العمل', toStatus: 'قيد التحقيق — إصابات العمل', note: 'تمت الزيارة الميدانية لمعاينة الموقع', type: 'default' },
      { action: 'رفع تقرير التحقيق لرئيس القسم', actor: 'عائشة بنت محمد الرواحي', role: 'موظف قسم التحقيق في إصابات العمل', time: '2025-01-14 14:20', fromStatus: 'قيد التحقيق — إصابات العمل', toStatus: 'بانتظار اعتماد رئيس قسم التحقيق في إصابات العمل', note: 'التوصية: موافقة على إصابة العمل', type: 'success' },
    ],
    assignedTo: 'عائشة بنت محمد الرواحي',
    checkedOutBy: 'عائشة بنت محمد الرواحي',
    returnReason: null,
  },
  // Additional allowance requests would be added here with the same complete structure
];

/* ================================================================
   Export for use in main data.js (Global Scope)
   ================================================================ */

// Make data available globally for browser loading
window.ALLOWANCE_TEMPLATE = ALLOWANCE_TEMPLATE;
window.ALLOWANCES_DATA = ALLOWANCES_DATA;
window.createAllowanceRequest = createAllowanceRequest;
window.validateAllowanceRequest = validateAllowanceRequest;
window.getAllowanceById = getAllowanceById;
window.getAllowancesByType = getAllowancesByType;
window.getAllowancesByStatus = getAllowancesByStatus;
