class Tabs {
  constructor(config, rendererContent) {
    this._tabs = config.tabsSelector;
    this._head = config.tabsHeadSelector;
    this._body = config.tabsBodySelector;
    this._caption = config.tabsCaptionSelector;
    this._captionActiveClass = config.tabsCaptionActiveClass;
    this._contentActiveClass = config.tabsContentActiveClass;
    this._rendererContent = rendererContent;
  }

  _getActiveTabName(head) {
    return head.querySelector(`.${this._captionActiveClass}`).dataset.tab;
  }

  _setActiveContent(head, body) {
    if (body.querySelector(`.${this._contentActiveClass}`)) {
      body
        .querySelector(`.${this._contentActiveClass}`)
        .classList.remove(this._contentActiveClass);
    }

    body
      .querySelector(`[data-tab=${this._getActiveTabName(head)}]`)
      .classList.add(this._contentActiveClass);
  }

  _onLoad(head, body) {
    if (!head.querySelector(`.${this._captionActiveClass}`)) {
      head.querySelector(this._caption).classList.add(this._captionActiveClass);
    }

    this._setActiveContent(head, body);
  }

  _onClick(head, body) {
    head.addEventListener("click", (e) => {
      const caption = e.target.closest(this._caption);
      if (!caption) return;
      if (caption.classList.contains(this._captionActiveClass)) return;

      if (head.querySelector(`.${this._captionActiveClass}`)) {
        head
          .querySelector(`.${this._captionActiveClass}`)
          .classList.remove(this._captionActiveClass);
      }

      caption.classList.add(this._captionActiveClass);

      this._setActiveContent(head, body);

      if (this._rendererContent) {
        this._rendererContent(this._getActiveTabName(head));
      }
    });
  }

  init() {
    const tabs = document.querySelector(this._tabs);
    const head = tabs.querySelector(this._head);
    const body = tabs.querySelector(this._body);

    this._onLoad(head, body);

    this._onClick(head, body);
  }
}

export default Tabs;
