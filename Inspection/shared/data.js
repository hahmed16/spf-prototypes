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
      joinDate: '2015-04-01',
      employmentStatus: 'على رأس العمل',
      resignDate: null,
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
      joinDate: '2018-09-15',
      employmentStatus: 'على رأس العمل',
      resignDate: null,
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
      joinDate: '2020-02-20',
      employmentStatus: 'على رأس العمل',
      resignDate: null,
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
    },
    {
      id: 'WRK-004',
      name: 'أسماء محمد الحارثي',
      civil: '07345678',
      nationality: 'عُماني',
      gender: 'أنثى',
      dob: '1997-08-20',
      phone: '96892034567',
      email: 'asmaa.h@gmail.com',
      employer: 'مصنع الإنتاج الغذائي الخليجي',
      employerId: 'EMP-002',
      position: 'مشغّلة ماكينات',
      department: 'قسم التعبئة والتغليف',
      contractType: 'عقد سنوي متجدد',
      insuredFrom: '2021-03-01',
      joinDate: '2021-03-01',
      employmentStatus: 'على رأس العمل',
      resignDate: null,
      salary: 320,
      riskLevel: 'متوسط',
      wageProtection: 'منتظم',
      healthInsurance: 'نشط — شركة تكافل للتأمين',
      riskIndicators: [],
      employmentHistory: [
        { employer: 'مصنع الإنتاج الغذائي الخليجي', position: 'مشغّلة ماكينات', from: '2021-03', to: 'الآن', reason: null, status: 'نشط' }
      ],
      insuranceHistory: [
        { month: 'يوليو 2024',    status: 'مدفوع', amount: '32 ر.ع', paidDate: '2024-07-01' },
        { month: 'أغسطس 2024',   status: 'مدفوع', amount: '32 ر.ع', paidDate: '2024-08-01' },
        { month: 'سبتمبر 2024',  status: 'مدفوع', amount: '32 ر.ع', paidDate: '2024-09-01' },
        { month: 'أكتوبر 2024',  status: 'مدفوع', amount: '32 ر.ع', paidDate: '2024-10-01' },
        { month: 'نوفمبر 2024',  status: 'مدفوع', amount: '32 ر.ع', paidDate: '2024-11-01' },
        { month: 'ديسمبر 2024',  status: 'مدفوع', amount: '32 ر.ع', paidDate: '2024-12-01' }
      ]
    }
  ],

  complaints: [
    /* ── بلاغ 1: شكوى عدم صحة الأجر ─ قيد المراجعة من قسم التفتيش ── */
    {
      id: '2025-01-000001',
      type: 'شكوى عدم صحة الأجر',
      channel: 'منصة إلكترونية — مؤمن عليه',
      status: 'قيد المراجعة من قسم التفتيش',
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
      workerCivil: '0734567002',
      description: 'الأجر المسجل في الصندوق 400 ر.ع في حين أن الأجر الفعلي المصروف في الحساب البنكي 480 ر.ع منذ يناير 2024. طلب تصحيح الأجر لتعكس السجلات الواقع الفعلي.',
      assignedTo: 'سيف خلفان الأمري',
      assignedToCivil: '06456789',
      assignedToRole: 'monitoring-employee',
      assignedInspector: 'حاتم سالم الزدجالي',
      assignedInspectorCivil: '04678901',
      assignedInspectorRole: 'field-inspector',
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
        { name: 'ما يفيد الأجر الصحيح (مراسلة صاحب العمل)',        status: 'مرفق' }
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
            { rule: 'عدم وجود شكوى عمالية جارية',    result: 'موافق', value: 'لا توجد شكاوى' }
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

    /* ── بلاغ 2: شكوى عدم التسجيل ─ بانتظار اعتماد رئيس قسم المتابعة والبلاغات ── */
    {
      id: '2025-01-000002',
      type: 'شكوى عدم التسجيل',
      channel: 'إحالة داخلية',
      status: 'بانتظار اعتماد رئيس قسم المتابعة والبلاغات',
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
      assignedToCivil: '06456789',
      assignedToRole: 'monitoring-employee',
      assignedInspector: 'حاتم سالم الزدجالي',
      assignedInspectorCivil: '04678901',
      assignedInspectorRole: 'field-inspector',
      priority: 'مرتفع',
      dueDate: '2025-01-10',
      returnCount: 1,
      completionNote: 'تمت إعادة البلاغ لاستيفاء بيان تاريخ الالتحاق الصحيح وتوضيح عدد العمال غير المسجلين مع المستندات الداعمة.',
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
            { rule: 'عدم وجود شكوى عمالية',                   result: 'موافق', value: 'لا توجد' },
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

    /* ── بلاغ 3: تعديل الأجر ─ بانتظار اعتماد رئيس قسم التفتيش ── */
    {
      id: '2025-01-000003',
      type: 'شكوى عدم صحة الأجر',
      channel: 'منصة إلكترونية — مؤمن عليه',
      status: 'بانتظار اعتماد رئيس قسم التفتيش',
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
      workerId: null,
      workerName: 'أسماء محمد الحارثي',
      workerCivil: '07345678',
      description: 'المؤمن عليها تشتكي من غياب معدات الحماية الشخصية في خط الإنتاج وعدم التزام المصنع باشتراطات السلامة المهنية عند التعامل مع المواد الكيميائية.',
      assignedTo: 'سيف خلفان الأمري',
      assignedToCivil: '06456789',
      assignedToRole: 'monitoring-employee',
      assignedInspector: 'حاتم سالم الزدجالي',
      assignedInspectorCivil: '04678901',
      assignedInspectorRole: 'field-inspector',
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
        { name: 'تقرير السلامة المهنية',        status: 'مرفق' }
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
        { date: '2024-12-01 10:00', step: 'قرار المدير',     action: 'تم إصدار قرار بإلزام المنشأة وتغريمها 500 ريال عُماني', actor: 'عبدالعزيز هلال الراشدي', actorRole: 'inspection-director' }
      ],
      notes: [
        { text: 'تم التحقق من الشكاوى وتأكدت صحتها خلال الزيارة الميدانية.', author: 'حاتم سالم الزدجالي', date: '2024-11-25', role: 'field-inspector' }
      ],
      visitMinutes: `تفاصيل المحضر الميداني:

أولاً — وصف الموقع:
تم إجراء الزيارة الميدانية لمصنع الإنتاج الغذائي الخليجي في المنطقة الصناعية بصحار. يضم المصنع 3 خطوط إنتاج رئيسية، وخطاً مخصصاً للتعبئة والتغليف يعمل فيه ما يزيد على 45 عاملاً.

ثانياً — المشاهدات الميدانية:
- غياب تام لمعدات الحماية الشخصية (قفازات، كمامات، واقيات العيون) في خط التعبئة رقم 2.
- لا توجد لافتات توعوية بإجراءات السلامة عند التعامل مع مواد التنظيف الكيميائية.
- تم فحص خزانة المعدات في القسم وثبت أن المخزون منتهي الصلاحية منذ مارس 2024.
- سجلات التدريب السنوي على السلامة متوفرة لعام 2022 فقط، ولم تُجرَ دورات لعامَي 2023 و2024.

ثالثاً — مراجعة السجلات:
- كشوف الرواتب لشهري أغسطس وسبتمبر 2024 مطابقة لبيانات النظام (400 ر.ع).
- تأمينات الصحة مسجلة بشركة تكافل ومدفوعة حتى الشهر الحالي.
- لا يوجد محضر سابق لزيارات تفتيشية خلال السنتين الماضيتين.

رابعاً — المخالفات المرصودة:
1. عدم توفير معدات الحماية الشخصية — مادة 47 من قانون العمل.
2. غياب بروتوكول التعامل مع المواد الكيميائية — اللائحة التنفيذية للسلامة المهنية.
3. انقطاع التدريب السنوي لمدة عامين متتاليين.

خامساً — توصيات المفتش:
إلزام المنشأة بتوفير معدات الحماية خلال أسبوعين، وإجراء دورة تدريب طارئة خلال 30 يوماً، مع فرض غرامة رادعة لا تقل عن 500 ريال عُماني.`,
      visitSummary: 'ثبتت المخالفات الميدانية بشكل واضح؛ غياب معدات السلامة، ونقص بروتوكولات المواد الكيميائية، وانقطاع التدريب السنوي. بيانات الأجر مطابقة للنظام. التوصية: غرامة + إلزام بالتصحيح.',
      visitDate: '2024-11-25',
      visitAttendees: [
        { name: 'حاتم سالم الزدجالي', role: 'مفتش ميداني' },
        { name: 'أحمد ناصر الجابري',  role: 'مفتش ميداني مساعد' }
      ],
      visitAttachments: [
        { name: 'صور خط التعبئة رقم 2.zip',          type: 'zip', size: '6.2 MB', date: '2024-11-25' },
        { name: 'محضر الزيارة الميدانية الموقّع.pdf', type: 'pdf', size: '1.1 MB', date: '2024-11-25' },
        { name: 'سجل التدريب 2022 الممسوح ضوئياً.pdf', type: 'pdf', size: '890 KB', date: '2024-11-25' },
        { name: 'كشف الراتب أغسطس–سبتمبر 2024.pdf',   type: 'pdf', size: '450 KB', date: '2024-11-25' }
      ],
      investigationResults: {
        outcome: 'ثبوت المخالفة',
        findings: 'أثبتت الزيارة الميدانية غياب معدات السلامة وعدم وجود بروتوكولات التعامل مع المواد الكيميائية.',
        corrective: 'إلزام المنشأة بتوفير معدات الحماية الكاملة وتدريب العاملين خلال 30 يوماً',
        fine: '500 ريال عُماني',
        decisionDate: '2024-12-01'
      }
    },

    /* ── بلاغ 4: تعديل تاريخ الالتحاق ─ تم إعادة الطلب لاستيفاء البيانات ── */
    {
      id: '2025-01-000004',
      type: 'شكوى عدم التسجيل',
      channel: 'منصة إلكترونية — جهة العمل',
      status: 'تم إعادة الطلب لاستيفاء البيانات',
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
      partyInsuredCivil: '07345678',
      description: 'يطلب صاحب العمل تعديل تاريخ التحاق الموظف المسجّل في النظام من 2023-03-15 إلى 2023-01-01 ليتوافق مع تاريخ بدء العقد الفعلي.',
      assignedTo: 'سيف خلفان الأمري',
      assignedToCivil: '06456789',
      assignedToRole: 'monitoring-employee',
      assignedInspector: null,
      priority: 'منخفض',
      dueDate: '2025-01-25',
      returnCount: 1,
      completionNote: 'يرجى إرفاق عقد العمل الأصلي الذي يؤكد تاريخ الالتحاق الفعلي (2023-01-01) وأي مراسلات تثبت بدء العقد قبل تاريخ التسجيل في النظام.',
      registeredData: {
        joinDate: '2023-03-15',
        contractReceiveDate: '2023-03-20',
        salary: 1200,
        allowances: 0,
        fullSalary: 1200,
        resignDate: null,
        resignReceiveDate: null
      },
      requestedData: {
        changeType: 'تعديل تاريخ الالتحاق',
        actualJoinDate: '2023-01-01',
        notes: 'تاريخ الالتحاق الفعلي هو 2023-01-01 بموجب عقد العمل الأصلي'
      },
      requiredDocuments: [
        { name: 'عقد العمل الأصلي موضحاً تاريخ البداية', status: 'مطلوب' },
        { name: 'إشعار التعيين أو خطاب القبول', status: 'مطلوب' }
      ],
      verificationResults: [],
      attachments: [],
      timeline: [
        { date: '2025-01-10 10:30', step: 'تقديم البلاغ', action: 'تم تقديم البلاغ إلكترونياً', actor: 'طارق سعيد الكلباني', actorRole: 'employer' },
        { date: '2025-01-11 09:00', step: 'تعيين المختص', action: 'تم تعيين الموظف المختص', actor: 'النظام', actorRole: 'system' },
        { date: '2025-01-12 11:00', step: 'طلب استيفاء بيانات', action: 'أُعيد البلاغ لصاحب العمل لاستيفاء المستندات الداعمة', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' }
      ],
      notes: [
        { text: 'تاريخ الالتحاق المسجّل لا يتطابق مع المدة المطالب بها — يُطلب تأكيد العقد الأصلي.', author: 'سيف خلفان الأمري', date: '2025-01-12', role: 'monitoring-employee' }
      ]
    },

    /* ── بلاغ 5: تعديل تاريخ انتهاء الخدمة ─ انتظار اعتماد مدير الدائرة ── */
    {
      id: '2024-01-000097',
      type: 'أخرى',
      channel: 'منصة إلكترونية — مؤمن عليه',
      status: 'انتظار اعتماد مدير الدائرة',
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
      assignedToCivil: '06456789',
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
        { date: '2024-10-05 15:00', step: 'انتظار اعتماد مدير الدائرة', action: 'رُفع البلاغ لاعتماد مدير الدائرة قبل الإغلاق النهائي', actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' }
      ],
      notes: [],
      investigationResults: { outcome: 'تسوية ودية', findings: 'تم التوصل إلى اتفاق ودي بين الطرفين.', corrective: null, fine: null, decisionDate: '2024-10-05' }
    },

    /* ── بلاغ 6: تسجيل عقد ─ قيد المراجعة ── */
    {
      id: '2025-01-000006',
      type: 'شكوى عدم التسجيل',
      channel: 'إحالة رسمية خارجية',
      status: 'تم إغلاق البلاغ',
      submittedBy: 'external-ref',
      submittedByName: 'وزارة العمل',
      submittedByCivil: null,
      submittedByPhone: null,
      submitDate: '2025-01-12',
      employerId: 'EMP-001',
      employerName: 'شركة التقنية الوطنية',
      employerCRN: '1234567890',
      employerContact: 'طارق سعيد الكلباني',
      employerPhone: '96891023456',
      workerId: null,
      workerName: null,
      description: 'أحالت وزارة العمل ملف عمال المنشأة للتحقق من تسجيل عقودهم في النظام والتأكد من صحة بيانات التحاقهم.',
      assignedTo: 'سيف خلفان الأمري',
      assignedToCivil: '06456789',
      assignedToRole: 'monitoring-employee',
      assignedInspector: null,
      priority: 'عاجل',
      dueDate: '2025-01-18',
      returnCount: 0,
      registeredData: null,
      requestedData: null,
      requiredDocuments: [],
      verificationResults: [],
      investigationResults: {
        outcome: 'ثبوت المخالفة ومعالجتها',
        findings: 'تم التحقق من ملف العمال المحال من وزارة العمل واتضح وجود نواقص في التسجيل تم تصحيحها واستكمالها من قبل المنشأة.',
        corrective: 'استكمال تسجيل العقود الناقصة وتحديث بيانات الالتحاق في النظام خلال المهلة المحددة.',
        fine: null,
        decisionDate: '2025-01-22'
      },
      attachments: [
        { name: 'خطاب الإحالة الرسمية.pdf',    size: '1.1 MB', date: '2025-01-12', type: 'pdf' },
        { name: 'ملف المخالفات السابقة.pdf',    size: '2.3 MB', date: '2025-01-12', type: 'pdf' }
      ],
      timeline: [
        { date: '2025-01-12 10:00', step: 'استلام الإحالة', action: 'تم استلام الإحالة الرسمية من وزارة العمل', actor: 'منى راشد البلوشي', actorRole: 'fund-staff' },
        { date: '2025-01-12 10:30', step: 'تسجيل البلاغ',  action: 'تم تسجيل البلاغ في النظام',                actor: 'منى راشد البلوشي', actorRole: 'fund-staff' },
        { date: '2025-01-18 12:15', step: 'استكمال المعالجة', action: 'تم استكمال التحقق من بيانات العقود الناقصة وتصحيح وضع المنشأة', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' },
        { date: '2025-01-22 09:45', step: 'إغلاق البلاغ', action: 'تم اعتماد نتيجة المعالجة وإغلاق البلاغ', actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' }
      ],
      notes: [
        { text: 'أغلقت الإحالة بعد استكمال تسجيل العقود الناقصة وتصحيح بيانات العمال في النظام.', author: 'سيف خلفان الأمري', date: '2025-01-22', role: 'monitoring-employee' }
      ]
    },

    /* ── بلاغ 7: مسودة لدى مقدم الطلب (الصندوق) ── */
    {
      id: '2025-01-000007',
      type: 'شكوى عدم التسجيل',
      channel: 'إدخال داخلي',
      status: 'مسودة',
      submittedBy: 'fund-staff',
      submittedByName: 'منى راشد البلوشي',
      submittedByCivil: '09123456',
      submittedByPhone: '96890012345',
      submitDate: '2025-01-15',
      employerId: 'EMP-001',
      employerName: 'شركة التقنية الوطنية',
      employerCRN: '1234567890',
      employerContact: 'طارق سعيد الكلباني',
      employerPhone: '96891023456',
      workerId: 'WRK-001',
      workerName: 'أحمد محمد القحطاني',
      workerCivil: '0912345001',
      description: 'مسودة بلاغ داخلي بانتظار استكمال بيانات العامل وصاحب العمل قبل الإرسال.',
      assignedTo: null,
      assignedToCivil: null,
      assignedToRole: null,
      assignedInspector: null,
      assignedInspectorCivil: null,
      assignedInspectorRole: null,
      priority: 'متوسط',
      dueDate: '2025-01-30',
      returnCount: 0,
      registeredData: null,
      requestedData: null,
      requiredDocuments: [],
      verificationResults: [],
      attachments: [],
      timeline: [
        { date: '2025-01-15 09:45', step: 'مسودة', action: 'تم حفظ البلاغ كمسودة من مقدم الطلب', actor: 'منى راشد البلوشي', actorRole: 'fund-staff' }
      ],
      notes: []
    },

    /* ── بلاغ 8: معاد للمؤمن عليه لاستيفاء البيانات ── */
    {
      id: '2025-01-000008',
      type: 'شكوى عدم صحة الأجر',
      channel: 'منصة إلكترونية — مؤمن عليه',
      status: 'تم إعادة الطلب لاستيفاء البيانات',
      submittedBy: 'insured',
      submittedByName: 'أسماء محمد الحارثي',
      submittedByCivil: '07345678',
      submittedByPhone: '96892034567',
      submitDate: '2025-01-16',
      employerId: 'EMP-001',
      employerName: 'شركة التقنية الوطنية',
      employerCRN: '1234567890',
      employerContact: 'طارق سعيد الكلباني',
      employerPhone: '96891023456',
      workerId: null,
      workerName: 'أسماء محمد الحارثي',
      workerCivil: '07345678',
      description: 'تمت إعادة فتح البلاغ لاستيفاء بيانات إضافية تخص الأجر الفعلي وتاريخ النفاذ.',
      assignedTo: 'سيف خلفان الأمري',
      assignedToCivil: '06456789',
      assignedToRole: 'monitoring-employee',
      assignedInspector: null,
      assignedInspectorCivil: null,
      assignedInspectorRole: null,
      priority: 'متوسط',
      dueDate: '2025-01-28',
      returnCount: 1,
      completionNote: 'يرجى توضيح الأجر الفعلي المودع بالحساب البنكي وإرفاق ما يثبت تاريخ بدء تطبيقه.',
      registeredData: null,
      requestedData: null,
      requiredDocuments: [
        { name: 'كشف الحساب البنكي للفترة المطلوبة', status: 'مطلوب' }
      ],
      verificationResults: [],
      attachments: [],
      timeline: [
        { date: '2025-01-16 10:00', step: 'تقديم البلاغ', action: 'تم تقديم البلاغ إلكترونياً', actor: 'أسماء محمد الحارثي', actorRole: 'insured' },
        { date: '2025-01-17 12:30', step: 'إعادة فتح البلاغ', action: 'تمت إعادة فتح البلاغ لاستيفاء البيانات', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' }
      ],
      notes: []
    },

    /* ── بلاغ 9: بانتظار تعيين مختص — مقدم من صاحب العمل ── */
    {
      id: '2025-01-000009',
      type: 'شكوى عدم صحة الأجر',
      channel: 'منصة إلكترونية — جهة العمل',
      status: 'بانتظار تعيين',
      submittedBy: 'employer',
      submittedByName: 'طارق سعيد الكلباني',
      submittedByCivil: '08234567',
      submittedByPhone: '96891023456',
      submitDate: '2025-01-18',
      employerId: 'EMP-001',
      employerName: 'شركة التقنية الوطنية',
      employerCRN: '1234567890',
      employerContact: 'طارق سعيد الكلباني',
      employerPhone: '96891023456',
      workerId: 'WRK-001',
      workerName: 'أحمد محمد القحطاني',
      workerCivil: '0912345001',
      description: 'يطلب صاحب العمل تعديل أجر الموظف المسجل في الصندوق من 1200 ر.ع إلى 1350 ر.ع ليعكس الزيادة السنوية المعتمدة بعد مراجعة الرواتب.',
      assignedTo: null,
      assignedToCivil: null,
      assignedToRole: null,
      assignedInspector: null,
      assignedInspectorCivil: null,
      assignedInspectorRole: null,
      priority: 'متوسط',
      dueDate: '2025-02-01',
      returnCount: 0,
      registeredData: {
        joinDate: '2015-04-01',
        contractReceiveDate: '2015-04-05',
        salary: 1200,
        allowances: 0,
        fullSalary: 1200,
        resignDate: null,
        resignReceiveDate: null
      },
      requestedData: {
        changeType: 'تعديل الأجر',
        actualSalary: 1350,
        effectiveFrom: '2025-01-01',
        notes: 'الزيادة السنوية المعتمدة بموجب مراجعة رواتب ديسمبر 2024'
      },
      requiredDocuments: [
        { name: 'قرار الزيادة السنوية المعتمد', status: 'مرفق' },
        { name: 'كشف الراتب بعد الزيادة',       status: 'مرفق' }
      ],
      verificationResults: [],
      attachments: [
        { name: 'قرار الزيادة السنوية.pdf', size: '380 KB', date: '2025-01-18', type: 'pdf' },
        { name: 'كشف راتب يناير 2025.pdf',  size: '210 KB', date: '2025-01-18', type: 'pdf' }
      ],
      timeline: [
        { date: '2025-01-18 09:15', step: 'تقديم البلاغ',   action: 'تم تقديم البلاغ إلكترونياً',                      actor: 'طارق سعيد الكلباني', actorRole: 'employer' },
        { date: '2025-01-18 09:16', step: 'بانتظار تعيين',  action: 'البلاغ في قائمة انتظار التعيين — لم يُعيَّن مختص بعد', actor: 'النظام',             actorRole: 'system' }
      ],
      notes: []
    },

    /* ── بلاغ 10: مسودة — لدى صاحب العمل ── */
    {
      id: '2025-01-000010',
      type: 'شكوى عدم التسجيل',
      channel: 'منصة إلكترونية — جهة العمل',
      status: 'مسودة',
      submittedBy: 'employer',
      submittedByName: 'طارق سعيد الكلباني',
      submittedByCivil: '08234567',
      submittedByPhone: '96891023456',
      submitDate: '2025-01-19',
      employerId: 'EMP-001',
      employerName: 'شركة التقنية الوطنية',
      employerCRN: '1234567890',
      employerContact: 'طارق سعيد الكلباني',
      employerPhone: '96891023456',
      workerId: null,
      workerName: null,
      workerCivil: null,
      description: 'تسجيل موظف جديد التحق بالشركة منذ يناير 2025 ولم يُسجَّل بعد في منظومة التأمين الاجتماعي.',
      assignedTo: null,
      assignedToCivil: null,
      assignedToRole: null,
      assignedInspector: null,
      assignedInspectorCivil: null,
      assignedInspectorRole: null,
      priority: 'منخفض',
      dueDate: null,
      returnCount: 0,
      registeredData: null,
      requestedData: null,
      requiredDocuments: [],
      verificationResults: [],
      attachments: [],
      timeline: [
        { date: '2025-01-19 11:30', step: 'مسودة', action: 'تم حفظ البلاغ كمسودة من صاحب العمل', actor: 'طارق سعيد الكلباني', actorRole: 'employer' }
      ],
      notes: []
    },

    /* ── بلاغ 11: تم تقديم الطلب مرة أخرى — مؤمن عليه أعاد الإرسال بعد الإعادة ── */
    {
      id: '2025-01-000011',
      type: 'شكوى عدم صحة الأجر',
      channel: 'منصة إلكترونية — مؤمن عليه',
      status: 'تم تقديم الطلب مرة أخرى',
      submittedBy: 'insured',
      submittedByName: 'أسماء محمد الحارثي',
      submittedByCivil: '07345678',
      submittedByPhone: '96892034567',
      submitDate: '2025-01-17',
      employerId: 'EMP-001',
      employerName: 'شركة التقنية الوطنية',
      employerCRN: '1234567890',
      employerContact: 'طارق سعيد الكلباني',
      employerPhone: '96891023456',
      workerId: null,
      workerName: 'أسماء محمد الحارثي',
      workerCivil: '07345678',
      description: 'تطلب المؤمن عليها تعديل أجرها المسجل من 380 ر.ع إلى 420 ر.ع وفق آخر مراجعة رواتب سنوية معتمدة يوليو 2024.',
      assignedTo: 'سيف خلفان الأمري',
      assignedToCivil: '06456789',
      assignedToRole: 'monitoring-employee',
      assignedInspector: null,
      assignedInspectorCivil: null,
      assignedInspectorRole: null,
      priority: 'متوسط',
      dueDate: '2025-02-03',
      returnCount: 1,
      completionNote: 'تم استيفاء البيانات وإرفاق الكشف البنكي ومراسلة صاحب العمل كما طُلب.',
      registeredData: {
        joinDate: '2020-06-01',
        contractReceiveDate: '2020-06-05',
        salary: 380,
        allowances: 0,
        fullSalary: 380,
        resignDate: null,
        resignReceiveDate: null
      },
      requestedData: {
        changeType: 'تعديل الأجر',
        actualSalary: 420,
        effectiveFrom: '2024-07-01',
        notes: 'تعديل الأجر بناءً على مراجعة الرواتب السنوية يوليو 2024'
      },
      requiredDocuments: [
        { name: 'كشف الحساب البنكي للفترة المطلوبة', status: 'مرفق' },
        { name: 'مراسلة صاحب العمل بالأجر الجديد',   status: 'مرفق' }
      ],
      verificationResults: [],
      attachments: [
        { name: 'كشف الحساب البنكي يوليو–ديسمبر 2024.pdf', size: '870 KB', date: '2025-01-20', type: 'pdf' },
        { name: 'مراسلة صاحب العمل بزيادة الأجر.pdf',      size: '295 KB', date: '2025-01-20', type: 'pdf' }
      ],
      timeline: [
        { date: '2025-01-17 10:00', step: 'تقديم البلاغ',    action: 'تم تقديم البلاغ إلكترونياً',                                  actor: 'أسماء محمد الحارثي',  actorRole: 'insured' },
        { date: '2025-01-18 11:00', step: 'طلب استيفاء بيانات', action: 'أُعيد البلاغ لاستيفاء الكشف البنكي ومراسلة صاحب العمل',   actor: 'سيف خلفان الأمري',    actorRole: 'monitoring-employee' },
        { date: '2025-01-20 14:30', step: 'إعادة إرسال',      action: 'أعادت المؤمن عليها إرسال الطلب مع المستندات المطلوبة',      actor: 'أسماء محمد الحارثي',  actorRole: 'insured' }
      ],
      notes: [
        { text: 'طُلب الكشف البنكي ومراسلة صاحب العمل لإثبات الأجر الفعلي بعد المراجعة السنوية.', author: 'سيف خلفان الأمري', date: '2025-01-18', role: 'monitoring-employee' }
      ]
    },

    /* ── بلاغ 12: شكوى عدم التسجيل ─ قيد المراجعة (مرحلة موظف المتابعة) ── */
    {
      id: '2025-01-000012',
      type: 'شكوى عدم التسجيل',
      channel: 'منصة إلكترونية — صاحب عمل',
      status: 'قيد المراجعة',
      submittedBy: 'employer',
      submittedByName: 'طارق سعيد الكلباني',
      submittedByCivil: null,
      submittedByPhone: '96891023456',
      employerContact: 'طارق سعيد الكلباني',
      employerPhone: '96891023456',
      submitDate: '2025-01-22',
      employerId: 'EMP-001',
      employerName: 'شركة التقنية الوطنية',
      employerCRN: '1234567890',
      workerId: 'WRK-003',
      workerName: 'خالد ناصر البلوشي',
      workerCivil: '05789012',
      description: 'يفيد صاحب العمل بأن العامل خالد ناصر البلوشي انضم للعمل بتاريخ 2025-01-01 إلا أن التسجيل في نظام التأمين الاجتماعي لم يتم بعد بسبب خطأ تقني في المنظومة. يُطلب تصحيح الوضع بأثر رجعي.',
      assignedTo: 'سيف خلفان الأمري',
      assignedToCivil: '06456789',
      assignedToRole: 'monitoring-employee',
      assignedInspector: null,
      assignedInspectorCivil: null,
      assignedInspectorRole: null,
      priority: 'متوسط',
      dueDate: '2025-02-10',
      returnCount: 0,
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
        changeType: 'تسجيل جديد',
        actualJoinDate: '2025-01-01',
        effectiveFrom: '2025-01-01',
        notes: 'خطأ تقني حال دون التسجيل في الموعد المحدد — المستندات متوفرة'
      },
      requiredDocuments: [
        { name: 'عقد العمل الموقع', status: 'مرفق' },
        { name: 'صورة الهوية الوطنية للعامل', status: 'مرفق' },
        { name: 'إثبات تاريخ الالتحاق الفعلي', status: 'مطلوب' }
      ],
      verificationResults: [
        {
          source: 'سجلات الصندوق',
          status: 'مخالف',
          checks: [
            { rule: 'وجود تسجيل للعامل في نظام التأمين', result: 'مخالف', value: 'العامل غير مسجل حتى تاريخ التحقق' },
            { rule: 'عدم وجود طلبات سابقة لنفس الموضوع', result: 'موافق', value: 'لا توجد طلبات سابقة' }
          ]
        },
        {
          source: 'وزارة العمل',
          status: 'موافق',
          checks: [
            { rule: 'وجود عقد عمل مسجل', result: 'موافق', value: 'عقد مسجل — رقم WM-2025-00891' },
            { rule: 'عدم وجود شكوى عمالية جارية', result: 'موافق', value: 'لا توجد شكاوى' }
          ]
        },
        {
          source: 'الأحوال المدنية',
          status: 'موافق',
          checks: [
            { rule: 'الجنسية (عُماني)', result: 'موافق', value: 'عُماني' },
            { rule: 'العمر عند تقديم الطلب (15–60)', result: 'موافق', value: '32 سنة' },
            { rule: 'سريان البطاقة الشخصية', result: 'موافق', value: 'سارية حتى 2029-05-14' }
          ]
        }
      ],
      attachments: [
        { name: 'عقد عمل خالد ناصر البلوشي.pdf', size: '540 KB', date: '2025-01-22', type: 'pdf' },
        { name: 'صورة الهوية الوطنية.pdf',         size: '180 KB', date: '2025-01-22', type: 'pdf' }
      ],
      timeline: [
        { date: '2025-01-22 09:15', step: 'تقديم البلاغ',   action: 'تم تقديم البلاغ إلكترونياً',            actor: 'طارق سعيد الكلباني', actorRole: 'employer' },
        { date: '2025-01-22 10:30', step: 'تعيين المختص',   action: 'تم تعيين الموظف المختص تلقائياً',       actor: 'النظام',               actorRole: 'system' },
        { date: '2025-01-23 08:00', step: 'فحص الطلب',      action: 'بدأ الموظف دراسة البلاغ والتحقق منه',  actor: 'سيف خلفان الأمري',    actorRole: 'monitoring-employee' }
      ],
      notes: [
        { text: 'تم التحقق من سجلات الصندوق — العامل غير مسجل. العقد ووثائق الهوية مرفقة ومكتملة. بانتظار استيفاء إثبات تاريخ الالتحاق.', author: 'سيف خلفان الأمري', date: '2025-01-23', role: 'monitoring-employee' }
      ]
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
  ],

  jobSecurityRequests: [
    {
      id: 'JSR-2025-0001',
      status: 'قيد المراجعة',
      requestDate: '2025-01-15',
      workerName: 'أحمد محمد العلي',
      workerCivil: '28475910',
      employerName: 'شركة البناء الحديث',
      employerCRN: '1012345678',
      terminationDate: '2025-01-10',
      terminationReason: 'إنهاء العقد',
      salary: 450,
      employmentDuration: '3 سنوات',
      notes: 'الطلب قيد المراجعة من قبل قسم المتابعة',
      timeline: [
        { date: '2025-01-15', action: 'تقديم طلب الأمان الوظيفي', actor: 'أحمد محمد العلي', actorRole: 'insured' },
        { date: '2025-01-16', action: 'استلام الطلب للمراجعة', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' }
      ]
    },
    {
      id: 'JSR-2025-0002',
      status: 'قيد المعالجة',
      requestDate: '2025-01-18',
      workerName: 'خالد بن سالم المعمري',
      workerCivil: '28475913',
      employerName: 'شركة المقاولات العمانية',
      employerCRN: '1012345679',
      terminationDate: '2025-01-12',
      terminationReason: 'استقالة',
      salary: 380,
      employmentDuration: '2 سنة',
      notes: 'جاري التحقق من الوثائق',
      timeline: [
        { date: '2025-01-18', action: 'تقديم طلب الأمان الوظيفي', actor: 'خالد بن سالم المعمري', actorRole: 'insured' },
        { date: '2025-01-19', action: 'بدء عملية التحقق', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' }
      ]
    },
    {
      id: 'JSR-2025-0003',
      status: 'معتمد',
      requestDate: '2025-01-08',
      workerName: 'يوسف بن ناصر الفارسي',
      workerCivil: '28475916',
      employerName: 'شركة الخليج للمقاولات',
      employerCRN: '1012345682',
      terminationDate: '2024-12-31',
      terminationReason: 'إنهاء العقد من قبل صاحب العمل',
      salary: 520,
      employmentDuration: '5 سنوات',
      notes: 'تم اعتماد الطلب وصرف المستحقات',
      timeline: [
        { date: '2025-01-08', action: 'تقديم طلب الأمان الوظيفي', actor: 'يوسف بن ناصر الفارسي', actorRole: 'insured' },
        { date: '2025-01-09', action: 'استلام الطلب للمراجعة', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' },
        { date: '2025-01-14', action: 'اعتماد الطلب وإحالته للصرف', actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' }
      ]
    },
    {
      id: 'JSR-2025-0004',
      status: 'مرفوض',
      requestDate: '2025-01-10',
      workerName: 'عبدالله بن سعيد الشحي',
      workerCivil: '28475917',
      employerName: 'مؤسسة النور التجارية',
      employerCRN: '1012345683',
      terminationDate: '2025-01-05',
      terminationReason: 'استقالة طوعية',
      salary: 310,
      employmentDuration: '8 أشهر',
      notes: 'مرفوض لعدم استيفاء شرط مدة الخدمة',
      timeline: [
        { date: '2025-01-10', action: 'تقديم طلب الأمان الوظيفي', actor: 'عبدالله بن سعيد الشحي', actorRole: 'insured' },
        { date: '2025-01-11', action: 'مراجعة الطلب', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' },
        { date: '2025-01-16', action: 'رفض الطلب — مدة الخدمة أقل من سنة', actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' }
      ]
    },
    {
      id: 'JSR-2025-0005',
      status: 'محال للتفتيش',
      requestDate: '2025-01-20',
      workerName: 'سعيد بن محمد الزدجالي',
      workerCivil: '28475918',
      employerName: 'شركة التقنية الوطنية',
      employerCRN: '1234567890',
      terminationDate: '2025-01-15',
      terminationReason: 'إنهاء مفاجئ بدون سبب واضح',
      salary: 680,
      employmentDuration: '4 سنوات',
      notes: 'يحتاج تحقق ميداني من ظروف الإنهاء',
      timeline: [
        { date: '2025-01-20', action: 'تقديم طلب الأمان الوظيفي', actor: 'سعيد بن محمد الزدجالي', actorRole: 'insured' },
        { date: '2025-01-21', action: 'استلام الطلب للمراجعة', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' },
        { date: '2025-01-23', action: 'إحالة الطلب للتفتيش الميداني', actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' }
      ]
    },
    {
      id: 'JSR-2024-0098',
      status: 'معتمد',
      requestDate: '2024-12-20',
      workerName: 'حمود بن علي البلوشي',
      workerCivil: '28475919',
      employerName: 'شركة الأفق للمقاولات',
      employerCRN: '1012345684',
      terminationDate: '2024-12-15',
      terminationReason: 'إفلاس المنشأة',
      salary: 440,
      employmentDuration: '6 سنوات',
      notes: 'تم الصرف — إفلاس موثق',
      timeline: [
        { date: '2024-12-20', action: 'تقديم طلب الأمان الوظيفي', actor: 'حمود بن علي البلوشي', actorRole: 'insured' },
        { date: '2024-12-22', action: 'التحقق من وثائق الإفلاس', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' },
        { date: '2024-12-28', action: 'اعتماد الطلب وصرف المستحقات', actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' }
      ]
    }
  ],

  familyBenefitRequests: [
    {
      id: 'FBR-2025-0001',
      status: 'قيد المراجعة',
      requestDate: '2025-01-20',
      workerName: 'سالم بن حمد البوسعيدي',
      workerCivil: '28475911',
      employerName: 'شركة المقاولات العمانية',
      employerCRN: '1012345679',
      benefitType: 'منافع دخل الأسرة',
      familyMembers: 5,
      monthlyIncome: 350,
      employmentDuration: '2 سنة',
      notes: 'الطلب قيد المراجعة من قبل قسم المتابعة',
      timeline: [
        { date: '2025-01-20', action: 'تقديم طلب منافع دخل الأسرة', actor: 'سالم بن حمد البوسعيدي', actorRole: 'insured' },
        { date: '2025-01-21', action: 'استلام الطلب للمراجعة', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' }
      ]
    },
    {
      id: 'FBR-2025-0002',
      status: 'قيد المعالجة',
      requestDate: '2025-01-22',
      workerName: 'محمد بن علي الهنائي',
      workerCivil: '28475914',
      employerName: 'شركة الخدمات الطبية',
      employerCRN: '1012345680',
      benefitType: 'منافع دخل الأسرة',
      familyMembers: 4,
      monthlyIncome: 420,
      employmentDuration: '3 سنوات',
      notes: 'جاري التحقق من الأهلية',
      timeline: [
        { date: '2025-01-22', action: 'تقديم طلب منافع دخل الأسرة', actor: 'محمد بن علي الهنائي', actorRole: 'insured' },
        { date: '2025-01-23', action: 'بدء عملية التحقق', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' }
      ]
    },
    {
      id: 'FBR-2025-0003',
      status: 'معتمد',
      requestDate: '2025-01-05',
      workerName: 'راشد بن سليم الكندي',
      workerCivil: '28475920',
      employerName: 'شركة البناء والتعمير',
      employerCRN: '1012345685',
      benefitType: 'منافع دخل الأسرة',
      familyMembers: 7,
      monthlyIncome: 280,
      employmentDuration: '8 سنوات',
      notes: 'تم اعتماد الطلب وصرف المستحقات',
      timeline: [
        { date: '2025-01-05', action: 'تقديم طلب منافع دخل الأسرة', actor: 'راشد بن سليم الكندي', actorRole: 'insured' },
        { date: '2025-01-06', action: 'استلام الطلب للمراجعة', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' },
        { date: '2025-01-12', action: 'اعتماد الطلب', actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' }
      ]
    },
    {
      id: 'FBR-2025-0004',
      status: 'مرفوض',
      requestDate: '2025-01-14',
      workerName: 'علي بن حمد الوهيبي',
      workerCivil: '28475921',
      employerName: 'مصنع النور الصناعي',
      employerCRN: '1012345686',
      benefitType: 'منافع دخل الأسرة',
      familyMembers: 3,
      monthlyIncome: 550,
      employmentDuration: '1 سنة',
      notes: 'مرفوض — الدخل يتجاوز الحد الأقصى',
      timeline: [
        { date: '2025-01-14', action: 'تقديم طلب منافع دخل الأسرة', actor: 'علي بن حمد الوهيبي', actorRole: 'insured' },
        { date: '2025-01-15', action: 'مراجعة الطلب', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' },
        { date: '2025-01-18', action: 'رفض الطلب — الدخل يتجاوز الحد', actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' }
      ]
    },
    {
      id: 'FBR-2025-0005',
      status: 'بانتظار وثائق',
      requestDate: '2025-01-28',
      workerName: 'ناصر بن عبدالله الحارثي',
      workerCivil: '28475922',
      employerName: 'شركة الخليج للمقاولات',
      employerCRN: '1012345682',
      benefitType: 'منافع دخل الأسرة',
      familyMembers: 6,
      monthlyIncome: 320,
      employmentDuration: '3 سنوات',
      notes: 'بانتظار شهادات ميلاد الأطفال',
      timeline: [
        { date: '2025-01-28', action: 'تقديم طلب منافع دخل الأسرة', actor: 'ناصر بن عبدالله الحارثي', actorRole: 'insured' },
        { date: '2025-01-29', action: 'طلب استيفاء الوثائق', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' }
      ]
    },
    {
      id: 'FBR-2024-0091',
      status: 'معتمد',
      requestDate: '2024-12-15',
      workerName: 'سلطان بن سعيد الغافري',
      workerCivil: '28475923',
      employerName: 'شركة الأفق للتجارة',
      employerCRN: '1012345684',
      benefitType: 'منافع دخل الأسرة',
      familyMembers: 8,
      monthlyIncome: 260,
      employmentDuration: '11 سنة',
      notes: 'تم الصرف — حالة طويلة الأمد',
      timeline: [
        { date: '2024-12-15', action: 'تقديم طلب منافع دخل الأسرة', actor: 'سلطان بن سعيد الغافري', actorRole: 'insured' },
        { date: '2024-12-16', action: 'استلام الطلب للمراجعة', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' },
        { date: '2024-12-22', action: 'اعتماد الطلب وصرف المستحقات', actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' }
      ]
    }
  ],

  maternityLeaveRequests: [
    {
      id: 'MLR-2025-0001',
      status: 'قيد المراجعة',
      requestDate: '2025-01-25',
      workerName: 'فاطمة بنت سالم الهنائي',
      workerCivil: '28475912',
      employerName: 'شركة الخدمات الطبية',
      employerCRN: '1012345680',
      leaveType: 'إجازة أمومة',
      expectedDeliveryDate: '2025-03-15',
      leaveStartDate: '2025-03-01',
      leaveDuration: '98 يوم',
      monthlySalary: 420,
      notes: 'الطلب قيد المراجعة من قبل قسم المتابعة',
      timeline: [
        { date: '2025-01-25', action: 'تقديم طلب إجازة الأمومة', actor: 'فاطمة بنت سالم الهنائي', actorRole: 'insured' },
        { date: '2025-01-26', action: 'استلام الطلب للمراجعة', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' }
      ]
    },
    {
      id: 'MLR-2025-0002',
      status: 'قيد المعالجة',
      requestDate: '2025-01-27',
      workerName: 'مريم بنت خالد البلوشية',
      workerCivil: '28475915',
      employerName: 'شركة التقنية الوطنية',
      employerCRN: '1234567890',
      leaveType: 'إجازة أمومة',
      expectedDeliveryDate: '2025-04-20',
      leaveStartDate: '2025-04-01',
      leaveDuration: '98 يوم',
      monthlySalary: 550,
      notes: 'جاري التحقق من الوثائق الطبية',
      timeline: [
        { date: '2025-01-27', action: 'تقديم طلب إجازة الأمومة', actor: 'مريم بنت خالد البلوشية', actorRole: 'insured' },
        { date: '2025-01-28', action: 'بدء عملية التحقق', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' }
      ]
    },
    {
      id: 'MLR-2025-0003',
      status: 'معتمد',
      requestDate: '2025-01-10',
      workerName: 'أسماء بنت راشد الرواحي',
      workerCivil: '28475924',
      employerName: 'شركة المقاولات العمانية',
      employerCRN: '1012345679',
      leaveType: 'إجازة أمومة',
      expectedDeliveryDate: '2025-02-28',
      leaveStartDate: '2025-02-15',
      leaveDuration: '98 يوم',
      monthlySalary: 480,
      notes: 'تم اعتماد الطلب وبدء صرف الإجازة',
      timeline: [
        { date: '2025-01-10', action: 'تقديم طلب إجازة الأمومة', actor: 'أسماء بنت راشد الرواحي', actorRole: 'insured' },
        { date: '2025-01-11', action: 'استلام الطلب للمراجعة', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' },
        { date: '2025-01-16', action: 'اعتماد الطلب', actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' }
      ]
    },
    {
      id: 'MLR-2025-0004',
      status: 'مرفوض',
      requestDate: '2025-01-18',
      workerName: 'خلود بنت سالم الشيدي',
      workerCivil: '28475925',
      employerName: 'شركة النور للتقنية',
      employerCRN: '1012345687',
      leaveType: 'إجازة أمومة',
      expectedDeliveryDate: '2025-06-10',
      leaveStartDate: '2025-05-26',
      leaveDuration: '98 يوم',
      monthlySalary: 390,
      notes: 'مرفوض — المدة الزمنية غير مستوفاة',
      timeline: [
        { date: '2025-01-18', action: 'تقديم طلب إجازة الأمومة', actor: 'خلود بنت سالم الشيدي', actorRole: 'insured' },
        { date: '2025-01-19', action: 'مراجعة الطلب', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' },
        { date: '2025-01-22', action: 'رفض الطلب — مدة التأمين أقل من المطلوب', actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' }
      ]
    },
    {
      id: 'MLR-2025-0005',
      status: 'بانتظار وثائق',
      requestDate: '2025-02-01',
      workerName: 'نور بنت محمد النبهانية',
      workerCivil: '28475926',
      employerName: 'شركة الخدمات الطبية',
      employerCRN: '1012345680',
      leaveType: 'إجازة أمومة',
      expectedDeliveryDate: '2025-05-01',
      leaveStartDate: '2025-04-17',
      leaveDuration: '98 يوم',
      monthlySalary: 620,
      notes: 'بانتظار تقرير الطبيب المعتمد',
      timeline: [
        { date: '2025-02-01', action: 'تقديم طلب إجازة الأمومة', actor: 'نور بنت محمد النبهانية', actorRole: 'insured' },
        { date: '2025-02-02', action: 'طلب استيفاء الوثائق الطبية', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' }
      ]
    },
    {
      id: 'MLR-2024-0087',
      status: 'معتمد',
      requestDate: '2024-12-05',
      workerName: 'ريما بنت عبدالله الحجرية',
      workerCivil: '28475927',
      employerName: 'شركة التقنية الوطنية',
      employerCRN: '1234567890',
      leaveType: 'إجازة أمومة',
      expectedDeliveryDate: '2025-01-20',
      leaveStartDate: '2025-01-06',
      leaveDuration: '98 يوم',
      monthlySalary: 510,
      notes: 'تم الصرف — الإجازة جارية',
      timeline: [
        { date: '2024-12-05', action: 'تقديم طلب إجازة الأمومة', actor: 'ريما بنت عبدالله الحجرية', actorRole: 'insured' },
        { date: '2024-12-06', action: 'استلام الطلب للمراجعة', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' },
        { date: '2024-12-12', action: 'اعتماد الطلب وبدء الصرف', actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' }
      ]
    }
  ],

  nonPaymentCompanies: [
    {
      id: 'NPC-2025-0001',
      status: 'قيد المراجعة',
      companyName: 'شركة المقاولات المتقدمة',
      crn: '1012345681',
      region: 'مسقط',
      arrearsAmount: 15000,
      arrearsPeriod: '6 أشهر',
      employeeCount: 45,
      lastPaymentDate: '2024-07-15',
      notes: 'الشركة متوقفة عن السداد منذ 6 أشهر',
      timeline: [
        { date: '2024-07-15', action: 'آخر دفع مسجل', actor: 'النظام', actorRole: 'system' },
        { date: '2025-01-10', action: 'رفع الحالة للمراجعة', actor: 'شيماء وليد البريكي', actorRole: 'ops-analyst' }
      ]
    },
    {
      id: 'NPC-2025-0002',
      status: 'قيد المعالجة',
      companyName: 'مؤسسة البناء والتشييد المتكاملة',
      crn: '1012345682',
      region: 'شمال الباطنة',
      arrearsAmount: 22000,
      arrearsPeriod: '8 أشهر',
      employeeCount: 60,
      lastPaymentDate: '2024-05-20',
      notes: 'جاري متابعة الإجراءات القانونية',
      timeline: [
        { date: '2024-05-20', action: 'آخر دفع مسجل', actor: 'النظام', actorRole: 'system' },
        { date: '2025-01-12', action: 'بدء الإجراءات القانونية', actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' }
      ]
    }
  ],

  liquidationBankruptcy: [
    {
      id: 'LB-2024-001',
      status: 'قيد المراجعة',
      establishmentName: 'شركة المقاولات المتقدمة',
      commercialNumber: '12345678',
      caseType: 'إفلاس',
      submissionDate: '2024-04-20',
      insuredCount: 78,
      totalAssets: 450000,
      totalLiabilities: 890000,
      notes: 'قضية إفلاس إجباري',
      timeline: [
        { date: '2024-04-20', action: 'تقديم طلب الإفلاس', actor: 'النظام', actorRole: 'system' },
        { date: '2024-04-21', action: 'استلام الطلب', actor: 'النظام', actorRole: 'system' }
      ]
    },
    {
      id: 'LB-2024-002',
      status: 'قيد التحليل',
      establishmentName: 'مؤسسة التجارة الدولية',
      commercialNumber: '23456789',
      caseType: 'تصفية',
      submissionDate: '2024-04-19',
      insuredCount: 23,
      totalAssets: 120000,
      totalLiabilities: 95000,
      notes: 'قضية تصفية طوعية',
      timeline: [
        { date: '2024-04-19', action: 'تقديم طلب التصفية', actor: 'النظام', actorRole: 'system' }
      ]
    },
    {
      id: 'LB-2024-003',
      status: 'تم الاعتماد',
      establishmentName: 'شركة الصناعات الخفيفة',
      commercialNumber: '34567890',
      caseType: 'تصفية',
      submissionDate: '2024-04-18',
      insuredCount: 45,
      totalAssets: 280000,
      totalLiabilities: 310000,
      notes: 'تم اعتماد القضية',
      timeline: [
        { date: '2024-04-18', action: 'تقديم طلب التصفية', actor: 'النظام', actorRole: 'system' },
        { date: '2024-04-25', action: 'اعتماد القضية', actor: 'النظام', actorRole: 'system' }
      ]
    },
    {
      id: 'LB-2024-004',
      status: 'طلب معلومات إضافية',
      establishmentName: 'مؤسسة الخدمات المتخصصة',
      commercialNumber: '45678901',
      caseType: 'إفلاس',
      submissionDate: '2024-04-17',
      insuredCount: 12,
      totalAssets: 45000,
      totalLiabilities: 180000,
      notes: 'طلب معلومات إضافية',
      timeline: [
        { date: '2024-04-17', action: 'تقديم طلب الإفلاس', actor: 'النظام', actorRole: 'system' }
      ]
    },
    {
      id: 'LB-2024-005',
      status: 'تم الرفض',
      establishmentName: 'شركة التطوير العمراني',
      commercialNumber: '56789012',
      caseType: 'تصفية',
      submissionDate: '2024-04-16',
      insuredCount: 56,
      totalAssets: 520000,
      totalLiabilities: 480000,
      notes: 'تم رفض القضية',
      timeline: [
        { date: '2024-04-16', action: 'تقديم طلب التصفية', actor: 'النظام', actorRole: 'system' },
        { date: '2024-04-28', action: 'رفض القضية', actor: 'النظام', actorRole: 'system' }
      ]
    },
    {
      id: 'LB-2024-006',
      status: 'قيد المراجعة',
      establishmentName: 'مؤسسة الأعمال الحرة',
      commercialNumber: '67890123',
      caseType: 'إفلاس',
      submissionDate: '2024-04-15',
      insuredCount: 18,
      totalAssets: 78000,
      totalLiabilities: 145000,
      notes: 'قيد المراجعة',
      timeline: [
        { date: '2024-04-15', action: 'تقديم طلب الإفلاس', actor: 'النظام', actorRole: 'system' }
      ]
    },
    {
      id: 'LB-2024-007',
      status: 'قيد التحليل',
      establishmentName: 'شركة الاستثمارات الحديثة',
      commercialNumber: '78901234',
      caseType: 'تصفية',
      submissionDate: '2024-04-14',
      insuredCount: 34,
      totalAssets: 195000,
      totalLiabilities: 220000,
      notes: 'قيد التحليل',
      timeline: [
        { date: '2024-04-14', action: 'تقديم طلب التصفية', actor: 'النظام', actorRole: 'system' }
      ]
    },
    {
      id: 'LB-2024-008',
      status: 'قيد المراجعة',
      establishmentName: 'مؤسسة الخليج للأعمال',
      commercialNumber: '89012345',
      caseType: 'إفلاس',
      submissionDate: '2024-04-13',
      insuredCount: 29,
      totalAssets: 310000,
      totalLiabilities: 580000,
      notes: 'تجاوز الخصوم الأصول بشكل كبير',
      timeline: [
        { date: '2024-04-13', action: 'تقديم طلب الإفلاس', actor: 'النظام', actorRole: 'system' }
      ]
    },
    {
      id: 'LB-2024-009',
      status: 'تم الاعتماد',
      establishmentName: 'شركة العمران والتطوير',
      commercialNumber: '90123456',
      caseType: 'تصفية',
      submissionDate: '2024-04-12',
      insuredCount: 61,
      totalAssets: 740000,
      totalLiabilities: 690000,
      notes: 'تصفية طوعية — الأصول تغطي الخصوم',
      timeline: [
        { date: '2024-04-12', action: 'تقديم طلب التصفية', actor: 'النظام', actorRole: 'system' },
        { date: '2024-04-20', action: 'اعتماد الحالة', actor: 'النظام', actorRole: 'system' }
      ]
    },
    {
      id: 'LB-2024-010',
      status: 'طلب معلومات إضافية',
      establishmentName: 'شركة النقل والشحن الدولي',
      commercialNumber: '01234567',
      caseType: 'إفلاس',
      submissionDate: '2024-04-11',
      insuredCount: 42,
      totalAssets: 220000,
      totalLiabilities: 890000,
      notes: 'بانتظار توضيح مصادر الديون',
      timeline: [
        { date: '2024-04-11', action: 'تقديم طلب الإفلاس', actor: 'النظام', actorRole: 'system' }
      ]
    }
  ],

  companiesStoppedPayment: [
    {
      id: 'CSP-2024-001',
      establishmentName: 'شركة البناء والتعمير',
      commercialNumber: '12345678',
      insuredCount: 45,
      stopDate: '2024-04-20',
      status: 'قيد المراجعة',
      riskLevel: 'عالي',
      totalDue: 125000,
      monthsDue: 6,
      notes: 'الشركة متوقفة عن الدفع منذ 6 أشهر',
      timeline: [
        { date: '2024-04-20', action: 'توقف عن الدفع', actor: 'النظام', actorRole: 'system' },
        { date: '2024-04-21', action: 'إشعار المنشأة', actor: 'النظام', actorRole: 'system' }
      ]
    },
    {
      id: 'CSP-2024-002',
      establishmentName: 'مؤسسة التجارة العامة',
      commercialNumber: '23456789',
      insuredCount: 12,
      stopDate: '2024-04-19',
      status: 'قيد التحليل',
      riskLevel: 'متوسط',
      totalDue: 45000,
      monthsDue: 4,
      notes: 'جاري تحليل الوضع المالي',
      timeline: [
        { date: '2024-04-19', action: 'توقف عن الدفع', actor: 'النظام', actorRole: 'system' }
      ]
    },
    {
      id: 'CSP-2024-003',
      establishmentName: 'شركة الخدمات اللوجستية',
      commercialNumber: '34567890',
      insuredCount: 28,
      stopDate: '2024-04-18',
      status: 'تم الاعتماد',
      riskLevel: 'منخفض',
      totalDue: 32000,
      monthsDue: 3,
      notes: 'تم اعتماد الحالة',
      timeline: [
        { date: '2024-04-18', action: 'توقف عن الدفع', actor: 'النظام', actorRole: 'system' },
        { date: '2024-04-25', action: 'اعتماد الحالة', actor: 'النظام', actorRole: 'system' }
      ]
    },
    {
      id: 'CSP-2024-004',
      establishmentName: 'مؤسسة الأعمال الصغيرة',
      commercialNumber: '45678901',
      insuredCount: 8,
      stopDate: '2024-04-17',
      status: 'طلب معلومات إضافية',
      riskLevel: 'عالي',
      totalDue: 18000,
      monthsDue: 2,
      notes: 'طلب معلومات إضافية',
      timeline: [
        { date: '2024-04-17', action: 'توقف عن الدفع', actor: 'النظام', actorRole: 'system' }
      ]
    },
    {
      id: 'CSP-2024-005',
      establishmentName: 'شركة الصناعات الحديثة',
      commercialNumber: '56789012',
      insuredCount: 67,
      stopDate: '2024-04-16',
      status: 'تم الرفض',
      riskLevel: 'عالي',
      totalDue: 250000,
      monthsDue: 12,
      notes: 'تم رفض الحالة',
      timeline: [
        { date: '2024-04-16', action: 'توقف عن الدفع', actor: 'النظام', actorRole: 'system' },
        { date: '2024-04-28', action: 'رفض الحالة', actor: 'النظام', actorRole: 'system' }
      ]
    },
    {
      id: 'CSP-2024-006',
      establishmentName: 'مؤسسة الخدمات المهنية',
      commercialNumber: '67890123',
      insuredCount: 15,
      stopDate: '2024-04-15',
      status: 'قيد المراجعة',
      riskLevel: 'متوسط',
      totalDue: 38000,
      monthsDue: 5,
      notes: 'قيد المراجعة',
      timeline: [
        { date: '2024-04-15', action: 'توقف عن الدفع', actor: 'النظام', actorRole: 'system' }
      ]
    },
    {
      id: 'CSP-2024-007',
      establishmentName: 'شركة التطوير العقاري',
      commercialNumber: '78901234',
      insuredCount: 52,
      stopDate: '2024-04-14',
      status: 'قيد التحليل',
      riskLevel: 'منخفض',
      totalDue: 67000,
      monthsDue: 7,
      notes: 'قيد التحليل',
      timeline: [
        { date: '2024-04-14', action: 'توقف عن السداد', actor: 'النظام', actorRole: 'system' }
      ]
    },
    {
      id: 'CSP-2024-008',
      establishmentName: 'شركة البترول والطاقة',
      commercialNumber: '89012345',
      insuredCount: 120,
      stopDate: '2024-04-13',
      status: 'قيد المراجعة',
      riskLevel: 'عالي',
      totalDue: 480000,
      monthsDue: 14,
      notes: 'متأخرات ضخمة تستوجب تدخلاً عاجلاً',
      timeline: [
        { date: '2024-04-13', action: 'توقف عن السداد', actor: 'النظام', actorRole: 'system' },
        { date: '2024-04-14', action: 'إشعار المنشأة', actor: 'النظام', actorRole: 'system' }
      ]
    },
    {
      id: 'CSP-2024-009',
      establishmentName: 'مؤسسة الرياضة والترفيه',
      commercialNumber: '90123456',
      insuredCount: 19,
      stopDate: '2024-04-12',
      status: 'تم الاعتماد',
      riskLevel: 'منخفض',
      totalDue: 22000,
      monthsDue: 3,
      notes: 'تم الاتفاق على خطة سداد',
      timeline: [
        { date: '2024-04-12', action: 'توقف عن السداد', actor: 'النظام', actorRole: 'system' },
        { date: '2024-04-22', action: 'اعتماد خطة السداد', actor: 'النظام', actorRole: 'system' }
      ]
    },
    {
      id: 'CSP-2024-010',
      establishmentName: 'شركة الاستشارات المالية',
      commercialNumber: '01234568',
      insuredCount: 35,
      stopDate: '2024-04-11',
      status: 'قيد التحليل',
      riskLevel: 'متوسط',
      totalDue: 95000,
      monthsDue: 8,
      notes: 'جاري دراسة الوضع المالي',
      timeline: [
        { date: '2024-04-11', action: 'توقف عن السداد', actor: 'النظام', actorRole: 'system' }
      ]
    }
  ]
};
