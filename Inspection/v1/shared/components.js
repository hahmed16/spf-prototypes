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
  };

  const _firstPage = {
    'employer': 'complaints-list', 'insured': 'complaints-list',
    'monitoring-employee': 'complaints-list', 'monitoring-head': 'complaints-list',
    'field-inspector': 'visits-periodic-list', 'field-head': 'visits-periodic-list',
    'inspection-director': 'complaints-list', 'ops-analyst': 'risk-analysis'
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
    const _vpg = id => id.includes('MFJ') ? 'visit-surprise-details' : id.includes('MJD') ? 'visit-scheduled-details' : 'visit-periodic-details';
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
     <td>${c.dueDate}</td>
     <td><button class="btn btn-primary btn-xs" onclick="navigateTo('complaint-details','id=${c.id}')">عرض</button></td></tr>`).join('');
  return `<div class="card dashboard-current-work"><div class="ph"><h3>${ICONS.inbox} آخر البلاغات</h3></div>
    <div class="tbl-wrap"><table class="dtbl"><thead><tr><th>الرقم</th><th>النوع</th><th>الحالة</th><th>الأولوية</th><th>الموعد</th><th>إجراء</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;
}

/* ── قائمة البلاغات ── */
function renderComplaintsList(role) {
  const isExt = role === 'employer' || role === 'insured';
  const canCreate = INSP_CONFIG.roles[role].canCreate && (role === 'employer' || role === 'insured' || role === 'fund-staff');
  const createBtn = canCreate ? `<button class="btn btn-primary" onclick="navigateTo('complaint-new')">${ICONS.plus}بلاغ جديد</button>` : '';

  const filters = _filterBar([
    { label: 'بحث برقم البلاغ أو الاسم', ph: 'أدخل رقم البلاغ...' },
    { label: 'الحالة', type: 'select', opts: ['قيد الدراسة والتحقق','بانتظار اعتماد رئيس القسم','تم جدولة زيارة تفتيشية','تم إصدار قرار بشأن البلاغ','تم إغلاق البلاغ'] },
    { label: 'نوع البلاغ', type: 'select', opts: ['مخالفة نظام العمل','تقصير في الاشتراكات','ظروف عمل غير آمنة','شكوى عمالية'] },
    { label: 'الأولوية', type: 'select', opts: ['عاجل','مرتفع','متوسط','منخفض'] },
    { label: 'من تاريخ', type: 'date' },
    { label: 'إلى تاريخ', type: 'date' },
  ]);

  let data = INSP_DATA.complaints;
  if (role === 'employer') data = data.filter(c => c.submittedBy === 'employer');
  if (role === 'insured') data = data.filter(c => c.submittedBy === 'insured');
  if (role === 'monitoring-employee') data = data.filter(c => c.assignedTo);

  const rows = data.map(c => {
    const extraCols = isExt ? '' : `<td>${c.assignedTo || '<span class="tx3">غير معين</span>'}</td>`;
    return `<tr>
      <td><a href="#" onclick="navigateTo('complaint-details','id=${c.id}')" class="txp fw7">${c.id}</a></td>
      <td>${c.type}<br><span class="fs11 tx3">${c.subtype}</span></td>
      ${isExt ? '' : `<td>${c.submittedByName || '—'}</td>`}
      <td>${c.employerName || '—'}</td>
      <td>${statusBadge(c.status)}</td>
      <td><span class="badge ${_priClass(c.priority)}">${c.priority}</span></td>
      ${extraCols}
      <td>${c.dueDate}</td>
      <td><div class="df ac g8">
        <button class="btn btn-primary btn-xs" onclick="navigateTo('complaint-details','id=${c.id}')">${ICONS.eye}عرض</button>
        ${role === 'monitoring-employee' && c.status.includes('بانتظار') ? `<button class="btn btn-accent btn-xs" onclick="showToast('تم تعيين المختص','s')">تعيين</button>` : ''}
      </div></td>
    </tr>`;
  }).join('');

  const headers = isExt
    ? ['رقم البلاغ','النوع','المنشأة','الحالة','الأولوية','الموعد','إجراء']
    : ['رقم البلاغ','النوع','مقدم البلاغ','المنشأة','الحالة','الأولوية','الموظف المختص','الموعد','إجراء'];

  return `<div class="pg-head"><div><h1>قائمة البلاغات</h1><p>${data.length} بلاغ إجمالاً</p></div>
    <div class="pg-acts">${createBtn}<button class="btn btn-secondary btn-sm">${ICONS.download}تصدير</button></div></div>
    ${filters}
    ${_tblWrap(headers, rows || _noData())}`;
}

/* ── إنشاء بلاغ جديد ── */
function renderComplaintNew(role) {
  const isFundStaff = role === 'fund-staff';
  return `<div class="pg-head"><div><h1>إنشاء بلاغ جديد</h1><p>تعبئة نموذج البلاغ وإرساله</p></div>
    <div class="pg-acts"><button class="btn btn-secondary" onclick="goHome()">${ICONS.arrow_right}رجوع</button></div></div>
  <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.file}</span>معلومات البلاغ الأساسية</h3></div>
  <div class="pb"><div class="fg fg-3">
    <div class="fgrp"><label class="flbl">نوع البلاغ <span class="req">*</span></label>
      <select class="fc"><option>اختر النوع</option><option>مخالفة نظام العمل</option><option>تقصير في الاشتراكات التأمينية</option><option>ظروف عمل غير آمنة</option><option>انتهاك ساعات العمل</option><option>شكوى عمالية</option><option>إشارة خارجية</option></select></div>
    <div class="fgrp"><label class="flbl">التصنيف الفرعي</label>
      <select class="fc"><option>اختر التصنيف</option></select></div>
    <div class="fgrp"><label class="flbl">قناة الإبلاغ</label>
      <select class="fc"><option>منصة إلكترونية</option>${isFundStaff ? '<option>إحالة داخلية</option><option>إحالة رسمية خارجية</option>' : ''}</select></div>
    <div class="fgrp"><label class="flbl">الأولوية <span class="req">*</span></label>
      <select class="fc"><option>منخفض</option><option>متوسط</option><option>مرتفع</option>${isFundStaff ? '<option>عاجل</option>' : ''}</select></div>
    <div class="fgrp"><label class="flbl">صاحب العمل <span class="req">*</span></label>
      <select class="fc">${INSP_DATA.employers.map(e=>`<option>${e.name}</option>`).join('')}</select></div>
    <div class="fgrp"><label class="flbl">العامل المعني (إن وجد)</label>
      <select class="fc"><option>اختر العامل</option>${INSP_DATA.workers.map(w=>`<option>${w.name}</option>`).join('')}</select></div>
    <div class="fgrp span-full"><label class="flbl">وصف البلاغ <span class="req">*</span></label>
      <textarea class="fc" rows="4" placeholder="اكتب وصفاً مفصلاً للمخالفة أو الشكوى..."></textarea></div>
  </div></div></div>
  <div class="card"><div class="ph"><h3><span class="pico gr">${ICONS.upload}</span>المستندات المرفقة</h3></div>
  <div class="pb">
    <div class="dz-box"><div class="dz-box-icon">${ICONS.upload}</div>
      <div class="dz-box-text">اسحب الملفات هنا أو انقر للرفع</div>
      <div class="dz-box-sub">PDF, DOC, JPG, ZIP — الحد الأقصى 10 MB لكل ملف</div></div>
  </div></div>
  <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.info}</span>إقرار وتأكيد</h3></div>
  <div class="pb"><p style="font-size:12.5px;color:var(--text2);line-height:1.8">بالنقر على "إرسال البلاغ" أقر بأن جميع المعلومات المدخلة صحيحة ودقيقة، وأن تقديم معلومات مضللة يعرّض صاحبها للمساءلة القانونية.</p>
  <div class="df ac g8 mt12">
    <button class="btn btn-primary" onclick="showToast('تم إرسال البلاغ بنجاح','s')">${ICONS.check}إرسال البلاغ</button>
    <button class="btn btn-ghost" onclick="showToast('تم الحفظ كمسودة','i')">حفظ كمسودة</button>
    <button class="btn btn-secondary" onclick="goHome()">إلغاء</button>
  </div></div></div>`;
}

/* ── تفاصيل البلاغ ── */
function renderComplaintDetails(role) {
  const id = getParam('id') || 'INSP-BLG-2025-0001';
  const c = INSP_DATA.complaints.find(x => x.id === id) || INSP_DATA.complaints[0];

  const actionPanel = _buildComplaintActionPanel(role, c);
  const invRes = c.investigationResults ? `
    <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.check}</span>نتائج التحقيق والقرار</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">نتيجة التحقيق</label><div class="fro">${c.investigationResults.outcome}</div></div>
      <div class="fgrp"><label class="flbl">تاريخ القرار</label><div class="fro">${c.investigationResults.decisionDate || '—'}</div></div>
      <div class="fgrp span-full"><label class="flbl">النتائج والملاحظات</label><div class="fro" style="min-height:60px">${c.investigationResults.findings}</div></div>
      ${c.investigationResults.corrective ? `<div class="fgrp span-full"><label class="flbl">الإجراء التصحيحي</label><div class="fro">${c.investigationResults.corrective}</div></div>` : ''}
      ${c.investigationResults.fine ? `<div class="fgrp"><label class="flbl">الغرامة المفروضة</label><div class="fro txd fw7">${c.investigationResults.fine}</div></div>` : ''}
    </div></div></div>` : '';

  return `<div class="pg-head"><div><h1>${c.id}</h1><p>${c.type} — ${c.employerName}</p></div>
    <div class="pg-acts">${statusBadge(c.status)}<span class="badge ${_priClass(c.priority)}">${c.priority}</span>
      <button class="btn btn-secondary btn-sm" onclick="navigateTo('complaints-list')">${ICONS.arrow_right}رجوع</button></div></div>
  <div class="dashboard-auto-grid">
    <div>
      <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.file}</span>معلومات البلاغ</h3></div>
      <div class="pb"><div class="fg fg-2">
        <div class="fgrp"><label class="flbl">رقم البلاغ</label><div class="fro fw7">${c.id}</div></div>
        <div class="fgrp"><label class="flbl">تاريخ التقديم</label><div class="fro">${c.submitDate}</div></div>
        <div class="fgrp"><label class="flbl">نوع البلاغ</label><div class="fro">${c.type}</div></div>
        <div class="fgrp"><label class="flbl">التصنيف الفرعي</label><div class="fro">${c.subtype}</div></div>
        <div class="fgrp"><label class="flbl">قناة الإبلاغ</label><div class="fro">${c.channel}</div></div>
        <div class="fgrp"><label class="flbl">الموعد النهائي</label><div class="fro">${c.dueDate}</div></div>
        <div class="fgrp"><label class="flbl">صاحب العمل</label><div class="fro txp fw7">${c.employerName}</div></div>
        <div class="fgrp"><label class="flbl">العامل المعني</label><div class="fro">${c.workerName || 'غير محدد'}</div></div>
        <div class="fgrp"><label class="flbl">مقدّم البلاغ</label><div class="fro">${c.submittedByName}</div></div>
        <div class="fgrp"><label class="flbl">الموظف المختص</label><div class="fro">${c.assignedTo || '<span class="tx3">لم يُعيَّن بعد</span>'}</div></div>
        <div class="fgrp span-full"><label class="flbl">وصف البلاغ</label><div class="fro" style="min-height:70px;white-space:pre-wrap">${c.description}</div></div>
      </div></div></div>
      ${actionPanel}
    </div>
    <div>
      <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.upload}</span>المرفقات (${c.attachments.length})</h3><button class="btn btn-secondary btn-sm" onclick="showToast('فتح نافذة الرفع','i')">${ICONS.plus}إضافة</button></div>
      <div class="pb">${c.attachments.length ? c.attachments.map(a => attRow(a)).join('') : '<div class="tx3 fs11">لا توجد مرفقات</div>'}</div></div>
      ${renderNotes(c.notes, c.id)}
      <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.clock}</span>سجل الأحداث</h3></div>
      <div class="pb">${renderTimeline(c.timeline)}</div></div>
    </div>
  </div>
  ${invRes}`;
}

function _buildComplaintActionPanel(role, c) {
  const s = c.status;
  let btns = [];
  if (role === 'monitoring-employee') {
    if (s.includes('بانتظار تعيين')) btns = ['بدء الدراسة','طلب استيفاء بيانات'];
    else if (s.includes('قيد الدراسة')) btns = ['توجيه للرئيس المباشر','جدولة زيارة','إغلاق البلاغ','طلب استيفاء بيانات'];
    else if (s.includes('تم إعادة')) btns = ['بدء الدراسة'];
  } else if (role === 'monitoring-head') {
    if (s.includes('بانتظار اعتماد')) btns = ['اعتماد وإغلاق','إعادة للموظف','رفض مع السبب','إصدار القرار'];
    else if (s.includes('قيد الدراسة')) btns = ['تعيين المختص'];
  } else if (role === 'inspection-director') {
    if (s.includes('يتطلب قرار')) btns = ['إصدار القرار','رفض مع السبب','إعادة للموظف'];
    else btns = ['تصدير التقرير','طباعة'];
  } else if (role === 'employer' || role === 'insured') {
    if (s.includes('بانتظار تعيين') || s.includes('تم إعادة')) btns = ['استيفاء البيانات وإعادة الإرسال'];
    else if (s.includes('قرار')) btns = ['تقديم تظلم'];
    else btns = ['طباعة'];
  }
  if (!btns.length) return '';

  const formHtml = role === 'monitoring-employee' ? `<div class="fg fg-2">
    <div class="fgrp"><label class="flbl">إسناد لموظف</label><select class="fc"><option>سيف خلفان الأمري</option></select></div>
    <div class="fgrp"><label class="flbl">ملاحظة الإجراء</label><input class="fc" placeholder="ملاحظة اختيارية..."></div>
  </div>` : '';

  return _dpanel('لوحة الإجراءات', btns, formHtml);
}

/* ── قائمة التظلمات ── */
function renderAppealsList(role) {
  const canCreate = role === 'employer' || role === 'insured';
  const createBtn = canCreate ? `<button class="btn btn-primary" onclick="navigateTo('appeal-new')">${ICONS.plus}تظلم جديد</button>` : '';

  const filters = _filterBar([
    { label: 'بحث برقم التظلم', ph: 'INSP-TZL-...' },
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
  return `<div class="pg-head"><div><h1>تقديم تظلم جديد</h1><p>تعبئة نموذج التظلم وإرساله</p></div>
    <div class="pg-acts"><button class="btn btn-secondary" onclick="navigateTo('appeals-list')">${ICONS.arrow_right}رجوع</button></div></div>
  <div class="alert alert-w">${ICONS.warn} يُرجى مراجعة القرار أو المحضر المعني بعناية قبل تقديم التظلم. يُقبل التظلم خلال 30 يوماً من تاريخ الإشعار.</div>
  <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.file}</span>معلومات التظلم</h3></div>
  <div class="pb"><div class="fg fg-2">
    <div class="fgrp"><label class="flbl">البلاغ/القرار المتظلم منه <span class="req">*</span></label>
      <select class="fc">${INSP_DATA.complaints.filter(c=>c.submittedBy===role||c.employerName).map(c=>`<option value="${c.id}">${c.id} — ${c.type}</option>`).join('')}</select></div>
    <div class="fgrp"><label class="flbl">نوع التظلم <span class="req">*</span></label>
      <select class="fc"><option>تظلم على القرار</option><option>تظلم على محضر الزيارة</option><option>تظلم على إجراء الإغلاق</option></select></div>
    <div class="fgrp span-full"><label class="flbl">أسباب التظلم <span class="req">*</span></label>
      <textarea class="fc" rows="5" placeholder="اذكر أسباب اعتراضك بالتفصيل..."></textarea></div>
  </div></div></div>
  <div class="card"><div class="ph"><h3><span class="pico gr">${ICONS.upload}</span>المستندات الداعمة</h3></div>
  <div class="pb"><div class="dz-box"><div class="dz-box-icon">${ICONS.upload}</div>
    <div class="dz-box-text">ارفع المستندات الداعمة لتظلمك</div>
    <div class="dz-box-sub">PDF, DOC, JPG — الحد الأقصى 10 MB لكل ملف</div></div></div></div>
  <div class="df ac g8">
    <button class="btn btn-primary" onclick="showToast('تم تقديم التظلم بنجاح','s')">${ICONS.check}تقديم التظلم</button>
    <button class="btn btn-secondary" onclick="navigateTo('appeals-list')">إلغاء</button>
  </div>`;
}

/* ── تفاصيل التظلم ── */
function renderAppealDetails(role) {
  const id = getParam('id') || 'INSP-TZL-2025-0001';
  const a = INSP_DATA.appeals.find(x => x.id === id) || INSP_DATA.appeals[0];

  let actionPanel = '';
  if (role === 'monitoring-employee' && a.status.includes('قيد الدراسة')) {
    actionPanel = _dpanel('إجراء على التظلم', ['قبول التظلم','رفض التظلم','توجيه للرئيس المباشر'],
      `<div class="fgrp"><label class="flbl">مبرر القرار</label><textarea class="fc" rows="3" placeholder="اكتب سبب قبول أو رفض التظلم..."></textarea></div>`);
  } else if (role === 'monitoring-head' && (a.status.includes('بانتظار') || a.status.includes('قيد الدراسة'))) {
    actionPanel = _dpanel('اعتماد قرار التظلم', ['قبول التظلم','رفض التظلم'],
      `<div class="fgrp"><label class="flbl">القرار النهائي</label><textarea class="fc" rows="3" placeholder="أدخل القرار النهائي..."></textarea></div>`);
  }

  const decisionHtml = a.decision ? `
    <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.check}</span>قرار التظلم</h3></div>
    <div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">القرار</label><div class="fro fw7">${a.decision.outcome}</div></div>
      <div class="fgrp"><label class="flbl">تاريخ القرار</label><div class="fro">${a.decision.decisionDate}</div></div>
      <div class="fgrp"><label class="flbl">صدر بواسطة</label><div class="fro">${a.decision.decisionBy}</div></div>
      <div class="fgrp span-full"><label class="flbl">سبب القرار</label><div class="fro" style="min-height:50px">${a.decision.reason}</div></div>
    </div></div></div>` : '';

  return `<div class="pg-head"><div><h1>${a.id}</h1><p>${a.type} — ${a.employerName}</p></div>
    <div class="pg-acts">${statusBadge(a.status)}<button class="btn btn-secondary btn-sm" onclick="navigateTo('appeals-list')">${ICONS.arrow_right}رجوع</button></div></div>
  <div class="dashboard-auto-grid">
    <div>
      <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.file}</span>تفاصيل التظلم</h3></div>
      <div class="pb"><div class="fg fg-2">
        <div class="fgrp"><label class="flbl">رقم التظلم</label><div class="fro fw7">${a.id}</div></div>
        <div class="fgrp"><label class="flbl">تاريخ التقديم</label><div class="fro">${a.submitDate}</div></div>
        <div class="fgrp"><label class="flbl">نوع التظلم</label><div class="fro">${a.type}</div></div>
        <div class="fgrp"><label class="flbl">البند المرتبط</label><div class="fro txp fw7">${a.relatedId} (${a.relatedType})</div></div>
        <div class="fgrp"><label class="flbl">المنشأة</label><div class="fro">${a.employerName}</div></div>
        <div class="fgrp"><label class="flbl">مقدّم التظلم</label><div class="fro">${a.submittedByName}</div></div>
        <div class="fgrp span-full"><label class="flbl">أسباب التظلم</label><div class="fro" style="min-height:70px;white-space:pre-wrap">${a.reasons}</div></div>
      </div></div></div>
      ${actionPanel}
      ${decisionHtml}
    </div>
    <div>
      <div class="card"><div class="ph"><h3><span class="pico or">${ICONS.upload}</span>المرفقات (${a.attachments.length})</h3></div>
      <div class="pb">${a.attachments.map(f => attRow(f)).join('')}</div></div>
      ${renderNotes(a.notes, a.id)}
      <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.clock}</span>سجل الأحداث</h3></div>
      <div class="pb">${renderTimeline(a.timeline)}</div></div>
    </div>
  </div>`;
}

/* ── قائمة الزيارات ── */
function renderVisitsList(role, type) {
  type = type || 'periodic';
  const typeLabel = { periodic: 'الزيارات الدورية', surprise: 'الزيارات المفاجئة', scheduled: 'الزيارات المجدولة' }[type];
  const canCreate = (role === 'field-head' || role === 'inspection-director') && type === 'surprise';

  const filters = _filterBar([
    { label: 'بحث برقم الزيارة أو المنشأة', ph: 'ZYR-...' },
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
        ${(role === 'field-head') && v.status === 'بانتظار مراجعة المحضر' ? `<button class="btn btn-warning btn-xs" onclick="navigateTo('${detailPage}','id=${v.id}')">مراجعة</button>` : ''}
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
  <div class="dashboard-auto-grid">
    <div>
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
      <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.check}</span>قائمة التحقق</h3></div>
      <div class="pb">${checklistHtml}</div></div>
      ${findingsHtml}
      ${actionPanel}
    </div>
    <div>
      ${v.report && v.report.approved ? `<div class="card"><div class="ph"><h3><span class="pico gr">${ICONS.check}</span>المحضر المعتمد</h3></div>
        <div class="pb"><div class="alert alert-s">${ICONS.check} تم اعتماد المحضر بواسطة ${v.report.approvedBy} بتاريخ ${v.report.approvalDate}</div>
        <button class="btn btn-secondary btn-sm">${ICONS.download}تنزيل المحضر</button></div></div>` : ''}
      <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.clock}</span>سجل الأحداث</h3></div>
      <div class="pb">${renderTimeline(v.timeline)}</div></div>
    </div>
  </div>`;
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
  const wid = getParam('worker') || INSP_DATA.workers[0].id;
  const w = INSP_DATA.workers.find(x => x.id === wid) || INSP_DATA.workers[0];

  const wComplaints = INSP_DATA.complaints.filter(c => c.workerId === w.id);
  const wAppeals   = INSP_DATA.appeals.filter(a => a.submittedByName === w.name || (INSP_DATA.complaints.filter(c=>c.workerId===w.id).map(c=>c.id).includes(a.relatedId)));
  const empVisits  = [...INSP_DATA.visits.periodic, ...INSP_DATA.visits.surprise, ...INSP_DATA.visits.scheduled].filter(v => v.employerId === w.employerId);
  const _vpg = id => id.includes('MFJ') ? 'visit-surprise-details' : id.includes('MJD') ? 'visit-scheduled-details' : 'visit-periodic-details';

  const riskScore = w.riskLevel === 'مرتفع' ? 82 : w.riskLevel === 'متوسط' ? 48 : 15;
  const riskColor = w.riskLevel === 'مرتفع' ? 'var(--danger)' : w.riskLevel === 'متوسط' ? 'var(--warning)' : 'var(--success)';

  const _insBadge = s => {
    if (s === 'مدفوع') return 'b-approved';
    if (s === 'غير مدفوع') return 'b-rejected';
    if (s === 'مدفوع متأخر') return 'b-returned';
    return 'b-draft';
  };
  const _srvBadge = s => s === 'نشط' ? 'b-approved' : 'b-rejected';

  const workerSelector = `<div class="card" style="margin-bottom:16px"><div class="pb" style="padding:14px 18px">
    <div class="df ac g8" style="flex-wrap:wrap">
      <span style="font-size:12.5px;font-weight:700;color:var(--text2)">اختر العامل:</span>
      ${INSP_DATA.workers.map(wk => `<button class="btn ${wk.id===w.id?'btn-primary':'btn-secondary'} btn-sm" onclick="navigateTo('worker-analysis','worker=${wk.id}')">${wk.name}</button>`).join('')}
      <div style="margin-right:auto"><button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ تصدير التقرير...','i')">${ICONS.download}تصدير ملف العامل</button></div>
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
      <div class="fg fg-3">
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
          <td>${c.type}<br><span class="fs11 tx3">${c.subtype}</span></td>
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
          <td>${v.id.includes('MFJ')?'مفاجئة':v.id.includes('MJD')?'مجدولة':'دورية'}</td>
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

  return `<div class="pg-head"><div><h1>تحليل بيانات العمال</h1><p>ملف شامل للعامل مع كامل السجلات والمؤشرات المرتبطة</p></div>
    <div class="pg-acts"><button class="btn btn-secondary btn-sm">${ICONS.download}تصدير</button></div></div>
    ${workerSelector}
    <div class="dashboard-auto-grid">
      <div>${profileCard}</div>
      <div>${riskCard}</div>
    </div>
    ${insHistory}
    ${empHistory}
    ${complaintsSection}
    ${visitsSection}
    ${appealsSection}`;
}

/* ── تحليل بيانات صاحب العمل ── */
function renderEmployerAnalysis(role) {
  const eid = getParam('employer') || INSP_DATA.employers[0].id;
  const e = INSP_DATA.employers.find(x => x.id === eid) || INSP_DATA.employers[0];

  const eComplaints = INSP_DATA.complaints.filter(c => c.employerId === e.id);
  const eAppeals   = INSP_DATA.appeals.filter(a => a.employerId === e.id);
  const eBanCases  = INSP_DATA.banCases.filter(b => b.employerId === e.id);
  const eWorkers   = INSP_DATA.workers.filter(w => w.employerId === e.id);
  const eVisits    = [...INSP_DATA.visits.periodic.filter(v=>v.employerId===e.id),
                      ...INSP_DATA.visits.surprise.filter(v=>v.employerId===e.id),
                      ...INSP_DATA.visits.scheduled.filter(v=>v.employerId===e.id)];
  const _vpg = id => id.includes('MFJ') ? 'visit-surprise-details' : id.includes('MJD') ? 'visit-scheduled-details' : 'visit-periodic-details';
  const _csBadge = s => s==='منتظم'?'b-approved':s==='متأخر'?'b-rejected':'b-returned';
  const _vBadge  = s => s==='مرتفع'?'b-rejected':s==='متوسط'?'b-returned':'b-approved';

  const employerSelector = `<div class="card" style="margin-bottom:16px"><div class="pb" style="padding:14px 18px">
    <div class="df ac g8" style="flex-wrap:wrap">
      <span style="font-size:12.5px;font-weight:700;color:var(--text2)">اختر المنشأة:</span>
      ${INSP_DATA.employers.map(em => `<button class="btn ${em.id===e.id?'btn-primary':'btn-secondary'} btn-sm" onclick="navigateTo('employer-analysis','employer=${em.id}')">${em.name.split(' ').slice(0,3).join(' ')}</button>`).join('')}
      <div style="margin-right:auto"><button class="btn btn-secondary btn-sm">${ICONS.download}تصدير ملف المنشأة</button></div>
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
    <div class="pb"><div class="fg fg-3">
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
      <thead><tr><th>رقم البلاغ</th><th>النوع</th><th>العامل المعني</th><th>الحالة</th><th>الأولوية</th><th>القناة</th><th>تاريخ التقديم</th><th>إجراء</th></tr></thead>
      <tbody>${eComplaints.map(c=>`
        <tr>
          <td><a href="#" onclick="navigateTo('complaint-details','id=${c.id}')" class="txp fw7">${c.id}</a></td>
          <td>${c.type}<br><span class="fs11 tx3">${c.subtype}</span></td>
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
          <td>${v.id.includes('MFJ')?'مفاجئة':v.id.includes('MJD')?'مجدولة':'دورية'}</td>
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

  return `<div class="pg-head"><div><h1>تحليل بيانات أصحاب العمل</h1><p>ملف شامل للمنشأة مع كامل السجلات والمؤشرات المرتبطة</p></div>
    <div class="pg-acts"><button class="btn btn-secondary btn-sm">${ICONS.download}تصدير</button></div></div>
    ${employerSelector}
    ${kpis}
    <div class="dashboard-auto-grid">
      <div>${profileCard}</div>
      <div>${complianceCard}</div>
    </div>
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
  return `<div class="pg-head"><div><h1>إعادة تخصيص البلاغات</h1><p>توزيع البلاغات بين موظفي القسم وتعديل التخصيصات الحالية</p></div></div>
    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.switch}</span>البلاغات المخصصة حالياً</h3></div>
    <div class="tbl-wrap"><table class="dtbl"><thead><tr><th>رقم البلاغ</th><th>النوع</th><th>الحالة</th><th>المختص الحالي</th><th>عبء العمل</th><th>إعادة التخصيص</th></tr></thead>
    <tbody>${INSP_DATA.complaints.filter(c=>c.assignedTo).map(c=>`
      <tr><td class="fw7 txp">${c.id}</td><td>${c.type}</td><td>${statusBadge(c.status)}</td>
      <td>${c.assignedTo}</td><td><span class="badge b-medium">4 بلاغات</span></td>
      <td><div class="df ac g8"><select class="fc" style="width:180px"><option>سيف خلفان الأمري</option><option>موظف آخر</option></select>
        <button class="btn btn-accent btn-xs" onclick="showToast('تم إعادة التخصيص','s')">تطبيق</button></div></td></tr>`).join('')}
    </tbody></table></div></div>`;
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
            <button class="btn btn-danger btn-xs" onclick="showToast('تم إعادة التخصيص','s')">إعادة تخصيص</button>
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
        <td>${v.id.includes('DWR')?'دورية':v.id.includes('MFJ')?'مفاجئة':'مجدولة'}</td>
        <td>${v.actualDate || v.scheduledDate}</td>
        <td><div class="df ac g8">
          <button class="btn btn-primary btn-xs" onclick="navigateTo('${v.id.includes('MFJ')?'visit-surprise-details':v.id.includes('MJD')?'visit-scheduled-details':'visit-periodic-details'}','id=${v.id}')">${ICONS.eye}مراجعة</button>
          <button class="btn btn-accent btn-xs" onclick="showToast('تم اعتماد المحضر','s')">اعتماد</button>
          <button class="btn btn-warning btn-xs" onclick="showToast('تم إعادة للمفتش','w')">إعادة</button>
        </div></td></tr>`).join(''))}`;
}

/* ── الإجراءات التصحيحية (field-head) ── */
function renderCorrectiveActions(role) {
  const actions = [
    { visit: 'ZYR-DWR-2025-0002', employer: 'مصنع الإنتاج الغذائي', action: 'توفير معدات الحماية', deadline: '2025-01-19', status: 'معلق' },
    { visit: 'ZYR-DWR-2025-0002', employer: 'مصنع الإنتاج الغذائي', action: 'تسجيل العمال غير المسجلين', deadline: '2025-01-13', status: 'منجز' },
    { visit: 'ZYR-MFJ-2025-0001', employer: 'مصنع الإنتاج الغذائي', action: 'سداد الاشتراكات المتأخرة', deadline: '2025-01-26', status: 'جارٍ' },
    { visit: 'ZYR-DWR-2024-0095', employer: 'مؤسسة البناء والتشييد', action: 'صرف الرواتب المتأخرة', deadline: '2024-12-15', status: 'منجز' },
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
  return `<div class="pg-head"><div><h1>إعادة توزيع المفتشين</h1><p>إدارة تكليفات المفتشين الميدانيين وموازنة أعباء العمل</p></div></div>
    <div class="stats-grid">
      <div class="scard p"><div class="sc-lbl">مفتشون نشطون</div><div class="sc-val">1</div></div>
      <div class="scard w"><div class="sc-lbl">زيارات مجدولة</div><div class="sc-val">3</div></div>
      <div class="scard i"><div class="sc-lbl">متوسط زيارات / مفتش</div><div class="sc-val">3.0</div></div>
    </div>
    <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.user}</span>توزيع المفتشين</h3></div>
    <div class="tbl-wrap"><table class="dtbl"><thead><tr><th>المفتش</th><th>الزيارات المكلف بها</th><th>قيد التنفيذ</th><th>مجدولة</th><th>نسبة الإشغال</th><th>إجراء</th></tr></thead>
    <tbody><tr>
      <td class="fw7">حاتم سالم الزدجالي</td><td>7</td><td>1</td><td>1</td>
      <td><div style="display:flex;align-items:center;gap:8px"><div class="progress-bar-wrap" style="flex:1;margin:0"><div class="progress-bar-fill" style="width:70%;background:var(--warning)"></div></div><span class="fs11">70%</span></div></td>
      <td><button class="btn btn-secondary btn-xs" onclick="showToast('فتح نافذة إعادة التوزيع','i')">تعديل التكليف</button></td>
    </tr></tbody></table></div></div>`;
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
  const id = getParam('id') || 'KHT-2025-Q1';
  const p = INSP_DATA.inspectionPlans.find(x => x.id === id) || INSP_DATA.inspectionPlans[0];

  const pct = p.targetCount ? Math.round(p.completedCount / p.targetCount * 100) : 0;
  return `<div class="pg-head"><div><h1>${p.id}</h1><p>${p.title}</p></div>
    <div class="pg-acts">${statusBadge(p.status)}<button class="btn btn-secondary btn-sm" onclick="navigateTo('inspection-plans-list')">${ICONS.arrow_right}رجوع</button>
      ${p.status !== 'مكتملة' ? `<button class="btn btn-accent" onclick="showToast('تم اعتماد الخطة','s')">${ICONS.check}اعتماد</button>` : ''}</div></div>
  <div class="dashboard-auto-grid">
    <div>
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
    </div>
    <div>
      <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.chart}</span>التقدم</h3></div>
      <div class="pb">
        <div class="progress-bar-wrap" style="height:14px;margin-bottom:8px"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
        <p class="fs11 tx3 mt8">${pct}% من الزيارات مكتملة</p>
      </div></div>
    </div>
  </div>`;
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
  const id = getParam('id') || 'INSP-HZR-2025-0001';
  const b = INSP_DATA.banCases.find(x => x.id === id) || INSP_DATA.banCases[0];

  return `<div class="pg-head"><div><h1>${b.id}</h1><p>حالة حظر — ${b.employerName}</p></div>
    <div class="pg-acts">${statusBadge(b.status)}<button class="btn btn-secondary btn-sm" onclick="navigateTo('ban-cases-list')">${ICONS.arrow_right}رجوع</button>
      ${b.status.includes('سارٍ') ? `<button class="btn btn-accent btn-sm" onclick="showToast('تم رفع الحظر','s')">${ICONS.unlock}رفع الحظر</button>` : ''}
    </div></div>
  <div class="dashboard-auto-grid">
    <div>
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
    </div>
    <div>
      <div class="card"><div class="ph"><h3><span class="pico tl">${ICONS.clock}</span>سجل الأحداث</h3></div>
      <div class="pb">${renderTimeline(b.timeline || [])}</div></div>
    </div>
  </div>`;
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
  const _vpg = id => id.includes('MFJ') ? 'visit-surprise-details' : id.includes('MJD') ? 'visit-scheduled-details' : 'visit-periodic-details';
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
        <div class="fg fg-3" style="margin-bottom:14px">
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
  return `<div class="pg-head"><div><h1>إعداد مقترح خطة التفتيش الدوري</h1><p>تحليل البيانات وتجهيز مقترح الخطة للاعتماد</p></div></div>
  <div class="card"><div class="ph"><h3><span class="pico bl">${ICONS.file}</span>معلومات الخطة المقترحة</h3></div>
  <div class="pb"><div class="fg fg-2">
    <div class="fgrp"><label class="flbl">الفترة الزمنية <span class="req">*</span></label>
      <select class="fc"><option>الربع الثاني 2025 (أبريل–يونيو)</option><option>الربع الثالث 2025</option><option>النصف الثاني 2025</option></select></div>
    <div class="fgrp"><label class="flbl">معيار اختيار المنشآت</label>
      <select class="fc"><option>مستوى المخاطر</option><option>آخر زيارة</option><option>سجل المخالفات</option></select></div>
    <div class="fgrp"><label class="flbl">عدد المنشآت المقترح</label><input type="number" class="fc" value="12"></div>
    <div class="fgrp"><label class="flbl">عدد المفتشين المتاحين</label><input type="number" class="fc" value="1"></div>
  </div></div></div>
  <div class="card"><div class="ph"><h3><span class="pico rd">${ICONS.warn}</span>المنشآت ذات الأولوية (استناداً لتحليل المخاطر)</h3></div>
  <div class="tbl-wrap"><table class="dtbl"><thead><tr><th>المنشأة</th><th>آخر زيارة</th><th>مستوى الخطر</th><th>الامتثال</th><th>أولوية الإدراج</th></tr></thead>
  <tbody>${INSP_DATA.employers.map(e=>`<tr>
    <td class="fw7">${e.name}</td><td>${e.lastVisit}</td>
    <td><span class="badge ${_riskClass(e.riskLevel)}">${e.riskLevel}</span></td>
    <td><span style="color:${_compColor(e.complianceScore)};font-weight:700">${e.complianceScore}%</span></td>
    <td><span class="badge ${e.riskLevel==='مرتفع'?'b-high':e.riskLevel==='متوسط'?'b-medium':'b-low'}">${e.riskLevel==='مرتفع'?'أولى':'ثانوية'}</span></td>
  </tr>`).join('')}</tbody></table></div></div>
  <div class="df ac g8 mt16">
    <button class="btn btn-primary" onclick="showToast('تم رفع المقترح للاعتماد','s')">${ICONS.check}رفع المقترح للاعتماد</button>
    <button class="btn btn-ghost" onclick="showToast('تم الحفظ كمسودة','i')">حفظ كمسودة</button>
  </div>`;
}

/* ── قائمة التقارير ── */
function renderReportsList(role) {
  const reports = [
    { id: 'RPT-2025-001', title: 'تقرير أداء قسم المتابعة — يناير 2025', type: 'أداء قسم', date: '2025-01-15', status: 'منشور', size: '1.2 MB' },
    { id: 'RPT-2025-002', title: 'تقرير الزيارات التفتيشية — الربع الأول 2025', type: 'زيارات', date: '2025-01-10', status: 'مسودة', size: '980 KB' },
    { id: 'RPT-2024-045', title: 'تقرير تحليل المخاطر السنوي — 2024', type: 'تحليل مخاطر', date: '2025-01-01', status: 'منشور', size: '3.4 MB' },
    { id: 'RPT-2024-038', title: 'تقرير حالات الحظر — الربع الرابع 2024', type: 'حظر', date: '2024-12-31', status: 'منشور', size: '760 KB' },
    { id: 'RPT-2024-031', title: 'تقرير امتثال المنشآت — سبتمبر 2024', type: 'امتثال', date: '2024-10-01', status: 'منشور', size: '2.1 MB' },
  ];

  const rows = reports.map(r =>
    `<tr>
      <td><a href="#" onclick="navigateTo('report-details','id=${r.id}')" class="txp fw7">${r.id}</a></td>
      <td>${r.title}</td><td>${r.type}</td>
      <td>${statusBadge(r.status === 'منشور' ? 'تم اعتماد المحضر' : 'مسودة الخطة')}</td>
      <td>${r.date}</td><td>${r.size}</td>
      <td><div class="df ac g8">
        <button class="btn btn-primary btn-xs" onclick="navigateTo('report-details','id=${r.id}')">${ICONS.eye}عرض</button>
        <button class="btn btn-secondary btn-xs" onclick="showToast('جارٍ التنزيل...','i')">${ICONS.download}</button>
      </div></td>
    </tr>`).join('');

  return `<div class="pg-head"><div><h1>قائمة التقارير</h1><p>${reports.length} تقرير متاح</p></div>
    <div class="pg-acts"><button class="btn btn-secondary btn-sm">${ICONS.download}تصدير الكل</button></div></div>
    ${_filterBar([{label:'بحث في التقارير',ph:'اسم التقرير...'},{label:'النوع',type:'select',opts:['أداء قسم','زيارات','تحليل مخاطر','امتثال','حظر']},{label:'الحالة',type:'select',opts:['منشور','مسودة']},{label:'من تاريخ',type:'date'}])}
    ${_tblWrap(['رقم التقرير','عنوان التقرير','النوع','الحالة','تاريخ الإصدار','الحجم','إجراء'], rows)}`;
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
  <div class="pb"><div class="fg fg-3">
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
  const typeLabel = v => v.id.includes('DWR') ? 'دورية' : v.id.includes('MFJ') ? 'مفاجئة' : 'مجدولة';
  const rows = all.map(v =>
    `<tr>
      <td class="fw7 txp">${v.id}</td>
      <td>${typeLabel(v)}</td>
      <td>${v.inspectorName}</td>
      <td>${statusBadge(v.status)}</td>
      <td>${v.scheduledDate}</td>
      <td>${v.actualDate || '—'}</td>
      <td><div class="df ac g8">
        <button class="btn btn-primary btn-xs" onclick="showToast('عرض تفاصيل الزيارة','i')">${ICONS.eye}عرض</button>
        ${v.status.includes('قرار') || v.status.includes('اعتماد') ? `<button class="btn btn-warning btn-xs" onclick="navigateTo('appeals-list')">تظلم</button>` : ''}
      </div></td>
    </tr>`).join('');

  return `<div class="pg-head"><div><h1>الزيارات التفتيشية</h1><p>جميع الزيارات المتعلقة بمنشأتك</p></div></div>
    ${_filterBar([{label:'نوع الزيارة',type:'select',opts:['دورية','مفاجئة','مجدولة']},{label:'الحالة',type:'select',opts:['مجدولة','جارية','مكتملة']},{label:'من تاريخ',type:'date'}])}
    ${_tblWrap(['رقم الزيارة','النوع','المفتش','الحالة','التاريخ المجدول','تاريخ التنفيذ','إجراء'], rows)}`;
}
