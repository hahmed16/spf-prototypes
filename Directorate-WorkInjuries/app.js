document.addEventListener("DOMContentLoaded", () => {
  buildLayout();
  bindActions();
  bindTabs();
  bindQueries();
  bindRoleSwitcher();
  bindStepLinks();
  bindSidebarAccordion();
  bindNotifications();
  initCharts();
});

function buildLayout() {
  const body = document.body;
  if (body.dataset.simple === "login") return;

  const page = body.dataset.page || "";
  const section = body.dataset.section || "shared";
  const title = body.dataset.title || "";
  const crumbs = (body.dataset.crumbs || "").split("|").filter(Boolean);

  const topbar = document.getElementById("topbar");
  const sidebar = document.getElementById("sidebar");
  const breadcrumb = document.getElementById("breadcrumbs");
  const pageTitle = document.getElementById("pageTitle");

  if (topbar) {
    topbar.innerHTML = `
      <div class="brand" onclick="window.location.href='../index.html'">
        <div class="brand-mark">ص</div>
        <div>
          <h1>صندوق الحماية الاجتماعية</h1>
          <p>مديرية إصابات العمل والأمراض المهنية والشؤون الطبية</p>
        </div>
      </div>
      <div class="top-actions">
        <div class="role-pill">${body.dataset.user || "أحمد بن سالم البلوشي"}</div>
        <div class="notif-trigger">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          <b>4</b>
        </div>
        <a class="user-pill" href="S.2-home.html">الرئيسية</a>
      </div>
    `;
  }

  if (sidebar) sidebar.innerHTML = buildSidebar(section, page);
  if (breadcrumb) breadcrumb.innerHTML = crumbs.map((item) => `<span>${item}</span>`).join("");
  if (pageTitle) pageTitle.textContent = title;

  buildNotificationPanel();
}

function buildSidebar(section, page) {
  const groups = [
    ["shared", "الشاشات العامة", [
      ["S.2-home.html", "الرئيسية"],
      ["S.1-login.html", "تسجيل الدخول"]
    ]],
    ["m1", "بدلات الانقطاع عن العمل", [
      ["1.0-dashboard.html", "لوحة البيانات"],
      ["1.A-claims-list.html", "قائمة الطلبات"],
      ["1.B-new-claim.html", "تقديم طلب جديد"],
      ["1.D-objections-list.html", "طلبات التظلم"],
      ["1.E-reports.html", "التقارير"]
    ]],
    ["m2", "نظام منفعة الإعاقة", [
      ["2.0-dashboard.html", "لوحة البيانات"],
      ["2.A-benefit-list.html", "قائمة الطلبات"],
      ["2.B-new-benefit.html", "تقديم طلب جديد"],
      ["2.D-card-status-inquiry.html", "الاستعلام عن الحالة"],
      ["2.E-reports.html", "التقارير"]
    ]],
    ["m3", "فئة الأمراض المستديمة", [
      ["3.0-dashboard.html", "لوحة البيانات"],
      ["3.A-incoming-cases-list.html", "الحالات الواردة"],
      ["3.B-create-request.html", "إنشاء الطلب"],
      ["3.C-registration-requests-list.html", "طلبات التسجيل"],
      ["3.E-reassessment-followup.html", "إعادة التقييم"],
      ["3.F-reports.html", "التقارير"]
    ]],
    ["m4", "العرض على المؤسسات الصحية المرخصة", [
      ["4.0-dashboard.html", "لوحة البيانات"],
      ["4.A-referral-requests-list.html", "طلبات العرض"],
      ["4.C-referred-cases-list.html", "الحالات المحالة"],
      ["4.D-session-management.html", "إدارة الجلسات"],
      ["4.F-case-decision.html", "قرار الحالة"],
      ["4.G-signature-panel.html", "التوقيع"],
      ["4.H-reports.html", "التقارير"]
    ]],
    ["m5", "التظلم من قرارات المؤسسات الصحية المرخصة", [
      ["5.0-dashboard.html", "لوحة البيانات"],
      ["5.A-appeals-list.html", "قائمة التظلمات"],
      ["5.B-new-appeal.html", "تقديم تظلم"],
      ["5.D-session-management.html", "إدارة الجلسات"],
      ["5.F-appeal-decision.html", "قرار التظلم"],
      ["5.G-final-signature.html", "الاعتماد النهائي"],
      ["5.H-reports.html", "التقارير"]
    ]],
    ["m6", "التراخيص والرقابة على المؤسسات الصحية المرخصة", [
      ["6.0-dashboard.html", "لوحة البيانات"],
      ["6.A-license-requests-list.html", "طلبات الترخيص"],
      ["6.B-new-license-request.html", "طلب ترخيص جديد"],
      ["6.D-inspection-visits-list.html", "الزيارات الرقابية"],
      ["6.F-medical-personnel-list.html", "الكوادر الطبية"],
      ["6.G-reports.html", "التقارير"]
    ]]
  ];

  return groups.map(([key, label, items]) => {
    const isActive = section === key;
    const links = items.map(([href, text]) => `
      <a class="nav-link ${page === href ? "active" : ""}" href="${href}">
        <span>${text}</span>
      </a>
    `).join("");
    return `
      <div class="side-group ${isActive ? "active" : ""}">
        <button class="side-toggle">${label}</button>
        <div class="side-content">${links}</div>
      </div>
    `;
  }).join("");
}

function bindSidebarAccordion() {
  document.querySelectorAll(".side-toggle").forEach(toggle => {
    toggle.addEventListener("click", () => {
      const group = toggle.parentElement;
      const isOpen = group.classList.contains("active");

      // Close others
      document.querySelectorAll(".side-group").forEach(g => g.classList.remove("active"));

      // Toggle current
      if (!isOpen) group.classList.add("active");
    });
  });
}

function buildNotificationPanel() {
  const panel = document.createElement("div");
  panel.className = "notif-panel";
  panel.id = "notifPanel";
  panel.innerHTML = `
    <div class="notif-head">
      <h3>الإشعارات التنبيهية</h3>
      <button class="btn" style="background:rgba(255,255,255,0.2); color:#fff; border:none; padding:4px 8px" id="closeNotif">&times;</button>
    </div>
    <div class="notif-body">
      <div class="notif-item">
        <div class="notif-icon">🔔</div>
        <div>
          <b>تنبيه جلسة جديدة</b>
          <p class="mini">تمت إضافة 3 حالات جديدة لجلسة الغد.</p>
          <small>منذ 10 دقائق</small>
        </div>
      </div>
      <div class="notif-item">
        <div class="notif-icon">✍️</div>
        <div>
          <b>توقيع مطلوب</b>
          <p class="mini">يرجى مراجعة وتوقيع قرارات جلسة الأربعاء.</p>
          <small>منذ ساعة</small>
        </div>
      </div>
    </div>
  `;
  const overlay = document.createElement("div");
  overlay.className = "notif-overlay";
  overlay.id = "notifOverlay";

  document.body.appendChild(panel);
  document.body.appendChild(overlay);
}

function bindNotifications() {
  const trigger = document.querySelector(".notif-trigger");
  const panel = document.getElementById("notifPanel");
  const overlay = document.getElementById("notifOverlay");
  const close = document.getElementById("closeNotif");

  if (!trigger || !panel) return;

  const toggle = (show) => {
    panel.classList.toggle("open", show);
    overlay.classList.toggle("show", show);
  };

  trigger.addEventListener("click", () => toggle(true));
  overlay.addEventListener("click", () => toggle(false));
  close.addEventListener("click", () => toggle(false));
}

function bindActions() {
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      toast(button.dataset.message || `تم تنفيذ الإجراء: ${button.dataset.action}`);
      const target = button.dataset.target;
      if (target) {
        document.querySelectorAll(`[data-sim="${target}"]`).forEach((item) => {
          item.classList.toggle("show");
        });
      }
      const redirect = button.dataset.redirect;
      if (redirect) {
        setTimeout(() => {
          window.location.href = redirect;
        }, 500);
      }
    });
  });
}

function bindTabs() {
  document.querySelectorAll(".tabs").forEach((tabs) => {
    tabs.querySelectorAll(".tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
        tab.classList.add("active");
        const host = tabs.closest(".card, .main, body");
        host.querySelectorAll("[data-tab-panel]").forEach((panel) => {
          panel.style.display = panel.dataset.tabPanel === tab.dataset.tab ? "block" : "none";
        });
      });
    });
  });
}

function bindQueries() {
  document.querySelectorAll("[data-query-box]").forEach((box) => {
    const states = box.querySelectorAll(".query-state");
    box.querySelectorAll("[data-query]").forEach((button) => {
      button.addEventListener("click", () => {
        states.forEach((state) => state.classList.remove("active"));
        const next = box.querySelector(`.query-state[data-state="${button.dataset.query}"]`);
        if (next) next.classList.add("active");
        toast("تم تحديث نتيجة الاستعلام");
      });
    });
  });
}

function bindRoleSwitcher() {
  document.querySelectorAll("[data-role-switcher]").forEach((switcher) => {
    const target = document.querySelector(switcher.dataset.target);
    if (!target) return;
    switcher.addEventListener("change", () => {
      target.querySelectorAll("[data-role-case]").forEach((item) => {
        item.style.display = item.dataset.roleCase === switcher.value ? "block" : "none";
      });
    });
    switcher.dispatchEvent(new Event("change"));
  });
}

function bindStepLinks() {
  document.querySelectorAll("[data-step-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = document.querySelector(link.dataset.stepLink);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function toast(message) {
  document.querySelector(".toast")?.remove();
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  document.body.appendChild(node);
  setTimeout(() => node.remove(), 2600);
}

function initCharts() {
  const pieDom = document.getElementById('chart-pie');
  const barDom = document.getElementById('chart-bar');

  if (pieDom) {
    const pieChart = echarts.init(pieDom);
    const section = document.body.dataset.section;
    let data = [
      { value: 1048, name: 'مكتمل' },
      { value: 735, name: 'قيد المراجعة' },
      { value: 580, name: 'جديد' }
    ];

    if (section === 'm4') {
      data = [
        { value: 120, name: 'تقييم عجز' },
        { value: 80, name: 'إعادة عرض' },
        { value: 50, name: 'تنسيق خارجي' }
      ];
    } else if (section === 'm6') {
      data = [
        { value: 45, name: 'مستشفيات' },
        { value: 32, name: 'مراكز طبية' },
        { value: 12, name: 'عيادات تخصصية' }
      ];
    }

    pieChart.setOption({
      tooltip: { trigger: 'item' },
      color: ['#006747', '#D4AF37', '#6c757d', '#dc3545'],
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
        label: { show: false, position: 'center' },
        emphasis: { label: { show: true, fontSize: 18, fontWeight: 'bold' } },
        data: data
      }]
    });
  }

  if (barDom) {
    const barChart = echarts.init(barDom);
    barChart.setOption({
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: ['يناير', 'فبراير', 'مارس', 'أبريل'] },
      yAxis: { type: 'value' },
      series: [{
        data: [120, 200, 150, 80],
        type: 'bar',
        itemStyle: { color: '#006747' }
      }]
    });
  }
}
