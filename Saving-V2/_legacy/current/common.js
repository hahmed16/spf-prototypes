/**
 * SPF Saving System Mockup - Shared Logic
 */

document.addEventListener('DOMContentLoaded', function () {
    initLayout();
    initUserToggle();
    initNotifications();
    highlightActiveLink();
});

function initLayout() {
    const skipLinkHTML = `<a class="skip-link" href="#mainContent">تجاوز إلى المحتوى الرئيسي</a>`;
    const navbarHTML = `
    <nav class="spf-navbar">
        <a href="index.html" class="navbar-brand">
            <div class="logo-placeholder"><i class="fas fa-shield-alt"></i></div>
            <div class="d-none d-md-block">صندوق الحماية الاجتماعية</div>
        </a>

        <div class="navbar-title d-none d-lg-block" id="pageTitle"></div>

        <div class="navbar-actions">
            <a href="#" class="nav-link d-none d-lg-inline-flex">English</a>
            <div class="user-toggle me-3" id="globalUserToggle">
                <button class="toggle-btn active" data-role="saver">المدخر</button>
                <button class="toggle-btn" data-role="employer">صاحب العمل</button>
                <button class="toggle-btn" data-role="staff">موظف الصندوق</button>
            </div>

            <div class="notification-bell" id="notifBell">
                <i class="far fa-bell"></i>
                <span class="badge rounded-pill bg-danger">3</span>

                <div class="notification-panel" id="notifPanel">
                    <div class="panel-header">
                        <span>التنبيهات</span>
                        <a href="#" class="text-spf-dark text-decoration-none small">تحديد الكل كمقروء</a>
                    </div>
                    <div class="panel-body">
                        <div class="notif-item unread">
                            <div class="notif-title">تم تحديث رحلة تسوية مكافأة الخدمة السابقة</div>
                            <div class="notif-time">منذ 10 دقائق</div>
                        </div>
                        <div class="notif-item unread">
                            <div class="notif-title">يوجد طلب اعتراض أجر بانتظار الرد</div>
                            <div class="notif-time">منذ ساعتين</div>
                        </div>
                        <div class="notif-item unread">
                            <div class="notif-title">تم تحويل حالة إلى المعالجة اليدوية</div>
                            <div class="notif-time">منذ يوم واحد</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="user-badge ms-2">
                <span>أحمد البوسعيدي</span>
                <div class="user-avatar">أ</div>
            </div>

            <a href="index.html" class="nav-link">
                <i class="fas fa-home"></i>
            </a>
        </div>
    </nav>`;

    const sidebarHTML = `
    <aside class="spf-sidebar" id="mainSidebar">
        <div class="sidebar-header">القائمة الرئيسية</div>
        <ul class="sidebar-nav">
            <li class="nav-saver nav-employer nav-staff"><a href="index.html" id="link-index"><i class="fas fa-home"></i> الصفحة الرئيسية</a></li>
            <li class="nav-saver nav-employer nav-staff"><a href="01-dashboard.html" id="link-01"><i class="fas fa-th-large"></i> لوحة التحكم</a></li>
            <li class="nav-saver nav-employer"><a href="02-registration.html" id="link-02"><i class="fas fa-user-plus"></i> التسجيل في النظام</a></li>

            <li class="nav-staff sidebar-category-header mt-3">قسم النظم التكميلية</li>
            <li class="nav-employer nav-staff"><a href="03-registered-workers.html" id="link-03"><i class="fas fa-users"></i> العمال المسجلين</a></li>
            <li class="nav-saver nav-employer nav-staff"><a href="04-account-details.html" id="link-04"><i class="fas fa-info-circle"></i> تفاصيل الحساب</a></li>
            <li class="nav-employer"><a href="16-gratuity-settlement-employer.html" id="link-16"><i class="fas fa-scale-balanced"></i> تسوية مكافأة الخدمة</a></li>
            <li class="nav-saver"><a href="17-gratuity-settlement-employee.html" id="link-17"><i class="fas fa-file-signature"></i> إشعار التسوية</a></li>
            <li class="nav-saver nav-employer nav-staff"><a href="18-salary-objection.html" id="link-18"><i class="fas fa-money-bill-wave"></i> اعتراض الأجر</a></li>
            <li class="nav-staff"><a href="14-transaction-history.html" id="link-14-staff"><i class="fas fa-history"></i> سجل العمليات</a></li>

            <li class="nav-staff sidebar-category-header mt-3">موظفي الصرف</li>
            <li class="nav-staff"><a href="10-disbursement-processing.html" id="link-10"><i class="fas fa-tasks"></i> معالجة طلبات الصرف</a></li>
            <li class="nav-staff"><a href="19-manual-cases.html" id="link-19"><i class="fas fa-briefcase-medical"></i> الحالات اليدوية</a></li>
            <li class="nav-saver"><a href="08-disbursement.html" id="link-08"><i class="fas fa-money-check-alt"></i> طلبات الصرف (المدخر)</a></li>

            <li class="nav-staff sidebar-category-header mt-3">موظفي الاستثمار</li>
            <li class="nav-staff"><a href="07-investment-return.html" id="link-07"><i class="fas fa-chart-line"></i> عائد الاستثمار</a></li>
            <li class="nav-staff"><a href="12-surplus-transfers.html" id="link-12"><i class="fas fa-exchange-alt"></i> تحويل الفائض</a></li>

            <li class="nav-staff sidebar-category-header mt-3">روابط عامة</li>
            <li class="nav-saver nav-employer"><a href="05-deposit.html" id="link-05"><i class="fas fa-hand-holding-usd"></i> الإيداع الإلكتروني</a></li>
            <li class="nav-saver"><a href="06-obligations.html" id="link-06"><i class="fas fa-file-invoice-dollar"></i> سداد الالتزامات</a></li>
            <li class="nav-employer nav-staff"><a href="20-mandatory-invoices.html" id="link-20"><i class="fas fa-file-invoice"></i> فواتير الادخار الإلزامي</a></li>
            <li class="nav-staff"><a href="09-mandatory-saving.html" id="link-09"><i class="fas fa-piggy-bank"></i> الادخار الإلزامي</a></li>
            <li class="nav-staff"><a href="11-optional-saving-inquiries.html" id="link-11"><i class="fas fa-hand-holding-heart"></i> الادخار الاختياري</a></li>
            <li class="nav-saver nav-staff"><a href="21-exit-notification.html" id="link-21"><i class="fas fa-door-open"></i> إخطار الخروج وفقدان الشرط</a></li>
            <li class="nav-saver"><a href="13-exit-system.html" id="link-13"><i class="fas fa-user-times"></i> الخروج من النظام</a></li>
            <li class="nav-saver nav-employer" id="li-14-saver"><a href="14-transaction-history.html" id="link-14"><i class="fas fa-history"></i> سجل المعاملات</a></li>
            <li class="nav-staff"><a href="15-reports.html" id="link-15"><i class="fas fa-chart-pie"></i> التقارير والتحليل</a></li>
        </ul>
    </aside>`;

    const footerHTML = `
    <footer class="gup-footer ${document.body.classList.contains('no-sidebar') ? 'no-sidebar' : ''}">
        <div class="gup-footer-inner">
            <div class="gup-footer-grid">
                <div>
                    <div class="gup-footer-title">أرقام مهمة</div>
                    <ul class="gup-footer-list">
                        <li>الطوارئ: 9999</li>
                        <li>المياه: 1442</li>
                        <li>الكهرباء: 80070008</li>
                    </ul>
                </div>
                <div>
                    <div class="gup-footer-title">روابط الخدمة</div>
                    <ul class="gup-footer-list">
                        <li><a href="01-dashboard.html">لوحة التحكم</a></li>
                        <li><a href="02-registration.html">التسجيل في النظام</a></li>
                        <li><a href="15-reports.html">التقارير والتحليل</a></li>
                    </ul>
                </div>
                <div>
                    <div class="gup-footer-title">عن V2</div>
                    <div class="gup-footer-copy">تمت إعادة تهيئة الطبقة البصرية في V2 لتكون أقرب إلى معايير GUP مع الحفاظ على المسارات التشغيلية الحالية.</div>
                </div>
            </div>
            <div class="gup-footer-divider"></div>
            <div class="gup-footer-inline">© Gov.om / SPF Saving V2</div>
        </div>
    </footer>`;

    const navbarPlaceholder = document.getElementById('navbarPlaceholder');
    const sidebarPlaceholder = document.getElementById('sidebarPlaceholder');

    if (!document.querySelector('.skip-link')) {
        document.body.insertAdjacentHTML('afterbegin', skipLinkHTML);
    }

    if (navbarPlaceholder) navbarPlaceholder.innerHTML = navbarHTML;
    if (sidebarPlaceholder) sidebarPlaceholder.innerHTML = sidebarHTML;

    const mainElem = document.querySelector('main.spf-main');
    if (mainElem && !mainElem.id) {
        mainElem.id = 'mainContent';
    }

    if (!document.querySelector('.gup-footer')) {
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }

    const pageTitleElem = document.getElementById('pageTitle');
    if (pageTitleElem) {
        pageTitleElem.innerText = document.title.split('-')[0].trim();
    }
}

function initUserToggle() {
    const toggleButtons = document.querySelectorAll('#globalUserToggle .toggle-btn');
    const savedRole = localStorage.getItem('spf-user-role') || 'saver';

    toggleButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-role') === savedRole);

        btn.addEventListener('click', function () {
            const role = this.getAttribute('data-role');
            localStorage.setItem('spf-user-role', role);

            toggleButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            applyRoleVisibility(role);
            document.dispatchEvent(new CustomEvent('spfRoleChanged', { detail: { role } }));
        });
    });

    applyRoleVisibility(savedRole);
}

function applyRoleVisibility(role) {
    document.body.setAttribute('data-user-role', role);

    const sidebar = document.getElementById('mainSidebar');
    if (sidebar) {
        sidebar.querySelectorAll('.sidebar-nav li').forEach(li => {
            li.style.display = li.classList.contains('nav-' + role) ? 'block' : 'none';
        });

        const li14Saver = document.getElementById('li-14-saver');
        if (li14Saver) {
            li14Saver.style.display = (role === 'saver' || role === 'employer') ? 'block' : 'none';
        }
    }

    document.querySelectorAll('.role-section').forEach(section => {
        section.classList.toggle('d-none', !section.classList.contains('role-' + role));
    });

    document.querySelectorAll('.current-role-badge').forEach(badge => {
        if (role === 'saver') {
            badge.className = 'current-role-badge badge user-type-badge saver';
            badge.innerText = 'المدخر';
        } else if (role === 'employer') {
            badge.className = 'current-role-badge badge user-type-badge employer';
            badge.innerText = 'صاحب العمل';
        } else {
            badge.className = 'current-role-badge badge user-type-badge staff';
            badge.innerText = 'موظف الصندوق';
        }
    });
}

function initNotifications() {
    const notifBell = document.getElementById('notifBell');
    const notifPanel = document.getElementById('notifPanel');

    if (!notifBell || !notifPanel) return;

    notifBell.addEventListener('click', e => {
        e.stopPropagation();
        notifPanel.classList.toggle('show');
    });

    document.addEventListener('click', () => {
        notifPanel.classList.remove('show');
    });

    notifPanel.addEventListener('click', e => {
        e.stopPropagation();
    });
}

function highlightActiveLink() {
    const currentPath = window.location.pathname.split('/').pop();
    const activeLink = document.querySelector(`.sidebar-nav a[href="${currentPath}"]`);
    if (activeLink) activeLink.classList.add('active');
}

window.spf = {
    showSuccess(message) {
        renderFeedbackModal({
            iconClass: 'fas fa-check-circle text-spf',
            title: 'تمت العملية بنجاح',
            message
        });
    },

    showError(message) {
        renderFeedbackModal({
            iconClass: 'fas fa-exclamation-circle text-danger',
            title: 'عذرًا، حدث خطأ',
            message,
            danger: true
        });
    },

    renderInquiries(inquiries) {
        if (!inquiries || !inquiries.length) return;

        const main = document.querySelector('main.spf-main');
        if (!main) return;

        const html = `
        <div class="inquiry-panel">
            <div class="inquiry-header">
                <i class="fas fa-question-circle"></i>
                <span>الاستفسارات والتوضيحات</span>
            </div>
            <div class="inquiry-body">
                <ul class="inquiry-list">
                    ${inquiries.map(item => `<li class="inquiry-item">${item}</li>`).join('')}
                </ul>
            </div>
        </div>`;

        main.insertAdjacentHTML('beforeend', html);
    }
};

function renderFeedbackModal({ iconClass, title, message, danger = false }) {
    const modalId = 'feedbackModal' + Date.now();
    const modalHTML = `
    <div class="modal fade" id="${modalId}" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content ${danger ? 'border-danger' : ''}">
                <div class="modal-body text-center py-5">
                    <div class="mb-3" style="font-size: 3rem;">
                        <i class="${iconClass}"></i>
                    </div>
                    <h5 class="fw-800 mb-2">${title}</h5>
                    <p class="text-muted mb-4">${message}</p>
                    <button type="button" class="btn btn-spf px-5" data-bs-dismiss="modal">موافق</button>
                </div>
            </div>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modalEl = document.getElementById(modalId);
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
    modalEl.addEventListener('hidden.bs.modal', () => modalEl.remove());
}

document.addEventListener('change', function (e) {
    if (!e.target || e.target.name !== 'paymentMethod') return;

    const val = e.target.value;
    const container = e.target.closest('form') || document;
    const chequeNote = container.querySelector('#chequeNote');
    const chequeFields = container.querySelector('.cheque-details-fields');
    const cardFields = container.querySelector('#cardDetails');

    container.querySelectorAll('.payment-method-card').forEach(card => {
        card.classList.toggle('active', !!card.querySelector('input:checked'));
    });

    if (chequeNote) chequeNote.style.display = (val === 'cheque') ? 'flex' : 'none';
    if (chequeFields) chequeFields.style.display = (val === 'cheque') ? 'block' : 'none';
    if (cardFields) cardFields.style.display = (val === 'card') ? 'block' : 'none';
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.payment-method-card input:checked').forEach(input => {
        input.closest('.payment-method-card').classList.add('active');
    });
});
