# Request Types and Complete Field Specifications

This document provides a comprehensive overview of all request types in the Work Injuries Directorate system, including complete field specifications for each request type.

---

## 1. Work Injury Allowances Request (بدلات الانقطاع عن العمل)

### Request Overview
Requests for compensation benefits due to work-related injuries or occupational diseases that result in absence from work.

### Complete Field Structure

#### Basic Request Information
- **id**: Unique request identifier (e.g., `WI-2025-001234`)
- **type**: Request type - `إصابة عمل` (Work Injury) or `مرض مهني` (Occupational Disease)
- **subtype**: Specific subtype
  - For work injury: `حادث طريق` (Road Accident), `إصابة في موقع العمل` (Workplace Injury)
  - For occupational disease: `الربو المهني` (Occupational Asthma), `التهاب المفاصل الروماتويدي (المهني)` (Occupational Rheumatoid Arthritis)
- **isRelapse**: Relapse indicator - `نعم` (Yes) or `لا` (No)
- **status**: Current status of the request
- **submitDate**: Date when request was submitted
- **lastUpdate**: Date and time of last update
- **lastUpdatedBy**: Name of person who last updated the request
- **expectedClosureDate**: Expected date for request closure
- **remainingDays**: Number of days remaining until expected closure

#### Applicant Information (مقدم الطلب)
- **name**: Full name of applicant
- **civil**: Civil ID number
- **role**: Role of applicant (e.g., `العامل / المؤمن عليه / المواطن`)
- **phone**: Phone number
- **email**: Email address
- **region**: Region
- **wilayat**: Wilayat
- **country**: Country
- **civilExpiry**: Civil ID expiry date
- **employeeId**: Employee ID (if applicable)

#### Insured Person Information (المؤمن عليه)
- **name**: Full name of insured person
- **civil**: Civil ID number
- **insurance**: Insurance number
- **dob**: Date of birth
- **gender**: Gender - `ذكر` (Male) or `أنثى` (Female)
- **nationality**: Nationality
- **insuranceStatus**: Insurance status - `نشط` (Active) or other
- **regDate**: Registration date with the fund
- **subType**: Subscription type - `إلزامي` (Mandatory) or `اختياري` (Optional)
- **phone**: Phone number
- **email**: Email address
- **civilExpiry**: Civil ID expiry date

#### Employer Information (جهة العمل)
- **name**: Name of employer/entity
- **cr**: Commercial registration number
- **establishment**: Establishment number
- **jobTitle**: Job title
- **joinDate**: Date of joining employment
- **location**: Work location
- **sector**: Sector (e.g., `الإنشاءات والمقاولات`)
- **employerType**: Employer type - `خاص` (Private) or `حكومي` (Government)
- **branch**: Branch information
  - **id**: Branch ID
  - **name**: Branch name
  - **state**: State
  - **governorate**: Governorate
- **phone**: Employer phone number

#### Injury/Disease Information (بيانات الإصابة/المرض)

For Work Injury (إصابة عمل):
- **caseType**: Type of case (e.g., `حادث طريق`, `إصابة في موقع العمل`)
- **description**: Detailed description of the incident
- **location**: Location where incident occurred
- **bodyPart**: Body part injured
- **witnesses**: Witnesses indicator - `نعم` (Yes) or `لا` (No)
- **witnessNames**: Names of witnesses
- **incidentDate**: Date of incident
- **insuredStatus**: Status of insured person (e.g., `تحت العلاج` - Under treatment)
- **accidentDirection**: Direction of accident (e.g., `السكن الدائم إلى مقر العمل`)

For Occupational Disease (مرض مهني):
- **caseType**: Type of occupational disease
- **caseDescription**: Description of the disease case
- **description**: General description
- **chemicalAgents**: Chemical agents or causative factors
- **exposureDuration**: Duration of occupational exposure
- **firstSuspicion**: Date of first suspicion
- **workEnvironment**: Description of work environment
- **insuredStatus**: Status of insured person

#### Investigation Report (تقرير التحقيق)
- **summary**: Summary of investigation
- **findings**: Findings from data verification
- **employeeRecommendation**: Employee recommendation - `موافقة` (Approval) or `رفض` (Rejection)
- **employeeNotes**: Notes from employee
- **headDecision**: Decision from section head
- **headNotes**: Notes from section head

#### Field Visits (الزيارات الميدانية)
Array of field visit objects:
- **date**: Date of visit
- **time**: Time of visit
- **reason**: Reason for visit
- **staff**: Staff members conducting visit
- **summary**: Summary of visit and results
- **results**: Results of visit
- **attachments**: List of attachment names

#### Sick Leave Periods (فترات الإجازات المرضية)
Array of sick leave period objects:
- **from**: Start date
- **to**: End date
- **days**: Number of days
- **status**: Status - `معتمدة` (Approved), `مرفوضة` (Rejected), or other
- **addedBy**: Who added the period

#### Referral Information (بيانات الإحالة)
- **institution**: Name of licensed health institution
- **rapporteur**: Name of rapporteur
- **referralDate**: Date of referral
- **reason**: Reason for referral
- **referrer**: Referring entity
- **notes**: Referral notes

#### Session Information (بيانات الجلسة)
- **id**: Session ID
- **institution**: Health institution name
- **date**: Session date
- **time**: Session time
- **quorum**: Quorum status - `true` or `false`
- **members**: Array of committee members
  - **name**: Member name
  - **specialty**: Medical specialty
  - **role**: Role in committee
  - **attendance**: Attendance status - `حاضر` (Present), `غائب` (Absent), or `مجدول` (Scheduled)

#### Committee Decision (قرار المؤسسة الصحية)
- **type**: Decision type - `موافقة` (Approval), `رفض` (Rejection), `اعتماد الترخيص` (License Approval)
- **date**: Decision date
- **disabilityPercent**: Disability percentage (if applicable)
- **sickLeavePeriod**: Recommended sick leave period
- **content**: Detailed decision content
- **signatories**: Array of signing member names

#### Disbursement Information (بيانات الصرف)
- **status**: Disbursement status - `تم الصرف` (Disbursed), `موقوف` (Suspended), or other
- **periods**: Number of approved periods
- **totalDays**: Total number of days
- **totalAmount**: Total amount due
- **lastDisbursement**: Date of last disbursement
- **nextDisbursement**: Date of next disbursement
- **stopReason**: Reason for stopping (if applicable)

#### Attachments (المرفقات)
Array of attachment objects:
- **id**: Attachment ID
- **type**: Attachment type (e.g., `تقرير طبي أولي`, `تقرير الشرطة`)
- **name**: File name
- **uploadDate**: Upload date
- **uploadedBy**: Name of uploader
- **role**: Role of uploader
- **size**: File size
- **icon**: File icon type

#### Notes (الملاحظات)
Array of note objects:
- **id**: Note ID
- **author**: Author name
- **role**: Author role
- **text**: Note content
- **time**: Date and time of note

#### Timeline (السجل الزمني)
Array of timeline event objects:
- **action**: Action description
- **actor**: Name of person who performed action
- **role**: Role of actor
- **time**: Date and time of action
- **fromStatus**: Previous status
- **toStatus**: New status
- **note**: Additional notes
- **type**: Event type - `success`, `danger`, `warning`, or `default`

#### Assignment Information
- **assignedTo**: Name of assigned person
- **checkedOutBy**: Name of person who checked out the request

#### Return Information (for returned requests)
- **returnReason**: Reason for returning request

---

## 2. Disability Benefit Request (منفعة الإعاقة)

### Request Overview
Requests for disability benefits for persons with disabilities.

### Complete Field Structure

#### Basic Request Information
- **id**: Unique request identifier (e.g., `DIS-2025-000234`)
- **status**: Current status of the request
- **submitDate**: Date when request was submitted
- **lastUpdate**: Date and time of last update
- **lastUpdatedBy**: Name of person who last updated the request
- **expectedClosureDate**: Expected date for request closure
- **remainingDays**: Number of days remaining until expected closure

#### Applicant Information (مقدم الطلب)
- **name**: Full name of applicant
- **civil**: Civil ID number
- **phone**: Phone number
- **email**: Email address
- **role**: Role of applicant (e.g., `المواطن`, `العامل`)

#### Disability Card Information (بطاقة الإعاقة)
- **number**: Disability card number
- **status**: Card status - `سارية` (Valid) or other
- **activationDate**: Card activation date
- **expiryDate**: Card expiry date
- **typeSD**: Disability type according to Social Development
- **typeMOH**: Disability type according to Ministry of Health
- **provenDate**: Date when disability was proven
- **lastCheck**: Date of last check

#### Insurance Information (معلومات التأمين)
- **status**: Insurance status - `نشط` (Active) or other
- **regDate**: Registration date
- **subType**: Subscription type - `إلزامي` (Mandatory) or `اختياري` (Optional)
- **otherBenefits**: Other benefits - `لا يوجد` (None) or other

#### Disbursement Information (بيانات الصرف)
- **approved**: Approval status - `true` or `false`
- **approvalDate**: Date of approval
- **monthlyDay**: Day of month for disbursement
- **status**: Disbursement status - `الصرف جارٍ` (Disbursement in progress) or other
- **expiryDate**: Expiry date
- **stopReason**: Reason for stopping (if applicable)
- **lastCheck**: Date of last check

#### Attachments (المرفقات)
Array of attachment objects (same structure as Work Injury Allowances)

#### Notes (الملاحظات)
Array of note objects (same structure as Work Injury Allowances)

#### Timeline (السجل الزمني)
Array of timeline event objects (same structure as Work Injury Allowances)

#### Assignment Information
- **assignedTo**: Name of assigned person
- **checkedOutBy**: Name of person who checked out the request

---

## 3. Chronic Disease Request (الأمراض المستديمة)

### Request Overview
Requests for chronic disease benefits and periodic reassessments.

### Complete Field Structure

#### Basic Request Information
- **id**: Unique request identifier (e.g., `CHR-2025-000123`)
- **status**: Current status of the request
- **submitDate**: Date when request was submitted
- **lastUpdate**: Date and time of last update
- **lastUpdatedBy**: Name of person who last updated the request
- **expectedClosureDate**: Expected date for request closure
- **remainingDays**: Number of days remaining until expected closure

#### Applicant Information (مقدم الطلب)
- **name**: Full name of applicant
- **civil**: Civil ID number
- **phone**: Phone number
- **email**: Email address
- **role**: Role of applicant

#### Chronic Disease Information (بيانات المرض المستديم)
- **chronicDisease**: Name of chronic disease (e.g., `داء السكري من النوع الثاني`, `القصور الكلوي المزمن`)
- **diagnosisDate**: Date of diagnosis
- **severity**: Disease severity
- **treatment**: Current treatment
- **medications**: List of medications
- **complications**: Any complications
- **lastAssessment**: Date of last assessment
- **nextAssessment**: Date of next assessment

#### Insurance Information (معلومات التأمين)
- **status**: Insurance status
- **regDate**: Registration date
- **subType**: Subscription type
- **otherBenefits**: Other benefits

#### Disbursement Information (بيانات الصرف)
- **approved**: Approval status
- **approvalDate**: Date of approval
- **monthlyDay**: Day of month for disbursement
- **status**: Disbursement status
- **expiryDate**: Expiry date
- **stopReason**: Reason for stopping (if applicable)
- **lastCheck**: Date of last check

#### Attachments (المرفقات)
Array of attachment objects

#### Notes (الملاحظات)
Array of note objects

#### Timeline (السجل الزمني)
Array of timeline event objects

#### Assignment Information
- **assignedTo**: Name of assigned person
- **checkedOutBy**: Name of person who checked out the request

#### Referral Information (بيانات الإحالة)
Same structure as Work Injury Allowances

#### Session Information (بيانات الجلسة)
Same structure as Work Injury Allowances

#### Committee Decision (قرار المؤسسة الصحية)
Same structure as Work Injury Allowances

---

## 4. Appeal Request (طلب التظلم)

### Request Overview
Requests for appealing decisions made on other request types.

### Complete Field Structure

#### Basic Request Information
- **id**: Unique request identifier (e.g., `APP-2025-000067`)
- **originalRequestId**: ID of original request being appealed
- **originalRequestType**: Type of original request (e.g., `بدلات انقطاع عن العمل`)
- **status**: Current status of the appeal
- **submitDate**: Date when appeal was submitted
- **lastUpdate**: Date and time of last update
- **lastUpdatedBy**: Name of person who last updated the request
- **expectedClosureDate**: Expected date for request closure
- **remainingDays**: Number of days remaining until expected closure

#### Applicant Information (مقدم الطلب)
- **name**: Full name of applicant
- **civil**: Civil ID number
- **role**: Role of applicant
- **phone**: Phone number
- **email**: Email address

#### Insured Person Information (المؤمن عليه)
Same structure as Work Injury Allowances

#### Employer Information (جهة العمل)
Same structure as Work Injury Allowances

#### Original Decision Information (القرار الأصلي)
- **type**: Decision type - `رفض` (Rejection), `اعتراض على الإحالة` (Objection to Referral), or other
- **date**: Date of original decision
- **issuer**: Name of issuer (e.g., `رئيس قسم التحقيق في إصابات العمل`)
- **details**: Details of the decision
- **knowledgeDate**: Date when applicant became aware of the decision

#### Appeal Information (معلومات التظلم)
- **appealReason**: Reason for appeal (e.g., `القرار مخالف للأنظمة`, `القرار يحتاج مراجعة طبية أدق`)
- **appealDetails**: Detailed explanation of appeal
- **additionalNotes**: Additional notes

#### Attachments (المرفقات)
Array of attachment objects

#### Notes (الملاحظات)
Array of note objects

#### Timeline (السجل الزمني)
Array of timeline event objects

#### Assignment Information
- **assignedTo**: Name of assigned person
- **checkedOutBy**: Name of person who checked out the request

#### Session Information (بيانات الجلسة)
Same structure as Work Injury Allowances

#### Final Decision (القرار النهائي)
- **type**: Final decision type
- **date**: Date of final decision
- **content**: Content of final decision
- **signatories**: Array of signing member names

---

## 5. Licensing Request (طلب الترخيص)

### Request Overview
Requests for licensing or renewal of health institutions to form medical committees.

### Complete Field Structure

#### Basic Request Information
- **id**: Unique request identifier (e.g., `LIC-2025-001605`)
- **requestType**: Type of request - `جديد` (New), `تجديد` (Renewal), or other
- **status**: Current status of the request
- **submitDate**: Date when request was submitted
- **lastUpdate**: Date and time of last update
- **lastUpdatedBy**: Name of person who last updated the request
- **expectedClosureDate**: Expected date for request closure
- **remainingDays**: Number of days remaining until expected closure

#### Delegate Information (المفوض)
- **name**: Full name of delegate
- **civil**: Civil ID number
- **role**: Role of delegate (e.g., `المفوض عن المستشفى`, `المفوض عن المستشفيات`)
- **phone**: Phone number
- **email**: Email address

#### Institution Information (المؤسسة الصحية)
- **name**: Name of institution
- **cr**: Commercial registration number
- **crStatus**: CR status - `سارٍ` (Valid) or other
- **crExpiry**: CR expiry date
- **type**: Institution type - `مستشفى خاص` (Private Hospital), `مركز طبي` (Medical Center), or other
- **address**: Physical address
- **governorate**: Governorate
- **phone**: Institution phone number
- **email**: Institution email
- **currentLicenseNo**: Current license number (if renewal)

#### Doctors/Committee Members (الأطباء/أعضاء اللجنة)
Array of doctor objects:
- **name**: Full name of doctor
- **civil**: Civil ID number
- **specialty**: Medical specialty (e.g., `جراحة عامة`, `طب باطني`, `جراحة عظام`)
- **role**: Role in committee - `رئيس` (President), `نائب رئيس` (Vice President), `عضو` (Member)
- **confirmStatus**: Confirmation status - `تم التأكيد` (Confirmed), `بانتظار التأكيد` (Pending Confirmation)
- **duplicateCheck**: Duplicate check result - `لا يوجد تعارض` (No conflict) or other

#### Verification Information (معلومات التحقق)
- **totalDoctors**: Total number of doctors
- **confirmedDoctors**: Number of confirmed doctors
- **minMet**: Minimum requirement met - `true` or `false`
- **duplicates**: Array of duplicate conflicts (if any)

#### Attachments (المرفقات)
Array of attachment objects

#### Notes (الملاحظات)
Array of note objects

#### Timeline (السجل الزمني)
Array of timeline event objects

#### Assignment Information
- **assignedTo**: Name of assigned person
- **checkedOutBy**: Name of person who checked out the request

#### Session Information (بيانات الجلسة)
Same structure as Work Injury Allowances

#### Committee Decision (قرار اللجنة)
- **type**: Decision type
- **date**: Decision date
- **licenseNumber**: License number (if approved)
- **expiryDate**: License expiry date
- **content**: Content of decision
- **signatories**: Array of signing member names

#### Active License Information (الترخيص النشط)
- **licenseNumber**: Current license number
- **issueDate**: Date of issue
- **expiryDate**: Expiry date
- **status**: License status

---

## 6. Referral Request (طلب الإحالة)

### Request Overview
Requests for referring cases to licensed health institutions for medical evaluation.

### Complete Field Structure

#### Basic Request Information
- **id**: Unique request identifier
- **status**: Current status of the request
- **submitDate**: Date when request was submitted
- **lastUpdate**: Date and time of last update
- **lastUpdatedBy**: Name of person who last updated the request
- **expectedClosureDate**: Expected date for request closure
- **remainingDays**: Number of days remaining until expected closure

#### Referral Information (معلومات الإحالة)
- **institution**: Name of licensed health institution
- **rapporteur**: Name of rapporteur
- **referralDate**: Date of referral
- **reason**: Reason for referral
- **referrer**: Referring entity
- **notes**: Referral notes

#### Original Request Information
Includes all fields from the original request type (Work Injury Allowances, Chronic Disease, etc.)

#### Session Information (بيانات الجلسة)
Same structure as Work Injury Allowances

#### Committee Decision (قرار المؤسسة الصحية)
Same structure as Work Injury Allowances

#### Attachments (المرفقات)
Array of attachment objects

#### Notes (الملاحظات)
Array of note objects

#### Timeline (السجل الزمني)
Array of timeline event objects

#### Assignment Information
- **assignedTo**: Name of assigned person
- **checkedOutBy**: Name of person who checked out the request

---

## Common Fields Across All Request Types

### System Fields
- **id**: Unique identifier
- **status**: Current status
- **submitDate**: Submission date
- **lastUpdate**: Last update date/time
- **lastUpdatedBy**: Last updater name
- **expectedClosureDate**: Expected closure date
- **remainingDays**: Remaining days

### Person Information
- **name**: Full name
- **civil**: Civil ID number
- **phone**: Phone number
- **email**: Email address
- **role**: Role

### Attachments
- **id**: Attachment ID
- **type**: Attachment type
- **name**: File name
- **uploadDate**: Upload date
- **uploadedBy**: Uploader name
- **role**: Uploader role
- **size**: File size
- **icon**: File icon type

### Notes
- **id**: Note ID
- **author**: Author name
- **role**: Author role
- **text**: Note content
- **time**: Date and time

### Timeline
- **action**: Action description
- **actor**: Actor name
- **role**: Actor role
- **time**: Date and time
- **fromStatus**: Previous status
- **toStatus**: New status
- **note**: Additional notes
- **type**: Event type

### Assignment
- **assignedTo**: Assigned person name
- **checkedOutBy**: Check-out person name

---

## Status Values by Request Type

### Work Injury Allowances Statuses
- `مسودة` (Draft)
- `تم تقديم الطلب — بانتظار تعيين المحقق المختص` (Submitted - Awaiting Investigator Assignment)
- `قيد التحقيق — إصابات العمل` (Under Investigation - Work Injuries)
- `قيد التحقيق — الأمراض المهنية` (Under Investigation - Occupational Diseases)
- `بانتظار اعتماد رئيس قسم التحقيق في إصابات العمل` (Awaiting Work Injury Investigation Head Approval)
- `بانتظار اعتماد رئيس قسم التحقيق في الأمراض المهنية` (Awaiting Occupational Disease Investigation Head Approval)
- `قيد المراجعة من موظف قسم الإجازات المرضية` (Under Review by Sick Leave Employee)
- `بانتظار اعتماد رئيس قسم الإجازات المرضية` (Awaiting Sick Leave Head Approval)
- `تم إعادة الطلب لاستيفاء البيانات` (Returned for Data Completion)
- `تم رفض الطلب` (Request Rejected)
- `معتمد` (Approved)
- `تم إغلاق الطلب` (Request Closed)

### Disability Benefit Statuses
- `تم تقديم طلب منفعة الأشخاص ذوي الإعاقة — بانتظار مراجعة موظف قسم الإعاقة والأمراض المستديمة` (Submitted - Awaiting Review)
- `بانتظار اعتماد رئيس قسم الإعاقة والأمراض المستديمة` (Awaiting Head Approval)
- `تم اعتماد الطلب — الصرف جارٍ` (Approved - Disbursement in Progress)
- `تم رفض الطلب` (Request Rejected)
- `تم إغلاق الطلب` (Request Closed)

### Chronic Disease Statuses
- `تم تقديم طلب مرض مستديم — بانتظار مراجعة موظف قسم الإعاقة والأمراض المستديمة` (Submitted - Awaiting Review)
- `بانتظار اعتماد رئيس قسم الإعاقة والأمراض المستديمة` (Awaiting Head Approval)
- `تم اعتماد الطلب — الصرف جارٍ` (Approved - Disbursement in Progress)
- `بانتظار إعادة التقييم الدوري` (Awaiting Periodic Reassessment)
- `تم رفض الطلب` (Request Rejected)
- `تم إغلاق الطلب` (Request Closed)

### Appeal Statuses
- `تم تقديم طلب التظلم — بانتظار مراجعة موظف قسم اللجان الطبية` (Submitted - Awaiting Review)
- `بانتظار اعتماد رئيس قسم اللجان الطبية` (Awaiting Head Approval)
- `تم جدولة جلسة التظلم` (Appeal Session Scheduled)
- `تم إصدار القرار النهائي` (Final Decision Issued)
- `تم رفض التظلم` (Appeal Rejected)
- `تم قبول التظلم` (Appeal Accepted)
- `تم إغلاق الطلب` (Request Closed)

### Licensing Statuses
- `مسودة` (Draft)
- `تم تقديم طلب الترخيص / التجديد — بانتظار مراجعة موظف قسم التراخيص والرقابة` (Submitted - Awaiting Review)
- `بانتظار اعتماد رئيس قسم التراخيص والرقابة` (Awaiting Head Approval)
- `تم جدولة جلسة الترخيص` (Licensing Session Scheduled)
- `تم إصدار الترخيص` (License Issued)
- `تم رفض الطلب` (Request Rejected)
- `تم إغلاق الطلب` (Request Closed)

---

## Notes

1. **Field Availability**: Not all fields are present in every request. Fields are conditionally displayed based on request type, status, and workflow stage.

2. **Data Validation**: All date fields should be in ISO format (YYYY-MM-DD). Phone numbers should include country code.

3. **Conditional Fields**: Many fields are only relevant for specific request types or statuses. For example, `disabilityPercent` is only relevant for requests that involve disability assessment.

4. **Array Fields**: Fields like `attachments`, `notes`, `timeline`, `fieldVisits`, and `sickLeavePeriods` are arrays that can contain multiple objects.

5. **Nested Objects**: Many fields contain nested objects (e.g., `applicant`, `insured`, `employer`, `injury`, `investigation`).

6. **Status Transitions**: Status values follow specific workflow patterns based on request type and organizational processes.

7. **Language**: All field values and labels are in Arabic as per the system's primary language.

8. **Data Sources**: Some fields are automatically populated from external systems (e.g., insured information from the insurance system, employer information from the commercial registration system).

9. **Audit Trail**: The `timeline` array provides a complete audit trail of all actions taken on a request.

10. **Assignment System**: The `assignedTo` and `checkedOutBy` fields support a check-out/check-in system to prevent concurrent modifications.
