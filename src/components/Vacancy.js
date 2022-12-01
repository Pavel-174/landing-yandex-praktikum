class Vacancy {
  constructor(item, cardSelector) {
    this._title = item.title;
    this._price = item.price;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".vacancy-card")
      .cloneNode(true);
  }

  getCardElement() {
    this._getTemplate();

    this._cardElement.querySelector(".vacancy-card__title").innerText =
      this._title;
    this._cardElement.querySelector(".vacancy-card__price").textContent =
      this._price;

    return this._cardElement;
  }
}

export default Vacancy;
