import { SignalWatcher } from "@lit-labs/preact-signals";
import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import "./descendants/my-descendants";
import { myDataObject } from "./global-state.signal";

// my-element.ts
@customElement("my-element")
export class MyElement extends SignalWatcher(LitElement) {
  static styles = [
    css`
      .container {
        display: flex;
        gap: 1rem;
        flex-direction: column;
        overflow-wrap: break-word;
      }
    `,
  ];

  render() {
    return html`
      <div class="container">
        <p>This Root works!</p>
        <p>I am only handling the data and the events</p>
        <code>${JSON.stringify(myDataObject)}</code>
        <my-child></my-child>
      </div>
    `;
  }
}
