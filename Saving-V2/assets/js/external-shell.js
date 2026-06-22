(function () {
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
        const landingHref = document.body.dataset.landingHref || '';
        const serviceName = document.body.dataset.serviceName || '';
        const secondaryLink = landingHref
            ? `<a class="gup-outline-btn" href="${landingHref}">بطاقة الخدمة</a>`
            : `<a class="gup-outline-btn" href="${root}index.html">قائمة الخدمات</a>`;

        const html = `
            <header class="gup-site-header">
                <div class="gup-site-header-inner">
                    <a class="gup-brand" href="${root}index.html">
                        <img src="${root}assets/img/SPF_logo_gold.svg" alt="SPF">
                        <div>
                            <div>بوابة خدمات الادخار</div>
                            <small class="text-muted">${serviceName || 'خدمات متوافقة مع GUP'}</small>
                        </div>
                    </a>
                    <div class="gup-header-actions">
                        <a class="gup-header-link" href="${root}index.html">الخدمات</a>
                        <a class="gup-header-link" href="#">English</a>
                        ${secondaryLink}
                        <a class="gup-primary-btn" href="#">تسجيل الدخول</a>
                    </div>
                </div>
            </header>`;

        document.body.insertAdjacentHTML('afterbegin', html);
    }

    function renderFeedback() {
        const main = document.querySelector('main');
        if (!main || document.querySelector('.feedback-strip')) return;

        const html = `
            <section class="feedback-strip">
                <div>
                    <h3 class="mb-2">هل أنت راض عن هذه الصفحة؟</h3>
                    <p class="mb-0">يمكنك تقييم المحتوى أو الإبلاغ عن أي ملاحظة قبل الانتقال إلى مزود الخدمة.</p>
                </div>
                <div class="gup-inline-actions">
                    <a href="#" class="gup-secondary-btn">نعم</a>
                    <a href="#" class="gup-secondary-btn">لا</a>
                    <a href="#" class="gup-outline-btn">الإبلاغ عن مشكلة</a>
                </div>
            </section>`;

        main.insertAdjacentHTML('beforeend', html);
    }

    function renderFooter() {
        if (document.querySelector('.gup-site-footer')) return;
        const root = getRoot();
        const html = `
            <footer class="gup-site-footer">
                <div class="gup-site-footer-inner">
                    <div class="gup-site-footer-grid">
                        <section>
                            <h3>أرقام مهمة</h3>
                            <ul class="list-unstyled m-0">
                                <li>الطوارئ: 9999</li>
                                <li>المياه: 1442</li>
                                <li>الكهرباء: 80070008</li>
                            </ul>
                        </section>
                        <section>
                            <h3>فئات الخدمة</h3>
                            <ul class="list-unstyled m-0">
                                <li><a href="${root}index.html#saver-services">خدمات المدخر</a></li>
                                <li><a href="${root}index.html#employer-services">خدمات صاحب العمل</a></li>
                                <li><a href="${root}internal/staff/index.html">بيئة العمل الداخلية</a></li>
                            </ul>
                        </section>
                        <section>
                            <h3>روابط مفيدة</h3>
                            <ul class="list-unstyled m-0">
                                <li><a href="${root}Full-BRD/Saving-Full-BRD.html">وثيقة متطلبات الأعمال</a></li>
                                <li><a href="${root}helper-docs/prototype-gap-audit-vs-full-brd.md">تدقيق التغطية</a></li>
                                <li><a href="${root}_legacy/current/index.html">النسخة المؤرشفة من V2</a></li>
                            </ul>
                        </section>
                    </div>
                    <div class="border-top pt-3" style="border-color: rgba(255,255,255,.14) !important;">
                        <div style="color: rgba(255,255,255,.72);">© Gov.om / SPF Saving V2</div>
                    </div>
                </div>
            </footer>`;

        document.body.insertAdjacentHTML('beforeend', html);
    }

    document.addEventListener('DOMContentLoaded', function () {
        ensureSkipLink();
        renderHeader();
        renderFeedback();
        renderFooter();
    });
})();