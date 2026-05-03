/* ================================================================
   components.js — دوال العرض المشتركة لجميع الأدوار
   نظام إدارة التفتيش — صندوق الحماية الاجتماعية
   ================================================================ */

/* ── استلام البلاغ وكشف البيانات (global — must not be injected via innerHTML) ── */
function _receiveComplaint(btn, id) {
  var row = btn.closest('tr');
  if (!row) return;
  var c = (INSP_DATA.complaints || []).find(function (x) { return x.id === id; });
  /* reveal complaint ID */
  var idCell = row.cells[0];
  if (idCell) idCell.innerHTML = '<a href="#" onclick="navigateTo(\'complaint-details\',\'id=' + id + '\')" class="txp fw7">' + id + '</a>';
  /* reveal employer name */
  var empCell = row.cells[3];
  if (empCell && c) empCell.textContent = c.employerName || '—';
  /* reveal submitter name */
  var subCell = row.cells[2];
  if (subCell && c) subCell.textContent = c.submittedByName || '—';
  row.classList.remove('masked-row');
  btn.disabled = true;
  btn.textContent = '...';
  showToast('تم استلام البلاغ — جارٍ الانتقال لصفحة التفاصيل', 's');
  setTimeout(function () { navigateTo('complaint-details', 'id=' + id); }, 1200);
}

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
  return `<div class="filters unified-filter-panel"><div class="fgrid unified-filter-row" style="grid-template-columns:repeat(${fields.length},minmax(0,1fr))">${inputs}</div>
  <div class="facts"><button class="btn btn-primary btn-sm">${ICONS.search}بحث</button><button class="btn btn-secondary btn-sm">إعادة تعيين</button></div></div>`;
}
function _tblWrap(headers, rows) {
  const ths = headers.map(h => `<th>${h}</th>`).join('');
  return `<div class="card mb0"><div class="tbl-wrap"><table class="dtbl"><thead><tr>${ths}</tr></thead><tbody>${rows}</tbody></table></div></div>`;
}
function _noData() {
  return `<div class="empty-st">${ICONS.inbox}<h4>لا توجد سجلات</h4><p>لم يتم العثور على بيانات تطابق معايير البحث</p></div>`;
}

/* ── Tab view helpers ── */
function _tabView(tabId, tabs, defaultIdx) {
  if (!defaultIdx) defaultIdx = 0;
  const nav = tabs.map((t, i) => {
    const badge = t.badge ? `<span class="tab-badge">${t.badge}</span>` : '';
    return `<button class="dtab-btn${i === defaultIdx ? ' active' : ''}" onclick="_switchTab('${tabId}',${i},this)">${t.label}${badge}</button>`;
  }).join('');
  const panes = tabs.map((t, i) =>
    `<div class="dtab-pane${i === defaultIdx ? ' active' : ''}" id="${tabId}-${i}">${t.content}</div>`
  ).join('');
  return `<div class="dtabs" id="${tabId}"><div class="dtabs-nav">${nav}</div>${panes}</div>`;
}
function _switchTab(tabId, idx, btn) {
  const el = document.getElementById(tabId);
  if (!el) return;
  el.querySelectorAll('.dtab-btn').forEach((b, i) => b.classList.toggle('active', i === idx));
  el.querySelectorAll('.dtab-pane').forEach((p, i) => p.classList.toggle('active', i === idx));
}
function _summaryBar(items) {
  const cells = items.map(([label, val]) =>
    `<div class="dsb-item"><span class="dsb-label">${label}</span><div class="dsb-val">${val}</div></div>`
  ).join('');
  return `<div class="dsb">${cells}</div>`;
}
function _sampleAttachment(name, date, size, type) {
  return {
    name: name || 'مرفق داعم.pdf',
    date: date || '2025-01-22',
    size: size || '420 KB',
    type: type || 'pdf'
  };
}
function _withSampleAttachments(item, context) {
  if (item && Array.isArray(item.attachments) && item.attachments.length) return item.attachments;
  const labelMap = {
    complaint: 'مرفق البلاغ',
    appeal: 'مرفق التظلم',
    visit: 'مرفق الزيارة',
    ban: 'مرفق قرار الحظر',
    report: 'مرفق التقرير',
    plan: 'مرفق خطة التفتيش'
  };
  const label = labelMap[context] || 'مرفق داعم';
  const id = item && item.id ? item.id : 'SAMPLE';
  return [
    _sampleAttachment(`${label} — ${id}.pdf`, (item && (item.submitDate || item.issuedDate || item.createdDate || item.scheduledDate || item.date)) || '2025-01-22', '540 KB', 'pdf'),
    _sampleAttachment(`مستندات مساندة — ${id}.zip`, (item && (item.submitDate || item.issuedDate || item.createdDate || item.scheduledDate || item.date)) || '2025-01-22', '1.3 MB', 'oth')
  ];
}
function _withSampleNotes(item, context) {
  if (item && Array.isArray(item.notes) && item.notes.length) return item.notes;
  if (item && typeof item.notes === 'string' && item.notes.trim()) return item.notes;
  const roleMap = {
    complaint: 'monitoring-employee',
    appeal: 'monitoring-head',
    visit: 'field-inspector',
    ban: 'inspection-director',
    report: 'ops-analyst',
    plan: 'ops-analyst'
  };
  const authorMap = {
    complaint: 'سيف خلفان الأمري',
    appeal: 'نجلاء عبدالله القاسمي',
    visit: 'حاتم سالم الزدجالي',
    ban: 'عبدالعزيز هلال الراشدي',
    report: 'شيماء وليد البريكي',
    plan: 'شيماء وليد البريكي'
  };
  const textMap = {
    complaint: 'تم استكمال ملف البلاغ بعينة توضيحية من المرفقات والملاحظات لضمان جاهزية العرض والمراجعة خلال الجلسة.',
    appeal: 'تم تجهيز ملف التظلم بعناصر دعم توضيحية حتى تظهر جميع الأقسام مكتملة أثناء العرض.',
    visit: 'تم تدوين ملاحظة تشغيلية نموذجية لضمان ظهور مسار الزيارة والمحضر والمرفقات بشكل مكتمل لرئيس القسم.',
    ban: 'تم استكمال ملف حالة الحظر بملاحظة إيضاحية تدعم العرض الرقابي أثناء الاجتماع.',
    report: 'تم تجهيز هذا التقرير ببيانات ومرفقات توضيحية ليظهر بشكل مكتمل في النماذج الاستعراضية.',
    plan: 'تمت إضافة ملاحظة تشغيلية توضح أساس الخطة وحالة المتابعة لضمان وضوح العرض.'
  };
  return [{
    text: textMap[context] || 'تمت إضافة ملاحظة نموذجية لأغراض العرض.',
    author: authorMap[context] || 'النظام',
    date: (item && (item.submitDate || item.issuedDate || item.createdDate || item.scheduledDate || item.date)) || '2025-01-22',
    role: roleMap[context] || 'system'
  }];
}
function _buildVisitReport(v, typeLabel) {
  const visitDate = v.actualDate || v.scheduledDate || '2025-01-22';
  const visitLocation = v.visitLocation || null;
  const metPeople = v.metPeople || [];
  const violations = v.findings && v.findings.violations && v.findings.violations.length
    ? v.findings.violations
    : ['لا توجد مخالفات نهائية مسجلة بعد، والزيارة ما زالت ضمن المسار التشغيلي الجاري.'];
  const correctiveActions = v.findings && v.findings.correctiveActions && v.findings.correctiveActions.length
    ? v.findings.correctiveActions
    : ['استكمال الزيارة وفق الموعد المعتمد ورفع المحضر مع الأدلة والمستندات الداعمة.'];
  const statusSummary = v.findings && v.findings.summary
    ? v.findings.summary
    : (v.status === 'مجدولة'
      ? 'الزيارة مجدولة، وتم تجهيز ملفها الاستباقي بالمستندات المرجعية ونقاط الفحص المطلوبة.'
      : 'تم تجهيز محضر نموذجي واضح للعرض والمراجعة حتى قبل اكتمال دورة الاعتماد.');
  return {
    submittedBy: v.inspectorName || 'حاتم سالم الزدجالي',
    submittedDate: visitDate,
    visitEvaluation: v.findings ? 'مرتفعة الأهمية وتستوجب متابعة تنفيذية' : 'جاهزة للتنفيذ مع ملف تحضيري مكتمل',
    complaintImpact: v.reason ? 'مرتبطة مباشرة ببلاغ أو مؤشر رقابي ذي أثر على الامتثال وحقوق المؤمن عليهم.' : 'أثرها رقابي استباقي على الامتثال والجاهزية.',
    visitLocation,
    metPeople,
    summary: statusSummary,
    fieldNarrative: v.findings
      ? 'وثق المفتش الميداني المشاهدات، وقارنها مع السجلات، وأثبت الفجوات مع توصية بالإجراء التالي.'
      : 'تم تجهيز نطاق الزيارة ونقاط المراجعة والسجلات المطلوب طلبها من المنشأة قبل التنفيذ.',
    attendees: [
      v.inspectorName || 'حاتم سالم الزدجالي',
      'ممثل المنشأة / الموارد البشرية',
      'مشرف الموقع أو المسؤول التشغيلي'
    ],
    evidencePoints: [
      'مطابقة السجلات المقدمة مع حالة الاشتراكات والبلاغات المرتبطة.',
      'توثيق صور ومستندات داعمة وإثباتات ميدانية ضمن ملف الزيارة.',
      'ربط النتيجة بالتصحيح المطلوب أو القرار الرقابي التالي.'
    ],
    violations,
    correctiveActions,
    reviewChecklist: [
      'وضوح وصف الوقائع وزمن الزيارة ومكانها.',
      'وجود أدلة ومرفقات تدعم النتيجة الميدانية.',
      'ربط المخالفات بالإجراء التصحيحي أو القرار المقترح.',
      'جاهزية المحضر للرفع أو الإعادة أو الاعتماد.'
    ],
    attachments: _withSampleAttachments({
      id: v.id,
      scheduledDate: visitDate,
      attachments: v.report && v.report.attachments
    }, 'visit'),
    notes: _withSampleNotes({
      id: v.id,
      scheduledDate: visitDate,
      notes: v.report && v.report.notes
    }, 'visit')
  };
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
          ${[['قيد الدراسة', 2, 60], ['بانتظار اعتماد', 1, 30], ['مجدولة زيارة', 1, 30], ['مغلقة', 2, 60]].map(([l, v, pct]) =>
    `<div class="chart-bar-row"><div class="chart-bar-meta"><span>${l}</span><strong>${v}</strong></div>
            <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${pct}%;background:var(--primary)"></div></div></div>`).join('')}
        </div>
      </div>
      <div class="chart-card">
        <div class="chart-head"><h3>الزيارات حسب النوع</h3><span>2025</span></div>
        <div class="chart-bars">
          ${[['دورية', 3, 60], ['مفاجئة', 2, 40], ['مجدولة', 2, 40]].map(([l, v, pct]) =>
      `<div class="chart-bar-row"><div class="chart-bar-meta"><span>${l}</span><strong>${v}</strong></div>
            <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${pct}%;background:var(--accent)"></div></div></div>`).join('')}
        </div>
      </div>
      <div class="chart-card">
        <div class="chart-head"><h3>درجات الامتثال</h3><span>المنشآت</span></div>
        <div class="chart-bars">
          ${INSP_DATA.employers.map(e =>
        `<div class="chart-bar-row"><div class="chart-bar-meta"><span>${e.name.split(' ').slice(0, 2).join(' ')}</span><strong>${e.complianceScore}%</strong></div>
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
     <td>${c.submitDate || '—'}</td>
     <td><button class="btn btn-primary btn-xs" onclick="navigateTo('complaint-details','id=${c.id}')">عرض</button></td></tr>`).join('');
  return `<div class="card dashboard-current-work"><div class="ph"><h3>${ICONS.inbox} آخر البلاغات</h3></div>
    <div class="tbl-wrap"><table class="dtbl"><thead><tr><th>الرقم</th><th>النوع</th><th>الحالة</th><th>تاريخ تقديم الطلب</th><th>إجراء</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;
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

  /* ── Masking roles: internal staff who process requests ── */
  const maskingRoles = ['monitoring-employee', 'monitoring-head', 'field-inspector', 'field-head', 'inspection-director', 'ops-analyst'];
  const applyMasking = !isExt && maskingRoles.includes(role);

  /* Determine masking level for a complaint from current role's perspective:
     'none'    → fully visible (assigned to me / I own it)
     'partial' → assigned to someone else (see type/status/date, no personal info)
     'full'    → unassigned / pending checkout (all sensitive fields hidden)            */
  function maskLevel(c) {
    if (!applyMasking) return 'none';
    const isUnassigned = !c.assignedTo && !c.assignedInspector && !c.checkedOutBy;
    const isPendingAssign = c.status === 'بانتظار تعيين' || isUnassigned;

    /* check if assigned to me */
    const myName = currentProfile.name || '';
    const assignedToMe = (c.assignedTo && myName && c.assignedTo === myName)
      || (c.assignedInspector && myName && c.assignedInspector === myName)
      || (c.checkedOutBy && myName && c.checkedOutBy === myName);

    if (assignedToMe) return 'none';

    /* supervisor/director roles see all fully if they are in their department */
    if (role === 'monitoring-head' || role === 'field-head' || role === 'inspection-director') return 'none';

    if (isPendingAssign) return 'full';
    return 'partial';
  }

  /* Masked text helper */
  function maskedText(level, text, fullOnly) {
    if (level === 'none') return text || '—';
    if (level === 'full') return `<span class="masked-field">${ICONS.lock}<span class="masked-dots">••••••••</span></span>`;
    /* partial */
    if (fullOnly) return `<span class="masked-field masked-partial">${ICONS.lock}<span class="masked-dots">مخفي</span></span>`;
    return text || '—';
  }

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

    /* Internal roles see all, but masking applies in the row generation */
    return true;
  }

  const filters = _filterBar(isExt ? [
    { label: 'رقم البلاغ', ph: 'YYYY-01-...' },
    { label: 'نوع البلاغ', type: 'select', opts: ['شكوى عدم التسجيل', 'شكوى عدم صحة الأجر', 'أخرى'] },
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

  const TODAY_STR = '2025-01-22';
  function _slaCell(c, isExternal) {
    if (!c.dueDate || c.status.includes('إغلاق') || c.status.includes('قرار') || c.status.includes('حفظ') || c.status.includes('رفض')) {
      return '<td>—</td>';
    }
    const remaining = Math.ceil((new Date(c.dueDate) - new Date(TODAY_STR)) / 86400000);
    let badge, label;
    if (remaining > 3) {
      badge = 'b-approved'; label = `${remaining} يوم متبقي`;
    } else if (remaining >= 0) {
      badge = 'b-session'; label = `${remaining} أيام — قريب`;
    } else {
      badge = 'b-high'; label = `متأخر ${Math.abs(remaining)} يوم`;
    }
    const escalateBtn = isExternal && remaining < 0
      ? `<br><button class="btn btn-xs btn-warning" style="margin-top:4px" onclick="showToast('تم إرسال طلب التصعيد بنجاح','s')">${ICONS.escalate}تصعيد</button>`
      : '';
    return `<td><span class="badge ${badge}" style="font-size:11px">${label}</span>${escalateBtn}</td>`;
  }

  const rows = data.map(c => {
    const ml = maskLevel(c);
    const isMasked = ml !== 'none';
    const isFullMask = ml === 'full';

    /* Checkout button for unassigned requests in masking roles */
    const checkoutBtn = applyMasking && isFullMask
      ? `<button class="btn btn-accent btn-xs masked-checkout-btn" onclick="showToast('تم استلام البلاغ بنجاح — تم فك تشفير البيانات لهذا الطلب','s'); this.parentElement.innerHTML='<span class=\'badge b-approved\'>تم الاستلام</span>'">${ICONS.unlock}استلام</button>`
      : (role === 'monitoring-employee' && c.status === 'تم تقديم البلاغ' && !c.checkedOutBy
        ? `<button class="btn btn-accent btn-xs" onclick="showToast('تم عمل checkout على البلاغ','s')">${ICONS.unlock}Checkout</button>`
        : '');

    /* Row class */
    const rowClass = isFullMask ? 'masked-row' : (ml === 'partial' ? 'masked-row-partial' : '');

    const extraCols = isExt ? '' : `<td>${ml === 'none' ? (c.assignedTo || '<span class="tx3">غير معين</span>') : maskedText(ml, c.assignedTo, true)}</td>`;

    const idCell = isFullMask
      ? `<span class="masked-field">${ICONS.lock}<span class="masked-dots">••••••••</span></span>`
      : `<a href="#" onclick="navigateTo('complaint-details','id=${c.id}')" class="txp fw7">${c.id}</a>`;

    return `<tr class="${rowClass}">
      <td>${idCell}</td>
      <td>${c.type}</td>
      ${isExt ? '' : `<td>${maskedText(ml, c.submittedByName, true)}</td>`}
      <td>${maskedText(ml, c.employerName, false)}</td>
      <td>${statusBadge(c.status)}</td>
      ${isExt ? '' : `<td><span class="badge ${_priClass(c.priority)}">${c.priority}</span></td>`}
      ${extraCols}
      <td>${c.submitDate || '—'}</td>
      ${isFullMask ? '<td>—</td>' : _slaCell(c, isExt)}
      <td><div class="df ac g8">
        ${isMasked && isFullMask
        ? `<button class="btn btn-accent btn-xs masked-checkout-btn" onclick="_receiveComplaint(this,'${c.id}')">${ICONS.unlock}استلام</button>`
        : `<button class="btn btn-primary btn-xs" onclick="navigateTo('complaint-details','id=${c.id}')">${ICONS.eye}عرض</button>${checkoutBtn}`
      }
      </div></td>
    </tr>`;
  }).join('');

  const headers = isExt
    ? ['رقم البلاغ', 'النوع', 'المنشأة', 'الحالة', 'تاريخ تقديم الطلب', 'الأيام المتبقية / SLA', 'إجراء']
    : ['رقم البلاغ', 'النوع', 'مقدم البلاغ', 'المنشأة', 'الحالة', 'الأولوية', 'الموظف المختص', 'تاريخ تقديم الطلب', 'الأيام المتبقية / SLA', 'إجراء'];

  /* Masking legend banner for internal roles */
  const maskBanner = applyMasking ? `
    <div class="mask-legend-banner">
      <div class="mask-legend-icon">${ICONS.shield}</div>
      <div class="mask-legend-body">
        <div class="mask-legend-title">حماية البيانات وشفافية التوزيع</div>
        <div class="mask-legend-desc">لضمان عدالة توزيع العمل ومنع الانتقائية، يتم إخفاء بيانات الطلبات غير المستلمة. اضغط على <strong>"استلام"</strong> للاطلاع على كامل البيانات والبدء في المعالجة.</div>
      </div>
      <div class="mask-legend-items">
        <div class="mask-leg-item"><span class="mask-dot full"></span>بيانات مخفية (بانتظار الاستلام)</div>
        <div class="mask-leg-item"><span class="mask-dot mine"></span>بيانات مرئية (معينة لك)</div>
      </div>
    </div>` : '';

  /* _receiveComplaint is defined globally at top of components.js */

  return `<div class="pg-head"><div><h1>قائمة البلاغات</h1><p>${data.length} بلاغ إجمالاً</p></div>
    <div class="pg-acts">${createBtn}<button class="btn btn-secondary btn-sm">${ICONS.download}تصدير</button></div></div>
    ${maskBanner}
    ${filters}
    ${_tblWrap(headers, rows || _noData())}`;
}

/* ── إنشاء بلاغ جديد ── */
function renderComplaintNew(role) {
  const isFundStaff = role === 'fund-staff';
  const isInternal = role === 'fund-staff' || role === 'monitoring-employee';
  const isEmployer = role === 'employer';
  const isInsured = role === 'insured';

  /* بيانات المستخدم الحالي */
  const _cu = {
    'employer': { name: 'طارق سعيد الكلباني', civil: '08234567', phone: '96891023456', label: 'صاحب عمل' },
    'insured': { name: 'أسماء محمد الحارثي', civil: '07345678', phone: '96892034567', label: 'مؤمن عليه' },
    'fund-staff': { name: 'منى راشد البلوشي', civil: '09123456', phone: '96890012345', label: 'موظف الصندوق' },
    'monitoring-employee': { name: 'سيف خلفان الأمري', civil: '06456789', phone: '96893045678', label: 'موظف قسم المتابعة' },
  }[role] || { name: '—', civil: '—', phone: '—', label: '' };

  /* بيانات صاحب العمل المرتبط بالدور */
  const _empData = {
    'employer': INSP_DATA.employers.find(e => e.name === INSP_DATA.users.employer.dept) || INSP_DATA.employers[0],
    'insured': INSP_DATA.employers.find(e => e.id === (INSP_DATA.workers.find(w => w.civil === '07345678') || {}).employerId) || INSP_DATA.employers[1],
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
        <div class="fgrp"><label class="flbl">حالة الاشتراكات</label><div class="fro"><span class="badge ${myEmp.contributions.status === 'منتظم' ? 'b-approved' : 'b-returned'}">${myEmp.contributions.status}</span></div></div>
      </div></div></div>`;
    }
    if (isInsured && myEmp) {
      /* المؤمن عليه — بيانات صاحب العمل الحالي تلقائية (قراءة فقط، بلا بحث عن جهات أخرى) */
      return `<div class="card"><div class="ph"><h3><span class="pico or">${ICONS.building}</span>بيانات صاحب العمل</h3>
        <span class="badge b-approved" style="font-size:11px">مستوردة تلقائياً من الحساب</span></div>
      <div class="pb"><div class="fg fg-2">
        <div class="fgrp"><label class="flbl">اسم المنشأة</label><div class="fro fw7">${myEmp.name}</div></div>
        <div class="fgrp"><label class="flbl">رقم السجل التجاري</label><div class="fro">${myEmp.crn}</div></div>
        <div class="fgrp"><label class="flbl">القطاع</label><div class="fro">${myEmp.sector}</div></div>
        <div class="fgrp"><label class="flbl">الموقع</label><div class="fro">${myEmp.location}</div></div>
      </div></div></div>`;
    }
    /* داخلي (fund-staff / monitoring-employee) */
    return `<div class="card"><div class="ph"><h3><span class="pico or">${ICONS.building}</span>بيانات صاحب العمل</h3></div>
    <div class="pb">
      <div class="fg fg-2 mb12">
        <div class="fgrp"><label class="flbl">رقم السجل التجاري <span class="req">*</span></label>
          <div style="display:flex;gap:8px"><input class="fc" id="emp-crn-input" placeholder="أدخل رقم السجل التجاري">
          <button class="btn btn-secondary btn-sm" onclick="_lookupEmployer()">استعلام</button></div></div>
      </div>
      <div id="emp-data-panel" style="display:none">
        <div class="alert alert-s mb12">${ICONS.check} <span>تم العثور على بيانات المنشأة</span></div>
        <div class="fg fg-2">
          <div class="fgrp"><label class="flbl">اسم المنشأة</label><div class="fro fw7" id="e-name"></div></div>
          <div class="fgrp"><label class="flbl">رقم السجل التجاري</label><div class="fro" id="e-crn"></div></div>
          <div class="fgrp"><label class="flbl">القطاع</label><div class="fro" id="e-sector"></div></div>
          <div class="fgrp"><label class="flbl">الموقع</label><div class="fro" id="e-location"></div></div>
          <div class="fgrp"><label class="flbl">عدد الموظفين المسجلين</label><div class="fro" id="e-employees"></div></div>
          <div class="fgrp"><label class="flbl">حالة الاشتراكات</label><div class="fro" id="e-contrib"></div></div>
          <div class="fgrp"><label class="flbl">مستوى المخاطر</label><div class="fro" id="e-risk"></div></div>
          <div class="fgrp"><label class="flbl">درجة الامتثال</label><div class="fro" id="e-compliance"></div></div>
          <div class="fgrp"><label class="flbl">آخر زيارة تفتيشية</label><div class="fro" id="e-lastvisit"></div></div>
          <div class="fgrp"><label class="flbl">رقم تواصل المنشأة</label><input class="fc" type="tel" id="e-phone" placeholder="هاتف المنشأة"></div>
        </div>
      </div>
    </div></div>`;
  };

  /* نموذج بيانات العامل — للمؤمن عليه: بحث بالرقم المدني (مسبق التعبئة من الحساب) */
  const _insuredWorker = isInsured ? INSP_DATA.workers.find(w => w.civil === '07345678') || null : null;
  const _workerPanel = () => {
    if (isInsured) {
      const w = _insuredWorker;
      const dataPanel = w ? `
        <div class="alert alert-s" style="margin-bottom:14px">${ICONS.check} تم العثور على بياناتك في سجلات الصندوق</div>
        <div class="fg fg-2">
          <div class="fgrp"><label class="flbl">الاسم الكامل</label><div class="fro fw7">${w.name}</div></div>
          <div class="fgrp"><label class="flbl">الرقم المدني</label><div class="fro">${w.civil}</div></div>
          <div class="fgrp"><label class="flbl">الجنسية</label><div class="fro">${w.nationality || 'عُماني'}</div></div>
          <div class="fgrp"><label class="flbl">تاريخ الميلاد</label><div class="fro">${w.dob || '—'}</div></div>
          <div class="fgrp"><label class="flbl">المسمى الوظيفي</label><div class="fro">${w.position}</div></div>
          <div class="fgrp"><label class="flbl">القسم</label><div class="fro">${w.department}</div></div>
          <div class="fgrp"><label class="flbl">نوع العقد</label><div class="fro">${w.contractType || '—'}</div></div>
          <div class="fgrp"><label class="flbl">جهة العمل</label><div class="fro fw7">${w.employer}</div></div>
          <div class="fgrp"><label class="flbl">الأجر الأساسي المسجّل</label><div class="fro fw7 txp">${w.salary} ر.ع / شهر</div></div>
          <div class="fgrp"><label class="flbl">تاريخ التسجيل بالصندوق</label><div class="fro">${w.insuredFrom || w.joinDate}</div></div>
          <div class="fgrp"><label class="flbl">حماية الأجور</label><div class="fro"><span class="badge ${(w.wageProtection || '').includes('منتظم') ? 'b-approved' : 'b-returned'}">${w.wageProtection || '—'}</span></div></div>
          <div class="fgrp"><label class="flbl">حالة التأمين الصحي</label><div class="fro">${w.healthInsurance || '—'}</div></div>
          <div class="fgrp"><label class="flbl">حالة التوظيف</label><div class="fro"><span class="badge ${w.employmentStatus === 'على رأس العمل' ? 'b-approved' : 'b-returned'}">${w.employmentStatus}</span></div></div>
          ${w.resignDate ? `<div class="fgrp"><label class="flbl">تاريخ انتهاء الخدمة</label><div class="fro">${w.resignDate}</div></div>` : ''}
          <div class="fgrp"><label class="flbl">رقم التواصل</label><div class="fro">${w.phone || '—'}</div></div>
        </div>` : `<div class="alert alert-w" style="margin-top:12px">${ICONS.warn} لم يتم العثور على سجل بهذا الرقم المدني. تواصل مع الصندوق للتحقق.</div>`;

      return `
    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.user}</span>بياناتك كمؤمن عليه</h3>
      <span class="badge b-approved" style="font-size:11px">مستوردة من سجلات الصندوق</span></div>
    <div class="pb">
      <div class="alert alert-i" style="margin-bottom:16px">${ICONS.info} البلاغ يُقدَّم عنك — رقمك المدني معبّأ تلقائياً من حسابك. اضغط <strong>استعلام</strong> للتحقق من بياناتك.</div>
      <div style="display:flex;gap:8px;margin-bottom:16px;max-width:420px">
        <input class="fc" id="insured-civil-input" value="07345678" readonly style="background:var(--g50);color:var(--text2);cursor:not-allowed;flex:1" placeholder="الرقم المدني">
        <button class="btn btn-secondary" onclick="_insuredLookup()">${ICONS.search}استعلام</button>
      </div>
      <div id="insured-worker-panel" style="display:none">${dataPanel}</div>
    </div></div>
    <script>
    function _insuredLookup() {
      var panel = document.getElementById('insured-worker-panel');
      if (panel) { panel.style.display = ''; panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
    }
    document.addEventListener('DOMContentLoaded', function(){ _insuredLookup(); });
    <\/script>`;
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
          <div class="fgrp"><label class="flbl">الجنسية</label><div class="fro" id="w-nationality"></div></div>
          <div class="fgrp"><label class="flbl">المسمى الوظيفي</label><div class="fro" id="w-position"></div></div>
          <div class="fgrp"><label class="flbl">نوع العقد</label><div class="fro" id="w-contract"></div></div>
          <div class="fgrp"><label class="flbl">القسم</label><div class="fro" id="w-dept"></div></div>
          <div class="fgrp"><label class="flbl">الأجر الأساسي المسجّل</label><div class="fro fw7 txp" id="w-salary"></div></div>
          <div class="fgrp"><label class="flbl">الاشتراكات المسجلة</label><div class="fro" id="w-contributions"></div></div>
          <div class="fgrp"><label class="flbl">تاريخ الالتحاق</label><div class="fro" id="w-joindate"></div></div>
          <div class="fgrp"><label class="flbl">حالة العامل</label><div class="fro" id="w-status"></div></div>
          <div class="fgrp" id="w-resign-grp" style="display:none"><label class="flbl">تاريخ انتهاء الخدمة</label><div class="fro" id="w-resigndate"></div></div>
          <div class="fgrp"><label class="flbl">هاتف العامل</label><div class="fro" id="w-phone"></div></div>
          ${isEmployer ? `<div class="fgrp"><label class="flbl">رقم هاتف آخر للتواصل مع العامل عند تقديم البلاغ</label><input type="tel" class="fc" id="w-extra-phone" placeholder="أدخل رقم هاتف العامل"></div>` : ''}
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
      <div style="width:44px;height:44px;border-radius:50%;background:var(--primary);color:#fff;font-size:16px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">${_cu.name.substring(0, 2)}</div>
      <div style="flex:1">
        <div style="font-size:14px;font-weight:700;color:var(--text)">${_cu.name}</div>
        <div style="font-size:12px;color:var(--text3);margin-top:2px">رقم الهوية: ${_cu.civil} &nbsp;|&nbsp; الهاتف: ${_cu.phone}</div>
      </div>
      <span class="badge b-approved">${_cu.label}</span>
    </div>
    ${(isEmployer || isInsured) ? `<div class="fg fg-2 mt12">
      <div class="fgrp"><label class="flbl">رقم هاتف إضافي أول</label><input class="fc" type="tel" placeholder="مثال: 968 9XXXXXXX"></div>
      <div class="fgrp"><label class="flbl">رقم هاتف إضافي ثانٍ</label><input class="fc" type="tel" placeholder="مثال: 968 9XXXXXXX"></div>
    </div>` : ''}
    ${isFundStaff ? `<div class="fg fg-2 mt12">
      <div class="fgrp span-full"><label class="flbl">جهة الإحالة الخارجية</label>
        <select class="fc" id="ext-ref-select" onchange="_toggleOtherRef(this.value)">
          <option value="">— اختر جهة الإحالة —</option>
          <optgroup label="الجهات القضائية والأمنية">
            <option>المحكمة الابتدائية</option>
            <option>محكمة الاستئناف</option>
            <option>الادعاء العام</option>
            <option>شرطة عُمان السلطانية</option>
          </optgroup>
          <optgroup label="الوزارات والجهات الحكومية">
            <option>وزارة العمل</option>
            <option>وزارة الاقتصاد</option>
            <option>وزارة التجارة والصناعة وترويج الاستثمار</option>
            <option>وزارة الصحة</option>
            <option>ديوان البلاط السلطاني</option>
            <option>مجلس الدولة</option>
            <option>مجلس الشورى</option>
          </optgroup>
          <optgroup label="الهيئات والمؤسسات الرسمية">
            <option>الهيئة العامة للتأمين الاجتماعي</option>
            <option>هيئة سوق المال</option>
            <option>هيئة تنظيم الاتصالات</option>
            <option>المركز الوطني للإحصاء والمعلومات</option>
            <option>الجهاز المركزي للتفتيش والرقابة المالية</option>
            <option>ديوان المظالم</option>
          </optgroup>
          <option value="other">أخرى (يُحدد يدوياً)</option>
        </select>
      </div>
      <div class="fgrp span-full" id="ext-ref-other-grp" style="display:none">
        <label class="flbl">اسم الجهة المحيلة</label>
        <input class="fc" id="ext-ref-other-input" placeholder="أدخل اسم الجهة المحيلة...">
      </div>
    </div>` : ''}
    ${(!isFundStaff && isInternal) ? `<div class="fg fg-2 mt12">
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
      <select class="fc" id="complaint-type-select" onchange="_updateRequiredDocs(this.value)">
        <option value="">— اختر نوع البلاغ —</option>
        <option value="contract">شكوى عدم التسجيل</option>
        <option value="salary">شكوى عدم صحة الأجر</option>
        <option value="other">أخرى</option>
      </select></div>
    <div class="fgrp span-full" id="correct-wage-grp" style="display:none;"><label class="flbl">الأجر الصحيح <span class="req">*</span></label>
      <input type="number" class="fc" placeholder="أدخل الأجر الأساسي الصحيح (ر.ع)"></div>
    <div class="fgrp span-full" id="actual-join-date-grp" style="display:none;"><label class="flbl">تاريخ الالتحاق الفعلي بالعمل <span class="req">*</span></label>
      <input type="date" class="fc"></div>
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
    if (document.getElementById('w-nationality')) document.getElementById('w-nationality').textContent = w.nationality || '—';
    document.getElementById('w-position').textContent = w.position;
    if (document.getElementById('w-contract')) document.getElementById('w-contract').textContent = w.contractType || '—';
    document.getElementById('w-dept').textContent = w.department;
    document.getElementById('w-salary').textContent = (w.salary || '—') + ' ر.ع / شهر';
    if (document.getElementById('w-contributions')) document.getElementById('w-contributions').textContent = w.contributions ? w.contributions + ' ر.ع' : 'مسجل';
    document.getElementById('w-joindate').textContent = w.joinDate || w.insuredFrom || '—';
    const statusBadgeTxt = w.employmentStatus === 'على رأس العمل' ? 'b-approved' : 'b-returned';
    document.getElementById('w-status').innerHTML = '<span class="badge ' + statusBadgeTxt + '">' + (w.employmentStatus || '—') + '</span>';
    if (document.getElementById('w-phone')) document.getElementById('w-phone').textContent = w.phone || '—';
    const resignGrp = document.getElementById('w-resign-grp');
    if (w.resignDate) {
      resignGrp.style.display = '';
      document.getElementById('w-resigndate').textContent = w.resignDate;
    } else {
      resignGrp.style.display = 'none';
    }
  }
  function _lookupEmployer() {
    const crn = document.getElementById('emp-crn-input') ? document.getElementById('emp-crn-input').value.trim() : '';
    const panel = document.getElementById('emp-data-panel');
    if (!panel) return;
    if (!crn) { showToast('يرجى إدخال رقم السجل التجاري', 'w'); return; }
    showToast('جارٍ الاستعلام من وزارة التجارة...', 'i');
    const e = INSP_DATA.employers.find(x => x.crn === crn) || INSP_DATA.employers[0];
    panel.style.display = 'block';
    document.getElementById('e-name').textContent = e.name;
    document.getElementById('e-crn').textContent = e.crn;
    document.getElementById('e-sector').textContent = e.sector;
    document.getElementById('e-location').textContent = e.location;
    document.getElementById('e-employees').textContent = (e.employees || '—') + ' عامل';
    document.getElementById('e-contrib').innerHTML = '<span class="badge ' + (e.contributions && e.contributions.status === 'منتظم' ? 'b-approved' : 'b-returned') + '">' + (e.contributions ? e.contributions.status : '—') + '</span>';
    document.getElementById('e-risk').innerHTML = '<span class="badge ' + (e.riskLevel === 'مرتفع' ? 'b-rejected' : e.riskLevel === 'متوسط' ? 'b-returned' : 'b-approved') + '">' + (e.riskLevel || '—') + '</span>';
    document.getElementById('e-compliance').textContent = (e.complianceScore || '—') + '%';
    document.getElementById('e-lastvisit').textContent = e.lastVisit || '—';
  }
  function _toggleOtherRef(val) {
    const grp = document.getElementById('ext-ref-other-grp');
    if (grp) grp.style.display = val === 'other' ? '' : 'none';
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
    const wageGrp = document.getElementById('correct-wage-grp');
    const joinDateGrp = document.getElementById('actual-join-date-grp');
    if(wageGrp) wageGrp.style.display = type === 'salary' ? '' : 'none';
    if(joinDateGrp) joinDateGrp.style.display = type === 'contract' ? '' : 'none';
    showToast('تم تحديث قائمة المستندات المطلوبة حسب نوع البلاغ', 'i');
  }
  </script>`;
}

/* ── تفاصيل البلاغ ── */
function renderComplaintDetails(role, defaultId) {
  const id = getParam('id') || defaultId || '2025-01-000001';
  const c = INSP_DATA.complaints.find(x => x.id === id) || INSP_DATA.complaints[0];
  if (!c) return `<div class="empty-st">${ICONS.inbox}<h4>البلاغ غير موجود</h4></div>`;

  const isExternal = role === 'employer' || role === 'insured';
  const isInternal = !isExternal;
  const complaintAttachments = _withSampleAttachments(c, 'complaint');
  const complaintNotes = _withSampleNotes(c, 'complaint');
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
          <option ${c.type === 'شكوى عدم التسجيل' ? 'selected' : ''}>شكوى عدم التسجيل</option>
          <option ${c.type === 'شكوى عدم صحة الأجر' ? 'selected' : ''}>شكوى عدم صحة الأجر</option>
          <option ${c.type === 'أخرى' ? 'selected' : ''}>أخرى</option>
        </select></div>
      <div class="fgrp span-full"><label class="flbl">وصف البلاغ <span class="req">*</span></label>
        <textarea class="fc" rows="5" style="resize:vertical">${c.description}</textarea></div>
      ${c.correctWage ? `<div class="fgrp span-full"><label class="flbl">الأجر الصحيح المبلّغ عنه</label><input type="number" class="fc" value="${c.correctWage}"></div>` : ''}
      ${c.actualJoinDate ? `<div class="fgrp span-full"><label class="flbl">تاريخ الالتحاق الفعلي المبلّغ عنه</label><input type="date" class="fc" value="${c.actualJoinDate}"></div>` : ''}
    </div></div></div>` : `
    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.file}</span>بيانات الطلب الأساسية</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">رقم البلاغ</label><div class="fro fw7">${c.id}</div></div>
      <div class="fgrp"><label class="flbl">تاريخ التقديم</label><div class="fro">${c.submitDate}</div></div>
      <div class="fgrp"><label class="flbl">الموعد النهائي</label><div class="fro">${c.dueDate || '—'}</div></div>
      <div class="fgrp"><label class="flbl">نوع البلاغ</label><div class="fro">${c.type}</div></div>
      <div class="fgrp"><label class="flbl">قناة الإبلاغ</label><div class="fro">${c.channel}</div></div>
      ${isInternal ? `<div class="fgrp"><label class="flbl">الأولوية</label><div class="fro"><span class="badge ${_priClass(c.priority)}">${c.priority}</span></div></div>` : ''}
      ${isInternal ? `<div class="fgrp"><label class="flbl">الموظف المختص</label><div class="fro">${c.assignedTo || '<span class="tx3">لم يُعيَّن بعد</span>'}</div></div>` : ''}
      ${isInternal && c.assignedInspector ? `<div class="fgrp"><label class="flbl">المفتش المكلف</label><div class="fro">${c.assignedInspector}</div></div>` : ''}
      ${c.returnCount > 0 ? `<div class="fgrp"><label class="flbl">عدد مرات الإعادة</label><div class="fro"><span class="badge b-returned">${c.returnCount} / 2</span></div></div>` : ''}
      ${c.correctWage ? `<div class="fgrp"><label class="flbl">الأجر الصحيح المبلّغ عنه</label><div class="fro fw7 txp">${c.correctWage} ر.ع / شهر</div></div>` : ''}
      ${c.actualJoinDate ? `<div class="fgrp"><label class="flbl">تاريخ الالتحاق الفعلي المبلّغ عنه</label><div class="fro fw7">${c.actualJoinDate}</div></div>` : ''}
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
      <div class="fgrp"><label class="flbl">حالة الاشتراكات</label><div class="fro"><span class="badge ${emp.contributions.status === 'منتظم' ? 'b-approved' : 'b-returned'}">${emp.contributions.status}</span></div></div>
      ${emp.contributions.arrears > 0 ? `<div class="fgrp"><label class="flbl">المبالغ المتأخرة</label><div class="fro fw7" style="color:var(--danger)">${emp.contributions.arrears.toLocaleString()} ر.ع</div></div>` : ''}
      <div class="fgrp"><label class="flbl">مستوى المخاطر</label><div class="fro"><span class="badge ${emp.riskLevel === 'مرتفع' ? 'b-rejected' : emp.riskLevel === 'متوسط' ? 'b-returned' : 'b-approved'}">${emp.riskLevel}</span></div></div>
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
      <div class="fgrp"><label class="flbl">حالة التوظيف</label><div class="fro"><span class="badge ${wrk.employmentStatus === 'على رأس العمل' ? 'b-approved' : 'b-returned'}">${wrk.employmentStatus || '—'}</span></div></div>
      ${wrk.resignDate ? `<div class="fgrp"><label class="flbl">تاريخ انتهاء الخدمة</label><div class="fro">${wrk.resignDate}</div></div>` : ''}
      <div class="fgrp"><label class="flbl">نوع العقد</label><div class="fro">${wrk.contractType}</div></div>
      <div class="fgrp"><label class="flbl">الجنسية</label><div class="fro">${wrk.nationality}</div></div>
      ${c.workerExtraPhone ? `<div class="fgrp"><label class="flbl">هاتف آخر للتواصل (من البلاغ)</label><div class="fro fw7">${c.workerExtraPhone}</div></div>` : ''}
    </div></div></div>` : (c.workerName ? `
    <div class="card"><div class="ph"><h3><span class="pico rd">${ICONS.user}</span>بيانات العامل</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">الاسم</label><div class="fro fw7">${c.workerName}</div></div>
      ${c.workerCivil ? `<div class="fgrp"><label class="flbl">رقم الهوية</label><div class="fro">${c.workerCivil}</div></div>` : ''}
      ${c.workerExtraPhone ? `<div class="fgrp"><label class="flbl">هاتف آخر للتواصل (من البلاغ)</label><div class="fro fw7">${c.workerExtraPhone}</div></div>` : ''}
    </div></div></div>` : '');

  const tempBlockPanel = (wrk || c.workerName || c.workerCivil) && (c.status !== 'تم اغلاق البلاغ' && c.status !== 'تم حفظ البلاغ') ? `
    <div class="alert alert-w mb12">
      <div style="font-weight:bold;margin-bottom:4px;display:flex;align-items:center;gap:6px">
        ${ICONS.warn} تم حظر العامل مؤقتاً
      </div>
      <div>يتم حظر العامل مؤقتاً لحين البت في هذا البلاغ لضمان عدم تقديم أي منافع أثناء البحث الذي يترتب عليه تعديل البيانات.</div>
    </div>
  ` : '';

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
          <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;border:1px solid var(--border);border-radius:var(--rsm);margin-bottom:6px;background:${d.status === 'مرفق' ? 'var(--success-l)' : 'var(--g50)'}">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:16px">${d.status === 'مرفق' ? '📎' : '📋'}</span>
              <span style="font-size:13px;font-weight:600;color:var(--text)">${d.name}</span>
            </div>
            <span class="badge ${d.status === 'مرفق' ? 'b-approved' : 'b-returned'}">${d.status}</span>
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
          <div style="padding:8px 14px;border-radius:var(--rsm);border:1px solid var(--border);background:${vr.status === 'مخالف' ? '#fff5f5' : vr.status === 'موافق' ? '#f0fff4' : '#fffbf0'}">
            <div style="font-size:11px;color:var(--text3);margin-bottom:4px">${vr.source}</div>
            <span class="badge ${vr.status === 'مخالف' ? 'b-rejected' : vr.status === 'موافق' ? 'b-approved' : 'b-returned'}">${vr.status}</span>
          </div>`).join('')}
      </div>
      ${c.verificationResults.map(vr => `
        <div style="margin-bottom:14px;border:1px solid var(--border);border-radius:var(--rsm);overflow:hidden">
          <div style="padding:10px 14px;background:var(--g50);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
            <span style="font-size:13px;font-weight:700;color:var(--text)">${vr.source}</span>
            <span class="badge ${vr.status === 'مخالف' ? 'b-rejected' : vr.status === 'موافق' ? 'b-approved' : 'b-returned'}">${vr.status}</span>
          </div>
          <div style="padding:12px 14px">
            ${vr.checks.map(ch => `
              <div style="display:flex;align-items:flex-start;gap:10px;padding:7px 0;border-bottom:1px solid var(--border)">
                <span class="badge ${ch.result === 'مخالف' ? 'b-rejected' : ch.result === 'موافق' ? 'b-approved' : 'b-returned'}" style="white-space:nowrap;flex-shrink:0">${ch.result}</span>
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
        <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 14px;border:1px solid var(--border);border-radius:var(--rsm);margin-bottom:8px;background:${d.status === 'مرفق' ? 'var(--success-l)' : 'var(--g50)'}">
          <div style="display:flex;align-items:center;gap:10px">
            <span style="font-size:18px">${d.status === 'مرفق' ? '📎' : '📋'}</span>
            <div>
              <div style="font-size:13px;font-weight:600;color:var(--text)">${d.name}</div>
              ${d.uploadDate ? `<div style="font-size:11px;color:var(--text3)">رُفع بتاريخ ${d.uploadDate}</div>` : ''}
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span class="badge ${d.status === 'مرفق' ? 'b-approved' : 'b-returned'}">${d.status}</span>
            ${d.status === 'مرفق' ? `
              <button class="btn btn-ghost btn-xs" onclick="showToast('جارٍ فتح المستند...','i')" title="استعراض">${ICONS.eye}</button>
              <button class="btn btn-ghost btn-xs" onclick="showToast('جارٍ تحميل المستند...','i')" title="تحميل">${ICONS.download}</button>
            ` : (isExternal ? `<button class="btn btn-secondary btn-xs" onclick="showToast('فتح نافذة الرفع','i')">${ICONS.plus}رفع</button>` : '')}
          </div>
        </div>`).join('')}
    </div></div>` : '';

  /* ── المرفقات ── */
  const attachmentsPanel = `
    <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.upload}</span>المرفقات (${complaintAttachments.length})</h3>
      ${(isDraft || isReturned) ? `<button class="btn btn-secondary btn-sm" onclick="showToast('فتح نافذة الرفع','i')">${ICONS.plus}إضافة</button>` : ''}</div>
    <div class="pb">${complaintAttachments.map(a => attRow(a)).join('')}</div></div>`;

  /* ── السجل الزمني ── */
  const timelinePanel = `
    <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.clock}</span>السجل الزمني</h3></div>
    <div class="pb">${_renderComplaintTimeline(c.timeline)}</div></div>`;

  /* ── المراسلات ── */
  const correspondencePanel = isInternal ? `
    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.mail}</span>المراسلات</h3></div>
    <div class="pb" id="correspondence-container"></div></div>` : '';

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

  const pgHead = `<div class="pg-head"><div><h1>${c.id}</h1><p>${c.type} — ${c.employerName}</p></div>
    <div class="pg-acts">${statusBadge(c.status)}${isInternal ? `<span class="badge ${_priClass(c.priority)}">${c.priority}</span>` : ''}
      <button class="btn btn-secondary btn-sm" onclick="navigateTo('complaints-list')">${ICONS.arrow_right}رجوع</button></div></div>`;

  const summaryBar = _summaryBar([
    ['رقم البلاغ', `<strong>${c.id}</strong>`],
    ['تاريخ التقديم', c.submitDate],
    ['نوع البلاغ', c.type],
    ...(isInternal ? [['الأولوية', `<span class="badge ${_priClass(c.priority)}">${c.priority}</span>`]] : []),
    ['الحالة', statusBadge(c.status)],
    ...(c.assignedTo && isInternal ? [['المختص', c.assignedTo]] : []),
  ]);

  const initScript = `<script>
    (function() {
      const el = document.getElementById('correspondence-container');
      if (el && typeof renderCorrespondenceDocumentation === 'function')
        el.innerHTML = renderCorrespondenceDocumentation('complaints', '${c.id}', '${role}');
    })();
  </script>`;

  const tid = 'cdt-' + c.id.replace(/[^a-z0-9]/gi, '-');

  if (isExternal) {
    const actionRequired = isDraft || isReturned;
    const actionContent = returnedActionPanel + draftActionsPanel;
    const tabs = [
      { label: 'البيانات الأساسية', content: requestPanel + submitterPanel + employerPanel + workerPanel + tempBlockPanel },
      { label: 'المستندات', content: (docsPanel || '') + attachmentsPanel },
      { label: 'السجل الزمني', content: timelinePanel },
    ];
    if (actionRequired) tabs.splice(2, 0, { label: 'الإجراءات المطلوبة', content: actionContent, badge: '1' });
    const defaultTab = actionRequired ? 2 : 0;
    return pgHead + summaryBar + _tabView(tid, tabs, defaultTab);
  }

  const notesPanel = showWorkflowPanels ? renderNotes(complaintNotes, c.id) : '';
  const historyContent = timelinePanel + correspondencePanel + initScript;
  const verifyContent = (dataComparePanel || '') + (verPanel || '');
  /* docs shown separately for internal roles */
  const docsContent = docsPanel || '<p class="tx3 fs11" style="padding:16px">لا توجد مستندات مطلوبة لهذا البلاغ</p>';
  /* actions tab shows ONLY the current role's action panel — cumulative history is in the timeline */
  const actionContent = actionPanel || '';
  const hasAction = actionContent.length > 0;

  /* ── محضر الزيارة (field-inspector & field-head only) ── */
  const showVisitMinutes = role === 'field-inspector' || role === 'field-head';
  const minutesVid = 'vm-' + c.id.replace(/[^a-z0-9]/gi, '-');

  /* field-head: read-only review panel showing submitted minutes */
  function _buildVisitMinutesReadOnly(complaint) {
    const attendees = (complaint.visitAttendees || []).map(function (a) {
      return '<tr>'
        + '<td style="padding:10px 14px;font-size:13px;border-bottom:1px solid var(--border1)">' + a.name + '</td>'
        + '<td style="padding:10px 14px;font-size:13px;border-bottom:1px solid var(--border1);color:var(--text2)">' + a.role + '</td>'
        + '</tr>';
    }).join('');
    const metPeople = (complaint.metPeople || []).map(function (p) {
      return '<tr>'
        + '<td style="padding:10px 14px;font-size:13px;border-bottom:1px solid var(--border1)">' + p.name + '</td>'
        + '<td style="padding:10px 14px;font-size:13px;border-bottom:1px solid var(--border1);color:var(--text2)">' + p.title + '</td>'
        + '<td style="padding:10px 14px;font-size:13px;border-bottom:1px solid var(--border1);color:var(--text2)">' + p.phone + '</td>'
        + '</tr>';
    }).join('');

    const attachments = (complaint.visitAttachments || []).map(function (f) {
      var icon = ICONS.file;
      return '<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--border1)">'
        + '<span style="display:inline-flex;width:16px;height:16px;flex-shrink:0;color:var(--primary)">' + icon + '</span>'
        + '<span style="flex:1;font-size:13px">' + f.name + '</span>'
        + '<span style="font-size:11px;color:var(--text3)">' + f.size + '</span>'
        + '<button class="btn btn-sm btn-outline" onclick="showToast(\'فتح: ' + f.name + '\',\'i\')" style="font-size:11.5px">عرض</button>'
        + '</div>';
    }).join('');

    const visitDateFmt = complaint.visitDate
      ? new Date(complaint.visitDate).toLocaleDateString('ar-OM', { year: 'numeric', month: 'long', day: 'numeric' })
      : '—';

    return '<div class="card">'
      + '<div class="ph"><h3><span class="pico tl">' + ICONS.clipboard + '</span>محضر الزيارة التفتيشية</h3>'
      + '<span class="badge b-approved" style="font-size:11px">تم رفعه من المفتش — للمراجعة</span></div>'
      + '<div class="pb">'
      + '<div class="alert alert-i" style="margin-bottom:18px">' + ICONS.info + ' هذا المحضر مُقدَّم من المفتش الميداني. المراجعة للاطلاع فقط — الإجراء من لوحة الإجراءات.</div>'

      /* meta row */
      + '<div class="fg fg-3" style="margin-bottom:18px">'
      + '<div class="fro"><span class="flbl">تاريخ الزيارة</span><span class="fval">' + visitDateFmt + '</span></div>'
      + '<div class="fro"><span class="flbl">المفتش المنفذ</span><span class="fval">' + (complaint.assignedInspector || '—') + '</span></div>'
      + '<div class="fro"><span class="flbl">المنشأة</span><span class="fval">' + (complaint.employerName || '—') + '</span></div>'
      + '</div>'

      + '<div style="margin-bottom:18px">'
      + '<div class="flbl" style="margin-bottom:8px">موقع الزيارة</div>'
      + '<div style="background:var(--g50);border:1px solid var(--border1);border-radius:8px;padding:14px;font-size:13px;line-height:1.9;color:var(--text1)">'
      + (complaint.visitLocation || '<span style="color:var(--text3);font-style:italic">لم يتم تحديد موقع الزيارة</span>')
      + '</div></div>'

      /* details */
      + '<div style="margin-bottom:18px">'
      + '<div class="flbl" style="margin-bottom:8px">تفاصيل المحضر الميداني</div>'
      + '<div style="background:var(--g50);border:1px solid var(--border1);border-radius:8px;padding:16px;font-size:13px;line-height:2;white-space:pre-wrap;color:var(--text1)">'
      + (complaint.visitMinutes || '<span style="color:var(--text3);font-style:italic">لم يتم إدخال تفاصيل المحضر</span>')
      + '</div></div>'

      /* summary */
      + '<div style="margin-bottom:18px">'
      + '<div class="flbl" style="margin-bottom:8px">ملخص المحضر</div>'
      + '<div style="background:var(--g50);border:1px solid var(--border1);border-radius:8px;padding:14px;font-size:13px;line-height:1.9;color:var(--text1)">'
      + (complaint.visitSummary || '<span style="color:var(--text3);font-style:italic">لا يوجد ملخص</span>')
      + '</div></div>'

      /* attendees */
      + '<div style="margin-bottom:18px">'
      + '<div class="flbl" style="margin-bottom:8px">المفتشين القائمين بالزيارة</div>'
      + (attendees.length
        ? '<table style="width:100%;border-collapse:collapse;border:1px solid var(--border1);border-radius:8px;overflow:hidden">'
        + '<thead><tr>'
        + '<th style="padding:10px 14px;font-size:12px;font-weight:700;background:var(--g100);text-align:right;border-bottom:2px solid var(--border2)">اسم المفتش</th>'
        + '<th style="padding:10px 14px;font-size:12px;font-weight:700;background:var(--g100);text-align:right;border-bottom:2px solid var(--border2)">المسمى الوظيفي</th>'
        + '</tr></thead><tbody>' + attendees + '</tbody></table>'
        : '<p style="color:var(--text3);font-size:12.5px">لا يوجد سجل مفتشين</p>')
      + '</div>'

      + '<div style="margin-bottom:18px">'
      + '<div class="flbl" style="margin-bottom:8px">الأشخاص الذين تمت مقابلتهم</div>'
      + (metPeople.length
        ? '<table style="width:100%;border-collapse:collapse;border:1px solid var(--border1);border-radius:8px;overflow:hidden">'
        + '<thead><tr>'
        + '<th style="padding:10px 14px;font-size:12px;font-weight:700;background:var(--g100);text-align:right;border-bottom:2px solid var(--border2)">الاسم</th>'
        + '<th style="padding:10px 14px;font-size:12px;font-weight:700;background:var(--g100);text-align:right;border-bottom:2px solid var(--border2)">المسمى الوظيفي</th>'
        + '<th style="padding:10px 14px;font-size:12px;font-weight:700;background:var(--g100);text-align:right;border-bottom:2px solid var(--border2)">رقم الهاتف</th>'
        + '</tr></thead><tbody>' + metPeople + '</tbody></table>'
        : '<p style="color:var(--text3);font-size:12.5px">لا يوجد أشخاص مسجلون</p>')
      + '</div>'

      /* attachments */
      + '<div style="margin-bottom:20px">'
      + '<div class="flbl" style="margin-bottom:8px">مرفقات المحضر</div>'
      + (attachments.length
        ? '<div style="border:1px solid var(--border1);border-radius:8px;overflow:hidden">' + attachments + '</div>'
        : '<p style="color:var(--text3);font-size:12.5px">لا توجد مرفقات</p>')
      + '</div>'

      /* reviewer notes + action */
      + '<div style="border-top:2px solid var(--border2);padding-top:18px;margin-top:4px">'
      + '<div class="flbl" style="margin-bottom:6px">ملاحظات رئيس قسم التفتيش</div>'
      + '<textarea class="fc" id="vm-head-notes-' + complaint.id.replace(/[^a-z0-9]/gi, '-') + '" rows="3" placeholder="أدخل ملاحظاتك على المحضر الميداني..." style="resize:vertical;margin-bottom:12px"></textarea>'
      + '<div style="display:flex;gap:10px;flex-wrap:wrap">'
      + '<button class="btn btn-primary" onclick="showToast(\'تم اعتماد المحضر الميداني بنجاح\',\'s\')">' + ICONS.check + 'اعتماد المحضر</button>'
      + '<button class="btn btn-warning" onclick="showToast(\'تم إعادة المحضر للمفتش للتعديل\',\'w\')">' + ICONS.edit + 'إعادة للمفتش</button>'
      + '</div></div>'

      + '</div></div>';
  }

  /* field-inspector: editable minutes form */
  const _visitMinutesEditable = `
    <div class="card">
      <div class="ph"><h3><span class="pico tl">${ICONS.clipboard}</span>محضر الزيارة التفتيشية</h3>
        <span class="badge b-invest" style="font-size:11px">يُحفظ باستقلالية عن حالة البلاغ</span></div>
      <div class="pb">
        <div class="alert alert-i" style="margin-bottom:14px">${ICONS.info} يمكن حفظ محضر الزيارة وتحديثه أكثر من مرة دون التأثير على حالة البلاغ. يتم إرسال البلاغ لرئيس القسم فقط من لوحة الإجراءات.</div>
        <div class="fgrp" style="margin-bottom:14px">
          <label class="flbl">موقع الزيارة الجغرافي</label>
          <div style="height:180px;background:var(--g50);border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--text3);font-size:13px;border:1px dashed var(--border2);position:relative;overflow:hidden">
            <div style="position:absolute;top:10px;left:10px;background:#fff;padding:6px 12px;border-radius:6px;box-shadow:0 2px 6px rgba(0,0,0,0.1);display:flex;gap:8px;font-size:12px;font-weight:600;color:var(--text2);cursor:pointer;border:1px solid var(--border1)" onclick="showToast('تم التقاط إحداثيات الموقع الحالي','s')">
               <span style="color:var(--primary);display:inline-flex;width:14px;height:14px">${ICONS.map}</span> التقاط الموقع الحالي
            </div>
            <div style="font-size:24px;margin-bottom:8px">🗺️</div>
            <div>[ محاكاة خريطة الموقع ]</div>
          </div>
          <input class="fc" style="margin-top:10px" value="${c.visitLocation || ''}" placeholder="موقع الزيارة">
        </div>
        <div class="fgrp" style="margin-bottom:14px">
          <label class="flbl">تفاصيل المحضر الميداني <span class="req">*</span></label>
          <textarea class="fc" id="${minutesVid}-details" rows="10" placeholder="أدخل تفاصيل المحضر الميداني بشكل كامل: المشاهدات الميدانية، السجلات التي تم مراجعتها، المخالفات المرصودة، مقارنة السجلات بالواقع، التوصيات والإجراءات المقترحة..." style="resize:vertical;font-size:13px;line-height:1.8">${c.visitMinutes || ''}</textarea>
        </div>
        <div class="fgrp" style="margin-bottom:14px">
          <label class="flbl">ملخص المحضر</label>
          <textarea class="fc" id="${minutesVid}-summary" rows="4" placeholder="ملخص موجز للنتائج والتوصيات..." style="resize:vertical">${c.visitSummary || ''}</textarea>
        </div>
        <div style="margin-bottom:14px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
            <label class="flbl" style="margin:0">المفتشين القائمين بالزيارة</label>
            <button class="btn btn-sm btn-outline" type="button" onclick="_addAttendeeRow('${minutesVid}')">${ICONS.plus} إضافة مفتش</button>
          </div>
          <table style="width:100%;border-collapse:collapse;border:1px solid var(--border1);border-radius:8px;overflow:hidden;margin-bottom:4px" id="${minutesVid}-att-table">
            <thead><tr>
              <th style="padding:10px 14px;font-size:12px;font-weight:700;background:var(--g100);text-align:right;border-bottom:2px solid var(--border2)">اسم المفتش</th>
              <th style="padding:10px 14px;font-size:12px;font-weight:700;background:var(--g100);text-align:right;border-bottom:2px solid var(--border2)">المسمى الوظيفي</th>
              <th style="padding:10px 14px;font-size:12px;font-weight:700;background:var(--g100);border-bottom:2px solid var(--border2);width:48px"></th>
            </tr></thead>
            <tbody id="${minutesVid}-att-body">
              <tr id="${minutesVid}-att-0" style="border-bottom:1px solid var(--border1)">
                <td style="padding:8px 10px"><input class="fc" style="margin:0;padding:6px 10px;font-size:13px" placeholder="الاسم الكامل" value="حاتم سالم الزدجالي"></td>
                <td style="padding:8px 10px"><input class="fc" style="margin:0;padding:6px 10px;font-size:13px" placeholder="المسمى الوظيفي" value="مفتش ميداني"></td>
                <td style="padding:8px 10px;text-align:center"><button class="btn btn-sm btn-ghost" style="color:var(--danger)" type="button" onclick="_removeAttendeeRow('${minutesVid}-att-0')">✕</button></td>
              </tr>
            </tbody>
          </table>
          <script>
          var _attCtr_${minutesVid.replace(/-/g, '_')} = 2;
          function _addAttendeeRow(vid) {
            var ctr = ++window['_attCtr_' + vid.replace(/-/g,'_')];
            var rowId = vid + '-att-' + ctr;
            var tbody = document.getElementById(vid + '-att-body');
            if (!tbody) return;
            var tr = document.createElement('tr');
            tr.id = rowId;
            tr.style.borderBottom = '1px solid var(--border1)';
            tr.innerHTML = '<td style="padding:8px 10px"><input class="fc" style="margin:0;padding:6px 10px;font-size:13px" placeholder="الاسم الكامل"></td>'
              + '<td style="padding:8px 10px"><input class="fc" style="margin:0;padding:6px 10px;font-size:13px" placeholder="المسمى الوظيفي"></td>'
              + '<td style="padding:8px 10px;text-align:center"><button class="btn btn-sm btn-ghost" style="color:var(--danger)" type="button" onclick="_removeAttendeeRow(\\'' + rowId + '\\')">✕</button></td>';
            tbody.appendChild(tr);
          }
          function _removeAttendeeRow(rowId) {
            var row = document.getElementById(rowId);
            if (row) row.remove();
          }
          </script>
        </div>
        <div style="margin-bottom:14px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
            <label class="flbl" style="margin:0">بيانات الأشخاص الذين تم مقابلتهم</label>
            <button class="btn btn-sm btn-outline" type="button" onclick="_addMetPersonRow('${minutesVid}')">${ICONS.plus} إضافة شخص</button>
          </div>
          <table style="width:100%;border-collapse:collapse;border:1px solid var(--border1);border-radius:8px;overflow:hidden;margin-bottom:4px" id="${minutesVid}-met-table">
             <thead><tr>
               <th style="padding:10px 14px;font-size:12px;font-weight:700;background:var(--g100);text-align:right;border-bottom:2px solid var(--border2)">الاسم</th>
               <th style="padding:10px 14px;font-size:12px;font-weight:700;background:var(--g100);text-align:right;border-bottom:2px solid var(--border2)">الصفة / المنصب</th>
               <th style="padding:10px 14px;font-size:12px;font-weight:700;background:var(--g100);text-align:right;border-bottom:2px solid var(--border2)">الهاتف</th>
               <th style="padding:10px 14px;font-size:12px;font-weight:700;background:var(--g100);border-bottom:2px solid var(--border2);width:48px"></th>
             </tr></thead>
             <tbody id="${minutesVid}-met-body">
                ${(c.metPeople && c.metPeople.length ? c.metPeople : [{ name: 'أحمد سعيد', title: 'مدير الموارد البشرية', phone: '98765432' }]).map((p, idx) => `
                <tr id="${minutesVid}-met-${idx}" style="border-bottom:1px solid var(--border1)">
                  <td style="padding:8px 10px"><input class="fc" style="margin:0;padding:6px 10px;font-size:13px" placeholder="الاسم" value="${p.name || ''}"></td>
                  <td style="padding:8px 10px"><input class="fc" style="margin:0;padding:6px 10px;font-size:13px" placeholder="الصفة" value="${p.title || ''}"></td>
                  <td style="padding:8px 10px"><input class="fc" style="margin:0;padding:6px 10px;font-size:13px" placeholder="رقم الهاتف" value="${p.phone || ''}"></td>
                  <td style="padding:8px 10px;text-align:center"><button class="btn btn-sm btn-ghost" style="color:var(--danger)" type="button" onclick="_removeAttendeeRow('${minutesVid}-met-${idx}')">✕</button></td>
                </tr>`).join('')}
             </tbody>
          </table>
          <script>
            if(!window._metCtrMap) window._metCtrMap = {};
            window._metCtrMap['${minutesVid}'] = ${(c.metPeople && c.metPeople.length ? c.metPeople.length : 1)};
            function _addMetPersonRow(vid) {
              var ctr = ++window._metCtrMap[vid];
              var rowId = vid + '-met-' + ctr;
              var tbody = document.getElementById(vid + '-met-body');
              if (!tbody) return;
              var tr = document.createElement('tr');
              tr.id = rowId;
              tr.style.borderBottom = '1px solid var(--border1)';
              tr.innerHTML = '<td style="padding:8px 10px"><input class="fc" style="margin:0;padding:6px 10px;font-size:13px" placeholder="الاسم"></td>'
                + '<td style="padding:8px 10px"><input class="fc" style="margin:0;padding:6px 10px;font-size:13px" placeholder="الصفة"></td>'
                + '<td style="padding:8px 10px"><input class="fc" style="margin:0;padding:6px 10px;font-size:13px" placeholder="رقم الهاتف"></td>'
                + '<td style="padding:8px 10px;text-align:center"><button class="btn btn-sm btn-ghost" style="color:var(--danger)" type="button" onclick="_removeAttendeeRow(\\'' + rowId + '\\')">✕</button></td>';
              tbody.appendChild(tr);
            }
          </script>
        </div>
        <div style="margin-bottom:14px">
          <label class="flbl">مرفقات المحضر</label>
          <div class="dz-box" style="padding:14px;min-height:auto">
            <div style="display:flex;align-items:center;gap:12px">
              <div style="font-size:22px;color:var(--text3)">${ICONS.upload}</div>
              <div style="flex:1"><div style="font-size:12.5px;font-weight:600;color:var(--text2)">صور المحضر، وثائق المنشأة، إثباتات ميدانية</div>
                <div style="font-size:11px;color:var(--text3)">PDF, JPG, PNG, DOC — الحد الأقصى 20 MB</div></div>
              <button class="btn btn-secondary btn-sm" onclick="showToast('فتح نافذة الرفع','i')">اختيار ملف</button>
            </div>
          </div>
        </div>
        <button class="btn btn-primary" onclick="(function(){var d=document.getElementById('${minutesVid}-details');if(!d||!d.value.trim()){showToast('يرجى إدخال تفاصيل المحضر','w');return;}showToast('تم حفظ محضر الزيارة بنجاح — يمكنك تحديثه لاحقاً','s');})()">
          ${ICONS.check}حفظ محضر الزيارة
        </button>
      </div>
    </div>`;

  const visitMinutesPanel = showVisitMinutes
    ? (role === 'field-head' ? _buildVisitMinutesReadOnly(c) : _visitMinutesEditable)
    : '';

  const tabs = [
    { label: 'البيانات الأساسية', content: requestPanel + submitterPanel + employerPanel + workerPanel + tempBlockPanel },
    { label: 'التحقق والبيانات', content: verifyContent || '<p class="tx3 fs11" style="padding:16px">لا توجد بيانات تحقق لهذا البلاغ</p>' },
    { label: 'المستندات المطلوبة', content: docsContent + attachmentsPanel },
    ...(showVisitMinutes ? [{ label: 'محضر الزيارة', content: visitMinutesPanel, badge: c.visitMinutes ? '✓' : '' }] : []),
    { label: 'الإجراءات', content: actionContent || '<p class="tx3 fs11" style="padding:16px">لا توجد إجراءات متاحة في الوضع الحالي</p>', badge: hasAction ? '!' : '' },
    { label: 'الملاحظات', content: notesPanel || '<p class="tx3 fs11" style="padding:16px">لا توجد ملاحظات</p>' },
    { label: 'السجل والمراسلات', content: historyContent },
  ];
  return pgHead + summaryBar + _tabView(tid, tabs, hasAction ? (showVisitMinutes ? 4 : 3) : 0);
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
      'اغلاق البلاغ'
    ];
  }

  if (role === 'inspection-director') {
    if (status !== 'انتظار اعتماد مدير الدائرة' && status !== 'تم اغلاق البلاغ') return [];
    return [
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
  const noReplyEl = panel.querySelector('[data-no-reply-decision]');
  const closeTypeEl = panel.querySelector('[data-close-type]');
  const noteRequired = noteEl && noteEl.dataset.required === 'true';
  const noReplyActions = [
    'طلب استيفاء البيانات من كافة أطراف البلاغ',
    'طلب استيفاء البيانات من صاحب العمل فقط',
    'طلب استيفاء البيانات من المؤمن عليه فقط'
  ];
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
  if (noReplyActions.includes(action) && (!noReplyEl || !noReplyEl.value)) {
    showToast('يرجى اختيار القرار عند عدم الرد قبل متابعة الإجراء.', 'w');
    return;
  }
  if (action === 'اغلاق البلاغ' && closeTypeEl) {
    if (!closeTypeEl.value) {
      showToast('يرجى اختيار إجراء الإغلاق قبل المتابعة.', 'w');
      return;
    }
    if (closeTypeEl.value === 'wage-confirmation') {
      const requiredIds = ['wage-current', 'wage-proven', 'wage-researched', 'wage-decided'];
      for (var i = 0; i < requiredIds.length; i += 1) {
        var input = document.getElementById(requiredIds[i] + '-' + panelId);
        if (!input || !String(input.value || '').trim()) {
          showToast('يرجى استكمال بيانات تأكيد تعديل أجر العامل.', 'w');
          return;
        }
      }
    }
    if (closeTypeEl.value === 'registration-confirmation') {
      const requiredIds = ['join-reported', 'join-researched', 'join-decided'];
      for (var j = 0; j < requiredIds.length; j += 1) {
        var dateInput = document.getElementById(requiredIds[j] + '-' + panelId);
        if (!dateInput || !String(dateInput.value || '').trim()) {
          showToast('يرجى استكمال بيانات تأكيد تسجيل العامل.', 'w');
          return;
        }
      }
    }
  }

  const reasonText = reasonEl && reasonEl.value ? ` (السبب: ${reasonEl.value})` : '';
  const noReplyText = noReplyEl && noReplyEl.value ? ` — قرار عدم الرد: ${noReplyEl.value}` : '';
  const closeTypeText = closeTypeEl && closeTypeEl.value
    ? ` — إجراء الإغلاق: ${closeTypeEl.options[closeTypeEl.selectedIndex].text}`
    : '';
  showToast(`تم تنفيذ: ${action}${reasonText}${noReplyText}${closeTypeText}`, 's');
}

function _buildComplaintActionPanel(role, c) {
  const btns = _getComplaintActions(role, c.status);
  if (!btns.length) return '';

  const isExternalRole = role === 'employer' || role === 'insured';
  const isApplicantRole = role === 'fund-staff' || isExternalRole;
  const reasonRequiredActions = [
    'توصية برفض البلاغ', 'توصية بحفظ البلاغ', 'تأكيد رفض البلاغ',
    'اغلاق البلاغ', 'حفظ البلاغ', 'رفض اجراء التفتيش على البلاغ', 'إعادة فتح البلاغ'
  ];
  const showReasonField = btns.some(b => reasonRequiredActions.includes(b));
  const panelId = `action-panel-${c.id}`;
  const penaltiesRoles = ['monitoring-head', 'field-head', 'inspection-director'];
  const showPenalties = penaltiesRoles.includes(role) && btns.includes('اغلاق البلاغ');
  const hasReassign = (role === 'monitoring-head' || role === 'field-head') && btns.includes('إعادة تعيين الموظف المختص ببحث البلاغ');
  const hasNoReplyDecision = btns.some(function (b) {
    return [
      'طلب استيفاء البيانات من كافة أطراف البلاغ',
      'طلب استيفاء البيانات من صاحب العمل فقط',
      'طلب استيفاء البيانات من المؤمن عليه فقط'
    ].includes(b);
  });

  /* filter reassign out of main buttons — handled inline */
  const mainBtns = btns.filter(b => b !== 'إعادة تعيين الموظف المختص ببحث البلاغ');
  const actionBtnHtml = mainBtns.map(b => {
    const cls = INSP_CONFIG.actionStyles[b] || 'btn-secondary btn-sm';
    const extra = b === 'اغلاق البلاغ' && showPenalties
      ? `onclick="_togglePenaltiesPanel('${panelId}')"`
      : `onclick="executeComplaintAction('${b}', '${c.id}', '${panelId}')"`;
    return `<button class="btn ${cls}" ${extra}>${b}</button>`;
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

  const reassignHtml = hasReassign ? `
    <div class="card" style="margin-bottom:12px;border:1px dashed var(--primary)">
      <div class="ph" style="cursor:pointer" onclick="_toggleSection('reassign-${panelId}')">
        <h3><span class="pico tl">${ICONS.switch}</span>إعادة تعيين الموظف المختص ببحث البلاغ</h3>
        <span class="tx3 fs11">انقر للتوسيع</span>
      </div>
      <div id="reassign-${panelId}" style="display:none">
        <div class="pb"><div class="fg fg-2">
          <div class="fgrp"><label class="flbl">الموظف الجديد المكلف <span class="req">*</span></label>
            <select class="fc" id="reassign-staff-${panelId}">
              <option value="">— اختر الموظف —</option>
              <option value="سيف خلفان الأمري">سيف خلفان الأمري — قسم المتابعة والبلاغات (3 بلاغات نشطة)</option>
              <option value="منى راشد البلوشي">منى راشد البلوشي — الصندوق (1 بلاغ نشط)</option>
            </select></div>
          <div class="fgrp"><label class="flbl">سبب اختيار الموظف الجديد <span class="req">*</span></label>
            <input class="fc" id="reassign-reason-${panelId}" placeholder="مثال: خبرة في هذا النوع من البلاغات، عبء عمل أقل..."></div>
          <div class="fgrp span-full"><label class="flbl">سبب إعادة التخصيص <span class="req">*</span></label>
            <textarea class="fc" id="reassign-note-${panelId}" rows="2" placeholder="أدخل سبب إعادة التخصيص..."></textarea></div>
          <div class="fgrp"><button class="btn btn-primary btn-sm" onclick="_confirmReassignInline('${panelId}','${c.id}')">تأكيد إعادة التعيين</button></div>
        </div></div>
      </div>
    </div>` : '';

  const noReplyDecisionHtml = hasNoReplyDecision ? `
    <div class="card" style="margin-bottom:12px;border:1px dashed var(--accent)">
      <div class="ph"><h3><span class="pico or">${ICONS.warn}</span>القرار عند عدم الرد خلال الفترة المحددة</h3></div>
      <div class="pb">
        <div class="fgrp" style="margin:0">
          <select class="fc" data-no-reply-decision>
            <option value="">— اختر القرار —</option>
            <option>لا يوجد إجراء</option>
            <option>حظر صاحب العمل</option>
            <option>حظر العامل</option>
          </select>
        </div>
      </div>
    </div>` : '';

  const penaltiesHtml = showPenalties ? `
    <div id="penalties-${panelId}" style="display:none;margin-bottom:16px;border:2px solid var(--danger);border-radius:var(--rsm);padding:16px">
      <div style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:var(--danger);margin-bottom:14px"><span style="display:inline-flex;width:18px;height:18px;flex-shrink:0">${ICONS.warn}</span>إجراء الإغلاق</div>
      <div class="fg fg-2">
        <div class="fgrp"><label class="flbl">نوع الإجراء</label>
          <select class="fc" id="penalty-type-${panelId}" data-close-type onchange="_togglePenaltyFields('${panelId}')">
            <option value="">— اختر الإجراء —</option>
            <option value="none">إغلاق بدون عقوبة</option>
            <option value="fine">غرامة مالية</option>
            <option value="ban">حظر صاحب العمل</option>
            <option value="both">غرامة مالية وحظر صاحب العمل</option>
            <option value="wage-confirmation">تأكيد تعديل أجر العامل</option>
            <option value="registration-confirmation">تأكيد تسجيل العامل</option>
          </select></div>
        <div class="fgrp" id="penalty-amount-grp-${panelId}" style="display:none">
          <label class="flbl">مبلغ الغرامة (ر.ع) <span class="req">*</span></label>
          <input class="fc" type="number" id="penalty-amount-${panelId}" placeholder="أدخل مبلغ الغرامة" min="0">
        </div>
        <div class="fgrp" id="close-ban-target-grp-${panelId}" style="display:none">
          <label class="flbl">نوع الحظر</label>
          <input class="fc" value="حظر صاحب العمل" readonly>
        </div>
        <div class="fgrp" id="wage-current-grp-${panelId}" style="display:none">
          <label class="flbl">Current</label>
          <input class="fc" type="number" id="wage-current-${panelId}" value="${(c.registeredData && c.registeredData.salary) || ''}" placeholder="الأجر الحالي">
        </div>
        <div class="fgrp" id="wage-proven-grp-${panelId}" style="display:none">
          <label class="flbl">Proven</label>
          <input class="fc" type="number" id="wage-proven-${panelId}" value="${c.correctWage || (c.requestedData && c.requestedData.actualSalary) || ''}" placeholder="الأجر المثبت في البلاغ">
        </div>
        <div class="fgrp" id="wage-researched-grp-${panelId}" style="display:none">
          <label class="flbl">Researched</label>
          <input class="fc" type="number" id="wage-researched-${panelId}" placeholder="الأجر الناتج عن بحث الموظف">
        </div>
        <div class="fgrp" id="wage-decided-grp-${panelId}" style="display:none">
          <label class="flbl">Decided</label>
          <input class="fc" type="number" id="wage-decided-${panelId}" placeholder="الأجر الذي يقره رئيس القسم أو المدير">
        </div>
        <div class="fgrp" id="join-reported-grp-${panelId}" style="display:none">
          <label class="flbl">Reported Date</label>
          <input class="fc" type="date" id="join-reported-${panelId}" value="${c.actualJoinDate || (c.requestedData && c.requestedData.actualJoinDate) || ''}">
        </div>
        <div class="fgrp" id="join-researched-grp-${panelId}" style="display:none">
          <label class="flbl">Researched Date</label>
          <input class="fc" type="date" id="join-researched-${panelId}">
        </div>
        <div class="fgrp" id="join-decided-grp-${panelId}" style="display:none">
          <label class="flbl">Decided Date</label>
          <input class="fc" type="date" id="join-decided-${panelId}">
        </div>
        <div class="fgrp span-full"><label class="flbl">ملاحظات العقوبة</label>
          <textarea class="fc" id="penalty-notes-${panelId}" rows="3" placeholder="أي ملاحظات تفصيلية حول العقوبة المطبقة..." style="resize:vertical"></textarea>
        </div>
      </div>
      <div class="dp-acts" style="margin-top:12px">
        <button class="btn btn-danger btn-sm" onclick="executeComplaintAction('اغلاق البلاغ','${c.id}','${panelId}')">تأكيد الإغلاق مع تطبيق العقوبة</button>
        <button class="btn btn-ghost btn-sm" onclick="executeComplaintAction('اغلاق البلاغ','${c.id}','${panelId}')">إغلاق بدون عقوبة</button>
      </div>
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
              <div style="flex:1"><div style="font-size:12.5px;font-weight:600;color:var(--text2)">اسحب الملفات هنا أو انقر للرفع</div>
                <div style="font-size:11px;color:var(--text3)">PDF, DOC, JPG — الحد الأقصى 10 MB</div></div>
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
        ${reassignHtml}
        ${noReplyDecisionHtml}
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
              <div style="flex:1"><div style="font-size:12.5px;font-weight:600;color:var(--text2)">اسحب الملفات هنا أو انقر للرفع</div>
                <div style="font-size:11px;color:var(--text3)">PDF, DOC, JPG — الحد الأقصى 10 MB</div></div>
              <button class="btn btn-secondary btn-sm" onclick="showToast('فتح نافذة الرفع','i')">اختيار ملف</button>
            </div>
          </div>
        </div>
        ${penaltiesHtml}
        <div class="dp-acts">${actionBtnHtml}</div>
      </div>
    </div>
    <script>
    function _togglePenaltiesPanel(pid) {
      var el = document.getElementById('penalties-'+pid);
      if (el) el.style.display = el.style.display === 'none' ? '' : 'none';
    }
    function _toggleSection(id) {
      var el = document.getElementById(id);
      if (el) el.style.display = el.style.display === 'none' ? '' : 'none';
    }
    function _togglePenaltyFields(pid) {
      var sel = document.getElementById('penalty-type-'+pid);
      if (!sel) return;
      var fineGrp = document.getElementById('penalty-amount-grp-'+pid);
      var banGrp = document.getElementById('close-ban-target-grp-'+pid);
      var wageIds = ['wage-current-grp-', 'wage-proven-grp-', 'wage-researched-grp-', 'wage-decided-grp-'];
      var joinIds = ['join-reported-grp-', 'join-researched-grp-', 'join-decided-grp-'];
      if (fineGrp) fineGrp.style.display = (sel.value === 'fine' || sel.value === 'both') ? '' : 'none';
      if (banGrp) banGrp.style.display = (sel.value === 'ban' || sel.value === 'both') ? '' : 'none';
      wageIds.forEach(function(prefix) {
        var el = document.getElementById(prefix + pid);
        if (el) el.style.display = sel.value === 'wage-confirmation' ? '' : 'none';
      });
      joinIds.forEach(function(prefix) {
        var el = document.getElementById(prefix + pid);
        if (el) el.style.display = sel.value === 'registration-confirmation' ? '' : 'none';
      });
    }
    function _confirmReassignInline(pid, cid) {
      var staff = document.getElementById('reassign-staff-'+pid);
      var reason = document.getElementById('reassign-reason-'+pid);
      var note = document.getElementById('reassign-note-'+pid);
      if (!staff || !staff.value) { showToast('يرجى اختيار الموظف الجديد','w'); return; }
      if (!reason || !reason.value.trim()) { showToast('يرجى إدخال سبب اختيار الموظف','w'); return; }
      if (!note || !note.value.trim()) { showToast('يرجى إدخال سبب إعادة التخصيص','w'); return; }
      showToast('تمت إعادة تعيين البلاغ ' + cid + ' إلى ' + staff.value + ' بنجاح', 's');
      var sec = document.getElementById('reassign-'+pid);
      if (sec) sec.style.display = 'none';
    }
    <\/script>`;
}

/* ── قائمة التظلمات ── */
function renderAppealsList(role) {
  const canCreate = role === 'employer' || role === 'insured';
  const createBtn = canCreate ? `<button class="btn btn-primary" onclick="navigateTo('appeal-new')">${ICONS.plus}تظلم جديد</button>` : '';

  const filters = _filterBar([
    { label: 'بحث برقم التظلم', ph: 'YYYY-02-...' },
    { label: 'الحالة', type: 'select', opts: ['تم تقديم التظلم', 'قيد الدراسة', 'تم قبول التظلم', 'تم رفض التظلم', 'تم إغلاق التظلم'] },
    { label: 'نوع التظلم', type: 'select', opts: ['تظلم على القرار', 'تظلم على محضر الزيارة', 'تظلم على إجراء الإغلاق', 'تظلم على قرار الحظر'] },
    { label: 'من تاريخ', type: 'date' },
  ]);

  let data = INSP_DATA.appeals;
  if (role === 'employer') data = data.filter(a => a.submittedBy === 'employer');
  if (role === 'insured') data = data.filter(a => a.submittedBy === 'insured');

  const isExtA = role === 'employer' || role === 'insured';
  const TODAY_A = '2025-01-22';
  function _appealSlaCell(a) {
    if (!a.dueDate || a.status.includes('إغلاق') || a.status.includes('رفض') || a.status.includes('قبول')) return '<td>—</td>';
    const remaining = Math.ceil((new Date(a.dueDate) - new Date(TODAY_A)) / 86400000);
    let badge, label;
    if (remaining > 3) { badge = 'b-approved'; label = `${remaining} يوم متبقي`; }
    else if (remaining >= 0) { badge = 'b-session'; label = `${remaining} أيام — قريب`; }
    else { badge = 'b-high'; label = `متأخر ${Math.abs(remaining)} يوم`; }
    const escalateBtn = isExtA && remaining < 0
      ? `<br><button class="btn btn-xs btn-warning" style="margin-top:4px" onclick="showToast('تم إرسال طلب التصعيد بنجاح','s')">${ICONS.escalate}تصعيد</button>`
      : '';
    return `<td><span class="badge ${badge}" style="font-size:11px">${label}</span>${escalateBtn}</td>`;
  }

  const rows = data.map(a =>
    `<tr>
      <td><a href="#" onclick="navigateTo('appeal-details','id=${a.id}')" class="txp fw7">${a.id}</a></td>
      <td>${a.type}</td>
      <td class="fw7">${a.relatedId}</td>
      <td>${a.employerName}</td>
      <td>${statusBadge(a.status)}</td>
      <td>${a.submitDate}</td>
      ${_appealSlaCell(a)}
      <td><button class="btn btn-primary btn-xs" onclick="navigateTo('appeal-details','id=${a.id}')">${ICONS.eye}عرض</button></td>
    </tr>`).join('');

  return `<div class="pg-head"><div><h1>قائمة التظلمات</h1><p>${data.length} تظلم إجمالاً</p></div>
    <div class="pg-acts">${createBtn}<button class="btn btn-secondary btn-sm">${ICONS.download}تصدير</button></div></div>
    ${filters}
    ${_tblWrap(['رقم التظلم', 'النوع', 'البلاغ/الزيارة المرتبطة', 'المنشأة', 'الحالة', 'تاريخ التقديم', 'الأيام المتبقية / SLA', 'إجراء'], rows || _noData())}`;
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
  var _appealComplaintsData = ${JSON.stringify(eligibleComplaints.map(c => ({ id: c.id, type: c.type, status: c.status, employerName: c.employerName, submitDate: c.submitDate })))};
  var _appealVisitsData = ${JSON.stringify(eligibleVisits.map(v => ({ id: v.id, employerName: v.employerName, status: v.status, scheduledDate: v.scheduledDate || v.actualDate })))};
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
  const appealAttachments = _withSampleAttachments(a, 'appeal');
  const appealNotes = _withSampleNotes(a, 'appeal');
  const allVisits = [...(INSP_DATA.visits.periodic || []), ...(INSP_DATA.visits.surprise || []), ...(INSP_DATA.visits.scheduled || [])];
  const relatedBan = a.relatedType === 'قرار حظر' ? (INSP_DATA.banCases || []).find(x => x.id === a.relatedId) : null;

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
    const rv = allVisits.find(v => v.id === a.relatedId);
    if (rv) {
      relatedPanel = `
        <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.map}</span>تفاصيل الزيارة المتظلم منها</h3>
          <span class="badge b-session" style="font-size:11px">${rv.id}</span></div>
        <div class="pb"><div class="fg fg-2">
          <div class="fgrp"><label class="flbl">رقم الزيارة</label><div class="fro fw7 txp">${rv.id}</div></div>
          <div class="fgrp"><label class="flbl">نوع الزيارة</label><div class="fro">${rv.type || (rv.id.includes('-04-') ? 'مفاجئة' : rv.id.includes('-05-') ? 'مجدولة' : 'دورية')}</div></div>
          <div class="fgrp"><label class="flbl">المنشأة</label><div class="fro">${rv.employerName}</div></div>
          <div class="fgrp"><label class="flbl">تاريخ الزيارة</label><div class="fro">${rv.actualDate || rv.scheduledDate || '—'}</div></div>
          <div class="fgrp"><label class="flbl">المفتش</label><div class="fro">${rv.inspectorName || '—'}</div></div>
          <div class="fgrp"><label class="flbl">حالة الزيارة</label><div class="fro">${statusBadge(rv.status)}</div></div>
          ${rv.violations && rv.violations.length ? `<div class="fgrp span-full"><label class="flbl">المخالفات المُسجَّلة (${rv.violations.length})</label>
            <div class="fro">
              ${rv.violations.map(v => `<div style="padding:6px 0;border-bottom:1px solid var(--border);font-size:12.5px">${v.description || v}</div>`).join('')}
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
        ${relatedBan ? `<div class="fgrp"><label class="flbl">نوع الحظر</label><div class="fro">${relatedBan.type}</div></div>` : ''}
        ${relatedBan ? `<div class="fgrp"><label class="flbl">تاريخ الإصدار</label><div class="fro">${relatedBan.issuedDate}</div></div>` : ''}
        ${relatedBan ? `<div class="fgrp span-full"><label class="flbl">السبب النظامي</label><div class="fro" style="min-height:50px">${relatedBan.reason}</div></div>` : ''}
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
  } else if (role === 'inspection-director') {
    const visitLinkedToAppeal = allVisits.find(v => v.id === a.relatedId)
      || (relatedBan && relatedBan.relatedVisitId ? allVisits.find(v => v.id === relatedBan.relatedVisitId) : null);
    const linkedVisitPage = visitLinkedToAppeal
      ? (visitLinkedToAppeal.id.includes('-04-') ? 'visit-surprise-details' : visitLinkedToAppeal.id.includes('-05-') ? 'visit-scheduled-details' : 'visit-periodic-details')
      : null;
    const roleActionHint = a.decision
      ? 'يعرض هذا الجزء قرار التظلم الصادر ومسار المتابعة المرتبط به.'
      : 'يعرض هذا الجزء ما يحتاجه مدير الدائرة عند وجود تصعيد أو اعتماد نهائي أو توجيه بإعادة الفحص.';
    actionPanel = `
      <div class="card">
        <div class="ph"><h3><span class="pico bl">${ICONS.pen}</span>لوحة المدير</h3></div>
        <div class="pb">
          <div class="alert alert-i" style="margin-bottom:14px">${ICONS.info} ${roleActionHint}</div>
          <div class="fg fg-2">
            <div class="fgrp"><label class="flbl">وضع التظلم الحالي</label><div class="fro">${statusBadge(a.status)}</div></div>
            <div class="fgrp"><label class="flbl">هل يتطلب اعتماداً نهائياً؟</label><div class="fro">${a.status.includes('بانتظار') || a.status.includes('اعتماد') ? 'نعم' : 'بحسب مسار التظلم'}</div></div>
            <div class="fgrp"><label class="flbl">الجهة المرفوع منها</label><div class="fro">${a.submittedBy === 'employer' ? 'صاحب العمل' : a.submittedBy === 'insured' ? 'مؤمن عليه' : a.submittedBy}</div></div>
            <div class="fgrp"><label class="flbl">المسار المقترح</label><div class="fro">${a.relatedType === 'قرار حظر' ? 'قرار إداري مع احتمال إعادة فحص' : a.relatedType === 'زيارة ميدانية' ? 'مراجعة محضر الزيارة أو إعادة فحص' : 'مراجعة القرار النهائي على البلاغ'}</div></div>
          </div>
          <div class="fgrp" style="margin-top:12px"><label class="flbl">ملاحظات المدير / التوجيه النهائي</label>
            <textarea class="fc" rows="3" placeholder="يسجل هنا التوجيه النهائي أو مبرر الاعتماد أو الإعادة..."></textarea></div>
          <div class="df ac g8" style="flex-wrap:wrap;margin-top:14px">
            <button class="btn btn-primary btn-sm" onclick="showToast('تم اعتماد القرار النهائي على التظلم','s')">${ICONS.check}اعتماد القرار</button>
            <button class="btn btn-warning btn-sm" onclick="showToast('تم إرجاع التظلم لاستكمال الدراسة','w')">${ICONS.arrow_right}إعادة للدراسة</button>
            <button class="btn btn-accent btn-sm" onclick="showToast('تم التوجيه بإعادة الفحص','s')">${ICONS.switch}توجيه بإعادة فحص</button>
            ${linkedVisitPage ? `<button class="btn btn-secondary btn-sm" onclick="navigateTo('${linkedVisitPage}','id=${visitLinkedToAppeal.id}')">${ICONS.eye}عرض الزيارة المرتبطة</button>` : ''}
          </div>
        </div>
      </div>`;
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

  const pgHead = `<div class="pg-head"><div><h1>${a.id}</h1><p>${a.type} — ${a.employerName}</p></div>
    <div class="pg-acts">${statusBadge(a.status)}<button class="btn btn-secondary btn-sm" onclick="navigateTo('appeals-list')">${ICONS.arrow_right}رجوع</button></div></div>`;

  const summaryBar = _summaryBar([
    ['رقم التظلم', `<strong>${a.id}</strong>`],
    ['النوع', a.type],
    ['المنشأة', a.employerName],
    ['تاريخ التقديم', a.submitDate],
    ['البند المرتبط', `${a.relatedId} (${a.relatedType})`],
    ['الحالة', statusBadge(a.status)],
  ]);

  const appealDataCard = `<div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.file}</span>بيانات طلب التظلم</h3></div>
  <div class="pb"><div class="fg fg-2">
    <div class="fgrp"><label class="flbl">رقم التظلم</label><div class="fro fw7">${a.id}</div></div>
    <div class="fgrp"><label class="flbl">نوع التظلم</label><div class="fro">${a.type}</div></div>
    <div class="fgrp"><label class="flbl">البند المرتبط</label><div class="fro txp fw7">${a.relatedId} (${a.relatedType})</div></div>
    <div class="fgrp"><label class="flbl">الحالة</label><div class="fro">${statusBadge(a.status)}</div></div>
    <div class="fgrp span-full"><label class="flbl">أسباب التظلم</label><div class="fro" style="min-height:70px;white-space:pre-wrap">${a.reasons}</div></div>
  </div></div></div>`;

  const attachmentsCard = `<div class="card"><div class="ph"><h3><span class="pico or">${ICONS.upload}</span>المرفقات (${appealAttachments.length})</h3></div>
  <div class="pb">${appealAttachments.map(f => attRow(f)).join('')}</div></div>`;

  const timelineCard = `<div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.clock}</span>السجل الزمني</h3></div>
  <div class="pb">${renderTimeline(a.timeline)}</div></div>`;

  const hasAction = (actionPanel || '').length > 0;
  const tid = 'adt-' + a.id.replace(/[^a-z0-9]/gi, '-');

  if (isExternal) {
    const tabs = [
      { label: 'بيانات التظلم', content: appealDataCard + submitterPanel },
      { label: 'البيانات المرتبطة', content: relatedPanel || '<p class="tx3 fs11" style="padding:16px">لا توجد بيانات مرتبطة</p>' },
      { label: 'القرار', content: decisionHtml || '<p class="tx3 fs11" style="padding:16px">لم يصدر قرار بعد</p>' },
      { label: 'المرفقات والسجل', content: attachmentsCard + timelineCard },
    ];
    return pgHead + summaryBar + _tabView(tid, tabs, 0);
  }

  const initScript = `<script>
    (function() {
      const el = document.getElementById('correspondence-container');
      if (el && typeof renderCorrespondenceDocumentation === 'function')
        el.innerHTML = renderCorrespondenceDocumentation('appeals', '${a.id}', '${role}');
    })();
  </script>`;

  const correspondenceCard = `<div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.mail}</span>المراسلات</h3></div>
  <div class="pb" id="correspondence-container"></div></div>`;

  const tabs = [
    { label: 'بيانات التظلم', content: appealDataCard + submitterPanel },
    { label: 'البيانات المرتبطة', content: relatedPanel || '<p class="tx3 fs11" style="padding:16px">لا توجد بيانات مرتبطة</p>' },
    { label: 'القرار والإجراءات', content: (decisionHtml || '') + (actionPanel || '<p class="tx3 fs11" style="padding:16px">لا توجد إجراءات متاحة في الوضع الحالي</p>'), badge: hasAction ? '!' : '' },
    { label: 'المرفقات والملاحظات', content: attachmentsCard + renderNotes(appealNotes, a.id) },
    { label: 'السجل والمراسلات', content: timelineCard + correspondenceCard },
  ];
  return pgHead + summaryBar + _tabView(tid, tabs, hasAction ? 2 : 0) + initScript;
}

/* ── قائمة الزيارات ── */
function renderVisitsList(role, type) {
  type = type || 'periodic';
  const typeLabel = { periodic: 'الزيارات الدورية', surprise: 'الزيارات المفاجئة', scheduled: 'الزيارات المجدولة' }[type];
  const canCreate = (role === 'field-head' || role === 'inspection-director') && type === 'surprise';

  const roleProfiles = {
    'monitoring-employee': { name: 'سيف خلفان الأمري' },
    'field-inspector': { name: 'حاتم سالم الزدجالي' }
  };
  const currentProfile = roleProfiles[role] || {};
  const isExt = role === 'employer' || role === 'insured';
  const maskingRoles = ['field-inspector', 'field-head', 'inspection-director', 'ops-analyst'];
  const applyMasking = !isExt && maskingRoles.includes(role);

  function maskLevel(v) {
    if (!applyMasking) return 'none';
    const myName = currentProfile.name || '';
    const assignedToMe = v.inspectorName === myName;
    if (assignedToMe) return 'none';
    if (role === 'field-head' || role === 'inspection-director') return 'none';
    if (v.status === 'مجدولة' && (!v.inspectorName || v.inspectorName.includes('غير معين'))) return 'full';
    return 'partial';
  }

  function maskedText(level, text) {
    if (level === 'none') return text || '—';
    if (level === 'full') return `<span class="masked-field">${ICONS.lock}<span class="masked-dots">••••••••</span></span>`;
    return `<span class="masked-field masked-partial">${ICONS.lock}<span class="masked-dots">مخفي</span></span>`;
  }

  const filters = _filterBar([
    { label: 'بحث برقم الزيارة أو المنشأة', ph: 'YYYY-03-...' },
    { label: 'الحالة', type: 'select', opts: ['مجدولة', 'جارية', 'بانتظار مراجعة المحضر', 'تم اعتماد المحضر', 'مغلقة'] },
    { label: 'المفتش', type: 'select', opts: ['حاتم سالم الزدجالي', 'جميع المفتشين'] },
    { label: 'من تاريخ', type: 'date' },
  ]);

  const data = INSP_DATA.visits[type] || [];
  const detailPage = { periodic: 'visit-periodic-details', surprise: 'visit-surprise-details', scheduled: 'visit-scheduled-details' }[type] || 'visit-periodic-details';

  const rows = data.map(v => {
    const ml = maskLevel(v);
    const isMasked = ml !== 'none';
    const isFullMask = ml === 'full';
    const rowClass = isFullMask ? 'masked-row' : (ml === 'partial' ? 'masked-row-partial' : '');

    const checkoutBtn = applyMasking && isFullMask
      ? `<button class="btn btn-accent btn-xs masked-checkout-btn" onclick="showToast('تم استلام الزيارة بنجاح','s'); this.parentElement.innerHTML='<span class=\'badge b-approved\'>تم الاستلام</span>'">${ICONS.unlock}استلام</button>`
      : '';

    return `<tr class="${rowClass}">
      <td><a href="#" onclick="navigateTo('${detailPage}','id=${v.id}')" class="txp fw7">${v.id}</a></td>
      <td class="fw7">${maskedText(ml, v.employerName)}</td>
      <td>${ml === 'none' ? v.inspectorName : (isFullMask ? maskedText(ml, '') : v.inspectorName)}</td>
      <td>${statusBadge(v.status)}</td>
      <td>${v.scheduledDate}</td>
      <td>${v.actualDate || '<span class="tx3">—</span>'}</td>
      <td><div class="df ac g8">
        ${isFullMask ? checkoutBtn : `<button class="btn btn-primary btn-xs" onclick="navigateTo('${detailPage}','id=${v.id}')">${ICONS.eye}عرض</button>`}
        ${role === 'field-inspector' && v.status === 'مجدولة' && ml === 'none' ? `<button class="btn btn-accent btn-xs" onclick="showToast('تم بدء الزيارة','s')">بدء</button>` : ''}
        ${role === 'field-head' && v.status === 'بانتظار مراجعة المحضر' ? `<button class="btn btn-warning btn-xs" onclick="navigateTo('${detailPage}','id=${v.id}')">مراجعة</button>` : ''}
        ${role === 'field-head' && (v.status === 'مجدولة' || v.status === 'قيد التنفيذ') ? `<button class="btn btn-secondary btn-xs" onclick="navigateTo('inspector-redistribution','visit=${v.id}')">${ICONS.switch}إعادة توزيع</button>` : ''}
      </div></td>
    </tr>`}).join('');

  const maskBanner = applyMasking ? `
    <div class="mask-legend-banner">
      <div class="mask-legend-icon">${ICONS.shield}</div>
      <div class="mask-legend-body">
        <div class="mask-legend-title">شفافية توزيع الزيارات الميدانية</div>
        <div class="mask-legend-desc">لحماية بيانات المنشآت وضمان الحيادية، يتم إخفاء بيانات الزيارات غير المستلمة. استلم الزيارة لتتمكن من الاطلاع على كامل البيانات.</div>
      </div>
    </div>` : '';

  return `<div class="pg-head"><div><h1>${typeLabel}</h1><p>${data.length} زيارة إجمالاً</p></div>
    <div class="pg-acts">${canCreate ? `<button class="btn btn-primary" onclick="navigateTo('visit-new')">${ICONS.plus}إضافة زيارة</button>` : ''}
      <button class="btn btn-secondary btn-sm">${ICONS.download}تصدير</button></div></div>
    ${maskBanner}
    ${filters}
    ${_tblWrap(['رقم الزيارة', 'المنشأة', 'المفتش', 'الحالة', 'التاريخ المجدول', 'تاريخ التنفيذ', 'إجراء'], rows || _noData())}`;
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
  const visitReport = _buildVisitReport(v, typeLabel);

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
      ${visitReport.visitLocation ? `<div class="fgrp span-full"><label class="flbl">موقع الزيارة</label><div class="fro">${visitReport.visitLocation}</div></div>` : ''}
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
      ${visitReport.metPeople.length ? `<div class="mt12"><strong class="fs12">الأشخاص الذين تمت مقابلتهم:</strong>
        <div class="fro" style="margin-top:8px">${visitReport.metPeople.map(x => `<div style="padding:6px 0;border-bottom:1px solid var(--border)">${x.name} — ${x.title} — ${x.phone}</div>`).join('')}</div></div>` : ''}
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

  const visitReportCard = `
    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.file}</span>محضر وتقرير المفتش</h3>
      <span class="badge b-session" style="font-size:11px">${visitReport.submittedDate}</span></div>
    <div class="pb">
      <div class="alert alert-i" style="margin-bottom:14px">${ICONS.info} هذا القسم يعرض المحضر الميداني كما يرفعه المفتش، ويُستخدم مباشرة من رئيس القسم للمراجعة والاعتماد أو الإعادة.</div>
      <div class="fg fg-2">
        <div class="fgrp"><label class="flbl">أعد التقرير</label><div class="fro fw7">${visitReport.submittedBy}</div></div>
        <div class="fgrp"><label class="flbl">تاريخ الرفع</label><div class="fro">${visitReport.submittedDate}</div></div>
        <div class="fgrp"><label class="flbl">تقييم الزيارة</label><div class="fro">${visitReport.visitEvaluation}</div></div>
        <div class="fgrp"><label class="flbl">أثر البلاغ / الأثر الرقابي</label><div class="fro">${visitReport.complaintImpact}</div></div>
        ${visitReport.visitLocation ? `<div class="fgrp span-full"><label class="flbl">موقع الزيارة</label><div class="fro">${visitReport.visitLocation}</div></div>` : ''}
        <div class="fgrp span-full"><label class="flbl">الملخص التنفيذي للمحضر</label><div class="fro" style="min-height:64px;white-space:pre-wrap">${visitReport.summary}</div></div>
        <div class="fgrp span-full"><label class="flbl">السرد الميداني</label><div class="fro" style="min-height:64px;white-space:pre-wrap">${visitReport.fieldNarrative}</div></div>
        <div class="fgrp span-full"><label class="flbl">الحضور أثناء الزيارة</label><div class="fro">${visitReport.attendees.map(x => `<div style="padding:4px 0;border-bottom:1px solid var(--border)">${x}</div>`).join('')}</div></div>
        <div class="fgrp span-full"><label class="flbl">الأشخاص الذين تمت مقابلتهم</label><div class="fro">${visitReport.metPeople.length ? `<table style="width:100%;border-collapse:collapse"><thead><tr><th style="padding:8px 10px;text-align:right;border-bottom:1px solid var(--border)">الاسم</th><th style="padding:8px 10px;text-align:right;border-bottom:1px solid var(--border)">المسمى الوظيفي</th><th style="padding:8px 10px;text-align:right;border-bottom:1px solid var(--border)">رقم الهاتف</th></tr></thead><tbody>${visitReport.metPeople.map(x => `<tr><td style="padding:8px 10px;border-bottom:1px solid var(--border)">${x.name}</td><td style="padding:8px 10px;border-bottom:1px solid var(--border)">${x.title}</td><td style="padding:8px 10px;border-bottom:1px solid var(--border)">${x.phone}</td></tr>`).join('')}</tbody></table>` : '<span class="tx3">لا يوجد أشخاص مسجلون</span>'}</div></div>
        <div class="fgrp span-full"><label class="flbl">أدلة ومشاهدات التحقق</label><div class="fro">${visitReport.evidencePoints.map(x => `<div style="padding:4px 0;border-bottom:1px solid var(--border)">${x}</div>`).join('')}</div></div>
      </div>
    </div></div>`;

  const visitAttachmentsCard = `<div class="card"><div class="ph"><h3><span class="pico or">${ICONS.upload}</span>مرفقات المحضر (${visitReport.attachments.length})</h3></div>
    <div class="pb">${visitReport.attachments.map(f => attRow(f)).join('')}</div></div>`;

  let actionPanel = '';
  if (role === 'field-inspector' && v.status === 'مجدولة') {
    actionPanel = _dpanel('تنفيذ الزيارة', ['بدء الزيارة'], `
      <div class="alert alert-i" style="margin-bottom:12px">${ICONS.info} بمجرد بدء الزيارة سيتمكن المفتش من استكمال المحضر وإرفاق الأدلة ورفع التقرير لرئيس القسم.</div>
      <div class="fgrp"><label class="flbl">هدف الزيارة</label><textarea class="fc" rows="3" placeholder="أدخل الهدف التشغيلي للزيارة ونطاق الفحص المتوقع...">${v.purpose || v.reason || ''}</textarea></div>`);
  } else if (role === 'field-inspector' && v.status === 'جارية') {
    actionPanel = _dpanel('رفع المحضر', ['رفع المحضر'], `
      <div class="fgrp" style="margin-bottom:14px">
        <label class="flbl">موقع الزيارة الجغرافي</label>
        <div style="height:180px;background:var(--g50);border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--text3);font-size:13px;border:1px dashed var(--border2);position:relative;overflow:hidden">
          <div style="position:absolute;top:10px;left:10px;background:#fff;padding:6px 12px;border-radius:6px;box-shadow:0 2px 6px rgba(0,0,0,0.1);display:flex;gap:8px;font-size:12px;font-weight:600;color:var(--text2);cursor:pointer;border:1px solid var(--border1)" onclick="showToast('تم التقاط إحداثيات الموقع الحالي','s')">
             <span style="color:var(--primary);display:inline-flex;width:14px;height:14px">${ICONS.map}</span> التقاط الموقع الحالي
          </div>
          <div style="font-size:24px;margin-bottom:8px">🗺️</div>
          <div>[ محاكاة خريطة الموقع ]</div>
        </div>
      </div>
      <div class="fgrp"><label class="flbl">ملخص المحضر <span class="req">*</span></label><textarea class="fc" rows="3" placeholder="أدخل ملخصاً واضحاً للزيارة...">${visitReport.summary}</textarea></div>
      <div class="fgrp"><label class="flbl">المخالفات أو النتائج الرئيسية</label><textarea class="fc" rows="4" placeholder="دوّن المخالفات أو نتائج الفحص...">${visitReport.violations.join('\n')}</textarea></div>
      <div class="fgrp"><label class="flbl">الإجراءات المقترحة</label><textarea class="fc" rows="3" placeholder="دوّن الإجراءات التصحيحية أو التوصيات...">${visitReport.correctiveActions.join('\n')}</textarea></div>
      <div class="fgrp"><label class="flbl">تقييم الزيارة</label><input class="fc" value="${visitReport.visitEvaluation}"></div>
      <div class="fgrp"><label class="flbl">أثر البلاغ / أثر النتيجة</label><input class="fc" value="${visitReport.complaintImpact}"></div>
      
      <div style="margin-bottom:14px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
          <label class="flbl" style="margin:0">بيانات الأشخاص الذين تم مقابلتهم</label>
          <button class="btn btn-sm btn-outline" type="button" onclick="_addMetPersonRow('vpm')">${ICONS.plus} إضافة شخص</button>
        </div>
        <table style="width:100%;border-collapse:collapse;border:1px solid var(--border1);border-radius:8px;overflow:hidden;margin-bottom:4px" id="vpm-met-table">
           <thead><tr>
             <th style="padding:10px 14px;font-size:12px;font-weight:700;background:var(--g100);text-align:right;border-bottom:2px solid var(--border2)">الاسم</th>
             <th style="padding:10px 14px;font-size:12px;font-weight:700;background:var(--g100);text-align:right;border-bottom:2px solid var(--border2)">الصفة / المنصب</th>
             <th style="padding:10px 14px;font-size:12px;font-weight:700;background:var(--g100);text-align:right;border-bottom:2px solid var(--border2)">الهاتف</th>
             <th style="padding:10px 14px;font-size:12px;font-weight:700;background:var(--g100);border-bottom:2px solid var(--border2);width:48px"></th>
           </tr></thead>
           <tbody id="vpm-met-body">
              <tr id="vpm-met-0" style="border-bottom:1px solid var(--border1)">
                <td style="padding:8px 10px"><input class="fc" style="margin:0;padding:6px 10px;font-size:13px" placeholder="الاسم" value="أحمد سعيد"></td>
                <td style="padding:8px 10px"><input class="fc" style="margin:0;padding:6px 10px;font-size:13px" placeholder="الصفة" value="مدير الموارد البشرية"></td>
                <td style="padding:8px 10px"><input class="fc" style="margin:0;padding:6px 10px;font-size:13px" placeholder="رقم الهاتف" value="98765432"></td>
                <td style="padding:8px 10px;text-align:center"><button class="btn btn-sm btn-ghost" style="color:var(--danger)" type="button" onclick="const r = document.getElementById('vpm-met-0'); if(r) r.remove();">✕</button></td>
              </tr>
           </tbody>
        </table>
        <script>
          if(!window._metCtrMap) window._metCtrMap = {};
          window._metCtrMap['vpm'] = 1;
          function _addMetPersonRow(vid) {
            var ctr = ++window._metCtrMap[vid];
            var rowId = vid + '-met-' + ctr;
            var tbody = document.getElementById(vid + '-met-body');
            if (!tbody) return;
            var tr = document.createElement('tr');
            tr.id = rowId;
            tr.style.borderBottom = '1px solid var(--border1)';
            tr.innerHTML = '<td style="padding:8px 10px"><input class="fc" style="margin:0;padding:6px 10px;font-size:13px" placeholder="الاسم"></td>'
              + '<td style="padding:8px 10px"><input class="fc" style="margin:0;padding:6px 10px;font-size:13px" placeholder="الصفة"></td>'
              + '<td style="padding:8px 10px"><input class="fc" style="margin:0;padding:6px 10px;font-size:13px" placeholder="رقم الهاتف"></td>'
              + '<td style="padding:8px 10px;text-align:center"><button class="btn btn-sm btn-ghost" style="color:var(--danger)" type="button" onclick="const r = document.getElementById(\'' + rowId + '\'); if(r) r.remove();">✕</button></td>';
            tbody.appendChild(tr);
          }
        </script>
      </div>

      <div class="dz-box" style="padding:12px;min-height:auto;margin-top:12px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="font-size:20px;color:var(--text3)">${ICONS.upload}</div>
          <div style="flex:1"><div style="font-size:12.5px;font-weight:600">إرفاق الأدلة والمرفقات</div><div style="font-size:11px;color:var(--text3)">صور، محضر، كشف، أو أي مستند داعم</div></div>
          <button class="btn btn-secondary btn-sm" onclick="showToast('فتح نافذة الرفع','i')">اختيار</button>
        </div>
      </div>`);
  } else if (role === 'field-head' && v.status === 'بانتظار مراجعة المحضر') {
    actionPanel = _dpanel('مراجعة المحضر واعتماده', ['اعتماد المحضر', 'إعادة المحضر للمراجعة', 'إصدار أمر تصحيحي'], `
      <div class="alert alert-w" style="margin-bottom:12px">${ICONS.warn} راجع محضر المفتش والمرفقات والأثر المقترح قبل الاعتماد أو الإعادة.</div>
      <div class="fgrp"><label class="flbl">قائمة مراجعة رئيس القسم</label><div class="fro">${visitReport.reviewChecklist.map(x => `<div style="padding:4px 0;border-bottom:1px solid var(--border)">${x}</div>`).join('')}</div></div>
      <div class="fgrp"><label class="flbl">خلاصة المراجعة</label><textarea class="fc" rows="3" placeholder="أدخل ملاحظاتك على المحضر...">المحضر واضح ويعرض الوقائع والمرفقات والأثر المقترح بصورة مناسبة للمراجعة.</textarea></div>`);
  }

  const pgHead = `<div class="pg-head"><div><h1>${v.id}</h1><p>${typeLabel} — ${v.employerName}</p></div>
    <div class="pg-acts">${statusBadge(v.status)}<button class="btn btn-secondary btn-sm" onclick="navigateTo('${listPage}')">${ICONS.arrow_right}رجوع</button></div></div>`;

  const summaryBar = _summaryBar([
    ['رقم الزيارة', `<strong>${v.id}</strong>`],
    ['النوع', typeLabel],
    ['المنشأة', v.employerName],
    ['المفتش', v.inspectorName],
    ['التاريخ المجدول', v.scheduledDate],
    ['التنفيذ', v.actualDate || 'لم ينفذ'],
    ['الحالة', statusBadge(v.status)],
  ]);

  const visitInfoCard = `<div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.clipboard}</span>معلومات الزيارة</h3></div>
  <div class="pb"><div class="fg fg-2">
    <div class="fgrp"><label class="flbl">رقم الزيارة</label><div class="fro fw7">${v.id}</div></div>
    <div class="fgrp"><label class="flbl">نوع الزيارة</label><div class="fro">${typeLabel}</div></div>
    <div class="fgrp"><label class="flbl">المنشأة</label><div class="fro txp fw7">${v.employerName}</div></div>
    <div class="fgrp"><label class="flbl">المفتش المعين</label><div class="fro">${v.inspectorName}</div></div>
    <div class="fgrp"><label class="flbl">التاريخ المجدول</label><div class="fro">${v.scheduledDate}</div></div>
    <div class="fgrp"><label class="flbl">تاريخ التنفيذ</label><div class="fro">${v.actualDate || 'لم ينفذ بعد'}</div></div>
    ${visitReport.visitLocation ? `<div class="fgrp span-full"><label class="flbl">موقع الزيارة</label><div class="fro">${visitReport.visitLocation}</div></div>` : ''}
    ${v.source ? `<div class="fgrp span-full"><label class="flbl">المصدر</label><div class="fro">${v.source}</div></div>` : ''}
    ${v.purpose ? `<div class="fgrp span-full"><label class="flbl">الغرض</label><div class="fro">${v.purpose}</div></div>` : ''}
    ${v.reason ? `<div class="fgrp span-full"><label class="flbl">سبب الزيارة</label><div class="fro">${v.reason}</div></div>` : ''}
  </div></div></div>
  ${v.report && v.report.approved ? `<div class="card"><div class="ph"><h3><span class="pico gr">${ICONS.check}</span>المحضر المعتمد</h3></div>
    <div class="pb"><div class="alert alert-s">${ICONS.check} تم اعتماد المحضر بواسطة ${v.report.approvedBy} بتاريخ ${v.report.approvalDate}</div>
    <button class="btn btn-secondary btn-sm">${ICONS.download}تنزيل المحضر</button></div></div>` : ''}`;

  const checklistCard = `<div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.check}</span>قائمة التحقق</h3></div>
  <div class="pb">${checklistHtml}</div></div>`;

  const historyContent = `
  <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.clock}</span>سجل الأحداث</h3></div>
  <div class="pb">${renderTimeline(v.timeline)}</div></div>
  <div class="card"><div class="ph"><h3><span class="pico rd">${ICONS.video}</span>تسجيلات المكالمات المرئية</h3></div>
  <div class="pb" id="video-call-container"></div></div>
  <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.mail}</span>المراسلات</h3></div>
  <div class="pb" id="correspondence-container"></div></div>`;

  const initScript = `<script>
    (function() {
      const el = document.getElementById('correspondence-container');
      if (el && typeof renderCorrespondenceDocumentation === 'function')
        el.innerHTML = renderCorrespondenceDocumentation('visits', '${v.id}', '${role}');
    })();
    (function() {
      const el = document.getElementById('video-call-container');
      if (el && typeof renderVideoCallRecording === 'function')
        el.innerHTML = renderVideoCallRecording('${v.id}', '${role}');
    })();
  </script>`;

  const hasAction = (actionPanel || '').length > 0;
  const tid = 'vdt-' + v.id.replace(/[^a-z0-9]/gi, '-');
  const tabs = [
    { label: 'معلومات الزيارة', content: visitInfoCard },
    { label: 'قائمة التحقق', content: checklistCard },
    { label: 'النتائج والمحضر', content: (findingsHtml || '<p class="tx3 fs11" style="padding:16px">لا توجد نتائج مرصودة بعد</p>') + visitReportCard + visitAttachmentsCard + renderNotes(visitReport.notes, v.id) },
    { label: 'الإجراءات', content: actionPanel || '<p class="tx3 fs11" style="padding:16px">لا توجد إجراءات متاحة في الوضع الحالي</p>', badge: hasAction ? '!' : '' },
    { label: 'السجل والمراسلات', content: historyContent },
  ];
  return pgHead + summaryBar + _tabView(tid, tabs, hasAction ? 3 : 0) + initScript;
}

/* ── جدولة زيارة جديدة ── */
function renderVisitNew(role) {
  return `<div class="pg-head"><div><h1>جدولة زيارة تفتيشية</h1><p>تعيين المنشأة والمفتش وتحديد موعد الزيارة</p></div>
    <div class="pg-acts"><button class="btn btn-secondary" onclick="goHome()">${ICONS.arrow_right}رجوع</button></div></div>
  <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.calendar}</span>تفاصيل الجدولة</h3></div>
  <div class="pb"><div class="fg fg-2">
    <div class="fgrp"><label class="flbl">نوع الزيارة <span class="req">*</span></label>
      <select class="fc"><option>زيارة مفاجئة</option><option>زيارة مجدولة</option></select></div>
    <div class="fgrp"><label class="flbl">مصدر الزيارة <span class="req">*</span></label>
      <select class="fc"><option>بلاغ محال من المتابعة</option><option>خطة تفتيش دورية</option><option>تظلم أو إعادة فحص</option><option>توجيه مدير الدائرة</option></select></div>
    <div class="fgrp"><label class="flbl">المنشأة المستهدفة <span class="req">*</span></label>
      <select class="fc">${INSP_DATA.employers.map(e => `<option>${e.name}</option>`).join('')}</select></div>
    <div class="fgrp"><label class="flbl">المفتش المكلف <span class="req">*</span></label>
      <select class="fc"><option>حاتم سالم الزدجالي</option></select></div>
    <div class="fgrp"><label class="flbl">تاريخ الزيارة <span class="req">*</span></label>
      <input type="date" class="fc"></div>
    <div class="fgrp"><label class="flbl">الأولوية</label>
      <select class="fc"><option>عادية</option><option>مرتفعة</option><option>عاجلة</option></select></div>
    <div class="fgrp"><label class="flbl">البلاغ/التظلم المرتبط</label>
      <select class="fc"><option value="">لا يوجد</option>${INSP_DATA.complaints.map(c => `<option>${c.id}</option>`).join('')}</select></div>
    <div class="fgrp"><label class="flbl">الخطة المرتبطة</label>
      <select class="fc"><option value="">خارج خطة دورية</option>${INSP_DATA.inspectionPlans.map(p => `<option>${p.id} — ${p.title}</option>`).join('')}</select></div>
    <div class="fgrp"><label class="flbl">النتيجة المتوقعة</label>
      <select class="fc"><option>التحقق من الامتثال</option><option>إثبات المخالفة</option><option>إعادة فحص بعد إجراء تصحيحي</option><option>استيفاء بيانات ميدانية للقرار</option></select></div>
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
  const wid = getParam('worker');
  const civil = getParam('civil');
  let w = null;
  if (wid) w = INSP_DATA.workers.find(x => x.id === wid);
  if (!w && civil) w = INSP_DATA.workers.find(x => x.civil === civil)
    || INSP_DATA.workers.find(x => x.civil.startsWith(civil.substring(0, 6)))
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
  const wAppeals = INSP_DATA.appeals.filter(a => a.submittedByName === w.name || (INSP_DATA.complaints.filter(c => c.workerId === w.id).map(c => c.id).includes(a.relatedId)));
  const empVisits = [...INSP_DATA.visits.periodic, ...INSP_DATA.visits.surprise, ...INSP_DATA.visits.scheduled].filter(v => v.employerId === w.employerId);
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
        <div style="width:56px;height:56px;border-radius:50%;background:var(--primary);color:#fff;font-size:20px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">${w.name.substring(0, 2)}</div>
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
        <div class="fgrp"><label class="flbl">حماية الأجور</label><div class="fro"><span class="badge ${w.wageProtection === 'منتظم' ? 'b-approved' : 'b-returned'}">${w.wageProtection}</span></div></div>
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
          <div style="display:flex;align-items:flex-start;gap:8px;padding:9px 12px;border-radius:var(--rsm);background:${r.severity === 'مرتفع' ? 'var(--danger-l)' : r.severity === 'متوسط' ? '#fff7ed' : 'var(--success-l)'};border:1px solid ${r.severity === 'مرتفع' ? '#fca5a5' : r.severity === 'متوسط' ? '#fed7aa' : '#86efac'};margin-bottom:8px">
            <span style="font-size:9px;padding:2px 7px;border-radius:999px;font-weight:700;background:${r.severity === 'مرتفع' ? 'var(--danger)' : r.severity === 'متوسط' ? 'var(--warning)' : 'var(--success)'};color:#fff;white-space:nowrap;margin-top:1px">${r.severity}</span>
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
          <td>${v.id.includes('-04-') ? 'مفاجئة' : v.id.includes('-05-') ? 'مجدولة' : 'دورية'}</td>
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
          <div style="border:1px solid ${s.ok ? 'var(--border)' : '#fca5a5'};border-radius:var(--rsm);padding:12px 14px;background:${s.ok ? 'var(--g50)' : '#fff5f5'}">
            <div style="font-size:11px;color:var(--text3);margin-bottom:6px">${s.src}</div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
              <span class="badge ${s.ok ? 'b-approved' : 'b-rejected'}">${s.val}</span>
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
              <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${h.status === 'مدفوع' ? '85' : h.status === 'مدفوع متأخر' ? '60' : '20'}%;background:${h.status === 'مدفوع' ? 'var(--success)' : h.status === 'مدفوع متأخر' ? 'var(--warning)' : 'var(--danger)'}"></div></div>
            </div>`).join('')}
        </div>
      </div>
      <div class="chart-card">
        <div class="chart-head"><h3>مؤشرات الخطر</h3><span>${w.riskIndicators.length} مؤشر نشط</span></div>
        <div class="chart-bars">
          ${[['مرتفع', w.riskIndicators.filter(r => r.severity === 'مرتفع').length],
    ['متوسط', w.riskIndicators.filter(r => r.severity === 'متوسط').length],
    ['منخفض', w.riskIndicators.filter(r => r.severity === 'منخفض').length],
    ].map(([l, v]) => `
            <div class="chart-bar-row">
              <div class="chart-bar-meta"><span>${l}</span><strong>${v}</strong></div>
              <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${Math.round(v / (w.riskIndicators.length || 1) * 100)}%;background:${l === 'مرتفع' ? 'var(--danger)' : l === 'متوسط' ? 'var(--warning)' : 'var(--success)'}"></div></div>
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
  const crn = getParam('crn');
  let e = null;
  if (eid) e = INSP_DATA.employers.find(x => x.id === eid);
  if (!e && crn) e = INSP_DATA.employers.find(x => x.crn === crn)
    || INSP_DATA.employers.find(x => x.crn.startsWith(crn.substring(0, 6)))
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
  const eAppeals = INSP_DATA.appeals.filter(a => a.employerId === e.id);
  const eBanCases = INSP_DATA.banCases.filter(b => b.employerId === e.id);
  const eWorkers = INSP_DATA.workers.filter(w => w.employerId === e.id);
  const eVisits = [...INSP_DATA.visits.periodic.filter(v => v.employerId === e.id),
  ...INSP_DATA.visits.surprise.filter(v => v.employerId === e.id),
  ...INSP_DATA.visits.scheduled.filter(v => v.employerId === e.id)];
  const _vpg = id => id.includes('-04-') ? 'visit-surprise-details' : id.includes('-05-') ? 'visit-scheduled-details' : 'visit-periodic-details';
  const _csBadge = s => s === 'منتظم' ? 'b-approved' : s === 'متأخر' ? 'b-rejected' : 'b-returned';
  const _vBadge = s => s === 'مرتفع' ? 'b-rejected' : s === 'متوسط' ? 'b-returned' : 'b-approved';

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
    <div class="scard p"><div class="sc-lbl">إجمالي البلاغات</div><div class="sc-val">${eComplaints.length}</div><div class="sc-sub">${eComplaints.filter(c => !c.status.includes('إغلاق') && !c.status.includes('قرار')).length} مفتوح</div></div>
    <div class="scard i"><div class="sc-lbl">إجمالي الزيارات</div><div class="sc-val">${eVisits.length}</div><div class="sc-sub">${eVisits.filter(v => v.findings).length} كشفت مخالفات</div></div>
    <div class="scard ${e.contributions.arrears > 0 ? 'd' : 's'}"><div class="sc-lbl">المتأخرات التأمينية</div><div class="sc-val">${e.contributions.arrears > 0 ? e.contributions.arrears.toLocaleString() + ' ر.ع' : 'لا يوجد'}</div><div class="sc-sub">${e.contributions.status}</div></div>
    <div class="scard ${eBanCases.filter(b => b.status.includes('سارٍ')).length ? 'd' : 's'}"><div class="sc-lbl">حالات الحظر</div><div class="sc-val">${eBanCases.length}</div><div class="sc-sub">${eBanCases.filter(b => b.status.includes('سارٍ')).length} نشط</div></div>
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
        <span class="badge ${e.complianceScore >= 85 ? 'b-approved' : e.complianceScore >= 70 ? 'b-returned' : 'b-rejected'}">${e.complianceScore >= 85 ? 'امتثال عالٍ' : e.complianceScore >= 70 ? 'امتثال متوسط' : 'امتثال ضعيف — يستوجب تدخلاً'}</span>
      </div>
      <div style="border-top:1px solid var(--border);padding-top:14px">
        ${[
      { lbl: 'البلاغات المفتوحة', val: eComplaints.filter(c => !c.status.includes('إغلاق') && !c.status.includes('قرار')).length, icon: '🔴', threshold: 2 },
      { lbl: 'مخالفات مكتشفة', val: e.violations.length, icon: '⚠️', threshold: 3 },
      { lbl: 'زيارات بمخالفات', val: eVisits.filter(v => v.findings).length, icon: '📋', threshold: 2 },
      { lbl: 'متأخرات الاشتراكات (ر.ع)', val: e.contributions.arrears, icon: '💰', threshold: 1000 },
    ].map(m => `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border)">
            <span style="font-size:12px;color:var(--text2)">${m.lbl}</span>
            <span style="font-size:13px;font-weight:700;color:${m.val > m.threshold ? 'var(--danger)' : 'var(--success)'}">${m.val}</span>
          </div>`).join('')}
      </div>
    </div></div>`;

  const workersCard = eWorkers.length ? `
    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.user}</span>العمال المسجلون في المنشأة (${eWorkers.length})</h3></div>
    <div class="tbl-wrap"><table class="dtbl">
      <thead><tr><th>الاسم</th><th>رقم الهوية</th><th>المسمى الوظيفي</th><th>الراتب</th><th>حماية الأجور</th><th>التأمين الصحي</th><th>مؤشرات الخطر</th><th>إجراء</th></tr></thead>
      <tbody>${eWorkers.map(wk => `
        <tr>
          <td class="fw7">${wk.name}</td>
          <td>${wk.civil}</td>
          <td>${wk.position}</td>
          <td>${wk.salary} ر.ع</td>
          <td><span class="badge ${wk.wageProtection === 'منتظم' ? 'b-approved' : 'b-returned'}">${wk.wageProtection}</span></td>
          <td style="font-size:11px">${wk.healthInsurance.split('—')[0].trim()}</td>
          <td>${wk.riskIndicators.length ? `<span class="badge b-returned">${wk.riskIndicators.length} مؤشر</span>` : '<span class="badge b-approved">سليم</span>'}</td>
          <td><button class="btn btn-primary btn-xs" onclick="navigateTo('worker-analysis','worker=${wk.id}')">${ICONS.eye}الملف</button></td>
        </tr>`).join('')}
      </tbody></table></div></div>` : '';

  const violationsCard = e.violations.length ? `
    <div class="card"><div class="ph"><h3><span class="pico rd">${ICONS.warn}</span>سجل المخالفات المكتشفة (${e.violations.length})</h3></div>
    <div class="tbl-wrap"><table class="dtbl">
      <thead><tr><th>التاريخ</th><th>نوع المخالفة</th><th>الخطورة</th><th>الزيارة المرجعية</th><th>الحالة</th></tr></thead>
      <tbody>${e.violations.map(v => `
        <tr>
          <td>${v.date}</td>
          <td>${v.type}</td>
          <td><span class="badge ${_vBadge(v.severity)}">${v.severity}</span></td>
          <td><a href="#" onclick="navigateTo('${_vpg(v.visit)}','id=${v.visit}')" class="txp fw7">${v.visit}</a></td>
          <td><span class="badge ${v.status === 'منجز' ? 'b-approved' : v.status === 'معلق' ? 'b-rejected' : 'b-returned'}">${v.status}</span></td>
        </tr>`).join('')}
      </tbody></table></div></div>` : '';

  const contribCard = `
    <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.clock}</span>سجل الاشتراكات التأمينية (آخر 6 أشهر)</h3>
      ${e.contributions.arrears > 0 ? `<span class="badge b-rejected">متأخرات: ${e.contributions.arrears.toLocaleString()} ر.ع</span>` : ''}
    </div>
    <div class="tbl-wrap"><table class="dtbl">
      <thead><tr><th>الشهر</th><th>عدد العمال</th><th>المبلغ</th><th>الحالة</th><th>تاريخ السداد</th></tr></thead>
      <tbody>${e.contributionHistory.map(h => `
        <tr>
          <td class="fw7">${h.month}</td>
          <td>${h.workers}</td>
          <td>${h.amount}</td>
          <td><span class="badge ${h.status === 'منتظم' ? 'b-approved' : h.status === 'غير مدفوع' ? 'b-rejected' : 'b-returned'}">${h.status}</span></td>
          <td>${h.paidDate || '<span class="badge b-rejected">لم يُسدَّد</span>'}</td>
        </tr>`).join('')}
      </tbody></table></div></div>`;

  const complaintsCard = eComplaints.length ? `
    <div class="card"><div class="ph"><h3><span class="pico rd">${ICONS.inbox}</span>البلاغات المرتبطة بالمنشأة (${eComplaints.length})</h3></div>
    <div class="tbl-wrap"><table class="dtbl">
      <thead><tr><th>رقم البلاغ</th><th>النوع</th><th>العامل</th><th>الحالة</th><th>الأولوية</th><th>القناة</th><th>تاريخ التقديم</th><th>إجراء</th></tr></thead>
      <tbody>${eComplaints.map(c => `
        <tr>
          <td><a href="#" onclick="navigateTo('complaint-details','id=${c.id}')" class="txp fw7">${c.id}</a></td>
          <td>${c.type}</td>
          <td>${c.workerName || '<span class="tx3">غير محدد</span>'}</td>
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
      <tbody>${eVisits.map(v => `
        <tr>
          <td><a href="#" onclick="navigateTo('${_vpg(v.id)}','id=${v.id}')" class="txp fw7">${v.id}</a></td>
          <td>${v.id.includes('-04-') ? 'مفاجئة' : v.id.includes('-05-') ? 'مجدولة' : 'دورية'}</td>
          <td>${v.inspectorName}</td>
          <td>${statusBadge(v.status)}</td>
          <td>${v.actualDate || v.scheduledDate}</td>
          <td>${v.findings ? `<span class="badge b-returned">${v.findings.violations.length}</span>` : '<span class="badge b-approved">0</span>'}</td>
          <td>${v.report?.approved ? '<span class="badge b-approved">معتمد</span>' : '<span class="badge b-draft">—</span>'}</td>
          <td><button class="btn btn-primary btn-xs" onclick="navigateTo('${_vpg(v.id)}','id=${v.id}')">${ICONS.eye}عرض</button></td>
        </tr>`).join('')}
      </tbody></table></div></div>` : '';

  const appealsCard = eAppeals.length ? `
    <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.file}</span>التظلمات المقدمة من المنشأة (${eAppeals.length})</h3></div>
    <div class="tbl-wrap"><table class="dtbl">
      <thead><tr><th>رقم التظلم</th><th>النوع</th><th>البند المرتبط</th><th>الحالة</th><th>تاريخ التقديم</th><th>إجراء</th></tr></thead>
      <tbody>${eAppeals.map(a => `
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
      <tbody>${eBanCases.map(b => `
        <tr>
          <td><a href="#" onclick="navigateTo('ban-case-details','id=${b.id}')" class="txp fw7">${b.id}</a></td>
          <td>${b.type}</td><td>${b.issuedDate}</td>
          <td>${statusBadge(b.status)}</td><td>${b.liftedDate || '<span class="tx3">—</span>'}</td>
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
      { src: 'نظام حماية الأجور', val: e.contributions.status, ok: e.contributions.status === 'منتظم', detail: `آخر سداد: ${e.contributions.lastPaid}` },
      { src: 'سجلات الصندوق', val: e.contributions.arrears > 0 ? `متأخرات ${e.contributions.arrears.toLocaleString()} ر.ع` : 'لا متأخرات', ok: e.contributions.arrears === 0, detail: `${e.employees} مؤمَّن عليه نشط` },
    ].map(s => `
          <div style="border:1px solid ${s.ok ? 'var(--border)' : '#fca5a5'};border-radius:var(--rsm);padding:12px 14px;background:${s.ok ? 'var(--g50)' : '#fff5f5'}">
            <div style="font-size:11px;color:var(--text3);margin-bottom:6px">${s.src}</div>
            <div style="margin-bottom:4px"><span class="badge ${s.ok ? 'b-approved' : 'b-rejected'}">${s.val}</span></div>
            <div style="font-size:11.5px;color:var(--text2)">${s.detail}</div>
          </div>`).join('')}
      </div>
    </div></div>`;

  const empCharts = `<div class="dashboard-insights">
    <div class="chart-card">
      <div class="chart-head"><h3>الاشتراكات التأمينية (آخر 6 أشهر)</h3><span>بالريال العُماني</span></div>
      <div class="chart-bars">
        ${e.contributionHistory.slice(0, 6).map(h => `
          <div class="chart-bar-row">
            <div class="chart-bar-meta"><span>${h.month}</span><strong>${h.amount}</strong></div>
            <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${h.status === 'منتظم' ? '90' : h.status === 'متأخر' ? '55' : '15'}%;background:${h.status === 'منتظم' ? 'var(--success)' : h.status === 'متأخر' ? 'var(--warning)' : 'var(--danger)'}"></div></div>
          </div>`).join('')}
      </div>
    </div>
    <div class="chart-card">
      <div class="chart-head"><h3>توزيع المخالفات حسب النوع</h3><span>${e.violations.length} مخالفة إجمالاً</span></div>
      <div class="chart-bars">
        ${[
      ['مخالفات السلامة', e.violations.filter(v => v.type.includes('سلامة')).length],
      ['تأخر اشتراكات', e.violations.filter(v => v.type.includes('اشتراك') || v.type.includes('تأمين')).length],
      ['عمالة غير نظامية', e.violations.filter(v => v.type.includes('عمالة') || v.type.includes('أجنبية')).length],
      ['مخالفات رواتب', e.violations.filter(v => v.type.includes('رواتب') || v.type.includes('أجر')).length],
      ['مخالفات أخرى', e.violations.filter(v => !v.type.includes('سلامة') && !v.type.includes('اشتراك') && !v.type.includes('عمالة') && !v.type.includes('رواتب')).length],
    ].map(([l, v]) => `
          <div class="chart-bar-row">
            <div class="chart-bar-meta"><span>${l}</span><strong>${v}</strong></div>
            <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${Math.round(v / (e.violations.length || 1) * 100)}%;background:var(--danger)"></div></div>
          </div>`).join('')}
      </div>
    </div>
    <div class="chart-card">
      <div class="chart-head"><h3>مقارنة الامتثال</h3><span>مع متوسط القطاع</span></div>
      <div class="chart-bars">
        ${[
      [e.name.split(' ').slice(0, 3).join(' '), e.complianceScore, _compColor(e.complianceScore)],
      ['متوسط القطاع', 72, 'var(--warning)'],
      ['أعلى امتثال في القطاع', 96, 'var(--success)'],
    ].map(([l, v, c]) => `
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
  /* موظفو قسم المتابعة والبلاغات فقط (ليس رئيس القسم) */
  const staffList = [
    { name: 'سيف خلفان الأمري', civil: '06456789', dept: 'قسم المتابعة والبلاغات' },
    { name: 'منى راشد البلوشي', civil: '09123456', dept: 'قسم المتابعة والبلاغات' },
  ].map(s => ({
    ...s,
    active: INSP_DATA.complaints.filter(c => c.assignedTo === s.name && !c.status.includes('إغلاق') && !c.status.includes('قرار') && !c.status.includes('حفظ')).length
  }));

  const staffNames = staffList.map(s => s.name);

  /* حالات مرحلة المتابعة والبلاغات */
  const monitoringStatuses = [
    'قيد المراجعة',
    'بانتظار اعتماد رئيس قسم المتابعة والبلاغات',
    'تم تقديم البلاغ',
    'تم اعادة فتح البلاغ',
    'تم تقديم الطلب مرة أخرى',
    'تم إعادة الطلب لاستيفاء البيانات',
  ];

  /* البلاغات النشطة في القسم المسندة لأحد الموظفين (ليس رئيس القسم ولا بدون تعيين) */
  const activeComplaints = INSP_DATA.complaints.filter(c =>
    monitoringStatuses.includes(c.status) && staffNames.includes(c.assignedTo)
  );

  const staffOptsJson = JSON.stringify(staffList);

  const rows = activeComplaints.map((c, idx) => {
    const assignee = c.assignedTo || 'غير معين';
    return `
      <tr id="ra-row-${idx}" style="height:56px">
        <td style="padding:12px 14px"><a href="#" onclick="navigateTo('complaint-details','id=${c.id}')" class="txp fw7" style="font-size:13px">${c.id}</a></td>
        <td style="padding:12px 14px;font-size:13px">${c.type || 'بلاغ'}</td>
        <td style="padding:12px 14px">${statusBadge(c.status)}</td>
        <td style="padding:12px 14px;font-size:13px;font-weight:600">${assignee}</td>
        <td style="padding:12px 14px;font-size:13px;color:var(--text2)">${c.submitDate || c.date || '—'}</td>
        <td style="padding:12px 14px">
          <button class="btn btn-sm btn-outline" onclick="_openReassignRow(${idx},'${c.id}','${assignee}')">${ICONS.switch} إعادة التخصيص</button>
        </td>
      </tr>
      <tr id="ra-inline-${idx}" style="display:none;background:var(--surface2)">
        <td colspan="6" style="padding:0">
          <div style="background:var(--surface2);border-top:2px solid var(--primary);padding:20px 24px">
            <div class="fg fg-2" style="margin-bottom:16px;max-width:680px">
              <div class="fgrp">
                <label class="flbl">الموظف الجديد المكلف <span class="req">*</span></label>
                <select class="fc" id="ra-staff-${idx}">
                  <option value="">— اختر الموظف —</option>
                </select>
              </div>
              <div class="fgrp">
                <label class="flbl">سبب إعادة التخصيص <span class="req">*</span></label>
                <input class="fc" id="ra-reason-${idx}" placeholder="مثال: عبء العمل، إجازة، تعارض مصالح">
              </div>
            </div>
            <div style="display:flex;gap:10px">
              <button class="btn btn-primary" onclick="_confirmReassignRow(${idx},'${c.id}')">${ICONS.check} تأكيد إعادة التخصيص</button>
              <button class="btn btn-ghost" onclick="_closeReassignRow(${idx})">إلغاء</button>
            </div>
          </div>
        </td>
      </tr>`;
  }).join('');

  const complaintsTable = `
    <div class="card">
      <div class="ph">
        <h3><span class="pico bl">${ICONS.list}</span>بلاغات القسم قيد العمل</h3>
        <span class="badge b-session">${activeComplaints.length} بلاغ</span>
      </div>
      ${activeComplaints.length === 0
      ? `<div class="pb" style="text-align:center;padding:40px;color:var(--text3)">لا توجد بلاغات قيد العمل حالياً في القسم</div>`
      : `<div style="overflow-x:auto">
            <table style="width:100%;border-collapse:collapse;border-radius:0 0 var(--r) var(--r);overflow:hidden">
              <thead>
                <tr style="background:var(--g100);border-bottom:2px solid var(--border2)">
                  <th style="padding:12px 14px;text-align:right;font-size:12.5px;font-weight:700;color:var(--text2);white-space:nowrap">رقم البلاغ</th>
                  <th style="padding:12px 14px;text-align:right;font-size:12.5px;font-weight:700;color:var(--text2)">النوع</th>
                  <th style="padding:12px 14px;text-align:right;font-size:12.5px;font-weight:700;color:var(--text2)">الحالة</th>
                  <th style="padding:12px 14px;text-align:right;font-size:12.5px;font-weight:700;color:var(--text2)">الموظف المختص الحالي</th>
                  <th style="padding:12px 14px;text-align:right;font-size:12.5px;font-weight:700;color:var(--text2);white-space:nowrap">تاريخ التقديم</th>
                  <th style="padding:12px 14px;text-align:right;font-size:12.5px;font-weight:700;color:var(--text2)">إجراء</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>`
    }
    </div>`;

  /* توزيع عبء العمل الحالي */
  const workloadCard = `
    <div class="card">
      <div class="ph"><h3><span class="pico tl">${ICONS.user}</span>توزيع عبء العمل الحالي</h3></div>
      <div class="pb">
        ${staffList.map(s => `
          <div style="display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--border)">
            <div style="width:38px;height:38px;border-radius:50%;background:var(--primary);color:#fff;font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">${s.name.substring(0, 2)}</div>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:700;color:var(--text)">${s.name}</div>
              <div style="font-size:11.5px;color:var(--text3)">${s.dept}</div>
            </div>
            <span class="badge ${s.active > 4 ? 'b-returned' : s.active > 2 ? 'b-session' : 'b-approved'}" style="font-size:12px">${s.active} بلاغ نشط</span>
          </div>`).join('')}
      </div>
    </div>`;

  const script = `<script>
  var _raStaff = ${staffOptsJson};
  function _openReassignRow(idx, id, currentAssignee) {
    /* close any other open inline rows */
    document.querySelectorAll('[id^="ra-inline-"]').forEach(function(el){ el.style.display='none'; });
    /* populate staff dropdown excluding current assignee */
    var sel = document.getElementById('ra-staff-'+idx);
    if (sel && sel.options.length <= 1) {
      _raStaff.filter(function(s){ return s.name !== currentAssignee; }).forEach(function(s){
        var o = document.createElement('option');
        o.value = s.name;
        o.textContent = s.name + ' — عبء العمل الحالي: ' + s.active + ' بلاغ';
        sel.appendChild(o);
      });
    }
    document.getElementById('ra-inline-'+idx).style.display = '';
    document.getElementById('ra-inline-'+idx).scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  function _closeReassignRow(idx) {
    document.getElementById('ra-inline-'+idx).style.display='none';
  }
  function _confirmReassignRow(idx, id) {
    var sel   = document.getElementById('ra-staff-'+idx);
    var rReas = document.getElementById('ra-reason-'+idx);
    if (!sel || !sel.value)           { showToast('يرجى اختيار الموظف الجديد','w'); return; }
    if (!rReas || !rReas.value.trim()) { showToast('يرجى إدخال سبب إعادة التخصيص','w'); return; }
    showToast('تمت إعادة تخصيص البلاغ ' + id + ' إلى ' + sel.value, 's');
    var row = document.getElementById('ra-row-'+idx);
    if (row) {
      var cells = row.querySelectorAll('td');
      if (cells[3]) cells[3].textContent = sel.value;
      var btn = row.querySelector('button');
      if (btn) btn.disabled = true;
    }
    document.getElementById('ra-inline-'+idx).style.display='none';
  }
  <\/script>`;

  return `<div class="pg-head"><div><h1>إعادة تخصيص البلاغات</h1><p>عرض البلاغات النشطة وإعادة تخصيصها للموظفين المتاحين</p></div></div>
  ${workloadCard}
  ${complaintsTable}
  ${script}`;
}

/* ── متابعة الأعمال المتأخرة (monitoring-head) ── */
function renderOverdueTracking(role) {
  const today = '2025-01-22';
  const overdue = INSP_DATA.complaints.filter(c => c.dueDate && c.dueDate < today && !c.status.includes('إغلاق') && !c.status.includes('قرار'));
  const critical = overdue.filter(c => Math.floor((new Date(today) - new Date(c.dueDate)) / 86400000) >= 5).length;
  return `<div class="pg-head"><div><h1>متابعة الأعمال المتأخرة</h1><p>${overdue.length} بلاغ تجاوز الموعد النهائي</p></div>
    <div class="pg-acts"><button class="btn btn-warning" onclick="showToast('تم إرسال تنبيه للموظفين','w')">${ICONS.bell}إرسال تنبيه جماعي</button></div></div>
    <div class="stats-grid">
      <div class="scard d"><div class="sc-lbl">حالات متأخرة</div><div class="sc-val">${overdue.length}</div><div class="sc-sub">تستوجب متابعة</div></div>
      <div class="scard w"><div class="sc-lbl">تأخير حرج</div><div class="sc-val">${critical}</div><div class="sc-sub">5 أيام فأكثر</div></div>
      <div class="scard i"><div class="sc-lbl">معينة لموظف</div><div class="sc-val">${overdue.filter(c => c.assignedTo).length}</div><div class="sc-sub">تحتاج تنبيه أو تصعيد</div></div>
      <div class="scard p"><div class="sc-lbl">غير معينة</div><div class="sc-val">${overdue.filter(c => !c.assignedTo).length}</div><div class="sc-sub">تحتاج قرار توزيع</div></div>
    </div>
    <div class="alert alert-d">${ICONS.warn} يوجد ${overdue.length} بلاغ تجاوز الموعد النهائي ويستوجب تدخلاً فورياً.</div>
    ${_tblWrap(['رقم البلاغ', 'النوع', 'الحالة الحالية', 'الموعد النهائي', 'التأخير (أيام)', 'الموظف المختص', 'الإجراء'],
    overdue.map(c => {
      const days = Math.floor((new Date(today) - new Date(c.dueDate)) / 86400000);
      return `<tr><td class="fw7 txd">${c.id}</td><td>${c.type}</td>
          <td>${statusBadge(c.status)}</td>
          <td class="txd">${c.dueDate}</td>
          <td><span class="badge b-high">${days} يوم</span></td>
          <td>${c.assignedTo || 'غير معين'}</td>
          <td><div class="df ac g8">
            <button class="btn btn-warning btn-xs" onclick="showToast('تم إرسال تنبيه','w')">${ICONS.bell}تنبيه</button>
            <button class="btn btn-danger btn-xs" onclick="navigateTo('reassignment','complaint=${c.id}')">إعادة تخصيص</button>
          </div></td></tr>`;
    }).join(''))}`;
}

/* ── مراقبة عبء العمل (monitoring-head) ── */
function renderWorkloadMonitoring(role) {
  const staff = [
    { name: 'سيف خلفان الأمري', active: 4, pending: 2, closed: 8, capacity: 80, overdue: 1, specialty: 'شكاوى الأجور والتسجيل' },
    { name: 'هند بنت ناصر العبرية', active: 2, pending: 1, closed: 5, capacity: 50, overdue: 0, specialty: 'الردود والاستيفاءات' },
    { name: 'نجلاء الدعمية', active: 3, pending: 1, closed: 6, capacity: 65, overdue: 1, specialty: 'الملفات المحالة للتفتيش' },
  ];
  return `<div class="pg-head"><div><h1>مراقبة عبء العمل</h1><p>توزيع المهام والطاقة الاستيعابية للموظفين</p></div></div>
    <div class="stats-grid">
      <div class="scard p"><div class="sc-lbl">إجمالي البلاغات المفتوحة</div><div class="sc-val">${staff.reduce((s, x) => s + x.active, 0)}</div></div>
      <div class="scard w"><div class="sc-lbl">متوسط وقت المعالجة</div><div class="sc-val">5.2 يوم</div></div>
      <div class="scard s"><div class="sc-lbl">نسبة الإنجاز هذا الشهر</div><div class="sc-val">87%</div></div>
      <div class="scard d"><div class="sc-lbl">موظفون فوق الطاقة</div><div class="sc-val">${staff.filter(s => s.capacity >= 75).length}</div></div>
    </div>
    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.user}</span>توزيع عبء العمل</h3></div>
    <div class="pb">${staff.map(s => `
      <div style="margin-bottom:20px;border-bottom:1px solid var(--border);padding-bottom:16px">
        <div class="df ac g8 mb0" style="margin-bottom:8px"><span class="fw7">${s.name}</span>
          <span class="badge ${s.capacity > 75 ? 'b-high' : 'b-low'}">${s.capacity}% مكتظ</span></div>
        <div class="fs11 tx3" style="margin-bottom:6px">${s.specialty}</div>
        <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${s.capacity}%;background:${s.capacity > 75 ? 'var(--danger)' : 'var(--primary)'}"></div></div>
        <div class="m-row mt8">
          <span class="m-item">${ICONS.inbox} نشط: <strong>${s.active}</strong></span>
          <span class="m-item">${ICONS.clock} معلق: <strong>${s.pending}</strong></span>
          <span class="m-item">${ICONS.check} مكتمل: <strong>${s.closed}</strong></span>
          <span class="m-item">${ICONS.warn} متأخر: <strong>${s.overdue}</strong></span>
        </div>
        <div class="df ac g8" style="margin-top:10px">
          <button class="btn btn-secondary btn-xs" onclick="showToast('تم فتح تفاصيل الحمل الوظيفي','i')">${ICONS.eye}عرض التفاصيل</button>
          <button class="btn btn-warning btn-xs" onclick="navigateTo('reassignment')">${ICONS.switch}إعادة توزيع</button>
        </div>
      </div>`).join('')}</div></div>`;
}

/* ── حالة التوفر للموظفين (نموذج استرشادي) ── */
function renderStaffAvailability(role) {
  const staffByRole = {
    'fund-staff': { name: 'منى راشد البلوشي', unit: 'مستخدم داخلي للصندوق', scope: 'personal' },
    'monitoring-employee': { name: 'سيف خلفان الأمري', unit: 'قسم المتابعة والبلاغات', scope: 'personal' },
    'monitoring-head': { name: 'خالد بن ناصر الجابري', unit: 'قسم المتابعة والبلاغات', scope: 'section' },
    'field-inspector': { name: 'أحمد سالم الحارثي', unit: 'قسم التفتيش الميداني', scope: 'personal' },
    'field-head': { name: 'سالم راشد البلوشي', unit: 'قسم التفتيش الميداني', scope: 'section' },
    'inspection-director': { name: 'مريم بنت عبدالله الهنائية', unit: 'دائرة التفتيش', scope: 'director' },
    'ops-analyst': { name: 'يوسف سعيد المعشني', unit: 'دائرة التفتيش', scope: 'personal' },
  };

  const me = staffByRole[role] || { name: 'مستخدم النظام', unit: 'دائرة التفتيش', scope: 'personal' };
  const allStaff = [
    { name: 'سيف خلفان الأمري', role: 'موظف قسم المتابعة', unit: 'قسم المتابعة والبلاغات', status: 'متاح', reason: 'متواجد على النظام', updatedAt: 'اليوم 09:10', tasks: 4, today: 'مراجعة بلاغات جديدة' },
    { name: 'هند بنت ناصر العبرية', role: 'موظفة قسم المتابعة', unit: 'قسم المتابعة والبلاغات', status: 'غير متاح', reason: 'زيارة تنسيقية مع جهة خارجية', updatedAt: 'اليوم 10:05', tasks: 2, today: 'مقابلات واتصالات' },
    { name: 'أحمد سالم الحارثي', role: 'مفتش ميداني', unit: 'قسم التفتيش الميداني', status: 'في مهمة', reason: 'زيارة مفاجئة قيد التنفيذ', updatedAt: 'اليوم 08:40', tasks: 3, today: 'زيارة مفاجئة - ولاية السيب' },
    { name: 'فاطمة محمد الرواحية', role: 'مفتشة ميدانية', unit: 'قسم التفتيش الميداني', status: 'متاح', reason: 'بالمكتب حتى إشعار آخر', updatedAt: 'اليوم 09:00', tasks: 1, today: 'مراجعة محاضر' },
    { name: 'خالد بن ناصر الجابري', role: 'رئيس قسم المتابعة', unit: 'قسم المتابعة والبلاغات', status: 'في اجتماع', reason: 'اجتماع متابعة الأداء', updatedAt: 'اليوم 10:20', tasks: 5, today: 'اعتمادات وإعادة تخصيص' },
    { name: 'سالم راشد البلوشي', role: 'رئيس قسم التفتيش الميداني', unit: 'قسم التفتيش الميداني', status: 'متاح', reason: 'متابعة محاضر اليوم', updatedAt: 'اليوم 09:25', tasks: 4, today: 'اعتماد محاضر وخطة زيارات' },
    { name: 'يوسف سعيد المعشني', role: 'محلل عمليات', unit: 'دائرة التفتيش', status: 'غير متاح', reason: 'إعداد تحليل مخاطر', updatedAt: 'اليوم 09:35', tasks: 2, today: 'تحليل مخاطر المنشآت' },
    { name: 'مريم بنت عبدالله الهنائية', role: 'مدير دائرة التفتيش', unit: 'دائرة التفتيش', status: 'متاح', reason: 'متاحة للاعتماد والتصعيد', updatedAt: 'اليوم 09:15', tasks: 6, today: 'اعتمادات واجتماعات تنفيذية' },
    { name: 'منى راشد البلوشي', role: 'مستخدم داخلي للصندوق', unit: 'الصندوق', status: 'متاح', reason: 'استقبال ومتابعة داخلية', updatedAt: 'اليوم 08:55', tasks: 3, today: 'استقبال بلاغات' },
  ];

  const visibleStaff = me.scope === 'director'
    ? allStaff
    : me.scope === 'section'
      ? allStaff.filter(item => item.unit === me.unit)
      : allStaff.filter(item => item.name === me.name || item.unit === me.unit);

  const counts = {
    available: visibleStaff.filter(item => item.status === 'متاح').length,
    unavailable: visibleStaff.filter(item => item.status === 'غير متاح').length,
    away: visibleStaff.filter(item => item.status === 'في مهمة').length,
    meeting: visibleStaff.filter(item => item.status === 'في اجتماع').length,
  };

  const statusClass = function (status) {
    return availabilityStatusClass(status);
  };

  const canSeeTeamSummary = me.scope === 'section' || me.scope === 'director';
  const tableRows = visibleStaff.map(item => `
    <tr>
      <td class="fw7">${item.name}</td>
      <td>${item.role}</td>
      <td>${item.unit}</td>
      <td><span class="badge ${statusClass(item.status)}">${item.status}</span></td>
      <td>${item.reason}</td>
      <td>${item.today}</td>
      <td>${item.tasks}</td>
      <td>${item.updatedAt}</td>
    </tr>
  `).join('');

  const screenTitle = me.scope === 'director' ? 'حالة الموظفين' : me.scope === 'section' ? 'حالة فريق العمل' : 'حالة التوفر';
  const screenDesc = me.scope === 'director'
    ? 'عرض استرشادي لحالة الموظفين في جميع أقسام دائرة التفتيش مع تحديثات اليوم.'
    : me.scope === 'section'
      ? `عرض استرشادي لحالة موظفي ${me.unit} خلال اليوم الحالي.`
      : 'يمكنك تحديث حالتك الحالية مباشرة من الشارة الموجودة في أعلى الشاشة.';

  return `<div class="pg-head"><div><h1>${screenTitle}</h1><p>${screenDesc}</p></div>
    <div class="pg-acts"><span class="badge b-draft">نموذج استرشادي</span></div></div>

    <div class="alert alert-i" style="margin-bottom:16px">${ICONS.info} هذه الشاشة نموذج أولي فقط لعرض الفكرة في الـ BRD والبروتوتايب، وليست مرتبطة بعد بإدارة حضور فعلية أو صلاحيات تشغيلية كاملة.</div>
    ${canSeeTeamSummary ? `
    <div class="stats-grid">
      <div class="scard s"><div class="sc-lbl">متاح الآن</div><div class="sc-val">${counts.available}</div><div class="sc-sub">ضمن النطاق المعروض</div></div>
      <div class="scard w"><div class="sc-lbl">غير متاح</div><div class="sc-val">${counts.unavailable}</div><div class="sc-sub">مع سبب مسجل</div></div>
      <div class="scard i"><div class="sc-lbl">في مهمة ميدانية</div><div class="sc-val">${counts.away}</div><div class="sc-sub">خارج المكتب</div></div>
      <div class="scard p"><div class="sc-lbl">في اجتماع</div><div class="sc-val">${counts.meeting}</div><div class="sc-sub">اجتماعات ومراجعات</div></div>
    </div>

    <div class="card">
      <div class="ph"><h3><span class="pico tl">${ICONS.user}</span>${me.scope === 'director' ? 'عرض حالة موظفي الدائرة' : 'عرض حالة موظفي القسم'}</h3></div>
      <div class="pb">
        ${_tblWrap(['الاسم', 'الدور', 'القسم', 'الحالة', 'السبب', 'عمل اليوم', 'مهام نشطة', 'آخر تحديث'], tableRows)}
      </div>
    </div>` : `
    <div class="card">
      <div class="pb">
        <div class="alert alert-i">${ICONS.info} تم تبسيط تحديث الحالة الحالية ليكون من الشارة الموجودة في أعلى الشاشة. عرض ملخص الفريق متاح فقط لرؤساء الأقسام ومدير دائرة التفتيش.</div>
      </div>
    </div>`}`;
}

/* ── مراجعة المحاضر (field-head) ── */
function renderRecordsReview(role) {
  const pending = [...INSP_DATA.visits.periodic, ...INSP_DATA.visits.surprise, ...INSP_DATA.visits.scheduled]
    .filter(v => v.status === 'بانتظار مراجعة المحضر');
  const critical = pending.filter(v => v.findings && v.findings.violations && v.findings.violations.length >= 2).length;
  return `<div class="pg-head"><div><h1>مراجعة المحاضر</h1><p>${pending.length} محضر بانتظار الاعتماد</p></div></div>
    <div class="stats-grid">
      <div class="scard p"><div class="sc-lbl">محاضر قيد المراجعة</div><div class="sc-val">${pending.length}</div><div class="sc-sub">قبل الرفع للمدير</div></div>
      <div class="scard d"><div class="sc-lbl">محاضر عالية الحساسية</div><div class="sc-val">${critical}</div><div class="sc-sub">تتضمن مخالفات متعددة</div></div>
      <div class="scard i"><div class="sc-lbl">مرتبطة بزيارات مفاجئة</div><div class="sc-val">${pending.filter(v => v.id.includes('-04-')).length}</div><div class="sc-sub">تستوجب تدقيقاً أكبر</div></div>
      <div class="scard s"><div class="sc-lbl">جاهزة للاعتماد</div><div class="sc-val">${pending.filter(v => v.report).length}</div><div class="sc-sub">المحضر مرفوع بالنظام</div></div>
    </div>
    <div class="alert alert-w">${ICONS.warn} يوجد ${pending.length} محاضر تستوجب المراجعة والاعتماد قبل رفعها للمدير.</div>
    ${_tblWrap(['رقم الزيارة', 'المنشأة', 'نوع الزيارة', 'المفتش', 'نتيجة أولية', 'تاريخ الرفع', 'الإجراء'],
    pending.map(v => `<tr>
        <td class="fw7 txp">${v.id}</td><td>${v.employerName}</td>
        <td>${v.id.includes('-03-') ? 'دورية' : v.id.includes('-04-') ? 'مفاجئة' : 'مجدولة'}</td>
        <td>${v.inspectorName || '—'}</td>
        <td>${v.findings ? `${v.findings.violations.length} مخالفة` : 'لا توجد نتائج بعد'}</td>
        <td>${v.actualDate || v.scheduledDate}</td>
        <td><div class="df ac g8">
          <button class="btn btn-primary btn-xs" onclick="navigateTo('${v.id.includes('-04-') ? 'visit-surprise-details' : v.id.includes('-05-') ? 'visit-scheduled-details' : 'visit-periodic-details'}','id=${v.id}')">${ICONS.eye}مراجعة</button>
          <button class="btn btn-accent btn-xs" onclick="showToast('تم اعتماد المحضر','s')">اعتماد</button>
          <button class="btn btn-warning btn-xs" onclick="showToast('تم إعادة للمفتش','w')">إعادة</button>
        </div></td></tr>`).join(''))}`;
}

/* ── الإجراءات التصحيحية (field-head) ── */
function renderCorrectiveActions(role) {
  const actions = [
    { visit: '2025-03-000002', employer: 'مصنع الإنتاج الغذائي', action: 'توفير معدات الحماية', deadline: '2025-01-19', status: 'معلق', owner: 'صاحب العمل', evidence: 'صور ومرفقات السلامة', source: 'محضر الزيارة الدوري' },
    { visit: '2025-03-000002', employer: 'مصنع الإنتاج الغذائي', action: 'تسجيل العمال غير المسجلين', deadline: '2025-01-13', status: 'منجز', owner: 'صاحب العمل', evidence: 'تحديث بيانات الاشتراك', source: 'محضر الزيارة الدوري' },
    { visit: '2025-04-000001', employer: 'مصنع الإنتاج الغذائي', action: 'سداد الاشتراكات المتأخرة', deadline: '2025-01-26', status: 'جارٍ', owner: 'الإدارة المالية بالمنشأة', evidence: 'إشعار السداد', source: 'زيارة مفاجئة' },
    { visit: '2024-03-000095', employer: 'مؤسسة البناء والتشييد', action: 'صرف الرواتب المتأخرة', deadline: '2024-12-15', status: 'منجز', owner: 'إدارة الموارد البشرية', evidence: 'كشوفات بنكية', source: 'إعادة فحص ميداني' },
  ];
  const overdueCount = actions.filter(a => a.status !== 'منجز' && a.deadline < '2025-01-22').length;
  return `<div class="pg-head"><div><h1>متابعة الإجراءات التصحيحية</h1><p>رصد تنفيذ الإجراءات التصحيحية من قبل المنشآت</p></div>
    <div class="pg-acts"><button class="btn btn-secondary btn-sm">${ICONS.download}تصدير</button></div></div>
    <div class="stats-grid">
      <div class="scard p"><div class="sc-lbl">إجمالي الإجراءات</div><div class="sc-val">${actions.length}</div><div class="sc-sub">ضمن المتابعة</div></div>
      <div class="scard s"><div class="sc-lbl">منجزة</div><div class="sc-val">${actions.filter(a => a.status === 'منجز').length}</div><div class="sc-sub">تم التحقق منها</div></div>
      <div class="scard w"><div class="sc-lbl">قيد التنفيذ</div><div class="sc-val">${actions.filter(a => a.status === 'جارٍ').length}</div><div class="sc-sub">بانتظار استكمال</div></div>
      <div class="scard d"><div class="sc-lbl">متأخرة</div><div class="sc-val">${overdueCount}</div><div class="sc-sub">تحتاج تصعيد</div></div>
    </div>
    ${_tblWrap(['رقم الزيارة', 'المنشأة', 'الإجراء التصحيحي المطلوب', 'المسؤول', 'الموعد النهائي', 'الحالة', 'إجراء'],
    actions.map(a => `<tr>
        <td class="txp fw7">${a.visit}</td><td>${a.employer}<div class="fs11 tx3">${a.source}</div></td><td>${a.action}<div class="fs11 tx3">${a.evidence}</div></td>
        <td>${a.owner}</td>
        <td>${a.deadline}</td>
        <td>${statusBadge(a.status === 'منجز' ? 'تم اعتماد المحضر' : a.status === 'جارٍ' ? 'جارية' : 'بانتظار إجراء تصحيحي')}</td>
        <td><div class="df ac g8">
          ${a.status !== 'منجز' ? `<button class="btn btn-accent btn-xs" onclick="showToast('تم تسجيل الإنجاز','s')">تسجيل إنجاز</button>` : '<span class="badge b-approved">مكتمل</span>'}
        </div></td></tr>`).join(''))}`;
}

/* ── إعادة توزيع المفتشين (field-head) ── */
function renderInspectorRedistribution(role) {
  const allVisits = [
    ...INSP_DATA.visits.periodic,
    ...INSP_DATA.visits.surprise,
    ...INSP_DATA.visits.scheduled
  ];
  const activeStatuses = ['مجدولة', 'قيد التنفيذ', 'بانتظار اجراء الزيارة التفتيشية'];
  const activeVisits = allVisits.filter(v =>
    activeStatuses.some(s => v.status && v.status.includes(s.split(' ')[0]))
  );

  /* عبء العمل لكل مفتش */
  const inspectors = [
    { name: 'حاتم سالم الزدجالي', civil: '04678901', dept: 'قسم التفتيش الميداني', specialty: 'سلامة مهنية ومصانع' },
    { name: 'فاطمة محمد الرواحية', civil: '04678902', dept: 'قسم التفتيش الميداني', specialty: 'إنشاءات ومتابعة ميدانية' },
    { name: 'أحمد سالم الحارثي', civil: '04678903', dept: 'قسم التفتيش الميداني', specialty: 'إعادة الفحص والزيارات المفاجئة' },
  ].map(ins => ({
    ...ins,
    active: allVisits.filter(v => v.inspectorName === ins.name && activeStatuses.some(s => v.status && v.status.includes(s.split(' ')[0]))).length,
    total: allVisits.filter(v => v.inspectorName === ins.name).length
  }));

  const inspJson = JSON.stringify(inspectors);

  const visitRows = activeVisits.map((v, idx) => {
    const typeLabel = v.id && v.id.includes('-03-') ? 'دورية' : v.id && v.id.includes('-04-') ? 'مفاجئة' : 'مجدولة';
    const inspector = v.inspectorName || 'غير معين';
    return `
      <tr id="ir-row-${idx}" style="height:56px">
        <td style="padding:12px 14px;font-size:13px;font-weight:700">${v.id || '—'}</td>
        <td style="padding:12px 14px;font-size:13px">${typeLabel}</td>
        <td style="padding:12px 14px">${statusBadge(v.status)}</td>
        <td style="padding:12px 14px;font-size:13px">${v.employerName || '—'}</td>
        <td style="padding:12px 14px;font-size:13px;font-weight:600">${inspector}</td>
        <td style="padding:12px 14px;font-size:13px;color:var(--text2)">${v.scheduledDate || '—'}</td>
        <td style="padding:12px 14px">
          <button class="btn btn-sm btn-outline" onclick="_openRedistRow(${idx},'${v.id}','${inspector}')">${ICONS.switch} إعادة التوزيع</button>
        </td>
      </tr>
      <tr id="ir-inline-${idx}" style="display:none;background:var(--surface2)">
        <td colspan="7" style="padding:0">
          <div style="background:var(--surface2);border-top:2px solid var(--primary);padding:20px 24px">
            <div class="fg fg-2" style="margin-bottom:16px;max-width:680px">
              <div class="fgrp">
                <label class="flbl">المفتش الجديد <span class="req">*</span></label>
                <select class="fc" id="ir-insp-${idx}">
                  <option value="">— اختر المفتش —</option>
                </select>
              </div>
              <div class="fgrp">
                <label class="flbl">سبب إعادة التوزيع <span class="req">*</span></label>
                <input class="fc" id="ir-reason-${idx}" placeholder="مثال: تعارض مواعيد، إجازة، تحميل متوازن">
              </div>
            </div>
            <div style="display:flex;gap:10px">
              <button class="btn btn-primary" onclick="_confirmRedistRow(${idx},'${v.id}')">${ICONS.check} تأكيد إعادة التوزيع</button>
              <button class="btn btn-ghost" onclick="_closeRedistRow(${idx})">إلغاء</button>
            </div>
          </div>
        </td>
      </tr>`;
  }).join('');

  const visitsTable = `
    <div class="card">
      <div class="ph">
        <h3><span class="pico bl">${ICONS.list}</span>الزيارات النشطة في القسم</h3>
        <span class="badge b-session">${activeVisits.length} زيارة نشطة</span>
      </div>
      ${activeVisits.length === 0
      ? `<div class="pb" style="text-align:center;padding:40px;color:var(--text3)">لا توجد زيارات نشطة حالياً</div>`
      : `<div style="overflow-x:auto">
            <table style="width:100%;border-collapse:collapse;min-width:820px">
              <thead>
                <tr style="background:var(--g100);border-bottom:2px solid var(--border2)">
                  <th style="padding:12px 14px;text-align:right;font-size:12.5px;font-weight:700;color:var(--text2);white-space:nowrap">رقم الزيارة</th>
                  <th style="padding:12px 14px;text-align:right;font-size:12.5px;font-weight:700;color:var(--text2)">النوع</th>
                  <th style="padding:12px 14px;text-align:right;font-size:12.5px;font-weight:700;color:var(--text2)">الحالة</th>
                  <th style="padding:12px 14px;text-align:right;font-size:12.5px;font-weight:700;color:var(--text2)">المنشأة</th>
                  <th style="padding:12px 14px;text-align:right;font-size:12.5px;font-weight:700;color:var(--text2)">المفتش المختص الحالي</th>
                  <th style="padding:12px 14px;text-align:right;font-size:12.5px;font-weight:700;color:var(--text2);white-space:nowrap">تاريخ الجدولة</th>
                  <th style="padding:12px 14px;text-align:right;font-size:12.5px;font-weight:700;color:var(--text2)">إجراء</th>
                </tr>
              </thead>
              <tbody>${visitRows}</tbody>
            </table>
          </div>`
    }
    </div>`;

  const workloadCard = `
    <div class="card">
      <div class="ph"><h3><span class="pico bl">${ICONS.user}</span>أعباء العمل الحالية للمفتشين</h3></div>
      <div class="pb">
        ${inspectors.map(ins => {
    const pct = ins.total ? Math.round(ins.active / Math.max(ins.total, 1) * 100) : 0;
    return `<div style="display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--border)">
            <div style="width:40px;height:40px;border-radius:50%;background:var(--primary);color:#fff;font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">${ins.name.substring(0, 2)}</div>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:700;color:var(--text)">${ins.name}</div>
              <div style="font-size:11.5px;color:var(--text3)">${ins.dept} — ${ins.specialty}</div>
              <div class="progress-bar-wrap" style="margin-top:6px;height:6px"><div class="progress-bar-fill" style="width:${pct}%;background:${pct > 75 ? 'var(--danger)' : pct > 50 ? 'var(--warning)' : 'var(--success)'}"></div></div>
            </div>
            <div style="text-align:center;min-width:80px">
              <div style="font-size:18px;font-weight:800;color:var(--primary)">${ins.active}</div>
              <div style="font-size:10.5px;color:var(--text3)">زيارة نشطة</div>
            </div>
            <span class="badge ${ins.active > 4 ? 'b-returned' : ins.active > 2 ? 'b-session' : 'b-approved'}" style="font-size:11px">${ins.total} إجمالاً</span>
          </div>`;
  }).join('')}
      </div>
    </div>`;

  const script = `<script>
  var _irInspList = ${inspJson};
  function _openRedistRow(idx, id, currentInspector) {
    document.querySelectorAll('[id^="ir-inline-"]').forEach(function(el){ el.style.display='none'; });
    var sel = document.getElementById('ir-insp-'+idx);
    if (sel && sel.options.length <= 1) {
      _irInspList.filter(function(i){ return i.name !== currentInspector; }).forEach(function(i){
        var o = document.createElement('option');
        o.value = i.name;
        o.textContent = i.name + ' — نشط: ' + i.active + ' زيارة (' + i.specialty + ')';
        sel.appendChild(o);
      });
    }
    document.getElementById('ir-inline-'+idx).style.display = '';
    document.getElementById('ir-inline-'+idx).scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  function _closeRedistRow(idx) {
    document.getElementById('ir-inline-'+idx).style.display='none';
  }
  function _confirmRedistRow(idx, id) {
    var sel   = document.getElementById('ir-insp-'+idx);
    var rReas = document.getElementById('ir-reason-'+idx);
    if (!sel || !sel.value)            { showToast('يرجى اختيار المفتش الجديد','w'); return; }
    if (!rReas || !rReas.value.trim()) { showToast('يرجى إدخال سبب إعادة التوزيع','w'); return; }
    showToast('تمت إعادة توزيع الزيارة ' + id + ' إلى ' + sel.value, 's');
    var row = document.getElementById('ir-row-'+idx);
    if (row) {
      var cells = row.querySelectorAll('td');
      if (cells[4]) cells[4].textContent = sel.value;
      var btn = row.querySelector('button');
      if (btn) btn.disabled = true;
    }
    document.getElementById('ir-inline-'+idx).style.display='none';
  }
  <\/script>`;

  return `<div class="pg-head"><div><h1>إعادة توزيع المفتشين</h1><p>عرض الزيارات النشطة وإعادة توزيعها على المفتشين المتاحين</p></div></div>
  ${workloadCard}
  ${visitsTable}
  ${script}`;
}

/* ── خطط التفتيش (inspection-director) ── */
function renderInspectionPlansList(role) {
  const rows = INSP_DATA.inspectionPlans.map(p => {
    const pct = p.targetCount ? Math.round(p.completedCount / p.targetCount * 100) : 0;
    const targetStatus = p.status.includes('مكتملة') ? 'منتهية' : p.status.includes('معتمدة') ? 'نشطة' : 'بانتظار الاعتماد';
    return `<tr>
      <td><a href="#" onclick="navigateTo('inspection-plan-details','id=${p.id}')" class="txp fw7">${p.id}</a></td>
      <td>${p.title}<div class="fs11 tx3">${p.createdBy || '—'} • ${p.createdDate || '—'}</div></td><td>${p.period}</td>
      <td>${statusBadge(p.status)}</td>
      <td><div class="fw7">${p.targetCount}</div><div class="fs11 tx3">${targetStatus}</div></td>
      <td><div style="display:flex;align-items:center;gap:8px"><div class="progress-bar-wrap" style="flex:1;margin:0"><div class="progress-bar-fill" style="width:${pct}%;background:${_compColor(pct)}"></div></div><span class="fs11">${pct}%</span></div></td>
      <td><button class="btn btn-primary btn-xs" onclick="navigateTo('inspection-plan-details','id=${p.id}')">${ICONS.eye}عرض</button></td>
    </tr>`;
  }).join('');

  const totalPlans = INSP_DATA.inspectionPlans.length;
  const activePlans = INSP_DATA.inspectionPlans.filter(p => p.status.includes('قيد التنفيذ')).length;
  const completedPlans = INSP_DATA.inspectionPlans.filter(p => p.status.includes('مكتملة')).length;
  const pendingPlans = totalPlans - activePlans - completedPlans;

  return `<div class="pg-head"><div><h1>خطط التفتيش الدورية</h1><p>إدارة واعتماد خطط التفتيش الربعية والسنوية</p></div>
    <div class="pg-acts"><button class="btn btn-accent" onclick="showToast('فتح نموذج الاعتماد','i')">${ICONS.check}اعتماد خطة</button></div></div>
    <div class="stats-grid">
      <div class="scard p"><div class="sc-lbl">إجمالي الخطط</div><div class="sc-val">${totalPlans}</div><div class="sc-sub">ضمن نطاق العرض</div></div>
      <div class="scard i"><div class="sc-lbl">خطط نشطة</div><div class="sc-val">${activePlans}</div><div class="sc-sub">قيد التنفيذ</div></div>
      <div class="scard s"><div class="sc-lbl">خطط مكتملة</div><div class="sc-val">${completedPlans}</div><div class="sc-sub">أغلقت بالكامل</div></div>
      <div class="scard w"><div class="sc-lbl">بانتظار إجراء</div><div class="sc-val">${pendingPlans}</div><div class="sc-sub">مسودات أو اعتماد</div></div>
    </div>
    ${_tblWrap(['رقم الخطة', 'اسم الخطة', 'الفترة', 'الحالة', 'النطاق', 'نسبة الإنجاز', 'إجراء'], rows)}`;
}

/* ── تفاصيل خطة التفتيش (inspection-director) ── */
function renderInspectionPlanDetails(role) {
  const id = getParam('id') || '2025-07-000001';
  const p = INSP_DATA.inspectionPlans.find(x => x.id === id) || INSP_DATA.inspectionPlans[0];
  const planAttachments = _withSampleAttachments(p, 'plan');
  const planNotes = _withSampleNotes(p, 'plan');
  const relatedVisits = [...INSP_DATA.visits.periodic, ...INSP_DATA.visits.surprise, ...INSP_DATA.visits.scheduled]
    .filter(v => v.planId === p.id);
  const pct = p.targetCount ? Math.round(p.completedCount / p.targetCount * 100) : 0;
  const pendingVisits = relatedVisits.filter(v => v.status === 'مجدولة' || v.status === 'بانتظار اجراء الزيارة التفتيشية').length;
  const inProgressVisits = relatedVisits.filter(v => v.status === 'جارية' || v.status === 'قيد التنفيذ' || v.status === 'بانتظار مراجعة المحضر').length;
  const completedVisits = relatedVisits.filter(v => v.status.includes('اعتماد') || v.status.includes('مغلقة')).length;
  const visitRows = relatedVisits.map(v => {
    const detailPage = v.id.includes('-04-') ? 'visit-surprise-details' : v.id.includes('-05-') ? 'visit-scheduled-details' : 'visit-periodic-details';
    const typeLabel = v.id.includes('-04-') ? 'مفاجئة' : v.id.includes('-05-') ? 'مجدولة' : 'دورية';
    return `<tr>
      <td><a href="#" onclick="navigateTo('${detailPage}','id=${v.id}')" class="txp fw7">${v.id}</a></td>
      <td>${v.employerName}</td>
      <td>${typeLabel}</td>
      <td>${v.inspectorName || 'غير معين'}</td>
      <td>${statusBadge(v.status)}</td>
      <td>${v.scheduledDate || '—'}</td>
      <td>${v.actualDate || '—'}</td>
      <td><button class="btn btn-primary btn-xs" onclick="navigateTo('${detailPage}','id=${v.id}')">${ICONS.eye}عرض</button></td>
    </tr>`;
  }).join('');
  const planTimeline = [
    { date: p.createdDate || '—', action: 'إعداد مسودة الخطة', actor: p.createdBy, actorRole: 'ops-analyst' },
    { date: p.approvalDate || '—', action: p.approvedBy ? 'اعتماد الخطة ورفعها للتنفيذ' : 'بانتظار الاعتماد', actor: p.approvedBy || '—', actorRole: p.approvedBy ? 'inspection-director' : 'ops-analyst' },
    ...(relatedVisits.length ? [{ date: relatedVisits[0].scheduledDate || relatedVisits[0].actualDate || '—', action: 'بدء تنفيذ أول زيارة ضمن الخطة', actor: relatedVisits[0].inspectorName || 'قسم التفتيش', actorRole: 'field-inspector' }] : [])
  ];
  return `<div class="pg-head"><div><h1>${p.id}</h1><p>${p.title}</p></div>
    <div class="pg-acts">${statusBadge(p.status)}<button class="btn btn-secondary btn-sm" onclick="navigateTo('inspection-plans-list')">${ICONS.arrow_right}رجوع</button>
      ${p.status !== 'مكتملة' ? `<button class="btn btn-accent" onclick="showToast('تم اعتماد الخطة','s')">${ICONS.check}اعتماد</button>` : ''}</div></div>
  ${_summaryBar([
    ['رقم الخطة', `<strong>${p.id}</strong>`],
    ['الفترة', p.period],
    ['الحالة', statusBadge(p.status)],
    ['المنشآت المستهدفة', `${p.targetCount}`],
    ['الزيارات المنجزة', `${p.completedCount}`],
    ['المعتمد بواسطة', p.approvedBy || 'بانتظار الاعتماد'],
  ])}
  <div class="stats-grid">
    <div class="scard p"><div class="sc-lbl">نسبة الإنجاز</div><div class="sc-val">${pct}%</div><div class="sc-sub">${p.completedCount} من ${p.targetCount}</div></div>
    <div class="scard w"><div class="sc-lbl">زيارات بانتظار التنفيذ</div><div class="sc-val">${pendingVisits}</div><div class="sc-sub">ضمن الخطة</div></div>
    <div class="scard i"><div class="sc-lbl">زيارات قيد المعالجة</div><div class="sc-val">${inProgressVisits}</div><div class="sc-sub">تنفيذ أو مراجعة</div></div>
    <div class="scard s"><div class="sc-lbl">زيارات مكتملة</div><div class="sc-val">${completedVisits}</div><div class="sc-sub">اعتمدت أو أغلقت</div></div>
  </div>
  <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.file}</span>تفاصيل الخطة</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">رقم الخطة</label><div class="fro fw7">${p.id}</div></div>
      <div class="fgrp"><label class="flbl">اسم الخطة</label><div class="fro">${p.title}</div></div>
      <div class="fgrp"><label class="flbl">الفترة</label><div class="fro">${p.period}</div></div>
      <div class="fgrp"><label class="flbl">أعدت بواسطة</label><div class="fro">${p.createdBy || '—'}</div></div>
      <div class="fgrp"><label class="flbl">تاريخ الإعداد</label><div class="fro">${p.createdDate || '—'}</div></div>
      <div class="fgrp"><label class="flbl">إجمالي المنشآت المستهدفة</label><div class="fro">${p.targetCount}</div></div>
      <div class="fgrp"><label class="flbl">الزيارات المنجزة</label><div class="fro txp fw7">${p.completedCount}</div></div>
      <div class="fgrp"><label class="flbl">زيارات قيد التنفيذ</label><div class="fro">${p.inProgressCount || 0}</div></div>
      <div class="fgrp"><label class="flbl">المعتمد بواسطة</label><div class="fro">${p.approvedBy || 'بانتظار الاعتماد'}</div></div>
      <div class="fgrp"><label class="flbl">تاريخ الاعتماد</label><div class="fro">${p.approvalDate || '—'}</div></div>
      <div class="fgrp span-full"><label class="flbl">أساس اختيار المنشآت</label><div class="fro">${p.riskCriteria || 'اختيار تشغيلي حسب أولويات الدائرة'}</div></div>
      <div class="fgrp span-full"><label class="flbl">القطاعات المستهدفة</label><div class="fro">${(p.sectors || []).join('، ') || '—'}</div></div>
      <div class="fgrp span-full"><label class="flbl">المفتشون / الفرق المرتبطة</label><div class="fro">${(p.inspectors || []).join('، ') || '—'}</div></div>
    </div></div></div>
  <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.chart}</span>التقدم</h3></div>
    <div class="pb">
      <div class="progress-bar-wrap" style="height:14px;margin-bottom:8px"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
      <p class="fs11 tx3 mt8">${pct}% من الزيارات مكتملة مع تتبع حالة التنفيذ على مستوى كل زيارة</p>
    </div></div>
  <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.clipboard}</span>الزيارات المرتبطة بالخطة</h3></div>
    <div class="pb">
      ${relatedVisits.length ? _tblWrap(['رقم الزيارة', 'المنشأة', 'النوع', 'المفتش', 'الحالة', 'المجدول', 'التنفيذ', 'إجراء'], visitRows) : '<div class="alert alert-i">' + ICONS.info + ' لا توجد زيارات مرتبطة مسجلة على هذه الخطة في البيانات الحالية.</div>'}
    </div></div>
  <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.clock}</span>مسار الإعداد والاعتماد</h3></div>
    <div class="pb">${renderTimeline(planTimeline)}</div></div>
  <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.upload}</span>مرفقات الخطة (${planAttachments.length})</h3></div>
    <div class="pb">${planAttachments.map(f => attRow(f)).join('')}</div></div>
  ${renderNotes(planNotes, p.id)}
  <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.pen}</span>لوحة المدير</h3></div>
    <div class="pb">
      <div class="alert alert-i" style="margin-bottom:14px">${ICONS.info} تعرض هذه اللوحة ما يحتاجه مدير الدائرة لاعتماد الخطة أو إعادتها أو متابعة تنفيذ الزيارات التابعة لها.</div>
      <div class="fgrp"><label class="flbl">ملاحظات الاعتماد أو التوجيه</label><textarea class="fc" rows="3" placeholder="تدوين ملاحظات المدير على الخطة أو توجيهات التنفيذ..."></textarea></div>
      <div class="df ac g8" style="flex-wrap:wrap">
        <button class="btn btn-primary btn-sm" onclick="showToast('تم اعتماد الخطة','s')">${ICONS.check}اعتماد الخطة</button>
        <button class="btn btn-warning btn-sm" onclick="showToast('تمت إعادة الخطة لاستكمال التعديلات','w')">${ICONS.arrow_right}إعادة للمحلل</button>
        <button class="btn btn-secondary btn-sm" onclick="showToast('تم توجيه الفريق بمتابعة الزيارات المرتبطة','i')">${ICONS.switch}توجيه بالتنفيذ</button>
      </div>
    </div></div>`;
}

/* ── حالات الحظر (inspection-director) ── */
function _banTargetLabel(b) {
  return b.targetType === 'worker' ? (b.workerName || 'عامل') : (b.employerName || 'منشأة');
}

function _banTargetIdentifier(b) {
  return b.targetType === 'worker'
    ? (b.workerCivil || b.lookupValue || '—')
    : (b.lookupValue || (b.employerCRN || '—'));
}

function _banSourceLink(b) {
  if (b.selectedBanId) {
    return `<a href="#" class="txp" onclick="navigateTo('ban-case-details','id=${b.selectedBanId}')">${b.selectedBanId}</a>`;
  }
  if (b.relatedComplaintId) {
    return `<a href="#" class="txp" onclick="navigateTo('complaint-details','id=${b.relatedComplaintId}')">${b.relatedComplaintId}</a>`;
  }
  if (b.relatedVisitId) {
    const page = b.relatedVisitId.includes('-04-') ? 'visit-surprise-details' : b.relatedVisitId.includes('-05-') ? 'visit-scheduled-details' : 'visit-periodic-details';
    return `<a href="#" class="txp" onclick="navigateTo('${page}','id=${b.relatedVisitId}')">${b.relatedVisitId}</a>`;
  }
  return '—';
}

function renderBanCasesList(role) {
  const requesterRoles = ['fund-staff', 'monitoring-employee', 'field-inspector'];
  const approverRoles = ['field-head', 'monitoring-head', 'inspection-director'];
  const canRequest = requesterRoles.includes(role);
  const canApprove = approverRoles.includes(role);
  const allCases = INSP_DATA.banCases || [];
  const pendingCount = allCases.filter(b => (b.status || '').includes('بانتظار')).length;
  const activeCount = allCases.filter(b => (b.status || '').includes('سارٍ')).length;

  const rows = allCases.map(b => `<tr>
      <td><a href="#" onclick="navigateTo('ban-case-details','id=${b.id}')" class="txp fw7">${b.id}</a></td>
      <td>${b.requestType || b.type}</td>
      <td class="fw7">${_banTargetLabel(b)}</td>
      <td>${_banSourceLink(b)}</td>
      <td>${statusBadge(b.status)}</td>
      <td>${b.issuedDate || '—'}</td>
      <td><button class="btn btn-primary btn-xs" onclick="navigateTo('ban-case-details','id=${b.id}')">${ICONS.eye}عرض</button></td>
    </tr>`).join('');

  const requestPanels = canRequest ? `
    <div class="card" style="margin-bottom:16px">
      <div class="ph"><h3><span class="pico rd">${ICONS.lock}</span>طلب حظر</h3></div>
      <div class="pb"><div class="fg fg-2">
        <div class="fgrp"><label class="flbl">الاستعلام بالسجل التجاري أو الرقم المدني</label><input class="fc" placeholder="أدخل السجل التجاري أو الرقم المدني"></div>
        <div class="fgrp"><label class="flbl">الاسم</label><input class="fc" value="يتم إظهار اسم الشركة أو اسم العامل بعد الاستعلام" readonly></div>
        <div class="fgrp span-full"><label class="flbl">سبب طلب الحظر</label><textarea class="fc" rows="3" placeholder="اكتب سبب طلب الحظر"></textarea></div>
        <div class="fgrp span-full"><label class="flbl">مرفقات أخرى</label>
          <div class="dz-box" style="padding:14px;min-height:auto">
            <div style="display:flex;align-items:center;gap:12px">
              <div style="font-size:22px;color:var(--text3)">${ICONS.upload}</div>
              <div style="flex:1"><div style="font-size:12.5px;font-weight:600;color:var(--text2)">إرفاق المستندات الداعمة</div></div>
              <button class="btn btn-secondary btn-sm" onclick="showToast('فتح نافذة الرفع','i')">اختيار ملف</button>
            </div>
          </div>
        </div>
      </div>
      <div class="df ac g8" style="margin-top:14px"><button class="btn btn-danger btn-sm" onclick="showToast('تم تقديم طلب الحظر بنجاح','s')">${ICONS.lock}تقديم طلب الحظر</button></div>
      </div>
    </div>
    <div class="card" style="margin-bottom:16px">
      <div class="ph"><h3><span class="pico tl">${ICONS.unlock}</span>طلب فك حظر</h3></div>
      <div class="pb"><div class="fg fg-2">
        <div class="fgrp"><label class="flbl">الاستعلام بالسجل التجاري أو الرقم المدني</label><input class="fc" placeholder="أدخل السجل التجاري أو الرقم المدني"></div>
        <div class="fgrp span-full"><label class="flbl">سجلات الحظر الفعالة</label>
          <select class="fc">
            <option value="">— اختر record المطلوب رفع الحظر عنه —</option>
            ${allCases.filter(b => (b.status || '').includes('سارٍ')).map(b => `<option value="${b.id}">${b.id} — ${_banTargetLabel(b)}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="df ac g8" style="margin-top:14px"><button class="btn btn-accent btn-sm" onclick="showToast('تم تقديم طلب فك الحظر بنجاح','s')">${ICONS.unlock}تقديم طلب فك الحظر</button></div>
      </div>
    </div>` : '';

  const approvalHint = canApprove ? `<div class="alert alert-i" style="margin-bottom:16px">${ICONS.info} يمكن اعتماد أو رفض طلبات الحظر وفك الحظر من شاشة التفاصيل.</div>` : '';

  return `<div class="pg-head"><div><h1>طلبات الحظر وفك الحظر</h1><p>إعادة استخدام شاشة الحظر الحالية ضمن مسار طلب الحظر وطلب فك الحظر</p></div></div>
    ${requestPanels}
    ${approvalHint}
    <div class="stats-grid">
      <div class="scard d"><div class="sc-lbl">طلبات بانتظار الاعتماد</div><div class="sc-val">${pendingCount}</div></div>
      <div class="scard w"><div class="sc-lbl">حظر نشط</div><div class="sc-val">${activeCount}</div></div>
      <div class="scard i"><div class="sc-lbl">إجمالي السجلات</div><div class="sc-val">${allCases.length}</div></div>
      <div class="scard s"><div class="sc-lbl">حظر مؤقت للعامل</div><div class="sc-val">${allCases.filter(b => b.requestType === 'حظر مؤقت').length}</div></div>
    </div>
    ${_tblWrap(['الرقم', 'النوع', 'المستهدف', 'المرجع', 'الحالة', 'التاريخ', 'إجراء'], rows)}`;
}

function renderBanCaseDetails(role) {
  const approverRoles = ['field-head', 'monitoring-head', 'inspection-director'];
  const id = getParam('id') || '2025-06-000001';
  const b = INSP_DATA.banCases.find(x => x.id === id) || INSP_DATA.banCases[0];
  const banAttachments = _withSampleAttachments(b, 'ban');
  const banNotes = _withSampleNotes(b, 'ban');
  const relatedVisit = [...INSP_DATA.visits.periodic, ...INSP_DATA.visits.surprise, ...INSP_DATA.visits.scheduled].find(v => v.id === b.relatedVisitId);
  const relatedComplaint = (INSP_DATA.complaints || []).find(c => c.id === b.relatedComplaintId);
  const selectedBan = (INSP_DATA.banCases || []).find(x => x.id === b.selectedBanId);
  const title = b.requestType === 'طلب حظر' ? 'طلب حظر' : b.requestType === 'طلب فك حظر' ? 'طلب فك حظر' : 'حالة حظر';

  const pgHead = `<div class="pg-head"><div><h1>${b.id}</h1><p>${title} — ${_banTargetLabel(b)}</p></div>
    <div class="pg-acts">${statusBadge(b.status)}<button class="btn btn-secondary btn-sm" onclick="navigateTo('ban-cases-list')">${ICONS.arrow_right}رجوع</button></div></div>`;

  const summaryBar = _summaryBar([
    ['الرقم', `<strong>${b.id}</strong>`],
    ['النوع', b.requestType || b.type],
    ['المستهدف', _banTargetLabel(b)],
    ['المعرف', _banTargetIdentifier(b)],
    ['التاريخ', b.issuedDate || '—'],
    ['الحالة', statusBadge(b.status)]
  ]);

  const detailsCard = `<div class="card"><div class="ph"><h3><span class="pico rd">${ICONS.lock}</span>التفاصيل</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">الرقم</label><div class="fro fw7">${b.id}</div></div>
      <div class="fgrp"><label class="flbl">النوع</label><div class="fro">${b.requestType || b.type}</div></div>
      <div class="fgrp"><label class="flbl">المستهدف</label><div class="fro fw7">${_banTargetLabel(b)}</div></div>
      <div class="fgrp"><label class="flbl">${b.targetType === 'worker' ? 'الرقم المدني' : 'السجل التجاري'}</label><div class="fro">${_banTargetIdentifier(b)}</div></div>
      ${b.requestedBy ? `<div class="fgrp"><label class="flbl">مقدم الطلب</label><div class="fro">${b.requestedBy}</div></div>` : ''}
      ${b.issuedBy ? `<div class="fgrp"><label class="flbl">أصدره</label><div class="fro">${b.issuedBy}</div></div>` : ''}
      ${b.selectedBanId ? `<div class="fgrp"><label class="flbl">record المطلوب رفع الحظر عنه</label><div class="fro txp fw7">${b.selectedBanId}</div></div>` : ''}
      ${b.duration ? `<div class="fgrp"><label class="flbl">المدة</label><div class="fro">${b.duration}</div></div>` : ''}
      ${b.expiryDate ? `<div class="fgrp"><label class="flbl">انتهاء الحظر</label><div class="fro">${b.expiryDate}</div></div>` : ''}
      <div class="fgrp span-full"><label class="flbl">${b.requestType === 'طلب فك حظر' ? 'وصف الطلب' : 'سبب الطلب / الحظر'}</label><div class="fro" style="min-height:52px">${b.reason || '—'}</div></div>
      ${b.conditions && b.conditions.length ? `<div class="fgrp span-full"><label class="flbl">شروط رفع الحظر</label><div class="fro">${b.conditions.map(x => `<div style="padding:4px 0;border-bottom:1px solid var(--border)">${x}</div>`).join('')}</div></div>` : ''}
    </div></div></div>`;

  const linkedCard = `<div class="card"><div class="ph"><h3><span class="pico or">${ICONS.file}</span>المرجع المرتبط</h3></div>
    <div class="pb"><div class="fg fg-2">
      ${relatedComplaint ? `<div class="fgrp"><label class="flbl">رقم البلاغ</label><div class="fro txp fw7">${relatedComplaint.id}</div></div>` : ''}
      ${relatedComplaint ? `<div class="fgrp"><label class="flbl">نوع البلاغ</label><div class="fro">${relatedComplaint.type}</div></div>` : ''}
      ${relatedVisit ? `<div class="fgrp"><label class="flbl">رقم الزيارة</label><div class="fro txp fw7">${relatedVisit.id}</div></div>` : ''}
      ${selectedBan ? `<div class="fgrp"><label class="flbl">سجل الحظر المحدد</label><div class="fro txp fw7">${selectedBan.id}</div></div>` : ''}
      ${selectedBan ? `<div class="fgrp span-full"><label class="flbl">المستهدف في السجل المحدد</label><div class="fro">${_banTargetLabel(selectedBan)}</div></div>` : ''}
    </div>
    <div class="df ac g8" style="margin-top:14px;flex-wrap:wrap">
      ${relatedComplaint ? `<button class="btn btn-secondary btn-sm" onclick="navigateTo('complaint-details','id=${relatedComplaint.id}')">${ICONS.eye}عرض البلاغ</button>` : ''}
      ${relatedVisit ? `<button class="btn btn-secondary btn-sm" onclick="navigateTo('${relatedVisit.id.includes('-04-') ? 'visit-surprise-details' : relatedVisit.id.includes('-05-') ? 'visit-scheduled-details' : 'visit-periodic-details'}','id=${relatedVisit.id}')">${ICONS.eye}عرض الزيارة</button>` : ''}
      ${selectedBan ? `<button class="btn btn-secondary btn-sm" onclick="navigateTo('ban-case-details','id=${selectedBan.id}')">${ICONS.eye}عرض السجل المحدد</button>` : ''}
    </div></div></div>`;

  const approvalPanel = approverRoles.includes(role) && (b.status || '').includes('بانتظار') ? `
    <div class="dp"><div class="ph"><h3><span class="pico bl">${ICONS.pen}</span>اعتماد الطلب</h3></div>
      <div class="dp-body">
        <div class="dp-acts">
          <button class="btn btn-accent btn-sm" onclick="showToast('تم اعتماد الطلب بنجاح','s')">${ICONS.check}اعتماد</button>
          <button class="btn btn-danger btn-sm" onclick="showToast('تم رفض الطلب','w')">${ICONS.x}رفض</button>
        </div>
      </div>
    </div>` : '';

  const activePanel = role === 'inspection-director' && (b.status || '').includes('سارٍ') && b.requestType !== 'حظر مؤقت' ? `
    <div class="dp"><div class="ph"><h3><span class="pico tl">${ICONS.unlock}</span>إجراء على الحظر</h3></div>
      <div class="dp-body"><div class="dp-acts"><button class="btn btn-accent btn-sm" onclick="showToast('تم رفع الحظر','s')">${ICONS.unlock}رفع الحظر</button></div></div>
    </div>` : '';

  const timelineCard = `<div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.clock}</span>سجل الأحداث</h3></div><div class="pb">${renderTimeline(b.timeline || [])}</div></div>`;
  const attachmentsCard = `<div class="card"><div class="ph"><h3><span class="pico or">${ICONS.upload}</span>المرفقات (${banAttachments.length})</h3></div><div class="pb">${banAttachments.map(f => attRow(f)).join('')}</div></div>`;
  const actionPanel = approvalPanel || activePanel;
  const tid = 'bdt-' + b.id.replace(/[^a-z0-9]/gi, '-');
  const tabs = [
    { label: 'التفاصيل', content: detailsCard },
    { label: 'المرجع المرتبط', content: linkedCard },
    { label: 'الإجراءات', content: actionPanel || '<p class="tx3 fs11" style="padding:16px">لا توجد إجراءات متاحة في الوضع الحالي</p>', badge: actionPanel ? '!' : '' },
    { label: 'المرفقات والملاحظات', content: attachmentsCard + renderNotes(banNotes, b.id) },
    { label: 'سجل الأحداث', content: timelineCard }
  ];
  return pgHead + summaryBar + _tabView(tid, tabs, actionPanel ? 2 : 0);
}

/* ── تحليل المخاطر (ops-analyst) ── */
function renderRiskAnalysis(role) {
  const _score = e => {
    let s = 0;
    const c = INSP_DATA.complaints.filter(x => x.employerId === e.id && !x.status.includes('إغلاق') && !x.status.includes('قرار')).length;
    const v = e.violations ? e.violations.length : 0;
    const b = INSP_DATA.banCases.filter(x => x.employerId === e.id && x.status.includes('سارٍ')).length;
    s += c * 10 + v * 8 + (100 - e.complianceScore) * 0.8;
    if (e.contributions.arrears > 5000) s += 20;
    else if (e.contributions.arrears > 0) s += 10;
    if (b > 0) s += 25;
    return Math.min(100, Math.round(s));
  };
  const scored = INSP_DATA.employers.map(e => ({ ...e, riskScore: _score(e) })).sort((a, b) => b.riskScore - a.riskScore);
  const allViolations = INSP_DATA.employers.flatMap(e => e.violations || []);
  const allComplaints = INSP_DATA.complaints;
  const _vBadge = s => s === 'مرتفع' ? 'b-rejected' : s === 'متوسط' ? 'b-returned' : 'b-approved';

  const summaryKpis = `<div class="stats-grid">
    <div class="scard d"><div class="sc-lbl">منشآت عالية الخطر</div><div class="sc-val">${scored.filter(e => e.riskLevel === 'مرتفع').length}</div><div class="sc-sub">تستوجب أولوية</div></div>
    <div class="scard w"><div class="sc-lbl">إجمالي المخالفات المرصودة</div><div class="sc-val">${allViolations.length}</div><div class="sc-sub">${allViolations.filter(v => v.status === 'معلق').length} معلق</div></div>
    <div class="scard p"><div class="sc-lbl">بلاغات مفتوحة</div><div class="sc-val">${allComplaints.filter(c => !c.status.includes('إغلاق') && !c.status.includes('قرار')).length}</div><div class="sc-sub">من ${allComplaints.length} إجمالاً</div></div>
    <div class="scard i"><div class="sc-lbl">عمال في بيئة خطرة</div><div class="sc-val">${INSP_DATA.workers.filter(w => w.riskLevel === 'مرتفع').length}</div><div class="sc-sub">من ${INSP_DATA.workers.length} عامل</div></div>
  </div>`;

  const charts = `<div class="dashboard-insights">
    <div class="chart-card">
      <div class="chart-head"><h3>درجة المخاطر المحسوبة</h3><span>100 = أعلى خطر</span></div>
      <div class="chart-bars">
        ${scored.map(e => `<div class="chart-bar-row">
          <div class="chart-bar-meta"><span>${e.name.split(' ').slice(0, 3).join(' ')}</span><strong>${e.riskScore}</strong></div>
          <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${e.riskScore}%;background:${_compColor(100 - e.riskScore)}"></div></div>
        </div>`).join('')}
      </div>
    </div>
    <div class="chart-card">
      <div class="chart-head"><h3>توزيع أنواع المخالفات</h3><span>جميع المنشآت</span></div>
      <div class="chart-bars">
        ${[
      ['مخالفات السلامة المهنية', allViolations.filter(v => v.type.includes('سلامة')).length],
      ['تأخر الاشتراكات', allViolations.filter(v => v.type.includes('اشتراك')).length],
      ['عمالة غير نظامية', allViolations.filter(v => v.type.includes('عمالة')).length],
      ['مخالفات الرواتب', allViolations.filter(v => v.type.includes('رواتب') || v.type.includes('رواتب')).length],
      ['مخالفات عقود/ساعات عمل', allViolations.filter(v => v.type.includes('ساعات') || v.type.includes('تسجيل')).length],
    ].map(([l, v]) => {
      const mx = allViolations.length || 1; return `<div class="chart-bar-row">
          <div class="chart-bar-meta"><span>${l}</span><strong>${v}</strong></div>
          <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${Math.round(v / mx * 100)}%;background:var(--danger)"></div></div>
        </div>`}).join('')}
      </div>
    </div>
    <div class="chart-card">
      <div class="chart-head"><h3>درجات الامتثال</h3><span>المنشآت المسجلة</span></div>
      <div class="chart-bars">
        ${INSP_DATA.employers.map(e => `<div class="chart-bar-row">
          <div class="chart-bar-meta"><span>${e.name.split(' ').slice(0, 3).join(' ')}</span><strong>${e.complianceScore}%</strong></div>
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
    <tbody>${scored.map(e => {
    const openC = INSP_DATA.complaints.filter(c => c.employerId === e.id && !c.status.includes('إغلاق') && !c.status.includes('قرار')).length;
    const pendV = (e.violations || []).filter(v => v.status === 'معلق').length;
    const activeBan = INSP_DATA.banCases.filter(b => b.employerId === e.id && b.status.includes('سارٍ')).length;
    const atRiskW = INSP_DATA.workers.filter(w => w.employerId === e.id && w.riskLevel === 'مرتفع').length;
    const rec = e.riskScore >= 70 ? 'زيارة مفاجئة عاجلة' : e.riskScore >= 40 ? 'جدولة زيارة دورية' : 'متابعة دورية منتظمة';
    const recCls = e.riskScore >= 70 ? 'b-rejected' : e.riskScore >= 40 ? 'b-returned' : 'b-approved';
    return `<tr>
        <td><a href="#" onclick="navigateTo('employer-analysis','employer=${e.id}')" class="txp fw7">${e.name.split(' ').slice(0, 3).join(' ')}</a></td>
        <td><div style="display:flex;align-items:center;gap:6px">
          <div style="height:8px;width:${e.riskScore}px;max-width:60px;background:${_compColor(100 - e.riskScore)};border-radius:999px"></div>
          <strong style="color:${_compColor(100 - e.riskScore)}">${e.riskScore}</strong></div></td>
        <td><span style="font-weight:700;color:${_compColor(e.complianceScore)}">${e.complianceScore}%</span></td>
        <td><span class="badge ${openC > 0 ? 'b-returned' : 'b-approved'}">${openC}</span></td>
        <td><span class="badge ${pendV > 0 ? 'b-rejected' : 'b-approved'}">${pendV}</span></td>
        <td><span class="badge ${e.contributions.arrears > 0 ? 'b-rejected' : 'b-approved'}">${e.contributions.arrears > 0 ? e.contributions.arrears.toLocaleString() : '0'}</span></td>
        <td><span class="badge ${activeBan ? 'b-rejected' : 'b-approved'}">${activeBan ? 'نعم' : 'لا'}</span></td>
        <td><span class="badge ${atRiskW > 0 ? 'b-returned' : 'b-approved'}">${atRiskW}</span></td>
        <td><span class="badge ${recCls}">${rec}</span></td>
        <td><button class="btn btn-primary btn-xs" onclick="navigateTo('employer-analysis','employer=${e.id}')">${ICONS.eye}الملف</button></td>
      </tr>`;
  }).join('')}
    </tbody></table></div></div>`;

  const workersRiskTable = `<div class="card"><div class="ph"><h3><span class="pico or">${ICONS.user}</span>العمال عالو المخاطر</h3></div>
  <div class="tbl-wrap"><table class="dtbl">
    <thead><tr><th>العامل</th><th>رقم الهوية</th><th>جهة العمل</th><th>حماية الأجور</th><th>التأمين الصحي</th><th>مؤشرات الخطر</th><th>إجراء</th></tr></thead>
    <tbody>${INSP_DATA.workers.filter(w => w.riskLevel !== 'منخفض').map(wk => `
      <tr>
        <td class="fw7">${wk.name}</td><td>${wk.civil}</td>
        <td><a href="#" onclick="navigateTo('employer-analysis','employer=${wk.employerId}')" class="txp">${wk.employer.split(' ').slice(0, 3).join(' ')}</a></td>
        <td><span class="badge ${wk.wageProtection === 'منتظم' ? 'b-approved' : 'b-returned'}">${wk.wageProtection}</span></td>
        <td style="font-size:11px">${wk.healthInsurance.split('—')[0].trim()}</td>
        <td>${wk.riskIndicators.map(r => `<div style="font-size:11px;color:var(--text2)">• ${r.text.substring(0, 60)}${r.text.length > 60 ? '…' : ''}</div>`).join('')}</td>
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
  const allV = INSP_DATA.employers.flatMap(e => (e.violations || []).map(v => ({ ...v, employer: e.name, employerId: e.id })));
  const allC = INSP_DATA.complaints;
  const allVisits = [...INSP_DATA.visits.periodic, ...INSP_DATA.visits.surprise, ...INSP_DATA.visits.scheduled];
  const _vpg = id => id.includes('-04-') ? 'visit-surprise-details' : id.includes('-05-') ? 'visit-scheduled-details' : 'visit-periodic-details';
  const _rb = r => r === 'مرتفع' ? 'b-rejected' : r === 'متوسط' ? 'b-returned' : 'b-approved';

  /* ── Pattern 1: متكرر — تأخر الاشتراكات ── */
  const contribDelayEmps = INSP_DATA.employers.filter(e => e.contributions.arrears > 0);
  const contribPattern = {
    id: 'PT-001', risk: 'مرتفع',
    title: 'تأخر متكرر في سداد اشتراكات التأمين الاجتماعي',
    desc: 'رُصد نمط ممنهج لتأخر سداد الاشتراكات في أكثر من منشأة. يرتبط هذا النمط بتدهور الالتزام التأميني للعمال وانقطاع التغطية.',
    frequency: `${contribDelayEmps.length} منشآت من ${INSP_DATA.employers.length}`,
    timespan: 'سبتمبر 2024 — ديسمبر 2024',
    recommendation: 'إحالة فورية لوحدة التحصيل — تفعيل آلية الجزاءات التلقائية — جدولة زيارة متابعة.',
    entities: contribDelayEmps.map(e => ({
      type: 'employer', id: e.id, label: e.name,
      detail: `متأخرات: ${e.contributions.arrears.toLocaleString()} ر.ع — آخر سداد: ${e.contributions.lastPaid}`,
      badge: 'b-rejected'
    })),
    relatedComplaints: allC.filter(c => (c.type || '').includes('اشتراك')).map(c => c.id),
    relatedVisits: allVisits.filter(v => v.findings && v.findings.violations.some(x => x.includes('اشتراك'))).map(v => v.id)
  };

  /* ── Pattern 2: متكرر — مخالفات السلامة ── */
  const safetyViolEmps = INSP_DATA.employers.filter(e => (e.violations || []).some(v => v.type.includes('سلامة')));
  const safetyPattern = {
    id: 'PT-002', risk: 'مرتفع',
    title: 'مخالفات متكررة في السلامة المهنية وبيئة العمل',
    desc: 'رُصدت مخالفات سلامة جوهرية في أكثر من زيارة للمنشآت ذاتها، مما يدل على قصور هيكلي في منظومة السلامة وليس عارضاً طارئاً.',
    frequency: `${safetyViolEmps.length} منشآت — ${allV.filter(v => v.type.includes('سلامة')).length} حوادث`,
    timespan: 'نوفمبر 2024 — يناير 2025',
    recommendation: 'إصدار أمر تصحيحي ملزم بموعد نهائي — زيارة مفاجئة للتحقق — دراسة تصعيد لحظر التشغيل.',
    entities: safetyViolEmps.map(e => ({
      type: 'employer', id: e.id, label: e.name,
      detail: `${(e.violations || []).filter(v => v.type.includes('سلامة')).length} مخالفة سلامة`,
      badge: 'b-rejected'
    })),
    relatedComplaints: allC.filter(c => c.type.includes('آمنة') || c.type.includes('سلامة')).map(c => c.id),
    relatedVisits: allVisits.filter(v => v.findings && v.findings.violations.some(x => x.includes('سلامة') || x.includes('حماية'))).map(v => v.id)
  };

  /* ── Pattern 3: قطاع البناء — تركّز المخالفات ── */
  const buildingEmps = INSP_DATA.employers.filter(e => e.sector.includes('بناء'));
  const buildingComplaints = allC.filter(c => buildingEmps.some(e => e.id === c.employerId));
  const buildingPattern = {
    id: 'PT-003', risk: 'مرتفع',
    title: 'تركّز المخالفات في قطاع البناء والإنشاء',
    desc: 'يستأثر قطاع البناء بنسبة غير متناسبة من البلاغات والمخالفات مقارنة بحجمه. ويرتبط ذلك بطبيعة عقود العمل الموسمية والاعتماد المفرط على العمالة الأجنبية.',
    frequency: `${buildingComplaints.length} بلاغات — ${buildingEmps.flatMap(e => e.violations || []).length} مخالفة`,
    timespan: 'يناير 2024 — يناير 2025',
    recommendation: 'تكثيف الزيارات الدورية للقطاع — تعميم إرشادي لجميع منشآت البناء — تطوير قائمة تحقق مخصصة للقطاع.',
    entities: buildingEmps.map(e => ({
      type: 'employer', id: e.id, label: e.name,
      detail: `${buildingComplaints.filter(c => c.employerId === e.id).length} بلاغ — امتثال ${e.complianceScore}%`,
      badge: e.riskLevel === 'مرتفع' ? 'b-rejected' : 'b-returned'
    })),
    relatedComplaints: buildingComplaints.map(c => c.id),
    relatedVisits: allVisits.filter(v => buildingEmps.some(e => e.id === v.employerId)).map(v => v.id)
  };

  /* ── Pattern 4: عمالة غير نظامية ── */
  const illegalLaborViol = allV.filter(v => v.type.includes('أجنبية') || v.type.includes('غير مسجل'));
  const illegalPattern = {
    id: 'PT-004', risk: 'متوسط',
    title: 'وجود عمالة غير مسجلة أو غير نظامية',
    desc: 'كُشف عن حالات عمالة غير مسجلة في التأمين الاجتماعي أو غير نظامية في عدة مواقع. هذا النمط يحرم العمال من الحماية الاجتماعية ويُعرّض المنشأة لغرامات.',
    frequency: `${illegalLaborViol.length} حوادث في ${new Set(illegalLaborViol.map(v => v.employer)).size} منشآت`,
    timespan: 'ديسمبر 2024 — يناير 2025',
    recommendation: 'إشعار المنشآت بضرورة تسجيل جميع العمال فوراً — مشاركة البيانات مع وزارة القوى العاملة — تعزيز تغطية التفتيش.',
    entities: [...new Set(illegalLaborViol.map(v => v.employerId))].map(eid => {
      const emp = INSP_DATA.employers.find(e => e.id === eid) || {};
      return { type: 'employer', id: eid, label: emp.name || eid, detail: `${illegalLaborViol.filter(v => v.employerId === eid).length} حادثة`, badge: 'b-returned' };
    }),
    relatedComplaints: [],
    relatedVisits: illegalLaborViol.map(v => v.visit).filter(Boolean)
  };

  /* ── Pattern 5: عمال بتغييرات متكررة لصاحب العمل ── */
  const mobilWorkers = INSP_DATA.workers.filter(w => w.employmentHistory && w.employmentHistory.length > 2);
  const mobilityPattern = {
    id: 'PT-005', risk: 'متوسط',
    title: 'تغيير متكرر لصاحب العمل — مؤشر ضعف الاستقرار الوظيفي',
    desc: 'عمال سجّلوا أكثر من صاحب عمل خلال فترة قصيرة، وهو مؤشر على قصور في عقود العمل أو تعرضهم لظروف تدفعهم للتنقل.',
    frequency: `${mobilWorkers.length} عمال من ${INSP_DATA.workers.length}`,
    timespan: '2013 — 2025',
    recommendation: 'مراجعة سجلات التأمين لهذه الفئة — تقييم وضع الاشتراكات — توعية بحقوق الثبات الوظيفي.',
    entities: mobilWorkers.map(wk => ({
      type: 'worker', id: wk.id, label: wk.name,
      detail: `${wk.employmentHistory.length} جهات عمل — آخرها ${wk.employer}`, badge: 'b-returned'
    })),
    relatedComplaints: mobilWorkers.flatMap(wk => allC.filter(c => c.workerId === wk.id).map(c => c.id)),
    relatedVisits: []
  };

  const patterns = [contribPattern, safetyPattern, buildingPattern, illegalPattern, mobilityPattern];
  const highCount = patterns.filter(p => p.risk === 'مرتفع').length;

  const _patternCard = p => `
    <div class="card" style="border-right:4px solid ${p.risk === 'مرتفع' ? 'var(--danger)' : p.risk === 'متوسط' ? 'var(--warning)' : 'var(--success)'}">
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
              ${p.entities.map(en => `
                <div style="display:flex;align-items:center;gap:6px;padding:5px 10px;background:var(--g50);border:1px solid var(--border);border-radius:var(--rsm);cursor:pointer"
                  onclick="navigateTo('${en.type === 'worker' ? 'worker-analysis' : 'employer-analysis'}','${en.type === 'worker' ? 'worker' : 'employer'}=${en.id}')">
                  <span style="font-size:12px;font-weight:700;color:var(--primary)">${en.label.split(' ').slice(0, 3).join(' ')}</span>
                  <span style="font-size:11px;color:var(--text3)">${en.detail}</span>
                </div>`).join('')}
            </div>
          </div>
        </div>
        ${p.relatedComplaints.length || p.relatedVisits.length ? `
        <div style="display:flex;gap:12px;flex-wrap:wrap;border-top:1px solid var(--border);padding-top:12px">
          ${p.relatedComplaints.length ? `<div>
            <span style="font-size:11px;font-weight:700;color:var(--text3)">البلاغات المرتبطة: </span>
            ${p.relatedComplaints.map(id => `<a href="#" onclick="navigateTo('complaint-details','id=${id}')" class="txp fw7" style="font-size:11px;margin-left:6px">${id}</a>`).join('')}
          </div>` : ''}
          ${p.relatedVisits.length ? `<div>
            <span style="font-size:11px;font-weight:700;color:var(--text3)">الزيارات المرتبطة: </span>
            ${p.relatedVisits.map(id => `<a href="#" onclick="navigateTo('${_vpg(id)}','id=${id}')" class="txp fw7" style="font-size:11px;margin-left:6px">${id}</a>`).join('')}
          </div>` : ''}
        </div>` : ''}
      </div>
    </div>`;

  return `<div class="pg-head"><div><h1>كشف الأنماط</h1><p>تحليل الأنماط المتكررة في المخالفات والبلاغات والعمال — مدعوم بالبيانات المتكاملة</p></div>
    <div class="pg-acts"><button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ تصدير التحليل...','i')">${ICONS.download}تصدير التحليل</button></div></div>
  <div class="alert alert-${highCount > 0 ? 'd' : 'w'}">${ICONS.warn} تم رصد <strong>${patterns.length} أنماط</strong> — منها <strong>${highCount} عالية الخطورة</strong> تستوجب إجراءً استباقياً فورياً.</div>
  <div class="stats-grid">
    <div class="scard d"><div class="sc-lbl">أنماط عالية الخطر</div><div class="sc-val">${highCount}</div></div>
    <div class="scard w"><div class="sc-lbl">أنماط متوسطة الخطر</div><div class="sc-val">${patterns.filter(p => p.risk === 'متوسط').length}</div></div>
    <div class="scard p"><div class="sc-lbl">منشآت تحت المراقبة</div><div class="sc-val">${new Set(patterns.flatMap(p => p.entities.filter(e => e.type === 'employer').map(e => e.id))).size}</div></div>
    <div class="scard i"><div class="sc-lbl">عمال في دائرة المخاطر</div><div class="sc-val">${new Set(patterns.flatMap(p => p.entities.filter(e => e.type === 'worker').map(e => e.id))).size}</div></div>
  </div>
  ${patterns.map(_patternCard).join('')}`;
}

/* ── إعداد خطة التفتيش (ops-analyst) ── */
function renderInspectionPlanDraft(role) {
  const pid = getParam('id');
  const isNew = getParam('new') === 'true';

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
        <div class="scard p"><div class="sc-lbl">قيد التنفيذ</div><div class="sc-val">${plans.filter(p => p.status.includes('قيد')).length}</div></div>
        <div class="scard i"><div class="sc-lbl">مكتملة</div><div class="sc-val">${plans.filter(p => p.status.includes('مكتملة')).length}</div></div>
        <div class="scard d"><div class="sc-lbl">مسودات</div><div class="sc-val">${plans.filter(p => p.status.includes('مسودة')).length}</div></div>
      </div>
      ${_tblWrap(['رقم الخطة', 'المسمى', 'الفترة', 'الحالة', 'نسبة الإنجاز', 'المعتمد بواسطة', 'تاريخ الاعتماد', 'إجراء'], rows)}`;
  }

  /* ══════════════════════════════════════════
     تفاصيل خطة موجودة
  ══════════════════════════════════════════ */
  if (pid) {
    const p = (INSP_DATA.inspectionPlans || []).find(x => x.id === pid) || INSP_DATA.inspectionPlans[0];
    const pct = p.targetCount ? Math.round(p.completedCount / p.targetCount * 100) : 0;
    const stCls = p.status.includes('مكتملة') ? 'b-approved' : p.status.includes('معتمدة') ? 'b-session' : p.status.includes('مسودة') ? 'b-draft' : 'b-returned';

    const stages = [
      { lbl: 'إنشاء المقترح', done: true, by: p.createdBy, date: p.createdDate },
      { lbl: 'رفع للاعتماد', done: !!p.approvedBy, by: p.createdBy, date: p.createdDate },
      { lbl: 'اعتماد مدير الدائرة', done: !!p.approvedBy, by: p.approvedBy || '—', date: p.approvalDate || '—' },
      { lbl: 'قيد التنفيذ', done: p.completedCount > 0, by: 'حاتم سالم الزدجالي', date: '—' },
      { lbl: 'مكتملة', done: p.status.includes('مكتملة'), by: '—', date: '—' },
    ];

    const planVisits = [...(INSP_DATA.visits.periodic || []), ...(INSP_DATA.visits.surprise || []), ...(INSP_DATA.visits.scheduled || [])]
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
        <div class="fgrp"><label class="flbl">القطاعات المستهدفة</label><div class="fro">${(p.sectors || []).join('، ')}</div></div>
        <div class="fgrp"><label class="flbl">المفتشون المكلفون</label><div class="fro">${(p.inspectors || []).join('، ')}</div></div>
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
          <div class="fgrp"><label class="flbl">متبقية</label><div class="fro fw7">${p.targetCount - p.completedCount - (p.inProgressCount || 0)}</div></div>
        </div>
      </div></div>

    <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.clock}</span>مراحل اعتماد الخطة</h3></div>
      <div class="pb">
        ${stages.map((s, i) => `
          <div style="display:flex;align-items:flex-start;gap:14px;padding:10px 0;${i < stages.length - 1 ? 'border-bottom:1px solid var(--border)' : ''}">
            <div style="width:28px;height:28px;border-radius:50%;background:${s.done ? 'var(--success)' : 'var(--g200)'};color:${s.done ? '#fff' : 'var(--text3)'};display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;font-weight:700">${s.done ? '✓' : (i + 1)}</div>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:700;color:${s.done ? 'var(--text)' : 'var(--text3)'}">${s.lbl}</div>
              ${s.done ? `<div style="font-size:11.5px;color:var(--text3)">${s.by} — ${s.date}</div>` : '<div style="font-size:11.5px;color:var(--text3)">بانتظار اتخاذ الإجراء</div>'}
            </div>
            <span class="badge ${s.done ? 'b-approved' : 'b-draft'}" style="font-size:10.5px">${s.done ? 'مكتمل' : 'معلق'}</span>
          </div>`).join('')}
      </div></div>

    ${planVisits.length ? `
    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.clipboard}</span>الزيارات المرتبطة بالخطة (${planVisits.length})</h3></div>
      <div class="tbl-wrap"><table class="dtbl">
        <thead><tr><th>رقم الزيارة</th><th>المنشأة</th><th>المفتش</th><th>الحالة</th><th>تاريخ الجدولة</th></tr></thead>
        <tbody>${planVisits.map(v => `<tr>
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
    lastVisit: e.lastVisit, violations: (e.violations || []).length,
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
      <td><span class="badge ${e.priority === 'أولى' ? 'b-high' : e.priority === 'ثانوية' ? 'b-medium' : 'b-low'}">${e.priority}</span></td>
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
    { key: 'complaints', icon: '📋', title: 'تقرير البلاغات', desc: 'إحصائيات البلاغات حسب النوع والحالة والفترة الزمنية', criteria: ['من تاريخ', 'إلى تاريخ', 'الحالة', 'نوع البلاغ', 'المنشأة'] },
    { key: 'visits', icon: '🏭', title: 'تقرير الزيارات التفتيشية', desc: 'ملخص الزيارات المنجزة والمجدولة وبيانات المحاضر', criteria: ['من تاريخ', 'إلى تاريخ', 'نوع الزيارة', 'الحالة', 'المفتش'] },
    { key: 'appeals', icon: '⚖️', title: 'تقرير التظلمات', desc: 'بيانات التظلمات المقدمة والقرارات الصادرة', criteria: ['من تاريخ', 'إلى تاريخ', 'الحالة', 'نوع التظلم'] },
    { key: 'compliance', icon: '✅', title: 'تقرير الامتثال', desc: 'نسب امتثال المنشآت واشتراكات التأمين والمخالفات', criteria: ['من تاريخ', 'إلى تاريخ', 'المنشأة', 'مستوى المخاطر', 'القطاع'] },
    { key: 'kpi', icon: '📊', title: 'تقرير مؤشرات الأداء', desc: 'مؤشرات الأداء الرئيسية للأقسام ومعدلات الإنجاز', criteria: ['الفترة', 'القسم'] },
    { key: 'risk', icon: '⚠️', title: 'تقرير تحليل المخاطر', desc: 'المنشآت عالية المخاطر والعمال في حالات الخطر', criteria: ['من تاريخ', 'إلى تاريخ', 'مستوى المخاطر', 'القطاع'] },
    { key: 'bans', icon: '🚫', title: 'تقرير قرارات الحظر', desc: 'حالات الحظر الصادرة وحالة تنفيذ القرارات', criteria: ['من تاريخ', 'إلى تاريخ', 'الحالة'] },
    { key: 'corrective', icon: '🔧', title: 'تقرير الإجراءات التصحيحية', desc: 'المخالفات المرصودة والإجراءات التصحيحية المطلوبة ونسب تنفيذها', criteria: ['من تاريخ', 'إلى تاريخ', 'المنشأة', 'الحالة'] },
  ];
  const externalTypes = [
    { key: 'my-complaints', icon: '📋', title: 'بلاغاتي', desc: 'كشف بجميع البلاغات التي قدمتها وحالتها الحالية', criteria: ['من تاريخ', 'إلى تاريخ', 'الحالة', 'نوع البلاغ'] },
    { key: 'my-visits', icon: '🏭', title: 'زياراتي التفتيشية', desc: 'الزيارات التفتيشية المُجراة على منشأتك ونتائجها', criteria: ['من تاريخ', 'إلى تاريخ', 'نوع الزيارة', 'الحالة'] },
    { key: 'my-appeals', icon: '⚖️', title: 'تظلماتي', desc: 'التظلمات التي قدمتها والقرارات الصادرة بشأنها', criteria: ['من تاريخ', 'إلى تاريخ', 'الحالة'] },
    { key: 'compliance', icon: '✅', title: 'حالة الالتزام', desc: 'ملخص حالة اشتراكاتك التأمينية وأي ملاحظات معلقة', criteria: ['من تاريخ', 'إلى تاريخ'] },
  ];

  const types = isExternal ? externalTypes : internalTypes;

  /* sample filtered data per type */
  const sampleData = {
    complaints: () => {
      const rows = INSP_DATA.complaints.slice(0, 5).map(c =>
        `<tr><td class="fw7 txp">${c.id}</td><td>${c.type}</td><td>${c.employerName}</td><td>${statusBadge(c.status)}</td><td>${c.submitDate}</td></tr>`).join('');
      return _tblWrap(['رقم البلاغ', 'النوع', 'المنشأة', 'الحالة', 'تاريخ التقديم'], rows);
    },
    visits: () => {
      const all = [...INSP_DATA.visits.periodic.slice(0, 3), ...INSP_DATA.visits.surprise.slice(0, 2)];
      const rows = all.map(v => `<tr><td class="fw7 txp">${v.id}</td><td>${v.employerName}</td><td>${v.inspectorName}</td><td>${statusBadge(v.status)}</td><td>${v.scheduledDate}</td></tr>`).join('');
      return _tblWrap(['رقم الزيارة', 'المنشأة', 'المفتش', 'الحالة', 'التاريخ المجدول'], rows);
    },
    appeals: () => {
      const rows = INSP_DATA.appeals.slice(0, 4).map(a =>
        `<tr><td class="fw7 txp">${a.id}</td><td>${a.type}</td><td>${a.employerName}</td><td>${statusBadge(a.status)}</td><td>${a.submitDate}</td></tr>`).join('');
      return _tblWrap(['رقم التظلم', 'النوع', 'المنشأة', 'الحالة', 'تاريخ التقديم'], rows);
    },
    compliance: () => {
      const rows = INSP_DATA.employers.map(e =>
        `<tr><td class="fw7">${e.name}</td><td>${e.sector}</td><td><span class="badge ${e.contributions.status === 'منتظم' ? 'b-approved' : 'b-returned'}">${e.contributions.status}</span></td><td>${e.complianceScore}%</td><td><span class="badge ${e.riskLevel === 'مرتفع' ? 'b-rejected' : e.riskLevel === 'متوسط' ? 'b-returned' : 'b-approved'}">${e.riskLevel}</span></td></tr>`).join('');
      return _tblWrap(['المنشأة', 'القطاع', 'حالة الاشتراكات', 'درجة الامتثال', 'مستوى المخاطر'], rows);
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
        `<tr><td class="fw7">${e.name}</td><td>${e.sector}</td><td><span class="badge ${e.riskLevel === 'مرتفع' ? 'b-rejected' : e.riskLevel === 'متوسط' ? 'b-returned' : 'b-approved'}">${e.riskLevel}</span></td><td>${e.violations.length}</td><td>${e.lastVisit || '—'}</td></tr>`).join('');
      return _tblWrap(['المنشأة', 'القطاع', 'مستوى المخاطر', 'عدد المخالفات', 'آخر زيارة'], rows);
    },
    bans: () => `<div class="alert alert-i">${ICONS.info} لا توجد بيانات حظر تطابق المعايير المحددة في الفترة المختارة.</div>`,
    corrective: () => {
      const vios = INSP_DATA.employers.flatMap(e => (e.violations || []).map(v => ({ ...v, employer: e.name })));
      const rows = vios.slice(0, 5).map(v => `<tr><td>${v.employer}</td><td>${v.type}</td><td><span class="badge ${v.severity === 'مرتفع' ? 'b-rejected' : v.severity === 'متوسط' ? 'b-returned' : 'b-draft'}">${v.severity}</span></td><td>${v.date}</td><td><span class="badge ${v.status === 'منجز' ? 'b-approved' : 'b-returned'}">${v.status}</span></td></tr>`).join('');
      return _tblWrap(['المنشأة', 'نوع المخالفة', 'الخطورة', 'التاريخ', 'الحالة'], rows);
    },
    'my-complaints': () => {
      const rows = INSP_DATA.complaints.slice(0, 5).map(c =>
        `<tr><td class="fw7 txp">${c.id}</td><td>${c.type}</td><td>${statusBadge(c.status)}</td><td>${c.submitDate}</td><td>${c.dueDate || '—'}</td></tr>`).join('');
      return _tblWrap(['رقم البلاغ', 'النوع', 'الحالة', 'تاريخ التقديم', 'الموعد النهائي'], rows);
    },
    'my-visits': () => {
      const all = [...INSP_DATA.visits.periodic, ...INSP_DATA.visits.surprise].slice(0, 4);
      const rows = all.map(v => `<tr><td class="fw7 txp">${v.id}</td><td>${v.id.includes('-04-') ? 'مفاجئة' : 'دورية'}</td><td>${statusBadge(v.status)}</td><td>${v.scheduledDate}</td><td>${v.actualDate || '—'}</td></tr>`).join('');
      return _tblWrap(['رقم الزيارة', 'النوع', 'الحالة', 'التاريخ المجدول', 'تاريخ التنفيذ'], rows);
    },
    'my-appeals': () => {
      const rows = INSP_DATA.appeals.slice(0, 3).map(a =>
        `<tr><td class="fw7 txp">${a.id}</td><td>${a.type}</td><td>${statusBadge(a.status)}</td><td>${a.submitDate}</td></tr>`).join('');
      return _tblWrap(['رقم التظلم', 'النوع', 'الحالة', 'تاريخ التقديم'], rows);
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
          ${INSP_DATA.employers.map(e => `<option value="${e.id}">${e.name}</option>`).join('')}
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
  var _reportTypes = ${JSON.stringify(types.map(t => ({ key: t.key, title: t.title })))};
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
  ${Object.entries(sampleData).map(([k, fn]) => `window['_rptSample_${k}'] = function(){ return ${JSON.stringify(fn())}; };`).join('\n  ')}
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
  const reportAttachments = _withSampleAttachments(r, 'report');
  const reportNotes = _withSampleNotes(r, 'report');

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
    <div class="fgrp"><label class="flbl">حالة التقرير</label><div class="fro"><span class="badge b-approved">جاهز للمراجعة والعرض</span></div></div>
    <div class="fgrp span-full"><label class="flbl">الملخص التنفيذي</label><div class="fro" style="min-height:60px">${r.summary}</div></div>
  </div></div></div>
  ${r.sections.map(s => `<div class="card"><div class="ph"><h3>${s.title}</h3></div>
    <div class="pb"><p style="font-size:13px;color:var(--text2);line-height:1.8">${s.body}</p></div></div>`).join('')}
  <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.upload}</span>مرفقات التقرير (${reportAttachments.length})</h3></div>
    <div class="pb">${reportAttachments.map(f => attRow(f)).join('')}</div></div>
  ${renderNotes(reportNotes, r.id)}`;
}

/* ── زيارات جهة العمل / المؤمن عليه ── */
function renderEmployerVisitsList(role) {
  const all = [...INSP_DATA.visits.periodic, ...INSP_DATA.visits.surprise, ...INSP_DATA.visits.scheduled];
  const currentUser = INSP_DATA.users[role] || {};
  const employer = role === 'employer'
    ? (INSP_DATA.employers || []).find(e => e.name === currentUser.dept)
    : null;
  const myEmployerId = employer ? employer.id : null;
  const myCivil = role === 'insured' ? currentUser.civil : null;
  const scoped = role === 'employer'
    ? all.filter(v => !myEmployerId || v.employerId === myEmployerId)
    : role === 'insured'
      ? all.filter(v => {
        const workersForEmployer = (INSP_DATA.workers || []).filter(w => w.employerId === v.employerId).map(w => w.civil);
        return workersForEmployer.includes(myCivil);
      })
      : all;
  const _vTypeKey = v => v.id.includes('-03-') ? 'periodic' : v.id.includes('-04-') ? 'surprise' : 'scheduled';
  const _vDetPage = v => v.id.includes('-03-') ? 'visit-periodic-details' : v.id.includes('-04-') ? 'visit-surprise-details' : 'visit-scheduled-details';
  const typeLabel = v => v.id.includes('-03-') ? 'دورية' : v.id.includes('-04-') ? 'مفاجئة' : 'مجدولة';
  const isCompleted = v => v.status && (v.status.includes('تم اعتماد') || v.status.includes('مغلقة'));

  const rows = scoped.map(v =>
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

  return `<div class="pg-head"><div><h1>الزيارات التفتيشية</h1><p>${role === 'insured' ? 'الزيارات المرتبطة بجهة عملك الحالية' : 'جميع الزيارات المتعلقة بمنشأتك'} — ${scoped.length} زيارة</p></div></div>
    ${_filterBar([{ label: 'نوع الزيارة', type: 'select', opts: ['دورية', 'مفاجئة', 'مجدولة'] }, { label: 'الحالة', type: 'select', opts: ['مجدولة', 'جارية', 'بانتظار مراجعة المحضر', 'تم اعتماد المحضر', 'مغلقة'] }, { label: 'من تاريخ', type: 'date' }])}
    ${_tblWrap(['رقم الزيارة', 'النوع', 'المفتش', 'الحالة', 'التاريخ المجدول', 'تاريخ التنفيذ', 'إجراء'], rows || _noData())}`;
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
                <div style="font-size:10px;color:${g.trend.includes('+') ? 'var(--success)' : 'var(--danger)'};font-weight:600">${g.trend}</div>
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
                <div style="height:100%;width:${(g.count / maxCount) * 100}%;background:${g.color};border-radius:3px"></div>
              </div>
              <div style="font-size:10px;color:${g.trend.includes('+') ? 'var(--success)' : 'var(--danger)'};margin-top:2px">${g.trend} عن الشهر الماضي</div>
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
    let queryId = id;
    if (/^[0-9]+$/.test(id) && id.length >= 4) {
      const wMatch = INSP_DATA.workers.find(w => w.civil === id);
      const eMatch = INSP_DATA.employers.find(e => e.crn === id);
      const cMatch = INSP_DATA.complaints.find(c =>
        (c.workerCivil === id) ||
        (c.employerCRN === id) ||
        (wMatch && c.workerId === wMatch.id) ||
        (eMatch && c.employerId === eMatch.id)
      );
      if (cMatch) queryId = cMatch.id;
    }

    const complaint = INSP_DATA.complaints.find(c => c.id === queryId);
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

  return `<div class="pg-head"><div><h1>السجل الزمني</h1><p>سجل جميع الأنشطة والإجراءات على النظام</p></div>
    <div class="pg-acts">
      <button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ تصدير السجلات...','i')">${ICONS.download}تصدير</button>
    </div></div>

    <div class="card mb12">
      <div class="ph"><h3><span class="pico gr">${ICONS.filter}</span>البحث عن سجل طلب</h3></div>
      <div class="pb">
        <div class="fg fg-3">
          <div class="fgrp">
            <label class="flbl">البحث بواسطة</label>
            <select id="tl-type-select" class="fc">
              <option value="complaint">رقم البلاغ / الطلب</option>
              <option value="civil">الرقم المدني للعامل</option>
              <option value="crn">السجل التجاري للمنشأة</option>
            </select>
          </div>
          <div class="fgrp">
            <label class="flbl">رقم البحث</label>
            <input class="fc" id="tl-ref-input" placeholder="أدخل رقم الطلب أو الرقم المدني أو السجل التجاري" value="${requestId}">
          </div>
          <div class="fgrp" style="align-self:flex-end">
            <button class="btn btn-primary" style="width:100%" onclick="_showTimelineByRef()">${ICONS.search}عرض السجل الزمني</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    function _showTimelineByRef() {
      var ref = document.getElementById('tl-ref-input') ? document.getElementById('tl-ref-input').value.trim() : '';
      if (!ref) { showToast('يرجى إدخال رقم المرجع','w'); return; }
      var currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('id', ref);
      window.location.href = currentUrl.toString();
    }
    document.addEventListener('DOMContentLoaded', function() {
      var inp = document.getElementById('tl-ref-input');
      if (inp) inp.addEventListener('keydown', function(e){ if(e.key==='Enter') _showTimelineByRef(); });
    });
    <\/script>

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
      <td><a href="#" onclick="navigateTo('../services/job-security-request-details','id=${r.id}')" class="txp fw7">${r.id}</a></td>
      <td>${r.workerName}</td>
      <td>${r.workerCivil}</td>
      <td>${r.employerName}</td>
      <td>${statusBadge(r.status)}</td>
      <td>${r.requestDate}</td>
      <td><div class="df ac g8">
        <button class="btn btn-primary btn-xs" onclick="navigateTo('../services/job-security-request-details','id=${r.id}')">${ICONS.eye}عرض</button>
      </div></td>
    </tr>`).join('');

  return `<div class="pg-head"><div><h1>طلبات الأمان الوظيفي</h1><p>جميع طلبات الأمان الوظيفي — ${requests.length} طلب</p></div>
    <div class="pg-acts">
      <button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ تصدير القائمة...','i')">${ICONS.download}تصدير</button>
    </div></div>
    ${_filterBar([{ label: 'الحالة', type: 'select', opts: ['الكل', 'قيد المراجعة', 'قيد المعالجة', 'معتمد', 'مرفوض'] }, { label: 'من تاريخ', type: 'date' }])}
    ${_tblWrap(['رقم الطلب', 'اسم العامل', 'الرقم المدني', 'المنشأة', 'الحالة', 'تاريخ الطلب', 'إجراء'], rows || _noData())}`;
}

function renderJobSecurityRequestDetails(role) {
  const requestId = getParam('id') || 'JSR-2025-0001';
  const request = INSP_DATA.jobSecurityRequests?.find(r => r.id === requestId) || {
    id: requestId,
    status: 'محال للتفتيش',
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

  // قواعد التحقق من طلبات الأمان الوظيفي
  const rules = [
    {
      id: 'JSR-001',
      title: 'التحقق من قيمة الأجر الأخير',
      description: 'مقارنة قيمة الأجر الأخير بتسلسل الأجر في نفس العقد بحيث لا تتجاوز الزيادة أكثر من 25%',
      status: 'failed',
      severity: 'critical',
      details: 'الأجر الأخير 450 ر.ع يزيد بنسبة 35% عن متوسط الأجر في العقد (333 ر.ع)'
    },
    {
      id: 'JSR-002',
      title: 'التحقق من قيمة الأجر الأخير مقارنة بالأجر في آخر عقد',
      description: 'مقارنة قيمة الأجر الأخير بالأجر في آخر عقد مسجل إن وجد بما لا يتجاوز 50%',
      status: 'passed',
      severity: 'info'
    },
    {
      id: 'JSR-003',
      title: 'التحقق من الأجر المسجل للعاملين الآخرين',
      description: 'التحقق من الأجر المسجل للعاملين الآخرين المسجلين بنفس المنشأة بحيث لا يتجاوز الفرق متوسط أجر العمال للمنشآت الفردية',
      status: 'passed',
      severity: 'info'
    },
    {
      id: 'JSR-004',
      title: 'التحقق من أجر العمال',
      description: 'التحقق من أجر العمال بحيث لا يتجاوز الفرق 75% من أعلى راتب',
      status: 'passed',
      severity: 'info'
    },
    {
      id: 'JSR-005',
      title: 'التحقق من مدة آخر عقد',
      description: 'التحقق من مدة آخر عقد بحيث لا تقل عن 6 أشهر (المادة 87) من اللائحة',
      status: 'passed',
      severity: 'info'
    },
    {
      id: 'JSR-006',
      title: 'التحقق من صلة القرابة',
      description: 'التحقق من صلة القرابة بين أصحاب المنشأة والعامل عليه (القبيلة) و (شجرة العائلة)',
      status: 'passed',
      severity: 'warning'
    },
    {
      id: 'JSR-007',
      title: 'التحقق من حالات سابقة في نظام التفتيش',
      description: 'التحقق من وجود حالات سابقة في نظام التفتيش للعامل عليه والمنشأة',
      status: 'failed',
      severity: 'critical',
      details: 'وجدت 3 حالات سابقة للمنشأة في نظام التفتيش خلال العامين الماضيين'
    },
    {
      id: 'JSR-008',
      title: 'التحقق من وجود تسجيل وهمي/بطلان تأمين',
      description: 'التحقق من وجود تسجيل وهمي / بطلان تأمين بالمنشأة أو العامل عليه سابقاً',
      status: 'passed',
      severity: 'warning'
    },
    {
      id: 'JSR-009',
      title: 'التحقق من سداد الاشتراكات',
      description: 'التحقق من سداد الاشتراكات من عدمه للعامل عليه والمنشأة',
      status: 'passed',
      severity: 'info'
    },
    {
      id: 'JSR-010',
      title: 'التحقق من الأجور المسجلة في نظام حماية الأجور',
      description: 'التحقق من الأجور المسجلة في نظام حماية الأجور ومقارنتها بالمسجل في الصندوق وكذلك تسلسل الأجور المسجلة بنظام حماية الأجور - واسم المنشأة المصروف منها الراتب',
      status: 'failed',
      severity: 'critical',
      details: 'توجد اختلافات بين الأجور المسجلة في نظام حماية الأجور والصندوق'
    },
    {
      id: 'JSR-011',
      title: 'التحقق من المشاريع المسندة للشركة',
      description: 'التحقق من المشاريع المسندة للشركة وهل العامل عليه يتبع للمشروع وتاريخ انتهاء المشروع',
      status: 'passed',
      severity: 'info'
    },
    {
      id: 'JSR-012',
      title: 'التحقق من أنشطة الدرجة الرابعة',
      description: 'التحقق من أن الطلب يتبع الأنشطة البسيطة في الدرجة الرابعة كمحل البقالة والخياطة والمقاهي',
      status: 'passed',
      severity: 'info'
    },
    {
      id: 'JSR-013',
      title: 'التحقق من وجود عقود إيجارات سارية',
      description: 'التحقق من وجود عقود إيجارات سارية',
      status: 'passed',
      severity: 'info'
    },
    {
      id: 'JSR-014',
      title: 'التحقق من فروع المنشأة وموقعها',
      description: 'التحقق من فروع المنشأة وموقعها',
      status: 'passed',
      severity: 'info'
    },
    {
      id: 'JSR-015',
      title: 'التحقق من وجود نزاع عمالي أو قضية في المحكمة',
      description: 'التحقق من وجود نزاع عمالي أو قضية في المحكمة',
      status: 'passed',
      severity: 'warning'
    },
    {
      id: 'JSR-016',
      title: 'التحقق من الموقع الجغرافي للمنشأة',
      description: 'التحقق من الموقع الجغرافي للمنشأة',
      status: 'passed',
      severity: 'info'
    },
    {
      id: 'JSR-017',
      title: 'التحقق من عدم وجود العامل على مقاعد الدراسة',
      description: 'التحقق من عدم وجود العامل عليه على مقاعد الدراسة',
      status: 'passed',
      severity: 'info'
    }
  ];

  const passedRules = rules.filter(r => r.status === 'passed').length;
  const failedRules = rules.filter(r => r.status === 'failed').length;
  const pendingRules = rules.filter(r => r.status === 'pending').length;

  const rulesHtml = rules.map(rule => `
    <div class="rule-item">
      <div class="rule-status ${rule.status}">
        ${rule.status === 'passed' ? ICONS.check : rule.status === 'failed' ? ICONS.x : ICONS.clock}
      </div>
      <div class="rule-content">
        <div class="rule-title">${rule.title}</div>
        <div class="rule-description">${rule.description}</div>
        <div class="rule-meta">
          <span class="rule-badge ${rule.severity}">${rule.id}</span>
          <span class="rule-badge ${rule.severity}">${rule.severity === 'critical' ? 'حرج' : rule.severity === 'warning' ? 'تحذير' : 'معلومات'}</span>
        </div>
        ${rule.details ? `<div class="violation-details"><h5>⚠️ تفاصيل الانتهاك:</h5><p>${rule.details}</p></div>` : ''}
      </div>
    </div>
  `).join('');

  return `<div class="pg-head"><div><h1>${request.id}</h1><p>تفاصيل طلب الأمان الوظيفي</p></div>
    <div class="pg-acts">
      <button class="btn btn-secondary btn-sm" onclick="navigateTo('../services/job-security-requests-list')">${ICONS.arrow_right}رجوع</button>
      <button class="btn btn-primary btn-sm" onclick="showToast('جارٍ طباعة الطلب...','i')">${ICONS.download}طباعة</button>
    </div></div>

    ${failedRules > 0 ? `
    <div class="inspection-alert">
      ${ICONS.alert}
      <div class="inspection-alert-content">
        <h4>⚠️ تم تحويل الطلب للتفتيش</h4>
        <p>تم اكتشاف ${failedRules} انتهاك(s) في قواعد التحقق. يتطلب الأمر مراجعة تفصيلية.</p>
      </div>
    </div>
    ` : ''}

    <div class="risk-assessment">
      <h3>${ICONS.shield} تقييم المخاطر</h3>
      <div class="risk-level">
        <span class="risk-label">مستوى الخطر:</span>
        <div class="risk-bar-container">
          <div class="risk-bar ${failedRules > 2 ? 'high' : failedRules > 0 ? 'medium' : 'low'}" style="width: ${failedRules > 2 ? '85%' : failedRules > 0 ? '55%' : '15%'}"></div>
        </div>
        <span class="risk-label">${failedRules > 2 ? 'مرتفع' : failedRules > 0 ? 'متوسط' : 'منخفض'}</span>
      </div>
      <div class="risk-recommendations">
        <h4>📋 التوصيات:</h4>
        <ul>
          <li>إجراء تحقيق شامل في الانتهاكات المكتشفة</li>
          <li>مراجعة الوثائق الداعمة للطلب</li>
          <li>التواصل مع المنشأة والعامل للحصول على توضيحات</li>
          <li>تحديث حالة الطلب بعد إكمال التحقيق</li>
        </ul>
      </div>
    </div>

    <div class="rules-section">
      <div class="rules-header">
        <h3>${ICONS.list} قواعد التحقق</h3>
        <div class="rules-stats">
          <div class="rule-stat passed">${ICONS.check} ${passedRules} متوافق</div>
          <div class="rule-stat failed">${ICONS.x} ${failedRules} انتهاك</div>
          <div class="rule-stat pending">${ICONS.clock} ${pendingRules} قيد المراجعة</div>
        </div>
      </div>
      <div class="rules-list">
        ${rulesHtml}
      </div>
    </div>

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
        <div class="fgrp"><label class="flbl">إجمالي المستحقات</label><div class="fro fw7" style="color:var(--primary)">13,500 ر.ع</div></div>
        <div class="fgrp"><label class="flbl">المبالغ المدفوعة</label><div class="fro fw7" style="color:var(--success)">9,000 ر.ع</div></div>
        <div class="fgrp"><label class="flbl">المتبقي</label><div class="fro fw7" style="color:var(--danger)">4,500 ر.ع</div></div>
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
      <td><a href="#" onclick="navigateTo('../services/family-benefits-request-details','id=${r.id}')" class="txp fw7">${r.id}</a></td>
      <td>${r.workerName}</td>
      <td>${r.workerCivil}</td>
      <td>${r.employerName}</td>
      <td>${statusBadge(r.status)}</td>
      <td>${r.requestDate}</td>
      <td><div class="df ac g8">
        <button class="btn btn-primary btn-xs" onclick="navigateTo('../services/family-benefits-request-details','id=${r.id}')">${ICONS.eye}عرض</button>
      </div></td>
    </tr>`).join('');

  return `<div class="pg-head"><div><h1>طلبات منافع دخل الأسرة</h1><p>جميع طلبات منافع دخل الأسرة — ${requests.length} طلب</p></div>
    <div class="pg-acts">
      <button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ تصدير القائمة...','i')">${ICONS.download}تصدير</button>
    </div></div>
    ${_filterBar([{ label: 'الحالة', type: 'select', opts: ['الكل', 'قيد المراجعة', 'قيد المعالجة', 'معتمد', 'مرفوض'] }, { label: 'من تاريخ', type: 'date' }])}
    ${_tblWrap(['رقم الطلب', 'اسم العامل', 'الرقم المدني', 'المنشأة', 'الحالة', 'تاريخ الطلب', 'إجراء'], rows || _noData())}`;
}

function renderFamilyBenefitRequestDetails(role) {
  const requestId = getParam('id') || 'FBR-2025-0001';
  const request = INSP_DATA.familyBenefitRequests?.find(r => r.id === requestId) || {
    id: requestId,
    status: 'محال للتفتيش',
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

  // قواعد التحقق من طلبات منافع دخل الأسرة
  const rules = [
    {
      id: 'FBR-001',
      title: 'التحقق من شرط الإقامة للمنتفعين',
      description: 'التحقق من شرط الإقامة للمنتفعين حسب المادة 5 من اللائحة',
      status: 'passed',
      severity: 'info'
    },
    {
      id: 'FBR-002',
      title: 'التحقق من الحالة الاجتماعية لأفراد الأسرة',
      description: 'التحقق من الحالة الاجتماعية لأفراد الأسرة في حال تكرار الزواج',
      status: 'passed',
      severity: 'warning'
    },
    {
      id: 'FBR-003',
      title: 'التحقق من ممتلكات الأسرة',
      description: 'التحقق من ممتلكات الأسرة',
      status: 'failed',
      severity: 'critical',
      details: 'توجد ممتلكات مسجلة باسم أحد أفراد الأسرة تتجاوز الحد المسموح'
    },
    {
      id: 'FBR-004',
      title: 'التحقق من العروض الوظيفية للأفراد',
      description: 'التحقق من العروض الوظيفية للأفراد العائلة',
      status: 'passed',
      severity: 'info'
    },
    {
      id: 'FBR-005',
      title: 'التحقق من أعمار أفراد الأسرة',
      description: 'التحقق من أعمار أفراد الأسرة حسب ما ذكر بالمادة 81 بالقانون',
      status: 'passed',
      severity: 'info'
    },
    {
      id: 'FBR-006',
      title: 'التحقق من عقود العمل المسجلة وغير المسجلة',
      description: 'التحقق من عقود العمل المسجلة وغير مسجلة في الصندوق ووزارة العمل',
      status: 'failed',
      severity: 'critical',
      details: 'توجد عقود عمل غير مسجلة في الصندوق لعضوين من الأسرة'
    },
    {
      id: 'FBR-007',
      title: 'التحقق من التحاق أحد أفراد الأسرة بمقاعد الدراسة',
      description: 'التحقق من التحاق أحد أفرار الأسرة بمقاعد الدراسة',
      status: 'passed',
      severity: 'info'
    },
    {
      id: 'FBR-008',
      title: 'التحقق من السجلات التجارية المسجلة',
      description: 'التحقق من السجلات التجارية المسجلة باسم افراد العائلة',
      status: 'passed',
      severity: 'warning'
    },
    {
      id: 'FBR-009',
      title: 'مراجعة التقارير الطبية',
      description: 'التقارير الطبية',
      status: 'passed',
      severity: 'info'
    },
    {
      id: 'FBR-010',
      title: 'التحقق من الجنسية',
      description: 'التحقق من الجنسية',
      status: 'passed',
      severity: 'info'
    },
    {
      id: 'FBR-011',
      title: 'مراجعة شجرة العائلة',
      description: 'شجرة العائلة',
      status: 'passed',
      severity: 'warning'
    },
    {
      id: 'FBR-012',
      title: 'التحقق من المنافع المقدمة من الصندوق',
      description: 'التحقق من المنافع المقدمة من الصندوق',
      status: 'passed',
      severity: 'info'
    },
    {
      id: 'FBR-013',
      title: 'التحقق من بيانات وزارة التنمية',
      description: 'التحقق من بيانات وزارة التنمية والجمعيات التابعة لها',
      status: 'passed',
      severity: 'info'
    },
    {
      id: 'FBR-014',
      title: 'التحقق من مكان إقامة أفراد الأسرة',
      description: 'التحقق من مكان اقامة أفراد الأسرة',
      status: 'passed',
      severity: 'info'
    },
    {
      id: 'FBR-015',
      title: 'مراجعة بيانات البحث الاجتماعي',
      description: 'بيانات البحث الاجتماعي لأثبات رعاية كبار السن',
      status: 'passed',
      severity: 'warning'
    },
    {
      id: 'FBR-016',
      title: 'التحقق من بيانات الأجور',
      description: 'بيانات الاجور التي يستلمها افراد الأسرة من وظائفهم',
      status: 'passed',
      severity: 'info'
    }
  ];

  const passedRules = rules.filter(r => r.status === 'passed').length;
  const failedRules = rules.filter(r => r.status === 'failed').length;
  const pendingRules = rules.filter(r => r.status === 'pending').length;

  const rulesHtml = rules.map(rule => `
    <div class="rule-item">
      <div class="rule-status ${rule.status}">
        ${rule.status === 'passed' ? ICONS.check : rule.status === 'failed' ? ICONS.x : ICONS.clock}
      </div>
      <div class="rule-content">
        <div class="rule-title">${rule.title}</div>
        <div class="rule-description">${rule.description}</div>
        <div class="rule-meta">
          <span class="rule-badge ${rule.severity}">${rule.id}</span>
          <span class="rule-badge ${rule.severity}">${rule.severity === 'critical' ? 'حرج' : rule.severity === 'warning' ? 'تحذير' : 'معلومات'}</span>
        </div>
        ${rule.details ? `<div class="violation-details"><h5>⚠️ تفاصيل الانتهاك:</h5><p>${rule.details}</p></div>` : ''}
      </div>
    </div>
  `).join('');

  return `<div class="pg-head"><div><h1>${request.id}</h1><p>تفاصيل طلب منافع دخل الأسرة</p></div>
    <div class="pg-acts">
      <button class="btn btn-secondary btn-sm" onclick="navigateTo('../services/family-benefits-requests-list')">${ICONS.arrow_right}رجوع</button>
      <button class="btn btn-primary btn-sm" onclick="showToast('جارٍ طباعة الطلب...','i')">${ICONS.download}طباعة</button>
    </div></div>

    ${failedRules > 0 ? `
    <div class="inspection-alert">
      ${ICONS.alert}
      <div class="inspection-alert-content">
        <h4>⚠️ تم تحويل الطلب للتفتيش</h4>
        <p>تم اكتشاف ${failedRules} انتهاك(s) في قواعد التحقق. يتطلب الأمر مراجعة تفصيلية.</p>
      </div>
    </div>
    ` : ''}

    <div class="risk-assessment">
      <h3>${ICONS.shield} تقييم المخاطر</h3>
      <div class="risk-level">
        <span class="risk-label">مستوى الخطر:</span>
        <div class="risk-bar-container">
          <div class="risk-bar ${failedRules > 2 ? 'high' : failedRules > 0 ? 'medium' : 'low'}" style="width: ${failedRules > 2 ? '75%' : failedRules > 0 ? '45%' : '20%'}"></div>
        </div>
        <span class="risk-label">${failedRules > 2 ? 'مرتفع' : failedRules > 0 ? 'متوسط' : 'منخفض'}</span>
      </div>
      <div class="risk-recommendations">
        <h4>📋 التوصيات:</h4>
        <ul>
          <li>مراجعة ممتلكات الأسرة المسجلة</li>
          <li>التأكد من تسجيل جميع عقود العمل في الصندوق</li>
          <li>طلب وثائق إضافية تثبت الحالة المالية</li>
          <li>إجراء زيارة ميدانية للتحقق من الوضع</li>
        </ul>
      </div>
    </div>

    <div class="rules-section">
      <div class="rules-header">
        <h3>${ICONS.list} قواعد التحقق</h3>
        <div class="rules-stats">
          <div class="rule-stat passed">${ICONS.check} ${passedRules} متوافق</div>
          <div class="rule-stat failed">${ICONS.x} ${failedRules} انتهاك</div>
          <div class="rule-stat pending">${ICONS.clock} ${pendingRules} قيد المراجعة</div>
        </div>
      </div>
      <div class="rules-list">
        ${rulesHtml}
      </div>
    </div>

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

    ${renderNotes(request.notes, request.id)}
    ${renderTimeline(request.timeline)}`;
}

/* ── طلبات إجازة الأمومة ── */
function renderMaternityLeaveRequestsList(role) {
  const requests = INSP_DATA.maternityLeaveRequests || [];
  const rows = requests.map(r => `
    <tr>
      <td><a href="#" onclick="navigateTo('../services/maternity-leave-request-details','id=${r.id}')" class="txp fw7">${r.id}</a></td>
      <td>${r.workerName}</td>
      <td>${r.workerCivil}</td>
      <td>${r.employerName}</td>
      <td>${statusBadge(r.status)}</td>
      <td>${r.requestDate}</td>
      <td><div class="df ac g8">
        <button class="btn btn-primary btn-xs" onclick="navigateTo('../services/maternity-leave-request-details','id=${r.id}')">${ICONS.eye}عرض</button>
      </div></td>
    </tr>`).join('');

  return `<div class="pg-head"><div><h1>طلبات إجازة الأمومة</h1><p>جميع طلبات إجازة الأمومة — ${requests.length} طلب</p></div>
    <div class="pg-acts">
      <button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ تصدير القائمة...','i')">${ICONS.download}تصدير</button>
    </div></div>
    ${_filterBar([{ label: 'الحالة', type: 'select', opts: ['الكل', 'قيد المراجعة', 'قيد المعالجة', 'معتمد', 'مرفوض'] }, { label: 'من تاريخ', type: 'date' }])}
    ${_tblWrap(['رقم الطلب', 'اسم العامل', 'الرقم المدني', 'المنشأة', 'الحالة', 'تاريخ الطلب', 'إجراء'], rows || _noData())}`;
}

function renderMaternityLeaveRequestDetails(role) {
  const requestId = getParam('id') || 'MLR-2025-0001';
  const request = INSP_DATA.maternityLeaveRequests?.find(r => r.id === requestId) || {
    id: requestId,
    status: 'محال للتفتيش',
    requestDate: '2025-01-25',
    workerName: 'فاطمة بنت سالم الهنائي',
    workerCivil: '28475912',
    employerName: 'شركة الخدمات الطبية',
    employerCRN: '1012345680',
    leaveType: 'إجازة أمومة',
    expectedDeliveryDate: '2025-03-15',
    leaveStartDate: '2025-03-01',
    leaveDuration: '98 يوم',
    monthlySalary: 4200,
  };

  // قواعد التحقق من طلبات إجازة الأمومة
  const rules = [
    {
      id: 'MLR-001',
      title: 'التحقق من الإجازة من جهة معتمدة',
      description: 'التحقق من الإجازة صادرة من جهة معتمدة في وزارة الصحة',
      status: 'passed',
      severity: 'info'
    },
    {
      id: 'MLR-002',
      title: 'التحقق من ارتفاع الأجر قبل الإجازة',
      description: 'التحقق من وجود ارتفاع في الأجر لمدة سنة سابقة قبل الإجازة بنسبة 20%',
      status: 'failed',
      severity: 'critical',
      details: 'تم ارتفاع الأجر بنسبة 35% خلال السنة السابقة للإجازة'
    },
    {
      id: 'MLR-003',
      title: 'التحقق من تشابه الأسماء',
      description: 'التحقق من وجود تشابه بالأسماء بين صاحب المنشأة المسجل فيها والعاملة عليها',
      status: 'passed',
      severity: 'warning'
    },
    {
      id: 'MLR-004',
      title: 'التحقق من مدة العقد',
      description: 'التحقق من مدة العقد قبل بحيث لا تقل المدة عن 9 أشهر منذ الالتحاق',
      status: 'passed',
      severity: 'info'
    },
    {
      id: 'MLR-005',
      title: 'التحقق من درجة السجل التجاري',
      description: 'التحقق من درجة السجل في وزارة التجارة بحيث لا تكون من الدرجة الرابعة',
      status: 'passed',
      severity: 'info'
    },
    {
      id: 'MLR-006',
      title: 'التحقق من وجود عمال آخرين',
      description: 'التحقق من وجود عمال آخرين في المنشأة من عدمه - ضبط الطلب في حال وجود عمال أقل من 3 نشطين',
      status: 'failed',
      severity: 'critical',
      details: 'المنشأة لديها عاملان نشطين فقط، أقل من الحد المطلوب (3 عمال)'
    },
    {
      id: 'MLR-007',
      title: 'التحقق من صحة صرف الأجر',
      description: 'التحقق من صحة صرف الأجر من حماية الأجور ونظام الصندوق',
      status: 'passed',
      severity: 'info'
    },
    {
      id: 'MLR-008',
      title: 'التحقق من الكيان القانوني',
      description: 'التحقق من الكيان القانوني للمنشأة بحيث لا تكون ضمن الشركات المصفاة أو المفلسة',
      status: 'passed',
      severity: 'warning'
    },
    {
      id: 'MLR-009',
      title: 'التحقق من المبالغ غير المسددة',
      description: 'التحقق من وجود مبالغ غير مسددة للعاملة عليها أو المنشأة لأكثر من 3 أشهر',
      status: 'passed',
      severity: 'info'
    }
  ];

  const passedRules = rules.filter(r => r.status === 'passed').length;
  const failedRules = rules.filter(r => r.status === 'failed').length;
  const pendingRules = rules.filter(r => r.status === 'pending').length;

  const rulesHtml = rules.map(rule => `
    <div class="rule-item">
      <div class="rule-status ${rule.status}">
        ${rule.status === 'passed' ? ICONS.check : rule.status === 'failed' ? ICONS.x : ICONS.clock}
      </div>
      <div class="rule-content">
        <div class="rule-title">${rule.title}</div>
        <div class="rule-description">${rule.description}</div>
        <div class="rule-meta">
          <span class="rule-badge ${rule.severity}">${rule.id}</span>
          <span class="rule-badge ${rule.severity}">${rule.severity === 'critical' ? 'حرج' : rule.severity === 'warning' ? 'تحذير' : 'معلومات'}</span>
        </div>
        ${rule.details ? `<div class="violation-details"><h5>⚠️ تفاصيل الانتهاك:</h5><p>${rule.details}</p></div>` : ''}
      </div>
    </div>
  `).join('');

  return `<div class="pg-head"><div><h1>${request.id}</h1><p>تفاصيل طلب إجازة الأمومة</p></div>
    <div class="pg-acts">
      <button class="btn btn-secondary btn-sm" onclick="navigateTo('../services/maternity-leave-requests-list')">${ICONS.arrow_right}رجوع</button>
      <button class="btn btn-primary btn-sm" onclick="showToast('جارٍ طباعة الطلب...','i')">${ICONS.download}طباعة</button>
    </div></div>

    ${failedRules > 0 ? `
    <div class="inspection-alert">
      ${ICONS.alert}
      <div class="inspection-alert-content">
        <h4>⚠️ تم تحويل الطلب للتفتيش</h4>
        <p>تم اكتشاف ${failedRules} انتهاك(s) في قواعد التحقق. يتطلب الأمر مراجعة تفصيلية.</p>
      </div>
    </div>
    ` : ''}

    <div class="risk-assessment">
      <h3>${ICONS.shield} تقييم المخاطر</h3>
      <div class="risk-level">
        <span class="risk-label">مستوى الخطر:</span>
        <div class="risk-bar-container">
          <div class="risk-bar ${failedRules > 2 ? 'high' : failedRules > 0 ? 'medium' : 'low'}" style="width: ${failedRules > 2 ? '80%' : failedRules > 0 ? '50%' : '15%'}"></div>
        </div>
        <span class="risk-label">${failedRules > 2 ? 'مرتفع' : failedRules > 0 ? 'متوسط' : 'منخفض'}</span>
      </div>
      <div class="risk-recommendations">
        <h4>📋 التوصيات:</h4>
        <ul>
          <li>مراجعة نمط الأجور قبل الإجازة</li>
          <li>التحقق من عدد العمال النشطين في المنشأة</li>
          <li>طلب وثائق إضافية من وزارة الصحة</li>
          <li>مراجعة السجل الوظيفي للعاملة</li>
        </ul>
      </div>
    </div>

    <div class="rules-section">
      <div class="rules-header">
        <h3>${ICONS.list} قواعد التحقق</h3>
        <div class="rules-stats">
          <div class="rule-stat passed">${ICONS.check} ${passedRules} متوافق</div>
          <div class="rule-stat failed">${ICONS.x} ${failedRules} انتهاك</div>
          <div class="rule-stat pending">${ICONS.clock} ${pendingRules} قيد المراجعة</div>
        </div>
      </div>
      <div class="rules-list">
        ${rulesHtml}
      </div>
    </div>

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
        <div class="fgrp"><label class="flbl">إجمالي المستحقات</label><div class="fro fw7" style="color:var(--primary)">13,720 ر.ع</div></div>
        <div class="fgrp"><label class="flbl">المبالغ المدفوعة</label><div class="fro fw7" style="color:var(--success)">8,400 ر.ع</div></div>
        <div class="fgrp"><label class="flbl">المتبقي</label><div class="fro fw7" style="color:var(--danger)">5,320 ر.ع</div></div>
        <div class="fgrp"><label class="flbl">حالة الدفع</label><div class="fro"><span class="badge b-returned">غير مكتمل</span></div></div>
      </div>
    </div></div>

    ${renderNotes(request.notes, request.id)}
    ${renderTimeline(request.timeline)}`;
}

/* ── الشركات المتوقفة عن السداد ── */
function renderNonPaymentCompaniesList(role) {
  const companies = INSP_DATA.nonPaymentCompanies || [];
  const rows = companies.map(c => `
    <tr>
      <td><a href="#" onclick="navigateTo('../services/companies-stopped-payment-details','id=${c.id}')" class="txp fw7">${c.id}</a></td>
      <td>${c.companyName}</td>
      <td>${c.crn}</td>
      <td>${c.region}</td>
      <td>${statusBadge(c.status)}</td>
      <td>${c.arrearsAmount} ر.ع</td>
      <td><div class="df ac g8">
        <button class="btn btn-primary btn-xs" onclick="navigateTo('../services/companies-stopped-payment-details','id=${c.id}')">${ICONS.eye}عرض</button>
      </div></td>
    </tr>`).join('');

  return `<div class="pg-head"><div><h1>الشركات المتوقفة عن السداد</h1><p>جميع الشركات المتوقفة عن السداد — ${companies.length} شركة</p></div>
    <div class="pg-acts">
      <button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ تصدير القائمة...','i')">${ICONS.download}تصدير</button>
    </div></div>
    ${_filterBar([{ label: 'الحالة', type: 'select', opts: ['الكل', 'قيد المراجعة', 'قيد المعالجة', 'معتمد', 'مرفوض'] }, { label: 'المنطقة', type: 'select', opts: ['الكل', 'مسقط', 'شمال الباطنة', 'ظفار', 'الداخلية'] }])}
    ${_tblWrap(['رقم الشركة', 'اسم الشركة', 'السجل التجاري', 'المنطقة', 'الحالة', 'المتأخرات', 'إجراء'], rows || _noData())}`;
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
      <button class="btn btn-secondary btn-sm" onclick="navigateTo('../services/companies-stopped-payment-list')">${ICONS.arrow_right}رجوع</button>
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

    ${renderNotes(company.notes, company.id)}
    ${renderTimeline(company.timeline)}`;
}

/* ── التصفية والإفلاس ── */
function renderLiquidationBankruptcyList(role) {
  const cases = INSP_DATA.liquidationBankruptcy || [];
  const rows = cases.map(c => `
    <tr>
      <td><a href="#" onclick="navigateTo('../services/liquidation-bankruptcy-case-details','id=${c.id}')" class="txp fw7">${c.id}</a></td>
      <td>${c.companyName}</td>
      <td>${c.crn}</td>
      <td>${c.region}</td>
      <td>${statusBadge(c.status)}</td>
      <td>${c.caseType}</td>
      <td><div class="df ac g8">
        <button class="btn btn-primary btn-xs" onclick="navigateTo('../services/liquidation-bankruptcy-case-details','id=${c.id}')">${ICONS.eye}عرض</button>
      </div></td>
    </tr>`).join('');

  return `<div class="pg-head"><div><h1>حالات التصفية والإفلاس</h1><p>جميع حالات التصفية والإفلاس — ${cases.length} حالة</p></div>
    <div class="pg-acts">
      <button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ تصدير القائمة...','i')">${ICONS.download}تصدير</button>
    </div></div>
    ${_filterBar([{ label: 'الحالة', type: 'select', opts: ['الكل', 'قيد المراجعة', 'قيد المعالجة', 'معتمد', 'مرفوض'] }, { label: 'نوع الحالة', type: 'select', opts: ['الكل', 'تصفية', 'إفلاس'] }])}
    ${_tblWrap(['رقم الحالة', 'اسم الشركة', 'السجل التجاري', 'المنطقة', 'الحالة', 'النوع', 'إجراء'], rows || _noData())}`;
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
      <button class="btn btn-secondary btn-sm" onclick="navigateTo('../services/liquidation-bankruptcy-cases-list')">${ICONS.arrow_right}رجوع</button>
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

    ${renderNotes(caseData.notes, caseData.id)}
    ${renderTimeline(caseData.timeline)}`;
}

/* ── Services Render Functions ── */
function renderCompaniesStoppedPaymentList() {
  const companies = INSP_DATA.companiesStoppedPayment || [];
  const rows = companies.map(c => `
    <tr>
      <td><a href="#" onclick="navigateTo('../services/companies-stopped-payment-details','id=${c.id}')" class="txp fw7">${c.id}</a></td>
      <td>${c.establishmentName}</td>
      <td>${c.commercialNumber}</td>
      <td>${c.insuredCount} مؤمن</td>
      <td>${formatDate(c.stopDate)}</td>
      <td>${statusBadge(c.status)}</td>
      <td>${riskBadge(c.riskLevel)}</td>
      <td><div class="df ac g8">
        <button class="btn btn-primary btn-xs" onclick="navigateTo('../services/companies-stopped-payment-details','id=${c.id}')">${ICONS.eye}عرض</button>
      </div></td>
    </tr>`).join('');

  return `<div class="pg-head"><div><h1>المنشآت المتوقفة عن السداد</h1><p>متابعة وإدارة المنشآت المتوقفة عن سداد المساهمات — ${companies.length} منشأة</p></div>
    <div class="pg-acts">
      <button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ تصدير البيانات...','i')">${ICONS.download}تصدير</button>
    </div></div>
    ${_filterBar([{ label: 'بحث', type: 'text', ph: 'رقم المنشأة، اسم المنشأة، الرقم التجاري...' }, { label: 'الحالة', type: 'select', opts: ['الكل', 'قيد المراجعة', 'قيد التحليل', 'بانتظار القرار', 'تم الاعتماد', 'تم الرفض', 'طلب معلومات إضافية'] }, { label: 'مستوى المخاطرة', type: 'select', opts: ['الكل', 'عالي', 'متوسط', 'منخفض'] }, { label: 'من تاريخ', type: 'date' }])}
    <div class="stats-cards">
      <div class="stat-card">
        <div class="stat-icon">🏢</div>
        <div class="stat-info">
          <div class="stat-value">${companies.length}</div>
          <div class="stat-label">إجمالي المنشآت</div>
        </div>
      </div>
      <div class="stat-card warning">
        <div class="stat-icon">⚠️</div>
        <div class="stat-info">
          <div class="stat-value">${companies.filter(c => c.status === 'قيد المراجعة').length}</div>
          <div class="stat-label">قيد المراجعة</div>
        </div>
      </div>
      <div class="stat-card danger">
        <div class="stat-icon">🔴</div>
        <div class="stat-info">
          <div class="stat-value">${companies.filter(c => c.riskLevel === 'عالي').length}</div>
          <div class="stat-label">خطر عالي</div>
        </div>
      </div>
      <div class="stat-card success">
        <div class="stat-icon">✅</div>
        <div class="stat-info">
          <div class="stat-value">${companies.filter(c => c.status === 'تم الاعتماد').length}</div>
          <div class="stat-label">تم الاعتماد</div>
        </div>
      </div>
    </div>
    ${_tblWrap(['رقم المنشأة', 'اسم المنشأة', 'الرقم التجاري', 'عدد المؤمن عليهم', 'تاريخ التوقف', 'الحالة', 'مستوى المخاطرة', 'الإجراءات'], rows || _noData())}`;
}

function renderLiquidationBankruptcyCasesList() {
  const cases = INSP_DATA.liquidationBankruptcy || [];
  const rows = cases.map(c => `
    <tr>
      <td><a href="#" onclick="navigateTo('../services/liquidation-bankruptcy-case-details','id=${c.id}')" class="txp fw7">${c.id}</a></td>
      <td>${c.establishmentName}</td>
      <td>${c.commercialNumber}</td>
      <td><span class="badge ${c.caseType === 'إفلاس' ? 'b-rejected' : 'b-phead'}">${c.caseType}</span></td>
      <td>${formatDate(c.submissionDate)}</td>
      <td>${statusBadge(c.status)}</td>
      <td>${c.insuredCount} مؤمن</td>
      <td><div class="df ac g8">
        <button class="btn btn-primary btn-xs" onclick="navigateTo('../services/liquidation-bankruptcy-case-details','id=${c.id}')">${ICONS.eye}عرض</button>
      </div></td>
    </tr>`).join('');

  return `<div class="pg-head"><div><h1>حالات التصفية والإفلاس</h1><p>متابعة وإدارة حالات التصفية والإفلاس — ${cases.length} قضية</p></div>
    <div class="pg-acts">
      <button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ تصدير البيانات...','i')">${ICONS.download}تصدير</button>
    </div></div>
    ${_filterBar([{ label: 'بحث', type: 'text', ph: 'رقم القضية، اسم المنشأة، الرقم التجاري...' }, { label: 'الحالة', type: 'select', opts: ['الكل', 'قيد المراجعة', 'قيد التحليل', 'بانتظار القرار', 'تم الاعتماد', 'تم الرفض', 'طلب معلومات إضافية'] }, { label: 'نوع القضية', type: 'select', opts: ['الكل', 'تصفية', 'إفلاس'] }, { label: 'من تاريخ', type: 'date' }])}
    <div class="stats-cards">
      <div class="stat-card">
        <div class="stat-icon">⚖️</div>
        <div class="stat-info">
          <div class="stat-value">${cases.length}</div>
          <div class="stat-label">إجمالي القضايا</div>
        </div>
      </div>
      <div class="stat-card warning">
        <div class="stat-icon">⚠️</div>
        <div class="stat-info">
          <div class="stat-value">${cases.filter(c => c.status === 'قيد المراجعة').length}</div>
          <div class="stat-label">قيد المراجعة</div>
        </div>
      </div>
      <div class="stat-card danger">
        <div class="stat-icon">🔴</div>
        <div class="stat-info">
          <div class="stat-value">${cases.filter(c => c.caseType === 'إفلاس').length}</div>
          <div class="stat-label">إفلاس</div>
        </div>
      </div>
      <div class="stat-card success">
        <div class="stat-icon">✅</div>
        <div class="stat-info">
          <div class="stat-value">${cases.filter(c => c.status === 'تم الاعتماد').length}</div>
          <div class="stat-label">تم الاعتماد</div>
        </div>
      </div>
    </div>
    ${_tblWrap(['رقم القضية', 'اسم المنشأة', 'الرقم التجاري', 'نوع القضية', 'تاريخ التقديم', 'الحالة', 'عدد المؤمن عليهم', 'الإجراءات'], rows || _noData())}`;
}

/* ── Overrides: service requests routed through validation engine ── */
const SERVICE_CONFIGS = {
  job: {
    key: 'job',
    title: 'طلبات الأمان الوظيفي',
    detailTitle: 'تفاصيل طلب الأمان الوظيفي',
    dataKey: 'jobSecurityRequests',
    detailPage: 'job-security-request-details',
    listPage: '../services/job-security-requests-list',
    source: 'نظام منافع الأمان الوظيفي'
  },
  family: {
    key: 'family',
    title: 'طلبات منافع دخل الأسرة',
    detailTitle: 'تفاصيل طلب منافع دخل الأسرة',
    dataKey: 'familyBenefitRequests',
    detailPage: 'family-benefits-request-details',
    listPage: '../services/family-benefits-requests-list',
    source: 'نظام منافع دخل الأسرة'
  },
  maternity: {
    key: 'maternity',
    title: 'طلبات إجازة الأمومة',
    detailTitle: 'تفاصيل طلب إجازة الأمومة',
    dataKey: 'maternityLeaveRequests',
    detailPage: 'maternity-leave-request-details',
    listPage: '../services/maternity-leave-requests-list',
    source: 'نظام إجازة الأمومة'
  }
};

function _svcRule(id, title, description, severity = 'info') {
  return { id, title, description, severity, status: 'passed' };
}

function _svcRulesTemplate(serviceKey) {
  if (serviceKey === 'job') return [
    _svcRule('JSR-001', 'التحقق من قيمة الأجر الأخير', 'مقارنة الأجر الأخير بتسلسل الأجر في نفس العقد وعدم تجاوز الزيادة النسب المسموح بها.', 'critical'),
    _svcRule('JSR-002', 'مقارنة الأجر بآخر عقد مسجل', 'التحقق من عدم وجود فرق غير مبرر بين أجر آخر عقد والأجر المصرح به في الطلب.'),
    _svcRule('JSR-003', 'مقارنة أجور العاملين في المنشأة', 'مقارنة أجر مقدم الطلب بمتوسط أجور العاملين في المنشأة.', 'warning'),
    _svcRule('JSR-004', 'التحقق من مدة آخر عقد', 'التأكد من أن مدة آخر عقد لا تقل عن المدة النظامية المطلوبة.'),
    _svcRule('JSR-005', 'التحقق من صلة القرابة', 'التحقق من عدم وجود قرابة مؤثرة بين العامل وأصحاب المنشأة.', 'warning'),
    _svcRule('JSR-006', 'التحقق من الحالات السابقة', 'مراجعة وجود حالات سابقة للعامل أو المنشأة في نظام التفتيش.', 'critical'),
    _svcRule('JSR-007', 'التحقق من التسجيل الوهمي', 'البحث عن مؤشرات تسجيل وهمي أو بطلان تأمين سابق.', 'critical'),
    _svcRule('JSR-008', 'التحقق من سداد الاشتراكات', 'التحقق من انتظام سداد اشتراكات العامل والمنشأة.'),
    _svcRule('JSR-009', 'مطابقة حماية الأجور', 'مطابقة الأجور المسجلة في نظام حماية الأجور مع بيانات الصندوق.', 'critical'),
    _svcRule('JSR-010', 'التحقق من المشاريع المسندة', 'التحقق من ارتباط العامل بالمشروع وتاريخ انتهاء المشروع.'),
    _svcRule('JSR-011', 'التحقق من الموقع الجغرافي', 'مراجعة موقع المنشأة وفروعها ونشاطها الفعلي.'),
    _svcRule('JSR-012', 'التحقق من النزاعات العمالية', 'التحقق من وجود نزاع عمالي أو قضية منظورة.', 'warning')
  ];
  if (serviceKey === 'family') return [
    _svcRule('FBR-001', 'شرط الإقامة للمنتفعين', 'التحقق من إقامة أفراد الأسرة داخل السلطنة.'),
    _svcRule('FBR-002', 'الحالة الاجتماعية لأفراد الأسرة', 'مطابقة الحالة الاجتماعية وتغييرات الزواج أو الطلاق.', 'warning'),
    _svcRule('FBR-003', 'ممتلكات الأسرة', 'التحقق من العقارات والمركبات والسجلات المؤثرة على الاستحقاق.', 'critical'),
    _svcRule('FBR-004', 'العروض الوظيفية', 'التحقق من عروض العمل المسجلة لأفراد الأسرة.'),
    _svcRule('FBR-005', 'أعمار أفراد الأسرة', 'مطابقة أعمار أفراد الأسرة مع شروط الاستحقاق.'),
    _svcRule('FBR-006', 'عقود العمل المسجلة وغير المسجلة', 'التحقق من عقود العمل في الصندوق ووزارة العمل.', 'critical'),
    _svcRule('FBR-007', 'الدراسة والتفرغ', 'التحقق من التحاق أفراد الأسرة بمقاعد الدراسة.'),
    _svcRule('FBR-008', 'السجلات التجارية', 'التحقق من السجلات التجارية المسجلة باسم أفراد الأسرة.', 'warning'),
    _svcRule('FBR-009', 'التقارير الطبية', 'مراجعة التقارير الطبية المؤثرة على الاستحقاق.'),
    _svcRule('FBR-010', 'بيانات وزارة التنمية', 'مطابقة بيانات وزارة التنمية والجمعيات ذات الصلة.'),
    _svcRule('FBR-011', 'مكان إقامة أفراد الأسرة', 'التحقق من مكان إقامة أفراد الأسرة الفعلي.'),
    _svcRule('FBR-012', 'بيانات الأجور', 'التحقق من الأجور والدخل الإضافي لأفراد الأسرة.', 'critical')
  ];
  return [
    _svcRule('MLR-001', 'الشهادة الطبية المعتمدة', 'التحقق من أن الشهادة صادرة من جهة صحية معتمدة.'),
    _svcRule('MLR-002', 'ارتفاع الأجر قبل الإجازة', 'فحص ارتفاع الأجر خلال السنة السابقة للإجازة.', 'critical'),
    _svcRule('MLR-003', 'تشابه الأسماء والقرابة', 'التحقق من أي تشابه مؤثر بين العاملة وصاحب المنشأة.', 'warning'),
    _svcRule('MLR-004', 'مدة العقد قبل الإجازة', 'التحقق من أن مدة العقد تستوفي الحد الأدنى قبل بداية الإجازة.'),
    _svcRule('MLR-005', 'درجة السجل التجاري', 'التحقق من درجة السجل التجاري ونشاط المنشأة.'),
    _svcRule('MLR-006', 'عدد العمال النشطين', 'ضبط الطلب إذا كان عدد العمال النشطين أقل من الحد المطلوب.', 'critical'),
    _svcRule('MLR-007', 'صحة صرف الأجر', 'مطابقة صرف الأجر في حماية الأجور وبيانات الصندوق.'),
    _svcRule('MLR-008', 'الكيان القانوني للمنشأة', 'التحقق من عدم وجود تصفية أو إفلاس أو توقف مؤثر.', 'warning'),
    _svcRule('MLR-009', 'المبالغ غير المسددة', 'التحقق من وجود مبالغ غير مسددة لمدة تتجاوز ثلاثة أشهر.', 'critical')
  ];
}

function _svcRuleFlags(serviceKey, request) {
  const failed = {
    job: {
      'JSR-2025-0001': ['JSR-001', 'JSR-006', 'JSR-009'],
      'JSR-2025-0002': ['JSR-008'],
      'JSR-2025-0004': ['JSR-004', 'JSR-005'],
      'JSR-2025-0005': ['JSR-006', 'JSR-009']
    },
    family: {
      'FBR-2025-0001': ['FBR-003', 'FBR-006'],
      'FBR-2025-0002': ['FBR-012'],
      'FBR-2025-0004': ['FBR-003', 'FBR-006', 'FBR-012'],
      'FBR-2025-0005': ['FBR-005']
    },
    maternity: {
      'MLR-2025-0001': ['MLR-002', 'MLR-006'],
      'MLR-2025-0002': ['MLR-001'],
      'MLR-2025-0004': ['MLR-004', 'MLR-009'],
      'MLR-2025-0005': ['MLR-001']
    }
  };
  const pending = {
    family: { 'FBR-2025-0005': ['FBR-009'] },
    maternity: { 'MLR-2025-0005': ['MLR-007'] }
  };
  return {
    failed: failed[serviceKey]?.[request.id] || [],
    pending: pending[serviceKey]?.[request.id] || []
  };
}

function _svcRules(serviceKey, request) {
  const flags = _svcRuleFlags(serviceKey, request);
  return _svcRulesTemplate(serviceKey).map(rule => {
    const copy = { ...rule };
    if (flags.failed.includes(copy.id)) {
      copy.status = 'failed';
      copy.details = _svcFailureDetails(copy.id, serviceKey);
    } else if (flags.pending.includes(copy.id)) {
      copy.status = 'pending';
      copy.details = 'توجد بيانات إضافية مطلوبة قبل اعتماد نتيجة هذا الشرط.';
    }
    return copy;
  });
}

function _svcFailureDetails(ruleId, serviceKey) {
  const map = {
    'JSR-001': 'توجد زيادة غير مبررة في الأجر الأخير مقارنة بتسلسل الأجور السابق.',
    'JSR-006': 'توجد حالات تفتيش سابقة للمنشأة خلال آخر عامين مرتبطة بالأجور والتسجيل.',
    'JSR-009': 'توجد فروقات بين أجر حماية الأجور والأجر المسجل في الصندوق.',
    'JSR-008': 'توجد متأخرات اشتراكات تتطلب التحقق قبل تمرير الطلب.',
    'JSR-004': 'مدة الخدمة المسجلة أقل من الحد النظامي المطلوب للاستحقاق.',
    'JSR-005': 'توجد قرابة محتملة بين مقدم الطلب ومالك المنشأة تتطلب تحققاً إضافياً.',
    'FBR-003': 'توجد ممتلكات مسجلة باسم أحد أفراد الأسرة قد تؤثر على الاستحقاق.',
    'FBR-006': 'تم رصد عقد عمل غير مسجل لأحد أفراد الأسرة في بيانات وزارة العمل.',
    'FBR-012': 'الدخل الإضافي المصرح به لا يطابق بيانات مصادر الدخل الخارجية.',
    'FBR-005': 'بيانات العمر لأحد المعالين تحتاج إثباتاً إضافياً.',
    'MLR-001': 'الشهادة الطبية تحتاج تحققاً من الجهة الصحية المصدرة.',
    'MLR-002': 'ارتفع الأجر بنسبة ملحوظة خلال السنة السابقة للإجازة.',
    'MLR-004': 'مدة العقد قبل الإجازة أقل من الحد الأدنى المطلوب.',
    'MLR-006': 'عدد العمال النشطين في المنشأة أقل من الحد المطلوب.',
    'MLR-009': 'توجد مبالغ غير مسددة على المنشأة لمدة تتجاوز ثلاثة أشهر.'
  };
  return map[ruleId] || 'لم يتحقق الشرط ويتطلب مراجعة إضافية من قسم المتابعة والبلاغات.';
}

function _svcSummary(serviceKey, request) {
  const rules = _svcRules(serviceKey, request);
  const failed = rules.filter(r => r.status === 'failed').length;
  const pending = rules.filter(r => r.status === 'pending').length;
  const passed = rules.length - failed - pending;
  return { total: rules.length, passed, failed, pending, rules };
}

function _validationIndicator(summary) {
  const cls = summary.failed === 0 && summary.pending === 0 ? 'ok' : summary.failed <= 1 ? 'warn' : 'bad';
  const text = summary.failed ? `${summary.failed} غير مستوفاة` : summary.pending ? `${summary.pending} قيد التحقق` : 'مستوفاة بالكامل';
  return `<div class="validation-score"><span class="validation-dot ${cls}"></span><div><strong>${summary.passed}/${summary.total} شرط</strong><span>${text}</span></div></div>`;
}

function _serviceListRows(cfg, requests) {
  return requests.map(r => {
    const summary = _svcSummary(cfg.key, r);
    return `<tr>
      <td><a href="#" onclick="navigateTo('../services/${cfg.detailPage}','id=${r.id}')" class="txp fw7">${r.id}</a></td>
      <td>${r.workerName}</td>
      <td>${r.workerCivil}</td>
      <td>${r.employerName}</td>
      <td>${r.requestDate}</td>
      <td>${statusBadge(r.status)}</td>
      <td>${_validationIndicator(summary)}</td>
      <td><button class="btn btn-primary btn-xs" onclick="navigateTo('../services/${cfg.detailPage}','id=${r.id}')">${ICONS.eye}عرض</button></td>
    </tr>`;
  }).join('');
}

function _renderServiceRequestsList(serviceKey) {
  const cfg = SERVICE_CONFIGS[serviceKey];
  const requests = INSP_DATA[cfg.dataKey] || [];
  const routed = requests.filter(r => _svcSummary(serviceKey, r).failed > 0 || _svcSummary(serviceKey, r).pending > 0);
  const fulfilled = requests.filter(r => _svcSummary(serviceKey, r).failed === 0 && _svcSummary(serviceKey, r).pending === 0);
  const headers = ['رقم الطلب', 'اسم مقدم الطلب', 'الرقم المدني', 'المنشأة', 'تاريخ الطلب', 'الحالة', 'الالتزام بالشروط', 'إجراء'];
  const routedTable = _tblWrap(headers, _serviceListRows(cfg, routed) || _noData());
  const fulfilledTable = `<div class="service-table-note">هذه الطلبات اجتازت التحقق الأولي في Validation engine ولا تتطلب تدخلاً من التفتيش، وتظهر هنا للاطلاع على التفاصيل فقط.</div>${_tblWrap(headers, _serviceListRows(cfg, fulfilled) || _noData())}`;

  return `<div class="pg-head"><div><h1>${cfg.title}</h1><p>طلبات واردة من ${cfg.source} بعد مرورها على محرك التحقق — ${requests.length} طلب</p></div>
    <div class="pg-acts"><button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ تصدير القائمة...','i')">${ICONS.download}تصدير</button></div></div>
    <div class="service-context"><strong>آلية العمل:</strong> الطلبات يتم تقديمها في نظام خارجي ثم تمر عبر Validation engine. الطلبات التي لا تستوفي شرطاً أو أكثر تُحال لقسم المتابعة والبلاغات، أما الطلبات المستوفية فتظهر للاطلاع فقط دون إجراءات تفتيشية.</div>
    ${_filterBar([
    { label: 'رقم الطلب', type: 'text', ph: 'مثال: 2025-0001' },
    { label: 'الرقم المدني', type: 'text', ph: 'رقم مقدم الطلب' },
    { label: 'الحالة', type: 'select', opts: ['قيد المراجعة', 'قيد المعالجة', 'بانتظار وثائق', 'معتمد', 'مرفوض'] },
    { label: 'من تاريخ', type: 'date' },
    { label: 'إلى تاريخ', type: 'date' }
  ])}
    ${_tabView(`${cfg.key}-requests`, [
    { label: 'تتطلب مراجعة المتابعة', badge: routed.length, content: routedTable },
    { label: 'مستوفية للاطلاع فقط', badge: fulfilled.length, content: fulfilledTable }
  ], 0)}`;
}

function renderJobSecurityRequestsList(role) { return _renderServiceRequestsList('job'); }
function renderFamilyBenefitRequestsList(role) { return _renderServiceRequestsList('family'); }
function renderMaternityLeaveRequestsList(role) { return _renderServiceRequestsList('maternity'); }

function _svcField(label, value) {
  return `<p><strong>${label}:</strong> ${value || '—'}</p>`;
}

function _svcOverview(cfg, request) {
  const serviceFields = cfg.key === 'job'
    ? [_svcField('تاريخ الإنهاء', request.terminationDate), _svcField('سبب الإنهاء', request.terminationReason), _svcField('مدة الخدمة', request.employmentDuration), _svcField('الأجر الأساسي', `${request.salary || 0} ر.ع`)]
    : cfg.key === 'family'
      ? [_svcField('نوع المنفعة', request.benefitType), _svcField('عدد أفراد الأسرة', `${request.familyMembers || 0} أفراد`), _svcField('الدخل الشهري', `${request.monthlyIncome || 0} ر.ع`), _svcField('مدة التوظيف', request.employmentDuration)]
      : [_svcField('نوع الإجازة', request.leaveType), _svcField('تاريخ الولادة المتوقع', request.expectedDeliveryDate), _svcField('بداية الإجازة', request.leaveStartDate), _svcField('مدة الإجازة', request.leaveDuration)];

  return `<div class="svc-info-grid">
    <div class="svc-info-card"><h4>بيانات الطلب</h4>
      ${_svcField('رقم الطلب', request.id)}
      ${_svcField('تاريخ التقديم', request.requestDate)}
      ${_svcField('الحالة', statusBadge(request.status))}
      ${_svcField('مصدر الطلب', cfg.source)}
    </div>
    <div class="svc-info-card"><h4>مقدم الطلب</h4>
      ${_svcField('الاسم', request.workerName)}
      ${_svcField('الرقم المدني', request.workerCivil)}
      ${_svcField('الجنسية', cfg.key === 'maternity' ? 'عمانية' : 'عماني')}
      ${_svcField('رقم التواصل', '9924 6810')}
    </div>
    <div class="svc-info-card"><h4>بيانات المنشأة</h4>
      ${_svcField('اسم المنشأة', request.employerName)}
      ${_svcField('السجل التجاري', request.employerCRN)}
      ${_svcField('الولاية', 'السيب')}
      ${_svcField('حالة الاشتراك', 'نشط')}
    </div>
    <div class="svc-info-card"><h4>بيانات الخدمة</h4>${serviceFields.join('')}</div>
  </div>`;
}

function _svcDocuments(cfg) {
  const docs = {
    job: [
      ['صورة البطاقة الشخصية', 'PDF · 1.2MB · مرفوع من مقدم الطلب'],
      ['عقد العمل الأخير', 'PDF · 2.4MB · نسخة مصدقة'],
      ['إشعار إنهاء الخدمة', 'PDF · 860KB · صادر من المنشأة'],
      ['كشف حماية الأجور', 'XLSX · 420KB · مستورد آلياً']
    ],
    family: [
      ['صورة البطاقة الشخصية', 'PDF · 1.1MB · مرفوع من مقدم الطلب'],
      ['إثبات الدخل الشهري', 'PDF · 780KB · مستند قابل للاستعراض'],
      ['بيانات أفراد الأسرة', 'PDF · 1.7MB · مستند داعم'],
      ['إثبات السكن والإقامة', 'PDF · 940KB · مرفق من النظام الخارجي']
    ],
    maternity: [
      ['الشهادة الطبية للحمل', 'PDF · 1.5MB · صادرة من جهة صحية'],
      ['تقرير الحمل التفصيلي', 'PDF · 1.9MB · قابل للاستعراض'],
      ['صورة البطاقة الشخصية', 'PDF · 860KB · مرفوع من مقدمة الطلب'],
      ['طلب الإجازة الرسمي', 'PDF · 690KB · صادر من جهة العمل']
    ]
  }[cfg.key] || [];

  return `<div class="documents-list">${docs.map(d => `
    <div class="document-item" onclick="showToast('فتح ملف: ${d[0]}','i')">
      <div class="document-icon">${ICONS.file}</div>
      <div class="document-info">
        <h4>${d[0]}</h4>
        <p>${d[1]}</p>
        <span class="document-action">${ICONS.eye}استعراض الملف</span>
      </div>
    </div>`).join('')}</div>`;
}

function _svcFinancial(cfg, request) {
  if (cfg.key === 'job') {
    const salary = request.salary || 0;
    return `<div class="svc-info-grid">
      <div class="svc-info-card"><h4>احتساب الاستحقاق</h4>
        ${_svcField('الأجر الأساسي المسجل', `${salary} ر.ع`)}
        ${_svcField('مدة الصرف المقترحة', '3 أشهر')}
        ${_svcField('المبلغ التقديري', `${(salary * 3).toLocaleString()} ر.ع`)}
        ${_svcField('أساس الاحتساب', 'آخر أجر مؤمن عليه بعد التحقق')}
      </div>
      <div class="svc-info-card"><h4>مطابقة الأجور</h4>
        ${_svcField('حماية الأجور', 'توجد فروقات تحتاج مراجعة عند عدم استيفاء الشروط')}
        ${_svcField('متوسط أجر آخر 12 شهر', `${Math.max(salary - 40, 0)} ر.ع`)}
        ${_svcField('آخر تحديث للبيانات', '31/12/2024')}
      </div>
    </div>`;
  }
  if (cfg.key === 'family') {
    const income = request.monthlyIncome || 0;
    const members = request.familyMembers || 1;
    return `<div class="svc-info-grid">
      <div class="svc-info-card"><h4>تحليل دخل الأسرة</h4>
        ${_svcField('إجمالي الدخل الشهري', `${income} ر.ع`)}
        ${_svcField('عدد أفراد الأسرة', `${members} أفراد`)}
        ${_svcField('الدخل للفرد', `${Math.round(income / members)} ر.ع`)}
        ${_svcField('الدخل الإضافي المصرح', '35 ر.ع')}
      </div>
      <div class="svc-info-card"><h4>مؤشرات الأهلية المالية</h4>
        ${_svcField('حد الاستحقاق الداخلي', 'يحتسب حسب حجم الأسرة')}
        ${_svcField('مصادر الدخل المطابقة', 'الصندوق، وزارة العمل، وزارة التنمية')}
        ${_svcField('نتيجة الملف المالي', 'تحتاج مراجعة عند وجود شروط غير مستوفاة')}
      </div>
    </div>`;
  }
  const salary = request.monthlySalary || 0;
  return `<div class="svc-info-grid">
    <div class="svc-info-card"><h4>تعويض إجازة الأمومة</h4>
      ${_svcField('الأجر الشهري المؤمن عليه', `${salary} ر.ع`)}
      ${_svcField('نسبة التعويض', '100% حسب الشروط')}
      ${_svcField('مدة الإجازة', request.leaveDuration)}
      ${_svcField('المبلغ التقديري', `${Math.round(salary * 3.25).toLocaleString()} ر.ع`)}
    </div>
    <div class="svc-info-card"><h4>مطابقة ملف الأجور</h4>
      ${_svcField('آخر صرف في حماية الأجور', '31/01/2025')}
      ${_svcField('متوسط آخر 12 شهر', `${Math.max(salary - 35, 0)} ر.ع`)}
      ${_svcField('نتيجة التحقق', 'مطابقة ما لم تظهر زيادة غير مبررة')}
    </div>
  </div>`;
}

function _svcFamilyMembers(request) {
  const rows = [
    ['سالم بن حمد البوسعيدي', 'مقدم الطلب', 42, 'متزوج', 'يعمل', '300 ر.ع', '50 ر.ع'],
    ['موزة بنت راشد الكندية', 'زوجة', 38, 'متزوجة', 'لا تعمل', '0 ر.ع', '0 ر.ع'],
    ['حمد بن سالم البوسعيدي', 'ابن', 15, 'أعزب', 'لا يعمل', '0 ر.ع', '0 ر.ع'],
    ['ريم بنت سالم البوسعيدية', 'ابنة', 11, 'أعزب', 'لا تعمل', '0 ر.ع', '0 ر.ع'],
    ['خالد بن سالم البوسعيدي', 'ابن', 7, 'أعزب', 'لا يعمل', '0 ر.ع', '0 ر.ع']
  ].slice(0, request.familyMembers || 5);
  return `<div class="tbl-wrap"><table class="dtbl"><thead><tr>
    <th>اسم الفرد</th><th>صلة القرابة</th><th>العمر</th><th>الحالة الاجتماعية</th><th>حالة العمل</th><th>الأجر الأساسي</th><th>الدخل الإضافي</th>
  </tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function _svcRulesPanel(rules) {
  const ordered = [...rules].sort((a, b) => {
    const rank = { failed: 0, pending: 1, passed: 2 };
    return rank[a.status] - rank[b.status];
  });
  const passed = rules.filter(r => r.status === 'passed').length;
  const failed = rules.filter(r => r.status === 'failed').length;
  const pending = rules.filter(r => r.status === 'pending').length;
  const rows = ordered.map(rule => `<div class="rule-item">
    <div class="rule-status ${rule.status}">${rule.status === 'passed' ? ICONS.check : rule.status === 'failed' ? ICONS.x : ICONS.clock}</div>
    <div class="rule-content">
      <div class="rule-title">${rule.title}</div>
      <div class="rule-description">${rule.description}</div>
      <div class="rule-meta">
        <span class="rule-badge ${rule.severity}">${rule.id}</span>
        <span class="rule-badge ${rule.severity}">${rule.severity === 'critical' ? 'حرج' : rule.severity === 'warning' ? 'تحذير' : 'معلومات'}</span>
      </div>
      ${rule.details ? `<div class="violation-details"><h5>تفاصيل نتيجة التحقق</h5><p>${rule.details}</p></div>` : ''}
    </div>
  </div>`).join('');
  return `<div class="rules-section">
    <div class="rules-header"><h3>${ICONS.list}قواعد التحقق من Validation engine</h3>
      <div class="rules-stats">
        <div class="rule-stat failed">${ICONS.x} ${failed} غير مستوفاة</div>
        <div class="rule-stat pending">${ICONS.clock} ${pending} قيد التحقق</div>
        <div class="rule-stat passed">${ICONS.check} ${passed} مستوفاة</div>
      </div>
    </div>
    <div class="rules-list">${rows}</div>
  </div>`;
}

function _svcDecisionPanel(summary) {
  const noteId = 'svc-dec-note-' + Math.random().toString(36).slice(2, 7);
  if (summary.failed === 0 && summary.pending === 0) {
    return `<div class="card">
      <div class="ph"><h3><span class="pico tl">${ICONS.check}</span>نتيجة الاطلاع</h3>
        <span class="badge b-approved">جميع الشروط مستوفاة</span></div>
      <div class="pb">
        <div class="alert alert-s" style="margin-bottom:16px">${ICONS.check} اجتاز الطلب جميع شروط التحقق. يظهر في التفتيش للاطلاع دون إمكانية اتخاذ إجراءات.</div>
        <div class="fgrp" style="margin-bottom:14px">
          <label class="flbl">ملاحظات (اختياري)</label>
          <textarea class="fc" id="${noteId}" rows="3" placeholder="أضف أي ملاحظات أو توجيهات ختامية..."></textarea>
        </div>
        <div class="dz-box" style="padding:12px;min-height:auto;margin-bottom:14px">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="font-size:20px;color:var(--text3)">${ICONS.upload}</div>
            <div style="flex:1"><div style="font-size:12px;font-weight:600">إرفاق وثيقة داعمة (اختياري)</div>
              <div style="font-size:11px;color:var(--text3)">PDF, JPG, PNG — الحد الأقصى 10 MB</div></div>
            <button class="btn btn-secondary btn-sm" onclick="showToast('فتح نافذة الرفع','i')">اختيار ملف</button>
          </div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="showToast('تم تسجيل الاطلاع وحفظ الملاحظات','s')">${ICONS.check}تأكيد الاطلاع</button>
      </div>
    </div>`;
  }
  return `<div class="card">
    <div class="ph"><h3><span class="pico bl">${ICONS.pen}</span>قرار قسم المتابعة والبلاغات</h3>
      <span class="badge b-high">${summary.failed} شرط غير مستوفٍ</span></div>
    <div class="pb">
      <div class="alert alert-w" style="margin-bottom:16px">${ICONS.warn} يرجى مراجعة الشروط غير المستوفاة والمستندات الداعمة قبل اتخاذ القرار.</div>
      <div class="fgrp" style="margin-bottom:14px">
        <label class="flbl">ملاحظات القرار <span class="req">*</span></label>
        <textarea class="fc" id="${noteId}" rows="4" placeholder="أدخل مبررات القرار، التوجيهات، أو الإجراءات المطلوبة من الجهات الأخرى..."></textarea>
      </div>
      <div class="dz-box" style="padding:12px;min-height:auto;margin-bottom:16px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="font-size:20px;color:var(--text3)">${ICONS.upload}</div>
          <div style="flex:1"><div style="font-size:12px;font-weight:600">إرفاق وثيقة داعمة للقرار (اختياري)</div>
            <div style="font-size:11px;color:var(--text3)">PDF, JPG, DOC — الحد الأقصى 10 MB</div></div>
          <button class="btn btn-secondary btn-sm" onclick="showToast('فتح نافذة الرفع','i')">اختيار ملف</button>
        </div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:10px">
        <button class="btn btn-primary btn-sm" onclick="(function(){var n=document.getElementById('${noteId}');if(!n||!n.value.trim()){showToast('يرجى إدخال ملاحظات القرار','w');return;}showToast('تمت الموافقة على تمرير الطلب','s');})()">${ICONS.check}الموافقة على تمرير الطلب</button>
        <button class="btn btn-warning btn-sm" onclick="(function(){var n=document.getElementById('${noteId}');if(!n||!n.value.trim()){showToast('يرجى إدخال ملاحظات القرار','w');return;}showToast('تم تعليق الطلب لحين استيفاء البيانات','w');})()">${ICONS.clock}تعليق لحين استيفاء بيانات</button>
        <button class="btn btn-secondary btn-sm" onclick="(function(){var n=document.getElementById('${noteId}');if(!n||!n.value.trim()){showToast('يرجى إدخال ملاحظات القرار','w');return;}showToast('تم طلب زيارة أو تحقق إضافي','i');})()">${ICONS.search}طلب تحقق إضافي</button>
        <button class="btn btn-danger btn-sm" onclick="(function(){var n=document.getElementById('${noteId}');if(!n||!n.value.trim()){showToast('يرجى إدخال مبرر الرفض','w');return;}showToast('تم رفض الطلب وإشعار مقدم الطلب','s');})()">${ICONS.x}رفض الطلب</button>
      </div>
    </div>
  </div>`;
}

function _renderServiceRequestDetails(serviceKey) {
  const cfg = SERVICE_CONFIGS[serviceKey];
  const requestId = getParam('id');
  const requests = INSP_DATA[cfg.dataKey] || [];
  const request = requests.find(r => r.id === requestId) || requests[0];
  const summary = _svcSummary(serviceKey, request);
  const alert = summary.failed || summary.pending
    ? `<div class="svc-alert warn">${ICONS.alert}<div><h3>تم توجيه الطلب للمتابعة والبلاغات</h3><p>لم يستوف الطلب ${summary.failed} شرط، وهناك ${summary.pending} شرط قيد التحقق. يلزم بحث إضافي قبل تمرير الطلب أو تعليقه.</p></div></div>`
    : `<div class="svc-alert ok">${ICONS.check}<div><h3>الطلب مستوفٍ للتحقق الأولي</h3><p>اجتاز الطلب جميع شروط Validation engine ويظهر في التفتيش للاطلاع فقط دون إمكانية اتخاذ إجراءات.</p></div></div>`;
  const tabs = [
    { label: 'قواعد التحقق', badge: summary.failed || '', content: _svcRulesPanel(summary.rules) },
    { label: 'بيانات الطلب', content: _svcOverview(cfg, request) },
    { label: 'المستندات', content: _svcDocuments(cfg) },
    { label: 'الملف المالي', content: _svcFinancial(cfg, request) }
  ];
  if (serviceKey === 'family') tabs.splice(3, 0, { label: 'أفراد الأسرة', content: _svcFamilyMembers(request) });
  tabs.push({ label: summary.failed || summary.pending ? 'القرار' : 'نتيجة الاطلاع', content: _svcDecisionPanel(summary) });

  return `<div class="svc-detail">
    <div class="pg-head"><div><h1>${request.id}</h1><p>${cfg.detailTitle}</p></div>
      <div class="pg-acts">${statusBadge(request.status)}
        <button class="btn btn-secondary btn-sm" onclick="navigateTo('${cfg.listPage}')">${ICONS.arrow_right}رجوع</button>
        <button class="btn btn-primary btn-sm" onclick="showToast('جارٍ طباعة الطلب...','i')">${ICONS.download}طباعة</button>
      </div></div>
    ${_summaryBar([
    ['مصدر الطلب', cfg.source],
    ['الالتزام بالشروط', _validationIndicator(summary)],
    ['الموظف المسؤول', 'سيف خلفان السيابي'],
    ['تاريخ التقديم', request.requestDate]
  ])}
    ${alert}
    ${_tabView(`${cfg.key}-detail`, tabs, 0)}
    ${renderNotes(request.notes, request.id)}
    <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.clock}</span>السجل الزمني</h3></div><div class="pb">${renderTimeline(request.timeline)}</div></div>
  </div>`;
}

function renderJobSecurityRequestDetails(role) { return _renderServiceRequestDetails('job'); }
function renderFamilyBenefitRequestDetails(role) { return _renderServiceRequestDetails('family'); }
function renderMaternityLeaveRequestDetails(role) { return _renderServiceRequestDetails('maternity'); }

function renderCompaniesStoppedPaymentList() {
  const companies = INSP_DATA.companiesStoppedPayment || [];
  const rows = companies.map(c => `
    <tr>
      <td><a href="#" onclick="navigateTo('../services/companies-stopped-payment-details','id=${c.id}')" class="txp fw7">${c.id}</a></td>
      <td>${c.establishmentName}</td>
      <td>${c.commercialNumber}</td>
      <td>${c.insuredCount} مؤمن</td>
      <td>${formatDate(c.stopDate)}</td>
      <td>${statusBadge(c.status)}</td>
      <td>${riskBadge(c.riskLevel)}</td>
      <td><button class="btn btn-primary btn-xs" onclick="navigateTo('../services/companies-stopped-payment-details','id=${c.id}')">${ICONS.eye}عرض</button></td>
    </tr>`).join('');
  return `<div class="pg-head"><div><h1>المنشآت المتوقفة عن السداد</h1><p>متابعة وإدارة المنشآت المتوقفة عن سداد المساهمات — ${companies.length} منشأة</p></div>
    <div class="pg-acts"><button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ تصدير البيانات...','i')">${ICONS.download}تصدير</button></div></div>
    ${_filterBar([{ label: 'بحث', type: 'text', ph: 'رقم المنشأة، اسم المنشأة، الرقم التجاري...' }, { label: 'الحالة', type: 'select', opts: ['قيد المراجعة', 'قيد التحليل', 'بانتظار القرار', 'تم الاعتماد', 'تم الرفض', 'طلب معلومات إضافية'] }, { label: 'مستوى المخاطرة', type: 'select', opts: ['عالي', 'متوسط', 'منخفض'] }, { label: 'من تاريخ', type: 'date' }])}
    <div class="stats-cards">
      <div class="stat-card"><div class="stat-icon">${ICONS.building}</div><div class="stat-info"><div class="stat-value">${companies.length}</div><div class="stat-label">إجمالي المنشآت</div></div></div>
      <div class="stat-card warning"><div class="stat-icon">${ICONS.clock}</div><div class="stat-info"><div class="stat-value">${companies.filter(c => c.status === 'قيد المراجعة').length}</div><div class="stat-label">قيد المراجعة</div></div></div>
      <div class="stat-card danger"><div class="stat-icon">${ICONS.alert}</div><div class="stat-info"><div class="stat-value">${companies.filter(c => c.riskLevel === 'عالي').length}</div><div class="stat-label">خطر عالي</div></div></div>
      <div class="stat-card success"><div class="stat-icon">${ICONS.check}</div><div class="stat-info"><div class="stat-value">${companies.filter(c => c.status === 'تم الاعتماد').length}</div><div class="stat-label">تم الاعتماد</div></div></div>
    </div>
    ${_tblWrap(['رقم المنشأة', 'اسم المنشأة', 'الرقم التجاري', 'عدد المؤمن عليهم', 'تاريخ التوقف', 'الحالة', 'مستوى المخاطرة', 'الإجراءات'], rows || _noData())}`;
}

function renderLiquidationBankruptcyCasesList() {
  const cases = INSP_DATA.liquidationBankruptcy || [];
  const rows = cases.map(c => `
    <tr>
      <td><a href="#" onclick="navigateTo('../services/liquidation-bankruptcy-case-details','id=${c.id}')" class="txp fw7">${c.id}</a></td>
      <td>${c.establishmentName}</td>
      <td>${c.commercialNumber}</td>
      <td><span class="badge ${c.caseType === 'إفلاس' ? 'b-rejected' : 'b-phead'}">${c.caseType}</span></td>
      <td>${formatDate(c.submissionDate)}</td>
      <td>${statusBadge(c.status)}</td>
      <td>${c.insuredCount} مؤمن</td>
      <td><button class="btn btn-primary btn-xs" onclick="navigateTo('../services/liquidation-bankruptcy-case-details','id=${c.id}')">${ICONS.eye}عرض</button></td>
    </tr>`).join('');
  return `<div class="pg-head"><div><h1>حالات التصفية والإفلاس</h1><p>متابعة وإدارة حالات التصفية والإفلاس — ${cases.length} قضية</p></div>
    <div class="pg-acts"><button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ تصدير البيانات...','i')">${ICONS.download}تصدير</button></div></div>
    ${_filterBar([{ label: 'بحث', type: 'text', ph: 'رقم القضية، اسم المنشأة، الرقم التجاري...' }, { label: 'الحالة', type: 'select', opts: ['قيد المراجعة', 'قيد التحليل', 'بانتظار القرار', 'تم الاعتماد', 'تم الرفض', 'طلب معلومات إضافية'] }, { label: 'نوع القضية', type: 'select', opts: ['تصفية', 'إفلاس'] }, { label: 'من تاريخ', type: 'date' }])}
    <div class="stats-cards">
      <div class="stat-card"><div class="stat-icon">${ICONS.file}</div><div class="stat-info"><div class="stat-value">${cases.length}</div><div class="stat-label">إجمالي القضايا</div></div></div>
      <div class="stat-card warning"><div class="stat-icon">${ICONS.clock}</div><div class="stat-info"><div class="stat-value">${cases.filter(c => c.status === 'قيد المراجعة').length}</div><div class="stat-label">قيد المراجعة</div></div></div>
      <div class="stat-card danger"><div class="stat-icon">${ICONS.alert}</div><div class="stat-info"><div class="stat-value">${cases.filter(c => c.caseType === 'إفلاس').length}</div><div class="stat-label">إفلاس</div></div></div>
      <div class="stat-card success"><div class="stat-icon">${ICONS.check}</div><div class="stat-info"><div class="stat-value">${cases.filter(c => c.status === 'تم الاعتماد').length}</div><div class="stat-label">تم الاعتماد</div></div></div>
    </div>
    ${_tblWrap(['رقم القضية', 'اسم المنشأة', 'الرقم التجاري', 'نوع القضية', 'تاريخ التقديم', 'الحالة', 'عدد المؤمن عليهم', 'الإجراءات'], rows || _noData())}`;
}

function renderNonPaymentCompanyDetails(role) {
  const companyId = getParam('id');
  const company = (INSP_DATA.companiesStoppedPayment || []).find(c => c.id === companyId) || (INSP_DATA.companiesStoppedPayment || [])[0];
  const docs = [['إشعار التوقف عن السداد', 'PDF · صادر من النظام'], ['كشف المساهمات المتأخرة', 'XLSX · قابل للاستعراض'], ['مراسلات المنشأة', 'PDF · آخر تحديث'], ['خطة السداد المقترحة', 'PDF · قيد الدراسة']];
  return `<div class="svc-detail">
    <div class="pg-head"><div><h1>${company.id}</h1><p>تفاصيل المنشأة المتوقفة عن السداد</p></div>
      <div class="pg-acts">${statusBadge(company.status)}<button class="btn btn-secondary btn-sm" onclick="navigateTo('../services/companies-stopped-payment-list')">${ICONS.arrow_right}رجوع</button></div></div>
    ${_summaryBar([['المنشأة', company.establishmentName], ['الرقم التجاري', company.commercialNumber], ['مستوى المخاطرة', riskBadge(company.riskLevel)], ['الموظف المسؤول', 'مها سالم الهنائية']])}
    ${_tabView('non-payment-detail', [
    { label: 'نظرة عامة', content: `<div class="svc-info-grid"><div class="svc-info-card"><h4>بيانات المنشأة</h4>${_svcField('اسم المنشأة', company.establishmentName)}${_svcField('الرقم التجاري', company.commercialNumber)}${_svcField('عدد المؤمن عليهم', `${company.insuredCount} مؤمن`)}${_svcField('تاريخ التوقف', formatDate(company.stopDate))}</div><div class="svc-info-card"><h4>بيانات المتأخرات</h4>${_svcField('إجمالي المستحقات', `${(company.totalDue || 0).toLocaleString()} ر.ع`)}${_svcField('مدة التأخر', `${company.monthsDue || 0} أشهر`)}${_svcField('سبب المتابعة', company.notes)}${_svcField('الحالة', statusBadge(company.status))}</div></div>` },
    { label: 'الملف المالي', content: `<div class="svc-info-grid"><div class="svc-info-card"><h4>تحليل السداد</h4>${_svcField('إجمالي المساهمات المتأخرة', `${(company.totalDue || 0).toLocaleString()} ر.ع`)}${_svcField('آخر شهر مسدد', 'مارس 2024')}${_svcField('متوسط الالتزام السابق', '83%')}${_svcField('المسار المقترح', company.riskLevel === 'عالي' ? 'تصعيد ومتابعة عاجلة' : 'خطة سداد ومراقبة')}</div><div class="svc-info-card"><h4>مؤشرات الاستمرارية</h4>${_svcField('عدد العاملين المتأثرين', `${company.insuredCount} مؤمن`)}${_svcField('المخاطر على المنافع', company.riskLevel)}${_svcField('قابلية خطة السداد', company.riskLevel === 'منخفض' ? 'مرتفعة' : 'تحتاج تحقق')}</div></div>` },
    { label: 'المستندات', content: `<div class="documents-list">${docs.map(d => `<div class="document-item" onclick="showToast('فتح ملف: ${d[0]}','i')"><div class="document-icon">${ICONS.file}</div><div class="document-info"><h4>${d[0]}</h4><p>${d[1]}</p><span class="document-action">${ICONS.eye}استعراض الملف</span></div></div>`).join('')}</div>` },
    { label: 'الإجراءات', content: `<div class="decision-panel"><h3>إجراءات المتابعة</h3><p>الموظف المسؤول: مها سالم الهنائية. يتم اختيار الإجراء بناء على مستوى المخاطرة وقدرة المنشأة على السداد.</p><div class="decision-actions"><button class="btn btn-primary btn-sm" onclick="showToast('تم اعتماد خطة السداد','s')">${ICONS.check}اعتماد خطة سداد</button><button class="btn btn-warning btn-sm" onclick="showToast('تم طلب معلومات إضافية','w')">${ICONS.clock}طلب معلومات إضافية</button><button class="btn btn-danger btn-sm" onclick="showToast('تم تصعيد الحالة','d')">${ICONS.alert}تصعيد الحالة</button></div></div>` }
  ], 0)}
    <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.clock}</span>السجل الزمني</h3></div><div class="pb">${renderTimeline(company.timeline)}</div></div>
  </div>`;
}

function renderLiquidationBankruptcyDetails(role) {
  const caseId = getParam('id');
  const item = (INSP_DATA.liquidationBankruptcy || []).find(c => c.id === caseId) || (INSP_DATA.liquidationBankruptcy || [])[0];
  const docs = [['قرار المحكمة', 'PDF · قابل للاستعراض'], ['تقرير المصفي القضائي', 'PDF · آخر إصدار'], ['قائمة الأصول', 'XLSX · محدثة'], ['قائمة الدائنين', 'XLSX · معتمدة']];
  return `<div class="svc-detail">
    <div class="pg-head"><div><h1>${item.id}</h1><p>تفاصيل حالة التصفية والإفلاس</p></div>
      <div class="pg-acts">${statusBadge(item.status)}<button class="btn btn-secondary btn-sm" onclick="navigateTo('../services/liquidation-bankruptcy-cases-list')">${ICONS.arrow_right}رجوع</button></div></div>
    ${_summaryBar([['المنشأة', item.establishmentName], ['النوع', item.caseType], ['تاريخ التقديم', formatDate(item.submissionDate)], ['الموظف المسؤول', 'عبدالعزيز هلال الراشدي']])}
    ${_tabView('liquidation-detail', [
    { label: 'نظرة عامة', content: `<div class="svc-info-grid"><div class="svc-info-card"><h4>بيانات القضية</h4>${_svcField('رقم القضية', item.id)}${_svcField('نوع القضية', item.caseType)}${_svcField('الحالة', statusBadge(item.status))}${_svcField('عدد المؤمن عليهم', `${item.insuredCount} مؤمن`)}</div><div class="svc-info-card"><h4>بيانات المنشأة</h4>${_svcField('اسم المنشأة', item.establishmentName)}${_svcField('الرقم التجاري', item.commercialNumber)}${_svcField('تاريخ تقديم الحالة', formatDate(item.submissionDate))}${_svcField('الملاحظات', item.notes)}</div></div>` },
    { label: 'الملف المالي', content: `<div class="svc-info-grid"><div class="svc-info-card"><h4>الأصول والالتزامات</h4>${_svcField('إجمالي الأصول', `${(item.totalAssets || 0).toLocaleString()} ر.ع`)}${_svcField('إجمالي الالتزامات', `${(item.totalLiabilities || 0).toLocaleString()} ر.ع`)}${_svcField('صافي المركز', `${((item.totalAssets || 0) - (item.totalLiabilities || 0)).toLocaleString()} ر.ع`)}</div><div class="svc-info-card"><h4>حقوق المؤمن عليهم</h4>${_svcField('عدد المؤمن عليهم', `${item.insuredCount} مؤمن`)}${_svcField('أولوية المتابعة', item.caseType === 'إفلاس' ? 'عالية' : 'متوسطة')}${_svcField('الإجراء المالي', 'حصر المستحقات قبل اعتماد القرار')}</div></div>` },
    { label: 'المستندات', content: `<div class="documents-list">${docs.map(d => `<div class="document-item" onclick="showToast('فتح ملف: ${d[0]}','i')"><div class="document-icon">${ICONS.file}</div><div class="document-info"><h4>${d[0]}</h4><p>${d[1]}</p><span class="document-action">${ICONS.eye}استعراض الملف</span></div></div>`).join('')}</div>` },
    { label: 'الإجراءات', content: `<div class="decision-panel"><h3>إجراءات الحالة</h3><p>الموظف المسؤول: عبدالعزيز هلال الراشدي. تتم مراجعة حقوق المؤمن عليهم قبل اعتماد أي مسار نهائي.</p><div class="decision-actions"><button class="btn btn-primary btn-sm" onclick="showToast('تمت متابعة الإجراءات','s')">${ICONS.check}متابعة الإجراءات</button><button class="btn btn-warning btn-sm" onclick="showToast('تم طلب تقرير إضافي','w')">${ICONS.clock}طلب تقرير إضافي</button><button class="btn btn-secondary btn-sm" onclick="showToast('تم حفظ الملاحظة','i')">${ICONS.file}حفظ ملاحظة</button></div></div>` }
  ], 0)}
    <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.clock}</span>السجل الزمني</h3></div><div class="pb">${renderTimeline(item.timeline)}</div></div>
  </div>`;
}
