class Tooltip extends HTMLElement {
  constructor(element) {
    super();
    this._tooltipContainer;
    // this.element = element;
    this._tooltipText = "Some tooltip text";
    this.message = "Some tooltip text";
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = ` 
                <style>
                    div {
                        background-color: black;
                        color: white;
                        position: absolute;
                        z-index: 10;
                    }

                    :host {
                        position: relative;
                    }

                    span {
                        border: 1px solid black;
                        padding: 0.15rem 0.5rem;
                        text-align: center;
                        border-radius: 3px;
                        background-color: #ffcc00;
                        cursor: pointer;
                    }

                    span:hover {
                        background-color: #ffeb3b;
                    }
                </style>
                

                <slot>Some Default</slot> 
                <span> (?) </span> `;
    // const template = document.getElementById("tooltip-template");
    // this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }

    const tooltipIcon = this.shadowRoot.querySelector("span");

    // tooltipIcon.textContent = " (?)";
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
    this.style.position = "relative";
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;
    this._tooltipContainer.style.backgroundColor = "black";
    this._tooltipContainer.style.color = "white";
    this._tooltipContainer.style.position = "absolute";
    this._tooltipContainer.style.zIndex = "10";
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define("ak-tooltip", Tooltip);
