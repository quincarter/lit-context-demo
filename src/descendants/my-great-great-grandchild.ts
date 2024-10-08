import { LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { html } from "@lit-labs/preact-signals";
import { myDataObject } from "../global-state.signal";

@customElement('my-great-great-grandchild')
export class MyGreatGrandchild extends LitElement {
  render() {
    return html`
      ${
        myDataObject.value.metadata.date
          ? html`<h2>Test my Great Grandchild</h2>
    The Status is: ${myDataObject.value.metadata.status.toUpperCase()}
    <!--The Date set is: ${myDataObject.value.metadata.date}-->
    </div>`
          : html`
            <!--<my-great-great-grandchild></my-great-great-grandchild>-->
          `
      }
    `;
  }
}