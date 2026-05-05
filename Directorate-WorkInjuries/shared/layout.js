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
  pause: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" y1="4" x2="10" y2="20"/><line x1="14" y1="4" x2="14" y2="20"/></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="8 5 19 12 8 19 8 5"/></svg>`,
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
  initRequestSummaryEnhancer();
}

function enforceRoleAccess(allowedRoles, options = {}) {
  const fallbackPage = options.fallbackPage || 'dashboard';
  const title = options.title || 'غير مصرح';
  const message = options.message || 'هذه الشاشة غير متاحة لهذا الدور.';
  if (!Array.isArray(allowedRoles) || allowedRoles.includes(CURRENT_ROLE)) return true;
  const content = document.getElementById('app-content');
  if (content) {
    content.innerHTML = `
      <div class="card">
        <div class="pb">
          <div class="empty-st">
            ${ICONS.lock}
            <h4>${title}</h4>
            <p>${message}</p>
            <div style="margin-top:14px">
              <button class="btn btn-secondary btn-sm" onclick="navigateTo('${fallbackPage}')">${ICONS.arrow_right}الرجوع</button>
            </div>
          </div>
        </div>
      </div>`;
  }
  return false;
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
    'od-committee': WI_DATA.users.od_committee,
    'institution-rapporteur': WI_DATA.users.institution_rapporteur,
    'appeals-rapporteur': WI_DATA.users.appeals_rapporteur,
    'supervisory-rapporteur': WI_DATA.users.supervisory_rapporteur,
    'referral-coordinator': WI_DATA.users.referral_coordinator,
  };
  return map[role] || { name: 'مستخدم النظام', civil: '' };
}

function getCurrentUserData() {
  return getUserData(CURRENT_ROLE);
}

function getCurrentUserPhone() {
  return getCurrentUserData()?.phone || '';
}

function getPhoneForActor(actorName, roleName = '') {
  if (!window.WI_DATA?.users) return '';
  const users = Object.values(WI_DATA.users);
  if (actorName) {
    const byName = users.find((user) => user?.name === actorName);
    if (byName?.phone) return byName.phone;
  }
  if (roleName) {
    const normalizedRole = String(roleName).trim();
    const byRoleLabel = users.find((user) => user?.role === normalizedRole || user?.roleAr === normalizedRole);
    if (byRoleLabel?.phone) return byRoleLabel.phone;
  }
  return '';
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
      <button class="hbtn" onclick="showProfile()" title="الملف الشخصي" ${roleConfig.type === 'internal' ? 'style="display:none"' : ''}>
        ${ICONS.user}
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
          ${userData.availability && CURRENT_ROLE !== 'worker' ? `
          <div class="u-availability">
            <span class="avail-dot ${userData.availability.status === 'متاح' ? 'avail' : 'unavail'}"></span>
            <span class="avail-status">${userData.availability.status}</span>
            ${userData.availability.status === 'غير متاح' && userData.availability.note ? `<span class="avail-note">— ${userData.availability.note}</span>` : ''}
          </div>
          ` : ''}
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

function showProfile() {
  const userData = getUserData(CURRENT_ROLE);
  const roleConfig = WI_CONFIG.roles[CURRENT_ROLE];
  const isWorker = CURRENT_ROLE === 'worker';

  openModal({
    title: 'الملف الشخصي',
    size: isWorker ? 'md-lg' : 'lg',
    body: `
      <div class="fg fg-2" style="gap:14px">
        <div class="fgrp"><label class="flbl">الاسم الكامل</label><div class="fro">${userData.name}</div></div>
        <div class="fgrp"><label class="flbl">الرقم المدني</label><div class="fro" style="font-family:monospace">${userData.civil || '—'}</div></div>
        <div class="fgrp"><label class="flbl">رقم الهاتف</label><div class="fro">${userData.phone || '—'}</div></div>
        <div class="fgrp"><label class="flbl">البريد الإلكتروني</label><div class="fro">${userData.email || '—'}</div></div>
        <div class="fgrp"><label class="flbl">تاريخ التسجيل في النظام</label><div class="fro">1 مارس 2019</div></div>
        ${isWorker ? `
        <div class="fgrp"><label class="flbl">الحالة التأمينية</label><div class="fro"><span class="badge b-approved">نشط</span></div></div>
        <div class="fgrp"><label class="flbl">نوع الاشتراك</label><div class="fro">إلزامي</div></div>
        <div class="fgrp"><label class="flbl">تاريخ التسجيل فى الصندوق</label><div class="fro">1 مارس 2019</div></div>
        ` : ''}
        ${isWorker && WI_DATA.users.worker.employerHistory ? `
        <div class="fgrp span-full">
          <label class="flbl">سجل جهات العمل</label>
          <div class="tbl-wrap"><table class="dtbl">
            <thead><tr><th>السجل التجاري</th><th>اسم جهة العمل</th><th>تاريخ الالتحاق</th><th>تاريخ انتهاء الخدمة</th></tr></thead>
            <tbody>${WI_DATA.users.worker.employerHistory.map(e => `<tr><td style="font-family:monospace">${e.cr}</td><td>${e.name}</td><td>${formatDate(e.joinDate)}</td><td>${e.endDate ? formatDate(e.endDate) : '<span class="badge b-approved">الجهة الحالية</span>'}</td></tr>`).join('')}</tbody>
          </table></div>
        </div>` : ''}
      </div>`,
    footer: `<button class="btn btn-ghost" onclick="closeModal()">إغلاق</button>`
  });
}

function openAvailabilityModal() {
  const userData = getCurrentUserData();
  if (!userData || !userData.availability) {
    showToast('لا تتوفر بيانات الحالة لهذا المستخدم', 'w');
    return;
  }

  openModal({
    title: 'تحديث حالة التوفر',
    body: `
      <div class="fg" style="gap:14px">
        <div class="alert alert-i">
          ${ICONS.info}
          <span>تظهر حالة التوفر في رأس الصفحة وتُستخدم عند إعادة التخصيص والتواصل الداخلي.</span>
        </div>
        <div class="fgrp">
          <label class="flbl">الحالة الحالية</label>
          <select class="fc" id="availability-status-input">
            <option value="متاح" ${userData.availability.status === 'متاح' ? 'selected' : ''}>متاح</option>
            <option value="غير متاح" ${userData.availability.status === 'غير متاح' ? 'selected' : ''}>غير متاح</option>
          </select>
        </div>
        <div class="fgrp">
          <label class="flbl">ملاحظة</label>
          <textarea class="fc" id="availability-note-input" rows="3" placeholder="مثال: في اجتماع، خارج المكتب، إجازة قصيرة">${userData.availability.note || ''}</textarea>
        </div>
      </div>`,
    footer: `
      <button class="btn btn-primary" onclick="saveAvailabilityStatus()">${ICONS.check} حفظ الحالة</button>
      <button class="btn btn-ghost" onclick="closeModal()">إلغاء</button>`
  });
}

function saveAvailabilityStatus() {
  const userData = getCurrentUserData();
  const statusEl = document.getElementById('availability-status-input');
  const noteEl = document.getElementById('availability-note-input');
  if (!userData || !statusEl || !noteEl) return;

  userData.availability = {
    status: statusEl.value,
    note: noteEl.value.trim(),
  };

  closeModal();
  initLayout({ role: CURRENT_ROLE, activePage: CURRENT_PAGE, breadcrumb: CURRENT_BREADCRUMB });
  if (CURRENT_BREADCRUMB.length) setBreadcrumb(CURRENT_BREADCRUMB);
  showToast('تم تحديث حالة التوفر', 's');
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
  const userData = getUserData(CURRENT_ROLE);
  openModal({
    title: 'إعدادات الحساب',
    body: `
      <div style="text-align:center;margin-bottom:16px">
        <div style="width:60px;height:60px;border-radius:50%;background:var(--primary);color:#fff;font-size:20px;font-weight:700;display:flex;align-items:center;justify-content:center;margin:0 auto 10px">${roleConfig.avatarInitials}</div>
        <p style="font-size:14px;font-weight:700;color:var(--text)">${userData.name}</p>
        <p style="font-size:12px;color:var(--text3)">${roleConfig.nameAr}</p>
      </div>
      ${roleConfig.type === 'internal' && userData.availability ? `
      <div class="availability-card">
        <div>
          <div class="availability-card-label">حالة التوفر الحالية</div>
          <div class="availability-card-status">
            <span class="avail-dot ${userData.availability.status === 'متاح' ? 'avail' : 'unavail'}"></span>
            <span>${userData.availability.status}</span>
          </div>
          ${userData.availability.note ? `<div class="availability-card-note">${userData.availability.note}</div>` : ''}
        </div>
        <button class="btn btn-secondary btn-sm" onclick="openAvailabilityModal()">${ICONS.edit} تعديل</button>
      </div>` : ''}
      <div class="divider"></div>
      <div style="display:flex;flex-direction:column;gap:6px">
        <button class="btn btn-ghost" style="justify-content:flex-start;gap:10px" onclick="switchRole(); closeModal();">${ICONS.switch} تغيير الدور</button>
        <button class="btn btn-ghost btn-sm" style="justify-content:flex-start;gap:10px;color:var(--danger)" onclick="window.location.href='../index.html'">${ICONS.logout} تسجيل الخروج</button>
      </div>`,
    footer: `<button class="btn btn-ghost btn-sm" onclick="closeModal()">إغلاق</button>`
  });
}

/* ── Status Badge Helper ── */
function getStatusDisplayText(status) {
  const fullText = normalizeDisplay(status, '—');
  if (fullText === '—') return fullText;

  // Keep internal status value unchanged for workflow logic,
  // but shorten long presentation texts like:
  // "تم تقديم ... — بانتظار ..."
  const separator = '—';
  if (!fullText.includes(separator)) return fullText;

  const tail = fullText.split(separator).map(s => s.trim()).filter(Boolean).pop() || fullText;
  if (tail.startsWith('بانتظار') || tail.startsWith('قيد')) return tail;

  return fullText;
}

function statusBadge(status) {
  const cls = WI_CONFIG.statusBadges[status] || 'b-draft';
  const fullText = normalizeDisplay(status, '—');
  const shortText = getStatusDisplayText(status);
  return `<span class="badge ${cls}" title="${fullText}">${shortText}</span>`;
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

/* ── Normalize display value (shared by all inlined panels) ── */
function normalizeDisplay(value, fallback = '—') {
  if (value === null || value === undefined) return fallback;
  const text = String(value).trim();
  if (!text) return fallback;
  const lower = text.toLowerCase();
  if (lower === 'undefined' || lower === 'null') return fallback;
  return text;
}

/* ── Parse date safely (supports YYYY-MM-DD and YYYY-MM-DD HH:mm) ── */
function parseDateSafe(value) {
  if (!value) return null;
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  const text = String(value).trim();
  if (!text) return null;

  const dateTimeMatch = text.match(/^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?$/);
  if (dateTimeMatch) {
    const year = Number(dateTimeMatch[1]);
    const month = Number(dateTimeMatch[2]) - 1;
    const day = Number(dateTimeMatch[3]);
    const hour = Number(dateTimeMatch[4] || 0);
    const minute = Number(dateTimeMatch[5] || 0);
    const second = Number(dateTimeMatch[6] || 0);
    return new Date(year, month, day, hour, minute, second);
  }

  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
}

/* ── SLA summary metadata for top request card ── */
function resolveCurrentRequestRecord() {
  const picks = [];
  try { if (typeof req !== 'undefined' && req) picks.push(req); } catch (_) {}
  try { if (typeof appeal !== 'undefined' && appeal) picks.push(appeal); } catch (_) {}
  try { if (typeof app !== 'undefined' && app) picks.push(app); } catch (_) {}
  try { if (typeof incomingRecord !== 'undefined' && incomingRecord) picks.push(incomingRecord); } catch (_) {}

  return picks.find(item => item && typeof item === 'object') || null;
}

function inferDefaultSlaDays(record) {
  if (!record || typeof record !== 'object') return 10;
  if (Number(record.slaDays) > 0) return Number(record.slaDays);

  const status = normalizeDisplay(record.status, '');
  const requestType = normalizeDisplay(record.requestType || record.type || record.originalRequestType, '');

  if (record.committeeDecision || record.activeLicense || record.institution || status.includes('التراخيص') || status.includes('اللجنة الطبية الإشرافية')) return 20;
  if (record.referral || WI_DATA.referrals?.includes(record) || requestType.includes('المؤسسات الصحية المرخصة')) return 7;
  if (record.appealReason || WI_DATA.appeals?.includes(record) || requestType.includes('تظلم')) return 15;
  if (record.retirementDate || WI_DATA.disabilityRetirement?.includes(record)) return 5;
  if (record.card || WI_DATA.disability?.includes(record) || requestType.includes('إعاقة')) return 10;
  if (record.medical || record.chronicDisease || WI_DATA.chronic?.includes(record) || requestType.includes('مستديمة')) return 10;
  if (record.sickLeavePeriods?.length || status.includes('الإجازات المرضية')) return 7;
  if (WI_DATA.allowances?.includes(record) || requestType.includes('إصابة') || requestType.includes('مرض مهني')) return 14;
  return 10;
}

function deriveRequestSummaryMeta(record) {
  if (!record || typeof record !== 'object') return null;

  const timeline = Array.isArray(record.timeline) ? record.timeline : [];
  const latestTimelineItem = timeline.length ? timeline[timeline.length - 1] : null;
  const submitDateRaw = record.submitDate || record.requestDate || record.createdAt || record.createdDate || null;
  const lastUpdatedAtRaw = record.lastUpdate || record.updatedAt || latestTimelineItem?.time || null;
  const lastUpdatedByRaw = record.lastUpdatedBy || record.updatedBy || record.lastUpdateBy || latestTimelineItem?.actor || record.checkedOutBy || record.assignedTo || null;

  const submitDate = parseDateSafe(submitDateRaw);
  const lastUpdatedAt = parseDateSafe(lastUpdatedAtRaw);
  const slaDays = inferDefaultSlaDays(record);

  let expectedClosureDateRaw = record.expectedClosureDate || record.expectedCloseDate || record.targetClosureDate || record.closureDate || null;
  if (!expectedClosureDateRaw && submitDate) {
    const dueDate = new Date(submitDate.getTime());
    dueDate.setDate(dueDate.getDate() + slaDays);
    expectedClosureDateRaw = dueDate;
  }
  const expectedClosureDate = parseDateSafe(expectedClosureDateRaw);

  let remainingDays = null;
  if (expectedClosureDate) {
    const now = new Date();
    const referenceDate = now;
    const msPerDay = 24 * 60 * 60 * 1000;
    remainingDays = Math.ceil((expectedClosureDate.getTime() - referenceDate.getTime()) / msPerDay);

    // Keep prototype values realistic even when sample data dates are from older years.
    if (Math.abs(remainingDays) > 60) {
      const fallbackReference = lastUpdatedAt || submitDate;
      if (fallbackReference) {
        remainingDays = Math.ceil((expectedClosureDate.getTime() - fallbackReference.getTime()) / msPerDay);
      }
    }
    if (Math.abs(remainingDays) > 60) {
      remainingDays = remainingDays > 0 ? 60 : -60;
    }
  }

  return {
    lastUpdatedAtText: lastUpdatedAt ? formatDateTime(`${lastUpdatedAt.getFullYear()}-${String(lastUpdatedAt.getMonth() + 1).padStart(2, '0')}-${String(lastUpdatedAt.getDate()).padStart(2, '0')} ${String(lastUpdatedAt.getHours()).padStart(2, '0')}:${String(lastUpdatedAt.getMinutes()).padStart(2, '0')}`) : normalizeDisplay(lastUpdatedAtRaw),
    lastUpdatedByText: normalizeDisplay(lastUpdatedByRaw, 'غير محدد'),
    expectedClosureDateText: expectedClosureDate ? formatDate(expectedClosureDate) : '—',
    remainingDays,
    slaDays,
  };
}

function getRemainingDaysLabel(remainingDays) {
  if (remainingDays === null || remainingDays === undefined || Number.isNaN(remainingDays)) return '—';
  if (remainingDays < 0) return `متجاوز بـ ${Math.abs(remainingDays)} يوم`;
  if (remainingDays === 0) return 'اليوم';
  return `متبقي ${remainingDays} يوم`;
}

function getRemainingDaysClass(remainingDays) {
  if (remainingDays === null || remainingDays === undefined || Number.isNaN(remainingDays)) return '';
  if (remainingDays < 0) return 'sla-overdue';
  if (remainingDays <= 3) return 'sla-near-due';
  return 'sla-on-track';
}

function getRemainingDaysMeta(record) {
  return deriveRequestSummaryMeta(record);
}

function renderRemainingDaysBadge(record) {
  const meta = getRemainingDaysMeta(record);
  return `<span class="sla-days ${getRemainingDaysClass(meta?.remainingDays)}">${getRemainingDaysLabel(meta?.remainingDays)}</span>`;
}

function createSummaryCell(label, valueHtml, extraClass = '') {
  return `<div class="${extraClass}"><div class="flbl" style="margin-bottom:4px">${label}</div><div style="font-size:12px;color:var(--text2)">${valueHtml}</div></div>`;
}

function inferWorkflowStageId(requestType, status, record = {}) {
  const text = normalizeDisplay(status, '').replace(/\s+/g, ' ');
  if (record?.suspended) return 'suspended';

  if (requestType === 'allowances') {
    if (text.includes('تم رفض')) return 'rejected';
    if (text.includes('معتمد') || text.includes('اعتماد الطلب')) return 'approved';
    if (text.includes('إغلاق')) return 'completed';
    if (text.includes('تظلم')) return 'appealed';
    if (text.includes('استيفاء')) return 'returned';
    if (text.includes('رئيس قسم الإجازات المرضية')) return 'sickleave_head_review';
    if (text.includes('الإجازات المرضية')) return 'sickleave_review';
    if (text.includes('رئيس قسم التحقيق')) return 'head_review';
    if (text.includes('قيد التحقيق')) return 'investigation';
    if (text.includes('بانتظار تعيين المحقق')) return 'submitted';
    if (text.includes('تم تقديم الطلب')) return 'submitted';
    return '';
  }

  if (requestType === 'disability') {
    if (text.includes('غير متاح') || text.includes('إيقاف الصرف') || text.includes('منتهية') || text.includes('ملغاة')) return 'expired';
    if (text.includes('إعادة التقييم')) return 'reassessment';
    if (text.includes('تم رفض')) return 'rejected';
    if (text.includes('إغلاق')) return 'completed';
    if (text.includes('تظلم')) return 'appealed';
    if (text.includes('استيفاء')) return 'returned';
    if (text.includes('الصرف جار')) return 'active';
    if (text.includes('تم اعتماد')) return 'approved';
    if (text.includes('رئيس قسم الإعاقة')) return 'head_review';
    if (text.includes('قيد مراجعة موظف')) return 'employee_review';
    if (text.includes('موظف قسم الإعاقة')) return 'submitted';
    if (text.includes('تم تقديم طلب منفعة الأشخاص ذوي الإعاقة')) return 'submitted';
    return '';
  }

  if (requestType === 'chronic') {
    if (text.includes('تم استلام التشخيص')) return 'incoming';
    if (text.includes('إعادة التقييم')) return 'reassessment';
    if (text.includes('تم رفض')) return 'rejected';
    if (text.includes('إغلاق')) return 'completed';
    if (text.includes('تظلم')) return 'appealed';
    if (text.includes('استيفاء')) return 'returned';
    if (text.includes('الصرف الدوري جار')) return 'active';
    if (text.includes('تم اعتماد')) return 'approved';
    if (text.includes('رئيس قسم الإعاقة') || text.includes('رئيس قسم الأمراض المستديمة')) return 'head_review';
    if (text.includes('قيد مراجعة موظف')) return 'employee_review';
    if (text.includes('موظف قسم الإعاقة') || text.includes('تم تقديم الطلب')) return 'submitted';
    return '';
  }

  if (requestType === 'directReferral') {
    if (text.includes('استيفاء')) return 'returned';
    if (text.includes('موظف قسم اللجان الطبية') || text.includes('رئيس قسم اللجان الطبية') || text.includes('قيد المراجعة — قسم اللجان الطبية')) return 'committee_review';
    if (text.includes('منسق الإحالات والتحويلات') || text.includes('إحالة المقرر') || text.includes('جلسة') || text.includes('قرار المؤسسة الصحية')) return 'institution_review';
    if (text.includes('تنفيذ') || text.includes('إغلاق')) return 'completed';
    return 'submitted';
  }

  if (requestType === 'appeals') {
    if (text.includes('موظف قسم اللجان الطبية')) return 'employee_review';
    if (text.includes('رئيس قسم اللجان الطبية')) return 'head_review';
    if (text.includes('لجنة التظلمات') && text.includes('جلسة')) return 'session_scheduled';
    if (text.includes('لجنة التظلمات')) return 'committee_review';
    if (text.includes('القرار النهائي')) return 'decision';
    if (text.includes('إغلاق التظلم')) return 'completed';
    return 'submitted';
  }

  if (requestType === 'licensing') {
    if (text.includes('موظف قسم التراخيص')) return 'employee_review';
    if (text.includes('رئيس قسم التراخيص')) return 'head_review';
    if (text.includes('اللجنة الطبية الإشرافية') && text.includes('جلسة')) return 'session_scheduled';
    if (text.includes('اللجنة الطبية الإشرافية') && text.includes('قرار')) return 'decision';
    if (text.includes('اللجنة الطبية الإشرافية')) return 'committee_review';
    if (text.includes('تنفيذ القرار')) return 'approved';
    if (text.includes('الترخيص نشط')) return 'active';
    if (text.includes('انتهت صلاحية الترخيص')) return 'expired';
    if (text.includes('استيفاء')) return 'returned';
    if (text.includes('تم رفض')) return 'rejected';
    return text.includes('تم تقديم طلب الترخيص') ? 'submitted' : '';
  }

  if (requestType === 'disabilityRetirement') {
    if (text.includes('بانتظار اعتماد رئيس قسم الإعاقة')) return 'head_review';
    if (text.includes('بانتظار مراجعة موظف')) return 'employee_review';
    if (text.includes('مؤهل للتقاعد المبكر')) return 'closed_approved';
    if (text.includes('غير مؤهل')) return 'closed_rejected';
    return 'received';
  }

  return '';
}

function renderWorkflowPath(record, requestType) {
  const workflowConfig = getWorkflowPathConfig(record, requestType);
  if (!workflowConfig.stages.length || !record) return '';

  const { stages: workflowStages, currentStageId, metaLabel = '' } = workflowConfig;
  return `
    <div class="card workflow-card">
      <div class="card-hd">
        <h3>مسار العمل المتوقع</h3>
        ${metaLabel ? `<span class="workflow-meta">${metaLabel}</span>` : ''}
      </div>
      <div class="card-b">
        <div class="workflow-strip">
          ${workflowStages.map((stage, index) => {
            const isCurrent = stage.id === currentStageId;
            const isDone = currentStageId && workflowStages.findIndex(item => item.id === currentStageId) > index;
            return `
              <div class="workflow-stage ${isCurrent ? 'current' : ''} ${isDone ? 'done' : ''}">
                <div class="workflow-stage-dot">${isDone ? ICONS.check : index + 1}</div>
                <div class="workflow-stage-body">
                  <div class="workflow-stage-name">${stage.name}</div>
                  <div class="workflow-stage-desc">${stage.description}</div>
                </div>
              </div>`;
          }).join('')}
        </div>
      </div>
    </div>`;
}

function getWorkflowPathConfig(record, requestType) {
  if (!record) return { stages: [], currentStageId: '' };

  if (requestType === 'allowances') {
    const stages = getAllowanceBusinessStages();
    const currentStageId = inferAllowanceBusinessStageId(record);
    return {
      stages,
      currentStageId,
      metaLabel: `يعرض المراحل الرئيسية فقط (${stages.length} مراحل)`,
    };
  }

  const workflowStages = window.getWorkflowStages ? getWorkflowStages(requestType) : [];
  const currentStageId = inferWorkflowStageId(requestType, record.status, record);
  return { stages: workflowStages, currentStageId };
}

function getAllowanceBusinessStages() {
  return [
    {
      id: 'followup_review',
      name: 'المراجعة والتحقق من قسم المتابعة والبلاغات',
      description: 'استلام الطلب والتحقق الأولي من اكتمال البيانات والمرفقات.',
    },
    {
      id: 'followup_approval',
      name: 'اعتماد قسم المتابعة والبلاغات',
      description: 'اعتماد الإحالة الداخلية بعد استيفاء المتطلبات الأولية.',
    },
    {
      id: 'inspection_review',
      name: 'مراجعة وتحقق قسم التفتيش',
      description: 'فحص الحالة والتحقق الموضوعي وإعداد التوصية.',
    },
    {
      id: 'inspection_approval',
      name: 'اعتماد قسم التفتيش',
      description: 'مراجعة واعتماد نتيجة التحقق من قبل رئيس القسم المختص.',
    },
    {
      id: 'director_approval',
      name: 'اعتماد مدير الدائرة',
      description: 'الاعتماد النهائي قبل استكمال بقية الإجراءات التنفيذية.',
    },
  ];
}

function inferAllowanceBusinessStageId(record) {
  const statusText = resolveAllowanceStageStatus(record).toLowerCase();

  if (!statusText) return 'followup_review';
  if (statusText.includes('معتمد') || statusText.includes('قيد المراجعة من موظف قسم الإجازات') || statusText.includes('بانتظار رأي لجنة')) {
    return 'director_approval';
  }
  if (statusText.includes('بانتظار اعتماد رئيس قسم')) {
    return 'inspection_approval';
  }
  if (statusText.includes('قيد التحقيق')) {
    return 'inspection_review';
  }
  if (statusText.includes('تم تعيين المحقق')) {
    return 'followup_approval';
  }
  if (statusText.includes('تم تقديم الطلب') || statusText.includes('بانتظار تعيين')) {
    return 'followup_review';
  }

  return 'followup_review';
}

function resolveAllowanceStageStatus(record) {
  const currentStatus = String(record?.status || '');
  if (!currentStatus || (!currentStatus.includes('استيفاء') && !currentStatus.includes('معلق'))) {
    return currentStatus;
  }

  const timeline = Array.isArray(record?.timeline) ? [...record.timeline].reverse() : [];
  const fallbackEvent = timeline.find((event) => event?.fromStatus && !String(event.fromStatus).includes('استيفاء') && !String(event.fromStatus).includes('معلق'));
  return fallbackEvent?.fromStatus || currentStatus;
}

function isCurrentViewerExternal() {
  return WI_CONFIG?.roles?.[CURRENT_ROLE]?.type === 'external';
}

function isInternalRoleLabel(roleLabel = '') {
  const target = String(roleLabel || '').trim();
  if (!target) return false;
  return Object.values(WI_CONFIG?.roles || {}).some((role) => role?.type === 'internal' && role?.nameAr === target);
}

function resolveTimelineCurrentWorkerContact(timeline, record = null) {
  const activeName = record?.checkedOutBy || record?.assignedTo || record?.lastUpdatedBy || '';
  if (activeName) {
    const phone = getPhoneForActor(activeName);
    if (phone) {
      return {
        actor: activeName,
        role: 'الموظف الحالي على الطلب',
        phone,
      };
    }
  }

  const reversed = [...timeline].reverse();
  const latestInternalEvent = reversed.find((event) => {
    const phone = event?.phone || getPhoneForActor(event?.actor, event?.role);
    return phone && isInternalRoleLabel(event?.role);
  });

  if (!latestInternalEvent) return null;
  return {
    actor: normalizeDisplay(latestInternalEvent.actor),
    role: normalizeDisplay(latestInternalEvent.role),
    phone: latestInternalEvent.phone || getPhoneForActor(latestInternalEvent.actor, latestInternalEvent.role),
  };
}

function renderTimelineList(timeline, { hideActor = false, hidePhone = false } = {}) {
  const safeTimeline = Array.isArray(timeline) ? timeline : [];
  if (!safeTimeline.length) {
    return `<div class="empty-st" style="padding:18px 0">${ICONS.info}<p>لا يوجد سجل إجراءات حتى الآن</p></div>`;
  }

  const isExternalViewer = isCurrentViewerExternal();
  const currentRecord = resolveCurrentRequestRecord();
  const activeContact = isExternalViewer ? null : resolveTimelineCurrentWorkerContact(safeTimeline, currentRecord);

  return `
    <div class="timeline-wrap">
      ${!isExternalViewer && activeContact?.phone ? `
      <div class="timeline-current-owner">
        <div class="timeline-current-owner-icon">${ICONS.user}</div>
        <div class="timeline-current-owner-body">
          <div class="timeline-current-owner-label">رقم هاتف آخر موظف يعمل على الطلب حالياً</div>
          <div class="timeline-current-owner-main">${activeContact.actor}${activeContact.role ? ` — ${activeContact.role}` : ''}</div>
          <div class="timeline-current-owner-phone">${activeContact.phone}</div>
        </div>
      </div>` : ''}
      <div class="timeline">
      ${safeTimeline.map((event) => {
        return `
          <div class="tl-item ${event.type || 'default'}">
            <div class="tl-dot"></div>
            <div class="tl-content">
              <div class="tl-header">
                <span class="tl-action">${normalizeDisplay(event.action)}</span>
                <span class="tl-time">${normalizeDisplay(event.time)}</span>
              </div>
              ${isExternalViewer ? '' : `<div class="tl-actor"><span class="tl-actor-label">الموظف القائم بالإجراء</span><span class="tl-actor-value">${normalizeDisplay(event.actor)}${event.role ? ` — ${normalizeDisplay(event.role)}` : ''}</span></div>`}
            </div>
          </div>`;
      }).join('')}
      </div>
    </div>`;
}

function enhanceRequestSummaryPanels() {
  const record = resolveCurrentRequestRecord();
  const meta = deriveRequestSummaryMeta(record);
  if (!meta) return;

  const grids = document.querySelectorAll('.req-summary-grid');
  grids.forEach((grid) => {
    if (grid.dataset.slaEnhanced === '1') return;

    const cells = Array.from(grid.children || []);
    let lastUpdateCell = null;
    let lastUpdatedByCell = null;
    let expectedClosureCell = null;
    let remainingDaysCell = null;
    cells.forEach((cell) => {
      const label = cell.querySelector('.flbl');
      if (!label) return;
      const labelText = (label.textContent || '').trim();
      if (labelText === 'آخر تحديث' || labelText === 'آخر تحديث في') {
        label.textContent = 'آخر تحديث في';
        const valueNode = label.nextElementSibling;
        if (valueNode) valueNode.textContent = meta.lastUpdatedAtText;
        lastUpdateCell = cell;
        return;
      }

      if (labelText === 'آخر تحديث بواسطة') {
        const valueNode = label.nextElementSibling;
        if (valueNode) valueNode.textContent = meta.lastUpdatedByText;
        lastUpdatedByCell = cell;
        return;
      }

      if (labelText === 'تاريخ الإغلاق المتوقع' || labelText === 'تاريخ الإغلاق المتوقع للطلب') {
        label.textContent = 'تاريخ الإغلاق المتوقع للطلب';
        const valueNode = label.nextElementSibling;
        if (valueNode) valueNode.textContent = meta.expectedClosureDateText;
        if (expectedClosureCell) {
          cell.remove();
        } else {
          expectedClosureCell = cell;
        }
        return;
      }

      if (labelText === 'الأيام المتبقية حتى الإغلاق' || labelText === 'الأيام المتبقية حتى إغلاق الطلب') {
        label.textContent = 'الأيام المتبقية حتى إغلاق الطلب';
        const valueNode = label.nextElementSibling;
        if (valueNode) valueNode.innerHTML = '';
        cell.classList.add('sla-cell');
        if (remainingDaysCell) {
          cell.remove();
        } else {
          remainingDaysCell = cell;
        }
      }
    });

    if (!lastUpdateCell) {
      grid.insertAdjacentHTML('beforeend', createSummaryCell('آخر تحديث في', meta.lastUpdatedAtText));
    }

    const remainingDaysClass = getRemainingDaysClass(meta.remainingDays);
    const remainingDaysLabel = getRemainingDaysLabel(meta.remainingDays);
    const remainingHtml = `<span class="sla-days ${remainingDaysClass}">${remainingDaysLabel}</span>`;

    if (!lastUpdatedByCell) {
      grid.insertAdjacentHTML('beforeend', createSummaryCell('آخر تحديث بواسطة', meta.lastUpdatedByText));
    }

    if (!expectedClosureCell) {
      grid.insertAdjacentHTML('beforeend', createSummaryCell('تاريخ الإغلاق المتوقع للطلب', meta.expectedClosureDateText));
    }

    if (remainingDaysCell) {
      const valueNode = remainingDaysCell.querySelector('.flbl')?.nextElementSibling;
      if (valueNode) valueNode.innerHTML = remainingHtml;
    } else {
      grid.insertAdjacentHTML('beforeend', createSummaryCell('الأيام المتبقية حتى إغلاق الطلب', remainingHtml, 'sla-cell'));
    }

    grid.dataset.slaEnhanced = '1';
  });
}

let requestSummaryObserver = null;
function initRequestSummaryEnhancer() {
  if (requestSummaryObserver) return;

  const observeTarget = () => document.getElementById('app-content') || document.body;
  enhanceRequestSummaryPanels();

  requestSummaryObserver = new MutationObserver(() => {
    enhanceRequestSummaryPanels();
  });

  const target = observeTarget();
  if (target) {
    requestSummaryObserver.observe(target, { childList: true, subtree: true });
  }
}

/* ── Build a descriptive chronic-disease medical report text ── */
function buildPermanentDiseaseReport(med = {}) {
  const diagnosis = normalizeDisplay(med.detailedDiagnosis || med.diagnosis, 'غير محدد');
  const disease = normalizeDisplay(med.chronicDisease || med.diagnosis, 'غير محدد');
  const affectedSystem = normalizeDisplay(med.affectedSystem, 'غير محدد');
  const severityIndex = normalizeDisplay(med.severityIndex, 'غير محدد');
  const provenDate = med.provenDate ? formatDate(med.provenDate) : 'غير محدد';
  const severityDate = med.severityDate ? formatDate(med.severityDate) : 'غير محدد';

  return [
    'تفيد الوثائق الطبية الواردة من وزارة الصحة بثبوت حالة مرضية مستديمة تستلزم متابعة علاجية مستمرة.',
    `التشخيص الطبي التفصيلي: ${diagnosis}.`,
    `المرض المستديم المثبت: ${disease} — الجهاز المتأثر: ${affectedSystem}.`,
    `تاريخ ثبوت المرض: ${provenDate}، وتاريخ شدة المرض: ${severityDate}.`,
    `مؤشر الشدة الطبي وتحمّل العلاج: ${severityIndex}.`,
  ].join('\n');
}

/* ── Content Getter ── */
function getContent() {
  return document.getElementById('app-content');
}

function renderContent(html) {
  const ct = getContent();
  if (ct) ct.innerHTML = html;
}
