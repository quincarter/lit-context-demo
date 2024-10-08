import { LitElement, css } from "lit";
import { customElement } from "lit/decorators.js";
import { myDataObject } from "../global-state.signal";
import { html } from "@lit-labs/preact-signals";

@customElement('my-great-grandchild')
export class MyGreatGreatGrandchild extends LitElement {
  static styles = [
    css`
      .wrapper {
        display: grid;
        gap: 1rem;
        position: relative;
        margin-block: 2rem;
      }

      .wrapper-item {
        align-items: center;
        display: flex;
        flex-direction: row;
        gap: 1rem;
      }

      .tags {
        display: grid;
        gap: 0.5rem;
        grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
        width: 100%;
      }

      .tags div {
        background: lightgrey;
        border-radius: 10px;
        padding: 0.5rem;
      }

      .status {
        padding: 1rem;
        border: 1px solid lightgrey;
        border-radius: 15px;
        width: fit-content;
        font-weight: 800;
      }

      .danger {
        background: tomato;
        color: #fff;
      }

      .success {
        background: green;
        color: #fff;
      }
    `,
  ];

  render() {
    return html`
      <code>${JSON.stringify(myDataObject)}</code>
      <div class="wrapper">
        <h2>Metadata and Tagging</h2>
        <div class="wrapper-item">
          Status:
          <div
            class="status ${
              myDataObject.value.metadata.status.toUpperCase() === 'REJECTED'
                ? 'danger'
                : 'success'
            }"
          >
            ${myDataObject.value.metadata.status.toUpperCase()}
          </div>
        </div>
        <div class="wrapper-item">
          <div class="tags">
            ${myDataObject.value.tags.map(
              (item) =>
                html`
                  <div>${item}</div>
                `
            )}
          </div>
        </div>
      </div>
    `;
  }
}