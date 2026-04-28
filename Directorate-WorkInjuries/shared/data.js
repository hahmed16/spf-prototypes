/* ================================================================
   data.js — بيانات العينة الواقعية
   ================================================================ */

const WI_DATA = {

  /* ── المستخدمون ── */
  users: {
    worker: {
      name: 'سالم بن ناصر الحارثي', civil: '9012345678', phone: '96898765432', email: 'salem.h@gmail.com',
      employerHistory: [
        { name: 'مجموعة النور للإنشاءات ش.م.م', cr: '1234567', joinDate: '2019-03-01', endDate: null, current: true },
        { name: 'شركة الخليج للمقاولات', cr: '7654321', joinDate: '2015-06-01', endDate: '2019-02-28', current: false },
        { name: 'مؤسسة البناء الحديث', cr: '9876543', joinDate: '2012-01-01', endDate: '2015-05-31', current: false },
      ]
    },
    employer_delegate: {
      name: 'خالد بن سعيد البلوشي', civil: '9087654321', phone: '96891234567', email: 'khalid.b@company.com',
      company: 'مجموعة النور للإنشاءات', cr: '1234567',
      sector: 'الإنشاءات والمقاولات',
      employerType: 'خاص',
      branches: [
        { id: 'BR-001', name: 'الفرع الرئيسي', state: 'مسقط', governorate: 'بوشر' },
        { id: 'BR-002', name: 'فرع صحار', state: 'شمال الباطنة', governorate: 'صحار' },
        { id: 'BR-003', name: 'فرع صلالة', state: 'ظفار', governorate: 'صلالة' },
      ]
    },
    injury_investigator: { name: 'عائشة بنت محمد الرواحي', civil: '9055551111', phone: '96895551111', employeeId: 'SPF-0342' },
    injury_head: { name: 'يوسف بن علي الشيباني', civil: '9055552222', phone: '96895552222', employeeId: 'SPF-0210' },
    od_investigator: { name: 'فاطمة بنت حمد الحجرية', civil: '9055553333', phone: '96895553333', employeeId: 'SPF-0387' },
    od_head: { name: 'أحمد بن سليم المعمري', civil: '9055554444', phone: '96895554444', employeeId: 'SPF-0198' },
    sickleave_employee: { name: 'مريم بنت سيف الكيومية', civil: '9055555555', phone: '96895555555', employeeId: 'SPF-0421' },
    sickleave_head: { name: 'حمد بن عيسى الغافري', civil: '9055556666', phone: '96895556666', employeeId: 'SPF-0156' },
    disability_employee: { name: 'نورة بنت سالم الزدجالية', civil: '9055557777', phone: '96895557777', employeeId: 'SPF-0456' },
    disability_head: { name: 'بدر بن خميس العبري', civil: '9055558888', phone: '96895558888', employeeId: 'SPF-0134' },
    committees_employee: { name: 'سعاد بنت أحمد الريامية', civil: '9055559999', phone: '96895559999', employeeId: 'SPF-0512' },
    committees_head: { name: 'محمد بن راشد الهنائي', civil: '9055550000', phone: '96895550000', employeeId: 'SPF-0089' },
    licensing_employee: { name: 'هدى بنت ناصر الوهيبية', civil: '9066661111', phone: '96896661111', employeeId: 'SPF-0534' },
    licensing_head: { name: 'طالب بن سعيد الحنبلي', civil: '9066662222', phone: '96896662222', employeeId: 'SPF-0067' },
    licensed_institution: { name: 'مستشفى النور التخصصي', civil: '7000000001', phone: '96824567890', email: 'info@alnoor-hospital.om', licenseNo: 'LIC-ORG-2020-014' },
    supervisory_committee: { name: 'د. سيف بن حمد المسكري', civil: '9066665555', phone: '96896665555', committeeId: 'SUP-COM-01' },
    appeals_committee: { name: 'د. خالد بن سالم الهاشمي', civil: '9066666666', phone: '96896666666', committeeId: 'APP-COM-01' },
    hospital_delegate: { name: 'منى بنت عبدالله الرحبية', civil: '9066663333', phone: '96896663333', email: 'mona@hospital.om' },
    institution_rapporteur: { name: 'أنس بن خلفان الجابري', civil: '9066664444', phone: '96896664444', employeeId: 'SPF-0589' },
    appeals_rapporteur: { name: 'ليلى بنت حمود الفارسية', civil: '9066667777', phone: '96896667777', employeeId: 'SPF-0611' },
    supervisory_rapporteur: { name: 'مازن بن سعيد اللواتي', civil: '9066668888', phone: '96896668888', employeeId: 'SPF-0624' },
  },

  /* ── طلبات بدلات الانقطاع عن العمل ── */
  allowances: [
    {
      id: 'WI-2025-001234',
      type: 'إصابة عمل',
      subtype: 'حادث طريق',
      isRelapse: 'لا',
      status: 'قيد التحقيق — إصابات العمل',
      submitDate: '2025-01-10',
      lastUpdate: '2025-01-12 09:45',
      applicant: { name: 'سالم بن ناصر الحارثي', civil: '9012345678', role: 'العامل / المؤمن عليه / المواطن', phone: '96898765432', email: 'salem.h@gmail.com' },
      insured: { name: 'سالم بن ناصر الحارثي', civil: '9012345678', insurance: 'IN-20190045678', dob: '1985-06-15', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2019-03-01', subType: 'إلزامي' },
      employer: { name: 'مجموعة النور للإنشاءات ش.م.م', cr: '1234567', establishment: 'EST-0087654', jobTitle: 'مهندس مدني', joinDate: '2019-03-01', location: 'مسقط — الخوض', sector: 'الإنشاءات والمقاولات', employerType: 'خاص', branch: { id: 'BR-001', name: 'الفرع الرئيسي', state: 'مسقط', governorate: 'بوشر' } },
      injury: { caseType: 'حادث طريق', description: 'تعرّض العامل لحادث مروري أثناء توجهه من محل إقامته إلى موقع العمل الصباح الباكر على طريق السيب — الخوض، إذ اصطدمت سيارته بمركبة أخرى أدت إلى إصابته في الكتف الأيسر وكسر في الضلوع.', location: 'طريق السيب — الخوض، أمام بوابة المنطقة الصناعية', bodyPart: 'الكتف الأيسر والضلوع', witnesses: 'نعم', witnessNames: 'محمد بن سالم الريامي — زميل عمل', incidentDate: '2025-01-09', insuredStatus: 'تحت العلاج', accidentDirection: 'السكن الدائم إلى مقر العمل' },
      attachments: [
        { id: 'att1', type: 'تقرير طبي أولي', name: 'تقرير_مستشفى_خولة.pdf', uploadDate: '2025-01-10', uploadedBy: 'سالم الحارثي', role: 'العامل', size: '1.2 MB', icon: 'pdf' },
        { id: 'att2', type: 'تقرير الشرطة', name: 'تقرير_شرطة_السيب.pdf', uploadDate: '2025-01-10', uploadedBy: 'سالم الحارثي', role: 'العامل', size: '0.8 MB', icon: 'pdf' },
        { id: 'att3', type: 'كشف حضور وانصراف', name: 'كشف_الحضور_يناير.pdf', uploadDate: '2025-01-10', uploadedBy: 'سالم الحارثي', role: 'العامل', size: '0.5 MB', icon: 'pdf' },
      ],
      notes: [
        { id: 'n1', author: 'سالم الحارثي', role: 'العامل', text: 'تم إرفاق جميع المستندات المطلوبة. أرجو سرعة المعالجة نظراً للوضع الصحي.', time: '2025-01-10 10:30' }
      ],
      investigation: null,
      fieldVisits: [],
      sickLeavePeriods: [],
      referral: null,
      session: null,
      committeeDecision: null,
      disbursement: null,
      timeline: [
        { action: 'تم تقديم الطلب', actor: 'سالم بن ناصر الحارثي', role: 'العامل', time: '2025-01-10 10:15', fromStatus: '', toStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', note: '', type: 'default' },
        { action: 'تم توجيه الطلب لقسم التحقيق في إصابات العمل', actor: 'النظام', role: 'آلي', time: '2025-01-10 10:16', fromStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', toStatus: 'قيد التحقيق — إصابات العمل', note: 'تم توجيهه تلقائياً بناءً على نوع الطلب', type: 'default' },
        { action: 'تم حجز الطلب', actor: 'عائشة بنت محمد الرواحي', role: 'موظف قسم التحقيق في إصابات العمل', time: '2025-01-12 09:45', fromStatus: 'قيد التحقيق — إصابات العمل', toStatus: 'قيد التحقيق — إصابات العمل', note: '', type: 'default' },
      ],
      assignedTo: 'عائشة بنت محمد الرواحي',
      checkedOutBy: 'عائشة بنت محمد الرواحي',
    },
    {
      id: 'WI-2025-001198',
      type: 'إصابة عمل',
      subtype: 'إصابة في موقع العمل',
      isRelapse: 'لا',
      status: 'بانتظار اعتماد رئيس قسم التحقيق في إصابات العمل',
      submitDate: '2025-01-05',
      lastUpdate: '2025-01-14 14:20',
      applicant: { name: 'حمد بن سلطان العزري', civil: '9023456789', role: 'العامل / المؤمن عليه / المواطن', phone: '96899876543', email: 'hamad.a@mail.com' },
      insured: { name: 'حمد بن سلطان العزري', civil: '9023456789', insurance: 'IN-20170056789', dob: '1982-11-20', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2017-07-01', subType: 'إلزامي' },
      employer: { name: 'شركة عُمان للحديد والصلب', cr: '2345678', establishment: 'EST-0054321', jobTitle: 'فني تشغيل آلات', joinDate: '2017-07-01', location: 'صحار — المنطقة الصناعية', sector: 'الإنشاءات والمقاولات', employerType: 'خاص', branch: { id: 'BR-001', name: 'الفرع الرئيسي', state: 'مسقط', governorate: 'بوشر' } },
      injury: { caseType: 'إصابة في موقع العمل', description: 'أثناء تشغيل ماكينة القطع الثقيلة، انزلقت قطعة معدنية وأصابت يد العامل اليمنى مما أدى إلى كسر في أصابع السبابة والوسطى.', location: 'قاعة الإنتاج الرئيسية — خط إنتاج 3', bodyPart: 'اليد اليمنى', witnesses: 'نعم', witnessNames: 'سعيد بن خميس المحرزي — مشرف الإنتاج', incidentDate: '2025-01-04', insuredStatus: 'تحت العلاج' },
      attachments: [
        { id: 'att4', type: 'تقرير طبي أولي', name: 'تقرير_مشفى_صحار.pdf', uploadDate: '2025-01-05', uploadedBy: 'حمد العزري', role: 'العامل', size: '0.9 MB', icon: 'pdf' },
        { id: 'att5', type: 'تقرير السلامة والصحة المهنية', name: 'تقرير_حادثة_صحار.pdf', uploadDate: '2025-01-06', uploadedBy: 'خالد البلوشي', role: 'الشخص المفوض من جهة العمل', size: '1.5 MB', icon: 'pdf' },
      ],
      notes: [
        { id: 'n1198-1', author: 'عائشة بنت محمد الرواحي', role: 'موظف قسم التحقيق في إصابات العمل', text: 'تم استكمال معاينة الموقع وإرفاق الصور المطلوبة. الحالة واضحة ومطابقة لشروط إصابة العمل.', time: '2025-01-14 14:00' }
      ],
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
      timeline: [
        { action: 'تم تقديم الطلب', actor: 'حمد بن سلطان العزري', role: 'العامل', time: '2025-01-05 08:30', fromStatus: '', toStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', note: '', type: 'default' },
        { action: 'توجيه لقسم التحقيق في إصابات العمل', actor: 'النظام', role: 'آلي', time: '2025-01-05 08:31', fromStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', toStatus: 'قيد التحقيق — إصابات العمل', note: '', type: 'default' },
        { action: 'إضافة زيارة ميدانية', actor: 'عائشة بنت محمد الرواحي', role: 'موظف قسم التحقيق في إصابات العمل', time: '2025-01-08 11:30', fromStatus: 'قيد التحقيق — إصابات العمل', toStatus: 'قيد التحقيق — إصابات العمل', note: 'تمت الزيارة الميدانية لمعاينة الموقع', type: 'default' },
        { action: 'رفع تقرير التحقيق لرئيس القسم', actor: 'عائشة بنت محمد الرواحي', role: 'موظف قسم التحقيق في إصابات العمل', time: '2025-01-14 14:20', fromStatus: 'قيد التحقيق — إصابات العمل', toStatus: 'بانتظار اعتماد رئيس قسم التحقيق في إصابات العمل', note: 'التوصية: موافقة على إصابة العمل', type: 'success' },
      ],
      assignedTo: 'عائشة بنت محمد الرواحي',
      checkedOutBy: 'عائشة بنت محمد الرواحي',
    },
    {
      id: 'WI-2025-001156',
      type: 'مرض مهني',
      subtype: 'الربو المهني',
      isRelapse: 'لا',
      status: 'قيد المراجعة من موظف قسم الإجازات المرضية',
      submitDate: '2024-12-20',
      lastUpdate: '2025-01-10 11:05',
      applicant: { name: 'أمينة بنت علي الخروصية', civil: '9034567890', role: 'العامل / المؤمن عليه / المواطن', phone: '96897654321', email: 'ameena.k@mail.com' },
      insured: { name: 'أمينة بنت علي الخروصية', civil: '9034567890', insurance: 'IN-20160067890', dob: '1980-03-08', gender: 'أنثى', nationality: 'عُمانية', insuranceStatus: 'نشط', regDate: '2016-09-01', subType: 'إلزامي' },
      employer: { name: 'مصنع الخليج للنسيج', cr: '3456789', establishment: 'EST-0023456', jobTitle: 'مشرفة خطوط الإنتاج', joinDate: '2016-09-01', location: 'الرسيل — المنطقة الصناعية', sector: 'الإنشاءات والمقاولات', employerType: 'خاص', branch: { id: 'BR-001', name: 'الفرع الرئيسي', state: 'مسقط', governorate: 'بوشر' } },
      injury: { caseType: 'الربو المهني', caseDescription: 'قدّمت العاملة بلاغاً بظهور أعراض الربو المزمن بعد أكثر من 9 سنوات من التعرض اليومي للغبار القطني والمواد الكيميائية في المصنع. التشخيص مؤكَّد من طبيب متخصص في الأمراض المهنية ومدعوم بتقارير قياسات البيئة المهنية.', description: 'بعد سنوات من التعرض للغبار والمواد الكيميائية في بيئة العمل، ظهرت أعراض الربو الحادة. التشخيص صادر من طبيب متخصص في الأمراض المهنية.', chemicalAgents: 'الغبار القطني، مواد كيميائية للتبييض، بخار الأصباغ', exposureDuration: '9 سنوات متواصلة', firstSuspicion: '2024-10-15', workEnvironment: 'مبنى مغلق مع تهوية غير كافية، معدلات الغبار تتجاوز الحدود المسموح بها وفق قياسات الجهات المختصة', insuredStatus: 'تحت العلاج' },
      attachments: [
        { id: 'att6', type: 'تقرير طبي متخصص', name: 'تقرير_الربو_المهني.pdf', uploadDate: '2024-12-20', uploadedBy: 'أمينة الخروصية', role: 'العامل', size: '2.1 MB', icon: 'pdf' },
        { id: 'att7', type: 'قياسات البيئة المهنية', name: 'قياسات_غبار_المصنع.pdf', uploadDate: '2024-12-22', uploadedBy: 'فاطمة بنت حمد الحجرية', role: 'موظف قسم التحقيق في الأمراض المهنية', size: '3.4 MB', icon: 'pdf' },
      ],
      notes: [],
      investigation: {
        summary: 'تم التحقق من سجلات الرقابة الصحية للعمال، وسجلات قياسات البيئة، وتقارير الفحوصات الدورية. كما تم التواصل مع المشرف الطبي للمصنع.',
        findings: 'توجد دلالة واضحة على ارتباط مرض الربو بالتعرض المهني لمدة 9 سنوات. المرض مدرج في قائمة الأمراض المهنية المعتمدة. شروط المادة (7) من اللائحة مستوفاة.',
        employeeRecommendation: 'موافقة',
        employeeNotes: 'يُوصى بالموافقة وإحالة الطلب لقسم الإجازات المرضية.',
        headNotes: 'اطلعت على التقرير وهو موثّق ومكتمل. الموافقة على إحالة الطلب.',
        headDecision: 'اعتماد وتوجيه إلى قسم الإجازات المرضية',
      },
      fieldVisits: [],
      sickLeavePeriods: [],
      referral: null,
      session: null,
      committeeDecision: null,
      disbursement: null,
      timeline: [
        { action: 'تم تقديم الطلب', actor: 'أمينة بنت علي الخروصية', role: 'العامل', time: '2024-12-20 14:00', fromStatus: '', toStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', note: '', type: 'default' },
        { action: 'توجيه لقسم التحقيق في الأمراض المهنية', actor: 'النظام', role: 'آلي', time: '2024-12-20 14:01', fromStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', toStatus: 'قيد التحقيق — الأمراض المهنية', note: '', type: 'default' },
        { action: 'رفع تقرير التحقيق لرئيس القسم', actor: 'فاطمة بنت حمد الحجرية', role: 'موظف قسم التحقيق في الأمراض المهنية', time: '2024-12-30 16:45', fromStatus: 'قيد التحقيق — الأمراض المهنية', toStatus: 'بانتظار اعتماد رئيس قسم التحقيق في الأمراض المهنية', note: 'التوصية: موافقة', type: 'success' },
        { action: 'اعتماد وتوجيه لقسم الإجازات المرضية', actor: 'أحمد بن سليم المعمري', role: 'رئيس قسم التحقيق في الأمراض المهنية', time: '2025-01-05 09:00', fromStatus: 'بانتظار اعتماد رئيس قسم التحقيق في الأمراض المهنية', toStatus: 'قيد المراجعة من موظف قسم الإجازات المرضية', note: 'اعتمدت التقرير وأحلته لقسم الإجازات المرضية', type: 'success' },
      ],
      //   assignedTo: 'مريم بنت سيف الكيومية',
      //   checkedOutBy: 'مريم بنت سيف الكيومية',
      // },
      assignedTo: 'فاطمة بنت حمد الحجرية',
      checkedOutBy: 'فاطمة بنت حمد الحجرية',
    },
    {
      id: 'WI-2025-001568',
      type: 'مرض مهني',
      subtype: 'التهاب المفاصل الروماتويدي (المهني)',
      status: 'قيد التحقيق — الأمراض المهنية',
      submitDate: '2025-01-18',
      lastUpdate: '2025-01-20 10:00',
      applicant: { name: 'عائشة بنت سالم الكيومية', civil: '9087654322', role: 'المؤمن عليه', phone: '96898765433', email: 'aisha.k@mail.com' },
      insured: { name: 'عائشة بنت سالم الكيومية', civil: '9087654322', insurance: 'IN-20150044332', dob: '1988-11-20', gender: 'أنثى', nationality: 'عُمانية', insuranceStatus: 'نشط', regDate: '2015-05-01', subType: 'إلزامي' },
      employer: { name: 'الشركة الحديثة للصناعات الغذائية', cr: '9988776', establishment: 'EST-0055442', jobTitle: 'محضرة أغذية', joinDate: '2015-05-01', location: 'الموالح', sector: 'الإنشاءات والمقاولات', employerType: 'خاص', branch: { id: 'BR-001', name: 'الفرع الرئيسي', state: 'مسقط', governorate: 'بوشر' } },
      injury: { caseType: 'التهاب المفاصل الروماتويدي (المهني)', caseDescription: 'عانت العاملة من آلام متزايدة في مفاصل اليدين والكتفين نتيجة التعرض المستمر لدرجات حرارة منخفضة جداً ومهام يدوية متكررة على مدار 7 سنوات. شُخّص الحال من قبل طبيب متخصص في الأمراض المهنية.', description: 'بدأت الأعراض بآلام شديدة في المفاصل نتيجة العمل في بيئة باردة جداً ومهام متكررة.', firstSuspicion: '2024-12-10', chemicalAgents: 'عوامل فيزيائية (برودة شديدة، مهام متكررة)', exposureDuration: '7 سنوات', workEnvironment: 'غرف تبريد ومعالجة الأغذية بدرجات حرارة تتراوح بين -5 و +4 مئوية، مع مهام تعبئة يدوية متكررة لساعات طويلة دون فترات راحة كافية', insuredStatus: 'تحت العلاج' },
      attachments: [],
      notes: [],
      investigation: { summary: 'بدأت فاطمة الحجرية بمعاينة الموقع وفحص سجلات الصحة المهنية.', findings: '', record: 'إفادة المشرف: ...' },
      timeline: [
        { action: 'تم تقديم الطلب', actor: 'عائشة الكيومية', role: 'العامل', time: '2025-01-18 09:00', fromStatus: '', toStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', note: '', type: 'default' },
        { action: 'توجيه لقسم الأمراض المهنية', actor: 'النظام', role: 'آلي', time: '2025-01-18 09:01', fromStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', toStatus: 'قيد التحقيق — الأمراض المهنية', note: '', type: 'default' },
      ],
      assignedTo: 'فاطمة بنت حمد الحجرية',
      checkedOutBy: 'فاطمة بنت حمد الحجرية',
    },
    {
      id: 'WI-2025-001567',
      type: 'مرض مهني',
      subtype: 'الربو المهني',
      status: 'بانتظار اعتماد رئيس قسم التحقيق في الأمراض المهنية',
      assignedTo: 'أحمد بن سليم المعمري',
      submitDate: '2024-12-10',
      lastUpdate: '2025-01-10 14:00',
      applicant: { name: 'عمر بن خالد البرواني', civil: '9554433221', role: 'العامل', phone: '96895551122', email: 'omar.b@mail.com' },
      insured: { name: 'عمر بن خالد البرواني', civil: '9554433221', insurance: 'IN-2020112233', dob: '1985-03-12', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2020-01-01', subType: 'إلزامي' },
      employer: { name: 'مصنع الشرق للأصباغ والدهانات', cr: '1234567', establishment: 'EST-8877665', jobTitle: 'فني خلط أصباغ', joinDate: '2020-01-01', location: 'المسفاة', sector: 'الإنشاءات والمقاولات', employerType: 'خاص', branch: { id: 'BR-001', name: 'الفرع الرئيسي', state: 'مسقط', governorate: 'بوشر' } },
      injury: { caseType: 'الربو المهني', caseDescription: 'يعاني العامل من ضيق تنفس حاد وسعال مزمن مرتبط بالتعرض اليومي لأبخرة المذيبات الكيميائية في بيئة عمل مغلقة. التشخيص صادر من طبيب متخصص في الأمراض التنفسية المهنية، ويُصنَّف الحال ضمن أمراض الربو المهني.', firstSuspicion: '2024-11-20', chemicalAgents: 'أبخرة كيميائية، مذيبات (Solvents)', exposureDuration: '4 سنوات', workEnvironment: 'بيئة مغلقة مع تهوية غير كافية أحياناً، تركيزات المذيبات تتجاوز الحدود المسموح بها وفق القياسات الدورية', insuredStatus: 'تحت العلاج' },
      investigation: { summary: 'تمت مراجعة التقارير الطبية والزيارة الميدانية للمصنع.', findings: 'وجود تعرض مستمر لأبخرة المذيبات الكيميائية.', employeeRecommendation: 'موافقة', employeeNotes: 'نوصي باعتماد الحالة كمرض مهني.', record: 'إفادة مدير المصنع...' },
      attachments: [
        { id: 'att6', type: 'تقرير طبي متخصص', name: 'تقرير_الربو_المهني.pdf', uploadDate: '2024-12-20', uploadedBy: 'أمينة الخروصية', role: 'العامل', size: '2.1 MB', icon: 'pdf' },
        { id: 'att7', type: 'قياسات البيئة المهنية', name: 'قياسات_غبار_المصنع.pdf', uploadDate: '2024-12-22', uploadedBy: 'فاطمة بنت حمد الحجرية', role: 'موظف قسم التحقيق في الأمراض المهنية', size: '3.4 MB', icon: 'pdf' },
      ],
      notes: [],
      timeline: [
        { action: 'تم تقديم الطلب', actor: 'أمينة الخروصية', role: 'العامل', time: '2024-12-20 14:00', fromStatus: '', toStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', note: '', type: 'default' },
        { action: 'توجيه لقسم التحقيق في الأمراض المهنية', actor: 'النظام', role: 'آلي', time: '2024-12-20 14:01', fromStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', toStatus: 'قيد التحقيق — الأمراض المهنية', note: '', type: 'default' },
        { action: 'رفع تقرير التحقيق لرئيس القسم', actor: 'فاطمة بنت حمد الحجرية', role: 'موظف قسم التحقيق في الأمراض المهنية', time: '2024-12-30 16:45', fromStatus: 'قيد التحقيق — الأمراض المهنية', toStatus: 'بانتظار اعتماد رئيس قسم التحقيق في الأمراض المهنية', note: 'التوصية: موافقة', type: 'success' },
        { action: 'اعتماد وتوجيه لقسم الإجازات المرضية', actor: 'أحمد بن سليم المعمري', role: 'رئيس قسم التحقيق في الأمراض المهنية', time: '2025-01-05 09:00', fromStatus: 'بانتظار اعتماد رئيس قسم التحقيق في الأمراض المهنية', toStatus: 'قيد المراجعة من موظف قسم الإجازات المرضية', note: 'اعتمدت التقرير وأحلته لقسم الإجازات المرضية', type: 'success' },
      ],
    },
    {
      id: 'WI-2025-001005',
      type: 'إصابة عمل',
      subtype: 'إصابة في موقع العمل',
      status: 'تم إرسال قرار المؤسسة الصحية المرخصة — بانتظار مراجعة موظف قسم اللجان الطبية',
      submitDate: '2025-01-20',
      lastUpdate: '2025-02-05 11:30',
      applicant: { name: 'أحمد بن علي الحارثي', civil: '9905544332', role: 'العامل / المؤمن عليه / المواطن', phone: '96894455667', email: 'ahmed.h@omantel.om' },
      insured: { name: 'أحمد بن علي الحارثي', civil: '9905544332', insurance: 'IN-20150033221', dob: '1990-05-12', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2015-08-01', subType: 'إلزامي' },
      employer: { name: 'الشركة العمانية للاتصالات (عُمانتل)', cr: '1122334', establishment: 'EST-0011223', jobTitle: 'فني شبكات', joinDate: '2015-08-01', location: 'مسقط — مرتفعات المطار', sector: 'الإنشاءات والمقاولات', employerType: 'خاص', branch: { id: 'BR-001', name: 'الفرع الرئيسي', state: 'مسقط', governorate: 'بوشر' } },
      injury: { description: 'سقوط من برج اتصالات أثناء الصيانة الدورية في محافظة البريمي.', location: 'محافظة البريمي — ولاية السنينة', bodyPart: 'الساق والظهر', witnesses: 'نعم', witnessNames: 'فهد بن سعيد البادي', incidentDate: '2025-01-19', caseType: 'السقوط من مكان مرتفع', insuredStatus: 'تحت العلاج' },
      attachments: [
        { id: 'att1005-1', type: 'تقرير طبي أولي', name: 'تقرير_مستشفى_البريمي.pdf', uploadDate: '2025-01-20', uploadedBy: 'أحمد بن علي الحارثي', role: 'العامل', size: '0.9 MB', icon: 'pdf' }
      ],
      notes: [],
      investigation: {
        summary: 'تم التحقق من المهمة الرسمية وتصاريح العمل على الأبراج.',
        findings: 'إصابة عمل أثناء تأدية الواجب.',
        employeeRecommendation: 'موافقة',
        employeeNotes: 'توصية بالعرض على اللجنة الطبية التخصصية لتحديد نسبة العجز.'
      },
      timeline: [
        { action: 'تم تقديم الطلب', actor: 'أحمد بن علي الحارثي', role: 'العامل', time: '2025-01-20 09:00', fromStatus: '', toStatus: 'تم تقديم الطلب', note: '', type: 'default' },
        { action: 'اعتماد التحقيق', actor: 'يوسف بن علي الشيباني', role: 'رئيس قسم التحقيق في إصابات العمل', time: '2025-02-05 11:30', fromStatus: 'بانتظار الاعتماد', toStatus: 'تم الموافقة على العرض على المؤسسات الصحية المرخصة', note: '', type: 'success' }
      ],
      assignedTo: 'سعاد بنت أحمد الريامية',
      checkedOutBy: 'سعاد بنت أحمد الريامية',
    },
    {
      id: 'WI-2025-001701',
      type: 'إصابة عمل',
      subtype: 'إصابة في موقع العمل',
      status: 'تم طلب العرض على المؤسسات الصحية المرخصة — بانتظار مراجعة رئيس قسم اللجان الطبية',
      submitDate: '2025-02-07',
      lastUpdate: '2025-02-09 10:45',
      applicant: { name: 'ناصر بن حمود الساعدي', civil: '9012255884', role: 'العامل / المؤمن عليه / المواطن', phone: '96891122558', email: 'nasser.s@mail.com' },
      insured: { name: 'ناصر بن حمود الساعدي', civil: '9012255884', insurance: 'IN-20160077541', dob: '1988-04-21', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2016-09-01', subType: 'إلزامي' },
      employer: { name: 'شركة الخدمات الصناعية المتقدمة', cr: '6655443', establishment: 'EST-0099112', jobTitle: 'فني صيانة', joinDate: '2016-09-01', location: 'صحار — المنطقة الصناعية', sector: 'الإنشاءات والمقاولات', employerType: 'خاص', branch: { id: 'BR-001', name: 'الفرع الرئيسي', state: 'مسقط', governorate: 'بوشر' } },
      injury: { description: 'إصابة في الركبة أثناء رفع معدات ثقيلة داخل الموقع.', location: 'ورشة الصيانة — القطاع 2', bodyPart: 'الركبة اليمنى', witnesses: 'نعم', witnessNames: 'خالد بن سالم', incidentDate: '2025-02-01', caseType: 'إصابة حركة/رفع أحمال', insuredStatus: 'تحت العلاج' },
      attachments: [
        { id: 'att1701-1', type: 'تقرير طبي أولي', name: 'تقرير_طبي_أولي_1701.pdf', uploadDate: '2025-02-07', uploadedBy: 'ناصر بن حمود الساعدي', role: 'العامل', size: '0.9 MB', icon: 'pdf' },
      ],
      notes: [],
      investigation: {
        summary: 'ثبتت علاقة الإصابة بمهام العمل ورفعت التوصية بالعرض على مؤسسة صحية مرخصة.',
        findings: 'الحالة مكتملة الوثائق وقابلة للعرض.',
        employeeRecommendation: 'موافقة',
        employeeNotes: 'يوصى بالمضي في مسار العرض على المؤسسات الصحية المرخصة.'
      },
      timeline: [
        { action: 'تم تقديم الطلب', actor: 'ناصر بن حمود الساعدي', role: 'العامل', time: '2025-02-07 09:15', fromStatus: '', toStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', note: '', type: 'default' },
        { action: 'رفع توصية العرض', actor: 'سعاد بنت أحمد الريامية', role: 'موظف قسم اللجان الطبية', time: '2025-02-09 10:45', fromStatus: 'تم طلب العرض على المؤسسات الصحية المرخصة — بانتظار مراجعة موظف قسم اللجان الطبية', toStatus: 'تم طلب العرض على المؤسسات الصحية المرخصة — بانتظار مراجعة رئيس قسم اللجان الطبية', note: '', type: 'success' },
      ],
      assignedTo: 'محمد بن راشد الهنائي',
      checkedOutBy: 'محمد بن راشد الهنائي',
    },
    {
      id: 'WI-2025-001090',
      type: 'إصابة عمل',
      subtype: 'إصابة في موقع العمل',
      status: 'بانتظار اعتماد رئيس قسم اللجان الطبية',
      submitDate: '2024-12-25',
      lastUpdate: '2025-01-20 14:00',
      applicant: { name: 'خالد بن عيسى المعمري', civil: '9022334455', role: 'المؤمن عليه', phone: '96892233445', email: 'khaled.m@mail.com' },
      insured: { name: 'خالد بن عيسى المعمري', civil: '9022334455', insurance: 'IN-20120033442', dob: '1975-02-10', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2012-01-01', subType: 'إلزامي' },
      employer: { name: 'شركة عُمان للبتروكيماويات', cr: '5544332', establishment: 'EST-0022334', jobTitle: 'فني غرف تحكم', joinDate: '2012-01-01', location: 'صحار', sector: 'الإنشاءات والمقاولات', employerType: 'خاص', branch: { id: 'BR-001', name: 'الفرع الرئيسي', state: 'مسقط', governorate: 'بوشر' } },
      injury: { description: 'حادث انفجار صمام أدى لإصابات بالغة في الوجه والعينين.', location: 'وحدة التكسير رقم 4', bodyPart: 'الوجه والعينين', incidentDate: '2024-12-24', insuredStatus: 'تحت العلاج' },
      investigation: { summary: 'تم الانتهاء من التحقيق والزيارة الميدانية. الحالة مؤكدة كإصابة عمل جسيمة.', findings: 'التوصية بنسبة عجز مقدرة بـ 40%.', employeeRecommendation: 'موافقة', record: 'محضر إفادة الشهود والمسؤولين...' },
      status: 'بانتظار اعتماد رئيس قسم اللجان الطبية',
      committeeDecision: { type: 'توصية بالعجز', content: 'العرض على اللجنة الطبية لتحديد العجز الدائم.', date: '2025-01-19' },
      assignedTo: 'محمد بن راشد الهنائي',
      checkedOutBy: 'محمد بن راشد الهنائي',
    },
    {
      id: 'WI-2025-001102',
      type: 'إصابة عمل',
      subtype: 'حادث طريق',
      isRelapse: 'لا',
      status: 'تم الموافقة على العرض على المؤسسات الصحية المرخصة — بانتظار إحالة المقرر',
      submitDate: '2025-01-22',
      lastUpdate: '2025-02-10 09:15',
      applicant: { name: 'ريم بنت سالم الحارثية', civil: '9034567890', role: 'العامل / المؤمن عليه / المواطن', phone: '96893456789', email: 'reem.h@mail.com' },
      insured: { name: 'ريم بنت سالم الحارثية', civil: '9034567890', insurance: 'IN-20160034567', dob: '1988-04-15', gender: 'أنثى', nationality: 'عُمانية', insuranceStatus: 'نشط', regDate: '2016-03-01', subType: 'إلزامي' },
      employer: { name: 'شركة خدمات التأمين الوطنية', cr: '3344556', establishment: 'EST-0033445', jobTitle: 'أخصائية تأمين', joinDate: '2016-03-01', location: 'مسقط — العذيبة', sector: 'الإنشاءات والمقاولات', employerType: 'خاص', branch: { id: 'BR-001', name: 'الفرع الرئيسي', state: 'مسقط', governorate: 'بوشر' } },
      injury: { description: 'حادث تصادم أثناء التنقل من وإلى العمل. إصابات في العمود الفقري والرقبة.', location: 'طريق مسقط — صلالة (كم 12)', bodyPart: 'العمود الفقري والرقبة', witnesses: 'نعم', witnessNames: 'شرطة عُمان السلطانية', incidentDate: '2025-01-21', caseType: 'حادث طريق', insuredStatus: 'تحت العلاج', accidentDirection: 'السكن الدائم إلى مقر العمل' },
      attachments: [
        { id: 'att1102-1', type: 'تقرير الشرطة', name: 'تقرير_شرطة_مسقط.pdf', uploadDate: '2025-01-22', uploadedBy: 'ريم الحارثية', role: 'العامل', size: '1.1 MB', icon: 'pdf' },
        { id: 'att1102-2', type: 'تقرير طبي أولي', name: 'تقرير_طبي_العذيبة.pdf', uploadDate: '2025-01-22', uploadedBy: 'ريم الحارثية', role: 'العامل', size: '0.8 MB', icon: 'pdf' },
      ],
      notes: [],
      investigation: {
        summary: 'تم التحقق من وقوع الحادث أثناء التنقل المهني المعتاد.',
        findings: 'الحادث مؤكد وفق تقرير الشرطة وسجلات الدخول والخروج من العمل. إصابات في العمود الفقري تستدعي تقييماً متخصصاً.',
        employeeRecommendation: 'موافقة',
        employeeNotes: 'توصية بالعرض على مستشفى متخصص في جراحة العمود الفقري لتحديد نسبة العجز ومسار العلاج.',
        headDecision: 'اعتماد وتوجيه للجان الطبية',
      },
      fieldVisits: [],
      sickLeavePeriods: [
        { from: '2025-01-21', to: '2025-03-21', days: 60, hospital: 'مستشفى العذيبة التخصصي', doctor: 'د. ناصر بن علي الرواحي', status: 'معتمدة' },
      ],
      referral: null,
      session: null,
      committeeDecision: null,
      disbursement: null,
      timeline: [
        { action: 'تم تقديم الطلب', actor: 'ريم الحارثية', role: 'العامل', time: '2025-01-22 10:00', fromStatus: '', toStatus: 'تم تقديم الطلب', note: '', type: 'default' },
        { action: 'اعتماد التحقيق وتوجيه للجان الطبية', actor: 'يوسف بن علي الشيباني', role: 'رئيس قسم التحقيق في إصابات العمل', time: '2025-02-05 14:00', fromStatus: 'بانتظار الاعتماد', toStatus: 'تم طلب العرض على المؤسسات الصحية المرخصة', note: '', type: 'success' },
        { action: 'موافقة الموظف على الإحالة', actor: 'سعاد بنت أحمد الريامية', role: 'موظف قسم اللجان الطبية', time: '2025-02-10 09:00', fromStatus: 'تم طلب العرض', toStatus: 'تم الموافقة على العرض على المؤسسات الصحية المرخصة — بانتظار إحالة المقرر', note: 'توصية: إحالة إلى مستشفى الشرق للعمود الفقري', type: 'success' },
      ],
      assignedTo: 'محمد بن راشد الهنائي',
      checkedOutBy: 'محمد بن راشد الهنائي',
    },
    {
      id: 'WI-2025-001115',
      type: 'مرض مهني',
      subtype: 'التهاب مفاصل',
      isRelapse: 'لا',
      status: 'تم طلب العرض على المؤسسات الصحية المرخصة — بانتظار مراجعة موظف قسم اللجان الطبية',
      submitDate: '2025-02-01',
      lastUpdate: '2025-02-18 11:00',
      applicant: { name: 'منصور بن سليم الهاشمي', civil: '9056789123', role: 'العامل / المؤمن عليه / المواطن', phone: '96895678901', email: 'mansour.h@mail.com' },
      insured: { name: 'منصور بن سليم الهاشمي', civil: '9056789123', insurance: 'IN-20130056789', dob: '1972-09-05', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2013-06-01', subType: 'إلزامي' },
      employer: { name: 'مصنع الحديد والصلب الوطني', cr: '2233445', establishment: 'EST-0022334', jobTitle: 'فني لحام', joinDate: '2013-06-01', location: 'رصيل الصناعية — مسقط' },
      injury: { description: 'إصابة بالتهاب المفاصل الروماتويدي المهني بعد سنوات من التعرض للاهتزازات الميكانيكية.', location: 'منطقة اللحام الصناعي', bodyPart: 'اليدان والمعصمان', witnesses: 'لا', incidentDate: '2024-10-15', caseType: 'التهاب مفاصل مهني', caseDescription: 'العامل يعمل في اللحام منذ 12 عاماً. بدأت الأعراض منذ عام 2022 وتصاعدت تدريجياً.', workEnvironment: 'اهتزازات ميكانيكية متكررة — تعرض لدرجات حرارة مرتفعة' },
      attachments: [
        { id: 'att1115-1', type: 'تقرير طبي تخصصي', name: 'تقرير_التهاب_المفاصل.pdf', uploadDate: '2025-02-01', uploadedBy: 'منصور الهاشمي', role: 'العامل', size: '1.4 MB', icon: 'pdf' },
      ],
      notes: [],
      investigation: {
        summary: 'ثبت ارتباط المرض ببيئة العمل الميكانيكية بعد مراجعة السجلات الطبية وتقارير بيئة العمل.',
        findings: 'إصابة مهنية مؤكدة — التوصية بالعرض على لجنة متخصصة لتحديد نسبة العجز المهني.',
        employeeRecommendation: 'موافقة',
        employeeNotes: 'يستدعي الوضع عرضاً على مؤسسة صحية متخصصة في أمراض المفاصل المهنية.',
        headDecision: 'اعتماد وتوجيه للجان',
      },
      fieldVisits: [],
      sickLeavePeriods: [],
      referral: null, session: null, committeeDecision: null, disbursement: null,
      timeline: [
        { action: 'تم تقديم الطلب', actor: 'منصور الهاشمي', role: 'العامل', time: '2025-02-01 09:30', fromStatus: '', toStatus: 'تم تقديم الطلب', note: '', type: 'default' },
        { action: 'اعتماد وتوجيه للجان الطبية', actor: 'رئيس قسم التحقيق في الأمراض المهنية', role: 'رئيس القسم', time: '2025-02-18 11:00', fromStatus: 'بانتظار الاعتماد', toStatus: 'تم طلب العرض على المؤسسات الصحية المرخصة — بانتظار مراجعة موظف قسم اللجان الطبية', note: '', type: 'success' },
      ],
      assignedTo: 'سعاد بنت أحمد الريامية',
      checkedOutBy: null,
    },
    {
      id: 'WI-2025-001120',
      type: 'إصابة عمل',
      subtype: 'إصابة في موقع العمل',
      isRelapse: 'لا',
      status: 'تم الإحالة إلى مقرر المؤسسة الصحية المرخصة — بانتظار جدولة جلسة',
      submitDate: '2025-01-10',
      lastUpdate: '2025-02-12 15:30',
      applicant: { name: 'سلمى بنت قاسم الراشدية', civil: '9067890234', role: 'العامل / المؤمن عليه / المواطن', phone: '96896789012', email: 'salma.r@mail.com' },
      insured: { name: 'سلمى بنت قاسم الراشدية', civil: '9067890234', insurance: 'IN-20180067890', dob: '1985-11-20', gender: 'أنثى', nationality: 'عُمانية', insuranceStatus: 'نشط', regDate: '2018-05-01', subType: 'إلزامي' },
      employer: { name: 'مستشفى الرحمة الخاصة', cr: '4455667', establishment: 'EST-0044556', jobTitle: 'ممرضة تخصصية', joinDate: '2018-05-01', location: 'مسقط — الخوير' },
      injury: { description: 'إصابة بكسر في اليد اليمنى نتيجة سقوط معدات طبية ثقيلة.', location: 'غرفة التخزين — الطابق الثاني', bodyPart: 'اليد اليمنى', witnesses: 'نعم', witnessNames: 'زينب العبرية', incidentDate: '2025-01-09', caseType: 'إصابة في موقع العمل' },
      attachments: [
        { id: 'att1120-1', type: 'تقرير طبي', name: 'تقرير_كسر_اليد.pdf', uploadDate: '2025-01-10', uploadedBy: 'سلمى الراشدية', role: 'العامل', size: '0.6 MB', icon: 'pdf' },
      ],
      notes: [],
      investigation: {
        summary: 'تم التحقق من الحادثة بشهادة الزميلة المعنية.',
        findings: 'إصابة عمل مؤكدة — الحالة تحتاج تقييماً تخصصياً لتحديد نسبة الإعاقة المؤقتة.',
        employeeRecommendation: 'موافقة',
        headDecision: 'اعتماد وإحالة',
      },
      fieldVisits: [],
      sickLeavePeriods: [],
      referral: { institution: 'مستشفى النور التخصصي', rapporteur: 'د. سيف المسكري', referralDate: '2025-02-12' },
      session: null, committeeDecision: null, disbursement: null,
      timeline: [
        { action: 'تم تقديم الطلب', actor: 'سلمى الراشدية', role: 'العامل', time: '2025-01-10 08:00', fromStatus: '', toStatus: 'تم تقديم الطلب', note: '', type: 'default' },
        { action: 'موافقة الرئيس وإحالة للمقرر', actor: 'محمد بن راشد الهنائي', role: 'رئيس قسم اللجان الطبية', time: '2025-02-12 15:30', fromStatus: 'تم الموافقة على العرض', toStatus: 'تم الإحالة إلى مقرر المؤسسة الصحية المرخصة — بانتظار جدولة جلسة', note: '', type: 'success' },
      ],
      assignedTo: 'سعاد بنت أحمد الريامية',
      checkedOutBy: 'سعاد بنت أحمد الريامية',
    },
    {
      id: 'WI-2025-001140',
      type: 'مرض مهني',
      subtype: 'أمراض الجهاز التنفسي',
      isRelapse: 'لا',
      status: 'تم اتخاذ القرار من المؤسسة الصحية المرخصة — بانتظار التنفيذ',
      submitDate: '2024-12-01',
      lastUpdate: '2025-02-20 11:00',
      applicant: { name: 'حمد بن سعيد الهنائي', civil: '9078901345', role: 'العامل / المؤمن عليه / المواطن', phone: '96895678901', email: 'hamad.h@mail.com' },
      insured: { name: 'حمد بن سعيد الهنائي', civil: '9078901345', insurance: 'IN-20160078901', dob: '1980-04-15', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2016-03-01', subType: 'إلزامي' },
      employer: { name: 'شركة الصناعات الكيميائية العُمانية', cr: '5566778', establishment: 'EST-0055667', jobTitle: 'مشغل خطوط إنتاج', joinDate: '2016-03-01', location: 'صحار — المنطقة الصناعية' },
      injury: { description: 'تعرض مزمن لأبخرة المواد الكيميائية أدى إلى التهاب رئوي مزمن وتليف نسيجي.', location: 'قسم الإنتاج الكيميائي', bodyPart: 'الجهاز التنفسي', witnesses: 'لا', witnessNames: '', incidentDate: '2024-11-01', caseType: 'مرض مهني - تعرض كيميائي' },
      attachments: [
        { id: 'att1140-1', type: 'تقرير طبي متخصص', name: 'تقرير_الرئة_صحار.pdf', uploadDate: '2024-12-02', uploadedBy: 'حمد الهنائي', role: 'العامل', size: '1.3 MB', icon: 'pdf' },
        { id: 'att1140-2', type: 'قرار المؤسسة الصحية', name: 'قرار_مستشفى_الرعاية.pdf', uploadDate: '2025-02-18', uploadedBy: 'د. ماجد الشكيلي', role: 'مقرر المؤسسة الصحية المرخصة', size: '0.9 MB', icon: 'pdf' },
      ],
      notes: [],
      investigation: {
        summary: 'ثبت التعرض المهني للمواد الكيميائية خلال 8 سنوات عمل متواصلة.',
        findings: 'مرض مهني مؤكد — التهاب رئوي مزمن مرتبط بطبيعة العمل.',
        employeeRecommendation: 'موافقة',
        headDecision: 'اعتماد وإحالة للجان الطبية',
      },
      fieldVisits: [],
      sickLeavePeriods: [
        { id: 'sl1140', from: '2024-12-01', to: '2025-01-31', days: 62, status: 'معتمدة', addedBy: 'مريم بنت سيف الكيومية', addedDate: '2024-12-05', note: '' },
      ],
      referral: { institution: 'مستشفى الرعاية المتكاملة', rapporteur: 'د. ماجد بن سعيد الشكيلي', referralDate: '2025-01-20' },
      session: { id: 'SES-2025-0120', date: '2025-02-12', time: '11:00' },
      committeeDecision: { decision: 'نسبة عجز 25%', date: '2025-02-12', doctor: 'د. ماجد بن سعيد الشكيلي', notes: 'عجز جزئي دائم ناجم عن الأمراض المهنية' },
      disbursement: null,
      timeline: [
        { action: 'تم تقديم الطلب', actor: 'حمد الهنائي', role: 'العامل', time: '2024-12-01 09:00', fromStatus: '', toStatus: 'تم تقديم الطلب', note: '', type: 'default' },
        { action: 'موافقة وإحالة للجان', actor: 'محمد بن راشد الهنائي', role: 'رئيس قسم اللجان الطبية', time: '2025-01-20 10:00', fromStatus: 'تم الموافقة على العرض', toStatus: 'تم الإحالة إلى مقرر المؤسسة الصحية المرخصة', note: '', type: 'success' },
        { action: 'تم عقد الجلسة وإدخال القرار', actor: 'د. ماجد بن سعيد الشكيلي', role: 'مقرر المؤسسة الصحية المرخصة', time: '2025-02-12 13:00', fromStatus: 'تم جدولة الجلسة', toStatus: 'تم اتخاذ القرار من المؤسسة الصحية المرخصة — بانتظار التنفيذ', note: 'نسبة عجز 25%', type: 'success' },
      ],
      assignedTo: 'محمد بن راشد الهنائي',
      checkedOutBy: null,
    },
    {
      id: 'WI-2025-001089',
      type: 'إصابة عمل',
      subtype: 'إصابة في موقع العمل',
      isRelapse: 'لا',
      status: 'معتمد',
      submitDate: '2024-11-15',
      lastUpdate: '2025-01-08 10:00',
      applicant: { name: 'سيف بن راشد المحروقي', civil: '9045678901', role: 'العامل / المؤمن عليه / المواطن', phone: '96896543210', email: 'saif.m@mail.com' },
      insured: { name: 'سيف بن راشد المحروقي', civil: '9045678901', insurance: 'IN-20150078901', dob: '1978-07-22', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2015-01-01', subType: 'إلزامي' },
      employer: { name: 'شركة تقنيات الطاقة المتجددة', cr: '4567890', establishment: 'EST-0076543', jobTitle: 'فني صيانة', joinDate: '2015-01-01', location: 'بركاء' },
      injury: { description: 'سقوط من علو أثناء صيانة ألواح الطاقة الشمسية أدى إلى كسر في الساق اليسرى.', location: 'سطح المبنى الرئيسي — مشروع ألواح بركاء', bodyPart: 'الساق اليسرى', witnesses: 'نعم', witnessNames: 'طالب بن سعد العامري', incidentDate: '2024-11-14' },
      attachments: [
        { id: 'att8', type: 'تقرير طبي أولي', name: 'تقرير_مستشفى_بركاء.pdf', uploadDate: '2024-11-15', uploadedBy: 'سيف المحروقي', role: 'العامل', size: '1.1 MB', icon: 'pdf' },
        { id: 'att9', type: 'تقرير إجازة مرضية', name: 'اجازة_مرضية_30يوم.pdf', uploadDate: '2024-11-20', uploadedBy: 'مريم بنت سيف الكيومية', role: 'موظف قسم الإجازات المرضية', size: '0.6 MB', icon: 'pdf' },
        { id: 'att10', type: 'تقرير إجازة مرضية', name: 'اجازة_مرضية_15يوم_امتداد.pdf', uploadDate: '2024-12-22', uploadedBy: 'مريم بنت سيف الكيومية', role: 'موظف قسم الإجازات المرضية', size: '0.5 MB', icon: 'pdf' },
      ],
      notes: [],
      investigation: {
        summary: 'وقعت الإصابة أثناء العمل المعتاد. الأسباب: عدم استخدام حزام الأمان بشكل صحيح.',
        findings: 'إصابة عمل مستوفية للشروط.',
        employeeRecommendation: 'موافقة',
        employeeNotes: '',
        headNotes: 'مستوفية. تمت الموافقة.',
        headDecision: 'اعتماد وتوجيه إلى قسم الإجازات المرضية',
      },
      fieldVisits: [],
      sickLeavePeriods: [
        { id: 'sl1', from: '2024-11-14', to: '2024-12-13', days: 30, status: 'معتمدة', addedBy: 'مريم بنت سيف الكيومية', addedDate: '2024-11-20', note: '' },
        { id: 'sl2', from: '2024-12-14', to: '2024-12-28', days: 15, status: 'معتمدة', addedBy: 'مريم بنت سيف الكيومية', addedDate: '2024-12-22', note: 'امتداد الإجازة بناءً على تقرير طبي جديد' },
      ],
      referral: null,
      session: null,
      committeeDecision: null,
      disbursement: { status: 'تم الصرف', periods: 2, totalDays: 45, totalAmount: 1250.000, lastDisbursement: '2025-01-05', nextDisbursement: null, stopReason: null },
      timeline: [
        { action: 'تم تقديم الطلب', actor: 'سيف المحروقي', role: 'العامل', time: '2024-11-15 09:00', fromStatus: '', toStatus: 'تم تقديم الطلب', note: '', type: 'default' },
        { action: 'اعتماد وتوجيه للإجازات', actor: 'يوسف بن علي الشيباني', role: 'رئيس قسم التحقيق في إصابات العمل', time: '2024-11-18 11:00', fromStatus: 'بانتظار اعتماد رئيس قسم التحقيق', toStatus: 'قيد المراجعة من موظف قسم الإجازات المرضية', note: '', type: 'success' },
        { action: 'إضافة فترة إجازة مرضية — 30 يوماً', actor: 'مريم بنت سيف الكيومية', role: 'موظف قسم الإجازات المرضية', time: '2024-11-20 10:30', fromStatus: 'قيد المراجعة', toStatus: 'قيد المراجعة', note: 'من 14/11 إلى 13/12', type: 'default' },
        { action: 'اعتماد الفترة الأولى', actor: 'حمد بن عيسى الغافري', role: 'رئيس قسم الإجازات المرضية', time: '2024-11-21 09:00', fromStatus: 'بانتظار اعتماد رئيس قسم الإجازات المرضية', toStatus: 'معتمد', note: '', type: 'success' },
        { action: 'إضافة فترة إجازة امتداد — 15 يوماً', actor: 'مريم بنت سيف الكيومية', role: 'موظف قسم الإجازات المرضية', time: '2024-12-22 14:00', fromStatus: 'معتمد', toStatus: 'بانتظار اعتماد رئيس قسم الإجازات المرضية', note: 'امتداد بناءً على تقرير طبي', type: 'default' },
        { action: 'اعتماد الفترة الثانية', actor: 'حمد بن عيسى الغافري', role: 'رئيس قسم الإجازات المرضية', time: '2024-12-23 10:00', fromStatus: 'بانتظار اعتماد رئيس قسم الإجازات المرضية', toStatus: 'معتمد', note: '', type: 'success' },
        { action: 'تم صرف استحقاق الفترة الأولى', actor: 'النظام', role: 'آلي', time: '2024-12-05 00:00', fromStatus: 'معتمد', toStatus: 'معتمد', note: 'صرف 750 ريال عُماني', type: 'success' },
        { action: 'تم صرف استحقاق الفترة الثانية', actor: 'النظام', role: 'آلي', time: '2025-01-05 00:00', fromStatus: 'معتمد', toStatus: 'معتمد', note: 'صرف 500 ريال عُماني', type: 'success' },
      ],
      assignedTo: 'نورة بنت سالم الزدجالية',
      checkedOutBy: 'نورة بنت سالم الزدجالية',
    },
    {
      id: 'WI-2024-000987',
      type: 'إصابة عمل',
      subtype: 'إصابة في موقع العمل',
      isRelapse: 'لا',
      status: 'تم رفض الطلب',
      submitDate: '2024-10-01',
      lastUpdate: '2024-11-15 16:30',
      notificationDate: '2024-11-17',
      applicant: { name: 'ليلى بنت سيف الحوسنية', civil: '9056789012', role: 'العامل / المؤمن عليه / المواطن', phone: '96895432109', email: 'laila.h@mail.com' },
      insured: { name: 'ليلى بنت سيف الحوسنية', civil: '9056789012', insurance: 'IN-20200089012', dob: '1990-12-10', gender: 'أنثى', nationality: 'عُمانية', insuranceStatus: 'نشط', regDate: '2020-05-01', subType: 'إلزامي' },
      employer: { name: 'دار الرعاية الصحية الخاصة', cr: '5678901', establishment: 'EST-0054321', jobTitle: 'ممرضة', joinDate: '2020-05-01', location: 'مطرح' },
      injury: { description: 'إصابة أثناء التعامل مع مريض غير متعاون.', location: 'جناح الطوارئ', bodyPart: 'الظهر', witnesses: 'لا', incidentDate: '2024-09-30' },
      attachments: [
        { id: 'att11', type: 'تقرير طبي أولي', name: 'تقرير_ليلى.pdf', uploadDate: '2024-10-01', uploadedBy: 'ليلى الحوسنية', role: 'العامل', size: '0.7 MB', icon: 'pdf' },
      ],
      notes: [],
      investigation: { summary: 'مراجعة التقارير والسجلات.', findings: 'لم تُثبَت علاقة سببية مباشرة بين الإجراء الطبي الاعتيادي والإصابة المزعومة. الشهود غير متوفرين.', employeeRecommendation: 'رفض', employeeNotes: 'لا تستوفي شروط إصابة العمل وفق الأدلة المتاحة.', headNotes: 'أتفق مع التقرير، الرفض مبرر.', headDecision: 'رفض مع تحديد السبب', record: '' },
      fieldVisits: [],
      sickLeavePeriods: [],
      referral: null,
      session: null,
      committeeDecision: null,
      disbursement: null,
      timeline: [
        { action: 'تم تقديم الطلب', actor: 'ليلى الحوسنية', role: 'العامل', time: '2024-10-01 12:00', fromStatus: '', toStatus: 'تم تقديم الطلب', note: '', type: 'default' },
        { action: 'رفض الطلب', actor: 'يوسف بن علي الشيباني', role: 'رئيس قسم التحقيق في إصابات العمل', time: '2024-11-15 16:30', fromStatus: 'بانتظار اعتماد رئيس قسم التحقيق', toStatus: 'تم رفض الطلب', note: 'السبب: عدم استيفاء شروط إصابة العمل — غياب الأدلة الكافية وعدم وجود شهود', type: 'danger' },
      ],
      assignedTo: null,
      checkedOutBy: null,
    },
    {
      id: 'WI-2025-001600',
      type: 'إصابة عمل',
      subtype: 'سقوط في موقع العمل',
      isRelapse: 'لا',
      status: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص',
      submitDate: '2025-01-19',
      lastUpdate: '2025-01-19 09:00',
      applicant: { name: 'عمر بن خالد الهنائي', civil: '9088877766', role: 'العامل / المؤمن عليه / المواطن', phone: '96898887776', email: 'omar.h@mail.com' },
      insured: { name: 'عمر بن خالد الهنائي', civil: '9088877766', insurance: 'IN-20190011223', dob: '1988-06-15', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2019-01-01', subType: 'إلزامي' },
      employer: { name: 'العمانية للمقاولات العامة', cr: '2233445', establishment: 'EST-0088776', jobTitle: 'عامل بناء', joinDate: '2019-01-01', location: 'بوشر' },
      injury: {
        description: 'سقوط من السقالات أثناء تنفيذ أعمال تركيب القوالب الخرسانية في الطابق الثاني، مما أدى إلى كسر في الساعد الأيمن وكدمات في الركبة.',
        location: 'موقع بناء — مشروع الخوير التجاري، الطابق الثاني',
        bodyPart: 'الساعد الأيمن والركبة اليمنى',
        witnesses: 'نعم',
        witnessNames: 'مازن بن راشد السناني — مشرف موقع، ووليد بن حمود البلوشي — عامل سقالات',
        incidentDate: '2025-01-18',
      },
      attachments: [
        { id: 'att1600-1', type: 'تقرير طبي أولي', name: 'تقرير_مستشفى_الخوير.pdf', uploadDate: '2025-01-19', uploadedBy: 'عمر بن خالد الهنائي', role: 'العامل', size: '0.8 MB', icon: 'pdf' },
        { id: 'att1600-2', type: 'إفادة جهة العمل', name: 'افادة_مشرف_الموقع.pdf', uploadDate: '2025-01-19', uploadedBy: 'خالد بن سعيد البلوشي', role: 'الشخص المفوض من جهة العمل', size: '0.4 MB', icon: 'pdf' },
      ],
      notes: [
        { id: 'n1600-1', author: 'عمر بن خالد الهنائي', role: 'العامل', text: 'تم رفع التقرير الطبي الأولي وإفادة المشرف المباشر، والحالة تحتاج مباشرة التحقيق.', time: '2025-01-19 09:10' },
      ],
      investigation: null,
      fieldVisits: [],
      sickLeavePeriods: [],
      referral: null,
      session: null,
      committeeDecision: null,
      disbursement: null,
      timeline: [
        { action: 'تم تقديم الطلب', actor: 'عمر بن خالد الهنائي', role: 'العامل', time: '2025-01-19 09:00', fromStatus: '', toStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', note: '', type: 'default' },
      ],
      assignedTo: 'عائشة بنت محمد الرواحي',
      checkedOutBy: 'عائشة بنت محمد الرواحي',
    },
    {
      id: 'WI-2025-001601',
      type: 'إصابة عمل',
      subtype: 'إصابة في موقع العمل',
      status: 'بانتظار اعتماد رئيس قسم التحقيق في إصابات العمل',
      submitDate: '2025-01-10',
      lastUpdate: '2025-01-18 11:00',
      applicant: { name: 'سالم بن ناصر الحارثي', civil: '9012345678', role: 'العامل', phone: '96898765432', email: 'salem.h@gmail.com' },
      insured: { name: 'سالم بن ناصر الحارثي', civil: '9012345678', insurance: 'IN-20150012345', dob: '1985-01-01', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2015-01-01', subType: 'إلزامي' },
      employer: { name: 'مجموعة النور للإنشاءات', cr: '1234567', establishment: 'EST-0012345', jobTitle: 'مهندس موقع', joinDate: '2015-01-01', location: 'مسقط — القرم' },
      injury: { description: 'تعثر بسبب أسلاك مكشوفة مما أدى لالتواء شديد في الكاحل.', firstSuspicion: '2025-01-09', workEnvironment: 'موقع عمل إنشائي' },
      attachments: [
        { id: 'attA1', type: 'تقرير طبي أولي', name: 'تقرير_كاحل.pdf', uploadDate: '2025-01-10', uploadedBy: 'سالم الحارثي', size: '0.5 MB', icon: 'pdf' }
      ],
      notes: [],
      investigation: {
        summary: 'تم التحقق من الحادث، الشهود (خالد البلوشي) أكدوا وقوع التعثر أثناء الدوام الرسمي نتيجة وجود تمديدات غير آمنة في الموقع.',
        findings: 'الحادثة مستوفية لشروط إصابة العمل وفقاً للمادة (4) من اللائحة. لا توجد مؤشرات على الإهمال الجسيم.',
        employeeRecommendation: 'موافقة',
        employeeNotes: 'تمت المعاينة الميدانية وإرفاق الصور الداعمة.',
      },
      fieldVisits: [
        { date: '2025-01-15', time: '10:00', reason: 'معاينة الموقع', staff: 'عائشة بنت محمد الرواحي', summary: 'تم رصد الأسلاك المكشوفة وتوثيقها.' }
      ],
      sickLeavePeriods: [],
      timeline: [
        { action: 'تم تقديم الطلب', actor: 'سالم الحارثي', role: 'العامل', time: '2025-01-10 10:00', fromStatus: '', toStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', note: '', type: 'default' },
        { action: 'رفع التقرير للاعتماد', actor: 'عائشة بنت محمد الرواحي', role: 'موظف قسم التحقيق في إصابات العمل', time: '2025-01-18 11:00', fromStatus: 'قيد التحقيق — إصابات العمل', toStatus: 'بانتظار اعتماد رئيس قسم التحقيق في إصابات العمل', note: 'التوصية بالموافقة', type: 'success' },
      ],
      assignedTo: 'عائشة بنت محمد الرواحي',
      checkedOutBy: null,
    },
    {
      id: 'WI-2025-001602',
      type: 'مرض مهني',
      subtype: 'الربو المهني',
      status: 'بانتظار اعتماد رئيس قسم الإجازات المرضية',
      submitDate: '2025-01-05',
      lastUpdate: '2025-01-19 14:00',
      applicant: { name: 'علي بن سعيد المحرمي', civil: '9011224455', role: 'العامل / المؤمن عليه / المواطن', phone: '96891122445', email: 'ali.m@oilfields.om' },
      insured: { name: 'علي بن سعيد المحرمي', civil: '9011224455', insurance: 'IN-20120055421', dob: '1982-03-15', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2012-05-01', subType: 'إلزامي' },
      employer: { name: 'شركة خدمات حقول النفط ش.م.م', cr: '5566778', establishment: 'EST-0066554', jobTitle: 'فني صيانة ميكانيكية', joinDate: '2012-05-01', location: 'الوسطى — الدقم' },
      injury: {
        caseType: 'أمراض الجهاز التنفسي',
        description: 'ضيق تنفس مزمن ناتج عن استنشاق أبخرة كيميائية في منطقة العمل لفترة طويلة.',
        chemicalAgents: 'كبريتيد الهيدروجين، أبخرة نفطية، مذيبات صناعية',
        exposureDuration: '8 سنوات',
        firstSuspicion: '2024-11-10',
        workEnvironment: 'محطة ضخ النفط رقم 4 — بيئة مفتوحة معرضة للغازات المصاحبة',
        witnesses: 'نعم',
        witnessNames: 'سعيد بن ناصر العامري — مسؤول الموقع',
        incidentDate: '2025-01-04'
      },
      attachments: [
        { id: 'attB1', type: 'تقرير طبي تخصصي', name: 'تقرير_الصدرية.pdf', uploadDate: '2025-01-06', uploadedBy: 'علي بن سعيد المحرمي', role: 'العامل', size: '1.4 MB', icon: 'pdf' },
        { id: 'attB2', type: 'تقرير التحقيق الميداني', name: 'تحقيق_بيئة_العمل.pdf', uploadDate: '2025-01-15', uploadedBy: 'فاطمة بنت حمد الحجرية', role: 'موظف قسم التحقيق في الأمراض المهنية', size: '2.1 MB', icon: 'pdf' }
      ],
      notes: [
        { id: 'n1602-1', author: 'فاطمة بنت حمد الحجرية', role: 'موظف قسم التحقيق في الأمراض المهنية', text: 'تم إجراء القياسات اللازمة في الموقع وتبين وجود تجاوزات في نسب الغازات خلال ساعات الذروة.', time: '2025-01-15 10:00' }
      ],
      investigation: {
        summary: 'التحقيق أثبت تعرض العامل لتركيزات من الغازات تتجاوز الحدود المسموح بها في موقع العمل بالدقم.',
        findings: 'المرض مدرج في قائمة الأمراض المهنية. الارتباط السببي ثابت تماماً.',
        employeeRecommendation: 'موافقة',
        employeeNotes: 'يوصى بصرف بدلات انقطاع لفترة العلاج.',
        headDecision: 'اعتماد وتوجيه إلى قسم الإجازات المرضية'
      },
      fieldVisits: [
        { date: '2025-01-12', time: '10:00', reason: 'متابعة قياسات جودة الهواء في موقع العمل', staff: 'فاطمة بنت حمد الحجرية، سالم بن خلف الجابري', summary: 'تم قياس تركيزات الغازات في محطة الضخ رقم 4. وُجد أن تركيزات كبريتيد الهيدروجين تتجاوز الحدود المسموح بها خاصة في فترات الذروة.', attachments: [] }
      ],
      sickLeavePeriods: [
        { id: 'sl100', from: '2025-01-10', to: '2025-02-09', days: 30, status: 'بانتظار الاعتماد', addedBy: 'مريم بنت سيف الكيومية', addedDate: '2025-01-19', note: 'فترة إجازة مقترحة بناءً على توصية الطبيب' }
      ],
      timeline: [
        { action: 'تم تقديم الطلب', actor: 'علي بن سعيد المحرمي', role: 'المؤمن عليه', time: '2025-01-05 09:00', fromStatus: '', toStatus: 'بانتظار التحقيق', note: '', type: 'default' },
        { action: 'اعتماد ورفع لقسم الإجازات', actor: 'أحمد بن سليم المعمري', role: 'رئيس قسم التحقيق في الأمراض المهنية', time: '2025-01-17 10:00', fromStatus: 'بانتظار اعتماد رئيس القسم', toStatus: 'قيد المراجعة في الإجازات المرضية', note: '', type: 'success' },
        { action: 'رفع فترة إجازة للاعتماد', actor: 'مريم بنت سيف الكيومية', role: 'موظف قسم الإجازات المرضية', time: '2025-01-19 14:00', fromStatus: 'قيد المراجعة', toStatus: 'بانتظار اعتماد رئيس قسم الإجازات المرضية', note: '', type: 'success' }
      ],
      assignedTo: 'حمد بن عيسى الغافري',
      checkedOutBy: 'حمد بن عيسى الغافري',
    },
    {
      id: 'WI-2025-001605',
      type: 'مرض مهني',
      subtype: 'التهاب الرئة (سيليكوزيس)',
      status: 'بانتظار اعتماد رئيس قسم التحقيق في الأمراض المهنية',
      submitDate: '2025-01-10',
      lastUpdate: '2025-01-20 15:00',
      applicant: { name: 'سعيد بن أحمد الوهيبي', civil: '9112233445', role: 'المؤمن عليه', phone: '96891122335', email: 'saeed.w@mail.com' },
      insured: { name: 'سعيد بن أحمد الوهيبي', civil: '9112233445', insurance: 'IN-20050011223', dob: '1970-05-15', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2005-01-01', subType: 'إلزامي' },
      employer: { name: 'شركة عُمان للمحاجر والكسارات', cr: '2233441', establishment: 'EST-0011225', jobTitle: 'عامل تكسير أحجار', joinDate: '2005-01-01', location: 'عبري' },
      injury: { description: 'التعرض لغبار السليكا لفترات طويلة تتجاوز 15 سنة في المحاجر.', firstSuspicion: '2024-11-01', chemicalAgents: 'غبار السليكا (Silica Dust)', exposureDuration: '19 سنة' },
      investigation: { summary: 'تمت مراجعة الفحوصات الدورية في مستشفى عبري والاطلاع على سجلات مكان العمل.', findings: 'تجاوز مستويات الغبار المسموح بها وعدم كفاية أدوات السلامة (الكمامات).', employeeRecommendation: 'موافقة', employeeNotes: 'نوصي بالاعتماد لصرف البدلات والحجز الطبي.' },
      timeline: [
        { action: 'رفع التقرير للاعتماد', actor: 'فاطمة بنت حمد الحجرية', role: 'موظف قسم التحقيق', time: '2025-01-20 15:00', fromStatus: 'قيد التحقيق', toStatus: 'بانتظار اعتماد رئيس قسم التحقيق في الأمراض المهنية', note: '', type: 'success' }
      ],
      assignedTo: 'أحمد بن سليم المعمري',
    },
    {
      id: 'WI-2025-001301',
      type: 'إصابة عمل',
      subtype: 'إجهاد وإرهاق',
      isRelapse: 'لا',
      status: 'تم إعادة الطلب لاستيفاء البيانات',
      submitDate: '2025-01-18',
      lastUpdate: '2025-01-19 15:30',
      applicant: { name: 'راشد بن محمد الجابري', civil: '9067890123', role: 'العامل / المؤمن عليه / المواطن', phone: '96894321098', email: 'rashid.j@email.com' },
      insured: { name: 'راشد بن محمد الجابري', civil: '9067890123', insurance: 'IN-20180090123', dob: '1983-04-25', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2018-11-01', subType: 'إلزامي' },
      employer: { name: 'بنك التنمية العُماني', cr: '6789012', establishment: 'EST-0098765', jobTitle: 'مدير فرع', joinDate: '2018-11-01', location: 'نزوى' },
      injury: {
        caseType: 'الإنهاك والإجهاد المهني',
        description: 'إرهاق شديد وضغط نفسي مزمن ناجم عن العمل لساعات طويلة تتجاوز 14 ساعة يومياً دون إجازات كافية.',
        chemicalAgents: 'لا يوجد',
        exposureDuration: '3 سنوات',
        firstSuspicion: '2025-01-10',
        workEnvironment: 'بيئة عمل مكتبية عالية الضغط مع نوبات عمل ممتدة'
      },
      attachments: [],
      notes: [
        { id: 'n2', author: 'عائشة بنت محمد الرواحي', role: 'موظف قسم التحقيق في إصابات العمل', text: 'يرجى تقديم: تقرير طبي من طبيب متخصص، كشف الساعات الإضافية خلال الأشهر الثلاثة الماضية، شهادة المشرف المباشر.', time: '2025-01-19 15:30' }
      ],
      investigation: null,
      fieldVisits: [],
      sickLeavePeriods: [],
      referral: null,
      session: null,
      committeeDecision: null,
      disbursement: null,
      returnReason: 'المستندات المطلوبة: (1) تقرير طبي من طبيب متخصص في الأمراض المهنية، (2) كشف ساعات العمل الإضافية للأشهر الثلاثة الأخيرة، (3) شهادة من المشرف المباشر توضح طبيعة العمل وحجم المسؤوليات.',
      timeline: [
        { action: 'تم تقديم الطلب', actor: 'راشد بن محمد الجابري', role: 'العامل', time: '2025-01-18 16:00', fromStatus: '', toStatus: 'تم تقديم الطلب', note: '', type: 'default' },
        { action: 'إعادة الطلب لاستيفاء البيانات', actor: 'عائشة بنت محمد الرواحي', role: 'موظف قسم التحقيق في إصابات العمل', time: '2025-01-19 15:30', fromStatus: 'قيد التحقيق — إصابات العمل', toStatus: 'تم إعادة الطلب لاستيفاء البيانات', note: 'يرجى تقديم المستندات المحددة أعلاه', type: 'warning' },
      ],
      assignedTo: 'عائشة بنت محمد الرواحي',
      checkedOutBy: null,
    },
    {
      id: 'WI-2024-000850',
      type: 'إصابة عمل',
      subtype: 'إصابة في موقع العمل',
      isRelapse: 'لا',
      status: 'تم رفض الطلب',
      submitDate: '2024-09-15',
      lastUpdate: '2024-10-10 11:30',
      notificationDate: '2024-10-12',
      applicant: { name: 'سالم بن ناصر الحارثي', civil: '9012345678', role: 'العامل / المؤمن عليه / المواطن', phone: '96898765432', email: 'salem.h@gmail.com' },
      insured: { name: 'سالم بن ناصر الحارثي', civil: '9012345678', insurance: 'IN-20190045678', dob: '1985-06-15', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2019-03-01', subType: 'إلزامي' },
      employer: { name: 'مجموعة النور للإنشاءات ش.م.م', cr: '1234567', establishment: 'EST-0087654', jobTitle: 'مهندس مدني', joinDate: '2019-03-01', location: 'مسقط — الخوض' },
      injury: { description: 'إصابة طفيفة أثناء العمل.', location: 'موقع العمل', bodyPart: 'اليد', witnesses: 'لا', incidentDate: '2024-09-14' },
      attachments: [],
      notes: [],
      investigation: { summary: 'عدم توفر أدلة كافية.', findings: 'لا توجد تقارير طبية كافية تثبت الإصابة.', employeeRecommendation: 'رفض', employeeNotes: '', headNotes: 'تم الرفض لعدم الاكتمال.', headDecision: 'تم رفض الطلب' },
      fieldVisits: [],
      sickLeavePeriods: [],
      referral: null,
      session: null,
      committeeDecision: null,
      disbursement: null,
      timeline: [
        { action: 'تم تقديم الطلب', actor: 'سالم بن ناصر الحارثي', role: 'العامل', time: '2024-09-15 10:00', fromStatus: '', toStatus: 'تم تقديم الطلب', note: '', type: 'default' },
        { action: 'رفض الطلب', actor: 'يوسف بن علي الشيباني', role: 'رئيس قسم التحقيق في إصابات العمل', time: '2024-10-10 11:30', fromStatus: 'قيد التحقيق', toStatus: 'تم رفض الطلب', note: 'السبب: عدم استيفاء المستندات الطبية المطلوبة', type: 'danger' },
      ],
      assignedTo: null,
      checkedOutBy: null,
    },
    {
      id: 'WI-2025-001700',
      type: 'إصابة عمل',
      subtype: 'إصابة في موقع العمل',
      status: 'قيد المراجعة من موظف قسم الإجازات المرضية',
      submitDate: '2025-01-12',
      lastUpdate: '2025-01-18 09:00',
      applicant: { name: 'فيصل بن يحيى الراشدي', civil: '9011223344', role: 'العامل / المؤمن عليه / المواطن', phone: '96891122334', email: 'faisal.r@logistics.om' },
      insured: { name: 'فيصل بن يحيى الراشدي', civil: '9011223344', insurance: 'IN-20140055667', dob: '1980-01-01', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2014-03-15', subType: 'إلزامي' },
      employer: { name: 'الشركة العصرية للخدمات اللوجستية', cr: '4455667', establishment: 'EST-0055443', jobTitle: 'سائق رافعة شوكية', joinDate: '2014-03-15', location: 'مسقط — المسفاة' },
      injury: {
        description: 'سقوط طرد ثقيل على القدم مما أدى لكسر في المشط أثناء تفريغ الحاوية.',
        location: 'مستودع الشركة — رصيف رقم 2',
        bodyPart: 'القدم اليمنى',
        witnesses: 'نعم',
        witnessNames: 'سعيد الجابري',
        incidentDate: '2025-01-11'
      },
      attachments: [
        { id: 'attSL1', type: 'تقرير طبي', name: 'تقرير_المستشفى_السلطاني.pdf', uploadDate: '2025-01-12', uploadedBy: 'فيصل بن يحيى الراشدي', role: 'العامل', size: '1.2 MB', icon: 'pdf' }
      ],
      notes: [],
      investigation: {
        summary: 'الحادث وقع أثناء العمل الرسمي. تم التحقق من الكشوفات الطبية وإفادة الشهود.',
        findings: 'إصابة عمل مؤكدة تستدعي بدلات انقطاع.',
        employeeRecommendation: 'موافقة',
        headDecision: 'اعتماد وتوجيه إلى قسم الإجازات المرضية'
      },
      fieldVisits: [],
      sickLeavePeriods: [],
      timeline: [
        { action: 'تم تقديم الطلب', actor: 'فيصل بن يحيى الراشدي', role: 'العامل', time: '2025-01-12 08:00', fromStatus: '', toStatus: 'بانتظار التحقيق', note: '', type: 'default' },
        { action: 'اعتماد وتوجيه لقسم الإجازات المرضية', actor: 'يوسف بن علي الشيباني', role: 'رئيس قسم التحقيق في إصابات العمل', time: '2025-01-18 09:00', fromStatus: 'بانتظار اعتماد رئيس القسم', toStatus: 'قيد المراجعة من موظف قسم الإجازات المرضية', note: '', type: 'success' }
      ],
      assignedTo: 'مريم بنت سيف الكيومية',
      checkedOutBy: 'مريم بنت سيف الكيومية',
    },
  ],

  /* ── طلبات منفعة الإعاقة ── */
  disability: [
    {
      id: 'DIS-2025-000234',
      status: 'تم تقديم طلب منفعة الأشخاص ذوي الإعاقة — بانتظار مراجعة موظف قسم الإعاقة والأمراض المستديمة',
      submitDate: '2025-01-15',
      lastUpdate: '2025-01-15 11:00',
      applicant: { name: 'خلود بنت سعيد الرواسية', civil: '9078901234', phone: '96893210987', email: 'kholoud.r@mail.com', role: 'المواطن' },
      card: { number: 'DIS-CARD-0056789', status: 'سارية', activationDate: '2022-03-10', expiryDate: '2027-03-09', typeSD: 'إعاقة حركية — الأطراف السفلية', typeMOH: 'قصور حركي درجة ثانية', provenDate: '2022-02-01', lastCheck: '2025-01-01' },
      insurance: { status: 'نشط', regDate: '2020-01-15', subType: 'إلزامي', otherBenefits: 'لا يوجد' },
      attachments: [
        { id: 'datt1', type: 'صورة بطاقة الإعاقة', name: 'بطاقة_الاعاقة.pdf', uploadDate: '2025-01-15', uploadedBy: 'خلود الرواسية', role: 'العامل', size: '0.8 MB', icon: 'pdf' },
        { id: 'datt2', type: 'تقرير طبي', name: 'تقرير_طبي_حديث.pdf', uploadDate: '2025-01-15', uploadedBy: 'خلود الرواسية', role: 'العامل', size: '1.3 MB', icon: 'pdf' },
      ],
      notes: [],
      disbursement: null,
      timeline: [
        { action: 'تم تقديم الطلب', actor: 'خلود بنت سعيد الرواسية', role: 'العامل', time: '2025-01-15 11:00', fromStatus: '', toStatus: 'تم تقديم طلب منفعة الأشخاص ذوي الإعاقة', note: '', type: 'default' },
      ],
      assignedTo: 'نورة بنت سالم الزدجالية',
      checkedOutBy: 'نورة بنت سالم الزدجالية',
    },
    {
      id: 'DIS-2024-000198',
      status: 'تم اعتماد الطلب — الصرف جارٍ',
      submitDate: '2024-08-20',
      lastUpdate: '2024-09-10 10:00',
      applicant: { name: 'عبدالله بن حمود الهاشمي', civil: '9089012345', phone: '96892109876', email: 'abdullah.h@mail.com' },
      card: { number: 'DIS-CARD-0045678', status: 'سارية', activationDate: '2020-06-15', expiryDate: '2025-06-14', typeSD: 'إعاقة بصرية جزئية', typeMOH: 'ضعف بصري درجة أولى', provenDate: '2020-05-01' },
      insurance: { status: 'نشط', regDate: '2018-06-01', subType: 'إلزامي', otherBenefits: 'لا يوجد' },
      attachments: [
        { id: 'datt3', type: 'صورة بطاقة الإعاقة', name: 'بطاقة_هاشمي.pdf', uploadDate: '2024-08-20', uploadedBy: 'عبدالله الهاشمي', role: 'العامل', size: '0.7 MB', icon: 'pdf' },
      ],
      notes: [],
      disbursement: { approved: true, approvalDate: '2024-09-10', monthlyDay: 18, status: 'الصرف جارٍ', expiryDate: '2025-06-14', stopReason: null, lastCheck: '2025-01-18' },
      timeline: [
        { action: 'تم تقديم الطلب', actor: 'عبدالله بن حمود الهاشمي', role: 'العامل', time: '2024-08-20 09:00', fromStatus: '', toStatus: 'تم تقديم طلب منفعة الأشخاص ذوي الإعاقة', note: '', type: 'default' },
        { action: 'اعتماد الطلب', actor: 'بدر بن خميس العبري', role: 'رئيس قسم الإعاقة والأمراض المستديمة', time: '2024-09-10 10:00', fromStatus: 'بانتظار اعتماد رئيس القسم', toStatus: 'تم اعتماد الطلب — الصرف جارٍ', note: 'تم التحقق من صحة البطاقة وسريانها', type: 'success' },
      ],
      assignedTo: 'نورة بنت سالم الزدجالية',
      checkedOutBy: 'نورة بنت سالم الزدجالية',
    },
    {
      id: 'DIS-2025-000235',
      status: 'بانتظار اعتماد رئيس قسم الإعاقة والأمراض المستديمة',
      submitDate: '2025-01-05',
      lastUpdate: '2025-01-18 10:30',
      applicant: { name: 'منى بنت أحمد البلوشية', civil: '9012233446', phone: '96891223349', email: 'mona.b@mail.com' },
      card: { number: 'DIS-CARD-0011223', status: 'سارية', activationDate: '2023-01-01', expiryDate: '2028-01-01', typeSD: 'إعاقة سمعية تامة', typeMOH: 'فقدان سمع كلي', provenDate: '2022-12-15' },
      insurance: { status: 'نشط', regDate: '2015-05-01', subType: 'إلزامي', otherBenefits: 'لا يوجد' },
      attachments: [],
      notes: [],
      timeline: [
        { action: 'توصية بالموافقة والرفع للاعتماد', actor: 'نورة بنت سالم الزدجالية', role: 'موظف قسم الإعاقة', time: '2025-01-18 10:30', fromStatus: 'قيد المراجعة', toStatus: 'بانتظار اعتماد رئيس قسم الإعاقة والأمراض المستديمة', note: 'مستوفية للشروط', type: 'success' }
      ],
      assignedTo: 'بدر بن خميس العبري',
      checkedOutBy: 'بدر بن خميس العبري',
    },
  ],

  /* ── تشخيصات الأمراض المستديمة الواردة ── */
  chronicIncoming: [
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
    },
  ],

  /* ── التظلمات ── */
  appeals: [
    {
      id: 'APP-2025-000067',
      originalRequestId: 'WI-2024-000987',
      originalRequestType: 'بدلات انقطاع عن العمل',
      status: 'تم تقديم طلب التظلم — بانتظار مراجعة موظف قسم اللجان الطبية',
      submitDate: '2025-01-10',
      lastUpdate: '2025-01-10 14:30',
      applicant: { name: 'ليلى بنت سيف الحوسنية', civil: '9056789012', role: 'العامل / المؤمن عليه / المواطن' },
      decision: { type: 'رفض', date: '2024-11-15', issuer: 'رئيس قسم التحقيق في إصابات العمل', details: 'رُفض الطلب لعدم استيفاء شروط إصابة العمل — غياب الأدلة الكافية وعدم وجود شهود.', knowledgeDate: '2024-11-20' },
      appealReason: 'القرار مخالف للأنظمة',
      appealDetails: 'لم يُؤخذ بعين الاعتبار شهادة المشرف المباشر الذي أكد وقوع الحادثة أثناء العمل. أرفق شهادة المشرف وتقريراً طبياً مفصلاً.',
      additionalNotes: '',
      attachments: [
        { id: 'aatt1', type: 'مستند داعم', name: 'شهادة_المشرف.pdf', uploadDate: '2025-01-10', uploadedBy: 'ليلى الحوسنية', role: 'العامل', size: '0.6 MB', icon: 'pdf' },
        { id: 'aatt2', type: 'تقرير طبي', name: 'تقرير_طبي_مفصل.pdf', uploadDate: '2025-01-10', uploadedBy: 'ليلى الحوسنية', role: 'العامل', size: '1.8 MB', icon: 'pdf' },
      ],
      notes: [],
      session: null,
      finalDecision: null,
      timeline: [
        { action: 'تم تقديم التظلم', actor: 'ليلى بنت سيف الحوسنية', role: 'العامل', time: '2025-01-10 14:30', fromStatus: '', toStatus: 'تم تقديم طلب التظلم', note: '', type: 'default' },
      ],
      assignedTo: 'سعاد بنت أحمد الريامية',
      checkedOutBy: 'سعاد بنت أحمد الريامية',
    },
    {
      id: 'APP-2025-000068',
      originalRequestId: 'WI-2025-001090',
      originalRequestType: 'بدلات انقطاع عن العمل',
      status: 'بانتظار اعتماد رئيس قسم اللجان الطبية',
      submitDate: '2025-01-15',
      lastUpdate: '2025-01-20 12:00',
      applicant: { name: 'خالد بن عيسى المعمري', civil: '9022334455', role: 'المؤمن عليه' },
      decision: {
        type: 'اعتراض على الإحالة',
        date: '2025-01-14',
        issuer: 'موظف قسم اللجان الطبية',
        details: 'أوصى الموظف بإحالة الحالة إلى مؤسسة صحية مرخصة لتحديد نسبة العجز الدائم، مع اعتماد ملف الفحوصات العينية والتقارير التخصصية.',
        knowledgeDate: '2025-01-15'
      },
      appealReason: 'القرار يحتاج مراجعة طبية أدق',
      appealDetails: 'يرى مقدم التظلم أن التقرير المرفوع يحتاج إلى عرض الحالة على مؤسسة صحية ذات تخصص دقيق في إصابات الوجه والعيون قبل اعتماد مسار اللجنة، وأرفق تقريراً إضافياً من استشاري العيون.',
      additionalNotes: 'الحالة مرتبطة بطلب أصلي جسيم وتحتاج قراراً سريعاً قبل تثبيت الجلسة.',
      attachments: [
        { id: 'aatt68-1', type: 'تقرير طبي تخصصي', name: 'تقرير_استشاري_العيون.pdf', uploadDate: '2025-01-15', uploadedBy: 'خالد بن عيسى المعمري', role: 'المؤمن عليه', size: '1.4 MB', icon: 'pdf' },
        { id: 'aatt68-2', type: 'خطاب تظلم', name: 'خطاب_التظلم_الطبي.pdf', uploadDate: '2025-01-15', uploadedBy: 'خالد بن عيسى المعمري', role: 'المؤمن عليه', size: '0.3 MB', icon: 'pdf' },
      ],
      notes: [
        { id: 'app68-n1', author: 'سعاد بنت أحمد الريامية', role: 'موظف قسم اللجان الطبية', text: 'تمت مراجعة مستندات التظلم ورفع التوصية إلى رئيس القسم لاعتماد المسار المناسب للحالة.', time: '2025-01-19 15:10' },
      ],
      session: null,
      finalDecision: null,
      timeline: [
        { action: 'تم تقديم التظلم', actor: 'خالد بن عيسى المعمري', role: 'المؤمن عليه', time: '2025-01-15 09:30', fromStatus: '', toStatus: 'تم تقديم طلب التظلم — بانتظار مراجعة موظف قسم اللجان الطبية', note: '', type: 'default' },
        { action: 'رفع التوصية إلى رئيس القسم', actor: 'سعاد بنت أحمد الريامية', role: 'موظف قسم اللجان الطبية', time: '2025-01-19 15:15', fromStatus: 'تم تقديم طلب التظلم — بانتظار مراجعة موظف قسم اللجان الطبية', toStatus: 'بانتظار اعتماد رئيس قسم اللجان الطبية', note: 'التوصية: اعتماد التظلم وإعادة تقييم المسار الطبي', type: 'success' },
      ],
      assignedTo: 'محمد بن راشد الهنائي',
      checkedOutBy: 'محمد بن راشد الهنائي',
    },
  ],

  /* ── طلبات الترخيص ── */
  licensing: [
    {
      id: 'LIC-2025-001605',
      requestType: 'جديد',
      status: 'مسودة',
      submitDate: '2025-01-21',
      lastUpdate: '2025-01-21 09:15',
      delegate: { name: 'ناصر بن راشد الحارثي', civil: '9077001122', role: 'المفوض عن المستشفى', phone: '96897700112', email: 'nasser.h@royalcare.om' },
      institution: { name: 'مستشفى رويال كير التخصصي', cr: '7788991', crStatus: 'سارٍ', crExpiry: '2026-12-31', type: 'مستشفى خاص', address: 'مسقط — الغبرة', governorate: 'مسقط — ولاية بوشر', phone: '96824445566', email: 'info@royalcare.om', currentLicenseNo: null },
      doctors: [
        { name: 'د. سامي بن خميس العجمي', civil: '9019988771', specialty: 'جراحة عامة', role: 'رئيس', confirmStatus: 'بانتظار التأكيد', duplicateCheck: 'لا يوجد تعارض' },
        { name: 'د. هناء بنت راشد الهنائية', civil: '9019988772', specialty: 'طب باطني', role: 'نائب رئيس', confirmStatus: 'تم التأكيد', duplicateCheck: 'لا يوجد تعارض' },
        { name: 'د. مروان بن سالم الجهضمي', civil: '9019988773', specialty: 'جراحة عظام', role: 'عضو', confirmStatus: 'بانتظار التأكيد', duplicateCheck: 'لا يوجد تعارض' },
      ],
      verification: { totalDoctors: 3, confirmedDoctors: 1, minMet: false },
      attachments: [
        { id: 'lic165-att1', type: 'السجل التجاري', name: 'السجل_التجاري.pdf', uploadDate: '2025-01-21', uploadedBy: 'ناصر بن راشد الحارثي', role: 'المفوض عن المستشفى', size: '0.7 MB', icon: 'pdf' },
        { id: 'lic165-att2', type: 'عقد الإيجار', name: 'عقد_الإيجار.pdf', uploadDate: '2025-01-21', uploadedBy: 'ناصر بن راشد الحارثي', role: 'المفوض عن المستشفى', size: '0.9 MB', icon: 'pdf' },
      ],
      notes: [
        { id: 'lic165-note1', author: 'ناصر بن راشد الحارثي', role: 'المفوض عن المستشفى', text: 'تم حفظ الطلب كمسودة لحين استكمال تأكيد جميع الأطباء وإرفاق بقية المستندات.', time: '2025-01-21 09:15' },
      ],
      session: null,
      committeeDecision: null,
      activeLicense: null,
      timeline: [
        { action: 'إنشاء الطلب كمسودة', actor: 'ناصر بن راشد الحارثي', role: 'المفوض عن المستشفى', time: '2025-01-21 09:15', fromStatus: '', toStatus: 'مسودة', note: 'تم حفظ الطلب قبل الإرسال النهائي', type: 'default' },
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
      delegate: { name: 'فهد بن غانم البدري', civil: '9099988877', role: 'المفوض عن المستشفى', phone: '96899998887', email: 'fahd@badri-clinic.om' },
      institution: { name: 'عيادة البدري الطبية', cr: '5647382', crStatus: 'سارٍ', type: 'عيادة تخصصية', address: 'غلاء', governorate: 'مسقط', phone: '24555666', email: 'contact@badri-clinic.om' },
      doctors: [
        { name: 'د. خالد بن محمود الزدجالي', specialty: 'طب الطوارئ', role: 'رئيس', confirmStatus: 'بانتظار التأكيد' }
      ],
      verification: { totalDoctors: 1, confirmedDoctors: 0, minMet: false },
      attachments: [],
      notes: [],
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
      committeeDecision: { type: 'اعتماد الترخيص', content: 'تم مراجعة طلب مركز مسقط للقلب والتحقق من كفاءة الكادر الطبي. اللجنة توصي بالموافقة النهائية على إصدار الترخيص.', date: '2025-01-15' },
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
      delegate: { name: 'طارق بن ناصر الزدجالي', civil: '9077778888', role: 'المفوض عن المستشفيات', phone: '96897778888', email: 'tariq@noor-hospital.om' },
      institution: { name: 'مستشفى النور التخصصي', cr: '8901234', crStatus: 'سارٍ', crExpiry: '2027-05-31', type: 'مستشفى خاص', address: 'شارع قابوس — مسقط', governorate: 'مسقط — ولاية بوشر', phone: '96824678901', email: 'info@noor-hospital.om', currentLicenseNo: 'LIC-INST-2022-0045' },
      doctors: [
        { name: 'د. سيف بن حمد المسكري', civil: '9055566677', specialty: 'جراحة العظام', role: 'رئيس', confirmStatus: 'تم التأكيد', duplicateCheck: 'لا يوجد تعارض' },
        { name: 'د. هند بنت علي الحارثية', civil: '9066677788', specialty: 'طب الأمراض المهنية', role: 'نائب رئيس', confirmStatus: 'تم التأكيد', duplicateCheck: 'لا يوجد تعارض' },
        { name: 'د. أسامة بن سالم الغيلاني', civil: '9077788899', specialty: 'الطب الباطني', role: 'عضو', confirmStatus: 'تم التأكيد', duplicateCheck: 'لا يوجد تعارض' },
        { name: 'د. لميس بنت خميس الرئيسية', civil: '9088899900', specialty: 'إعادة التأهيل', role: 'عضو', confirmStatus: 'تم التأكيد', duplicateCheck: 'لا يوجد تعارض' },
        { name: 'د. وائل بن صالح الحوسني', civil: '9099900011', specialty: 'الطب النفسي المهني', role: 'عضو', confirmStatus: 'تم التأكيد', duplicateCheck: 'لا يوجد تعارض' },
      ],
      verification: { totalDoctors: 5, confirmedDoctors: 5, minMet: true, duplicates: [] },
      attachments: [],
      notes: [],
      session: { id: 'SES-2024-0089', date: '2024-08-10', time: '10:00', members: [], quorum: true },
      committeeDecision: { type: 'اعتماد الترخيص', content: 'استوفت المؤسسة جميع الاشتراطات — 5 أطباء مؤكدون جميعهم بدون تعارض', date: '2024-08-10', signatories: [] },
      activeLicense: { number: 'LIC-INST-2024-0067', issueDate: '2024-08-15', expiryDate: '2027-08-14', months: 36 },
      timeline: [
        { action: 'تقديم طلب التجديد', actor: 'طارق بن ناصر الزدجالي', role: 'المفوض عن المستشفى', time: '2024-06-01 09:00', fromStatus: '', toStatus: 'تم تقديم طلب الترخيص', note: '', type: 'default' },
        { action: 'اعتماد وإصدار الترخيص', actor: 'طالب بن سعيد الحنبلي', role: 'رئيس قسم التراخيص والرقابة', time: '2024-08-15 09:00', fromStatus: 'تم اتخاذ القرار من اللجنة الطبية الإشرافية', toStatus: 'تم اعتماد الترخيص — الترخيص نشط', note: 'صدر الترخيص رقم LIC-INST-2024-0067', type: 'success' },
      ],
      assignedTo: null,
      checkedOutBy: null,
    }
  ],

  /* ── الجلسات ── */
  sessions: [
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
  ],

  /* ── مؤشرات لوحات البيانات ── */
  dashboardStats: {
    'injury-investigator': [
      { label: 'الطلبات الجديدة في انتظار التحقيق', value: 7, type: 'p' },
      { label: 'الطلبات التي حجزتها (Check-out)', value: 3, type: 'i' },
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
    'committees-employee': [
      { label: 'طلبات عرض واردة جديدة', value: 4, type: 'p' },
      { label: 'حالات محالة للمؤسسات الصحية', value: 11, type: 'i' },
      { label: 'تظلمات قيد المراجعة', value: 3, type: 'pu' },
      { label: 'جلسات مجدولة هذا الأسبوع', value: 2, type: 's' },
    ],
    'licensing-employee': [
      { label: 'طلبات ترخيص جديدة', value: 3, type: 'p' },
      { label: 'طلبات تجديد', value: 5, type: 'i' },
      { label: 'تراخيص منتهية قريباً (30 يوم)', value: 2, type: 'w' },
      { label: 'زيارات رقابية مجدولة', value: 4, type: 's' },
    ],
    'licensing-head': [
      { label: 'طلبات بانتظار الاعتماد', value: 4, type: 'p' },
      { label: 'تراخيص صادرة هذا الشهر', value: 12, type: 's' },
      { label: 'زيارات تفتيشية معلقة', value: 5, type: 'w' },
      { label: 'نسبة الالتزام بالمعايير', value: '92%', type: 'i' },
    ],
    'od-investigator': [
      { label: 'طلبات أمراض مهنية جديدة', value: 5, type: 'p' },
      { label: 'طلبات قيد التحقيق (محجوزة)', value: 2, type: 'i' },
      { label: 'مراجعات طبية مجدولة', value: 4, type: 's' },
      { label: 'طلبات بانتظار استيفاء بيانات', value: 2, type: 'w' },
    ],
    'od-head': [
      { label: 'بانتظار اعتمادي (أمراض مهنية)', value: 3, type: 'p' },
      { label: 'إجمالي الحالات المعتمدة هذا الشهر', value: 12, type: 's' },
      { label: 'حالات محالة للجان الطبية', value: 4, type: 'pu' },
      { label: 'مؤشرات الأداء (متوسط الإنجاز)', value: '85%', type: 'i' },
    ],
    'committees-head': [
      { label: 'تظلمات بانتظار المراجعة', value: 7, type: 'p' },
      { label: 'قرارات لجان بانتظار التوقيع', value: 3, type: 'w' },
      { label: 'جلسات مكتملة هذا الأسبوع', value: 6, type: 's' },
      { label: 'طلبات عرض واردة (جديد)', value: 4, type: 'i' },
    ],
    'disability-head': [
      { label: 'طلبات منفعة جديدة للاعتماد', value: 8, type: 'p' },
      { label: 'حالات تم البت فيها (شهر)', value: 24, type: 's' },
      { label: 'إعادة تقييم تحت المراجعة', value: 6, type: 'i' },
      { label: 'شكاوى متأخرة', value: 2, type: 'w' },
    ],
    'institution-rapporteur': [
      { label: 'الجلسات المجدولة هذا الشهر', value: 3, type: 'p' },
      { label: 'حالات بانتظار إدخال القرار', value: 4, type: 'i' },
      { label: 'قرارات بانتظار التوقيع', value: 2, type: 'w' },
      { label: 'جلسات أُغلقت هذا الشهر', value: 5, type: 's' },
    ],
  }
};

/* Data hygiene for prototype consistency across roles */
(function normalizePrototypeData() {
  const applicantFallbackPhone = '96890000000';
  const applicantFallbackEmail = 'noreply@spf-proto.om';
  const applicantFallbackRegion = 'محافظة مسقط';
  const applicantFallbackWilayat = 'بوشر';
  const applicantFallbackCountry = 'سلطنة عُمان';
  const civilExpiryFallback = '2030-12-31';
  const collections = [WI_DATA.allowances, WI_DATA.disability, WI_DATA.appeals, WI_DATA.licensing];
  const deriveSecondaryPhone = (phone, fallbackSuffix) => {
    const digits = String(phone || '').replace(/\D/g, '');
    if (digits.length < 8) return applicantFallbackPhone;
    const last = Number(digits.slice(-1));
    if (Number.isNaN(last)) return applicantFallbackPhone;
    return `${digits.slice(0, -1)}${(last + fallbackSuffix) % 10}`;
  };

  collections.forEach((list) => {
    (list || []).forEach((item) => {
      if (!item || !item.applicant) return;
      if (!item.applicant.phone) item.applicant.phone = applicantFallbackPhone;
      if (!item.applicant.phoneAlt1) item.applicant.phoneAlt1 = item.applicant.phone;
      if (!item.applicant.phoneAlt2) item.applicant.phoneAlt2 = deriveSecondaryPhone(item.applicant.phone, 3);
      if (!item.applicant.email) item.applicant.email = applicantFallbackEmail;
      if (!item.applicant.region) item.applicant.region = applicantFallbackRegion;
      if (!item.applicant.wilayat) item.applicant.wilayat = applicantFallbackWilayat;
      if (!item.applicant.country) item.applicant.country = applicantFallbackCountry;
      if (!item.applicant.civilExpiry) item.applicant.civilExpiry = civilExpiryFallback;

      if (item.insured) {
        if (!item.insured.phone) item.insured.phone = item.applicant.phone;
        if (!item.insured.email) item.insured.email = item.applicant.email;
        if (!item.insured.civilExpiry) item.insured.civilExpiry = civilExpiryFallback;
      }

      if (item.employer) {
        if (!item.employer.establishment) item.employer.establishment = 'EST-0000000';
      }

      if (item.investigation) {
        if (!item.investigation.employeeNotes && item.notes?.length) {
          item.investigation.employeeNotes = item.notes[0].text || 'تمت المراجعة من الموظف المختص.';
        }
        if (!item.investigation.record && item.investigation.summary) {
          item.investigation.record = 'محضر التحقيق محفوظ ضمن ملف الطلب.';
        }
      }
    });
  });

  (WI_DATA.dashboardStats?.['injury-investigator'] || []).forEach((stat) => {
    if (typeof stat.label !== 'string') return;
    stat.label = stat.label.replace('من الرئيس', 'من رئيس القسم');
  });

  // Ensure base user profiles always carry contact/address fields used by readonly request forms.
  Object.values(WI_DATA.users || {}).forEach((user) => {
    if (!user || typeof user !== 'object') return;
    if (!user.phone) user.phone = applicantFallbackPhone;
    if (!user.email) user.email = applicantFallbackEmail;
    if (!user.region) user.region = applicantFallbackRegion;
    if (!user.wilayat) user.wilayat = applicantFallbackWilayat;
    if (!user.country) user.country = applicantFallbackCountry;
    if (!user.civilExpiry) user.civilExpiry = civilExpiryFallback;
  });
})();
