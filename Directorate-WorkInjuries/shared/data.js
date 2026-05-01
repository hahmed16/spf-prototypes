/* ================================================================
   data.js — بيانات العينة الواقعية (Main Data File)
   ================================================================ */

/* ================================================================
   Import from modular data files (Global Scope)
   These files are loaded as regular scripts and make data available globally
   ================================================================ */

// Note: Variables are already declared in modular data files
// We access them directly from window object to avoid redeclaration conflicts

/* ================================================================
   Main Data Object
   ================================================================ */

const WI_DATA = {
  /* ── المستخدمون ── */
  users: window.USERS_DATA || {},

  /* ── طلبات بدلات الانقطاع عن العمل ── */
  allowances: window.ALLOWANCES_DATA || [],

  /* ── طلبات منفعة الإعاقة ── */
  disability: window.DISABILITY_DATA || [],

  /* ── طلبات الأمراض المستديمة ── */
  chronic: window.CHRONIC_DATA || [],

  /* ── التشخيصات الواردة للأمراض المستديمة ── */
  chronicIncoming: window.CHRONIC_INCOMING_DATA || [],

  /* ── طلبات التظلم ── */
  appeals: window.APPEALS_DATA || [],

  /* ── طلبات الترخيص والتجديد ── */
  licensing: window.LICENSING_DATA || [],

  /* ── جلسات اللجان الطبية ── */
  sessions: window.SESSIONS_DATA || [],

  /* ── استعلامات تقاعد الأشخاص ذوي الإعاقة ── */
  disabilityRetirement: window.DISABILITY_RETIREMENT_DATA || [],

  /* ── طلبات العرض المباشر على المؤسسات الصحية المرخصة ── */
  referrals: window.REFERRALS_DATA || [],

  /* ── مؤشرات لوحات البيانات ── */
  dashboardStats: {
    'injury-investigator': [
      { label: 'الطلبات الجديدة في انتظار التحقيق', value: 7, type: 'p' },
      { label: 'الطلبات التي حجزتها (حجز الطلب)', value: 3, type: 'i' },
      { label: 'طلبات مُعادة لي من الرئيس', value: 1, type: 'd' },
      { label: 'طلبات أرسلتها للرئيس هذا الأسبوع', value: 5, type: 's' },
    ],
    'injury-head': [
      { label: 'بانتظار قراري', value: 5, type: 'p' },
      { label: 'طلبات اعتمدتها هذا الشهر', value: 18, type: 's' },
      { label: 'طلبات رُفضت هذا الشهر', value: 2, type: 'd' },
      { label: 'طلبات أعدتها للموظفين', value: 3, type: 'w' },
    ],
    'sickleave-employee': [
      { label: 'الطلبات قيد المراجعة', value: 10, type: 'p' },
      { label: 'فترات إجازة أضفتها هذا الأسبوع', value: 12, type: 's' },
      { label: 'طلبات في انتظار استعلام وزارة الصحة', value: 4, type: 'i' },
      { label: 'طلبات محالة للجان الطبية', value: 2, type: 'pu' },
    ],
    'sickleave-head': [
      { label: 'فترات إجازة بانتظار اعتمادي', value: 6, type: 'p' },
      { label: 'إجمالي الأيام المعتمدة هذا الشهر', value: 145, type: 's' },
      { label: 'طلبات مُعادة للمراجعة', value: 2, type: 'w' },
      { label: 'متوسط وقت المعالجة (أيام)', value: 1.5, type: 'i' },
    ],
    'disability-employee': [
      { label: 'طلبات منفعة الإعاقة الجديدة', value: 6, type: 'p' },
      { label: 'حالات أمراض مستديمة واردة', value: 3, type: 'i' },
      { label: 'طلبات بانتظار الاعتماد', value: 8, type: 'w' },
      { label: 'حالات إعادة تقييم مستحقة', value: 5, type: 'd' },
    ],
    'disability-head': [
      { label: 'طلبات بانتظار اعتمادي', value: 8, type: 'p' },
      { label: 'طلبات اعتمدتها هذا الشهر', value: 12, type: 's' },
      { label: 'طلبات رُفضت هذا الشهر', value: 1, type: 'd' },
      { label: 'حالات إعادة تقييم معتمدة', value: 4, type: 'w' },
    ],
    'committees-employee': [
      { label: 'طلبات قيد المراجعة', value: 15, type: 'p' },
      { label: 'جلسات مجدولة هذا الأسبوع', value: 4, type: 's' },
      { label: 'طلبات محالة للجلسات', value: 8, type: 'pu' },
      { label: 'طلبات تظلم واردة', value: 3, type: 'i' },
    ],
    'committees-head': [
      { label: 'طلبات بانتظار اعتمادي', value: 10, type: 'p' },
      { label: 'جلسات اعتمدتها هذا الشهر', value: 6, type: 's' },
      { label: 'طلبات رُفضت هذا الشهر', value: 2, type: 'd' },
      { label: 'طلبات تظلم معتمدة', value: 3, type: 'w' },
    ],
    'licensing-employee': [
      { label: 'طلبات ترخيص جديدة', value: 5, type: 'p' },
      { label: 'طلبات تجديد', value: 3, type: 's' },
      { label: 'طلبات بانتظار المراجعة', value: 7, type: 'w' },
      { label: 'تراخيص تنتهي قريباً', value: 2, type: 'd' },
    ],
    'licensing-head': [
      { label: 'طلبات بانتظار اعتمادي', value: 6, type: 'p' },
      { label: 'تراخيص اعتمدتها هذا الشهر', value: 4, type: 's' },
      { label: 'طلبات رُفضت هذا الشهر', value: 1, type: 'd' },
      { label: 'تراخيص تجديدت', value: 2, type: 'w' },
    ],
    'referral-coordinator': [
      { label: 'الإحالات الواردة اليوم', value: 12, type: 'p' },
      { label: 'القرارات المعلقة', value: 5, type: 'w' },
      { label: 'التظلمات الجديدة', value: 3, type: 'd' },
      { label: 'الإحالات المنفذة هذا الأسبوع', value: 28, type: 's' },
    ],
  },
};

function ensureDemoCheckedOutCoverage() {
  const users = WI_DATA.users || {};
  const byId = (collection, id) => (collection || []).find((item) => item.id === id) || null;
  const assignCheckout = (record, userKey, extras = {}) => {
    const user = users[userKey];
    if (!record || !user) return;
    record.checkedOutBy = user.name;
    if (!record.assignedTo) record.assignedTo = user.name;
    Object.assign(record, extras);
  };

  // Internal operational roles that should always open at least one actionable record
  // already under their responsibility during prototype walkthroughs.
  assignCheckout(byId(WI_DATA.allowances, 'WI-2025-001198'), 'injury_head', {
    assignedTo: users.injury_head?.name || null,
  });
  assignCheckout(byId(WI_DATA.allowances, 'WI-2025-001243'), 'od_head', {
    assignedTo: users.od_head?.name || null,
  });
  assignCheckout(byId(WI_DATA.allowances, 'WI-2025-001245'), 'sickleave_head', {
    assignedTo: users.sickleave_head?.name || null,
  });
  assignCheckout(byId(WI_DATA.referrals, 'REF-2025-000123'), 'referral_coordinator', {
    assignedTo: users.referral_coordinator?.name || null,
  });

  // Committee / rapporteur walkthrough coverage
  assignCheckout(byId(WI_DATA.allowances, 'WI-2025-001246'), 'od_committee', {
    assignedTo: users.od_committee?.name || null,
  });
  assignCheckout(byId(WI_DATA.appeals, 'APP-2025-000069'), 'appeals_rapporteur', {
    assignedTo: users.appeals_rapporteur?.name || null,
  });
  assignCheckout(byId(WI_DATA.licensing, 'LIC-2025-001606'), 'supervisory_rapporteur', {
    assignedTo: users.supervisory_rapporteur?.name || null,
  });
  assignCheckout(byId(WI_DATA.sessions, 'SES-2025-0112'), 'institution_rapporteur');
  assignCheckout(byId(WI_DATA.sessions, 'SES-2025-0115'), 'licensed_institution');
  assignCheckout(byId(WI_DATA.sessions, 'SES-2025-0101'), 'supervisory_committee');
  assignCheckout(byId(WI_DATA.sessions, 'SES-2025-0120'), 'appeals_committee');
  assignCheckout(byId(WI_DATA.licensing, 'LIC-2025-001605'), 'hospital_delegate');

  // Sample requests to demonstrate "mark for discussion" capability on related internal pages.
  const discussionSeeds = [
    { id: 'WI-2025-001198', reason: 'الحالة تحتاج مناقشة التوصية قبل اعتماد رئيس القسم.' },
    { id: 'WI-2025-001243', reason: 'يوجد جانب فني يحتاج رأياً جماعياً قبل قرار رئيس القسم.' },
    { id: 'WI-2025-001245', reason: 'مراجعة فترات الإجازة المرضية تستدعي مناقشة داخلية.' },
  ];
  discussionSeeds.forEach(({ id, reason }) => {
    const record = byId(WI_DATA.allowances, id);
    if (!record) return;
    record.discussionFlagged = true;
    record.discussionReason = reason;
  });
}

ensureDemoCheckedOutCoverage();

/* ================================================================
   Make data available globally for browser loading
   ================================================================ */

// Main data object
window.WI_DATA = WI_DATA;

// Templates (already available from modular files, but ensure they exist)
if (!window.ALLOWANCE_TEMPLATE) window.ALLOWANCE_TEMPLATE = {};
if (!window.DISABILITY_TEMPLATE) window.DISABILITY_TEMPLATE = {};
if (!window.CHRONIC_TEMPLATE) window.CHRONIC_TEMPLATE = {};
if (!window.APPEAL_TEMPLATE) window.APPEAL_TEMPLATE = {};
if (!window.LICENSING_TEMPLATE) window.LICENSING_TEMPLATE = {};
if (!window.SESSION_TEMPLATE) window.SESSION_TEMPLATE = {};
if (!window.DISABILITY_RETIREMENT_TEMPLATE) window.DISABILITY_RETIREMENT_TEMPLATE = {};

// Data arrays (already available from modular files, but ensure they exist)
if (!window.USERS_DATA) window.USERS_DATA = {};
if (!window.ALLOWANCES_DATA) window.ALLOWANCES_DATA = [];
if (!window.DISABILITY_DATA) window.DISABILITY_DATA = [];
if (!window.CHRONIC_DATA) window.CHRONIC_DATA = [];
if (!window.CHRONIC_INCOMING_DATA) window.CHRONIC_INCOMING_DATA = [];
if (!window.APPEALS_DATA) window.APPEALS_DATA = [];
if (!window.LICENSING_DATA) window.LICENSING_DATA = [];
if (!window.SESSIONS_DATA) window.SESSIONS_DATA = [];
if (!window.DISABILITY_RETIREMENT_DATA) window.DISABILITY_RETIREMENT_DATA = [];
if (!window.REFERRALS_DATA) window.REFERRALS_DATA = [];

// User functions (already available from modular files, but ensure they exist)
if (!window.getUserByRole) window.getUserByRole = () => null;
if (!window.getAllUsers) window.getAllUsers = () => [];
if (!window.validateUserData) window.validateUserData = () => ({ isValid: true, errors: [] });

// Allowance functions (already available from modular files, but ensure they exist)
if (!window.createAllowanceRequest) window.createAllowanceRequest = () => ({});
if (!window.validateAllowanceRequest) window.validateAllowanceRequest = () => ({ isValid: true, errors: [] });
if (!window.getAllowanceById) window.getAllowanceById = () => null;
if (!window.getAllowancesByStatus) window.getAllowancesByStatus = () => [];
if (!window.getAllowancesByType) window.getAllowancesByType = () => [];

// Disability functions (already available from modular files, but ensure they exist)
if (!window.createDisabilityRequest) window.createDisabilityRequest = () => ({});
if (!window.validateDisabilityRequest) window.validateDisabilityRequest = () => ({ isValid: true, errors: [] });
if (!window.getDisabilityById) window.getDisabilityById = () => null;
if (!window.getDisabilitiesByStatus) window.getDisabilitiesByStatus = () => [];
if (!window.isCardExpiringSoon) window.isCardExpiringSoon = () => false;

// Chronic functions (already available from modular files, but ensure they exist)
if (!window.createChronicRequest) window.createChronicRequest = () => ({});
if (!window.validateChronicRequest) window.validateChronicRequest = () => ({ isValid: true, errors: [] });
if (!window.getChronicById) window.getChronicById = () => null;
if (!window.getChronicByStatus) window.getChronicByStatus = () => [];
if (!window.isReassessmentDue) window.isReassessmentDue = () => false;

// Appeal functions (already available from modular files, but ensure they exist)
if (!window.createAppealRequest) window.createAppealRequest = () => ({});
if (!window.validateAppealRequest) window.validateAppealRequest = () => ({ isValid: true, errors: [] });
if (!window.getAppealById) window.getAppealById = () => null;
if (!window.getAppealsByOriginalRequestId) window.getAppealsByOriginalRequestId = () => [];
if (!window.getAppealsByStatus) window.getAppealsByStatus = () => [];
if (!window.checkAppealDeadline) window.checkAppealDeadline = () => ({ isValid: true, daysRemaining: 0 });

// Licensing functions (already available from modular files, but ensure they exist)
if (!window.createLicensingRequest) window.createLicensingRequest = () => ({});
if (!window.validateLicensingRequest) window.validateLicensingRequest = () => ({ isValid: true, errors: [] });
if (!window.getLicensingById) window.getLicensingById = () => null;
if (!window.getLicensingByStatus) window.getLicensingByStatus = () => [];
if (!window.getLicensingByType) window.getLicensingByType = () => [];
if (!window.isMinDoctorsMet) window.isMinDoctorsMet = () => true;
if (!window.checkDuplicateDoctors) window.checkDuplicateDoctors = () => false;

// Session functions (already available from modular files, but ensure they exist)
if (!window.createSession) window.createSession = () => ({});
if (!window.validateSession) window.validateSession = () => ({ isValid: true, errors: [] });
if (!window.getSessionById) window.getSessionById = () => null;
if (!window.getSessionsByStatus) window.getSessionsByStatus = () => [];
if (!window.getSessionsByInstitution) window.getSessionsByInstitution = () => [];
if (!window.hasQuorum) window.hasQuorum = () => true;
if (!window.getSessionCompletionPercentage) window.getSessionCompletionPercentage = () => 0;
if (!window.isSessionUpcoming) window.isSessionUpcoming = () => false;
if (!window.isSessionToday) window.isSessionToday = () => false;

// Disability retirement functions (already available from modular files, but ensure they exist)
if (!window.createDisabilityRetirementInquiry) window.createDisabilityRetirementInquiry = () => ({});
if (!window.validateDisabilityRetirementInquiry) window.validateDisabilityRetirementInquiry = () => ({ isValid: true, errors: [] });
if (!window.getDisabilityRetirementById) window.getDisabilityRetirementById = () => null;
if (!window.getDisabilityRetirementByStatus) window.getDisabilityRetirementByStatus = () => [];
if (!window.isRetirementInquiryApproachingDeadline) window.isRetirementInquiryApproachingDeadline = () => false;
