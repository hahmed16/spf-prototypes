# Data Models by Business Scope

This document synthesizes the data models available across the system, derived from an analysis of 45 interface screenshots. The data models are categorized by business scopes as requested: Insured, Employer (Entity), Contributions, Installments, Family Support, and Miscellaneous requests.

## 1. Insured Scope (نطاق المؤمن عليه)
This scope covers the personal and employment data associated with individual insured members.

### 1.1 Personal Details (التفاصيل الشخصية)
*   **Identification**:
    *   Civil ID (الرقم المدني): e.g., 12618845
    *   Civil ID Expiry Date (تاريخ انتهاء البطاقة الشخصية): e.g., 01/02/2029
    *   Passport Number (رقم جواز السفر): e.g., VC0693965
    *   Passport Issue Date (تاريخ اصدار جواز السفر): e.g., 17/07/2019
    *   Passport Issue Country
    *   Nationality (الجنسية): e.g., Omani (عماني)
*   **Demographics**:
    *   Name (الاسم): e.g., ماجد خميس محمد الهنائي
    *   Gender (الجنس): e.g., Male (ذكر)
    *   Date of Birth (تاريخ الميلاد): e.g., 02/07/1999
    *   Age (العمر): e.g., 26 سنين 6 شهور 24 أيام
*   **Social & Academic**:
    *   Social Status / Marital Status (الحالة الاجتماعية): e.g., Married (متزوج)
    *   Qualification (المؤهل): e.g., General Education Diploma (دبلوم تعليم عام)
*   **Lifecycle**:
    *   Death Date (تاريخ الوفاة): e.g., 26/01/2026
*   **Contact Details (بيانات التواصل)**:
    *   Email (البريد الإلكتروني): e.g., nusail333@gmail.com
    *   Phone (الهاتف)
    *   Mobile (رقم الهاتف): e.g., 99025554
    *   City
    *   Region (المنطقة): e.g., Al Dhahirah (محافظة الظاهرة)
    *   Wilayat (الولاية): e.g., Ibri (عبري)
    *   Country (الدولة): e.g., سلطنة عمان
    *   Website
*   **Financial**:
    *   Bank Details

### 1.2 Employment / Contract Details (تفاصيل التوظيف / العقد)
*   **Contract Overview**:
    *   Contract Status (الحالة): e.g., Active
    *   Source (المصدر): e.g., SPF-Internal
*   **Dates**:
    *   Contract Start Date (تاريخ البدء): e.g., 01/01/2024
    *   Contract End Date (تاريخ الانتهاء): e.g., 26/01/2026
    *   Contract Creation Date (تاريخ إنشاء العقد): e.g., 21/04/2026
    *   Contract Delivery Date: e.g., 21/04/2026
*   **Job Details**:
    *   Job Title (الوظيفة): e.g., Engineer (مهندس)
    *   Job Category (فئة الوظيفة): e.g., Ar: GOV JOBS
    *   Contract Type (نوع العقد): e.g., Limited (محدد)
    *   Tenure (مدة الخدمة): e.g., 2 سنين 26 أيام
*   **Salary (تفاصيل الراتب)**:
    *   Basic Salary (الراتب الأساسي): e.g., 2015
    *   Allowances (إجمالي البدل): e.g., 0
    *   Gross Salary (إجمالي الراتب): e.g., 2015
*   **Insurance/Scheme**:
    *   Insurance Type (نوع شركة التأمين): e.g., Employment in Private Sector (التوظيف في الجهات الخاصة)
    *   Scheme Category (النظام): e.g., Private Sector (داخل السلطنة - القطاع الخاص)
*   **Employer Reference**:
    *   Entity Name (اسم جهة العمل): e.g., خبراء الحفر الدولية
    *   CR Number (رقم السجل التجاري): e.g., 1408775
*   **Resignation/Termination**:
    *   Resignation Creation Date: e.g., 21/04/2026
    *   Source: e.g., SPFI
    *   Resignation Reason (سبب الاستقالة): e.g., Death (وفاة)

### 1.3 Entrepreneur and Elective Details (العاملين لحسابهم الخاص / اختياري)
*   **Status**:
    *   Total Contribution: e.g., OMR 0
    *   Year: e.g., 2026
*   **Activity Details**:
    *   Business Name (اسم النشاط التجاري): e.g., 1466435-مشاريع أم صهيب للاستثمار
    *   Category (Business Owner / Elective): e.g., Business Owner
    *   Start Date (تاريخ البدء): e.g., 06/02/2023
    *   End Date (تاريخ الانتهاء)
    *   Latest Salary in OMR: e.g., 325
    *   Licenses

## 2. Employer / Entity Scope (نطاق صاحب العمل / جهة العمل)
This scope encapsulates the structural, financial, and personnel data of employing organizations.

### 2.1 Entity Profile (بيانات جهة العمل)
*   **Identification**:
    *   Entity Name: e.g., النجم الأول لخدمات النفط والغاز
    *   CR Number (رقم السجل التجاري): e.g., 1336383
*   **Classification**:
    *   Entity Sector (القطاع): e.g., Private Sector (داخل السلطنة - القطاع الخاص)
    *   Entity Category (الفئة)
    *   Entity Degree (الدرجة): e.g., First (الاولى)
    *   Legal Status (الشكل القانوني): e.g., Limited Liability Company (شركة محدودة المسؤولية)
    *   Entity Status (الحالة): e.g., Expired (منتهية), Active (نشطة)
*   **Dates**:
    *   Registration Date
    *   Start Date (تاريخ البدء): e.g., 29/01/2019
    *   Expiry Date (تاريخ الانتهاء): e.g., 25/01/2029
*   **Financial / Capital (رأس المال)**:
    *   Total Capital (إجمالي رأس المال): e.g., 150000
    *   Asset Capital: e.g., 0
    *   Cash Capital: e.g., 150000
    *   Total Shares (إجمالي الأسهم): e.g., 150000
    *   Share Value: e.g., 1
*   **Contact Information**:
    *   Email: e.g., GetAdminOmani@getglobalgroup.com
    *   Phone: e.g., 96588826
    *   Mobile: e.g., 96588826
    *   City
    *   Region: e.g., محافظة مسقط
    *   Wilayat: e.g., السيب
    *   Country: e.g., سلطنة عمان
    *   Website
*   **Bank Details**:
    *   Bank Name: e.g., Bank Muscat (بنك مسقط)
    *   Account Number: e.g., 0316056284900011
    *   Account Name: e.g., FIRST STAR OIL AND GAS SERVICES
*   **Metrics**:
    *   Employees Count (Active, Inactive, Total): e.g., 35 Active, 36 Inactive, 71 Total
    *   Omanization %
    *   Gender %

### 2.2 Personnel & Hierarchy
*   **Owners (الملاك)**:
    *   Name: e.g., خميس محمد علي الهنائي
    *   Civil ID: e.g., 3179645
    *   Nationality
    *   Start Date: e.g., 10/10/2024
    *   End Date
    *   Source (e.g., MOCI): e.g., MOCI
*   **Delegates (المفوضين)**:
    *   Name: e.g., سعيد حمد سعيد المحروقي
    *   Civil ID: e.g., 12772494
    *   Start Date: e.g., 16/07/2019
    *   End Date: e.g., 21/09/2021
    *   Source
*   **Signatories (الموقعين)**:
    *   Name: e.g., خميس محمد علي الهنائي
    *   Civil ID: e.g., 3179645
    *   Nationality: e.g., Omani (عماني)
    *   Start Date: e.g., 10/10/2024
    *   End Date
    *   Source: e.g., MOCI
*   **Employees (الموظفين)**:
    *   Name: e.g., ابراهيم يوسف علي الزدجالي
    *   Civil ID: e.g., 8857602
    *   Civil ID Expiry: e.g., 07/10/2035
    *   Nationality: e.g., Omani (سلطنة عمان)
    *   Job Title: e.g., Business Owner & Partner (أصحاب الأعمال و الشركاء)
    *   Start Date: e.g., 08/10/2019
    *   End Date: e.g., 06/07/2021
    *   Basic Salary: e.g., 225
    *   Allowance: e.g., 0
    *   Status: e.g., Inactive (غير نشط)

## 3. Contributions Scope (نطاق الاشتراكات)
This scope handles the billing, payment tracking, and adjustments of social protection contributions.

### 3.1 Monthly Bills (الفواتير الشهرية)
*   **Bill Identity**:
    *   Bill Number: e.g., 202604
    *   Bill Month / Year: e.g., April / 2026
    *   Bill Type: e.g., Monthly Bill
    *   Sector: e.g., Private Sector
    *   Scheme
*   **Contribution Details**:
    *   Current Contributions (No of Employees, Amount in OMR): e.g., 29 Employees, 1299.142 OMR
    *   Previous Contributions: e.g., 87 Employees, 3742.765 OMR
    *   Salary Change Adjustments: e.g., 0 OMR
    *   Advance Payments: e.g., 0 OMR
*   **Additional Charges**:
    *   Fines Details (بيانات الغرامات): e.g., 16.728 OMR
    *   Adjustment Details (بيانات التسويات): e.g., 0.000 OMR

### 3.2 Payment Register (سجل الدفعات)
*   **Payment Details**:
    *   Bank Name: e.g., Bank Sohar - Revenue - 140399
    *   Payment Process Date: e.g., 23/02/2026
    *   Paid Date: e.g., 19/02/2026
    *   Paid Amount: e.g., 370.766
    *   Bill Amount: e.g., 370.766
    *   Bill Type: e.g., Instalment Bill
    *   Bill Number: e.g., 2025 / 3989923
    *   Bill Month: e.g., ديسمبر 2025

### 3.3 Contribution Actions (Postpone, Cancel, Refund)
*   **Request Details**:
    *   Transaction Type (Postpone/Cancel): e.g., Postpone Contributions
    *   Postpone Period
    *   Due Period
    *   Ignored Months
    *   Postpone Amount
    *   Total Contribution Amount
    *   Reason
    *   Notes
*   **Refund / Voucher Request**:
    *   Payee Type
    *   Payee Name
    *   Account No/IBAN
    *   Bank Code
    *   Return Reason
    *   Return Remarks
    *   Fine/Contribution breakdown

## 4. Installments Scope (نطاق التقسيط)
This scope manages the processes related to paying due contributions or fines in structured installments.

### 4.1 Installment Request (طلب تقسيط)
*   **Context**:
    *   Sector: e.g., Private Sector (داخل السلطنة - القطاع الخاص)
    *   System: e.g., Private Sector (القطاع الخاص)
    *   Entity Name: e.g., مناظر السبيطي للتجاره والمقاولات
    *   CR Number: e.g., 1033724
    *   Requester Branch: e.g., Head Office (صندوق الحماية الاجتماعية (المكتب الرئيسي))
*   **Plan Details**:
    *   No. of Installments: e.g., 5
    *   Start Date/Period: e.g., 27/04/2026 to 06/05/2026
    *   Advance Payment %
    *   No. of Cheques: e.g., 34
    *   Last Cheque %
    *   Installment Notes/Remarks: e.g., طلب تقسيط المبلغ وذلك بسبب الظروف الاقتصادية للشركة بمبلغ 100 ريال لكل شهر
*   **Financials**:
    *   Total Contribution
    *   Total Fine
    *   Total Installment Amount
    *   Postponed Amount: e.g., 0.000
*   **Contact Persons**:
    *   Owner Name: e.g., محمد علي سالم الشبيبي
    *   Mobile/Email: e.g., 99629185 / 185@gmail.com
    *   Person Name 1: e.g., شريفة عيسى جمعة البلوشية
    *   Contact 1: e.g., 92577128
    *   Person Name 2
    *   Contact 2

### 4.2 Installment Cheques & Details (تفاصيل الأقساط والشيكات)
*   **Bank Info**:
    *   Bank Name: e.g., Bank Muscat (بنك مسقط)
    *   Account Number: e.g., 0343006651360017
    *   Payment Type: e.g., 33
*   **Cheque Schedule**:
    *   Bill Number/Issue Year: e.g., 2025 / 3989923
    *   Cheque Date: e.g., 16/02/2026
    *   Cheque No: e.g., 92406801
    *   Cheque Status: e.g., Paid (دفعت), Active (نشيط)
    *   Total Amount: e.g., 370.766
*   **Amount Breakdown**:
    *   Installment Fine: e.g., 0.000
    *   Contribution Amount: e.g., 370.766
    *   Registration Fine: e.g., 0.000
    *   Resignation Fine: e.g., 0.000
    *   Contribution Fine: e.g., 0.000
*   **Follow-up Tracking**:
    *   Clearance Date
    *   Clearance Letter No
    *   Complaint Letter Date/No
    *   Return Date: e.g., 24/08/2016

### 4.3 Installment Workflow & Documentation
*   **Progress Statuses**:
    *   Receive Request (إستلام الطلب)
    *   Review Request (مراجعة الطلب)
    *   Enter Bank Details (ادخال تفاصيل البيانات البنكية)
    *   Receive Cheques (استلام الشيكات)
    *   Review Data and Transfer for Approval (مراجعة البيانات والتحويل للاعتماد)
    *   Head of Contributions Dept Approval (موافقة رئيس قسم الاشتراكات)
*   **Required Documents**:
    *   Installment Plan (خطة التقسيط)
    *   Lease Contract (عقد الإيجار)
    *   Company Sale Contract (عقد بيع الشركة)
    *   CR Papers (*أوراق السجل التجاري)
    *   IDs (*البطاقة الشخصية او المقيم لموقع الشيك)
    *   Bank Letters (خطاب البنك أو كشف الحساب البنكي)
    *   Cheques (*الشيكات)
*   **Blocking Status**:
    *   Block/Unblock Status: e.g., Block
    *   Block Reason: e.g., Failure to Pay (التخلف عن السداد)
    *   Block Date: e.g., 26/05/2012
    *   Blocked By: e.g., SDBA

## 5. Family Support Scope (نطاق دعم الأسرة)
This scope focuses on the eligibility and disbursement of the Family Income Support benefit.

### 5.1 Request Details (معلومات مقدم الطلب)
*   **Request Context**:
    *   Request Number: e.g., FIS-20260202-130057-527
    *   Created On: e.g., 02/02/2026
    *   Effective From: e.g., 02/02/2026
    *   Payment Process (Yes/No): e.g., Yes
    *   Payment Remarks
    *   Family Type: e.g., Natural Family (أسرة طبيعية)
*   **Head of Family**:
    *   Name: e.g., صالح جمعة مسلم الشكري
    *   Date of Birth: e.g., 03/09/1977
    *   Civil ID: e.g., 4731815
    *   Civil ID Expiry: e.g., 19/07/2028
    *   Nationality: e.g., Omani (عماني)
*   **Wealth/Eligibility Checks (Yes/No flags)**:
    *   Max 4 lands/properties: e.g., No (لا)
    *   Owns commercial real estate: e.g., No (لا)
    *   Owns usufruct contracts: e.g., No (لا)
    *   Owns commercial records with expats: e.g., No (لا)
    *   Gives private employment: e.g., No (لا)

### 5.2 Family Income Information (بيانات دخل الأسرة)
*   **Member List**:
    *   Sequence No: e.g., 1
    *   Civil ID: e.g., 4731815
    *   ID Expiry Date: e.g., 19/07/2028
    *   Name: e.g., صالح جمعة مسلم الشكري
    *   Social Status: e.g., Married (متزوج)
    *   Age: e.g., 48 سنين 7 شهور 24 أيام
*   **Attributes**:
    *   Qualified (Y/N): e.g., Yes (نعم)
    *   Relation: e.g., Self
    *   Head of Family (Y/N): e.g., Yes
    *   Employed (Y/N): e.g., No (لا)
    *   Sick (Y/N): e.g., No (لا)
    *   Has Properties (Y/N): e.g., No (لا)
*   **Financial Details**:
    *   View Other Income
    *   View Income Details
    *   Equivalent Amount: e.g., 115
    *   Expenses: e.g., Legal Expenses (240 OMR) linked to spouse

### 5.3 Benefit Financials & Eligibility
*   **Eligibility Rules Tracking**:
    *   Passed (Y/N): e.g., Yes (Checkmark)
    *   Person Fact: e.g., متزوج
    *   Condition Parameter: e.g., Equal To
    *   Required Value: e.g., متزوج
    *   Condition: e.g., Marital Status
    *   Eligibility Criteria: e.g., Married Male and Female
*   **Summary**:
    *   Total Eligible Family Members: e.g., 3
    *   Target Amount: e.g., 199.186
    *   Total Income: e.g., 0
    *   Net Amount: e.g., 199.186
*   **Bank Details**:
    *   Bank Name: e.g., بنك مسقط
    *   Account Holder Name: e.g., SALEH JUMA MUSLEM AL SHUKAIRI
    *   Account Number: e.g., 0331011024990011

## 6. Miscellaneous (Requests, Blocks, System Dashboards)
*   **Paternity Leave Request (طلب إجازة أبوة)**:
    *   Request Status
    *   Date
    *   Person Details: Civil ID, Name, Nationality, Leave Type
    *   Employment Snapshot: Entity, Job Start Date, Last Wage
*   **Job Security Request**:
    *   Request No
    *   Request Date
    *   Insured Details: Region/Wilayat, Contact No
*   **Blocking/Unblocking System (حظر/رفع الحظر)**:
    *   Target Entity
    *   Reason Name
    *   Notes
    *   Action By
    *   Action Date
