import { LitElement, html, css } from 'lit';
import { consume, provide, createContext } from '@lit/context';
import { property, state, customElement } from 'lit/decorators.js';

interface DataObjectInterface {
  name: string;
  title: string;
  description: string;
  metadata: ObjectMetaData;
  tags: string[];
}

interface ObjectMetaData {
  date: string;
  time: string;
  status: string;
}

// context file
const myContext = createContext(Symbol('my-context'));

// my-element.ts
@customElement('my-element')
class MyElement extends LitElement {
  /**
   * Providing a context at the root element to maintain application state
   */
  @provide({ context: myContext })
  @property({ attribute: false })
  myDataObject: DataObjectInterface = {
    name: null,
    title: null,
    description: null,
    metadata: {
      date: null,
      time: null,
      status: 'REJECTED',
    },
    tags: [],
  };

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

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot?.addEventListener('button-pushed', (e) => {
      // only updating tags but it is in a nested object and is an array of strings
      this.myDataObject = { ...this.myDataObject, tags: e.detail };
    });

    this.shadowRoot?.addEventListener('input-text-changed', (e) => {
      // only updating name but it is in a nested object
      this.myDataObject = { ...this.myDataObject, name: e.detail };
    });

    this.shadowRoot?.addEventListener('input-date-changed', (e) => {
      // only updating name but it is in a nested object
      this.myDataObject = {
        ...this.myDataObject,
        metadata: { ...this.myDataObject.metadata, date: e.detail },
      };
    });

    this.shadowRoot?.addEventListener('status-update', (e) => {
      // only updating name but it is in a nested object
      this.myDataObject = {
        ...this.myDataObject,
        metadata: { ...this.myDataObject.metadata, status: e.detail },
      };
    });
  }

  render() {
    return html`
      <div class="container">
        <p>This Root works!</p>
        <p>I am only handling the data and the events</p>
        <code>${JSON.stringify(this.myDataObject)}</code>
        <my-child my-status="${this.myDataObject.metadata.status}"></my-child>
      </div>
    `;
  }
}

// my-child.ts
// only has a button in it with an array to keep track of the clicks/state
@customElement('my-child')
class MyChild extends LitElement {
  @property({ type: String, attribute: 'my-status' })
  myStatus = '';

  @state()
  numberValue = 0;

  @state()
  tags = [];

  constructor() {
    super();
    this.numberValue = 0;
  }

  static styles = [
    css`
      .container {
        display: flex;
        gap: 1rem;
        flex-direction: column;
      }
      button {
        border-radius: 10px;
        padding: 1rem;
        cursor: pointer;
        color: #fff;
      }

      .purple {
        background: rebeccapurple;
      }

      .success {
        background: green;
      }

      .danger {
        background: tomato;
      }
    `,
  ];

  render() {
    return html`
      <div class="container">
        <div>My Child Works!</div>
        <input
          autocomplete="off"
          style="width: 100%"
          @input="${this._handleInput}"
          name="name"
          type="text"
          placeholder="update me and i will update the name property"
        />
        <!--<input @change="${this._handleInputDate}" type="date" />-->
        <my-grandchild></my-grandchild>
        <button class="purple" @click="${this._handleButtonClick}">
          This is in the child. Click me to see magic happen
        </button>
        <button
          class="status-change ${
            this.myStatus.toUpperCase() === 'REJECTED' ? 'success' : 'danger'
          }"
          @click="${this._handleStatusUpdate}"
        >
          ${this.myStatus.toUpperCase() === 'REJECTED' ? 'APPROVE' : 'REJECT'}
        </button>
      </div>
    `;
  }

  _createEvent(name: string, detail: any) {
    const event = new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail,
    });

    this.dispatchEvent(event);
  }

  _handleStatusUpdate(event) {
    this._createEvent(
      'status-update',
      this.myStatus.toUpperCase() === 'REJECTED' ? 'APPROVED' : 'REJECTED'
    );
  }

  _handleInput(event) {
    this._createEvent(
      'input-text-changed',
      this.shadowRoot.querySelector('input[type=text]').value
    );
  }

  _handleInputDate(event) {
    this._createEvent(
      'input-date-changed',
      this.shadowRoot.querySelector('input[type=date]').value
    );
  }

  _handleButtonClick(event) {
    this.tags.push(`Tag-${this.numberValue}`);
    this.numberValue++;
    this._createEvent('button-pushed', this.tags);
  }
}

// my-grandchild.ts
@customElement('my-grandchild')
class MyGrandchild extends LitElement {
  /**
   * Consuming the myContext provided from the root element
   */
  @consume({ context: myContext, subscribe: true })
  @state()
  myData: DataObjectInterface = {} as DataObjectInterface;

  render() {
    return html`
      <div>Test my grandchild</div>
      <div style="color: rebeccapurple; font-weight: 600;">
        This is in the grand child component btw
        <!--<code>${JSON.stringify(this.myData)}</code>-->
        ${
          this.myData?.name
            ? html`
              <h3>Hello, my name is ${this.myData.name}</h3>
            `
            : html``
        }
      </div>
      <slot></slot>
      <my-great-grandchild></my-great-grandchild>
    `;
  }
}

@customElement('my-great-great-grandchild')
class MyGreatGrandchild extends LitElement {
  /**
   * Consuming the myContext provided from the root element
   */
  @consume({ context: myContext, subscribe: true })
  @state()
  myData: DataObjectInterface = {} as DataObjectInterface;

  render() {
    return html`
      ${
        this.myData.metadata.date
          ? html`<h2>Test my Great Grandchild</h2>
    The Status is: ${this.myData.metadata.status.toUpperCase()}
    <!--The Date set is: ${this.myData.metadata.date}-->
    </div>`
          : html`
            <!--<my-great-great-grandchild></my-great-great-grandchild>-->
          `
      }
    `;
  }
}

@customElement('my-great-grandchild')
class MyGreatGreatGrandchild extends LitElement {
  /**
   * Consuming the myContext provided from the root element
   */
  @consume({ context: myContext, subscribe: true })
  myData: DataObjectInterface = {} as DataObjectInterface;

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
      <code>${JSON.stringify(this.myData)}</code>
      <div class="wrapper">
        <h2>Metadata and Tagging</h2>
        <div class="wrapper-item">
          Status:
          <div
            class="status ${
              this.myData.metadata.status.toUpperCase() === 'REJECTED'
                ? 'danger'
                : 'success'
            }"
          >
            ${this.myData.metadata.status.toUpperCase()}
          </div>
        </div>
        <div class="wrapper-item">
          <div class="tags">
            ${this.myData.tags.map(
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
