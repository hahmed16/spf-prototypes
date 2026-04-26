/* ================================================================
   utils.js — Shared utility functions (event handlers, modals,
              upload, dashboard enhancements, search/filter logic)
   These are pure utilities with no role-specific panel content.
   ================================================================ */

/* ── متغير الطلب الحالي ── */
let currentRequestId = null;

/* ── تنسيق حجم الملف ── */
function formatFileSize(bytes) {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let i = 0;
  while (size >= 1024 && i < units.length - 1) { size /= 1024; i++; }
  return `${size.toFixed(size >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
}

/* ═══════════════════════════════════════════════════════════════
   تنفيذ الإجراءات (decision panel buttons)
   ═══════════════════════════════════════════════════════════════ */
function executeAction(action) {
  const needsConfirm = action.includes('رفض') || action.includes('إغلاق') || action.includes('إلغاء') || action.includes('إيقاف');
  const isPositive   = action.includes('اعتماد') || action.includes('موافقة') || action.includes('تنفيذ');
  if (needsConfirm) {
    confirmAction({
      title: 'تأكيد الإجراء',
      msg: `هل أنت متأكد من تنفيذ الإجراء التالي؟<br><br><strong>${action}</strong>`,
      confirmLabel: action,
      confirmClass: 'btn-danger',
      onConfirm: () => { showToast(`تم تنفيذ: ${action}`, 's'); setTimeout(() => window.location.reload(), 1500); }
    });
  } else {
    showToast(`تم تنفيذ: ${action}`, isPositive ? 's' : 'i');
    setTimeout(() => window.location.reload(), 1500);
  }
}

/* ═══════════════════════════════════════════════════════════════
   الملاحظات التشغيلية
   ═══════════════════════════════════════════════════════════════ */
function quickAddNote() {
  const inp = document.getElementById('quick-note-input');
  if (!inp || !inp.value.trim()) { showToast('يرجى كتابة الملاحظة', 'w'); return; }
  showToast('تم حفظ الملاحظة', 's');
  inp.value = '';
}

function toggleOperationalNotes(card) {
  if (!card) return;
  const willExpand = card.classList.contains('collapsed');
  card.classList.toggle('collapsed', !willExpand);
  card.classList.toggle('expanded', willExpand);
}

function placeAndCollapseOperationalNotes() {
  const content = document.getElementById('app-content');
  if (!content) return;
  const decisionPanel = content.querySelector('.dp');
  const notesCards    = content.querySelectorAll('.op-notes-card');
  notesCards.forEach((card) => {
    if (card.dataset.notesInit !== '1') {
      card.classList.add('collapsed');
      card.classList.remove('expanded');
      card.dataset.notesInit = '1';
    }
    if (decisionPanel && card.previousElementSibling !== decisionPanel) {
      decisionPanel.insertAdjacentElement('afterend', card);
    }
  });
}

(function setupOperationalNotesObserver() {
  const run = () => setTimeout(placeAndCollapseOperationalNotes, 0);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
  const observer = new MutationObserver(() => run());
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();

/* ═══════════════════════════════════════════════════════════════
   استعلام التقارير الطبية (وزارة الصحة)
   ═══════════════════════════════════════════════════════════════ */
function runMedicalQuery(civilId) {
  const resultsEl = document.getElementById('mq-results');
  if (!resultsEl) return;
  resultsEl.innerHTML = `<div class="loading">${ICONS.clock} جارٍ الاستعلام من وزارة الصحة...</div>`;
  setTimeout(() => {
    resultsEl.innerHTML = `
      <div class="flbl" style="margin-bottom:8px">نتائج الاستعلام — ${civilId}</div>
      <div class="tbl-wrap">
        <table class="dtbl">
          <thead><tr><th>رقم التقرير</th><th>الجهة الصحية</th><th>التاريخ</th><th>نوع التقرير</th><th>التشخيص</th><th>أيام الإجازة</th><th></th></tr></thead>
          <tbody>
            <tr><td style="font-family:monospace">RPT-2024-089123</td><td>مستشفى السلطاني</td><td>2024-12-10</td><td>إجازة مرضية</td><td>الربو الحاد</td><td>14 يوم</td><td><button class="ibtn" onclick="openMedicalReportDetails('RPT-2024-089123')">${ICONS.eye}</button></td></tr>
            <tr><td style="font-family:monospace">RPT-2024-076540</td><td>مستشفى خولة</td><td>2024-10-05</td><td>فحص دوري</td><td>وظائف الرئة</td><td>—</td><td><button class="ibtn" onclick="openMedicalReportDetails('RPT-2024-076540')">${ICONS.eye}</button></td></tr>
            <tr><td style="font-family:monospace">RPT-2024-063211</td><td>مستشفى الرحمة الخاص</td><td>2024-07-22</td><td>تقرير متابعة</td><td>ضغط الدم المرتفع</td><td>7 أيام</td><td><button class="ibtn" onclick="openMedicalReportDetails('RPT-2024-063211')">${ICONS.eye}</button></td></tr>
          </tbody>
        </table>
      </div>`;
  }, 1200);
}

function openMedicalReportDetails(reportId) {
  openModal({
    title: `تفاصيل التقرير الطبي — ${reportId}`,
    size: 'md-lg',
    body: `
      <div class="card" style="border:none;box-shadow:none">
        <div style="background:var(--g50);padding:16px;border-radius:12px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-size:12px;color:var(--text3)">الجهة المصدرة</div>
            <div style="font-size:16px;font-weight:700;color:var(--primary)">مستشفى السلطاني — مسقط</div>
          </div>
          <div style="text-align:left">
            <div style="font-size:12px;color:var(--text3)">تاريخ الإصدار</div>
            <div style="font-size:14px;font-weight:600">10 ديسمبر 2024</div>
          </div>
        </div>
        <div class="fg fg-3" style="margin-bottom:20px">
          <div class="fgrp"><label class="flbl">رقم التقرير</label><div class="fro">${reportId}</div></div>
          <div class="fgrp"><label class="flbl">اسم المريض</label><div class="fro">${WI_DATA.users.worker.name}</div></div>
          <div class="fgrp"><label class="flbl">الرقم المدني</label><div class="fro">${WI_DATA.users.worker.civil}</div></div>
        </div>
        <div class="divider"></div>
        <div class="fg fg-2">
          <div class="fgrp"><label class="flbl">التشخيص الطبي (ICD-10)</label><div class="fro">J45.909 - Asthma, unspecified</div></div>
          <div class="fgrp"><label class="flbl">الفترة الممنوحة</label><div class="fro">14 يوم (من 2024-12-10 إلى 2024-12-23)</div></div>
        </div>
        <div class="fgrp" style="margin-top:16px">
          <label class="flbl">خلاصة الحالة الطبية والتوصيات</label>
          <div class="fro" style="line-height:1.8;height:auto;padding:12px">
            تمت معاينة المريض في وحدة الطوارئ حيث كان يعاني من نوبة ربو حادة وضيق في التنفس. تم إعطاء العلاج اللازم. الحالة تستدعي الراحة التامة لمدة أسبوعين. سيتم مراجعة الحالة في العيادة الخارجية بعد أسبوع.
          </div>
        </div>
        <div style="margin-top:20px;padding:12px;border:1px dashed var(--border);border-radius:8px;display:flex;align-items:center;gap:12px">
          <div style="width:40px;height:40px;border-radius:50%;background:var(--s100);color:var(--s700);display:flex;align-items:center;justify-content:center">${ICONS.check}</div>
          <div>
            <div style="font-size:13px;font-weight:700">التوقيع الإلكتروني معتمد</div>
            <div style="font-size:11px;color:var(--text3)">د. أحمد بن عبدالله الحوسني — استشاري أول أمراض صدرية</div>
          </div>
        </div>
      </div>`,
    footer: `
      <button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ طباعة التقرير...','i')">${ICONS.download} طباعة التقرير</button>
      <button class="btn btn-ghost btn-sm" onclick="closeModal()">إغلاق</button>`
  });
}

/* ═══════════════════════════════════════════════════════════════
   رفع الملفات (Modern Multi-File Upload)
   ═══════════════════════════════════════════════════════════════ */
function renderModernUploadComponent({ idPrefix = 'up', title = 'إرفاق المستندات', subTitle = 'يمكنك اختيار عدة ملفات معاً (PDF, Word, صور...)' }) {
  const containerId = `${idPrefix}-container`;
  const inputId     = `${idPrefix}-input`;
  const listId      = `${idPrefix}-list`;
  return `
    <div class="dz-container" id="${containerId}">
      <div class="dz-box" onclick="document.getElementById('${inputId}').click()">
        <div class="dz-box-icon">${ICONS.upload}</div>
        <div class="dz-box-text">اسحب الملفات هنا أو انقر للاختيار</div>
        <div class="dz-box-sub">${subTitle}</div>
        <input type="file" id="${inputId}" class="fc" multiple style="display:none" onchange="handleModernFileUpload(this, '${listId}')">
      </div>
      <div class="dz-list" id="${listId}"></div>
    </div>`;
}

function handleModernFileUpload(input, listId) {
  const listEl = document.getElementById(listId);
  if (!listEl) return;
  const files = Array.from(input.files);
  if (!files.length) return;
  files.forEach(file => {
    const fileId = 'f-' + Math.random().toString(36).substr(2, 9);
    const item   = document.createElement('div');
    item.className = 'dz-item';
    item.id = fileId;
    const ext   = file.name.split('.').pop().toLowerCase();
    const isImg = ['jpg', 'jpeg', 'png', 'gif'].includes(ext);
    item.innerHTML = `
      <div class="dz-item-icon">${isImg ? ICONS.eye : ICONS.file}</div>
      <div class="dz-item-info">
        <div class="dz-item-name" title="${file.name}">${file.name}</div>
        <div class="dz-item-size">${formatFileSize(file.size)}</div>
      </div>
      <button type="button" class="ibtn d" onclick="this.closest('.dz-item').remove()" title="حذف">${ICONS.trash}</button>`;
    listEl.appendChild(item);
  });
  showToast(`تمت إضافة ${files.length} ملف(ات)`, 's');
  input.value = '';
}

function handleFileUpload(input) {
  if (input.files.length > 0) showToast(`تم رفع الملف: ${input.files[0].name}`, 's');
}

function renderDecisionFiles(input) {
  const listEl = document.getElementById('decision-files-list');
  if (!listEl) return;
  const files = Array.from(input?.files || []);
  if (!files.length) { listEl.innerHTML = ''; return; }
  listEl.innerHTML = files.map((file) => {
    const ext  = (file.name.split('.').pop() || '').toUpperCase();
    const type = ext || (file.type ? file.type.split('/').pop().toUpperCase() : 'FILE');
    return `
      <div class="decision-file-item">
        <div class="decision-file-main">
          <span class="decision-file-title">${file.name}</span>
          <span class="decision-file-type">${type}</span>
        </div>
        <div class="decision-file-meta">${formatFileSize(file.size)}</div>
      </div>`;
  }).join('');
}

/* ═══════════════════════════════════════════════════════════════
   نوافذ الإضافة المشتركة
   ═══════════════════════════════════════════════════════════════ */
function openAddAttachmentModal() {
  openModal({
    title: 'إضافة مرفق',
    body: `
      <div class="fg" style="gap:14px">
        <div class="fgrp">
          <label class="flbl">نوع المرفق <span class="req">*</span></label>
          <select class="fc">
            <option>تقرير طبي</option><option>تقرير شرطة</option><option>كشف حضور وانصراف</option>
            <option>صور</option><option>تسجيل صوتي</option><option>فيديو</option><option>وثيقة رسمية</option><option>مستند آخر</option>
          </select>
        </div>
        <div class="fgrp">
          <label class="flbl">الملف <span class="req">*</span></label>
          <input type="file" class="fc" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp3,.wav,.mp4">
          <div class="fhint">PDF, Word, صور, MP3, WAV, MP4 — الحجم الأقصى 20 ميغابايت</div>
        </div>
      </div>`,
    footer: `<button class="btn btn-primary" onclick="closeModal();showToast('تم رفع المرفق بنجاح','s')">رفع المرفق</button><button class="btn btn-ghost" onclick="closeModal()">إلغاء</button>`
  });
}

function openAddSickLeaveModal() {
  openModal({
    title: 'إضافة فترة إجازة مرضية',
    body: `
      <div class="fg fg-2" style="gap:14px">
        <div class="fgrp"><label class="flbl">من تاريخ <span class="req">*</span></label><input type="date" class="fc"></div>
        <div class="fgrp"><label class="flbl">إلى تاريخ <span class="req">*</span></label><input type="date" class="fc"></div>
        <div class="fgrp"><label class="flbl">الجهة الصحية المصدرة</label><select class="fc"><option>مستشفى السلطاني</option><option>مستشفى خولة</option><option>مستشفى الرحمة الخاص</option><option>عيادة أخرى</option></select></div>
        <div class="fgrp"><label class="flbl">رقم التقرير الطبي</label><input type="text" class="fc" placeholder="RPT-2024-XXXXXX"></div>
        <div class="fgrp span-full"><label class="flbl">ملاحظات</label><textarea class="fc" rows="2" placeholder="ملاحظات إضافية حول الفترة..."></textarea></div>
      </div>`,
    footer: `<button class="btn btn-primary" onclick="closeModal();showToast('تم إضافة فترة الإجازة المرضية','s')">حفظ الفترة</button><button class="btn btn-ghost" onclick="closeModal()">إلغاء</button>`
  });
}

function openOriginalRequest(id) {
  showToast(`فتح الطلب الأصلي ${id} في نافذة جديدة`, 'i');
}

/* ═══════════════════════════════════════════════════════════════
   الزيارات الميدانية
   ═══════════════════════════════════════════════════════════════ */
let visitStaffState = [];

function renderVisitStaffTable() {
  const container = document.getElementById('visit-staff-table-container');
  if (!container) return;
  const internalUsers = Object.values(WI_DATA.users).filter(u => u.employeeId);
  container.innerHTML = `
    <table class="dtbl" style="margin-bottom:8px;font-size:12.5px">
      <thead><tr><th>الموظف</th><th style="width:40px"></th></tr></thead>
      <tbody>
        ${visitStaffState.length === 0
          ? '<tr><td colspan="2" style="text-align:center;color:var(--text3);padding:10px">لم يتم إضافة موظفين بعد</td></tr>'
          : visitStaffState.map((name, i) => `<tr><td>${name}</td><td><button class="ibtn d" onclick="removeVisitStaff(${i})">${ICONS.trash}</button></td></tr>`).join('')}
      </tbody>
    </table>
    <div style="display:flex;gap:8px">
      <select class="fc" id="add-staff-select" style="flex:1">
        <option value="">-- اختر موظفاً لإضافته --</option>
        ${internalUsers.map(u => `<option value="${u.name}">${u.name} (${u.employeeId})</option>`).join('')}
      </select>
      <button class="btn btn-secondary btn-sm" style="white-space:nowrap" onclick="addVisitStaff()">${ICONS.plus} إضافة</button>
    </div>`;
}

function addVisitStaff() {
  const sel = document.getElementById('add-staff-select');
  if (!sel || !sel.value) return;
  if (visitStaffState.includes(sel.value)) { showToast('الموظف مضاف مسبقاً', 'w'); return; }
  visitStaffState.push(sel.value);
  renderVisitStaffTable();
}

function removeVisitStaff(index) {
  visitStaffState.splice(index, 1);
  renderVisitStaffTable();
}

function openAddVisitModal() {
  visitStaffState = [];
  openModal({
    title: 'إضافة زيارة ميدانية جديدة',
    size: 'md-lg',
    body: `
      <div class="fg fg-2" style="gap:14px">
        <div class="fgrp"><label class="flbl">تاريخ الزيارة <span class="req">*</span></label><input type="date" class="fc" value="${new Date().toISOString().split('T')[0]}"></div>
        <div class="fgrp"><label class="flbl">وقت الزيارة</label><input type="time" class="fc" value="09:00"></div>
        <div class="fgrp span-full"><label class="flbl">سبب الزيارة / الغرض <span class="req">*</span></label><textarea class="fc" rows="2" placeholder="مثال: معاينة موقع الحادث، التحقق من الشهود..."></textarea></div>
        <div class="fgrp span-full">
          <label class="flbl">الموظفون القائمون بالزيارة <span class="req">*</span></label>
          <div id="visit-staff-table-container"></div>
        </div>
        <div class="fgrp span-full"><label class="flbl">ملخص الزيارة والنتائج</label><textarea class="fc" rows="4" placeholder="اكتب ملخصاً لما تم خلال الزيارة..."></textarea></div>
        <div class="fgrp span-full">
          <label class="flbl">مرفقات الزيارة (صور، تقارير، وثائق)</label>
          ${renderModernUploadComponent({ idPrefix: 'visit-att', subTitle: 'يمكن رفع عدة صور أو مستندات PDF' })}
        </div>
      </div>`,
    footer: `<button class="btn btn-primary" onclick="closeModal();showToast('تم حفظ الزيارة الميدانية وتحديث السجل','s')">حفظ الزيارة</button><button class="btn btn-ghost" onclick="closeModal()">إلغاء</button>`
  });
  setTimeout(renderVisitStaffTable, 0);
}

/* ═══════════════════════════════════════════════════════════════
   البحث والتصفية الموحدة
   ═══════════════════════════════════════════════════════════════ */
let globalSearchTimer = null;
function handleGlobalSearch(val, callback) {
  clearTimeout(globalSearchTimer);
  globalSearchTimer = setTimeout(() => { if (callback) callback(val); }, 400);
}
function noopUnifiedSearch() {}
function noopUnifiedToggleAll() {}

function getFilteredData({ role, data, query = '', showAll = false }) {
  const stages = WI_CONFIG.roleStages[role] || [];
  const q = query.toLowerCase().trim();
  return data.filter(r => {
    const matchesSearch = !q || (
      r.id.toLowerCase().includes(q) ||
      (r.insured   && r.insured.name?.toLowerCase().includes(q)) ||
      (r.insured   && r.insured.civil?.includes(q)) ||
      (r.applicant && r.applicant.name?.toLowerCase().includes(q)) ||
      (r.employer  && r.employer.name?.toLowerCase().includes(q))
    );
    const isInStage = stages.includes(r.status);
    if (q) return matchesSearch;
    if (showAll) return matchesSearch;
    return isInStage && matchesSearch;
  });
}

function renderUnifiedFilterBar({ onSearch, onToggleAll, isAllVisible = false }) {
  return `
    <div class="filters unified-filter-panel" style="margin-bottom:20px;display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--g50);border:1px solid var(--border);border-radius:14px">
      <div class="unified-filter-row" style="display:grid;grid-template-columns:1.15fr 1fr 1fr 0.9fr 0.9fr 1.2fr auto;gap:12px;align-items:end">
        <div class="fgrp" style="margin:0">
          <label class="flbl">رقم الطلب</label>
          <input type="text" class="fc" id="global-search-input" placeholder="WI-2025-001234" oninput="handleGlobalSearch(this.value, ${onSearch})">
        </div>
        <div class="fgrp" style="margin:0">
          <label class="flbl">الرقم المدني</label>
          <input type="text" class="fc" placeholder="9012345678">
        </div>
        <div class="fgrp" style="margin:0">
          <label class="flbl">رقم السجل التجاري</label>
          <input type="text" class="fc" placeholder="1234567">
        </div>
        <div class="fgrp" style="margin:0">
          <label class="flbl">من تاريخ</label>
          <input type="date" class="fc">
        </div>
        <div class="fgrp" style="margin:0">
          <label class="flbl">إلى تاريخ</label>
          <input type="date" class="fc">
        </div>
        <div class="fgrp" style="margin:0">
          <label class="flbl">الحالة</label>
          <select class="fc"><option>جميع الحالات</option></select>
        </div>
        <div style="display:flex;align-items:center;gap:12px;justify-content:flex-end;padding-bottom:6px">
          <label class="switch-container" style="display:flex;align-items:center;gap:10px;cursor:pointer;white-space:nowrap" onclick="${onToggleAll}()">
            <span style="font-size:12.5px;font-weight:700;color:var(--text2)">عرض كافة الطلبات</span>
            <div class="switch ${isAllVisible ? 'active' : ''}" style="width:42px;height:22px;background:${isAllVisible ? 'var(--primary)' : '#cbd5e1'};border-radius:20px;position:relative;transition:.3s">
              <div style="width:16px;height:16px;background:#fff;border-radius:50%;position:absolute;top:3px;${isAllVisible ? 'right:23px' : 'right:3px'};transition:.3s;box-shadow:0 1px 3px rgba(0,0,0,0.1)"></div>
            </div>
          </label>
        </div>
      </div>
    </div>`;
}

/* ═══════════════════════════════════════════════════════════════
   Dashboard Enhancement (charts, current-work table)
   ═══════════════════════════════════════════════════════════════ */
function bucketEntries(entries, getter) {
  const map = new Map();
  entries.forEach(e => { const key = getter(e) || 'أخرى'; map.set(key, (map.get(key) || 0) + 1); });
  return [...map.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
}

function pickChartPalette(count) {
  const p = ['#0a5c36','#12a865','#c7a94e','#0f6f8f','#c0392b','#7c3aed','#0f766e','#b45309'];
  return Array.from({ length: count }, (_, i) => p[i % p.length]);
}

function normalizeDateKey(value) {
  if (!value) return null;
  const raw = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) return raw.slice(0, 7);
  return null;
}

function buildMonthBuckets(entries, dateGetter) {
  const m = new Map();
  entries.forEach(e => { const k = normalizeDateKey(dateGetter(e)); if (k) m.set(k, (m.get(k) || 0) + 1); });
  return [...m.entries()].sort((a,b) => a[0].localeCompare(b[0])).slice(-6).map(([label, value]) => ({ label, value }));
}

function findRequestById(id) {
  return WI_DATA.allowances.find(r => r.id === id) || WI_DATA.disability.find(r => r.id === id)
      || WI_DATA.appeals.find(r => r.id === id)    || WI_DATA.licensing.find(r => r.id === id) || null;
}

function getDashboardEntityName(item) {
  return item.insured?.name || item.applicant?.name || item.institution?.name || item.delegate?.name || item.name || item.id || '—';
}
function getDashboardDate(item)     { return item.submitDate || item.date || item.lastUpdate || null; }
function getDashboardCategory(item) { return item.type || item.requestType || item.originalRequestType || item.institution || item.subtype || 'أخرى'; }

function getRoleDataset(role) {
  const users = WI_DATA.users;
  const workerCivil   = users.worker?.civil;
  const employerCivil = users.employer_delegate?.civil;
  const licensingStatuses = ['تم إحالة الطلب إلى اللجنة الطبية الإشرافية — بانتظار جدولة جلسة','تم جدولة جلسة اللجنة الطبية الإشرافية','تم اتخاذ القرار من اللجنة الطبية الإشرافية — بانتظار تنفيذ القرار','تم اعتماد الترخيص — الترخيص نشط','مسودة','تم تقديم طلب الترخيص / التجديد — بانتظار مراجعة موظف قسم التراخيص والرقابة','بانتظار اعتماد رئيس قسم التراخيص والرقابة'];
  switch (role) {
    case 'worker':           return { scopeLabel: 'طلباتك الحالية', entries: [...WI_DATA.allowances.filter(r => r.applicant?.civil === workerCivil || r.insured?.civil === workerCivil), ...WI_DATA.disability.filter(r => r.applicant?.civil === workerCivil), ...WI_DATA.appeals.filter(r => r.applicant?.civil === workerCivil)] };
    case 'employer-delegate':return { scopeLabel: 'طلبات جهة العمل', entries: [...WI_DATA.allowances.filter(r => r.employer?.cr === users.employer_delegate?.cr), ...WI_DATA.appeals.filter(a => a.applicant?.civil === employerCivil)] };
    case 'injury-investigator': return { scopeLabel: 'ملف إصابات العمل', entries: WI_DATA.allowances.filter(r => r.type === 'إصابة عمل') };
    case 'injury-head':      return { scopeLabel: 'طلبات إصابات العمل', entries: WI_DATA.allowances.filter(r => r.type === 'إصابة عمل') };
    case 'od-investigator':  return { scopeLabel: 'ملف الأمراض المهنية', entries: WI_DATA.allowances.filter(r => r.type === 'مرض مهني') };
    case 'od-head':          return { scopeLabel: 'طلبات الأمراض المهنية', entries: WI_DATA.allowances.filter(r => r.type === 'مرض مهني') };
    case 'sickleave-employee':
    case 'sickleave-head':   return { scopeLabel: 'طلبات الإجازات المرضية', entries: WI_DATA.allowances.filter(r => r.status.includes('الإجازات المرضية') || (r.sickLeavePeriods && r.sickLeavePeriods.length)) };
    case 'disability-employee':
    case 'disability-head':  return { scopeLabel: 'طلبات منفعة الإعاقة', entries: WI_DATA.disability };
    case 'committees-employee':
    case 'committees-head':  return { scopeLabel: 'ملفات اللجان الطبية', entries: [...WI_DATA.allowances.filter(r => r.status.includes('اللجان الطبية') || r.status.includes('المؤسسات الصحية المرخصة')), ...WI_DATA.appeals] };
    case 'licensing-employee':
    case 'licensing-head':
    case 'hospital-delegate':
    case 'supervisory-committee':
    case 'supervisory-rapporteur': return { scopeLabel: 'طلبات التراخيص', entries: WI_DATA.licensing.filter(r => licensingStatuses.includes(r.status) || r.status) };
    case 'licensed-institution':
    case 'institution-rapporteur': return { scopeLabel: 'الجلسات الطبية', entries: WI_DATA.sessions };
    case 'appeals-committee':
    case 'appeals-rapporteur':     return { scopeLabel: 'ملفات التظلمات', entries: WI_DATA.appeals };
    default: return { scopeLabel: 'الملفات الحالية', entries: [] };
  }
}

function renderDashboardDonutChart(items, title, centerLabel) {
  if (!items.length) return '';
  const total = items.reduce((s, i) => s + i.value, 0);
  const radius = 44, circumference = 2 * Math.PI * radius;
  let offset = 0;
  const colors = pickChartPalette(items.length);
  const segments = items.map((item, idx) => {
    const arc = (item.value / total) * circumference;
    const seg = `<circle cx="70" cy="70" r="${radius}" fill="none" stroke="${colors[idx]}" stroke-width="14" stroke-linecap="round" stroke-dasharray="${arc} ${circumference}" stroke-dashoffset="${-offset}" transform="rotate(-90 70 70)"></circle>`;
    offset += arc;
    return seg;
  }).join('');
  return `
    <div class="chart-card">
      <div class="chart-head"><h3>${title}</h3><span>${total} عنصر</span></div>
      <div class="chart-donut-wrap">
        <svg class="chart-donut" viewBox="0 0 140 140" aria-hidden="true">
          <circle cx="70" cy="70" r="${radius}" fill="none" stroke="#e5efe9" stroke-width="14"></circle>
          ${segments}
        </svg>
        <div class="chart-donut-center"><strong>${total}</strong><span>${centerLabel}</span></div>
      </div>
      <div class="chart-legend">
        ${items.map((item, idx) => `<div class="chart-legend-item"><span class="chart-swatch" style="background:${colors[idx]}"></span><span class="chart-legend-label">${item.label}</span><strong>${item.value}</strong></div>`).join('')}
      </div>
    </div>`;
}

function renderDashboardBars(items, title, mode = 'value') {
  if (!items.length) return '';
  const max = Math.max(...items.map(i => i.value), 1);
  return `
    <div class="chart-card">
      <div class="chart-head"><h3>${title}</h3><span>${items.length} فئة</span></div>
      <div class="chart-bars ${mode === 'months' ? 'months' : ''}">
        ${items.map((item, idx) => `
          <div class="chart-bar-row">
            <div class="chart-bar-meta"><span>${item.label}</span><strong>${item.value}</strong></div>
            <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${(item.value/max)*100}%;background:${pickChartPalette(items.length)[idx]}"></div></div>
          </div>`).join('')}
      </div>
    </div>`;
}

function renderDashboardInsights(role) {
  const { scopeLabel, entries } = getRoleDataset(role);
  if (!entries.length) return '';
  const statusBuckets   = bucketEntries(entries, i => i.status).slice(0, 5);
  const categoryBuckets = bucketEntries(entries, i => getDashboardCategory(i)).slice(0, 5);
  const monthBuckets    = buildMonthBuckets(entries, i => getDashboardDate(i));
  if (!statusBuckets.length && !categoryBuckets.length && !monthBuckets.length) return '';
  return `
    <div class="dashboard-insights">
      ${renderDashboardDonutChart(statusBuckets,   `توزيع الحالات — ${scopeLabel}`, 'حالة')}
      ${renderDashboardBars(categoryBuckets, `التوزيع حسب النوع — ${scopeLabel}`)}
      ${renderDashboardBars(monthBuckets,    'الحركة الزمنية لآخر 6 أشهر', 'months')}
    </div>`;
}

function buildCurrentWorkTable(rows) {
  return `
    <div class="card dashboard-card-wide dashboard-current-work">
      <div class="ph"><h3><div class="pico bl">${ICONS.lock}</div>الطلبات الجاري العمل عليها حاليا</h3></div>
      <div class="pb-0">
        <div class="tbl-wrap">
          <table class="dtbl">
            <thead><tr><th>رقم الطلب</th><th>صاحب الطلب / الجهة</th><th>الحالة الحالية</th><th>آخر تحديث</th><th></th></tr></thead>
            <tbody>
              ${rows.map(row => `
                <tr>
                  <td style="font-family:monospace;font-weight:700;color:var(--primary)">${row.id}</td>
                  <td>${row.name}</td>
                  <td>${row.statusHtml}</td>
                  <td style="font-size:12px;color:var(--text3)">${row.lastUpdate || '—'}</td>
                  <td><a class="btn btn-primary btn-xs" href="${row.href}">فتح التفاصيل</a></td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
}

function replaceCheckedOutSummary(content) {
  const alerts = [...content.querySelectorAll('.alert')].filter(a => a.textContent.includes('الطلبات التي حجزتها حالياً') || a.textContent.includes('الطلبات الجاري العمل عليها حاليا'));
  alerts.forEach((alert) => {
    const anchors = [...alert.querySelectorAll('a[href]')];
    if (!anchors.length) { alert.innerHTML = alert.innerHTML.replace('الطلبات التي حجزتها حالياً', 'الطلبات الجاري العمل عليها حاليا'); return; }
    const rows = anchors.map((anchor) => {
      const id  = anchor.textContent.trim();
      const req = findRequestById(id);
      return { id, href: anchor.getAttribute('href'), name: req ? getDashboardEntityName(req) : '—', statusHtml: req ? statusBadge(req.status || '—') : '—', lastUpdate: req ? (req.lastUpdate || req.submitDate || '—') : '—' };
    });
    const wrapper = document.createElement('div');
    wrapper.innerHTML = buildCurrentWorkTable(rows);
    alert.replaceWith(wrapper.firstElementChild);
  });
}

function normalizeDashboardTableWidths(content) {
  [...content.children].forEach((child) => {
    if (child.tagName === 'DIV' && (child.getAttribute('style') || '').includes('display:grid')) {
      child.classList.add('dashboard-auto-grid');
      child.querySelectorAll('.card').forEach((card) => { if (card.querySelector('.dtbl')) card.classList.add('dashboard-card-wide'); });
    }
  });
}

let dashboardEnhanceQueued = false;
function enhanceDashboardContent() {
  if (typeof CURRENT_PAGE === 'undefined' || CURRENT_PAGE !== 'dashboard') return;
  const content = getContent();
  if (!content || !content.children.length) return;
  replaceCheckedOutSummary(content);
  normalizeDashboardTableWidths(content);
  const statsGrid = content.querySelector('.stats-grid');
  if (statsGrid && !content.querySelector('.dashboard-insights')) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = renderDashboardInsights(CURRENT_ROLE);
    if (wrapper.firstElementChild) statsGrid.insertAdjacentElement('afterend', wrapper.firstElementChild);
  }
}

function queueDashboardEnhancement() {
  if (dashboardEnhanceQueued) return;
  dashboardEnhanceQueued = true;
  setTimeout(() => { dashboardEnhanceQueued = false; enhanceDashboardContent(); }, 0);
}

function enhanceListContent() {
  if (typeof CURRENT_PAGE === 'undefined') return;
  const page = String(CURRENT_PAGE || '');
  if (!page.includes('list')) return;
  const content = getContent();
  if (!content) return;
  if (content.querySelector('.unified-filter-panel')) return;
  const existingFilters = content.querySelector('.filters');
  if (!existingFilters) return;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = renderUnifiedFilterBar({ onSearch: 'noopUnifiedSearch', onToggleAll: 'noopUnifiedToggleAll', isAllVisible: true });
  const unified = wrapper.firstElementChild;
  if (!unified) return;
  existingFilters.replaceWith(unified);
}

(function setupDashboardObserver() {
  const run = () => { queueDashboardEnhancement(); enhanceListContent(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
  const observer = new MutationObserver(() => { if (typeof CURRENT_PAGE !== 'undefined' && CURRENT_PAGE === 'dashboard') run(); });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();

/* Check-out / Check-in helpers (used by investigator pages) */
function doCheckout() {
  confirmAction({
    title: 'حجز الطلب (Check-out)',
    msg: 'هل تريد حجز هذا الطلب للعمل عليه؟ لن يتمكن موظف آخر من اتخاذ إجراء حتى يتم تحريره.',
    confirmLabel: 'نعم، احجز الطلب',
    confirmClass: 'btn-primary',
    onConfirm: () => { showToast('تم حجز الطلب بنجاح', 's'); setTimeout(() => window.location.reload(), 1200); }
  });
}

function doCheckin() {
  confirmAction({
    title: 'تحرير الطلب (Check-in)',
    msg: 'هل تريد تحرير هذا الطلب؟ سيتمكن الآخرون من العمل عليه بعد التحرير.',
    confirmLabel: 'نعم، حرّر الطلب',
    confirmClass: 'btn-secondary',
    onConfirm: () => { showToast('تم تحرير الطلب', 'i'); setTimeout(() => window.location.reload(), 1200); }
  });
}
