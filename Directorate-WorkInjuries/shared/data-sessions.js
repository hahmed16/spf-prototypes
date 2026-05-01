/* ================================================================
   data-sessions.js — جلسات اللجان الطبية
   ================================================================ */

/* ================================================================
   Standard Template for Session
   ================================================================ */

const SESSION_TEMPLATE = {
  // Basic Session Information
  id: '', // Unique session identifier (e.g., 'SES-2025-0112')
  type: '', // Session type: 'عرض على مؤسسة صحية مرخصة' or other
  institution: '', // Health institution name
  date: '', // Session date (YYYY-MM-DD)
  time: '', // Session time (HH:MM)
  status: '', // Session status: 'مجدولة', 'منعقدة', 'مغلقة', 'مؤجلة'

  // Session Statistics
  casesCount: 0, // Total number of cases
  completedDecisions: 0, // Number of completed decisions
  quorum: false, // Quorum status

  // Committee Members
  members: [], // Array of member objects

  // Session Details
  minutes: '', // Session minutes/notes

  // Cases
  cases: [], // Array of case objects

  // Signatures
  signatures: [], // Array of signature objects
};

/* ================================================================
   Helper Functions for Sessions Data
   ================================================================ */

/**
 * Create a new session with default structure
 * @param {object} data - Session data to override defaults
 * @returns {object} Complete session object
 */
function createSession(data = {}) {
  return {
    ...SESSION_TEMPLATE,
    ...data,
    members: data.members ? [...SESSION_TEMPLATE.members, ...data.members] : [],
    cases: data.cases ? [...SESSION_TEMPLATE.cases, ...data.cases] : [],
    signatures: data.signatures ? [...SESSION_TEMPLATE.signatures, ...data.signatures] : [],
  };
}

/**
 * Validate session data
 * @param {object} session - Session object to validate
 * @returns {object} Validation result with isValid and errors array
 */
function validateSession(session) {
  const errors = [];

  // Required fields
  if (!session.id || typeof session.id !== 'string') {
    errors.push('Session ID is required and must be a string');
  }

  if (!session.type || typeof session.type !== 'string') {
    errors.push('Session type is required and must be a string');
  }

  if (!session.institution || typeof session.institution !== 'string') {
    errors.push('Institution name is required');
  }

  if (!session.date || typeof session.date !== 'string') {
    errors.push('Session date is required and must be a string');
  }

  if (!session.time || typeof session.time !== 'string') {
    errors.push('Session time is required and must be a string');
  }

  if (!session.status || typeof session.status !== 'string') {
    errors.push('Session status is required and must be a string');
  }

  // Members validation
  if (!session.members || !Array.isArray(session.members) || session.members.length === 0) {
    errors.push('At least one committee member is required');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

/**
 * Get session by ID
 * @param {string} id - Session ID
 * @param {array} sessions - Array of sessions
 * @returns {object|null} Session object or null if not found
 */
function getSessionById(id, sessions) {
  return sessions.find(session => session.id === id) || null;
}

/**
 * Get sessions by status
 * @param {string} status - Session status
 * @param {array} sessions - Array of sessions
 * @returns {array} Filtered array of sessions
 */
function getSessionsByStatus(status, sessions) {
  return sessions.filter(session => session.status === status);
}

/**
 * Get sessions by institution
 * @param {string} institution - Institution name
 * @param {array} sessions - Array of sessions
 * @returns {array} Filtered array of sessions
 */
function getSessionsByInstitution(institution, sessions) {
  return sessions.filter(session => session.institution === institution);
}

/**
 * Check if session has quorum
 * @param {object} session - Session object
 * @param {number} minMembers - Minimum members required for quorum (default: 2)
 * @returns {boolean} True if quorum is met
 */
function hasQuorum(session, minMembers = 2) {
  if (!session.members || !Array.isArray(session.members)) {
    return false;
  }

  const presentMembers = session.members.filter(member => member.attendance === 'حاضر');
  return presentMembers.length >= minMembers;
}

/**
 * Get session completion percentage
 * @param {object} session - Session object
 * @returns {number} Completion percentage (0-100)
 */
function getSessionCompletionPercentage(session) {
  if (!session.casesCount || session.casesCount === 0) {
    return 0;
  }

  return Math.round((session.completedDecisions / session.casesCount) * 100);
}

/**
 * Check if session is upcoming
 * @param {object} session - Session object
 * @returns {boolean} True if session is in the future
 */
function isSessionUpcoming(session) {
  if (!session.date) {
    return false;
  }

  const sessionDate = new Date(session.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return sessionDate > today;
}

/**
 * Check if session is today
 * @param {object} session - Session object
 * @returns {boolean} True if session is today
 */
function isSessionToday(session) {
  if (!session.date) {
    return false;
  }

  const sessionDate = new Date(session.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return sessionDate.toDateString() === today.toDateString();
}

/* ================================================================
   Sample Data - Sessions
   ================================================================ */

const SESSIONS_DATA = [
  {
    id: 'SES-2025-0112',
    type: 'عرض على مؤسسة صحية مرخصة',
    institution: 'مستشفى النور التخصصي',
    date: '2025-01-28',
    time: '09:00',
    status: 'مجدولة',
    casesCount: 4,
    completedDecisions: 0,
    quorum: false,
    members: [
      { name: 'د. سيف المسكري', specialty: 'جراحة العظام', role: 'رئيس', attendance: 'مجدول' },
      { name: 'د. هند الحارثية', specialty: 'طب الأمراض المهنية', role: 'نائب رئيس', attendance: 'مجدول' },
      { name: 'د. أسامة الغيلاني', specialty: 'الطب الباطني', role: 'عضو', attendance: 'مجدول' },
      { name: 'د. لميس الرئيسية', specialty: 'إعادة التأهيل', role: 'عضو', attendance: 'مجدول' },
      { name: 'د. وائل الحوسني', specialty: 'الطب النفسي المهني', role: 'عضو', attendance: 'مجدول' },
    ],
    minutes: '',
    cases: [
      { requestId: 'WI-2025-001156', name: 'أمينة بنت علي الخروصية', type: 'بدلات انقطاع — مرض مهني', reason: 'تحديد فترة الإجازة المرضية المستحقة', decisionStatus: 'بانتظار القرار', decision: null },
    ],
    signatures: [],
  },
  {
    id: 'SES-2025-0115',
    type: 'عرض على مؤسسة صحية مرخصة',
    institution: 'مستشفى الأمل التخصصي',
    date: '2025-02-03',
    time: '10:30',
    status: 'مجدولة',
    casesCount: 3,
    completedDecisions: 1,
    quorum: true,
    members: [
      { name: 'د. سيف المسكري', specialty: 'جراحة العظام', role: 'رئيس', attendance: 'حاضر' },
      { name: 'د. هند الحارثية', specialty: 'طب الأمراض المهنية', role: 'نائب رئيس', attendance: 'حاضر' },
      { name: 'د. أسامة الغيلاني', specialty: 'الطب الباطني', role: 'عضو', attendance: 'مجدول' },
    ],
    minutes: 'تم اعتماد افتتاح الجلسة ومراجعة ملف حالة واحدة.',
    cases: [
      { requestId: 'WI-2025-001005', name: 'أحمد بن علي الحارثي', type: 'بدلات انقطاع — إصابة عمل', reason: 'تحديد نسبة العجز', decisionStatus: 'تم إدخال القرار', decision: 'إحالة للتنفيذ' },
      { requestId: 'WI-2025-001090', name: 'خالد بن عيسى المعمري', type: 'بدلات انقطاع — إصابة عمل', reason: 'تقييم طبي تخصصي', decisionStatus: 'بانتظار القرار', decision: null },
    ],
    signatures: [],
  },
  {
    id: 'SES-2025-0101',
    type: 'عرض على مؤسسة صحية مرخصة',
    institution: 'مستشفى النور التخصصي',
    date: '2025-01-18',
    time: '09:00',
    status: 'مغلقة',
    casesCount: 2,
    completedDecisions: 2,
    quorum: true,
    members: [
      { name: 'د. سيف المسكري', specialty: 'جراحة العظام', role: 'رئيس', attendance: 'حاضر' },
      { name: 'د. هند الحارثية', specialty: 'طب الأمراض المهنية', role: 'نائب رئيس', attendance: 'حاضر' },
    ],
    minutes: 'اكتملت الجلسة وتم اعتماد جميع القرارات.',
    cases: [
      { requestId: 'WI-2024-001089', name: 'سيف بن راشد المحروقي', type: 'بدلات انقطاع — إصابة عمل', reason: 'استكمال القرار النهائي', decisionStatus: 'تم اعتماد القرار', decision: 'اعتماد' },
    ],
    signatures: [
      { member: 'د. سيف المسكري', status: 'تم التوقيع' },
      { member: 'د. هند الحارثية', status: 'تم التوقيع' },
    ],
  },
  {
    id: 'SES-2025-0120',
    type: 'عرض على مؤسسة صحية مرخصة',
    institution: 'مستشفى الرعاية المتكاملة',
    date: '2025-02-12',
    time: '11:00',
    status: 'منعقدة',
    casesCount: 3,
    completedDecisions: 1,
    quorum: true,
    members: [
      { name: 'د. ماجد بن سعيد الشكيلي', specialty: 'جراحة العظام', role: 'رئيس', attendance: 'حاضر' },
      { name: 'د. نوف بنت حمد العبرية', specialty: 'طب الأمراض المهنية', role: 'نائب رئيس', attendance: 'حاضر' },
      { name: 'د. يوسف بن راشد الكلباني', specialty: 'الطب الباطني', role: 'عضو', attendance: 'حاضر' },
      { name: 'د. سمية بنت علي المقبالية', specialty: 'إعادة التأهيل', role: 'عضو', attendance: 'غائب' },
    ],
    minutes: 'بدأت الجلسة بحضور ثلاثة أعضاء وتجري مراجعة الملفات.',
    cases: [
      { requestId: 'WI-2025-001115', name: 'منصور بن سليم الهاشمي', type: 'بدلات انقطاع — مرض مهني', reason: 'تقييم نسبة العجز الناجمة عن التهاب المفاصل', decisionStatus: 'تم إدخال القرار', decision: 'إحالة للتنفيذ' },
      { requestId: 'WI-2025-001120', name: 'سلمى بنت قاسم الراشدية', type: 'بدلات انقطاع — إصابة عمل', reason: 'تحديد مدة التعافي والإجازة المرضية', decisionStatus: 'بانتظار القرار', decision: null },
      { requestId: 'WI-2025-001102', name: 'ريم بنت سالم الحارثية', type: 'بدلات انقطاع — حادث طريق', reason: 'تقييم الحالة الصحية وتحديد نسبة العجز', decisionStatus: 'بانتظار القرار', decision: null },
    ],
    signatures: [],
  },
  {
    id: 'SES-2025-0108',
    type: 'عرض على مؤسسة صحية مرخصة',
    institution: 'مستشفى الأمل التخصصي',
    date: '2025-01-24',
    time: '10:00',
    status: 'مؤجلة',
    casesCount: 2,
    completedDecisions: 0,
    quorum: false,
    members: [
      { name: 'د. سيف المسكري', specialty: 'جراحة العظام', role: 'رئيس', attendance: 'غائب' },
      { name: 'د. هند الحارثية', specialty: 'طب الأمراض المهنية', role: 'نائب رئيس', attendance: 'غائب' },
      { name: 'د. أسامة الغيلاني', specialty: 'الطب الباطني', role: 'عضو', attendance: 'غائب' },
    ],
    minutes: 'تم تأجيل الجلسة بسبب عدم اكتمال النصاب القانوني — ستُجدَّل في موعد لاحق.',
    cases: [
      { requestId: 'WI-2025-001090', name: 'خالد بن عيسى المعمري', type: 'بدلات انقطاع — إصابة عمل', reason: 'تقييم طبي تخصصي', decisionStatus: 'معلق — بانتظار إعادة الجدولة', decision: null },
      { requestId: 'WI-2025-001156', name: 'أمينة بنت علي الخروصية', type: 'بدلات انقطاع — مرض مهني', reason: 'تحديد فترة الإجازة المرضية المستحقة', decisionStatus: 'معلق — بانتظار إعادة الجدولة', decision: null },
    ],
    signatures: [],
  },
];

/* ================================================================
   Export for use in main data.js
   ================================================================ */

/* ================================================================
   Export for use in main data.js (Global Scope)
   ================================================================ */

// Make data available globally for browser loading
window.SESSION_TEMPLATE = SESSION_TEMPLATE;
window.SESSIONS_DATA = SESSIONS_DATA;
window.createSession = createSession;
window.validateSession = validateSession;
window.getSessionById = getSessionById;
window.getSessionsByStatus = getSessionsByStatus;
window.getSessionsByInstitution = getSessionsByInstitution;
window.hasQuorum = hasQuorum;
window.getSessionCompletionPercentage = getSessionCompletionPercentage;
window.isSessionUpcoming = isSessionUpcoming;
window.isSessionToday = isSessionToday;
