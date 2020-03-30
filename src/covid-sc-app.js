import { LitElement, html, css } from 'lit-element';
import { installRouter } from 'pwa-helpers/router.js';

// TODO: move these dependencies out of here
// UNUSED // import { google } from '@google/maps';

import './components/covid-sc-page-home.js';
import './components/covid-sc-page-symptoms.js';
import './components/covid-sc-page-resources.js';
import '@material/mwc-button';
import '@material/mwc-top-app-bar';
import { IronFlex, IronFlexAlignment } from './components/flex-styles.js';

export class CovidScApp extends LitElement {

  constructor() {
    super();
    // redundant placeholder
    installRouter((location) => this.handleNavigation(location));
    this.location = "/";
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
          min-height: 100vh;
          /* display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start; */
          font-size: calc(10px + 2vmin);
          color: #1a2b42;
          margin: 0 auto;
          text-align: center;

          --mdc-theme-primary: #0b4192e0;
          --mdc-theme-on-primary: white;
        }

        main {
          margin-left: auto;
          margin-right: auto;
          flex-grow: 1;
          align-items: center;
          max-width: 816px;
        }

        .logo > svg {
          margin-top: 36px;
          animation: app-logo-spin infinite 20s linear;
        }

        @keyframes app-logo-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .app-footer {
          font-size: calc(12px + 0.5vmin);
          align-items: center;
        }

        .app-footer a {
          margin-left: 5px;
        }

        .action-button {
          margin: 8px;
          width: 288px;
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
      `
    ];
  }

  render() {
    return html`
      <mwc-top-app-bar dense>
        <div slot="title">COVID SC</div>
        <div><!-- content --></div>
      </mwc-top-app-bar>
      <main>
        ${this.page}
      </main>
    `;
  }

  renderPage(location){
    switch(location.pathname){
      case "/symptoms":
        return html`<covid-sc-page-symptoms></covid-sc-page-symptoms>`;
      case "/resources":
        return html`<covid-sc-page-resources></covid-sc-page-resources>`;
      default:
        return html`<covid-sc-page-home></covid-sc-page-home>`;
    }
  }

  firstUpdated() {

  }

  handleNavigation(location){
    this.location = location;
    this.page = this.renderPage(location);
  }

}

customElements.define('covid-sc-app', CovidScApp);
