(function () {
    function getRoot() {
        return document.body.dataset.root || './';
    }

    function getPageKind() {
        return document.body.dataset.pageKind || 'external';
    }

    function getUserRole() {
        return document.body.dataset.userRole || '';
    }

    function ensureSkipLink() {
        if (!document.querySelector('.skip-link')) {
            document.body.insertAdjacentHTML('afterbegin', '<a class="skip-link" href="#mainContent">تجاوز إلى المحتوى الرئيسي</a>');
        }
    }

    function getPathFromRoot() {
        const pathname = decodeURIComponent(window.location.pathname || '').replace(/\\/g, '/');
        const marker = '/Saving-V2/';
        const markerIndex = pathname.lastIndexOf(marker);
        if (markerIndex >= 0) {
            return pathname.slice(markerIndex + marker.length);
        }

        const localMarker = 'Saving-V2/';
        const localIndex = pathname.lastIndexOf(localMarker);
        if (localIndex >= 0) {
            return pathname.slice(localIndex + localMarker.length);
        }

        return 'index.html';
    }

    function getServiceAudience() {
        const explicitAudience = document.body.dataset.serviceAudience;
        if (explicitAudience) return explicitAudience;

        const path = getPathFromRoot();
        if (path.indexOf('services/saver/') === 0) return 'saver';
        if (path.indexOf('services/employer/') === 0) return 'employer';
        return '';
    }

    function getAccountLabel() {
        const role = getUserRole() || getServiceAudience();
        if (role === 'saver') return 'حساب شخصي';
        if (role === 'employer') return 'حساب تجاري';
        return 'الخدمات الخارجية';
    }

    function getSignInHref() {
        const root = getRoot();
        const path = getPathFromRoot();
        return root + 'sign-in.html?redirect=' + encodeURIComponent(path || 'index.html');
    }

    function renderHeader() {
        if (document.querySelector('.gup-site-header')) return;

        const root = getRoot();
        const pageKind = getPageKind();
        const userRole = getUserRole();
        const landingHref = document.body.dataset.landingHref || '';

        const leftMeta = pageKind === 'auth'
            ? `
                <div class="gup-header-meta">
                    <a class="gup-header-link" href="${root}index.html">الرئيسية</a>
                    <a class="gup-header-link" href="#">English</a>
                </div>`
            : userRole
                ? `
                    <div class="gup-header-meta">
                        <a class="gup-icon-link" href="${landingHref || root + 'index.html'}"><i class="fas fa-arrow-right"></i><span>العودة إلى بطاقة الخدمة</span></a>
                        <span class="gup-account-chip">${getAccountLabel()}</span>
                    </div>`
                : `
                    <div class="gup-header-meta">
                        <a class="gup-icon-link" href="${getSignInHref()}"><i class="fas fa-arrow-right-to-bracket"></i><span>تسجيل الدخول</span></a>
                        <a class="gup-header-link" href="#">English</a>
                    </div>`;

        const rightTools = pageKind === 'auth'
            ? `
                <div class="gup-header-tools">
                    <a class="gup-header-link" href="#">ابحث</a>
                    <a class="gup-header-link" href="#">القائمة</a>
                </div>`
            : `
                <div class="gup-header-tools">
                    <a class="gup-header-link" href="#">ابحث</a>
                    <a class="gup-header-link" href="#">القائمة</a>
                </div>`;

        const html = `
            <header class="gup-site-header">
                <div class="gup-site-header-inner">
                    ${leftMeta}
                    <a class="gup-brand" href="${root}index.html" aria-label="الانتقال إلى قائمة خدمات الادخار">
                        <img src="${root}assets/img/Gov.omLogo.png" alt="Gov.om">
                    </a>
                    ${rightTools}
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
                    <p class="mb-0">شاركنا رأيك أو أبلغ عن أي مشكلة تتعلق بالمحتوى أو الوصول إلى الخدمة.</p>
                </div>
                <div class="gup-feedback-actions">
                    <a href="#" class="gup-secondary-btn">نعم</a>
                    <a href="#" class="gup-secondary-btn">لا</a>
                    <a href="#" class="gup-outline-btn">الإبلاغ عن مشكلة</a>
                </div>
            </section>`;

        main.insertAdjacentHTML('beforeend', html);
    }

    function renderFooter() {
        if (document.querySelector('.gup-site-footer')) return;

        const html = `
            <footer class="gup-site-footer">
                <div class="gup-site-footer-inner">
                    <section class="gup-footer-top">
                        <div class="gup-footer-emergency">
                            <div>
                                <h2>أرقام الطوارئ</h2>
                                <p>عرض جميع الأرقام</p>
                            </div>
                            <div class="gup-footer-number">
                                <span>الطوارئ</span>
                                <strong>9999</strong>
                            </div>
                            <div class="gup-footer-number">
                                <span>بلاغات المياه</span>
                                <strong>1442</strong>
                            </div>
                            <div class="gup-footer-number">
                                <span>بلاغات الكهرباء</span>
                                <strong>80070008</strong>
                            </div>
                        </div>
                    </section>
                    <section class="gup-footer-bottom">
                        <div class="gup-footer-grid">
                            <div class="gup-footer-col">
                                <h3>فئات الخدمة</h3>
                                <ul>
                                    <li><a href="#">التعليم والبحث العلمي والابتكار</a></li>
                                    <li><a href="#">الأسرة والمجتمع</a></li>
                                    <li><a href="#">الأعمال والاستثمار</a></li>
                                    <li><a href="#">العمل والقوى العاملة</a></li>
                                </ul>
                            </div>
                            <div class="gup-footer-col">
                                <h3>عمان الرقمية</h3>
                                <ul>
                                    <li><a href="#">الرئيسية</a></li>
                                    <li><a href="#">مركز الأخبار</a></li>
                                    <li><a href="#">المؤسسات الحكومية</a></li>
                                    <li><a href="#">المشاركة الرقمية</a></li>
                                </ul>
                            </div>
                            <div class="gup-footer-col">
                                <h3>روابط مفيدة</h3>
                                <div class="gup-footer-socials mb-3">
                                    <a href="#" aria-label="واتساب"><i class="fab fa-whatsapp"></i></a>
                                    <a href="#" aria-label="لينكدإن"><i class="fab fa-linkedin-in"></i></a>
                                    <a href="#" aria-label="سناب شات"><i class="fab fa-snapchat-ghost"></i></a>
                                    <a href="#" aria-label="إنستغرام"><i class="fab fa-instagram"></i></a>
                                    <a href="#" aria-label="إكس"><i class="fab fa-x-twitter"></i></a>
                                    <a href="#" aria-label="فيسبوك"><i class="fab fa-facebook-f"></i></a>
                                    <a href="#" aria-label="يوتيوب"><i class="fab fa-youtube"></i></a>
                                </div>
                                <div class="gup-footer-links">
                                    <a href="#">عن البوابة</a>
                                    <a href="#">الأسئلة الشائعة</a>
                                    <a href="#">تواصل معنا</a>
                                    <a href="#">سهولة الوصول</a>
                                    <a href="#">خريطة الموقع</a>
                                    <a href="#">الدفع الإلكتروني</a>
                                    <a href="#">سياسة الخصوصية والشروط</a>
                                </div>
                            </div>
                        </div>
                        <div class="gup-footer-bottom-row">
                            <div class="gup-footer-brand">
                                <img src="${getRoot()}assets/img/Gov.omLogo.png" alt="Gov.om">
                                <div>
                                    <div>Gov.om</div>
                                    <small>بوابة النماذج الأولية - صندوق الحماية الاجتماعية</small>
                                </div>
                            </div>
                            <div class="gup-app-badges">
                                <span class="gup-app-badge"><i class="fab fa-huawei"></i> AppGallery</span>
                                <span class="gup-app-badge"><i class="fab fa-google-play"></i> Google Play</span>
                                <span class="gup-app-badge"><i class="fab fa-apple"></i> App Store</span>
                            </div>
                        </div>
                    </section>
                </div>
            </footer>`;

        document.body.insertAdjacentHTML('beforeend', html);
    }

    function decorateServiceLanding() {
        if (getUserRole()) return;

        const startButton = document.querySelector('.landing-side-card .gup-primary-btn');
        if (!startButton) return;

        const path = getPathFromRoot();
        if (!/\/index\.html$/.test(path)) return;

        const startPath = path.replace(/index\.html$/, 'start.html');
        const signInHref = getRoot() + 'sign-in.html?redirect=' + encodeURIComponent(startPath);

        startButton.setAttribute('href', signInHref);
        startButton.textContent = 'ابدأ الخدمة';

        const disclaimer = document.querySelector('.landing-disclaimer');
        if (disclaimer) {
            disclaimer.textContent = 'بالضغط على "ابدأ الخدمة" ستنتقل إلى صفحة تسجيل الدخول الحكومية ثم يتم تحويلك إلى تنفيذ الخدمة.';
        }
    }

    function normalizeMainId() {
        const main = document.querySelector('main');
        if (main && !main.id) {
            main.id = 'mainContent';
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        ensureSkipLink();
        normalizeMainId();
        renderHeader();
        decorateServiceLanding();
        renderFeedback();
        renderFooter();
    });
})();
