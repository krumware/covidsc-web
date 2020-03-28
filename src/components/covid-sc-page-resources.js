import { LitElement, html, css } from 'lit-element';

// TODO: move these dependencies out of here
// UNUSED // import { google } from '@google/maps';

import './covid-sc-map.js';
import '@material/mwc-button';
import { IronFlex, IronFlexAlignment } from './flex-styles.js';
import './covid-sc-data-card.js';

export class CovidScPageResources extends LitElement {

  constructor() {
    super();
    // redundant placeholder
  }

  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
    };
  }

  static get styles() {
    return [
      IronFlex,
      IronFlexAlignment,
      css`
        :host {
        }

        .app-footer {
          font-size: calc(12px + 0.5vmin);
          align-items: center;
        }

        .app-footer a {
          margin-left: 5px;
        }

        .action-button {
          width: 200px;
        }

        .action-button {
          margin: 8px;
          min-width: 288px;
          flex-grow: 1;
          /* height: 48px; */ /* CANT CHANGE HEIGHT YET https://github.com/material-components/material-components-web-components/issues/81 */
        }

        .module-container {
          font-family: Roboto;
          font-size: 16px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: normal;
          color: #393939;
        }

        .module-title {
          margin: 10px 8px 4px 8px;
          text-align: left;
        }

        covid-sc-data-card {
          min-width: 136px;
          max-width: 188px;
          height: 94px;
          flex-grow: 1;
        }

        covid-sc-data-card[ghost] {
          max-width: 188px;
          height: 0px;
          flex-grow: 1;
        }
        .buttonlink {
          text-decoration: none;
        }
      `
    ];
  }

  render() {
    return html`

      <div class="layout vertical module-container">
        resources
        <a href="/">return to home</a>
      </div>


    `;
  }

  firstUpdated() {

  }

}

customElements.define('covid-sc-page-resources', CovidScPageResources);
