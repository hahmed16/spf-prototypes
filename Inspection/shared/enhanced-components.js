/**
 * Enhanced Shared Components for Inspection System
 * Contains advanced components for correspondence, maps, video calls, timeline, etc.
 */

// ==================== CONTACT LOG COMPONENT ====================

const _CL_METHODS = { 'هاتف': '📞', 'واتساب': '💬', 'بريد إلكتروني': '📧', 'مقابلة شخصية': '🤝', 'أخرى': '📋' };

const contactLogData = {
  complaints: [
    { id: 1, date: '2025-01-12', time: '09:15', method: 'هاتف', party: 'صاحب العمل — شركة الأفق للمقاولات', action: 'تم الاتصال لإبلاغه بتسجيل البلاغ وطلب توضيح حول تواريخ التوظيف. أفاد بأنه سيراجع السجلات وسيرسل المستندات خلال يومين.', recordedBy: 'سيف الأمري' },
    { id: 2, date: '2025-01-14', time: '13:40', method: 'واتساب', party: 'المؤمن عليه — محمد سالم الحارثي', action: 'إرسال رسالة تأكيد استلام البلاغ وطلب إرسال صورة من عقد العمل. استجاب المؤمن عليه بإرسال الصور خلال ساعة.', recordedBy: 'سيف الأمري' },
    { id: 3, date: '2025-01-20', time: '11:00', method: 'بريد إلكتروني', party: 'صاحب العمل — شركة الأفق للمقاولات', action: 'إرسال خطاب رسمي يطلب الحضور للمقر بتاريخ 2025-01-25. لم يرد حتى الآن.', recordedBy: 'منى البلوشي' },
  ],
  visits: [
    { id: 1, date: '2025-01-18', time: '10:30', method: 'هاتف', party: 'صاحب العمل — شركة الأفق للمقاولات', action: 'إبلاغ المنشأة بموعد الزيارة الدورية المقررة بتاريخ 2025-01-22 وطلب توفير الوصول للسجلات. تأكيد الحضور من مدير الموارد البشرية.', recordedBy: 'حاتم الزدجالي' },
    { id: 2, date: '2025-01-22', time: '15:45', method: 'مقابلة شخصية', party: 'مدير الموارد البشرية — شركة الأفق للمقاولات', action: 'تسليم نسخة من محضر الزيارة ومناقشة المخالفات المرصودة. طلب صاحب العمل مهلة 30 يوماً لتصحيح المخالفات.', recordedBy: 'حاتم الزدجالي' },
  ],
  appeals: [
    { id: 1, date: '2025-02-05', time: '12:00', method: 'هاتف', party: 'مقدم التظلم — صاحب العمل', action: 'إبلاغه بقيد التظلم وتوقع البت فيه خلال 15 يوم عمل. تأكيد استلام جميع المستندات المطلوبة.', recordedBy: 'سيف الأمري' },
  ],
};

function renderCorrespondenceDocumentation(entityType, entityId, userRole) {
  const list = (contactLogData[entityType] || []);
  const mid = 'clm-' + entityType + '-' + (entityId || '').replace(/[^a-z0-9]/gi, '-');
  const tid = 'clt-' + entityType + '-' + (entityId || '').replace(/[^a-z0-9]/gi, '-');

  const rows = list.length ? list.map(r => `
    <tr>
      <td style="white-space:nowrap">${r.date}<br><span class="tx3 fs11">${r.time}</span></td>
      <td style="white-space:nowrap">${_CL_METHODS[r.method] || '📋'} ${r.method}</td>
      <td style="white-space:nowrap">${r.party}</td>
      <td style="max-width:340px;white-space:normal;line-height:1.6;font-size:12.5px">${r.action}</td>
      <td class="tx3 fs11" style="white-space:nowrap">${r.recordedBy}</td>
    </tr>`).join('') :
    `<tr><td colspan="5" class="tx3 fs11" style="text-align:center;padding:20px">لا توجد تواصلات مسجلة بعد</td></tr>`;

  return `
    <div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <span class="tx3 fs11">${list.length} تواصل مسجل</span>
        <button class="btn btn-primary btn-sm" onclick="openContactLogModal('${mid}')">+ تسجيل تواصل</button>
      </div>
      <div class="tbl-wrap" id="${tid}">
        <table class="dtbl">
          <thead><tr>
            <th>التاريخ والوقت</th>
            <th>وسيلة التواصل</th>
            <th>الجهة</th>
            <th>الإجراء والرد</th>
            <th>بواسطة</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>

    <div id="${mid}" class="modal" style="display:none" onclick="if(event.target===this)closeContactLogModal('${mid}')">
      <div class="modal-content" style="max-width:520px">
        <div class="modal-header">
          <h3>تسجيل تواصل جديد</h3>
          <button class="modal-close" onclick="closeContactLogModal('${mid}')">&times;</button>
        </div>
        <div class="modal-body">
          <form id="${mid}-form" onsubmit="saveContactLog(event,'${entityType}','${tid}','${mid}')">
            <div class="fg fg-2" style="margin-bottom:0">
              <div class="fgrp">
                <label class="flbl">وسيلة التواصل <span class="req">*</span></label>
                <select class="fc" name="method" required>
                  ${Object.keys(_CL_METHODS).map(m => `<option>${m}</option>`).join('')}
                </select>
              </div>
              <div class="fgrp">
                <label class="flbl">الجهة المتواصل معها <span class="req">*</span></label>
                <input type="text" class="fc" name="party" placeholder="مثل: صاحب العمل، المؤمن عليه…" required>
              </div>
              <div class="fgrp">
                <label class="flbl">التاريخ <span class="req">*</span></label>
                <input type="date" class="fc" name="date" required>
              </div>
              <div class="fgrp">
                <label class="flbl">الوقت <span class="req">*</span></label>
                <input type="time" class="fc" name="time" required>
              </div>
            </div>
            <div class="fgrp">
              <label class="flbl">الإجراء والرد <span class="req">*</span></label>
              <textarea class="fc" name="action" rows="4" placeholder="صف ما تم التواصل بشأنه والرد أو الإجراء المتخذ…" required style="resize:vertical"></textarea>
            </div>
            <div style="display:flex;gap:8px;padding-top:4px">
              <button type="submit" class="btn btn-primary btn-sm">حفظ</button>
              <button type="button" class="btn btn-secondary btn-sm" onclick="closeContactLogModal('${mid}')">إلغاء</button>
            </div>
          </form>
        </div>
      </div>
    </div>`;
}

function openContactLogModal(mid) {
  const m = document.getElementById(mid);
  if (!m) return;
  m.querySelector('form').reset();
  m.style.display = 'flex';
}

function closeContactLogModal(mid) {
  const m = document.getElementById(mid);
  if (m) m.style.display = 'none';
}

function saveContactLog(event, entityType, tid, mid) {
  event.preventDefault();
  const form = event.target;
  const fd = new FormData(form);
  const rec = {
    id: Date.now(),
    date: fd.get('date'),
    time: fd.get('time'),
    method: fd.get('method'),
    party: fd.get('party'),
    action: fd.get('action'),
    recordedBy: 'المستخدم الحالي',
  };
  if (!contactLogData[entityType]) contactLogData[entityType] = [];
  contactLogData[entityType].unshift(rec);

  const tbody = document.querySelector('#' + tid + ' tbody');
  if (tbody) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="white-space:nowrap">${rec.date}<br><span class="tx3 fs11">${rec.time}</span></td>
      <td style="white-space:nowrap">${_CL_METHODS[rec.method] || '📋'} ${rec.method}</td>
      <td style="white-space:nowrap">${rec.party}</td>
      <td style="max-width:340px;white-space:normal;line-height:1.6;font-size:12.5px">${rec.action}</td>
      <td class="tx3 fs11" style="white-space:nowrap">${rec.recordedBy}</td>`;
    const emptyRow = tbody.querySelector('td[colspan]');
    if (emptyRow) emptyRow.closest('tr').remove();
    tbody.insertBefore(tr, tbody.firstChild);
    const countEl = tbody.closest('div').previousElementSibling?.querySelector('span');
    if (countEl) countEl.textContent = contactLogData[entityType].length + ' تواصل مسجل';
  }
  closeContactLogModal(mid);
  showToast('تم تسجيل التواصل بنجاح', 's');
}

// legacy alias — kept so any old calls still work
const sampleCorrespondenceData = {
  complaints: [
    {
      id: 1,
      type: 'incoming',
      date: '2025-01-15',
      sender: 'وزارة العمل',
      recipient: 'إدارة التفتيش',
      subject: 'طلب معلومات إضافية',
      reference: 'MW/2025/001',
      status: 'pending',
      priority: 'high',
      content: 'نرجو تزويدنا بمعلومات إضافية حول الشكوى رقم CMP-2025-0001',
      attachments: ['document1.pdf', 'document2.pdf'],
      createdAt: '2025-01-15T10:30:00',
      createdBy: 'أحمد محمد'
    },
    {
      id: 2,
      type: 'outgoing',
      date: '2025-01-16',
      sender: 'إدارة التفتيش',
      recipient: 'الشركة المشتكى عليها',
      subject: 'إشعار بالشكوى',
      reference: 'INS/2025/002',
      status: 'sent',
      priority: 'medium',
      content: 'تم استلام شكوى ضد شركتكم وسيتم التحقيق فيها',
      attachments: ['complaint_copy.pdf'],
      createdAt: '2025-01-16T14:20:00',
      createdBy: 'فاطمة علي'
    }
  ],
  visits: [
    {
      id: 1,
      type: 'outgoing',
      date: '2025-01-18',
      sender: 'إدارة التفتيش',
      recipient: 'المنشأة المستهدفة',
      subject: 'إشعار بزيارة تفتيشية',
      reference: 'VIS/2025/001',
      status: 'sent',
      priority: 'high',
      content: 'سيتم إجراء زيارة تفتيشية لمنشأتكم يوم 20/01/2025',
      attachments: ['visit_schedule.pdf'],
      createdAt: '2025-01-18T09:00:00',
      createdBy: 'محمد سالم'
    }
  ],
  appeals: [
    {
      id: 1,
      type: 'incoming',
      date: '2025-01-20',
      sender: 'المستأنف',
      recipient: 'لجنة الاستئناف',
      subject: 'استئناف على قرار التفتيش',
      reference: 'APP/2025/001',
      status: 'under_review',
      priority: 'high',
      content: 'نود استئناف القرار الصادر بتاريخ 15/01/2025',
      attachments: ['appeal_form.pdf', 'evidence.pdf'],
      createdAt: '2025-01-20T11:45:00',
      createdBy: 'سعيد أحمد'
    }
  ]
};

// ==================== LEGACY HELPERS (used by video-call, violations components) ====================

function _legacyRenderCorrespondenceDocumentation(entityType, entityId, userRole) {
  const correspondenceList = correspondenceData[entityType] || [];

  return `
    <div class="correspondence-container">
      <div class="correspondence-header">
        <div class="correspondence-title">
          <h3>سجل المراسلات</h3>
          <p class="correspondence-subtitle">إدارة وتتبع جميع المراسلات المتعلقة بهذا ${getEntityNameArabic(entityType)}</p>
        </div>
        <div class="correspondence-actions">
          <button class="btn btn-primary" onclick="addCorrespondence('${entityType}', '${entityId}')">
            <span class="btn-icon">+</span>
            إضافة مراسلة جديدة
          </button>
          <button class="btn btn-secondary" onclick="exportCorrespondence('${entityType}', '${entityId}')">
            <span class="btn-icon">📥</span>
            تصدير السجل
          </button>
        </div>
      </div>

      <div class="correspondence-filters">
        <div class="filter-group">
          <label>نوع المراسلة:</label>
          <select class="filter-select" id="filter-type-${entityType}-${entityId}" onchange="filterCorrespondence('${entityType}', '${entityId}')">
            <option value="all">الكل</option>
            <option value="incoming">واردة</option>
            <option value="outgoing">صادرة</option>
          </select>
        </div>
        <div class="filter-group">
          <label>الحالة:</label>
          <select class="filter-select" id="filter-status-${entityType}-${entityId}" onchange="filterCorrespondence('${entityType}', '${entityId}')">
            <option value="all">الكل</option>
            <option value="pending">قيد الانتظار</option>
            <option value="sent">مرسلة</option>
            <option value="under_review">قيد المراجعة</option>
            <option value="completed">مكتملة</option>
          </select>
        </div>
        <div class="filter-group">
          <label>الأولوية:</label>
          <select class="filter-select" id="filter-priority-${entityType}-${entityId}" onchange="filterCorrespondence('${entityType}', '${entityId}')">
            <option value="all">الكل</option>
            <option value="high">عالية</option>
            <option value="medium">متوسطة</option>
            <option value="low">منخفضة</option>
          </select>
        </div>
        <div class="filter-group">
          <label>البحث:</label>
          <input type="text" class="filter-input" id="search-${entityType}-${entityId}" placeholder="بحث في المراسلات..."
                 onkeyup="searchCorrespondence('${entityType}', '${entityId}', this.value)">
        </div>
      </div>

      <div class="correspondence-list" id="correspondence-list-${entityType}-${entityId}">
        ${correspondenceList.length > 0 ? correspondenceList.map(item => renderCorrespondenceItem(item, entityType, userRole)).join('') : renderEmptyCorrespondence()}
      </div>

      <div class="correspondence-stats">
        <div class="stat-item">
          <span class="stat-label">إجمالي المراسلات:</span>
          <span class="stat-value" id="stat-total-${entityType}-${entityId}">${correspondenceList.length}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">واردة:</span>
          <span class="stat-value" id="stat-incoming-${entityType}-${entityId}">${correspondenceList.filter(c => c.type === 'incoming').length}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">صادرة:</span>
          <span class="stat-value" id="stat-outgoing-${entityType}-${entityId}">${correspondenceList.filter(c => c.type === 'outgoing').length}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">قيد الانتظار:</span>
          <span class="stat-value" id="stat-pending-${entityType}-${entityId}">${correspondenceList.filter(c => c.status === 'pending').length}</span>
        </div>
      </div>
    </div>

    <div id="correspondence-modal-${entityType}-${entityId}" class="modal" style="display: none;">
      <div class="modal-content">
        <div class="modal-header">
          <h3 id="correspondence-modal-title">إضافة مراسلة جديدة</h3>
          <button class="modal-close" onclick="closeCorrespondenceModal('${entityType}', '${entityId}')">&times;</button>
        </div>
        <div class="modal-body">
          <form id="correspondence-form-${entityType}-${entityId}" onsubmit="saveCorrespondence(event, '${entityType}', '${entityId}')">
            <div class="form-row">
              <div class="form-group">
                <label>نوع المراسلة *</label>
                <select name="type" required>
                  <option value="incoming">واردة</option>
                  <option value="outgoing">صادرة</option>
                </select>
              </div>
              <div class="form-group">
                <label>التاريخ *</label>
                <input type="date" name="date" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>المرسل *</label>
                <input type="text" name="sender" required>
              </div>
              <div class="form-group">
                <label>المستلم *</label>
                <input type="text" name="recipient" required>
              </div>
            </div>
            <div class="form-group">
              <label>الموضوع *</label>
              <input type="text" name="subject" required>
            </div>
            <div class="form-group">
              <label>رقم المرجع</label>
              <input type="text" name="reference">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>الأولوية *</label>
                <select name="priority" required>
                  <option value="low">منخفضة</option>
                  <option value="medium" selected>متوسطة</option>
                  <option value="high">عالية</option>
                </select>
              </div>
              <div class="form-group">
                <label>الحالة *</label>
                <select name="status" required>
                  <option value="pending">قيد الانتظار</option>
                  <option value="sent">مرسلة</option>
                  <option value="under_review">قيد المراجعة</option>
                  <option value="completed">مكتملة</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label>المحتوى *</label>
              <textarea name="content" rows="5" required></textarea>
            </div>
            <div class="form-group">
              <label>المرفقات</label>
              <div class="file-upload">
                <input type="file" id="correspondence-files-${entityType}-${entityId}" multiple>
                <label for="correspondence-files-${entityType}-${entityId}" class="file-label">
                  <span>📎</span>
                  <span>اختر الملفات</span>
                </label>
                <div id="file-list-${entityType}-${entityId}" class="file-list"></div>
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">حفظ المراسلة</button>
              <button type="button" class="btn btn-secondary" onclick="closeCorrespondenceModal('${entityType}', '${entityId}')">إلغاء</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render individual correspondence item
 */
function renderCorrespondenceItem(item, entityType, userRole) {
  const typeIcon = item.type === 'incoming' ? '📥' : '📤';
  const typeClass = item.type === 'incoming' ? 'incoming' : 'outgoing';
  const statusClass = item.status;
  const priorityClass = item.priority;

  return `
    <div class="correspondence-item ${typeClass}" data-id="${item.id}">
      <div class="correspondence-item-header">
        <div class="correspondence-item-info">
          <span class="correspondence-type-icon">${typeIcon}</span>
          <div class="correspondence-item-details">
            <h4 class="correspondence-item-title">${item.subject}</h4>
            <div class="correspondence-item-meta">
              <span class="correspondence-reference">${item.reference}</span>
              <span class="correspondence-date">${formatDate(item.date)}</span>
            </div>
          </div>
        </div>
        <div class="correspondence-item-badges">
          <span class="badge badge-${statusClass}">${getStatusText(item.status)}</span>
          <span class="badge badge-${priorityClass}">${getPriorityText(item.priority)}</span>
        </div>
      </div>
      <div class="correspondence-item-body">
        <div class="correspondence-parties">
          <div class="correspondence-party">
            <span class="party-label">من:</span>
            <span class="party-value">${item.sender}</span>
          </div>
          <div class="correspondence-party">
            <span class="party-label">إلى:</span>
            <span class="party-value">${item.recipient}</span>
          </div>
        </div>
        <p class="correspondence-content">${item.content}</p>
        ${item.attachments && item.attachments.length > 0 ? `
          <div class="correspondence-attachments">
            <span class="attachments-label">المرفقات:</span>
            <div class="attachments-list">
              ${item.attachments.map(att => `
                <span class="attachment-item" onclick="viewAttachment('${att}')">
                  📎 ${att}
                </span>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
      <div class="correspondence-item-footer">
        <div class="correspondence-item-meta">
          <span class="created-by">تم الإنشاء بواسطة: ${item.createdBy}</span>
          <span class="created-at">${formatDateTime(item.createdAt)}</span>
        </div>
        <div class="correspondence-item-actions">
          <button class="btn-action btn-view" onclick="viewCorrespondence('${entityType}', ${item.id})" title="عرض التفاصيل">
            👁️
          </button>
          <button class="btn-action btn-edit" onclick="editCorrespondence('${entityType}', ${item.id})" title="تعديل">
            ✏️
          </button>
          <button class="btn-action btn-delete" onclick="deleteCorrespondence('${entityType}', ${item.id})" title="حذف">
            🗑️
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render empty correspondence state
 */
function renderEmptyCorrespondence() {
  return `
    <div class="correspondence-empty">
      <div class="empty-icon">📭</div>
      <h3>لا توجد مراسلات</h3>
      <p>لم يتم إضافة أي مراسلات بعد. ابدأ بإضافة مراسلة جديدة.</p>
    </div>
  `;
}

/**
 * Helper functions
 */
function getEntityNameArabic(entityType) {
  const names = {
    complaints: 'الشكوى',
    visits: 'الزيارة',
    appeals: 'الاستئناف'
  };
  return names[entityType] || entityType;
}

function getStatusText(status) {
  const texts = {
    pending: 'قيد الانتظار',
    sent: 'مرسلة',
    under_review: 'قيد المراجعة',
    completed: 'مكتملة'
  };
  return texts[status] || status;
}

function getPriorityText(priority) {
  const texts = {
    high: 'عالية',
    medium: 'متوسطة',
    low: 'منخفضة'
  };
  return texts[priority] || priority;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-SA');
}

function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('ar-SA');
}

// File upload handling (used by modals across the system)
document.addEventListener('change', function(e) {
  if (e.target && e.target.id && e.target.id.startsWith('correspondence-files-')) {
    const fileList = document.getElementById(e.target.id.replace('correspondence-files-', 'file-list-'));
    const files = e.target.files;

    fileList.innerHTML = '';
    Array.from(files).forEach(file => {
      const fileItem = document.createElement('div');
      fileItem.className = 'file-item';
      fileItem.innerHTML = `
        <span class="file-name">📎 ${file.name}</span>
        <span class="file-size">(${formatFileSize(file.size)})</span>
        <button type="button" class="file-remove" onclick="removeFile(this)">×</button>
      `;
      fileList.appendChild(fileItem);
    });
  }
});

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function removeFile(button) {
  button.parentElement.remove();
}

// ==================== GEOGRAPHIC MAPS COMPONENT ====================

/**
 * Sample geographic data for demonstration
 */
const sampleGeographicData = {
  regions: [
    {
      id: 1,
      name: 'محافظة مسقط',
      code: 'MUSCAT',
      coordinates: { lat: 23.59, lng: 58.38 },
      establishments: 150,
      complaints: 45,
      visits: 120,
      violations: 30,
      status: 'active'
    },
    {
      id: 2,
      name: 'محافظة ظفار',
      code: 'DHOFAR',
      coordinates: { lat: 17.02, lng: 54.09 },
      establishments: 200,
      complaints: 60,
      visits: 180,
      violations: 45,
      status: 'active'
    },
    {
      id: 3,
      name: 'محافظة شمال الباطنة',
      code: 'N_BATINAH',
      coordinates: { lat: 24.56, lng: 56.78 },
      establishments: 180,
      complaints: 55,
      visits: 160,
      violations: 35,
      status: 'active'
    },
    {
      id: 4,
      name: 'محافظة الداخلية',
      code: 'DAKHILIYAH',
      coordinates: { lat: 22.89, lng: 57.45 },
      establishments: 120,
      complaints: 35,
      visits: 100,
      violations: 25,
      status: 'active'
    }
  ],
  establishments: [
    {
      id: 1,
      name: 'شركة الأفق للتجارة',
      regionId: 1,
      coordinates: { lat: 23.61, lng: 58.59 },
      address: 'مسقط، منطقة الرحاب',
      sector: 'تجارة',
      employees: 50,
      complaints: 5,
      visits: 8,
      violations: 2,
      lastVisit: '2025-01-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'مصنع النور الصناعي',
      regionId: 3,
      coordinates: { lat: 24.35, lng: 56.71 },
      address: 'صحار، المنطقة الصناعية',
      sector: 'صناعة',
      employees: 200,
      complaints: 12,
      visits: 15,
      violations: 8,
      lastVisit: '2025-01-10',
      status: 'active'
    },
    {
      id: 3,
      name: 'مؤسسة الرؤية للخدمات',
      regionId: 2,
      coordinates: { lat: 17.01, lng: 54.12 },
      address: 'صلالة، المنطقة التجارية',
      sector: 'خدمات',
      employees: 30,
      complaints: 3,
      visits: 5,
      violations: 1,
      lastVisit: '2025-01-18',
      status: 'active'
    }
  ]
};

// Store geographic data in memory for CRUD operations
let geographicData = JSON.parse(JSON.stringify(sampleGeographicData));

/**
 * Render Geographic Maps Component
 * @param {string} entityType - Type of entity (complaints, visits, requests)
 * @param {string} entityId - ID of the specific entity
 * @param {string} userRole - Current user role
 * @returns {string} HTML content for geographic maps component
 */
function renderGeographicMaps(entityType, entityId, userRole) {
  const canManage = ['inspection-director', 'ops-analyst', 'field-head'].includes(userRole);
  const canView = ['inspector', 'field-officer'].includes(userRole);

  return `
    <div class="geographic-maps-container">
      <div class="geographic-maps-header">
        <div class="geographic-maps-title">
          <h3>الخرائط الجغرافية</h3>
          <p class="geographic-maps-subtitle">عرض وتحليل التوزيع الجغرافي للمنشآت والأنشطة</p>
        </div>
        <div class="geographic-maps-actions">
          ${canManage ? `
            <button class="btn btn-primary" onclick="addGeographicLocation('${entityType}', '${entityId}')">
              <span class="btn-icon">📍</span>
              إضافة موقع
            </button>
          ` : ''}
          <button class="btn btn-secondary" onclick="exportGeographicData('${entityType}', '${entityId}')">
            <span class="btn-icon">📥</span>
            تصدير البيانات
          </button>
        </div>
      </div>

      <div class="geographic-maps-filters">
        <div class="filter-group">
          <label>المنطقة:</label>
          <select class="filter-select" id="geo-filter-region-${entityType}-${entityId}" onchange="filterGeographicData('${entityType}', '${entityId}')">
            <option value="all">جميع المناطق</option>
            ${geographicData.regions.map(r => `<option value="${r.id}">${r.name}</option>`).join('')}
          </select>
        </div>
        <div class="filter-group">
          <label>القطاع:</label>
          <select class="filter-select" id="geo-filter-sector-${entityType}-${entityId}" onchange="filterGeographicData('${entityType}', '${entityId}')">
            <option value="all">جميع القطاعات</option>
            <option value="تجارة">تجارة</option>
            <option value="صناعة">صناعة</option>
            <option value="خدمات">خدمات</option>
            <option value="بناء">بناء</option>
          </select>
        </div>
        <div class="filter-group">
          <label>الحالة:</label>
          <select class="filter-select" id="geo-filter-status-${entityType}-${entityId}" onchange="filterGeographicData('${entityType}', '${entityId}')">
            <option value="all">الكل</option>
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
          </select>
        </div>
        <div class="filter-group">
          <label>البحث:</label>
          <input type="text" class="filter-input" id="geo-search-${entityType}-${entityId}" placeholder="بحث في المنشآت..."
                 onkeyup="searchGeographicData('${entityType}', '${entityId}', this.value)">
        </div>
      </div>

      <div class="geographic-maps-content">
        <div class="geographic-maps-map">
          <div class="map-placeholder">
            <div class="map-placeholder-icon">🗺️</div>
            <h4>الخريطة التفاعلية</h4>
            <p>عرض التوزيع الجغرافي للمنشآت والأنشطة</p>
            <div class="map-legend">
              <div class="legend-item">
                <span class="legend-color legend-active"></span>
                <span>نشط</span>
              </div>
              <div class="legend-item">
                <span class="legend-color legend-warning"></span>
                <span>تحت المراجعة</span>
              </div>
              <div class="legend-item">
                <span class="legend-color legend-danger"></span>
                <span>مخالفات</span>
              </div>
            </div>
          </div>
        </div>

        <div class="geographic-maps-list" id="geographic-maps-list-${entityType}-${entityId}">
          ${geographicData.establishments.length > 0
            ? geographicData.establishments.map(est => renderGeographicItem(est, entityType, userRole)).join('')
            : renderEmptyGeographic()}
        </div>
      </div>

      <div class="geographic-maps-stats">
        <div class="stat-item">
          <span class="stat-label">إجمالي المناطق:</span>
          <span class="stat-value" id="geo-stat-regions-${entityType}-${entityId}">${geographicData.regions.length}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">إجمالي المنشآت:</span>
          <span class="stat-value" id="geo-stat-establishments-${entityType}-${entityId}">${geographicData.establishments.length}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">الشكاوى:</span>
          <span class="stat-value" id="geo-stat-complaints-${entityType}-${entityId}">${geographicData.establishments.reduce((sum, e) => sum + e.complaints, 0)}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">الزيارات:</span>
          <span class="stat-value" id="geo-stat-visits-${entityType}-${entityId}">${geographicData.establishments.reduce((sum, e) => sum + e.visits, 0)}</span>
        </div>
      </div>
    </div>

    <div id="geographic-modal-${entityType}-${entityId}" class="modal" style="display: none;">
      <div class="modal-content">
        <div class="modal-header">
          <h3 id="geographic-modal-title">إضافة موقع جديد</h3>
          <button class="modal-close" onclick="closeGeographicModal('${entityType}', '${entityId}')">&times;</button>
        </div>
        <div class="modal-body">
          <form id="geographic-form-${entityType}-${entityId}" onsubmit="saveGeographicLocation(event, '${entityType}', '${entityId}')">
            <div class="form-group">
              <label>اسم المنشأة *</label>
              <input type="text" name="name" required>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>المنطقة *</label>
                <select name="regionId" required>
                  ${geographicData.regions.map(r => `<option value="${r.id}">${r.name}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label>القطاع *</label>
                <select name="sector" required>
                  <option value="تجارة">تجارة</option>
                  <option value="صناعة">صناعة</option>
                  <option value="خدمات">خدمات</option>
                  <option value="بناء">بناء</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label>العنوان *</label>
              <input type="text" name="address" required>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>خط العرض *</label>
                <input type="number" step="0.0001" name="lat" required>
              </div>
              <div class="form-group">
                <label>خط الطول *</label>
                <input type="number" step="0.0001" name="lng" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>عدد الموظفين</label>
                <input type="number" name="employees" min="0">
              </div>
              <div class="form-group">
                <label>الحالة</label>
                <select name="status">
                  <option value="active">نشط</option>
                  <option value="inactive">غير نشط</option>
                </select>
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">حفظ الموقع</button>
              <button type="button" class="btn btn-secondary" onclick="closeGeographicModal('${entityType}', '${entityId}')">إلغاء</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render individual geographic item
 */
function renderGeographicItem(item, entityType, userRole) {
  const region = geographicData.regions.find(r => r.id === item.regionId);
  const statusClass = item.status === 'active' ? 'active' : 'inactive';
  const canManage = ['inspection-director', 'ops-analyst', 'field-head'].includes(userRole);

  return `
    <div class="geographic-item ${statusClass}" data-id="${item.id}">
      <div class="geographic-item-header">
        <div class="geographic-item-info">
          <span class="geographic-item-icon">🏢</span>
          <div class="geographic-item-details">
            <h4 class="geographic-item-title">${item.name}</h4>
            <div class="geographic-item-meta">
              <span class="geographic-region">${region ? region.name : 'غير محدد'}</span>
              <span class="geographic-sector">${item.sector}</span>
            </div>
          </div>
        </div>
        <div class="geographic-item-badges">
          <span class="badge badge-${statusClass}">${item.status === 'active' ? 'نشط' : 'غير نشط'}</span>
        </div>
      </div>
      <div class="geographic-item-body">
        <div class="geographic-location">
          <span class="location-label">📍 العنوان:</span>
          <span class="location-value">${item.address}</span>
        </div>
        <div class="geographic-coordinates">
          <span class="coordinates-label">🌐 الإحداثيات:</span>
          <span class="coordinates-value">${item.coordinates.lat}, ${item.coordinates.lng}</span>
        </div>
        <div class="geographic-stats">
          <div class="geo-stat">
            <span class="geo-stat-label">الموظفين:</span>
            <span class="geo-stat-value">${item.employees}</span>
          </div>
          <div class="geo-stat">
            <span class="geo-stat-label">الشكاوى:</span>
            <span class="geo-stat-value">${item.complaints}</span>
          </div>
          <div class="geo-stat">
            <span class="geo-stat-label">الزيارات:</span>
            <span class="geo-stat-value">${item.visits}</span>
          </div>
          <div class="geo-stat">
            <span class="geo-stat-label">المخالفات:</span>
            <span class="geo-stat-value">${item.violations}</span>
          </div>
        </div>
      </div>
      <div class="geographic-item-footer">
        <div class="geographic-item-meta">
          <span class="last-visit">آخر زيارة: ${item.lastVisit ? formatDate(item.lastVisit) : 'لم يتم'}</span>
        </div>
        ${canManage ? `
          <div class="geographic-item-actions">
            <button class="btn-action btn-view" onclick="viewGeographicLocation('${entityType}', ${item.id})" title="عرض التفاصيل">
              👁️
            </button>
            <button class="btn-action btn-edit" onclick="editGeographicLocation('${entityType}', ${item.id})" title="تعديل">
              ✏️
            </button>
            <button class="btn-action btn-delete" onclick="deleteGeographicLocation('${entityType}', ${item.id})" title="حذف">
              🗑️
            </button>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

/**
 * Render empty geographic state
 */
function renderEmptyGeographic() {
  return `
    <div class="geographic-empty">
      <div class="empty-icon">🗺️</div>
      <h3>لا توجد مواقع</h3>
      <p>لم يتم إضافة أي مواقع بعد. ابدأ بإضافة موقع جديد.</p>
    </div>
  `;
}

/**
 * Geographic action functions
 */
function addGeographicLocation(entityType, entityId) {
  const modal = document.getElementById(`geographic-modal-${entityType}-${entityId}`);
  const title = document.getElementById('geographic-modal-title');
  const form = document.getElementById(`geographic-form-${entityType}-${entityId}`);

  title.textContent = 'إضافة موقع جديد';
  form.reset();
  form.dataset.editId = '';
  modal.style.display = 'block';
}

function editGeographicLocation(entityType, itemId) {
  const item = geographicData.establishments.find(e => e.id === itemId);
  if (!item) return;

  const modal = document.getElementById(`geographic-modal-${entityType}-1`);
  const title = document.getElementById('geographic-modal-title');
  const form = document.getElementById(`geographic-form-${entityType}-1`);

  title.textContent = 'تعديل الموقع';
  form.dataset.editId = itemId;

  form.querySelector('[name="name"]').value = item.name;
  form.querySelector('[name="regionId"]').value = item.regionId;
  form.querySelector('[name="sector"]').value = item.sector;
  form.querySelector('[name="address"]').value = item.address;
  form.querySelector('[name="lat"]').value = item.coordinates.lat;
  form.querySelector('[name="lng"]').value = item.coordinates.lng;
  form.querySelector('[name="employees"]').value = item.employees;
  form.querySelector('[name="status"]').value = item.status;

  modal.style.display = 'block';
}

function viewGeographicLocation(entityType, itemId) {
  const item = geographicData.establishments.find(e => e.id === itemId);
  if (!item) return;

  const region = geographicData.regions.find(r => r.id === item.regionId);

  alert(`تفاصيل الموقع:\n\nالاسم: ${item.name}\nالمنطقة: ${region ? region.name : 'غير محدد'}\nالقطاع: ${item.sector}\nالعنوان: ${item.address}\nالإحداثيات: ${item.coordinates.lat}, ${item.coordinates.lng}\nعدد الموظفين: ${item.employees}\nالحالة: ${item.status === 'active' ? 'نشط' : 'غير نشط'}\nالشكاوى: ${item.complaints}\nالزيارات: ${item.visits}\nالمخالفات: ${item.violations}\nآخر زيارة: ${item.lastVisit ? formatDate(item.lastVisit) : 'لم يتم'}`);
}

function deleteGeographicLocation(entityType, itemId) {
  if (confirm('هل أنت متأكد من حذف هذا الموقع؟')) {
    geographicData.establishments = geographicData.establishments.filter(e => e.id !== itemId);
    refreshGeographicList(entityType, '1');
  }
}

function closeGeographicModal(entityType, entityId) {
  const modal = document.getElementById(`geographic-modal-${entityType}-${entityId}`);
  modal.style.display = 'none';
}

function saveGeographicLocation(event, entityType, entityId) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const editId = form.dataset.editId;

  const geographicItem = {
    name: formData.get('name'),
    regionId: parseInt(formData.get('regionId')),
    sector: formData.get('sector'),
    address: formData.get('address'),
    coordinates: {
      lat: parseFloat(formData.get('lat')),
      lng: parseFloat(formData.get('lng'))
    },
    employees: parseInt(formData.get('employees')) || 0,
    status: formData.get('status'),
    complaints: 0,
    visits: 0,
    violations: 0,
    lastVisit: null
  };

  if (editId) {
    const index = geographicData.establishments.findIndex(e => e.id === parseInt(editId));
    if (index !== -1) {
      geographicData.establishments[index] = { ...geographicData.establishments[index], ...geographicItem, id: parseInt(editId) };
    }
  } else {
    geographicItem.id = Math.max(...geographicData.establishments.map(e => e.id), 0) + 1;
    geographicData.establishments.push(geographicItem);
  }

  closeGeographicModal(entityType, entityId);
  refreshGeographicList(entityType, entityId);
}

function filterGeographicData(entityType, entityId) {
  const regionFilter = document.getElementById(`geo-filter-region-${entityType}-${entityId}`).value;
  const sectorFilter = document.getElementById(`geo-filter-sector-${entityType}-${entityId}`).value;
  const statusFilter = document.getElementById(`geo-filter-status-${entityType}-${entityId}`).value;

  let filtered = geographicData.establishments;

  if (regionFilter !== 'all') {
    filtered = filtered.filter(e => e.regionId === parseInt(regionFilter));
  }
  if (sectorFilter !== 'all') {
    filtered = filtered.filter(e => e.sector === sectorFilter);
  }
  if (statusFilter !== 'all') {
    filtered = filtered.filter(e => e.status === statusFilter);
  }

  const listContainer = document.getElementById(`geographic-maps-list-${entityType}-${entityId}`);
  listContainer.innerHTML = filtered.length > 0
    ? filtered.map(item => renderGeographicItem(item, entityType, 'internal')).join('')
    : renderEmptyGeographic();
}

function searchGeographicData(entityType, entityId, searchTerm) {
  const listContainer = document.getElementById(`geographic-maps-list-${entityType}-${entityId}`);

  if (!searchTerm || searchTerm.trim() === '') {
    listContainer.innerHTML = geographicData.establishments.length > 0
      ? geographicData.establishments.map(item => renderGeographicItem(item, entityType, 'internal')).join('')
      : renderEmptyGeographic();
    return;
  }

  const term = searchTerm.toLowerCase();
  const filtered = geographicData.establishments.filter(e =>
    e.name.toLowerCase().includes(term) ||
    e.address.toLowerCase().includes(term) ||
    e.sector.toLowerCase().includes(term)
  );

  listContainer.innerHTML = filtered.length > 0
    ? filtered.map(item => renderGeographicItem(item, entityType, 'internal')).join('')
    : renderEmptyGeographic();
}

function exportGeographicData(entityType, entityId) {
  const data = geographicData.establishments;
  const csvContent = [
    ['الاسم', 'المنطقة', 'القطاع', 'العنوان', 'خط العرض', 'خط الطول', 'الموظفين', 'الحالة', 'الشكاوى', 'الزيارات', 'المخالفات'],
    ...data.map(e => {
      const region = geographicData.regions.find(r => r.id === e.regionId);
      return [
        e.name,
        region ? region.name : 'غير محدد',
        e.sector,
        e.address,
        e.coordinates.lat,
        e.coordinates.lng,
        e.employees,
        e.status === 'active' ? 'نشط' : 'غير نشط',
        e.complaints,
        e.visits,
        e.violations
      ];
    })
  ].map(row => row.join(',')).join('\n');

  const blob = new Blob(['﻿' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `geographic_data_${entityType}_${entityId}.csv`;
  link.click();
}

function refreshGeographicList(entityType, entityId) {
  const listContainer = document.getElementById(`geographic-maps-list-${entityType}-${entityId}`);
  listContainer.innerHTML = geographicData.establishments.length > 0
    ? geographicData.establishments.map(item => renderGeographicItem(item, entityType, 'internal')).join('')
    : renderEmptyGeographic();

  document.getElementById(`geo-stat-regions-${entityType}-${entityId}`).textContent = geographicData.regions.length;
  document.getElementById(`geo-stat-establishments-${entityType}-${entityId}`).textContent = geographicData.establishments.length;
  document.getElementById(`geo-stat-complaints-${entityType}-${entityId}`).textContent = geographicData.establishments.reduce((sum, e) => sum + e.complaints, 0);
  document.getElementById(`geo-stat-visits-${entityType}-${entityId}`).textContent = geographicData.establishments.reduce((sum, e) => sum + e.visits, 0);
}

// ==================== VIDEO CALL RECORDING COMPONENT ====================

/**
 * Sample video call data for demonstration
 */
const sampleVideoCallData = {
  recordings: [
    {
      id: 1,
      visitId: 'VIS-2025-0001',
      title: 'مكالمة فيديو مع مدير المنشأة',
      date: '2025-01-20',
      time: '10:30',
      duration: '00:45:30',
      participants: ['أحمد محمد (مفتش)', 'خالد العمري (مدير المنشأة)'],
      status: 'completed',
      recordingUrl: 'recording_001.mp4',
      thumbnail: 'thumbnail_001.jpg',
      notes: 'مناقشة حول المخالفات المكتشفة والمتطلبات التصحيحية',
      createdAt: '2025-01-20T10:30:00',
      createdBy: 'أحمد محمد'
    },
    {
      id: 2,
      visitId: 'VIS-2025-0002',
      title: 'مكالمة متابعة مع الموظفين',
      date: '2025-01-22',
      time: '14:15',
      duration: '00:30:15',
      participants: ['سعيد أحمد (مفتش)', 'محمد علي (موظف)', 'فاطمة حسن (موظف)'],
      status: 'completed',
      recordingUrl: 'recording_002.mp4',
      thumbnail: 'thumbnail_002.jpg',
      notes: 'متابعة حالة شكاوى الموظفين والاستفسارات',
      createdAt: '2025-01-22T14:15:00',
      createdBy: 'سعيد أحمد'
    }
  ]
};

// Store video call data in memory for CRUD operations
let videoCallData = JSON.parse(JSON.stringify(sampleVideoCallData));

/**
 * Render Video Call Recording Component
 * @param {string} visitId - ID of the visit
 * @param {string} userRole - Current user role
 * @returns {string} HTML content for video call recording component
 */
function renderVideoCallRecording(visitId, userRole) {
  const canRecord = ['inspection-director', 'field-head', 'field-inspector'].includes(userRole);
  const canView = ['monitoring-head', 'monitoring-employee', 'ops-analyst'].includes(userRole);
  const recordings = videoCallData.recordings.filter(r => r.visitId === visitId);

  return `
    <div class="video-call-recording-container">
      <div class="video-call-recording-header">
        <div class="video-call-recording-title">
          <h3>تسجيلات المكالمات المرئية</h3>
          <p class="video-call-recording-subtitle">إدارة وتشغيل تسجيلات المكالمات المرئية لهذه الزيارة</p>
        </div>
        <div class="video-call-recording-actions">
          ${canRecord ? `
            <button class="btn btn-primary" onclick="startVideoCall('${visitId}')">
              <span class="btn-icon">📹</span>
              بدء مكالمة جديدة
            </button>
          ` : ''}
          <button class="btn btn-secondary" onclick="exportVideoRecordings('${visitId}')">
            <span class="btn-icon">📥</span>
            تصدير التسجيلات
          </button>
        </div>
      </div>

      <div class="video-call-recording-filters">
        <div class="filter-group">
          <label>الحالة:</label>
          <select class="filter-select" id="video-filter-status-${visitId}" onchange="filterVideoRecordings('${visitId}')">
            <option value="all">الكل</option>
            <option value="completed">مكتملة</option>
            <option value="in_progress">قيد التسجيل</option>
            <option value="failed">فشلت</option>
          </select>
        </div>
        <div class="filter-group">
          <label>التاريخ:</label>
          <input type="date" class="filter-input" id="video-filter-date-${visitId}" onchange="filterVideoRecordings('${visitId}')">
        </div>
        <div class="filter-group">
          <label>البحث:</label>
          <input type="text" class="filter-input" id="video-search-${visitId}" placeholder="بحث في التسجيلات..."
                 onkeyup="searchVideoRecordings('${visitId}', this.value)">
        </div>
      </div>

      <div class="video-call-recording-list" id="video-call-recording-list-${visitId}">
        ${recordings.length > 0
          ? recordings.map(recording => renderVideoCallItem(recording, visitId, userRole)).join('')
          : renderEmptyVideoRecordings()}
      </div>

      <div class="video-call-recording-stats">
        <div class="stat-item">
          <span class="stat-label">إجمالي التسجيلات:</span>
          <span class="stat-value" id="video-stat-total-${visitId}">${recordings.length}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">إجمالي المدة:</span>
          <span class="stat-value" id="video-stat-duration-${visitId}">${calculateTotalDuration(recordings)}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">المكتملة:</span>
          <span class="stat-value" id="video-stat-completed-${visitId}">${recordings.filter(r => r.status === 'completed').length}</span>
        </div>
      </div>
    </div>

    <div id="video-modal-${visitId}" class="modal" style="display: none;">
      <div class="modal-content modal-large">
        <div class="modal-header">
          <h3 id="video-modal-title">تشغيل التسجيل</h3>
          <button class="modal-close" onclick="closeVideoModal('${visitId}')">&times;</button>
        </div>
        <div class="modal-body">
          <div class="video-player-container">
            <div class="video-placeholder">
              <div class="video-placeholder-icon">📹</div>
              <h4>مشغل الفيديو</h4>
              <p>في النظام الفعلي، سيتم تشغيل ملف الفيديو هنا</p>
              <div class="video-controls">
                <button class="video-control-btn" onclick="controlVideo('play')">▶️ تشغيل</button>
                <button class="video-control-btn" onclick="controlVideo('pause')">⏸️ إيقاف مؤقت</button>
                <button class="video-control-btn" onclick="controlVideo('stop')">⏹️ إيقاف</button>
              </div>
            </div>
          </div>
          <div class="video-details">
            <div class="video-detail-item">
              <span class="detail-label">العنوان:</span>
              <span class="detail-value" id="video-detail-title"></span>
            </div>
            <div class="video-detail-item">
              <span class="detail-label">التاريخ:</span>
              <span class="detail-value" id="video-detail-date"></span>
            </div>
            <div class="video-detail-item">
              <span class="detail-label">المدة:</span>
              <span class="detail-value" id="video-detail-duration"></span>
            </div>
            <div class="video-detail-item">
              <span class="detail-label">المشاركون:</span>
              <span class="detail-value" id="video-detail-participants"></span>
            </div>
            <div class="video-detail-item">
              <span class="detail-label">الملاحظات:</span>
              <span class="detail-value" id="video-detail-notes"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="video-call-modal-${visitId}" class="modal" style="display: none;">
      <div class="modal-content">
        <div class="modal-header">
          <h3>بدء مكالمة مرئية جديدة</h3>
          <button class="modal-close" onclick="closeVideoCallModal('${visitId}')">&times;</button>
        </div>
        <div class="modal-body">
          <form id="video-call-form-${visitId}" onsubmit="saveVideoCall(event, '${visitId}')">
            <div class="form-group">
              <label>عنوان المكالمة *</label>
              <input type="text" name="title" required placeholder="مثال: مكالمة مع مدير المنشأة">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>التاريخ *</label>
                <input type="date" name="date" required>
              </div>
              <div class="form-group">
                <label>الوقت *</label>
                <input type="time" name="time" required>
              </div>
            </div>
            <div class="form-group">
              <label>المشاركون *</label>
              <textarea name="participants" rows="3" required placeholder="أدخل أسماء المشاركون، كل اسم في سطر جديد"></textarea>
            </div>
            <div class="form-group">
              <label>ملاحظات</label>
              <textarea name="notes" rows="4" placeholder="أي ملاحظات حول المكالمة"></textarea>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">بدء التسجيل</button>
              <button type="button" class="btn btn-secondary" onclick="closeVideoCallModal('${visitId}')">إلغاء</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render individual video call item
 */
function renderVideoCallItem(item, visitId, userRole) {
  const statusClass = item.status;
  const canManage = ['inspection-director', 'field-head', 'field-inspector'].includes(userRole);

  return `
    <div class="video-call-item ${statusClass}" data-id="${item.id}">
      <div class="video-call-item-header">
        <div class="video-call-item-info">
          <span class="video-call-item-icon">📹</span>
          <div class="video-call-item-details">
            <h4 class="video-call-item-title">${item.title}</h4>
            <div class="video-call-item-meta">
              <span class="video-call-date">${formatDate(item.date)}</span>
              <span class="video-call-time">${item.time}</span>
              <span class="video-call-duration">⏱️ ${item.duration}</span>
            </div>
          </div>
        </div>
        <div class="video-call-item-badges">
          <span class="badge badge-${statusClass}">${getVideoStatusText(item.status)}</span>
        </div>
      </div>
      <div class="video-call-item-body">
        <div class="video-call-participants">
          <span class="participants-label">المشاركون:</span>
          <div class="participants-list">
            ${item.participants.map(p => `<span class="participant-item">${p}</span>`).join('')}
          </div>
        </div>
        ${item.notes ? `
          <div class="video-call-notes">
            <span class="notes-label">ملاحظات:</span>
            <p class="notes-content">${item.notes}</p>
          </div>
        ` : ''}
      </div>
      <div class="video-call-item-footer">
        <div class="video-call-item-meta">
          <span class="created-by">تم الإنشاء بواسطة: ${item.createdBy}</span>
          <span class="created-at">${formatDateTime(item.createdAt)}</span>
        </div>
        <div class="video-call-item-actions">
          <button class="btn-action btn-view" onclick="playVideoRecording('${visitId}', ${item.id})" title="تشغيل">
            ▶️
          </button>
          <button class="btn-action btn-download" onclick="downloadVideoRecording('${visitId}', ${item.id})" title="تحميل">
            📥
          </button>
          ${canManage ? `
            <button class="btn-action btn-delete" onclick="deleteVideoRecording('${visitId}', ${item.id})" title="حذف">
              🗑️
            </button>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

/**
 * Render empty video recordings state
 */
function renderEmptyVideoRecordings() {
  return `
    <div class="video-call-empty">
      <div class="empty-icon">📹</div>
      <h3>لا توجد تسجيلات</h3>
      <p>لم يتم إجراء أي مكالمات مرئية لهذه الزيارة بعد.</p>
    </div>
  `;
}

/**
 * Helper functions
 */
function getVideoStatusText(status) {
  const texts = {
    completed: 'مكتملة',
    in_progress: 'قيد التسجيل',
    failed: 'فشلت'
  };
  return texts[status] || status;
}

function calculateTotalDuration(recordings) {
  const totalSeconds = recordings.reduce((sum, r) => {
    const parts = r.duration.split(':');
    return sum + parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
  }, 0);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Video call action functions
 */
function startVideoCall(visitId) {
  const modal = document.getElementById(`video-call-modal-${visitId}`);
  const form = document.getElementById(`video-call-form-${visitId}`);

  form.reset();
  modal.style.display = 'block';
}

function closeVideoCallModal(visitId) {
  const modal = document.getElementById(`video-call-modal-${visitId}`);
  modal.style.display = 'none';
}

function saveVideoCall(event, visitId) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  const videoCall = {
    id: Math.max(...videoCallData.recordings.map(r => r.id), 0) + 1,
    visitId: visitId,
    title: formData.get('title'),
    date: formData.get('date'),
    time: formData.get('time'),
    duration: '00:00:00',
    participants: formData.get('participants').split('\n').filter(p => p.trim()),
    status: 'in_progress',
    recordingUrl: '',
    thumbnail: '',
    notes: formData.get('notes'),
    createdAt: new Date().toISOString(),
    createdBy: 'المستخدم الحالي'
  };

  videoCallData.recordings.push(videoCall);
  closeVideoCallModal(visitId);
  refreshVideoRecordingsList(visitId);

  alert('تم بدء تسجيل المكالمة المرئية بنجاح');
}

function playVideoRecording(visitId, recordingId) {
  const recording = videoCallData.recordings.find(r => r.id === recordingId);
  if (!recording) return;

  const modal = document.getElementById(`video-modal-${visitId}`);
  document.getElementById('video-detail-title').textContent = recording.title;
  document.getElementById('video-detail-date').textContent = `${formatDate(recording.date)} - ${recording.time}`;
  document.getElementById('video-detail-duration').textContent = recording.duration;
  document.getElementById('video-detail-participants').textContent = recording.participants.join(', ');
  document.getElementById('video-detail-notes').textContent = recording.notes || 'لا توجد ملاحظات';

  modal.style.display = 'block';
}

function closeVideoModal(visitId) {
  const modal = document.getElementById(`video-modal-${visitId}`);
  modal.style.display = 'none';
}

function controlVideo(action) {
  alert(`في النظام الفعلي، سيتم تنفيذ الإجراء: ${action}`);
}

function downloadVideoRecording(visitId, recordingId) {
  const recording = videoCallData.recordings.find(r => r.id === recordingId);
  if (!recording) return;

  alert(`تحميل التسجيل: ${recording.title}\n\nفي النظام الفعلي، سيتم تحميل ملف الفيديو`);
}

function deleteVideoRecording(visitId, recordingId) {
  if (confirm('هل أنت متأكد من حذف هذا التسجيل؟')) {
    videoCallData.recordings = videoCallData.recordings.filter(r => r.id !== recordingId);
    refreshVideoRecordingsList(visitId);
  }
}

function filterVideoRecordings(visitId) {
  const statusFilter = document.getElementById(`video-filter-status-${visitId}`).value;
  const dateFilter = document.getElementById(`video-filter-date-${visitId}`).value;

  let filtered = videoCallData.recordings.filter(r => r.visitId === visitId);

  if (statusFilter !== 'all') {
    filtered = filtered.filter(r => r.status === statusFilter);
  }
  if (dateFilter) {
    filtered = filtered.filter(r => r.date === dateFilter);
  }

  const listContainer = document.getElementById(`video-call-recording-list-${visitId}`);
  listContainer.innerHTML = filtered.length > 0
    ? filtered.map(item => renderVideoCallItem(item, visitId, 'internal')).join('')
    : renderEmptyVideoRecordings();
}

function searchVideoRecordings(visitId, searchTerm) {
  const listContainer = document.getElementById(`video-call-recording-list-${visitId}`);

  if (!searchTerm || searchTerm.trim() === '') {
    const recordings = videoCallData.recordings.filter(r => r.visitId === visitId);
    listContainer.innerHTML = recordings.length > 0
      ? recordings.map(item => renderVideoCallItem(item, visitId, 'internal')).join('')
      : renderEmptyVideoRecordings();
    return;
  }

  const term = searchTerm.toLowerCase();
  const filtered = videoCallData.recordings.filter(r =>
    r.visitId === visitId && (
      r.title.toLowerCase().includes(term) ||
      r.participants.some(p => p.toLowerCase().includes(term)) ||
      (r.notes && r.notes.toLowerCase().includes(term))
    )
  );

  listContainer.innerHTML = filtered.length > 0
    ? filtered.map(item => renderVideoCallItem(item, visitId, 'internal')).join('')
    : renderEmptyVideoRecordings();
}

function exportVideoRecordings(visitId) {
  const recordings = videoCallData.recordings.filter(r => r.visitId === visitId);

  if (recordings.length === 0) {
    alert('لا توجد تسجيلات للتصدير');
    return;
  }

  const csvContent = [
    ['العنوان', 'التاريخ', 'الوقت', 'المدة', 'المشاركون', 'الحالة', 'الملاحظات'],
    ...recordings.map(r => [
      r.title,
      r.date,
      r.time,
      r.duration,
      r.participants.join('; '),
      getVideoStatusText(r.status),
      r.notes || ''
    ])
  ].map(row => row.join(',')).join('\n');

  const blob = new Blob(['﻿' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `video_recordings_${visitId}.csv`;
  link.click();
}

function refreshVideoRecordingsList(visitId) {
  const recordings = videoCallData.recordings.filter(r => r.visitId === visitId);
  const listContainer = document.getElementById(`video-call-recording-list-${visitId}`);

  listContainer.innerHTML = recordings.length > 0
    ? recordings.map(item => renderVideoCallItem(item, visitId, 'internal')).join('')
    : renderEmptyVideoRecordings();

  document.getElementById(`video-stat-total-${visitId}`).textContent = recordings.length;
  document.getElementById(`video-stat-duration-${visitId}`).textContent = calculateTotalDuration(recordings);
  document.getElementById(`video-stat-completed-${visitId}`).textContent = recordings.filter(r => r.status === 'completed').length;
}

// ==================== VIOLATIONS & PENALTIES COMPONENT ====================

/**
 * Sample violations and penalties data for demonstration
 */
const sampleViolationsData = {
  violations: [
    {
      id: 1,
      type: 'contract',
      category: 'عدم التسجيل',
      description: 'عدم تسجيل العامل في نظام التأمينات الاجتماعية',
      severity: 'high',
      status: 'active',
      establishmentId: 'EST-001',
      workerId: 'WRK-001',
      discoveryDate: '2025-01-15',
      discoveryMethod: 'complaint',
      evidence: ['document1.pdf', 'photo1.jpg'],
      penalty: {
        type: 'fine',
        amount: 5000,
        currency: 'ر.ع',
        dueDate: '2025-02-15',
        status: 'pending'
      },
      correctiveActions: [
        { description: 'تسجيل العامل فوراً', deadline: '2025-01-20', status: 'pending' },
        { description: 'دفع الغرامات المستحقة', deadline: '2025-02-15', status: 'pending' }
      ],
      createdAt: '2025-01-15T10:00:00',
      createdBy: 'أحمد محمد'
    },
    {
      id: 2,
      type: 'wage',
      category: 'عدم دفع الأجور',
      description: 'عدم دفع الأجور المستحقة لمدة 3 أشهر',
      severity: 'critical',
      status: 'active',
      establishmentId: 'EST-002',
      workerId: 'WRK-002',
      discoveryDate: '2025-01-18',
      discoveryMethod: 'inspection',
      evidence: ['payroll_records.xlsx', 'worker_statement.pdf'],
      penalty: {
        type: 'fine',
        amount: 15000,
        currency: 'ر.ع',
        dueDate: '2025-02-18',
        status: 'pending'
      },
      correctiveActions: [
        { description: 'دفع الأجور المتأخرة', deadline: '2025-01-25', status: 'in_progress' },
        { description: 'تقديم خطة دفع الأجور', deadline: '2025-01-22', status: 'completed' }
      ],
      createdAt: '2025-01-18T14:30:00',
      createdBy: 'سعيد أحمد'
    },
    {
      id: 3,
      type: 'safety',
      category: 'مخالفة معايير السلامة',
      description: 'عدم توفير معدات السلامة اللازمة للعاملين',
      severity: 'medium',
      status: 'resolved',
      establishmentId: 'EST-003',
      workerId: null,
      discoveryDate: '2025-01-10',
      discoveryMethod: 'inspection',
      evidence: ['inspection_report.pdf', 'photos.zip'],
      penalty: {
        type: 'warning',
        amount: 0,
        currency: 'ر.ع',
        dueDate: null,
        status: 'resolved'
      },
      correctiveActions: [
        { description: 'توفير معدات السلامة', deadline: '2025-01-15', status: 'completed' },
        { description: 'تدريب العاملين على السلامة', deadline: '2025-01-20', status: 'completed' }
      ],
      createdAt: '2025-01-10T09:00:00',
      createdBy: 'محمد سالم'
    }
  ],
  penaltyTypes: [
    { id: 'fine', name: 'غرامة مالية', description: 'غرامة نقدية' },
    { id: 'warning', name: 'إنذار', description: 'إنذار رسمي' },
    { id: 'suspension', name: 'تعليق النشاط', description: 'تعليق مؤقت للنشاط' },
    { id: 'license_revocation', name: 'سحب الترخيص', description: 'سحب ترخيص المنشأة' }
  ],
  violationCategories: [
    { id: 'contract', name: 'عقود العمل', description: 'مخالفات تتعلق بعقود العمل' },
    { id: 'wage', name: 'الأجور', description: 'مخالفات تتعلق بدفع الأجور' },
    { id: 'safety', name: 'السلامة', description: 'مخالفات معايير السلامة' },
    { id: 'registration', name: 'التسجيل', description: 'مخالفات التسجيل في النظام' },
    { id: 'working_hours', name: 'ساعات العمل', description: 'مخالفات ساعات العمل' }
  ]
};

// Store violations data in memory for CRUD operations
let violationsData = JSON.parse(JSON.stringify(sampleViolationsData));

/**
 * Render Violations & Penalties Component
 * @param {string} entityType - Type of entity (complaints, visits, establishments)
 * @param {string} entityId - ID of the specific entity
 * @param {string} userRole - Current user role
 * @returns {string} HTML content for violations & penalties component
 */
function renderViolationsPenalties(entityType, entityId, userRole) {
  const canManage = ['inspection-director', 'field-head', 'field-inspector'].includes(userRole);
  const canView = ['monitoring-head', 'monitoring-employee', 'ops-analyst'].includes(userRole);
  const violations = violationsData.violations.filter(v =>
    v.establishmentId === entityId || v.workerId === entityId
  );

  return `
    <div class="violations-penalties-container">
      <div class="violations-penalties-header">
        <div class="violations-penalties-title">
          <h3>المخالفات والجزاءات</h3>
          <p class="violations-penalties-subtitle">إدارة وتتبع المخالفات والجزاءات المرتبطة</p>
        </div>
        <div class="violations-penalties-actions">
          ${canManage ? `
            <button class="btn btn-primary" onclick="addViolation('${entityType}', '${entityId}')">
              <span class="btn-icon">⚠️</span>
              إضافة مخالفة
            </button>
          ` : ''}
          <button class="btn btn-secondary" onclick="exportViolationsPenalties('${entityType}', '${entityId}')">
            <span class="btn-icon">📥</span>
            تصدير البيانات
          </button>
        </div>
      </div>

      <div class="violations-penalties-filters">
        <div class="filter-group">
          <label>النوع:</label>
          <select class="filter-select" id="violation-filter-type-${entityType}-${entityId}" onchange="filterViolations('${entityType}', '${entityId}')">
            <option value="all">الكل</option>
            ${violationsData.violationCategories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
          </select>
        </div>
        <div class="filter-group">
          <label>الشدة:</label>
          <select class="filter-select" id="violation-filter-severity-${entityType}-${entityId}" onchange="filterViolations('${entityType}', '${entityId}')">
            <option value="all">الكل</option>
            <option value="critical">حرجة</option>
            <option value="high">عالية</option>
            <option value="medium">متوسطة</option>
            <option value="low">منخفضة</option>
          </select>
        </div>
        <div class="filter-group">
          <label>الحالة:</label>
          <select class="filter-select" id="violation-filter-status-${entityType}-${entityId}" onchange="filterViolations('${entityType}', '${entityId}')">
            <option value="all">الكل</option>
            <option value="active">نشطة</option>
            <option value="in_progress">قيد المعالجة</option>
            <option value="resolved">تم الحل</option>
            <option value="closed">مغلقة</option>
          </select>
        </div>
        <div class="filter-group">
          <label>البحث:</label>
          <input type="text" class="filter-input" id="violation-search-${entityType}-${entityId}" placeholder="بحث في المخالفات..."
                 onkeyup="searchViolations('${entityType}', '${entityId}', this.value)">
        </div>
      </div>

      <div class="violations-penalties-list" id="violations-penalties-list-${entityType}-${entityId}">
        ${violations.length > 0
          ? violations.map(violation => renderViolationItem(violation, entityType, userRole)).join('')
          : renderEmptyViolations()}
      </div>

      <div class="violations-penalties-stats">
        <div class="stat-item">
          <span class="stat-label">إجمالي المخالفات:</span>
          <span class="stat-value" id="violation-stat-total-${entityType}-${entityId}">${violations.length}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">النشطة:</span>
          <span class="stat-value" id="violation-stat-active-${entityType}-${entityId}">${violations.filter(v => v.status === 'active').length}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">تم الحل:</span>
          <span class="stat-value" id="violation-stat-resolved-${entityType}-${entityId}">${violations.filter(v => v.status === 'resolved').length}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">إجمالي الغرامات:</span>
          <span class="stat-value" id="violation-stat-penalties-${entityType}-${entityId}">${calculateTotalPenalties(violations)} ر.ع</span>
        </div>
      </div>
    </div>

    <div id="violation-modal-${entityType}-${entityId}" class="modal" style="display: none;">
      <div class="modal-content">
        <div class="modal-header">
          <h3 id="violation-modal-title">إضافة مخالفة جديدة</h3>
          <button class="modal-close" onclick="closeViolationModal('${entityType}', '${entityId}')">&times;</button>
        </div>
        <div class="modal-body">
          <form id="violation-form-${entityType}-${entityId}" onsubmit="saveViolation(event, '${entityType}', '${entityId}')">
            <div class="form-row">
              <div class="form-group">
                <label>نوع المخالفة *</label>
                <select name="type" required>
                  ${violationsData.violationCategories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label>الشدة *</label>
                <select name="severity" required>
                  <option value="low">منخفضة</option>
                  <option value="medium">متوسطة</option>
                  <option value="high">عالية</option>
                  <option value="critical">حرجة</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label>وصف المخالفة *</label>
              <textarea name="description" rows="4" required placeholder="وصف تفصيلي للمخالفة"></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>تاريخ الاكتشاف *</label>
                <input type="date" name="discoveryDate" required>
              </div>
              <div class="form-group">
                <label>طريقة الاكتشاف *</label>
                <select name="discoveryMethod" required>
                  <option value="complaint">شكوى</option>
                  <option value="inspection">تفتيش</option>
                  <option value="audit">تدقيق</option>
                  <option value="report">تقرير</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label>نوع الجزاء *</label>
              <select name="penaltyType" required>
                ${violationsData.penaltyTypes.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
              </select>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>مبلغ الجزاء</label>
                <input type="number" name="penaltyAmount" min="0" placeholder="0 إذا لا يوجد">
              </div>
              <div class="form-group">
                <label>تاريخ الاستحقاق</label>
                <input type="date" name="penaltyDueDate">
              </div>
            </div>
            <div class="form-group">
              <label>الإجراءات التصحيحية</label>
              <textarea name="correctiveActions" rows="3" placeholder="أدخل الإجراءات التصحيحية المطلوبة، كل إجراء في سطر جديد"></textarea>
            </div>
            <div class="form-group">
              <label>الأدلة والوثائق</label>
              <div class="file-upload">
                <input type="file" id="violation-files-${entityType}-${entityId}" multiple>
                <label for="violation-files-${entityType}-${entityId}" class="file-label">
                  <span>📎</span>
                  <span>اختر الملفات</span>
                </label>
                <div id="violation-file-list-${entityType}-${entityId}" class="file-list"></div>
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">حفظ المخالفة</button>
              <button type="button" class="btn btn-secondary" onclick="closeViolationModal('${entityType}', '${entityId}')">إلغاء</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render individual violation item
 */
function renderViolationItem(item, entityType, userRole) {
  const severityClass = item.severity;
  const statusClass = item.status;
  const category = violationsData.violationCategories.find(c => c.id === item.type);
  const canManage = ['inspection-director', 'field-head', 'field-inspector'].includes(userRole);

  return `
    <div class="violation-item ${severityClass} ${statusClass}" data-id="${item.id}">
      <div class="violation-item-header">
        <div class="violation-item-info">
          <span class="violation-item-icon">⚠️</span>
          <div class="violation-item-details">
            <h4 class="violation-item-title">${item.description}</h4>
            <div class="violation-item-meta">
              <span class="violation-category">${category ? category.name : item.type}</span>
              <span class="violation-date">${formatDate(item.discoveryDate)}</span>
            </div>
          </div>
        </div>
        <div class="violation-item-badges">
          <span class="badge badge-${severityClass}">${getSeverityText(item.severity)}</span>
          <span class="badge badge-${statusClass}">${getStatusText(item.status)}</span>
        </div>
      </div>
      <div class="violation-item-body">
        <div class="violation-details">
          <div class="violation-detail">
            <span class="detail-label">طريقة الاكتشاف:</span>
            <span class="detail-value">${getDiscoveryMethodText(item.discoveryMethod)}</span>
          </div>
          <div class="violation-detail">
            <span class="detail-label">الجزاء:</span>
            <span class="detail-value">${item.penalty.type === 'fine' ? `${item.penalty.amount} ${item.penalty.currency}` : getPenaltyTypeText(item.penalty.type)}</span>
          </div>
          ${item.penalty.dueDate ? `
            <div class="violation-detail">
              <span class="detail-label">تاريخ الاستحقاق:</span>
              <span class="detail-value">${formatDate(item.penalty.dueDate)}</span>
            </div>
          ` : ''}
        </div>
        ${item.correctiveActions && item.correctiveActions.length > 0 ? `
          <div class="corrective-actions">
            <span class="actions-label">الإجراءات التصحيحية:</span>
            <div class="actions-list">
              ${item.correctiveActions.map(action => `
                <div class="action-item ${action.status}">
                  <span class="action-status">${getActionStatusIcon(action.status)}</span>
                  <span class="action-description">${action.description}</span>
                  <span class="action-deadline">${formatDate(action.deadline)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        ${item.evidence && item.evidence.length > 0 ? `
          <div class="violation-evidence">
            <span class="evidence-label">الأدلة:</span>
            <div class="evidence-list">
              ${item.evidence.map(e => `
                <span class="evidence-item" onclick="viewEvidence('${e}')">
                  📎 ${e}
                </span>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
      <div class="violation-item-footer">
        <div class="violation-item-meta">
          <span class="created-by">تم الإنشاء بواسطة: ${item.createdBy}</span>
          <span class="created-at">${formatDateTime(item.createdAt)}</span>
        </div>
        ${canManage ? `
          <div class="violation-item-actions">
            <button class="btn-action btn-view" onclick="viewViolation('${entityType}', ${item.id})" title="عرض التفاصيل">
              👁️
            </button>
            <button class="btn-action btn-edit" onclick="editViolation('${entityType}', ${item.id})" title="تعديل">
              ✏️
            </button>
            <button class="btn-action btn-delete" onclick="deleteViolation('${entityType}', ${item.id})" title="حذف">
              🗑️
            </button>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

/**
 * Render empty violations state
 */
function renderEmptyViolations() {
  return `
    <div class="violations-empty">
      <div class="empty-icon">⚠️</div>
      <h3>لا توجد مخالفات</h3>
      <p>لم يتم تسجيل أي مخالفات لهذا الكيان.</p>
    </div>
  `;
}

/**
 * Helper functions
 */
function getSeverityText(severity) {
  const texts = {
    critical: 'حرجة',
    high: 'عالية',
    medium: 'متوسطة',
    low: 'منخفضة'
  };
  return texts[severity] || severity;
}

function getDiscoveryMethodText(method) {
  const texts = {
    complaint: 'شكوى',
    inspection: 'تفتيش',
    audit: 'تدقيق',
    report: 'تقرير'
  };
  return texts[method] || method;
}

function getPenaltyTypeText(type) {
  const penalty = violationsData.penaltyTypes.find(p => p.id === type);
  return penalty ? penalty.name : type;
}

function getActionStatusIcon(status) {
  const icons = {
    pending: '⏳',
    in_progress: '🔄',
    completed: '✅',
    failed: '❌'
  };
  return icons[status] || '⏳';
}

function calculateTotalPenalties(violations) {
  return violations.reduce((sum, v) => sum + (v.penalty.amount || 0), 0);
}

/**
 * Violation action functions
 */
function addViolation(entityType, entityId) {
  const modal = document.getElementById(`violation-modal-${entityType}-${entityId}`);
  const title = document.getElementById('violation-modal-title');
  const form = document.getElementById(`violation-form-${entityType}-${entityId}`);

  title.textContent = 'إضافة مخالفة جديدة';
  form.reset();
  form.dataset.editId = '';
  modal.style.display = 'block';
}

function editViolation(entityType, itemId) {
  const item = violationsData.violations.find(v => v.id === itemId);
  if (!item) return;

  const modal = document.getElementById(`violation-modal-${entityType}-1`);
  const title = document.getElementById('violation-modal-title');
  const form = document.getElementById(`violation-form-${entityType}-1`);

  title.textContent = 'تعديل المخالفة';
  form.dataset.editId = itemId;

  form.querySelector('[name="type"]').value = item.type;
  form.querySelector('[name="severity"]').value = item.severity;
  form.querySelector('[name="description"]').value = item.description;
  form.querySelector('[name="discoveryDate"]').value = item.discoveryDate;
  form.querySelector('[name="discoveryMethod"]').value = item.discoveryMethod;
  form.querySelector('[name="penaltyType"]').value = item.penalty.type;
  form.querySelector('[name="penaltyAmount"]').value = item.penalty.amount || 0;
  form.querySelector('[name="penaltyDueDate"]').value = item.penalty.dueDate || '';
  form.querySelector('[name="correctiveActions"]').value = item.correctiveActions
    ? item.correctiveActions.map(a => a.description).join('\n')
    : '';

  modal.style.display = 'block';
}

function viewViolation(entityType, itemId) {
  const item = violationsData.violations.find(v => v.id === itemId);
  if (!item) return;

  const category = violationsData.violationCategories.find(c => c.id === item.type);
  const penaltyType = violationsData.penaltyTypes.find(p => p.id === item.penalty.type);

  alert(`تفاصيل المخالفة:\n\nالنوع: ${category ? category.name : item.type}\nالوصف: ${item.description}\nالشدة: ${getSeverityText(item.severity)}\nالحالة: ${getStatusText(item.status)}\nتاريخ الاكتشاف: ${formatDate(item.discoveryDate)}\nطريقة الاكتشاف: ${getDiscoveryMethodText(item.discoveryMethod)}\n\nالجزاء:\nالنوع: ${penaltyType ? penaltyType.name : item.penalty.type}\nالمبلغ: ${item.penalty.amount || 0} ${item.penalty.currency}\nتاريخ الاستحقاق: ${item.penalty.dueDate ? formatDate(item.penalty.dueDate) : 'غير محدد'}\n\nالإجراءات التصحيحية:\n${item.correctiveActions ? item.correctiveActions.map(a => `- ${a.description} (${getActionStatusIcon(a.status)})`).join('\n') : 'لا توجد إجراءات'}`);
}

function deleteViolation(entityType, itemId) {
  if (confirm('هل أنت متأكد من حذف هذه المخالفة؟')) {
    violationsData.violations = violationsData.violations.filter(v => v.id !== itemId);
    refreshViolationsList(entityType, '1');
  }
}

function closeViolationModal(entityType, entityId) {
  const modal = document.getElementById(`violation-modal-${entityType}-${entityId}`);
  modal.style.display = 'none';
}

function saveViolation(event, entityType, entityId) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const editId = form.dataset.editId;

  const violationItem = {
    type: formData.get('type'),
    severity: formData.get('severity'),
    description: formData.get('description'),
    discoveryDate: formData.get('discoveryDate'),
    discoveryMethod: formData.get('discoveryMethod'),
    penalty: {
      type: formData.get('penaltyType'),
      amount: parseInt(formData.get('penaltyAmount')) || 0,
      currency: 'ر.ع',
      dueDate: formData.get('penaltyDueDate') || null,
      status: 'pending'
    },
    correctiveActions: formData.get('correctiveActions')
      ? formData.get('correctiveActions').split('\n').filter(a => a.trim()).map(a => ({
          description: a.trim(),
          deadline: new Date().toISOString().split('T')[0],
          status: 'pending'
        }))
      : [],
    evidence: [],
    status: 'active',
    establishmentId: entityId,
    workerId: null,
    createdAt: new Date().toISOString(),
    createdBy: 'المستخدم الحالي'
  };

  if (editId) {
    const index = violationsData.violations.findIndex(v => v.id === parseInt(editId));
    if (index !== -1) {
      violationsData.violations[index] = { ...violationsData.violations[index], ...violationItem, id: parseInt(editId) };
    }
  } else {
    violationItem.id = Math.max(...violationsData.violations.map(v => v.id), 0) + 1;
    violationsData.violations.push(violationItem);
  }

  closeViolationModal(entityType, entityId);
  refreshViolationsList(entityType, entityId);
}

function filterViolations(entityType, entityId) {
  const typeFilter = document.getElementById(`violation-filter-type-${entityType}-${entityId}`).value;
  const severityFilter = document.getElementById(`violation-filter-severity-${entityType}-${entityId}`).value;
  const statusFilter = document.getElementById(`violation-filter-status-${entityType}-${entityId}`).value;

  let filtered = violationsData.violations.filter(v =>
    v.establishmentId === entityId || v.workerId === entityId
  );

  if (typeFilter !== 'all') {
    filtered = filtered.filter(v => v.type === typeFilter);
  }
  if (severityFilter !== 'all') {
    filtered = filtered.filter(v => v.severity === severityFilter);
  }
  if (statusFilter !== 'all') {
    filtered = filtered.filter(v => v.status === statusFilter);
  }

  const listContainer = document.getElementById(`violations-penalties-list-${entityType}-${entityId}`);
  listContainer.innerHTML = filtered.length > 0
    ? filtered.map(item => renderViolationItem(item, entityType, 'internal')).join('')
    : renderEmptyViolations();
}

function searchViolations(entityType, entityId, searchTerm) {
  const listContainer = document.getElementById(`violations-penalties-list-${entityType}-${entityId}`);

  if (!searchTerm || searchTerm.trim() === '') {
    const violations = violationsData.violations.filter(v =>
      v.establishmentId === entityId || v.workerId === entityId
    );
    listContainer.innerHTML = violations.length > 0
      ? violations.map(item => renderViolationItem(item, entityType, 'internal')).join('')
      : renderEmptyViolations();
    return;
  }

  const term = searchTerm.toLowerCase();
  const filtered = violationsData.violations.filter(v =>
    (v.establishmentId === entityId || v.workerId === entityId) &&
    (v.description.toLowerCase().includes(term) ||
     v.type.toLowerCase().includes(term))
  );

  listContainer.innerHTML = filtered.length > 0
    ? filtered.map(item => renderViolationItem(item, entityType, 'internal')).join('')
    : renderEmptyViolations();
}

function exportViolationsPenalties(entityType, entityId) {
  const violations = violationsData.violations.filter(v =>
    v.establishmentId === entityId || v.workerId === entityId
  );

  if (violations.length === 0) {
    alert('لا توجد مخالفات للتصدير');
    return;
  }

  const csvContent = [
    ['النوع', 'الوصف', 'الشدة', 'الحالة', 'تاريخ الاكتشاف', 'طريقة الاكتشاف', 'نوع الجزاء', 'المبلغ', 'تاريخ الاستحقاق'],
    ...violations.map(v => {
      const category = violationsData.violationCategories.find(c => c.id === v.type);
      const penaltyType = violationsData.penaltyTypes.find(p => p.id === v.penalty.type);
      return [
        category ? category.name : v.type,
        v.description,
        getSeverityText(v.severity),
        getStatusText(v.status),
        v.discoveryDate,
        getDiscoveryMethodText(v.discoveryMethod),
        penaltyType ? penaltyType.name : v.penalty.type,
        v.penalty.amount || 0,
        v.penalty.dueDate || ''
      ];
    })
  ].map(row => row.join(',')).join('\n');

  const blob = new Blob(['﻿' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `violations_penalties_${entityType}_${entityId}.csv`;
  link.click();
}

function viewEvidence(filename) {
  alert(`عرض الدليل: ${filename}\n\nفي النظام الفعلي، سيتم فتح الملف في عارض المرفقات.`);
}

function refreshViolationsList(entityType, entityId) {
  const violations = violationsData.violations.filter(v =>
    v.establishmentId === entityId || v.workerId === entityId
  );
  const listContainer = document.getElementById(`violations-penalties-list-${entityType}-${entityId}`);

  listContainer.innerHTML = violations.length > 0
    ? violations.map(item => renderViolationItem(item, entityType, 'internal')).join('')
    : renderEmptyViolations();

  document.getElementById(`violation-stat-total-${entityType}-${entityId}`).textContent = violations.length;
  document.getElementById(`violation-stat-active-${entityType}-${entityId}`).textContent = violations.filter(v => v.status === 'active').length;
  document.getElementById(`violation-stat-resolved-${entityType}-${entityId}`).textContent = violations.filter(v => v.status === 'resolved').length;
  document.getElementById(`violation-stat-penalties-${entityType}-${entityId}`).textContent = `${calculateTotalPenalties(violations)} ر.ع`;
}

/**
 * Render Geographic Analysis Screen
 * @param {string} userRole - Current user role
 * @returns {string} HTML content for geographic analysis screen
 */
function renderGeographicAnalysisScreen(userRole) {
  const canManage = ['inspection-director', 'ops-analyst', 'field-head'].includes(userRole);
  const canView = ['inspector', 'field-officer'].includes(userRole);

  return `
    <div class="page-header">
      <h1>التحليل الجغرافي</h1>
      <p>عرض وتحليل التوزيع الجغرافي للمنشآت والأنشطة التفتيشية</p>
    </div>

    <div class="dashboard-grid">
      <div class="card">
        <div class="ph">
          <h3><span class="pico bl">🗺️</span>نظرة عامة</h3>
        </div>
        <div class="pb">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">🏢</div>
              <div class="stat-info">
                <div class="stat-value">${geographicData.regions.length}</div>
                <div class="stat-label">المناطق</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🏭</div>
              <div class="stat-info">
                <div class="stat-value">${geographicData.establishments.length}</div>
                <div class="stat-label">المنشآت</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">📋</div>
              <div class="stat-info">
                <div class="stat-value">${geographicData.establishments.reduce((sum, e) => sum + e.complaints, 0)}</div>
                <div class="stat-label">الشكاوى</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🔍</div>
              <div class="stat-info">
                <div class="stat-value">${geographicData.establishments.reduce((sum, e) => sum + e.visits, 0)}</div>
                <div class="stat-label">الزيارات</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="ph">
          <h3><span class="pico tl">📊</span>إحصائيات المناطق</h3>
        </div>
        <div class="pb">
          <div class="regions-stats">
            ${geographicData.regions.map(region => `
              <div class="region-stat-item">
                <div class="region-stat-header">
                  <span class="region-name">${region.name}</span>
                  <span class="region-code">${region.code}</span>
                </div>
                <div class="region-stat-details">
                  <div class="region-stat">
                    <span class="region-stat-label">المنشآت:</span>
                    <span class="region-stat-value">${region.establishments}</span>
                  </div>
                  <div class="region-stat">
                    <span class="region-stat-label">الشكاوى:</span>
                    <span class="region-stat-value">${region.complaints}</span>
                  </div>
                  <div class="region-stat">
                    <span class="region-stat-label">الزيارات:</span>
                    <span class="region-stat-value">${region.visits}</span>
                  </div>
                  <div class="region-stat">
                    <span class="region-stat-label">المخالفات:</span>
                    <span class="region-stat-value">${region.violations}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="card full-width">
        <div class="ph">
          <h3><span class="pico bl">📍</span>الخرائط التفاعلية</h3>
        </div>
        <div class="pb" id="geographic-analysis-container">
          ${renderGeographicMaps('analysis', '1', userRole)}
        </div>
      </div>
    </div>
  `;
}