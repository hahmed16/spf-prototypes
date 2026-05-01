/* ================================================================
   data-licensing.js — طلبات الترخيص والتجديد
   ================================================================ */

/* ================================================================
   Standard Template for Licensing Request
   ================================================================ */

const LICENSING_TEMPLATE = {
  // Basic Request Information
  id: '', // Unique request identifier (e.g., 'LIC-2025-001605')
  requestType: '', // Request type: 'جديد' or 'تجديد'
  status: '', // Current status
  submitDate: '', // Submission date (YYYY-MM-DD)
  lastUpdate: '', // Last update date and time
  lastUpdatedBy: '', // Last updater name
  expectedClosureDate: '', // Expected closure date
  remainingDays: null, // Remaining days until closure

  // Delegate Information
  delegate: {
    name: '', // Full name
    civil: '', // Civil ID number
    role: '', // Role (e.g., 'المفوض عن المستشفى')
    phone: '', // Phone number
    email: '', // Email address
  },

  // Institution Information
  institution: {
    name: '', // Institution name
    cr: '', // Commercial registration number
    crStatus: '', // CR status: 'سارٍ' or other
    crExpiry: '', // CR expiry date
    type: '', // Institution type: 'مستشفى خاص', 'عيادة تخصصية', etc.
    address: '', // Physical address
    governorate: '', // Governorate
    phone: '', // Institution phone
    email: '', // Institution email
    currentLicenseNo: '', // Current license number (for renewals)
  },

  // Doctors Information
  doctors: [], // Array of doctor objects

  // Verification Information
  verification: {
    totalDoctors: 0, // Total number of doctors
    confirmedDoctors: 0, // Number of confirmed doctors
    minMet: false, // Whether minimum requirement is met
    duplicates: [], // Array of duplicate doctor entries
  },

  // Attachments
  attachments: [], // Array of attachment objects

  // Notes
  notes: [], // Array of note objects

  // Session Information
  session: null, // Session object if applicable

  // Committee Decision
  committeeDecision: null, // Committee decision object if applicable

  // Active License Information
  activeLicense: null, // Active license object if applicable

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
   Helper Functions for Licensing Data
   ================================================================ */

/**
 * Create a new licensing request with default structure
 * @param {object} data - Request data to override defaults
 * @returns {object} Complete licensing request object
 */
function createLicensingRequest(data = {}) {
  return {
    ...LICENSING_TEMPLATE,
    ...data,
    delegate: { ...LICENSING_TEMPLATE.delegate, ...data.delegate },
    institution: { ...LICENSING_TEMPLATE.institution, ...data.institution },
    verification: data.verification ? { ...LICENSING_TEMPLATE.verification, ...data.verification } : null,
    session: data.session ? { ...LICENSING_TEMPLATE.session, ...data.session } : null,
    committeeDecision: data.committeeDecision ? { ...LICENSING_TEMPLATE.committeeDecision, ...data.committeeDecision } : null,
    activeLicense: data.activeLicense ? { ...LICENSING_TEMPLATE.activeLicense, ...data.activeLicense } : null,
  };
}

/**
 * Validate licensing request data
 * @param {object} request - Request object to validate
 * @returns {object} Validation result with isValid and errors array
 */
function validateLicensingRequest(request) {
  const errors = [];

  // Required fields
  if (!request.id || typeof request.id !== 'string') {
    errors.push('Request ID is required and must be a string');
  }

  if (!request.requestType || typeof request.requestType !== 'string') {
    errors.push('Request type is required and must be a string');
  }

  if (!request.status || typeof request.status !== 'string') {
    errors.push('Request status is required and must be a string');
  }

  if (!request.submitDate || typeof request.submitDate !== 'string') {
    errors.push('Submit date is required and must be a string');
  }

  // Delegate validation
  if (!request.delegate || !request.delegate.name) {
    errors.push('Delegate name is required');
  }

  if (!request.delegate || !request.delegate.civil) {
    errors.push('Delegate civil ID is required');
  }

  // Institution validation
  if (!request.institution || !request.institution.name) {
    errors.push('Institution name is required');
  }

  if (!request.institution || !request.institution.cr) {
    errors.push('Institution CR number is required');
  }

  // Doctors validation
  if (!request.doctors || !Array.isArray(request.doctors) || request.doctors.length === 0) {
    errors.push('At least one doctor is required');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

/**
 * Get licensing request by ID
 * @param {string} id - Request ID
 * @param {array} licensingRequests - Array of licensing requests
 * @returns {object|null} Request object or null if not found
 */
function getLicensingById(id, licensingRequests) {
  return licensingRequests.find(req => req.id === id) || null;
}

/**
 * Get licensing requests by status
 * @param {string} status - Request status
 * @param {array} licensingRequests - Array of licensing requests
 * @returns {array} Filtered array of requests
 */
function getLicensingByStatus(status, licensingRequests) {
  return licensingRequests.filter(req => req.status === status);
}

/**
 * Get licensing requests by request type
 * @param {string} requestType - Request type ('جديد' or 'تجديد')
 * @param {array} licensingRequests - Array of licensing requests
 * @returns {array} Filtered array of requests
 */
function getLicensingByType(requestType, licensingRequests) {
  return licensingRequests.filter(req => req.requestType === requestType);
}

/**
 * Check if minimum doctor requirement is met
 * @param {object} request - Licensing request object
 * @param {number} minDoctors - Minimum number of doctors required (default: 3)
 * @returns {boolean} True if minimum requirement is met
 */
function isMinDoctorsMet(request, minDoctors = 3) {
  if (!request.verification || !request.verification.confirmedDoctors) {
    return false;
  }
  return request.verification.confirmedDoctors >= minDoctors;
}

/**
 * Check for duplicate doctors
 * @param {array} doctors - Array of doctor objects
 * @returns {array} Array of duplicate doctor entries
 */
function checkDuplicateDoctors(doctors) {
  const duplicates = [];
  const seen = new Map();

  doctors.forEach((doctor, index) => {
    const key = `${doctor.name}-${doctor.civil}`;
    if (seen.has(key)) {
      duplicates.push({
        index: index,
        originalIndex: seen.get(key),
        name: doctor.name,
        civil: doctor.civil,
      });
    } else {
      seen.set(key, index);
    }
  });

  return duplicates;
}

/* ================================================================
   Sample Data - Licensing Requests
   ================================================================ */

const LICENSING_DATA = [
  {
    id: 'LIC-2025-001605',
    requestType: 'جديد',
    status: 'مسودة',
    submitDate: '2025-01-21',
    lastUpdate: '2025-01-21 09:15',
    lastUpdatedBy: null,
    expectedClosureDate: null,
    remainingDays: null,
    delegate: { name: 'منى بنت عبدالله الرحبية', civil: '9066663333', role: 'المفوض عن المستشفى', phone: '96896663333', email: 'mona@hospital.om' },
    institution: { name: 'مستشفى رويال كير التخصصي', cr: '7788991', crStatus: 'سارٍ', crExpiry: '2026-12-31', type: 'مستشفى خاص', address: 'مسقط — الغبرة', governorate: 'مسقط — ولاية بوشر', phone: '96824445566', email: 'info@royalcare.om', currentLicenseNo: null },
    doctors: [
      { name: 'د. سامي بن خميس العجمي', civil: '9019988771', specialty: 'جراحة عامة', role: 'رئيس', confirmStatus: 'بانتظار التأكيد', duplicateCheck: 'لا يوجد تعارض' },
      { name: 'د. هناء بنت راشد الهنائية', civil: '9019988772', specialty: 'طب باطني', role: 'نائب رئيس', confirmStatus: 'تم التأكيد', duplicateCheck: 'لا يوجد تعارض' },
      { name: 'د. مروان بن سالم الجهضمي', civil: '9019988773', specialty: 'جراحة عظام', role: 'عضو', confirmStatus: 'بانتظار التأكيد', duplicateCheck: 'لا يوجد تعارض' },
    ],
    verification: { totalDoctors: 3, confirmedDoctors: 1, minMet: false },
    attachments: [
      { id: 'lic165-att1', type: 'السجل التجاري', name: 'السجل_التجاري.pdf', uploadDate: '2025-01-21', uploadedBy: 'منى بنت عبدالله الرحبية', role: 'المفوض عن المستشفى', size: '0.7 MB', icon: 'pdf' },
      { id: 'lic165-att2', type: 'عقد الإيجار', name: 'عقد_الإيجار.pdf', uploadDate: '2025-01-21', uploadedBy: 'منى بنت عبدالله الرحبية', role: 'المفوض عن المستشفى', size: '0.9 MB', icon: 'pdf' },
    ],
    notes: [
      { id: 'lic165-note1', author: 'منى بنت عبدالله الرحبية', role: 'المفوض عن المستشفى', text: 'تم حفظ الطلب كمسودة لحين استكمال تأكيد جميع الأطباء وإرفاق بقية المستندات.', time: '2025-01-21 09:15' },
    ],
    session: null,
    committeeDecision: null,
    activeLicense: null,
    timeline: [
      { action: 'إنشاء الطلب كمسودة', actor: 'منى بنت عبدالله الرحبية', role: 'المفوض عن المستشفى', time: '2025-01-21 09:15', fromStatus: '', toStatus: 'مسودة', note: 'تم حفظ الطلب قبل الإرسال النهائي', type: 'default' },
    ],
    assignedTo: null,
    checkedOutBy: null,
  },
  {
    id: 'LIC-2025-000034',
    requestType: 'جديد',
    status: 'تم تقديم طلب الترخيص / التجديد — بانتظار مراجعة موظف قسم التراخيص والرقابة',
    submitDate: '2025-01-12',
    lastUpdate: '2025-01-12 16:00',
    lastUpdatedBy: null,
    expectedClosureDate: null,
    remainingDays: null,
    delegate: { name: 'منى بنت عبدالله الرحبية', civil: '9066663333', role: 'المفوض عن المستشفيات', phone: '96896663333', email: 'mona@hospital.om' },
    institution: { name: 'مستشفى الأمل التخصصي', cr: '7890123', crStatus: 'سارٍ', crExpiry: '2026-12-31', type: 'مستشفى خاص', address: 'طريق السيب — مسقط', governorate: 'مسقط — ولاية السيب', phone: '96824567890', email: 'info@amal-hospital.om', currentLicenseNo: null },
    doctors: [
      { name: 'د. خالد بن سالم الهاشمي', civil: '9011122233', specialty: 'جراحة العظام', role: 'رئيس', confirmStatus: 'تم التأكيد', duplicateCheck: 'لا يوجد تعارض' },
      { name: 'د. ريم بنت أحمد المعولية', civil: '9022233344', specialty: 'الطب الباطني', role: 'نائب رئيس', confirmStatus: 'تم التأكيد', duplicateCheck: 'لا يوجد تعارض' },
      { name: 'د. حسن بن علي السيابي', civil: '9033344455', specialty: 'طب الأمراض المهنية', role: 'عضو', confirmStatus: 'بانتظار التأكيد', duplicateCheck: 'لا يوجد تعارض' },
      { name: 'د. سمية بنت سيف الشهرية', civil: '9044455566', specialty: 'إعادة التأهيل', role: 'عضو', confirmStatus: 'تم التأكيد', duplicateCheck: 'لا يوجد تعارض' },
    ],
    verification: { totalDoctors: 4, confirmedDoctors: 3, minMet: false, duplicates: [] },
    attachments: [
      { id: 'latt1', type: 'سجل تجاري', name: 'سجل_تجاري_الأمل.pdf', uploadDate: '2025-01-12', uploadedBy: 'منى الرحبية', role: 'المفوض عن المستشفى', size: '1.2 MB', icon: 'pdf' },
      { id: 'latt2', type: 'شهادة اعتماد', name: 'شهادة_اعتماد_وزارة_الصحة.pdf', uploadDate: '2025-01-12', uploadedBy: 'منى الرحبية', role: 'المفوض عن المستشفى', size: '2.1 MB', icon: 'pdf' },
    ],
    notes: [],
    session: null,
    committeeDecision: null,
    activeLicense: null,
    timeline: [
      { action: 'تم تقديم طلب الترخيص', actor: 'منى بنت عبدالله الرحبية', role: 'المفوض عن المستشفى', time: '2025-01-12 16:00', fromStatus: '', toStatus: 'تم تقديم طلب الترخيص', note: '', type: 'default' },
    ],
    assignedTo: 'هدى بنت ناصر الوهيبية',
    checkedOutBy: 'هدى بنت ناصر الوهيبية',
  },
  {
    id: 'LIC-2025-001603',
    requestType: 'جديد',
    status: 'تم تقديم طلب الترخيص / التجديد — بانتظار مراجعة موظف قسم التراخيص والرقابة',
    submitDate: '2025-01-19',
    lastUpdate: '2025-01-19 10:00',
    lastUpdatedBy: null,
    expectedClosureDate: null,
    remainingDays: null,
    delegate: { name: 'فهد بن غانم البدري', civil: '9099988877', role: 'المفوض عن المستشفى', phone: '96899998887', email: 'fahd@badri-clinic.om' },
    institution: { name: 'عيادة البدري الطبية', cr: '5647382', crStatus: 'سارٍ', type: 'عيادة تخصصية', address: 'غلاء', governorate: 'مسقط', phone: '24555666', email: 'contact@badri-clinic.om' },
    doctors: [
      { name: 'د. خالد بن محمود الزدجالي', specialty: 'طب الطوارئ', role: 'رئيس', confirmStatus: 'بانتظار التأكيد' }
    ],
    verification: { totalDoctors: 1, confirmedDoctors: 0, minMet: false },
    attachments: [],
    notes: [],
    session: null,
    committeeDecision: null,
    activeLicense: null,
    timeline: [
      { action: 'تقديم الطلب عبر البوابة', actor: 'فهد بن غانم البدري', role: 'المفوض', time: '2025-01-19 10:00', fromStatus: '', toStatus: 'تم تقديم طلب الترخيص / التجديد — بانتظار مراجعة موظف قسم التراخيص والرقابة', note: '', type: 'default' }
    ],
    assignedTo: 'هدى بنت ناصر الوهيبية',
    checkedOutBy: 'هدى بنت ناصر الوهيبية',
  },
  {
    id: 'LIC-2025-001604',
    requestType: 'جديد',
    status: 'بانتظار اعتماد رئيس قسم التراخيص والرقابة',
    submitDate: '2025-01-01',
    lastUpdate: '2025-01-15 11:00',
    lastUpdatedBy: 'هدى بنت ناصر الوهيبية',
    expectedClosureDate: null,
    remainingDays: null,
    delegate: { name: 'سالم بن علي الهنائي', civil: '9088776655', role: 'المفوض عن المستشفيات', phone: '96898877665', email: 'salim.h@muscat-heart.om' },
    institution: { name: 'مركز مسقط للقلب', cr: '112233', crStatus: 'سارٍ', type: 'مركز طبي تخصصي', address: 'الغبرة — مسقط', governorate: 'مسقط', phone: '24400100', email: 'info@muscat-heart.om' },
    doctors: [
      { name: 'د. يحيى بن محمد الفارسي', civil: '9011223344', specialty: 'أمراض القلب', role: 'رئيس', confirmStatus: 'تم التأكيد' },
      { name: 'د. ليلى بنت سعيد البوسعيدية', civil: '9022334455', specialty: 'طب الطوارئ', role: 'نائب رئيس', confirmStatus: 'تم التأكيد' },
      { name: 'د. أحمد بن خالد الزدجالي', civil: '9033445566', specialty: 'التخدير', role: 'عضو', confirmStatus: 'تم التأكيد' }
    ],
    verification: { totalDoctors: 3, confirmedDoctors: 3, minMet: true, duplicates: [] },
    attachments: [
      { id: 'lattA1', type: 'سجل تجاري', name: 'سجل_تجاري_المركز.pdf', uploadDate: '2025-01-01', uploadedBy: 'سالم الهنائي', size: '1.1 MB', icon: 'pdf' }
    ],
    notes: [],
    session: null,
    committeeDecision: { type: 'اعتماد الترخيص', content: 'تم مراجعة طلب مركز مسقط للقلب والتحقق من كفاءة الكادر الطبي. اللجنة توصي بالموافقة النهائية على إصدار الترخيص.', date: '2025-01-15' },
    activeLicense: null,
    timeline: [
      { action: 'تقديم طلب الترخيص', actor: 'سالم بن علي الهنائي', role: 'المفوض', time: '2025-01-01 10:00', fromStatus: '', toStatus: 'بانتظار المراجعة', note: '', type: 'default' },
      { action: 'اكتمال المراجعة الفنية', actor: 'هدى بنت ناصر الوهيبية', role: 'موظف قسم التراخيص', time: '2025-01-08 11:00', fromStatus: 'بانتظار المراجعة', toStatus: 'مجدولة في جلسة', note: 'المستندات مكتملة والأطباء مؤكدون', type: 'success' },
      { action: 'قرار اللجنة الطبية', actor: 'اللجنة الإشرافية', time: '2025-01-15 11:00', fromStatus: 'مجدولة في جلسة', toStatus: 'تم اتخاذ القرار من اللجنة الطبية الإشرافية', note: 'الموافقة على الترخيص', type: 'success' }
    ],
    assignedTo: 'طالب بن سعيد الحنبلي',
    checkedOutBy: 'طالب بن سعيد الحنبلي',
  },
  {
    id: 'LIC-2024-000198',
    requestType: 'تجديد',
    status: 'تم اعتماد الترخيص — الترخيص نشط',
    submitDate: '2024-06-01',
    lastUpdate: '2024-08-15 09:00',
    lastUpdatedBy: 'طالب بن سعيد الحنبلي',
    expectedClosureDate: null,
    remainingDays: null,
    delegate: { name: 'طارق بن ناصر الزدجالي', civil: '9077778888', role: 'المفوض عن المستشفيات', phone: '96897778888', email: 'tariq@noor-hospital.om' },
    institution: { name: 'مستشفى النور التخصصي', cr: '8901234', crStatus: 'سارٍ', crExpiry: '2027-05-31', type: 'مستشفى خاص', address: 'شارع قابوس — مسقط', governorate: 'مسقط — ولاية بوشر', phone: '96824678901', email: 'info@noor-hospital.om', currentLicenseNo: 'LIC-INST-2022-0045' },
    doctors: [
      { name: 'د. سيف بن حمد المسكري', civil: '9055566677', specialty: 'جراحة العظام', role: 'رئيس', confirmStatus: 'تم التأكيد', duplicateCheck: 'لا يوجد تعارض' },
      { name: 'د. هند بنت علي الحارثية', civil: '9066677788', specialty: 'طب الأمراض المهنية', role: 'نائب رئيس', confirmStatus: 'تم التأكيد', duplicateCheck: 'لا يوجد تعارض' },
      { name: 'د. أسامة بن سالم الغيلاني', civil: '9077788899', specialty: 'الطب الباطني', role: 'عضو', confirmStatus: 'تم التأكيد', duplicateCheck: 'لا يوجد تعارض' },
    ],
    verification: { totalDoctors: 3, confirmedDoctors: 3, minMet: true, duplicates: [] },
    attachments: [
      { id: 'latt198-1', type: 'سجل تجاري', name: 'سجل_تجاري_النور.pdf', uploadDate: '2024-06-01', uploadedBy: 'طارق الزدجالي', role: 'المفوض', size: '1.0 MB', icon: 'pdf' },
      { id: 'latt198-2', type: 'ترخيص ساري', name: 'ترخيص_ساري.pdf', uploadDate: '2024-06-01', uploadedBy: 'طارق الزدجالي', role: 'المفوض', size: '0.8 MB', icon: 'pdf' },
    ],
    notes: [],
    session: null,
    committeeDecision: { type: 'اعتماد التجديد', content: 'تم مراجعة طلب تجديد ترخيص مستشفى النور التخصصي. اللجنة توصي باعتماد التجديد لمدة ثلاث سنوات.', date: '2024-08-15' },
    activeLicense: { licenseNo: 'LIC-INST-2024-0089', issueDate: '2024-08-15', expiryDate: '2027-08-14', status: 'نشط' },
    timeline: [
      { action: 'تقديم طلب التجديد', actor: 'طارق بن ناصر الزدجالي', role: 'المفوض', time: '2024-06-01 10:00', fromStatus: '', toStatus: 'تم تقديم طلب الترخيص / التجديد', note: '', type: 'default' },
      { action: 'اعتماد التجديد', actor: 'طالب بن سعيد الحنبلي', role: 'رئيس قسم التراخيص', time: '2024-08-15 09:00', fromStatus: 'بانتظار اعتماد رئيس القسم', toStatus: 'تم اعتماد الترخيص — الترخيص نشط', note: 'تم اعتماد التجديد لمدة 3 سنوات', type: 'success' },
    ],
    assignedTo: 'هدى بنت ناصر الوهيبية',
    checkedOutBy: 'هدى بنت ناصر الوهيبية',
  },
  {
    id: 'LIC-2025-001606',
    requestType: 'تجديد',
    status: 'تم اتخاذ القرار من اللجنة الطبية الإشرافية — بانتظار تنفيذ القرار',
    submitDate: '2025-01-09',
    lastUpdate: '2025-01-22 13:10',
    lastUpdatedBy: 'مقرر اللجنة الطبية الإشرافية',
    expectedClosureDate: '2025-01-29',
    remainingDays: 3,
    delegate: { name: 'طارق بن ناصر الزدجالي', civil: '9077778888', role: 'المفوض عن المستشفيات', phone: '96897778888', email: 'tariq@noor-hospital.om' },
    institution: { name: 'مستشفى النور التخصصي', cr: '8901234', crStatus: 'سارٍ', crExpiry: '2027-05-31', type: 'مستشفى خاص', address: 'شارع قابوس — مسقط', governorate: 'مسقط — ولاية بوشر', phone: '96824678901', email: 'info@noor-hospital.om', currentLicenseNo: 'LIC-INST-2022-0045' },
    doctors: [
      { name: 'د. سيف بن حمد المسكري', civil: '9055566677', specialty: 'جراحة العظام', role: 'رئيس', confirmStatus: 'تم التأكيد', duplicateCheck: 'لا يوجد تعارض' },
      { name: 'د. هند بنت علي الحارثية', civil: '9066677788', specialty: 'طب الأمراض المهنية', role: 'نائب رئيس', confirmStatus: 'تم التأكيد', duplicateCheck: 'لا يوجد تعارض' },
      { name: 'د. وائل بن صالح الحوسني', civil: '9078899001', specialty: 'الطب النفسي المهني', role: 'عضو', confirmStatus: 'تم التأكيد', duplicateCheck: 'لا يوجد تعارض' },
    ],
    verification: { totalDoctors: 3, confirmedDoctors: 3, minMet: true, duplicates: [] },
    attachments: [
      { id: 'lic166-att1', type: 'ترخيص سابق', name: 'الترخيص_السابق.pdf', uploadDate: '2025-01-09', uploadedBy: 'طارق بن ناصر الزدجالي', role: 'المفوض', size: '0.8 MB', icon: 'pdf' },
      { id: 'lic166-att2', type: 'سجل تجاري', name: 'سجل_تجاري_محدث.pdf', uploadDate: '2025-01-09', uploadedBy: 'طارق بن ناصر الزدجالي', role: 'المفوض', size: '0.9 MB', icon: 'pdf' },
    ],
    notes: [
      { id: 'lic166-note1', author: 'مازن بن سعيد اللواتي', role: 'مقرر اللجنة الطبية الإشرافية', text: 'تم إدخال قرار اللجنة، بانتظار التوقيع الإلكتروني ثم التنفيذ من رئيس القسم.', time: '2025-01-22 13:10' },
    ],
    session: { id: 'SUP-SES-2025-0021', institution: 'مستشفى النور التخصصي', date: '2025-01-22', time: '11:00', quorum: true, members: ['د. سيف بن حمد المسكري', 'د. هند بنت علي الحارثية', 'د. وائل بن صالح الحوسني'] },
    committeeDecision: { type: 'اعتماد التجديد', content: 'أوصت اللجنة الطبية الإشرافية باعتماد التجديد بعد مراجعة التشكيل الطبي والتراخيص المساندة.', date: '2025-01-22', signatories: ['د. هند بنت علي الحارثية'] },
    activeLicense: null,
    timeline: [
      { action: 'إحالة الطلب إلى اللجنة الطبية الإشرافية', actor: 'طالب بن سعيد الحنبلي', role: 'رئيس قسم التراخيص والرقابة', time: '2025-01-18 10:00', fromStatus: 'بانتظار اعتماد رئيس قسم التراخيص والرقابة', toStatus: 'تم إحالة الطلب إلى اللجنة الطبية الإشرافية — بانتظار جدولة جلسة', note: 'تم اعتماد الإحالة إلى اللجنة', type: 'success', phone: '96896662222' },
      { action: 'انعقاد الجلسة وإدخال القرار', actor: 'مازن بن سعيد اللواتي', role: 'مقرر اللجنة الطبية الإشرافية', time: '2025-01-22 13:10', fromStatus: 'تم جدولة جلسة اللجنة الطبية الإشرافية', toStatus: 'تم اتخاذ القرار من اللجنة الطبية الإشرافية — بانتظار تنفيذ القرار', note: 'تم إدخال القرار بعد اكتمال النصاب', type: 'success', phone: '96896668888' },
    ],
    assignedTo: 'طالب بن سعيد الحنبلي',
    checkedOutBy: null,
  },
];

/* ================================================================
   Export for use in main data.js (Global Scope)
   ================================================================ */

// Make data available globally for browser loading
window.LICENSING_TEMPLATE = LICENSING_TEMPLATE;
window.LICENSING_DATA = LICENSING_DATA;
window.createLicensingRequest = createLicensingRequest;
window.validateLicensingRequest = validateLicensingRequest;
window.getLicensingById = getLicensingById;
window.getLicensingByStatus = getLicensingByStatus;
window.getLicensingByType = getLicensingByType;
window.isMinDoctorsMet = isMinDoctorsMet;
window.checkDuplicateDoctors = checkDuplicateDoctors;
