/* ================================================================
   config.js — تعريف الأدوار والقوائم الجانبية
   ================================================================ */

const WI_CONFIG = {

  /* ── جدول الأدوار المرجعي ──
     1  العامل / المؤمن عليه / المواطن                   خارجي
     2  الشخص المفوض من جهة العمل                        خارجي
     3  موظف قسم التحقيق في إصابات العمل                 داخلي
     4  رئيس قسم التحقيق في إصابات العمل                 داخلي
     5  موظف قسم التحقيق في الأمراض المهنية              داخلي
     6  رئيس قسم التحقيق في الأمراض المهنية              داخلي
     7  موظف قسم الإجازات المرضية                        داخلي
     8  رئيس قسم الإجازات المرضية                        داخلي
     9  موظف قسم الإعاقة والأمراض المستديمة              داخلي
     10 رئيس قسم الإعاقة والأمراض المستديمة              داخلي
     11 موظف قسم اللجان الطبية                           داخلي
     12 رئيس قسم اللجان الطبية                           داخلي
     13 موظف قسم التراخيص والرقابة                       داخلي
     14 رئيس قسم التراخيص والرقابة                       داخلي
     15 المؤسسة الصحية المرخصة                           خارجي
     16 اللجنة الطبية الإشرافية                          خارجي
     17 لجنة التظلمات                                    خارجي
     18 مقرر المؤسسة الصحية المرخصة                     داخلي
     19 مقرر لجنة التظلمات                               داخلي
     20 مقرر اللجنة الطبية الإشرافية                    داخلي
     21 المفوض عن المستشفيات والمؤسسات الصحية المختلفة  خارجي
  */

  roles: {

    'worker': {
      id: 1,
      nameAr: 'العامل / المؤمن عليه / المواطن',
      type: 'external',
      folder: 'worker',
      avatarInitials: 'عا',
      canCheckout: false,
      sidebar: [
        { section: 'الرئيسية' },
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { section: 'بدلات الانقطاع عن العمل' },
        { label: 'قائمة طلباتي', page: 'allowances-list', icon: 'list', badge: 'allowances' },
        { section: 'منفعة الإعاقة' },
        { label: 'قائمة طلباتي', page: 'disability-list', icon: 'list', badge: 'disability' },
        { section: 'منفعة الأمراض المستديمة' },
        { label: 'التشخيصات الواردة', page: 'chronic-incoming', icon: 'inbox', badge: 'chronic-incoming' },
        { label: 'طلباتي المقدمة', page: 'chronic-list', icon: 'list', badge: null },
        { section: 'التظلمات' },
        { label: 'قائمة تظلماتي', page: 'appeals-list', icon: 'list', badge: null },
      ]
    },

    'employer-delegate': {
      id: 2,
      nameAr: 'الشخص المفوض من جهة العمل',
      type: 'external',
      folder: 'employer-delegate',
      avatarInitials: 'مج',
      canCheckout: false,
      sidebar: [
        { section: 'الرئيسية' },
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { section: 'بدلات الانقطاع عن العمل' },
        { label: 'قائمة الطلبات', page: 'allowances-list', icon: 'list', badge: 'allowances' },
        { section: 'التظلمات' },
        { label: 'قائمة التظلمات', page: 'appeals-list', icon: 'list', badge: null },
      ]
    },

    'injury-investigator': {
      id: 3,
      nameAr: 'موظف قسم التحقيق في إصابات العمل',
      type: 'internal',
      folder: 'injury-investigator',
      avatarInitials: 'مح',
      canCheckout: true,
      sidebar: [
        { section: 'الرئيسية' },
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { section: 'بدلات الانقطاع عن العمل' },
        { label: 'قائمة الطلبات', page: 'allowances-list', icon: 'list', badge: 'allowances' },
        { section: 'أدوات' },
        { label: 'استعلام التقارير الطبية', page: 'medical-query', icon: 'search', badge: null },
      ]
    },

    'injury-head': {
      id: 4,
      nameAr: 'رئيس قسم التحقيق في إصابات العمل',
      type: 'internal',
      folder: 'injury-head',
      avatarInitials: 'رق',
      canCheckout: false,
      sidebar: [
        { section: 'الرئيسية' },
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { section: 'بدلات الانقطاع عن العمل' },
        { label: 'قائمة الطلبات', page: 'allowances-list', icon: 'list', badge: 'allowances' },
        { section: 'أدوات' },
        { label: 'استعلام التقارير الطبية', page: 'medical-query', icon: 'search', badge: null },
      ]
    },

    'od-investigator': {
      id: 5,
      nameAr: 'موظف قسم التحقيق في الأمراض المهنية',
      type: 'internal',
      folder: 'od-investigator',
      avatarInitials: 'مأ',
      canCheckout: true,
      sidebar: [
        { section: 'الرئيسية' },
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { section: 'بدلات الانقطاع عن العمل' },
        { label: 'قائمة الطلبات', page: 'allowances-list', icon: 'list', badge: 'allowances' },
        { section: 'أدوات' },
        { label: 'استعلام التقارير الطبية', page: 'medical-query', icon: 'search', badge: null },
      ]
    },

    'od-head': {
      id: 6,
      nameAr: 'رئيس قسم التحقيق في الأمراض المهنية',
      type: 'internal',
      folder: 'od-head',
      avatarInitials: 'رأ',
      canCheckout: false,
      sidebar: [
        { section: 'الرئيسية' },
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { section: 'بدلات الانقطاع عن العمل' },
        { label: 'قائمة الطلبات', page: 'allowances-list', icon: 'list', badge: 'allowances' },
        { section: 'أدوات' },
        { label: 'استعلام التقارير الطبية', page: 'medical-query', icon: 'search', badge: null },
      ]
    },

    'sickleave-employee': {
      id: 7,
      nameAr: 'موظف قسم الإجازات المرضية',
      type: 'internal',
      folder: 'sickleave-employee',
      avatarInitials: 'مإ',
      canCheckout: true,
      sidebar: [
        { section: 'الرئيسية' },
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { section: 'بدلات الانقطاع عن العمل' },
        { label: 'قائمة الطلبات', page: 'allowances-list', icon: 'list', badge: 'allowances' },
        { section: 'أدوات' },
        { label: 'استعلام التقارير الطبية', page: 'medical-query', icon: 'search', badge: null },
      ]
    },

    'sickleave-head': {
      id: 8,
      nameAr: 'رئيس قسم الإجازات المرضية',
      type: 'internal',
      folder: 'sickleave-head',
      avatarInitials: 'رإ',
      canCheckout: false,
      sidebar: [
        { section: 'الرئيسية' },
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { section: 'بدلات الانقطاع عن العمل' },
        { label: 'قائمة الطلبات', page: 'allowances-list', icon: 'list', badge: 'allowances' },
        { section: 'أدوات' },
        { label: 'استعلام التقارير الطبية', page: 'medical-query', icon: 'search', badge: null },
      ]
    },

    'disability-employee': {
      id: 9,
      nameAr: 'موظف قسم الإعاقة والأمراض المستديمة',
      type: 'internal',
      folder: 'disability-employee',
      avatarInitials: 'مع',
      canCheckout: true,
      sidebar: [
        { section: 'الرئيسية' },
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { section: 'منفعة الإعاقة' },
        { label: 'قائمة الطلبات', page: 'disability-list', icon: 'list', badge: 'disability' },
        { label: 'استعلام بطاقة الإعاقة', page: 'disability-card-query', icon: 'search', badge: null },
        { section: 'منفعة الأمراض المستديمة' },
        { label: 'الحالات الواردة', page: 'chronic-incoming', icon: 'inbox', badge: 'chronic-incoming' },
        { label: 'قائمة الطلبات', page: 'chronic-list', icon: 'list', badge: 'chronic' },
        { label: 'إعادة التقييم الدوري', page: 'chronic-reassessment', icon: 'refresh', badge: 'reassessment' },
        { section: 'أدوات' },
        { label: 'استعلام التقارير الطبية', page: 'medical-query', icon: 'search', badge: null },
      ]
    },

    'disability-head': {
      id: 10,
      nameAr: 'رئيس قسم الإعاقة والأمراض المستديمة',
      type: 'internal',
      folder: 'disability-head',
      avatarInitials: 'رع',
      canCheckout: false,
      sidebar: [
        { section: 'الرئيسية' },
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { section: 'منفعة الإعاقة' },
        { label: 'قائمة الطلبات', page: 'disability-list', icon: 'list', badge: 'disability' },
        { label: 'استعلام بطاقة الإعاقة', page: 'disability-card-query', icon: 'search', badge: null },
        { section: 'منفعة الأمراض المستديمة' },
        { label: 'الحالات الواردة', page: 'chronic-incoming', icon: 'inbox', badge: 'chronic-incoming' },
        { label: 'قائمة الطلبات', page: 'chronic-list', icon: 'list', badge: 'chronic' },
        { label: 'إعادة التقييم الدوري', page: 'chronic-reassessment', icon: 'refresh', badge: 'reassessment' },
        { section: 'أدوات' },
        { label: 'استعلام التقارير الطبية', page: 'medical-query', icon: 'search', badge: null },
      ]
    },

    'committees-employee': {
      id: 11,
      nameAr: 'موظف قسم اللجان الطبية',
      type: 'internal',
      folder: 'committees-employee',
      avatarInitials: 'مل',
      canCheckout: true,
      sidebar: [
        { section: 'الرئيسية' },
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { section: 'التنسيق مع المؤسسات الصحية' },
        { label: 'طلبات العرض الواردة', page: 'referrals-list', icon: 'inbox', badge: 'referrals' },
        { label: 'الحالات المحالة للمؤسسات', page: 'referred-list', icon: 'list', badge: null },
        { label: 'الجلسات', page: 'sessions-list', icon: 'calendar', badge: null },
        { section: 'التظلمات' },
        { label: 'قائمة التظلمات', page: 'appeals-list', icon: 'list', badge: 'appeals' },
        { label: 'جلسات التظلمات', page: 'appeals-sessions-list', icon: 'calendar', badge: null },
        { section: 'أدوات' },
        { label: 'استعلام التقارير الطبية', page: 'medical-query', icon: 'search', badge: null },
      ]
    },

    'committees-head': {
      id: 12,
      nameAr: 'رئيس قسم اللجان الطبية',
      type: 'internal',
      folder: 'committees-head',
      avatarInitials: 'رل',
      canCheckout: false,
      sidebar: [
        { section: 'الرئيسية' },
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { section: 'التنسيق مع المؤسسات الصحية' },
        { label: 'طلبات العرض الواردة', page: 'referrals-list', icon: 'inbox', badge: 'referrals' },
        { label: 'الحالات المحالة للمؤسسات', page: 'referred-list', icon: 'list', badge: null },
        { label: 'الجلسات', page: 'sessions-list', icon: 'calendar', badge: null },
        { section: 'التظلمات' },
        { label: 'قائمة التظلمات', page: 'appeals-list', icon: 'list', badge: 'appeals' },
        { label: 'جلسات التظلمات', page: 'appeals-sessions-list', icon: 'calendar', badge: null },
        { section: 'أدوات' },
        { label: 'استعلام التقارير الطبية', page: 'medical-query', icon: 'search', badge: null },
      ]
    },

    'licensing-employee': {
      id: 13,
      nameAr: 'موظف قسم التراخيص والرقابة',
      type: 'internal',
      folder: 'licensing-employee',
      avatarInitials: 'مت',
      canCheckout: true,
      sidebar: [
        { section: 'الرئيسية' },
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { section: 'التراخيص والرقابة' },
        { label: 'قائمة الطلبات والمؤسسات', page: 'licensing-list', icon: 'list', badge: 'licensing' },
        { label: 'الزيارات الرقابية', page: 'inspections-list', icon: 'clipboard', badge: null },
        { section: 'أدوات' },
        { label: 'استعلام التقارير الطبية', page: 'medical-query', icon: 'search', badge: null },
      ]
    },

    'licensing-head': {
      id: 14,
      nameAr: 'رئيس قسم التراخيص والرقابة',
      type: 'internal',
      folder: 'licensing-head',
      avatarInitials: 'رت',
      canCheckout: false,
      sidebar: [
        { section: 'الرئيسية' },
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { section: 'التراخيص والرقابة' },
        { label: 'قائمة الطلبات والمؤسسات', page: 'licensing-list', icon: 'list', badge: 'licensing' },
        { label: 'الزيارات الرقابية', page: 'inspections-list', icon: 'clipboard', badge: null },
        { section: 'أدوات' },
        { label: 'استعلام التقارير الطبية', page: 'medical-query', icon: 'search', badge: null },
      ]
    },

    'licensed-institution': {
      id: 15,
      nameAr: 'المؤسسة الصحية المرخصة',
      type: 'external',
      folder: 'licensed-institution',
      avatarInitials: 'مص',
      canCheckout: false,
      sidebar: [
        { section: 'الرئيسية' },
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { section: 'الجلسات' },
        { label: 'الجلسات المجدولة', page: 'sessions-list', icon: 'calendar', badge: 'sessions' },
      ]
    },

    'supervisory-committee': {
      id: 16,
      nameAr: 'اللجنة الطبية الإشرافية',
      type: 'external',
      folder: 'supervisory-committee',
      avatarInitials: 'لإ',
      canCheckout: false,
      sidebar: [
        { section: 'الرئيسية' },
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { section: 'التراخيص' },
        { label: 'قائمة الطلبات والمؤسسات', page: 'licensing-list', icon: 'list', badge: 'licensing' },
      ]
    },

    'appeals-committee': {
      id: 17,
      nameAr: 'لجنة التظلمات',
      type: 'external',
      folder: 'appeals-committee',
      avatarInitials: 'لت',
      canCheckout: false,
      sidebar: [
        { section: 'الرئيسية' },
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { section: 'جلسات التظلمات' },
        { label: 'الجلسات المجدولة', page: 'sessions-list', icon: 'calendar', badge: 'sessions' },
      ]
    },

    'institution-rapporteur': {
      id: 18,
      nameAr: 'مقرر المؤسسة الصحية المرخصة',
      type: 'internal',
      folder: 'institution-rapporteur',
      avatarInitials: 'مق',
      canCheckout: false,
      sidebar: [
        { section: 'الرئيسية' },
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { section: 'إدارة الجلسات' },
        { label: 'قائمة الجلسات', page: 'sessions-list', icon: 'calendar', badge: 'sessions' },
        { label: 'التوقيعات المعلّقة', page: 'signing', icon: 'pen', badge: 'signing' },
      ]
    },

    'appeals-rapporteur': {
      id: 19,
      nameAr: 'مقرر لجنة التظلمات',
      type: 'internal',
      folder: 'appeals-rapporteur',
      avatarInitials: 'قت',
      canCheckout: false,
      sidebar: [
        { section: 'الرئيسية' },
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { section: 'إدارة جلسات التظلمات' },
        { label: 'قائمة الجلسات', page: 'sessions-list', icon: 'calendar', badge: 'sessions' },
        { label: 'التوقيعات المعلّقة', page: 'signing', icon: 'pen', badge: 'signing' },
      ]
    },

    'supervisory-rapporteur': {
      id: 20,
      nameAr: 'مقرر اللجنة الطبية الإشرافية',
      type: 'internal',
      folder: 'supervisory-rapporteur',
      avatarInitials: 'قإ',
      canCheckout: false,
      sidebar: [
        { section: 'الرئيسية' },
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { section: 'إدارة جلسات اللجنة الإشرافية' },
        { label: 'قائمة الجلسات', page: 'sessions-list', icon: 'calendar', badge: 'sessions' },
        { label: 'التوقيعات المعلّقة', page: 'signing', icon: 'pen', badge: 'signing' },
      ]
    },

    'hospital-delegate': {
      id: 21,
      nameAr: 'المفوض عن المستشفيات والمؤسسات الصحية المختلفة',
      type: 'external',
      folder: 'hospital-delegate',
      avatarInitials: 'مس',
      canCheckout: false,
      sidebar: [
        { section: 'الرئيسية' },
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { section: 'الترخيص والتجديد' },
        { label: 'قائمة الطلبات', page: 'licensing-list', icon: 'list', badge: null },
        { label: 'ملف المؤسسة', page: 'institution-file', icon: 'file', badge: null },
      ]
    }

  },

  /* ── ألوان حالات الطلبات ── */
  statusBadges: {
    'مسودة':                                                              'b-draft',
    'تم تقديم الطلب — بانتظار تعيين المحقق المختص':                      'b-submitted',
    'قيد التحقيق — إصابات العمل':                                        'b-invest',
    'قيد التحقيق — الأمراض المهنية':                                     'b-invest',
    'بانتظار اعتماد رئيس قسم التحقيق في إصابات العمل':                   'b-phead',
    'بانتظار اعتماد رئيس قسم التحقيق في الأمراض المهنية':                'b-phead',
    'تم إعادة الطلب لاستيفاء البيانات':                                  'b-returned',
    'قيد المراجعة من موظف قسم الإجازات المرضية':                        'b-sick',
    'بانتظار اعتماد رئيس قسم الإجازات المرضية':                         'b-phead',
    'تم طلب العرض على المؤسسات الصحية المرخصة — بانتظار مراجعة موظف قسم اللجان الطبية': 'b-comm',
    'تم الموافقة على العرض على المؤسسات الصحية المرخصة — بانتظار إحالة المقرر': 'b-comm',
    'تم الإحالة إلى مقرر المؤسسة الصحية المرخصة — بانتظار جدولة جلسة':  'b-referred',
    'تم جدولة جلسة للعرض على المؤسسة الصحية المرخصة':                   'b-session',
    'تم اتخاذ القرار من المؤسسة الصحية المرخصة — بانتظار التنفيذ':       'b-decided',
    'معتمد':                                                              'b-approved',
    'تم رفض الطلب':                                                       'b-rejected',
    'تم إغلاق الطلب':                                                     'b-closed',
    'تم تقديم طلب منفعة الأشخاص ذوي الإعاقة — بانتظار مراجعة موظف قسم الإعاقة والأمراض المستديمة': 'b-submitted',
    'تم اعتماد الطلب — الصرف جارٍ':                                      'b-approved',
    'تم إيقاف الصرف — بطاقة الإعاقة منتهية أو ملغاة':                   'b-expired',
    'تم استلام التشخيص من المؤسسة الصحية المعالجة — بانتظار استكمال البيانات من المواطن': 'b-submitted',
    'تم اعتماد الطلب — الصرف الدوري جارٍ':                               'b-approved',
    'قيد إعادة التقييم الدوري':                                          'b-sick',
    'إقرار عدم الرغبة في الاستمرار':                                      'b-closed',
    'تم تقديم طلب التظلم — بانتظار مراجعة موظف قسم اللجان الطبية':       'b-submitted',
    'تم إعادة التظلم لاستيفاء البيانات':                                  'b-returned',
    'بانتظار اعتماد رئيس قسم اللجان الطبية':                             'b-phead',
    'تم إحالة التظلم إلى لجنة التظلمات — بانتظار جدولة جلسة':            'b-referred',
    'تم جدولة جلسة لجنة التظلمات':                                       'b-session',
    'تم اتخاذ القرار النهائي من لجنة التظلمات':                           'b-decided',
    'تم إغلاق التظلم':                                                    'b-closed',
    'تم تقديم طلب الترخيص / التجديد — بانتظار مراجعة موظف قسم التراخيص والرقابة': 'b-submitted',
    'تم إعادة الطلب لاستيفاء البيانات':                                   'b-returned',
    'بانتظار اعتماد رئيس قسم التراخيص والرقابة':                         'b-phead',
    'تم إحالة الطلب إلى اللجنة الطبية الإشرافية — بانتظار جدولة جلسة':   'b-referred',
    'تم جدولة جلسة اللجنة الطبية الإشرافية':                             'b-session',
    'تم اتخاذ القرار من اللجنة الطبية الإشرافية — بانتظار تنفيذ القرار':  'b-decided',
    'تم اعتماد الترخيص — الترخيص نشط':                                   'b-approved',
    'تم رفض الطلب':                                                       'b-rejected',
    'انتهت صلاحية الترخيص':                                              'b-expired',
  },

  /* ── أنواع الإجراءات المتاحة — يُستخدم لتلوين الأزرار ── */
  actionStyles: {
    'حفظ كمسودة':                      'btn-ghost btn-sm',
    'إرسال الطلب':                     'btn-primary btn-sm',
    'إرسال':                            'btn-primary btn-sm',
    'حذف':                             'btn-danger btn-sm',
    'طلب استيفاء بيانات من مقدم الطلب': 'btn-warning btn-sm',
    'تحويل إلى قسم الأمراض المهنية':   'btn-secondary btn-sm',
    'تحويل إلى قسم إصابات العمل':      'btn-secondary btn-sm',
    'توصية بالموافقة وتوجيه لرئيس القسم': 'btn-accent btn-sm',
    'توصية بالرفض وتوجيه لرئيس القسم':    'btn-danger btn-sm',
    'اعتماد وتوجيه إلى قسم الإجازات المرضية': 'btn-accent btn-sm',
    'إعادة إلى موظف قسم التحقيق':      'btn-warning btn-sm',
    'رفض مع تحديد السبب':              'btn-danger btn-sm',
    'استيفاء البيانات المطلوبة وإعادة الإرسال': 'btn-primary btn-sm',
    'توصية بالموافقة مع ترشيح مؤسسة صحية مرخصة': 'btn-accent btn-sm',
    'توصية بالرفض':                    'btn-danger btn-sm',
    'توجيه إلى رئيس قسم الإجازات المرضية': 'btn-primary btn-sm',
    'إغلاق مع تحديد السبب':           'btn-ghost btn-sm',
    'اعتماد الفترات':                  'btn-accent btn-sm',
    'إعادة إلى موظف قسم الإجازات المرضية': 'btn-warning btn-sm',
    'طلب عرض على مؤسسة صحية مرخصة':   'btn-primary btn-sm',
    'إعادة للاستيفاء':                 'btn-warning btn-sm',
    'توصية برفض الإحالة مع تحديد السبب': 'btn-danger btn-sm',
    'توجيه إلى رئيس قسم اللجان الطبية مع تأكيد اختيار المؤسسة الصحية المرخصة': 'btn-primary btn-sm',
    'إعادة إلى موظف قسم اللجان الطبية': 'btn-warning btn-sm',
    'رفض الإحالة مع تحديد السبب':     'btn-danger btn-sm',
    'توجيه إلى مقرر المؤسسة الصحية المرخصة مع تأكيد المؤسسة المختارة': 'btn-accent btn-sm',
    'جدولة جلسة':                      'btn-primary btn-sm',
    'إعادة إلى موظف قسم اللجان الطبية': 'btn-warning btn-sm',
    'تأكيد حضور أطباء اللجنة':        'btn-secondary btn-sm',
    'إدخال قرار الجلسة':              'btn-primary btn-sm',
    'توقيع إلكتروني على القرار':       'btn-accent btn-sm',
    'التظلم على القرار':               'btn-warning btn-sm',
    'تأكيد تنفيذ القرار':              'btn-accent btn-sm',
    'طلب إضافة فترة جديدة':           'btn-secondary btn-sm',
    'تقديم تظلم':                      'btn-warning btn-sm',
    'اعتماد الطلب':                    'btn-accent btn-sm',
    'إعادة إلى موظف قسم الإعاقة والأمراض المستديمة': 'btn-warning btn-sm',
    'تعليق الصرف عند انتهاء أو إلغاء البطاقة': 'btn-warning btn-sm',
    'تجديد البطاقة والتحقق من وزارة التنمية الاجتماعية ثم تحريك الطلب تلقائياً إلى قيد المراجعة': 'btn-primary btn-sm',
    'إغلاق نهائي':                     'btn-ghost btn-sm',
    'استكمال البيانات وإرسال الطلب':   'btn-primary btn-sm',
    'الإقرار بعدم الرغبة في الاستمرار': 'btn-ghost btn-sm',
    'توجيه إلى رئيس القسم':           'btn-primary btn-sm',
    'توجيه إلى قسم اللجان الطبية':    'btn-secondary btn-sm',
    'جدولة موعد إعادة التقييم الدوري': 'btn-primary btn-sm',
    'تعليق الصرف مؤقتاً':             'btn-warning btn-sm',
    'استعلام نتيجة إعادة التقييم من وزارة الصحة': 'btn-secondary btn-sm',
    'استئناف الصرف بعد التحقق':       'btn-accent btn-sm',
    'إيقاف الصرف نهائياً مع تحديد السبب': 'btn-danger btn-sm',
    'تقديم التظلم':                    'btn-primary btn-sm',
    'إحالة للجنة التظلمات':           'btn-accent btn-sm',
    'رفض مع السبب':                    'btn-danger btn-sm',
    'تنفيذ القرار':                    'btn-accent btn-sm',
    'إحالة للجنة الإشرافية':          'btn-accent btn-sm',
    'تأكيد تنفيذ القرار وإصدار الترخيص': 'btn-accent btn-sm',
    'تقديم طلب تجديد قبل انتهاء الصلاحية': 'btn-primary btn-sm',
    'تقديم طلب جديد':                 'btn-secondary btn-sm',
    'تقديم طلب تجديد':                'btn-primary btn-sm',
  }
};
