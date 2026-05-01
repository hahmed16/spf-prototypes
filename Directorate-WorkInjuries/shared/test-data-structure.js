/* ================================================================
   test-data-structure.js — Test file for refactored data structure
   ================================================================ */

const {
  WI_DATA,
  ALLOWANCE_TEMPLATE,
  DISABILITY_TEMPLATE,
  CHRONIC_TEMPLATE,
  APPEAL_TEMPLATE,
  LICENSING_TEMPLATE,
  SESSION_TEMPLATE,
  createAllowanceRequest,
  validateAllowanceRequest,
  getAllowanceById,
  createDisabilityRequest,
  validateDisabilityRequest,
  getDisabilityById,
  createChronicRequest,
  validateChronicRequest,
  getChronicById,
  createAppealRequest,
  validateAppealRequest,
  getAppealById,
  createLicensingRequest,
  validateLicensingRequest,
  getLicensingById,
  createSession,
  validateSession,
  getSessionById,
} = require('./data');

console.log('=== Testing Refactored Data Structure ===\n');

// Test 1: Main data object structure
console.log('Test 1: Main data object structure');
console.log('✓ WI_DATA exists:', !!WI_DATA);
console.log('✓ WI_DATA.users exists:', !!WI_DATA.users);
console.log('✓ WI_DATA.allowances exists:', !!WI_DATA.allowances);
console.log('✓ WI_DATA.disability exists:', !!WI_DATA.disability);
console.log('✓ WI_DATA.chronic exists:', !!WI_DATA.chronic);
console.log('✓ WI_DATA.chronicIncoming exists:', !!WI_DATA.chronicIncoming);
console.log('✓ WI_DATA.appeals exists:', !!WI_DATA.appeals);
console.log('✓ WI_DATA.licensing exists:', !!WI_DATA.licensing);
console.log('✓ WI_DATA.sessions exists:', !!WI_DATA.sessions);
console.log('✓ WI_DATA.dashboardStats exists:', !!WI_DATA.dashboardStats);
console.log('');

// Test 2: Templates exist
console.log('Test 2: Templates exist');
console.log('✓ ALLOWANCE_TEMPLATE exists:', !!ALLOWANCE_TEMPLATE);
console.log('✓ DISABILITY_TEMPLATE exists:', !!DISABILITY_TEMPLATE);
console.log('✓ CHRONIC_TEMPLATE exists:', !!CHRONIC_TEMPLATE);
console.log('✓ APPEAL_TEMPLATE exists:', !!APPEAL_TEMPLATE);
console.log('✓ LICENSING_TEMPLATE exists:', !!LICENSING_TEMPLATE);
console.log('✓ SESSION_TEMPLATE exists:', !!SESSION_TEMPLATE);
console.log('');

// Test 3: Data arrays have content
console.log('Test 3: Data arrays have content');
console.log('✓ Allowances count:', WI_DATA.allowances.length);
console.log('✓ Disability count:', WI_DATA.disability.length);
console.log('✓ Chronic count:', WI_DATA.chronic.length);
console.log('✓ Chronic incoming count:', WI_DATA.chronicIncoming.length);
console.log('✓ Appeals count:', WI_DATA.appeals.length);
console.log('✓ Licensing count:', WI_DATA.licensing.length);
console.log('✓ Sessions count:', WI_DATA.sessions.length);
console.log('');

// Test 4: Create and validate allowance request
console.log('Test 4: Create and validate allowance request');
const newAllowance = createAllowanceRequest({
  id: 'TEST-2025-000001',
  type: 'إصابة عمل',
  status: 'تم تقديم الطلب',
  submitDate: '2025-01-30',
  applicant: { name: 'Test User', civil: '9012345678' },
  insured: { name: 'Test User', civil: '9012345678' },
  employer: { name: 'Test Company', cr: '1234567' },
  injury: { caseType: 'Test Case Type', description: 'Test description', incidentDate: '2025-01-15' },
});
console.log('✓ Created allowance request:', !!newAllowance);
const allowanceValidation = validateAllowanceRequest(newAllowance);
console.log('✓ Allowance validation:', allowanceValidation.isValid ? 'Valid' : 'Invalid');
if (!allowanceValidation.isValid) {
  console.log('  Errors:', allowanceValidation.errors);
}
console.log('');

// Test 5: Create and validate disability request
console.log('Test 5: Create and validate disability request');
const newDisability = createDisabilityRequest({
  id: 'TEST-2025-000002',
  status: 'تم تقديم الطلب',
  submitDate: '2025-01-30',
  applicant: { name: 'Test User', civil: '9012345678' },
  card: { number: 'DIS-CARD-000001', status: 'سارية', expiryDate: '2027-01-30' },
  insurance: { status: 'نشط' },
});
console.log('✓ Created disability request:', !!newDisability);
const disabilityValidation = validateDisabilityRequest(newDisability);
console.log('✓ Disability validation:', disabilityValidation.isValid ? 'Valid' : 'Invalid');
if (!disabilityValidation.isValid) {
  console.log('  Errors:', disabilityValidation.errors);
}
console.log('');

// Test 6: Create and validate chronic request
console.log('Test 6: Create and validate chronic request');
const newChronic = createChronicRequest({
  id: 'TEST-2025-000003',
  status: 'تم تقديم الطلب',
  submitDate: '2025-01-30',
  applicant: { name: 'Test User', civil: '9012345678' },
  chronic: { chronicDisease: 'Test Disease', diagnosisDate: '2025-01-15' },
  insurance: { status: 'نشط' },
});
console.log('✓ Created chronic request:', !!newChronic);
const chronicValidation = validateChronicRequest(newChronic);
console.log('✓ Chronic validation:', chronicValidation.isValid ? 'Valid' : 'Invalid');
if (!chronicValidation.isValid) {
  console.log('  Errors:', chronicValidation.errors);
}
console.log('');

// Test 7: Create and validate appeal request
console.log('Test 7: Create and validate appeal request');
const newAppeal = createAppealRequest({
  id: 'TEST-2025-000004',
  originalRequestId: 'WI-2025-000001',
  originalRequestType: 'بدلات انقطاع عن العمل',
  status: 'تم تقديم التظلم',
  submitDate: '2025-01-30',
  applicant: { name: 'Test User', civil: '9012345678' },
  insured: { name: 'Test User', civil: '9012345678' },
  employer: { name: 'Test Company', cr: '1234567' },
  decision: { type: 'رفض', date: '2025-01-20', knowledgeDate: '2025-01-25' },
  appealReason: 'Test reason',
  appealDetails: 'Test details',
});
console.log('✓ Created appeal request:', !!newAppeal);
const appealValidation = validateAppealRequest(newAppeal);
console.log('✓ Appeal validation:', appealValidation.isValid ? 'Valid' : 'Invalid');
if (!appealValidation.isValid) {
  console.log('  Errors:', appealValidation.errors);
}
console.log('');

// Test 8: Create and validate licensing request
console.log('Test 8: Create and validate licensing request');
const newLicensing = createLicensingRequest({
  id: 'TEST-2025-000005',
  requestType: 'جديد',
  status: 'مسودة',
  submitDate: '2025-01-30',
  delegate: { name: 'Test Delegate', civil: '9012345678' },
  institution: { name: 'Test Hospital', cr: '1234567' },
  doctors: [{ name: 'د. Test Doctor', specialty: 'Test Specialty', role: 'رئيس', confirmStatus: 'تم التأكيد' }],
});
console.log('✓ Created licensing request:', !!newLicensing);
const licensingValidation = validateLicensingRequest(newLicensing);
console.log('✓ Licensing validation:', licensingValidation.isValid ? 'Valid' : 'Invalid');
if (!licensingValidation.isValid) {
  console.log('  Errors:', licensingValidation.errors);
}
console.log('');

// Test 9: Create and validate session
console.log('Test 9: Create and validate session');
const newSession = createSession({
  id: 'TEST-2025-000006',
  type: 'عرض على مؤسسة صحية مرخصة',
  institution: 'Test Hospital',
  date: '2025-02-15',
  time: '09:00',
  status: 'مجدولة',
  members: [{ name: 'د. Test Member', specialty: 'Test Specialty', role: 'رئيس', attendance: 'مجدول' }],
});
console.log('✓ Created session:', !!newSession);
const sessionValidation = validateSession(newSession);
console.log('✓ Session validation:', sessionValidation.isValid ? 'Valid' : 'Invalid');
if (!sessionValidation.isValid) {
  console.log('  Errors:', sessionValidation.errors);
}
console.log('');

// Test 10: Get by ID functions
console.log('Test 10: Get by ID functions');
const allowance = getAllowanceById('WI-2025-001234', WI_DATA.allowances);
console.log('✓ Get allowance by ID:', !!allowance);
const disability = getDisabilityById('DIS-2025-000234', WI_DATA.disability);
console.log('✓ Get disability by ID:', !!disability);
const chronic = getChronicById('CHR-2025-000123', WI_DATA.chronic);
console.log('✓ Get chronic by ID:', !!chronic);
const appeal = getAppealById('APP-2025-000067', WI_DATA.appeals);
console.log('✓ Get appeal by ID:', !!appeal);
const licensing = getLicensingById('LIC-2025-001605', WI_DATA.licensing);
console.log('✓ Get licensing by ID:', !!licensing);
const session = getSessionById('SES-2025-0112', WI_DATA.sessions);
console.log('✓ Get session by ID:', !!session);
console.log('');

console.log('=== All Tests Completed ===');
