class Popup {
  constructor({ popupSelector }) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
    this._handleClickClose = this._handleClickClose.bind(this);
  }
  open() {
    this._popup.classList.add("popup_visible");
    document.addEventListener("keydown", this._handleEscapeClose);
  }
  close() {
    this._popup.classList.remove("popup_visible");
    document.removeEventListener("keydown", this._handleEscapeClose);
  }
  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  _handleClickClose(evt) {
    if (
      evt.target === this._popup ||
      evt.target.classList.contains("popup__close")
    ) {
      this.close();
    }
  }
  setEventListeners() {
    this._popup.addEventListener("click", this._handleClickClose);
  }
}

export default Popup;
