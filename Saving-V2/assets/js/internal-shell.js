(function () {
    const sidebarGroups = [
        {
            title: 'الرئيسية',
            links: [
                { href: 'index.html', icon: 'fa-chart-line', label: 'لوحة التحكم' }
            ]
        },
        {
            title: 'التشغيل',
            links: [
                { href: 'registration-operations.html', icon: 'fa-user-plus', label: 'عمليات التسجيل' },
                { href: 'mandatory-saving-operations.html', icon: 'fa-piggy-bank', label: 'الادخار الإلزامي' },
                { href: 'optional-saving-operations.html', icon: 'fa-hand-holding-heart', label: 'الادخار الاختياري' },
                { href: 'salary-objections.html', icon: 'fa-money-bill-wave', label: 'اعتراضات الأجر' },
                { href: 'disbursement-processing.html', icon: 'fa-money-check-dollar', label: 'معالجة الصرف' },
                { href: 'exit-notifications.html', icon: 'fa-door-open', label: 'إشعارات الخروج' },
                { href: 'manual-cases.html', icon: 'fa-briefcase', label: 'الحالات اليدوية' }
            ]
        },
        {
            title: 'المالية والتقارير',
            links: [
                { href: 'investment-return.html', icon: 'fa-chart-pie', label: 'عوائد الاستثمار' },
                { href: 'surplus-transfers.html', icon: 'fa-right-left', label: 'تحويلات الفائض' },
                { href: 'mandatory-invoices.html', icon: 'fa-file-invoice', label: 'الفواتير' },
                { href: 'transaction-history.html', icon: 'fa-clock-rotate-left', label: 'سجل العمليات' },
                { href: 'reports.html', icon: 'fa-chart-column', label: 'التقارير' }
            ]
        }
    ];

    function getRoot() {
        return document.body.dataset.root || './';
    }

    function ensureSkipLink() {
        if (!document.querySelector('.skip-link')) {
            document.body.insertAdjacentHTML('afterbegin', '<a class="skip-link" href="#mainContent">تجاوز إلى المحتوى الرئيسي</a>');
        }
    }

    function renderHeader() {
        const root = getRoot();
        const html = `
            <header class="gup-site-header">
                <div class="gup-site-header-inner">
                    <a class="gup-brand" href="${root}index.html">
                        <img src="${root}assets/img/Gov.omLogo.png" alt="Gov.om">
                        <div>
                            <div>بيئة العمل الداخلية</div>
                            <small class="text-muted">موظف الصندوق</small>
                        </div>
                    </a>
                    <div class="gup-header-actions">
                        <a class="gup-header-link" href="${root}index.html">قائمة الخدمات</a>
                        <a class="gup-header-link" href="#">English</a>
                        <span class="context-chip">موظف الصندوق</span>
                    </div>
                </div>
            </header>`;

        document.body.insertAdjacentHTML('afterbegin', html);
    }

    function renderSidebar() {
        const root = getRoot();
        const current = window.location.pathname.split('/').pop();
        const groupsHtml = sidebarGroups.map(group => `
            <section class="internal-sidebar-group">
                <div class="internal-sidebar-title">${group.title}</div>
                ${group.links.map(link => `
                    <a href="${link.href}" class="${current === link.href ? 'active' : ''}">
                        <i class="fas ${link.icon}"></i>
                        <span>${link.label}</span>
                    </a>
                `).join('')}
            </section>
        `).join('');

        const sidebarHtml = `<aside class="internal-sidebar">${groupsHtml}</aside>`;
        const main = document.querySelector('main');
        if (!main) return;

        const contentHtml = main.outerHTML;
        const layout = `
            <div class="internal-layout">
                ${sidebarHtml}
                <section class="internal-content">${contentHtml}</section>
            </div>`;

        main.outerHTML = layout;
    }

    function rewriteSidebarLinks() {
        const root = getRoot();
        document.querySelectorAll('.internal-sidebar a').forEach(link => {
            const href = link.getAttribute('href');
            link.setAttribute('href', root + 'internal/staff/' + href);
        });
    }

    function renderFooter() {
        if (document.querySelector('.gup-site-footer')) return;
        const root = getRoot();
        const html = `
            <footer class="gup-site-footer">
                <div class="gup-site-footer-inner">
                    <div class="gup-site-footer-grid">
                        <section>
                            <h3>غرفة التشغيل</h3>
                            <p class="mb-0">واجهة داخلية متوافقة بصريًا مع GUP مع الإبقاء على طبيعة العمل التشغيلي والجانبي.</p>
                        </section>
                        <section>
                            <h3>روابط داخلية</h3>
                            <ul class="list-unstyled m-0">
                                <li><a href="${root}internal/staff/index.html">اللوحة الداخلية</a></li>
                                <li><a href="${root}internal/staff/reports.html">التقارير</a></li>
                                <li><a href="${root}internal/staff/manual-cases.html">الحالات اليدوية</a></li>
                            </ul>
                        </section>
                        <section>
                            <h3>مراجع</h3>
                            <ul class="list-unstyled m-0">
                                <li><a href="${root}Full-BRD/Saving-Full-BRD.html">وثيقة متطلبات الأعمال</a></li>
                                <li><a href="${root}helper-docs/prototype-gap-audit-vs-full-brd.md">تدقيق التغطية</a></li>
                            </ul>
                        </section>
                    </div>
                </div>
            </footer>`;

        document.body.insertAdjacentHTML('beforeend', html);
    }

    document.addEventListener('DOMContentLoaded', function () {
        ensureSkipLink();
        renderHeader();
        renderSidebar();
        rewriteSidebarLinks();
        renderFooter();
    });
})();
