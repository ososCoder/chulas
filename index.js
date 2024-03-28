import { LitElement, css, html } from "lit";

export class Chula extends LitElement {
   static properties = {
      chulaMessage: { type: String },
      showChula: { type: Boolean },
      chulaTime: { type: Number },
   };

   static styles = css`
      .chula-container {
         background-color: blue;
         padding: 0.5rem;
      }
   `;

   constructor() {
      super();
      this.chulaMessage;
      this.showChula = false;
      this.chulaTime = 0;
   }

   connectedCallback() {
      super.connectedCallback();
      window.addEventListener("call-chula", this._callChula);
   }
   disconnectedCallback() {
      super.disconnectedCallback();
      window.removeEventListener("call-chula", this._callChula);
   }

   _callChula = (event) => {
      if (event.detail) {
         this.showChula = event.detail;

         setTimeout(() => {
            this.showChula = false;
         }, this.chulaTime * 1000);
      }
   };

   render() {
      return html`
         <div
            class="chula-container"
            style="${this.showChula ? "display: block" : "display: none"}"
         >
            <p>${this.chulaMessage}</p>
         </div>
      `;
   }
}
customElements.define("my-chula", Chula);

const callingChula = () => {
   const myEvent = new CustomEvent("call-chula", {
      detail: true,
      bubbles: true,
      composed: true,
   });
   dispatchEvent(myEvent);
};

const button = document.querySelector(".callChula-btn");
button.addEventListener("click", callingChula);
