/* ================================================================
   components.js — مكتبة Panels المشتركة
   كل دالة تأخذ بيانات وتُرجع HTML جاهزاً للحقن في الصفحة
   ================================================================ */

/* ════════════════════════════════════════════════════════════════
   PANEL: ملخص الطلب — دائماً في الأعلى
   ════════════════════════════════════════════════════════════════ */
function renderRequestSummary(request) {
  return `
  <div class="card" style="border-right:4px solid var(--primary)">
    <div class="pb-c">
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px">
        <div>
          <div class="flbl" style="margin-bottom:4px">رقم الطلب</div>
          <div style="font-size:15px;font-weight:800;color:var(--primary);font-family:monospace">${request.id}</div>
        </div>
        <div>
          <div class="flbl" style="margin-bottom:4px">نوع الطلب</div>
          <div style="font-size:13px;font-weight:600">${request.type}${request.subtype ? ` — ${request.subtype}` : ''}</div>
        </div>
        <div>
          <div class="flbl" style="margin-bottom:4px">الحالة الحالية</div>
          ${statusBadge(request.status)}
        </div>
        <div>
          <div class="flbl" style="margin-bottom:4px">تاريخ التقديم</div>
          <div style="font-size:12.5px">${formatDate(request.submitDate)}</div>
        </div>
        <div>
          <div class="flbl" style="margin-bottom:4px">مقدم الطلب</div>
          <div style="font-size:12.5px;font-weight:600">${request.applicant.name}</div>
          <div style="font-size:11px;color:var(--text3)">${request.applicant.role}</div>
        </div>
        <div>
          <div class="flbl" style="margin-bottom:4px">آخر تحديث</div>
          <div style="font-size:12px;color:var(--text2)">${request.lastUpdate || '—'}</div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   PANEL: بيانات مقدم الطلب
   ════════════════════════════════════════════════════════════════ */
function renderApplicantPanel(applicant, showReturnReason = null) {
  return `
  <div class="card">
    <div class="ph"><h3><div class="pico bl">${ICONS.user}</div>بيانات مقدم الطلب</h3></div>
    <div class="pb">
      <div class="fg fg-3">
        <div class="fgrp">
          <label class="flbl">صفة مقدم الطلب</label>
          <div class="fro">${applicant.role || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">الاسم الكامل</label>
          <div class="fro">${applicant.name || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">الرقم المدني</label>
          <div class="fro" style="font-family:monospace">${applicant.civil || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">رقم الهاتف</label>
          <div class="fro">${applicant.phone || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">البريد الإلكتروني</label>
          <div class="fro">${applicant.email || '—'}</div>
        </div>
        ${applicant.employeeId ? `<div class="fgrp"><label class="flbl">الرقم الوظيفي</label><div class="fro">${applicant.employeeId}</div></div>` : ''}
      </div>
      ${showReturnReason ? `
      <div class="alert alert-w mt12">
        ${ICONS.warn}
        <div>
          <strong>مطلوب استيفاء البيانات التالية:</strong><br>
          <span style="white-space:pre-line">${showReturnReason}</span>
        </div>
      </div>` : ''}
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   PANEL: بيانات المؤمن عليه / المستفيد
   ════════════════════════════════════════════════════════════════ */
function renderInsuredPersonPanel(insured) {
  return `
  <div class="card card-ro">
    <div class="ph"><h3><div class="pico bl">${ICONS.user}</div>بيانات المؤمن عليه / المستفيد</h3></div>
    <div class="pb">
      <div class="fg fg-4">
        <div class="fgrp">
          <label class="flbl">الاسم الكامل</label>
          <div class="fro">${insured.name || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">الرقم المدني</label>
          <div class="fro" style="font-family:monospace">${insured.civil || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">الرقم التأميني</label>
          <div class="fro" style="font-family:monospace">${insured.insurance || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">تاريخ الميلاد</label>
          <div class="fro">${formatDate(insured.dob)}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">الجنس</label>
          <div class="fro">${insured.gender || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">الجنسية</label>
          <div class="fro">${insured.nationality || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">الحالة التأمينية</label>
          <div class="fro">
            <span class="badge ${insured.insuranceStatus === 'نشط' ? 'b-approved' : 'b-rejected'}">${insured.insuranceStatus || '—'}</span>
          </div>
        </div>
        <div class="fgrp">
          <label class="flbl">تاريخ التسجيل في التأمين</label>
          <div class="fro">${formatDate(insured.regDate)}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">نوع الاشتراك</label>
          <div class="fro">${insured.subType || '—'}</div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   PANEL: بيانات جهة العمل
   ════════════════════════════════════════════════════════════════ */
function renderEmployerPanel(employer) {
  return `
  <div class="card card-ro">
    <div class="ph"><h3><div class="pico tl">${ICONS.building}</div>بيانات جهة العمل</h3></div>
    <div class="pb">
      <div class="fg fg-3">
        <div class="fgrp">
          <label class="flbl">اسم جهة العمل</label>
          <div class="fro">${employer.name || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">رقم السجل التجاري</label>
          <div class="fro" style="font-family:monospace">${employer.cr || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">رقم المنشأة</label>
          <div class="fro" style="font-family:monospace">${employer.establishment || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">المسمى الوظيفي</label>
          <div class="fro">${employer.jobTitle || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">تاريخ الالتحاق بالعمل</label>
          <div class="fro">${formatDate(employer.joinDate)}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">موقع العمل / الفرع</label>
          <div class="fro">${employer.location || '—'}</div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   PANEL: بيانات الإصابة أو المرض
   ════════════════════════════════════════════════════════════════ */
function renderInjuryDataPanel(injury, requestType) {
  const isWork = requestType === 'إصابة عمل';
  return `
  <div class="card card-ro">
    <div class="ph"><h3><div class="pico rd">${ICONS.medical}</div>بيانات ${isWork ? 'الإصابة' : 'المرض المهني'}</h3></div>
    <div class="pb">
      <div class="fg fg-3">
        <div class="fgrp">
          <label class="flbl">نوع الحالة</label>
          <div class="fro">${injury.bodyPart || injury.diagnosis || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">تاريخ الواقعة / الاشتباه</label>
          <div class="fro">${formatDate(injury.incidentDate || injury.firstSuspicion)}</div>
        </div>
        ${isWork ? `
        <div class="fgrp">
          <label class="flbl">الجزء المصاب</label>
          <div class="fro">${injury.bodyPart || '—'}</div>
        </div>
        <div class="fgrp span-full">
          <label class="flbl">مكان الواقعة</label>
          <div class="fro">${injury.location || '—'}</div>
        </div>
        <div class="fgrp span-full">
          <label class="flbl">وصف تفصيلي للواقعة</label>
          <div class="fro" style="min-height:60px;align-items:flex-start;padding-top:10px">${injury.description || '—'}</div>
        </div>
        ${injury.witnesses === 'نعم' ? `<div class="fgrp"><label class="flbl">الشهود</label><div class="fro">${injury.witnessNames || '—'}</div></div>` : ''}
        ` : `
        <div class="fgrp span-full">
          <label class="flbl">المواد / العوامل المسببة</label>
          <div class="fro">${injury.chemicalAgents || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">مدة التعرض المهني</label>
          <div class="fro">${injury.exposureDuration || '—'}</div>
        </div>
        <div class="fgrp span-full">
          <label class="flbl">وصف بيئة العمل</label>
          <div class="fro" style="min-height:60px;align-items:flex-start;padding-top:10px">${injury.workEnvironment || '—'}</div>
        </div>
        `}
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   PANEL: تقرير التحقيق — تراكمي
   ════════════════════════════════════════════════════════════════ */
function renderInvestigationReport(inv, canEdit = false) {
  if (!inv) return '';
  return `
  <div class="card card-cum">
    <div class="ph">
      <h3><div class="pico pu">${ICONS.search}</div>تقرير التحقيق</h3>
      <span class="stg-lbl">مرحلة التحقيق</span>
    </div>
    <div class="pb">
      <div class="fg" style="gap:14px">
        <div class="fgrp">
          <label class="flbl">ملخص التحقيق</label>
          ${canEdit
            ? `<textarea class="fc" id="inv-summary" rows="4">${inv.summary || ''}</textarea>`
            : `<div class="fro" style="min-height:70px;align-items:flex-start;padding-top:10px">${inv.summary || '—'}</div>`}
        </div>
        <div class="fgrp">
          <label class="flbl">نتائج التحقق من البيانات</label>
          ${canEdit
            ? `<textarea class="fc" id="inv-findings" rows="3">${inv.findings || ''}</textarea>`
            : `<div class="fro" style="min-height:60px;align-items:flex-start;padding-top:10px">${inv.findings || '—'}</div>`}
        </div>
        <div class="fg fg-3">
          <div class="fgrp">
            <label class="flbl">توصية الموظف</label>
            <div class="fro">
              ${inv.employeeRecommendation
                ? `<span class="badge ${inv.employeeRecommendation === 'موافقة' ? 'b-approved' : 'b-rejected'}">${inv.employeeRecommendation}</span>`
                : '—'}
            </div>
          </div>
          <div class="fgrp span-2">
            <label class="flbl">ملاحظات الموظف</label>
            <div class="fro">${inv.employeeNotes || '—'}</div>
          </div>
        </div>
        ${inv.headNotes || inv.headDecision ? `
        <div style="border-top:1px dashed var(--border);padding-top:14px;margin-top:4px">
          <div class="flbl" style="margin-bottom:10px;font-size:11px;color:var(--primary)">— ملاحظات واعتماد رئيس القسم —</div>
          <div class="fg fg-2">
            <div class="fgrp">
              <label class="flbl">قرار رئيس القسم</label>
              <div class="fro">
                ${inv.headDecision
                  ? `<span class="badge ${inv.headDecision.includes('اعتماد') ? 'b-approved' : inv.headDecision.includes('رفض') ? 'b-rejected' : 'b-phead'}">${inv.headDecision}</span>`
                  : '—'}
              </div>
            </div>
            <div class="fgrp">
              <label class="flbl">ملاحظات رئيس القسم</label>
              <div class="fro">${inv.headNotes || '—'}</div>
            </div>
          </div>
        </div>` : ''}
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   PANEL: الزيارات الميدانية — لا تغيّر الحالة
   ════════════════════════════════════════════════════════════════ */
function renderFieldVisitsPanel(visits = [], canAdd = false) {
  const visitsHtml = visits.length === 0
    ? `<div style="text-align:center;padding:20px;color:var(--text3);font-size:12px">لا توجد زيارات ميدانية مسجلة</div>`
    : visits.map((v, i) => `
      <div class="visit-item">
        <div class="visit-header" onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==='none'?'block':'none'">
          <span class="visit-date-badge">${formatDate(v.date)} — ${v.time}</span>
          <span class="visit-title">زيارة ${i + 1}: ${v.reason?.substring(0, 50) || ''}...</span>
          <span style="font-size:11px;color:var(--text3)">${v.staff || ''}</span>
        </div>
        <div class="visit-body" style="display:none">
          <div class="fg fg-2" style="gap:10px">
            <div class="fgrp"><label class="flbl">سبب الزيارة</label><div class="fro">${v.reason || '—'}</div></div>
            <div class="fgrp"><label class="flbl">الموظفون القائمون</label><div class="fro">${v.staff || '—'}</div></div>
            <div class="fgrp"><label class="flbl">ملخص الزيارة</label><div class="fro">${v.summary || '—'}</div></div>
            <div class="fgrp"><label class="flbl">النتائج</label><div class="fro">${v.results || '—'}</div></div>
          </div>
        </div>
      </div>`).join('');

  return `
  <div class="card card-cum">
    <div class="ph">
      <h3><div class="pico or">${ICONS.map}</div>الزيارات الميدانية <span style="font-size:11px;font-weight:400;color:var(--text3)">(لا تؤثر على حالة الطلب)</span></h3>
      ${canAdd ? `<button class="btn btn-secondary btn-xs" onclick="openAddVisitModal()">${ICONS.plus} إضافة زيارة</button>` : ''}
    </div>
    <div class="pb-0">${visitsHtml}</div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   PANEL: فترات الإجازات المرضية — تراكمي
   ════════════════════════════════════════════════════════════════ */
function renderSickLeavePeriodsPanel(periods = [], canAdd = false) {
  const totalDays = periods.reduce((s, p) => s + (p.days || 0), 0);
  const periodsHtml = periods.length === 0
    ? `<div style="text-align:center;padding:20px;color:var(--text3);font-size:12px">لا توجد فترات إجازة مرضية مسجلة</div>`
    : `<table class="dtbl">
        <thead><tr><th>#</th><th>من تاريخ</th><th>إلى تاريخ</th><th>عدد الأيام</th><th>الحالة</th><th>أضافها</th><th>تاريخ الإضافة</th></tr></thead>
        <tbody>${periods.map((p, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${formatDate(p.from)}</td>
            <td>${formatDate(p.to)}</td>
            <td><strong>${p.days}</strong> يوم</td>
            <td><span class="badge ${p.status === 'معتمدة' ? 'b-approved' : p.status === 'مرفوضة' ? 'b-rejected' : 'b-phead'}">${p.status}</span></td>
            <td>${p.addedBy || '—'}</td>
            <td>${p.addedDate || '—'}</td>
          </tr>`).join('')}
        </tbody>
        <tfoot><tr><td colspan="3" style="font-weight:700;text-align:right;padding:8px 14px">الإجمالي</td><td colspan="4" style="font-weight:700;padding:8px 14px">${totalDays} يوم</td></tr></tfoot>
      </table>`;

  return `
  <div class="card card-cum">
    <div class="ph">
      <h3><div class="pico gr">${ICONS.calendar}</div>فترات الإجازات المرضية</h3>
      <div style="display:flex;align-items:center;gap:10px">
        <span style="font-size:12px;color:var(--text3)">الإجمالي: <strong>${totalDays}</strong> يوم</span>
        ${canAdd ? `<button class="btn btn-secondary btn-xs" onclick="openAddSickLeaveModal()">${ICONS.plus} إضافة فترة</button>` : ''}
      </div>
    </div>
    <div class="pb-0"><div class="tbl-wrap">${periodsHtml}</div></div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   PANEL: استعلام وزارة الصحة — Panel مدمج (للمستخدمين الداخليين)
   ════════════════════════════════════════════════════════════════ */
function renderMedicalQueryPanel(civilId = '') {
  return `
  <div class="card card-cum">
    <div class="ph">
      <h3><div class="pico bl">${ICONS.medical}</div>استعلام التقارير الطبية — وزارة الصحة <span style="font-size:10px;background:#ede9fe;color:#7c3aed;padding:1px 7px;border-radius:10px;font-weight:600">للمستخدمين الداخليين فقط</span></h3>
    </div>
    <div class="pb">
      <div class="alert alert-i" style="margin-bottom:14px">
        ${ICONS.info}
        <span>هذا الاستعلام للاطلاع فقط ولا يُعدّ إجراءً على الطلب.</span>
      </div>
      <div class="fg fg-3" style="margin-bottom:14px">
        <div class="fgrp">
          <label class="flbl">الرقم المدني</label>
          <div class="fro" style="font-family:monospace">${civilId || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">من تاريخ</label>
          <input type="date" class="fc" id="mq-from">
        </div>
        <div class="fgrp">
          <label class="flbl">إلى تاريخ</label>
          <input type="date" class="fc" id="mq-to">
        </div>
      </div>
      <button class="btn btn-primary btn-sm" onclick="runMedicalQuery('${civilId}')">${ICONS.search} استعلام</button>
      <div id="mq-results" style="margin-top:16px"></div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   PANEL: بيانات الإحالة إلى المؤسسة الصحية المرخصة — تراكمي
   ════════════════════════════════════════════════════════════════ */
function renderReferralPanel(referral) {
  if (!referral) return '';
  return `
  <div class="card card-cum">
    <div class="ph">
      <h3><div class="pico pu">${ICONS.building}</div>بيانات الإحالة إلى المؤسسة الصحية المرخصة</h3>
      <span class="stg-lbl">مرحلة اللجان الطبية</span>
    </div>
    <div class="pb">
      <div class="fg fg-3">
        <div class="fgrp">
          <label class="flbl">المؤسسة الصحية المرخصة المختارة</label>
          <div class="fro" style="font-weight:700;color:var(--primary)">${referral.institution || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">سبب الإحالة</label>
          <div class="fro">${referral.reason || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">الجهة المُحيلة</label>
          <div class="fro">${referral.referrer || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">تاريخ الإحالة</label>
          <div class="fro">${formatDate(referral.date)}</div>
        </div>
        <div class="fgrp span-2">
          <label class="flbl">ملاحظات الإحالة</label>
          <div class="fro">${referral.notes || '—'}</div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   PANEL: بيانات الجلسة — تراكمي
   ════════════════════════════════════════════════════════════════ */
function renderSessionPanel(session) {
  if (!session) return '';
  const membersHtml = (session.members || []).map(m => `
    <tr>
      <td>${m.name}</td>
      <td>${m.specialty}</td>
      <td>${m.role}</td>
      <td><span class="badge ${m.attendance === 'حاضر' ? 'b-approved' : m.attendance === 'غائب' ? 'b-rejected' : 'b-phead'}">${m.attendance || 'مجدول'}</span></td>
    </tr>`).join('');

  return `
  <div class="card card-cum">
    <div class="ph">
      <h3><div class="pico tl">${ICONS.calendar}</div>بيانات الجلسة</h3>
      <span class="stg-lbl">جلسة العرض</span>
    </div>
    <div class="pb">
      <div class="fg fg-3" style="margin-bottom:14px">
        <div class="fgrp">
          <label class="flbl">رقم الجلسة</label>
          <div class="fro" style="font-family:monospace">${session.id || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">المؤسسة الصحية</label>
          <div class="fro">${session.institution || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">تاريخ ووقت الجلسة</label>
          <div class="fro">${session.date ? `${formatDate(session.date)} — ${session.time}` : '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">حالة النصاب</label>
          <div class="fro"><span class="badge ${session.quorum ? 'b-approved' : 'b-returned'}">${session.quorum ? 'النصاب مكتمل' : 'النصاب غير مكتمل'}</span></div>
        </div>
      </div>
      ${session.members?.length ? `
      <div class="flbl" style="margin-bottom:8px">أعضاء اللجنة</div>
      <div class="tbl-wrap">
        <table class="dtbl">
          <thead><tr><th>الاسم</th><th>التخصص</th><th>المنصب</th><th>حالة الحضور</th></tr></thead>
          <tbody>${membersHtml}</tbody>
        </table>
      </div>` : ''}
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   PANEL: قرار المؤسسة الصحية / اللجنة — تراكمي
   ════════════════════════════════════════════════════════════════ */
function renderCommitteeDecisionPanel(decision, label = 'قرار المؤسسة الصحية المرخصة') {
  if (!decision) return '';
  return `
  <div class="card card-cum">
    <div class="ph">
      <h3><div class="pico gr">${ICONS.pen}</div>${label}</h3>
      <span class="stg-lbl">قرار اللجنة</span>
    </div>
    <div class="pb">
      <div class="fg fg-3">
        <div class="fgrp">
          <label class="flbl">نوع القرار</label>
          <div class="fro">
            <span class="badge ${decision.type === 'موافقة' || decision.type === 'اعتماد الترخيص' ? 'b-approved' : decision.type === 'رفض' ? 'b-rejected' : 'b-phead'}">${decision.type || '—'}</span>
          </div>
        </div>
        <div class="fgrp">
          <label class="flbl">تاريخ القرار</label>
          <div class="fro">${formatDate(decision.date)}</div>
        </div>
        ${decision.disabilityPercent ? `<div class="fgrp"><label class="flbl">نسبة العجز</label><div class="fro"><strong>${decision.disabilityPercent}%</strong></div></div>` : ''}
        ${decision.sickLeavePeriod ? `<div class="fgrp"><label class="flbl">فترة الإجازة الموصى بها</label><div class="fro">${decision.sickLeavePeriod}</div></div>` : ''}
        <div class="fgrp span-full">
          <label class="flbl">مضمون القرار التفصيلي</label>
          <div class="fro" style="min-height:60px;align-items:flex-start;padding-top:10px">${decision.content || '—'}</div>
        </div>
        ${decision.signatories?.length ? `
        <div class="fgrp span-full">
          <label class="flbl">الأعضاء الموقعون</label>
          <div class="fro">${decision.signatories.join('، ')}</div>
        </div>` : ''}
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   PANEL: بيانات الصرف
   ════════════════════════════════════════════════════════════════ */
function renderDisbursementPanel(disbursement) {
  if (!disbursement) return '';
  return `
  <div class="card card-cum">
    <div class="ph">
      <h3><div class="pico gr">${ICONS.chart}</div>بيانات الصرف</h3>
      <span class="stg-lbl">مرحلة الصرف</span>
    </div>
    <div class="pb">
      <div class="fg fg-4">
        <div class="fgrp">
          <label class="flbl">حالة الصرف</label>
          <div class="fro"><span class="badge ${disbursement.status === 'تم الصرف' ? 'b-approved' : disbursement.status === 'موقوف' ? 'b-returned' : 'b-phead'}">${disbursement.status || '—'}</span></div>
        </div>
        <div class="fgrp">
          <label class="flbl">عدد الفترات المعتمدة</label>
          <div class="fro"><strong>${disbursement.periods || 0}</strong> فترة</div>
        </div>
        <div class="fgrp">
          <label class="flbl">إجمالي الأيام</label>
          <div class="fro"><strong>${disbursement.totalDays || 0}</strong> يوم</div>
        </div>
        <div class="fgrp">
          <label class="flbl">إجمالي المبلغ المستحق</label>
          <div class="fro" style="font-weight:700;color:var(--accent)">${disbursement.totalAmount ? disbursement.totalAmount.toFixed(3) + ' ر.ع' : '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">تاريخ آخر صرف</label>
          <div class="fro">${formatDate(disbursement.lastDisbursement)}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">تاريخ الصرف القادم</label>
          <div class="fro">${disbursement.nextDisbursement ? formatDate(disbursement.nextDisbursement) : '—'}</div>
        </div>
        ${disbursement.stopReason ? `<div class="fgrp span-2"><label class="flbl">سبب التوقف</label><div class="fro" style="color:var(--danger)">${disbursement.stopReason}</div></div>` : ''}
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   PANEL: بيانات بطاقة الإعاقة
   ════════════════════════════════════════════════════════════════ */
function renderDisabilityCardPanel(card, isInternal = false) {
  if (!card) return '';
  const isExpired = new Date(card.expiryDate) < new Date();
  return `
  <div class="card card-ro">
    <div class="ph"><h3><div class="pico pu">${ICONS.shield}</div>بيانات بطاقة الإعاقة <span style="font-size:10px;color:var(--text3)">(وزارة التنمية الاجتماعية + وزارة الصحة)</span></h3></div>
    <div class="pb">
      ${isExpired ? `<div class="alert alert-d" style="margin-bottom:12px">${ICONS.warn}<span>بطاقة الإعاقة منتهية الصلاحية — لا يمكن الصرف</span></div>` : ''}
      <div class="fg fg-3">
        <div class="fgrp">
          <label class="flbl">رقم البطاقة</label>
          <div class="fro" style="font-family:monospace">${card.number || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">حالة البطاقة</label>
          <div class="fro"><span class="badge ${card.status === 'سارية' ? 'b-card-valid' : card.status === 'منتهية' ? 'b-card-expired' : 'b-card-cancelled'}">${card.status || '—'}</span></div>
        </div>
        <div class="fgrp">
          <label class="flbl">تاريخ التفعيل</label>
          <div class="fro">${formatDate(card.activationDate)}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">تاريخ الانتهاء</label>
          <div class="fro" style="${isExpired ? 'color:var(--danger);font-weight:700' : ''}">${formatDate(card.expiryDate)}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">طبيعة الإعاقة (وزارة التنمية الاجتماعية)</label>
          <div class="fro">${card.typeSD || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">طبيعة الإعاقة (وزارة الصحة)</label>
          <div class="fro">${card.typeMOH || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">تاريخ ثبوت الإعاقة</label>
          <div class="fro">${formatDate(card.provenDate)}</div>
        </div>
        ${isInternal ? `<div class="fgrp"><label class="flbl">آخر تحقق تلقائي</label><div class="fro tx3">${card.lastCheck || '—'}</div></div>` : ''}
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   PANEL: البيانات الطبية للأمراض المستديمة
   ════════════════════════════════════════════════════════════════ */
function renderChronicMedicalPanel(medical) {
  if (!medical) return '';
  return `
  <div class="card card-ro">
    <div class="ph"><h3><div class="pico rd">${ICONS.medical}</div>البيانات الطبية <span style="font-size:10px;color:var(--text3)">(واردة من وزارة الصحة)</span></h3></div>
    <div class="pb">
      <div class="fg fg-3">
        <div class="fgrp">
          <label class="flbl">المؤسسة الصحية المعالجة</label>
          <div class="fro">${medical.hospital || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">الطبيب المعالج</label>
          <div class="fro">${medical.doctor || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">التشخيص</label>
          <div class="fro" style="font-weight:700">${medical.diagnosis || '—'}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">تاريخ ثبوت المرض</label>
          <div class="fro">${formatDate(medical.provenDate)}</div>
        </div>
        <div class="fgrp">
          <label class="flbl">المسار المتوقع <span style="font-size:9.5px;font-weight:400;color:var(--text3)">(معلومة فقط)</span></label>
          <div class="fro"><span class="badge ${medical.expectedPath === 'مسار مباشر' ? 'b-direct' : 'b-commpath'}">${medical.expectedPath || '—'}</span></div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   PANEL: بيانات الصرف الدوري (أمراض مستديمة)
   ════════════════════════════════════════════════════════════════ */
function renderDisbursementPeriodicPanel(disbursement) {
  if (!disbursement) return '';
  return `
  <div class="card card-cum">
    <div class="ph"><h3><div class="pico gr">${ICONS.chart}</div>بيانات الصرف الدوري</h3><span class="stg-lbl">مرحلة الصرف الدوري</span></div>
    <div class="pb">
      <div class="fg fg-4">
        <div class="fgrp"><label class="flbl">تاريخ بدء الصرف الدوري</label><div class="fro">${formatDate(disbursement.startDate)}</div></div>
        <div class="fgrp"><label class="flbl">دورية الصرف</label><div class="fro">${disbursement.frequency || 'شهري'}</div></div>
        <div class="fgrp"><label class="flbl">حالة الصرف</label><div class="fro"><span class="badge ${disbursement.status === 'الصرف جارٍ' ? 'b-approved' : 'b-returned'}">${disbursement.status || '—'}</span></div></div>
        <div class="fgrp"><label class="flbl">تاريخ الصرف القادم</label><div class="fro">${formatDate(disbursement.nextDate)}</div></div>
        ${disbursement.stopReason ? `<div class="fgrp span-full"><label class="flbl">سبب التعليق</label><div class="fro" style="color:var(--danger)">${disbursement.stopReason}</div></div>` : ''}
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   PANEL: إعادة التقييم الدوري
   ════════════════════════════════════════════════════════════════ */
function renderReassessmentPanel(reassessment) {
  if (!reassessment) return '';
  return `
  <div class="card card-cum">
    <div class="ph"><h3><div class="pico or">${ICONS.refresh}</div>بيانات إعادة التقييم الدوري</h3><span class="stg-lbl">إعادة التقييم</span></div>
    <div class="pb">
      <div class="fg fg-3">
        <div class="fgrp"><label class="flbl">تاريخ آخر تقييم</label><div class="fro">${formatDate(reassessment.lastDate)}</div></div>
        <div class="fgrp"><label class="flbl">تاريخ إعادة التقييم القادم</label><div class="fro">${formatDate(reassessment.nextDate)}</div></div>
        <div class="fgrp"><label class="flbl">حالة الالتزام</label><div class="fro"><span class="badge b-phead">${reassessment.compliance || '—'}</span></div></div>
        <div class="fgrp span-full"><label class="flbl">نتائج إعادة التقييم (من وزارة الصحة)</label><div class="fro">${reassessment.results || 'لم تصل النتائج بعد'}</div></div>
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   PANEL: ملخص الطلب الأصلي (للتظلمات)
   ════════════════════════════════════════════════════════════════ */
function renderOriginalRequestSummaryPanel(req) {
  if (!req) return '';
  return `
  <div class="card card-ro">
    <div class="ph"><h3><div class="pico bl">${ICONS.file}</div>ملخص الطلب الأصلي</h3></div>
    <div class="pb">
      <div class="fg fg-3">
        <div class="fgrp"><label class="flbl">رقم الطلب الأصلي</label><div class="fro" style="font-family:monospace"><a href="#" onclick="openOriginalRequest('${req.id}')" style="color:var(--primary);font-weight:700">${req.id}</a></div></div>
        <div class="fgrp"><label class="flbl">نوع الطلب</label><div class="fro">${req.type || '—'}</div></div>
        <div class="fgrp"><label class="flbl">تاريخ التقديم</label><div class="fro">${formatDate(req.submitDate)}</div></div>
        <div class="fgrp"><label class="flbl">اسم المؤمن عليه / المستفيد</label><div class="fro">${req.insuredName || '—'}</div></div>
        <div class="fgrp"><label class="flbl">الحالة الحالية للطلب الأصلي</label><div class="fro">${statusBadge(req.status)}</div></div>
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   PANEL: القرار المتظلم منه
   ════════════════════════════════════════════════════════════════ */
function renderAppealedDecisionPanel(decision) {
  if (!decision) return '';
  return `
  <div class="card card-ro">
    <div class="ph"><h3><div class="pico rd">${ICONS.warn}</div>القرار المتظلم منه</h3></div>
    <div class="pb">
      <div class="fg fg-3">
        <div class="fgrp"><label class="flbl">نوع القرار</label><div class="fro"><span class="badge b-rejected">${decision.type || '—'}</span></div></div>
        <div class="fgrp"><label class="flbl">تاريخ القرار</label><div class="fro">${formatDate(decision.date)}</div></div>
        <div class="fgrp"><label class="flbl">الجهة مُصدِرة القرار</label><div class="fro">${decision.issuer || '—'}</div></div>
        <div class="fgrp"><label class="flbl">تاريخ العلم بالقرار</label><div class="fro">${formatDate(decision.knowledgeDate)}</div></div>
        <div class="fgrp span-2"><label class="flbl">مضمون القرار التفصيلي</label><div class="fro">${decision.details || '—'}</div></div>
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   PANEL: القرار النهائي للجنة التظلمات
   ════════════════════════════════════════════════════════════════ */
function renderFinalAppealDecisionPanel(decision) {
  if (!decision) return '';
  return `
  <div class="card card-cum">
    <div class="ph"><h3><div class="pico gr">${ICONS.shield}</div>القرار النهائي — لجنة التظلمات</h3><span class="stg-lbl">قرار نهائي</span></div>
    <div class="pb">
      <div class="fg fg-3">
        <div class="fgrp"><label class="flbl">نوع القرار النهائي</label><div class="fro"><span class="badge ${decision.type === 'إلغاء القرار الأصلي' ? 'b-approved' : decision.type === 'تأييد القرار الأصلي' ? 'b-rejected' : 'b-phead'}">${decision.type || '—'}</span></div></div>
        <div class="fgrp"><label class="flbl">تاريخ القرار</label><div class="fro">${formatDate(decision.date)}</div></div>
        <div class="fgrp"><label class="flbl">الأعضاء الموقعون</label><div class="fro">${decision.signatories?.join('، ') || '—'}</div></div>
        <div class="fgrp span-full"><label class="flbl">مضمون القرار التفصيلي</label><div class="fro">${decision.content || '—'}</div></div>
        <div class="fgrp span-full"><label class="flbl">أثر القرار على الطلب الأصلي</label><div class="fro">${decision.effect || '—'}</div></div>
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   PANEL: بيانات المؤسسة الصحية (للترخيص)
   ════════════════════════════════════════════════════════════════ */
function renderInstitutionPanel(institution) {
  if (!institution) return '';
  return `
  <div class="card card-ro">
    <div class="ph"><h3><div class="pico tl">${ICONS.building}</div>بيانات المؤسسة الصحية</h3></div>
    <div class="pb">
      <div class="fg fg-3">
        <div class="fgrp"><label class="flbl">اسم المؤسسة</label><div class="fro" style="font-weight:700">${institution.name || '—'}</div></div>
        <div class="fgrp"><label class="flbl">رقم السجل التجاري</label><div class="fro" style="font-family:monospace">${institution.cr || '—'}</div></div>
        <div class="fgrp"><label class="flbl">حالة السجل التجاري</label><div class="fro"><span class="badge ${institution.crStatus === 'سارٍ' ? 'b-approved' : 'b-expired'}">${institution.crStatus || '—'}</span> <span style="font-size:11px;color:var(--text3)">(ينتهي: ${formatDate(institution.crExpiry)})</span></div></div>
        <div class="fgrp"><label class="flbl">نوع المؤسسة</label><div class="fro">${institution.type || '—'}</div></div>
        <div class="fgrp"><label class="flbl">المحافظة / الولاية</label><div class="fro">${institution.governorate || '—'}</div></div>
        <div class="fgrp"><label class="flbl">العنوان</label><div class="fro">${institution.address || '—'}</div></div>
        <div class="fgrp"><label class="flbl">رقم الهاتف</label><div class="fro">${institution.phone || '—'}</div></div>
        <div class="fgrp"><label class="flbl">البريد الإلكتروني</label><div class="fro">${institution.email || '—'}</div></div>
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   PANEL: الأطباء المرشحون
   ════════════════════════════════════════════════════════════════ */
function renderDoctorsPanel(doctors = [], canEdit = false) {
  const confirmedCount = doctors.filter(d => d.confirmStatus === 'تم التأكيد').length;
  return `
  <div class="card ${canEdit ? '' : 'card-ro'}">
    <div class="ph">
      <h3><div class="pico bl">${ICONS.user}</div>الأطباء المرشحون للجنة</h3>
      <span style="font-size:12px;color:${confirmedCount === doctors.length ? 'var(--accent)' : 'var(--warning)'}">
        ${confirmedCount} / ${doctors.length} مؤكد
      </span>
    </div>
    <div class="pb-0">
      <div class="tbl-wrap">
        <table class="dtbl">
          <thead><tr><th>الاسم</th><th>الرقم المدني</th><th>التخصص</th><th>المنصب</th><th>التأكيد</th><th>الازدواجية</th>${canEdit ? '<th>إجراءات</th>' : ''}</tr></thead>
          <tbody>
            ${doctors.map(d => `
            <tr>
              <td style="font-weight:600">${d.name}</td>
              <td style="font-family:monospace;font-size:11.5px">${d.civil}</td>
              <td>${d.specialty}</td>
              <td>${d.role}</td>
              <td><span class="badge ${d.confirmStatus === 'تم التأكيد' ? 'b-approved' : d.confirmStatus === 'رفض' ? 'b-rejected' : 'b-phead'}">${d.confirmStatus}</span></td>
              <td><span class="badge ${d.duplicateCheck === 'لا يوجد تعارض' ? 'b-approved' : 'b-rejected'}">${d.duplicateCheck}</span></td>
              ${canEdit ? `<td><button class="ibtn" onclick="sendDoctorConfirmation('${d.civil}')" title="إعادة إرسال طلب التأكيد">${ICONS.bell}</button><button class="ibtn d" onclick="removeDoctor('${d.civil}')" title="حذف">${ICONS.trash}</button></td>` : ''}
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
      ${canEdit ? `<div style="padding:12px 14px"><button class="btn btn-secondary btn-sm" onclick="openAddDoctorModal()">${ICONS.plus} إضافة طبيب</button></div>` : ''}
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   PANEL: بيانات الترخيص النشط
   ════════════════════════════════════════════════════════════════ */
function renderActiveLicensePanel(license) {
  if (!license) return '';
  const isExpiringSoon = new Date(license.expiryDate) - new Date() < 90 * 24 * 60 * 60 * 1000;
  return `
  <div class="card card-cum">
    <div class="ph"><h3><div class="pico gr">${ICONS.shield}</div>بيانات الترخيص النشط</h3><span class="stg-lbl">ترخيص معتمد</span></div>
    <div class="pb">
      ${isExpiringSoon ? `<div class="alert alert-w" style="margin-bottom:12px">${ICONS.warn}<span>الترخيص ينتهي قريباً. يُنصح بتقديم طلب تجديد.</span></div>` : ''}
      <div class="fg fg-4">
        <div class="fgrp"><label class="flbl">رقم الترخيص</label><div class="fro" style="font-family:monospace;font-weight:700;color:var(--primary)">${license.number || '—'}</div></div>
        <div class="fgrp"><label class="flbl">تاريخ الإصدار</label><div class="fro">${formatDate(license.issueDate)}</div></div>
        <div class="fgrp"><label class="flbl">تاريخ الانتهاء</label><div class="fro" style="${isExpiringSoon ? 'color:var(--warning);font-weight:700' : ''}">${formatDate(license.expiryDate)}</div></div>
        <div class="fgrp"><label class="flbl">مدة الصلاحية</label><div class="fro">${license.months} شهراً</div></div>
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   PANEL: المرفقات — تراكمي
   ════════════════════════════════════════════════════════════════ */
function renderAttachmentsPanel(attachments = [], canAdd = true) {
  const icons = { pdf: 'pdf', doc: 'doc', docx: 'doc', jpg: 'img', jpeg: 'img', png: 'img', mp3: 'media', wav: 'media', mp4: 'media' };
  const svgs = { pdf: ICONS.file, doc: ICONS.file, img: ICONS.eye, media: ICONS.clock, oth: ICONS.file };

  const attHtml = attachments.length === 0
    ? `<div style="text-align:center;padding:20px;color:var(--text3);font-size:12px">لا توجد مرفقات</div>`
    : attachments.map(att => {
        const ext = att.name?.split('.').pop()?.toLowerCase() || 'oth';
        const ico = icons[ext] || 'oth';
        return `
        <div class="att-row">
          <div class="att-ico ${ico}">${svgs[ico] || ICONS.file}</div>
          <div class="att-info">
            <div class="att-name">${att.name}</div>
            <div class="att-meta">${att.type} · رفعه: ${att.uploadedBy} (${att.role}) · ${att.uploadDate} · ${att.size || ''}</div>
          </div>
          <div class="att-acts">
            <button class="ibtn" title="تحميل / استعراض" onclick="showToast('جارٍ تحميل الملف...','i')">${ICONS.download}</button>
          </div>
        </div>`;
      }).join('');

  return `
  <div class="card">
    <div class="ph">
      <h3><div class="pico or">${ICONS.upload}</div>المرفقات <span style="font-size:11px;font-weight:400;color:var(--text3)">(${attachments.length} مرفق)</span></h3>
      ${canAdd ? `<button class="btn btn-secondary btn-xs" onclick="openAddAttachmentModal()">${ICONS.plus} إضافة مرفق</button>` : ''}
    </div>
    <div class="pb">
      ${attHtml}
      ${canAdd ? `
      <div style="margin-top:10px">
        <div class="fu-area" onclick="document.getElementById('hidden-file-input').click()">
          ${ICONS.upload}
          <p>اسحب الملف هنا أو انقر للاختيار</p>
          <small>يقبل: PDF, Word, صور, MP3, WAV, MP4 — الحجم الأقصى 20 ميغابايت</small>
        </div>
        <input type="file" id="hidden-file-input" style="display:none" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp3,.wav,.mp4" onchange="handleFileUpload(this)">
      </div>` : ''}
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   PANEL: الملاحظات التشغيلية — تراكمي
   ════════════════════════════════════════════════════════════════ */
function renderOperationalNotes(notes = [], canAdd = true) {
  const notesHtml = notes.length === 0
    ? `<div style="text-align:center;padding:16px;color:var(--text3);font-size:12px">لا توجد ملاحظات تشغيلية</div>`
    : notes.map(n => `
      <div class="note-item">
        <div class="note-av">${n.author?.charAt(0) || '؟'}</div>
        <div class="note-c">
          <div class="note-hd">
            <span class="note-auth">${n.author}</span>
            <span class="note-role">${n.role}</span>
            <span class="note-time">${n.time}</span>
          </div>
          <div class="note-txt">${n.text}</div>
        </div>
      </div>`).join('');

  return `
  <div class="card op-notes-card collapsed" data-notes-init="0">
    <div class="ph op-notes-head" onclick="toggleOperationalNotes(this.closest('.op-notes-card'))">
      <h3><div class="pico gy">${ICONS.note}</div>الملاحظات التشغيلية <span style="font-size:11px;font-weight:400;color:var(--text3)">(لا تغيّر حالة الطلب)</span></h3>
      <div style="display:flex;align-items:center;gap:8px">
        <span class="op-notes-chevron">${ICONS.arrow_left}</span>
        ${canAdd ? `<button class="btn btn-secondary btn-xs" onclick="event.stopPropagation();openAddNoteModal(currentRequestId)">${ICONS.plus} إضافة ملاحظة</button>` : ''}
      </div>
    </div>
    <div class="pb">
      ${notesHtml}
      ${canAdd ? `
      <div style="margin-top:10px;display:flex;gap:8px">
        <textarea class="fc" id="quick-note-input" placeholder="أكتب ملاحظة سريعة..." rows="2" style="flex:1"></textarea>
        <button class="btn btn-secondary btn-sm" style="align-self:flex-end" onclick="quickAddNote()">حفظ</button>
      </div>` : ''}
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   PANEL: نافذة اتخاذ القرار — تظهر شرطياً
   ════════════════════════════════════════════════════════════════ */
function renderDecisionPanel({ actions = [], title = 'اتخاذ قرار', note = '' }) {
  if (!actions.length) return '';
  const actionsHtml = actions.map(a => {
    const cls = WI_CONFIG.actionStyles[a] || 'btn-secondary btn-sm';
    return `<button class="btn ${cls}" onclick="executeAction('${a}')">${a}</button>`;
  }).join('');

  return `
  <div class="dp">
    <div class="ph"><h3><div class="pico bl">${ICONS.pen}</div>${title}</h3></div>
    <div class="dp-body">
      <div class="fgrp">
        <label class="flbl">الملاحظات <span style="font-weight:400;color:var(--text3)">(اختياري)</span></label>
        <textarea class="fc" id="decision-notes" placeholder="أكتب ملاحظاتك هنا..." rows="3">${note}</textarea>
      </div>
      <div class="fgrp">
        <label class="flbl">إرفاق ملف <span style="font-weight:400;color:var(--text3)">(اختياري)</span></label>
        <div class="decision-upload-area" onclick="document.getElementById('decision-file')?.click()">
          <input type="file" id="decision-file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp3,.wav,.mp4" style="display:none" onchange="renderDecisionFiles(this)">
          <div class="decision-upload-icon">${ICONS.upload}</div>
          <p>اسحب الملفات هنا أو انقر للاختيار</p>
          <small>يمكن رفع عدة ملفات دفعة واحدة (PDF, Word, صور, صوت, فيديو)</small>
        </div>
        <div id="decision-files-list" class="decision-files-list"></div>
        <div style="margin-top:6px;font-size:.74rem;color:var(--text3)">الحد الأقصى لكل ملف: 20 ميغابايت</div>
      </div>
      <div class="dp-acts">${actionsHtml}</div>
    </div>
  </div>`;
}

function formatFileSize(bytes) {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let i = 0;
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }
  return `${size.toFixed(size >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
}

function renderDecisionFiles(input) {
  const listEl = document.getElementById('decision-files-list');
  if (!listEl) return;
  const files = Array.from(input?.files || []);
  if (!files.length) {
    listEl.innerHTML = '';
    return;
  }
  listEl.innerHTML = files.map((file) => {
    const ext = (file.name.split('.').pop() || '').toUpperCase();
    const type = ext || (file.type ? file.type.split('/').pop().toUpperCase() : 'FILE');
    return `
      <div class="decision-file-item">
        <div class="decision-file-main">
          <span class="decision-file-title">${file.name}</span>
          <span class="decision-file-type">${type}</span>
        </div>
        <div class="decision-file-meta">${formatFileSize(file.size)}</div>
      </div>
    `;
  }).join('');
}

/* ════════════════════════════════════════════════════════════════
   PANEL: السجل الزمني — دائماً في الأسفل
   ════════════════════════════════════════════════════════════════ */
function renderTimeline(events = []) {
  const dotType = (type) => {
    if (type === 'success') return 's';
    if (type === 'danger') return 'd';
    if (type === 'warning') return 'w';
    return '';
  };
  const iconFor = (type) => {
    if (type === 'success') return ICONS.check;
    if (type === 'danger') return ICONS.x;
    if (type === 'warning') return ICONS.warn;
    return ICONS.clock;
  };

  const eventsHtml = events.length === 0
    ? `<div style="text-align:center;padding:20px;color:var(--text3);font-size:12px">لا توجد أحداث</div>`
    : events.map(e => `
      <div class="tl-item">
        <div class="tl-dot ${dotType(e.type)}">${iconFor(e.type)}</div>
        <div class="tl-c">
          <div class="tl-hd">
            <span class="tl-act">${e.action}</span>
            <span class="tl-time">${e.time}</span>
          </div>
          <div class="tl-meta">
            <span>${e.actor}</span>
            <span style="color:var(--text3)">·</span>
            <span>${e.role}</span>
          </div>
          ${e.toStatus ? `<div class="tl-states">
            ${e.fromStatus ? `<span class="badge b-draft" style="font-size:10px">${e.fromStatus.substring(0,30)}${e.fromStatus.length > 30 ? '...' : ''}</span><span>${ICONS.arrow_right}</span>` : ''}
            <span class="badge ${WI_CONFIG.statusBadges[e.toStatus] || 'b-draft'}" style="font-size:10px">${e.toStatus.substring(0,35)}${e.toStatus.length > 35 ? '...' : ''}</span>
          </div>` : ''}
          ${e.note ? `<div class="tl-note">${e.note}</div>` : ''}
        </div>
      </div>`).join('');

  return `
  <div class="card">
    <div class="ph"><h3><div class="pico gy">${ICONS.clock}</div>السجل الزمني الكامل للطلب</h3></div>
    <div class="pb"><div class="tl">${eventsHtml}</div></div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   دوال مساعدة مشتركة
   ════════════════════════════════════════════════════════════════ */

/* تشغيل استعلام وزارة الصحة (محاكاة) */
function runMedicalQuery(civilId) {
  const resultsEl = document.getElementById('mq-results');
  if (!resultsEl) return;
  resultsEl.innerHTML = `<div class="loading">${ICONS.clock} جارٍ الاستعلام من وزارة الصحة...</div>`;
  setTimeout(() => {
    resultsEl.innerHTML = `
      <div class="flbl" style="margin-bottom:8px">نتائج الاستعلام — ${civilId}</div>
      <div class="tbl-wrap">
        <table class="dtbl">
          <thead><tr><th>رقم التقرير</th><th>الجهة الصحية</th><th>التاريخ</th><th>نوع التقرير</th><th>التشخيص</th><th>أيام الإجازة</th><th></th></tr></thead>
          <tbody>
            <tr><td style="font-family:monospace">RPT-2024-089123</td><td>مستشفى السلطاني</td><td>2024-12-10</td><td>إجازة مرضية</td><td>الربو الحاد</td><td>14 يوم</td><td><button class="ibtn" onclick="showToast('عرض تقرير التفاصيل','i')">${ICONS.eye}</button></td></tr>
            <tr><td style="font-family:monospace">RPT-2024-076540</td><td>مستشفى خولة</td><td>2024-10-05</td><td>فحص دوري</td><td>وظائف الرئة</td><td>—</td><td><button class="ibtn" onclick="showToast('عرض تقرير التفاصيل','i')">${ICONS.eye}</button></td></tr>
          </tbody>
        </table>
      </div>`;
  }, 1200);
}

/* تنفيذ إجراء مع تأكيد */
function executeAction(action) {
  const needsConfirm = action.includes('رفض') || action.includes('إغلاق') || action.includes('إلغاء') || action.includes('إيقاف');
  const isPositive = action.includes('اعتماد') || action.includes('موافقة') || action.includes('تنفيذ');

  if (needsConfirm) {
    confirmAction({
      title: 'تأكيد الإجراء',
      msg: `هل أنت متأكد من تنفيذ الإجراء التالي؟<br><br><strong>${action}</strong>`,
      confirmLabel: action,
      confirmClass: 'btn-danger',
      onConfirm: () => {
        showToast(`تم تنفيذ: ${action}`, 's');
        setTimeout(() => window.location.reload(), 1500);
      }
    });
  } else {
    showToast(`تم تنفيذ: ${action}`, isPositive ? 's' : 'i');
    setTimeout(() => window.location.reload(), 1500);
  }
}

/* ملاحظة سريعة */
function quickAddNote() {
  const inp = document.getElementById('quick-note-input');
  if (!inp || !inp.value.trim()) { showToast('يرجى كتابة الملاحظة', 'w'); return; }
  showToast('تم حفظ الملاحظة', 's');
  inp.value = '';
}

function toggleOperationalNotes(card) {
  if (!card) return;
  const willExpand = card.classList.contains('collapsed');
  card.classList.toggle('collapsed', !willExpand);
  card.classList.toggle('expanded', willExpand);
}

function placeAndCollapseOperationalNotes() {
  const content = document.getElementById('app-content');
  if (!content) return;

  const decisionPanel = content.querySelector('.dp');
  const notesCards = content.querySelectorAll('.op-notes-card');

  notesCards.forEach((card) => {
    if (card.dataset.notesInit !== '1') {
      card.classList.add('collapsed');
      card.classList.remove('expanded');
      card.dataset.notesInit = '1';
    }

    if (decisionPanel && card.previousElementSibling !== decisionPanel) {
      decisionPanel.insertAdjacentElement('afterend', card);
    }
  });
}

/* رفع ملف (محاكاة) */
function handleFileUpload(input) {
  if (input.files.length > 0) {
    showToast(`تم رفع الملف: ${input.files[0].name}`, 's');
  }
}

(function setupOperationalNotesObserver() {
  const run = () => setTimeout(placeAndCollapseOperationalNotes, 0);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  const observer = new MutationObserver(() => run());
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();

/* فتح نافذة إضافة زيارة ميدانية */
function openAddVisitModal() {
  openModal({
    title: 'إضافة زيارة ميدانية',
    size: 'md-lg',
    body: `
      <div class="alert alert-i" style="margin-bottom:14px">${ICONS.info}<span>الزيارة الميدانية لا تغيّر حالة الطلب — إجراء فرعي فقط.</span></div>
      <div class="fg fg-2" style="gap:14px">
        <div class="fgrp"><label class="flbl">تاريخ الزيارة <span class="req">*</span></label><input type="date" class="fc"></div>
        <div class="fgrp"><label class="flbl">وقت الزيارة</label><input type="time" class="fc"></div>
        <div class="fgrp span-full"><label class="flbl">سبب الزيارة <span class="req">*</span></label><textarea class="fc" rows="2"></textarea></div>
        <div class="fgrp span-full"><label class="flbl">الموظفون القائمون</label><input type="text" class="fc" placeholder="أسماء الموظفين المشاركين"></div>
        <div class="fgrp span-full"><label class="flbl">ملخص الزيارة</label><textarea class="fc" rows="3"></textarea></div>
        <div class="fgrp span-full"><label class="flbl">النتائج</label><textarea class="fc" rows="3"></textarea></div>
        <div class="fgrp span-full"><label class="flbl">مرفقات</label><input type="file" class="fc" accept=".pdf,.jpg,.png,.mp4" multiple></div>
      </div>`,
    footer: `<button class="btn btn-primary" onclick="closeModal();showToast('تم حفظ الزيارة الميدانية','s')">حفظ الزيارة</button><button class="btn btn-ghost" onclick="closeModal()">إلغاء</button>`
  });
}

/* فتح نافذة إضافة مرفق */
function openAddAttachmentModal() {
  openModal({
    title: 'إضافة مرفق',
    body: `
      <div class="fg" style="gap:14px">
        <div class="fgrp"><label class="flbl">نوع المرفق <span class="req">*</span></label>
          <select class="fc">
            <option>تقرير طبي</option><option>تقرير شرطة</option><option>كشف حضور وانصراف</option>
            <option>صور</option><option>تسجيل صوتي</option><option>فيديو</option><option>وثيقة رسمية</option><option>مستند آخر</option>
          </select>
        </div>
        <div class="fgrp"><label class="flbl">الملف <span class="req">*</span></label>
          <input type="file" class="fc" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp3,.wav,.mp4">
          <div class="fhint">PDF, Word, صور, MP3, WAV, MP4 — الحجم الأقصى 20 ميغابايت</div>
        </div>
      </div>`,
    footer: `<button class="btn btn-primary" onclick="closeModal();showToast('تم رفع المرفق بنجاح','s')">رفع المرفق</button><button class="btn btn-ghost" onclick="closeModal()">إلغاء</button>`
  });
}

/* فتح نافذة إضافة فترة إجازة */
function openAddSickLeaveModal() {
  openModal({
    title: 'إضافة فترة إجازة مرضية',
    body: `
      <div class="fg fg-2" style="gap:14px">
        <div class="fgrp"><label class="flbl">من تاريخ <span class="req">*</span></label><input type="date" class="fc"></div>
        <div class="fgrp"><label class="flbl">إلى تاريخ <span class="req">*</span></label><input type="date" class="fc"></div>
        <div class="fgrp span-full"><label class="flbl">ملاحظات</label><textarea class="fc" rows="2"></textarea></div>
      </div>`,
    footer: `<button class="btn btn-primary" onclick="closeModal();showToast('تم إضافة فترة الإجازة المرضية','s')">حفظ الفترة</button><button class="btn btn-ghost" onclick="closeModal()">إلغاء</button>`
  });
}

function openOriginalRequest(id) {
  showToast(`فتح الطلب الأصلي ${id} في نافذة جديدة`, 'i');
}

/* متغير مساعد للطلب الحالي */
let currentRequestId = null;
