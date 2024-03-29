import { LitElement, css, html } from "lit";

export class Chula extends LitElement {
   static properties = {
      chulaMessage: { type: String },
      showChula: { type: Boolean },
      chulaTime: { type: Number },
      eventName: { type: String },
      chulaBackColor: { type: String },
      chulaColor: { type: String },
   };

   static styles = css`
      :host {
         font-family: "Arial", sans-serif;
      }
      .chula-container {
         padding: 0.5rem;
         font-weight: bold;
         border-radius: 5px;
      }
   `;

   constructor() {
      super();
      this.chulaMessage = "This is a default text"; //default. Needed tag attribute.
      this.showChula = false;
      this.chulaTime = 0; //default. Needed tag attribute.
      this.timerId = 0;
      this.eventName; //default. Needed tag attribute.
      this.chulaBackColor = "black"; //default. Needed tag attribute.
      this.chulaColor = "white"; //default. Needed tag attribute.
   }

   connectedCallback() {
      super.connectedCallback();
      window.addEventListener(this.eventName, this._callChula);
   }
   disconnectedCallback() {
      super.disconnectedCallback();
      window.removeEventListener(this.eventName, this._callChula);
   }

   //maybe set the property of the event name here? maybe it's too late because the component was already initialized. Maybe at the constructor?
   _callChula = (event) => {
      if (event) {
         this.showChula = event.detail;

         clearTimeout(this.timerId);

         this.timerId = setTimeout(() => {
            this.showChula = false;
         }, this.chulaTime * 1000);
      }
   };

   render() {
      return html`
         <div
            class="chula-container"
            style="color: ${this.chulaColor};background-color: ${this
               .chulaBackColor}; ${this.showChula
               ? "display: block"
               : "display: none"}"
         >
            <p>${this.chulaMessage}</p>
         </div>
      `;
   }
}
customElements.define("my-chula", Chula);

//export function to use as npm package. Set event as parameter to use by user as needed.
//maybe it needs to be also a property passed to the chula tag.
export const callingChula = (eventName) => {
   const myEvent = new CustomEvent(eventName, {
      detail: true,
      bubbles: true,
      composed: true,
   });
   dispatchEvent(myEvent);
};

//User zone
const button = document.querySelector(".callChula-btn");

const eventName = "chula1";
button.addEventListener("click", () => callingChula(eventName));

//So basically I have two stratergies here. I need to pass the name of the event to the component.
//One option is by parameters to the tag. The other is trying to set an internal property at the constructor
//by reading the event? This is a problem because it needs to be done at the _callChula function that recives the event.
//Actually is the first strategy what is implemented.
