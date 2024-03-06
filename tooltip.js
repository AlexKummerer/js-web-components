class Tooltip extends HTMLElement {
  constructor(element) {
    super();
    this._tooltipContainer;
    // this.element = element;
    this._tooltipText = "Some tooltip text";
    this.message = "Some tooltip text";
  }

  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }

    const tooltipIcon = document.createElement("span");


    tooltipIcon.textContent = " (?)";
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
    this.appendChild(tooltipIcon);
    this.element.appendChild(this);
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;
    this.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.removeChild(this._tooltipContainer);
  }
}

customElements.define("ak-tooltip", Tooltip);
