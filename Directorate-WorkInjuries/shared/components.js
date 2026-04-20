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
          <div class="fro">${injury.workEnvironment || '—'}</div>
        </div>
        ${injury.description ? `
        <div class="fgrp span-full">
          <label class="flbl">الوصف التفصيلي للحالة</label>
          <div class="fro" style="min-height:60px;align-items:flex-start;padding-top:10px">${injury.description}</div>
        </div>` : ''}
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
  const visitsLines = visits.length === 0
    ? `<div style="text-align:center;padding:20px;color:var(--text3);font-size:12px">لا توجد زيارات ميدانية مسجلة</div>`
    : visits.map((v, i) => `
      <div style="border-right:3px solid var(--accent); background:var(--g50); padding:14px; border-radius:10px; margin-bottom:12px; position:relative">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px">
          <div>
            <div style="font-size:11px; color:var(--text3); font-weight:600; text-transform:uppercase">${formatDate(v.date)} — ${v.time}</div>
            <div style="font-size:14px; font-weight:700; color:var(--primary); margin-top:2px">${v.reason}</div>
          </div>
          <span style="font-size:10px; display:flex; align-items:center; gap:4px; color:var(--success); font-weight:700">
            <span style="width:6px; height:6px; background:var(--success); border-radius:50%"></span> تم التنفيذ
          </span>
        </div>
        <div style="display:flex; flex-direction:column; gap:10px">
          <div class="fgrp">
            <label class="flbl" style="margin-bottom:2px">الموظفون القائمون</label>
            <div style="font-size:12.5px; color:var(--text2)">${v.staff || '—'}</div>
          </div>
          <div class="fgrp">
            <label class="flbl" style="margin-bottom:2px">ملخص الزيارة والنتائج</label>
            <div style="font-size:13px; color:var(--text1); line-height:1.6">${v.summary || '—'}</div>
          </div>
        </div>
        ${v.attachments && v.attachments.length ? `
          <div style="margin-top:12px; display:flex; flex-wrap:wrap; gap:8px">
            ${v.attachments.map(a => `
              <div class="att-chip" style="display:flex; align-items:center; gap:6px; background:#fff; border:1px solid var(--border); padding:4px 10px; border-radius:100px; font-size:11px">
                <span style="display:flex; align-items:center; width:14px">${ICONS.file}</span> <span style="font-weight:600">${a}</span>
                <button class="ibtn" onclick="event.stopPropagation();showToast('جارٍ تحميل الملف...','i')" style="padding:0; margin-right:4px">${ICONS.download}</button>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>`).join('');

  return `
  <div class="card card-cum">
    <div class="ph">
      <h3><div class="pico or">${ICONS.map}</div>الزيارات الميدانية والمعاينات</h3>
      ${canAdd ? `<button class="btn btn-secondary btn-xs" onclick="openAddVisitModal()">${ICONS.plus} إضافة زيارة</button>` : ''}
    </div>
    <div class="pb">
      ${visitsLines}
    </div>
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
        ${renderModernUploadComponent({ idPrefix: 'gen-att', subTitle: 'PDF, Word, صور, MP3, WAV, MP4 — الحجم الأقصى 20 ميغابايت' })}
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
        <label class="flbl">إرفاق ملفات داعمة للقرار <span style="font-weight:400;color:var(--text3)">(اختياري)</span></label>
        ${renderModernUploadComponent({ idPrefix: 'decision-att', subTitle: 'يمكن رفع عدة ملفات دفعة واحدة' })}
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
            ${e.fromStatus ? `<span class="badge b-draft" style="font-size:10px">${e.fromStatus.substring(0,300)}${e.fromStatus.length > 300 ? '...' : ''}</span><span>${ICONS.arrow_right}</span>` : ''}
            <span class="badge ${WI_CONFIG.statusBadges[e.toStatus] || 'b-draft'}" style="font-size:10px">${e.toStatus.substring(0,300)}${e.toStatus.length > 300 ? '...' : ''}</span>
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
   Unified Search & Filtering Logic
   ════════════════════════════════════════════════════════════════ */

/**
 * Renders a unified prototype filter bar.
 */
function renderUnifiedFilterBar({ onSearch, onToggleAll, isAllVisible = false }) {
  return `
    <div class="filters unified-filter-panel" style="margin-bottom:20px; display:flex; flex-direction:column; gap:12px; padding:16px; background:var(--g50); border:1px solid var(--border); border-radius:14px">
      <div class="unified-filter-row" style="display:grid; grid-template-columns:1.15fr 1fr 1fr 0.9fr 0.9fr 1.2fr auto; gap:12px; align-items:end">
        <div class="fgrp" style="margin:0">
          <label class="flbl">رقم الطلب</label>
          <input
            type="text"
            class="fc"
            id="global-search-input"
            placeholder="WI-2025-001234"
            oninput="handleGlobalSearch(this.value, ${onSearch})">
        </div>
        <div class="fgrp" style="margin:0">
          <label class="flbl">الرقم المدني</label>
          <input type="text" class="fc" placeholder="9012345678">
        </div>
        <div class="fgrp" style="margin:0">
          <label class="flbl">رقم السجل التجاري</label>
          <input type="text" class="fc" placeholder="1234567">
        </div>
        <div class="fgrp" style="margin:0">
          <label class="flbl">من تاريخ</label>
          <input type="date" class="fc">
        </div>
        <div class="fgrp" style="margin:0">
          <label class="flbl">إلى تاريخ</label>
          <input type="date" class="fc">
        </div>
        <div class="fgrp" style="margin:0">
          <label class="flbl">الحالة</label>
          <select class="fc">
            <option>جميع الحالات</option>
          </select>
        </div>
        <div style="display:flex; align-items:center; gap:12px; justify-content:flex-end; padding-bottom:6px">
          <label class="switch-container" style="display:flex; align-items:center; gap:10px; cursor:pointer; white-space:nowrap" onclick="${onToggleAll}()">
            <span style="font-size:12.5px; font-weight:700; color:var(--text2)">عرض كافة الطلبات</span>
            <div class="switch ${isAllVisible ? 'active' : ''}" style="width:42px; height:22px; background:${isAllVisible ? 'var(--primary)' : '#cbd5e1'}; border-radius:20px; position:relative; transition:.3s">
              <div style="width:16px; height:16px; background:#fff; border-radius:50%; position:absolute; top:3px; ${isAllVisible ? 'right:23px' : 'right:3px'}; transition:.3s; box-shadow:0 1px 3px rgba(0,0,0,0.1)"></div>
            </div>
          </label>
        </div>
      </div>
    </div>
  `;
}

let globalSearchTimer = null;
function handleGlobalSearch(val, callback) {
  clearTimeout(globalSearchTimer);
  globalSearchTimer = setTimeout(() => {
    if (callback) callback(val);
  }, 400);
}

/**
 * Generic logic to filter data across all stages and search.
 */
function getFilteredData({ role, data, query = '', showAll = false }) {
  const stages = WI_CONFIG.roleStages[role] || [];
  const q = query.toLowerCase().trim();

  return data.filter(r => {
    // 1. Search Logic (Check multiple fields)
    const matchesSearch = !q || (
      r.id.toLowerCase().includes(q) ||
      (r.insured && r.insured.name?.toLowerCase().includes(q)) ||
      (r.insured && r.insured.civil?.includes(q)) ||
      (r.applicant && r.applicant.name?.toLowerCase().includes(q)) ||
      (r.employer && r.employer.name?.toLowerCase().includes(q))
    );

    // 2. Stage Logic
    const isInStage = stages.includes(r.status);

    // Filter Decisions:
    // - If searching: show if matches (Global Search)
    // - If showAll: show all matches
    // - Default: only role's stage
    if (q) return matchesSearch;
    if (showAll) return matchesSearch;
    return isInStage && matchesSearch;
  });
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
            <tr><td style="font-family:monospace">RPT-2024-089123</td><td>مستشفى السلطاني</td><td>2024-12-10</td><td>إجازة مرضية</td><td>الربو الحاد</td><td>14 يوم</td><td><button class="ibtn" onclick="openMedicalReportDetails('RPT-2024-089123')">${ICONS.eye}</button></td></tr>
            <tr><td style="font-family:monospace">RPT-2024-076540</td><td>مستشفى خولة</td><td>2024-10-05</td><td>فحص دوري</td><td>وظائف الرئة</td><td>—</td><td><button class="ibtn" onclick="openMedicalReportDetails('RPT-2024-076540')">${ICONS.eye}</button></td></tr>
          </tbody>
        </table>
      </div>`;
  }, 1200);
}

function openMedicalReportDetails(reportId) {
  openModal({
    title: `تفاصيل التقرير الطبي — ${reportId}`,
    size: 'md-lg',
    body: `
      <div class="card" style="border:none;box-shadow:none">
        <div style="background:var(--g50);padding:16px;border-radius:12px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-size:12px;color:var(--text3)">الجهة المصدرة</div>
            <div style="font-size:16px;font-weight:700;color:var(--primary)">مستشفى السلطاني — مسقط</div>
          </div>
          <div style="text-align:left">
            <div style="font-size:12px;color:var(--text3)">تاريخ الإصدار</div>
            <div style="font-size:14px;font-weight:600">10 ديسمبر 2024</div>
          </div>
        </div>
        
        <div class="fg fg-3" style="margin-bottom:20px">
          <div class="fgrp"><label class="flbl">رقم التقرير</label><div class="fro">${reportId}</div></div>
          <div class="fgrp"><label class="flbl">اسم المريض</label><div class="fro">${WI_DATA.users.worker.name}</div></div>
          <div class="fgrp"><label class="flbl">الرقم المدني</label><div class="fro">${WI_DATA.users.worker.civil}</div></div>
        </div>

        <div class="divider"></div>
        
        <div class="fg fg-2">
          <div class="fgrp"><label class="flbl">التشخيص الطبي (ICD-10)</label><div class="fro">J45.909 - Asthma, unspecified</div></div>
          <div class="fgrp"><label class="flbl">الفترة الممنوحة</label><div class="fro">14 يوم (من 2024-12-10 إلى 2024-12-23)</div></div>
        </div>

        <div class="fgrp" style="margin-top:16px">
          <label class="flbl">خلاصة الحالة الطبية والتوصيات</label>
          <div class="fro" style="line-height:1.8;height:auto;padding:12px">
            تمت معاينة المريض في وحدة الطوارئ حيث كان يعاني من نوبة ربو حادة وضيق في التنفس. تم إعطاء العلاج اللازم (بخاخات وموسعات شعب هوائية). الحالة تستدعي الراحة التامة وتجنب مسببات الحساسية أو الغبار في بيئة العمل لمدة أسبوعين. سيتم مراجعة الحالة في العيادة الخارجية بعد أسبوع.
          </div>
        </div>

        <div style="margin-top:20px;padding:12px;border:1px dashed var(--border);border-radius:8px;display:flex;align-items:center;gap:12px">
          <div style="width:40px;height:40px;border-radius:50%;background:var(--s100);color:var(--s700);display:flex;align-items:center;justify-content:center">${ICONS.check}</div>
          <div>
            <div style="font-size:13px;font-weight:700">التوقيع الإلكتروني معتمد</div>
            <div style="font-size:11px;color:var(--text3)">د. أحمد بن عبدالله الحوسني — استشاري أول أمراض صدرية</div>
          </div>
        </div>
      </div>`,
    footer: `
      <button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ طباعة التقرير...','i')">${ICONS.plus} طباعة التقرير</button>
      <button class="btn btn-ghost btn-sm" onclick="closeModal()">إغلاق</button>
    `
  });
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

/* ════════════════════════════════════════════════════════════════
   Field Visit Staff Table Helpers
   ════════════════════════════════════════════════════════════════ */
let visitStaffState = [];

function renderVisitStaffTable() {
  const container = document.getElementById('visit-staff-table-container');
  if (!container) return;
  
  const internalUsers = Object.values(WI_DATA.users).filter(u => u.employeeId);
  
  let html = `
    <table class="dtbl" style="margin-bottom:8px;font-size:12.5px">
      <thead><tr><th>الموظف</th><th style="width:40px"></th></tr></thead>
      <tbody>
        ${visitStaffState.length === 0 
          ? '<tr><td colspan="2" style="text-align:center;color:var(--text3);padding:10px">لم يتم إضافة موظفين بعد</td></tr>' 
          : visitStaffState.map((name, i) => `
          <tr>
            <td>${name}</td>
            <td><button class="ibtn d" onclick="removeVisitStaff(${i})">${ICONS.trash}</button></td>
          </tr>`).join('')}
      </tbody>
    </table>
    <div style="display:flex;gap:8px">
      <select class="fc" id="add-staff-select" style="flex:1">
        <option value="">-- اختر موظفاً لإضافته --</option>
        ${internalUsers.map(u => `<option value="${u.name}">${u.name} (${u.employeeId})</option>`).join('')}
      </select>
      <button class="btn btn-secondary btn-sm" style="white-space:nowrap" onclick="addVisitStaff()">${ICONS.plus} إضافة</button>
    </div>
  `;
  container.innerHTML = html;
}

function addVisitStaff() {
  const sel = document.getElementById('add-staff-select');
  if (!sel || !sel.value) return;
  if (visitStaffState.includes(sel.value)) {
    showToast('الموظف مضاف مسبقاً', 'w');
    return;
  }
  visitStaffState.push(sel.value);
  renderVisitStaffTable();
}

function removeVisitStaff(index) {
  visitStaffState.splice(index, 1);
  renderVisitStaffTable();
}

/* فتح نافذة إضافة زيارة ميدانية */
function openAddVisitModal() {
  visitStaffState = []; // Reset
  openModal({
    title: 'إضافة زيارة ميدانية جديدة',
    size: 'md-lg',
    body: `
      <div class="fg fg-2" style="gap:14px">
        <div class="fgrp"><label class="flbl">تاريخ الزيارة <span class="req">*</span></label><input type="date" class="fc" value="${new Date().toISOString().split('T')[0]}"></div>
        <div class="fgrp"><label class="flbl">وقت الزيارة</label><input type="time" class="fc" value="09:00"></div>
        <div class="fgrp span-full"><label class="flbl">سبب الزيارة / الغرض <span class="req">*</span></label><textarea class="fc" rows="2" placeholder="مثال: معاينة موقع الحادث، التحقق من الشهود..."></textarea></div>
        
        <div class="fgrp span-full">
          <label class="flbl">الموظفون القائمون بالزيارة <span class="req">*</span></label>
          <div id="visit-staff-table-container"></div>
        </div>

        <div class="fgrp span-full"><label class="flbl">ملخص الزيارة والنتائج</label><textarea class="fc" rows="4" placeholder="اكتب ملخصاً لما تم خلال الزيارة..."></textarea></div>
        
        <div class="fgrp span-full">
          <label class="flbl">مرفقات الزيارة (صور، تقارير، وثائق)</label>
          ${renderModernUploadComponent({ idPrefix: 'visit-att', subTitle: 'يمكن رفع عدة صور أو مستندات PDF' })}
        </div>
      </div>`,
    footer: `<button class="btn btn-primary" onclick="closeModal();showToast('تم حفظ الزيارة الميدانية وتحديث السجل','s')">حفظ الزيارة</button><button class="btn btn-ghost" onclick="closeModal()">إلغاء</button>`
  });
  
  // Wait for modal to render then initialize staff table
  setTimeout(renderVisitStaffTable, 0);
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
/* ════════════════════════════════════════════════════════════════
   Modern Multi-File Upload Components
   ════════════════════════════════════════════════════════════════ */

/**
 * Renders the modern dropzone HTML.
 */
function renderModernUploadComponent({ idPrefix = 'up', title = 'إرفاق المستندات', subTitle = 'يمكنك اختيار عدة ملفات معاً (PDF, Word, صور...)' }) {
  const containerId = `${idPrefix}-container`;
  const inputId = `${idPrefix}-input`;
  const listId = `${idPrefix}-list`;

  return `
    <div class="dz-container" id="${containerId}">
      <div class="dz-box" onclick="document.getElementById('${inputId}').click()">
        <div class="dz-box-icon">${ICONS.upload}</div>
        <div class="dz-box-text">اسحب الملفات هنا أو انقر للاختيار</div>
        <div class="dz-box-sub">${subTitle}</div>
        <input type="file" id="${inputId}" class="fc" multiple style="display:none" onchange="handleModernFileUpload(this, '${listId}')">
      </div>
      <div class="dz-list" id="${listId}"></div>
    </div>
  `;
}

/**
 * Handles multiple file selection and populates the list.
 */
function handleModernFileUpload(input, listId) {
  const listEl = document.getElementById(listId);
  if (!listEl) return;

  const files = Array.from(input.files);
  if (files.length === 0) return;

  // Simulate upload and add to list
  files.forEach(file => {
    const fileId = 'f-' + Math.random().toString(36).substr(2, 9);
    const item = document.createElement('div');
    item.className = 'dz-item';
    item.id = fileId;
    
    const ext = file.name.split('.').pop().toLowerCase();
    const isImg = ['jpg', 'jpeg', 'png', 'gif'].includes(ext);
    
    item.innerHTML = `
      <div class="dz-item-icon">${isImg ? ICONS.eye : ICONS.file}</div>
      <div class="dz-item-info">
        <div class="dz-item-name" title="${file.name}">${file.name}</div>
        <div class="dz-item-size">${formatFileSize(file.size)}</div>
      </div>
      <button type="button" class="ibtn d" onclick="this.closest('.dz-item').remove()" title="حذف">${ICONS.trash}</button>
    `;
    listEl.appendChild(item);
  });

  showToast(`تمت إضافة ${files.length} ملف(ات)`, 's');
  // Clear input to allow same files again if needed
  input.value = '';
}

/* ════════════════════════════════════════════════════════════════
   Dashboard Enhancements: Full-width tables + current work grid + charts
   ════════════════════════════════════════════════════════════════ */
function bucketEntries(entries, getter) {
  const map = new Map();
  entries.forEach((entry) => {
    const key = getter(entry) || 'أخرى';
    map.set(key, (map.get(key) || 0) + 1);
  });
  return [...map.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

function pickChartPalette(count) {
  const palette = ['#0a5c36', '#12a865', '#c7a94e', '#0f6f8f', '#c0392b', '#7c3aed', '#0f766e', '#b45309'];
  return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
}

function normalizeDateKey(value) {
  if (!value) return null;
  const raw = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) return raw.slice(0, 7);
  return null;
}

function buildMonthBuckets(entries, dateGetter) {
  const monthMap = new Map();
  entries.forEach((entry) => {
    const monthKey = normalizeDateKey(dateGetter(entry));
    if (!monthKey) return;
    monthMap.set(monthKey, (monthMap.get(monthKey) || 0) + 1);
  });
  return [...monthMap.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-6)
    .map(([label, value]) => ({ label, value }));
}

function findRequestById(id) {
  return WI_DATA.allowances.find(r => r.id === id)
    || WI_DATA.disability.find(r => r.id === id)
    || WI_DATA.appeals.find(r => r.id === id)
    || WI_DATA.licensing.find(r => r.id === id)
    || null;
}

function getDashboardEntityName(item) {
  return item.insured?.name
    || item.applicant?.name
    || item.institution?.name
    || item.delegate?.name
    || item.name
    || item.id
    || '—';
}

function getDashboardDate(item) {
  return item.submitDate || item.date || item.lastUpdate || null;
}

function getDashboardCategory(item) {
  return item.type
    || item.requestType
    || item.originalRequestType
    || item.institution
    || item.subtype
    || 'أخرى';
}

function getRoleDataset(role) {
  const users = WI_DATA.users;
  const workerCivil = users.worker?.civil;
  const employerCivil = users.employer_delegate?.civil;

  const licensingStatusesForCommittees = [
    'تم إحالة الطلب إلى اللجنة الطبية الإشرافية — بانتظار جدولة جلسة',
    'تم جدولة جلسة اللجنة الطبية الإشرافية',
    'تم اتخاذ القرار من اللجنة الطبية الإشرافية — بانتظار تنفيذ القرار',
    'تم اعتماد الترخيص — الترخيص نشط',
    'مسودة',
    'تم تقديم طلب الترخيص / التجديد — بانتظار مراجعة موظف قسم التراخيص والرقابة',
    'بانتظار اعتماد رئيس قسم التراخيص والرقابة'
  ];

  switch (role) {
    case 'worker':
      return {
        scopeLabel: 'طلباتك الحالية',
        entries: [
          ...WI_DATA.allowances.filter(r => r.applicant?.civil === workerCivil || r.insured?.civil === workerCivil),
          ...WI_DATA.disability.filter(r => r.applicant?.civil === workerCivil),
          ...WI_DATA.appeals.filter(r => r.applicant?.civil === workerCivil)
        ]
      };
    case 'employer-delegate':
      return {
        scopeLabel: 'طلبات جهة العمل',
        entries: [
          ...WI_DATA.allowances.filter(r => r.employer?.cr === users.employer_delegate?.cr),
          ...WI_DATA.appeals.filter(a => a.applicant?.civil === employerCivil)
        ]
      };
    case 'injury-investigator':
      return {
        scopeLabel: 'ملف إصابات العمل',
        entries: WI_DATA.allowances.filter(r => r.type === 'إصابة عمل')
      };
    case 'injury-head':
      return {
        scopeLabel: 'طلبات إصابات العمل',
        entries: WI_DATA.allowances.filter(r => r.type === 'إصابة عمل')
      };
    case 'od-investigator':
      return {
        scopeLabel: 'ملف الأمراض المهنية',
        entries: WI_DATA.allowances.filter(r => r.type === 'مرض مهني')
      };
    case 'od-head':
      return {
        scopeLabel: 'طلبات الأمراض المهنية',
        entries: WI_DATA.allowances.filter(r => r.type === 'مرض مهني')
      };
    case 'sickleave-employee':
    case 'sickleave-head':
      return {
        scopeLabel: 'طلبات الإجازات المرضية',
        entries: WI_DATA.allowances.filter(r =>
          r.status.includes('الإجازات المرضية') || (r.sickLeavePeriods && r.sickLeavePeriods.length)
        )
      };
    case 'disability-employee':
    case 'disability-head':
      return {
        scopeLabel: 'طلبات منفعة الإعاقة',
        entries: WI_DATA.disability
      };
    case 'committees-employee':
    case 'committees-head':
      return {
        scopeLabel: 'ملفات اللجان الطبية',
        entries: [
          ...WI_DATA.allowances.filter(r => r.status.includes('اللجان الطبية') || r.status.includes('المؤسسات الصحية المرخصة')),
          ...WI_DATA.appeals
        ]
      };
    case 'licensing-employee':
    case 'licensing-head':
    case 'hospital-delegate':
    case 'supervisory-committee':
    case 'supervisory-rapporteur':
      return {
        scopeLabel: 'طلبات التراخيص',
        entries: WI_DATA.licensing.filter(r => licensingStatusesForCommittees.includes(r.status) || r.status)
      };
    case 'licensed-institution':
    case 'institution-rapporteur':
      return {
        scopeLabel: 'الجلسات الطبية',
        entries: WI_DATA.sessions
      };
    case 'appeals-committee':
    case 'appeals-rapporteur':
      return {
        scopeLabel: 'ملفات التظلمات',
        entries: WI_DATA.appeals
      };
    default:
      return { scopeLabel: 'الملفات الحالية', entries: [] };
  }
}

function renderDashboardDonutChart(items, title, centerLabel) {
  if (!items.length) return '';
  const total = items.reduce((sum, item) => sum + item.value, 0);
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  const colors = pickChartPalette(items.length);

  const segments = items.map((item, index) => {
    const arc = (item.value / total) * circumference;
    const segment = `<circle cx="70" cy="70" r="${radius}" fill="none" stroke="${colors[index]}" stroke-width="14" stroke-linecap="round" stroke-dasharray="${arc} ${circumference}" stroke-dashoffset="${-offset}" transform="rotate(-90 70 70)"></circle>`;
    offset += arc;
    return segment;
  }).join('');

  return `
    <div class="chart-card">
      <div class="chart-head">
        <h3>${title}</h3>
        <span>${total} عنصر</span>
      </div>
      <div class="chart-donut-wrap">
        <svg class="chart-donut" viewBox="0 0 140 140" aria-hidden="true">
          <circle cx="70" cy="70" r="${radius}" fill="none" stroke="#e5efe9" stroke-width="14"></circle>
          ${segments}
        </svg>
        <div class="chart-donut-center">
          <strong>${total}</strong>
          <span>${centerLabel}</span>
        </div>
      </div>
      <div class="chart-legend">
        ${items.map((item, index) => `
          <div class="chart-legend-item">
            <span class="chart-swatch" style="background:${colors[index]}"></span>
            <span class="chart-legend-label">${item.label}</span>
            <strong>${item.value}</strong>
          </div>
        `).join('')}
      </div>
    </div>`;
}

function renderDashboardBars(items, title, mode = 'value') {
  if (!items.length) return '';
  const max = Math.max(...items.map(item => item.value), 1);
  return `
    <div class="chart-card">
      <div class="chart-head">
        <h3>${title}</h3>
        <span>${items.length} فئة</span>
      </div>
      <div class="chart-bars ${mode === 'months' ? 'months' : ''}">
        ${items.map((item, index) => `
          <div class="chart-bar-row">
            <div class="chart-bar-meta">
              <span>${item.label}</span>
              <strong>${item.value}</strong>
            </div>
            <div class="chart-bar-track">
              <div class="chart-bar-fill" style="width:${(item.value / max) * 100}%;background:${pickChartPalette(items.length)[index]}"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>`;
}

function renderDashboardInsights(role) {
  const { scopeLabel, entries } = getRoleDataset(role);
  if (!entries.length) return '';

  const statusBuckets = bucketEntries(entries, item => item.status).slice(0, 5);
  const categoryBuckets = bucketEntries(entries, item => getDashboardCategory(item)).slice(0, 5);
  const monthBuckets = buildMonthBuckets(entries, item => getDashboardDate(item));

  if (!statusBuckets.length && !categoryBuckets.length && !monthBuckets.length) return '';

  return `
    <div class="dashboard-insights">
      ${renderDashboardDonutChart(statusBuckets, `توزيع الحالات — ${scopeLabel}`, 'حالة')}
      ${renderDashboardBars(categoryBuckets, `التوزيع حسب النوع — ${scopeLabel}`)}
      ${renderDashboardBars(monthBuckets, `الحركة الزمنية لآخر 6 أشهر`, 'months')}
    </div>`;
}

function buildCurrentWorkTable(rows) {
  return `
    <div class="card dashboard-card-wide dashboard-current-work">
      <div class="ph">
        <h3><div class="pico bl">${ICONS.lock}</div>الطلبات الجاري العمل عليها حاليا</h3>
      </div>
      <div class="pb-0">
        <div class="tbl-wrap">
          <table class="dtbl">
            <thead>
              <tr>
                <th>رقم الطلب</th>
                <th>صاحب الطلب / الجهة</th>
                <th>الحالة الحالية</th>
                <th>آخر تحديث</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${rows.map(row => `
                <tr>
                  <td style="font-family:monospace;font-weight:700;color:var(--primary)">${row.id}</td>
                  <td>${row.name}</td>
                  <td>${row.statusHtml}</td>
                  <td style="font-size:12px;color:var(--text3)">${row.lastUpdate || '—'}</td>
                  <td><a class="btn btn-primary btn-xs" href="${row.href}">فتح التفاصيل</a></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
}

function replaceCheckedOutSummary(content) {
  const alerts = [...content.querySelectorAll('.alert')].filter(alert =>
    alert.textContent.includes('الطلبات التي حجزتها حالياً') || alert.textContent.includes('الطلبات الجاري العمل عليها حاليا')
  );

  alerts.forEach((alert) => {
    const anchors = [...alert.querySelectorAll('a[href]')];
    if (!anchors.length) {
      alert.innerHTML = alert.innerHTML.replace('الطلبات التي حجزتها حالياً', 'الطلبات الجاري العمل عليها حاليا');
      return;
    }

    const rows = anchors.map((anchor) => {
      const id = anchor.textContent.trim();
      const req = findRequestById(id);
      return {
        id,
        href: anchor.getAttribute('href'),
        name: req ? getDashboardEntityName(req) : '—',
        statusHtml: req ? statusBadge(req.status || '—') : '—',
        lastUpdate: req ? (req.lastUpdate || req.submitDate || '—') : '—'
      };
    });

    const wrapper = document.createElement('div');
    wrapper.innerHTML = buildCurrentWorkTable(rows);
    alert.replaceWith(wrapper.firstElementChild);
  });
}

function normalizeDashboardTableWidths(content) {
  [...content.children].forEach((child) => {
    if (child.tagName === 'DIV' && (child.getAttribute('style') || '').includes('display:grid')) {
      child.classList.add('dashboard-auto-grid');
      child.querySelectorAll('.card').forEach((card) => {
        if (card.querySelector('.dtbl')) card.classList.add('dashboard-card-wide');
      });
    }
  });
}

let dashboardEnhanceQueued = false;

function enhanceDashboardContent() {
  if (typeof CURRENT_PAGE === 'undefined' || CURRENT_PAGE !== 'dashboard') return;
  const content = getContent();
  if (!content || !content.children.length) return;

  replaceCheckedOutSummary(content);
  normalizeDashboardTableWidths(content);

  const statsGrid = content.querySelector('.stats-grid');
  if (statsGrid && !content.querySelector('.dashboard-insights')) {
    const insightsWrapper = document.createElement('div');
    insightsWrapper.innerHTML = renderDashboardInsights(CURRENT_ROLE);
    if (insightsWrapper.firstElementChild) {
      statsGrid.insertAdjacentElement('afterend', insightsWrapper.firstElementChild);
    }
  }
}

function queueDashboardEnhancement() {
  if (dashboardEnhanceQueued) return;
  dashboardEnhanceQueued = true;
  setTimeout(() => {
    dashboardEnhanceQueued = false;
    enhanceDashboardContent();
  }, 0);
}

(function setupDashboardObserver() {
  const run = () => queueDashboardEnhancement();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  const observer = new MutationObserver(() => {
    if (typeof CURRENT_PAGE !== 'undefined' && CURRENT_PAGE === 'dashboard') {
      run();
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
