/* ================================================================
   layout.js — Header + Sidebar + Navigation
   نظام إدارة التفتيش — صندوق الحماية الاجتماعية
   ================================================================ */

let CURRENT_ROLE = null;
let CURRENT_PAGE = null;
let CURRENT_AVAILABILITY_STATE = null;

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
  bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  logout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  switch: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17,1 21,5 17,9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7,23 3,19 7,15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20,6 9,17 4,12"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  warn: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
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
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="18"/><path d="M16 8h4l3 13H16z"/><line x1="5" y1="7" x2="5" y2="7"/><line x1="9" y1="7" x2="9" y2="7"/><line x1="5" y1="11" x2="5" y2="11"/><line x1="9" y1="11" x2="9" y2="11"/><line x1="5" y1="15" x2="9" y2="15"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  video: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23,7 16,12 23,17 23,7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  filter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/></svg>`,
  escalate: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17,11 12,6 7,11"/><polyline points="17,18 12,13 7,18"/></svg>`,
};

/* ── إنشاء التخطيط الرئيسي ── */
function initLayout({ role, activePage, breadcrumb = [] }) {
  CURRENT_ROLE = role;
  CURRENT_PAGE = activePage;

  const roleConfig = INSP_CONFIG.roles[role];
  if (!roleConfig) { console.error('Role not found:', role); return; }

  const userData = INSP_DATA.users[role] || { name: 'مستخدم النظام', civil: '' };

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

  if (breadcrumb && breadcrumb.length) setBreadcrumb(breadcrumb);
  bindHeaderEvents();
}

function buildHeader(roleConfig, userData) {
  const notifications = [
    { text: 'تم تسجيل بلاغ جديد INSP-BLG-2025-0006 من وزارة الموارد البشرية', time: 'منذ ساعة', unread: true },
    { text: 'الزيارة ZYR-DWR-2025-0002 تنتظر مراجعة المحضر', time: 'منذ ساعتين', unread: true },
    { text: 'تم قبول التظلم INSP-TZL-2024-0089 وجدولة زيارة إعادة فحص', time: 'أمس', unread: false },
  ];
  const profileSwitch = roleConfig.type === 'external' ? buildProfileSwitch(roleConfig) : '';
  const availabilityBadge = roleConfig.type === 'internal' ? buildAvailabilityBadge(roleConfig) : '';
  const notifCount = notifications.filter(n => n.unread).length;
  return `
  <div id="app-header">
    <div class="h-logo" onclick="goHome()">
      <div class="h-logo-icon">${ICONS.shield}</div>
      <div>
        <div class="h-logo-name">صندوق الحماية الاجتماعية</div>
        <div class="h-logo-sub">نظام إدارة التفتيش</div>
      </div>
    </div>
    <div class="h-bc" id="header-breadcrumb">
      <span class="bc-item bc-lnk" onclick="goHome()">الرئيسية</span>
      <span class="bc-sep">/</span>
      <span class="bc-item bc-cur" id="bc-current">لوحة البيانات</span>
    </div>
    <div class="h-acts">
      ${profileSwitch}
      ${availabilityBadge}
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

function getAvailabilitySampleState(role) {
  const states = {
    'fund-staff': { status: 'متاح', reason: 'استقبال ومتابعة داخلية' },
    'monitoring-employee': { status: 'متاح', reason: 'متواجد على النظام' },
    'monitoring-head': { status: 'في اجتماع', reason: 'اجتماع متابعة الأداء' },
    'field-inspector': { status: 'في مهمة', reason: 'زيارة مفاجئة قيد التنفيذ' },
    'field-head': { status: 'متاح', reason: 'متابعة محاضر اليوم' },
    'inspection-director': { status: 'متاح', reason: 'متاحة للاعتماد والتصعيد' },
    'ops-analyst': { status: 'غير متاح', reason: 'إعداد تحليل مخاطر' }
  };
  return states[role] || { status: 'متاح', reason: 'متواجد على النظام' };
}

function availabilityStatusClass(status) {
  return status === 'متاح' ? 'b-approved'
    : status === 'غير متاح' ? 'b-away'
    : status === 'في مهمة' ? 'b-break'
    : status === 'في اجتماع' ? 'b-meeting'
    : 'b-draft';
}

function buildAvailabilityBadge(roleConfig) {
  CURRENT_AVAILABILITY_STATE = getAvailabilitySampleState(CURRENT_ROLE);
  return `<button class="h-availability-badge" onclick="openAvailabilitySwitcher()" title="${CURRENT_AVAILABILITY_STATE.reason}">
    <span>حالتي</span>
    <span id="header-availability-status" class="badge ${availabilityStatusClass(CURRENT_AVAILABILITY_STATE.status)}">${CURRENT_AVAILABILITY_STATE.status}</span>
  </button>`;
}

function buildProfileSwitch(roleConfig) {
  const optionsByRole = {
    'insured': [
      { value: 'insured-self', label: 'مؤمن عليه' },
      { value: 'delegated-employer-1', label: 'مفوض عن شركة النور للتجارة' },
      { value: 'delegated-employer-2', label: 'مفوض عن مؤسسة البناء المتكاملة' },
    ],
    'employer': [
      { value: 'employer-primary', label: 'جهة العمل الحالية' },
      { value: 'delegated-employer-2', label: 'مفوض عن مؤسسة البناء المتكاملة' },
      { value: 'insured-self', label: 'مؤمن عليه' },
    ]
  };
  const options = optionsByRole[CURRENT_ROLE] || [];
  if (!options.length) return '';
  return `<div class="h-profile-switch" title="نموذج استرشادي فقط — لا يغير الصلاحيات فعلياً">
    <label for="sample-profile-switch">الصفة الفعالة</label>
    <select id="sample-profile-switch" onchange="handleProfileSwitchSample(this)">
      ${options.map((opt, idx) => `<option value="${opt.value}" ${idx === 0 ? 'selected' : ''}>${opt.label}</option>`).join('')}
    </select>
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
    const isActive = _pageKey(item.page) === _pageKey(activePage);
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

function _pageKey(page) {
  if (!page) return '';
  return String(page).replace(/^.*\//, '').replace(/\.html$/, '');
}

/* ── تحديث الـ Breadcrumb ── */
function setBreadcrumb(items) {
  const bcEl = document.getElementById('header-breadcrumb');
  if (!bcEl) return;
  let html = `<span class="bc-item bc-lnk" onclick="goHome()">الرئيسية</span>`;
  for (let i = 0; i < items.length; i++) {
    html += `<span class="bc-sep">/</span>`;
    if (i === items.length - 1) {
      html += `<span class="bc-item bc-cur">${items[i].label}</span>`;
    } else {
      const clickHandler = items[i].onclick
        ? items[i].onclick
        : (items[i].page ? `navigateTo('${items[i].page}')` : '');
      html += `<span class="bc-item bc-lnk" ${clickHandler ? `onclick="${clickHandler}"` : ''}>${items[i].label}</span>`;
    }
  }
  bcEl.innerHTML = html;
}

/* ── توجيه التنقل ── */
function navigateTo(page, query) {
  const roleConfig = INSP_CONFIG.roles[CURRENT_ROLE];
  if (!roleConfig) return;
  const params = new URLSearchParams(query || '');
  if (page.startsWith('../services/')) {
    params.set('role', CURRENT_ROLE);
  }
  const qs = params.toString() ? '?' + params.toString() : '';
  if (page.startsWith('../')) { window.location.href = page + '.html' + qs; return; }
  window.location.href = `../${roleConfig.folder}/${page}.html${qs}`;
}

function goHome() {
  const roleConfig = INSP_CONFIG.roles[CURRENT_ROLE];
  if (!roleConfig) { window.location.href = '../role-selection.html'; return; }
  if (roleConfig.folder === 'fund-staff') {
    window.location.href = `../fund-staff/complaints-list.html`;
  } else {
    window.location.href = `../${roleConfig.folder}/dashboard.html`;
  }
}

function switchRole() {
  window.location.href = '../role-selection.html';
}

function handleProfileSwitchSample(selectEl) {
  if (!selectEl) return;
  const label = selectEl.options[selectEl.selectedIndex] ? selectEl.options[selectEl.selectedIndex].text : 'الصفة المختارة';
  showToast('تم تبديل الصفة الاسترشادية إلى: ' + label + ' — النموذج لا يغير الصلاحيات فعلياً', 'i');
}

function openAvailabilitySwitcher() {
  if (!CURRENT_ROLE || !INSP_CONFIG.roles[CURRENT_ROLE] || INSP_CONFIG.roles[CURRENT_ROLE].type !== 'internal') return;
  const current = CURRENT_AVAILABILITY_STATE || getAvailabilitySampleState(CURRENT_ROLE);
  const options = ['متاح', 'غير متاح', 'في مهمة', 'في اجتماع'];
  openModal({
    title: 'تحديث الحالة الحالية',
    body: `
      <div class="alert alert-i" style="margin-bottom:12px">${ICONS.info}<span>تبديل سريع من الهيدر — نموذج استرشادي.</span></div>
      <div style="font-size:12px;color:var(--text3);margin-bottom:8px">الحالة الحالية: <span class="badge ${availabilityStatusClass(current.status)}">${current.status}</span></div>
      <div class="availability-switcher-grid">
        ${options.map(function(option) {
          return `<button class="availability-switcher-option" onclick="applyAvailabilitySample('${option}')">${option}</button>`;
        }).join('')}
      </div>
      <div class="fgrp" style="margin-top:12px">
        <label class="flbl">ملاحظة مختصرة</label>
        <input class="fc" id="availability-quick-reason" value="${current.reason || ''}" placeholder="اختياري">
      </div>
    `,
    footer: `<button class="btn btn-ghost btn-sm" onclick="closeModal()">إغلاق</button>`
  });
}

function applyAvailabilitySample(status) {
  const reasonInput = document.getElementById('availability-quick-reason');
  const reason = reasonInput && reasonInput.value.trim() ? reasonInput.value.trim() : 'بدون ملاحظة إضافية';
  CURRENT_AVAILABILITY_STATE = { status: status, reason: reason };
  const badge = document.getElementById('header-availability-status');
  const badgeWrap = badge ? badge.closest('.h-availability-badge') : null;
  if (badge) {
    badge.className = 'badge ' + availabilityStatusClass(status);
    badge.textContent = status;
  }
  if (badgeWrap) {
    badgeWrap.title = reason;
  }
  closeModal();
  showToast('تم تحديث الحالة الحالية إلى: ' + status + ' (نموذج استرشادي)', 's');
}

function bindHeaderEvents() {
  document.addEventListener('click', () => closeNotifications());
}

/* ── Toast ── */
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
  setTimeout(() => { const t = document.getElementById(id); if (t) t.remove(); }, duration);
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

function confirmAction({ title, msg, confirmLabel, confirmClass = 'btn-primary', onConfirm }) {
  openModal({
    title,
    body: `<p style="font-size:13.5px;color:var(--text2);line-height:1.7">${msg}</p>`,
    footer: `
      <button class="btn ${confirmClass}" onclick="(${onConfirm.toString()})(); closeModal();">${confirmLabel}</button>
      <button class="btn btn-ghost" onclick="closeModal()">إلغاء</button>`
  });
}

function openAddNoteModal(requestId) {
  openModal({
    title: 'إضافة ملاحظة تشغيلية',
    body: `
      <div class="alert alert-i" style="margin-bottom:12px">${ICONS.info}<span>الملاحظة لا تغيّر حالة الطلب وتكون مرئية لجميع الأدوار ذات الصلاحية.</span></div>
      <div class="fgrp">
        <label class="flbl">نص الملاحظة <span class="req">*</span></label>
        <textarea class="fc" id="note-text-input" placeholder="اكتب ملاحظتك هنا..." rows="4"></textarea>
      </div>`,
    footer: `
      <button class="btn btn-primary" onclick="saveNote('${requestId}')">${ICONS.check} حفظ الملاحظة</button>
      <button class="btn btn-ghost" onclick="closeModal()">إلغاء</button>`
  });
}

function saveNote(requestId) {
  const txt = document.getElementById('note-text-input');
  if (!txt || !txt.value.trim()) { showToast('يرجى كتابة الملاحظة أولاً', 'w'); return; }
  closeModal();
  showToast('تم حفظ الملاحظة بنجاح', 's');
}

function closeNotifications() {
  const panel = document.getElementById('notification-panel');
  if (panel) panel.classList.remove('show');
}

function showNotifications(event) {
  if (event) event.stopPropagation();
  const panel = document.getElementById('notification-panel');
  if (panel) panel.classList.toggle('show');
}

function showUserMenu() {
  const roleConfig = INSP_CONFIG.roles[CURRENT_ROLE];
  const userData = INSP_DATA.users[CURRENT_ROLE] || { name: 'مستخدم النظام' };
  openModal({
    title: 'إعدادات الحساب',
    body: `
      <div style="text-align:center;margin-bottom:16px">
        <div style="width:60px;height:60px;border-radius:50%;background:var(--primary);color:#fff;font-size:20px;font-weight:700;display:flex;align-items:center;justify-content:center;margin:0 auto 10px">${roleConfig.avatarInitials}</div>
        <p style="font-size:14px;font-weight:700;color:var(--text)">${userData.name}</p>
        <p style="font-size:12px;color:var(--text3)">${roleConfig.nameAr}</p>
      </div>
      <div class="divider"></div>
      <div style="display:flex;flex-direction:column;gap:6px">
        <button class="btn btn-ghost" style="justify-content:flex-start;gap:10px" onclick="switchRole(); closeModal();">${ICONS.switch} تغيير الدور</button>
        <button class="btn btn-ghost btn-sm" style="justify-content:flex-start;gap:10px;color:var(--danger)" onclick="window.location.href='../index.html'">${ICONS.logout} تسجيل الخروج (محاكاة)</button>
      </div>`,
    footer: `<button class="btn btn-ghost btn-sm" onclick="closeModal()">إغلاق</button>`
  });
}

/* ── Status Badge Helper ── */
function statusBadge(status) {
  const cls = INSP_CONFIG.statusBadges[status] || 'b-draft';
  const shortStatus = status && status.length > 45 ? status.substring(0, 42) + '...' : (status || '—');
  return `<span class="badge ${cls}" title="${status}">${shortStatus}</span>`;
}

/* ── Format Date ── */
function formatDate(d) {
  if (!d) return '—';
  try { return new Date(d).toLocaleDateString('ar-OM', { year: 'numeric', month: 'long', day: 'numeric' }); } catch { return d; }
}

function formatDateTime(d) {
  if (!d) return '—';
  const parts = d.split(' ');
  return formatDate(parts[0]) + (parts[1] ? ` — ${parts[1]}` : '');
}

/* ── Content Helpers ── */
function getContent() { return document.getElementById('app-content'); }
function renderContent(html) {
  const ct = getContent();
  if (!ct) return;
  ct.innerHTML = html;
  ct.querySelectorAll('script').forEach(old => {
    const s = document.createElement('script');
    s.textContent = old.textContent;
    old.parentNode.replaceChild(s, old);
  });
}

/* ── URL Params ── */
function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

function resolveContextRole(defaultRole) {
  const requestedRole = getParam('role');
  if (requestedRole && INSP_CONFIG.roles[requestedRole]) return requestedRole;
  return defaultRole;
}

/* ── Priority Badge ── */
function priorityBadge(p) {
  const map = { 'عاجل': 'b-rejected', 'مرتفع': 'b-invest', 'متوسط': 'b-phead', 'منخفض': 'b-closed' };
  return `<span class="badge ${map[p] || 'b-draft'}">${p || '—'}</span>`;
}

/* ── Risk Badge ── */
function riskBadge(r) {
  const map = { 'عالي': 'b-rejected', 'مرتفع': 'b-rejected', 'متوسط': 'b-invest', 'منخفض': 'b-approved' };
  return `<span class="badge ${map[r] || 'b-draft'}">${r || '—'}</span>`;
}

/* ── Attachment Row ── */
function attRow(att) {
  const icons = { pdf: ICONS.file, img: ICONS.eye, doc: ICONS.file, oth: ICONS.file };
  return `
    <div class="att-row">
      <div class="att-ico ${att.type || 'pdf'}">${ICONS.file}</div>
      <div class="att-info">
        <div class="att-name">${att.name}</div>
        <div class="att-meta">${att.size || ''} — ${att.date || ''}</div>
      </div>
      <div class="att-acts">
        <button class="ibtn" title="تنزيل" onclick="showToast('جارٍ تنزيل الملف...','i')">${ICONS.download}</button>
      </div>
    </div>`;
}

/* ── Timeline HTML ── */
function renderTimeline(timeline) {
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

/* ── Update Timeline Request ── */
function updateTimelineRequest() {
  const select = document.getElementById('timeline-request-select');
  if (select) {
    const requestId = select.value;
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('id', requestId);
    window.location.href = currentUrl.toString();
  }
}

/* ── Notes HTML ── */
function renderNotes(notes, id) {
  const noteItems = Array.isArray(notes)
    ? notes
    : (typeof notes === 'string' && notes.trim()
        ? [{ text: notes, author: 'النظام', date: '—' }]
        : []);
  notes = noteItems;
  return `
    <div class="op-notes-card card mb0" id="notes-card">
      <div class="ph op-notes-head" onclick="toggleNotes()">
        <h3><div class="pico or">${ICONS.note}</div>الملاحظات التشغيلية ${notes && notes.length ? `<span style="font-size:11px;color:var(--text3);font-weight:400">(${notes.length})</span>` : ''}</h3>
        <div class="op-notes-chevron">${ICONS.arrow_left}</div>
      </div>
      <div class="pb">
        ${notes && notes.length ? notes.map(n => `
          <div class="note-item">
            <div class="note-av">${n.author ? n.author.substring(0, 2) : 'م'}</div>
            <div class="note-c">
              <div class="note-hd">
                <span class="note-auth">${n.author}</span>
                <span class="note-time">${n.date}</span>
              </div>
              <div class="note-txt">${n.text}</div>
            </div>
          </div>`).join('') : '<p style="color:var(--text3);font-size:12.5px">لا توجد ملاحظات بعد.</p>'}
        <button class="btn btn-ghost btn-sm mt8" onclick="openAddNoteModal('${id}')">${ICONS.plus} إضافة ملاحظة</button>
      </div>
    </div>`;
}

function toggleNotes() {
  const card = document.getElementById('notes-card');
  if (card) card.classList.toggle('collapsed');
}

/* ── Checklist HTML ── */
function renderChecklist(items) {
  if (!items || !items.length) return '';
  const done = items.filter(i => i.done).length;
  return `
    <div style="margin-bottom:8px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <span style="font-size:12px;color:var(--text3)">اكتمال قائمة التحقق</span>
        <span style="font-size:12px;font-weight:700;color:var(--primary)">${done}/${items.length}</span>
      </div>
      <div style="height:6px;background:var(--g200);border-radius:999px;overflow:hidden;margin-bottom:12px">
        <div style="height:100%;width:${Math.round((done/items.length)*100)}%;background:var(--primary);border-radius:999px"></div>
      </div>
    </div>
    ${items.map(item => `
      <div style="display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:var(--rsm);background:${item.done ? 'var(--success-l)' : 'var(--g50)'};margin-bottom:5px;border:1px solid ${item.done ? '#86efac' : 'var(--border)'}">
        <div style="width:18px;height:18px;border-radius:4px;background:${item.done ? 'var(--success)' : '#fff'};border:1.5px solid ${item.done ? 'var(--success)' : 'var(--border2)'};display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff">
          ${item.done ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="11" height="11"><polyline points="20,6 9,17 4,12"/></svg>` : ''}
        </div>
        <span style="font-size:12.5px;color:${item.done ? 'var(--success)' : 'var(--text2)'}">${item.item}</span>
      </div>`).join('')}`;
}

/* ── Bar Chart HTML ── */
function barChart(data, colorVar = '--primary') {
  const max = Math.max(...data.map(d => d.value), 1);
  return data.map(d => `
    <div class="chart-bar-row">
      <div class="chart-bar-meta"><span>${d.label}</span><strong>${d.value}</strong></div>
      <div class="chart-bar-track">
        <div class="chart-bar-fill" style="width:${Math.round((d.value/max)*100)}%;background:var(${colorVar})"></div>
      </div>
    </div>`).join('');
}

/* ── Services Helper Functions ── */
function getCurrentUserRole() {
  return INSP_DATA.users[CURRENT_ROLE] || { role: CURRENT_ROLE, name: 'مستخدم النظام' };
}

function switchTab(tabName) {
  // Remove active class from all tabs and panes
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-pane, .tab-panel').forEach(pane => pane.classList.remove('active'));

  // Add active class to selected tab and pane
  const tabElement = document.querySelector(`[data-tab="${tabName}"]`);
  const paneElement = document.getElementById(tabName) || document.getElementById(tabName + '-panel');

  if (tabElement) tabElement.classList.add('active');
  if (paneElement) paneElement.classList.add('active');

  // Update URL without reloading
  const newUrl = new URL(window.location);
  newUrl.searchParams.set('tab', tabName);
  window.history.pushState({}, '', newUrl);
}

function goBack() {
  const referrer = document.referrer;
  if (referrer && referrer.includes(window.location.hostname)) {
    window.history.back();
  } else {
    // Default fallback based on current file
    const currentPath = window.location.pathname;
    if (currentPath.includes('details')) {
      // Go to list page
      const listPage = currentPath.replace('-details', '-list').replace('case-details', 'cases-list');
      window.location.href = listPage;
    } else {
      window.location.href = '../role-selection.html';
    }
  }
}

function getStatusBadgeClass(status) {
  const statusClasses = {
    'قيد المراجعة': 'b-invest',
    'قيد التحليل': 'b-invest',
    'بانتظار القرار': 'b-phead',
    'تم الاعتماد': 'b-approved',
    'تم الرفض': 'b-rejected',
    'طلب معلومات إضافية': 'b-returned',
    'قيد المعالجة': 'b-invest',
    'معتمد': 'b-approved',
    'مرفوض': 'b-rejected',
    'مسودة': 'b-draft',
    'مكتمل': 'b-closed'
  };
  return statusClasses[status] || 'b-draft';
}

function getRiskBadgeClass(riskLevel) {
  const riskClasses = {
    'عالي': 'b-rejected',
    'متوسط': 'b-phead',
    'منخفض': 'b-approved',
    'مرتفع': 'b-rejected'
  };
  return riskClasses[riskLevel] || 'b-draft';
}

function getEligibilityBadgeClass(eligibility) {
  const eligibilityClasses = {
    'مستحق': 'b-approved',
    'متوسط': 'b-phead',
    'تحت التحقق': 'b-invest',
    'غير مستحق': 'b-rejected'
  };
  return eligibilityClasses[eligibility] || 'b-draft';
}

function getCaseTypeBadgeClass(caseType) {
  const caseTypeClasses = {
    'إفلاس': 'b-rejected',
    'تصفية': 'b-phead'
  };
  return caseTypeClasses[caseType] || 'b-draft';
}
