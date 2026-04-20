/* ================================================================
   layout.js — Header + Sidebar + Navigation
   ================================================================ */

let CURRENT_ROLE = null;
let CURRENT_PAGE = null;
let CURRENT_BREADCRUMB = [];

/* ── SVG Icons ── */
const ICONS = {
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>`,
  list: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
  inbox: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22,12 16,12 14,15 10,15 8,12 2,12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  pen: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
  file: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>`,
  clipboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>`,
  refresh: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23,4 23,10 17,10"/><polyline points="1,20 1,14 7,14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  logout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  switch: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17,1 21,5 17,9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7,23 3,19 7,15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20,6 9,17 4,12"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  warn: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  unlock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`,
  note: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  map: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`,
  arrow_right: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>`,
  arrow_left: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>`,
  upload: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16,16 12,12 8,16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>`,
  medical: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="18"/><path d="M16 8h4l3 13H16z"/><line x1="5" y1="7" x2="5" y2="7"/><line x1="9" y1="7" x2="9" y2="7"/><line x1="5" y1="11" x2="5" y2="11"/><line x1="9" y1="11" x2="9" y2="11"/><line x1="5" y1="15" x2="9" y2="15"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
};

/* ── إنشاء التخطيط الرئيسي ── */
function initLayout({ role, activePage, breadcrumb = [] }) {
  CURRENT_ROLE = role;
  CURRENT_PAGE = activePage;
  CURRENT_BREADCRUMB = breadcrumb;

  const roleConfig = WI_CONFIG.roles[role];
  if (!roleConfig) { console.error('Role not found:', role); return; }

  const userData = getUserData(role);

  document.body.innerHTML = `
    <div id="app">
      ${buildHeader(roleConfig, userData)}
      <div id="app-body">
        ${buildSidebar(roleConfig, activePage)}
        <div id="app-content"></div>
      </div>
    </div>
    <div id="toast-ct"></div>
  `;

  bindHeaderEvents();
}

function getUserData(role) {
  const map = {
    'worker': WI_DATA.users.worker,
    'employer-delegate': WI_DATA.users.employer_delegate,
    'injury-investigator': WI_DATA.users.injury_investigator,
    'injury-head': WI_DATA.users.injury_head,
    'od-investigator': WI_DATA.users.od_investigator,
    'od-head': WI_DATA.users.od_head,
    'sickleave-employee': WI_DATA.users.sickleave_employee,
    'sickleave-head': WI_DATA.users.sickleave_head,
    'disability-employee': WI_DATA.users.disability_employee,
    'disability-head': WI_DATA.users.disability_head,
    'committees-employee': WI_DATA.users.committees_employee,
    'committees-head': WI_DATA.users.committees_head,
    'licensing-employee': WI_DATA.users.licensing_employee,
    'licensing-head': WI_DATA.users.licensing_head,
    'licensed-institution': WI_DATA.users.licensed_institution,
    'supervisory-committee': WI_DATA.users.supervisory_committee,
    'appeals-committee': WI_DATA.users.appeals_committee,
    'hospital-delegate': WI_DATA.users.hospital_delegate,
    'institution-rapporteur': WI_DATA.users.institution_rapporteur,
    'appeals-rapporteur': WI_DATA.users.appeals_rapporteur,
    'supervisory-rapporteur': WI_DATA.users.supervisory_rapporteur,
  };
  return map[role] || { name: 'مستخدم النظام', civil: '' };
}

function buildHeader(roleConfig, userData) {
  const notifications = [
    { text: 'تم إعادة الطلب WI-2025-001301 لاستيفاء البيانات', time: 'منذ ساعة', unread: true },
    { text: 'طلب جديد WI-2025-001234 يحتاج مراجعتك', time: 'منذ ساعتين', unread: true },
    { text: 'تم اعتماد الطلب WI-2025-001089 وصرف المستحقات', time: 'أمس', unread: false },
  ];
  const notifCount = notifications.filter(n => n.unread).length;
  return `
  <div id="app-header">
    <div class="h-logo" onclick="goHome()">
      <div class="h-logo-icon">${ICONS.shield}</div>
      <div>
        <div class="h-logo-name">صندوق الحماية الاجتماعية</div>
        <div class="h-logo-sub">نظام إدارة إصابات العمل</div>
      </div>
    </div>
    <div class="h-bc" id="header-breadcrumb">
      <span class="bc-item bc-lnk" onclick="goHome()">الرئيسية</span>
      <span class="bc-sep">/</span>
      <span class="bc-item bc-cur" id="bc-current">لوحة البيانات</span>
    </div>
    <div class="h-acts">
      <button class="hbtn" onclick="showMedicalQuery()" title="استعلام التقارير الطبية" ${roleConfig.type === 'external' ? 'style="display:none"' : ''}>
        ${ICONS.medical}
      </button>
      <button class="hbtn" onclick="showNotifications(event)">
        ${ICONS.bell}
        ${notifCount > 0 ? `<span class="nbadge">${notifCount}</span>` : ''}
      </button>
      <div class="u-chip" onclick="showUserMenu()">
        <div class="u-av">${roleConfig.avatarInitials}</div>
        <div>
          <div class="u-name">${userData.name}</div>
          <div class="u-role">${roleConfig.nameAr}</div>
        </div>
      </div>
    </div>
    <div class="notification-panel" id="notification-panel" onclick="event.stopPropagation()">
      <div class="panel-header">
        <span>الإشعارات</span>
        <span style="font-size:.72rem;color:var(--text3);font-weight:600;cursor:pointer">عرض الكل</span>
      </div>
      <div class="panel-body">
        ${notifications.map(n => `
          <div class="notif-item ${n.unread ? 'unread' : ''}">
            <div class="notif-title">${n.text}</div>
            <div class="notif-time">${n.time}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>`;
}

function buildSidebar(roleConfig, activePage) {
  let html = `<div id="app-sb">
    <div class="sb-rb">
      <div class="rb-lbl">${roleConfig.type === 'internal' ? 'موظف داخلي' : 'مستخدم خارجي'}</div>
      <div class="rb-name">${roleConfig.nameAr}</div>
    </div>
    <div class="sb-nav">`;

  for (const item of roleConfig.sidebar) {
    if (item.section) continue;
    const isActive = item.page === activePage;
    const icon = ICONS[item.icon] || ICONS.list;
    html += `
      <div class="nav-i ${isActive ? 'act' : ''}" onclick="navigateTo('${item.page}')">
        ${icon}
        <span>${item.label}</span>
      </div>`;
  }

  html += `</div>
    <div class="sb-bot">
      <div class="sw-role-btn" onclick="switchRole()">
        ${ICONS.switch}
        <span>تغيير الدور</span>
      </div>
    </div>
  </div>`;
  return html;
}

/* ── تحديث الـ Breadcrumb ── */
function setBreadcrumb(items) {
  const bcEl = document.getElementById('header-breadcrumb');
  const bcCurrent = document.getElementById('bc-current');
  if (!bcEl) return;

  let html = `<span class="bc-item bc-lnk" onclick="goHome()">الرئيسية</span>`;
  for (let i = 0; i < items.length; i++) {
    html += `<span class="bc-sep">/</span>`;
    if (i === items.length - 1) {
      html += `<span class="bc-item bc-cur">${items[i].label}</span>`;
    } else {
      html += `<span class="bc-item bc-lnk" onclick="navigateTo('${items[i].page}')">${items[i].label}</span>`;
    }
  }
  bcEl.innerHTML = html;
}

/* ── تحديث عنصر التنقل النشط ── */
function setActivePage(page) {
  document.querySelectorAll('.nav-i').forEach(el => el.classList.remove('act'));
  const items = document.querySelectorAll('.nav-i');
  items.forEach(el => {
    if (el.getAttribute('onclick') && el.getAttribute('onclick').includes(`'${page}'`)) {
      el.classList.add('act');
    }
  });
}

/* ── توجيه التنقل ── */
function navigateTo(page) {
  const roleConfig = WI_CONFIG.roles[CURRENT_ROLE];
  if (!roleConfig) return;
  const folder = roleConfig.folder;
  window.location.href = `../${folder}/${page}.html`;
}

function goHome() {
  const roleConfig = WI_CONFIG.roles[CURRENT_ROLE];
  if (!roleConfig) {
    window.location.href = '../shared/role-selection.html';
    return;
  }
  window.location.href = `../${roleConfig.folder}/dashboard.html`;
}

function switchRole() {
  window.location.href = '../shared/role-selection.html';
}

function showMedicalQuery() {
  window.location.href = '../shared/medical-query.html';
}

function bindHeaderEvents() {
  document.addEventListener('click', () => closeNotifications());
}

/* ── Toast Notifications ── */
function showToast(msg, type = 'i', duration = 3500) {
  const ct = document.getElementById('toast-ct');
  if (!ct) return;
  const iconMap = { s: ICONS.check, d: ICONS.x, w: ICONS.warn, i: ICONS.info };
  const id = 'toast-' + Date.now();
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.id = id;
  el.innerHTML = `${iconMap[type] || ICONS.info}<span class="toast-msg">${msg}</span><span class="toast-x" onclick="document.getElementById('${id}').remove()">${ICONS.x}</span>`;
  ct.appendChild(el);
  setTimeout(() => { if (document.getElementById(id)) document.getElementById(id).remove(); }, duration);
}

/* ── Modals ── */
function openModal({ title, body, footer, size = '' }) {
  closeModal();
  const overlay = document.createElement('div');
  overlay.className = 'mo';
  overlay.id = 'active-modal';
  overlay.innerHTML = `
    <div class="md ${size}" onclick="event.stopPropagation()">
      <div class="md-hd">
        <h3>${title}</h3>
        <div class="md-x" onclick="closeModal()">${ICONS.x}</div>
      </div>
      <div class="md-b">${body}</div>
      ${footer ? `<div class="md-ft">${footer}</div>` : ''}
    </div>`;
  overlay.addEventListener('click', closeModal);
  document.body.appendChild(overlay);
}

function closeModal() {
  const m = document.getElementById('active-modal');
  if (m) m.remove();
}

/* ── Confirm Dialog ── */
function confirmAction({ title, msg, confirmLabel, confirmClass = 'btn-primary', onConfirm }) {
  openModal({
    title: title,
    body: `<p style="font-size:13.5px;color:var(--text2);line-height:1.7">${msg}</p>`,
    footer: `
      <button class="btn ${confirmClass}" onclick="(${onConfirm.toString()})(); closeModal();">${confirmLabel}</button>
      <button class="btn btn-ghost" onclick="closeModal()">إلغاء</button>
    `
  });
}

/* ── Add Note Modal ── */
function openAddNoteModal(requestId, onSave) {
  openModal({
    title: 'إضافة ملاحظة تشغيلية',
    body: `
      <div class="alert alert-i" style="margin-bottom:12px">
        ${ICONS.info}
        <span>الملاحظة التشغيلية لا تغيّر حالة الطلب وتكون مرئية لجميع الأدوار ذات الصلاحية.</span>
      </div>
      <div class="fgrp">
        <label class="flbl">نص الملاحظة <span class="req">*</span></label>
        <textarea class="fc" id="note-text-input" placeholder="اكتب ملاحظتك هنا..." rows="4"></textarea>
      </div>`,
    footer: `
      <button class="btn btn-primary" onclick="saveNote('${requestId}', ${onSave ? onSave.toString() : 'null'})">
        ${ICONS.check} حفظ الملاحظة
      </button>
      <button class="btn btn-ghost" onclick="closeModal()">إلغاء</button>`
  });
}

function saveNote(requestId, cb) {
  const txt = document.getElementById('note-text-input');
  if (!txt || !txt.value.trim()) {
    showToast('يرجى كتابة الملاحظة أولاً', 'w');
    return;
  }
  closeModal();
  showToast('تم حفظ الملاحظة بنجاح', 's');
  if (cb) cb(txt.value.trim());
}

/* ── Notifications Panel ── */
function closeNotifications() {
  const panel = document.getElementById('notification-panel');
  if (!panel) return;
  panel.classList.remove('show');
}

function showNotifications(event) {
  if (event) event.stopPropagation();
  const panel = document.getElementById('notification-panel');
  if (!panel) return;
  panel.classList.toggle('show');
}

function showUserMenu() {
  const roleConfig = WI_CONFIG.roles[CURRENT_ROLE];
  openModal({
    title: 'إعدادات الحساب',
    body: `
      <div style="text-align:center;margin-bottom:16px">
        <div style="width:60px;height:60px;border-radius:50%;background:var(--primary);color:#fff;font-size:20px;font-weight:700;display:flex;align-items:center;justify-content:center;margin:0 auto 10px">${roleConfig.avatarInitials}</div>
        <p style="font-size:14px;font-weight:700;color:var(--text)">${getUserData(CURRENT_ROLE).name}</p>
        <p style="font-size:12px;color:var(--text3)">${roleConfig.nameAr}</p>
      </div>
      <div class="divider"></div>
      <div style="display:flex;flex-direction:column;gap:6px">
        <button class="btn btn-ghost" style="justify-content:flex-start;gap:10px" onclick="switchRole(); closeModal();">${ICONS.switch} تغيير الدور</button>
        <button class="btn btn-ghost btn-sm" style="justify-content:flex-start;gap:10px;color:var(--danger)" onclick="window.location.href='../index.html'">${ICONS.logout} تسجيل الخروج</button>
      </div>`,
    footer: `<button class="btn btn-ghost btn-sm" onclick="closeModal()">إغلاق</button>`
  });
}

/* ── Status Badge Helper ── */
function statusBadge(status) {
  const cls = WI_CONFIG.statusBadges[status] || 'b-draft';
  const shortStatus = status.length > 45 ? status.substring(0, 42) + '...' : status;
  return `<span class="badge ${cls}" title="${status}">${shortStatus}</span>`;
}

/* ── Format Date ── */
function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('ar-OM', { year: 'numeric', month: 'long', day: 'numeric' });
}

/* ── Format Time ── */
function formatDateTime(d) {
  if (!d) return '—';
  const parts = d.split(' ');
  return formatDate(parts[0]) + (parts[1] ? ` — ${parts[1]}` : '');
}

/* ── Content Getter ── */
function getContent() {
  return document.getElementById('app-content');
}

function renderContent(html) {
  const ct = getContent();
  if (ct) ct.innerHTML = html;
}
