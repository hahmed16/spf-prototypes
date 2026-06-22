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