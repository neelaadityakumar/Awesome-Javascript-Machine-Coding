class Modal {
  constructor(triggerSelector, modalSelector, options = {}) {
    this.triggerBtns = document.querySelectorAll(triggerSelector);
    this.modal = document.querySelector(modalSelector);
    this.overlay = this.modal.querySelector(".overlay");
    this.closeBtn = this.modal.querySelector(".close");
    this.modalContainer = this.modal.querySelector(".modal-container");

    this.options = {
      closeOnOverlayClick: true,
      ...options,
    };

    this.init();
  }

  init() {
    // Open modal event
    this.triggerBtns.forEach((btn) =>
      btn.addEventListener("click", () => this.openModal())
    );

    // Close modal event
    this.closeBtn.addEventListener("click", () => this.closeModal());

    // Close when clicking outside (if enabled)
    if (this.options.closeOnOverlayClick) {
      this.overlay.addEventListener("click", (e) => this.handleOverlayClick(e));
    }
  }

  openModal() {
    this.modal.style.display = "block";
  }

  closeModal() {
    this.modal.style.display = "none";
  }

  handleOverlayClick(e) {
    if (!this.modalContainer.contains(e.target)) {
      this.closeModal();
    }
  }
}

document.querySelectorAll("[data-modal-target]").forEach((btn) => {
  const modalId = btn.getAttribute("data-modal-target");
  new Modal(`[data-modal-target="${modalId}"]`, `#${modalId}`);
});
