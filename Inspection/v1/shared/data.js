/* ================================================================
   data.js — بيانات نموذجية لنظام إدارة التفتيش
   ================================================================
   أكواد الخدمات في الأرقام المرجعية (YYYY-SC-XXXXXX):
     01 = بلاغ         02 = تظلم
     03 = زيارة دورية  04 = زيارة مفاجئة
     05 = زيارة مجدولة 06 = حالة حظر
     07 = خطة تفتيش
   ================================================================ */

const INSP_DATA = {

  users: {
    'fund-staff':           { name: 'منى راشد البلوشي',       civil: '09123456', phone: '96890012345', email: 'mona.b@spf.gov.om',        dept: 'الصندوق' },
    'employer':             { name: 'طارق سعيد الكلباني',     civil: '08234567', phone: '96891023456', email: 'tariq.k@ntc.com.om',         dept: 'شركة التقنية الوطنية' },
    'insured':              { name: 'أسماء محمد الحارثي',     civil: '07345678', phone: '96892034567', email: 'asmaa.h@gmail.com',           dept: 'مصنع الإنتاج الغذائي الخليجي' },
    'monitoring-employee':  { name: 'سيف خلفان الأمري',       civil: '06456789', phone: '96893045678', email: 'saif.a@spf.gov.om',          dept: 'قسم المتابعة والبلاغات' },
    'monitoring-head':      { name: 'نجلاء عبدالله القاسمي',  civil: '05567890', phone: '96894056789', email: 'najla.q@spf.gov.om',         dept: 'قسم المتابعة والبلاغات' },
    'field-inspector':      { name: 'حاتم سالم الزدجالي',     civil: '04678901', phone: '96895067890', email: 'hatem.z@spf.gov.om',         dept: 'قسم التفتيش الميداني' },
    'field-head':           { name: 'ريما يوسف النبهانية',    civil: '03789012', phone: '96896078901', email: 'rima.n@spf.gov.om',          dept: 'قسم التفتيش الميداني' },
    'inspection-director':  { name: 'عبدالعزيز هلال الراشدي', civil: '02890123', phone: '96897089012', email: 'abdulaziz.r@spf.gov.om',   dept: 'دائرة التفتيش' },
    'ops-analyst':          { name: 'شيماء وليد البريكي',     civil: '01901234', phone: '96898090123', email: 'shaimaa.b@spf.gov.om',       dept: 'دائرة التفتيش — التحليل' },
  },

  employers: [
    {
      id: 'EMP-001',
      name: 'شركة التقنية الوطنية',
      crn: '1234567890',
      sector: 'تقنية المعلومات والاتصالات',
      employees: 450,
      location: 'مسقط — منطقة القرم',
      registrationDate: '2015-03-10',
      status: 'نشطة',
      riskLevel: 'منخفض',
      lastVisit: '2024-11-15',
      complianceScore: 92,
      contributions: { status: 'منتظم', lastPaid: '2025-01-01', arrears: 0 },
      violations: [],
      contributionHistory: [
        { month: 'يوليو 2024',    status: 'منتظم', amount: '18,720 ر.ع', paidDate: '2024-07-01', workers: 156 },
        { month: 'أغسطس 2024',   status: 'منتظم', amount: '18,720 ر.ع', paidDate: '2024-08-01', workers: 156 },
        { month: 'سبتمبر 2024',  status: 'منتظم', amount: '19,440 ر.ع', paidDate: '2024-09-01', workers: 162 },
        { month: 'أكتوبر 2024',  status: 'منتظم', amount: '19,440 ر.ع', paidDate: '2024-10-01', workers: 162 },
        { month: 'نوفمبر 2024',  status: 'منتظم', amount: '19,440 ر.ع', paidDate: '2024-11-01', workers: 162 },
        { month: 'ديسمبر 2024',  status: 'منتظم', amount: '19,440 ر.ع', paidDate: '2024-12-01', workers: 162 }
      ]
    },
    {
      id: 'EMP-002',
      name: 'مصنع الإنتاج الغذائي الخليجي',
      crn: '9876543210',
      sector: 'التصنيع والإنتاج الغذائي',
      employees: 180,
      location: 'صحار — المنطقة الصناعية',
      registrationDate: '2012-07-22',
      status: 'نشطة',
      riskLevel: 'متوسط',
      lastVisit: '2025-01-12',
      complianceScore: 74,
      contributions: { status: 'متأخر', lastPaid: '2024-09-01', arrears: 8400 },
      violations: [
        { date: '2024-11-25', type: 'غياب معدات الحماية الشخصية (30% من المطلوب)', severity: 'مرتفع', visit: '2025-05-000001', status: 'معلق' },
        { date: '2025-01-12', type: 'عدم تسجيل 12 عاملاً في التأمين الاجتماعي',    severity: 'مرتفع', visit: '2025-03-000002', status: 'معلق' },
        { date: '2025-01-12', type: 'تجاوز ساعات العمل في الوردية الليلية',         severity: 'متوسط', visit: '2025-03-000002', status: 'معلق' },
        { date: '2025-01-12', type: 'غياب سجل إجازات منتظم للعمالة الأجنبية',      severity: 'منخفض', visit: '2025-03-000002', status: 'معلق' },
        { date: '2024-09-01', type: 'عدم سداد اشتراكات التأمين لـ 3 أشهر (8,400 ر.ع)', severity: 'مرتفع', visit: '2025-04-000001', status: 'معلق' }
      ],
      contributionHistory: [
        { month: 'يوليو 2024',    status: 'منتظم',     amount: '2,880 ر.ع', paidDate: '2024-07-01', workers: 180 },
        { month: 'أغسطس 2024',   status: 'منتظم',     amount: '2,880 ر.ع', paidDate: '2024-08-01', workers: 180 },
        { month: 'سبتمبر 2024',  status: 'غير مدفوع', amount: '2,880 ر.ع', paidDate: null,         workers: 180 },
        { month: 'أكتوبر 2024',  status: 'غير مدفوع', amount: '2,880 ر.ع', paidDate: null,         workers: 180 },
        { month: 'نوفمبر 2024',  status: 'غير مدفوع', amount: '2,880 ر.ع', paidDate: null,         workers: 180 },
        { month: 'ديسمبر 2024',  status: 'غير مدفوع', amount: '2,880 ر.ع', paidDate: null,         workers: 180 }
      ]
    },
    {
      id: 'EMP-003',
      name: 'مؤسسة البناء والتشييد المتكاملة',
      crn: '4567891230',
      sector: 'البناء والإنشاء',
      employees: 320,
      location: 'نزوى — المنطقة التجارية',
      registrationDate: '2010-01-15',
      status: 'نشطة',
      riskLevel: 'مرتفع',
      lastVisit: '2025-01-08',
      complianceScore: 58,
      contributions: { status: 'متأخر جزئياً', lastPaid: '2024-11-01', arrears: 2200 },
      violations: [
        { date: '2024-11-20', type: 'مخالفات سلامة جسيمة في مواقع البناء النشطة',       severity: 'مرتفع', visit: '2024-04-000088', status: 'جارٍ معالجته' },
        { date: '2024-11-20', type: 'تأخر في صرف رواتب 12 عاملاً (شهرين)',              severity: 'مرتفع', visit: '2024-04-000088', status: 'منجز' },
        { date: '2024-12-10', type: 'غياب معدات السلامة لـ 45 عاملاً في موقع نزوى',    severity: 'مرتفع', visit: '2024-03-000095', status: 'جارٍ معالجته' },
        { date: '2024-12-10', type: 'عمالة أجنبية غير نظامية — 15 عاملاً',             severity: 'مرتفع', visit: '2024-03-000095', status: 'جارٍ معالجته' },
        { date: '2024-12-10', type: 'عدم صرف رواتب 8 عمال منذ شهرين',                  severity: 'مرتفع', visit: '2024-03-000095', status: 'منجز' }
      ],
      contributionHistory: [
        { month: 'يوليو 2024',    status: 'منتظم',         amount: '5,760 ر.ع', paidDate: '2024-07-01',   workers: 320 },
        { month: 'أغسطس 2024',   status: 'متأخر',         amount: '5,760 ر.ع', paidDate: '2024-09-15',   workers: 320 },
        { month: 'سبتمبر 2024',  status: 'منتظم',         amount: '5,760 ر.ع', paidDate: '2024-09-28',   workers: 320 },
        { month: 'أكتوبر 2024',  status: 'متأخر جزئياً', amount: '5,760 ر.ع', paidDate: '2024-11-20',   workers: 320 },
        { month: 'نوفمبر 2024',  status: 'متأخر جزئياً', amount: '5,760 ر.ع', paidDate: '2025-01-05',   workers: 320 },
        { month: 'ديسمبر 2024',  status: 'غير مدفوع',    amount: '5,760 ر.ع', paidDate: null,           workers: 320 }
      ]
    }
  ],

  workers: [
    {
      id: 'WRK-001',
      name: 'أحمد محمد القحطاني',
      civil: '0912345001',
      nationality: 'عُماني',
      gender: 'ذكر',
      dob: '1990-05-15',
      phone: '96891112233',
      email: 'ahmed.q@ntc.com.om',
      employer: 'شركة التقنية الوطنية',
      employerId: 'EMP-001',
      position: 'مهندس برمجيات',
      department: 'قسم تطوير البرمجيات',
      contractType: 'عقد دائم',
      insuredFrom: '2015-04-01',
      salary: 1200,
      riskLevel: 'متوسط',
      wageProtection: 'منتظم',
      healthInsurance: 'نشط — شركة ضمان للتأمين',
      riskIndicators: [
        { text: 'تغيير صاحب العمل مرتين خلال 6 أشهر (2014–2015)', severity: 'متوسط' }
      ],
      employmentHistory: [
        { employer: 'شركة البرمجيات المتقدمة',  position: 'مطور مبتدئ',    from: '2013-06', to: '2015-03', reason: 'عرض عمل أفضل',  status: 'منتهي' },
        { employer: 'حلول التقنية الرقمية',     position: 'مطور برمجيات',  from: '2014-10', to: '2015-02', reason: 'عقد مؤقت',       status: 'منتهي' },
        { employer: 'شركة التقنية الوطنية',     position: 'مهندس برمجيات', from: '2015-04', to: 'الآن',    reason: null,              status: 'نشط' }
      ],
      insuranceHistory: [
        { month: 'يوليو 2024',    status: 'مدفوع', amount: '120 ر.ع', paidDate: '2024-07-01' },
        { month: 'أغسطس 2024',   status: 'مدفوع', amount: '120 ر.ع', paidDate: '2024-08-01' },
        { month: 'سبتمبر 2024',  status: 'مدفوع', amount: '120 ر.ع', paidDate: '2024-09-01' },
        { month: 'أكتوبر 2024',  status: 'مدفوع', amount: '120 ر.ع', paidDate: '2024-10-01' },
        { month: 'نوفمبر 2024',  status: 'مدفوع', amount: '120 ر.ع', paidDate: '2024-11-01' },
        { month: 'ديسمبر 2024',  status: 'مدفوع', amount: '120 ر.ع', paidDate: '2024-12-01' }
      ]
    },
    {
      id: 'WRK-002',
      name: 'فاطمة خالد العمري',
      civil: '0734567002',
      nationality: 'عُماني',
      gender: 'أنثى',
      dob: '1996-11-30',
      phone: '96892223344',
      email: 'fatima.o@gulf-food.com',
      employer: 'مصنع الإنتاج الغذائي الخليجي',
      employerId: 'EMP-002',
      position: 'عاملة خط إنتاج',
      department: 'قسم التصنيع',
      contractType: 'عقد سنوي متجدد',
      insuredFrom: '2018-09-15',
      salary: 400,
      riskLevel: 'مرتفع',
      wageProtection: 'متأخر — 3 أشهر',
      healthInsurance: 'منتهي الصلاحية — يناير 2025',
      riskIndicators: [
        { text: 'تأخر في صرف الاشتراكات التأمينية لثلاثة أشهر متتالية (أكتوبر–ديسمبر 2024)', severity: 'مرتفع' },
        { text: 'بلاغ سابق مُغلق بشأن ظروف العمل (2025-01-000003)', severity: 'متوسط' },
        { text: 'انتهاء صلاحية التأمين الصحي دون تجديد', severity: 'متوسط' }
      ],
      employmentHistory: [
        { employer: 'مصنع المنتجات الخفيفة للإنتاج', position: 'عاملة إنتاج',     from: '2016-03', to: '2018-08', reason: 'انتهاء العقد', status: 'منتهي' },
        { employer: 'مصنع الإنتاج الغذائي الخليجي',  position: 'عاملة خط إنتاج', from: '2018-09', to: 'الآن',    reason: null,           status: 'نشط' }
      ],
      insuranceHistory: [
        { month: 'يوليو 2024',    status: 'مدفوع',     amount: '40 ر.ع', paidDate: '2024-07-01' },
        { month: 'أغسطس 2024',   status: 'مدفوع',     amount: '40 ر.ع', paidDate: '2024-08-01' },
        { month: 'سبتمبر 2024',  status: 'غير مدفوع', amount: '40 ر.ع', paidDate: null },
        { month: 'أكتوبر 2024',  status: 'غير مدفوع', amount: '40 ر.ع', paidDate: null },
        { month: 'نوفمبر 2024',  status: 'غير مدفوع', amount: '40 ر.ع', paidDate: null },
        { month: 'ديسمبر 2024',  status: 'غير مدفوع', amount: '40 ر.ع', paidDate: null }
      ]
    },
    {
      id: 'WRK-003',
      name: 'سالم عبدالله الرشيدي',
      civil: '0467890003',
      nationality: 'عُماني',
      gender: 'ذكر',
      dob: '1985-03-22',
      phone: '96893334455',
      email: 'salem.r@gmail.com',
      employer: 'مؤسسة البناء والتشييد المتكاملة',
      employerId: 'EMP-003',
      position: 'عامل بناء متخصص',
      department: 'فريق الإنشاءات الميدانية',
      contractType: 'عقد مشروع',
      insuredFrom: '2020-02-20',
      salary: 450,
      riskLevel: 'مرتفع',
      wageProtection: 'متأخر — شهرين',
      healthInsurance: 'معلق — بانتظار التجديد',
      riskIndicators: [
        { text: 'بيئة عمل عالية المخاطر — مواقع بناء نشطة بدون معدات حماية كافية', severity: 'مرتفع' },
        { text: 'بلاغان جاريان في النظام مرتبطان به (2024-01-000097، 2025-01-000006)', severity: 'مرتفع' },
        { text: 'زيارة ميدانية نشطة لصاحب العمل (2025-05-000002)', severity: 'متوسط' },
        { text: 'تاريخ اشتراكات غير منتظم: 3 أشهر متأخرة خلال 2024', severity: 'متوسط' }
      ],
      employmentHistory: [
        { employer: 'شركة المقاولات العامة العُمانية',      position: 'عامل بناء',         from: '2010-01', to: '2014-06', reason: 'إنهاء مشروع',                       status: 'منتهي' },
        { employer: 'مقاولو الخليج للإنشاء والتشييد',       position: 'عامل بناء متقدم',   from: '2014-08', to: '2019-12', reason: 'تسريح جماعي بسبب تراجع المشاريع', status: 'منتهي' },
        { employer: 'مؤسسة البناء والتشييد المتكاملة',      position: 'عامل بناء متخصص',  from: '2020-02', to: 'الآن',    reason: null,                                status: 'نشط' }
      ],
      insuranceHistory: [
        { month: 'يوليو 2024',    status: 'مدفوع',       amount: '45 ر.ع', paidDate: '2024-07-15' },
        { month: 'أغسطس 2024',   status: 'مدفوع متأخر', amount: '45 ر.ع', paidDate: '2024-09-10' },
        { month: 'سبتمبر 2024',  status: 'مدفوع متأخر', amount: '45 ر.ع', paidDate: '2024-11-05' },
        { month: 'أكتوبر 2024',  status: 'غير مدفوع',   amount: '45 ر.ع', paidDate: null },
        { month: 'نوفمبر 2024',  status: 'غير مدفوع',   amount: '45 ر.ع', paidDate: null },
        { month: 'ديسمبر 2024',  status: 'غير مدفوع',   amount: '45 ر.ع', paidDate: null }
      ]
    }
  ],

  complaints: [
    /* ── بلاغ 1: شكوى عدم صحة الأجر ─ قيد المراجعة الميدانية ── */
    {
      id: '2025-01-000001',
      type: 'تعديل الأجر',
      channel: 'منصة إلكترونية — مؤمن عليه',
      status: 'قيد المراجعة الميدانية',
      submittedBy: 'insured',
      submittedByName: 'فاطمة خالد العمري',
      submittedByCivil: '0734567002',
      submittedByPhone: '96892223344',
      submitDate: '2025-01-05',
      employerId: 'EMP-002',
      employerName: 'مصنع الإنتاج الغذائي الخليجي',
      employerCRN: '9876543210',
      employerContact: 'محمد الغيلاني',
      employerPhone: '96891234567',
      workerId: 'WRK-002',
      workerName: 'فاطمة خالد العمري',
      description: 'الأجر المسجل في الصندوق 400 ر.ع في حين أن الأجر الفعلي المصروف في الحساب البنكي 480 ر.ع منذ يناير 2024. طلب تصحيح الأجر لتعكس السجلات الواقع الفعلي.',
      assignedTo: 'سيف خلفان الأمري',
      assignedToRole: 'monitoring-employee',
      assignedInspector: 'حاتم سالم الزدجالي',
      priority: 'مرتفع',
      dueDate: '2025-01-20',
      returnCount: 0,
      registeredData: {
        joinDate: '2018-09-15',
        contractReceiveDate: '2018-09-20',
        salary: 400,
        allowances: 0,
        fullSalary: 400,
        resignDate: null,
        resignReceiveDate: null
      },
      requestedData: {
        changeType: 'تعديل الأجر',
        actualSalary: 480,
        effectiveFrom: '2024-01-01',
        notes: 'الزيادة تمت بموجب مراسلة رسمية من صاحب العمل بتاريخ 2023-12-28'
      },
      requiredDocuments: [
        { name: 'كشف الحساب البنكي خلال الفترة المراد تعديلها',   status: 'مرفق' },
        { name: 'ما يفيد الأجر الصحيح (مراسلة صاحب العمل)',        status: 'مرفق' },
        { name: 'خطاب صاحب العمل معتمد',                           status: 'مطلوب' }
      ],
      verificationResults: [
        {
          source: 'حماية الأجور',
          status: 'مخالف',
          checks: [
            { rule: 'تسلسل الأجر في نظام حماية الأجور', result: 'مخالف',        value: 'الأجر المصروف 480 ر.ع يناير–ديسمبر 2024 بينما المسجل 400 ر.ع' },
            { rule: 'نسبة التغير في الأجر كمؤشر خطر',  result: 'يحتاج مراجعة', value: 'زيادة 20% — ضمن الحد المقبول' }
          ]
        },
        {
          source: 'سجلات الصندوق',
          status: 'موافق',
          checks: [
            { rule: 'وجود طلبات سابقة لنفس الموضوع',       result: 'موافق', value: 'لا توجد طلبات سابقة' },
            { rule: 'الاشتراكات محسوبة على الأجر المسجل',   result: 'موافق', value: '400 ر.ع × نسبة الاشتراك' },
            { rule: 'عدم مرور أكثر من 90 يوماً على المتغير', result: 'موافق', value: 'الطلب مقدم ضمن المهلة' }
          ]
        },
        {
          source: 'وزارة العمل',
          status: 'موافق',
          checks: [
            { rule: 'وجود عقد عمل مسجل',            result: 'موافق', value: 'عقد مسجل — رقم WM-2022-04567' },
            { rule: 'عدم وجود دعوى عمالية جارية',    result: 'موافق', value: 'لا توجد دعاوى' }
          ]
        },
        {
          source: 'الأحوال المدنية',
          status: 'موافق',
          checks: [
            { rule: 'الجنسية (عُماني)',                  result: 'موافق', value: 'عُماني' },
            { rule: 'العمر عند تقديم الطلب (15–60)',     result: 'موافق', value: '28 سنة' },
            { rule: 'سريان البطاقة الشخصية',             result: 'موافق', value: 'سارية حتى 2027-11-30' }
          ]
        }
      ],
      attachments: [
        { name: 'كشف الحساب البنكي يناير–ديسمبر 2024.pdf', size: '1.1 MB', date: '2025-01-05', type: 'pdf' },
        { name: 'مراسلة صاحب العمل بشأن زيادة الأجر.pdf',  size: '420 KB', date: '2025-01-05', type: 'pdf' }
      ],
      timeline: [
        { date: '2025-01-05 09:30', step: 'تقديم البلاغ',               action: 'تم تقديم البلاغ إلكترونياً',            actor: 'فاطمة خالد العمري',    actorRole: 'insured' },
        { date: '2025-01-05 11:00', step: 'تعيين المختص',               action: 'تم تعيين الموظف المختص تلقائياً',       actor: 'النظام',                actorRole: 'system' },
        { date: '2025-01-06 08:45', step: 'فحص الطلب',                  action: 'بدأ الموظف دراسة البلاغ والتحقق منه',  actor: 'سيف خلفان الأمري',     actorRole: 'monitoring-employee' },
        { date: '2025-01-08 10:00', step: 'إرسال للتفتيش',              action: 'تم إرسال البلاغ للمفتش لمراجعة ميدانية', actor: 'سيف خلفان الأمري',   actorRole: 'monitoring-employee' },
        { date: '2025-01-09 09:00', step: 'مراجعة المفتش',              action: 'استلم المفتش البلاغ وبدأ المراجعة',      actor: 'حاتم سالم الزدجالي',  actorRole: 'field-inspector' }
      ],
      notes: [
        { text: 'تم التحقق من بيانات حماية الأجور — يظهر فارق واضح بين الأجر المصروف والمسجل بالصندوق.', author: 'سيف خلفان الأمري', date: '2025-01-06', role: 'monitoring-employee' }
      ]
    },

    /* ── بلاغ 2: شكوى عدم التسجيل ─ تم جدولة زيارة تفتيشية ── */
    {
      id: '2025-01-000002',
      type: 'تسجيل عقد',
      channel: 'إحالة داخلية',
      status: 'تم جدولة زيارة تفتيشية',
      submittedBy: 'fund-staff',
      submittedByName: 'منى راشد البلوشي',
      submittedByCivil: '09123456',
      submittedByPhone: '96890012345',
      submitDate: '2024-12-20',
      employerId: 'EMP-002',
      employerName: 'مصنع الإنتاج الغذائي الخليجي',
      employerCRN: '9876543210',
      employerContact: 'محمد الغيلاني',
      employerPhone: '96891234567',
      workerId: null,
      workerName: null,
      description: 'تبيّن من خلال التقارير الداخلية أن المنشأة لم تسدد اشتراكات التأمين لمدة ثلاثة أشهر متتالية (أكتوبر–ديسمبر 2024) ويُشتبه في وجود عمال غير مسجلين.',
      assignedTo: 'سيف خلفان الأمري',
      assignedToRole: 'monitoring-employee',
      assignedInspector: 'حاتم سالم الزدجالي',
      priority: 'مرتفع',
      dueDate: '2025-01-10',
      returnCount: 1,
      registeredData: {
        joinDate: null,
        contractReceiveDate: null,
        salary: null,
        allowances: null,
        fullSalary: null,
        resignDate: null,
        resignReceiveDate: null
      },
      requestedData: {
        changeType: 'تسجيل عقد',
        actualJoinDate: '2024-09-01',
        notes: 'عمال غير مسجلين منذ بداية مشروع سبتمبر 2024'
      },
      requiredDocuments: [
        { name: 'ما يفيد تاريخ الالتحاق الصحيح (عقود عمل)',         status: 'مرفق' },
        { name: 'خطاب صاحب العمل بتأكيد تاريخ الالتحاق',           status: 'مطلوب' },
        { name: 'كشف الحساب البنكي خلال فترة العمل',                status: 'مطلوب' }
      ],
      verificationResults: [
        {
          source: 'سجلات الصندوق',
          status: 'مخالف',
          checks: [
            { rule: 'عدم وجود ازدواجية في المدد المسجلة',                   result: 'موافق',        value: 'لا توجد ازدواجية' },
            { rule: 'عدم وجود عقد عالق في نظام الصندوق',                    result: 'مخالف',        value: 'لا يوجد عقد مسجل' },
            { rule: 'عدم وجود شكوى/طلب سابق بنفس الموضوع',                  result: 'موافق',        value: 'لا توجد شكاوى سابقة' },
            { rule: 'عدم مرور سنة على تاريخ الالتحاق',                      result: 'يحتاج مراجعة', value: 'مر 4 أشهر على الالتحاق — ضمن الفترة المسموحة' }
          ]
        },
        {
          source: 'وزارة العمل',
          status: 'موافق',
          checks: [
            { rule: 'وجود عقد في نظام وزارة العمل',          result: 'موافق', value: 'عقد مسجل بتاريخ 2024-09-01' },
            { rule: 'عدم وجود دعوى عمالية',                   result: 'موافق', value: 'لا توجد' },
            { rule: 'مرور 30 يوماً على تاريخ الالتحاق',       result: 'موافق', value: 'مر 112 يوم' }
          ]
        },
        {
          source: 'وزارة التجارة والصناعة',
          status: 'موافق',
          checks: [
            { rule: 'الكيان القانوني (لا تصفية/إفلاس)',    result: 'موافق', value: 'المنشأة نشطة' },
            { rule: 'درجة السجل التجاري',                   result: 'موافق', value: 'الدرجة الثانية' }
          ]
        },
        {
          source: 'الأحوال المدنية',
          status: 'موافق',
          checks: [
            { rule: 'جنسية المؤمن عليه (عُماني)',           result: 'موافق', value: 'عُماني' },
            { rule: 'العمر (15–60 عند أول تسجيل)',          result: 'موافق', value: '33 سنة' }
          ]
        }
      ],
      attachments: [{ name: 'تقرير الاشتراكات المتأخرة.pdf', size: '1.2 MB', date: '2024-12-20', type: 'pdf' }],
      timeline: [
        { date: '2024-12-20 10:00', step: 'تقديم البلاغ',    action: 'تم رفع البلاغ داخلياً',                       actor: 'منى راشد البلوشي',     actorRole: 'fund-staff' },
        { date: '2024-12-21 08:30', step: 'تعيين المختص',    action: 'تم تعيين الموظف المختص',                      actor: 'النظام',                actorRole: 'system' },
        { date: '2024-12-22 09:00', step: 'فحص الطلب',       action: 'بدأ الموظف دراسة البلاغ',                     actor: 'سيف خلفان الأمري',     actorRole: 'monitoring-employee' },
        { date: '2024-12-26 11:00', step: 'إعادة للتصحيح',   action: 'أُعيد للموظف لاستيفاء مستندات إضافية',        actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' },
        { date: '2025-01-02 11:00', step: 'فحص الطلب',       action: 'استكمل الموظف المراجعة وطلب جدولة زيارة',     actor: 'سيف خلفان الأمري',     actorRole: 'monitoring-employee' },
        { date: '2025-01-03 09:00', step: 'موافقة المدير',   action: 'اعتمد المدير توجيه الزيارة الميدانية',        actor: 'عبدالعزيز هلال الراشدي', actorRole: 'inspection-director' },
        { date: '2025-01-05 10:00', step: 'جدولة الزيارة',   action: 'تم جدولة زيارة مفاجئة بتاريخ 2025-01-12',    actor: 'حاتم سالم الزدجالي',   actorRole: 'field-inspector' }
      ],
      notes: []
    },

    /* ── بلاغ 3: تعديل الأجر ─ صدر قرار ── */
    {
      id: '2025-01-000003',
      type: 'تعديل الأجر',
      channel: 'منصة إلكترونية — مؤمن عليه',
      status: 'تم إصدار قرار بشأن البلاغ',
      submittedBy: 'insured',
      submittedByName: 'أسماء محمد الحارثي',
      submittedByCivil: '07345678',
      submittedByPhone: '96892034567',
      submitDate: '2024-11-10',
      employerId: 'EMP-002',
      employerName: 'مصنع الإنتاج الغذائي الخليجي',
      employerCRN: '9876543210',
      employerContact: 'محمد الغيلاني',
      employerPhone: '96891234567',
      workerId: 'WRK-002',
      workerName: 'فاطمة خالد العمري',
      description: 'المؤمن عليها تشتكي من غياب معدات الحماية الشخصية في خط الإنتاج وعدم التزام المصنع باشتراطات السلامة المهنية عند التعامل مع المواد الكيميائية.',
      assignedTo: 'سيف خلفان الأمري',
      assignedToRole: 'monitoring-employee',
      assignedInspector: 'حاتم سالم الزدجالي',
      priority: 'مرتفع',
      dueDate: '2024-11-25',
      returnCount: 0,
      registeredData: {
        joinDate: '2018-09-15',
        contractReceiveDate: '2018-09-20',
        salary: 400,
        allowances: 0,
        fullSalary: 400,
        resignDate: null,
        resignReceiveDate: null
      },
      requestedData: {
        changeType: 'تعديل الأجر',
        actualSalary: 400,
        effectiveFrom: '2024-11-01',
        notes: 'طلب التحقق من الأجر المسجل وصحة بيانات السلامة'
      },
      requiredDocuments: [
        { name: 'صور من موقع العمل',           status: 'مرفق' },
        { name: 'تقرير السلامة المهنية',        status: 'مرفق' },
        { name: 'خطاب صاحب العمل',             status: 'مرفق' }
      ],
      verificationResults: [
        {
          source: 'حماية الأجور',
          status: 'موافق',
          checks: [
            { rule: 'تسلسل الأجر في نظام حماية الأجور', result: 'موافق', value: 'منتظم 400 ر.ع' },
            { rule: 'صحة صرف الأجر من المنشأة',         result: 'موافق', value: 'مصروف بانتظام حتى أغسطس 2024' }
          ]
        },
        {
          source: 'سجلات الصندوق',
          status: 'موافق',
          checks: [
            { rule: 'الاشتراكات مسجلة ومدفوعة',        result: 'موافق', value: 'مدفوعة حتى أغسطس 2024' }
          ]
        }
      ],
      attachments: [
        { name: 'صور من موقع العمل.zip',       size: '4.5 MB', date: '2024-11-10', type: 'oth' },
        { name: 'تقرير السلامة المهنية.pdf',   size: '980 KB', date: '2024-11-10', type: 'pdf' }
      ],
      timeline: [
        { date: '2024-11-10 14:00', step: 'تقديم البلاغ',    action: 'تم تقديم البلاغ إلكترونياً',                     actor: 'أسماء محمد الحارثي',    actorRole: 'insured' },
        { date: '2024-11-12 10:00', step: 'فحص الطلب',       action: 'بدأ الموظف دراسة البلاغ',                        actor: 'سيف خلفان الأمري',      actorRole: 'monitoring-employee' },
        { date: '2024-11-19 09:30', step: 'اعتماد رئيس الشكاوى', action: 'اعتمد رئيس القسم توجيه الزيارة الميدانية',  actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' },
        { date: '2024-11-25 10:00', step: 'الزيارة الميدانية', action: 'تمت الزيارة الميدانية ورُفع المحضر',           actor: 'حاتم سالم الزدجالي',    actorRole: 'field-inspector' },
        { date: '2024-11-28 11:00', step: 'اعتماد رئيس التفتيش', action: 'تم اعتماد المحضر ورفع الملف للمدير',        actor: 'ريما يوسف النبهانية',   actorRole: 'field-head' },
        { date: '2024-12-01 10:00', step: 'قرار المدير',     action: 'تم إصدار قرار بإلزام المنشأة وتغريمها 500 ريال', actor: 'عبدالعزيز هلال الراشدي', actorRole: 'inspection-director' }
      ],
      notes: [
        { text: 'تم التحقق من الشكاوى وتأكدت صحتها خلال الزيارة الميدانية.', author: 'حاتم سالم الزدجالي', date: '2024-11-25', role: 'field-inspector' }
      ],
      investigationResults: {
        outcome: 'ثبوت المخالفة',
        findings: 'أثبتت الزيارة الميدانية غياب معدات السلامة وعدم وجود بروتوكولات التعامل مع المواد الكيميائية.',
        corrective: 'إلزام المنشأة بتوفير معدات الحماية الكاملة وتدريب العاملين خلال 30 يوماً',
        fine: '500 ريال عُماني',
        decisionDate: '2024-12-01'
      }
    },

    /* ── بلاغ 4: تعديل تاريخ الالتحاق ─ بانتظار تعيين ── */
    {
      id: '2025-01-000004',
      type: 'تعديل تاريخ الالتحاق',
      channel: 'منصة إلكترونية — جهة العمل',
      status: 'بانتظار تعيين',
      submittedBy: 'employer',
      submittedByName: 'طارق سعيد الكلباني',
      submittedByCivil: '08234567',
      submittedByPhone: '96891023456',
      submitDate: '2025-01-10',
      employerId: 'EMP-001',
      employerName: 'شركة التقنية الوطنية',
      employerCRN: '1234567890',
      employerContact: 'طارق سعيد الكلباني',
      employerPhone: '96891023456',
      workerId: 'WRK-001',
      workerName: 'أحمد محمد القحطاني',
      description: 'يطلب صاحب العمل تعديل تاريخ التحاق الموظف المسجّل في النظام من 2023-03-15 إلى 2023-01-01 ليتوافق مع تاريخ بدء العقد الفعلي.',
      assignedTo: null,
      assignedToRole: null,
      assignedInspector: null,
      priority: 'منخفض',
      dueDate: '2025-01-25',
      returnCount: 0,
      registeredData: null,
      requestedData: null,
      requiredDocuments: [],
      verificationResults: [],
      attachments: [],
      timeline: [
        { date: '2025-01-10 10:30', step: 'تقديم البلاغ', action: 'تم تقديم البلاغ إلكترونياً', actor: 'طارق سعيد الكلباني', actorRole: 'employer' }
      ],
      notes: []
    },

    /* ── بلاغ 5: تعديل تاريخ انتهاء الخدمة ─ مُغلق (2024) ── */
    {
      id: '2024-01-000097',
      type: 'تعديل تاريخ انتهاء الخدمة',
      channel: 'منصة إلكترونية — مؤمن عليه',
      status: 'تم إغلاق البلاغ',
      submittedBy: 'insured',
      submittedByName: 'سالم عبدالله الرشيدي',
      submittedByCivil: '0467890003',
      submittedByPhone: '96893334455',
      submitDate: '2024-09-15',
      employerId: 'EMP-003',
      employerName: 'مؤسسة البناء والتشييد المتكاملة',
      employerCRN: '4567891230',
      employerContact: 'عامر الهاشمي',
      employerPhone: '96895566778',
      workerId: 'WRK-003',
      workerName: 'سالم عبدالله الرشيدي',
      description: 'يدّعي الموظف أنه فُصل من العمل دون سبب مشروع بعد خدمة تجاوزت 10 سنوات ويطالب بالتعويضات النظامية.',
      assignedTo: 'سيف خلفان الأمري',
      assignedToRole: 'monitoring-employee',
      assignedInspector: null,
      priority: 'مرتفع',
      dueDate: '2024-10-01',
      returnCount: 0,
      registeredData: null,
      requestedData: null,
      requiredDocuments: [
        { name: 'خطاب إنهاء الخدمة', status: 'مرفق' },
        { name: 'سجل الخدمة',        status: 'مرفق' }
      ],
      verificationResults: [],
      attachments: [
        { name: 'خطاب إنهاء الخدمة.pdf', size: '240 KB', date: '2024-09-15', type: 'pdf' },
        { name: 'سجل الخدمة.pdf',         size: '680 KB', date: '2024-09-15', type: 'pdf' }
      ],
      timeline: [
        { date: '2024-09-15 13:00', step: 'تقديم البلاغ',        action: 'تم تقديم البلاغ',                         actor: 'سالم عبدالله الرشيدي',  actorRole: 'insured' },
        { date: '2024-09-28 11:00', step: 'اعتماد رئيس الشكاوى', action: 'توجيه للمصالحة والتسوية',                  actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' },
        { date: '2024-10-05 15:00', step: 'إغلاق',               action: 'تم إغلاق البلاغ بعد تسوية ودية',         actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' }
      ],
      notes: [],
      investigationResults: { outcome: 'تسوية ودية', findings: 'تم التوصل إلى اتفاق ودي بين الطرفين.', corrective: null, fine: null, decisionDate: '2024-10-05' }
    },

    /* ── بلاغ 6: تسجيل عقد ─ إحالة خارجية ── */
    {
      id: '2025-01-000006',
      type: 'تسجيل عقد',
      channel: 'إحالة رسمية خارجية',
      status: 'بانتظار تعيين',
      submittedBy: 'external-ref',
      submittedByName: 'وزارة العمل',
      submittedByCivil: null,
      submittedByPhone: null,
      submitDate: '2025-01-12',
      employerId: 'EMP-003',
      employerName: 'مؤسسة البناء والتشييد المتكاملة',
      employerCRN: '4567891230',
      employerContact: 'عامر الهاشمي',
      employerPhone: '96895566778',
      workerId: null,
      workerName: null,
      description: 'أحالت وزارة العمل ملف عمال المنشأة للتحقق من تسجيل عقودهم في النظام والتأكد من صحة بيانات التحاقهم.',
      assignedTo: null,
      assignedToRole: null,
      assignedInspector: null,
      priority: 'عاجل',
      dueDate: '2025-01-18',
      returnCount: 0,
      registeredData: null,
      requestedData: null,
      requiredDocuments: [],
      verificationResults: [],
      attachments: [
        { name: 'خطاب الإحالة الرسمية.pdf',    size: '1.1 MB', date: '2025-01-12', type: 'pdf' },
        { name: 'ملف المخالفات السابقة.pdf',    size: '2.3 MB', date: '2025-01-12', type: 'pdf' }
      ],
      timeline: [
        { date: '2025-01-12 10:00', step: 'استلام الإحالة', action: 'تم استلام الإحالة الرسمية من وزارة العمل', actor: 'منى راشد البلوشي', actorRole: 'fund-staff' },
        { date: '2025-01-12 10:30', step: 'تسجيل البلاغ',  action: 'تم تسجيل البلاغ في النظام',                actor: 'منى راشد البلوشي', actorRole: 'fund-staff' }
      ],
      notes: []
    }
  ],

  appeals: [
    {
      id: '2025-02-000001',
      relatedId: '2025-01-000003',
      relatedType: 'بلاغ',
      type: 'تظلم على القرار',
      submittedBy: 'employer',
      submittedByName: 'طارق سعيد الكلباني',
      employerId: 'EMP-002',
      employerName: 'مصنع الإنتاج الغذائي الخليجي',
      submitDate: '2024-12-03',
      status: 'قيد الدراسة من موظف قسم المتابعة',
      reasons: 'يعترض صاحب العمل على نتائج البلاغ ويؤكد توفر معدات السلامة وأن الصور المرفقة لا تعكس الوضع الفعلي.',
      attachments: [
        { name: 'صور معدات السلامة المتوفرة.zip', size: '6.2 MB', date: '2024-12-03', type: 'oth' },
        { name: 'شهادات تدريب السلامة.pdf',        size: '1.4 MB', date: '2024-12-03', type: 'pdf' }
      ],
      timeline: [
        { date: '2024-12-03 11:00', step: 'تقديم التظلم',  action: 'تم تقديم التظلم',        actor: 'طارق سعيد الكلباني',  actorRole: 'employer' },
        { date: '2024-12-05 10:00', step: 'فحص التظلم',    action: 'بدء دراسة التظلم',       actor: 'سيف خلفان الأمري',    actorRole: 'monitoring-employee' }
      ],
      notes: [],
      decision: null
    },
    {
      id: '2025-02-000002',
      relatedId: '2024-01-000097',
      relatedType: 'بلاغ',
      type: 'تظلم على إجراء الإغلاق',
      submittedBy: 'insured',
      submittedByName: 'سالم عبدالله الرشيدي',
      employerId: 'EMP-003',
      employerName: 'مؤسسة البناء والتشييد المتكاملة',
      submitDate: '2024-10-10',
      status: 'تم رفض التظلم',
      reasons: 'يؤكد العامل أن التسوية لم تشمل كامل مستحقاته القانونية.',
      attachments: [{ name: 'مستحقات العمال.pdf', size: '560 KB', date: '2024-10-10', type: 'pdf' }],
      timeline: [
        { date: '2024-10-10 13:00', step: 'تقديم التظلم', action: 'تم تقديم التظلم',                                    actor: 'سالم عبدالله الرشيدي',  actorRole: 'insured' },
        { date: '2024-10-15 11:00', step: 'قرار',         action: 'رفض التظلم بعد مراجعة اتفاقية التسوية',              actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' }
      ],
      notes: [],
      decision: { outcome: 'رفض التظلم', reason: 'اتفاقية التسوية الموقعة تغطي كامل المستحقات المطالب بها.', decisionDate: '2024-10-15', decisionBy: 'نجلاء عبدالله القاسمي' }
    },
    {
      id: '2025-02-000003',
      relatedId: '2025-04-000001',
      relatedType: 'زيارة ميدانية',
      type: 'تظلم على محضر الزيارة',
      submittedBy: 'employer',
      submittedByName: 'طارق سعيد الكلباني',
      employerId: 'EMP-002',
      employerName: 'مصنع الإنتاج الغذائي الخليجي',
      submitDate: '2025-01-14',
      status: 'تم تقديم التظلم — بانتظار المراجعة',
      reasons: 'يعترض على ما ورد في محضر الزيارة المفاجئة ويطلب إعادة الفحص بحضور ممثل قانوني.',
      attachments: [{ name: 'رد المنشأة على المحضر.pdf', size: '890 KB', date: '2025-01-14', type: 'pdf' }],
      timeline: [{ date: '2025-01-14 14:00', step: 'تقديم التظلم', action: 'تم تقديم التظلم', actor: 'طارق سعيد الكلباني', actorRole: 'employer' }],
      notes: [],
      decision: null
    },
    {
      id: '2024-02-000089',
      relatedId: '2025-06-000001',
      relatedType: 'قرار حظر',
      type: 'تظلم على قرار الحظر',
      submittedBy: 'employer',
      submittedByName: 'ممثل مؤسسة البناء والتشييد المتكاملة',
      employerId: 'EMP-003',
      employerName: 'مؤسسة البناء والتشييد المتكاملة',
      submitDate: '2024-12-20',
      status: 'تم قبول التظلم وجارٍ إعادة الفحص',
      reasons: 'يعترض على قرار الحظر ويقدم أدلة على استيفاء جميع الاشتراطات المطلوبة.',
      attachments: [
        { name: 'شهادات الامتثال.pdf',        size: '2.1 MB', date: '2024-12-20', type: 'pdf' },
        { name: 'تقرير إدارة الجودة.pdf',     size: '1.8 MB', date: '2024-12-20', type: 'pdf' }
      ],
      timeline: [
        { date: '2024-12-20 10:00', step: 'تقديم التظلم',        action: 'تم تقديم التظلم',                             actor: 'ممثل مؤسسة البناء',      actorRole: 'employer' },
        { date: '2024-12-23 11:00', step: 'قبول التظلم',          action: 'التوصية بقبول التظلم وإعادة الفحص',          actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' }
      ],
      notes: [{ text: 'المستندات الجديدة تُظهر تحسناً ملموساً — يُوصى بزيارة إعادة فحص.', author: 'نجلاء عبدالله القاسمي', date: '2024-12-23', role: 'monitoring-head' }],
      decision: null
    }
  ],

  visits: {
    periodic: [
      {
        id: '2025-03-000001',
        planId: '2025-07-000001',
        employerId: 'EMP-001',
        employerName: 'شركة التقنية الوطنية',
        inspectorName: 'حاتم سالم الزدجالي',
        scheduledDate: '2025-01-20',
        actualDate: null,
        status: 'مجدولة',
        priority: 'عادية',
        checklistItems: [
          { item: 'التحقق من سجلات الحضور والانصراف',                      done: false },
          { item: 'مراجعة عقود العمل والتأكد من توافقها مع النظام',         done: false },
          { item: 'فحص بيئة العمل وشروط السلامة',                          done: false },
          { item: 'التحقق من سداد الاشتراكات التأمينية',                    done: false },
          { item: 'مراجعة ملفات التأمين الصحي للعاملين',                   done: false }
        ],
        findings: null,
        report: null,
        timeline: [
          { date: '2024-12-15', action: 'إدراج المنشأة في خطة الربع الأول 2025', actor: 'شيماء وليد البريكي',    actorRole: 'ops-analyst' },
          { date: '2025-01-05', action: 'تعيين المفتش الميداني',                  actor: 'ريما يوسف النبهانية',  actorRole: 'field-head' },
          { date: '2025-01-06', action: 'تأكيد موعد الزيارة',                    actor: 'حاتم سالم الزدجالي',   actorRole: 'field-inspector' }
        ]
      },
      {
        id: '2025-03-000002',
        planId: '2025-07-000001',
        employerId: 'EMP-002',
        employerName: 'مصنع الإنتاج الغذائي الخليجي',
        inspectorName: 'حاتم سالم الزدجالي',
        scheduledDate: '2025-01-12',
        actualDate: '2025-01-12',
        status: 'بانتظار مراجعة المحضر',
        priority: 'مرتفعة',
        checklistItems: [
          { item: 'التحقق من سجلات الحضور والانصراف',  done: true },
          { item: 'مراجعة عقود العمل',                  done: true },
          { item: 'فحص بيئة العمل وشروط السلامة',       done: true },
          { item: 'التحقق من سداد الاشتراكات التأمينية', done: true },
          { item: 'مراجعة ملفات التأمين الصحي',          done: false }
        ],
        findings: {
          summary: 'تم اكتشاف 4 مخالفات رئيسية في السلامة وتسجيل العمال.',
          violations: [
            'غياب بعض معدات الحماية في قسم التغليف',
            'عدم تسجيل 12 عاملاً في نظام التأمين الاجتماعي',
            'غياب سجل إجازات منتظم للعمالة الأجنبية',
            'تجاوز ساعات العمل في الوردية الليلية بمعدل ساعتين يومياً'
          ],
          correctiveActions: ['توفير معدات الحماية خلال أسبوع', 'تسجيل العمال غير المسجلين فوراً', 'ضبط سجلات الإجازات وساعات العمل']
        },
        report: null,
        timeline: [
          { date: '2025-01-05', action: 'تعيين المفتش',              actor: 'ريما يوسف النبهانية',  actorRole: 'field-head' },
          { date: '2025-01-12', action: 'تنفيذ الزيارة ورفع المحضر', actor: 'حاتم سالم الزدجالي',  actorRole: 'field-inspector' }
        ]
      },
      {
        id: '2024-03-000095',
        planId: '2024-07-000004',
        employerId: 'EMP-003',
        employerName: 'مؤسسة البناء والتشييد المتكاملة',
        inspectorName: 'حاتم سالم الزدجالي',
        scheduledDate: '2024-12-10',
        actualDate: '2024-12-10',
        status: 'تم اعتماد المحضر',
        priority: 'مرتفعة',
        checklistItems: [
          { item: 'التحقق من سجلات الحضور',            done: true },
          { item: 'مراجعة عقود العمل',                  done: true },
          { item: 'فحص بيئة العمل',                     done: true },
          { item: 'التحقق من سداد الاشتراكات',          done: true },
          { item: 'مراجعة التأمين الصحي',               done: true }
        ],
        findings: {
          summary: 'مخالفات جسيمة في السلامة المهنية وإدارة الموارد البشرية.',
          violations: ['غياب معدات السلامة لـ 45 عاملاً', 'عدم صرف رواتب 8 عمال منذ شهرين', 'عمالة أجنبية غير نظامية (15 عاملاً)'],
          correctiveActions: ['توفير معدات السلامة فوراً', 'صرف الرواتب المتأخرة', 'تسوية أوضاع العمالة الأجنبية']
        },
        report: { approved: true, approvedBy: 'ريما يوسف النبهانية', approvalDate: '2024-12-15' },
        timeline: [
          { date: '2024-12-10', action: 'تنفيذ الزيارة', actor: 'حاتم سالم الزدجالي',  actorRole: 'field-inspector' },
          { date: '2024-12-15', action: 'اعتماد المحضر', actor: 'ريما يوسف النبهانية', actorRole: 'field-head' }
        ]
      }
    ],
    surprise: [
      {
        id: '2025-04-000001',
        source: 'بلاغ 2025-01-000002',
        reason: 'بلاغ بعدم سداد الاشتراكات التأمينية واشتباه بعمال غير مسجلين',
        employerId: 'EMP-002',
        employerName: 'مصنع الإنتاج الغذائي الخليجي',
        inspectorName: 'حاتم سالم الزدجالي',
        scheduledDate: '2025-01-12',
        actualDate: '2025-01-12',
        status: 'بانتظار إجراء تصحيحي',
        checklistItems: [
          { item: 'التحقق من سجلات الدفع للصندوق', done: true },
          { item: 'فحص قوائم الرواتب',              done: true },
          { item: 'مقابلة ممثل المنشأة',             done: true }
        ],
        findings: {
          summary: 'تم تأكيد عدم سداد اشتراكات 3 أشهر.',
          violations: ['عدم سداد اشتراكات أكتوبر–ديسمبر 2024 البالغة 8,400 ريال عُماني'],
          correctiveActions: ['سداد الاشتراكات المتأخرة فوراً أو تقديم خطة سداد']
        },
        report: null,
        timeline: [
          { date: '2025-01-10', action: 'أمر بتنفيذ زيارة مفاجئة',    actor: 'ريما يوسف النبهانية', actorRole: 'field-head' },
          { date: '2025-01-12', action: 'تنفيذ الزيارة ورفع المحضر',   actor: 'حاتم سالم الزدجالي', actorRole: 'field-inspector' }
        ]
      },
      {
        id: '2024-04-000088',
        source: 'اشتباه داخلي',
        reason: 'تقارير عن مخالفات جسيمة محتملة في مواقع البناء',
        employerId: 'EMP-003',
        employerName: 'مؤسسة البناء والتشييد المتكاملة',
        inspectorName: 'حاتم سالم الزدجالي',
        scheduledDate: '2024-11-20',
        actualDate: '2024-11-20',
        status: 'تم اعتماد المحضر',
        checklistItems: [
          { item: 'فحص مواقع العمل',          done: true },
          { item: 'مراجعة سجلات التأمين',     done: true },
          { item: 'فحص الرواتب',              done: true }
        ],
        findings: {
          summary: 'مخالفات جوهرية في السلامة والرواتب.',
          violations: ['مخالفات سلامة في مواقع البناء النشطة', 'تأخر في صرف رواتب 12 عاملاً'],
          correctiveActions: ['تصحيح فوري لبيئة السلامة', 'صرف الرواتب المتأخرة خلال 72 ساعة']
        },
        report: { approved: true, approvedBy: 'ريما يوسف النبهانية', approvalDate: '2024-11-25' },
        timeline: [
          { date: '2024-11-20', action: 'تنفيذ الزيارة المفاجئة', actor: 'حاتم سالم الزدجالي',  actorRole: 'field-inspector' },
          { date: '2024-11-25', action: 'اعتماد المحضر',          actor: 'ريما يوسف النبهانية', actorRole: 'field-head' }
        ]
      }
    ],
    scheduled: [
      {
        id: '2025-05-000001',
        relatedId: '2025-01-000003',
        relatedType: 'بلاغ',
        employerId: 'EMP-002',
        employerName: 'مصنع الإنتاج الغذائي الخليجي',
        inspectorName: 'حاتم سالم الزدجالي',
        scheduledDate: '2024-11-25',
        actualDate: '2024-11-25',
        status: 'تم اعتماد المحضر',
        purpose: 'متابعة بلاغ ظروف العمل غير الآمنة',
        checklistItems: [
          { item: 'التحقق من توفر معدات الحماية',                done: true },
          { item: 'فحص بروتوكولات السلامة',                      done: true },
          { item: 'مقابلة العاملين في خط الإنتاج',               done: true }
        ],
        findings: {
          summary: 'تأكيد الشكاوى الواردة في البلاغ.',
          violations: ['غياب 30% من معدات الحماية الشخصية المطلوبة', 'عدم وجود بروتوكول مكتوب للتعامل مع المواد الكيميائية'],
          correctiveActions: ['توفير المعدات خلال أسبوعين', 'وضع بروتوكول مكتوب للسلامة']
        },
        report: { approved: true, approvedBy: 'ريما يوسف النبهانية', approvalDate: '2024-11-28' },
        timeline: [
          { date: '2024-11-19', action: 'أمر بجدولة الزيارة بناءً على البلاغ', actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' },
          { date: '2024-11-25', action: 'تنفيذ الزيارة',                        actor: 'حاتم سالم الزدجالي',    actorRole: 'field-inspector' },
          { date: '2024-11-28', action: 'اعتماد المحضر',                       actor: 'ريما يوسف النبهانية',   actorRole: 'field-head' }
        ]
      },
      {
        id: '2025-05-000002',
        relatedId: '2024-02-000089',
        relatedType: 'تظلم',
        employerId: 'EMP-003',
        employerName: 'مؤسسة البناء والتشييد المتكاملة',
        inspectorName: 'حاتم سالم الزدجالي',
        scheduledDate: '2025-01-18',
        actualDate: null,
        status: 'مجدولة',
        purpose: 'إعادة فحص بعد تظلم قرار الحظر',
        checklistItems: [
          { item: 'التحقق من تنفيذ الإجراءات التصحيحية السابقة', done: false },
          { item: 'فحص بيئة السلامة',                             done: false },
          { item: 'مراجعة سجلات التأمين الاجتماعي',              done: false }
        ],
        findings: null,
        report: null,
        timeline: [
          { date: '2024-12-23', action: 'الأمر بجدولة زيارة إعادة فحص', actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' },
          { date: '2025-01-05', action: 'تعيين المفتش للزيارة',          actor: 'ريما يوسف النبهانية',   actorRole: 'field-head' }
        ]
      }
    ]
  },

  inspectionPlans: [
    {
      id: '2025-07-000001',
      title: 'خطة التفتيش الدوري — الربع الأول 2025',
      period: 'يناير — مارس 2025',
      status: 'معتمدة — قيد التنفيذ',
      createdBy: 'شيماء وليد البريكي',
      approvedBy: 'عبدالعزيز هلال الراشدي',
      approvalDate: '2024-12-20',
      targetCount: 18,
      completedCount: 3,
      inProgressCount: 2,
      sectors: ['تقنية المعلومات', 'التصنيع', 'البناء والإنشاء', 'الخدمات'],
      riskCriteria: 'المنشآت ذات درجة مخاطر متوسطة وعالية',
      inspectors: ['حاتم سالم الزدجالي'],
      createdDate: '2024-12-10'
    },
    {
      id: '2024-07-000004',
      title: 'خطة التفتيش الدوري — الربع الرابع 2024',
      period: 'أكتوبر — ديسمبر 2024',
      status: 'مكتملة',
      createdBy: 'شيماء وليد البريكي',
      approvedBy: 'عبدالعزيز هلال الراشدي',
      approvalDate: '2024-09-25',
      targetCount: 15,
      completedCount: 15,
      inProgressCount: 0,
      sectors: ['التصنيع', 'البناء والإنشاء', 'الصحة والرعاية'],
      riskCriteria: 'المنشآت ذات المخالفات السابقة',
      inspectors: ['حاتم سالم الزدجالي'],
      createdDate: '2024-09-10'
    }
  ],

  banCases: [
    {
      id: '2025-06-000001',
      type: 'حظر توظيف جديد',
      employerId: 'EMP-003',
      employerName: 'مؤسسة البناء والتشييد المتكاملة',
      reason: 'مخالفات متكررة في السلامة المهنية وعدم الالتزام بالإجراءات التصحيحية خلال 3 زيارات متتالية',
      relatedVisitId: '2024-03-000095',
      status: 'سارٍ — حظر نشط',
      issuedDate: '2025-01-05',
      issuedBy: 'عبدالعزيز هلال الراشدي',
      duration: '90 يوماً',
      expiryDate: '2025-04-05',
      conditions: ['إثبات تصحيح جميع المخالفات المُوثَّقة', 'تقديم خطة استيفاء معتمدة', 'اجتياز زيارة إعادة فحص ناجحة'],
      timeline: [{ date: '2025-01-05', action: 'إصدار قرار الحظر', actor: 'عبدالعزيز هلال الراشدي', actorRole: 'inspection-director' }],
      liftedDate: null,
      liftedBy: null
    },
    {
      id: '2024-06-000045',
      type: 'حظر استقدام عمالة',
      employerId: 'EMP-002',
      employerName: 'مصنع الإنتاج الغذائي الخليجي',
      reason: 'وجود عمالة أجنبية غير نظامية وعدم الامتثال لنسب العُمنة المطلوبة',
      relatedVisitId: '2024-04-000088',
      status: 'تم رفع الحظر',
      issuedDate: '2024-09-15',
      issuedBy: 'عبدالعزيز هلال الراشدي',
      duration: '60 يوماً',
      expiryDate: '2024-11-15',
      conditions: ['تصحيح أوضاع العمالة الأجنبية', 'رفع نسبة العُمنة للحد المطلوب'],
      liftedDate: '2024-11-10',
      liftedBy: 'عبدالعزيز هلال الراشدي',
      timeline: [
        { date: '2024-09-15', action: 'إصدار قرار الحظر',          actor: 'عبدالعزيز هلال الراشدي', actorRole: 'inspection-director' },
        { date: '2024-11-10', action: 'رفع الحظر بعد إثبات الامتثال', actor: 'عبدالعزيز هلال الراشدي', actorRole: 'inspection-director' }
      ]
    }
  ]

};
