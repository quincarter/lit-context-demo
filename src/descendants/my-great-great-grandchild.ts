import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { myDataObject } from "../global-state.signal";
import { SignalWatcher } from "@lit-labs/preact-signals";

@customElement("my-great-great-grandchild")
export class MyGreatGrandchild extends SignalWatcher(LitElement) {
  render() {
    return html`
      ${myDataObject.value.metadata.date
        ? html`<h2>Test my Great Grandchild</h2>
    The Status is: ${myDataObject.value.metadata.status.toUpperCase()}
    <!--The Date set is: ${myDataObject.value.metadata.date}-->
    </div>`
        : html`
            <!--<my-great-great-grandchild></my-great-great-grandchild>-->
          `}
    `;
  }
}
