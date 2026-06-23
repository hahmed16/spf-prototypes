(function () {
    const sidebarGroups = [
        {
            title: 'الرئيسية',
            links: [
                { href: 'index.html', icon: 'fa-chart-line', label: 'لوحة التحكم التشغيلية' }
            ]
        },
        {
            title: 'الحسابات والعمال',
            links: [
                { href: 'worker-directory.html', icon: 'fa-address-book', label: 'دليل الحسابات والعمال' },
                { href: 'account-review.html', icon: 'fa-magnifying-glass-dollar', label: 'مراجعة الحساب الادخاري' }
            ]
        },
        {
            title: 'العمليات',
            links: [
                { href: 'disbursement-processing.html', icon: 'fa-money-check-dollar', label: 'معالجة طلبات الصرف' },
                { href: 'investment-return.html', icon: 'fa-chart-pie', label: 'عوائد الاستثمار' },
                { href: 'surplus-transfers.html', icon: 'fa-right-left', label: 'تحويلات الفائض' },
                { href: 'salary-objections.html', icon: 'fa-gavel', label: 'مراجعة اعتراضات الأجر' },
                { href: 'gratuity-tracking.html', icon: 'fa-file-contract', label: 'متابعة تسويات مكافأة الخدمة' }
            ]
        },
        {
            title: 'المالية والتقارير',
            links: [
                { href: 'financial-reconciliation.html', icon: 'fa-scale-balanced', label: 'المطابقة المالية' },
                { href: 'internal-log.html', icon: 'fa-clock-rotate-left', label: 'سجل العمليات الداخلي' },
                { href: 'reports.html', icon: 'fa-chart-column', label: 'التقارير والتحليلات' }
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
        if (document.querySelector('.gup-site-header')) return;
        const root = getRoot();
        document.body.insertAdjacentHTML('afterbegin', `
            <header class="gup-site-header">
                <div class="gup-site-header-inner">
                    <div class="gup-header-meta">
                        <a class="gup-icon-link" href="${root}index.html"><i class="fas fa-arrow-right"></i><span>قائمة الخدمات الخارجية</span></a>
                    </div>
                    <a class="gup-brand" href="${root}internal/staff/index.html" aria-label="بيئة العمل الداخلية">
                        <img src="${root}assets/img/Gov.omLogo.png" alt="Gov.om">
                    </a>
                    <div class="gup-header-tools">
                        <span class="context-chip">موظف الصندوق</span>
                    </div>
                </div>
            </header>`);
    }

    function renderSidebar() {
        const root = getRoot();
        const current = window.location.pathname.split('/').pop();
        const groupsHtml = sidebarGroups.map(group => `
            <section class="internal-sidebar-group">
                <div class="internal-sidebar-title">${group.title}</div>
                ${group.links.map(link => `
                    <a href="${root}internal/staff/${link.href}" class="${current === link.href ? 'active' : ''}">
                        <i class="fas ${link.icon}"></i>
                        <span>${link.label}</span>
                    </a>`).join('')}
            </section>`).join('');

        const main = document.querySelector('main');
        if (!main) return;
        const contentHtml = main.outerHTML;
        main.outerHTML = `
            <div class="internal-layout">
                <aside class="internal-sidebar">${groupsHtml}</aside>
                <section class="internal-content" id="mainContent">${contentHtml}</section>
            </div>`;
    }

    function renderFooter() {
        if (document.querySelector('.gup-site-footer')) return;
        const root = getRoot();
        document.body.insertAdjacentHTML('beforeend', `
            <footer class="gup-site-footer">
                <div class="gup-site-footer-inner">
                    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
                        <section>
                            <h3 style="color:#fff;margin-bottom:12px;">بيئة العمل الداخلية</h3>
                            <p style="color:rgba(255,255,255,.72);font-size:.88rem;">واجهة تشغيلية لموظفي صندوق الحماية الاجتماعية.</p>
                        </section>
                        <section>
                            <h3 style="color:#fff;margin-bottom:12px;">روابط سريعة</h3>
                            <ul style="list-style:none;padding:0;margin:0;display:grid;gap:8px;">
                                <li><a href="${root}internal/staff/index.html" style="color:rgba(255,255,255,.78);text-decoration:none;">لوحة التحكم</a></li>
                                <li><a href="${root}internal/staff/reports.html" style="color:rgba(255,255,255,.78);text-decoration:none;">التقارير</a></li>
                                <li><a href="${root}index.html" style="color:rgba(255,255,255,.78);text-decoration:none;">قائمة الخدمات الخارجية</a></li>
                            </ul>
                        </section>
                        <section>
                            <h3 style="color:#fff;margin-bottom:12px;">مراجع</h3>
                            <ul style="list-style:none;padding:0;margin:0;display:grid;gap:8px;">
                                <li><a href="${root}Full-BRD/Saving-Full-BRD.html" style="color:rgba(255,255,255,.78);text-decoration:none;">وثيقة متطلبات الأعمال</a></li>
                            </ul>
                        </section>
                    </div>
                </div>
            </footer>`);
    }

    document.addEventListener('DOMContentLoaded', function () {
        ensureSkipLink();
        renderHeader();
        renderSidebar();
        renderFooter();
    });
})();
