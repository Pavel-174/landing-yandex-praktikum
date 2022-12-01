class Faq {
  constructor(item) {
    this._accordionText = item.accordionText;
    this._panelText = item.panelText;
  }

  _getTemplate() {
    this._faqElement = document
      .querySelector('.template-faq')
      .content.querySelector(".faq__item")
      .cloneNode(true);
  }

  getFaqElement() {
    this._getTemplate();

    this._faqElement.querySelector(".faq__accordion-text").textContent = this._accordionText;
    this._faqElement.querySelector(".faq__panel-text").textContent = this._panelText;

    this._setEventListeners();
    return this._faqElement;
  }

  _showPanel() {
    const panel = this._faqElement.querySelector(".faq__accordion").nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }

  _setEventListeners(){
    this._faqElement.addEventListener("click", () => {
      this._faqElement.querySelector(".faq__vector").classList.toggle("faq__vector_active")
      this._showPanel()
    })
  }
}

export default Faq;
