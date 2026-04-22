/* ================================================================
   config.js — تعريف الأدوار والقوائم الجانبية
   نظام إدارة التفتيش — صندوق الحماية الاجتماعية
   ================================================================
   الأدوار:
   1  مستخدم داخلي للصندوق                     داخلي
   2  المستخدم الخارجي (جهة العمل)              خارجي
   3  المستخدم الخارجي (المؤمن عليه)            خارجي
   4  موظف قسم المتابعة والبلاغات               داخلي
   5  رئيس قسم المتابعة والبلاغات               داخلي
   6  المفتش الميداني                            داخلي
   7  رئيس قسم التفتيش الميداني                  داخلي
   8  مدير دائرة التفتيش                         داخلي
   9  محلل العمليات                              داخلي
   ================================================================ */

const INSP_CONFIG = {

  roles: {

    'fund-staff': {
      id: 1,
      nameAr: 'مستخدم داخلي للصندوق',
      type: 'internal',
      folder: 'fund-staff',
      avatarInitials: 'مص',
      canCreate: true,
      sidebar: [
        { label: 'قائمة البلاغات', page: 'complaints-list', icon: 'inbox', badge: 'complaints' },
        { label: 'إنشاء بلاغ جديد', page: 'complaint-new', icon: 'plus', badge: null },
      ]
    },

    'employer': {
      id: 2,
      nameAr: 'المستخدم الخارجي (جهة العمل)',
      type: 'external',
      folder: 'employer',
      avatarInitials: 'جع',
      canCreate: true,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'قائمة البلاغات', page: 'complaints-list', icon: 'list', badge: 'complaints' },
        { label: 'قائمة التظلمات', page: 'appeals-list', icon: 'list', badge: null },
        { label: 'قائمة الزيارات التفتيشية', page: 'visits-list', icon: 'clipboard', badge: null },
        { label: 'قائمة التقارير', page: 'reports-list', icon: 'file', badge: null },
      ]
    },

    'insured': {
      id: 3,
      nameAr: 'المستخدم الخارجي (المؤمن عليه)',
      type: 'external',
      folder: 'insured',
      avatarInitials: 'مع',
      canCreate: true,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'قائمة البلاغات', page: 'complaints-list', icon: 'list', badge: 'complaints' },
        { label: 'قائمة التظلمات', page: 'appeals-list', icon: 'list', badge: null },
        { label: 'قائمة التقارير', page: 'reports-list', icon: 'file', badge: null },
      ]
    },

    'monitoring-employee': {
      id: 4,
      nameAr: 'موظف قسم المتابعة والبلاغات',
      type: 'internal',
      folder: 'monitoring-employee',
      avatarInitials: 'مب',
      canCreate: true,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'قائمة البلاغات', page: 'complaints-list', icon: 'inbox', badge: 'complaints' },
        { label: 'قائمة التظلمات', page: 'appeals-list', icon: 'list', badge: 'appeals' },
        { label: 'تحليل بيانات العامل', page: 'worker-analysis', icon: 'chart', badge: null },
        { label: 'تحليل بيانات صاحب العمل', page: 'employer-analysis', icon: 'building', badge: null },
        { label: 'قائمة التقارير', page: 'reports-list', icon: 'file', badge: null },
      ]
    },

    'monitoring-head': {
      id: 5,
      nameAr: 'رئيس قسم المتابعة والبلاغات',
      type: 'internal',
      folder: 'monitoring-head',
      avatarInitials: 'رب',
      canCreate: false,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'قائمة البلاغات', page: 'complaints-list', icon: 'list', badge: 'complaints' },
        { label: 'قائمة التظلمات', page: 'appeals-list', icon: 'list', badge: 'appeals' },
        { label: 'تحليل بيانات العامل', page: 'worker-analysis', icon: 'chart', badge: null },
        { label: 'تحليل بيانات صاحب العمل', page: 'employer-analysis', icon: 'building', badge: null },
        { label: 'إعادة التخصيص', page: 'reassignment', icon: 'switch', badge: null },
        { label: 'متابعة الأعمال المتأخرة', page: 'overdue-tracking', icon: 'clock', badge: 'overdue' },
        { label: 'مراقبة عبء العمل', page: 'workload-monitoring', icon: 'user', badge: null },
        { label: 'قائمة التقارير', page: 'reports-list', icon: 'file', badge: null },
      ]
    },

    'field-inspector': {
      id: 6,
      nameAr: 'المفتش الميداني',
      type: 'internal',
      folder: 'field-inspector',
      avatarInitials: 'مف',
      canCreate: true,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'قائمة الزيارات الدورية', page: 'visits-periodic-list', icon: 'calendar', badge: null },
        { label: 'قائمة الزيارات المفاجئة', page: 'visits-surprise-list', icon: 'clipboard', badge: 'surprise' },
        { label: 'قائمة الزيارات المجدولة', page: 'visits-scheduled-list', icon: 'list', badge: 'scheduled' },
        { label: 'تحليل بيانات العامل', page: 'worker-analysis', icon: 'chart', badge: null },
        { label: 'تحليل بيانات صاحب العمل', page: 'employer-analysis', icon: 'building', badge: null },
        { label: 'قائمة التقارير', page: 'reports-list', icon: 'file', badge: null },
      ]
    },

    'field-head': {
      id: 7,
      nameAr: 'رئيس قسم التفتيش الميداني',
      type: 'internal',
      folder: 'field-head',
      avatarInitials: 'رف',
      canCreate: true,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'قائمة الزيارات الدورية', page: 'visits-periodic-list', icon: 'calendar', badge: null },
        { label: 'قائمة الزيارات المفاجئة', page: 'visits-surprise-list', icon: 'clipboard', badge: null },
        { label: 'قائمة الزيارات المجدولة', page: 'visits-scheduled-list', icon: 'list', badge: null },
        { label: 'مراجعة المحاضر', page: 'records-review', icon: 'pen', badge: 'records' },
        { label: 'متابعة الإجراءات التصحيحية', page: 'corrective-actions', icon: 'check', badge: null },
        { label: 'إعادة توزيع المفتشين', page: 'inspector-redistribution', icon: 'switch', badge: null },
        { label: 'تحليل بيانات العامل', page: 'worker-analysis', icon: 'chart', badge: null },
        { label: 'تحليل بيانات صاحب العمل', page: 'employer-analysis', icon: 'building', badge: null },
        { label: 'قائمة التقارير', page: 'reports-list', icon: 'file', badge: null },
      ]
    },

    'inspection-director': {
      id: 8,
      nameAr: 'مدير دائرة التفتيش',
      type: 'internal',
      folder: 'inspection-director',
      avatarInitials: 'مد',
      canCreate: true,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'قائمة البلاغات', page: 'complaints-list', icon: 'list', badge: 'complaints' },
        { label: 'قائمة الزيارات الدورية', page: 'visits-periodic-list', icon: 'calendar', badge: null },
        { label: 'قائمة الزيارات المفاجئة', page: 'visits-surprise-list', icon: 'clipboard', badge: null },
        { label: 'قائمة الزيارات المجدولة', page: 'visits-scheduled-list', icon: 'list', badge: null },
        { label: 'خطط التفتيش الدورية', page: 'inspection-plans-list', icon: 'file', badge: null },
        { label: 'قائمة حالات الحظر', page: 'ban-cases-list', icon: 'lock', badge: null },
        { label: 'تحليل بيانات العامل', page: 'worker-analysis', icon: 'chart', badge: null },
        { label: 'تحليل بيانات صاحب العمل', page: 'employer-analysis', icon: 'building', badge: null },
        { label: 'قائمة التقارير', page: 'reports-list', icon: 'file', badge: null },
      ]
    },

    'ops-analyst': {
      id: 9,
      nameAr: 'محلل العمليات',
      type: 'internal',
      folder: 'ops-analyst',
      avatarInitials: 'مع',
      canCreate: false,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'قائمة البلاغات', page: 'complaints-list', icon: 'list', badge: null },
        { label: 'قائمة الزيارات الدورية', page: 'visits-periodic-list', icon: 'calendar', badge: null },
        { label: 'قائمة الزيارات المفاجئة', page: 'visits-surprise-list', icon: 'clipboard', badge: null },
        { label: 'قائمة الزيارات المجدولة', page: 'visits-scheduled-list', icon: 'list', badge: null },
        { label: 'تحليل المخاطر', page: 'risk-analysis', icon: 'shield', badge: null },
        { label: 'كشف الأنماط', page: 'pattern-detection', icon: 'search', badge: null },
        { label: 'تحليل بيانات العمال', page: 'worker-analysis', icon: 'user', badge: null },
        { label: 'تحليل بيانات أصحاب العمل', page: 'employer-analysis', icon: 'building', badge: null },
        { label: 'إعداد خطة التفتيش الدوري', page: 'inspection-plan-draft', icon: 'pen', badge: null },
        { label: 'قائمة التقارير', page: 'reports-list', icon: 'file', badge: null },
      ]
    }

  },

  /* ── ألوان حالات البلاغات ── */
  statusBadges: {
    'مسودة':                                                        'b-draft',
    'تم تقديم البلاغ — بانتظار تعيين المختص':                      'b-submitted',
    'مرفوع من جهة رسمية — بانتظار تعيين المختص':                   'b-submitted',
    'قيد الدراسة والتحقق':                                         'b-invest',
    'قيد التحقق الميداني':                                         'b-invest',
    'بانتظار اعتماد رئيس القسم':                                   'b-phead',
    'يتطلب قرار المدير':                                           'b-phead',
    'تم إعادة البلاغ لاستيفاء البيانات':                           'b-returned',
    'تم جدولة زيارة تفتيشية':                                      'b-session',
    'تم إصدار قرار بشأن البلاغ':                                   'b-decided',
    'تم إغلاق البلاغ':                                             'b-closed',
    /* التظلمات */
    'تم تقديم التظلم — بانتظار المراجعة':                          'b-submitted',
    'قيد الدراسة من موظف قسم المتابعة':                            'b-invest',
    'بانتظار اعتماد رئيس قسم المتابعة':                            'b-phead',
    'تم قبول التظلم وجارٍ إعادة الفحص':                            'b-decided',
    'تم رفض التظلم':                                               'b-rejected',
    'تم إغلاق التظلم':                                             'b-closed',
    /* الزيارات */
    'مجدولة':                                                       'b-session',
    'جارية':                                                        'b-invest',
    'بانتظار مراجعة المحضر':                                       'b-phead',
    'تم اعتماد المحضر':                                            'b-approved',
    'مغلقة':                                                        'b-closed',
    'متأخرة':                                                       'b-returned',
    'بانتظار إجراء تصحيحي':                                        'b-decided',
    'ملغاة':                                                        'b-rejected',
    /* خطط التفتيش */
    'مسودة الخطة':                                                  'b-draft',
    'قيد الاعتماد':                                                 'b-phead',
    'معتمدة — قيد التنفيذ':                                        'b-approved',
    'مكتملة':                                                       'b-closed',
    /* حالات الحظر */
    'سارٍ — حظر نشط':                                              'b-rejected',
    'بانتظار قرار الرفع':                                          'b-phead',
    'تم رفع الحظر':                                                'b-closed',
  },

  /* ── أنماط أزرار الإجراءات ── */
  actionStyles: {
    'حفظ كمسودة':                           'btn-ghost btn-sm',
    'إرسال البلاغ':                          'btn-primary btn-sm',
    'تعيين المختص':                          'btn-primary btn-sm',
    'بدء الدراسة':                           'btn-primary btn-sm',
    'طلب استيفاء بيانات':                    'btn-warning btn-sm',
    'توجيه للرئيس المباشر':                 'btn-accent btn-sm',
    'إغلاق البلاغ':                          'btn-ghost btn-sm',
    'جدولة زيارة':                           'btn-primary btn-sm',
    'إعادة للموظف':                          'btn-warning btn-sm',
    'اعتماد وإغلاق':                         'btn-accent btn-sm',
    'رفض مع السبب':                          'btn-danger btn-sm',
    'إصدار القرار':                          'btn-accent btn-sm',
    'تقديم تظلم':                            'btn-warning btn-sm',
    'استيفاء البيانات وإعادة الإرسال':      'btn-primary btn-sm',
    'بدء الزيارة':                           'btn-primary btn-sm',
    'رفع المحضر':                            'btn-primary btn-sm',
    'اعتماد المحضر':                         'btn-accent btn-sm',
    'إعادة المحضر للمراجعة':               'btn-warning btn-sm',
    'إصدار أمر تصحيحي':                    'btn-primary btn-sm',
    'إعادة توزيع المفتشين':                'btn-secondary btn-sm',
    'اعتماد خطة التفتيش':                  'btn-accent btn-sm',
    'إصدار أمر حظر':                       'btn-danger btn-sm',
    'رفع الحظر':                            'btn-accent btn-sm',
    'تصدير التقرير':                        'btn-secondary btn-sm',
    'طباعة':                               'btn-ghost btn-sm',
    'إعادة التخصيص':                       'btn-secondary btn-sm',
    'تعيين مفتش':                           'btn-primary btn-sm',
    'قبول التظلم':                          'btn-accent btn-sm',
    'رفض التظلم':                           'btn-danger btn-sm',
  },

  /* ── الحالات حسب الدور ── */
  roleStages: {
    'monitoring-employee': [
      'قيد الدراسة والتحقق',
      'تم تقديم البلاغ — بانتظار تعيين المختص',
      'تم إعادة البلاغ لاستيفاء البيانات'
    ],
    'monitoring-head': [
      'بانتظار اعتماد رئيس القسم',
      'قيد الدراسة والتحقق'
    ],
    'field-inspector': ['مجدولة', 'جارية'],
    'field-head': ['بانتظار مراجعة المحضر'],
    'inspection-director': ['يتطلب قرار المدير', 'بانتظار اعتماد رئيس القسم'],
  }

};
