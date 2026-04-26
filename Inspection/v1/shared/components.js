/* ================================================================
   components.js — دوال العرض المشتركة لجميع الأدوار
   نظام إدارة التفتيش — صندوق الحماية الاجتماعية
   ================================================================ */

/* ── مساعدات داخلية ── */
function _priClass(p) {
  return p === 'عاجل' ? 'b-high' : p === 'مرتفع' ? 'b-invest' : p === 'متوسط' ? 'b-medium' : 'b-low';
}
function _riskClass(r) {
  return r === 'مرتفع' ? 'b-high' : r === 'متوسط' ? 'b-medium' : 'b-low';
}
function _compColor(s) {
  return s >= 85 ? 'var(--success)' : s >= 70 ? 'var(--warning)' : 'var(--danger)';
}
function _actionBtns(btns) {
  return btns.map(b => {
    const cls = INSP_CONFIG.actionStyles[b] || 'btn-secondary btn-sm';
    return `<button class="btn ${cls}" onclick="showToast('تم تنفيذ: ${b}','s')">${b}</button>`;
  }).join('');
}
function _dpanel(title, btns, formHtml = '') {
  return `<div class="dp"><div class="ph"><h3><span class="pico bl">${ICONS.pen}</span>${title}</h3></div>
  <div class="dp-body">${formHtml}<div class="dp-acts">${_actionBtns(btns)}</div></div></div>`;
}
function _filterBar(fields) {
  const inputs = fields.map(f => `<div class="fgrp"><label class="flbl">${f.label}</label>${f.type === 'select' ?
    `<select class="fc"><option value="">الكل</option>${(f.opts || []).map(o => `<option>${o}</option>`).join('')}</select>` :
    `<input type="${f.type || 'text'}" class="fc" placeholder="${f.ph || ''}">`}</div>`).join('');
  return `<div class="filters unified-filter-panel"><div class="fgrid unified-filter-row">${inputs}</div>
  <div class="facts"><button class="btn btn-primary btn-sm">${ICONS.search}بحث</button><button class="btn btn-secondary btn-sm">إعادة تعيين</button></div></div>`;
}
function _tblWrap(headers, rows) {
  const ths = headers.map(h => `<th>${h}</th>`).join('');
  return `<div class="card mb0"><div class="tbl-wrap"><table class="dtbl"><thead><tr>${ths}</tr></thead><tbody>${rows}</tbody></table></div></div>`;
}
function _noData() {
  return `<div class="empty-st">${ICONS.inbox}<h4>لا توجد سجلات</h4><p>لم يتم العثور على بيانات تطابق معايير البحث</p></div>`;
}

/* ── لوحة البيانات ── */
function renderDashboard(role) {
  const kpis = {
    'employer': [
      { lbl: 'إجمالي البلاغات المقدمة', val: '4', sub: 'منذ بداية العام', color: 'p' },
      { lbl: 'البلاغات المفتوحة', val: '2', sub: 'بانتظار الإجراء', color: 'w' },
      { lbl: 'الزيارات التفتيشية', val: '3', sub: 'آخر 12 شهراً', color: 'i' },
      { lbl: 'درجة الامتثال', val: '92%', sub: 'عالي الامتثال', color: 's' },
    ],
    'insured': [
      { lbl: 'بلاغاتي', val: '2', sub: 'إجمالي مقدم', color: 'p' },
      { lbl: 'بلاغات مفتوحة', val: '1', sub: 'قيد المعالجة', color: 'w' },
      { lbl: 'التظلمات', val: '1', sub: 'قيد الدراسة', color: 'i' },
      { lbl: 'قرارات مكتملة', val: '1', sub: 'صدر فيها قرار', color: 's' },
    ],
    'monitoring-employee': [
      { lbl: 'البلاغات المعينة لي', val: '4', sub: 'إجمالي مخصص', color: 'p' },
      { lbl: 'بانتظار دراستي', val: '2', sub: 'تستوجب إجراءً', color: 'w' },
      { lbl: 'التظلمات المفتوحة', val: '2', sub: 'قيد المراجعة', color: 'i' },
      { lbl: 'أُغلقت هذا الشهر', val: '3', sub: 'معالجة ناجحة', color: 's' },
    ],
    'monitoring-head': [
      { lbl: 'إجمالي البلاغات', val: '6', sub: 'جميع الحالات', color: 'p' },
      { lbl: 'بانتظار اعتمادي', val: '2', sub: 'تستوجب قراراً', color: 'd' },
      { lbl: 'بلاغات متأخرة', val: '1', sub: 'تجاوزت الموعد', color: 'w' },
      { lbl: 'أداء القسم هذا الشهر', val: '87%', sub: 'نسبة الإنجاز', color: 's' },
    ],
    'field-inspector': [
      { lbl: 'زياراتي المجدولة', val: '3', sub: 'هذا الربع', color: 'p' },
      { lbl: 'زيارات بانتظار تنفيذ', val: '1', sub: 'الأسبوع القادم', color: 'w' },
      { lbl: 'محاضر بانتظار رفع', val: '1', sub: 'مكتملة ولم ترفع', color: 'i' },
      { lbl: 'زيارات مكتملة', val: '4', sub: 'آخر 3 أشهر', color: 's' },
    ],
    'field-head': [
      { lbl: 'إجمالي الزيارات', val: '7', sub: 'جميع الأنواع', color: 'p' },
      { lbl: 'محاضر بانتظار اعتمادي', val: '1', sub: 'تستوجب مراجعة', color: 'd' },
      { lbl: 'إجراءات تصحيحية فعالة', val: '3', sub: 'قيد التنفيذ', color: 'w' },
      { lbl: 'نسبة اعتماد المحاضر', val: '94%', sub: 'هذا الربع', color: 's' },
    ],
    'inspection-director': [
      { lbl: 'إجمالي البلاغات', val: '6', sub: 'جميع الحالات', color: 'p' },
      { lbl: 'إجمالي الزيارات', val: '7', sub: 'جميع الأنواع', color: 'i' },
      { lbl: 'حالات حظر نشطة', val: '1', sub: 'تستوجب متابعة', color: 'd' },
      { lbl: 'خطط التفتيش المعتمدة', val: '1', sub: 'قيد التنفيذ', color: 's' },
    ],
    'ops-analyst': [
      { lbl: 'منشآت تحت المراقبة', val: '3', sub: 'إجمالي في النظام', color: 'p' },
      { lbl: 'منشآت عالية المخاطر', val: '1', sub: 'تستوجب أولوية', color: 'd' },
      { lbl: 'أنماط مكتشفة هذا الشهر', val: '2', sub: 'مؤشرات مخاطر', color: 'w' },
      { lbl: 'مقترحات خطة قيد المراجعة', val: '1', sub: 'للموافقة', color: 'i' },
    ],
    'fund-staff': [
      { lbl: 'البلاغات المستلمة', val: '4', sub: 'إجمالي مقدم', color: 'p' },
      { lbl: 'بلاغات قيد المعالجة', val: '2', sub: 'بانتظار الإجراء', color: 'w' },
      { lbl: 'طلبات معلقة', val: '1', sub: 'تستوجب مراجعة', color: 'i' },
      { lbl: 'معالجة ناجحة', val: '3', sub: 'أُغلقت هذا الشهر', color: 's' },
    ],
  };

  const _firstPage = {
    'employer': 'complaints-list', 'insured': 'complaints-list',
    'monitoring-employee': 'complaints-list', 'monitoring-head': 'complaints-list',
    'field-inspector': 'visits-periodic-list', 'field-head': 'visits-periodic-list',
    'inspection-director': 'complaints-list', 'ops-analyst': 'risk-analysis',
    'fund-staff': 'complaints-list'
  };
  const _navTarget = _firstPage[role] || 'dashboard';
  const cards = (kpis[role] || kpis['monitoring-employee']).map(k =>
    `<div class="scard ${k.color}" onclick="navigateTo('${_navTarget}')">
      <div class="sc-lbl">${k.lbl}</div>
      <div class="sc-val">${k.val}</div>
      <div class="sc-sub">${k.sub}</div>
    </div>`).join('');

  const recent = _recentItems(role);

  const chartHtml = role !== 'employer' && role !== 'insured' ? `
    <div class="dashboard-insights">
      <div class="chart-card">
        <div class="chart-head"><h3>البلاغات حسب الحالة</h3><span>2025</span></div>
        <div class="chart-bars">
          ${[['قيد الدراسة',2,60],['بانتظار اعتماد',1,30],['مجدولة زيارة',1,30],['مغلقة',2,60]].map(([l,v,pct])=>
            `<div class="chart-bar-row"><div class="chart-bar-meta"><span>${l}</span><strong>${v}</strong></div>
            <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${pct}%;background:var(--primary)"></div></div></div>`).join('')}
        </div>
      </div>
      <div class="chart-card">
        <div class="chart-head"><h3>الزيارات حسب النوع</h3><span>2025</span></div>
        <div class="chart-bars">
          ${[['دورية',3,60],['مفاجئة',2,40],['مجدولة',2,40]].map(([l,v,pct])=>
            `<div class="chart-bar-row"><div class="chart-bar-meta"><span>${l}</span><strong>${v}</strong></div>
            <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${pct}%;background:var(--accent)"></div></div></div>`).join('')}
        </div>
      </div>
      <div class="chart-card">
        <div class="chart-head"><h3>درجات الامتثال</h3><span>المنشآت</span></div>
        <div class="chart-bars">
          ${INSP_DATA.employers.map(e=>
            `<div class="chart-bar-row"><div class="chart-bar-meta"><span>${e.name.split(' ').slice(0,2).join(' ')}</span><strong>${e.complianceScore}%</strong></div>
            <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${e.complianceScore}%;background:${_compColor(e.complianceScore)}"></div></div></div>`).join('')}
        </div>
      </div>
    </div>` : '';

  return `<div class="pg-head"><div><h1>لوحة البيانات</h1><p>نظرة عامة على الأنشطة والمؤشرات الرئيسية</p></div>
    <div class="pg-acts"><button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ تحديث البيانات…','i')">${ICONS.switch}تحديث</button></div></div>
    <div class="stats-grid">${cards}</div>
    ${chartHtml}
    ${recent}`;
}

function _recentItems(role) {
  if (role === 'field-inspector' || role === 'field-head') {
    const _vpg = id => id.includes('-04-') ? 'visit-surprise-details' : id.includes('-05-') ? 'visit-scheduled-details' : 'visit-periodic-details';
    const rows = [...INSP_DATA.visits.periodic, ...INSP_DATA.visits.surprise].slice(0, 4).map(v =>
      `<tr><td><a href="#" onclick="navigateTo('${_vpg(v.id)}','id=${v.id}')" class="txp fw7">${v.id}</a></td>
       <td>${v.employerName}</td><td>${statusBadge(v.status)}</td><td>${v.scheduledDate}</td>
       <td><button class="btn btn-primary btn-xs" onclick="navigateTo('${_vpg(v.id)}','id=${v.id}')">عرض</button></td></tr>`).join('');
    return `<div class="card dashboard-current-work"><div class="ph"><h3>${ICONS.clipboard} آخر الزيارات</h3></div>
      <div class="tbl-wrap"><table class="dtbl"><thead><tr><th>رقم الزيارة</th><th>المنشأة</th><th>الحالة</th><th>التاريخ</th><th>إجراء</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;
  }
  if (role === 'ops-analyst') {
    const rows = INSP_DATA.employers.map(e =>
      `<tr><td class="fw7">${e.name}</td><td>${e.sector}</td>
       <td><span class="badge ${_riskClass(e.riskLevel)}">${e.riskLevel}</span></td>
       <td><div style="display:flex;align-items:center;gap:8px"><div class="progress-bar-wrap" style="flex:1;margin:0"><div class="progress-bar-fill" style="width:${e.complianceScore}%;background:${_compColor(e.complianceScore)}"></div></div><span class="fs11">${e.complianceScore}%</span></div></td>
       <td>${e.lastVisit}</td></tr>`).join('');
    return `<div class="card dashboard-current-work"><div class="ph"><h3>${ICONS.chart} لمحة المنشآت</h3></div>
      <div class="tbl-wrap"><table class="dtbl"><thead><tr><th>المنشأة</th><th>القطاع</th><th>المخاطر</th><th>الامتثال</th><th>آخر زيارة</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;
  }
  const rows = INSP_DATA.complaints.slice(0, 4).map(c =>
    `<tr><td><a href="#" onclick="navigateTo('complaint-details','id=${c.id}')" class="txp fw7">${c.id}</a></td>
     <td>${c.type}</td><td>${statusBadge(c.status)}</td>
     <td><span class="badge ${_priClass(c.priority)}">${c.priority}</span></td>
     <td>${c.submitDate || '—'}</td>
     <td><button class="btn btn-primary btn-xs" onclick="navigateTo('complaint-details','id=${c.id}')">عرض</button></td></tr>`).join('');
  return `<div class="card dashboard-current-work"><div class="ph"><h3>${ICONS.inbox} آخر البلاغات</h3></div>
    <div class="tbl-wrap"><table class="dtbl"><thead><tr><th>الرقم</th><th>النوع</th><th>الحالة</th><th>الأولوية</th><th>تاريخ تقديم الطلب</th><th>إجراء</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;
}

/* ── قائمة البلاغات ── */
function renderComplaintsList(role) {
  const isExt = role === 'employer' || role === 'insured';
  const canCreate = INSP_CONFIG.roles[role] && INSP_CONFIG.roles[role].canCreate;
  const createBtn = canCreate ? `<button class="btn btn-primary" onclick="navigateTo('complaint-new')">${ICONS.plus}بلاغ جديد</button>` : '';

  const complaintStatuses = [
    'مسودة',
    'تم تقديم البلاغ',
    'بانتظار تعيين',
    'تم اعادة فتح البلاغ',
    'تم تقديم الطلب مرة أخرى',
    'قيد المراجعة',
    'تم رفض البلاغ',
    'تم إعادة الطلب لاستيفاء البيانات',
    'بانتظار اعتماد رئيس قسم المتابعة والبلاغات',
    'تم توجيه البلاغ للتفتيش',
    'قيد المراجعة من قسم التفتيش',
    'بانتظار اجراء الزيارة التفتيشية',
    'بانتظار اعتماد رئيس قسم التفتيش',
    'انتظار اعتماد مدير الدائرة',
    'تم اغلاق البلاغ',
    'تم حفظ البلاغ'
  ];

  const roleProfiles = {
    'fund-staff': { civil: '09123456' },
    'insured': { civil: '07345678' },
    'employer': { employerId: 'EMP-001' },
    'monitoring-employee': { civil: '06456789', name: 'سيف خلفان الأمري' },
    'field-inspector': { civil: '04678901', name: 'حاتم سالم الزدجالي' }
  };

  const currentProfile = roleProfiles[role] || {};
  const byWorkerId = Object.fromEntries((INSP_DATA.workers || []).map(w => [w.id, w]));

  function isMonitoringStage(status) {
    return ['قيد المراجعة', 'بانتظار اعتماد رئيس قسم المتابعة والبلاغات', 'تم تقديم البلاغ', 'بانتظار تعيين', 'تم اعادة فتح البلاغ', 'تم تقديم الطلب مرة أخرى'].includes(status);
  }

  function isInspectionStage(status) {
    return ['تم توجيه البلاغ للتفتيش', 'قيد المراجعة من قسم التفتيش', 'بانتظار اجراء الزيارة التفتيشية', 'بانتظار اعتماد رئيس قسم التفتيش'].includes(status);
  }

  function isVisibleForRole(c) {
    const workerCivil = (c.workerId && byWorkerId[c.workerId] ? byWorkerId[c.workerId].civil : null) || c.workerCivil || null;
    if (role === 'fund-staff') {
      const isOwn = c.submittedBy === 'fund-staff' && (!currentProfile.civil || c.submittedByCivil === currentProfile.civil);
      const isPendingAssignment = c.status === 'بانتظار تعيين';
      return isOwn || isPendingAssignment;
    }
    if (role === 'insured') {
      const isOwnSubmission = c.submittedBy === 'insured' && (!currentProfile.civil || c.submittedByCivil === currentProfile.civil);
      const isParty = (!!currentProfile.civil && (workerCivil === currentProfile.civil || c.partyInsuredCivil === currentProfile.civil));
      return isOwnSubmission || isParty;
    }
    if (role === 'employer') {
      const isOwnSubmission = c.submittedBy === 'employer' && (!currentProfile.employerId || c.employerId === currentProfile.employerId);
      const isParty = !!currentProfile.employerId && (c.employerId === currentProfile.employerId || c.partyEmployerId === currentProfile.employerId);
      return isOwnSubmission || isParty;
    }
    if (role === 'monitoring-employee') {
      return (c.assignedToRole === 'monitoring-employee' && (!currentProfile.name || c.assignedTo === currentProfile.name))
        || (c.checkedOutByRole === 'monitoring-employee' && (!currentProfile.name || c.checkedOutBy === currentProfile.name));
    }
    if (role === 'monitoring-head') return true;
    if (role === 'field-inspector') {
      return (c.assignedInspectorRole === 'field-inspector' && (!currentProfile.name || c.assignedInspector === currentProfile.name))
        || (c.checkedOutByRole === 'field-inspector' && (!currentProfile.name || c.checkedOutBy === currentProfile.name));
    }
    if (role === 'field-head') return true;
    if (role === 'inspection-director') return true;
    return true;
  }

  const filters = _filterBar(isExt ? [
    { label: 'رقم البلاغ', ph: 'YYYY-01-...' },
    { label: 'نوع البلاغ', type: 'select', opts: ['شكوى عدم التسجيل','شكوى عدم صحة الأجر','أخرى'] },
    { label: 'من تاريخ', type: 'date' },
    { label: 'إلى تاريخ', type: 'date' },
    { label: 'الحالة', type: 'select', opts: complaintStatuses },
  ] : [
    { label: 'رقم البلاغ', ph: 'YYYY-01-000001' },
    { label: 'الرقم المدني للمؤمن عليه', ph: 'مثال: 07345678' },
    { label: 'رقم السجل التجاري لصاحب العمل', ph: 'مثال: 1234567890' },
    { label: 'من تاريخ', type: 'date' },
    { label: 'إلى تاريخ', type: 'date' },
    { label: 'حالة البلاغ', type: 'select', opts: complaintStatuses },
  ]);

  let data = (INSP_DATA.complaints || []).filter(isVisibleForRole);

  if (role === 'monitoring-head') {
    const preferred = data.filter(c => isMonitoringStage(c.status));
    const rest = data.filter(c => !isMonitoringStage(c.status));
    data = [...preferred, ...rest];
  }

  if (role === 'field-head') {
    const preferred = data.filter(c => isInspectionStage(c.status));
    const rest = data.filter(c => !isInspectionStage(c.status));
    data = [...preferred, ...rest];
  }

  const rows = data.map(c => {
    const extraCols = isExt ? '' : `<td>${c.assignedTo || '<span class="tx3">غير معين</span>'}</td>`;
    return `<tr>
      <td><a href="#" onclick="navigateTo('complaint-details','id=${c.id}')" class="txp fw7">${c.id}</a></td>
      <td>${c.type}</td>
      ${isExt ? '' : `<td>${c.submittedByName || '—'}</td>`}
      <td>${c.employerName || '—'}</td>
      <td>${statusBadge(c.status)}</td>
      <td><span class="badge ${_priClass(c.priority)}">${c.priority}</span></td>
      ${extraCols}
      <td>${c.submitDate || '—'}</td>
      <td><div class="df ac g8">
        <button class="btn btn-primary btn-xs" onclick="navigateTo('complaint-details','id=${c.id}')">${ICONS.eye}عرض</button>
        ${role === 'monitoring-employee' && c.status === 'تم تقديم البلاغ' ? `<button class="btn btn-accent btn-xs" onclick="showToast('تم عمل checkout على البلاغ','s')">Checkout</button>` : ''}
      </div></td>
    </tr>`;
  }).join('');

  const headers = isExt
    ? ['رقم البلاغ','النوع','المنشأة','الحالة','الأولوية','تاريخ تقديم الطلب','إجراء']
    : ['رقم البلاغ','النوع','مقدم البلاغ','المنشأة','الحالة','الأولوية','الموظف المختص','تاريخ تقديم الطلب','إجراء'];

  return `<div class="pg-head"><div><h1>قائمة البلاغات</h1><p>${data.length} بلاغ إجمالاً</p></div>
    <div class="pg-acts">${createBtn}<button class="btn btn-secondary btn-sm">${ICONS.download}تصدير</button></div></div>
    ${filters}
    ${_tblWrap(headers, rows || _noData())}`;
}

/* ── إنشاء بلاغ جديد ── */
function renderComplaintNew(role) {
  const isFundStaff = role === 'fund-staff';
  const isInternal = role === 'fund-staff' || role === 'monitoring-employee';
  const isEmployer = role === 'employer';
  const isInsured  = role === 'insured';

  /* بيانات المستخدم الحالي */
  const _cu = {
    'employer':            { name: 'طارق سعيد الكلباني',   civil: '08234567',   phone: '96891023456',  label: 'صاحب عمل' },
    'insured':             { name: 'أسماء محمد الحارثي',   civil: '07345678',   phone: '96892034567',  label: 'مؤمن عليه' },
    'fund-staff':          { name: 'منى راشد البلوشي',     civil: '09123456',   phone: '96890012345',  label: 'موظف الصندوق' },
    'monitoring-employee': { name: 'سيف خلفان الأمري',     civil: '06456789',   phone: '96893045678',  label: 'موظف قسم المتابعة' },
  }[role] || { name: '—', civil: '—', phone: '—', label: '' };

  /* بيانات صاحب العمل المرتبط بالدور */
  const _empData = {
    'employer': INSP_DATA.employers.find(e => e.name === INSP_DATA.users.employer.dept) || INSP_DATA.employers[0],
    'insured':  INSP_DATA.employers.find(e => e.id === (INSP_DATA.workers.find(w => w.civil === '07345678') || {}).employerId) || INSP_DATA.employers[1],
  };
  const myEmp = _empData[role];

  /* نموذج بيانات صاحب العمل */
  const _employerPanel = () => {
    if (isEmployer && myEmp) {
      /* صاحب العمل — البيانات تلقائية (قراءة فقط) */
      return `<div class="card"><div class="ph"><h3><span class="pico or">${ICONS.building}</span>بيانات صاحب العمل</h3>
        <span class="badge b-approved" style="font-size:11px">مستوردة تلقائياً من الحساب</span></div>
      <div class="pb"><div class="fg fg-2">
        <div class="fgrp"><label class="flbl">اسم المنشأة</label><div class="fro fw7">${myEmp.name}</div></div>
        <div class="fgrp"><label class="flbl">رقم السجل التجاري</label><div class="fro">${myEmp.crn}</div></div>
        <div class="fgrp"><label class="flbl">القطاع</label><div class="fro">${myEmp.sector}</div></div>
        <div class="fgrp"><label class="flbl">الموقع</label><div class="fro">${myEmp.location}</div></div>
        <div class="fgrp"><label class="flbl">عدد العمال</label><div class="fro">${myEmp.employees} عامل</div></div>
        <div class="fgrp"><label class="flbl">حالة الاشتراكات</label><div class="fro"><span class="badge ${myEmp.contributions.status==='منتظم'?'b-approved':'b-returned'}">${myEmp.contributions.status}</span></div></div>
      </div></div></div>`;
    }
    if (isInsured && myEmp) {
      /* المؤمن عليه — بيانات صاحب العمل الحالي تلقائية، مع خيار اختيار آخر */
      return `<div class="card"><div class="ph"><h3><span class="pico or">${ICONS.building}</span>بيانات صاحب العمل</h3></div>
      <div class="pb">
        <div class="fg fg-2 mb12">
          <div class="fgrp"><label class="flbl">يتعلق البلاغ بـ</label>
            <select class="fc" onchange="_toggleEmployerLookup(this.value)">
              <option value="current">صاحب العمل الحالي — ${myEmp.name}</option>
              <option value="other">صاحب عمل آخر</option>
            </select></div>
        </div>
        <div id="emp-current-data">
          <div class="fg fg-2">
            <div class="fgrp"><label class="flbl">اسم المنشأة</label><div class="fro fw7">${myEmp.name}</div></div>
            <div class="fgrp"><label class="flbl">رقم السجل التجاري</label><div class="fro">${myEmp.crn}</div></div>
          </div>
        </div>
        <div id="emp-other-lookup" style="display:none">
          <div class="fg fg-2">
            <div class="fgrp"><label class="flbl">رقم السجل التجاري <span class="req">*</span></label>
              <div style="display:flex;gap:8px"><input class="fc" id="other-crn-input" placeholder="أدخل رقم السجل التجاري">
              <button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ الاستعلام من وزارة التجارة...','i');document.getElementById('emp-other-result').style.display='block'">استعلام</button></div></div>
          </div>
          <div id="emp-other-result" style="display:none;margin-top:10px">
            <div class="fg fg-2">
              <div class="fgrp"><label class="flbl">اسم المنشأة</label><div class="fro fw7">مؤسسة البناء والتشييد المتكاملة</div></div>
              <div class="fgrp"><label class="flbl">القطاع</label><div class="fro">البناء والإنشاء</div></div>
            </div>
          </div>
        </div>
      </div></div>`;
    }
    /* داخلي */
    return `<div class="card"><div class="ph"><h3><span class="pico or">${ICONS.building}</span>بيانات صاحب العمل</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">رقم السجل التجاري <span class="req">*</span></label>
        <div style="display:flex;gap:8px"><input class="fc" placeholder="أدخل رقم السجل التجاري"><button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ الاستعلام من وزارة التجارة...','i')">استعلام</button></div></div>
      <div class="fgrp"><label class="flbl">اسم المنشأة</label><input class="fc" placeholder="يُملأ تلقائياً بعد الاستعلام" readonly></div>
      <div class="fgrp"><label class="flbl">القطاع</label><input class="fc" placeholder="يُملأ تلقائياً" readonly></div>
      <div class="fgrp"><label class="flbl">رقم تواصل المنشأة</label><input class="fc" type="tel" placeholder="هاتف المنشأة"></div>
    </div></div></div>`;
  };

  /* نموذج بيانات العامل — للمؤمن عليه: تُملأ تلقائياً من بيانات الحساب */
  const _insuredWorker = isInsured ? INSP_DATA.workers.find(w => w.civil === '07345678') || null : null;
  const _workerPanel = () => {
    if (isInsured && _insuredWorker) {
      const w = _insuredWorker;
      return `
    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.user}</span>بياناتك كعامل</h3>
      <span class="badge b-approved" style="font-size:11px">مستوردة تلقائياً من الحساب</span></div>
    <div class="pb">
      <div class="alert alert-i" style="margin-bottom:14px">${ICONS.info} البلاغ يُقدَّم عنك أنت — بياناتك مستوردة تلقائياً من سجلات الصندوق.</div>
      <div class="fg fg-2">
        <div class="fgrp"><label class="flbl">الاسم</label><div class="fro fw7">${w.name}</div></div>
        <div class="fgrp"><label class="flbl">الرقم المدني</label><div class="fro">${w.civil}</div></div>
        <div class="fgrp"><label class="flbl">المسمى الوظيفي</label><div class="fro">${w.position}</div></div>
        <div class="fgrp"><label class="flbl">الأجر الأساسي المسجّل</label><div class="fro fw7 txp">${w.salary} ر.ع / شهر</div></div>
        <div class="fgrp"><label class="flbl">تاريخ الالتحاق</label><div class="fro">${w.joinDate || w.insuredFrom}</div></div>
        <div class="fgrp"><label class="flbl">حالة التوظيف</label><div class="fro"><span class="badge ${w.employmentStatus === 'على رأس العمل' ? 'b-approved' : 'b-returned'}">${w.employmentStatus}</span></div></div>
        ${w.resignDate ? `<div class="fgrp"><label class="flbl">تاريخ الاستقالة</label><div class="fro">${w.resignDate}</div></div>` : ''}
        <div class="fgrp"><label class="flbl">القسم</label><div class="fro">${w.department}</div></div>
      </div>
    </div></div>`;
    }
    return `
    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.user}</span>بيانات العامل</h3>
      <span style="font-size:11.5px;color:var(--text3)">البحث بالرقم المدني لاستيراد البيانات تلقائياً</span></div>
    <div class="pb">
      <div class="fg fg-2 mb12">
        <div class="fgrp"><label class="flbl">الرقم المدني للعامل <span class="req">*</span></label>
          <div style="display:flex;gap:8px">
            <input class="fc" id="worker-civil-input" placeholder="مثال: 0912345001">
            <button class="btn btn-secondary btn-sm" onclick="_lookupWorker()">بحث</button>
          </div></div>
      </div>
      <div id="worker-data-panel" style="display:none">
        <div class="alert alert-s mb12" style="margin-bottom:12px">${ICONS.check} <span>تم العثور على بيانات العامل في سجلات الصندوق</span></div>
        <div class="fg fg-2">
          <div class="fgrp"><label class="flbl">اسم العامل</label><div class="fro fw7" id="w-name"></div></div>
          <div class="fgrp"><label class="flbl">الرقم المدني</label><div class="fro" id="w-civil"></div></div>
          <div class="fgrp"><label class="flbl">المسمى الوظيفي</label><div class="fro" id="w-position"></div></div>
          <div class="fgrp"><label class="flbl">الأجر الأساسي المسجّل</label><div class="fro fw7 txp" id="w-salary"></div></div>
          <div class="fgrp"><label class="flbl">تاريخ الالتحاق</label><div class="fro" id="w-joindate"></div></div>
          <div class="fgrp"><label class="flbl">حالة العامل</label><div class="fro" id="w-status"></div></div>
          <div class="fgrp" id="w-resign-grp" style="display:none"><label class="flbl">تاريخ الاستقالة</label><div class="fro" id="w-resigndate"></div></div>
          <div class="fgrp"><label class="flbl">القسم</label><div class="fro" id="w-dept"></div></div>
        </div>
      </div>
    </div></div>`;
  };

  return `<div class="pg-head"><div><h1>تقديم بلاغ جديد</h1><p>تعبئة نموذج البلاغ وإرساله</p></div>
    <div class="pg-acts"><button class="btn btn-secondary" onclick="goHome()">${ICONS.arrow_right}رجوع</button></div></div>

  <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.user}</span>بيانات مقدم البلاغ</h3>
    <span style="font-size:11.5px;color:var(--text3)">مستوردة من بيانات الحساب المسجّل</span></div>
  <div class="pb">
    <div style="display:flex;align-items:center;gap:14px;padding:14px;border-radius:var(--rsm);background:var(--g50);border:1px solid var(--border)">
      <div style="width:44px;height:44px;border-radius:50%;background:var(--primary);color:#fff;font-size:16px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">${_cu.name.substring(0,2)}</div>
      <div style="flex:1">
        <div style="font-size:14px;font-weight:700;color:var(--text)">${_cu.name}</div>
        <div style="font-size:12px;color:var(--text3);margin-top:2px">رقم الهوية: ${_cu.civil} &nbsp;|&nbsp; الهاتف: ${_cu.phone}</div>
      </div>
      <span class="badge b-approved">${_cu.label}</span>
    </div>
    ${isInternal ? `<div class="fg fg-2 mt12">
      <div class="fgrp"><label class="flbl">صفة مقدم البلاغ <span class="req">*</span></label>
        <select class="fc">
          <option value="insured">مؤمن عليه (عامل)</option>
          <option value="employer">صاحب عمل</option>
          <option value="fund-staff">موظف الصندوق — بلاغ داخلي</option>
          <option value="external-ref">إحالة خارجية رسمية</option>
        </select></div>
      <div class="fgrp"><label class="flbl">قناة الإبلاغ</label>
        <select class="fc">
          <option>منصة إلكترونية</option>
          <option>إحالة داخلية</option>
          <option>إحالة رسمية خارجية</option>
          <option>هاتف</option>
          <option>بريد رسمي</option>
        </select></div>
      <div class="fgrp span-full"><label class="flbl">جهة الإحالة الخارجية (إن وجدت)</label><input class="fc" placeholder="وزارة العمل، النيابة، المحكمة..."></div>
    </div>` : ''}
  </div></div>

  ${_employerPanel()}
  ${_workerPanel()}

  <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.file}</span>تفاصيل البلاغ</h3></div>
  <div class="pb"><div class="fg fg-2">
    <div class="fgrp"><label class="flbl">نوع البلاغ <span class="req">*</span></label>
      <select class="fc" onchange="_updateRequiredDocs(this.value)">
        <option value="">— اختر نوع البلاغ —</option>
        <option value="contract">شكوى عدم التسجيل</option>
        <option value="salary">شكوى عدم صحة الأجر</option>
        <option value="other">أخرى</option>
      </select></div>
    <div class="fgrp"><label class="flbl">الأولوية</label>
      <select class="fc"><option>منخفض</option><option selected>متوسط</option><option>مرتفع</option>${isFundStaff ? '<option>عاجل</option>' : ''}</select></div>
    <div class="fgrp span-full"><label class="flbl">وصف البلاغ <span class="req">*</span></label>
      <textarea class="fc" rows="5" placeholder="اكتب وصفاً تفصيلياً للشكوى — التاريخ، المبالغ، الوقائع..."></textarea></div>
  </div></div></div>

  <div class="card" id="req-docs-card"><div class="ph"><h3><span class="pico rd">${ICONS.check}</span>المستندات المطلوبة</h3>
    <span style="font-size:11.5px;color:var(--text3)">تختلف حسب نوع البلاغ المختار</span></div>
  <div class="pb">
    <div id="docs-list" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px;margin-bottom:16px">
      ${[
        'عقد العمل أو إشعار التعيين',
        'كشف الحساب البنكي أو إيصال الدفع',
        'أي مراسلات رسمية ذات صلة',
      ].map(d => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;border:1px solid var(--border);border-radius:var(--rsm);background:var(--g50)">
          <div style="display:flex;align-items:center;gap:8px"><span style="font-size:14px">📋</span>
            <span style="font-size:12.5px;color:var(--text2)">${d}</span></div>
          <span class="badge b-returned">مطلوب</span>
        </div>`).join('')}
    </div>
    <div class="dz-box"><div class="dz-box-icon">${ICONS.upload}</div>
      <div class="dz-box-text">اسحب الملفات هنا أو انقر للرفع</div>
      <div class="dz-box-sub">PDF, DOC, JPG, ZIP — الحد الأقصى 10 MB لكل ملف</div></div>
  </div></div>

  <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.info}</span>إقرار وتأكيد</h3></div>
  <div class="pb">
    <p style="font-size:12.5px;color:var(--text2);line-height:1.8">بالنقر على "حفظ وإرسال الطلب" أقر بأن جميع المعلومات المدخلة صحيحة ودقيقة. سيُرسَل رقم البلاغ المرجعي فور التقديم عبر الرسائل القصيرة.</p>
    <div class="df ac g8 mt12">
      <button class="btn btn-primary" onclick="showToast('تم حفظ وإرسال الطلب بنجاح — سيُرسَل الرقم المرجعي عبر الرسائل القصيرة','s')">${ICONS.check}حفظ وإرسال الطلب</button>
      <button class="btn btn-ghost" onclick="showToast('تم الحفظ كمسودة','i')">حفظ كمسودة</button>
      <button class="btn btn-secondary" onclick="goHome()">إلغاء</button>
    </div>
  </div></div>

  <script>
  function _lookupWorker() {
    const civil = document.getElementById('worker-civil-input') ? document.getElementById('worker-civil-input').value.trim() : '';
    const panel = document.getElementById('worker-data-panel');
    if (!panel) return;
    if (!civil || civil.length < 4) {
      showToast('يرجى إدخال رقم مدني صحيح (4 أرقام على الأقل)', 'w');
      return;
    }
    const w = INSP_DATA.workers.find(x => x.civil === civil)
           || INSP_DATA.workers.find(x => x.civil.startsWith(civil) || civil.startsWith(x.civil.substring(0,6)))
           || INSP_DATA.workers[0];
    panel.style.display = 'block';
    document.getElementById('w-name').textContent = w.name;
    document.getElementById('w-civil').textContent = civil;
    document.getElementById('w-position').textContent = w.position;
    document.getElementById('w-salary').textContent = (w.salary || '—') + ' ر.ع / شهر';
    document.getElementById('w-joindate').textContent = w.joinDate || w.insuredFrom || '—';
    const statusBadgeTxt = w.employmentStatus === 'على رأس العمل' ? 'b-approved' : 'b-returned';
    document.getElementById('w-status').innerHTML = '<span class="badge ' + statusBadgeTxt + '">' + (w.employmentStatus || '—') + '</span>';
    document.getElementById('w-dept').textContent = w.department;
    const resignGrp = document.getElementById('w-resign-grp');
    if (w.resignDate) {
      resignGrp.style.display = '';
      document.getElementById('w-resigndate').textContent = w.resignDate;
    } else {
      resignGrp.style.display = 'none';
    }
  }
  function _toggleEmployerLookup(val) {
    const cur = document.getElementById('emp-current-data');
    const oth = document.getElementById('emp-other-lookup');
    if (cur) cur.style.display = val === 'current' ? '' : 'none';
    if (oth) oth.style.display = val === 'other' ? '' : 'none';
  }
  function _updateRequiredDocs(type) {
    const docsByType = {
      'contract': ['عقد العمل أو إشعار التعيين', 'ما يفيد تاريخ الالتحاق الفعلي', 'كشف الحساب البنكي خلال فترة العمل'],
      'salary': ['كشف الحساب البنكي للفترة المطلوبة', 'ما يفيد الأجر الصحيح (مراسلة صاحب العمل أو عقد العمل)', 'إيصالات الدفع'],
      'other': ['ما يدعم الشكوى المقدمة', 'أي مراسلات رسمية ذات صلة']
    };
    const docs = docsByType[type] || ['عقد العمل أو إشعار التعيين', 'كشف الحساب البنكي أو إيصال الدفع', 'أي مراسلات رسمية ذات صلة'];
    const list = document.getElementById('docs-list');
    if (list) {
      list.innerHTML = docs.map(d => '<div style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;border:1px solid var(--border);border-radius:var(--rsm);background:var(--g50)"><div style="display:flex;align-items:center;gap:8px"><span style="font-size:14px">📋</span><span style="font-size:12.5px;color:var(--text2)">' + d + '</span></div><span class="badge b-returned">مطلوب</span></div>').join('');
    }
    showToast('تم تحديث قائمة المستندات المطلوبة حسب نوع البلاغ', 'i');
  }
  </script>`;
}

/* ── تفاصيل البلاغ ── */
function renderComplaintDetails(role) {
  const id = getParam('id') || '2025-01-000001';
  const c = INSP_DATA.complaints.find(x => x.id === id) || INSP_DATA.complaints[0];
  if (!c) return `<div class="empty-st">${ICONS.inbox}<h4>البلاغ غير موجود</h4></div>`;

  const isExternal = role === 'employer' || role === 'insured';
  const isInternal = !isExternal;
  const internalWorkflowRoles = ['monitoring-employee', 'monitoring-head', 'field-inspector', 'field-head', 'inspection-director'];
  const showWorkflowPanels = internalWorkflowRoles.includes(role);
  const isDraft = c.status === 'مسودة' && isExternal;
  const isReturned = c.status === 'تم إعادة الطلب لاستيفاء البيانات' && isExternal;

  /* employer and worker lookups */
  const emp = INSP_DATA.employers.find(e => e.id === c.employerId) || null;
  const wrk = INSP_DATA.workers.find(w => w.id === c.workerId) || null;

  /* ── 1. بيانات الطلب الأساسية ── */
  const requestPanel = isDraft ? `
    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.file}</span>بيانات الطلب الأساسية</h3>
      <span class="badge b-draft" style="font-size:11px">مسودة — قيد التعديل</span></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">رقم البلاغ</label><div class="fro fw7">${c.id}</div></div>
      <div class="fgrp"><label class="flbl">تاريخ التقديم</label><div class="fro">${c.submitDate}</div></div>
      <div class="fgrp"><label class="flbl">نوع البلاغ <span class="req">*</span></label>
        <select class="fc">
          <option ${c.type==='شكوى عدم التسجيل'?'selected':''}>شكوى عدم التسجيل</option>
          <option ${c.type==='شكوى عدم صحة الأجر'?'selected':''}>شكوى عدم صحة الأجر</option>
          <option ${c.type==='أخرى'?'selected':''}>أخرى</option>
        </select></div>
      <div class="fgrp"><label class="flbl">الأولوية</label>
        <select class="fc">
          <option ${c.priority==='منخفض'?'selected':''}>منخفض</option>
          <option ${c.priority==='متوسط'?'selected':''}>متوسط</option>
          <option ${c.priority==='مرتفع'?'selected':''}>مرتفع</option>
        </select></div>
      <div class="fgrp span-full"><label class="flbl">وصف البلاغ <span class="req">*</span></label>
        <textarea class="fc" rows="5" style="resize:vertical">${c.description}</textarea></div>
    </div></div></div>` : `
    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.file}</span>بيانات الطلب الأساسية</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">رقم البلاغ</label><div class="fro fw7">${c.id}</div></div>
      <div class="fgrp"><label class="flbl">تاريخ التقديم</label><div class="fro">${c.submitDate}</div></div>
      <div class="fgrp"><label class="flbl">الموعد النهائي</label><div class="fro">${c.dueDate || '—'}</div></div>
      <div class="fgrp"><label class="flbl">نوع البلاغ</label><div class="fro">${c.type}</div></div>
      <div class="fgrp"><label class="flbl">قناة الإبلاغ</label><div class="fro">${c.channel}</div></div>
      <div class="fgrp"><label class="flbl">الأولوية</label><div class="fro"><span class="badge ${_priClass(c.priority)}">${c.priority}</span></div></div>
      ${isInternal ? `<div class="fgrp"><label class="flbl">الموظف المختص</label><div class="fro">${c.assignedTo || '<span class="tx3">لم يُعيَّن بعد</span>'}</div></div>` : ''}
      ${isInternal && c.assignedInspector ? `<div class="fgrp"><label class="flbl">المفتش المكلف</label><div class="fro">${c.assignedInspector}</div></div>` : ''}
      ${c.returnCount > 0 ? `<div class="fgrp"><label class="flbl">عدد مرات الإعادة</label><div class="fro"><span class="badge b-returned">${c.returnCount} / 2</span></div></div>` : ''}
      <div class="fgrp span-full"><label class="flbl">وصف البلاغ</label><div class="fro" style="min-height:60px;white-space:pre-wrap">${c.description}</div></div>
    </div></div></div>`;

  /* ── 2. بيانات مقدم البلاغ ── */
  const submitterTypeLabel = { employer: 'صاحب عمل', insured: 'مؤمن عليه', 'fund-staff': 'موظف الصندوق', 'external-ref': 'إحالة خارجية' };
  const submitterPanel = `
    <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.user}</span>بيانات مقدم البلاغ</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">الاسم</label><div class="fro fw7">${c.submittedByName}</div></div>
      <div class="fgrp"><label class="flbl">صفة مقدم البلاغ</label><div class="fro">${submitterTypeLabel[c.submittedBy] || c.submittedBy}</div></div>
      ${c.submittedByCivil ? `<div class="fgrp"><label class="flbl">رقم الهوية</label><div class="fro">${c.submittedByCivil}</div></div>` : ''}
      ${c.submittedByPhone ? `<div class="fgrp"><label class="flbl">رقم الهاتف</label><div class="fro">${c.submittedByPhone}</div></div>` : ''}
      ${c.employerContact ? `<div class="fgrp"><label class="flbl">جهة التواصل بالمنشأة</label><div class="fro">${c.employerContact}</div></div>` : ''}
      ${c.employerPhone ? `<div class="fgrp"><label class="flbl">هاتف المنشأة</label><div class="fro">${c.employerPhone}</div></div>` : ''}
      <div class="fgrp"><label class="flbl">قناة التقديم</label><div class="fro">${c.channel}</div></div>
    </div></div></div>`;

  /* ── 3. بيانات صاحب العمل ── */
  const employerPanel = emp ? `
    <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.building}</span>بيانات صاحب العمل</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">اسم المنشأة</label><div class="fro fw7 txp">${emp.name}</div></div>
      <div class="fgrp"><label class="flbl">رقم السجل التجاري</label><div class="fro">${emp.crn}</div></div>
      <div class="fgrp"><label class="flbl">القطاع</label><div class="fro">${emp.sector}</div></div>
      <div class="fgrp"><label class="flbl">الموقع</label><div class="fro">${emp.location}</div></div>
      <div class="fgrp"><label class="flbl">عدد الموظفين المسجلين</label><div class="fro">${emp.employees}</div></div>
      <div class="fgrp"><label class="flbl">حالة الاشتراكات</label><div class="fro"><span class="badge ${emp.contributions.status==='منتظم'?'b-approved':'b-returned'}">${emp.contributions.status}</span></div></div>
      ${emp.contributions.arrears > 0 ? `<div class="fgrp"><label class="flbl">المبالغ المتأخرة</label><div class="fro fw7" style="color:var(--danger)">${emp.contributions.arrears.toLocaleString()} ر.ع</div></div>` : ''}
      <div class="fgrp"><label class="flbl">مستوى المخاطر</label><div class="fro"><span class="badge ${emp.riskLevel==='مرتفع'?'b-rejected':emp.riskLevel==='متوسط'?'b-returned':'b-approved'}">${emp.riskLevel}</span></div></div>
      <div class="fgrp"><label class="flbl">درجة الامتثال</label><div class="fro fw7">${emp.complianceScore}%</div></div>
      <div class="fgrp"><label class="flbl">آخر زيارة تفتيشية</label><div class="fro">${emp.lastVisit || '—'}</div></div>
    </div></div></div>` : `
    <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.building}</span>بيانات صاحب العمل</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">اسم المنشأة</label><div class="fro fw7 txp">${c.employerName}</div></div>
      ${c.employerCRN ? `<div class="fgrp"><label class="flbl">السجل التجاري</label><div class="fro">${c.employerCRN}</div></div>` : ''}
      ${c.employerContact ? `<div class="fgrp"><label class="flbl">جهة الاتصال</label><div class="fro">${c.employerContact}</div></div>` : ''}
      ${c.employerPhone ? `<div class="fgrp"><label class="flbl">الهاتف</label><div class="fro">${c.employerPhone}</div></div>` : ''}
    </div></div></div>`;

  /* ── 4. بيانات العامل ── */
  const workerPanel = wrk ? `
    <div class="card"><div class="ph"><h3><span class="pico rd">${ICONS.user}</span>بيانات العامل</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">الاسم</label><div class="fro fw7">${wrk.name}</div></div>
      <div class="fgrp"><label class="flbl">رقم الهوية</label><div class="fro">${wrk.civil}</div></div>
      <div class="fgrp"><label class="flbl">المسمى الوظيفي</label><div class="fro">${wrk.position}</div></div>
      <div class="fgrp"><label class="flbl">القسم</label><div class="fro">${wrk.department}</div></div>
      <div class="fgrp"><label class="flbl">الأجر الأساسي المسجل</label><div class="fro fw7">${wrk.salary || '—'} ر.ع / شهر</div></div>
      <div class="fgrp"><label class="flbl">تاريخ الالتحاق</label><div class="fro">${wrk.joinDate || wrk.insuredFrom || '—'}</div></div>
      <div class="fgrp"><label class="flbl">حالة التوظيف</label><div class="fro"><span class="badge ${wrk.employmentStatus==='على رأس العمل'?'b-approved':'b-returned'}">${wrk.employmentStatus || '—'}</span></div></div>
      ${wrk.resignDate ? `<div class="fgrp"><label class="flbl">تاريخ انتهاء الخدمة</label><div class="fro">${wrk.resignDate}</div></div>` : ''}
      <div class="fgrp"><label class="flbl">نوع العقد</label><div class="fro">${wrk.contractType}</div></div>
      <div class="fgrp"><label class="flbl">الجنسية</label><div class="fro">${wrk.nationality}</div></div>
    </div></div></div>` : (c.workerName ? `
    <div class="card"><div class="ph"><h3><span class="pico rd">${ICONS.user}</span>بيانات العامل</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">الاسم</label><div class="fro fw7">${c.workerName}</div></div>
      ${c.workerCivil ? `<div class="fgrp"><label class="flbl">رقم الهوية</label><div class="fro">${c.workerCivil}</div></div>` : ''}
    </div></div></div>` : '');

  /* ── إشعار الإعادة + رفع + إعادة إرسال (للخارجيين عند الإعادة) ── */
  const returnedActionPanel = isReturned ? `
    <div class="card" style="border:2px solid var(--accent)"><div class="ph" style="background:#fffbf0"><h3><span class="pico or">${ICONS.warn}</span>مطلوب: استيفاء البيانات</h3></div>
    <div class="pb">
      <div class="alert alert-w" style="margin-bottom:16px">${ICONS.warn} <strong>ملاحظة من المختص:</strong> ${c.completionNote || 'يرجى استيفاء البيانات المطلوبة وإعادة إرسال الطلب.'}</div>
      <div class="fgrp" style="margin-bottom:14px">
        <label class="flbl">ملاحظتك / ردك <span class="req">*</span></label>
        <textarea class="fc" rows="4" id="return-note-input" placeholder="اكتب ملاحظتك وتوضيحك للمختص..." style="resize:vertical"></textarea>
      </div>
      <div style="margin-bottom:16px">
        <label class="flbl">المستندات المطلوبة</label>
        ${c.requiredDocuments && c.requiredDocuments.length ? c.requiredDocuments.map(d => `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;border:1px solid var(--border);border-radius:var(--rsm);margin-bottom:6px;background:${d.status==='مرفق'?'var(--success-l)':'var(--g50)'}">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:16px">${d.status==='مرفق'?'📎':'📋'}</span>
              <span style="font-size:13px;font-weight:600;color:var(--text)">${d.name}</span>
            </div>
            <span class="badge ${d.status==='مرفق'?'b-approved':'b-returned'}">${d.status}</span>
          </div>`).join('') : ''}
      </div>
      <div class="dz-box" style="padding:14px;min-height:auto;margin-bottom:16px">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="font-size:22px;color:var(--text3)">${ICONS.upload}</div>
          <div style="flex:1">
            <div style="font-size:12.5px;font-weight:600;color:var(--text2)">إرفاق المستندات المطلوبة</div>
            <div style="font-size:11px;color:var(--text3)">PDF, DOC, JPG — الحد الأقصى 10 MB لكل ملف</div>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="showToast('فتح نافذة الرفع','i')">اختيار ملف</button>
        </div>
      </div>
      <button class="btn btn-primary" onclick="(function(){const n=document.getElementById('return-note-input');if(!n||!n.value.trim()){showToast('يرجى إدخال ملاحظة قبل الإرسال','w');return;}showToast('تم إعادة إرسال الطلب بنجاح — سيراجعه المختص قريباً','s');})()">${ICONS.check}إعادة إرسال الطلب</button>
    </div></div>` : '';

  /* ── مقارنة البيانات ── */
  const dataComparePanel = c.registeredData ? `
    <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.switch}</span>البيانات المسجلة مقابل البيانات المطلوبة</h3></div>
    <div class="pb">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div style="border:1px solid var(--border);border-radius:var(--rsm);padding:14px;background:var(--g50)">
          <div style="font-size:11.5px;font-weight:700;color:var(--text3);margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid var(--border)">ما هو مسجل في النظام حالياً</div>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${c.registeredData.joinDate ? `<div class="fgrp" style="margin:0"><label class="flbl">تاريخ الالتحاق</label><div class="fro">${c.registeredData.joinDate}</div></div>` : ''}
            ${c.registeredData.contractReceiveDate ? `<div class="fgrp" style="margin:0"><label class="flbl">تاريخ استلام العقد</label><div class="fro">${c.registeredData.contractReceiveDate}</div></div>` : ''}
            ${c.registeredData.salary ? `<div class="fgrp" style="margin:0"><label class="flbl">الأجر الأساسي</label><div class="fro">${c.registeredData.salary} ر.ع</div></div>` : ''}
            ${c.registeredData.allowances ? `<div class="fgrp" style="margin:0"><label class="flbl">البدلات</label><div class="fro">${c.registeredData.allowances} ر.ع</div></div>` : ''}
            ${c.registeredData.fullSalary ? `<div class="fgrp" style="margin:0"><label class="flbl">الأجر الكامل</label><div class="fro fw7">${c.registeredData.fullSalary} ر.ع</div></div>` : ''}
            ${c.registeredData.resignDate ? `<div class="fgrp" style="margin:0"><label class="flbl">تاريخ انتهاء الخدمة</label><div class="fro">${c.registeredData.resignDate}</div></div>` : ''}
          </div>
        </div>
        <div style="border:1px solid var(--accent);border-radius:var(--rsm);padding:14px;background:#fffbf0">
          <div style="font-size:11.5px;font-weight:700;color:var(--accent);margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid var(--accent)">البيانات المطلوب تعديلها</div>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${c.requestedData && c.requestedData.changeType ? `<div class="fgrp" style="margin:0"><label class="flbl">نوع التعديل</label><div class="fro fw7 txp">${c.requestedData.changeType}</div></div>` : ''}
            ${c.requestedData && c.requestedData.actualSalary ? `<div class="fgrp" style="margin:0"><label class="flbl">الأجر الفعلي المدّعى به</label><div class="fro fw7" style="color:var(--accent)">${c.requestedData.actualSalary} ر.ع</div></div>` : ''}
            ${c.requestedData && c.requestedData.actualJoinDate ? `<div class="fgrp" style="margin:0"><label class="flbl">تاريخ الالتحاق الفعلي</label><div class="fro fw7" style="color:var(--accent)">${c.requestedData.actualJoinDate}</div></div>` : ''}
            ${c.requestedData && c.requestedData.effectiveFrom ? `<div class="fgrp" style="margin:0"><label class="flbl">نافذ من تاريخ</label><div class="fro">${c.requestedData.effectiveFrom}</div></div>` : ''}
            ${c.requestedData && c.requestedData.notes ? `<div class="fgrp" style="margin:0"><label class="flbl">ملاحظات مقدم الطلب</label><div class="fro" style="font-size:12px;white-space:pre-wrap">${c.requestedData.notes}</div></div>` : ''}
          </div>
        </div>
      </div>
    </div></div>` : '';

  /* ── نتائج التحقق (داخلي فقط) ── */
  const verPanel = showWorkflowPanels && c.verificationResults && c.verificationResults.length ? `
    <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.check}</span>نتائج التحقق من الأنظمة المتكاملة</h3></div>
    <div class="pb">
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px">
        ${c.verificationResults.map(vr => `
          <div style="padding:8px 14px;border-radius:var(--rsm);border:1px solid var(--border);background:${vr.status==='مخالف'?'#fff5f5':vr.status==='موافق'?'#f0fff4':'#fffbf0'}">
            <div style="font-size:11px;color:var(--text3);margin-bottom:4px">${vr.source}</div>
            <span class="badge ${vr.status==='مخالف'?'b-rejected':vr.status==='موافق'?'b-approved':'b-returned'}">${vr.status}</span>
          </div>`).join('')}
      </div>
      ${c.verificationResults.map(vr => `
        <div style="margin-bottom:14px;border:1px solid var(--border);border-radius:var(--rsm);overflow:hidden">
          <div style="padding:10px 14px;background:var(--g50);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
            <span style="font-size:13px;font-weight:700;color:var(--text)">${vr.source}</span>
            <span class="badge ${vr.status==='مخالف'?'b-rejected':vr.status==='موافق'?'b-approved':'b-returned'}">${vr.status}</span>
          </div>
          <div style="padding:12px 14px">
            ${vr.checks.map(ch => `
              <div style="display:flex;align-items:flex-start;gap:10px;padding:7px 0;border-bottom:1px solid var(--border)">
                <span class="badge ${ch.result==='مخالف'?'b-rejected':ch.result==='موافق'?'b-approved':'b-returned'}" style="white-space:nowrap;flex-shrink:0">${ch.result}</span>
                <div style="flex:1">
                  <div style="font-size:12px;font-weight:600;color:var(--text2)">${ch.rule}</div>
                  ${ch.value ? `<div style="font-size:11.5px;color:var(--text3);margin-top:2px">${ch.value}</div>` : ''}
                </div>
              </div>`).join('')}
          </div>
        </div>`).join('')}
    </div></div>` : '';

  /* ── المستندات المطلوبة (تُعرض لغير الإعادة) ── */
  const docsPanel = !isReturned && c.requiredDocuments && c.requiredDocuments.length ? `
    <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.upload}</span>المستندات المطلوبة (${c.requiredDocuments.length})</h3>
      ${isExternal ? `<button class="btn btn-secondary btn-sm" onclick="showToast('فتح نافذة الرفع','i')">${ICONS.plus}رفع مستند</button>` : ''}</div>
    <div class="pb">
      ${c.requiredDocuments.map(d => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;border:1px solid var(--border);border-radius:var(--rsm);margin-bottom:8px;background:${d.status==='مرفق'?'var(--success-l)':'var(--g50)'}">
          <div style="display:flex;align-items:center;gap:10px">
            <span style="font-size:16px">${d.status==='مرفق'?'📎':'📋'}</span>
            <span style="font-size:13px;font-weight:600;color:var(--text)">${d.name}</span>
          </div>
          <span class="badge ${d.status==='مرفق'?'b-approved':'b-returned'}">${d.status}</span>
        </div>`).join('')}
    </div></div>` : '';

  /* ── المرفقات ── */
  const attachmentsPanel = `
    <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.upload}</span>المرفقات (${(c.attachments||[]).length})</h3>
      ${(isDraft || isReturned) ? `<button class="btn btn-secondary btn-sm" onclick="showToast('فتح نافذة الرفع','i')">${ICONS.plus}إضافة</button>` : ''}</div>
    <div class="pb">${(c.attachments||[]).length ? c.attachments.map(a => attRow(a)).join('') : '<div class="tx3 fs11">لا توجد مرفقات</div>'}</div></div>`;

  /* ── السجل الزمني ── */
  const timelinePanel = `
    <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.clock}</span>السجل الزمني</h3></div>
    <div class="pb">${_renderComplaintTimeline(c.timeline)}</div></div>`;

  /* ── لوحة الإجراءات ── */
  const rolePanels = showWorkflowPanels ? _renderCumulativeRolePanels(c) : '';
  const actionPanel = (isExternal && (isDraft || isReturned)) ? '' : _buildComplaintActionPanel(role, c);

  /* ── إجراءات المسودة للخارجيين ── */
  const draftActionsPanel = isDraft ? `
    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.pen}</span>إجراءات المسودة</h3></div>
    <div class="pb">
      <div class="dz-box" style="padding:14px;min-height:auto;margin-bottom:16px">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="font-size:22px;color:var(--text3)">${ICONS.upload}</div>
          <div style="flex:1">
            <div style="font-size:12.5px;font-weight:600;color:var(--text2)">إرفاق المستندات المطلوبة</div>
            <div style="font-size:11px;color:var(--text3)">PDF, DOC, JPG — الحد الأقصى 10 MB</div>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="showToast('فتح نافذة الرفع','i')">اختيار ملف</button>
        </div>
      </div>
      <div class="df ac g8">
        <button class="btn btn-primary" onclick="showToast('تم حفظ وإرسال الطلب بنجاح','s')">${ICONS.check}حفظ وإرسال الطلب</button>
        <button class="btn btn-ghost" onclick="showToast('تم الحفظ كمسودة','i')">حفظ كمسودة</button>
        <button class="btn btn-secondary" onclick="navigateTo('complaints-list')">إلغاء</button>
      </div>
    </div></div>` : '';

  return `<div class="pg-head"><div><h1>${c.id}</h1><p>${c.type} — ${c.employerName}</p></div>
    <div class="pg-acts">${statusBadge(c.status)}<span class="badge ${_priClass(c.priority)}">${c.priority}</span>
      <button class="btn btn-secondary btn-sm" onclick="navigateTo('complaints-list')">${ICONS.arrow_right}رجوع</button></div></div>

  ${requestPanel}
  ${submitterPanel}
  ${employerPanel}
  ${workerPanel}
  ${returnedActionPanel}
  ${draftActionsPanel}
  ${dataComparePanel}
  ${verPanel}
  ${docsPanel}
  ${rolePanels}
  ${actionPanel}
  ${attachmentsPanel}
  ${showWorkflowPanels ? renderNotes(c.notes, c.id) : ''}
  ${timelinePanel}`;
}

function _renderComplaintTimeline(timeline) {
  if (!timeline || !timeline.length) return '<p style="color:var(--text3);font-size:12.5px">لا توجد سجلات</p>';
  return `<div class="tl">${timeline.map((t, i) => `
    <div class="tl-item">
      <div class="tl-dot ${i === 0 ? '' : 'g'}">${ICONS.check}</div>
      <div class="tl-c">
        <div class="tl-hd">
          <span class="tl-act">${t.action}</span>
          <span class="tl-time">${t.date}</span>
        </div>
        ${t.step ? `<div style="font-size:11px;color:var(--primary);font-weight:600;margin-top:2px">${t.step}</div>` : ''}
        <div class="tl-meta">${t.actor}${t.actorRole ? ` — ${INSP_CONFIG.roles[t.actorRole] ? INSP_CONFIG.roles[t.actorRole].nameAr : t.actorRole}` : ''}</div>
      </div>
    </div>`).join('')}</div>`;
}

function _renderCumulativeRolePanels(c) {
  const timeline = c.timeline || [];
  if (!timeline.length) return '';

  const order = ['fund-staff', 'insured', 'employer', 'monitoring-employee', 'monitoring-head', 'field-inspector', 'field-head', 'inspection-director'];
  const grouped = {};
  timeline.forEach(t => {
    if (!t.actorRole || t.actorRole === 'system') return;
    if (!grouped[t.actorRole]) grouped[t.actorRole] = [];
    grouped[t.actorRole].push(t);
  });

  const cards = order.filter(r => grouped[r] && grouped[r].length).map(r => {
    const title = INSP_CONFIG.roles[r] ? INSP_CONFIG.roles[r].nameAr : r;
    const rows = grouped[r].map(t => `
      <div style="padding:8px 0;border-bottom:1px solid var(--border)">
        <div style="font-size:12px;font-weight:700;color:var(--text2)">${t.action}</div>
        <div style="font-size:11px;color:var(--text3)">${t.date}${t.actor ? ` — ${t.actor}` : ''}</div>
      </div>`).join('');
    return `<div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.user}</span>إجراءات ${title}</h3></div>
      <div class="pb">${rows}</div></div>`;
  }).join('');

  return cards;
}

function _getComplaintActions(role, status) {
  if (role === 'employer' || role === 'insured') {
    if (status === 'مسودة') return ['حفظ كمسودة', 'حفظ وإرسال الطلب'];
    if (status === 'تم إعادة الطلب لاستيفاء البيانات') return ['إعادة إرسال الطلب'];
    if (status === 'تم اعادة فتح البلاغ') return ['إعادة إرسال الطلب'];
    return [];
  }

  if (role === 'fund-staff') {
    if (status === 'مسودة') return ['حفظ كمسودة', 'حفظ وإرسال الطلب'];
    if (status === 'تم إعادة الطلب لاستيفاء البيانات') return ['إعادة إرسال الطلب'];
    if (status === 'تم اعادة فتح البلاغ') return ['إعادة إرسال الطلب'];
    if (status === 'بانتظار تعيين') return ['تعيين مختص'];
    return [];
  }

  if (role === 'monitoring-employee') {
    if (status !== 'قيد المراجعة' && status !== 'تم اعادة فتح البلاغ' && status !== 'تم تقديم الطلب مرة أخرى') return [];
    return [
      'طلب استيفاء البيانات من كافة أطراف البلاغ',
      'طلب استيفاء البيانات من صاحب العمل فقط',
      'طلب استيفاء البيانات من المؤمن عليه فقط',
      'توصية برفض البلاغ',
      'توصية بقبول البلاغ',
      'توصية بحفظ البلاغ'
    ];
  }

  if (role === 'monitoring-head') {
    if (status !== 'بانتظار اعتماد رئيس قسم المتابعة والبلاغات') return [];
    return [
      'إعادة تعيين الموظف المختص ببحث البلاغ',
      'إعادة البلاغ إلى الموظف',
      'تأكيد رفض البلاغ',
      'اغلاق البلاغ',
      'حفظ البلاغ',
      'توجيه لقسم التفتيش'
    ];
  }

  if (role === 'field-inspector') {
    if (status !== 'قيد المراجعة من قسم التفتيش' && status !== 'بانتظار اجراء الزيارة التفتيشية') return [];
    return ['إعادة البلاغ الى رئيس قسم المتابعة والبلاغات', 'توجيه البلاغ الى رئيس القسم'];
  }

  if (role === 'field-head') {
    if (status !== 'بانتظار اعتماد رئيس قسم التفتيش') return [];
    return [
      'إعادة تعيين الموظف المختص ببحث البلاغ',
      'إعادة البلاغ إلى الموظف',
      'رفض اجراء التفتيش على البلاغ',
      'اغلاق البلاغ',
      'توجيه لقسم التفتيش'
    ];
  }

  if (role === 'inspection-director') {
    if (status !== 'انتظار اعتماد مدير الدائرة' && status !== 'تم اغلاق البلاغ') return [];
    return [
      'إعادة تعيين الموظف المختص ببحث البلاغ',
      'إعادة البلاغ إلى موظف قسم المتابعة والبلاغات',
      'إعادة البلاغ إلى موظف قسم التفتيش',
      'إعادة البلاغ إلى رئيس قسم المتابعة والبلاغات',
      'إعادة البلاغ إلى رئيس قسم التفتيش',
      'اغلاق البلاغ',
      'حفظ البلاغ',
      'إعادة فتح البلاغ'
    ];
  }

  return [];
}

function executeComplaintAction(action, complaintId, panelId) {
  const panel = document.getElementById(panelId);
  if (!panel) return;
  const noteEl = panel.querySelector('[data-action-note]');
  const reasonEl = panel.querySelector('[data-action-reason]');
  const noteRequired = noteEl && noteEl.dataset.required === 'true';
  const needsReason = [
    'توصية برفض البلاغ',
    'توصية بحفظ البلاغ',
    'تأكيد رفض البلاغ',
    'اغلاق البلاغ',
    'حفظ البلاغ',
    'رفض اجراء التفتيش على البلاغ',
    'إعادة فتح البلاغ'
  ].includes(action);

  if (needsReason && (!reasonEl || !reasonEl.value)) {
    showToast('يجب اختيار سبب لهذا الإجراء قبل المتابعة.', 'w');
    return;
  }
  if (noteRequired && noteEl && !noteEl.value.trim()) {
    showToast('يرجى إدخال ملاحظة قبل تنفيذ الإجراء.', 'w');
    return;
  }

  const reasonText = reasonEl && reasonEl.value ? ` (السبب: ${reasonEl.value})` : '';
  showToast(`تم تنفيذ: ${action}${reasonText}`, 's');
}

function _buildComplaintActionPanel(role, c) {
  const btns = _getComplaintActions(role, c.status);
  if (!btns.length) return '';

  const isExternalRole = role === 'employer' || role === 'insured';
  const isApplicantRole = role === 'fund-staff' || isExternalRole;
  const reasonRequiredActions = [
    'توصية برفض البلاغ',
    'توصية بحفظ البلاغ',
    'تأكيد رفض البلاغ',
    'اغلاق البلاغ',
    'حفظ البلاغ',
    'رفض اجراء التفتيش على البلاغ',
    'إعادة فتح البلاغ'
  ];
  const showReasonField = btns.some(b => reasonRequiredActions.includes(b));
  const panelId = `action-panel-${c.id}`;
  const actionBtnHtml = btns.map(b => {
    const cls = INSP_CONFIG.actionStyles[b] || 'btn-secondary btn-sm';
    return `<button class="btn ${cls}" onclick="executeComplaintAction('${b}', '${c.id}', '${panelId}')">${b}</button>`;
  }).join('');

  const isAssignment = btns.includes('تعيين مختص');
  const specialistSelectHtml = isAssignment ? `
        <div class="fgrp" style="margin-bottom:12px">
          <label class="flbl">اختيار الموظف المختص <span class="req">*</span></label>
          <select class="fc" data-specialist-select>
            <option value="">— اختر الموظف المختص —</option>
            <option value="سيف خلفان الأمري">سيف خلفان الأمري — قسم المتابعة والبلاغات</option>
            <option value="منى راشد البلوشي">منى راشد البلوشي — الصندوق</option>
          </select>
        </div>` : '';

  if (isApplicantRole) {
    return `
    <div class="dp" id="${panelId}">
      <div class="ph"><h3><span class="pico bl">${ICONS.pen}</span>لوحة الإجراءات</h3></div>
      <div class="dp-body">
        ${specialistSelectHtml}
        <div class="fgrp" style="margin-bottom:12px">
          <label class="flbl">ملاحظة</label>
          <textarea class="fc" rows="3" data-action-note data-required="false" placeholder="اكتب أي ملاحظات إضافية..." style="resize:vertical"></textarea>
        </div>
        <div style="margin-bottom:14px">
          <label class="flbl">إرفاق مستندات</label>
          <div class="dz-box" style="padding:14px;min-height:auto">
            <div style="display:flex;align-items:center;gap:12px">
              <div style="font-size:22px;color:var(--text3)">${ICONS.upload}</div>
              <div style="flex:1">
                <div style="font-size:12.5px;font-weight:600;color:var(--text2)">اسحب الملفات هنا أو انقر للرفع</div>
                <div style="font-size:11px;color:var(--text3)">PDF, DOC, JPG — الحد الأقصى 10 MB</div>
              </div>
              <button class="btn btn-secondary btn-sm" onclick="showToast('فتح نافذة الرفع','i')">اختيار ملف</button>
            </div>
          </div>
        </div>
        <div class="dp-acts">${actionBtnHtml}</div>
      </div>
    </div>`;
  }

  return `
    <div class="dp" id="${panelId}">
      <div class="ph"><h3><span class="pico bl">${ICONS.pen}</span>لوحة الإجراءات</h3>
        ${c.returnCount > 0 ? `<span class="badge b-returned" style="font-size:11px">إعادة ${c.returnCount}/2</span>` : ''}</div>
      <div class="dp-body">
        <div class="fgrp" style="margin-bottom:12px">
          <label class="flbl">ملاحظة <span class="req">*</span></label>
          <textarea class="fc" rows="3" data-action-note data-required="true" placeholder="اكتب الملاحظة والإجراء المتخذ..." style="resize:vertical"></textarea>
        </div>
        ${showReasonField ? `<div class="fgrp" style="margin-bottom:12px">
          <label class="flbl">سبب الإجراء (إلزامي للرفض/الإغلاق/الحفظ/إعادة الفتح)</label>
          <select class="fc" data-action-reason>
            <option value="">— اختر السبب —</option>
            <option>عدم الاختصاص</option>
            <option>عدم صحة البيانات الواردة</option>
            <option>استكمال المتطلبات وإغلاق البلاغ</option>
            <option>حفظ مؤقت لحين استكمال بيانات لاحقة</option>
            <option>ظهور بيانات جديدة تستوجب إعادة الفتح</option>
            <option>سبب آخر موضح في الملاحظة</option>
          </select>
        </div>` : ''}
        <div style="margin-bottom:14px">
          <label class="flbl">إرفاق مستندات</label>
          <div class="dz-box" style="padding:14px;min-height:auto">
            <div style="display:flex;align-items:center;gap:12px">
              <div style="font-size:22px;color:var(--text3)">${ICONS.upload}</div>
              <div style="flex:1">
                <div style="font-size:12.5px;font-weight:600;color:var(--text2)">اسحب الملفات هنا أو انقر للرفع</div>
                <div style="font-size:11px;color:var(--text3)">PDF, DOC, JPG — الحد الأقصى 10 MB</div>
              </div>
              <button class="btn btn-secondary btn-sm" onclick="showToast('فتح نافذة الرفع','i')">اختيار ملف</button>
            </div>
          </div>
        </div>
        <div class="dp-acts">${actionBtnHtml}</div>
      </div>
    </div>`;
}

/* ── قائمة التظلمات ── */
function renderAppealsList(role) {
  const canCreate = role === 'employer' || role === 'insured';
  const createBtn = canCreate ? `<button class="btn btn-primary" onclick="navigateTo('appeal-new')">${ICONS.plus}تظلم جديد</button>` : '';

  const filters = _filterBar([
    { label: 'بحث برقم التظلم', ph: 'YYYY-02-...' },
    { label: 'الحالة', type: 'select', opts: ['تم تقديم التظلم','قيد الدراسة','تم قبول التظلم','تم رفض التظلم','تم إغلاق التظلم'] },
    { label: 'نوع التظلم', type: 'select', opts: ['تظلم على القرار','تظلم على محضر الزيارة','تظلم على إجراء الإغلاق','تظلم على قرار الحظر'] },
    { label: 'من تاريخ', type: 'date' },
  ]);

  let data = INSP_DATA.appeals;
  if (role === 'employer') data = data.filter(a => a.submittedBy === 'employer');
  if (role === 'insured') data = data.filter(a => a.submittedBy === 'insured');

  const rows = data.map(a =>
    `<tr>
      <td><a href="#" onclick="navigateTo('appeal-details','id=${a.id}')" class="txp fw7">${a.id}</a></td>
      <td>${a.type}</td>
      <td class="fw7">${a.relatedId}</td>
      <td>${a.employerName}</td>
      <td>${statusBadge(a.status)}</td>
      <td>${a.submitDate}</td>
      <td><button class="btn btn-primary btn-xs" onclick="navigateTo('appeal-details','id=${a.id}')">${ICONS.eye}عرض</button></td>
    </tr>`).join('');

  return `<div class="pg-head"><div><h1>قائمة التظلمات</h1><p>${data.length} تظلم إجمالاً</p></div>
    <div class="pg-acts">${createBtn}<button class="btn btn-secondary btn-sm">${ICONS.download}تصدير</button></div></div>
    ${filters}
    ${_tblWrap(['رقم التظلم','النوع','البلاغ/الزيارة المرتبطة','المنشأة','الحالة','تاريخ التقديم','إجراء'], rows || _noData())}`;
}

/* ── إنشاء تظلم جديد ── */
function renderAppealNew(role) {
  const currentUser = INSP_DATA.users[role] || {};
  const currentEmployer = role === 'employer'
    ? INSP_DATA.employers.find(e => e.name === currentUser.dept) || INSP_DATA.employers[0]
    : null;
  const currentEmployerId = currentEmployer ? currentEmployer.id : null;
  const currentInsuredCivil = role === 'insured' ? currentUser.civil : null;
  const allVisits = [...(INSP_DATA.visits.periodic || []), ...(INSP_DATA.visits.surprise || []), ...(INSP_DATA.visits.scheduled || [])];
  const allBans = INSP_DATA.bans || [];

  function isFinalComplaint(c) {
    const status = c.status || '';
    return (
      !!(c.investigationResults && (c.investigationResults.decisionDate || c.investigationResults.outcome)) ||
      status.includes('تم إغلاق') ||
      status.includes('تم اغلاق') ||
      status.includes('مغلق') ||
      status.includes('تم حفظ') ||
      status.includes('تم رفض') ||
      status.includes('تم قبول')
    );
  }

  function isComplaintVisibleToRole(c) {
    if (role === 'employer') {
      return !!currentEmployerId && (
        c.employerId === currentEmployerId ||
        c.partyEmployerId === currentEmployerId ||
        c.submittedBy === 'employer'
      );
    }
    if (role === 'insured') {
      return !!currentInsuredCivil && (
        c.submittedByCivil === currentInsuredCivil ||
        c.workerCivil === currentInsuredCivil ||
        c.partyInsuredCivil === currentInsuredCivil
      );
    }
    return true;
  }

  const eligibleComplaints = INSP_DATA.complaints.filter(c => isComplaintVisibleToRole(c) && isFinalComplaint(c));

  const eligibleVisits = role === 'employer'
    ? allVisits.filter(v => !!currentEmployerId && v.employerId === currentEmployerId && v.status && (v.status.includes('تم اعتماد') || v.status.includes('مكتملة') || v.status.includes('مغلقة')))
    : [];

  const eligibleBans = role === 'employer'
    ? allBans.filter(b => !!currentEmployerId && b.employerId === currentEmployerId)
    : [];

  const availableAppealTypes = role === 'insured'
    ? ['complaint']
    : ['complaint', 'visit', 'ban'];

  const complaintOpts = eligibleComplaints.length
    ? eligibleComplaints.map(c => `<option value="${c.id}">${c.id} — ${c.type} (${c.status})</option>`).join('')
    : `<option value="">لا توجد بلاغات مؤهلة</option>`;

  const visitOpts = eligibleVisits.length
    ? eligibleVisits.map(v => `<option value="${v.id}">${v.id} — ${v.employerName} (${v.status})</option>`).join('')
    : `<option value="">لا توجد زيارات مؤهلة</option>`;

  const banOpts = eligibleBans.length
    ? eligibleBans.map(b => `<option value="${b.id}">${b.id} — ${b.employerName}</option>`).join('')
    : `<option value="">لا توجد قرارات حظر مؤهلة</option>`;

  const appealTypeCards = [];
  if (availableAppealTypes.includes('complaint')) {
    appealTypeCards.push(`
      <button class="card" id="atype-complaint" style="border:2px solid transparent;cursor:pointer;text-align:center;padding:20px;transition:.2s"
        onclick="_selectAppealType('complaint')">
        <div style="font-size:28px;margin-bottom:10px">📋</div>
        <div style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:6px">تظلم على قرار بلاغ</div>
        <div style="font-size:12px;color:var(--text3)">الاعتراض على القرار النهائي الصادر على البلاغ بعد استكمال معالجته</div>
      </button>`);
  }
  if (availableAppealTypes.includes('visit')) {
    appealTypeCards.push(`
      <button class="card" id="atype-visit" style="border:2px solid transparent;cursor:pointer;text-align:center;padding:20px;transition:.2s"
        onclick="_selectAppealType('visit')">
        <div style="font-size:28px;margin-bottom:10px">🏭</div>
        <div style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:6px">تظلم على محضر زيارة</div>
        <div style="font-size:12px;color:var(--text3)">الاعتراض على محضر زيارة تفتيشية معتمد يتعلق بمنشأتك</div>
      </button>`);
  }
  if (availableAppealTypes.includes('ban')) {
    appealTypeCards.push(`
      <button class="card" id="atype-ban" style="border:2px solid transparent;cursor:pointer;text-align:center;padding:20px;transition:.2s"
        onclick="_selectAppealType('ban')">
        <div style="font-size:28px;margin-bottom:10px">🚫</div>
        <div style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:6px">تظلم على قرار حظر</div>
        <div style="font-size:12px;color:var(--text3)">الاعتراض على قرار الحظر الصادر بحق المنشأة</div>
      </button>`);
  }

  return `<div class="pg-head"><div><h1>تقديم تظلم جديد</h1><p>اختر نوع التظلم أولاً ثم حدد البند المتظلم منه</p></div>
    <div class="pg-acts"><button class="btn btn-secondary" onclick="navigateTo('appeals-list')">${ICONS.arrow_right}رجوع</button></div></div>

  <div class="alert alert-i">${ICONS.info} يُقبل التظلم خلال <strong>30 يوماً</strong> من تاريخ صدور القرار أو اعتماد المحضر. يُرجى مراجعة البند المتظلم منه قبل البدء.</div>

  <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.file}</span>الخطوة الأولى: اختر نوع التظلم</h3></div>
  <div class="pb">
    <div id="appeal-type-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px">
      ${appealTypeCards.join('')}
    </div>
  </div></div>

  <div id="appeal-form-section" style="display:none">
    <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.file}</span>الخطوة الثانية: تحديد البند المتظلم منه</h3>
      <span id="appeal-type-badge" class="badge b-submitted"></span></div>
    <div class="pb">
      <div id="complaint-selector" style="display:none" class="fgrp">
        <label class="flbl">اختر البلاغ المتظلم منه <span class="req">*</span></label>
        <select class="fc" id="related-complaint-select" onchange="_previewRelated('complaint',this.value)">
          <option value="">— اختر البلاغ —</option>
          ${complaintOpts}
        </select>
      </div>
      <div id="visit-selector" style="display:none" class="fgrp">
        <label class="flbl">اختر الزيارة المتظلم من محضرها <span class="req">*</span></label>
        <select class="fc" id="related-visit-select" onchange="_previewRelated('visit',this.value)">
          <option value="">— اختر الزيارة —</option>
          ${visitOpts}
        </select>
      </div>
      <div id="ban-selector" style="display:none" class="fgrp">
        <label class="flbl">رقم قرار الحظر المتظلم منه <span class="req">*</span></label>
        <select class="fc">
          <option value="">— اختر قرار الحظر —</option>
          ${banOpts}
        </select>
      </div>
      <div id="related-preview" style="display:none;margin-top:12px;padding:14px;border:1px solid var(--border);border-radius:var(--rsm);background:var(--g50)">
        <div style="font-size:11.5px;font-weight:700;color:var(--text3);margin-bottom:8px">ملخص البند المختار</div>
        <div id="related-preview-content"></div>
      </div>
    </div></div>

    <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.pen}</span>الخطوة الثالثة: تفاصيل التظلم</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">نوع التظلم المحدد</label>
        <input class="fc" id="appeal-type-input" readonly style="background:var(--g50)"></div>
      <div class="fgrp"><label class="flbl">أولوية التظلم</label>
        <select class="fc"><option>عادية</option><option>مرتفعة</option><option>عاجلة</option></select></div>
      <div class="fgrp span-full"><label class="flbl">أسباب التظلم التفصيلية <span class="req">*</span></label>
        <textarea class="fc" id="appeal-reasons" rows="6" placeholder="اذكر بالتفصيل أسباب اعتراضك، والوقائع، والأدلة المتوفرة..." style="resize:vertical"></textarea></div>
    </div></div></div>

    <div class="card"><div class="ph"><h3><span class="pico rd">${ICONS.upload}</span>المستندات الداعمة</h3></div>
    <div class="pb">
      <div style="margin-bottom:12px;font-size:12.5px;color:var(--text2)">أرفق جميع المستندات التي تدعم تظلمك (صور، عقود، كشوفات، مراسلات رسمية...)</div>
      <div class="dz-box"><div class="dz-box-icon">${ICONS.upload}</div>
        <div class="dz-box-text">اسحب الملفات هنا أو انقر للرفع</div>
        <div class="dz-box-sub">PDF, DOC, JPG, ZIP — الحد الأقصى 10 MB لكل ملف</div>
      </div>
    </div></div>

    <div class="df ac g8">
      <button class="btn btn-primary" onclick="(function(){const r=document.getElementById('appeal-reasons');if(!r||!r.value.trim()){showToast('يرجى كتابة أسباب التظلم قبل الإرسال','w');return;}showToast('تم تقديم التظلم بنجاح — سيُخطَر الجهة المختصة','s');})()">${ICONS.check}تقديم التظلم</button>
      <button class="btn btn-ghost" onclick="showToast('تم الحفظ كمسودة','i')">حفظ كمسودة</button>
      <button class="btn btn-secondary" onclick="navigateTo('appeals-list')">إلغاء</button>
    </div>
  </div>

  <script>
  var _appealAvailableTypes = ${JSON.stringify(availableAppealTypes)};
  var _appealComplaintsData = ${JSON.stringify(eligibleComplaints.map(c=>({id:c.id,type:c.type,status:c.status,employerName:c.employerName,submitDate:c.submitDate})))};
  var _appealVisitsData = ${JSON.stringify(eligibleVisits.map(v=>({id:v.id,employerName:v.employerName,status:v.status,scheduledDate:v.scheduledDate||v.actualDate})))};
  var _appealTypeLabels = { complaint:'تظلم على قرار بلاغ', visit:'تظلم على محضر زيارة', ban:'تظلم على قرار حظر' };
  function _selectAppealType(type) {
    if(_appealAvailableTypes.indexOf(type) === -1) return;
    ['complaint','visit','ban'].forEach(function(t){
      var btn = document.getElementById('atype-'+t);
      if(btn){ btn.style.border = t===type ? '2px solid var(--primary)' : '2px solid transparent';
               btn.style.background = t===type ? 'var(--primary-l)' : ''; }
    });
    document.getElementById('appeal-form-section').style.display='';
    document.getElementById('complaint-selector').style.display = type==='complaint' ? '' : 'none';
    document.getElementById('visit-selector').style.display = type==='visit' ? '' : 'none';
    document.getElementById('ban-selector').style.display = type==='ban' ? '' : 'none';
    var badge = document.getElementById('appeal-type-badge');
    if(badge){ badge.textContent = _appealTypeLabels[type]||type; }
    var inp = document.getElementById('appeal-type-input');
    if(inp){ inp.value = _appealTypeLabels[type]||type; }
    document.getElementById('related-preview').style.display='none';
    document.getElementById('appeal-form-section').scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  function _previewRelated(kind, id) {
    var preview = document.getElementById('related-preview');
    var content = document.getElementById('related-preview-content');
    if(!id){ preview.style.display='none'; return; }
    var item = kind==='complaint' ? _appealComplaintsData.find(function(x){return x.id===id;}) : _appealVisitsData.find(function(x){return x.id===id;});
    if(!item){ preview.style.display='none'; return; }
    var html = '';
    if(kind==='complaint'){
      html = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12.5px">'
        +'<div><span style="color:var(--text3)">رقم البلاغ:</span> <strong>'+item.id+'</strong></div>'
        +'<div><span style="color:var(--text3)">نوع البلاغ:</span> '+item.type+'</div>'
        +'<div><span style="color:var(--text3)">المنشأة:</span> '+item.employerName+'</div>'
        +'<div><span style="color:var(--text3)">الحالة:</span> '+item.status+'</div>'
        +'<div><span style="color:var(--text3)">تاريخ التقديم:</span> '+item.submitDate+'</div>'
        +'</div>';
    } else {
      html = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12.5px">'
        +'<div><span style="color:var(--text3)">رقم الزيارة:</span> <strong>'+item.id+'</strong></div>'
        +'<div><span style="color:var(--text3)">المنشأة:</span> '+item.employerName+'</div>'
        +'<div><span style="color:var(--text3)">حالة الزيارة:</span> '+item.status+'</div>'
        +'<div><span style="color:var(--text3)">تاريخ الزيارة:</span> '+(item.scheduledDate||'—')+'</div>'
        +'</div>';
    }
    content.innerHTML = html;
    preview.style.display='';
  }
  </script>`;
}

/* ── تفاصيل التظلم ── */
function renderAppealDetails(role) {
  const id = getParam('id') || '2025-02-000001';
  const a = INSP_DATA.appeals.find(x => x.id === id) || INSP_DATA.appeals[0];
  const isExternal = role === 'employer' || role === 'insured';

  /* related complaint or visit lookup */
  let relatedPanel = '';
  if (a.relatedType === 'بلاغ' || a.relatedType === 'شكوى') {
    const rc = INSP_DATA.complaints.find(x => x.id === a.relatedId);
    if (rc) {
      const rEmp = INSP_DATA.employers.find(e => e.id === rc.employerId);
      const rWrk = INSP_DATA.workers.find(w => w.id === rc.workerId);
      relatedPanel = `
        <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.file}</span>تفاصيل البلاغ المتظلم منه</h3>
          <span class="badge b-session" style="font-size:11px">${rc.id}</span></div>
        <div class="pb">
          <div class="fg fg-2" style="margin-bottom:14px">
            <div class="fgrp"><label class="flbl">رقم البلاغ</label><div class="fro fw7 txp">${rc.id}</div></div>
            <div class="fgrp"><label class="flbl">نوع البلاغ</label><div class="fro">${rc.type}</div></div>
            <div class="fgrp"><label class="flbl">حالة البلاغ</label><div class="fro">${statusBadge(rc.status)}</div></div>
            <div class="fgrp"><label class="flbl">تاريخ التقديم</label><div class="fro">${rc.submitDate}</div></div>
            <div class="fgrp"><label class="flbl">المنشأة</label><div class="fro">${rc.employerName}</div></div>
            ${rWrk ? `<div class="fgrp"><label class="flbl">العامل</label><div class="fro">${rWrk.name}</div></div>` : ''}
            ${rEmp ? `<div class="fgrp"><label class="flbl">درجة الامتثال</label><div class="fro fw7">${rEmp.complianceScore}%</div></div>` : ''}
            <div class="fgrp span-full"><label class="flbl">وصف البلاغ</label><div class="fro" style="white-space:pre-wrap;font-size:12.5px">${rc.description}</div></div>
          </div>
        </div></div>`;
    }
  } else if (a.relatedType === 'زيارة ميدانية' || a.relatedType === 'زيارة') {
    const allVisits = [...(INSP_DATA.visits.periodic||[]), ...(INSP_DATA.visits.surprise||[]), ...(INSP_DATA.visits.scheduled||[])];
    const rv = allVisits.find(v => v.id === a.relatedId);
    if (rv) {
      relatedPanel = `
        <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.map}</span>تفاصيل الزيارة المتظلم منها</h3>
          <span class="badge b-session" style="font-size:11px">${rv.id}</span></div>
        <div class="pb"><div class="fg fg-2">
          <div class="fgrp"><label class="flbl">رقم الزيارة</label><div class="fro fw7 txp">${rv.id}</div></div>
          <div class="fgrp"><label class="flbl">نوع الزيارة</label><div class="fro">${rv.type || (rv.id.includes('-04-')?'مفاجئة':rv.id.includes('-05-')?'مجدولة':'دورية')}</div></div>
          <div class="fgrp"><label class="flbl">المنشأة</label><div class="fro">${rv.employerName}</div></div>
          <div class="fgrp"><label class="flbl">تاريخ الزيارة</label><div class="fro">${rv.actualDate || rv.scheduledDate || '—'}</div></div>
          <div class="fgrp"><label class="flbl">المفتش</label><div class="fro">${rv.inspectorName || '—'}</div></div>
          <div class="fgrp"><label class="flbl">حالة الزيارة</label><div class="fro">${statusBadge(rv.status)}</div></div>
          ${rv.violations && rv.violations.length ? `<div class="fgrp span-full"><label class="flbl">المخالفات المُسجَّلة (${rv.violations.length})</label>
            <div class="fro">
              ${rv.violations.map(v=>`<div style="padding:6px 0;border-bottom:1px solid var(--border);font-size:12.5px">${v.description||v}</div>`).join('')}
            </div></div>` : ''}
        </div></div></div>`;
    }
  } else if (a.relatedType === 'قرار حظر') {
    relatedPanel = `
      <div class="card"><div class="ph"><h3><span class="pico rd">${ICONS.lock}</span>قرار الحظر المتظلم منه</h3>
        <span class="badge b-session" style="font-size:11px">${a.relatedId}</span></div>
      <div class="pb"><div class="fg fg-2">
        <div class="fgrp"><label class="flbl">رقم قرار الحظر</label><div class="fro fw7 txp">${a.relatedId}</div></div>
        <div class="fgrp"><label class="flbl">المنشأة</label><div class="fro">${a.employerName}</div></div>
      </div></div></div>`;
  }

  /* action panel */
  let actionPanel = '';
  if (role === 'monitoring-employee' && a.status.includes('قيد الدراسة')) {
    actionPanel = `
      <div class="dp"><div class="ph"><h3><span class="pico bl">${ICONS.pen}</span>إجراء على التظلم</h3></div>
      <div class="dp-body">
        <div class="fgrp" style="margin-bottom:12px"><label class="flbl">مبرر القرار <span class="req">*</span></label>
          <textarea class="fc" rows="3" id="appeal-note" placeholder="اكتب سبب قبول أو رفض التظلم..."></textarea></div>
        <div class="dz-box" style="padding:12px;min-height:auto;margin-bottom:14px">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="font-size:20px;color:var(--text3)">${ICONS.upload}</div>
            <div style="flex:1"><div style="font-size:12.5px;font-weight:600">إرفاق مستندات</div></div>
            <button class="btn btn-secondary btn-sm" onclick="showToast('فتح نافذة الرفع','i')">اختيار</button>
          </div>
        </div>
        <div class="dp-acts">
          <button class="btn btn-primary btn-sm" onclick="(function(){var n=document.getElementById('appeal-note');if(!n||!n.value.trim()){showToast('يرجى كتابة مبرر القرار','w');return;}showToast('تم قبول التظلم وإحالته للاعتماد','s');})()">${ICONS.check}قبول التظلم</button>
          <button class="btn btn-danger btn-sm" onclick="(function(){var n=document.getElementById('appeal-note');if(!n||!n.value.trim()){showToast('يرجى كتابة مبرر الرفض','w');return;}showToast('تم رفض التظلم','s');})()">${ICONS.x}رفض التظلم</button>
          <button class="btn btn-secondary btn-sm" onclick="showToast('تم التوجيه للرئيس المباشر','i')">توجيه للرئيس</button>
        </div>
      </div></div>`;
  } else if (role === 'monitoring-head' && (a.status.includes('بانتظار') || a.status.includes('قيد الدراسة'))) {
    actionPanel = `
      <div class="dp"><div class="ph"><h3><span class="pico bl">${ICONS.pen}</span>اعتماد قرار التظلم</h3></div>
      <div class="dp-body">
        <div class="fgrp" style="margin-bottom:12px"><label class="flbl">القرار النهائي <span class="req">*</span></label>
          <textarea class="fc" rows="3" id="appeal-decision-note" placeholder="أدخل القرار النهائي ومبرراته..."></textarea></div>
        <div class="dz-box" style="padding:12px;min-height:auto;margin-bottom:14px">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="font-size:20px;color:var(--text3)">${ICONS.upload}</div>
            <div style="flex:1"><div style="font-size:12.5px;font-weight:600">إرفاق مستندات</div></div>
            <button class="btn btn-secondary btn-sm" onclick="showToast('فتح نافذة الرفع','i')">اختيار</button>
          </div>
        </div>
        <div class="dp-acts">
          <button class="btn btn-primary btn-sm" onclick="(function(){var n=document.getElementById('appeal-decision-note');if(!n||!n.value.trim()){showToast('يرجى كتابة القرار','w');return;}showToast('تم قبول التظلم واعتماد القرار','s');})()">${ICONS.check}قبول التظلم</button>
          <button class="btn btn-danger btn-sm" onclick="(function(){var n=document.getElementById('appeal-decision-note');if(!n||!n.value.trim()){showToast('يرجى كتابة مبرر الرفض','w');return;}showToast('تم رفض التظلم','s');})()">${ICONS.x}رفض التظلم</button>
        </div>
      </div></div>`;
  }

  /* decision panel */
  const decisionHtml = a.decision ? `
    <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.check}</span>قرار التظلم</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">القرار</label><div class="fro fw7">${a.decision.outcome}</div></div>
      <div class="fgrp"><label class="flbl">تاريخ القرار</label><div class="fro">${a.decision.decisionDate}</div></div>
      <div class="fgrp"><label class="flbl">صدر بواسطة</label><div class="fro">${a.decision.decisionBy}</div></div>
      <div class="fgrp span-full"><label class="flbl">سبب القرار</label><div class="fro" style="min-height:50px">${a.decision.reason}</div></div>
    </div></div></div>` : '';

  /* submitter panel */
  const submitterPanel = `
    <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.user}</span>بيانات مقدم التظلم</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">الاسم</label><div class="fro fw7">${a.submittedByName}</div></div>
      <div class="fgrp"><label class="flbl">صفة المقدم</label><div class="fro">${a.submittedBy === 'employer' ? 'صاحب عمل' : a.submittedBy === 'insured' ? 'مؤمن عليه' : a.submittedBy}</div></div>
      <div class="fgrp"><label class="flbl">المنشأة</label><div class="fro">${a.employerName}</div></div>
      <div class="fgrp"><label class="flbl">تاريخ التقديم</label><div class="fro">${a.submitDate}</div></div>
    </div></div></div>`;

  return `<div class="pg-head"><div><h1>${a.id}</h1><p>${a.type} — ${a.employerName}</p></div>
    <div class="pg-acts">${statusBadge(a.status)}<button class="btn btn-secondary btn-sm" onclick="navigateTo('appeals-list')">${ICONS.arrow_right}رجوع</button></div></div>

  <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.file}</span>بيانات طلب التظلم</h3></div>
  <div class="pb"><div class="fg fg-2">
    <div class="fgrp"><label class="flbl">رقم التظلم</label><div class="fro fw7">${a.id}</div></div>
    <div class="fgrp"><label class="flbl">نوع التظلم</label><div class="fro">${a.type}</div></div>
    <div class="fgrp"><label class="flbl">البند المرتبط</label><div class="fro txp fw7">${a.relatedId} (${a.relatedType})</div></div>
    <div class="fgrp"><label class="flbl">الحالة</label><div class="fro">${statusBadge(a.status)}</div></div>
    <div class="fgrp span-full"><label class="flbl">أسباب التظلم</label><div class="fro" style="min-height:70px;white-space:pre-wrap">${a.reasons}</div></div>
  </div></div></div>

  ${submitterPanel}
  ${relatedPanel}
  ${decisionHtml}
  ${actionPanel}

  <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.upload}</span>المرفقات (${(a.attachments||[]).length})</h3></div>
  <div class="pb">${(a.attachments||[]).length ? a.attachments.map(f => attRow(f)).join('') : '<div class="tx3 fs11">لا توجد مرفقات</div>'}</div></div>

  ${!isExternal ? renderNotes(a.notes, a.id) : ''}

  <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.clock}</span>السجل الزمني</h3></div>
  <div class="pb">${renderTimeline(a.timeline)}</div></div>`;
}

/* ── قائمة الزيارات ── */
function renderVisitsList(role, type) {
  type = type || 'periodic';
  const typeLabel = { periodic: 'الزيارات الدورية', surprise: 'الزيارات المفاجئة', scheduled: 'الزيارات المجدولة' }[type];
  const canCreate = (role === 'field-head' || role === 'inspection-director') && type === 'surprise';

  const filters = _filterBar([
    { label: 'بحث برقم الزيارة أو المنشأة', ph: 'YYYY-03-...' },
    { label: 'الحالة', type: 'select', opts: ['مجدولة','جارية','بانتظار مراجعة المحضر','تم اعتماد المحضر','مغلقة'] },
    { label: 'المفتش', type: 'select', opts: ['حاتم سالم الزدجالي','جميع المفتشين'] },
    { label: 'من تاريخ', type: 'date' },
  ]);

  const data = INSP_DATA.visits[type] || [];
  const detailPage = { periodic: 'visit-periodic-details', surprise: 'visit-surprise-details', scheduled: 'visit-scheduled-details' }[type] || 'visit-periodic-details';

  const rows = data.map(v =>
    `<tr>
      <td><a href="#" onclick="navigateTo('${detailPage}','id=${v.id}')" class="txp fw7">${v.id}</a></td>
      <td class="fw7">${v.employerName}</td>
      <td>${v.inspectorName}</td>
      <td>${statusBadge(v.status)}</td>
      <td>${v.scheduledDate}</td>
      <td>${v.actualDate || '<span class="tx3">—</span>'}</td>
      <td><div class="df ac g8">
        <button class="btn btn-primary btn-xs" onclick="navigateTo('${detailPage}','id=${v.id}')">${ICONS.eye}عرض</button>
        ${role === 'field-inspector' && v.status === 'مجدولة' ? `<button class="btn btn-accent btn-xs" onclick="showToast('تم بدء الزيارة','s')">بدء</button>` : ''}
        ${role === 'field-head' && v.status === 'بانتظار مراجعة المحضر' ? `<button class="btn btn-warning btn-xs" onclick="navigateTo('${detailPage}','id=${v.id}')">مراجعة</button>` : ''}
        ${role === 'field-head' && (v.status === 'مجدولة' || v.status === 'قيد التنفيذ') ? `<button class="btn btn-secondary btn-xs" onclick="navigateTo('inspector-redistribution','visit=${v.id}')">${ICONS.switch}إعادة توزيع</button>` : ''}
      </div></td>
    </tr>`).join('');

  return `<div class="pg-head"><div><h1>${typeLabel}</h1><p>${data.length} زيارة إجمالاً</p></div>
    <div class="pg-acts">${canCreate ? `<button class="btn btn-primary" onclick="navigateTo('visit-new')">${ICONS.plus}إضافة زيارة</button>` : ''}
      <button class="btn btn-secondary btn-sm">${ICONS.download}تصدير</button></div></div>
    ${filters}
    ${_tblWrap(['رقم الزيارة','المنشأة','المفتش','الحالة','التاريخ المجدول','تاريخ التنفيذ','إجراء'], rows || _noData())}`;
}

/* ── تفاصيل الزيارة ── */
function renderVisitDetails(role, type) {
  type = type || 'periodic';
  const id = getParam('id') || (INSP_DATA.visits[type][0] || {}).id;
  const v = (INSP_DATA.visits[type] || []).find(x => x.id === id) || INSP_DATA.visits[type][0];
  if (!v) return `<div class="empty-st">${ICONS.clipboard}<h4>الزيارة غير موجودة</h4></div>`;

  const listPage = { periodic: 'visits-periodic-list', surprise: 'visits-surprise-list', scheduled: 'visits-scheduled-list' }[type];
  const typeLabel = { periodic: 'زيارة دورية', surprise: 'زيارة مفاجئة', scheduled: 'زيارة مجدولة' }[type];
  const isExternal = role === 'employer' || role === 'insured';

  /* External users: show basic info + approved findings only */
  if (isExternal) {
    const isCompleted = v.status && (v.status.includes('تم اعتماد') || v.status.includes('مغلقة'));
    return `<div class="pg-head"><div><h1>${v.id}</h1><p>${typeLabel} — ${v.employerName}</p></div>
      <div class="pg-acts">${statusBadge(v.status)}
        <button class="btn btn-secondary btn-sm" onclick="navigateTo('${listPage}')">${ICONS.arrow_right}رجوع</button></div></div>

    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.clipboard}</span>معلومات الزيارة</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">رقم الزيارة</label><div class="fro fw7">${v.id}</div></div>
      <div class="fgrp"><label class="flbl">نوع الزيارة</label><div class="fro">${typeLabel}</div></div>
      <div class="fgrp"><label class="flbl">المنشأة</label><div class="fro txp fw7">${v.employerName}</div></div>
      <div class="fgrp"><label class="flbl">الحالة</label><div class="fro">${statusBadge(v.status)}</div></div>
      <div class="fgrp"><label class="flbl">التاريخ المجدول</label><div class="fro">${v.scheduledDate || '—'}</div></div>
      <div class="fgrp"><label class="flbl">تاريخ التنفيذ</label><div class="fro">${v.actualDate || 'لم ينفذ بعد'}</div></div>
      ${v.purpose ? `<div class="fgrp span-full"><label class="flbl">الغرض</label><div class="fro">${v.purpose}</div></div>` : ''}
    </div></div></div>

    ${isCompleted && v.findings ? `
    <div class="card"><div class="ph"><h3><span class="pico rd">${ICONS.warn}</span>نتائج الزيارة المعتمدة</h3></div>
    <div class="pb">
      <div class="alert alert-w">${ICONS.warn} ${v.findings.summary}</div>
      <div class="mt8"><strong class="fs12">المخالفات المُوثَّقة:</strong>
        <ul style="margin-top:8px;padding-right:20px;font-size:12.5px;color:var(--text2);line-height:2">
          ${v.findings.violations.map(x => `<li>${x}</li>`).join('')}
        </ul>
      </div>
      ${v.findings.correctiveActions ? `<div class="mt12"><strong class="fs12">الإجراءات التصحيحية المطلوبة منك:</strong>
        <ul style="margin-top:8px;padding-right:20px;font-size:12.5px;color:var(--success);line-height:2">
          ${v.findings.correctiveActions.map(x => `<li>${x}</li>`).join('')}
        </ul></div>` : ''}
      <div class="mt14 df ac g8">
        <button class="btn btn-secondary btn-sm">${ICONS.download}تنزيل نسخة المحضر</button>
        <button class="btn btn-ghost btn-sm" onclick="navigateTo('appeal-new')">${ICONS.file}تقديم تظلم على المحضر</button>
      </div>
    </div></div>` : (!isCompleted ? `<div class="alert alert-i">${ICONS.info} الزيارة لا تزال قيد التنفيذ. ستتمكن من الاطلاع على نتائجها بعد اعتماد المحضر.</div>` : '')}

    <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.clock}</span>السجل الزمني</h3></div>
    <div class="pb">${renderTimeline(v.timeline)}</div></div>`;
  }

  const checklistHtml = renderChecklist(v.checklistItems);

  const findingsHtml = v.findings ? `
    <div class="card"><div class="ph"><h3><span class="pico rd">${ICONS.warn}</span>نتائج الزيارة</h3></div>
    <div class="pb">
      <div class="alert alert-w">${ICONS.warn} ${v.findings.summary}</div>
      <div class="mt8"><strong class="fs11">المخالفات المرصودة:</strong>
        <ul style="margin-top:8px;padding-right:20px;font-size:12.5px;color:var(--text2);line-height:2">
          ${v.findings.violations.map(x => `<li>${x}</li>`).join('')}
        </ul>
      </div>
      ${v.findings.correctiveActions ? `<div class="mt12"><strong class="fs11">الإجراءات التصحيحية المطلوبة:</strong>
        <ul style="margin-top:8px;padding-right:20px;font-size:12.5px;color:var(--success);line-height:2">
          ${v.findings.correctiveActions.map(x => `<li>${x}</li>`).join('')}
        </ul></div>` : ''}
    </div></div>` : '';

  let actionPanel = '';
  if (role === 'field-inspector' && v.status === 'مجدولة') {
    actionPanel = _dpanel('تنفيذ الزيارة', ['بدء الزيارة'], `<p class="fs11 tx3">ابدأ الزيارة الميدانية وقم بتعبئة قائمة التحقق أدناه.</p>`);
  } else if (role === 'field-inspector' && v.status === 'جارية') {
    actionPanel = _dpanel('رفع المحضر', ['رفع المحضر'],
      `<div class="fgrp"><label class="flbl">ملاحظات المحضر</label><textarea class="fc" rows="4" placeholder="أدخل ملخص المحضر والنتائج..."></textarea></div>`);
  } else if (role === 'field-head' && v.status === 'بانتظار مراجعة المحضر') {
    actionPanel = _dpanel('مراجعة المحضر واعتماده', ['اعتماد المحضر','إعادة المحضر للمراجعة','إصدار أمر تصحيحي'],
      `<div class="fgrp"><label class="flbl">ملاحظات المراجعة</label><textarea class="fc" rows="3" placeholder="أدخل ملاحظاتك على المحضر..."></textarea></div>`);
  }

  return `<div class="pg-head"><div><h1>${v.id}</h1><p>${typeLabel} — ${v.employerName}</p></div>
    <div class="pg-acts">${statusBadge(v.status)}<button class="btn btn-secondary btn-sm" onclick="navigateTo('${listPage}')">${ICONS.arrow_right}رجوع</button></div></div>

  <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.clipboard}</span>معلومات الزيارة</h3></div>
  <div class="pb"><div class="fg fg-2">
    <div class="fgrp"><label class="flbl">رقم الزيارة</label><div class="fro fw7">${v.id}</div></div>
    <div class="fgrp"><label class="flbl">نوع الزيارة</label><div class="fro">${typeLabel}</div></div>
    <div class="fgrp"><label class="flbl">المنشأة</label><div class="fro txp fw7">${v.employerName}</div></div>
    <div class="fgrp"><label class="flbl">المفتش المعين</label><div class="fro">${v.inspectorName}</div></div>
    <div class="fgrp"><label class="flbl">التاريخ المجدول</label><div class="fro">${v.scheduledDate}</div></div>
    <div class="fgrp"><label class="flbl">تاريخ التنفيذ</label><div class="fro">${v.actualDate || 'لم ينفذ بعد'}</div></div>
    ${v.source ? `<div class="fgrp span-full"><label class="flbl">المصدر</label><div class="fro">${v.source}</div></div>` : ''}
    ${v.purpose ? `<div class="fgrp span-full"><label class="flbl">الغرض</label><div class="fro">${v.purpose}</div></div>` : ''}
    ${v.reason ? `<div class="fgrp span-full"><label class="flbl">سبب الزيارة</label><div class="fro">${v.reason}</div></div>` : ''}
  </div></div></div>

  ${v.report && v.report.approved ? `<div class="card"><div class="ph"><h3><span class="pico gr">${ICONS.check}</span>المحضر المعتمد</h3></div>
    <div class="pb"><div class="alert alert-s">${ICONS.check} تم اعتماد المحضر بواسطة ${v.report.approvedBy} بتاريخ ${v.report.approvalDate}</div>
    <button class="btn btn-secondary btn-sm">${ICONS.download}تنزيل المحضر</button></div></div>` : ''}

  <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.check}</span>قائمة التحقق</h3></div>
  <div class="pb">${checklistHtml}</div></div>

  ${findingsHtml}
  ${actionPanel}

  <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.clock}</span>سجل الأحداث</h3></div>
  <div class="pb">${renderTimeline(v.timeline)}</div></div>`;
}

/* ── جدولة زيارة جديدة ── */
function renderVisitNew(role) {
  return `<div class="pg-head"><div><h1>جدولة زيارة تفتيشية</h1><p>تعيين المنشأة والمفتش وتحديد موعد الزيارة</p></div>
    <div class="pg-acts"><button class="btn btn-secondary" onclick="goHome()">${ICONS.arrow_right}رجوع</button></div></div>
  <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.calendar}</span>تفاصيل الجدولة</h3></div>
  <div class="pb"><div class="fg fg-2">
    <div class="fgrp"><label class="flbl">نوع الزيارة <span class="req">*</span></label>
      <select class="fc"><option>زيارة مفاجئة</option><option>زيارة مجدولة</option></select></div>
    <div class="fgrp"><label class="flbl">المنشأة المستهدفة <span class="req">*</span></label>
      <select class="fc">${INSP_DATA.employers.map(e=>`<option>${e.name}</option>`).join('')}</select></div>
    <div class="fgrp"><label class="flbl">المفتش المكلف <span class="req">*</span></label>
      <select class="fc"><option>حاتم سالم الزدجالي</option></select></div>
    <div class="fgrp"><label class="flbl">تاريخ الزيارة <span class="req">*</span></label>
      <input type="date" class="fc"></div>
    <div class="fgrp"><label class="flbl">الأولوية</label>
      <select class="fc"><option>عادية</option><option>مرتفعة</option><option>عاجلة</option></select></div>
    <div class="fgrp"><label class="flbl">البلاغ/التظلم المرتبط</label>
      <select class="fc"><option value="">لا يوجد</option>${INSP_DATA.complaints.map(c=>`<option>${c.id}</option>`).join('')}</select></div>
    <div class="fgrp span-full"><label class="flbl">غرض الزيارة وملاحظات</label>
      <textarea class="fc" rows="4" placeholder="اكتب وصفاً لغرض الزيارة وأي توجيهات للمفتش..."></textarea></div>
  </div></div></div>
  <div class="df ac g8">
    <button class="btn btn-primary" onclick="showToast('تم جدولة الزيارة بنجاح','s')">${ICONS.check}جدولة الزيارة</button>
    <button class="btn btn-secondary" onclick="goHome()">إلغاء</button>
  </div>`;
}

/* ── تحليل بيانات العامل ── */
function renderWorkerAnalysis(role) {
  const wid   = getParam('worker');
  const civil = getParam('civil');
  let w = null;
  if (wid)   w = INSP_DATA.workers.find(x => x.id === wid);
  if (!w && civil) w = INSP_DATA.workers.find(x => x.civil === civil)
                    || INSP_DATA.workers.find(x => x.civil.startsWith(civil.substring(0,6)))
                    || INSP_DATA.workers[0];

  /* ── شاشة البحث (لا يوجد معامل) ── */
  if (!w) {
    return `<div class="pg-head"><div><h1>تحليل بيانات العمال</h1><p>أدخل الرقم المدني للعامل لعرض ملفه الشامل</p></div></div>
    <div class="card">
      <div class="ph"><h3><span class="pico bl">${ICONS.user}</span>البحث عن عامل</h3></div>
      <div class="pb" style="max-width:480px">
        <div class="fgrp" style="margin-bottom:16px">
          <label class="flbl">الرقم المدني للعامل <span class="req">*</span></label>
          <div style="display:flex;gap:8px">
            <input class="fc" id="wa-civil" placeholder="مثال: 0912345001" style="flex:1">
            <button class="btn btn-primary" onclick="_analyzeWorker()">${ICONS.chart}تحليل البيانات</button>
          </div>
          <div style="font-size:11px;color:var(--text3);margin-top:6px">يمكن أيضاً الوصول لهذه الشاشة من تفاصيل البلاغ أو الزيارة لعرض بيانات العامل مباشرة.</div>
        </div>
      </div>
    </div>
    <script>
    function _analyzeWorker() {
      var v = document.getElementById('wa-civil') ? document.getElementById('wa-civil').value.trim() : '';
      if (!v || v.length < 4) { showToast('يرجى إدخال رقم مدني صحيح (4 أرقام على الأقل)','w'); return; }
      navigateTo('worker-analysis', 'civil=' + v);
    }
    document.addEventListener('keydown', function(e){ if(e.key==='Enter'){ var el=document.getElementById('wa-civil'); if(el===document.activeElement) _analyzeWorker(); } });
    <\/script>`;
  }

  const wComplaints = INSP_DATA.complaints.filter(c => c.workerId === w.id);
  const wAppeals   = INSP_DATA.appeals.filter(a => a.submittedByName === w.name || (INSP_DATA.complaints.filter(c=>c.workerId===w.id).map(c=>c.id).includes(a.relatedId)));
  const empVisits  = [...INSP_DATA.visits.periodic, ...INSP_DATA.visits.surprise, ...INSP_DATA.visits.scheduled].filter(v => v.employerId === w.employerId);
  const _vpg = id => id.includes('-04-') ? 'visit-surprise-details' : id.includes('-05-') ? 'visit-scheduled-details' : 'visit-periodic-details';

  const riskScore = w.riskLevel === 'مرتفع' ? 82 : w.riskLevel === 'متوسط' ? 48 : 15;
  const riskColor = w.riskLevel === 'مرتفع' ? 'var(--danger)' : w.riskLevel === 'متوسط' ? 'var(--warning)' : 'var(--success)';

  const _insBadge = s => {
    if (s === 'مدفوع') return 'b-approved';
    if (s === 'غير مدفوع') return 'b-rejected';
    if (s === 'مدفوع متأخر') return 'b-returned';
    return 'b-draft';
  };
  const _srvBadge = s => s === 'نشط' ? 'b-approved' : 'b-rejected';

  const workerSelector = `<div class="card" style="margin-bottom:16px;background:var(--g50)"><div class="pb" style="padding:11px 18px">
    <div class="df ac g8">
      <span class="pico bl" style="font-size:16px">${ICONS.user}</span>
      <span style="font-size:13px;font-weight:700;color:var(--text)">${w.name}</span>
      <span style="font-size:11.5px;color:var(--text3)">رقم الهوية: ${w.civil}</span>
      <span class="badge ${_riskClass(w.riskLevel)}" style="font-size:11px">${w.riskLevel} المخاطر</span>
      <div style="margin-right:auto;display:flex;gap:8px">
        <button class="btn btn-secondary btn-sm" onclick="navigateTo('worker-analysis')">${ICONS.arrow_right}بحث جديد</button>
        <button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ تصدير الملف...','i')">${ICONS.download}تصدير</button>
      </div>
    </div></div></div>`;

  const profileCard = `
    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.user}</span>الملف الشخصي</h3>
      <span class="badge ${_riskClass(w.riskLevel)}">${w.riskLevel} المخاطر</span></div>
    <div class="pb">
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid var(--border)">
        <div style="width:56px;height:56px;border-radius:50%;background:var(--primary);color:#fff;font-size:20px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">${w.name.substring(0,2)}</div>
        <div><div style="font-size:16px;font-weight:700;color:var(--text)">${w.name}</div>
          <div style="font-size:12px;color:var(--text3);margin-top:2px">${w.position} — ${w.employer}</div>
          <div style="font-size:11px;color:var(--text3);margin-top:2px">رقم الهوية: ${w.civil}</div></div>
      </div>
      <div class="fg fg-2">
        <div class="fgrp"><label class="flbl">الجنسية</label><div class="fro">${w.nationality}</div></div>
        <div class="fgrp"><label class="flbl">الجنس</label><div class="fro">${w.gender}</div></div>
        <div class="fgrp"><label class="flbl">تاريخ الميلاد</label><div class="fro">${w.dob}</div></div>
        <div class="fgrp"><label class="flbl">الهاتف</label><div class="fro">${w.phone}</div></div>
        <div class="fgrp"><label class="flbl">البريد الإلكتروني</label><div class="fro">${w.email}</div></div>
        <div class="fgrp"><label class="flbl">القسم</label><div class="fro">${w.department}</div></div>
        <div class="fgrp"><label class="flbl">نوع العقد</label><div class="fro">${w.contractType}</div></div>
        <div class="fgrp"><label class="flbl">الراتب الأساسي</label><div class="fro fw7 txp">${w.salary} ر.ع / شهر</div></div>
        <div class="fgrp"><label class="flbl">مؤمَّن منذ</label><div class="fro">${w.insuredFrom}</div></div>
        <div class="fgrp"><label class="flbl">حماية الأجور</label><div class="fro"><span class="badge ${w.wageProtection==='منتظم'?'b-approved':'b-returned'}">${w.wageProtection}</span></div></div>
        <div class="fgrp"><label class="flbl">التأمين الصحي</label><div class="fro" style="font-size:11.5px">${w.healthInsurance}</div></div>
      </div>
    </div></div>`;

  const riskCard = `
    <div class="card"><div class="ph"><h3><span class="pico rd">${ICONS.warn}</span>تقييم المخاطر</h3></div>
    <div class="pb">
      <div style="text-align:center;margin-bottom:16px">
        <div style="font-size:36px;font-weight:800;color:${riskColor}">${riskScore}</div>
        <div style="font-size:11px;color:var(--text3)">درجة المخاطر من 100</div>
        <div style="height:10px;background:var(--g100);border-radius:999px;margin:10px 0;overflow:hidden">
          <div style="height:100%;width:${riskScore}%;background:${riskColor};border-radius:999px"></div></div>
        <span class="badge ${_riskClass(w.riskLevel)}" style="font-size:12px">${w.riskLevel === 'مرتفع' ? 'خطر مرتفع — يتطلب متابعة عاجلة' : w.riskLevel === 'متوسط' ? 'خطر متوسط — يتطلب مراقبة' : 'خطر منخفض — وضع سليم'}</span>
      </div>
      <div style="border-top:1px solid var(--border);padding-top:14px">
        <div style="font-size:12px;font-weight:700;color:var(--text2);margin-bottom:10px">مؤشرات الخطر (${w.riskIndicators.length})</div>
        ${w.riskIndicators.map(r => `
          <div style="display:flex;align-items:flex-start;gap:8px;padding:9px 12px;border-radius:var(--rsm);background:${r.severity==='مرتفع'?'var(--danger-l)':r.severity==='متوسط'?'#fff7ed':'var(--success-l)'};border:1px solid ${r.severity==='مرتفع'?'#fca5a5':r.severity==='متوسط'?'#fed7aa':'#86efac'};margin-bottom:8px">
            <span style="font-size:9px;padding:2px 7px;border-radius:999px;font-weight:700;background:${r.severity==='مرتفع'?'var(--danger)':r.severity==='متوسط'?'var(--warning)':'var(--success)'};color:#fff;white-space:nowrap;margin-top:1px">${r.severity}</span>
            <span style="font-size:12px;color:var(--text2);line-height:1.6">${r.text}</span>
          </div>`).join('')}
      </div>
    </div></div>`;

  const insHistory = `
    <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.clock}</span>سجل اشتراكات التأمين الاجتماعي (آخر 6 أشهر)</h3></div>
    <div class="tbl-wrap"><table class="dtbl">
      <thead><tr><th>الشهر</th><th>المبلغ المستحق</th><th>الحالة</th><th>تاريخ السداد</th></tr></thead>
      <tbody>${w.insuranceHistory.map(h => `
        <tr>
          <td class="fw7">${h.month}</td>
          <td>${h.amount}</td>
          <td><span class="badge ${_insBadge(h.status)}">${h.status}</span></td>
          <td>${h.paidDate || '<span class="badge b-rejected">لم يُسدَّد</span>'}</td>
        </tr>`).join('')}
      </tbody></table></div></div>`;

  const empHistory = `
    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.building}</span>سجل التوظيف والتأمين</h3></div>
    <div class="tbl-wrap"><table class="dtbl">
      <thead><tr><th>جهة العمل</th><th>المسمى الوظيفي</th><th>من</th><th>إلى</th><th>سبب الانتهاء</th><th>الحالة</th></tr></thead>
      <tbody>${w.employmentHistory.map(h => `
        <tr>
          <td class="fw7">${h.employer}</td>
          <td>${h.position}</td>
          <td>${h.from}</td>
          <td>${h.to}</td>
          <td>${h.reason || '<span class="tx3">—</span>'}</td>
          <td><span class="badge ${_srvBadge(h.status)}">${h.status}</span></td>
        </tr>`).join('')}
      </tbody></table></div></div>`;

  const complaintsSection = wComplaints.length ? `
    <div class="card"><div class="ph"><h3><span class="pico rd">${ICONS.inbox}</span>البلاغات المرتبطة بالعامل (${wComplaints.length})</h3></div>
    <div class="tbl-wrap"><table class="dtbl">
      <thead><tr><th>رقم البلاغ</th><th>النوع</th><th>المنشأة</th><th>الحالة</th><th>الأولوية</th><th>تاريخ التقديم</th><th>إجراء</th></tr></thead>
      <tbody>${wComplaints.map(c => `
        <tr>
          <td><a href="#" onclick="navigateTo('complaint-details','id=${c.id}')" class="txp fw7">${c.id}</a></td>
          <td>${c.type}</td>
          <td>${c.employerName}</td>
          <td>${statusBadge(c.status)}</td>
          <td><span class="badge ${_priClass(c.priority)}">${c.priority}</span></td>
          <td>${c.submitDate}</td>
          <td><button class="btn btn-primary btn-xs" onclick="navigateTo('complaint-details','id=${c.id}')">${ICONS.eye}عرض</button></td>
        </tr>`).join('')}
      </tbody></table></div></div>` :
    `<div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.inbox}</span>البلاغات المرتبطة بالعامل</h3></div>
    <div class="pb"><div class="empty-st" style="padding:24px 0">${ICONS.check}<h4>لا توجد بلاغات مرتبطة بهذا العامل</h4></div></div></div>`;

  const visitsSection = empVisits.length ? `
    <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.clipboard}</span>الزيارات التفتيشية للمنشأة (${empVisits.length})</h3>
      <span style="font-size:11px;color:var(--text3)">جميع الزيارات لمنشأة ${w.employer}</span></div>
    <div class="tbl-wrap"><table class="dtbl">
      <thead><tr><th>رقم الزيارة</th><th>النوع</th><th>المفتش</th><th>الحالة</th><th>التاريخ المجدول</th><th>المخالفات</th><th>إجراء</th></tr></thead>
      <tbody>${empVisits.map(v => `
        <tr>
          <td><a href="#" onclick="navigateTo('${_vpg(v.id)}','id=${v.id}')" class="txp fw7">${v.id}</a></td>
          <td>${v.id.includes('-04-')?'مفاجئة':v.id.includes('-05-')?'مجدولة':'دورية'}</td>
          <td>${v.inspectorName}</td>
          <td>${statusBadge(v.status)}</td>
          <td>${v.scheduledDate}</td>
          <td>${v.findings ? `<span class="badge b-returned">${v.findings.violations.length} مخالفة</span>` : '<span class="badge b-approved">لا مخالفات</span>'}</td>
          <td><button class="btn btn-primary btn-xs" onclick="navigateTo('${_vpg(v.id)}','id=${v.id}')">${ICONS.eye}عرض</button></td>
        </tr>`).join('')}
      </tbody></table></div></div>` : '';

  const appealsSection = wAppeals.length ? `
    <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.file}</span>التظلمات المرتبطة (${wAppeals.length})</h3></div>
    <div class="tbl-wrap"><table class="dtbl">
      <thead><tr><th>رقم التظلم</th><th>النوع</th><th>البند المرتبط</th><th>الحالة</th><th>تاريخ التقديم</th><th>إجراء</th></tr></thead>
      <tbody>${wAppeals.map(a => `
        <tr>
          <td><a href="#" onclick="navigateTo('appeal-details','id=${a.id}')" class="txp fw7">${a.id}</a></td>
          <td>${a.type}</td><td class="fw7">${a.relatedId}</td>
          <td>${statusBadge(a.status)}</td><td>${a.submitDate}</td>
          <td><button class="btn btn-primary btn-xs" onclick="navigateTo('appeal-details','id=${a.id}')">${ICONS.eye}عرض</button></td>
        </tr>`).join('')}
      </tbody></table></div></div>` : '';

  const externalIntegration = `
    <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.switch}</span>بيانات الربط الخارجي</h3>
      <span style="font-size:11px;color:var(--text3)">آخر تحديث: ${w.lastSyncDate || '2025-01-22'}</span></div>
    <div class="pb">
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px">
        ${[
          { src: 'نظام حماية الأجور', val: w.wageProtection, ok: w.wageProtection === 'منتظم', detail: `آخر تحويل: ${w.salary} ر.ع` },
          { src: 'وزارة العمل', val: w.workPermit || 'نشط', ok: true, detail: `تصريح العمل ساري` },
          { src: 'الأحوال المدنية', val: 'مستعلم', ok: true, detail: `رقم الهوية: ${w.civil}` },
          { src: 'سجلات الصندوق', val: w.insuranceStatus || 'مسجّل', ok: true, detail: `مؤمَّن منذ: ${w.insuredFrom}` },
        ].map(s => `
          <div style="border:1px solid ${s.ok?'var(--border)':'#fca5a5'};border-radius:var(--rsm);padding:12px 14px;background:${s.ok?'var(--g50)':'#fff5f5'}">
            <div style="font-size:11px;color:var(--text3);margin-bottom:6px">${s.src}</div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
              <span class="badge ${s.ok?'b-approved':'b-rejected'}">${s.val}</span>
            </div>
            <div style="font-size:11.5px;color:var(--text2)">${s.detail}</div>
          </div>`).join('')}
      </div>
    </div></div>`;

  const salaryHistory = w.insuranceHistory && w.insuranceHistory.length ? `
    <div class="dashboard-insights">
      <div class="chart-card">
        <div class="chart-head"><h3>تطور مبالغ الاشتراك (آخر 6 أشهر)</h3><span>بالريال العُماني</span></div>
        <div class="chart-bars">
          ${w.insuranceHistory.map(h => `
            <div class="chart-bar-row">
              <div class="chart-bar-meta"><span>${h.month}</span><strong>${h.amount}</strong></div>
              <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${h.status==='مدفوع'?'85':h.status==='مدفوع متأخر'?'60':'20'}%;background:${h.status==='مدفوع'?'var(--success)':h.status==='مدفوع متأخر'?'var(--warning)':'var(--danger)'}"></div></div>
            </div>`).join('')}
        </div>
      </div>
      <div class="chart-card">
        <div class="chart-head"><h3>مؤشرات الخطر</h3><span>${w.riskIndicators.length} مؤشر نشط</span></div>
        <div class="chart-bars">
          ${[['مرتفع', w.riskIndicators.filter(r=>r.severity==='مرتفع').length],
             ['متوسط', w.riskIndicators.filter(r=>r.severity==='متوسط').length],
             ['منخفض', w.riskIndicators.filter(r=>r.severity==='منخفض').length],
          ].map(([l,v]) => `
            <div class="chart-bar-row">
              <div class="chart-bar-meta"><span>${l}</span><strong>${v}</strong></div>
              <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${Math.round(v/(w.riskIndicators.length||1)*100)}%;background:${l==='مرتفع'?'var(--danger)':l==='متوسط'?'var(--warning)':'var(--success)'}"></div></div>
            </div>`).join('')}
        </div>
      </div>
    </div>` : '';

  return `<div class="pg-head"><div><h1>تحليل بيانات العمال</h1><p>ملف شامل للعامل مع كامل السجلات والمؤشرات المرتبطة</p></div>
    <div class="pg-acts"><button class="btn btn-secondary btn-sm">${ICONS.download}تصدير</button></div></div>
    ${workerSelector}
    ${profileCard}
    ${riskCard}
    ${externalIntegration}
    ${salaryHistory}
    ${insHistory}
    ${empHistory}
    ${complaintsSection}
    ${visitsSection}
    ${appealsSection}`;
}

/* ── تحليل بيانات صاحب العمل ── */
function renderEmployerAnalysis(role) {
  const eid = getParam('employer');
  const crn  = getParam('crn');
  let e = null;
  if (eid) e = INSP_DATA.employers.find(x => x.id === eid);
  if (!e && crn) e = INSP_DATA.employers.find(x => x.crn === crn)
                  || INSP_DATA.employers.find(x => x.crn.startsWith(crn.substring(0,6)))
                  || INSP_DATA.employers[0];

  /* ── شاشة البحث (لا يوجد معامل) ── */
  if (!e) {
    return `<div class="pg-head"><div><h1>تحليل بيانات أصحاب العمل</h1><p>أدخل رقم السجل التجاري لعرض الملف الشامل للمنشأة</p></div></div>
    <div class="card">
      <div class="ph"><h3><span class="pico or">${ICONS.building}</span>البحث عن منشأة</h3></div>
      <div class="pb" style="max-width:480px">
        <div class="fgrp" style="margin-bottom:16px">
          <label class="flbl">رقم السجل التجاري <span class="req">*</span></label>
          <div style="display:flex;gap:8px">
            <input class="fc" id="ea-crn" placeholder="مثال: 1234567890" style="flex:1">
            <button class="btn btn-primary" onclick="_analyzeEmployer()">${ICONS.chart}تحليل البيانات</button>
          </div>
          <div style="font-size:11px;color:var(--text3);margin-top:6px">يمكن أيضاً الوصول لهذه الشاشة من تفاصيل البلاغ أو الزيارة لعرض بيانات المنشأة مباشرة.</div>
        </div>
      </div>
    </div>
    <script>
    function _analyzeEmployer() {
      var v = document.getElementById('ea-crn') ? document.getElementById('ea-crn').value.trim() : '';
      if (!v || v.length < 4) { showToast('يرجى إدخال رقم سجل تجاري صحيح (4 أرقام على الأقل)','w'); return; }
      navigateTo('employer-analysis', 'crn=' + v);
    }
    document.addEventListener('keydown', function(e){ if(e.key==='Enter'){ var el=document.getElementById('ea-crn'); if(el===document.activeElement) _analyzeEmployer(); } });
    <\/script>`;
  }

  const eComplaints = INSP_DATA.complaints.filter(c => c.employerId === e.id);
  const eAppeals   = INSP_DATA.appeals.filter(a => a.employerId === e.id);
  const eBanCases  = INSP_DATA.banCases.filter(b => b.employerId === e.id);
  const eWorkers   = INSP_DATA.workers.filter(w => w.employerId === e.id);
  const eVisits    = [...INSP_DATA.visits.periodic.filter(v=>v.employerId===e.id),
                      ...INSP_DATA.visits.surprise.filter(v=>v.employerId===e.id),
                      ...INSP_DATA.visits.scheduled.filter(v=>v.employerId===e.id)];
  const _vpg = id => id.includes('-04-') ? 'visit-surprise-details' : id.includes('-05-') ? 'visit-scheduled-details' : 'visit-periodic-details';
  const _csBadge = s => s==='منتظم'?'b-approved':s==='متأخر'?'b-rejected':'b-returned';
  const _vBadge  = s => s==='مرتفع'?'b-rejected':s==='متوسط'?'b-returned':'b-approved';

  const employerSelector = `<div class="card" style="margin-bottom:16px;background:var(--g50)"><div class="pb" style="padding:11px 18px">
    <div class="df ac g8">
      <span class="pico or" style="font-size:16px">${ICONS.building}</span>
      <span style="font-size:13px;font-weight:700;color:var(--text)">${e.name}</span>
      <span style="font-size:11.5px;color:var(--text3)">سجل تجاري: ${e.crn}</span>
      <span class="badge ${_riskClass(e.riskLevel)}" style="font-size:11px">${e.riskLevel} المخاطر</span>
      <div style="margin-right:auto;display:flex;gap:8px">
        <button class="btn btn-secondary btn-sm" onclick="navigateTo('employer-analysis')">${ICONS.arrow_right}بحث جديد</button>
        <button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ تصدير الملف...','i')">${ICONS.download}تصدير</button>
      </div>
    </div></div></div>`;

  const kpis = `<div class="stats-grid">
    <div class="scard p"><div class="sc-lbl">إجمالي البلاغات</div><div class="sc-val">${eComplaints.length}</div><div class="sc-sub">${eComplaints.filter(c=>!c.status.includes('إغلاق')&&!c.status.includes('قرار')).length} مفتوح</div></div>
    <div class="scard i"><div class="sc-lbl">إجمالي الزيارات</div><div class="sc-val">${eVisits.length}</div><div class="sc-sub">${eVisits.filter(v=>v.findings).length} كشفت مخالفات</div></div>
    <div class="scard ${e.contributions.arrears>0?'d':'s'}"><div class="sc-lbl">المتأخرات التأمينية</div><div class="sc-val">${e.contributions.arrears>0?e.contributions.arrears.toLocaleString()+' ر.ع':'لا يوجد'}</div><div class="sc-sub">${e.contributions.status}</div></div>
    <div class="scard ${eBanCases.filter(b=>b.status.includes('سارٍ')).length?'d':'s'}"><div class="sc-lbl">حالات الحظر</div><div class="sc-val">${eBanCases.length}</div><div class="sc-sub">${eBanCases.filter(b=>b.status.includes('سارٍ')).length} نشط</div></div>
  </div>`;

  const profileCard = `
    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.building}</span>ملف المنشأة</h3>
      <span class="badge ${_riskClass(e.riskLevel)}">${e.riskLevel} المخاطر</span></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">اسم المنشأة</label><div class="fro fw7">${e.name}</div></div>
      <div class="fgrp"><label class="flbl">السجل التجاري</label><div class="fro">${e.crn}</div></div>
      <div class="fgrp"><label class="flbl">القطاع</label><div class="fro">${e.sector}</div></div>
      <div class="fgrp"><label class="flbl">الموقع</label><div class="fro">${e.location}</div></div>
      <div class="fgrp"><label class="flbl">تاريخ التسجيل</label><div class="fro">${e.registrationDate}</div></div>
      <div class="fgrp"><label class="flbl">عدد العمال</label><div class="fro fw7">${e.employees} عامل</div></div>
      <div class="fgrp"><label class="flbl">حالة المنشأة</label><div class="fro"><span class="badge b-approved">${e.status}</span></div></div>
      <div class="fgrp"><label class="flbl">آخر زيارة تفتيشية</label><div class="fro">${e.lastVisit}</div></div>
      <div class="fgrp"><label class="flbl">حالة الاشتراكات</label><div class="fro"><span class="badge ${_csBadge(e.contributions.status)}">${e.contributions.status}</span></div></div>
    </div></div></div>`;

  const complianceCard = `
    <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.check}</span>مستوى الامتثال والمخاطر</h3></div>
    <div class="pb">
      <div style="text-align:center;margin-bottom:18px">
        <div style="font-size:42px;font-weight:800;color:${_compColor(e.complianceScore)}">${e.complianceScore}%</div>
        <div style="font-size:11px;color:var(--text3);margin-bottom:8px">درجة الامتثال الإجمالية</div>
        <div style="height:14px;background:var(--g100);border-radius:999px;overflow:hidden;margin-bottom:12px">
          <div style="height:100%;width:${e.complianceScore}%;background:${_compColor(e.complianceScore)};border-radius:999px"></div></div>
        <span class="badge ${e.complianceScore>=85?'b-approved':e.complianceScore>=70?'b-returned':'b-rejected'}">${e.complianceScore>=85?'امتثال عالٍ':e.complianceScore>=70?'امتثال متوسط':'امتثال ضعيف — يستوجب تدخلاً'}</span>
      </div>
      <div style="border-top:1px solid var(--border);padding-top:14px">
        ${[
          { lbl:'البلاغات المفتوحة', val: eComplaints.filter(c=>!c.status.includes('إغلاق')&&!c.status.includes('قرار')).length, icon: '🔴', threshold: 2 },
          { lbl:'مخالفات مكتشفة', val: e.violations.length, icon: '⚠️', threshold: 3 },
          { lbl:'زيارات بمخالفات', val: eVisits.filter(v=>v.findings).length, icon: '📋', threshold: 2 },
          { lbl:'متأخرات الاشتراكات (ر.ع)', val: e.contributions.arrears, icon: '💰', threshold: 1000 },
        ].map(m=>`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border)">
            <span style="font-size:12px;color:var(--text2)">${m.lbl}</span>
            <span style="font-size:13px;font-weight:700;color:${m.val>m.threshold?'var(--danger)':'var(--success)'}">${m.val}</span>
          </div>`).join('')}
      </div>
    </div></div>`;

  const workersCard = eWorkers.length ? `
    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.user}</span>العمال المسجلون في المنشأة (${eWorkers.length})</h3></div>
    <div class="tbl-wrap"><table class="dtbl">
      <thead><tr><th>الاسم</th><th>رقم الهوية</th><th>المسمى الوظيفي</th><th>الراتب</th><th>حماية الأجور</th><th>التأمين الصحي</th><th>مؤشرات الخطر</th><th>إجراء</th></tr></thead>
      <tbody>${eWorkers.map(wk=>`
        <tr>
          <td class="fw7">${wk.name}</td>
          <td>${wk.civil}</td>
          <td>${wk.position}</td>
          <td>${wk.salary} ر.ع</td>
          <td><span class="badge ${wk.wageProtection==='منتظم'?'b-approved':'b-returned'}">${wk.wageProtection}</span></td>
          <td style="font-size:11px">${wk.healthInsurance.split('—')[0].trim()}</td>
          <td>${wk.riskIndicators.length?`<span class="badge b-returned">${wk.riskIndicators.length} مؤشر</span>`:'<span class="badge b-approved">سليم</span>'}</td>
          <td><button class="btn btn-primary btn-xs" onclick="navigateTo('worker-analysis','worker=${wk.id}')">${ICONS.eye}الملف</button></td>
        </tr>`).join('')}
      </tbody></table></div></div>` : '';

  const violationsCard = e.violations.length ? `
    <div class="card"><div class="ph"><h3><span class="pico rd">${ICONS.warn}</span>سجل المخالفات المكتشفة (${e.violations.length})</h3></div>
    <div class="tbl-wrap"><table class="dtbl">
      <thead><tr><th>التاريخ</th><th>نوع المخالفة</th><th>الخطورة</th><th>الزيارة المرجعية</th><th>الحالة</th></tr></thead>
      <tbody>${e.violations.map(v=>`
        <tr>
          <td>${v.date}</td>
          <td>${v.type}</td>
          <td><span class="badge ${_vBadge(v.severity)}">${v.severity}</span></td>
          <td><a href="#" onclick="navigateTo('${_vpg(v.visit)}','id=${v.visit}')" class="txp fw7">${v.visit}</a></td>
          <td><span class="badge ${v.status==='منجز'?'b-approved':v.status==='معلق'?'b-rejected':'b-returned'}">${v.status}</span></td>
        </tr>`).join('')}
      </tbody></table></div></div>` : '';

  const contribCard = `
    <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.clock}</span>سجل الاشتراكات التأمينية (آخر 6 أشهر)</h3>
      ${e.contributions.arrears>0?`<span class="badge b-rejected">متأخرات: ${e.contributions.arrears.toLocaleString()} ر.ع</span>`:''}
    </div>
    <div class="tbl-wrap"><table class="dtbl">
      <thead><tr><th>الشهر</th><th>عدد العمال</th><th>المبلغ</th><th>الحالة</th><th>تاريخ السداد</th></tr></thead>
      <tbody>${e.contributionHistory.map(h=>`
        <tr>
          <td class="fw7">${h.month}</td>
          <td>${h.workers}</td>
          <td>${h.amount}</td>
          <td><span class="badge ${h.status==='منتظم'?'b-approved':h.status==='غير مدفوع'?'b-rejected':'b-returned'}">${h.status}</span></td>
          <td>${h.paidDate||'<span class="badge b-rejected">لم يُسدَّد</span>'}</td>
        </tr>`).join('')}
      </tbody></table></div></div>`;

  const complaintsCard = eComplaints.length ? `
    <div class="card"><div class="ph"><h3><span class="pico rd">${ICONS.inbox}</span>البلاغات المرتبطة بالمنشأة (${eComplaints.length})</h3></div>
    <div class="tbl-wrap"><table class="dtbl">
      <thead><tr><th>رقم البلاغ</th><th>النوع</th><th>العامل</th><th>الحالة</th><th>الأولوية</th><th>القناة</th><th>تاريخ التقديم</th><th>إجراء</th></tr></thead>
      <tbody>${eComplaints.map(c=>`
        <tr>
          <td><a href="#" onclick="navigateTo('complaint-details','id=${c.id}')" class="txp fw7">${c.id}</a></td>
          <td>${c.type}</td>
          <td>${c.workerName||'<span class="tx3">غير محدد</span>'}</td>
          <td>${statusBadge(c.status)}</td>
          <td><span class="badge ${_priClass(c.priority)}">${c.priority}</span></td>
          <td style="font-size:11px">${c.channel}</td>
          <td>${c.submitDate}</td>
          <td><button class="btn btn-primary btn-xs" onclick="navigateTo('complaint-details','id=${c.id}')">${ICONS.eye}عرض</button></td>
        </tr>`).join('')}
      </tbody></table></div></div>` : '';

  const visitsCard = eVisits.length ? `
    <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.clipboard}</span>الزيارات التفتيشية (${eVisits.length})</h3></div>
    <div class="tbl-wrap"><table class="dtbl">
      <thead><tr><th>رقم الزيارة</th><th>النوع</th><th>المفتش</th><th>الحالة</th><th>التاريخ</th><th>المخالفات</th><th>المحضر</th><th>إجراء</th></tr></thead>
      <tbody>${eVisits.map(v=>`
        <tr>
          <td><a href="#" onclick="navigateTo('${_vpg(v.id)}','id=${v.id}')" class="txp fw7">${v.id}</a></td>
          <td>${v.id.includes('-04-')?'مفاجئة':v.id.includes('-05-')?'مجدولة':'دورية'}</td>
          <td>${v.inspectorName}</td>
          <td>${statusBadge(v.status)}</td>
          <td>${v.actualDate||v.scheduledDate}</td>
          <td>${v.findings?`<span class="badge b-returned">${v.findings.violations.length}</span>`:'<span class="badge b-approved">0</span>'}</td>
          <td>${v.report?.approved?'<span class="badge b-approved">معتمد</span>':'<span class="badge b-draft">—</span>'}</td>
          <td><button class="btn btn-primary btn-xs" onclick="navigateTo('${_vpg(v.id)}','id=${v.id}')">${ICONS.eye}عرض</button></td>
        </tr>`).join('')}
      </tbody></table></div></div>` : '';

  const appealsCard = eAppeals.length ? `
    <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.file}</span>التظلمات المقدمة من المنشأة (${eAppeals.length})</h3></div>
    <div class="tbl-wrap"><table class="dtbl">
      <thead><tr><th>رقم التظلم</th><th>النوع</th><th>البند المرتبط</th><th>الحالة</th><th>تاريخ التقديم</th><th>إجراء</th></tr></thead>
      <tbody>${eAppeals.map(a=>`
        <tr>
          <td><a href="#" onclick="navigateTo('appeal-details','id=${a.id}')" class="txp fw7">${a.id}</a></td>
          <td>${a.type}</td><td class="fw7">${a.relatedId}</td>
          <td>${statusBadge(a.status)}</td><td>${a.submitDate}</td>
          <td><button class="btn btn-primary btn-xs" onclick="navigateTo('appeal-details','id=${a.id}')">${ICONS.eye}عرض</button></td>
        </tr>`).join('')}
      </tbody></table></div></div>` : '';

  const banCard = eBanCases.length ? `
    <div class="card"><div class="ph"><h3><span class="pico rd">${ICONS.lock}</span>حالات الحظر (${eBanCases.length})</h3></div>
    <div class="tbl-wrap"><table class="dtbl">
      <thead><tr><th>رقم الحظر</th><th>النوع</th><th>تاريخ الإصدار</th><th>الحالة</th><th>تاريخ الرفع</th><th>إجراء</th></tr></thead>
      <tbody>${eBanCases.map(b=>`
        <tr>
          <td><a href="#" onclick="navigateTo('ban-case-details','id=${b.id}')" class="txp fw7">${b.id}</a></td>
          <td>${b.type}</td><td>${b.issuedDate}</td>
          <td>${statusBadge(b.status)}</td><td>${b.liftedDate||'<span class="tx3">—</span>'}</td>
          <td><button class="btn btn-primary btn-xs" onclick="navigateTo('ban-case-details','id=${b.id}')">${ICONS.eye}عرض</button></td>
        </tr>`).join('')}
      </tbody></table></div></div>` : '';

  const empExternalInteg = `
    <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.switch}</span>بيانات الربط الخارجي للمنشأة</h3>
      <span style="font-size:11px;color:var(--text3)">آخر تحديث: 2025-01-22</span></div>
    <div class="pb">
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px">
        ${[
          { src: 'وزارة التجارة والصناعة', val: e.status || 'مسجّل', ok: true, detail: `السجل التجاري: ${e.crn}` },
          { src: 'وزارة العمل', val: 'منتظم', ok: true, detail: `تصاريح العمل: ${e.employees} عامل` },
          { src: 'نظام حماية الأجور', val: e.contributions.status, ok: e.contributions.status==='منتظم', detail: `آخر سداد: ${e.contributions.lastPaid}` },
          { src: 'سجلات الصندوق', val: e.contributions.arrears > 0 ? `متأخرات ${e.contributions.arrears.toLocaleString()} ر.ع` : 'لا متأخرات', ok: e.contributions.arrears === 0, detail: `${e.employees} مؤمَّن عليه نشط` },
        ].map(s => `
          <div style="border:1px solid ${s.ok?'var(--border)':'#fca5a5'};border-radius:var(--rsm);padding:12px 14px;background:${s.ok?'var(--g50)':'#fff5f5'}">
            <div style="font-size:11px;color:var(--text3);margin-bottom:6px">${s.src}</div>
            <div style="margin-bottom:4px"><span class="badge ${s.ok?'b-approved':'b-rejected'}">${s.val}</span></div>
            <div style="font-size:11.5px;color:var(--text2)">${s.detail}</div>
          </div>`).join('')}
      </div>
    </div></div>`;

  const empCharts = `<div class="dashboard-insights">
    <div class="chart-card">
      <div class="chart-head"><h3>الاشتراكات التأمينية (آخر 6 أشهر)</h3><span>بالريال العُماني</span></div>
      <div class="chart-bars">
        ${e.contributionHistory.slice(0,6).map(h => `
          <div class="chart-bar-row">
            <div class="chart-bar-meta"><span>${h.month}</span><strong>${h.amount}</strong></div>
            <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${h.status==='منتظم'?'90':h.status==='متأخر'?'55':'15'}%;background:${h.status==='منتظم'?'var(--success)':h.status==='متأخر'?'var(--warning)':'var(--danger)'}"></div></div>
          </div>`).join('')}
      </div>
    </div>
    <div class="chart-card">
      <div class="chart-head"><h3>توزيع المخالفات حسب النوع</h3><span>${e.violations.length} مخالفة إجمالاً</span></div>
      <div class="chart-bars">
        ${[
          ['مخالفات السلامة', e.violations.filter(v=>v.type.includes('سلامة')).length],
          ['تأخر اشتراكات', e.violations.filter(v=>v.type.includes('اشتراك')||v.type.includes('تأمين')).length],
          ['عمالة غير نظامية', e.violations.filter(v=>v.type.includes('عمالة')||v.type.includes('أجنبية')).length],
          ['مخالفات رواتب', e.violations.filter(v=>v.type.includes('رواتب')||v.type.includes('أجر')).length],
          ['مخالفات أخرى', e.violations.filter(v=>!v.type.includes('سلامة')&&!v.type.includes('اشتراك')&&!v.type.includes('عمالة')&&!v.type.includes('رواتب')).length],
        ].map(([l,v]) => `
          <div class="chart-bar-row">
            <div class="chart-bar-meta"><span>${l}</span><strong>${v}</strong></div>
            <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${Math.round(v/(e.violations.length||1)*100)}%;background:var(--danger)"></div></div>
          </div>`).join('')}
      </div>
    </div>
    <div class="chart-card">
      <div class="chart-head"><h3>مقارنة الامتثال</h3><span>مع متوسط القطاع</span></div>
      <div class="chart-bars">
        ${[
          [e.name.split(' ').slice(0,3).join(' '), e.complianceScore, _compColor(e.complianceScore)],
          ['متوسط القطاع', 72, 'var(--warning)'],
          ['أعلى امتثال في القطاع', 96, 'var(--success)'],
        ].map(([l,v,c]) => `
          <div class="chart-bar-row">
            <div class="chart-bar-meta"><span>${l}</span><strong>${v}%</strong></div>
            <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${v}%;background:${c}"></div></div>
          </div>`).join('')}
      </div>
    </div>
  </div>`;

  return `<div class="pg-head"><div><h1>تحليل بيانات أصحاب العمل</h1><p>ملف شامل للمنشأة مع كامل السجلات والمؤشرات المرتبطة</p></div>
    <div class="pg-acts"><button class="btn btn-secondary btn-sm">${ICONS.download}تصدير</button></div></div>
    ${employerSelector}
    ${kpis}
    ${profileCard}
    ${complianceCard}
    ${empExternalInteg}
    ${empCharts}
    ${workersCard}
    ${violationsCard}
    ${contribCard}
    ${complaintsCard}
    ${visitsCard}
    ${appealsCard}
    ${banCard}`;
}

/* ── إعادة التخصيص (monitoring-head) ── */
function renderReassignment(role) {
  const preId = getParam('complaint');

  /* عبء العمل لكل موظف */
  const staffList = [
    { name: 'سيف خلفان الأمري',  civil: '06456789', dept: 'قسم المتابعة والبلاغات' },
    { name: 'منى راشد البلوشي',   civil: '09123456', dept: 'الصندوق' },
  ].map(s => ({
    ...s,
    active: INSP_DATA.complaints.filter(c => c.assignedTo === s.name && !c.status.includes('إغلاق') && !c.status.includes('قرار') && !c.status.includes('حفظ')).length
  }));

  const _staffOpts = (exclude) => staffList
    .filter(s => s.name !== exclude)
    .map(s => `<option value="${s.name}">${s.name} — عبء العمل الحالي: ${s.active} بلاغ</option>`)
    .join('');

  const searchPanel = `
    <div class="card">
      <div class="ph"><h3><span class="pico bl">${ICONS.switch}</span>البحث عن طلب لإعادة التخصيص</h3></div>
      <div class="pb" style="max-width:520px">
        <div class="fgrp" style="margin-bottom:16px">
          <label class="flbl">رقم البلاغ أو التظلم <span class="req">*</span></label>
          <div style="display:flex;gap:8px">
            <input class="fc" id="ra-id" placeholder="مثال: 2025-01-000001" value="${preId||''}" style="flex:1">
            <button class="btn btn-primary" onclick="_lookupForReassign()">${ICONS.eye}عرض التفاصيل</button>
          </div>
        </div>
        <div id="ra-result"></div>
      </div>
    </div>`;

  /* توزيع عبء العمل الحالي */
  const workloadCard = `
    <div class="card">
      <div class="ph"><h3><span class="pico tl">${ICONS.user}</span>توزيع عبء العمل الحالي</h3></div>
      <div class="pb">
        ${staffList.map(s => `
          <div style="display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--border)">
            <div style="width:38px;height:38px;border-radius:50%;background:var(--primary);color:#fff;font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">${s.name.substring(0,2)}</div>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:700;color:var(--text)">${s.name}</div>
              <div style="font-size:11.5px;color:var(--text3)">${s.dept}</div>
            </div>
            <span class="badge ${s.active>4?'b-returned':s.active>2?'b-session':'b-approved'}" style="font-size:12px">${s.active} بلاغ نشط</span>
          </div>`).join('')}
      </div>
    </div>`;

  const script = `<script>
  function _lookupForReassign() {
    var id = document.getElementById('ra-id') ? document.getElementById('ra-id').value.trim() : '';
    var res = document.getElementById('ra-result');
    if (!res) return;
    if (!id) { showToast('يرجى إدخال رقم الطلب','w'); return; }
    var c = (INSP_DATA.complaints||[]).find(function(x){return x.id===id;})
         || (INSP_DATA.appeals||[]).find(function(x){return x.id===id;});
    if (!c) {
      res.innerHTML = '<div class="alert alert-w" style="margin-top:12px">${ICONS.warn} لم يتم العثور على طلب بهذا الرقم. تحقق من الرقم وأعد المحاولة.</div>';
      return;
    }
    var currentAssignee = c.assignedTo || c.assignedToName || 'غير معين';
    var staffOpts = ${JSON.stringify(staffList)}.filter(function(s){return s.name!==currentAssignee;}).map(function(s){
      return '<option value="'+s.name+'">'+s.name+' — عبء العمل الحالي: '+s.active+' بلاغ</option>';
    }).join('');
    res.innerHTML = '<div style="margin-top:12px">'
      + '<div class="card" style="margin-bottom:12px"><div class="ph"><h3><span class=\"pico bl\">&#x1F4CB;</span>تفاصيل الطلب</h3>'
      + '<span class=\"badge b-session\" style=\"font-size:11px\">'+c.id+'</span></div>'
      + '<div class=\"pb\"><div class=\"fg fg-2\">'
      + '<div class=\"fgrp\"><label class=\"flbl\">النوع</label><div class=\"fro\">'+(c.type||'تظلم')+'</div></div>'
      + '<div class=\"fgrp\"><label class=\"flbl\">الحالة</label><div class=\"fro\">'+statusBadge(c.status)+'</div></div>'
      + '<div class=\"fgrp\"><label class=\"flbl\">المختص الحالي</label><div class=\"fro fw7\">'+currentAssignee+'</div></div>'
      + '<div class=\"fgrp\"><label class=\"flbl\">المنشأة</label><div class=\"fro\">'+(c.employerName||'—')+'</div></div>'
      + '<div class=\"fgrp\"><label class=\"flbl\">الأولوية</label><div class=\"fro\">'+(c.priority||'—')+'</div></div>'
      + '<div class=\"fgrp\"><label class=\"flbl\">الموعد النهائي</label><div class=\"fro\">'+(c.dueDate||'—')+'</div></div>'
      + '</div></div></div>'
      + '<div class=\"card\"><div class=\"ph\"><h3><span class=\"pico tl\">&#x1F501;</span>اختيار الموظف الجديد</h3></div>'
      + '<div class=\"pb\"><div class=\"fgrp\" style=\"margin-bottom:14px\">'
      + '<label class=\"flbl\">الموظف الجديد المكلف <span class=\"req\">*</span></label>'
      + '<select class=\"fc\" id=\"ra-new-staff\"><option value=\"\">— اختر الموظف —</option>'+staffOpts+'</select></div>'
      + '<div class=\"fgrp\" style=\"margin-bottom:14px\">'
      + '<label class=\"flbl\">ملاحظة (اختياري)</label>'
      + '<textarea class=\"fc\" id=\"ra-note\" rows=\"2\" placeholder=\"سبب إعادة التخصيص...\"></textarea></div>'
      + '<button class=\"btn btn-primary\" onclick=\"_confirmReassign(\\'' + id + '\\')\">تأكيد إعادة التخصيص</button>'
      + '</div></div></div>';
  }
  function _confirmReassign(id) {
    var sel = document.getElementById('ra-new-staff');
    if (!sel || !sel.value) { showToast('يرجى اختيار موظف','w'); return; }
    showToast('تمت إعادة تخصيص الطلب ' + id + ' إلى ' + sel.value, 's');
    document.getElementById('ra-result').innerHTML = '<div class=\"alert alert-s\" style=\"margin-top:12px\">تمت إعادة التخصيص بنجاح.</div>';
  }
  ${preId ? 'document.addEventListener("DOMContentLoaded",function(){document.getElementById("ra-id").value="'+preId+'";_lookupForReassign();});' : ''}
  <\/script>`;

  return `<div class="pg-head"><div><h1>إعادة تخصيص الطلبات</h1><p>ابحث عن طلب وحدد الموظف الجديد المكلف به</p></div></div>
  ${searchPanel}
  ${workloadCard}
  ${script}`;
}

/* ── متابعة الأعمال المتأخرة (monitoring-head) ── */
function renderOverdueTracking(role) {
  const overdue = INSP_DATA.complaints.filter(c => c.dueDate < '2025-01-15' && !c.status.includes('إغلاق') && !c.status.includes('قرار'));
  return `<div class="pg-head"><div><h1>متابعة الأعمال المتأخرة</h1><p>${overdue.length} بلاغ تجاوز الموعد النهائي</p></div>
    <div class="pg-acts"><button class="btn btn-warning" onclick="showToast('تم إرسال تنبيه للموظفين','w')">${ICONS.bell}إرسال تنبيه جماعي</button></div></div>
    <div class="alert alert-d">${ICONS.warn} يوجد ${overdue.length} بلاغ تجاوز الموعد النهائي ويستوجب تدخلاً فورياً.</div>
    ${_tblWrap(['رقم البلاغ','النوع','الموعد النهائي','التأخير (أيام)','الموظف المختص','الإجراء'],
      overdue.map(c=>{
        const days = Math.floor((new Date('2025-01-22') - new Date(c.dueDate)) / 86400000);
        return `<tr><td class="fw7 txd">${c.id}</td><td>${c.type}</td>
          <td class="txd">${c.dueDate}</td>
          <td><span class="badge b-high">${days} يوم</span></td>
          <td>${c.assignedTo || 'غير معين'}</td>
          <td><div class="df ac g8">
            <button class="btn btn-warning btn-xs" onclick="showToast('تم إرسال تنبيه','w')">${ICONS.bell}تنبيه</button>
            <button class="btn btn-danger btn-xs" onclick="navigateTo('reassignment','complaint=${c.id}')">إعادة تخصيص</button>
          </div></td></tr>`;}).join(''))}`;
}

/* ── مراقبة عبء العمل (monitoring-head) ── */
function renderWorkloadMonitoring(role) {
  const staff = [
    { name: 'سيف خلفان الأمري', active: 4, pending: 2, closed: 8, capacity: 80 },
    { name: 'موظف آخر', active: 2, pending: 1, closed: 5, capacity: 50 },
  ];
  return `<div class="pg-head"><div><h1>مراقبة عبء العمل</h1><p>توزيع المهام والطاقة الاستيعابية للموظفين</p></div></div>
    <div class="stats-grid">
      <div class="scard p"><div class="sc-lbl">إجمالي البلاغات المفتوحة</div><div class="sc-val">6</div></div>
      <div class="scard w"><div class="sc-lbl">متوسط وقت المعالجة</div><div class="sc-val">5.2 يوم</div></div>
      <div class="scard s"><div class="sc-lbl">نسبة الإنجاز هذا الشهر</div><div class="sc-val">87%</div></div>
      <div class="scard d"><div class="sc-lbl">موظفون فوق الطاقة</div><div class="sc-val">0</div></div>
    </div>
    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.user}</span>توزيع عبء العمل</h3></div>
    <div class="pb">${staff.map(s=>`
      <div style="margin-bottom:20px;border-bottom:1px solid var(--border);padding-bottom:16px">
        <div class="df ac g8 mb0" style="margin-bottom:8px"><span class="fw7">${s.name}</span>
          <span class="badge ${s.capacity>75?'b-high':'b-low'}">${s.capacity}% مكتظ</span></div>
        <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${s.capacity}%;background:${s.capacity>75?'var(--danger)':'var(--primary)'}"></div></div>
        <div class="m-row mt8">
          <span class="m-item">${ICONS.inbox} نشط: <strong>${s.active}</strong></span>
          <span class="m-item">${ICONS.clock} معلق: <strong>${s.pending}</strong></span>
          <span class="m-item">${ICONS.check} مكتمل: <strong>${s.closed}</strong></span>
        </div>
      </div>`).join('')}</div></div>`;
}

/* ── مراجعة المحاضر (field-head) ── */
function renderRecordsReview(role) {
  const pending = [...INSP_DATA.visits.periodic, ...INSP_DATA.visits.surprise, ...INSP_DATA.visits.scheduled]
    .filter(v => v.status === 'بانتظار مراجعة المحضر');
  return `<div class="pg-head"><div><h1>مراجعة المحاضر</h1><p>${pending.length} محضر بانتظار الاعتماد</p></div></div>
    <div class="alert alert-w">${ICONS.warn} يوجد ${pending.length} محاضر تستوجب المراجعة والاعتماد قبل رفعها للمدير.</div>
    ${_tblWrap(['رقم الزيارة','المنشأة','نوع الزيارة','تاريخ الرفع','الإجراء'],
      pending.map(v=>`<tr>
        <td class="fw7 txp">${v.id}</td><td>${v.employerName}</td>
        <td>${v.id.includes('-03-')?'دورية':v.id.includes('-04-')?'مفاجئة':'مجدولة'}</td>
        <td>${v.actualDate || v.scheduledDate}</td>
        <td><div class="df ac g8">
          <button class="btn btn-primary btn-xs" onclick="navigateTo('${v.id.includes('-04-')?'visit-surprise-details':v.id.includes('-05-')?'visit-scheduled-details':'visit-periodic-details'}','id=${v.id}')">${ICONS.eye}مراجعة</button>
          <button class="btn btn-accent btn-xs" onclick="showToast('تم اعتماد المحضر','s')">اعتماد</button>
          <button class="btn btn-warning btn-xs" onclick="showToast('تم إعادة للمفتش','w')">إعادة</button>
        </div></td></tr>`).join(''))}`;
}

/* ── الإجراءات التصحيحية (field-head) ── */
function renderCorrectiveActions(role) {
  const actions = [
    { visit: '2025-03-000002', employer: 'مصنع الإنتاج الغذائي', action: 'توفير معدات الحماية', deadline: '2025-01-19', status: 'معلق' },
    { visit: '2025-03-000002', employer: 'مصنع الإنتاج الغذائي', action: 'تسجيل العمال غير المسجلين', deadline: '2025-01-13', status: 'منجز' },
    { visit: '2025-04-000001', employer: 'مصنع الإنتاج الغذائي', action: 'سداد الاشتراكات المتأخرة', deadline: '2025-01-26', status: 'جارٍ' },
    { visit: '2024-03-000095', employer: 'مؤسسة البناء والتشييد', action: 'صرف الرواتب المتأخرة', deadline: '2024-12-15', status: 'منجز' },
  ];
  return `<div class="pg-head"><div><h1>متابعة الإجراءات التصحيحية</h1><p>رصد تنفيذ الإجراءات التصحيحية من قبل المنشآت</p></div>
    <div class="pg-acts"><button class="btn btn-secondary btn-sm">${ICONS.download}تصدير</button></div></div>
    ${_tblWrap(['رقم الزيارة','المنشأة','الإجراء التصحيحي المطلوب','الموعد النهائي','الحالة','إجراء'],
      actions.map(a=>`<tr>
        <td class="txp fw7">${a.visit}</td><td>${a.employer}</td><td>${a.action}</td>
        <td>${a.deadline}</td>
        <td>${statusBadge(a.status==='منجز'?'تم اعتماد المحضر':a.status==='جارٍ'?'جارية':'بانتظار إجراء تصحيحي')}</td>
        <td><div class="df ac g8">
          ${a.status !== 'منجز' ? `<button class="btn btn-accent btn-xs" onclick="showToast('تم تسجيل الإنجاز','s')">تسجيل إنجاز</button>` : '<span class="badge b-approved">مكتمل</span>'}
        </div></td></tr>`).join(''))}`;
}

/* ── إعادة توزيع المفتشين (field-head) ── */
function renderInspectorRedistribution(role) {
  const preId = getParam('visit');

  const allVisits = [
    ...INSP_DATA.visits.periodic,
    ...INSP_DATA.visits.surprise,
    ...INSP_DATA.visits.scheduled
  ];
  const activeStatuses = ['مجدولة', 'قيد التنفيذ', 'بانتظار اجراء الزيارة التفتيشية'];

  /* عبء العمل لكل مفتش */
  const inspectors = [
    { name: 'حاتم سالم الزدجالي', civil: '04678901', dept: 'قسم التفتيش الميداني' },
  ].map(ins => ({
    ...ins,
    active: allVisits.filter(v => v.inspectorName === ins.name && activeStatuses.some(s => v.status && v.status.includes(s.split(' ')[0]))).length,
    total:  allVisits.filter(v => v.inspectorName === ins.name).length
  }));

  const workloadCard = `
    <div class="card">
      <div class="ph"><h3><span class="pico bl">${ICONS.user}</span>أعباء العمل الحالية للمفتشين</h3></div>
      <div class="pb">
        ${inspectors.map(ins => {
          const pct = ins.total ? Math.round(ins.active / Math.max(ins.total, 1) * 100) : 0;
          return `<div style="display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--border)">
            <div style="width:40px;height:40px;border-radius:50%;background:var(--primary);color:#fff;font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">${ins.name.substring(0,2)}</div>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:700;color:var(--text)">${ins.name}</div>
              <div style="font-size:11.5px;color:var(--text3)">${ins.dept}</div>
              <div class="progress-bar-wrap" style="margin-top:6px;height:6px"><div class="progress-bar-fill" style="width:${pct}%;background:${pct>75?'var(--danger)':pct>50?'var(--warning)':'var(--success)'}"></div></div>
            </div>
            <div style="text-align:center;min-width:80px">
              <div style="font-size:18px;font-weight:800;color:var(--primary)">${ins.active}</div>
              <div style="font-size:10.5px;color:var(--text3)">زيارة نشطة</div>
            </div>
            <span class="badge ${ins.active>4?'b-returned':ins.active>2?'b-session':'b-approved'}" style="font-size:11px">${ins.total} إجمالاً</span>
          </div>`;
        }).join('')}
      </div>
    </div>`;

  const searchPanel = `
    <div class="card">
      <div class="ph"><h3><span class="pico tl">${ICONS.switch}</span>البحث عن زيارة لإعادة التوزيع</h3></div>
      <div class="pb" style="max-width:520px">
        <div class="fgrp" style="margin-bottom:16px">
          <label class="flbl">رقم الزيارة <span class="req">*</span></label>
          <div style="display:flex;gap:8px">
            <input class="fc" id="ir-id" placeholder="مثال: 2025-03-000001" value="${preId||''}" style="flex:1">
            <button class="btn btn-primary" onclick="_lookupVisitForRedist()">${ICONS.eye}عرض التفاصيل</button>
          </div>
        </div>
        <div id="ir-result"></div>
      </div>
    </div>`;

  const inspJson = JSON.stringify(inspectors);
  const script = `<script>
  function _lookupVisitForRedist() {
    var id = document.getElementById('ir-id') ? document.getElementById('ir-id').value.trim() : '';
    var res = document.getElementById('ir-result');
    if (!res) return;
    if (!id) { showToast('يرجى إدخال رقم الزيارة','w'); return; }
    var allV = [].concat(INSP_DATA.visits.periodic||[], INSP_DATA.visits.surprise||[], INSP_DATA.visits.scheduled||[]);
    var v = allV.find(function(x){return x.id===id;});
    if (!v) {
      res.innerHTML = '<div class="alert alert-w" style="margin-top:12px">${ICONS.warn} لم يتم العثور على زيارة بهذا الرقم.</div>';
      return;
    }
    var typeLabel = v.id.includes('-03-')?'دورية':v.id.includes('-04-')?'مفاجئة':'مجدولة';
    var insList = ${inspJson};
    var insOpts = insList.filter(function(i){return i.name!==v.inspectorName;}).map(function(i){
      return '<option value="'+i.name+'">'+i.name+' — نشط: '+i.active+' زيارة</option>';
    }).join('');
    if(!insOpts) insOpts='<option value="حاتم سالم الزدجالي (مفتش آخر)">حاتم سالم الزدجالي (إعادة تعيين) — نشط: '+insList[0].active+' زيارة</option>';
    res.innerHTML = '<div style="margin-top:12px">'
      + '<div class="card" style="margin-bottom:12px"><div class="ph"><h3><span class=\"pico bl\">&#x1F4CB;</span>تفاصيل الزيارة</h3>'
      + '<span class=\"badge b-session\" style=\"font-size:11px\">'+v.id+'</span></div>'
      + '<div class=\"pb\"><div class=\"fg fg-2\">'
      + '<div class=\"fgrp\"><label class=\"flbl\">نوع الزيارة</label><div class=\"fro fw7\">'+typeLabel+'</div></div>'
      + '<div class=\"fgrp\"><label class=\"flbl\">الحالة</label><div class=\"fro\">'+statusBadge(v.status)+'</div></div>'
      + '<div class=\"fgrp\"><label class=\"flbl\">المنشأة</label><div class=\"fro fw7\">'+(v.employerName||'—')+'</div></div>'
      + '<div class=\"fgrp\"><label class=\"flbl\">تاريخ الجدولة</label><div class=\"fro\">'+(v.scheduledDate||'—')+'</div></div>'
      + '<div class=\"fgrp\"><label class=\"flbl\">المفتش الحالي</label><div class=\"fro fw7 txp\">'+(v.inspectorName||'غير معين')+'</div></div>'
      + '</div></div></div>'
      + '<div class=\"card\"><div class=\"ph\"><h3><span class=\"pico tl\">&#x1F501;</span>اختيار المفتش الجديد</h3></div>'
      + '<div class=\"pb\">'
      + '<div class=\"fgrp\" style=\"margin-bottom:14px\"><label class=\"flbl\">المفتش الجديد <span class=\"req\">*</span></label>'
      + '<select class=\"fc\" id=\"ir-new-insp\"><option value=\"\">— اختر المفتش —</option>'+insOpts+'</select></div>'
      + '<div class=\"fgrp\" style=\"margin-bottom:14px\"><label class=\"flbl\">سبب إعادة التوزيع (اختياري)</label>'
      + '<textarea class=\"fc\" id=\"ir-note\" rows=\"2\" placeholder=\"مثل: تعارض مواعيد، مرض، تحميل متوازن...\"></textarea></div>'
      + '<button class=\"btn btn-primary\" onclick=\"_confirmRedist(\\'' + id + '\\')\">تأكيد إعادة التوزيع</button>'
      + '</div></div></div>';
  }
  function _confirmRedist(id) {
    var sel = document.getElementById('ir-new-insp');
    if (!sel || !sel.value) { showToast('يرجى اختيار مفتش','w'); return; }
    showToast('تمت إعادة توزيع الزيارة ' + id + ' إلى ' + sel.value, 's');
    document.getElementById('ir-result').innerHTML = '<div class=\"alert alert-s\" style=\"margin-top:12px\">تمت إعادة التوزيع بنجاح.</div>';
  }
  ${preId ? 'document.addEventListener("DOMContentLoaded",function(){_lookupVisitForRedist();});' : ''}
  <\/script>`;

  return `<div class="pg-head"><div><h1>إعادة توزيع المفتشين</h1><p>ابحث عن زيارة وحدد المفتش الجديد المكلف بها</p></div></div>
  ${searchPanel}
  ${workloadCard}
  ${script}`;
}

/* ── خطط التفتيش (inspection-director) ── */
function renderInspectionPlansList(role) {
  const rows = INSP_DATA.inspectionPlans.map(p => {
    const pct = p.targetCount ? Math.round(p.completedCount / p.targetCount * 100) : 0;
    return `<tr>
      <td><a href="#" onclick="navigateTo('inspection-plan-details','id=${p.id}')" class="txp fw7">${p.id}</a></td>
      <td>${p.title}</td><td>${p.period}</td>
      <td>${statusBadge(p.status)}</td>
      <td>${p.targetCount}</td>
      <td><div style="display:flex;align-items:center;gap:8px"><div class="progress-bar-wrap" style="flex:1;margin:0"><div class="progress-bar-fill" style="width:${pct}%;background:${_compColor(pct)}"></div></div><span class="fs11">${pct}%</span></div></td>
      <td><button class="btn btn-primary btn-xs" onclick="navigateTo('inspection-plan-details','id=${p.id}')">${ICONS.eye}عرض</button></td>
    </tr>`;}).join('');

  return `<div class="pg-head"><div><h1>خطط التفتيش الدورية</h1><p>إدارة واعتماد خطط التفتيش الربعية والسنوية</p></div>
    <div class="pg-acts"><button class="btn btn-accent" onclick="showToast('فتح نموذج الاعتماد','i')">${ICONS.check}اعتماد خطة</button></div></div>
    ${_tblWrap(['رقم الخطة','اسم الخطة','الفترة','الحالة','المنشآت','نسبة الإنجاز','إجراء'], rows)}`;
}

/* ── تفاصيل خطة التفتيش (inspection-director) ── */
function renderInspectionPlanDetails(role) {
  const id = getParam('id') || '2025-07-000001';
  const p = INSP_DATA.inspectionPlans.find(x => x.id === id) || INSP_DATA.inspectionPlans[0];

  const pct = p.targetCount ? Math.round(p.completedCount / p.targetCount * 100) : 0;
  return `<div class="pg-head"><div><h1>${p.id}</h1><p>${p.title}</p></div>
    <div class="pg-acts">${statusBadge(p.status)}<button class="btn btn-secondary btn-sm" onclick="navigateTo('inspection-plans-list')">${ICONS.arrow_right}رجوع</button>
      ${p.status !== 'مكتملة' ? `<button class="btn btn-accent" onclick="showToast('تم اعتماد الخطة','s')">${ICONS.check}اعتماد</button>` : ''}</div></div>
  <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.file}</span>تفاصيل الخطة</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">رقم الخطة</label><div class="fro fw7">${p.id}</div></div>
      <div class="fgrp"><label class="flbl">اسم الخطة</label><div class="fro">${p.title}</div></div>
      <div class="fgrp"><label class="flbl">الفترة</label><div class="fro">${p.period}</div></div>
      <div class="fgrp"><label class="flbl">إجمالي المنشآت المستهدفة</label><div class="fro">${p.targetCount}</div></div>
      <div class="fgrp"><label class="flbl">الزيارات المنجزة</label><div class="fro txp fw7">${p.completedCount}</div></div>
      <div class="fgrp"><label class="flbl">المعتمد بواسطة</label><div class="fro">${p.approvedBy || 'بانتظار الاعتماد'}</div></div>
      <div class="fgrp"><label class="flbl">تاريخ الاعتماد</label><div class="fro">${p.approvalDate || '—'}</div></div>
    </div></div></div>
  <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.chart}</span>التقدم</h3></div>
    <div class="pb">
      <div class="progress-bar-wrap" style="height:14px;margin-bottom:8px"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
      <p class="fs11 tx3 mt8">${pct}% من الزيارات مكتملة</p>
    </div></div>`;
}

/* ── حالات الحظر (inspection-director) ── */
function renderBanCasesList(role) {
  const rows = INSP_DATA.banCases.map(b =>
    `<tr>
      <td><a href="#" onclick="navigateTo('ban-case-details','id=${b.id}')" class="txp fw7">${b.id}</a></td>
      <td class="fw7">${b.employerName}</td>
      <td>${b.reason}</td>
      <td>${statusBadge(b.status)}</td>
      <td>${b.issuedDate}</td>
      <td>${b.liftedDate || '—'}</td>
      <td><button class="btn btn-primary btn-xs" onclick="navigateTo('ban-case-details','id=${b.id}')">${ICONS.eye}عرض</button></td>
    </tr>`).join('');

  return `<div class="pg-head"><div><h1>قائمة حالات الحظر</h1><p>إدارة أوامر الحظر عن التعامل مع المنشآت المخالفة</p></div>
    <div class="pg-acts"><button class="btn btn-danger" onclick="showToast('فتح نموذج إصدار الحظر','i')">${ICONS.lock}إصدار أمر حظر</button></div></div>
    ${_tblWrap(['رقم الحظر','المنشأة','سبب الحظر','الحالة','تاريخ الإصدار','تاريخ الرفع','إجراء'], rows)}`;
}

/* ── تفاصيل حالة الحظر (inspection-director) ── */
function renderBanCaseDetails(role) {
  const id = getParam('id') || '2025-06-000001';
  const b = INSP_DATA.banCases.find(x => x.id === id) || INSP_DATA.banCases[0];

  return `<div class="pg-head"><div><h1>${b.id}</h1><p>حالة حظر — ${b.employerName}</p></div>
    <div class="pg-acts">${statusBadge(b.status)}<button class="btn btn-secondary btn-sm" onclick="navigateTo('ban-cases-list')">${ICONS.arrow_right}رجوع</button>
      ${b.status.includes('سارٍ') ? `<button class="btn btn-accent btn-sm" onclick="showToast('تم رفع الحظر','s')">${ICONS.unlock}رفع الحظر</button>` : ''}
    </div></div>
  <div class="card"><div class="ph"><h3><span class="pico rd">${ICONS.lock}</span>تفاصيل الحظر</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">رقم الحظر</label><div class="fro fw7">${b.id}</div></div>
      <div class="fgrp"><label class="flbl">المنشأة</label><div class="fro txp fw7">${b.employerName}</div></div>
      <div class="fgrp"><label class="flbl">تاريخ الإصدار</label><div class="fro">${b.issuedDate}</div></div>
      <div class="fgrp"><label class="flbl">أصدره</label><div class="fro">${b.issuedBy}</div></div>
      <div class="fgrp span-full"><label class="flbl">سبب الحظر</label><div class="fro" style="min-height:50px">${b.reason}</div></div>
      ${b.liftedDate ? `<div class="fgrp"><label class="flbl">تاريخ رفع الحظر</label><div class="fro txp">${b.liftedDate}</div></div>` : ''}
      ${b.liftedBy ? `<div class="fgrp"><label class="flbl">رُفع بواسطة</label><div class="fro">${b.liftedBy}</div></div>` : ''}
    </div></div></div>
  ${b.status.includes('سارٍ') ? _dpanel('رفع الحظر أو تعديله', ['رفع الحظر','تعديل شروط الحظر'],
    `<div class="fgrp"><label class="flbl">سبب رفع الحظر أو تعديله</label><textarea class="fc" rows="3" placeholder="اكتب المبرر..."></textarea></div>`) : ''}
  <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.clock}</span>سجل الأحداث</h3></div>
    <div class="pb">${renderTimeline(b.timeline || [])}</div></div>`;
}

/* ── تحليل المخاطر (ops-analyst) ── */
function renderRiskAnalysis(role) {
  const _score = e => {
    let s = 0;
    const c = INSP_DATA.complaints.filter(x=>x.employerId===e.id&&!x.status.includes('إغلاق')&&!x.status.includes('قرار')).length;
    const v = e.violations ? e.violations.length : 0;
    const b = INSP_DATA.banCases.filter(x=>x.employerId===e.id&&x.status.includes('سارٍ')).length;
    s += c * 10 + v * 8 + (100 - e.complianceScore) * 0.8;
    if (e.contributions.arrears > 5000) s += 20;
    else if (e.contributions.arrears > 0) s += 10;
    if (b > 0) s += 25;
    return Math.min(100, Math.round(s));
  };
  const scored = INSP_DATA.employers.map(e=>({...e, riskScore:_score(e)})).sort((a,b)=>b.riskScore-a.riskScore);
  const allViolations = INSP_DATA.employers.flatMap(e=>e.violations||[]);
  const allComplaints = INSP_DATA.complaints;
  const _vBadge = s => s==='مرتفع'?'b-rejected':s==='متوسط'?'b-returned':'b-approved';

  const summaryKpis = `<div class="stats-grid">
    <div class="scard d"><div class="sc-lbl">منشآت عالية الخطر</div><div class="sc-val">${scored.filter(e=>e.riskLevel==='مرتفع').length}</div><div class="sc-sub">تستوجب أولوية</div></div>
    <div class="scard w"><div class="sc-lbl">إجمالي المخالفات المرصودة</div><div class="sc-val">${allViolations.length}</div><div class="sc-sub">${allViolations.filter(v=>v.status==='معلق').length} معلق</div></div>
    <div class="scard p"><div class="sc-lbl">بلاغات مفتوحة</div><div class="sc-val">${allComplaints.filter(c=>!c.status.includes('إغلاق')&&!c.status.includes('قرار')).length}</div><div class="sc-sub">من ${allComplaints.length} إجمالاً</div></div>
    <div class="scard i"><div class="sc-lbl">عمال في بيئة خطرة</div><div class="sc-val">${INSP_DATA.workers.filter(w=>w.riskLevel==='مرتفع').length}</div><div class="sc-sub">من ${INSP_DATA.workers.length} عامل</div></div>
  </div>`;

  const charts = `<div class="dashboard-insights">
    <div class="chart-card">
      <div class="chart-head"><h3>درجة المخاطر المحسوبة</h3><span>100 = أعلى خطر</span></div>
      <div class="chart-bars">
        ${scored.map(e=>`<div class="chart-bar-row">
          <div class="chart-bar-meta"><span>${e.name.split(' ').slice(0,3).join(' ')}</span><strong>${e.riskScore}</strong></div>
          <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${e.riskScore}%;background:${_compColor(100-e.riskScore)}"></div></div>
        </div>`).join('')}
      </div>
    </div>
    <div class="chart-card">
      <div class="chart-head"><h3>توزيع أنواع المخالفات</h3><span>جميع المنشآت</span></div>
      <div class="chart-bars">
        ${[
          ['مخالفات السلامة المهنية', allViolations.filter(v=>v.type.includes('سلامة')).length],
          ['تأخر الاشتراكات',         allViolations.filter(v=>v.type.includes('اشتراك')).length],
          ['عمالة غير نظامية',        allViolations.filter(v=>v.type.includes('عمالة')).length],
          ['مخالفات الرواتب',         allViolations.filter(v=>v.type.includes('رواتب')||v.type.includes('رواتب')).length],
          ['مخالفات عقود/ساعات عمل', allViolations.filter(v=>v.type.includes('ساعات')||v.type.includes('تسجيل')).length],
        ].map(([l,v])=>{const mx=allViolations.length||1;return`<div class="chart-bar-row">
          <div class="chart-bar-meta"><span>${l}</span><strong>${v}</strong></div>
          <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${Math.round(v/mx*100)}%;background:var(--danger)"></div></div>
        </div>`}).join('')}
      </div>
    </div>
    <div class="chart-card">
      <div class="chart-head"><h3>درجات الامتثال</h3><span>المنشآت المسجلة</span></div>
      <div class="chart-bars">
        ${INSP_DATA.employers.map(e=>`<div class="chart-bar-row">
          <div class="chart-bar-meta"><span>${e.name.split(' ').slice(0,3).join(' ')}</span><strong>${e.complianceScore}%</strong></div>
          <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${e.complianceScore}%;background:${_compColor(e.complianceScore)}"></div></div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;

  const detailTable = `<div class="card"><div class="ph"><h3><span class="pico rd">${ICONS.shield}</span>مصفوفة المخاطر التفصيلية</h3>
    <button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ تصدير مصفوفة المخاطر...','i')">${ICONS.download}تصدير</button></div>
  <div class="tbl-wrap"><table class="dtbl">
    <thead><tr>
      <th>المنشأة</th><th>درجة الخطر</th><th>الامتثال</th><th>بلاغات مفتوحة</th><th>مخالفات معلقة</th><th>متأخرات (ر.ع)</th><th>حظر نشط</th><th>عمال في خطر</th><th>التوصية الأولوية</th><th>إجراء</th>
    </tr></thead>
    <tbody>${scored.map(e=>{
      const openC = INSP_DATA.complaints.filter(c=>c.employerId===e.id&&!c.status.includes('إغلاق')&&!c.status.includes('قرار')).length;
      const pendV = (e.violations||[]).filter(v=>v.status==='معلق').length;
      const activeBan = INSP_DATA.banCases.filter(b=>b.employerId===e.id&&b.status.includes('سارٍ')).length;
      const atRiskW = INSP_DATA.workers.filter(w=>w.employerId===e.id&&w.riskLevel==='مرتفع').length;
      const rec = e.riskScore>=70?'زيارة مفاجئة عاجلة':e.riskScore>=40?'جدولة زيارة دورية':'متابعة دورية منتظمة';
      const recCls = e.riskScore>=70?'b-rejected':e.riskScore>=40?'b-returned':'b-approved';
      return `<tr>
        <td><a href="#" onclick="navigateTo('employer-analysis','employer=${e.id}')" class="txp fw7">${e.name.split(' ').slice(0,3).join(' ')}</a></td>
        <td><div style="display:flex;align-items:center;gap:6px">
          <div style="height:8px;width:${e.riskScore}px;max-width:60px;background:${_compColor(100-e.riskScore)};border-radius:999px"></div>
          <strong style="color:${_compColor(100-e.riskScore)}">${e.riskScore}</strong></div></td>
        <td><span style="font-weight:700;color:${_compColor(e.complianceScore)}">${e.complianceScore}%</span></td>
        <td><span class="badge ${openC>0?'b-returned':'b-approved'}">${openC}</span></td>
        <td><span class="badge ${pendV>0?'b-rejected':'b-approved'}">${pendV}</span></td>
        <td><span class="badge ${e.contributions.arrears>0?'b-rejected':'b-approved'}">${e.contributions.arrears>0?e.contributions.arrears.toLocaleString():'0'}</span></td>
        <td><span class="badge ${activeBan?'b-rejected':'b-approved'}">${activeBan?'نعم':'لا'}</span></td>
        <td><span class="badge ${atRiskW>0?'b-returned':'b-approved'}">${atRiskW}</span></td>
        <td><span class="badge ${recCls}">${rec}</span></td>
        <td><button class="btn btn-primary btn-xs" onclick="navigateTo('employer-analysis','employer=${e.id}')">${ICONS.eye}الملف</button></td>
      </tr>`;}).join('')}
    </tbody></table></div></div>`;

  const workersRiskTable = `<div class="card"><div class="ph"><h3><span class="pico or">${ICONS.user}</span>العمال عالو المخاطر</h3></div>
  <div class="tbl-wrap"><table class="dtbl">
    <thead><tr><th>العامل</th><th>رقم الهوية</th><th>جهة العمل</th><th>حماية الأجور</th><th>التأمين الصحي</th><th>مؤشرات الخطر</th><th>إجراء</th></tr></thead>
    <tbody>${INSP_DATA.workers.filter(w=>w.riskLevel!=='منخفض').map(wk=>`
      <tr>
        <td class="fw7">${wk.name}</td><td>${wk.civil}</td>
        <td><a href="#" onclick="navigateTo('employer-analysis','employer=${wk.employerId}')" class="txp">${wk.employer.split(' ').slice(0,3).join(' ')}</a></td>
        <td><span class="badge ${wk.wageProtection==='منتظم'?'b-approved':'b-returned'}">${wk.wageProtection}</span></td>
        <td style="font-size:11px">${wk.healthInsurance.split('—')[0].trim()}</td>
        <td>${wk.riskIndicators.map(r=>`<div style="font-size:11px;color:var(--text2)">• ${r.text.substring(0,60)}${r.text.length>60?'…':''}</div>`).join('')}</td>
        <td><button class="btn btn-primary btn-xs" onclick="navigateTo('worker-analysis','worker=${wk.id}')">${ICONS.eye}الملف</button></td>
      </tr>`).join('')}
    </tbody></table></div></div>`;

  return `<div class="pg-head"><div><h1>تحليل المخاطر</h1><p>تقييم متكامل لمستويات مخاطر المنشآت والعمال مع التوصيات الاستباقية</p></div>
    <div class="pg-acts"><button class="btn btn-primary btn-sm" onclick="showToast('جارٍ تصدير تقرير المخاطر...','i')">${ICONS.download}تصدير تقرير المخاطر</button></div></div>
    ${summaryKpis}
    ${charts}
    ${detailTable}
    ${workersRiskTable}`;
}

/* ── كشف الأنماط (ops-analyst) ── */
function renderPatternDetection(role) {
  const allV = INSP_DATA.employers.flatMap(e=>(e.violations||[]).map(v=>({...v, employer: e.name, employerId: e.id})));
  const allC = INSP_DATA.complaints;
  const allVisits = [...INSP_DATA.visits.periodic, ...INSP_DATA.visits.surprise, ...INSP_DATA.visits.scheduled];
  const _vpg = id => id.includes('-04-') ? 'visit-surprise-details' : id.includes('-05-') ? 'visit-scheduled-details' : 'visit-periodic-details';
  const _rb = r => r==='مرتفع'?'b-rejected':r==='متوسط'?'b-returned':'b-approved';

  /* ── Pattern 1: متكرر — تأخر الاشتراكات ── */
  const contribDelayEmps = INSP_DATA.employers.filter(e=>e.contributions.arrears>0);
  const contribPattern = {
    id: 'PT-001', risk:'مرتفع',
    title: 'تأخر متكرر في سداد اشتراكات التأمين الاجتماعي',
    desc: 'رُصد نمط ممنهج لتأخر سداد الاشتراكات في أكثر من منشأة. يرتبط هذا النمط بتدهور الالتزام التأميني للعمال وانقطاع التغطية.',
    frequency: `${contribDelayEmps.length} منشآت من ${INSP_DATA.employers.length}`,
    timespan: 'سبتمبر 2024 — ديسمبر 2024',
    recommendation: 'إحالة فورية لوحدة التحصيل — تفعيل آلية الجزاءات التلقائية — جدولة زيارة متابعة.',
    entities: contribDelayEmps.map(e=>({
      type: 'employer', id: e.id, label: e.name,
      detail: `متأخرات: ${e.contributions.arrears.toLocaleString()} ر.ع — آخر سداد: ${e.contributions.lastPaid}`,
      badge: 'b-rejected'
    })),
    relatedComplaints: allC.filter(c=>(c.type||'').includes('اشتراك')).map(c=>c.id),
    relatedVisits: allVisits.filter(v=>v.findings&&v.findings.violations.some(x=>x.includes('اشتراك'))).map(v=>v.id)
  };

  /* ── Pattern 2: متكرر — مخالفات السلامة ── */
  const safetyViolEmps = INSP_DATA.employers.filter(e=>(e.violations||[]).some(v=>v.type.includes('سلامة')));
  const safetyPattern = {
    id: 'PT-002', risk:'مرتفع',
    title: 'مخالفات متكررة في السلامة المهنية وبيئة العمل',
    desc: 'رُصدت مخالفات سلامة جوهرية في أكثر من زيارة للمنشآت ذاتها، مما يدل على قصور هيكلي في منظومة السلامة وليس عارضاً طارئاً.',
    frequency: `${safetyViolEmps.length} منشآت — ${allV.filter(v=>v.type.includes('سلامة')).length} حوادث`,
    timespan: 'نوفمبر 2024 — يناير 2025',
    recommendation: 'إصدار أمر تصحيحي ملزم بموعد نهائي — زيارة مفاجئة للتحقق — دراسة تصعيد لحظر التشغيل.',
    entities: safetyViolEmps.map(e=>({
      type: 'employer', id: e.id, label: e.name,
      detail: `${(e.violations||[]).filter(v=>v.type.includes('سلامة')).length} مخالفة سلامة`,
      badge: 'b-rejected'
    })),
    relatedComplaints: allC.filter(c=>c.type.includes('آمنة')||c.type.includes('سلامة')).map(c=>c.id),
    relatedVisits: allVisits.filter(v=>v.findings&&v.findings.violations.some(x=>x.includes('سلامة')||x.includes('حماية'))).map(v=>v.id)
  };

  /* ── Pattern 3: قطاع البناء — تركّز المخالفات ── */
  const buildingEmps = INSP_DATA.employers.filter(e=>e.sector.includes('بناء'));
  const buildingComplaints = allC.filter(c=>buildingEmps.some(e=>e.id===c.employerId));
  const buildingPattern = {
    id: 'PT-003', risk:'مرتفع',
    title: 'تركّز المخالفات في قطاع البناء والإنشاء',
    desc: 'يستأثر قطاع البناء بنسبة غير متناسبة من البلاغات والمخالفات مقارنة بحجمه. ويرتبط ذلك بطبيعة عقود العمل الموسمية والاعتماد المفرط على العمالة الأجنبية.',
    frequency: `${buildingComplaints.length} بلاغات — ${buildingEmps.flatMap(e=>e.violations||[]).length} مخالفة`,
    timespan: 'يناير 2024 — يناير 2025',
    recommendation: 'تكثيف الزيارات الدورية للقطاع — تعميم إرشادي لجميع منشآت البناء — تطوير قائمة تحقق مخصصة للقطاع.',
    entities: buildingEmps.map(e=>({
      type: 'employer', id: e.id, label: e.name,
      detail: `${buildingComplaints.filter(c=>c.employerId===e.id).length} بلاغ — امتثال ${e.complianceScore}%`,
      badge: e.riskLevel==='مرتفع'?'b-rejected':'b-returned'
    })),
    relatedComplaints: buildingComplaints.map(c=>c.id),
    relatedVisits: allVisits.filter(v=>buildingEmps.some(e=>e.id===v.employerId)).map(v=>v.id)
  };

  /* ── Pattern 4: عمالة غير نظامية ── */
  const illegalLaborViol = allV.filter(v=>v.type.includes('أجنبية')||v.type.includes('غير مسجل'));
  const illegalPattern = {
    id: 'PT-004', risk:'متوسط',
    title: 'وجود عمالة غير مسجلة أو غير نظامية',
    desc: 'كُشف عن حالات عمالة غير مسجلة في التأمين الاجتماعي أو غير نظامية في عدة مواقع. هذا النمط يحرم العمال من الحماية الاجتماعية ويُعرّض المنشأة لغرامات.',
    frequency: `${illegalLaborViol.length} حوادث في ${new Set(illegalLaborViol.map(v=>v.employer)).size} منشآت`,
    timespan: 'ديسمبر 2024 — يناير 2025',
    recommendation: 'إشعار المنشآت بضرورة تسجيل جميع العمال فوراً — مشاركة البيانات مع وزارة القوى العاملة — تعزيز تغطية التفتيش.',
    entities: [...new Set(illegalLaborViol.map(v=>v.employerId))].map(eid=>{
      const emp = INSP_DATA.employers.find(e=>e.id===eid)||{};
      return {type:'employer',id:eid,label:emp.name||eid,detail:`${illegalLaborViol.filter(v=>v.employerId===eid).length} حادثة`,badge:'b-returned'};
    }),
    relatedComplaints: [],
    relatedVisits: illegalLaborViol.map(v=>v.visit).filter(Boolean)
  };

  /* ── Pattern 5: عمال بتغييرات متكررة لصاحب العمل ── */
  const mobilWorkers = INSP_DATA.workers.filter(w=>w.employmentHistory&&w.employmentHistory.length>2);
  const mobilityPattern = {
    id: 'PT-005', risk:'متوسط',
    title: 'تغيير متكرر لصاحب العمل — مؤشر ضعف الاستقرار الوظيفي',
    desc: 'عمال سجّلوا أكثر من صاحب عمل خلال فترة قصيرة، وهو مؤشر على قصور في عقود العمل أو تعرضهم لظروف تدفعهم للتنقل.',
    frequency: `${mobilWorkers.length} عمال من ${INSP_DATA.workers.length}`,
    timespan: '2013 — 2025',
    recommendation: 'مراجعة سجلات التأمين لهذه الفئة — تقييم وضع الاشتراكات — توعية بحقوق الثبات الوظيفي.',
    entities: mobilWorkers.map(wk=>({
      type:'worker',id:wk.id,label:wk.name,
      detail:`${wk.employmentHistory.length} جهات عمل — آخرها ${wk.employer}`,badge:'b-returned'
    })),
    relatedComplaints: mobilWorkers.flatMap(wk=>allC.filter(c=>c.workerId===wk.id).map(c=>c.id)),
    relatedVisits: []
  };

  const patterns = [contribPattern, safetyPattern, buildingPattern, illegalPattern, mobilityPattern];
  const highCount = patterns.filter(p=>p.risk==='مرتفع').length;

  const _patternCard = p => `
    <div class="card" style="border-right:4px solid ${p.risk==='مرتفع'?'var(--danger)':p.risk==='متوسط'?'var(--warning)':'var(--success)'}">
      <div class="ph">
        <div style="display:flex;align-items:center;gap:10px;flex:1;min-width:0">
          <span style="font-size:10px;font-weight:700;color:var(--text3);white-space:nowrap">${p.id}</span>
          <h3 style="margin:0;flex:1">${p.title}</h3>
        </div>
        <span class="badge ${_rb(p.risk)}">${p.risk}</span>
      </div>
      <div class="pb">
        <p style="font-size:13px;color:var(--text2);line-height:1.75;margin-bottom:14px">${p.desc}</p>
        <div class="fg fg-2" style="margin-bottom:14px">
          <div class="fgrp"><label class="flbl">التكرار</label><div class="fro fw7">${p.frequency}</div></div>
          <div class="fgrp"><label class="flbl">الفترة الزمنية</label><div class="fro">${p.timespan}</div></div>
          <div class="fgrp span-full"><label class="flbl">التوصية</label><div class="fro" style="color:var(--primary)">${p.recommendation}</div></div>
        </div>
        <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:14px">
          <div>
            <div style="font-size:11px;font-weight:700;color:var(--text3);margin-bottom:6px">المنشآت/العمال المعنيون</div>
            <div style="display:flex;flex-wrap:wrap;gap:6px">
              ${p.entities.map(en=>`
                <div style="display:flex;align-items:center;gap:6px;padding:5px 10px;background:var(--g50);border:1px solid var(--border);border-radius:var(--rsm);cursor:pointer"
                  onclick="navigateTo('${en.type==='worker'?'worker-analysis':'employer-analysis'}','${en.type==='worker'?'worker':'employer'}=${en.id}')">
                  <span style="font-size:12px;font-weight:700;color:var(--primary)">${en.label.split(' ').slice(0,3).join(' ')}</span>
                  <span style="font-size:11px;color:var(--text3)">${en.detail}</span>
                </div>`).join('')}
            </div>
          </div>
        </div>
        ${p.relatedComplaints.length || p.relatedVisits.length ? `
        <div style="display:flex;gap:12px;flex-wrap:wrap;border-top:1px solid var(--border);padding-top:12px">
          ${p.relatedComplaints.length ? `<div>
            <span style="font-size:11px;font-weight:700;color:var(--text3)">البلاغات المرتبطة: </span>
            ${p.relatedComplaints.map(id=>`<a href="#" onclick="navigateTo('complaint-details','id=${id}')" class="txp fw7" style="font-size:11px;margin-left:6px">${id}</a>`).join('')}
          </div>` : ''}
          ${p.relatedVisits.length ? `<div>
            <span style="font-size:11px;font-weight:700;color:var(--text3)">الزيارات المرتبطة: </span>
            ${p.relatedVisits.map(id=>`<a href="#" onclick="navigateTo('${_vpg(id)}','id=${id}')" class="txp fw7" style="font-size:11px;margin-left:6px">${id}</a>`).join('')}
          </div>` : ''}
        </div>` : ''}
      </div>
    </div>`;

  return `<div class="pg-head"><div><h1>كشف الأنماط</h1><p>تحليل الأنماط المتكررة في المخالفات والبلاغات والعمال — مدعوم بالبيانات المتكاملة</p></div>
    <div class="pg-acts"><button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ تصدير التحليل...','i')">${ICONS.download}تصدير التحليل</button></div></div>
  <div class="alert alert-${highCount>0?'d':'w'}">${ICONS.warn} تم رصد <strong>${patterns.length} أنماط</strong> — منها <strong>${highCount} عالية الخطورة</strong> تستوجب إجراءً استباقياً فورياً.</div>
  <div class="stats-grid">
    <div class="scard d"><div class="sc-lbl">أنماط عالية الخطر</div><div class="sc-val">${highCount}</div></div>
    <div class="scard w"><div class="sc-lbl">أنماط متوسطة الخطر</div><div class="sc-val">${patterns.filter(p=>p.risk==='متوسط').length}</div></div>
    <div class="scard p"><div class="sc-lbl">منشآت تحت المراقبة</div><div class="sc-val">${new Set(patterns.flatMap(p=>p.entities.filter(e=>e.type==='employer').map(e=>e.id))).size}</div></div>
    <div class="scard i"><div class="sc-lbl">عمال في دائرة المخاطر</div><div class="sc-val">${new Set(patterns.flatMap(p=>p.entities.filter(e=>e.type==='worker').map(e=>e.id))).size}</div></div>
  </div>
  ${patterns.map(_patternCard).join('')}`;
}

/* ── إعداد خطة التفتيش (ops-analyst) ── */
function renderInspectionPlanDraft(role) {
  const pid    = getParam('id');
  const isNew  = getParam('new') === 'true';

  /* ══════════════════════════════════════════
     قائمة الخطط السابقة (الصفحة الافتراضية)
  ══════════════════════════════════════════ */
  if (!pid && !isNew) {
    const plans = INSP_DATA.inspectionPlans || [];
    const rows = plans.map(p => {
      const pct = p.targetCount ? Math.round(p.completedCount / p.targetCount * 100) : 0;
      const stCls = p.status.includes('مكتملة') ? 'b-approved' : p.status.includes('معتمدة') ? 'b-session' : p.status.includes('مسودة') ? 'b-draft' : 'b-returned';
      return `<tr>
        <td><a href="#" onclick="navigateTo('inspection-plan-draft','id=${p.id}')" class="txp fw7">${p.id}</a></td>
        <td class="fw7">${p.title}</td>
        <td>${p.period}</td>
        <td><span class="badge ${stCls}">${p.status}</span></td>
        <td>
          <div style="display:flex;align-items:center;gap:8px">
            <div class="progress-bar-wrap" style="flex:1;margin:0;height:8px"><div class="progress-bar-fill" style="width:${pct}%;background:${_compColor(pct)}"></div></div>
            <span class="fs11 fw7">${pct}%</span>
          </div>
          <div style="font-size:10.5px;color:var(--text3);margin-top:2px">${p.completedCount} من ${p.targetCount} زيارة</div>
        </td>
        <td>${p.approvedBy || '<span class="tx3">—</span>'}</td>
        <td>${p.approvalDate || '<span class="tx3">—</span>'}</td>
        <td><button class="btn btn-primary btn-xs" onclick="navigateTo('inspection-plan-draft','id=${p.id}')">${ICONS.eye}عرض</button></td>
      </tr>`;
    }).join('') || `<tr><td colspan="8">${_noData()}</td></tr>`;

    return `<div class="pg-head"><div><h1>خطط التفتيش الدوري</h1><p>سجل خطط التفتيش الدورية وحالة تنفيذها</p></div>
      <div class="pg-acts"><button class="btn btn-primary" onclick="navigateTo('inspection-plan-draft','new=true')">${ICONS.plus}إعداد خطة جديدة</button></div></div>
      <div class="stats-grid">
        <div class="scard s"><div class="sc-lbl">إجمالي الخطط</div><div class="sc-val">${plans.length}</div></div>
        <div class="scard p"><div class="sc-lbl">قيد التنفيذ</div><div class="sc-val">${plans.filter(p=>p.status.includes('قيد')).length}</div></div>
        <div class="scard i"><div class="sc-lbl">مكتملة</div><div class="sc-val">${plans.filter(p=>p.status.includes('مكتملة')).length}</div></div>
        <div class="scard d"><div class="sc-lbl">مسودات</div><div class="sc-val">${plans.filter(p=>p.status.includes('مسودة')).length}</div></div>
      </div>
      ${_tblWrap(['رقم الخطة','المسمى','الفترة','الحالة','نسبة الإنجاز','المعتمد بواسطة','تاريخ الاعتماد','إجراء'], rows)}`;
  }

  /* ══════════════════════════════════════════
     تفاصيل خطة موجودة
  ══════════════════════════════════════════ */
  if (pid) {
    const p = (INSP_DATA.inspectionPlans || []).find(x => x.id === pid) || INSP_DATA.inspectionPlans[0];
    const pct = p.targetCount ? Math.round(p.completedCount / p.targetCount * 100) : 0;
    const stCls = p.status.includes('مكتملة') ? 'b-approved' : p.status.includes('معتمدة') ? 'b-session' : p.status.includes('مسودة') ? 'b-draft' : 'b-returned';

    const stages = [
      { lbl: 'إنشاء المقترح',     done: true,  by: p.createdBy,    date: p.createdDate },
      { lbl: 'رفع للاعتماد',      done: !!p.approvedBy, by: p.createdBy, date: p.createdDate },
      { lbl: 'اعتماد مدير الدائرة', done: !!p.approvedBy, by: p.approvedBy||'—', date: p.approvalDate||'—' },
      { lbl: 'قيد التنفيذ',       done: p.completedCount > 0, by: 'حاتم سالم الزدجالي', date: '—' },
      { lbl: 'مكتملة',            done: p.status.includes('مكتملة'), by: '—', date: '—' },
    ];

    const planVisits = [...(INSP_DATA.visits.periodic||[]), ...(INSP_DATA.visits.surprise||[]), ...(INSP_DATA.visits.scheduled||[])]
      .filter(v => v.planId === p.id);

    return `<div class="pg-head"><div><h1>${p.title}</h1><p>${p.period}</p></div>
      <div class="pg-acts">${statusBadge(p.status)}
        <button class="btn btn-secondary btn-sm" onclick="navigateTo('inspection-plan-draft')">${ICONS.arrow_right}قائمة الخطط</button>
      </div></div>

    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.file}</span>بيانات الخطة</h3></div>
      <div class="pb"><div class="fg fg-2">
        <div class="fgrp"><label class="flbl">رقم الخطة</label><div class="fro fw7">${p.id}</div></div>
        <div class="fgrp"><label class="flbl">الفترة</label><div class="fro">${p.period}</div></div>
        <div class="fgrp"><label class="flbl">معيار الاختيار</label><div class="fro">${p.riskCriteria}</div></div>
        <div class="fgrp"><label class="flbl">القطاعات المستهدفة</label><div class="fro">${(p.sectors||[]).join('، ')}</div></div>
        <div class="fgrp"><label class="flbl">المفتشون المكلفون</label><div class="fro">${(p.inspectors||[]).join('، ')}</div></div>
        <div class="fgrp"><label class="flbl">منشأت مستهدفة</label><div class="fro fw7">${p.targetCount}</div></div>
      </div></div></div>

    <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.chart}</span>نسبة الإنجاز</h3></div>
      <div class="pb">
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px">
          <div style="font-size:36px;font-weight:800;color:${_compColor(pct)}">${pct}%</div>
          <div>
            <div class="progress-bar-wrap" style="width:260px;height:12px"><div class="progress-bar-fill" style="width:${pct}%;background:${_compColor(pct)}"></div></div>
            <div style="font-size:11.5px;color:var(--text3);margin-top:4px">${p.completedCount} زيارة منجزة من أصل ${p.targetCount}</div>
          </div>
        </div>
        <div class="fg fg-2">
          <div class="fgrp"><label class="flbl">قيد التنفيذ</label><div class="fro fw7 txp">${p.inProgressCount || 0}</div></div>
          <div class="fgrp"><label class="flbl">متبقية</label><div class="fro fw7">${p.targetCount - p.completedCount - (p.inProgressCount||0)}</div></div>
        </div>
      </div></div>

    <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.clock}</span>مراحل اعتماد الخطة</h3></div>
      <div class="pb">
        ${stages.map((s,i) => `
          <div style="display:flex;align-items:flex-start;gap:14px;padding:10px 0;${i<stages.length-1?'border-bottom:1px solid var(--border)':''}">
            <div style="width:28px;height:28px;border-radius:50%;background:${s.done?'var(--success)':'var(--g200)'};color:${s.done?'#fff':'var(--text3)'};display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;font-weight:700">${s.done?'✓':(i+1)}</div>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:700;color:${s.done?'var(--text)':'var(--text3)'}">${s.lbl}</div>
              ${s.done ? `<div style="font-size:11.5px;color:var(--text3)">${s.by} — ${s.date}</div>` : '<div style="font-size:11.5px;color:var(--text3)">بانتظار اتخاذ الإجراء</div>'}
            </div>
            <span class="badge ${s.done?'b-approved':'b-draft'}" style="font-size:10.5px">${s.done?'مكتمل':'معلق'}</span>
          </div>`).join('')}
      </div></div>

    ${planVisits.length ? `
    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.clipboard}</span>الزيارات المرتبطة بالخطة (${planVisits.length})</h3></div>
      <div class="tbl-wrap"><table class="dtbl">
        <thead><tr><th>رقم الزيارة</th><th>المنشأة</th><th>المفتش</th><th>الحالة</th><th>تاريخ الجدولة</th></tr></thead>
        <tbody>${planVisits.map(v=>`<tr>
          <td class="txp fw7">${v.id}</td><td>${v.employerName}</td><td>${v.inspectorName}</td>
          <td>${statusBadge(v.status)}</td><td>${v.scheduledDate}</td>
        </tr>`).join('')}</tbody>
      </table></div></div>` : ''}`;
  }

  /* ══════════════════════════════════════════
     نموذج إعداد خطة جديدة
  ══════════════════════════════════════════ */
  const recommended = (INSP_DATA.employers || []).map(e => ({
    id: e.id, name: e.name, crn: e.crn, sector: e.sector,
    riskLevel: e.riskLevel, complianceScore: e.complianceScore,
    lastVisit: e.lastVisit, violations: (e.violations||[]).length,
    priority: e.riskLevel === 'مرتفع' ? 'أولى' : e.riskLevel === 'متوسط' ? 'ثانوية' : 'عادية'
  }));

  const recRows = recommended.map(e => `
    <tr id="rec-row-${e.id}">
      <td><input type="checkbox" id="rec-chk-${e.id}" style="cursor:pointer"></td>
      <td class="fw7">${e.name}</td>
      <td style="font-size:11.5px">${e.crn}</td>
      <td>${e.sector}</td>
      <td>${e.lastVisit}</td>
      <td><span class="badge ${_riskClass(e.riskLevel)}">${e.riskLevel}</span></td>
      <td><span style="color:${_compColor(e.complianceScore)};font-weight:700">${e.complianceScore}%</span></td>
      <td><span class="badge ${e.priority==='أولى'?'b-high':e.priority==='ثانوية'?'b-medium':'b-low'}">${e.priority}</span></td>
      <td><button class="btn btn-accent btn-xs" onclick="_addEmpToPlan('${e.id}','${e.name}','${e.sector}','${e.riskLevel}','${e.complianceScore}%','${e.lastVisit}')">${ICONS.plus}إضافة</button></td>
    </tr>`).join('');

  const empJson = JSON.stringify(recommended);

  const script = `<script>
  var _planEmps = [];

  function _addEmpToPlan(id, name, sector, risk, comp, lastVisit) {
    if (_planEmps.find(function(x){return x.id===id;})) { showToast('المنشأة مضافة بالفعل','w'); return; }
    _planEmps.push({id:id, name:name, sector:sector, riskLevel:risk, complianceScore:comp, lastVisit:lastVisit, source:'يدوي / ترشيح'});
    _renderPlanTable();
    showToast('تمت إضافة ' + name + ' إلى الخطة','s');
  }

  function _addChecked() {
    var added = 0;
    ${JSON.stringify(recommended)}.forEach(function(e){
      var chk = document.getElementById('rec-chk-'+e.id);
      if (chk && chk.checked) { _addEmpToPlan(e.id,e.name,e.sector,e.riskLevel,e.complianceScore+'%',e.lastVisit); added++; }
    });
    if (!added) showToast('لم يتم تحديد أي منشأة','w');
  }

  function _addAllRecommended() {
    ${JSON.stringify(recommended)}.forEach(function(e){ _addEmpToPlan(e.id,e.name,e.sector,e.riskLevel,e.complianceScore+'%',e.lastVisit); });
  }

  function _searchManualEmp() {
    var q = document.getElementById('manual-search') ? document.getElementById('manual-search').value.trim() : '';
    var res = document.getElementById('manual-result');
    if (!q || q.length < 3) { showToast('أدخل 3 أحرف على الأقل للبحث','w'); return; }
    var all = (INSP_DATA.employers||[]).concat([
      {id:'EMP-EXT-001', name:'شركة الخليج للمقاولات', crn:'5551234567', sector:'البناء', riskLevel:'متوسط', complianceScore:68, lastVisit:'2024-08-10'},
      {id:'EMP-EXT-002', name:'مؤسسة النور للتجارة',   crn:'6667891234', sector:'التجارة', riskLevel:'منخفض', complianceScore:88, lastVisit:'2024-06-20'},
      {id:'EMP-EXT-003', name:'شركة الفجر للصناعة',    crn:'7774561230', sector:'التصنيع',  riskLevel:'مرتفع', complianceScore:45, lastVisit:'2024-04-15'}
    ]);
    var found = all.filter(function(e){ return e.name.includes(q) || e.crn.includes(q); });
    if (!found.length) { res.innerHTML = '<div class="alert alert-w" style="margin-top:8px">لم يتم العثور على منشأة تطابق البحث.</div>'; return; }
    res.innerHTML = '<div style="margin-top:10px">' + found.map(function(e){
      return '<div style="display:flex;align-items:center;gap:12px;padding:10px 14px;border:1px solid var(--border);border-radius:var(--rsm);margin-bottom:6px;background:var(--g50)">'
        + '<div style="flex:1"><div class="fw7" style="font-size:13px">'+e.name+'</div><div style="font-size:11.5px;color:var(--text3)">'+e.crn+' — '+e.sector+'</div></div>'
        + '<span class="badge b-session" style="font-size:10.5px">امتثال: '+e.complianceScore+'%</span>'
        + '<button class="btn btn-accent btn-xs" onclick="_addEmpToPlan(\''+e.id+'\',\''+e.name+'\',\''+e.sector+'\',\''+e.riskLevel+'\',\''+e.complianceScore+'%\',\''+e.lastVisit+'\')">إضافة للخطة</button>'
        + '</div>';
    }).join('') + '</div>';
  }

  function _removeFromPlan(id) {
    _planEmps = _planEmps.filter(function(x){return x.id!==id;});
    _renderPlanTable();
  }

  function _renderPlanTable() {
    var el = document.getElementById('plan-emp-table');
    var cnt = document.getElementById('plan-emp-count');
    if (cnt) cnt.textContent = _planEmps.length;
    if (!el) return;
    if (!_planEmps.length) {
      el.innerHTML = '<div class="tx3 fs11" style="padding:14px">لم يتم إضافة أي منشأة بعد. استخدم الأقسام أعلاه لإضافة المنشآت المستهدفة.</div>';
      return;
    }
    var rows = _planEmps.map(function(e,i){
      return '<tr><td class="fw7">'+(i+1)+'</td><td class="fw7">'+e.name+'</td><td style="font-size:11.5px;color:var(--text3)">'+e.sector+'</td>'
        +'<td><span class="badge b-session" style="font-size:10.5px">'+e.complianceScore+'</span></td>'
        +'<td><span class="badge '+_badgeForRisk(e.riskLevel)+'">'+e.riskLevel+'</span></td>'
        +'<td style="font-size:11.5px">'+e.lastVisit+'</td>'
        +'<td><button class="btn btn-danger btn-xs" onclick="_removeFromPlan(\''+e.id+'\')">حذف</button></td></tr>';
    }).join('');
    el.innerHTML = '<div class="tbl-wrap"><table class="dtbl"><thead><tr><th>#</th><th>المنشأة</th><th>القطاع</th><th>الامتثال</th><th>الخطر</th><th>آخر زيارة</th><th>إزالة</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
  }

  function _badgeForRisk(r) { return r==='مرتفع'?'b-high':r==='متوسط'?'b-medium':'b-low'; }

  function _savePlan(action) {
    var period = document.getElementById('pd-period') ? document.getElementById('pd-period').value : '—';
    var title  = document.getElementById('pd-title')  ? document.getElementById('pd-title').value.trim() : '';
    if (!title) { showToast('يرجى إدخال اسم الخطة','w'); return; }
    if (!_planEmps.length) { showToast('يرجى إضافة منشأة واحدة على الأقل','w'); return; }
    if (action === 'draft') {
      showToast('تم حفظ الخطة كمسودة — يمكنك إكمالها لاحقاً', 'i');
    } else {
      showToast('تم رفع خطة التفتيش لاعتماد مدير الدائرة', 's');
    }
  }

  document.addEventListener('keydown', function(e){
    if (e.key==='Enter') {
      var el = document.getElementById('manual-search');
      if (el && el === document.activeElement) _searchManualEmp();
    }
  });
  <\/script>`;

  return `<div class="pg-head"><div><h1>إعداد خطة تفتيش دورية جديدة</h1><p>بناء مقترح الخطة وتحديد المنشآت المستهدفة ثم رفعها للاعتماد</p></div>
    <div class="pg-acts"><button class="btn btn-secondary btn-sm" onclick="navigateTo('inspection-plan-draft')">${ICONS.arrow_right}قائمة الخطط</button></div></div>

  <!-- ── 1. بيانات الخطة ── -->
  <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.file}</span>بيانات الخطة الأساسية</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">اسم الخطة <span class="req">*</span></label>
        <input class="fc" id="pd-title" placeholder="مثال: خطة التفتيش الدوري — الربع الثاني 2025"></div>
      <div class="fgrp"><label class="flbl">الفترة الزمنية <span class="req">*</span></label>
        <select class="fc" id="pd-period">
          <option>الربع الثاني 2025 (أبريل–يونيو)</option>
          <option>الربع الثالث 2025 (يوليو–سبتمبر)</option>
          <option>الربع الرابع 2025 (أكتوبر–ديسمبر)</option>
          <option>النصف الأول 2026</option>
        </select></div>
      <div class="fgrp"><label class="flbl">المفتشون المتاحون</label>
        <select class="fc" multiple style="height:72px">
          <option selected>حاتم سالم الزدجالي</option>
          <option>مفتش ثانٍ (غير متاح حالياً)</option>
        </select></div>
      <div class="fgrp"><label class="flbl">ملاحظات</label>
        <textarea class="fc" rows="3" placeholder="أي توجيهات أو ملاحظات خاصة بهذه الخطة..."></textarea></div>
    </div></div></div>

  <!-- ── 2. المنشآت المرشحة تلقائياً ── -->
  <div class="card"><div class="ph">
    <h3><span class="pico rd">${ICONS.warn}</span>المنشآت المرشحة تلقائياً (بناءً على تحليل المخاطر)</h3>
    <div style="display:flex;gap:8px">
      <button class="btn btn-secondary btn-sm" onclick="_addChecked()">${ICONS.check}إضافة المحددة</button>
      <button class="btn btn-ghost btn-sm" onclick="_addAllRecommended()">إضافة الكل</button>
    </div></div>
    <div class="tbl-wrap"><table class="dtbl">
      <thead><tr><th style="width:36px"></th><th>المنشأة</th><th>السجل التجاري</th><th>القطاع</th><th>آخر زيارة</th><th>الخطر</th><th>الامتثال</th><th>الأولوية</th><th>إجراء</th></tr></thead>
      <tbody>${recRows}</tbody>
    </table></div></div>

  <!-- ── 3. إضافة منشأة يدوياً ── -->
  <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.plus}</span>إضافة منشأة يدوياً</h3>
    <span style="font-size:11.5px;color:var(--text3)">إضافة منشآت غير مرشحة تلقائياً وفق تقدير الموظف</span></div>
    <div class="pb" style="max-width:520px">
      <div class="fgrp" style="margin-bottom:0">
        <label class="flbl">البحث بالاسم أو رقم السجل التجاري</label>
        <div style="display:flex;gap:8px">
          <input class="fc" id="manual-search" placeholder="مثال: شركة التقنية / 1234567890" style="flex:1">
          <button class="btn btn-primary" onclick="_searchManualEmp()">${ICONS.eye}بحث</button>
        </div>
      </div>
      <div id="manual-result"></div>
    </div></div>

  <!-- ── 4. المنشآت المختارة للخطة ── -->
  <div class="card"><div class="ph">
    <h3><span class="pico bl">${ICONS.clipboard}</span>المنشآت المختارة للخطة</h3>
    <span class="badge b-session" style="font-size:12px" id="plan-emp-count">0</span> منشأة</div>
    <div id="plan-emp-table">
      <div class="tx3 fs11" style="padding:14px">لم يتم إضافة أي منشأة بعد. استخدم الأقسام أعلاه لإضافة المنشآت المستهدفة.</div>
    </div></div>

  <!-- ── الإجراءات ── -->
  <div class="dp"><div class="ph"><h3><span class="pico bl">${ICONS.pen}</span>حفظ الخطة</h3></div>
    <div class="dp-body">
      <div class="alert alert-i" style="margin-bottom:14px">${ICONS.info} بعد الرفع للاعتماد سيتلقى مدير الدائرة إشعاراً لمراجعة الخطة واعتمادها أو إعادتها.</div>
      <div class="dp-acts">
        <button class="btn btn-primary" onclick="_savePlan('approve')">${ICONS.check}رفع للاعتماد</button>
        <button class="btn btn-secondary" onclick="_savePlan('draft')">حفظ كمسودة</button>
        <button class="btn btn-ghost" onclick="navigateTo('inspection-plan-draft')">إلغاء</button>
      </div>
    </div></div>

  ${script}`;
}

/* ── قائمة التقارير ── */
function renderReportsList(role) {
  const isExternal = role === 'employer' || role === 'insured';

  /* report type catalog per audience */
  const internalTypes = [
    { key: 'complaints',   icon: '📋', title: 'تقرير البلاغات',              desc: 'إحصائيات البلاغات حسب النوع والحالة والفترة الزمنية',          criteria: ['من تاريخ','إلى تاريخ','الحالة','نوع البلاغ','المنشأة'] },
    { key: 'visits',       icon: '🏭', title: 'تقرير الزيارات التفتيشية',      desc: 'ملخص الزيارات المنجزة والمجدولة وبيانات المحاضر',              criteria: ['من تاريخ','إلى تاريخ','نوع الزيارة','الحالة','المفتش'] },
    { key: 'appeals',      icon: '⚖️',  title: 'تقرير التظلمات',               desc: 'بيانات التظلمات المقدمة والقرارات الصادرة',                    criteria: ['من تاريخ','إلى تاريخ','الحالة','نوع التظلم'] },
    { key: 'compliance',   icon: '✅',  title: 'تقرير الامتثال',               desc: 'نسب امتثال المنشآت واشتراكات التأمين والمخالفات',              criteria: ['من تاريخ','إلى تاريخ','المنشأة','مستوى المخاطر','القطاع'] },
    { key: 'kpi',          icon: '📊',  title: 'تقرير مؤشرات الأداء',          desc: 'مؤشرات الأداء الرئيسية للأقسام ومعدلات الإنجاز',              criteria: ['الفترة','القسم'] },
    { key: 'risk',         icon: '⚠️',  title: 'تقرير تحليل المخاطر',         desc: 'المنشآت عالية المخاطر والعمال في حالات الخطر',                criteria: ['من تاريخ','إلى تاريخ','مستوى المخاطر','القطاع'] },
    { key: 'bans',         icon: '🚫',  title: 'تقرير قرارات الحظر',           desc: 'حالات الحظر الصادرة وحالة تنفيذ القرارات',                    criteria: ['من تاريخ','إلى تاريخ','الحالة'] },
    { key: 'corrective',   icon: '🔧',  title: 'تقرير الإجراءات التصحيحية',   desc: 'المخالفات المرصودة والإجراءات التصحيحية المطلوبة ونسب تنفيذها', criteria: ['من تاريخ','إلى تاريخ','المنشأة','الحالة'] },
  ];
  const externalTypes = [
    { key: 'my-complaints', icon: '📋', title: 'بلاغاتي',          desc: 'كشف بجميع البلاغات التي قدمتها وحالتها الحالية',         criteria: ['من تاريخ','إلى تاريخ','الحالة','نوع البلاغ'] },
    { key: 'my-visits',     icon: '🏭', title: 'زياراتي التفتيشية', desc: 'الزيارات التفتيشية المُجراة على منشأتك ونتائجها',         criteria: ['من تاريخ','إلى تاريخ','نوع الزيارة','الحالة'] },
    { key: 'my-appeals',    icon: '⚖️', title: 'تظلماتي',           desc: 'التظلمات التي قدمتها والقرارات الصادرة بشأنها',          criteria: ['من تاريخ','إلى تاريخ','الحالة'] },
    { key: 'compliance',    icon: '✅', title: 'حالة الالتزام',    desc: 'ملخص حالة اشتراكاتك التأمينية وأي ملاحظات معلقة',       criteria: ['من تاريخ','إلى تاريخ'] },
  ];

  const types = isExternal ? externalTypes : internalTypes;

  /* sample filtered data per type */
  const sampleData = {
    complaints: () => {
      const rows = INSP_DATA.complaints.slice(0,5).map(c =>
        `<tr><td class="fw7 txp">${c.id}</td><td>${c.type}</td><td>${c.employerName}</td><td>${statusBadge(c.status)}</td><td>${c.submitDate}</td></tr>`).join('');
      return _tblWrap(['رقم البلاغ','النوع','المنشأة','الحالة','تاريخ التقديم'], rows);
    },
    visits: () => {
      const all = [...INSP_DATA.visits.periodic.slice(0,3), ...INSP_DATA.visits.surprise.slice(0,2)];
      const rows = all.map(v => `<tr><td class="fw7 txp">${v.id}</td><td>${v.employerName}</td><td>${v.inspectorName}</td><td>${statusBadge(v.status)}</td><td>${v.scheduledDate}</td></tr>`).join('');
      return _tblWrap(['رقم الزيارة','المنشأة','المفتش','الحالة','التاريخ المجدول'], rows);
    },
    appeals: () => {
      const rows = INSP_DATA.appeals.slice(0,4).map(a =>
        `<tr><td class="fw7 txp">${a.id}</td><td>${a.type}</td><td>${a.employerName}</td><td>${statusBadge(a.status)}</td><td>${a.submitDate}</td></tr>`).join('');
      return _tblWrap(['رقم التظلم','النوع','المنشأة','الحالة','تاريخ التقديم'], rows);
    },
    compliance: () => {
      const rows = INSP_DATA.employers.map(e =>
        `<tr><td class="fw7">${e.name}</td><td>${e.sector}</td><td><span class="badge ${e.contributions.status==='منتظم'?'b-approved':'b-returned'}">${e.contributions.status}</span></td><td>${e.complianceScore}%</td><td><span class="badge ${e.riskLevel==='مرتفع'?'b-rejected':e.riskLevel==='متوسط'?'b-returned':'b-approved'}">${e.riskLevel}</span></td></tr>`).join('');
      return _tblWrap(['المنشأة','القطاع','حالة الاشتراكات','درجة الامتثال','مستوى المخاطر'], rows);
    },
    kpi: () => {
      const kpiItems = [
        { lbl: 'إجمالي البلاغات المستلمة', val: INSP_DATA.complaints.length, c: 'b-submitted' },
        { lbl: 'بلاغات مغلقة', val: 2, c: 'b-approved' },
        { lbl: 'تظلمات مقدمة', val: INSP_DATA.appeals.length, c: 'b-submitted' },
        { lbl: 'زيارات منجزة', val: 3, c: 'b-approved' },
        { lbl: 'متوسط وقت الإنجاز', val: '5.2 يوم', c: 'b-session' },
        { lbl: 'نسبة الامتثال العامة', val: '74%', c: 'b-returned' },
      ];
      return `<div class="fg fg-2">${kpiItems.map(m =>
        `<div class="card" style="text-align:center;padding:18px"><div style="font-size:24px;font-weight:800;color:var(--primary);margin-bottom:6px">${m.val}</div><div style="font-size:12px;color:var(--text3)">${m.lbl}</div></div>`).join('')}</div>`;
    },
    risk: () => {
      const rows = INSP_DATA.employers.map(e =>
        `<tr><td class="fw7">${e.name}</td><td>${e.sector}</td><td><span class="badge ${e.riskLevel==='مرتفع'?'b-rejected':e.riskLevel==='متوسط'?'b-returned':'b-approved'}">${e.riskLevel}</span></td><td>${e.violations.length}</td><td>${e.lastVisit||'—'}</td></tr>`).join('');
      return _tblWrap(['المنشأة','القطاع','مستوى المخاطر','عدد المخالفات','آخر زيارة'], rows);
    },
    bans: () => `<div class="alert alert-i">${ICONS.info} لا توجد بيانات حظر تطابق المعايير المحددة في الفترة المختارة.</div>`,
    corrective: () => {
      const vios = INSP_DATA.employers.flatMap(e => (e.violations||[]).map(v=>({...v,employer:e.name})));
      const rows = vios.slice(0,5).map(v=>`<tr><td>${v.employer}</td><td>${v.type}</td><td><span class="badge ${v.severity==='مرتفع'?'b-rejected':v.severity==='متوسط'?'b-returned':'b-draft'}">${v.severity}</span></td><td>${v.date}</td><td><span class="badge ${v.status==='منجز'?'b-approved':'b-returned'}">${v.status}</span></td></tr>`).join('');
      return _tblWrap(['المنشأة','نوع المخالفة','الخطورة','التاريخ','الحالة'], rows);
    },
    'my-complaints': () => {
      const rows = INSP_DATA.complaints.slice(0,5).map(c =>
        `<tr><td class="fw7 txp">${c.id}</td><td>${c.type}</td><td>${statusBadge(c.status)}</td><td>${c.submitDate}</td><td>${c.dueDate||'—'}</td></tr>`).join('');
      return _tblWrap(['رقم البلاغ','النوع','الحالة','تاريخ التقديم','الموعد النهائي'], rows);
    },
    'my-visits': () => {
      const all = [...INSP_DATA.visits.periodic, ...INSP_DATA.visits.surprise].slice(0,4);
      const rows = all.map(v=>`<tr><td class="fw7 txp">${v.id}</td><td>${v.id.includes('-04-')?'مفاجئة':'دورية'}</td><td>${statusBadge(v.status)}</td><td>${v.scheduledDate}</td><td>${v.actualDate||'—'}</td></tr>`).join('');
      return _tblWrap(['رقم الزيارة','النوع','الحالة','التاريخ المجدول','تاريخ التنفيذ'], rows);
    },
    'my-appeals': () => {
      const rows = INSP_DATA.appeals.slice(0,3).map(a=>
        `<tr><td class="fw7 txp">${a.id}</td><td>${a.type}</td><td>${statusBadge(a.status)}</td><td>${a.submitDate}</td></tr>`).join('');
      return _tblWrap(['رقم التظلم','النوع','الحالة','تاريخ التقديم'], rows);
    },
  };

  const typeCards = types.map(t => `
    <div class="card" id="rtype-${t.key}" style="cursor:pointer;border:2px solid transparent;transition:.2s" onclick="_selectReportType('${t.key}')">
      <div class="pb" style="padding:18px;text-align:center">
        <div style="font-size:30px;margin-bottom:10px">${t.icon}</div>
        <div style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:6px">${t.title}</div>
        <div style="font-size:11.5px;color:var(--text3);line-height:1.6">${t.desc}</div>
      </div>
    </div>`).join('');

  return `<div class="pg-head"><div><h1>قائمة التقارير</h1><p>اختر نوع التقرير لتحديد المعايير وعرض البيانات</p></div>
    <div class="pg-acts"><button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ التصدير...','i')">${ICONS.download}تصدير</button></div></div>

  <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.chart}</span>اختر نوع التقرير</h3></div>
  <div class="pb"><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px">${typeCards}</div></div></div>

  <div id="report-criteria-section" style="display:none">
    <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.pen}</span>معايير التقرير</h3>
      <span id="report-type-badge" class="badge b-submitted"></span></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">من تاريخ</label><input type="date" class="fc" id="rpt-from" value="2025-01-01"></div>
      <div class="fgrp"><label class="flbl">إلى تاريخ</label><input type="date" class="fc" id="rpt-to" value="2025-01-31"></div>
      <div class="fgrp"><label class="flbl">الحالة</label>
        <select class="fc" id="rpt-status">
          <option value="">— الكل —</option>
          <option>قيد المراجعة</option><option>مكتمل</option><option>مغلق</option><option>مرفوض</option>
        </select></div>
      <div class="fgrp"><label class="flbl">المنشأة</label>
        <select class="fc" id="rpt-employer">
          <option value="">— جميع المنشآت —</option>
          ${INSP_DATA.employers.map(e=>`<option value="${e.id}">${e.name}</option>`).join('')}
        </select></div>
    </div>
    <div class="mt14 df ac g8">
      <button class="btn btn-primary" id="rpt-view-btn" onclick="_viewReport()">${ICONS.eye}عرض التقرير</button>
      <button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ التصدير...','i')">${ICONS.download}تصدير PDF</button>
    </div></div></div>
  </div>

  <div id="report-results-section" style="display:none">
    <div class="card"><div class="ph"><h3 id="report-results-title"><span class="pico tl">${ICONS.chart}</span>نتائج التقرير</h3>
      <div class="df ac g8">
        <span id="report-results-meta" class="fs11 tx3"></span>
        <button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ التنزيل...','i')">${ICONS.download}تنزيل</button>
      </div></div>
    <div class="pb" id="report-results-body"></div></div>
  </div>

  <script>
  var _currentReportType = null;
  var _reportTypes = ${JSON.stringify(types.map(t=>({key:t.key,title:t.title})))};
  function _selectReportType(key) {
    _currentReportType = key;
    _reportTypes.forEach(function(t){
      var el = document.getElementById('rtype-'+t.key);
      if(el){ el.style.border = t.key===key ? '2px solid var(--primary)' : '2px solid transparent';
              el.style.background = t.key===key ? 'var(--primary-l)' : ''; }
    });
    var t = _reportTypes.find(function(x){return x.key===key;});
    var badge = document.getElementById('report-type-badge');
    if(badge && t){ badge.textContent = t.title; }
    document.getElementById('report-criteria-section').style.display='';
    document.getElementById('report-results-section').style.display='none';
    document.getElementById('report-criteria-section').scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  function _viewReport() {
    if(!_currentReportType){ showToast('يرجى اختيار نوع التقرير أولاً','w'); return; }
    var from = document.getElementById('rpt-from').value;
    var to = document.getElementById('rpt-to').value;
    var status = document.getElementById('rpt-status').value;
    var t = _reportTypes.find(function(x){return x.key===_currentReportType;});
    document.getElementById('report-results-title').innerHTML = '<span class="pico tl"></span>' + (t?t.title:'التقرير');
    document.getElementById('report-results-meta').textContent = 'الفترة: ' + (from||'—') + ' إلى ' + (to||'—') + (status?' | الحالة: '+status:'');
    var body = document.getElementById('report-results-body');
    var sampleFn = window['_rptSample_' + _currentReportType];
    body.innerHTML = sampleFn ? sampleFn() : '<div class="alert alert-i">لا توجد بيانات تطابق المعايير المحددة.</div>';
    document.getElementById('report-results-section').style.display='';
    document.getElementById('report-results-section').scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  ${Object.entries(sampleData).map(([k,fn]) => `window['_rptSample_${k}'] = function(){ return ${JSON.stringify(fn())}; };`).join('\n  ')}
  </script>`;
}

/* ── تفاصيل التقرير ── */
function renderReportDetails(role) {
  const r = {
    id: getParam('id') || 'RPT-2025-001',
    title: 'تقرير أداء قسم المتابعة والبلاغات — يناير 2025',
    type: 'تقرير أداء', date: '2025-01-15', period: 'يناير 2025',
    preparedBy: 'نجلاء عبدالله القاسمي',
    summary: 'يستعرض هذا التقرير أداء قسم المتابعة والبلاغات خلال شهر يناير 2025، ويتضمن إحصائيات البلاغات والتظلمات ومؤشرات الأداء الرئيسية.',
    sections: [
      { title: 'ملخص البلاغات', body: 'تم استلام 6 بلاغات خلال الفترة، أُغلق منها 2، ولا يزال 4 بلاغات تحت المعالجة بمتوسط وقت إنجاز 5.2 يوم.' },
      { title: 'ملخص التظلمات', body: 'تم استلام 4 تظلمات، صدر قرار في 2 منها (قبول واحد، رفض واحد)، والباقي قيد الدراسة.' },
      { title: 'التوصيات', body: 'يُوصى بمراجعة آلية تعيين المختصين تلقائياً للحد من التأخير في البلاغات ذات الأولوية العالية.' },
    ]
  };

  return `<div class="pg-head"><div><h1>${r.id}</h1><p>${r.title}</p></div>
    <div class="pg-acts"><button class="btn btn-secondary btn-sm" onclick="navigateTo('reports-list')">${ICONS.arrow_right}رجوع</button>
      <button class="btn btn-primary btn-sm" onclick="showToast('جارٍ التنزيل...','i')">${ICONS.download}تنزيل PDF</button></div></div>
  <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.file}</span>معلومات التقرير</h3></div>
  <div class="pb"><div class="fg fg-2">
    <div class="fgrp"><label class="flbl">رقم التقرير</label><div class="fro fw7">${r.id}</div></div>
    <div class="fgrp"><label class="flbl">تاريخ الإصدار</label><div class="fro">${r.date}</div></div>
    <div class="fgrp"><label class="flbl">الفترة المشمولة</label><div class="fro">${r.period}</div></div>
    <div class="fgrp"><label class="flbl">النوع</label><div class="fro">${r.type}</div></div>
    <div class="fgrp"><label class="flbl">أعدّه</label><div class="fro">${r.preparedBy}</div></div>
    <div class="fgrp span-full"><label class="flbl">الملخص التنفيذي</label><div class="fro" style="min-height:60px">${r.summary}</div></div>
  </div></div></div>
  ${r.sections.map(s=>`<div class="card"><div class="ph"><h3>${s.title}</h3></div>
    <div class="pb"><p style="font-size:13px;color:var(--text2);line-height:1.8">${s.body}</p></div></div>`).join('')}`;
}

/* ── زيارات جهة العمل / المؤمن عليه ── */
function renderEmployerVisitsList(role) {
  const all = [...INSP_DATA.visits.periodic, ...INSP_DATA.visits.surprise, ...INSP_DATA.visits.scheduled];
  const _vTypeKey = v => v.id.includes('-03-') ? 'periodic' : v.id.includes('-04-') ? 'surprise' : 'scheduled';
  const _vDetPage = v => v.id.includes('-03-') ? 'visit-periodic-details' : v.id.includes('-04-') ? 'visit-surprise-details' : 'visit-scheduled-details';
  const typeLabel = v => v.id.includes('-03-') ? 'دورية' : v.id.includes('-04-') ? 'مفاجئة' : 'مجدولة';
  const isCompleted = v => v.status && (v.status.includes('تم اعتماد') || v.status.includes('مغلقة'));

  const rows = all.map(v =>
    `<tr>
      <td><a href="#" onclick="navigateTo('${_vDetPage(v)}','id=${v.id}&type=${_vTypeKey(v)}')" class="txp fw7">${v.id}</a></td>
      <td>${typeLabel(v)}</td>
      <td>${v.inspectorName}</td>
      <td>${statusBadge(v.status)}</td>
      <td>${v.scheduledDate}</td>
      <td>${v.actualDate || '—'}</td>
      <td><div class="df ac g8">
        <button class="btn btn-primary btn-xs" onclick="navigateTo('${_vDetPage(v)}','id=${v.id}&type=${_vTypeKey(v)}')">${ICONS.eye}عرض</button>
        ${isCompleted(v) ? `<button class="btn btn-ghost btn-xs" onclick="navigateTo('appeal-new')">${ICONS.file}تظلم</button>` : ''}
      </div></td>
    </tr>`).join('');

  return `<div class="pg-head"><div><h1>الزيارات التفتيشية</h1><p>جميع الزيارات المتعلقة بمنشأتك — ${all.length} زيارة</p></div></div>
    ${_filterBar([{label:'نوع الزيارة',type:'select',opts:['دورية','مفاجئة','مجدولة']},{label:'الحالة',type:'select',opts:['مجدولة','جارية','بانتظار مراجعة المحضر','تم اعتماد المحضر','مغلقة']},{label:'من تاريخ',type:'date'}])}
    ${_tblWrap(['رقم الزيارة','النوع','المفتش','الحالة','التاريخ المجدول','تاريخ التنفيذ','إجراء'], rows || _noData())}`;
}

/* ================================================================
   المكونات المشتركة الجديدة - v2
   ================================================================ */

/* ── مكون توثيق المخاطبات ── */
function renderDocumentationComponent(data) {
  const docs = data.documents || [];
  return `
    <div class="card">
      <div class="ph">
        <h3><div class="pico bl">${ICONS.file}</div>توثيق المخاطبات</h3>
        <span style="font-size:11.5px;color:var(--text3)">${docs.length} مستند</span>
      </div>
      <div class="pb">
        ${docs.length ? docs.map(d => `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border:1px solid var(--border);border-radius:var(--rsm);margin-bottom:8px;background:var(--g50)">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:16px">${d.type === 'email' ? '📧' : d.type === 'phone' ? '📞' : d.type === 'letter' ? '📄' : '📋'}</span>
              <div>
                <div style="font-size:13px;font-weight:600;color:var(--text)">${d.title}</div>
                <div style="font-size:11px;color:var(--text3)">${d.date} — ${d.sender}</div>
              </div>
            </div>
            <div class="df ac g8">
              <button class="ibtn" title="عرض" onclick="showToast('جارٍ فتح المستند...','i')">${ICONS.eye}</button>
              <button class="ibtn" title="تنزيل" onclick="showToast('جارٍ تنزيل المستند...','i')">${ICONS.download}</button>
            </div>
          </div>
        `).join('') : '<p style="color:var(--text3);font-size:12.5px">لا توجد مستندات موثقة</p>'}
        <button class="btn btn-ghost btn-sm mt8" onclick="openAddDocumentationModal()">${ICONS.plus} إضافة مستند</button>
      </div>
    </div>
  `;
}

function openAddDocumentationModal() {
  openModal({
    title: 'إضافة توثيق مخاطبة',
    body: `
      <div class="fg fg-2">
        <div class="fgrp"><label class="flbl">نوع التواصل <span class="req">*</span></label>
          <select class="fc" id="doc-type">
            <option value="email">بريد إلكتروني</option>
            <option value="phone">مكالمة هاتفية</option>
            <option value="letter">خطاب رسمي</option>
            <option value="meeting">اجتماع</option>
          </select>
        </div>
        <div class="fgrp"><label class="flbl">التاريخ <span class="req">*</span></label>
          <input type="date" class="fc" id="doc-date">
        </div>
        <div class="fgrp"><label class="flbl">عنوان التوثيق <span class="req">*</span></label>
          <input class="fc" id="doc-title" placeholder="مثال: إشعار استيفاء البيانات">
        </div>
        <div class="fgrp"><label class="flbl">الجهة/المرسل</label>
          <input class="fc" id="doc-sender" placeholder="مثال: وزارة العمل">
        </div>
        <div class="fgrp span-full"><label class="flbl">الوصف</label>
          <textarea class="fc" id="doc-desc" rows="3" placeholder="وصف تفصيلي للتواصل..."></textarea>
        </div>
        <div class="fgrp span-full"><label class="flbl">المرفقات</label>
          <div class="dz-box" style="padding:12px;min-height:60px">
            <div style="text-align:center;color:var(--text3);font-size:12px">
              <span style="font-size:24px;display:block;margin-bottom:4px">📎</span>
              اسحب الملفات هنا أو انقر للاختيار
            </div>
          </div>
        </div>
      </div>
    `,
    footer: `
      <button class="btn btn-primary" onclick="saveDocumentation()">${ICONS.check} حفظ التوثيق</button>
      <button class="btn btn-ghost" onclick="closeModal()">إلغاء</button>
    `
  });
}

function saveDocumentation() {
  const type = document.getElementById('doc-type').value;
  const date = document.getElementById('doc-date').value;
  const title = document.getElementById('doc-title').value;

  if (!type || !date || !title) {
    showToast('يرجى ملء الحقول المطلوبة', 'w');
    return;
  }

  closeModal();
  showToast('تم حفظ التوثيق بنجاح', 's');
}

/* ── مكون تسجيل المكالمات المرئية ── */
function renderVideoCallRecording(data) {
  const recordings = data.recordings || [];
  return `
    <div class="card">
      <div class="ph">
        <h3><div class="pico tl">${ICONS.eye}</div>تسجيل المكالمات المرئية</h3>
        <span style="font-size:11.5px;color:var(--text3)">${recordings.length} تسجيل</span>
      </div>
      <div class="pb">
        ${recordings.length ? recordings.map(r => `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;border:1px solid var(--border);border-radius:var(--rsm);margin-bottom:8px;background:var(--g50)">
            <div style="display:flex;align-items:center;gap:12px">
              <div style="width:48px;height:36px;background:var(--g200);border-radius:6px;display:flex;align-items:center;justify-content:center">
                <span style="font-size:20px">🎥</span>
              </div>
              <div>
                <div style="font-size:13px;font-weight:600;color:var(--text)">${r.title}</div>
                <div style="font-size:11px;color:var(--text3)">${r.date} — ${r.duration} — ${r.participants}</div>
              </div>
            </div>
            <div class="df ac g8">
              <button class="btn btn-primary btn-xs" onclick="showToast('جارٍ تشغيل التسجيل...','i')">${ICONS.eye}مشاهدة</button>
              <button class="ibtn" title="تنزيل" onclick="showToast('جارٍ تنزيل التسجيل...','i')">${ICONS.download}</button>
            </div>
          </div>
        `).join('') : '<p style="color:var(--text3);font-size:12.5px">لا توجد تسجيلات</p>'}
        <button class="btn btn-ghost btn-sm mt8" onclick="openAddRecordingModal()">${ICONS.plus} إضافة تسجيل</button>
      </div>
    </div>
  `;
}

function openAddRecordingModal() {
  openModal({
    title: 'إضافة تسجيل مكالمة مرئية',
    body: `
      <div class="fg fg-2">
        <div class="fgrp"><label class="flbl">عنوان التسجيل <span class="req">*</span></label>
          <input class="fc" id="rec-title" placeholder="مثال: مكالمة مع صاحب العمل">
        </div>
        <div class="fgrp"><label class="flbl">التاريخ <span class="req">*</span></label>
          <input type="date" class="fc" id="rec-date">
        </div>
        <div class="fgrp"><label class="flbl">المدة</label>
          <input class="fc" id="rec-duration" placeholder="مثال: 15:30">
        </div>
        <div class="fgrp"><label class="flbl">المشاركون</label>
          <input class="fc" id="rec-participants" placeholder="مثال: أحمد، محمد">
        </div>
        <div class="fgrp span-full"><label class="flbl">ملاحظات</label>
          <textarea class="fc" id="rec-notes" rows="3" placeholder="ملاحظات حول المكالمة..."></textarea>
        </div>
        <div class="fgrp span-full"><label class="flbl">رفع التسجيل</label>
          <div class="dz-box" style="padding:16px;min-height:80px">
            <div style="text-align:center;color:var(--text3);font-size:12px">
              <span style="font-size:32px;display:block;margin-bottom:6px">🎥</span>
              اسحب ملف الفيديو هنا أو انقر للاختيار
              <div style="font-size:10px;margin-top:4px">MP4, WebM (حد أقصى 500MB)</div>
            </div>
          </div>
        </div>
      </div>
    `,
    footer: `
      <button class="btn btn-primary" onclick="saveRecording()">${ICONS.check} حفظ التسجيل</button>
      <button class="btn btn-ghost" onclick="closeModal()">إلغاء</button>
    `
  });
}

function saveRecording() {
  const title = document.getElementById('rec-title').value;
  const date = document.getElementById('rec-date').value;

  if (!title || !date) {
    showToast('يرجى ملء الحقول المطلوبة', 'w');
    return;
  }

  closeModal();
  showToast('تم حفظ التسجيل بنجاح', 's');
}

/* ── شاشة التحليل الجغرافي ── */
function renderGeographicAnalysisScreen(role) {
  const governorates = [
    { name: 'محافظة مسقط', count: 45, trend: '+12%', lat: 23.58, lng: 58.38, color: '#c0392b' },
    { name: 'محافظة ظفار', count: 23, trend: '+5%', lat: 17.02, lng: 54.09, color: '#e67e22' },
    { name: 'محافظة شمال الباطنة', count: 18, trend: '-3%', lat: 24.56, lng: 56.78, color: '#f39c12' },
    { name: 'محافظة جنوب الباطنة', count: 15, trend: '+8%', lat: 23.12, lng: 57.34, color: '#27ae60' },
    { name: 'محافظة الداخلية', count: 12, trend: '+2%', lat: 22.89, lng: 57.45, color: '#2980b9' },
    { name: 'محافظة شمال الشرقية', count: 10, trend: '+4%', lat: 22.56, lng: 59.12, color: '#8e44ad' },
    { name: 'محافظة جنوب الشرقية', count: 8, trend: '+1%', lat: 19.23, lng: 57.34, color: '#16a085' },
    { name: 'محافظة البريمي', count: 6, trend: '+3%', lat: 24.23, lng: 56.45, color: '#d35400' },
    { name: 'محافظة الظاهرة', count: 5, trend: '+2%', lat: 23.45, lng: 56.12, color: '#7f8c8d' },
    { name: 'محافظة مسندم', count: 3, trend: '+1%', lat: 26.12, lng: 56.34, color: '#c0392b' },
    { name: 'محافظة الدقم', count: 4, trend: '+2%', lat: 19.45, lng: 54.23, color: '#e74c3c' },
  ];

  const maxCount = Math.max(...governorates.map(g => g.count));

  return `<div class="pg-head"><div><h1>التحليل الجغرافي</h1><p>تحليل توزيع البلاغات والزيارات حسب المناطق الجغرافية</p></div>
    <div class="pg-acts">
      <button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ تصدير التقرير...','i')">${ICONS.download}تصدير</button>
    </div></div>

    <div class="fg fg-2 mb12">
      <div class="card" style="grid-column:span 2">
        <div class="ph"><h3><span class="pico tl">${ICONS.map}</span>خريطة التوزيع الجغرافي - سلطنة عمان</h3></div>
        <div class="pb" style="height:500px;border-radius:var(--rsm);overflow:hidden;position:relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d732432.123456789!2d53.0!3d21.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e8e4d7c7f8e9d1f%3A0x1234567890abcdef!2sOman!5e0!3m2!1sen!2som!4v1234567890123&z=6"
            width="100%"
            height="100%"
            style="border:0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
          <div style="position:absolute;top:10px;right:10px;background:rgba(255,255,255,0.95);padding:12px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.15);max-width:280px">
            <div style="font-size:12px;font-weight:700;margin-bottom:8px;color:var(--text)">📍 المحافظات</div>
            ${governorates.map(g => `
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:11px">
                <div style="width:12px;height:12px;border-radius:50%;background:${g.color};border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.2)"></div>
                <div style="flex:1">
                  <div style="font-weight:600;color:var(--text)">${g.name}</div>
                  <div style="color:var(--text2)">${g.count} بلاغ</div>
                </div>
                <div style="font-size:10px;color:${g.trend.includes('+')?'var(--success)':'var(--danger)'};font-weight:600">${g.trend}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <div class="fg fg-2">
      <div class="card">
        <div class="ph"><h3><span class="pico bl">${ICONS.chart}</span>الإحصائيات حسب المحافظة</h3></div>
        <div class="pb">
          ${governorates.map(g => `
            <div style="margin-bottom:12px">
              <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                <span style="font-size:12px;font-weight:600;color:var(--text)">${g.name}</span>
                <span style="font-size:12px;font-weight:700;color:${g.color}">${g.count}</span>
              </div>
              <div style="height:6px;background:var(--g200);border-radius:3px;overflow:hidden">
                <div style="height:100%;width:${(g.count/maxCount)*100}%;background:${g.color};border-radius:3px"></div>
              </div>
              <div style="font-size:10px;color:${g.trend.includes('+')?'var(--success)':'var(--danger)'};margin-top:2px">${g.trend} عن الشهر الماضي</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card">
        <div class="ph"><h3><span class="pico gr">${ICONS.filter}</span>فلاتر التحليل</h3></div>
        <div class="pb">
          <div class="fg fg-2">
            <div class="fgrp"><label class="flbl">الفترة</label>
              <select class="fc">
                <option>آخر 30 يوم</option>
                <option>آخر 90 يوم</option>
                <option>آخر 6 أشهر</option>
                <option>سنة 2025</option>
              </select>
            </div>
            <div class="fgrp"><label class="flbl">النوع</label>
              <select class="fc">
                <option>الكل</option>
                <option>بلاغات</option>
                <option>زيارات</option>
                <option>تظلمات</option>
              </select>
            </div>
            <div class="fgrp"><label class="flbl">الحالة</label>
              <select class="fc">
                <option>الكل</option>
                <option>مفتوحة</option>
                <option>مغلقة</option>
                <option>قيد المراجعة</option>
              </select>
            </div>
            <div class="fgrp"><label class="flbl">الأولوية</label>
              <select class="fc">
                <option>الكل</option>
                <option>عاجل</option>
                <option>مرتفع</option>
                <option>متوسط</option>
                <option>منخفض</option>
              </select>
            </div>
          </div>
          <button class="btn btn-primary btn-sm mt8" style="width:100%">${ICONS.search} تطبيق الفلاتر</button>
        </div>
      </div>
    </div>`;
}

/* ── شاشة السجل الزمني ── */
function renderTimelineScreen(role) {
  const defaultRequestId = 'CMP-2025-0001';
  const requestId = getParam('id') || defaultRequestId;

  const findEntityTimeline = (id) => {
    const complaint = INSP_DATA.complaints.find(c => c.id === id);
    if (complaint && complaint.timeline) {
      return {
        type: 'complaint',
        id: complaint.id,
        name: complaint.type,
        timeline: complaint.timeline
      };
    }

    const visit = [...INSP_DATA.visits.periodic, ...INSP_DATA.visits.surprise, ...INSP_DATA.visits.scheduled].find(v => v.id === id);
    if (visit && visit.timeline) {
      return {
        type: 'visit',
        id: visit.id,
        name: visit.employerName,
        timeline: visit.timeline
      };
    }

    const appeal = INSP_DATA.appeals.find(a => a.id === id);
    if (appeal && appeal.timeline) {
      return {
        type: 'appeal',
        id: appeal.id,
        name: appeal.type,
        timeline: appeal.timeline
      };
    }

    return null;
  };

  const entity = findEntityTimeline(requestId);
  const timeline = entity ? entity.timeline : [];

  const entityOptions = [
    ...INSP_DATA.complaints.map(c => ({ id: c.id, name: `${c.id} — ${c.type}` })),
    ...INSP_DATA.appeals.map(a => ({ id: a.id, name: `${a.id} — ${a.type}` })),
    ...[...INSP_DATA.visits.periodic, ...INSP_DATA.visits.surprise, ...INSP_DATA.visits.scheduled].map(v => ({ id: v.id, name: `${v.id} — ${v.employerName}` }))
  ];

  return `<div class="pg-head"><div><h1>السجل الزمني</h1><p>سجل جميع الأنشطة والإجراءات على النظام</p></div>
    <div class="pg-acts">
      <button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ تصدير السجلات...','i')">${ICONS.download}تصدير</button>
    </div></div>

    <div class="card mb12">
      <div class="ph"><h3><span class="pico gr">${ICONS.filter}</span>اختيار الطلب</h3></div>
      <div class="pb">
        <div class="fg fg-3">
          <div class="fgrp">
            <label class="flbl">رقم الطلب</label>
            <select id="timeline-request-select" class="fc" onchange="updateTimelineRequest()">
              ${entityOptions.map(opt => `<option value="${opt.id}" ${opt.id === requestId ? 'selected' : ''}>${opt.name}</option>`).join('')}
            </select>
          </div>
          <div class="fgrp">
            <label class="flbl">&nbsp;</label>
            <button class="btn btn-primary" onclick="updateTimelineRequest()">${ICONS.search}عرض السجل الزمني</button>
          </div>
        </div>
      </div>
    </div>

    ${entity ? `
    <div class="card">
      <div class="ph">
        <h3><span class="pico bl">${ICONS.clock}</span>سجل الأنشطة — ${entity.id}</h3>
        <span style="font-size:11.5px;color:var(--text3)">${entity.name} • ${timeline.length} نشاط</span>
      </div>
      <div class="pb">
        ${timeline.length ? renderTimeline(timeline) : '<div class="tx3 fs11">لا توجد أنشطة مسجلة لهذا الطلب</div>'}
      </div>
    </div>` : `
    <div class="card">
      <div class="pb" style="text-align:center;padding:40px">
        <span style="font-size:48px;display:block;margin-bottom:12px">📋</span>
        <h4>لم يتم العثور على الطلب</h4>
        <p style="color:var(--text3)">الرجاء اختيار طلب صحيح من القائمة أعلاه</p>
      </div>
    </div>`}`;
}

/* ── طلبات الأمان الوظيفي ── */
function renderJobSecurityRequestsList(role) {
  const requests = INSP_DATA.jobSecurityRequests || [];
  const rows = requests.map(r => `
    <tr>
      <td><a href="#" onclick="navigateTo('job-security-request-details','id=${r.id}')" class="txp fw7">${r.id}</a></td>
      <td>${r.workerName}</td>
      <td>${r.workerCivil}</td>
      <td>${r.employerName}</td>
      <td>${statusBadge(r.status)}</td>
      <td>${r.requestDate}</td>
      <td><div class="df ac g8">
        <button class="btn btn-primary btn-xs" onclick="navigateTo('job-security-request-details','id=${r.id}')">${ICONS.eye}عرض</button>
      </div></td>
    </tr>`).join('');

  return `<div class="pg-head"><div><h1>طلبات الأمان الوظيفي</h1><p>جميع طلبات الأمان الوظيفي — ${requests.length} طلب</p></div>
    <div class="pg-acts">
      <button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ تصدير القائمة...','i')">${ICONS.download}تصدير</button>
    </div></div>
    ${_filterBar([{label:'الحالة',type:'select',opts:['الكل','قيد المراجعة','قيد المعالجة','معتمد','مرفوض']},{label:'من تاريخ',type:'date'}])}
    ${_tblWrap(['رقم الطلب','اسم العامل','الرقم المدني','المنشأة','الحالة','تاريخ الطلب','إجراء'], rows || _noData())}`;
}

function renderJobSecurityRequestDetails(role) {
  const requestId = getParam('id') || 'JSR-2025-0001';
  const request = INSP_DATA.jobSecurityRequests?.find(r => r.id === requestId) || {
    id: requestId,
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
  };

  return `<div class="pg-head"><div><h1>${request.id}</h1><p>تفاصيل طلب الأمان الوظيفي</p></div>
    <div class="pg-acts">
      <button class="btn btn-secondary btn-sm" onclick="navigateTo('job-security-requests-list')">${ICONS.arrow_right}رجوع</button>
      <button class="btn btn-primary btn-sm" onclick="showToast('جارٍ طباعة الطلب...','i')">${ICONS.download}طباعة</button>
    </div></div>

    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.file}</span>بيانات الطلب</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">رقم الطلب</label><div class="fro fw7">${request.id}</div></div>
      <div class="fgrp"><label class="flbl">تاريخ التقديم</label><div class="fro">${request.requestDate}</div></div>
      <div class="fgrp"><label class="flbl">الحالة</label><div class="fro">${statusBadge(request.status)}</div></div>
      <div class="fgrp"><label class="flbl">تاريخ الإنهاء</label><div class="fro">${request.terminationDate}</div></div>
      <div class="fgrp"><label class="flbl">سبب الإنهاء</label><div class="fro">${request.terminationReason}</div></div>
      <div class="fgrp"><label class="flbl">مدة التوظيف</label><div class="fro">${request.employmentDuration}</div></div>
    </div></div></div>

    <div class="card"><div class="ph"><h3><span class="pico rd">${ICONS.user}</span>بيانات العامل</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">الاسم</label><div class="fro fw7">${request.workerName}</div></div>
      <div class="fgrp"><label class="flbl">الرقم المدني</label><div class="fro">${request.workerCivil}</div></div>
      <div class="fgrp"><label class="flbl">الأجر الأساسي</label><div class="fro fw7">${request.salary} ر.ع / شهر</div></div>
    </div></div></div>

    <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.building}</span>بيانات المنشأة</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">اسم المنشأة</label><div class="fro fw7">${request.employerName}</div></div>
      <div class="fgrp"><label class="flbl">السجل التجاري</label><div class="fro">${request.employerCRN}</div></div>
    </div></div></div>

    <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.shield}</span>لوحة التحقق من الإنهاء</h3></div>
    <div class="pb">
      ${renderChecklist([
        { item: 'التحقق من صحة الإنهاء', done: true },
        { item: 'مراجعة عقد العمل', done: true },
        { item: 'التحقق من استحقاق المنافع', done: false },
        { item: 'مراجعة السجل الوظيفي', done: false },
        { item: 'التأكد من عدم وجود مخالفات', done: false },
      ])}
    </div></div>

    <div class="card"><div class="ph"><h3><span class="pico gr">${ICONS.chart}</span>لوحة التحليل المالي</h3></div>
    <div class="pb">
      <div class="fg fg-2">
        <div class="fgrp"><label class="flbl">إجمالي المستحقات</label><div class="fro fw7" style="color:var(--primary)">1,350 ر.ع</div></div>
        <div class="fgrp"><label class="flbl">المبالغ المدفوعة</label><div class="fro fw7" style="color:var(--success)">900 ر.ع</div></div>
        <div class="fgrp"><label class="flbl">المتبقي</label><div class="fro fw7" style="color:var(--danger)">450 ر.ع</div></div>
        <div class="fgrp"><label class="flbl">حالة الدفع</label><div class="fro"><span class="badge b-returned">غير مكتمل</span></div></div>
      </div>
    </div></div>

    ${renderNotes(request.notes, request.id)}
    ${renderTimeline(request.timeline)}`;
}

/* ── طلبات منافع دخل الأسرة ── */
function renderFamilyBenefitRequestsList(role) {
  const requests = INSP_DATA.familyBenefitRequests || [];
  const rows = requests.map(r => `
    <tr>
      <td><a href="#" onclick="navigateTo('family-benefit-request-details','id=${r.id}')" class="txp fw7">${r.id}</a></td>
      <td>${r.workerName}</td>
      <td>${r.workerCivil}</td>
      <td>${r.employerName}</td>
      <td>${statusBadge(r.status)}</td>
      <td>${r.requestDate}</td>
      <td><div class="df ac g8">
        <button class="btn btn-primary btn-xs" onclick="navigateTo('family-benefit-request-details','id=${r.id}')">${ICONS.eye}عرض</button>
      </div></td>
    </tr>`).join('');

  return `<div class="pg-head"><div><h1>طلبات منافع دخل الأسرة</h1><p>جميع طلبات منافع دخل الأسرة — ${requests.length} طلب</p></div>
    <div class="pg-acts">
      <button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ تصدير القائمة...','i')">${ICONS.download}تصدير</button>
    </div></div>
    ${_filterBar([{label:'الحالة',type:'select',opts:['الكل','قيد المراجعة','قيد المعالجة','معتمد','مرفوض']},{label:'من تاريخ',type:'date'}])}
    ${_tblWrap(['رقم الطلب','اسم العامل','الرقم المدني','المنشأة','الحالة','تاريخ الطلب','إجراء'], rows || _noData())}`;
}

function renderFamilyBenefitRequestDetails(role) {
  const requestId = getParam('id') || 'FBR-2025-0001';
  const request = INSP_DATA.familyBenefitRequests?.find(r => r.id === requestId) || {
    id: requestId,
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
  };

  return `<div class="pg-head"><div><h1>${request.id}</h1><p>تفاصيل طلب منافع دخل الأسرة</p></div>
    <div class="pg-acts">
      <button class="btn btn-secondary btn-sm" onclick="navigateTo('family-benefit-requests-list')">${ICONS.arrow_right}رجوع</button>
      <button class="btn btn-primary btn-sm" onclick="showToast('جارٍ طباعة الطلب...','i')">${ICONS.download}طباعة</button>
    </div></div>

    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.file}</span>بيانات الطلب</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">رقم الطلب</label><div class="fro fw7">${request.id}</div></div>
      <div class="fgrp"><label class="flbl">تاريخ التقديم</label><div class="fro">${request.requestDate}</div></div>
      <div class="fgrp"><label class="flbl">الحالة</label><div class="fro">${statusBadge(request.status)}</div></div>
      <div class="fgrp"><label class="flbl">نوع المنفعة</label><div class="fro">${request.benefitType}</div></div>
      <div class="fgrp"><label class="flbl">عدد أفراد الأسرة</label><div class="fro fw7">${request.familyMembers} أفراد</div></div>
      <div class="fgrp"><label class="flbl">مدة التوظيف</label><div class="fro">${request.employmentDuration}</div></div>
    </div></div></div>

    <div class="card"><div class="ph"><h3><span class="pico rd">${ICONS.user}</span>بيانات العامل</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">الاسم</label><div class="fro fw7">${request.workerName}</div></div>
      <div class="fgrp"><label class="flbl">الرقم المدني</label><div class="fro">${request.workerCivil}</div></div>
      <div class="fgrp"><label class="flbl">الدخل الشهري</label><div class="fro fw7">${request.monthlyIncome} ر.ع / شهر</div></div>
    </div></div></div>

    <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.building}</span>بيانات المنشأة</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">اسم المنشأة</label><div class="fro fw7">${request.employerName}</div></div>
      <div class="fgrp"><label class="flbl">السجل التجاري</label><div class="fro">${request.employerCRN}</div></div>
    </div></div></div>

    <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.shield}</span>لوحة التحقق من الأهلية</h3></div>
    <div class="pb">
      ${renderChecklist([
        { item: 'التحقق من حالة التوظيف', done: true },
        { item: 'مراجعة عدد أفراد الأسرة', done: true },
        { item: 'التحقق من الدخل الشهري', done: false },
        { item: 'مراجعة السجل الوظيفي', done: false },
        { item: 'التأكد من عدم وجود مخالفات', done: false },
      ])}
    </div></div>

    <div class="card"><div class="ph"><h3><span class="pico gr">${ICONS.chart}</span>لوحة التحليل المالي</h3></div>
    <div class="pb">
      <div class="fg fg-2">
        <div class="fgrp"><label class="flbl">إجمالي المستحقات</label><div class="fro fw7" style="color:var(--primary)">1,750 ر.ع</div></div>
        <div class="fgrp"><label class="flbl">المبالغ المدفوعة</label><div class="fro fw7" style="color:var(--success)">1,200 ر.ع</div></div>
        <div class="fgrp"><label class="flbl">المتبقي</label><div class="fro fw7" style="color:var(--danger)">550 ر.ع</div></div>
        <div class="fgrp"><label class="flbl">حالة الدفع</label><div class="fro"><span class="badge b-returned">غير مكتمل</span></div></div>
      </div>
    </div></div>

    ${renderNotes(request.notes, request.timeline)}
    ${renderTimeline(request.timeline)}`;
}

/* ── طلبات إجازة الأمومة ── */
function renderMaternityLeaveRequestsList(role) {
  const requests = INSP_DATA.maternityLeaveRequests || [];
  const rows = requests.map(r => `
    <tr>
      <td><a href="#" onclick="navigateTo('maternity-leave-request-details','id=${r.id}')" class="txp fw7">${r.id}</a></td>
      <td>${r.workerName}</td>
      <td>${r.workerCivil}</td>
      <td>${r.employerName}</td>
      <td>${statusBadge(r.status)}</td>
      <td>${r.requestDate}</td>
      <td><div class="df ac g8">
        <button class="btn btn-primary btn-xs" onclick="navigateTo('maternity-leave-request-details','id=${r.id}')">${ICONS.eye}عرض</button>
      </div></td>
    </tr>`).join('');

  return `<div class="pg-head"><div><h1>طلبات إجازة الأمومة</h1><p>جميع طلبات إجازة الأمومة — ${requests.length} طلب</p></div>
    <div class="pg-acts">
      <button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ تصدير القائمة...','i')">${ICONS.download}تصدير</button>
    </div></div>
    ${_filterBar([{label:'الحالة',type:'select',opts:['الكل','قيد المراجعة','قيد المعالجة','معتمد','مرفوض']},{label:'من تاريخ',type:'date'}])}
    ${_tblWrap(['رقم الطلب','اسم العامل','الرقم المدني','المنشأة','الحالة','تاريخ الطلب','إجراء'], rows || _noData())}`;
}

function renderMaternityLeaveRequestDetails(role) {
  const requestId = getParam('id') || 'MLR-2025-0001';
  const request = INSP_DATA.maternityLeaveRequests?.find(r => r.id === requestId) || {
    id: requestId,
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
  };

  return `<div class="pg-head"><div><h1>${request.id}</h1><p>تفاصيل طلب إجازة الأمومة</p></div>
    <div class="pg-acts">
      <button class="btn btn-secondary btn-sm" onclick="navigateTo('maternity-leave-requests-list')">${ICONS.arrow_right}رجوع</button>
      <button class="btn btn-primary btn-sm" onclick="showToast('جارٍ طباعة الطلب...','i')">${ICONS.download}طباعة</button>
    </div></div>

    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.file}</span>بيانات الطلب</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">رقم الطلب</label><div class="fro fw7">${request.id}</div></div>
      <div class="fgrp"><label class="flbl">تاريخ التقديم</label><div class="fro">${request.requestDate}</div></div>
      <div class="fgrp"><label class="flbl">الحالة</label><div class="fro">${statusBadge(request.status)}</div></div>
      <div class="fgrp"><label class="flbl">نوع الإجازة</label><div class="fro">${request.leaveType}</div></div>
      <div class="fgrp"><label class="flbl">تاريخ الولادة المتوقع</label><div class="fro">${request.expectedDeliveryDate}</div></div>
      <div class="fgrp"><label class="flbl">مدة الإجازة</label><div class="fro fw7">${request.leaveDuration}</div></div>
    </div></div></div>

    <div class="card"><div class="ph"><h3><span class="pico rd">${ICONS.user}</span>بيانات العامل</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">الاسم</label><div class="fro fw7">${request.workerName}</div></div>
      <div class="fgrp"><label class="flbl">الرقم المدني</label><div class="fro">${request.workerCivil}</div></div>
      <div class="fgrp"><label class="flbl">الراتب الشهري</label><div class="fro fw7">${request.monthlySalary} ر.ع / شهر</div></div>
    </div></div></div>

    <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.building}</span>بيانات المنشأة</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">اسم المنشأة</label><div class="fro fw7">${request.employerName}</div></div>
      <div class="fgrp"><label class="flbl">السجل التجاري</label><div class="fro">${request.employerCRN}</div></div>
    </div></div></div>

    <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.shield}</span>لوحة التحقق من الأهلية</h3></div>
    <div class="pb">
      ${renderChecklist([
        { item: 'التحقق من فترة التأمين', done: true },
        { item: 'مراجعة تاريخ بداية الإجازة', done: true },
        { item: 'التحقق من الوثائق الطبية', done: false },
        { item: 'مراجعة السجل الوظيفي', done: false },
        { item: 'التأكد من عدم وجود مخالفات', done: false },
      ])}
    </div></div>

    <div class="card"><div class="ph"><h3><span class="pico gr">${ICONS.chart}</span>لوحة التحليل المالي</h3></div>
    <div class="pb">
      <div class="fg fg-2">
        <div class="fgrp"><label class="flbl">إجمالي المستحقات</label><div class="fro fw7" style="color:var(--primary)">1,372 ر.ع</div></div>
        <div class="fgrp"><label class="flbl">المبالغ المدفوعة</label><div class="fro fw7" style="color:var(--success)">840 ر.ع</div></div>
        <div class="fgrp"><label class="flbl">المتبقي</label><div class="fro fw7" style="color:var(--danger)">532 ر.ع</div></div>
        <div class="fgrp"><label class="flbl">حالة الدفع</label><div class="fro"><span class="badge b-returned">غير مكتمل</span></div></div>
      </div>
    </div></div>

    ${renderNotes(request.notes, request.timeline)}
    ${renderTimeline(request.timeline)}`;
}

/* ── الشركات المتوقفة عن السداد ── */
function renderNonPaymentCompaniesList(role) {
  const companies = INSP_DATA.nonPaymentCompanies || [];
  const rows = companies.map(c => `
    <tr>
      <td><a href="#" onclick="navigateTo('non-payment-company-details','id=${c.id}')" class="txp fw7">${c.id}</a></td>
      <td>${c.companyName}</td>
      <td>${c.crn}</td>
      <td>${c.region}</td>
      <td>${statusBadge(c.status)}</td>
      <td>${c.arrearsAmount} ر.ع</td>
      <td><div class="df ac g8">
        <button class="btn btn-primary btn-xs" onclick="navigateTo('non-payment-company-details','id=${c.id}')">${ICONS.eye}عرض</button>
      </div></td>
    </tr>`).join('');

  return `<div class="pg-head"><div><h1>الشركات المتوقفة عن السداد</h1><p>جميع الشركات المتوقفة عن السداد — ${companies.length} شركة</p></div>
    <div class="pg-acts">
      <button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ تصدير القائمة...','i')">${ICONS.download}تصدير</button>
    </div></div>
    ${_filterBar([{label:'الحالة',type:'select',opts:['الكل','قيد المراجعة','قيد المعالجة','معتمد','مرفوض']},{label:'المنطقة',type:'select',opts:['الكل','مسقط','شمال الباطنة','ظفار','الداخلية']}])}
    ${_tblWrap(['رقم الشركة','اسم الشركة','السجل التجاري','المنطقة','الحالة','المتأخرات','إجراء'], rows || _noData())}`;
}

function renderNonPaymentCompanyDetails(role) {
  const companyId = getParam('id') || 'NPC-2025-0001';
  const company = INSP_DATA.nonPaymentCompanies?.find(c => c.id === companyId) || {
    id: companyId,
    status: 'قيد المراجعة',
    companyName: 'شركة المقاولات المتقدمة',
    crn: '1012345681',
    region: 'مسقط',
    arrearsAmount: 15000,
    arrearsPeriod: '6 أشهر',
    employeeCount: 45,
    lastPaymentDate: '2024-07-15',
  };

  return `<div class="pg-head"><div><h1>${company.id}</h1><p>تفاصيل الشركة المتوقفة عن السداد</p></div>
    <div class="pg-acts">
      <button class="btn btn-secondary btn-sm" onclick="navigateTo('non-payment-companies-list')">${ICONS.arrow_right}رجوع</button>
      <button class="btn btn-primary btn-sm" onclick="showToast('جارٍ طباعة التقرير...','i')">${ICONS.download}طباعة</button>
    </div></div>

    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.file}</span>بيانات الشركة</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">رقم الشركة</label><div class="fro fw7">${company.id}</div></div>
      <div class="fgrp"><label class="flbl">اسم الشركة</label><div class="fro fw7">${company.companyName}</div></div>
      <div class="fgrp"><label class="flbl">السجل التجاري</label><div class="fro">${company.crn}</div></div>
      <div class="fgrp"><label class="flbl">المنطقة</label><div class="fro">${company.region}</div></div>
      <div class="fgrp"><label class="flbl">عدد الموظفين</label><div class="fro fw7">${company.employeeCount} موظف</div></div>
      <div class="fgrp"><label class="flbl">آخر دفع</label><div class="fro">${company.lastPaymentDate}</div></div>
    </div></div></div>

    <div class="card"><div class="ph"><h3><span class="pico rd">${ICONS.alert}</span>بيانات المتأخرات</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">إجمالي المتأخرات</label><div class="fro fw7" style="color:var(--danger)">${company.arrearsAmount.toLocaleString()} ر.ع</div></div>
      <div class="fgrp"><label class="flbl">فترة التأخير</label><div class="fro fw7">${company.arrearsPeriod}</div></div>
      <div class="fgrp"><label class="flbl">الحالة</label><div class="fro">${statusBadge(company.status)}</div></div>
      <div class="fgrp"><label class="flbl">مستوى الخطورة</label><div class="fro"><span class="badge b-high">مرتفع</span></div></div>
    </div></div></div>

    <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.shield}</span>لوحة التحقق من المخالفات</h3></div>
    <div class="pb">
      ${renderChecklist([
        { item: 'التحقق من سجل الدفعات', done: true },
        { item: 'مراجعة عدد الموظفين', done: true },
        { item: 'التحقق من الإشعارات المرسلة', done: false },
        { item: 'مراجعة السجل القانوني', done: false },
        { item: 'التأكد من عدم وجود نزاعات', done: false },
      ])}
    </div></div>

    <div class="card"><div class="ph"><h3><span class="pico gr">${ICONS.chart}</span>لوحة التحليل المالي</h3></div>
    <div class="pb">
      <div class="fg fg-2">
        <div class="fgrp"><label class="flbl">إجمالي المستحقات</label><div class="fro fw7" style="color:var(--primary)">18,000 ر.ع</div></div>
        <div class="fgrp"><label class="flbl">المبالغ المدفوعة</label><div class="fro fw7" style="color:var(--success)">3,000 ر.ع</div></div>
        <div class="fgrp"><label class="flbl">المتبقي</label><div class="fro fw7" style="color:var(--danger)">15,000 ر.ع</div></div>
        <div class="fgrp"><label class="flbl">حالة الدفع</label><div class="fro"><span class="badge b-returned">غير مكتمل</span></div></div>
      </div>
    </div></div>

    ${renderNotes(company.notes, company.timeline)}
    ${renderTimeline(company.timeline)}`;
}

/* ── التصفية والإفلاس ── */
function renderLiquidationBankruptcyList(role) {
  const cases = INSP_DATA.liquidationBankruptcy || [];
  const rows = cases.map(c => `
    <tr>
      <td><a href="#" onclick="navigateTo('liquidation-bankruptcy-details','id=${c.id}')" class="txp fw7">${c.id}</a></td>
      <td>${c.companyName}</td>
      <td>${c.crn}</td>
      <td>${c.region}</td>
      <td>${statusBadge(c.status)}</td>
      <td>${c.caseType}</td>
      <td><div class="df ac g8">
        <button class="btn btn-primary btn-xs" onclick="navigateTo('liquidation-bankruptcy-details','id=${c.id}')">${ICONS.eye}عرض</button>
      </div></td>
    </tr>`).join('');

  return `<div class="pg-head"><div><h1>حالات التصفية والإفلاس</h1><p>جميع حالات التصفية والإفلاس — ${cases.length} حالة</p></div>
    <div class="pg-acts">
      <button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ تصدير القائمة...','i')">${ICONS.download}تصدير</button>
    </div></div>
    ${_filterBar([{label:'الحالة',type:'select',opts:['الكل','قيد المراجعة','قيد المعالجة','معتمد','مرفوض']},{label:'نوع الحالة',type:'select',opts:['الكل','تصفية','إفلاس']}])}
    ${_tblWrap(['رقم الحالة','اسم الشركة','السجل التجاري','المنطقة','الحالة','النوع','إجراء'], rows || _noData())}`;
}

function renderLiquidationBankruptcyDetails(role) {
  const caseId = getParam('id') || 'LB-2025-0001';
  const caseData = INSP_DATA.liquidationBankruptcy?.find(c => c.id === caseId) || {
    id: caseId,
    status: 'قيد المراجعة',
    companyName: 'شركة التجارة العامة',
    crn: '1012345682',
    region: 'شمال الباطنة',
    caseType: 'تصفية',
    filingDate: '2025-01-10',
    employeeCount: 30,
    totalAssets: 250000,
    totalLiabilities: 320000,
  };

  return `<div class="pg-head"><div><h1>${caseData.id}</h1><p>تفاصيل حالة التصفية والإفلاس</p></div>
    <div class="pg-acts">
      <button class="btn btn-secondary btn-sm" onclick="navigateTo('liquidation-bankruptcy-list')">${ICONS.arrow_right}رجوع</button>
      <button class="btn btn-primary btn-sm" onclick="showToast('جارٍ طباعة التقرير...','i')">${ICONS.download}طباعة</button>
    </div></div>

    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.file}</span>بيانات الحالة</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">رقم الحالة</label><div class="fro fw7">${caseData.id}</div></div>
      <div class="fgrp"><label class="flbl">اسم الشركة</label><div class="fro fw7">${caseData.companyName}</div></div>
      <div class="fgrp"><label class="flbl">السجل التجاري</label><div class="fro">${caseData.crn}</div></div>
      <div class="fgrp"><label class="flbl">المنطقة</label><div class="fro">${caseData.region}</div></div>
      <div class="fgrp"><label class="flbl">نوع الحالة</label><div class="fro fw7">${caseData.caseType}</div></div>
      <div class="fgrp"><label class="flbl">تاريخ التسجيل</label><div class="fro">${caseData.filingDate}</div></div>
    </div></div></div>

    <div class="card"><div class="ph"><h3><span class="pico rd">${ICONS.alert}</span>الوضع المالي</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">إجمالي الأصول</label><div class="fro fw7" style="color:var(--success)">${caseData.totalAssets.toLocaleString()} ر.ع</div></div>
      <div class="fgrp"><label class="flbl">إجمالي الالتزامات</label><div class="fro fw7" style="color:var(--danger)">${caseData.totalLiabilities.toLocaleString()} ر.ع</div></div>
      <div class="fgrp"><label class="flbl">عدد الموظفين</label><div class="fro fw7">${caseData.employeeCount} موظف</div></div>
      <div class="fgrp"><label class="flbl">الحالة</label><div class="fro">${statusBadge(caseData.status)}</div></div>
    </div></div></div>

    <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.shield}</span>لوحة التحقق من الإجراءات</h3></div>
    <div class="pb">
      ${renderChecklist([
        { item: 'التحقق من الوثائق القانونية', done: true },
        { item: 'مراجعة الأصول والالتزامات', done: true },
        { item: 'التحقق من حقوق الموظفين', done: false },
        { item: 'مراجعة السجل القانوني', done: false },
        { item: 'التأكد من عدم وجود نزاعات', done: false },
      ])}
    </div></div>

    <div class="card"><div class="ph"><h3><span class="pico gr">${ICONS.chart}</span>لوحة التحليل المالي</h3></div>
    <div class="pb">
      <div class="fg fg-2">
        <div class="fgrp"><label class="flbl">صافي الأصول</label><div class="fro fw7" style="color:var(--danger)">-70,000 ر.ع</div></div>
        <div class="fgrp"><label class="flbl">نسبة التغطية</label><div class="fro fw7">78%</div></div>
        <div class="fgrp"><label class="flbl">المبالغ المحصلة</label><div class="fro fw7" style="color:var(--success)">150,000 ر.ع</div></div>
        <div class="fgrp"><label class="flbl">حالة التسوية</label><div class="fro"><span class="badge b-returned">قيد المعالجة</span></div></div>
      </div>
    </div></div>

    ${renderNotes(caseData.notes, caseData.timeline)}
    ${renderTimeline(caseData.timeline)}`;
}
