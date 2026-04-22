/* ================================================================
   data.js — بيانات نموذجية لنظام إدارة التفتيش
   ================================================================ */

const INSP_DATA = {

  users: {
    'fund-staff':           { name: 'منى راشد البلوشي',      civil: '09123456', phone: '96890012345', email: 'mona.b@spf.gov.om',       dept: 'الصندوق' },
    'employer':             { name: 'طارق سعيد الكلباني',    civil: '08234567', phone: '96891023456', email: 'tariq.k@ntc.com.om',        dept: 'شركة التقنية الوطنية' },
    'insured':              { name: 'أسماء محمد الحارثي',    civil: '07345678', phone: '96892034567', email: 'asmaa.h@gmail.com',          dept: 'مصنع الإنتاج الغذائي الخليجي' },
    'monitoring-employee':  { name: 'سيف خلفان الأمري',      civil: '06456789', phone: '96893045678', email: 'saif.a@spf.gov.om',         dept: 'قسم المتابعة والبلاغات' },
    'monitoring-head':      { name: 'نجلاء عبدالله القاسمي', civil: '05567890', phone: '96894056789', email: 'najla.q@spf.gov.om',        dept: 'قسم المتابعة والبلاغات' },
    'field-inspector':      { name: 'حاتم سالم الزدجالي',    civil: '04678901', phone: '96895067890', email: 'hatem.z@spf.gov.om',        dept: 'قسم التفتيش الميداني' },
    'field-head':           { name: 'ريما يوسف النبهانية',   civil: '03789012', phone: '96896078901', email: 'rima.n@spf.gov.om',         dept: 'قسم التفتيش الميداني' },
    'inspection-director':  { name: 'عبدالعزيز هلال الراشدي', civil: '02890123', phone: '96897089012', email: 'abdulaziz.r@spf.gov.om',  dept: 'دائرة التفتيش' },
    'ops-analyst':          { name: 'شيماء وليد البريكي',    civil: '01901234', phone: '96898090123', email: 'shaimaa.b@spf.gov.om',      dept: 'دائرة التفتيش — التحليل' },
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
      contributions: { status: 'منتظم', lastPaid: '2025-01-01', arrears: 0 }
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
      contributions: { status: 'متأخر', lastPaid: '2024-09-01', arrears: 8400 }
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
      contributions: { status: 'متأخر جزئياً', lastPaid: '2024-11-01', arrears: 2200 }
    }
  ],

  workers: [
    {
      id: 'WRK-001',
      name: 'أحمد محمد القحطاني',
      civil: '0912345001',
      nationality: 'عُماني',
      employer: 'شركة التقنية الوطنية',
      employerId: 'EMP-001',
      position: 'مهندس برمجيات',
      insuredFrom: '2015-04-01',
      salary: 1200,
      riskIndicators: ['تغيير صاحب العمل مرتين خلال 6 أشهر']
    },
    {
      id: 'WRK-002',
      name: 'فاطمة خالد العمري',
      civil: '0734567002',
      nationality: 'عُماني',
      employer: 'مصنع الإنتاج الغذائي الخليجي',
      employerId: 'EMP-002',
      position: 'عاملة خط إنتاج',
      insuredFrom: '2018-09-15',
      salary: 400,
      riskIndicators: ['تأخر في صرف الاشتراكات لثلاثة أشهر', 'بلاغ سابق مُغلق']
    },
    {
      id: 'WRK-003',
      name: 'سالم عبدالله الرشيدي',
      civil: '0467890003',
      nationality: 'عُماني',
      employer: 'مؤسسة البناء والتشييد المتكاملة',
      employerId: 'EMP-003',
      position: 'عامل بناء متخصص',
      insuredFrom: '2020-02-20',
      salary: 450,
      riskIndicators: ['بيئة عمل عالية المخاطر', 'بلاغان جاريان', 'زيارة ميدانية نشطة']
    }
  ],

  complaints: [
    {
      id: 'INSP-BLG-2025-0001',
      type: 'مخالفة نظام العمل',
      subtype: 'عدم الالتزام بعقد العمل',
      channel: 'منصة إلكترونية — صاحب العمل',
      status: 'قيد الدراسة والتحقق',
      submittedBy: 'employer',
      submittedByName: 'طارق سعيد الكلباني',
      submitDate: '2025-01-05',
      employerId: 'EMP-001',
      employerName: 'شركة التقنية الوطنية',
      workerId: 'WRK-001',
      workerName: 'أحمد محمد القحطاني',
      description: 'يرغب صاحب العمل في الإبلاغ عن موظف يتغيب بشكل متكرر دون إشعار أو سبب مشروع مما يؤثر على سير العمل.',
      assignedTo: 'سيف خلفان الأمري',
      assignedToRole: 'monitoring-employee',
      priority: 'متوسط',
      dueDate: '2025-01-20',
      attachments: [
        { name: 'كشف الحضور والغياب.pdf', size: '320 KB', date: '2025-01-05', type: 'pdf' },
        { name: 'صورة من عقد العمل.pdf', size: '850 KB', date: '2025-01-05', type: 'pdf' }
      ],
      timeline: [
        { date: '2025-01-05 09:30', action: 'تم تقديم البلاغ إلكترونياً', actor: 'طارق سعيد الكلباني', actorRole: 'employer' },
        { date: '2025-01-05 11:00', action: 'تم تعيين الموظف المختص تلقائياً', actor: 'النظام', actorRole: 'system' },
        { date: '2025-01-06 08:45', action: 'بدأ الموظف دراسة البلاغ', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' }
      ],
      notes: [{ text: 'تم التحقق من سجلات الحضور — يُلاحظ غياب متكرر خلال الأشهر الثلاثة الماضية.', author: 'سيف خلفان الأمري', date: '2025-01-06' }],
      investigationResults: null
    },
    {
      id: 'INSP-BLG-2025-0002',
      type: 'تقصير في الاشتراكات التأمينية',
      subtype: 'عدم سداد الاشتراكات لأكثر من شهرين',
      channel: 'إحالة داخلية',
      status: 'تم جدولة زيارة تفتيشية',
      submittedBy: 'fund-staff',
      submittedByName: 'منى راشد البلوشي',
      submitDate: '2024-12-20',
      employerId: 'EMP-002',
      employerName: 'مصنع الإنتاج الغذائي الخليجي',
      workerId: null,
      workerName: null,
      description: 'تبيّن من خلال التقارير الداخلية أن المنشأة لم تسدد اشتراكات التأمين لمدة ثلاثة أشهر متتالية (أكتوبر–ديسمبر 2024).',
      assignedTo: 'سيف خلفان الأمري',
      assignedToRole: 'monitoring-employee',
      priority: 'مرتفع',
      dueDate: '2025-01-10',
      attachments: [{ name: 'تقرير الاشتراكات المتأخرة.pdf', size: '1.2 MB', date: '2024-12-20', type: 'pdf' }],
      timeline: [
        { date: '2024-12-20 10:00', action: 'تم رفع البلاغ داخلياً', actor: 'منى راشد البلوشي', actorRole: 'fund-staff' },
        { date: '2024-12-21 08:30', action: 'تم تعيين الموظف المختص', actor: 'النظام', actorRole: 'system' },
        { date: '2024-12-22 09:00', action: 'بدأ الموظف دراسة البلاغ', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' },
        { date: '2025-01-02 11:00', action: 'طلب جدولة زيارة ميدانية', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' },
        { date: '2025-01-03 09:00', action: 'اعتماد الجدولة من رئيس القسم', actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' },
        { date: '2025-01-05 10:00', action: 'تم جدولة زيارة مفاجئة بتاريخ 2025-01-12', actor: 'حاتم سالم الزدجالي', actorRole: 'field-inspector' }
      ],
      notes: [],
      investigationResults: null
    },
    {
      id: 'INSP-BLG-2025-0003',
      type: 'ظروف عمل غير آمنة',
      subtype: 'غياب معدات الحماية الشخصية',
      channel: 'منصة إلكترونية — مؤمن عليه',
      status: 'تم إصدار قرار بشأن البلاغ',
      submittedBy: 'insured',
      submittedByName: 'أسماء محمد الحارثي',
      submitDate: '2024-11-10',
      employerId: 'EMP-002',
      employerName: 'مصنع الإنتاج الغذائي الخليجي',
      workerId: 'WRK-002',
      workerName: 'أسماء محمد الحارثي',
      description: 'لا يوفر المصنع معدات الحماية الشخصية الكافية للعاملين في خط الإنتاج ولا تتوفر إجراءات السلامة عند التعامل مع المواد الكيميائية.',
      assignedTo: 'سيف خلفان الأمري',
      assignedToRole: 'monitoring-employee',
      priority: 'مرتفع',
      dueDate: '2024-11-25',
      attachments: [
        { name: 'صور من موقع العمل.zip', size: '4.5 MB', date: '2024-11-10', type: 'oth' },
        { name: 'تقرير السلامة المهنية.pdf', size: '980 KB', date: '2024-11-10', type: 'pdf' }
      ],
      timeline: [
        { date: '2024-11-10 14:00', action: 'تم تقديم البلاغ إلكترونياً', actor: 'أسماء محمد الحارثي', actorRole: 'insured' },
        { date: '2024-11-12 10:00', action: 'بدأ الموظف دراسة البلاغ', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' },
        { date: '2024-11-19 09:30', action: 'اعتمد رئيس القسم توجيه الزيارة الميدانية', actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' },
        { date: '2024-11-25 10:00', action: 'تمت الزيارة الميدانية ورُفع المحضر', actor: 'حاتم سالم الزدجالي', actorRole: 'field-inspector' },
        { date: '2024-11-28 11:00', action: 'تم اعتماد المحضر ورفع الملف للمدير', actor: 'ريما يوسف النبهانية', actorRole: 'field-head' },
        { date: '2024-12-01 10:00', action: 'تم إصدار قرار بإلزام المنشأة وتغريمها 500 ريال', actor: 'عبدالعزيز هلال الراشدي', actorRole: 'inspection-director' }
      ],
      notes: [{ text: 'تم التحقق من الشكاوى وتأكدت صحتها خلال الزيارة الميدانية.', author: 'حاتم سالم الزدجالي', date: '2024-11-25' }],
      investigationResults: {
        outcome: 'ثبوت المخالفة',
        findings: 'أثبتت الزيارة الميدانية غياب معدات السلامة وعدم وجود بروتوكولات التعامل مع المواد الكيميائية.',
        corrective: 'إلزام المنشأة بتوفير معدات الحماية الكاملة وتدريب العاملين خلال 30 يوماً',
        fine: '500 ريال عُماني',
        decisionDate: '2024-12-01'
      }
    },
    {
      id: 'INSP-BLG-2025-0004',
      type: 'انتهاك ساعات العمل',
      subtype: 'تجاوز الحد الأقصى لساعات العمل الأسبوعي',
      channel: 'منصة إلكترونية — صاحب العمل',
      status: 'تم تقديم البلاغ — بانتظار تعيين المختص',
      submittedBy: 'employer',
      submittedByName: 'طارق سعيد الكلباني',
      submitDate: '2025-01-10',
      employerId: 'EMP-001',
      employerName: 'شركة التقنية الوطنية',
      workerId: 'WRK-001',
      workerName: 'أحمد محمد القحطاني',
      description: 'يستفسر صاحب العمل عن الحدود القانونية لساعات الأوفر تايم في إطار المشاريع الطارئة.',
      assignedTo: null,
      assignedToRole: null,
      priority: 'منخفض',
      dueDate: '2025-01-25',
      attachments: [],
      timeline: [{ date: '2025-01-10 10:30', action: 'تم تقديم البلاغ إلكترونياً', actor: 'طارق سعيد الكلباني', actorRole: 'employer' }],
      notes: [],
      investigationResults: null
    },
    {
      id: 'INSP-BLG-2024-0097',
      type: 'شكوى عمالية',
      subtype: 'فصل تعسفي',
      channel: 'منصة إلكترونية — مؤمن عليه',
      status: 'تم إغلاق البلاغ',
      submittedBy: 'insured',
      submittedByName: 'سالم عبدالله الرشيدي',
      submitDate: '2024-09-15',
      employerId: 'EMP-003',
      employerName: 'مؤسسة البناء والتشييد المتكاملة',
      workerId: 'WRK-003',
      workerName: 'سالم عبدالله الرشيدي',
      description: 'يدّعي الموظف أنه فُصل من العمل دون سبب مشروع بعد خدمة تجاوزت 10 سنوات ويطالب بالتعويضات النظامية.',
      assignedTo: 'سيف خلفان الأمري',
      assignedToRole: 'monitoring-employee',
      priority: 'مرتفع',
      dueDate: '2024-10-01',
      attachments: [
        { name: 'خطاب إنهاء الخدمة.pdf', size: '240 KB', date: '2024-09-15', type: 'pdf' },
        { name: 'سجل الخدمة.pdf', size: '680 KB', date: '2024-09-15', type: 'pdf' }
      ],
      timeline: [
        { date: '2024-09-15 13:00', action: 'تم تقديم البلاغ', actor: 'سالم عبدالله الرشيدي', actorRole: 'insured' },
        { date: '2024-09-28 11:00', action: 'توجيه للمصالحة والتسوية', actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' },
        { date: '2024-10-05 15:00', action: 'تم إغلاق البلاغ بعد تسوية ودية', actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' }
      ],
      notes: [],
      investigationResults: { outcome: 'تسوية ودية', findings: 'تم التوصل إلى اتفاق ودي بين الطرفين.', corrective: null, fine: null, decisionDate: '2024-10-05' }
    },
    {
      id: 'INSP-BLG-2025-0006',
      type: 'إشارة خارجية',
      subtype: 'مخالفة متكررة من وزارة الموارد البشرية',
      channel: 'إحالة رسمية خارجية',
      status: 'مرفوع من جهة رسمية — بانتظار تعيين المختص',
      submittedBy: 'external-ref',
      submittedByName: 'وزارة الموارد البشرية والتنمية الاجتماعية',
      submitDate: '2025-01-12',
      employerId: 'EMP-003',
      employerName: 'مؤسسة البناء والتشييد المتكاملة',
      workerId: null,
      workerName: null,
      description: 'أحالت الوزارة ملف المنشأة بسبب مخالفات متكررة في اشتراطات السلامة المهنية.',
      assignedTo: null,
      assignedToRole: null,
      priority: 'عاجل',
      dueDate: '2025-01-18',
      attachments: [
        { name: 'خطاب الإحالة الرسمية.pdf', size: '1.1 MB', date: '2025-01-12', type: 'pdf' },
        { name: 'ملف المخالفات السابقة.pdf', size: '2.3 MB', date: '2025-01-12', type: 'pdf' }
      ],
      timeline: [
        { date: '2025-01-12 10:00', action: 'تم استلام الإحالة الرسمية من وزارة الموارد البشرية', actor: 'منى راشد البلوشي', actorRole: 'fund-staff' },
        { date: '2025-01-12 10:30', action: 'تم تسجيل البلاغ في النظام', actor: 'منى راشد البلوشي', actorRole: 'fund-staff' }
      ],
      notes: [],
      investigationResults: null
    }
  ],

  appeals: [
    {
      id: 'INSP-TZL-2025-0001',
      relatedId: 'INSP-BLG-2025-0003',
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
        { name: 'شهادات تدريب السلامة.pdf', size: '1.4 MB', date: '2024-12-03', type: 'pdf' }
      ],
      timeline: [
        { date: '2024-12-03 11:00', action: 'تم تقديم التظلم', actor: 'طارق سعيد الكلباني', actorRole: 'employer' },
        { date: '2024-12-05 10:00', action: 'بدء دراسة التظلم', actor: 'سيف خلفان الأمري', actorRole: 'monitoring-employee' }
      ],
      notes: [],
      decision: null
    },
    {
      id: 'INSP-TZL-2025-0002',
      relatedId: 'INSP-BLG-2024-0097',
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
        { date: '2024-10-10 13:00', action: 'تم تقديم التظلم', actor: 'سالم عبدالله الرشيدي', actorRole: 'insured' },
        { date: '2024-10-15 11:00', action: 'رفض التظلم بعد مراجعة اتفاقية التسوية', actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' }
      ],
      notes: [],
      decision: { outcome: 'رفض التظلم', reason: 'اتفاقية التسوية الموقعة تغطي كامل المستحقات المطالب بها.', decisionDate: '2024-10-15', decisionBy: 'نجلاء عبدالله القاسمي' }
    },
    {
      id: 'INSP-TZL-2025-0003',
      relatedId: 'ZYR-MFJ-2025-0001',
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
      timeline: [{ date: '2025-01-14 14:00', action: 'تم تقديم التظلم', actor: 'طارق سعيد الكلباني', actorRole: 'employer' }],
      notes: [],
      decision: null
    },
    {
      id: 'INSP-TZL-2024-0089',
      relatedId: 'INSP-HZR-2025-0001',
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
        { name: 'شهادات الامتثال.pdf', size: '2.1 MB', date: '2024-12-20', type: 'pdf' },
        { name: 'تقرير إدارة الجودة.pdf', size: '1.8 MB', date: '2024-12-20', type: 'pdf' }
      ],
      timeline: [
        { date: '2024-12-20 10:00', action: 'تم تقديم التظلم', actor: 'ممثل مؤسسة البناء', actorRole: 'employer' },
        { date: '2024-12-23 11:00', action: 'التوصية بقبول التظلم وإعادة الفحص', actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' }
      ],
      notes: [{ text: 'المستندات الجديدة تُظهر تحسناً ملموساً — يُوصى بزيارة إعادة فحص.', author: 'نجلاء عبدالله القاسمي', date: '2024-12-23' }],
      decision: null
    }
  ],

  visits: {
    periodic: [
      {
        id: 'ZYR-DWR-2025-0001',
        planId: 'KHT-2025-Q1',
        employerId: 'EMP-001',
        employerName: 'شركة التقنية الوطنية',
        inspectorName: 'حاتم سالم الزدجالي',
        scheduledDate: '2025-01-20',
        actualDate: null,
        status: 'مجدولة',
        priority: 'عادية',
        checklistItems: [
          { item: 'التحقق من سجلات الحضور والانصراف', done: false },
          { item: 'مراجعة عقود العمل والتأكد من توافقها مع النظام', done: false },
          { item: 'فحص بيئة العمل وشروط السلامة', done: false },
          { item: 'التحقق من سداد الاشتراكات التأمينية', done: false },
          { item: 'مراجعة ملفات التأمين الصحي للعاملين', done: false }
        ],
        findings: null, report: null,
        timeline: [
          { date: '2024-12-15', action: 'إدراج المنشأة في خطة الربع الأول 2025', actor: 'شيماء وليد البريكي', actorRole: 'ops-analyst' },
          { date: '2025-01-05', action: 'تعيين المفتش الميداني', actor: 'ريما يوسف النبهانية', actorRole: 'field-head' },
          { date: '2025-01-06', action: 'تأكيد موعد الزيارة', actor: 'حاتم سالم الزدجالي', actorRole: 'field-inspector' }
        ]
      },
      {
        id: 'ZYR-DWR-2025-0002',
        planId: 'KHT-2025-Q1',
        employerId: 'EMP-002',
        employerName: 'مصنع الإنتاج الغذائي الخليجي',
        inspectorName: 'حاتم سالم الزدجالي',
        scheduledDate: '2025-01-12',
        actualDate: '2025-01-12',
        status: 'بانتظار مراجعة المحضر',
        priority: 'مرتفعة',
        checklistItems: [
          { item: 'التحقق من سجلات الحضور والانصراف', done: true },
          { item: 'مراجعة عقود العمل', done: true },
          { item: 'فحص بيئة العمل وشروط السلامة', done: true },
          { item: 'التحقق من سداد الاشتراكات التأمينية', done: true },
          { item: 'مراجعة ملفات التأمين الصحي', done: false }
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
          { date: '2025-01-05', action: 'تعيين المفتش', actor: 'ريما يوسف النبهانية', actorRole: 'field-head' },
          { date: '2025-01-12', action: 'تنفيذ الزيارة ورفع المحضر', actor: 'حاتم سالم الزدجالي', actorRole: 'field-inspector' }
        ]
      },
      {
        id: 'ZYR-DWR-2024-0095',
        planId: 'KHT-2024-Q4',
        employerId: 'EMP-003',
        employerName: 'مؤسسة البناء والتشييد المتكاملة',
        inspectorName: 'حاتم سالم الزدجالي',
        scheduledDate: '2024-12-10',
        actualDate: '2024-12-10',
        status: 'تم اعتماد المحضر',
        priority: 'مرتفعة',
        checklistItems: [
          { item: 'التحقق من سجلات الحضور', done: true },
          { item: 'مراجعة عقود العمل', done: true },
          { item: 'فحص بيئة العمل', done: true },
          { item: 'التحقق من سداد الاشتراكات', done: true },
          { item: 'مراجعة التأمين الصحي', done: true }
        ],
        findings: {
          summary: 'مخالفات جسيمة في السلامة المهنية وإدارة الموارد البشرية.',
          violations: ['غياب معدات السلامة لـ 45 عاملاً', 'عدم صرف رواتب 8 عمال منذ شهرين', 'عمالة أجنبية غير نظامية (15 عاملاً)'],
          correctiveActions: ['توفير معدات السلامة فوراً', 'صرف الرواتب المتأخرة', 'تسوية أوضاع العمالة الأجنبية']
        },
        report: { approved: true, approvedBy: 'ريما يوسف النبهانية', approvalDate: '2024-12-15' },
        timeline: [
          { date: '2024-12-10', action: 'تنفيذ الزيارة', actor: 'حاتم سالم الزدجالي', actorRole: 'field-inspector' },
          { date: '2024-12-15', action: 'اعتماد المحضر', actor: 'ريما يوسف النبهانية', actorRole: 'field-head' }
        ]
      }
    ],
    surprise: [
      {
        id: 'ZYR-MFJ-2025-0001',
        source: 'بلاغ INSP-BLG-2025-0002',
        reason: 'بلاغ بعدم سداد الاشتراكات التأمينية',
        employerId: 'EMP-002',
        employerName: 'مصنع الإنتاج الغذائي الخليجي',
        inspectorName: 'حاتم سالم الزدجالي',
        scheduledDate: '2025-01-12',
        actualDate: '2025-01-12',
        status: 'بانتظار إجراء تصحيحي',
        checklistItems: [
          { item: 'التحقق من سجلات الدفع للصندوق', done: true },
          { item: 'فحص قوائم الرواتب', done: true },
          { item: 'مقابلة ممثل المنشأة', done: true }
        ],
        findings: {
          summary: 'تم تأكيد عدم سداد اشتراكات 3 أشهر.',
          violations: ['عدم سداد اشتراكات أكتوبر–ديسمبر 2024 البالغة 8,400 ريال عُماني'],
          correctiveActions: ['سداد الاشتراكات المتأخرة فوراً أو تقديم خطة سداد']
        },
        report: null,
        timeline: [
          { date: '2025-01-10', action: 'أمر بتنفيذ زيارة مفاجئة', actor: 'ريما يوسف النبهانية', actorRole: 'field-head' },
          { date: '2025-01-12', action: 'تنفيذ الزيارة ورفع المحضر', actor: 'حاتم سالم الزدجالي', actorRole: 'field-inspector' }
        ]
      },
      {
        id: 'ZYR-MFJ-2024-0088',
        source: 'اشتباه داخلي',
        reason: 'تقارير عن مخالفات جسيمة محتملة',
        employerId: 'EMP-003',
        employerName: 'مؤسسة البناء والتشييد المتكاملة',
        inspectorName: 'حاتم سالم الزدجالي',
        scheduledDate: '2024-11-20',
        actualDate: '2024-11-20',
        status: 'تم اعتماد المحضر',
        checklistItems: [
          { item: 'فحص مواقع العمل', done: true },
          { item: 'مراجعة سجلات التأمين', done: true },
          { item: 'فحص الرواتب', done: true }
        ],
        findings: {
          summary: 'مخالفات جوهرية في السلامة والرواتب.',
          violations: ['مخالفات سلامة في مواقع البناء النشطة', 'تأخر في صرف رواتب 12 عاملاً'],
          correctiveActions: ['تصحيح فوري لبيئة السلامة', 'صرف الرواتب المتأخرة خلال 72 ساعة']
        },
        report: { approved: true, approvedBy: 'ريما يوسف النبهانية', approvalDate: '2024-11-25' },
        timeline: [
          { date: '2024-11-20', action: 'تنفيذ الزيارة المفاجئة', actor: 'حاتم سالم الزدجالي', actorRole: 'field-inspector' },
          { date: '2024-11-25', action: 'اعتماد المحضر', actor: 'ريما يوسف النبهانية', actorRole: 'field-head' }
        ]
      }
    ],
    scheduled: [
      {
        id: 'ZYR-MJD-2025-0001',
        relatedId: 'INSP-BLG-2025-0003',
        relatedType: 'بلاغ',
        employerId: 'EMP-002',
        employerName: 'مصنع الإنتاج الغذائي الخليجي',
        inspectorName: 'حاتم سالم الزدجالي',
        scheduledDate: '2024-11-25',
        actualDate: '2024-11-25',
        status: 'تم اعتماد المحضر',
        purpose: 'متابعة بلاغ ظروف العمل غير الآمنة',
        checklistItems: [
          { item: 'التحقق من توفر معدات الحماية', done: true },
          { item: 'فحص بروتوكولات السلامة', done: true },
          { item: 'مقابلة العاملين في خط الإنتاج', done: true }
        ],
        findings: {
          summary: 'تأكيد الشكاوى الواردة في البلاغ.',
          violations: ['غياب 30% من معدات الحماية الشخصية المطلوبة', 'عدم وجود بروتوكول مكتوب للتعامل مع المواد الكيميائية'],
          correctiveActions: ['توفير المعدات خلال أسبوعين', 'وضع بروتوكول مكتوب للسلامة']
        },
        report: { approved: true, approvedBy: 'ريما يوسف النبهانية', approvalDate: '2024-11-28' },
        timeline: [
          { date: '2024-11-19', action: 'أمر بجدولة الزيارة بناءً على البلاغ', actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' },
          { date: '2024-11-25', action: 'تنفيذ الزيارة', actor: 'حاتم سالم الزدجالي', actorRole: 'field-inspector' },
          { date: '2024-11-28', action: 'اعتماد المحضر', actor: 'ريما يوسف النبهانية', actorRole: 'field-head' }
        ]
      },
      {
        id: 'ZYR-MJD-2025-0002',
        relatedId: 'INSP-TZL-2024-0089',
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
          { item: 'فحص بيئة السلامة', done: false },
          { item: 'مراجعة سجلات التأمين الاجتماعي', done: false }
        ],
        findings: null, report: null,
        timeline: [
          { date: '2024-12-23', action: 'الأمر بجدولة زيارة إعادة فحص', actor: 'نجلاء عبدالله القاسمي', actorRole: 'monitoring-head' },
          { date: '2025-01-05', action: 'تعيين المفتش للزيارة', actor: 'ريما يوسف النبهانية', actorRole: 'field-head' }
        ]
      }
    ]
  },

  inspectionPlans: [
    {
      id: 'KHT-2025-Q1',
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
      id: 'KHT-2024-Q4',
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
      id: 'INSP-HZR-2025-0001',
      type: 'حظر توظيف جديد',
      employerId: 'EMP-003',
      employerName: 'مؤسسة البناء والتشييد المتكاملة',
      reason: 'مخالفات متكررة في السلامة المهنية وعدم الالتزام بالإجراءات التصحيحية خلال 3 زيارات متتالية',
      relatedVisitId: 'ZYR-DWR-2024-0095',
      status: 'سارٍ — حظر نشط',
      issuedDate: '2025-01-05',
      issuedBy: 'عبدالعزيز هلال الراشدي',
      duration: '90 يوماً',
      expiryDate: '2025-04-05',
      conditions: ['إثبات تصحيح جميع المخالفات المُوثَّقة', 'تقديم خطة استيفاء معتمدة', 'اجتياز زيارة إعادة فحص ناجحة'],
      timeline: [{ date: '2025-01-05', action: 'إصدار قرار الحظر', actor: 'عبدالعزيز هلال الراشدي', actorRole: 'inspection-director' }]
    },
    {
      id: 'INSP-HZR-2024-0045',
      type: 'حظر استقدام عمالة',
      employerId: 'EMP-002',
      employerName: 'مصنع الإنتاج الغذائي الخليجي',
      reason: 'وجود عمالة أجنبية غير نظامية وعدم الامتثال لنسب العُمنة المطلوبة',
      relatedVisitId: 'ZYR-MFJ-2024-0088',
      status: 'تم رفع الحظر',
      issuedDate: '2024-09-15',
      issuedBy: 'عبدالعزيز هلال الراشدي',
      duration: '60 يوماً',
      expiryDate: '2024-11-15',
      conditions: ['تصحيح أوضاع العمالة الأجنبية', 'رفع نسبة العُمنة للحد المطلوب'],
      liftedDate: '2024-11-10',
      liftedBy: 'عبدالعزيز هلال الراشدي',
      timeline: [
        { date: '2024-09-15', action: 'إصدار قرار الحظر', actor: 'عبدالعزيز هلال الراشدي', actorRole: 'inspection-director' },
        { date: '2024-11-10', action: 'رفع الحظر بعد إثبات الامتثال', actor: 'عبدالعزيز هلال الراشدي', actorRole: 'inspection-director' }
      ]
    }
  ]

};
