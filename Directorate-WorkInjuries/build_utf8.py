from pathlib import Path

root = Path(__file__).parent


def table(headers, rows):
    head = "".join(f"<th>{h}</th>" for h in headers)
    body = "".join("<tr>" + "".join(f"<td>{c}</td>" for c in row) + "</tr>" for row in rows)
    return f'<table class="table"><thead><tr>{head}</tr></thead><tbody>{body}</tbody></table>'


def metrics(items):
    return '<div class="grid cards-4">' + "".join(
        f'<div class="metric"><b>{value}</b><span>{label}</span></div>' for label, value in items
    ) + "</div>"


def shell(title, section, page, crumbs, body, user="أحمد بن سالم البلوشي - موظف الصندوق"):
    crumb_text = "|".join(crumbs)
    return f"""<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body data-section="{section}" data-page="{page}" data-title="{title}" data-crumbs="{crumb_text}" data-user="{user}">
  <div id="topbar" class="app-topbar"></div>
  <div class="layout">
    <aside id="sidebar" class="sidebar"></aside>
    <main class="main">
      <div class="crumbs" id="breadcrumbs"></div>
      <div class="page-head">
        <div>
          <h2 id="pageTitle">{title}</h2>
          <p>رحلة تشغيلية مترابطة توضح الطلب والحالة والإجراء التالي ضمن نفس النظام.</p>
        </div>
        <div class="inline-actions">
          <a class="btn secondary" href="S.2-home.html">العودة للرئيسية</a>
        </div>
      </div>
      {body}
    </main>
  </div>
  <script src="app.js"></script>
</body>
</html>"""


def login():
    return """<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>تسجيل الدخول</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body data-simple="login">
  <main class="hero-login">
    <section class="login-shell">
      <div class="login-side">
        <div class="brand">
          <div class="brand-mark">ص</div>
          <div>
            <h1>صندوق الحماية الاجتماعية</h1>
            <p>مديرية إصابات العمل والأمراض المهنية والشؤون الطبية</p>
          </div>
        </div>
        <h2 style="font-size:42px;margin:26px 0 10px;color:var(--g)">الدخول إلى النظام</h2>
        <p style="color:var(--muted)">بوابة تشغيلية موحدة لإدارة الطلبات والحالات والجلسات والقرارات.</p>
        <div class="center-note">
          <b>المسارات المتاحة بعد الدخول</b>
          <div class="mini">لوحات الوحدات، القوائم، التفاصيل، تنفيذ القرار، والتحويل بين المراحل.</div>
        </div>
      </div>
      <div class="login-form">
        <div class="card">
          <div class="card-head"><h3>بيانات الدخول</h3></div>
          <div class="card-body">
            <div class="form-grid">
              <div class="field"><label>اسم المستخدم / الرقم المدني <span class="req">*</span></label><input value="10234567"></div>
              <div class="field"><label>كلمة المرور <span class="req">*</span></label><input type="password" value="123456"></div>
              <div class="field"><label>طريقة الدخول</label><select><option>اسم المستخدم وكلمة المرور</option><option>دخول عبر PKI</option><option>دخول عبر Mobile PKI</option></select></div>
            </div>
            <div class="actions" style="margin-top:18px">
              <a class="btn primary" href="S.2-home.html">تسجيل الدخول</a>
              <a class="btn secondary" href="S.2-home.html">دخول عبر PKI</a>
              <a class="btn secondary" href="S.2-home.html">دخول عبر Mobile PKI</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</body>
</html>"""


def dashboard(title, section, page, list_link, detail_link, extra_link, metric_items, rows):
    body = metrics(metric_items)
    body += f"""
    <div class="grid cards-2" style="margin-top:18px">
      <div class="card">
        <div class="card-head"><h3>الانتقال السريع</h3></div>
        <div class="card-body">
          <div class="quick-links">
            <a class="btn primary" href="{list_link}">فتح القائمة</a>
            <a class="btn secondary" href="{detail_link}">فتح عينة تفاصيل</a>
            <a class="btn secondary" href="{extra_link}">فتح شاشة مرتبطة</a>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-head"><h3>أحدث السجلات</h3></div>
        <div class="card-body">{table(["المرجع","الحالة","الإجراء التالي"], rows)}</div>
      </div>
    </div>
    """
    return shell(title, section, page, ["الرئيسية", title], body)


def list_page(title, section, page, new_link, note, headers, rows):
    body = f"""
    <div class="alert">{note}</div>
    <div class="card" style="margin-top:18px">
      <div class="card-head">
        <h3>الفلاتر والإجراءات</h3>
        <div class="toolbar">
          <a class="btn primary" href="{new_link}">إنشاء / تقديم جديد</a>
          <button class="btn secondary" data-action="بحث" data-message="تم تنفيذ البحث داخل النموذج">بحث</button>
          <button class="btn secondary" data-action="إعادة تعيين">إعادة تعيين</button>
        </div>
      </div>
      <div class="card-body">
        <div class="form-grid">
          <div class="field"><label>رقم الطلب</label><input value=""></div>
          <div class="field"><label>الرقم المدني</label><input value=""></div>
          <div class="field"><label>الحالة</label><select><option>الكل</option><option>جديد</option><option>قيد المعالجة</option><option>معتمد</option></select></div>
        </div>
        <div class="tabs" style="margin-top:16px">
          <button class="tab active" data-tab="all">الكل</button>
          <button class="tab" data-tab="pending">قيد العمل</button>
          <button class="tab" data-tab="done">مكتمل</button>
        </div>
      </div>
    </div>
    <div class="card" style="margin-top:18px">
      <div class="card-head"><h3>النتائج</h3></div>
      <div class="card-body">{table(headers, rows)}</div>
    </div>
    """
    return shell(title, section, page, ["الرئيسية", title], body)


def form_page(title, section, page, back, redirect, intro, extra):
    body = f"""
    <div class="alert">{intro}</div>
    <div class="card" style="margin-top:18px">
      <div class="card-head"><h3>بيانات الطلب</h3></div>
      <div class="card-body">
        <div class="stepper">
          <a href="#" class="step active" data-step-link="#step1">الخطوة 1: المعلومات الأساسية</a>
          <a href="#" class="step" data-step-link="#step2">الخطوة 2: بيانات مقدم الطلب</a>
          <a href="#" class="step" data-step-link="#step3">الخطوة 3: البيانات والمرفقات</a>
          <a href="#" class="step" data-step-link="#step4">الخطوة 4: المراجعة والإرسال</a>
        </div>
        <section id="step1" style="margin-top:18px">
          <div class="form-grid">
            <div class="field"><label>نوع الطلب <span class="req">*</span></label><select><option>إصابة عمل</option><option>مرض مهني</option></select></div>
            <div class="field"><label>تاريخ الواقعة / التأكيد</label><input value="31/03/2026"></div>
            <div class="field"><label>صفة مقدم الطلب</label><select data-role-switcher data-target="#roleCases"><option value="insured">المؤمن عليه</option><option value="employer">صاحب العمل</option><option value="staff">موظف الصندوق</option></select></div>
          </div>
        </section>
        <section id="step2" style="margin-top:18px">
          <div id="roleCases">
            <div data-role-case="insured"><div class="alert ok">عند اختيار المؤمن عليه تظهر الحقول المرتبطة بالعلاقة المباشرة والمرفقات الشخصية.</div></div>
            <div data-role-case="employer" style="display:none"><div class="alert ok">عند اختيار صاحب العمل تظهر بيانات المنشأة والمسؤول المعتمد.</div></div>
            <div data-role-case="staff" style="display:none"><div class="alert ok">عند اختيار موظف الصندوق تظهر بيانات السند النظامي أو سبب التقديم نيابةً عن المستفيد.</div></div>
          </div>
          <div class="form-grid" style="margin-top:14px">
            <div class="field"><label>الاسم</label><input value="أحمد بن سالم البلوشي"></div>
            <div class="field"><label>الرقم المدني</label><input value="10234567"></div>
            <div class="field"><label>رقم الهاتف</label><input value="92123456"></div>
          </div>
        </section>
        {extra}
        <section id="step4" style="margin-top:18px">
          <div class="actions">
            <a class="btn secondary" href="{back}">العودة</a>
            <button class="btn secondary" data-action="حفظ كمسودة" data-message="تم حفظ البيانات كمسودة">حفظ كمسودة</button>
            <button class="btn primary" data-action="إرسال الطلب" data-message="تم إرسال الطلب وتحويلك إلى شاشة التفاصيل" data-redirect="{redirect}">إرسال الطلب</button>
          </div>
        </section>
      </div>
    </div>
    """
    return shell(title, section, page, ["الرئيسية", title], body)


def detail_page(title, section, page, summary, panels):
    left = '<div class="card summary-card"><div class="card-head"><h3>ملخص</h3></div><div class="card-body"><div class="summary-list">'
    left += "".join(f'<div class="summary-item"><b>{k}</b><span>{v}</span></div>' for k, v in summary)
    left += "</div></div></div>"
    right = "".join(f'<div class="card"><div class="card-head"><h3>{name}</h3></div><div class="card-body">{content}</div></div>' for name, content in panels)
    return shell(title, section, page, ["الرئيسية", title], f'<div class="split"><div>{left}</div><div class="grid">{right}</div></div>')


def simple_page(title, section, page, intro, main_html, actions=""):
    body = f'<div class="alert">{intro}</div><div class="card" style="margin-top:18px"><div class="card-head"><h3>{title}</h3></div><div class="card-body">{main_html}{actions}</div></div>'
    return shell(title, section, page, ["الرئيسية", title], body)


pages = {
    "S.1-login.html": login(),
    "S.2-home.html": shell(
        "الرئيسية",
        "shared",
        "S.2-home.html",
        ["الرئيسية"],
        metrics([("عدد الطلبات الجديدة", "28"), ("طلبات بانتظار الإجراء", "14"), ("طلبات متأخرة", "5"), ("إشعارات اليوم", "9")])
        + """
        <div class="grid cards-3" style="margin-top:18px">
          <div class="module-card"><h4>طلب صرف بدلات الانقطاع عن العمل</h4><p>بدء الطلب، متابعة التحقيق، الإجازات المرضية، والتظلمات الداخلية.</p><div class="quick-links"><a class="btn primary" href="1.0-dashboard.html">دخول الوحدة</a><a class="btn secondary" href="1.A-claims-list.html">قائمة الطلبات</a></div></div>
          <div class="module-card"><h4>منفعة الأشخاص ذوي الإعاقة</h4><p>التحقق من البطاقة، الطلبات، المتابعة، والصرف.</p><div class="quick-links"><a class="btn primary" href="2.0-dashboard.html">دخول الوحدة</a><a class="btn secondary" href="2.A-benefit-list.html">قائمة الطلبات</a></div></div>
          <div class="module-card"><h4>منفعة الأشخاص ذوي الإعاقة - فئة الأمراض المستديمة</h4><p>الحالات الواردة، استكمال الطلب، القرار، وإعادة التقييم.</p><div class="quick-links"><a class="btn primary" href="3.0-dashboard.html">دخول الوحدة</a><a class="btn secondary" href="3.A-incoming-cases-list.html">الحالات الواردة</a></div></div>
          <div class="module-card"><h4>التنسيق مع المؤسسات الصحية المرخصة</h4><p>استلام طلبات العرض، إدارة الجلسات، القرارات والتوقيع.</p><div class="quick-links"><a class="btn primary" href="4.0-dashboard.html">دخول الوحدة</a><a class="btn secondary" href="4.A-referral-requests-list.html">طلبات العرض</a></div></div>
          <div class="module-card"><h4>التظلم من قرارات المؤسسات الصحية المرخصة</h4><p>تقديم التظلم، إدارة الجلسات، القرار النهائي والملزم.</p><div class="quick-links"><a class="btn primary" href="5.0-dashboard.html">دخول الوحدة</a><a class="btn secondary" href="5.A-appeals-list.html">قائمة التظلمات</a></div></div>
          <div class="module-card"><h4>التراخيص والرقابة على المؤسسات الصحية المرخصة</h4><p>طلبات الترخيص، الزيارات الرقابية، وملف المؤسسة.</p><div class="quick-links"><a class="btn primary" href="6.0-dashboard.html">دخول الوحدة</a><a class="btn secondary" href="6.A-license-list.html">الطلبات / المؤسسات</a></div></div>
        </div>
        <div class="card" style="margin-top:18px"><div class="card-head"><h3>آخر الأعمال</h3></div><div class="card-body">"""
        + table(
            ["رقم الطلب", "النوع", "الحالة", "الإجراء التالي"],
            [
                ["WI-2026-00142", "بدل انقطاع عن العمل", '<span class="status s-review">قيد التحقيق</span>', '<a class="btn secondary" href="1.C-claim-detail.html">فتح</a>'],
                ["DB-2026-00231", "منفعة الأشخاص ذوي الإعاقة", '<span class="status s-approval">بانتظار الاعتماد</span>', '<a class="btn secondary" href="2.C-benefit-detail.html">فتح</a>'],
                ["REF-2026-00512", "عرض على مؤسسة صحية مرخصة", '<span class="status s-pending">جلسة مجدولة</span>', '<a class="btn secondary" href="4.E-session-detail.html">فتح الجلسة</a>'],
            ],
        )
        + "</div></div>",
    ),
}


pages.update({
    "1.0-dashboard.html": dashboard("لوحة وحدة طلب صرف بدلات الانقطاع عن العمل", "m1", "1.0-dashboard.html", "1.A-claims-list.html", "1.C-claim-detail.html", "1.B-new-claim.html", [("طلبات جديدة", "18"), ("قيد التحقيق", "11"), ("إجازات مرضية بانتظار الاعتماد", "7"), ("تظلمات داخلية", "3")], [["WI-2026-00142", '<span class="status s-review">قيد التحقيق</span>', '<a class="btn secondary" href="1.C-claim-detail.html">فتح</a>'], ["OD-2026-00089", '<span class="status s-approval">بانتظار قرار</span>', '<a class="btn secondary" href="1.C-claim-detail.html">فتح</a>']]),
    "2.0-dashboard.html": dashboard("لوحة وحدة منفعة الأشخاص ذوي الإعاقة", "m2", "2.0-dashboard.html", "2.A-benefit-list.html", "2.C-benefit-detail.html", "2.B-new-benefit.html", [("طلبات جديدة", "22"), ("بطاقات تنتهي قريباً", "9"), ("طلبات بانتظار الاعتماد", "6"), ("حالات إيقاف الصرف", "4")], [["DB-2026-00231", '<span class="status s-approval">بانتظار الاعتماد</span>', '<a class="btn secondary" href="2.C-benefit-detail.html">فتح</a>'], ["DB-2026-00241", '<span class="status s-approved">معتمد</span>', '<a class="btn secondary" href="2.D-card-status-inquiry.html">فحص البطاقة</a>']]),
    "3.0-dashboard.html": dashboard("لوحة وحدة منفعة الأشخاص ذوي الإعاقة - فئة الأمراض المستديمة", "m3", "3.0-dashboard.html", "3.A-incoming-cases-list.html", "3.D-request-detail.html", "3.E-reassessment-followup.html", [("حالات واردة", "16"), ("طلبات مستكملة", "8"), ("حالات بانتظار العرض", "5"), ("إعادة تقييم قريبة", "12")], [["PD-2026-00389", '<span class="status s-review">قيد الدراسة</span>', '<a class="btn secondary" href="3.D-request-detail.html">فتح</a>'], ["PD-2026-00377", '<span class="status s-hold">إعادة تقييم</span>', '<a class="btn secondary" href="3.E-reassessment-followup.html">متابعة</a>']]),
    "4.0-dashboard.html": dashboard("لوحة وحدة التنسيق مع المؤسسات الصحية المرخصة", "m4", "4.0-dashboard.html", "4.A-referral-requests-list.html", "4.B-referral-request-detail.html", "4.D-session-management.html", [("طلبات عرض واردة", "19"), ("جلسات هذا الأسبوع", "7"), ("قرارات بانتظار التوقيع", "5"), ("جلسات مؤجلة", "2")], [["REF-2026-00512", '<span class="status s-pending">قيد المراجعة</span>', '<a class="btn secondary" href="4.B-referral-request-detail.html">فتح</a>'], ["SES-2026-00118", '<span class="status s-review">جلسة اليوم</span>', '<a class="btn secondary" href="4.E-session-detail.html">فتح الجلسة</a>']]),
    "5.0-dashboard.html": dashboard("لوحة وحدة التظلم من قرارات المؤسسات الصحية المرخصة", "m5", "5.0-dashboard.html", "5.A-appeals-list.html", "5.C-appeal-detail.html", "5.D-session-management.html", [("تظلمات جديدة", "14"), ("قيد المراجعة", "9"), ("مقبولة للعرض", "4"), ("قرارات نهائية اليوم", "2")], [["APP-2026-00034", '<span class="status s-review">مراجعة أولية</span>', '<a class="btn secondary" href="5.C-appeal-detail.html">فتح</a>'], ["APS-2026-00008", '<span class="status s-pending">جلسة مجدولة</span>', '<a class="btn secondary" href="5.E-session-detail.html">الجلسة</a>']]),
    "6.0-dashboard.html": dashboard("لوحة وحدة التراخيص والرقابة على المؤسسات الصحية المرخصة", "m6", "6.0-dashboard.html", "6.A-license-list.html", "6.C-license-detail.html", "6.D-inspection-visits.html", [("طلبات جديدة", "11"), ("تجديدات قريبة", "6"), ("زيارات رقابية مجدولة", "8"), ("مؤسسات فعالة", "24")], [["LIC-2026-00018", '<span class="status s-review">قيد التحقق</span>', '<a class="btn secondary" href="6.C-license-detail.html">فتح</a>'], ["VIS-2026-00041", '<span class="status s-pending">زيارة مجدولة</span>', '<a class="btn secondary" href="6.D-inspection-visits.html">الزيارة</a>']]),
})

pages.update({
    "1.A-claims-list.html": list_page("قائمة طلبات صرف بدلات الانقطاع عن العمل", "m1", "1.A-claims-list.html", "1.B-new-claim.html", "تختلف البيانات والإجراءات الظاهرة حسب ما إذا كان المستخدم هو المؤمن عليه أو المفوض من جهة العمل أو موظف الصندوق.", ["رقم الطلب", "نوع البلاغ", "مقدم الطلب", "المؤمن عليه", "جهة العمل", "الحالة", "المرحلة", "الإجراء"], [["WI-2026-00142", "إصابة عمل", "صاحب العمل", "سالم البلوشي", "شركة تنمية عمان", '<span class="status s-review">قيد التحقيق</span>', "التحقيق", '<a class="btn secondary" href="1.C-claim-detail.html">عرض التفاصيل</a>'], ["OD-2026-00089", "مرض مهني", "المؤمن عليه", "مريم المقبالية", "مصنع الخليج", '<span class="status s-approval">بانتظار القرار</span>', "اعتماد التحقيق", '<a class="btn secondary" href="1.C-claim-detail.html">عرض التفاصيل</a>']]),
    "2.A-benefit-list.html": list_page("قائمة طلبات منفعة الأشخاص ذوي الإعاقة", "m2", "2.A-benefit-list.html", "2.B-new-benefit.html", "تعرض القائمة الطلبات حسب الدور، مع إبراز حالة البطاقة وتأثيرها على قرار المعالجة والصرف.", ["رقم الطلب", "مقدم الطلب", "المستفيد", "رقم بطاقة الإعاقة", "حالة البطاقة", "حالة الطلب", "تاريخ التقديم", "الإجراء"], [["DB-2026-00231", "المستفيد", "أحمد البلوشي", "DC-99821", '<span class="status s-approved">سارية</span>', '<span class="status s-approval">بانتظار الاعتماد</span>', "28/03/2026", '<a class="btn secondary" href="2.C-benefit-detail.html">عرض التفاصيل</a>'], ["DB-2026-00228", "المستفيد", "فاطمة الهنائية", "DC-44127", '<span class="status s-rejected">منتهية</span>', '<span class="status s-review">مستوفى</span>', "22/03/2026", '<a class="btn secondary" href="2.C-benefit-detail.html">عرض التفاصيل</a>']]),
    "3.A-incoming-cases-list.html": list_page("قائمة الحالات الواردة من المؤسسات الصحية المعالجة", "m3", "3.A-incoming-cases-list.html", "3.B-create-request.html", "هذه الشاشة لموظفي الصندوق فقط، وتوضح الفرق بين الحالات الواردة طبياً والطلبات التي استكملها المستفيد فعلياً.", ["رقم الحالة", "الرقم المدني", "اسم المريض", "نوع المسار", "الحالة", "تاريخ تأكيد المرض", "الإجراء"], [["PD-2026-00389", "10234567", "أحمد البلوشي", "استحقاق مباشر", '<span class="status s-review">قيد الدراسة</span>', "20/03/2026", '<a class="btn secondary" href="3.D-request-detail.html">عرض التفاصيل</a>'], ["PD-2026-00377", "11024589", "مريم المعولية", "عرض على مؤسسة صحية مرخصة", '<span class="status s-pending">بانتظار الإحالة</span>', "18/03/2026", '<a class="btn secondary" href="3.D-request-detail.html">عرض التفاصيل</a>']]),
    "3.C-registration-requests-list.html": list_page("طلبات التسجيل في منفعة الأشخاص ذوي الإعاقة - فئة الأمراض المستديمة", "m3", "3.C-registration-requests-list.html", "3.B-create-request.html", "هذه الشاشة تعرض فقط الطلبات التي استكملها المستفيد وتم تسجيلها داخل المنفعة، وليست مجرد حالات واردة من الجهة الصحية.", ["رقم الطلب", "المستفيد", "المسار", "الحالة", "آخر تحديث", "الإجراء"], [["PDR-2026-00011", "أحمد البلوشي", "استحقاق مباشر", '<span class="status s-review">قيد المراجعة</span>', "30/03/2026", '<a class="btn secondary" href="3.D-request-detail.html">عرض التفاصيل</a>'], ["PDR-2026-00008", "فاطمة الهنائية", "إحالة لمؤسسة صحية مرخصة", '<span class="status s-pending">بانتظار العرض</span>', "29/03/2026", '<a class="btn secondary" href="3.D-request-detail.html">عرض التفاصيل</a>']]),
    "4.A-referral-requests-list.html": list_page("قائمة طلبات العرض الواردة إلى قسم اللجان الطبية", "m4", "4.A-referral-requests-list.html", "4.B-referral-request-detail.html", "تعرض هذه الشاشة الطلبات المحالة من الوحدات الأخرى إلى قسم اللجان الطبية، وتختلف الإجراءات المتاحة حسب المستخدم الحالي.", ["رقم الطلب", "نوع الحالة", "اسم المؤمن عليه", "الجهة المحيلة", "الحالة", "الإجراء"], [["REF-2026-00512", "إجازة مرضية", "أحمد البلوشي", "بدلات الانقطاع عن العمل", '<span class="status s-review">مراجعة أولية</span>', '<a class="btn secondary" href="4.B-referral-request-detail.html">عرض التفاصيل</a>'], ["REF-2026-00518", "قدرة كسبية", "محمد الراشدي", "منفعة الأشخاص ذوي الإعاقة", '<span class="status s-approval">بانتظار اعتماد</span>', '<a class="btn secondary" href="4.B-referral-request-detail.html">عرض التفاصيل</a>']]),
    "4.C-referred-cases-list.html": list_page("قائمة الحالات التي تم إحالتها للعرض", "m4", "4.C-referred-cases-list.html", "4.D-session-management.html", "تعكس هذه القائمة الحالات التي تجاوزت مرحلة القبول والإحالة وأصبحت مرتبطة بموعد وجلسة وقرار.", ["رقم الإحالة", "نوع الحالة", "المؤسسة الصحية", "حالة الموعد", "حالة القرار", "الإجراء"], [["REF-2026-00512", "إجازة مرضية", "مستشفى خولة", '<span class="status s-pending">جلسة مجدولة</span>', '<span class="status s-draft">بانتظار القرار</span>', '<a class="btn secondary" href="4.E-session-detail.html">عرض التفاصيل</a>'], ["REF-2026-00503", "عجز مهني", "المستشفى السلطاني", '<span class="status s-review">تم العرض</span>', '<span class="status s-approval">بانتظار التوقيع</span>', '<a class="btn secondary" href="4.E-session-detail.html">عرض التفاصيل</a>']]),
    "5.A-appeals-list.html": list_page("قائمة طلبات التظلم من قرارات المؤسسات الصحية المرخصة", "m5", "5.A-appeals-list.html", "5.B-new-appeal.html", "تظهر التظلمات حسب أهلية التقديم والمرحلة الحالية، مع إبراز ما إذا كان الإجراء ما زال ضمن المدة النظامية.", ["رقم التظلم", "رقم الطلب الأصلي", "نوع الحالة", "مقدم التظلم", "تاريخ التقديم", "حالة التظلم", "الإجراء"], [["APP-2026-00034", "REF-2026-00512", "إجازة مرضية", "أحمد البلوشي", "27/03/2026", '<span class="status s-review">مراجعة أولية</span>', '<a class="btn secondary" href="5.C-appeal-detail.html">عرض التفاصيل</a>'], ["APP-2026-00027", "REF-2026-00498", "عجز مهني", "شركة مسقط الوطنية", "21/03/2026", '<span class="status s-pending">جلسة مجدولة</span>', '<a class="btn secondary" href="5.C-appeal-detail.html">عرض التفاصيل</a>']]),
    "6.A-license-list.html": list_page("قائمة الطلبات / المؤسسات", "m6", "6.A-license-list.html", "6.B-license-request.html", "تجمع هذه الشاشة بين الطلبات الجارية وملفات المؤسسات المرخصة لتسهيل المتابعة والتنقل.", ["اسم المؤسسة", "رقم الطلب", "نوع الطلب", "حالة الترخيص", "تاريخ الانتهاء", "الإجراء"], [["مركز الشفاء التخصصي", "LIC-2026-00018", "ترخيص جديد", '<span class="status s-review">قيد التحقق</span>', "--", '<a class="btn secondary" href="6.C-license-detail.html">عرض التفاصيل</a>'], ["مركز العناية الطبية", "LIC-2025-00102", "تجديد", '<span class="status s-approved">ساري</span>', "14/12/2026", '<a class="btn secondary" href="6.E-institution-profile.html">ملف المؤسسة</a>']]),
})

pages.update({
    "1.B-new-claim.html": form_page("تقديم طلب جديد - بدل الانقطاع عن العمل", "m1", "1.B-new-claim.html", "1.A-claims-list.html", "1.C-claim-detail.html", "تتغير الحقول والمرفقات وبيانات الاسترجاع حسب مقدم الطلب ونوع البلاغ.", """
    <section id="step3" style="margin-top:18px">
      <div class="grid cards-2">
        <div class="card"><div class="card-head"><h3>بيانات المؤمن عليه وجهة العمل</h3></div><div class="card-body"><div class="form-grid"><div class="field"><label>رقم التأمين</label><input value="INS-45872"></div><div class="field"><label>الوظيفة</label><input value="فني تشغيل"></div><div class="field"><label>جهة العمل</label><input value="شركة تنمية عمان"></div></div><div class="actions" style="margin-top:14px"><button class="btn secondary" data-action="استرجاع بيانات المؤمن عليه" data-message="تم جلب بيانات المؤمن عليه">استرجاع بيانات المؤمن عليه</button><button class="btn secondary" data-action="استرجاع بيانات جهة العمل" data-message="تم جلب بيانات جهة العمل">استرجاع بيانات جهة العمل</button></div></div></div>
        <div class="card"><div class="card-head"><h3>المرفقات والبيانات المسترجعة</h3></div><div class="card-body"><div class="field"><label>المرفقات</label><textarea>التقرير الطبي الأولي
كشف الحضور والانصراف
إفادة المشرف</textarea></div><div class="query-box" data-query-box><div class="inline-actions"><button class="btn secondary" data-query="success">استعلام ناجح</button><button class="btn secondary" data-query="loading">جاري التحميل</button><button class="btn secondary" data-query="nodata">لا توجد بيانات</button><button class="btn secondary" data-query="failure">فشل الربط</button></div><div class="query-state active" data-state="success"><div class="alert ok">تم جلب تقريرين طبيين من وزارة الصحة.</div></div><div class="query-state" data-state="loading"><div class="alert">جاري الاستعلام عن التقارير الطبية من وزارة الصحة...</div></div><div class="query-state" data-state="nodata"><div class="alert warn">لا توجد تقارير طبية متاحة للرقم المدني المدخل.</div></div><div class="query-state" data-state="failure"><div class="alert danger">تعذر الاتصال بوزارة الصحة حالياً.</div></div></div></div></div>
      </div>
    </section>
    """),
    "2.B-new-benefit.html": form_page("تقديم طلب جديد - منفعة الأشخاص ذوي الإعاقة", "m2", "2.B-new-benefit.html", "2.A-benefit-list.html", "2.C-benefit-detail.html", "هذه الشاشة متاحة للمستفيدين فقط، مع التحقق المباشر من بطاقة الإعاقة وبيانات التأمين.", """
    <section id="step3" style="margin-top:18px">
      <div class="grid cards-2">
        <div class="card"><div class="card-head"><h3>بيانات البطاقة</h3></div><div class="card-body"><div class="form-grid"><div class="field"><label>رقم بطاقة الإعاقة</label><input value="DC-99821"></div><div class="field"><label>تاريخ انتهاء البطاقة</label><input value="14/11/2026"></div><div class="field"><label>حالة البطاقة</label><input value="سارية"></div></div><div class="actions" style="margin-top:14px"><button class="btn secondary" data-action="التحقق من البطاقة" data-message="تم التحقق من البطاقة بنجاح">التحقق من البطاقة</button><button class="btn secondary" data-action="استرجاع بيانات التأمين" data-message="تم استرجاع بيانات التأمين">استرجاع بيانات التأمين</button></div></div></div>
        <div class="card"><div class="card-head"><h3>المرفقات</h3></div><div class="card-body"><div class="field"><label>التقارير الطبية</label><textarea>تقرير اللجنة الطبية - 03/2026
ملف متابعة علاجية</textarea></div></div></div>
      </div>
    </section>
    """),
    "3.B-create-request.html": form_page("إنشاء الطلب - الأمراض المستديمة", "m3", "3.B-create-request.html", "3.A-incoming-cases-list.html", "3.D-request-detail.html", "هذه الشاشة متاحة للمستفيد فقط بعد ورود الحالة من المؤسسة الصحية المعالجة.", """
    <section id="step3" style="margin-top:18px">
      <div class="grid cards-2">
        <div class="card"><div class="card-head"><h3>البيانات الطبية الأولية</h3></div><div class="card-body"><div class="form-grid"><div class="field"><label>الجهة الصحية</label><input value="مستشفى جامعة السلطان قابوس"></div><div class="field"><label>التشخيص</label><input value="فشل قلبي مزمن"></div><div class="field"><label>كود المرض</label><input value="PD-CV-021"></div></div></div></div>
        <div class="card"><div class="card-head"><h3>بيانات التأمين والمرفقات</h3></div><div class="card-body"><div class="actions"><button class="btn secondary" data-action="استرجاع بيانات الطلب الطبية" data-message="تم استرجاع البيانات الطبية">استرجاع بيانات الطلب الطبية</button><button class="btn secondary" data-action="استرجاع بيانات التأمين" data-message="تم استرجاع بيانات التأمين">استرجاع بيانات التأمين</button></div><div class="field" style="margin-top:14px"><label>مرفقات إضافية</label><textarea>تقرير متابعة حديث
نتيجة فحص متخصص</textarea></div></div></div>
      </div>
    </section>
    """),
    "5.B-new-appeal.html": form_page("تقديم طلب تظلم", "m5", "5.B-new-appeal.html", "5.A-appeals-list.html", "5.C-appeal-detail.html", "تبدأ الشاشة بالتحقق من أهلية التظلم من حيث المدة النظامية ونوع الحالة.", """
    <section id="step3" style="margin-top:18px">
      <div class="grid cards-2">
        <div class="card"><div class="card-head"><h3>ملخص القرار محل التظلم</h3></div><div class="card-body">""" + table(["المرجع", "القرار", "تاريخ القرار"], [["REF-2026-00512", "رفض منح إجازة مرضية كاملة", "18/03/2026"]]) + """</div></div>
        <div class="card"><div class="card-head"><h3>أهلية التظلم</h3></div><div class="card-body"><div class="alert ok">التظلم ضمن المدة النظامية ونوع الحالة مسموح به.</div><div class="field"><label>سبب التظلم</label><textarea>وجود تقارير إضافية لم تؤخذ بعين الاعتبار عند إصدار القرار السابق.</textarea></div></div></div>
      </div>
    </section>
    """),
    "6.B-license-request.html": form_page("طلب الترخيص / التجديد", "m6", "6.B-license-request.html", "6.A-license-list.html", "6.C-license-detail.html", "يستخدم لتقديم طلب ترخيص جديد أو تجديد مع ترشيح الأطباء واستكمال المرفقات.", """
    <section id="step3" style="margin-top:18px">
      <div class="grid cards-2">
        <div class="card"><div class="card-head"><h3>بيانات المؤسسة</h3></div><div class="card-body"><div class="form-grid"><div class="field"><label>اسم المؤسسة</label><input value="مركز الشفاء التخصصي"></div><div class="field"><label>السجل التجاري</label><input value="CR-5592081"></div><div class="field"><label>نوع المؤسسة</label><select><option>خاصة</option><option>حكومية</option></select></div></div></div></div>
        <div class="card"><div class="card-head"><h3>الأطباء والمرفقات</h3></div><div class="card-body"><div class="field"><label>الأطباء المرشحون</label><textarea>د. خالد الرواحي - رئيس
د. مريم الحارثية - مقرر
د. سيف الكندي - عضو</textarea></div><div class="actions"><button class="btn secondary" data-action="إضافة طبيب" data-message="تمت إضافة طبيب جديد">إضافة طبيب</button><button class="btn secondary" data-action="إرسال طلب تأكيد للطبيب" data-message="تم إرسال طلبات التأكيد">إرسال طلب تأكيد للطبيب</button></div></div></div>
      </div>
    </section>
    """),
})

pages.update({
    "1.C-claim-detail.html": detail_page("تفاصيل طلب بدل الانقطاع عن العمل", "m1", "1.C-claim-detail.html", [("رقم الطلب", "WI-2026-00142"), ("الحالة", '<span class="status s-review">قيد التحقيق</span>'), ("المرحلة", "التحقيق"), ("آخر تحديث", "31/03/2026 09:20")], [
        ("بيانات الطلب والمستفيد", table(["الحقل", "القيمة"], [["مقدم الطلب", "صاحب العمل"], ["المؤمن عليه", "سالم البلوشي"], ["جهة العمل", "شركة تنمية عمان"], ["نوع البلاغ", "إصابة عمل"], ["الواقعة", "حادث أثناء العمل"]])),
        ("استعلام التقارير الطبية من وزارة الصحة", '<div class="query-box" data-query-box><div class="inline-actions"><button class="btn secondary" data-query="success">استعلام ناجح</button><button class="btn secondary" data-query="loading">جاري التحميل</button><button class="btn secondary" data-query="nodata">لا توجد بيانات</button><button class="btn secondary" data-query="failure">فشل الربط</button></div><div class="query-state active" data-state="success">' + table(["المرجع", "الجهة", "التاريخ", "النتيجة"], [["MOH-22181", "وزارة الصحة", "30/03/2026", "تمت إعادة 3 سجلات"]]) + '</div><div class="query-state" data-state="loading"><div class="alert">جاري الاستعلام عن التقارير الطبية من وزارة الصحة...</div></div><div class="query-state" data-state="nodata"><div class="alert warn">لا توجد تقارير متاحة.</div></div><div class="query-state" data-state="failure"><div class="alert danger">فشل الاتصال بوزارة الصحة.</div></div></div>'),
        ("الزيارات الميدانية", table(["التاريخ", "الفريق", "النتيجة", "الإجراء"], [["28/03/2026", "أحمد البلوشي، خالد المقبالي", "تمت المعاينة الميدانية", '<button class="btn secondary" data-action="عرض تفاصيل الزيارة" data-target="visitDrawer">عرض التفاصيل</button>']]) + '<div class="modal-sim" data-sim="visitDrawer"><div class="grid cards-2"><div><b>بيانات الزيارة</b><div class="mini">الموقع: موقع المشروع - ولاية صحار</div><div class="mini">الوقت: 09:30 صباحاً</div></div><div><b>نتائج المعاينة</b><div class="mini">تمت مطابقة موقع الواقعة مع التقرير الأولي وإرفاق صور.</div></div></div></div>'),
        ("فترات الإجازات المرضية", table(["من", "إلى", "عدد الأيام", "الحالة"], [["10/03/2026", "25/03/2026", "16", '<span class="status s-approval">بانتظار الاعتماد</span>'], ["26/03/2026", "31/03/2026", "6", '<span class="status s-draft">مسودة</span>']])),
        ("بيانات الصرف والتنفيذ", table(["الفترة", "المبلغ", "الحالة"], [["10/03/2026 - 25/03/2026", "480 ر.ع", '<span class="status s-draft">لم يصرف بعد</span>']])),
        ("لوحة القرار", '<div class="form-grid"><div class="field"><label>القرار</label><select><option>اعتماد</option><option>رفض</option><option>إرجاع للاستيفاء</option><option>تحويل</option></select></div><div class="field"><label>سبب القرار / الملاحظة</label><input value="استكمال إفادة المشرف وتأكيد الفترة المرضية"></div><div class="field"><label>الإجراء التالي</label><select><option>العودة إلى قائمة الطلبات</option><option>فتح الإجازات المرضية</option><option>تحويل للوحدة الطبية</option></select></div></div><div class="actions" style="margin-top:14px"><a class="btn secondary" href="1.A-claims-list.html">العودة إلى قائمة الطلبات</a><button class="btn warn" data-action="إرجاع للاستيفاء" data-message="تم إرجاع الطلب للاستيفاء">إرجاع للاستيفاء</button><button class="btn danger" data-action="رفض" data-message="تم رفض الطلب">رفض</button><button class="btn primary" data-action="اعتماد" data-message="تم اعتماد الإجراء" data-redirect="1.D-objections-list.html">اعتماد</button></div>'),
        ("السجل الزمني", '<div class="history-box"><div class="history-item"><b>31/03/2026 09:20</b><div>أحمد البلوشي - فتح الطلب وراجع نتيجة استعلام وزارة الصحة.</div></div><div class="history-item"><b>30/03/2026 12:10</b><div>النظام - تم استلام تقرير طبي أولي من وزارة الصحة.</div></div><div class="history-item"><b>28/03/2026 10:00</b><div>خالد المقبالي - تم تنفيذ زيارة ميدانية وإرفاق المرفقات.</div></div></div>'),
    ]),
    "2.C-benefit-detail.html": detail_page("تفاصيل طلب منفعة الأشخاص ذوي الإعاقة", "m2", "2.C-benefit-detail.html", [("رقم الطلب", "DB-2026-00231"), ("حالة الطلب", '<span class="status s-approval">بانتظار الاعتماد</span>'), ("حالة البطاقة", '<span class="status s-approved">سارية</span>'), ("آخر تحديث", "31/03/2026 08:45")], [
        ("البيانات الأساسية", table(["الحقل", "القيمة"], [["المستفيد", "أحمد البلوشي"], ["رقم بطاقة الإعاقة", "DC-99821"], ["تاريخ الانتهاء", "14/11/2026"], ["بيانات التأمين", "مسترجعة ومكتملة"]])),
        ("الاستعلام عن التقارير الطبية من نهر الشفاء", '<div class="query-box" data-query-box><div class="inline-actions"><button class="btn secondary" data-query="success">استعلام ناجح</button><button class="btn secondary" data-query="loading">جاري التحميل</button><button class="btn secondary" data-query="failure">فشل الربط</button></div><div class="query-state active" data-state="success">' + table(["رقم المرجع", "النتيجة", "التاريخ"], [["NAHR-8821", "إعادة 2 تقرير طبي", "30/03/2026"]]) + '</div><div class="query-state" data-state="loading"><div class="alert">جاري الاستعلام عن التقارير الطبية من نهر الشفاء...</div></div><div class="query-state" data-state="failure"><div class="alert danger">تعذر الوصول إلى نهر الشفاء حالياً.</div></div></div>'),
        ("بيانات الصرف", table(["الشهر", "المبلغ", "الحالة"], [["04/2026", "220 ر.ع", '<span class="status s-draft">سيتم الصرف</span>'], ["05/2026", "220 ر.ع", '<span class="status s-draft">مجدول</span>']])),
        ("لوحة القرار", '<div class="actions"><button class="btn warn" data-action="إعادة للاستيفاء" data-message="تمت إعادة الطلب للاستيفاء">إعادة للاستيفاء</button><button class="btn danger" data-action="رفض" data-message="تم رفض الطلب">رفض</button><button class="btn primary" data-action="اعتماد" data-message="تم اعتماد الطلب">اعتماد</button><a class="btn secondary" href="2.A-benefit-list.html">العودة للقائمة</a></div>'),
        ("السجل الزمني", '<div class="history-box"><div class="history-item"><b>31/03/2026</b><div>تم استكمال مراجعة بيانات البطاقة والتأمين.</div></div><div class="history-item"><b>29/03/2026</b><div>تم التحقق من بطاقة الإعاقة وربط الطلب بنظام التأمين.</div></div></div>'),
    ]),
    "3.D-request-detail.html": detail_page("تفاصيل طلب منفعة الأشخاص ذوي الإعاقة - فئة الأمراض المستديمة", "m3", "3.D-request-detail.html", [("رقم الطلب", "PDR-2026-00011"), ("المسار", "استحقاق مباشر"), ("حالة الطلب", '<span class="status s-review">قيد الدراسة</span>'), ("إعادة التقييم القادمة", "20/03/2028")], [
        ("البيانات الطبية", table(["الحقل", "القيمة"], [["التشخيص", "فشل قلبي مزمن"], ["كود المرض", "PD-CV-021"], ["تاريخ التأكيد", "20/03/2026"], ["الجهة الصحية", "مستشفى جامعة السلطان قابوس"]])),
        ("بيانات الصرف", table(["الأثر الرجعي", "تاريخ البداية", "المبلغ الشهري"], [["ينطبق", "01/01/2024", "350 ر.ع"]])),
        ("إعادة التقييم", table(["آخر تقييم", "القادم", "الحالة"], [["20/03/2026", "20/03/2028", '<span class="status s-approved">مجدول</span>']]) + '<div class="actions" style="margin-top:14px"><a class="btn secondary" href="3.E-reassessment-followup.html">فتح شاشة إعادة التقييم</a></div>'),
        ("لوحة القرار", '<div class="actions"><button class="btn danger" data-action="رفض" data-message="تم رفض الطلب">رفض</button><button class="btn warn" data-action="إحالة للمؤسسة الصحية المرخصة" data-message="تمت إحالة الطلب للمؤسسة الصحية المرخصة" data-redirect="4.A-referral-requests-list.html">إحالة للمؤسسة الصحية المرخصة</button><button class="btn primary" data-action="اعتماد" data-message="تم اعتماد الطلب">اعتماد</button></div>'),
        ("السجل الزمني", '<div class="history-box"><div class="history-item"><b>31/03/2026</b><div>موظف الصندوق راجع اكتمال البيانات الطبية وبيانات التأمين.</div></div><div class="history-item"><b>30/03/2026</b><div>المستفيد استكمل الطلب وأرسل المرفقات الإضافية.</div></div></div>'),
    ]),
    "4.B-referral-request-detail.html": detail_page("تفاصيل طلب العرض", "m4", "4.B-referral-request-detail.html", [("رقم الإحالة", "REF-2026-00512"), ("النوع", "إجازة مرضية"), ("المرحلة", "المراجعة الأولية"), ("آخر تحديث", "31/03/2026 10:05")], [
        ("بيانات الطلب الأصلي", table(["الحقل", "القيمة"], [["الجهة المحيلة", "بدلات الانقطاع عن العمل"], ["المؤمن عليه", "أحمد البلوشي"], ["سبب العرض", "اعتماد مدد مرضية إضافية"], ["الاختصاص الجغرافي", "محافظة مسقط"]])),
        ("المرفقات والملف الكامل", table(["المستند", "الحالة"], [["ملف التحقيق", "مرفق"], ["التقارير الطبية", "مرفقة"], ["نموذج الإحالة", "مرفق"]])),
        ("لوحة المعالجة", '<div class="actions"><button class="btn warn" data-action="إعادة للجهة المرسلة" data-message="تمت إعادة الطلب للجهة المرسلة">إعادة للجهة المرسلة</button><button class="btn danger" data-action="رفض" data-message="تم رفض الطلب">رفض</button><button class="btn primary" data-action="اعتماد الإحالة" data-message="تم اعتماد الإحالة ونقل الحالة إلى قائمة الحالات المحالة" data-redirect="4.C-referred-cases-list.html">اعتماد الإحالة</button></div>'),
        ("السجل الزمني", '<div class="history-box"><div class="history-item"><b>31/03/2026</b><div>موظف قسم اللجان الطبية بدأ المراجعة الأولية للطلب.</div></div><div class="history-item"><b>30/03/2026</b><div>تم استلام طلب العرض من الوحدة المحيلة.</div></div></div>'),
    ]),
})

pages.update({
    "5.C-appeal-detail.html": detail_page("تفاصيل التظلم", "m5", "5.C-appeal-detail.html", [("رقم التظلم", "APP-2026-00034"), ("الحالة", '<span class="status s-review">مراجعة أولية</span>'), ("القرار محل التظلم", "رفض منح إجازة مرضية كاملة"), ("آخر تحديث", "31/03/2026 11:05")], [
        ("ملخص التظلم", table(["الحقل", "القيمة"], [["مقدم التظلم", "أحمد البلوشي"], ["نوع الحالة", "إجازة مرضية"], ["تاريخ العلم بالقرار", "20/03/2026"], ["المدة النظامية", "مستوفاة"]])),
        ("المرفقات والقرار السابق", table(["المستند", "الوصف"], [["القرار السابق", "رفض منح كامل الفترة"], ["مرفق طبي إضافي", "تقرير جديد من وزارة الصحة"]])),
        ("لوحة المعالجة", '<div class="actions"><button class="btn warn" data-action="إرجاع للاستيفاء" data-message="تم إرجاع التظلم للاستيفاء">إرجاع للاستيفاء</button><button class="btn danger" data-action="رفض شكلي" data-message="تم رفض التظلم شكلياً">رفض شكلي</button><button class="btn primary" data-action="قبول وإحالة إلى لجنة التظلمات" data-message="تم قبول التظلم وتحويله إلى إدارة الجلسات" data-redirect="5.D-session-management.html">قبول وإحالة</button></div>'),
        ("السجل الزمني", '<div class="history-box"><div class="history-item"><b>31/03/2026</b><div>بدأت المراجعة الأولية للتظلم.</div></div><div class="history-item"><b>27/03/2026</b><div>تم تقديم التظلم وإرفاق المستندات.</div></div></div>'),
    ]),
    "6.C-license-detail.html": detail_page("تفاصيل طلب الترخيص", "m6", "6.C-license-detail.html", [("رقم الطلب", "LIC-2026-00018"), ("اسم المؤسسة", "مركز الشفاء التخصصي"), ("الحالة", '<span class="status s-review">قيد التحقق</span>'), ("آخر تحديث", "31/03/2026 09:50")], [
        ("بيانات المؤسسة", table(["الحقل", "القيمة"], [["السجل التجاري", "CR-5592081"], ["النوع", "خاصة"], ["الممثل المعتمد", "ناصر الرواحي"], ["الهاتف", "94445566"]])),
        ("قائمة الأطباء", table(["الاسم", "الدور", "حالة التأكيد"], [["د. خالد الرواحي", "رئيس", '<span class="status s-approved">مؤكد</span>'], ["د. مريم الحارثية", "مقرر", '<span class="status s-pending">بانتظار التأكيد</span>']])),
        ("لوحة القرار", '<div class="actions"><button class="btn warn" data-action="إعادة للاستيفاء" data-message="تمت إعادة الطلب للاستيفاء">إعادة للاستيفاء</button><button class="btn danger" data-action="رفض" data-message="تم رفض الطلب">رفض</button><button class="btn primary" data-action="اعتماد" data-message="تم اعتماد الطلب وفتح ملف المؤسسة" data-redirect="6.E-institution-profile.html">اعتماد</button></div>'),
        ("السجل الزمني", '<div class="history-box"><div class="history-item"><b>31/03/2026</b><div>تم التحقق من بيانات السجل التجاري.</div></div><div class="history-item"><b>29/03/2026</b><div>تم إنشاء الطلب وإرسال طلبات التأكيد للأطباء.</div></div></div>'),
    ]),
})

pages.update({
    "1.D-objections-list.html": simple_page("طلبات التظلم من قرارات التحقيق أو الإجازات المرضية", "m1", "1.D-objections-list.html", "هذه الشاشة خاصة بالاعتراضات الداخلية داخل الوحدة وليست تظلمات اللجان الطبية.", table(["رقم التظلم", "رقم الطلب", "مقدم التظلم", "الحالة", "الإجراء"], [["OBJ-2026-0007", "WI-2026-00142", "صاحب العمل", '<span class="status s-pending">جديد</span>', '<button class="btn secondary" data-action="فتح التظلم" data-target="ob1">عرض التفاصيل</button>']]) + '<div class="modal-sim" data-sim="ob1"><div class="grid cards-2"><div class="field"><label>سبب التظلم</label><textarea>الاعتراض على رفض جزء من المدة المرضية.</textarea></div><div class="actions"><button class="btn warn" data-action="تأييد القرار">تأييد القرار</button><button class="btn primary" data-action="إلغاء الرفض وإعادة المعالجة">إلغاء الرفض وإعادة المعالجة</button></div></div></div>'),
    "1.E-reports.html": simple_page("التقارير - وحدة بدل الانقطاع عن العمل", "m1", "1.E-reports.html", "شاشة تقارير خفيفة تركز على التقارير التشغيلية المطلوبة فقط.", '<div class="report-list"><a href="#"><span>تقرير الطلبات حسب الحالة</span><span>PDF</span></a><a href="#"><span>تقرير الزيارات الميدانية</span><span>PDF</span></a><a href="#"><span>تقرير الإجازات المرضية</span><span>PDF</span></a><a href="#"><span>تقرير التظلمات الداخلية</span><span>PDF</span></a></div>'),
    "2.D-card-status-inquiry.html": simple_page("الاستعلام عن حالة البطاقة", "m2", "2.D-card-status-inquiry.html", "هذه الشاشة متاحة لموظفي الصندوق فقط لمتابعة انتهاء أو إلغاء بطاقة الإعاقة.", table(["المستفيد", "رقم البطاقة", "الحالة", "تاريخ الانتهاء", "الإجراء"], [["أحمد البلوشي", "DC-99821", '<span class="status s-approved">سارية</span>', "14/11/2026", '<button class="btn secondary" data-action="إخطار المستفيد">إخطار المستفيد</button>'], ["فاطمة الهنائية", "DC-44127", '<span class="status s-rejected">ملغاة</span>', "09/03/2026", '<button class="btn danger" data-action="إيقاف المنفعة">إيقاف المنفعة</button>']]), '<div class="actions" style="margin-top:14px"><a class="btn secondary" href="2.C-benefit-detail.html">فتح طلب مرتبط</a></div>'),
    "2.E-reports.html": simple_page("التقارير - وحدة منفعة الأشخاص ذوي الإعاقة", "m2", "2.E-reports.html", "تعرض التقارير التشغيلية ذات العلاقة بالطلبات والبطاقات والصرف.", '<div class="report-list"><a href="#"><span>تقرير الطلبات حسب الحالة</span><span>PDF</span></a><a href="#"><span>تقرير البطاقات المنتهية</span><span>PDF</span></a><a href="#"><span>تقرير الصرف</span><span>PDF</span></a></div>'),
    "3.E-reassessment-followup.html": simple_page("إعادة التقييم / المتابعة الدورية", "m3", "3.E-reassessment-followup.html", "شاشة تشغيلية لمتابعة الالتزام بإعادة التقييم وتعليق أو استئناف الصرف عند الحاجة.", '<div class="tabs"><button class="tab active" data-tab="upcoming">القادمة</button><button class="tab" data-tab="overdue">المتأخرة</button><button class="tab" data-tab="done">المكتملة</button></div><div data-tab-panel="upcoming" style="display:block;margin-top:14px">' + table(["المستفيد", "آخر تقييم", "القادم", "الحالة", "الإجراء"], [["أحمد البلوشي", "20/03/2026", "20/03/2028", '<span class="status s-approved">ضمن المدة</span>', '<button class="btn secondary" data-action="استعلام بيانات إعادة التقييم">استعلام</button>']]) + '</div><div data-tab-panel="overdue" style="display:none;margin-top:14px">' + table(["المستفيد", "الحالة", "الإجراء"], [["سيف الرواحي", '<span class="status s-rejected">متأخر</span>', '<button class="btn danger" data-action="تعليق الصرف">تعليق الصرف</button>']]) + '</div><div data-tab-panel="done" style="display:none;margin-top:14px">' + table(["المستفيد", "التاريخ", "القرار"], [["فاطمة الهنائية", "15/03/2026", "استئناف الصرف"]]) + '</div>', '<div class="actions" style="margin-top:14px"><button class="btn primary" data-action="اعتماد">اعتماد</button><button class="btn secondary" data-action="حفظ">حفظ</button></div>'),
    "3.F-reports.html": simple_page("التقارير - وحدة الأمراض المستديمة", "m3", "3.F-reports.html", "قائمة مختصرة بالتقارير التشغيلية المطلوبة في هذه الوحدة.", '<div class="report-list"><a href="#"><span>تقرير الحالات الواردة</span><span>PDF</span></a><a href="#"><span>تقرير الاستحقاق المباشر</span><span>PDF</span></a><a href="#"><span>تقرير إعادة التقييم</span><span>PDF</span></a></div>'),
})

pages.update({
    "4.D-session-management.html": simple_page("إدارة الجلسات", "m4", "4.D-session-management.html", "شاشة موحدة لإدارة جلسات المؤسسات الصحية المرخصة منذ الجدولة حتى اكتمال القرار والتوقيع.", table(["رقم الجلسة", "المؤسسة", "التاريخ", "عدد الحالات", "الإجراء"], [["SES-2026-00118", "مستشفى خولة", "02/04/2026", "4", '<a class="btn secondary" href="4.E-session-detail.html">فتح تفاصيل الجلسة</a>'], ["SES-2026-00119", "المستشفى السلطاني", "03/04/2026", "3", '<a class="btn secondary" href="4.E-session-detail.html">فتح تفاصيل الجلسة</a>']]), '<div class="actions" style="margin-top:14px"><button class="btn secondary" data-action="اقتراح أقرب موعد">اقتراح أقرب موعد</button><button class="btn primary" data-action="إرسال الإشعارات">إرسال الإشعارات</button></div>'),
    "4.E-session-detail.html": detail_page("تفاصيل الجلسة", "m4", "4.E-session-detail.html", [("رقم الجلسة", "SES-2026-00118"), ("المؤسسة", "مستشفى خولة"), ("الحالة", '<span class="status s-review">قيد الانعقاد</span>'), ("الوقت", "02/04/2026 10:00")], [
        ("بيانات الجلسة", table(["الحقل", "القيمة"], [["المكان", "قاعة الجلسات 2"], ["نوع الجلسة", "حضورية"], ["عدد الحالات", "4"], ["النصاب", "مكتمل"]])),
        ("الحضور والنصاب", table(["العضو", "الدور", "الحضور", "التحقق"], [["د. خالد الرواحي", "رئيس", "حاضر", "مؤكد"], ["د. مريم الحارثية", "مقرر", "حاضر", "مؤكد"]])),
        ("إجراءات الجلسة", '<div class="actions"><button class="btn secondary" data-action="بدء الجلسة">بدء الجلسة</button><a class="btn secondary" href="4.F-case-decision.html">فتح قرار الحالة</a><a class="btn secondary" href="4.G-signature-panel.html">التوقيع على القرارات</a><button class="btn primary" data-action="اعتماد المحضر">اعتماد المحضر</button></div>'),
        ("السجل الزمني", '<div class="history-box"><div class="history-item"><b>09:45</b><div>بدء تسجيل الحضور والتحقق من النصاب.</div></div></div>'),
    ]),
    "4.F-case-decision.html": simple_page("قرار الحالة داخل الجلسة", "m4", "4.F-case-decision.html", "تُعرض بيانات الحالة ثم نموذج القرار المناسب بسبب العرض الحالي.", '<div class="grid cards-2"><div class="card"><div class="card-head"><h3>ملخص الحالة</h3></div><div class="card-body">' + table(["الحقل", "القيمة"], [["المرجع", "REF-2026-00512"], ["سبب العرض", "الإجازة المرضية"], ["المؤمن عليه", "أحمد البلوشي"]]) + '</div></div><div class="card"><div class="card-head"><h3>نموذج القرار</h3></div><div class="card-body"><div class="form-grid"><div class="field"><label>نوع القرار</label><select><option>اعتماد الفترة</option><option>رفض الفترة</option><option>تأجيل</option></select></div><div class="field"><label>من</label><input value="10/03/2026"></div><div class="field"><label>إلى</label><input value="25/03/2026"></div></div><div class="field" style="margin-top:14px"><label>ملاحظات</label><textarea>تمت المراجعة بناءً على التقرير الطبي المسترجع.</textarea></div></div></div></div>', '<div class="actions" style="margin-top:14px"><button class="btn secondary" data-action="حفظ كمسودة">حفظ كمسودة</button><button class="btn warn" data-action="تأجيل">تأجيل</button><button class="btn primary" data-action="تجهيز للتوقيع" data-message="تم تجهيز القرار للتوقيع" data-redirect="4.G-signature-panel.html">تجهيز للتوقيع</button></div>'),
    "4.G-signature-panel.html": simple_page("التوقيع على القرارات", "m4", "4.G-signature-panel.html", "يمكن دمج التوقيع داخل تفاصيل الجلسة، لكنه متاح هنا كلوحة تشغيلية واضحة.", table(["الحالة", "القرار", "حالة التوقيع", "الإجراء"], [["REF-2026-00512", "اعتماد فترة مرضية", "2 من 4", '<button class="btn primary" data-action="توقيع" data-message="تم تسجيل التوقيع">توقيع</button>'], ["REF-2026-00503", "تحديد نسبة عجز", "4 من 4", '<button class="btn secondary" data-action="إرسال إلى الصندوق" data-message="تم إرسال القرار إلى الصندوق">إرسال إلى الصندوق</button>']]), '<div class="actions" style="margin-top:14px"><a class="btn secondary" href="4.E-session-detail.html">العودة إلى الجلسة</a></div>'),
    "4.H-reports.html": simple_page("التقارير - وحدة التنسيق مع المؤسسات الصحية المرخصة", "m4", "4.H-reports.html", "تعرض التقارير التشغيلية الأساسية لهذه الوحدة.", '<div class="report-list"><a href="#"><span>تقرير طلبات العرض الواردة</span><span>PDF</span></a><a href="#"><span>تقرير الجلسات</span><span>PDF</span></a><a href="#"><span>تقرير القرارات الموقعة</span><span>PDF</span></a></div>'),
    "5.D-session-management.html": simple_page("إدارة جلسات التظلم", "m5", "5.D-session-management.html", "شاشة موحدة لإدارة جلسات لجنة التظلمات بشكل شبيه بوحدة المؤسسات الصحية المرخصة ولكن مخصصة للتظلمات.", table(["رقم الجلسة", "التاريخ", "عدد التظلمات", "الإجراء"], [["APS-2026-00008", "05/04/2026", "5", '<a class="btn secondary" href="5.E-session-detail.html">فتح تفاصيل الجلسة</a>']]), '<div class="actions" style="margin-top:14px"><button class="btn secondary" data-action="اقتراح موعد">اقتراح موعد</button><button class="btn primary" data-action="إرسال الإشعارات">إرسال الإشعارات</button></div>'),
    "5.E-session-detail.html": detail_page("تفاصيل جلسة التظلم", "m5", "5.E-session-detail.html", [("رقم الجلسة", "APS-2026-00008"), ("الحالة", '<span class="status s-review">قيد الانعقاد</span>'), ("عدد التظلمات", "5"), ("التاريخ", "05/04/2026")], [
        ("التظلمات المدرجة", table(["رقم التظلم", "المتظلم", "الحالة", "الإجراء"], [["APP-2026-00034", "أحمد البلوشي", "جاهز للقرار", '<a class="btn secondary" href="5.F-appeal-decision.html">فتح قرار التظلم</a>']])),
        ("التوقيعات", table(["العضو", "الحالة", "الوقت"], [["د. خالد الرواحي", "موقع", "10:15"], ["د. مريم الحارثية", "بانتظار", "--"]])),
        ("إجراءات الجلسة", '<div class="actions"><button class="btn secondary" data-action="بدء الجلسة">بدء الجلسة</button><a class="btn secondary" href="5.F-appeal-decision.html">فتح قرار التظلم</a><a class="btn secondary" href="5.G-final-signature.html">التوقيع والقرار النهائي</a></div>'),
    ]),
    "5.F-appeal-decision.html": simple_page("قرار التظلم داخل الجلسة", "m5", "5.F-appeal-decision.html", "تُعرض بيانات التظلم والطلب الأصلي والقرار السابق، ثم يتم إصدار قرار التظلم.", '<div class="grid cards-2"><div class="card"><div class="card-head"><h3>البيانات المرجعية</h3></div><div class="card-body">' + table(["الحقل", "القيمة"], [["رقم التظلم", "APP-2026-00034"], ["الطلب الأصلي", "REF-2026-00512"], ["القرار السابق", "رفض منح إجازة كاملة"]]) + '</div></div><div class="card"><div class="card-head"><h3>قرار التظلم</h3></div><div class="card-body"><div class="field"><label>القرار النهائي</label><select><option>تأييد القرار السابق</option><option>إلغاء القرار السابق</option><option>تعديل القرار</option></select></div><div class="field" style="margin-top:14px"><label>سبب القرار</label><textarea>بعد مراجعة المستندات المضافة، تقرر تعديل القرار ومنح الفترة الإضافية.</textarea></div></div></div></div>', '<div class="actions" style="margin-top:14px"><button class="btn secondary" data-action="حفظ">حفظ</button><button class="btn primary" data-action="تحويل للتوقيع" data-message="تم تحويل القرار للتوقيع" data-redirect="5.G-final-signature.html">تحويل للتوقيع</button></div>'),
    "5.G-final-signature.html": simple_page("التوقيع والقرار النهائي", "m5", "5.G-final-signature.html", "بعد اكتمال التوقيع يتم تحديث التظلم على أنه قرار نهائي وملزم وتنفيذ أثره على الطلب الأصلي.", table(["رقم التظلم", "القرار", "التوقيع", "الإجراء"], [["APP-2026-00034", "تعديل القرار السابق", "3 من 3", '<button class="btn primary" data-action="اعتماد نهائي" data-message="أصبح القرار نهائياً وملزماً">اعتماد نهائي</button>']]), '<div class="actions" style="margin-top:14px"><button class="btn secondary" data-action="إرسال النتيجة">إرسال النتيجة</button><button class="btn secondary" data-action="تنفيذ الأثر">تنفيذ الأثر</button></div>'),
    "5.H-reports.html": simple_page("التقارير - وحدة التظلمات", "m5", "5.H-reports.html", "تعرض التقارير التشغيلية الأساسية لطلبات التظلم والجلسات والقرارات.", '<div class="report-list"><a href="#"><span>تقرير التظلمات حسب النوع</span><span>PDF</span></a><a href="#"><span>تقرير التظلمات حسب الحالة</span><span>PDF</span></a><a href="#"><span>تقرير القرارات النهائية</span><span>PDF</span></a></div>'),
    "6.D-inspection-visits.html": simple_page("الزيارات الرقابية", "m6", "6.D-inspection-visits.html", "تعرض الزيارات المجدولة والمنفذة مع إمكانية إنشاء تقرير الزيارة الرقابية.", table(["رقم الزيارة", "المؤسسة", "التاريخ", "الحالة", "الإجراء"], [["VIS-2026-00041", "مركز العناية الطبية", "07/04/2026", '<span class="status s-pending">مجدولة</span>', '<button class="btn secondary" data-action="إعداد التقرير" data-target="visitReport">إعداد التقرير</button>']]) + '<div class="modal-sim" data-sim="visitReport"><div class="field"><label>نتائج الزيارة</label><textarea>تمت مراجعة الالتزام بالضوابط الطبية والإدارية، مع ملاحظة حاجة لتحديث بعض السجلات.</textarea></div><div class="actions" style="margin-top:14px"><button class="btn secondary" data-action="حفظ">حفظ</button><button class="btn primary" data-action="اعتماد التقرير">اعتماد التقرير</button></div></div>'),
    "6.E-institution-profile.html": detail_page("ملف المؤسسة", "m6", "6.E-institution-profile.html", [("اسم المؤسسة", "مركز العناية الطبية"), ("حالة الترخيص", '<span class="status s-approved">ساري</span>'), ("تاريخ البداية", "15/12/2023"), ("تاريخ النهاية", "14/12/2026")], [
        ("بيانات المؤسسة", table(["الحقل", "القيمة"], [["النوع", "خاصة"], ["الممثل المعتمد", "ناصر الرواحي"], ["عدد الأطباء", "7"], ["الحالة الحالية", "فعالة"]])),
        ("سجل التراخيص والتجديدات", table(["الفترة", "النوع", "النتيجة"], [["2023 - 2026", "ترخيص", "ساري"], ["2026 - 2029", "تجديد", "قيد الإعداد"]])),
        ("الزيارات الرقابية", table(["التاريخ", "النتيجة", "الإجراء"], [["10/01/2026", "ملاحظات بسيطة", '<a class="btn secondary" href="6.D-inspection-visits.html">عرض الزيارة</a>']])),
        ("إجراءات الملف", '<div class="actions"><a class="btn secondary" href="6.B-license-request.html">تجديد الترخيص</a><button class="btn secondary" data-action="عرض التقارير">عرض التقارير</button></div>'),
    ]),
    "6.F-reports.html": simple_page("التقارير - وحدة التراخيص والرقابة", "m6", "6.F-reports.html", "تعرض قائمة التقارير التشغيلية ذات الصلة بالمؤسسات والزيارات والطلبات.", '<div class="report-list"><a href="#"><span>تقرير طلبات الترخيص</span><span>PDF</span></a><a href="#"><span>تقرير المؤسسات المرخصة</span><span>PDF</span></a><a href="#"><span>تقرير الزيارات الرقابية</span><span>PDF</span></a></div>'),
})

for file_name, content in pages.items():
    (root / file_name).write_text(content, encoding="utf-8")

print(f"written {len(pages)} html files")
