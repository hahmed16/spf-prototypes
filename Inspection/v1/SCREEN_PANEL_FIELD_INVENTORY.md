# Inspection v1 - Role/Screen/Panel/Field Inventory (No Tables)

Date: 2026-04-23  
Scope: `Inspection/v1`  
Source: current implementation in `shared/components.js`, `shared/config.js`, and role HTML wrappers.

## Role: fund-staff

### Screen: complaints-list
Panel: Filter panel  
Fields: رقم البلاغ, الرقم المدني للمؤمن عليه, رقم السجل التجاري لصاحب العمل, من تاريخ, إلى تاريخ, حالة البلاغ.

Panel: Complaints table  
Fields: رقم البلاغ, النوع, مقدم البلاغ, المنشأة, الحالة, الأولوية, الموظف المختص, تاريخ تقديم الطلب, إجراء.

### Screen: complaint-new
Panel: بيانات مقدم البلاغ  
Fields: الاسم, رقم الهوية, الهاتف, الصفة.

Panel: بيانات صاحب العمل  
Fields: رقم السجل التجاري, اسم المنشأة, القطاع, رقم تواصل المنشأة, بريد المنشأة الإلكتروني, بيانات العامل.

Panel: تفاصيل البلاغ  
Fields: نوع البلاغ, الأولوية, وصف البلاغ.

Panel: المستندات المطلوبة  
Fields: قائمة المستندات المطلوبة, رفع ملفات.

Panel: إقرار وتأكيد  
Fields: حفظ وإرسال الطلب, حفظ كمسودة, إلغاء.

### Screen: complaint-details
Panel: البيانات الأساسية  
Fields: رقم البلاغ, تاريخ التقديم, الموعد النهائي, نوع البلاغ, قناة الإبلاغ, الأولوية, صاحب العمل, السجل التجاري, بيانات العامل, الموظف المختص, المفتش المكلف, عدد مرات الإعادة, وصف البلاغ.

Panel: بيانات مقدم البلاغ  
Fields: الاسم, رقم الهوية, رقم الهاتف, جهة التواصل بالمنشأة, هاتف المنشأة, ملاحظة (إذا مقدم البلاغ مؤمن عليه).

Panel: ملاحظة استيفاء البيانات  
Fields: نص ملاحظة الاستيفاء.

Panel: البيانات المسجلة مقابل البيانات المطلوبة  
Fields: تاريخ الالتحاق, تاريخ استلام العقد, الأجر الأساسي, البدلات, الأجر الكامل, تاريخ انتهاء الخدمة, نوع التعديل المطلوب, الأجر الفعلي المدعى به, نافذ من تاريخ, ملاحظات مقدم الطلب.

Panel: نتائج التحقق من الأنظمة المتكاملة  
Fields: مصدر التحقق, حالة المصدر, قواعد التحقق, نتيجة كل قاعدة, القيمة.

Panel: إجراءات الأدوار التراكمية  
Fields: الإجراء, التاريخ, المنفذ.

Panel: لوحة الإجراءات  
Fields: ملاحظة إلزامية, سبب الإجراء, إرفاق مستندات, أزرار الإجراء حسب الحالة.

Panel: المستندات المطلوبة  
Fields: اسم المستند, الحالة.

Panel: المرفقات  
Fields: اسم الملف, الحجم, التاريخ, تنزيل.

Panel: الملاحظات التشغيلية  
Fields: كاتب الملاحظة, التاريخ, النص.

Panel: السجل الزمني  
Fields: الإجراء, المرحلة, التاريخ, المنفذ.

## Role: employer

### Screen: dashboard
Panel: KPI cards  
Fields: label, value, subtitle.

Panel: Recent complaints  
Fields: الرقم, النوع, الحالة, الأولوية, تاريخ تقديم الطلب, إجراء.

### Screen: complaints-list
Panel: Filter panel  
Fields: رقم البلاغ, الرقم المدني للمؤمن عليه, رقم السجل التجاري لصاحب العمل, من تاريخ, إلى تاريخ, حالة البلاغ.

Panel: Complaints table  
Fields: رقم البلاغ, النوع, المنشأة, الحالة, الأولوية, تاريخ تقديم الطلب, إجراء.

### Screen: complaint-new
Panel: بيانات مقدم البلاغ  
Fields: الاسم, رقم الهوية, الهاتف, الصفة.

Panel: بيانات صاحب العمل  
Fields: رقم السجل التجاري, اسم المنشأة, القطاع, رقم تواصل المنشأة, بريد المنشأة الإلكتروني, بيانات العامل.

Panel: تفاصيل البلاغ  
Fields: نوع البلاغ, الأولوية, وصف البلاغ.

Panel: المستندات المطلوبة  
Fields: قائمة المستندات المطلوبة, رفع ملفات.

Panel: إقرار وتأكيد  
Fields: حفظ وإرسال الطلب, حفظ كمسودة, إلغاء.

### Screen: complaint-details
Panel: البيانات الأساسية  
Fields: رقم البلاغ, تاريخ التقديم, الموعد النهائي, نوع البلاغ, قناة الإبلاغ, الأولوية, صاحب العمل, السجل التجاري, بيانات العامل, عدد مرات الإعادة, وصف البلاغ.

Panel: بيانات مقدم البلاغ  
Fields: الاسم, رقم الهوية, رقم الهاتف, جهة التواصل بالمنشأة, هاتف المنشأة.

Panel: ملاحظة استيفاء البيانات  
Fields: نص ملاحظة الاستيفاء.

Panel: البيانات المسجلة مقابل البيانات المطلوبة  
Fields: نفس حقول المقارنة المعروضة حسب نوع البلاغ والبيانات المتوفرة.

Panel: نتائج التحقق من الأنظمة المتكاملة  
Fields: مصدر التحقق, الحالة, قواعد التحقق, نتائج القواعد.

Panel: لوحة الإجراءات  
Fields: ملاحظة إلزامية, سبب الإجراء, إرفاق مستندات, أزرار الإجراء المتاحة حسب الحالة.

Panel: المستندات المطلوبة  
Fields: اسم المستند, الحالة.

Panel: المرفقات  
Fields: اسم الملف, الحجم, التاريخ.

Panel: الملاحظات التشغيلية  
Fields: الكاتب, التاريخ, النص.

Panel: السجل الزمني  
Fields: action, step, date, actor.

### Screen: appeals-list
Panel: Filter panel  
Fields: بحث برقم التظلم, الحالة, نوع التظلم, من تاريخ.

Panel: Appeals table  
Fields: رقم التظلم, النوع, البلاغ/الزيارة المرتبطة, المنشأة, الحالة, تاريخ التقديم, إجراء.

### Screen: appeal-new
Panel: معلومات التظلم  
Fields: البلاغ/القرار المتظلم منه, نوع التظلم, أسباب التظلم.

Panel: المستندات الداعمة  
Fields: رفع مرفقات.

### Screen: appeal-details
Panel: تفاصيل التظلم  
Fields: رقم التظلم, تاريخ التقديم, نوع التظلم, البند المرتبط, المنشأة, مقدم التظلم, أسباب التظلم.

Panel: قرار التظلم  
Fields: القرار, تاريخ القرار, صدر بواسطة, سبب القرار.

Panel: المرفقات  
Fields: اسم الملف, الحجم, التاريخ.

Panel: الملاحظات التشغيلية  
Fields: كاتب الملاحظة, التاريخ, النص.

Panel: سجل الأحداث  
Fields: action, date, actor.

### Screen: visits-list
Panel: Filter panel  
Fields: نوع الزيارة, الحالة, من تاريخ.

Panel: Visits table  
Fields: رقم الزيارة, النوع, المفتش, الحالة, التاريخ المجدول, تاريخ التنفيذ, إجراء.

### Screen: reports-list
Panel: Filter panel  
Fields: بحث في التقارير, النوع, الحالة, من تاريخ.

Panel: Reports table  
Fields: رقم التقرير, عنوان التقرير, النوع, الحالة, تاريخ الإصدار, الحجم, إجراء.

### Screen: report-details
Panel: معلومات التقرير  
Fields: رقم التقرير, تاريخ الإصدار, الفترة المشمولة, النوع, أعدّه, الملخص التنفيذي.

Panel: Sections  
Fields: عنوان القسم, محتوى القسم.

## Role: insured

### Screen: dashboard
Panel: KPI cards  
Fields: label, value, subtitle.

Panel: Recent complaints  
Fields: الرقم, النوع, الحالة, الأولوية, تاريخ تقديم الطلب, إجراء.

### Screen: complaints-list
Panel: Filter panel  
Fields: رقم البلاغ, الرقم المدني للمؤمن عليه, رقم السجل التجاري لصاحب العمل, من تاريخ, إلى تاريخ, حالة البلاغ.

Panel: Complaints table  
Fields: رقم البلاغ, النوع, المنشأة, الحالة, الأولوية, تاريخ تقديم الطلب, إجراء.

### Screen: complaint-new
Panel: بيانات مقدم البلاغ  
Fields: الاسم, رقم الهوية, الهاتف, الصفة.

Panel: تحديد جهة العمل  
Fields: الطلب يخص (صاحب العمل الحالي/صاحب عمل آخر), ملاحظة توضيحية.

Panel: بيانات صاحب العمل  
Fields: رقم السجل التجاري, اسم المنشأة, القطاع, رقم تواصل المنشأة, بريد المنشأة الإلكتروني, بيانات العامل.

Panel: تفاصيل البلاغ  
Fields: نوع البلاغ, الأولوية, وصف البلاغ.

Panel: المستندات المطلوبة  
Fields: قائمة المستندات المطلوبة, رفع ملفات.

Panel: إقرار وتأكيد  
Fields: حفظ وإرسال الطلب, حفظ كمسودة, إلغاء.

### Screen: complaint-details
Panel: البيانات الأساسية  
Fields: رقم البلاغ, تاريخ التقديم, الموعد النهائي, نوع البلاغ, قناة الإبلاغ, الأولوية, صاحب العمل, السجل التجاري, بيانات العامل, عدد مرات الإعادة, وصف البلاغ.

Panel: بيانات مقدم البلاغ  
Fields: الاسم, رقم الهوية, رقم الهاتف, جهة التواصل, هاتف المنشأة, ملاحظة تطابق بيانات المقدم مع العامل.

Panel: ملاحظة استيفاء البيانات  
Fields: نص الملاحظة.

Panel: البيانات المسجلة مقابل المطلوبة  
Fields: حقول المقارنة المعروضة حسب البيانات المتوفرة.

Panel: نتائج التحقق  
Fields: المصدر, الحالة, القاعدة, النتيجة, القيمة.

Panel: لوحة الإجراءات  
Fields: ملاحظة, سبب الإجراء, إرفاق مستندات, أزرار الإجراء.

Panel: المستندات المطلوبة  
Fields: اسم المستند, حالته.

Panel: المرفقات  
Fields: اسم الملف, الحجم, التاريخ.

Panel: الملاحظات التشغيلية  
Fields: الكاتب, التاريخ, النص.

Panel: السجل الزمني  
Fields: الإجراء, المرحلة, التاريخ, المنفذ.

### Screen: appeals-list
Panel: Filter panel  
Fields: بحث برقم التظلم, الحالة, نوع التظلم, من تاريخ.

Panel: Appeals table  
Fields: رقم التظلم, النوع, المرجع, المنشأة, الحالة, تاريخ التقديم, إجراء.

### Screen: appeal-new
Panel: معلومات التظلم  
Fields: البلاغ/القرار المتظلم منه, نوع التظلم, أسباب التظلم.

Panel: المستندات الداعمة  
Fields: رفع مرفقات.

### Screen: appeal-details
Panel: تفاصيل التظلم  
Fields: رقم التظلم, تاريخ التقديم, نوع التظلم, البند المرتبط, المنشأة, مقدم التظلم, الأسباب.

Panel: قرار التظلم  
Fields: القرار, التاريخ, المصدر, سبب القرار.

Panel: المرفقات  
Fields: قائمة المرفقات.

Panel: الملاحظات التشغيلية  
Fields: الكاتب, التاريخ, النص.

Panel: سجل الأحداث  
Fields: timeline entries.

### Screen: reports-list
Panel: Filter panel  
Fields: بحث في التقارير, النوع, الحالة, من تاريخ.

Panel: Reports table  
Fields: رقم التقرير, العنوان, النوع, الحالة, تاريخ الإصدار, الحجم, إجراء.

### Screen: report-details
Panel: معلومات التقرير  
Fields: رقم التقرير, تاريخ الإصدار, الفترة, النوع, أعدّه, الملخص.

Panel: أقسام التقرير  
Fields: عنوان القسم, نص القسم.

## Role: monitoring-employee

### Screen: dashboard
Panel: KPI cards  
Fields: label, value, subtitle.

Panel: Insights charts  
Fields: chart title, values.

Panel: Recent complaints  
Fields: الرقم, النوع, الحالة, الأولوية, تاريخ تقديم الطلب, إجراء.

### Screen: complaints-list
Panel: Filter panel  
Fields: رقم البلاغ, الرقم المدني للمؤمن عليه, رقم السجل التجاري لصاحب العمل, من تاريخ, إلى تاريخ, حالة البلاغ.

Panel: Complaints table  
Fields: رقم البلاغ, النوع, مقدم البلاغ, المنشأة, الحالة, الأولوية, الموظف المختص, تاريخ تقديم الطلب, إجراء.

### Screen: complaint-details
Panel: جميع Panels شاشة `complaint-details` المذكورة بالأعلى.  
Fields: نفس حقول شاشة التفاصيل الكاملة، مع ظهور لوحة الإجراءات الداخلية الكاملة.

### Screen: appeals-list
Panel: Filter panel  
Fields: بحث برقم التظلم, الحالة, نوع التظلم, من تاريخ.

Panel: Appeals table  
Fields: رقم التظلم, النوع, المرجع, المنشأة, الحالة, تاريخ التقديم, إجراء.

### Screen: appeal-details
Panel: تفاصيل التظلم  
Fields: رقم التظلم, التاريخ, النوع, البند المرتبط, المنشأة, مقدم التظلم, الأسباب.

Panel: إجراء على التظلم  
Fields: مبرر القرار, أزرار قبول التظلم, رفض التظلم, توجيه للرئيس المباشر.

Panel: قرار التظلم  
Fields: القرار, التاريخ, المصدر, السبب (إذا متاح).

Panel: المرفقات  
Fields: قائمة المرفقات.

Panel: الملاحظات التشغيلية  
Fields: الكاتب, التاريخ, النص.

Panel: سجل الأحداث  
Fields: timeline.

### Screen: worker-analysis
Panel: Worker selector  
Fields: worker buttons + export.

Panel: الملف الشخصي  
Fields: الجنسية, الجنس, تاريخ الميلاد, الهاتف, البريد, القسم, نوع العقد, الراتب, مؤمن منذ, حماية الأجور, التأمين الصحي.

Panel: تقييم المخاطر  
Fields: درجة الخطر, المؤشرات.

Panel: سجل الاشتراكات  
Fields: الشهر, المبلغ, الحالة, تاريخ السداد.

Panel: سجل التوظيف والتأمين  
Fields: employer, position, from, to, reason, status.

Panel: البلاغات المرتبطة  
Fields: رقم البلاغ, النوع, المنشأة, الحالة, الأولوية, تاريخ التقديم, إجراء.

Panel: الزيارات المرتبطة  
Fields: رقم الزيارة, النوع, التاريخ, الحالة, المخالفات, إجراء.

Panel: التظلمات المرتبطة  
Fields: رقم التظلم, النوع, الحالة, تاريخ التقديم, إجراء.

Panel: بيانات الربط الخارجي  
Fields: source, value, status.

Panel: charts  
Fields: اشتراكات, مؤشرات خطر.

### Screen: employer-analysis
Panel: Employer selector  
Fields: employer buttons + export.

Panel: ملف المنشأة  
Fields: اسم المنشأة, السجل التجاري, القطاع, الموقع, تاريخ التسجيل, عدد العمال, حالة المنشأة, آخر زيارة, حالة الاشتراكات.

Panel: مستوى الامتثال والمخاطر  
Fields: compliance, risk, arrears.

Panel: العمال المسجلون  
Fields: الاسم, رقم الهوية, المسمى, الراتب, حماية الأجور, التأمين الصحي, مؤشرات الخطر, إجراء.

Panel: سجل المخالفات  
Fields: التاريخ, النوع, الشدة, الزيارة, الحالة.

Panel: سجل الاشتراكات  
Fields: الشهر, الحالة, المبلغ, تاريخ السداد, عدد العمال.

Panel: البلاغات المرتبطة  
Fields: رقم البلاغ, النوع, العامل, الحالة, الأولوية, القناة, تاريخ التقديم, إجراء.

Panel: الزيارات  
Fields: رقم الزيارة, النوع, التاريخ, الحالة, المخالفات, إجراء.

Panel: التظلمات  
Fields: رقم التظلم, النوع, الحالة, التاريخ, إجراء.

Panel: حالات الحظر  
Fields: رقم الحظر, الحالة, التواريخ, إجراء.

Panel: بيانات الربط الخارجي  
Fields: source, value, status.

Panel: charts  
Fields: اشتراكات, توزيع مخالفات, مقارنة امتثال.

### Screen: reports-list
Panel: Filter panel  
Fields: بحث, النوع, الحالة, من تاريخ.

Panel: Reports table  
Fields: رقم, عنوان, نوع, حالة, تاريخ, حجم, إجراء.

### Screen: report-details
Panel: معلومات التقرير  
Fields: رقم التقرير, تاريخ الإصدار, الفترة, النوع, أعدّه, الملخص التنفيذي.

Panel: أقسام التقرير  
Fields: عنوان القسم, نص القسم.

### Screen: ban-case-details
Panel: تفاصيل الحظر  
Fields: رقم الحظر, المنشأة, تاريخ الإصدار, أصدره, سبب الحظر, تاريخ الرفع, رُفع بواسطة.

Panel: سجل الأحداث  
Fields: timeline.

## Role: monitoring-head

### Screen: dashboard
Panel: KPI cards  
Fields: label, value, subtitle.

Panel: Insights charts  
Fields: chart sections and values.

Panel: Recent complaints  
Fields: الرقم, النوع, الحالة, الأولوية, تاريخ تقديم الطلب, إجراء.

### Screen: complaints-list
Panel: Filter panel  
Fields: رقم البلاغ, الرقم المدني للمؤمن عليه, رقم السجل التجاري لصاحب العمل, من تاريخ, إلى تاريخ, حالة البلاغ.

Panel: Complaints table  
Fields: رقم البلاغ, النوع, مقدم البلاغ, المنشأة, الحالة, الأولوية, الموظف المختص, تاريخ تقديم الطلب, إجراء.

### Screen: complaint-details
Panel: نفس Panels شاشة `complaint-details` مع لوحة الإجراءات الخاصة بالرئيس.  
Fields: كل حقول شاشة التفاصيل + سبب الإجراء + إجراءات الاعتماد/الإغلاق/الإرجاع.

### Screen: appeals-list
Panel: Filter panel  
Fields: بحث برقم التظلم, الحالة, النوع, من تاريخ.

Panel: Appeals table  
Fields: رقم التظلم, النوع, المرجع, المنشأة, الحالة, التاريخ, إجراء.

### Screen: appeal-details
Panel: تفاصيل التظلم  
Fields: الحقول الأساسية للتظلم.

Panel: اعتماد قرار التظلم  
Fields: القرار النهائي, أزرار قبول/رفض.

Panel: قرار التظلم  
Fields: outcome, decision date, by, reason.

Panel: المرفقات  
Fields: الملفات.

Panel: الملاحظات التشغيلية  
Fields: notes.

Panel: سجل الأحداث  
Fields: timeline.

### Screen: worker-analysis
Panel: نفس Panels شاشة `worker-analysis`.

### Screen: employer-analysis
Panel: نفس Panels شاشة `employer-analysis`.

### Screen: reassignment
Panel: البلاغات المخصصة حالياً  
Fields: رقم البلاغ, النوع, الحالة, المختص الحالي, عبء العمل, إعادة التخصيص.

### Screen: overdue-tracking
Panel: Alert summary  
Fields: عدد البلاغات المتأخرة.

Panel: Overdue table  
Fields: رقم البلاغ, النوع, الموعد النهائي, التأخير (أيام), الموظف المختص, إجراء.

### Screen: workload-monitoring
Panel: KPI cards  
Fields: إجمالي البلاغات المفتوحة, متوسط وقت المعالجة, نسبة الإنجاز, موظفون فوق الطاقة.

Panel: توزيع عبء العمل  
Fields: اسم الموظف, نسبة الإشغال, نشط, معلق, مكتمل.

### Screen: reports-list
Panel: Filter panel + table.

### Screen: report-details
Panel: معلومات التقرير + أقسام التقرير.

### Screen: ban-case-details
Panel: تفاصيل الحظر + سجل الأحداث.

## Role: field-inspector

### Screen: dashboard
Panel: KPI cards, charts, recent visits.

### Screen: visits-periodic-list
Panel: Filter panel  
Fields: بحث برقم الزيارة أو المنشأة, الحالة, المفتش, من تاريخ.

Panel: Visits table  
Fields: رقم الزيارة, المنشأة, المفتش, الحالة, التاريخ المجدول, تاريخ التنفيذ, إجراء.

### Screen: visits-surprise-list
Panel: نفس Panels شاشة list أعلاه.

### Screen: visits-scheduled-list
Panel: نفس Panels شاشة list أعلاه.

### Screen: visit-periodic-details
Panel: معلومات الزيارة, قائمة التحقق, نتائج الزيارة, لوحة تنفيذ/رفع المحضر (حسب الحالة), المحضر المعتمد (إن وجد), سجل الأحداث.

### Screen: visit-surprise-details
Panel: نفس Panels شاشة details أعلاه.

### Screen: visit-scheduled-details
Panel: نفس Panels شاشة details أعلاه.

### Screen: worker-analysis
Panel: نفس Panels شاشة `worker-analysis`.

### Screen: employer-analysis
Panel: نفس Panels شاشة `employer-analysis`.

### Screen: reports-list
Panel: Filter panel + table.

### Screen: report-details
Panel: معلومات التقرير + الأقسام.

### Screen: appeal-details
Panel: تفاصيل التظلم, قرار التظلم, مرفقات, ملاحظات, سجل أحداث.

### Screen: ban-case-details
Panel: تفاصيل الحظر + سجل الأحداث.

## Role: field-head

### Screen: dashboard
Panel: KPI cards, charts, recent visits.

### Screen: visits-periodic-list
Panel: Filter panel + visits table.

### Screen: visits-surprise-list
Panel: Filter panel + visits table.

### Screen: visits-scheduled-list
Panel: Filter panel + visits table.

### Screen: visit-periodic-details
Panel: معلومات الزيارة, قائمة التحقق, نتائج الزيارة, لوحة مراجعة واعتماد المحضر, سجل الأحداث.

### Screen: visit-surprise-details
Panel: نفس Panels شاشة details أعلاه.

### Screen: visit-scheduled-details
Panel: نفس Panels شاشة details أعلاه.

### Screen: visit-new
Panel: تفاصيل الجدولة  
Fields: نوع الزيارة, المنشأة المستهدفة, المفتش المكلف, تاريخ الزيارة, الأولوية, البلاغ/التظلم المرتبط, غرض الزيارة وملاحظات.

### Screen: records-review
Panel: Alert summary  
Fields: عدد المحاضر بانتظار الاعتماد.

Panel: Pending records table  
Fields: رقم الزيارة, المنشأة, نوع الزيارة, تاريخ الرفع, إجراء.

### Screen: corrective-actions
Panel: Corrective actions table  
Fields: رقم الزيارة, المنشأة, الإجراء التصحيحي, الموعد النهائي, الحالة, إجراء.

### Screen: inspector-redistribution
Panel: KPI cards  
Fields: مفتشون نشطون, زيارات مجدولة, متوسط زيارات/مفتش.

Panel: توزيع المفتشين  
Fields: المفتش, الزيارات المكلف بها, قيد التنفيذ, مجدولة, نسبة الإشغال, إجراء.

### Screen: worker-analysis
Panel: نفس Panels شاشة `worker-analysis`.

### Screen: employer-analysis
Panel: نفس Panels شاشة `employer-analysis`.

### Screen: reports-list
Panel: Filter panel + table.

### Screen: report-details
Panel: معلومات التقرير + الأقسام.

### Screen: appeal-details
Panel: تفاصيل التظلم + قرار + مرفقات + ملاحظات + سجل.

### Screen: ban-case-details
Panel: تفاصيل الحظر + سجل.

## Role: inspection-director

### Screen: dashboard
Panel: KPI cards, charts, recent complaints.

### Screen: complaints-list
Panel: Filter panel + complaints table.

### Screen: complaint-details
Panel: نفس Panels شاشة `complaint-details` مع إجراءات المدير.

### Screen: visits-periodic-list
Panel: Filter panel + visits table.

### Screen: visits-surprise-list
Panel: Filter panel + visits table.

### Screen: visits-scheduled-list
Panel: Filter panel + visits table.

### Screen: visit-periodic-details
Panel: معلومات الزيارة, قائمة التحقق, النتائج, سجل الأحداث, المحضر المعتمد إن وجد.

### Screen: visit-surprise-details
Panel: نفس Panels شاشة details أعلاه.

### Screen: visit-scheduled-details
Panel: نفس Panels شاشة details أعلاه.

### Screen: visit-new
Panel: تفاصيل الجدولة (نفس حقول `visit-new`).

### Screen: inspection-plans-list
Panel: Plans table  
Fields: رقم الخطة, اسم الخطة, الفترة, الحالة, عدد المنشآت, نسبة الإنجاز, إجراء.

### Screen: inspection-plan-details
Panel: تفاصيل الخطة  
Fields: رقم الخطة, اسم الخطة, الفترة, إجمالي المنشآت, الزيارات المنجزة, المعتمد بواسطة, تاريخ الاعتماد.

Panel: التقدم  
Fields: نسبة التقدم.

### Screen: ban-cases-list
Panel: Ban cases table  
Fields: رقم الحظر, المنشأة, سبب الحظر, الحالة, تاريخ الإصدار, تاريخ الرفع, إجراء.

### Screen: ban-case-details
Panel: تفاصيل الحظر  
Fields: رقم الحظر, المنشأة, تاريخ الإصدار, أصدره, سبب الحظر, تاريخ الرفع, رُفع بواسطة.

Panel: رفع الحظر أو تعديله  
Fields: سبب رفع الحظر أو تعديله.

Panel: سجل الأحداث  
Fields: timeline.

### Screen: worker-analysis
Panel: نفس Panels شاشة `worker-analysis`.

### Screen: employer-analysis
Panel: نفس Panels شاشة `employer-analysis`.

### Screen: reports-list
Panel: Filter panel + table.

### Screen: report-details
Panel: معلومات التقرير + sections.

### Screen: appeal-details
Panel: تفاصيل التظلم + القرار + المرفقات + السجل.

## Role: ops-analyst

### Screen: dashboard
Panel: KPI cards, insights charts, employer snapshot/recent complaints.

### Screen: complaints-list
Panel: Filter panel + complaints table.

### Screen: complaint-details
Panel: نفس Panels شاشة `complaint-details`.

### Screen: visits-periodic-list
Panel: Filter panel + visits table.

### Screen: visits-surprise-list
Panel: Filter panel + visits table.

### Screen: visits-scheduled-list
Panel: Filter panel + visits table.

### Screen: visit-periodic-details
Panel: معلومات الزيارة + checklist + النتائج + السجل.

### Screen: visit-surprise-details
Panel: نفس Panels شاشة details أعلاه.

### Screen: visit-scheduled-details
Panel: نفس Panels شاشة details أعلاه.

### Screen: risk-analysis
Panel: KPI cards  
Fields: منشآت عالية الخطر, إجمالي المخالفات, بلاغات مفتوحة, عمال في بيئة خطرة.

Panel: Risk charts  
Fields: درجة المخاطر المحسوبة, توزيع أنواع المخالفات, درجات الامتثال.

Panel: مصفوفة المخاطر التفصيلية  
Fields: المنشأة, درجة الخطر, الامتثال, بلاغات مفتوحة, مخالفات معلقة, متأخرات, حظر نشط, عمال في خطر, التوصية, إجراء.

Panel: العمال عالو المخاطر  
Fields: العامل, رقم الهوية, جهة العمل, حماية الأجور, التأمين الصحي, مؤشرات الخطر, إجراء.

### Screen: pattern-detection
Panel: Alert summary  
Fields: عدد الأنماط, عدد الأنماط عالية الخطورة.

Panel: KPI cards  
Fields: أنماط عالية/متوسطة الخطر, منشآت تحت المراقبة, عمال في دائرة المخاطر.

Panel: Pattern cards  
Fields: id, العنوان, مستوى الخطر, الوصف, التكرار, الفترة الزمنية, التوصية, المنشآت/العمال المعنيون, البلاغات المرتبطة, الزيارات المرتبطة.

### Screen: inspection-plan-draft
Panel: معلومات الخطة المقترحة  
Fields: الفترة الزمنية, معيار اختيار المنشآت, عدد المنشآت المقترح, عدد المفتشين المتاحين.

Panel: المنشآت ذات الأولوية  
Fields: المنشأة, آخر زيارة, مستوى الخطر, الامتثال, أولوية الإدراج.

### Screen: worker-analysis
Panel: نفس Panels شاشة `worker-analysis`.

### Screen: employer-analysis
Panel: نفس Panels شاشة `employer-analysis`.

### Screen: reports-list
Panel: Filter panel + reports table.

### Screen: report-details
Panel: معلومات التقرير + أقسام التقرير.

### Screen: appeal-details
Panel: تفاصيل التظلم + القرار + المرفقات + السجل.

### Screen: ban-case-details
Panel: تفاصيل الحظر + سجل الأحداث.

