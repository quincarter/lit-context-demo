import { LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { html } from "@lit-labs/preact-signals";
import { myDataObject } from "../global-state.signal";

// my-grandchild.ts
@customElement('my-grandchild')
export class MyGrandchild extends LitElement {
  render() {
    return html`
      <div>Test my grandchild</div>
      <div style="color: rebeccapurple; font-weight: 600;">
        This is in the grand child component btw
        <!--<code>${JSON.stringify(myDataObject)}</code>-->
        ${
          myDataObject.value?.name
            ? html`
              <h3>Hello, my name is ${myDataObject}</h3>
            `
            : html``
        }
      </div>
      <slot></slot>
      <my-great-grandchild></my-great-grandchild>
    `;
  }
}