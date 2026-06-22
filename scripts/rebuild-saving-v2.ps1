Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Ensure-Directory {
    param([string]$Path)
    if (-not (Test-Path -LiteralPath $Path)) {
        New-Item -ItemType Directory -Path $Path | Out-Null
    }
}

function Write-Utf8File {
    param(
        [string]$Path,
        [string]$Content
    )
    $dir = Split-Path -Parent $Path
    if ($dir) {
        Ensure-Directory $dir
    }
    [System.IO.File]::WriteAllText($Path, $Content, [System.Text.UTF8Encoding]::new($false))
}

function Expand-Template {
    param(
        [string]$Template,
        [hashtable]$Values
    )

    $result = $Template
    foreach ($key in $Values.Keys) {
        $result = $result.Replace("__${key}__", [string]$Values[$key])
    }
    return $result
}

function Get-JoinedItems {
    param(
        [object[]]$Items,
        [scriptblock]$Renderer
    )
    return ($Items | ForEach-Object { & $Renderer $_ }) -join "`n"
}

function Extract-PagePart {
    param(
        [string]$Html,
        [string]$Pattern
    )

    $match = [regex]::Match($Html, $Pattern, [System.Text.RegularExpressions.RegexOptions]::Singleline)
    if ($match.Success) {
        return $match.Groups[1].Value.Trim()
    }

    return ''
}

function Transform-Content {
    param(
        [string]$Content,
        [hashtable]$Map,
        [string]$Prefix
    )

    $output = $Content
    foreach ($key in $Map.Keys) {
        $output = $output.Replace($key, "$Prefix$($Map[$key])")
    }

    $output = $output.Replace('styles.css', "${Prefix}assets/css/app.css")
    $output = $output.Replace('common.js', "${Prefix}assets/js/prototype-core.js")
    return $output
}

$scriptRoot = if ($PSCommandPath) {
    Split-Path -Parent $PSCommandPath
} else {
    Join-Path (Get-Location) 'scripts'
}
$repoRoot = Resolve-Path (Join-Path $scriptRoot '..')
$v2Root = Join-Path $repoRoot 'Saving-V2'
$legacyRoot = Join-Path $v2Root '_legacy'
$legacyCurrent = Join-Path $legacyRoot 'current'

Ensure-Directory $legacyCurrent

$legacyFiles = @(
    'index.html',
    '01-dashboard.html',
    '02-registration.html',
    '03-registered-workers.html',
    '04-account-details.html',
    '05-deposit.html',
    '06-obligations.html',
    '07-investment-return.html',
    '08-disbursement.html',
    '09-mandatory-saving.html',
    '10-disbursement-processing.html',
    '11-optional-saving-inquiries.html',
    '12-surplus-transfers.html',
    '13-exit-system.html',
    '14-transaction-history.html',
    '15-reports.html',
    '16-gratuity-settlement-employer.html',
    '17-gratuity-settlement-employee.html',
    '18-salary-objection.html',
    '19-manual-cases.html',
    '20-mandatory-invoices.html',
    '21-exit-notification.html',
    'common.js',
    'styles.css',
    'Logo.png',
    'omr_icon.svg',
    'SPF_logo_gold.svg'
)

foreach ($name in $legacyFiles) {
    $src = Join-Path $v2Root $name
    $dst = Join-Path $legacyCurrent $name
    if ((Test-Path -LiteralPath $src) -and -not (Test-Path -LiteralPath $dst)) {
        Move-Item -LiteralPath $src -Destination $dst
    }
}

$generatedDirs = @(
    (Join-Path $v2Root 'assets'),
    (Join-Path $v2Root 'services'),
    (Join-Path $v2Root 'internal')
)

foreach ($dir in $generatedDirs) {
    if (Test-Path -LiteralPath $dir) {
        Remove-Item -LiteralPath $dir -Recurse -Force
    }
}

Ensure-Directory (Join-Path $v2Root 'assets\css')
Ensure-Directory (Join-Path $v2Root 'assets\js')
Ensure-Directory (Join-Path $v2Root 'assets\img')
Ensure-Directory (Join-Path $v2Root 'services\saver')
Ensure-Directory (Join-Path $v2Root 'services\employer')
Ensure-Directory (Join-Path $v2Root 'internal\staff')

Copy-Item -LiteralPath (Join-Path $legacyCurrent 'styles.css') -Destination (Join-Path $v2Root 'assets\css\app.css') -Force
Copy-Item -LiteralPath (Join-Path $legacyCurrent 'Logo.png') -Destination (Join-Path $v2Root 'assets\img\Logo.png') -Force
Copy-Item -LiteralPath (Join-Path $legacyCurrent 'omr_icon.svg') -Destination (Join-Path $v2Root 'assets\img\omr_icon.svg') -Force
Copy-Item -LiteralPath (Join-Path $legacyCurrent 'SPF_logo_gold.svg') -Destination (Join-Path $v2Root 'assets\img\SPF_logo_gold.svg') -Force

$shellCss = @'
:root {
    --gup-color-brand-xhigh: #132459;
    --gup-color-brand-high: #243d89;
    --gup-color-brand-medium: #2f57cd;
    --gup-color-brand-low: #bfd8ff;
    --gup-color-brand-xlow: #dde9ff;
    --gup-color-neutral-xhigh: #202024;
    --gup-color-neutral-medium: #3f3f46;
    --gup-color-neutral-low: #d0d0d4;
    --gup-color-content-primary: #27272a;
    --gup-color-content-secondary: #52525b;
    --gup-color-content-tertiary: #7a7a83;
    --gup-color-background-canvas: #fefcf9;
    --gup-color-background-overcanvas: #eceef4;
    --gup-color-background-footer: #1c2133;
    --gup-color-background-base: #ffffff;
    --gup-color-border-low: #e1e1e2;
    --gup-color-shadow-1: rgba(28, 33, 51, 0.03);
    --gup-color-shadow-2: rgba(28, 33, 51, 0.06);
    --gup-radius-card: 12px;
    --gup-radius-control: 8px;
    --gup-radius-pill: 999px;
    --gup-focus-ring: #9747ff;
}

body {
    background: var(--gup-color-background-canvas);
    color: var(--gup-color-content-primary);
    font-family: "Readex Pro", system-ui, sans-serif;
}

.skip-link {
    position: absolute;
    inset-inline-start: 16px;
    top: -48px;
    z-index: 5000;
    padding: 10px 16px;
    border-radius: var(--gup-radius-pill);
    background: var(--gup-color-brand-medium);
    color: #fff;
    text-decoration: none;
}

.skip-link:focus {
    top: 12px;
    box-shadow: 0 0 0 2px #fff, 0 0 0 6px var(--gup-focus-ring);
}

.gup-site-header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--gup-color-border-low);
}

.gup-site-header-inner {
    max-width: 1440px;
    margin: 0 auto;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}

.gup-brand {
    display: flex;
    align-items: center;
    gap: 14px;
    color: var(--gup-color-brand-xhigh);
    text-decoration: none;
    font-weight: 700;
}

.gup-brand img {
    width: 44px;
    height: 44px;
    object-fit: contain;
}

.gup-header-actions,
.gup-inline-actions {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
}

.gup-header-link {
    color: var(--gup-color-brand-xhigh);
    text-decoration: none;
    font-weight: 700;
}

.gup-header-link:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
}

.gup-primary-btn,
.gup-secondary-btn,
.gup-outline-btn {
    border-radius: var(--gup-radius-pill);
    padding: 10px 18px;
    border: 1px solid transparent;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-weight: 700;
    text-decoration: none;
}

.gup-primary-btn {
    background: var(--gup-color-brand-medium);
    color: #fff;
}

.gup-outline-btn {
    background: #fff;
    border-color: var(--gup-color-brand-medium);
    color: var(--gup-color-brand-xhigh);
}

.gup-secondary-btn {
    background: var(--gup-color-background-overcanvas);
    color: var(--gup-color-brand-xhigh);
}

.gup-primary-btn:hover,
.gup-outline-btn:hover,
.gup-secondary-btn:hover {
    text-decoration: none;
    color: inherit;
    transform: translateY(-1px);
}

.gup-primary-btn:focus,
.gup-outline-btn:focus,
.gup-secondary-btn:focus,
.gup-header-link:focus,
.service-card:focus,
.service-card a:focus,
.attachment-link:focus {
    outline: none;
    box-shadow: 0 0 0 2px #fff, 0 0 0 6px var(--gup-focus-ring);
}

.gup-main-shell {
    max-width: 1440px;
    margin: 0 auto;
    padding: 32px 24px 64px;
}

.catalog-hero,
.service-landing-hero,
.internal-hero {
    border: 1px solid var(--gup-color-border-low);
    border-radius: 28px;
    background: linear-gradient(135deg, #eff5ff 0%, #f7f5f1 100%);
    padding: 32px;
    box-shadow: 0 12px 28px var(--gup-color-shadow-1);
    margin-bottom: 32px;
}

.catalog-hero h1,
.service-landing-hero h1,
.internal-hero h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--gup-color-brand-xhigh);
    margin-bottom: 16px;
}

.catalog-hero p,
.service-landing-hero p,
.internal-hero p,
.catalog-meta,
.service-meta {
    color: var(--gup-color-content-secondary);
    line-height: 1.8;
    margin: 0;
}

.catalog-section {
    margin-bottom: 40px;
}

.catalog-section-header {
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 16px;
    margin-bottom: 20px;
}

.catalog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
}

.service-card {
    height: 100%;
    border: 1px solid var(--gup-color-border-low);
    border-radius: var(--gup-radius-card);
    background: #fff;
    box-shadow: 0 12px 28px var(--gup-color-shadow-1);
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.service-card-tag,
.context-chip,
.summary-chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    width: fit-content;
    border-radius: var(--gup-radius-pill);
    padding: 6px 12px;
    background: var(--gup-color-brand-xlow);
    color: var(--gup-color-brand-xhigh);
    font-size: 0.88rem;
    font-weight: 700;
}

.service-card h3,
.service-panel h2,
.landing-body-section h2,
.landing-side-card h3 {
    margin: 0;
    color: var(--gup-color-brand-xhigh);
    font-weight: 700;
}

.service-card p,
.service-panel p,
.landing-body-section li,
.landing-side-card p,
.feedback-strip p,
.internal-grid-card p {
    color: var(--gup-color-content-secondary);
    line-height: 1.8;
}

.service-card-footer {
    margin-top: auto;
}

.landing-shell {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 340px;
    gap: 24px;
    align-items: start;
}

.landing-body-stack,
.landing-side-stack {
    display: grid;
    gap: 20px;
}

.landing-body-section,
.landing-side-card,
.internal-grid-card,
.feedback-strip {
    border: 1px solid var(--gup-color-border-low);
    border-radius: var(--gup-radius-card);
    background: #fff;
    box-shadow: 0 12px 28px var(--gup-color-shadow-1);
    padding: 24px;
}

.landing-list,
.landing-step-list,
.mini-link-list {
    margin: 0;
    padding-inline-start: 20px;
    display: grid;
    gap: 10px;
}

.landing-keyfacts {
    display: grid;
    gap: 12px;
}

.landing-keyfact {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 14px 16px;
    border-radius: 10px;
    background: var(--gup-color-background-overcanvas);
}

.landing-disclaimer {
    color: var(--gup-color-content-tertiary);
    font-size: 0.92rem;
    line-height: 1.7;
}

.breadcrumbs-lite {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 16px;
    color: var(--gup-color-content-tertiary);
    font-size: 0.92rem;
}

.breadcrumbs-lite a {
    color: var(--gup-color-brand-xhigh);
    text-decoration: none;
}

.breadcrumbs-lite a:hover {
    text-decoration: underline;
}

.service-panel-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
}

.service-panel {
    border: 1px solid var(--gup-color-border-low);
    border-radius: var(--gup-radius-card);
    background: #fff;
    padding: 24px;
    box-shadow: 0 12px 28px var(--gup-color-shadow-1);
}

.feedback-strip {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-top: 32px;
}

.gup-site-footer {
    background: var(--gup-color-background-footer);
    color: #fff;
    margin-top: 48px;
}

.gup-site-footer-inner {
    max-width: 1440px;
    margin: 0 auto;
    padding: 32px 24px;
    display: grid;
    gap: 24px;
}

.gup-site-footer-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
}

.gup-site-footer h3 {
    margin: 0 0 10px;
    font-size: 1rem;
    color: #fff;
}

.gup-site-footer p,
.gup-site-footer li,
.gup-site-footer a {
    color: rgba(255, 255, 255, 0.76);
    text-decoration: none;
    line-height: 1.9;
}

.gup-site-footer a:hover {
    color: #fff;
    text-decoration: underline;
    text-underline-offset: 2px;
}

.attachment-link {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-height: 48px;
    padding: 12px 16px;
    border: 1px solid var(--gup-color-border-low);
    border-radius: 10px;
    background: #fff;
    color: var(--gup-color-brand-xhigh);
    font-weight: 700;
    text-decoration: none;
}

.internal-layout {
    display: grid;
    grid-template-columns: 300px minmax(0, 1fr);
    min-height: calc(100vh - 76px);
}

.internal-sidebar {
    background: #fff;
    border-inline-end: 1px solid var(--gup-color-border-low);
    padding: 28px 20px;
    position: sticky;
    top: 76px;
    height: calc(100vh - 76px);
    overflow-y: auto;
}

.internal-sidebar-group {
    display: grid;
    gap: 10px;
    margin-bottom: 24px;
}

.internal-sidebar-title {
    color: var(--gup-color-content-tertiary);
    font-size: 0.84rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

.internal-sidebar a {
    color: var(--gup-color-content-primary);
    text-decoration: none;
    padding: 10px 12px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;
}

.internal-sidebar a.active,
.internal-sidebar a:hover {
    background: var(--gup-color-brand-xlow);
    color: var(--gup-color-brand-xhigh);
}

.internal-content {
    padding: 32px 24px 64px;
}

.internal-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    margin-top: 24px;
}

.internal-grid-card h2 {
    font-size: 1.04rem;
}

@media (max-width: 1024px) {
    .landing-shell,
    .internal-layout {
        grid-template-columns: 1fr;
    }

    .internal-sidebar {
        position: static;
        height: auto;
        border-inline-end: none;
        border-bottom: 1px solid var(--gup-color-border-low);
    }
}

@media (max-width: 768px) {
    .gup-site-header-inner,
    .gup-main-shell,
    .gup-site-footer-inner,
    .internal-content {
        padding-inline: 16px;
    }

    .gup-site-footer-grid {
        grid-template-columns: 1fr;
    }

    .feedback-strip {
        flex-direction: column;
        align-items: start;
    }
}
'@

$prototypeCoreJs = @'
(function () {
    const ROLE_LABELS = {
        saver: 'المدخر',
        employer: 'صاحب العمل',
        staff: 'موظف الصندوق'
    };

    function ensureMainId() {
        const main = document.querySelector('main');
        if (main && !main.id) {
            main.id = 'mainContent';
        }
    }

    function applyRoleSections() {
        const role = document.body.dataset.userRole || 'saver';
        document.querySelectorAll('.role-section').forEach(section => {
            section.classList.toggle('d-none', !section.classList.contains('role-' + role));
        });

        document.querySelectorAll('.current-role-badge').forEach(badge => {
            badge.textContent = ROLE_LABELS[role] || role;
        });
    }

    function initPaymentMethods() {
        document.querySelectorAll('.payment-method-card input').forEach(input => {
            const card = input.closest('.payment-method-card');
            if (card) {
                card.classList.toggle('active', input.checked);
            }
        });

        document.addEventListener('change', function (event) {
            const input = event.target;
            if (!input || input.tagName !== 'INPUT') return;

            if (input.name === 'paymentMethod' || input.name === 'paymentMethodEmployer') {
                const wrapper = input.closest('form') || document;
                wrapper.querySelectorAll('.payment-method-card').forEach(card => {
                    card.classList.toggle('active', !!card.querySelector('input:checked'));
                });

                const chequeNote = wrapper.querySelector('#chequeNote');
                const chequeFields = wrapper.querySelector('.cheque-details-fields');
                const cardFields = wrapper.querySelector('#cardDetails');

                if (chequeNote) chequeNote.style.display = input.value === 'cheque' ? 'flex' : 'none';
                if (chequeFields) chequeFields.style.display = input.value === 'cheque' ? 'block' : 'none';
                if (cardFields) cardFields.style.display = input.value === 'card' ? 'block' : 'none';
            }
        });
    }

    function renderFeedbackModal(config) {
        const modalId = 'spfFeedbackModal' + Date.now();
        const html = `
            <div class="modal fade" id="${modalId}" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-body text-center py-5 px-4">
                            <div class="mb-3" style="font-size:3rem;">
                                <i class="${config.iconClass}"></i>
                            </div>
                            <h5 class="fw-800 mb-2">${config.title}</h5>
                            <p class="text-muted mb-4">${config.message}</p>
                            <button type="button" class="btn btn-spf px-5" data-bs-dismiss="modal">موافق</button>
                        </div>
                    </div>
                </div>
            </div>`;

        document.body.insertAdjacentHTML('beforeend', html);
        const modalEl = document.getElementById(modalId);
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
        modalEl.addEventListener('hidden.bs.modal', () => modalEl.remove());
    }

    window.spf = {
        showSuccess(message) {
            renderFeedbackModal({
                iconClass: 'fas fa-check-circle text-success',
                title: 'تمت العملية بنجاح',
                message
            });
        },
        showError(message) {
            renderFeedbackModal({
                iconClass: 'fas fa-circle-exclamation text-danger',
                title: 'تعذر إكمال العملية',
                message
            });
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        ensureMainId();
        applyRoleSections();
        initPaymentMethods();
    });
})();
'@

$externalShellJs = @'
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
'@

$internalShellJs = @'
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
                        <img src="${root}assets/img/SPF_logo_gold.svg" alt="SPF">
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
'@

Write-Utf8File (Join-Path $v2Root 'assets\css\shell.css') $shellCss
Write-Utf8File (Join-Path $v2Root 'assets\js\prototype-core.js') $prototypeCoreJs
Write-Utf8File (Join-Path $v2Root 'assets\js\external-shell.js') $externalShellJs
Write-Utf8File (Join-Path $v2Root 'assets\js\internal-shell.js') $internalShellJs

$rootIndexTemplate = @'
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>خدمات الادخار - V2</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css">
    <link rel="stylesheet" href="assets/css/app.css">
    <link rel="stylesheet" href="assets/css/shell.css">
</head>
<body data-root="./">
    <main id="mainContent" class="gup-main-shell">
        <section class="catalog-hero">
            <div class="breadcrumbs-lite">
                <span>الرئيسية</span>
                <span>›</span>
                <span>خدمات الادخار</span>
            </div>
            <h1>قائمة خدمات الادخار</h1>
            <p>تعرض هذه النسخة خدمات `المدخر` و`صاحب العمل` كخدمات خارجية متوافقة مع نموذج GUP: بطاقة خدمة ثم صفحة تنفيذ مركزة، مع إبقاء مساحة العمل الداخلية منفصلة لموظف الصندوق.</p>
        </section>

        <section class="service-panel-grid mb-4">
            <article class="service-panel">
                <span class="summary-chip">الخدمات الخارجية</span>
                <h2 class="mt-3">المدخر وصاحب العمل</h2>
                <p>كل خدمة تبدأ ببطاقة تعريفية تتضمن الوصف والمتطلبات والمستندات والرسوم والمدة، ثم تنتقل إلى صفحة تنفيذ الخدمة دون قائمة جانبية.</p>
            </article>
            <article class="service-panel">
                <span class="summary-chip">العمل الداخلي</span>
                <h2 class="mt-3">موظف الصندوق</h2>
                <p>تمت إعادة تنظيم صفحات الموظف ضمن مساحة عمل داخلية ذات قائمة جانبية، مع تحديث كامل للمظهر العام ليتماشى بصريًا مع معايير GUP.</p>
            </article>
            <article class="service-panel">
                <span class="summary-chip">المراجع</span>
                <h2 class="mt-3">الوثائق المساندة</h2>
                <p>تبقى وثيقة BRD، وتدقيق الفجوات، والنسخة المؤرشفة من V2 متاحة للمراجعة أثناء التطوير أو العرض.</p>
                <div class="gup-inline-actions mt-3">
                    <a class="gup-outline-btn" href="Full-BRD/Saving-Full-BRD.html">BRD</a>
                    <a class="gup-outline-btn" href="helper-docs/prototype-gap-audit-vs-full-brd.md">تدقيق الفجوات</a>
                    <a class="gup-outline-btn" href="_legacy/current/index.html">V2 المؤرشفة</a>
                </div>
            </article>
        </section>

        <section class="catalog-section" id="saver-services">
            <div class="catalog-section-header">
                <div>
                    <span class="context-chip">المدخر</span>
                    <h2 class="mt-3 mb-2">خدمات المدخر</h2>
                    <p class="catalog-meta">خدمات خارجية تبدأ من بطاقة خدمة ثم تنتقل إلى تجربة تنفيذ الخدمة فقط.</p>
                </div>
            </div>
            <div class="catalog-grid">
                __SAVER_CARDS__
            </div>
        </section>

        <section class="catalog-section" id="employer-services">
            <div class="catalog-section-header">
                <div>
                    <span class="context-chip">صاحب العمل</span>
                    <h2 class="mt-3 mb-2">خدمات صاحب العمل</h2>
                    <p class="catalog-meta">خدمات تشغيلية خارجية لجهات العمل مع بطاقة خدمة مستقلة وصفحة تنفيذ مركزة لكل خدمة.</p>
                </div>
            </div>
            <div class="catalog-grid">
                __EMPLOYER_CARDS__
            </div>
        </section>

        <section class="catalog-section" id="staff-services">
            <div class="catalog-section-header">
                <div>
                    <span class="context-chip">موظف الصندوق</span>
                    <h2 class="mt-3 mb-2">مساحة العمل الداخلية</h2>
                    <p class="catalog-meta">الوصول إلى بيئة العمل الداخلية مع القائمة الجانبية والصفحات التشغيلية المحدثة.</p>
                </div>
            </div>
            <div class="service-panel">
                <h2>الدخول إلى اللوحة الداخلية</h2>
                <p>تتضمن اللوحة الداخلية: التسجيل، الادخار الإلزامي والاختياري، الصرف، الفواتير، الاعتراضات، الحالات اليدوية، والتقارير.</p>
                <div class="gup-inline-actions mt-3">
                    <a class="gup-primary-btn" href="internal/staff/index.html">فتح بيئة العمل الداخلية</a>
                </div>
            </div>
        </section>
    </main>

    <script src="assets/js/prototype-core.js"></script>
    <script src="assets/js/external-shell.js"></script>
</body>
</html>
'@

$landingTemplate = @'
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>__TITLE__ - بطاقة الخدمة</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css">
    <link rel="stylesheet" href="__ROOT__assets/css/app.css">
    <link rel="stylesheet" href="__ROOT__assets/css/shell.css">
</head>
<body data-root="__ROOT__" data-service-name="__TITLE__">
    <main id="mainContent" class="gup-main-shell">
        <section class="service-landing-hero">
            <div class="breadcrumbs-lite">
                <a href="__ROOT__index.html">الرئيسية</a>
                <span>›</span>
                <span>__AUDIENCE_LABEL__</span>
                <span>›</span>
                <span>__TITLE__</span>
            </div>
            <span class="context-chip">__AUDIENCE_LABEL__</span>
            <h1 class="mt-3">__TITLE__</h1>
            <p>__DESCRIPTION__</p>
        </section>

        <section class="landing-shell">
            <div class="landing-body-stack">
                <article class="landing-body-section">
                    <h2>وصف الخدمة</h2>
                    <p class="mt-3 mb-0">__LONG_DESCRIPTION__</p>
                </article>

                <article class="landing-body-section">
                    <h2>المستندات المطلوبة</h2>
                    <ul class="landing-list mt-3">
                        __DOCUMENT_ITEMS__
                    </ul>
                </article>

                <article class="landing-body-section">
                    <h2>خطوات الخدمة</h2>
                    <ol class="landing-step-list mt-3">
                        __STEP_ITEMS__
                    </ol>
                </article>

                <article class="landing-body-section">
                    <h2>الشروط والملاحظات</h2>
                    <ul class="landing-list mt-3">
                        __CONDITION_ITEMS__
                    </ul>
                </article>
            </div>

            <aside class="landing-side-stack">
                <article class="landing-side-card">
                    <h3>بيانات الخدمة</h3>
                    <div class="landing-keyfacts mt-3">
                        <div class="landing-keyfact"><span>الجهة</span><strong>صندوق الحماية الاجتماعية</strong></div>
                        <div class="landing-keyfact"><span>آخر تحديث</span><strong>21/06/2026</strong></div>
                        <div class="landing-keyfact"><span>الفئة</span><strong>__AUDIENCE_LABEL__</strong></div>
                    </div>
                </article>

                <article class="landing-side-card">
                    <h3>الحساب المستخدم</h3>
                    <div class="landing-keyfacts mt-3">
                        <div class="landing-keyfact"><span>تبدأ الخدمة بصفتك</span><strong>__ACCOUNT_CONTEXT__</strong></div>
                    </div>
                </article>

                <article class="landing-side-card">
                    <h3>الرسوم والقنوات</h3>
                    <div class="landing-keyfacts mt-3">
                        <div class="landing-keyfact"><span>الرسوم</span><strong>__FEES__</strong></div>
                        <div class="landing-keyfact"><span>القناة</span><strong>__CHANNEL__</strong></div>
                        <div class="landing-keyfact"><span>المدة التقديرية</span><strong>__TIME__</strong></div>
                    </div>
                </article>

                <article class="landing-side-card">
                    <h3>ابدأ الخدمة</h3>
                    <p class="mt-3">__CTA_HELP__</p>
                    <a class="gup-primary-btn w-100 mt-3" href="start.html">__CTA_LABEL__</a>
                    <p class="landing-disclaimer mt-3 mb-0">بالضغط على "__CTA_LABEL__" ستنتقل إلى واجهة تنفيذ الخدمة ضمن النماذج الأولية الحالية.</p>
                </article>
            </aside>
        </section>
    </main>

    <script src="__ROOT__assets/js/prototype-core.js"></script>
    <script src="__ROOT__assets/js/external-shell.js"></script>
</body>
</html>
'@

$actionTemplate = @'
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>__TITLE__ - تنفيذ الخدمة</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css">
    <link rel="stylesheet" href="__ROOT__assets/css/app.css">
    <link rel="stylesheet" href="__ROOT__assets/css/shell.css">
    __INLINE_STYLES__
</head>
<body data-root="__ROOT__" data-user-role="__ROLE__" data-landing-href="index.html" data-service-name="__TITLE__">
__MAIN_CONTENT__
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="__ROOT__assets/js/prototype-core.js"></script>
<script src="__ROOT__assets/js/external-shell.js"></script>
__INLINE_SCRIPT__
</body>
</html>
'@

$internalTemplate = @'
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>__TITLE__</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css">
    <link rel="stylesheet" href="__ROOT__assets/css/app.css">
    <link rel="stylesheet" href="__ROOT__assets/css/shell.css">
    __INLINE_STYLES__
</head>
<body data-root="__ROOT__" data-user-role="staff">
__MAIN_CONTENT__
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="__ROOT__assets/js/prototype-core.js"></script>
<script src="__ROOT__assets/js/internal-shell.js"></script>
__INLINE_SCRIPT__
</body>
</html>
'@

$services = @(
    @{
        Audience = 'saver'; Slug = 'registration'; Source = '02-registration.html'; Role = 'saver';
        Title = 'التسجيل في نظام الادخار'; CardSummary = 'بدء التسجيل المباشر أو متابعة حالات الربط المختلفة للمدخر.';
        Description = 'بطاقة خدمة للتسجيل في حساب الادخار للمدخرين ضمن المسارات المعتمدة.';
        LongDescription = 'تغطي الخدمة التسجيل المباشر للمدخر، واستكمال بيانات التواصل، ومراجعة الخطوة التالية قبل الانتقال إلى الإيداع أو تفعيل الحساب.';
        Documents = @('البطاقة المدنية أو بيانات الهوية', 'رقم الهاتف والبريد الإلكتروني', 'أي بيانات مطلوبة لاستكمال الفئة المختارة');
        Steps = @('اختيار فئة التسجيل المناسبة', 'مراجعة البيانات الأساسية', 'تأكيد الإقرار والانتقال إلى تفعيل الحساب أو الإيداع');
        Conditions = @('يجب أن تكون بيانات الهوية صالحة', 'يتم استكمال بيانات التواصل قبل التفعيل إذا لزم', 'قد تختلف الخطوة التالية بحسب فئة التسجيل');
        Fees = 'بدون رسوم'; Channel = 'إلكتروني'; Time = '5 دقائق'; AccountContext = 'حساب شخصي'; CtaLabel = 'استكشف الخدمة'; CtaHelp = 'تفتح هذه الصفحة واجهة التسجيل الحالية بدون القائمة الجانبية.'
    },
    @{
        Audience = 'saver'; Slug = 'optional-saving'; Source = '11-optional-saving-inquiries.html'; Role = 'saver';
        Title = 'الادخار الاختياري'; CardSummary = 'متابعة مسارات الادخار الاختياري ومصادر التمويل والخروج.';
        Description = 'خدمة توضح تشغيل الادخار الاختياري ومصادره الحالية للمدخر.';
        LongDescription = 'تجمع هذه الخدمة الإيداع الذاتي، وإيداعات جهة العمل، والفائض المحول، ومسار الخروج من الادخار الاختياري ضمن تجربة خدمة واحدة.';
        Documents = @('بيانات الحساب الاختياري الحالي', 'بيانات الإيداع إذا كانت الخدمة مرتبطة بدفعة جديدة', 'أي مستندات مرتبطة بحالة الخروج عند الحاجة');
        Steps = @('مراجعة مصادر الادخار الحالية', 'اختيار الإجراء أو المسار المطلوب', 'متابعة الإيداع أو الخروج أو عرض التفاصيل');
        Conditions = @('تظهر الخدمة للمدخر ذي الحساب الاختياري النشط', 'قد ترتبط بعض الإجراءات بخدمات أخرى مثل الإيداع أو الخروج', 'تظل تفاصيل الرصيد في صفحة الحساب');
        Fees = 'بحسب قناة السداد'; Channel = 'إلكتروني'; Time = '4 دقائق'; AccountContext = 'حساب شخصي'; CtaLabel = 'استكشف الخدمة'; CtaHelp = 'تفتح هذه الصفحة المسار الحالي للادخار الاختياري دون التنقل الجانبي.'
    },
    @{
        Audience = 'saver'; Slug = 'mandatory-saving'; Source = '09-mandatory-saving.html'; Role = 'saver';
        Title = 'الادخار الإلزامي'; CardSummary = 'عرض حالة التسجيل الإلزامي والانتقال إلى الاعتراض أو الصرف أو الإخطار.';
        Description = 'خدمة متابعة الادخار الإلزامي للمدخر وحالة التسجيل والأجر والإجراءات المفتوحة.';
        LongDescription = 'تعرض الخدمة وضع العامل في الادخار الإلزامي، والأجر المعتمد، والإجراءات المفتوحة مثل اعتراض الأجر أو إخطار الخروج أو الانتقال إلى الصرف.';
        Documents = @('بيانات العامل الأساسية', 'بيانات الأجر الأساسي المعتمد', 'المستندات الداعمة إذا كان هناك اعتراض أو إخطار');
        Steps = @('عرض حالة التسجيل الإلزامي', 'التحقق من الأجر والمساهمة', 'الانتقال إلى الاعتراض أو الإخطار أو الصرف بحسب الحالة');
        Conditions = @('تظهر البيانات بحسب السجلات المعتمدة', 'يمكن تقديم الاعتراض عند اختلاف الأجر', 'يرتبط الصرف أو الإخطار بحالة العامل النظامية');
        Fees = 'بدون رسوم'; Channel = 'إلكتروني'; Time = '3 دقائق'; AccountContext = 'حساب شخصي'; CtaLabel = 'استكشف الخدمة'; CtaHelp = 'تفتح هذه الصفحة العرض التشغيلي الحالي للادخار الإلزامي.'
    },
    @{
        Audience = 'saver'; Slug = 'account-details'; Source = '04-account-details.html'; Role = 'saver';
        Title = 'تفاصيل حساب الادخار'; CardSummary = 'عرض الرصيد، المصادر، والحركات الرئيسية للحساب.';
        Description = 'خدمة لعرض الرصيد ومكونات الحساب وسجل القيم الأساسية.';
        LongDescription = 'تعرض الخدمة الرصيد الحالي، ومصادر المبالغ، والحركات الأساسية، مع إتاحة الانتقال إلى الإيداع أو السجل أو المسارات المرتبطة بالحساب.';
        Documents = @('لا توجد مستندات مطلوبة', 'تظهر البيانات من سجلات الحساب الحالية', 'قد تتوفر مرفقات على مستوى الحركات عند الحاجة');
        Steps = @('فتح تفاصيل الحساب', 'عرض الرصيد والمصادر', 'الانتقال إلى الخدمة المرتبطة مثل الإيداع أو السجل');
        Conditions = @('يجب أن يكون الحساب مفعلاً', 'تظهر البيانات بحسب دور المستخدم الحالي', 'لا يتم تعديل البيانات من هذه الصفحة');
        Fees = 'بدون رسوم'; Channel = 'إلكتروني'; Time = '2 دقائق'; AccountContext = 'حساب شخصي'; CtaLabel = 'عرض الخدمة'; CtaHelp = 'تفتح هذه الصفحة تفاصيل الحساب الحالية ضمن واجهة خدمة مستقلة.'
    },
    @{
        Audience = 'saver'; Slug = 'deposit'; Source = '05-deposit.html'; Role = 'saver';
        Title = 'الإيداع الإلكتروني'; CardSummary = 'تنفيذ إيداع جديد ومراجعة طريقة الدفع ونتيجة الإيداع.';
        Description = 'خدمة تتيح للمدخر تنفيذ إيداع جديد باستخدام قنوات الدفع المعتمدة.';
        LongDescription = 'تغطي الخدمة مبلغ الإيداع، وغرضه، وطريقة الدفع، وملخص النتيجة على الرصيد والسجل، مع الحفاظ على تجربة تنفيذ مركزة.';
        Documents = @('بيانات الدفع أو البطاقة عند الحاجة', 'معلومات الشيك إذا كانت طريقة الدفع شيكًا', 'لا توجد مستندات إضافية في الإيداع اللحظي');
        Steps = @('إدخال مبلغ الإيداع والغرض', 'اختيار طريقة الدفع المناسبة', 'تنفيذ الإيداع ومتابعة ظهوره في السجل');
        Conditions = @('الحد الأدنى للإيداع يطبق بحسب القواعد الحالية', 'توقيت ظهور الرصيد يختلف حسب طريقة الدفع', 'قد تتطلب بعض القنوات بيانات إضافية');
        Fees = 'بحسب قناة السداد'; Channel = 'إلكتروني'; Time = '5 دقائق'; AccountContext = 'حساب شخصي'; CtaLabel = 'ابدأ الخدمة'; CtaHelp = 'تفتح هذه الصفحة نموذج الإيداع الحالي للمدخر.'
    },
    @{
        Audience = 'saver'; Slug = 'obligations'; Source = '06-obligations.html'; Role = 'saver';
        Title = 'سداد الالتزامات المالية'; CardSummary = 'استعراض الالتزامات وتسويتها من الرصيد المتاح.';
        Description = 'خدمة لسداد الالتزامات المستحقة من رصيد الادخار عند توفر الشروط.';
        LongDescription = 'تعرض الخدمة الالتزامات المفتوحة، والقيم المستحقة، وخيارات التسوية، وما ينعكس على الرصيد بعد السداد.';
        Documents = @('بيانات الالتزام المراد سداده', 'أي مستندات مرجعية إذا تطلبت الحالة', 'لا يلزم مستند في حالات السداد القياسية');
        Steps = @('استعراض الالتزامات المفتوحة', 'اختيار الالتزام المطلوب تسويته', 'تنفيذ السداد ومراجعة أثره على الرصيد');
        Conditions = @('يجب أن يكون الرصيد المتاح كافياً', 'قد تطبق ضوابط على ترتيب السداد', 'تظهر النتائج مباشرة في سجل المعاملات');
        Fees = 'بدون رسوم'; Channel = 'إلكتروني'; Time = '4 دقائق'; AccountContext = 'حساب شخصي'; CtaLabel = 'استكشف الخدمة'; CtaHelp = 'تفتح هذه الصفحة رحلة سداد الالتزامات الحالية للمدخر.'
    },
    @{
        Audience = 'saver'; Slug = 'disbursement'; Source = '08-disbursement.html'; Role = 'saver';
        Title = 'طلبات صرف المدخرات'; CardSummary = 'طلب الصرف الاعتيادي أو الاستثنائي ومتابعة حالة الطلب.';
        Description = 'خدمة لتقديم طلبات صرف مبالغ الادخار ومتابعة حالة الطلب.';
        LongDescription = 'تجمع الخدمة مسارات الصرف الأساسية والاستثنائية، والتحقق من الأهلية والحساب البنكي، وخطوات المتابعة بعد تقديم الطلب.';
        Documents = @('بيانات الاستحقاق أو سبب طلب الصرف', 'بيانات الحساب البنكي إذا لم تسترجع آليًا', 'أي بيانات داعمة للحالات الاستثنائية');
        Steps = @('اختيار سبب طلب الصرف وطريقته', 'مراجعة بيانات الحساب والتحقق النظامي', 'تقديم الطلب ومتابعة المعالجة');
        Conditions = @('يجب تحقق شروط الاستحقاق', 'قد يتطلب بعض المسارات إدخال بيانات إضافية', 'تظهر حالة الطلب في نفس الصفحة');
        Fees = 'بدون رسوم'; Channel = 'إلكتروني'; Time = '7 دقائق'; AccountContext = 'حساب شخصي'; CtaLabel = 'ابدأ الخدمة'; CtaHelp = 'تفتح هذه الصفحة نموذج طلب الصرف الحالي دون قائمة جانبية.'
    },
    @{
        Audience = 'saver'; Slug = 'gratuity-notification'; Source = '17-gratuity-settlement-employee.html'; Role = 'saver';
        Title = 'إشعار تسوية مكافأة الخدمة'; CardSummary = 'عرض قرار جهة العمل واتخاذ رد العامل من نفس الصفحة.';
        Description = 'خدمة لعرض قرار تسوية مكافأة الخدمة السابقة وتسجيل رد العامل.';
        LongDescription = 'تعرض الخدمة بيانات التسوية التقديرية، وقرار جهة العمل، وأي بيانات فاتورة أو سداد مرتبطة بالترحيل إلى الادخار، مع إمكانية رد العامل من نفس الصفحة.';
        Documents = @('بيانات العامل والتسوية', 'أي ملاحظات يرغب العامل في إضافتها', 'لا توجد مستندات إلزامية في شاشة الرد');
        Steps = @('عرض بيانات التسوية وقرار جهة العمل', 'مراجعة حالة الفاتورة أو السداد إن وجدت', 'تسجيل موافقة العامل أو عدم موافقته');
        Conditions = @('تظهر الخدمة عند صدور قرار من جهة العمل', 'يمكن للعامل الرد من نفس الصفحة', 'يبقى السجل ظاهرًا للمتابعة');
        Fees = 'بدون رسوم'; Channel = 'إلكتروني'; Time = '3 دقائق'; AccountContext = 'حساب شخصي'; CtaLabel = 'استكشف الخدمة'; CtaHelp = 'تفتح هذه الصفحة قرار التسوية ورد العامل كما هو في النماذج الحالية.'
    },
    @{
        Audience = 'saver'; Slug = 'salary-objection'; Source = '18-salary-objection.html'; Role = 'saver';
        Title = 'اعتراض الأجر الأساسي'; CardSummary = 'تقديم اعتراض على الأجر المسجل ومتابعة حالته.';
        Description = 'خدمة لتقديم اعتراض على الأجر الأساسي المسجل مع المستندات الداعمة.';
        LongDescription = 'تمثل الخدمة خطوة العامل في اعتراض الأجر، وتوضح بيانات الأجر الحالية، وإرسال الاعتراض، ثم متابعة الرد أو الانتقال لمسار الشكوى عند الحاجة.';
        Documents = @('المستند الداعم مثل عقد العمل أو ما يثبت الأجر الصحيح', 'تاريخ بدء تقاضي الأجر الصحيح', 'ملاحظات الاعتراض');
        Steps = @('عرض بيانات الأجر الحالية', 'إدخال الأجر الصحيح وتاريخ بدء تقاضيه', 'إرسال الاعتراض ومتابعة الحالة');
        Conditions = @('يجب أن يكون الاعتراض ضمن المدة المتاحة', 'يعتمد الأثر لاحقًا على رد جهة العمل أو نتيجة الشكوى', 'المستند الداعم يظهر كرابط تحميل');
        Fees = 'بدون رسوم'; Channel = 'إلكتروني'; Time = '6 دقائق'; AccountContext = 'حساب شخصي'; CtaLabel = 'ابدأ الخدمة'; CtaHelp = 'تفتح هذه الصفحة نموذج اعتراض الأجر الحالي للمدخر.'
    },
    @{
        Audience = 'saver'; Slug = 'exit-notification'; Source = '21-exit-notification.html'; Role = 'saver';
        Title = 'إخطار الخروج أو فقدان الشرط'; CardSummary = 'إرسال إخطار الخروج أو فقدان شرط الاشتراك ومتابعته.';
        Description = 'خدمة لإشعار الصندوق بالخروج من النظام أو فقدان شرط الاشتراك ضمن المهلة النظامية.';
        LongDescription = 'تغطي الخدمة تقديم الإخطار، وإظهار المهلة النظامية، وفتح حالة متابعة للمدخر مع عرض الحالة الحالية بعد الإرسال.';
        Documents = @('بيانات الحالة أو سبب الإخطار', 'أي معلومات مساندة عند الحاجة', 'لا توجد مرفقات إلزامية في السيناريو الأساسي');
        Steps = @('اختيار نوع الإخطار والتاريخ الفعلي', 'إدخال الوصف المختصر', 'إرسال الإخطار ومتابعة الحالة');
        Conditions = @('يجب تقديم الإخطار خلال شهر من التاريخ الفعلي', 'قد يترتب أثر على العائد عند التأخر', 'تظهر حالات المعالجة الداخلية بعد الإرسال');
        Fees = 'بدون رسوم'; Channel = 'إلكتروني'; Time = '4 دقائق'; AccountContext = 'حساب شخصي'; CtaLabel = 'ابدأ الخدمة'; CtaHelp = 'تفتح هذه الصفحة واجهة الإخطار الحالية للمدخر.'
    },
    @{
        Audience = 'saver'; Slug = 'exit-system'; Source = '13-exit-system.html'; Role = 'saver';
        Title = 'الخروج من النظام'; CardSummary = 'مراجعة أثر الخروج على الاستحقاق والحركات المرتبطة.';
        Description = 'خدمة لعرض مسار الخروج من النظام ومتطلباته الأساسية.';
        LongDescription = 'تعرض الخدمة ملاحظات الخروج من النظام، وآثاره على الاستحقاق، مع إمكانية الانتقال إلى الإخطار أو الصرف أو المتابعة ذات الصلة.';
        Documents = @('بيانات الخروج ذات العلاقة', 'أي ملاحظات أو مراجع مرتبطة بالحالة', 'قد ترتبط الخدمة بخدمة الإخطار أو الصرف');
        Steps = @('مراجعة بيانات الخروج', 'فهم أثر الحالة على الاستحقاق', 'الانتقال إلى الإخطار أو الصرف بحسب الحاجة');
        Conditions = @('تستخدم الخدمة للفهم والمتابعة قبل أو بعد الإخطار', 'ترتبط بحالة المدخر النظامية', 'قد تختلف الخطوات النهائية بحسب الاستحقاق');
        Fees = 'بدون رسوم'; Channel = 'إلكتروني'; Time = '3 دقائق'; AccountContext = 'حساب شخصي'; CtaLabel = 'استكشف الخدمة'; CtaHelp = 'تفتح هذه الصفحة مسار الخروج الحالي للمدخر.'
    },
    @{
        Audience = 'saver'; Slug = 'transaction-history'; Source = '14-transaction-history.html'; Role = 'saver';
        Title = 'سجل المعاملات'; CardSummary = 'عرض سجل الحركات والإيصالات والتنقل إلى العمليات المرتبطة.';
        Description = 'خدمة لعرض سجل المعاملات والإيصالات المرتبطة بحساب الادخار.';
        LongDescription = 'تعرض الخدمة الحركات المالية والتشغيلية، والإيصالات، والحالات المرتبطة بالإيداع أو السداد أو الصرف ضمن سجل واحد.';
        Documents = @('لا توجد مستندات مسبقة', 'الإيصالات تظهر داخل السجل عند توفرها', 'يمكن تنزيل أو مراجعة التفاصيل من الصفحة نفسها');
        Steps = @('اختيار نطاق السجل أو الفلاتر', 'عرض الحركات والإيصالات', 'الانتقال إلى الخدمات المرتبطة عند الحاجة');
        Conditions = @('السجل للعرض والمتابعة فقط', 'تعتمد البيانات على الحركات المعتمدة في النظام', 'تظهر الحالات والمرجعيات لكل عملية');
        Fees = 'بدون رسوم'; Channel = 'إلكتروني'; Time = '2 دقائق'; AccountContext = 'حساب شخصي'; CtaLabel = 'عرض السجل'; CtaHelp = 'تفتح هذه الصفحة سجل المعاملات الحالي للمدخر.'
    },
    @{
        Audience = 'employer'; Slug = 'worker-registration'; Source = '02-registration.html'; Role = 'employer';
        Title = 'تسجيل العمال في نظام الادخار'; CardSummary = 'تسجيل اعتيادي أو رجعي أو بقرار مباشر للعمال.';
        Description = 'خدمة لجهة العمل لتسجيل العمال ضمن مسارات التسجيل المختلفة.';
        LongDescription = 'تغطي الخدمة التسجيل الاعتيادي، والتسجيل بأثر رجعي، والتسجيل بقرار مباشر، مع قائمة العمال المرشحين وملخص الحالة لكل مسار.';
        Documents = @('بيانات العمال والهوية الأساسية', 'الأجر الأساسي لكل عامل', 'المراجع الخاصة بالحالات الرجعية أو القرار المباشر عند الحاجة');
        Steps = @('اختيار نوع التسجيل', 'مراجعة قائمة العمال المرشحين', 'اعتماد التسجيلات ومتابعة النتائج');
        Conditions = @('تعتمد بعض المسارات على مراجعة إضافية', 'قد ينتج عن التسجيل الرجعي فرق التزامات أو فواتير', 'تظهر الحالات المعتمدة ضمن قائمة العمال المسجلين');
        Fees = 'بدون رسوم'; Channel = 'إلكتروني'; Time = '8 دقائق'; AccountContext = 'حساب أعمال'; CtaLabel = 'ابدأ الخدمة'; CtaHelp = 'تفتح هذه الصفحة نموذج تسجيل العمال الحالي لجهة العمل.'
    },
    @{
        Audience = 'employer'; Slug = 'registered-workers'; Source = '03-registered-workers.html'; Role = 'employer';
        Title = 'العمال المسجلون'; CardSummary = 'عرض العمال المسجلين ومتابعة حالتهم التشغيلية.';
        Description = 'خدمة لعرض العمال المسجلين وحالة كل عامل ضمن مسار الادخار.';
        LongDescription = 'تعرض الخدمة قائمة العمال المسجلين، والحالة الحالية، والروابط العملية المرتبطة بكل عامل أو إجراء تشغيلي لاحق.';
        Documents = @('لا توجد مستندات مطلوبة للعرض', 'تعتمد القائمة على السجلات الحالية', 'قد تظهر مراجع عملية لكل عامل داخل الصفحة');
        Steps = @('عرض قائمة العمال المسجلين', 'التحقق من حالة العامل', 'الانتقال إلى الإجراء المرتبط بالعامل');
        Conditions = @('تظهر الخدمة ضمن حساب الأعمال فقط', 'قد تقود بعض الحالات إلى خدمات أخرى مثل الفواتير أو التسويات', 'لا يتم تعديل التسجيل من هذه الصفحة مباشرة');
        Fees = 'بدون رسوم'; Channel = 'إلكتروني'; Time = '3 دقائق'; AccountContext = 'حساب أعمال'; CtaLabel = 'عرض الخدمة'; CtaHelp = 'تفتح هذه الصفحة القائمة الحالية للعمال المسجلين.'
    },
    @{
        Audience = 'employer'; Slug = 'group-deposit'; Source = '05-deposit.html'; Role = 'employer';
        Title = 'الإيداع الجماعي للعمال'; CardSummary = 'توزيع مبالغ الإيداع على العمال وفق وضع التوزيع المناسب.';
        Description = 'خدمة لجهة العمل لتنفيذ إيداعات جماعية لصالح العمال.';
        LongDescription = 'تغطي الخدمة اختيار العمال، وتوزيع المبالغ، وطريقة الدفع، ونتيجة الإيداع على الأرصدة والسجل والتقارير.';
        Documents = @('بيانات العمال المستهدفين', 'مبالغ التوزيع أو النسب المطلوبة', 'بيانات الدفع بحسب القناة المختارة');
        Steps = @('اختيار العمال ووضع التوزيع', 'اختيار طريقة الدفع', 'تنفيذ الإيداع الجماعي ومراجعة النتيجة');
        Conditions = @('الحد الأدنى للإيداع يطبق على كل عامل عند الحاجة', 'يختلف توقيت التحديث حسب طريقة الدفع', 'تظهر العملية في السجل والتقارير');
        Fees = 'بحسب قناة السداد'; Channel = 'إلكتروني'; Time = '7 دقائق'; AccountContext = 'حساب أعمال'; CtaLabel = 'ابدأ الخدمة'; CtaHelp = 'تفتح هذه الصفحة تجربة الإيداع الجماعي الحالية لجهة العمل.'
    },
    @{
        Audience = 'employer'; Slug = 'optional-saving-programs'; Source = '11-optional-saving-inquiries.html'; Role = 'employer';
        Title = 'برامج الادخار الاختياري للعمال'; CardSummary = 'إدارة البرامج والاتفاقيات والدفعات الاختيارية للعمال.';
        Description = 'خدمة لجهة العمل لإدارة برامج الادخار الاختياري وتمويلها.';
        LongDescription = 'تعرض الخدمة البرامج النشطة، ومصدر التمويل، ورسوم السداد، والروابط إلى الإيداع أو قوائم العمال أو التحويلات بحسب البرنامج.';
        Documents = @('اتفاقية البرنامج أو مرجعها الداخلي', 'بيانات الفئة أو العمال المشاركين', 'أي قواعد متعلقة بالسقف أو الفائض');
        Steps = @('مراجعة البرامج الحالية', 'فتح البرنامج أو الإجراء المطلوب', 'تنفيذ الإيداع أو متابعة العمال أو التحويلات');
        Conditions = @('تظهر الخدمة ضمن حساب الأعمال فقط', 'قد تختلف رسوم السداد حسب القناة', 'ترتبط بعض الحالات بخدمات أخرى مثل الإيداع أو التحويل');
        Fees = 'بحسب قناة السداد'; Channel = 'إلكتروني'; Time = '5 دقائق'; AccountContext = 'حساب أعمال'; CtaLabel = 'استكشف الخدمة'; CtaHelp = 'تفتح هذه الصفحة تشغيل الادخار الاختياري لجهة العمل.'
    },
    @{
        Audience = 'employer'; Slug = 'mandatory-saving'; Source = '09-mandatory-saving.html'; Role = 'employer';
        Title = 'متابعة الادخار الإلزامي للعمال'; CardSummary = 'متابعة التسجيل والأجر والالتزام والفواتير لكل عامل.';
        Description = 'خدمة تشغيلية لجهة العمل لمتابعة العمال في الادخار الإلزامي.';
        LongDescription = 'تعرض الخدمة قائمة العمال، ونوع التسجيل، ومساهمة 9%، والالتزام الحالي، والحالات التي تؤثر على الفاتورة أو تتطلب متابعة.';
        Documents = @('بيانات العمال والأجر الأساسي', 'أي مراجع خاصة بالحالات الرجعية أو القرار المباشر', 'روابط الفاتورة أو الاعتراض عند الحاجة');
        Steps = @('عرض قائمة العمال وحالاتهم', 'فتح تفاصيل العامل أو الحالة', 'الانتقال إلى الفاتورة أو الاعتراض أو الخدمة المرتبطة');
        Conditions = @('تظهر الخدمة ضمن حساب الأعمال فقط', 'ترتبط بعض الحالات بخدمة الفواتير أو اعتراض الأجر', 'قد تنتقل بعض الحالات إلى المعالجة اليدوية');
        Fees = 'بدون رسوم'; Channel = 'إلكتروني'; Time = '5 دقائق'; AccountContext = 'حساب أعمال'; CtaLabel = 'استكشف الخدمة'; CtaHelp = 'تفتح هذه الصفحة شاشة المتابعة الحالية للادخار الإلزامي لجهة العمل.'
    },
    @{
        Audience = 'employer'; Slug = 'gratuity-settlement'; Source = '16-gratuity-settlement-employer.html'; Role = 'employer';
        Title = 'تسوية مكافأة الخدمة السابقة'; CardSummary = 'عرض جميع العمال وحالة التسوية واتخاذ القرار لكل عامل.';
        Description = 'خدمة لجهة العمل لاتخاذ قرار تسوية مكافأة الخدمة السابقة للعمال غير العمانيين.';
        LongDescription = 'تعرض الخدمة جميع العمال المؤهلين، ومبلغ التسوية التقديري، وحالة التسوية، مع نافذة قرار أو نافذة تفاصيل للقراءة فقط بحسب حالة كل عامل.';
        Documents = @('بيانات العامل الأساسية', 'تاريخ الالتحاق ومدة الخدمة', 'أي مرجع أو ملاحظات مرتبطة بقرار التسوية');
        Steps = @('استعراض العمال وحالة التسوية', 'فتح نافذة القرار أو التفاصيل', 'تسجيل قرار التسوية أو مراجعة الحالة النهائية');
        Conditions = @('يوجد قراران فقط: تمت التسوية وديًا أو تم ترحيلها إلى نظام الادخار', 'إذا كانت الحالة محسومة تظهر التفاصيل للقراءة فقط', 'قد تظهر بيانات الفاتورة والسداد عند الترحيل إلى الادخار');
        Fees = 'بدون رسوم'; Channel = 'إلكتروني'; Time = '6 دقائق'; AccountContext = 'حساب أعمال'; CtaLabel = 'ابدأ الخدمة'; CtaHelp = 'تفتح هذه الصفحة شاشة تسوية مكافأة الخدمة الحالية لجهة العمل.'
    },
    @{
        Audience = 'employer'; Slug = 'salary-objection-response'; Source = '18-salary-objection.html'; Role = 'employer';
        Title = 'الرد على اعتراضات الأجر'; CardSummary = 'عرض اعتراضات العمال واتخاذ قرار جهة العمل بشأن كل اعتراض.';
        Description = 'خدمة لجهة العمل لمراجعة اعتراضات الأجر الواردة من العمال.';
        LongDescription = 'تعرض الخدمة الطلبات الواردة، والأجر المسجل والمقترح، وتاريخ بدء التقاضي، ونافذة مخصصة للرد على الاعتراض بقبوله أو رفضه.';
        Documents = @('بيانات الاعتراض الوارد', 'مرجعية الأجر لدى جهة العمل', 'أي ملاحظات تفسر قرار جهة العمل');
        Steps = @('استعراض قائمة الاعتراضات', 'فتح الاعتراض المطلوب', 'تسجيل قرار جهة العمل وحفظه');
        Conditions = @('يجب الرد خلال المدة المحددة', 'في حال الرفض قد تنتقل الحالة إلى مسار الشكوى', 'تظهر الحالة المحدثة بعد الحفظ مباشرة');
        Fees = 'بدون رسوم'; Channel = 'إلكتروني'; Time = '5 دقائق'; AccountContext = 'حساب أعمال'; CtaLabel = 'ابدأ الخدمة'; CtaHelp = 'تفتح هذه الصفحة قائمة اعتراضات الأجر الحالية لجهة العمل.'
    },
    @{
        Audience = 'employer'; Slug = 'mandatory-invoices'; Source = '20-mandatory-invoices.html'; Role = 'employer';
        Title = 'فواتير الادخار الإلزامي'; CardSummary = 'عرض الفواتير الشهرية والحساب الافتراضي والسداد والتخصيص.';
        Description = 'خدمة لجهة العمل لمتابعة فواتير الادخار الإلزامي الشهرية.';
        LongDescription = 'تعرض الخدمة الفواتير الشهرية، والحساب الافتراضي، والرصد المتبقي، وحالات السداد الجزئي أو الكامل، وسجل التخصيص، مع تفاصيل العمال النشطين داخل الفاتورة.';
        Documents = @('رقم الفاتورة أو الفترة', 'مرجع السداد عند الحاجة', 'بيانات التحويل إلى الحساب الافتراضي');
        Steps = @('عرض الفواتير المفتوحة أو المسددة', 'فتح تفاصيل الفاتورة', 'تسجيل السداد أو متابعة حالة التخصيص');
        Conditions = @('لكل فاتورة حساب افتراضي مستقل', 'قد تظهر غرامات على الفواتير المتأخرة', 'تظهر حالة التخصيص وسجل الدفعات داخل التفاصيل');
        Fees = 'بحسب التزام الفاتورة'; Channel = 'إلكتروني'; Time = '5 دقائق'; AccountContext = 'حساب أعمال'; CtaLabel = 'ابدأ الخدمة'; CtaHelp = 'تفتح هذه الصفحة شاشة الفواتير الحالية لجهة العمل.'
    }
)

$staffPages = @(
    @{ Slug = 'index'; Source = '01-dashboard.html'; Title = 'لوحة التحكم الداخلية - الادخار V2' },
    @{ Slug = 'registration-operations'; Source = '02-registration.html'; Title = 'عمليات التسجيل - الادخار V2' },
    @{ Slug = 'mandatory-saving-operations'; Source = '09-mandatory-saving.html'; Title = 'الادخار الإلزامي - مساحة العمل الداخلية' },
    @{ Slug = 'optional-saving-operations'; Source = '11-optional-saving-inquiries.html'; Title = 'الادخار الاختياري - مساحة العمل الداخلية' },
    @{ Slug = 'salary-objections'; Source = '18-salary-objection.html'; Title = 'اعتراضات الأجر - مساحة العمل الداخلية' },
    @{ Slug = 'disbursement-processing'; Source = '10-disbursement-processing.html'; Title = 'معالجة طلبات الصرف - مساحة العمل الداخلية' },
    @{ Slug = 'investment-return'; Source = '07-investment-return.html'; Title = 'عوائد الاستثمار - مساحة العمل الداخلية' },
    @{ Slug = 'surplus-transfers'; Source = '12-surplus-transfers.html'; Title = 'تحويلات الفائض - مساحة العمل الداخلية' },
    @{ Slug = 'manual-cases'; Source = '19-manual-cases.html'; Title = 'الحالات اليدوية - مساحة العمل الداخلية' },
    @{ Slug = 'mandatory-invoices'; Source = '20-mandatory-invoices.html'; Title = 'فواتير الادخار الإلزامي - مساحة العمل الداخلية' },
    @{ Slug = 'exit-notifications'; Source = '21-exit-notification.html'; Title = 'إشعارات الخروج - مساحة العمل الداخلية' },
    @{ Slug = 'transaction-history'; Source = '14-transaction-history.html'; Title = 'سجل العمليات - مساحة العمل الداخلية' },
    @{ Slug = 'reports'; Source = '15-reports.html'; Title = 'التقارير - مساحة العمل الداخلية' }
)

$saverRouteMap = @{
    '01-dashboard.html' = 'index.html#saver-services'
    '02-registration.html' = 'services/saver/registration/start.html'
    '03-registered-workers.html' = 'services/employer/registered-workers/start.html'
    '04-account-details.html' = 'services/saver/account-details/start.html'
    '05-deposit.html' = 'services/saver/deposit/start.html'
    '06-obligations.html' = 'services/saver/obligations/start.html'
    '07-investment-return.html' = 'internal/staff/investment-return.html'
    '08-disbursement.html' = 'services/saver/disbursement/start.html'
    '09-mandatory-saving.html' = 'services/saver/mandatory-saving/start.html'
    '10-disbursement-processing.html' = 'internal/staff/disbursement-processing.html'
    '11-optional-saving-inquiries.html' = 'services/saver/optional-saving/start.html'
    '12-surplus-transfers.html' = 'internal/staff/surplus-transfers.html'
    '13-exit-system.html' = 'services/saver/exit-system/start.html'
    '14-transaction-history.html' = 'services/saver/transaction-history/start.html'
    '15-reports.html' = 'internal/staff/reports.html'
    '16-gratuity-settlement-employer.html' = 'services/employer/gratuity-settlement/start.html'
    '17-gratuity-settlement-employee.html' = 'services/saver/gratuity-notification/start.html'
    '18-salary-objection.html' = 'services/saver/salary-objection/start.html'
    '19-manual-cases.html' = 'internal/staff/manual-cases.html'
    '20-mandatory-invoices.html' = 'services/employer/mandatory-invoices/start.html'
    '21-exit-notification.html' = 'services/saver/exit-notification/start.html'
    'Full-BRD/Saving-Full-BRD.html' = 'Full-BRD/Saving-Full-BRD.html'
}

$employerRouteMap = @{
    '01-dashboard.html' = 'index.html#employer-services'
    '02-registration.html' = 'services/employer/worker-registration/start.html'
    '03-registered-workers.html' = 'services/employer/registered-workers/start.html'
    '04-account-details.html' = 'services/saver/account-details/start.html'
    '05-deposit.html' = 'services/employer/group-deposit/start.html'
    '06-obligations.html' = 'services/saver/obligations/start.html'
    '07-investment-return.html' = 'internal/staff/investment-return.html'
    '08-disbursement.html' = 'services/saver/disbursement/start.html'
    '09-mandatory-saving.html' = 'services/employer/mandatory-saving/start.html'
    '10-disbursement-processing.html' = 'internal/staff/disbursement-processing.html'
    '11-optional-saving-inquiries.html' = 'services/employer/optional-saving-programs/start.html'
    '12-surplus-transfers.html' = 'internal/staff/surplus-transfers.html'
    '13-exit-system.html' = 'services/saver/exit-system/start.html'
    '14-transaction-history.html' = 'services/saver/transaction-history/start.html'
    '15-reports.html' = 'internal/staff/reports.html'
    '16-gratuity-settlement-employer.html' = 'services/employer/gratuity-settlement/start.html'
    '17-gratuity-settlement-employee.html' = 'services/saver/gratuity-notification/start.html'
    '18-salary-objection.html' = 'services/employer/salary-objection-response/start.html'
    '19-manual-cases.html' = 'internal/staff/manual-cases.html'
    '20-mandatory-invoices.html' = 'services/employer/mandatory-invoices/start.html'
    '21-exit-notification.html' = 'services/saver/exit-notification/start.html'
    'Full-BRD/Saving-Full-BRD.html' = 'Full-BRD/Saving-Full-BRD.html'
}

$staffRouteMap = @{
    '01-dashboard.html' = 'internal/staff/index.html'
    '02-registration.html' = 'internal/staff/registration-operations.html'
    '03-registered-workers.html' = 'internal/staff/mandatory-saving-operations.html'
    '04-account-details.html' = 'internal/staff/index.html'
    '05-deposit.html' = 'internal/staff/optional-saving-operations.html'
    '06-obligations.html' = 'internal/staff/index.html'
    '07-investment-return.html' = 'internal/staff/investment-return.html'
    '08-disbursement.html' = 'internal/staff/disbursement-processing.html'
    '09-mandatory-saving.html' = 'internal/staff/mandatory-saving-operations.html'
    '10-disbursement-processing.html' = 'internal/staff/disbursement-processing.html'
    '11-optional-saving-inquiries.html' = 'internal/staff/optional-saving-operations.html'
    '12-surplus-transfers.html' = 'internal/staff/surplus-transfers.html'
    '13-exit-system.html' = 'internal/staff/exit-notifications.html'
    '14-transaction-history.html' = 'internal/staff/transaction-history.html'
    '15-reports.html' = 'internal/staff/reports.html'
    '16-gratuity-settlement-employer.html' = 'internal/staff/mandatory-saving-operations.html'
    '17-gratuity-settlement-employee.html' = 'internal/staff/mandatory-saving-operations.html'
    '18-salary-objection.html' = 'internal/staff/salary-objections.html'
    '19-manual-cases.html' = 'internal/staff/manual-cases.html'
    '20-mandatory-invoices.html' = 'internal/staff/mandatory-invoices.html'
    '21-exit-notification.html' = 'internal/staff/exit-notifications.html'
    'Full-BRD/Saving-Full-BRD.html' = 'Full-BRD/Saving-Full-BRD.html'
}

$serviceCardRenderer = {
    param($service)
    $href = "services/$($service.Audience)/$($service.Slug)/index.html"
    @"
<article class="service-card">
    <span class="service-card-tag">$($service.Title)</span>
    <h3>$($service.Title)</h3>
    <p>$($service.CardSummary)</p>
    <div class="service-card-footer">
        <a class="gup-primary-btn" href="$href">تفاصيل الخدمة</a>
    </div>
</article>
"@
}

$saverCards = Get-JoinedItems ($services | Where-Object Audience -eq 'saver') $serviceCardRenderer
$employerCards = Get-JoinedItems ($services | Where-Object Audience -eq 'employer') $serviceCardRenderer

$rootIndexHtml = Expand-Template $rootIndexTemplate @{
    SAVER_CARDS = $saverCards
    EMPLOYER_CARDS = $employerCards
}
Write-Utf8File (Join-Path $v2Root 'index.html') $rootIndexHtml

foreach ($service in $services) {
    $audienceLabel = if ($service.Audience -eq 'saver') { 'المدخر' } else { 'صاحب العمل' }
    $serviceDir = Join-Path $v2Root "services\$($service.Audience)\$($service.Slug)"
    Ensure-Directory $serviceDir

    $documentItems = Get-JoinedItems $service.Documents { param($item) "<li>$item</li>" }
    $stepItems = Get-JoinedItems $service.Steps { param($item) "<li>$item</li>" }
    $conditionItems = Get-JoinedItems $service.Conditions { param($item) "<li>$item</li>" }

    $landingHtml = Expand-Template $landingTemplate @{
        ROOT = '../../../'
        TITLE = $service.Title
        AUDIENCE_LABEL = $audienceLabel
        DESCRIPTION = $service.Description
        LONG_DESCRIPTION = $service.LongDescription
        DOCUMENT_ITEMS = $documentItems
        STEP_ITEMS = $stepItems
        CONDITION_ITEMS = $conditionItems
        ACCOUNT_CONTEXT = $service.AccountContext
        FEES = $service.Fees
        CHANNEL = $service.Channel
        TIME = $service.Time
        CTA_LABEL = $service.CtaLabel
        CTA_HELP = $service.CtaHelp
    }

    Write-Utf8File (Join-Path $serviceDir 'index.html') $landingHtml

    $legacyHtml = Get-Content -LiteralPath (Join-Path $legacyCurrent $service.Source) -Raw -Encoding UTF8
    $inlineStyles = Extract-PagePart $legacyHtml '<style>(.*?)</style>'
    $mainContent = Extract-PagePart $legacyHtml '<main class="spf-main">(.*?)</main>'
    $inlineScript = Extract-PagePart $legacyHtml '<script>\s*(.*?)\s*</script>\s*</body>'

    $routeMap = if ($service.Audience -eq 'saver') { $saverRouteMap } else { $employerRouteMap }
    $styleBlock = if ($inlineStyles) { "<style>`n$inlineStyles`n</style>" } else { '' }
    $scriptBlock = if ($inlineScript) { "<script>`n$(Transform-Content $inlineScript $routeMap '../../../')`n</script>" } else { '' }
    $mainBlock = if ($mainContent) {
        $transformedMain = Transform-Content $mainContent $routeMap '../../../'
        "<main class=""spf-main"">`n$transformedMain`n</main>"
    } else {
        "<main id=""mainContent"" class=""gup-main-shell""><section class=""service-panel""><h1>$($service.Title)</h1><p>تعذر تحميل المحتوى الأصلي لهذه الخدمة.</p></section></main>"
    }

    $actionHtml = Expand-Template $actionTemplate @{
        ROOT = '../../../'
        TITLE = $service.Title
        ROLE = $service.Role
        INLINE_STYLES = $styleBlock
        MAIN_CONTENT = $mainBlock
        INLINE_SCRIPT = $scriptBlock
    }

    Write-Utf8File (Join-Path $serviceDir 'start.html') $actionHtml
}

foreach ($page in $staffPages) {
    $legacyHtml = Get-Content -LiteralPath (Join-Path $legacyCurrent $page.Source) -Raw -Encoding UTF8
    $inlineStyles = Extract-PagePart $legacyHtml '<style>(.*?)</style>'
    $mainContent = Extract-PagePart $legacyHtml '<main class="spf-main">(.*?)</main>'
    $inlineScript = Extract-PagePart $legacyHtml '<script>\s*(.*?)\s*</script>\s*</body>'

    $styleBlock = if ($inlineStyles) { "<style>`n$inlineStyles`n</style>" } else { '' }
    $scriptBlock = if ($inlineScript) { "<script>`n$(Transform-Content $inlineScript $staffRouteMap '../../')`n</script>" } else { '' }
    $mainBlock = if ($mainContent) {
        $transformedMain = Transform-Content $mainContent $staffRouteMap '../../'
        "<main class=""spf-main"">`n$transformedMain`n</main>"
    } else {
        "<main id=""mainContent"" class=""gup-main-shell""><section class=""service-panel""><h1>$($page.Title)</h1><p>تعذر تحميل المحتوى الأصلي لهذه الصفحة.</p></section></main>"
    }

    $internalHtml = Expand-Template $internalTemplate @{
        ROOT = '../../'
        TITLE = $page.Title
        INLINE_STYLES = $styleBlock
        MAIN_CONTENT = $mainBlock
        INLINE_SCRIPT = $scriptBlock
    }

    Write-Utf8File (Join-Path $v2Root "internal\staff\$($page.Slug).html") $internalHtml
}

Write-Host "Saving-V2 rebuilt successfully."
