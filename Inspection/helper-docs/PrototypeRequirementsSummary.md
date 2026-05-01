# Inspection Department Prototype Requirements Summary

## Executive Summary

Based on the analysis of documentation files in the Inspection details folder, the Social Protection Fund (SPF) Inspection Department requires a comprehensive prototype system with **9 user roles** and **106 unique screens**.

## Current Status

### Existing Implementation (v1)
- **Total HTML files**: 201 files
- **Status**: Partial implementation
- **Coverage**: Approximately 60-70% of required functionality

### Gap Analysis
- **Missing modules**: 5 complete modules
- **Unimplemented business rules**: 6 major rule sets
- **Required supporting systems**: 7 additional systems
- **Total new screens needed**: 94 additional screens

## User Roles and Screen Requirements

### 1. Internal Fund User (3 screens)
- Reports list (قائمة البلاغات)
- Create new report (إنشاء بلاغ جديد)
- Report details (تفاصيل البلاغ)

### 2. External User - Employer (11 screens)
- Dashboard (لوحة البيانات)
- Reports list (قائمة البلاغات)
- Create new report (إنشاء بلاغ جديد)
- Report details (تفاصيل البلاغ)
- Appeals list (قائمة التظلمات)
- Create new appeal (إنشاء طلب تظلم جديد)
- Appeal details (تفاصيل طلب التظلم)
- Inspection visits list (قائمة الزيارات التفتيشية)
- Visit details (تفاصيل الزيارة)
- Reports list (قائمة التقارير)
- Report details (تفاصيل التقرير)

### 3. External User - Insured Person (9 screens)
- Dashboard (لوحة البيانات)
- Reports list (قائمة البلاغات)
- Create new report (إنشاء بلاغ جديد)
- Report details (تفاصيل البلاغ)
- Appeals list (قائمة التظلمات)
- Create new appeal (إنشاء طلب تظلم جديد)
- Appeal details (تفاصيل طلب التظلم)
- Reports list (قائمة التقارير)
- Report details (تفاصيل التقرير)

### 4. Follow-up and Reports Section Employee (10 screens)
- Dashboard (لوحة البيانات)
- Reports list (قائمة البلاغات)
- Create new report (إنشاء بلاغ جديد)
- Report details (تفاصيل البلاغ)
- Appeals list (قائمة التظلمات)
- Appeal details (تفاصيل طلب التظلم)
- Worker data analysis (تحليل بيانات العامل)
- Employer data analysis (تحليل بيانات صاحب العمل)
- Reports list (قائمة التقارير)
- Report details (تفاصيل التقرير)

### 5. Follow-up and Reports Section Head (12 screens)
- Dashboard (لوحة البيانات)
- Reports list (قائمة البلاغات)
- Report details (تفاصيل البلاغ)
- Appeals list (قائمة التظلمات)
- Appeal details (تفاصيل طلب التظلم)
- Worker data analysis (تحليل بيانات العامل)
- Employer data analysis (تحليل بيانات صاحب العمل)
- Reassignment (إعادة التخصيص)
- Follow-up on delayed works (متابعة الأعمال المتأخرة)
- Monitor employee workload (مراقبة عبء العمل على الموظفين)
- Reports list (قائمة التقارير)
- Report details (تفاصيل التقرير)

### 6. Field Inspector (12 screens)
- Dashboard (لوحة البيانات)
- Periodic visits list (قائمة الزيارات الدورية)
- Surprise visits list (قائمة الزيارات المفاجئة)
- Scheduled visits list (قائمة الزيارات المجدولة)
- Periodic visit details (تفاصيل الزيارة الدورية)
- Surprise visit details (تفاصيل الزيارة المفاجئة)
- Scheduled visit details (تفاصيل الزيارة المجدولة)
- Create surprise visit (إنشاء زيارة مفاجئة)
- Worker data analysis (تحليل بيانات العامل)
- Employer data analysis (تحليل بيانات صاحب العمل)
- Reports list (قائمة التقارير)
- Report details (تفاصيل التقرير)

### 7. Field Inspection Section Head (15 screens)
- Dashboard (لوحة البيانات)
- Periodic visits list (قائمة الزيارات الدورية)
- Surprise visits list (قائمة الزيارات المفاجئة)
- Scheduled visits list (قائمة الزيارات المجدولة)
- Periodic visit details (تفاصيل الزيارة الدورية)
- Surprise visit details (تفاصيل الزيارة المفاجئة)
- Scheduled visit details (تفاصيل الزيارة المجدولة)
- Create surprise visit (إنشاء زيارة مفاجئة)
- Worker data analysis (تحليل بيانات العامل)
- Employer data analysis (تحليل بيانات صاحب العمل)
- Redistribute inspectors (إعادة توزيع المفتشين)
- Review minutes (مراجعة المحاضر)
- Follow-up corrective actions (متابعة الإجراءات التصحيحية)
- Reports list (قائمة التقارير)
- Report details (تفاصيل التقرير)

### 8. Inspection Directorate Manager (18 screens)
- Dashboard (لوحة البيانات)
- Reports list (قائمة البلاغات)
- Report details (تفاصيل البلاغ)
- Periodic visits list (قائمة الزيارات الدورية)
- Surprise visits list (قائمة الزيارات المفاجئة)
- Scheduled visits list (قائمة الزيارات المجدولة)
- Periodic visit details (تفاصيل الزيارة الدورية)
- Surprise visit details (تفاصيل الزيارة المفاجئة)
- Scheduled visit details (تفاصيل الزيارة المجدولة)
- Create surprise visit (إنشاء زيارة مفاجئة)
- Worker data analysis (تحليل بيانات العامل)
- Employer data analysis (تحليل بيانات صاحب العمل)
- Periodic inspection plans (خطط التفتيش الدورية)
- Periodic inspection plan details (تفاصيل خطة التفتيش الدورية)
- Ban cases list (قائمة حالات الحظر)
- Ban case details (تفاصيل حالة الحظر)
- Reports list (قائمة التقارير)
- Report details (تفاصيل التقرير)

### 9. Operations Analyst (16 screens)
- Dashboard (لوحة البيانات)
- Reports list (قائمة البلاغات)
- Report details (تفاصيل البلاغ)
- Periodic visits list (قائمة الزيارات الدورية)
- Surprise visits list (قائمة الزيارات المفاجئة)
- Scheduled visits list (قائمة الزيارات المجدولة)
- Periodic visit details (تفاصيل الزيارة الدورية)
- Surprise visit details (تفاصيل الزيارة المفاجئة)
- Scheduled visit details (تفاصيل الزيارة المجدولة)
- Worker data analysis (تحليل بيانات العامل)
- Employer data analysis (تحليل بيانات صاحب العمل)
- Risk analysis (تحليل المخاطر)
- Pattern detection (كشف الأنماط)
- Prepare periodic inspection plan (إعداد خطة التفتيش الدوري)
- Reports list (قائمة التقارير)
- Report details (تفاصيل التقرير)

## Missing Modules (Complete Implementation Required)

### 1. Job Security Requests (طلبات الأمان الوظيفي)
- **Screens**: 4
- **Validation rules**: 17
- **Workflow stages**: 5
- **Integration**: Insured persons system, wage protection, benefits, establishments, Ministry of Labor

### 2. Family Income Benefits Requests (طلبات منافع دخل الأسرة)
- **Screens**: 5
- **Validation rules**: 10
- **Workflow stages**: 5
- **Integration**: Insured persons system, benefits, Civil Status, Social Security

### 3. Maternity Leave Requests (طلبات إجازة الأمومة)
- **Screens**: 4
- **Validation rules**: 7
- **Workflow stages**: 5
- **Integration**: Insured persons system, wage protection, benefits, establishments, Ministry of Health

### 4. Companies Stopped Payment (الشركات المتوقفة عن السداد)
- **Screens**: 5
- **Analysis categories**: 5
- **Workflow stages**: 5
- **Integration**: Establishments system, subscriptions, ban, collection, Ministry of Commerce

### 5. Liquidation and Bankruptcy (التصفية والإفلاس)
- **Screens**: 6
- **Verification categories**: 5
- **Workflow stages**: 5
- **Integration**: Establishments system, insured persons, subscriptions, courts, Ministry of Commerce

## Unimplemented Business Rules

### 1. Correspondence Documentation System (نظام توثيق المخاطبات)
- **Communication types**: 8
- **Screens**: 4
- **Key feature**: Documentation without affecting complaint status

### 2. Alerts and Notifications System (نظام التنبيهات والإشعارات)
- **Notification channels**: 4
- **Notification types**: 7
- **Screens**: 5

## Required Supporting Systems

### 1. Geographic Maps System (نظام الخرائط الجغرافية)
- **Layers**: 6
- **Screens**: 7
- **Features**: Location display, geographic analysis, tracking

### 2. Video Call Recording System (نظام تسجيل المكالمات المرئية)
- **Features**: Automatic recording, content analysis, permission management
- **Screens**: 7
- **Security**: Encryption, permissions, legal compliance

### 3. Attendance Integration System (نظام تكامل الحضور والانصراف)
- **Features**: Data import, verification, analysis, reports
- **Screens**: 7
- **Integration**: Attendance system, HR, visits

### 4. Violations and Penalties System (نظام المخالفات والعقوبات)
- **Violation types**: 6
- **Penalty types**: 6
- **Screens**: 8

### 5. Advanced Search and Analysis Screens (شاشات البحث والتحليل المتقدمة)
- **Features**: Advanced search, filtering, analysis, visualization
- **Screens**: 12

### 6. Administrative and Supervisory Screens (الشاشات الإدارية والرقابية)
- **Features**: User management, roles, permissions, monitoring
- **Screens**: 15

### 7. Reports Center and Report Designer (مركز التقارير ومصمم التقارير)
- **Features**: Report design, scheduling, distribution, export
- **Screens**: 12

## External Integration Requirements

### Required External Entities (14)
1. Ministry of Health
2. Ministry of Commerce and Industry
3. Ministry of Labor
4. Ministry of Interior (Civil Status)
5. Ministry of Justice (Courts)
6. Ministry of Finance
7. General Organization for Social Insurance
8. Zakat and Income Authority
9. Central Bank
10. Public Prosecution
11. Judicial Liquidator
12. Email providers
13. SMS providers
14. WhatsApp Business API

## Technical Requirements

### 1. Security and Privacy
- Data encryption
- Permission verification
- Access logging
- Privacy protection
- Regulatory compliance

### 2. Performance and Reliability
- Fast processing
- Real-time updates
- Secure storage
- Backup
- Load balancing

### 3. User Interface
- Arabic language support
- RTL support
- Responsive design
- Ease of use
- Accessibility

### 4. Integration
- APIs
- Data synchronization
- Error handling
- Integration logging
- Monitoring

## Implementation Roadmap

### Phase 1: High Priority (Missing Modules)
1. Job security requests
2. Family income benefits requests
3. Maternity leave requests
4. Companies stopped payment
5. Liquidation and bankruptcy

### Phase 2: Basic Business Rules
1. Correspondence documentation system
2. Alerts and notifications system

### Phase 3: Basic Supporting Systems
1. Geographic maps system
2. Video call recording system
3. Attendance integration system

### Phase 4: Advanced Supporting Systems
1. Violations and penalties system
2. Advanced search and analysis screens

### Phase 5: Administration and Monitoring
1. Administrative and supervisory screens
2. Reports center and report designer

## Summary Statistics

### Total Requirements
- **User roles**: 9
- **Total screens**: 106
- **Missing modules**: 5
- **Unimplemented business rules**: 2
- **Required supporting systems**: 7
- **Total new components**: 14
- **Total new screens needed**: 94
- **Total validation rules**: 39+
- **External integrations**: 14

### Current Implementation Status
- **Existing HTML files**: 201
- **Estimated completion**: 60-70%
- **Remaining work**: 30-40%

## File Organization

### Helper Files Location
All helper files and documentation should be created in:
```
Inspection/details/
```

### New HTML Files Location
All new HTML files should be created in:
```
Inspection/v2/
```

### Directory Structure
```
Inspection/
├── details/           # Helper files and documentation
├── v1/               # Existing implementation (201 files)
└── v2/               # New implementation (to be created)
```

## Recommendations

### 1. Priorities
- Start with the 5 missing modules
- Focus on basic business rules
- Implement supporting systems gradually

### 2. Quality
- Adhere to all validation rules
- Ensure data quality
- Comprehensive testing
- Complete documentation

### 3. Security
- Implement all security measures
- Protect sensitive data
- Regulatory compliance
- Continuous auditing

### 4. Performance
- Continuous performance optimization
- System monitoring
- Error handling
- Continuous improvement

### 5. Integration
- Integrate with all required systems
- Data synchronization
- Error handling
- Continuous monitoring

## Meeting Addendum

Based on the inspection meeting held on **April 27, 2026**, the following additional BRD items should be captured as current-phase prototype concepts:

- `Switch profile / delegation model` as a sample UX pattern for external users with multiple personas.
- `Staff availability screen` to allow employees to set their current status and allow section heads and the director to monitor current team availability.

Reference:
- [15_متطلبات_إضافية_من_اجتماع_27042026.md](15_متطلبات_إضافية_من_اجتماع_27042026.md)

## Conclusion

The Inspection Department prototype requires a comprehensive system with 106 screens across 9 user roles. While 60-70% of the functionality is already implemented in v1, significant work remains to complete the missing modules, business rules, and supporting systems. The implementation should follow the phased approach outlined in the roadmap to ensure successful delivery of all required functionality.
