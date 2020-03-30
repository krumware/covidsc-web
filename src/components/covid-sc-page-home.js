import { LitElement, html, css } from 'lit-element';

// TODO: move these dependencies out of here
// UNUSED // import { google } from '@google/maps';

import './covid-sc-map.js';
import '@material/mwc-button';
import { IronFlex, IronFlexAlignment } from './flex-styles.js';
import './covid-sc-data-card.js';

export class CovidScPageHome extends LitElement {

  constructor() {
    super();
    // redundant placeholder
    this.countyList = [];
    this.map = {};
    this.hotspots = {};
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

        .module-content {
          margin: 4px 8px 4px 8px;
        }

        .module-footer {
          height: 24px;
          font-family: Roboto;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: normal;
          text-align: right;
          color: #393939;
          margin: 0px 8px 4px 8px;
        }

        .action-button {
          /* width: 200px; */
        }

        .action-button {
          margin: 8px;
          width: 100%;
          min-width: 288px;
          /* flex-grow: 1; */
          /* height: 48px; */ /* CANT CHANGE HEIGHT YET https://github.com/material-components/material-components-web-components/issues/81 */
        }

        .min-margin > covid-sc-data-card:nth-of-type(1) {
          margin-right: 8px;
        }
        .min-margin > covid-sc-data-card:nth-of-type(2) {
          margin-left: 8px;
        }

        .min-margin {
          min-width: 288px;
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

        mwc-button {
          --mdc-theme-primary: #e9437a;
          --mdc-theme-on-primary: white;
        }

        .data-table {
          border-radius: 4px;
          overflow:hidden;
        }
        .data-table-row {
          height: 48px;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: normal;
          color: #393939;
        }

        .data-table-row > div {
          flex: 1;
          text-align: left;
        }

        .data-table-row > div:nth-of-type(1) {
          /* flex: 1 1 100%; */
          margin-left: 10px;
        }

        .data-table > div:nth-of-type(even){
          background-color: #d8d8d8;
        }
        .data-table > div:nth-of-type(odd){
          background-color: #f0f0f0;
        }

        .footer {
          width: 100%;
          height: 41px;
          background-color: #393939;
          font-family: Roboto;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: normal;
          text-align: center;
          color: #d8d8d8;
        }
        .footer > div > a {
          color: #ffffff;
        }

        @media only screen and (min-width : 628px) {
          .action-button {
            /* width: 200px; */
          }

          .action-button {
            margin: 8px;
            min-width: 288px;
            flex-grow: 1;
            /* height: 48px; */ /* CANT CHANGE HEIGHT YET https://github.com/material-components/material-components-web-components/issues/81 */
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
        }
      `
    ];
  }

  render() {
    return html`

      <div class="layout vertical module-container">
        <div class="module-title">
          Get Help
        </div>
        <div class="layout horizontal center-justified wrap">
          <!--
            <a href="/symptoms" class="buttonlink"><mwc-button alt="Get help" unelevated class="action-button" label="CHECK SYMPTOMS"></mwc-button></a>
            <a href="/resources" class="buttonlink"><mwc-button alt="Get help" unelevated class="action-button" label="FIND RESOURCES"></mwc-button></a>
          -->
          <a href="https://covidnearyou.org/" target="_blank" class="layout flex action-button buttonlink"><mwc-button alt="Get help" unelevated label="CHECK SYMPTOMS" style="width: inherit;"></mwc-button></a>
          <a href="https://www.scdhec.gov/infectious-diseases/viruses/coronavirus-disease-2019-covid-19" target="_blank" class="layout flex action-button buttonlink"><mwc-button alt="Get help" unelevated label="FIND RESOURCES" style="width: inherit;"></mwc-button></a>
        </div>
      </div>
      <div class="layout vertical module-container">
        <div class="module-title">
          Confirmed Cases/Deaths
        </div>
        <div class="layout horizontal center-justified wrap">
          <div class="layout horizontal flex action-button min-margin" style="max-width:392px;">
            <covid-sc-data-card title="SC Cases"
              value="${(this.counts && this.counts.state && this.counts.state.confirmed) ? this.counts.state.confirmed : ''}"
              delta="${(this.counts && this.counts.state && this.counts.state.confirmedChanged) ? this.counts.state.confirmedChanged : ''}"
            ></covid-sc-data-card>
            <covid-sc-data-card title="SC Deaths"
              value="${(this.counts && this.counts.state && this.counts.state.deaths) ? this.counts.state.deaths : ''}"
              delta="${(this.counts && this.counts.state && this.counts.state.deathsChanged) ? this.counts.state.deathsChanged : ''}"
            ></covid-sc-data-card>
          </div>
          <div class="layout horizontal flex action-button min-margin" style="max-width:392px;">
            <covid-sc-data-card title="USA Cases"
              value="${(this.counts && this.counts.national && this.counts.national.confirmed) ? this.counts.national.confirmed : ''}"
              delta="${(this.counts && this.counts.national && this.counts.national.confirmedChanged) ? this.counts.national.confirmedChanged : ''}"
            ></covid-sc-data-card>
            <covid-sc-data-card title="USA Deaths"
              value="${(this.counts && this.counts.national && this.counts.national.deaths) ? this.counts.national.deaths : ''}"
              delta="${(this.counts && this.counts.national && this.counts.national.deathsChanged) ? this.counts.national.deathsChanged : ''}"
            ></covid-sc-data-card>
          </div>
          <!-- <covid-sc-data-card ghost></covid-sc-data-card>
          <covid-sc-data-card ghost></covid-sc-data-card>
          <covid-sc-data-card ghost></covid-sc-data-card>
          <covid-sc-data-card ghost></covid-sc-data-card> -->
        </div>
        <div class="module-footer">
          ${(this.counts && this.counts.national && this.counts.national.lastUpdate) ? `Updated ${this.counts.national.lastUpdate}` : ""}
        </div>
      </div>
      <div class="layout vertical module-container">
        <div class="module-title">
          Confirmed Cases/Deaths By Region
        </div>
        <covid-sc-map .map="${this.map}" .hotspots="${this.hotspots}" class="module-content" style="height:400px; box-sizing:border-box; width: calc(100%-8px);"></covid-sc-map>
        <div class="module-footer">
          ${(this.counts && this.counts.national && this.counts.national.lastUpdate) ? `Updated ${this.counts.national.lastUpdate}` : ""}
        </div>
      </div>
      <div class="layout vertical module-container">
        <div class="module-title">
          Confirmed Cases/Deaths By Region
        </div>
        <div class="layout vertical data-table module-content">
          <div class="layout horizontal center data-table-row">
            <div><b>County</b></div>
            <div class="layout horizontal center data-table-row">
              <div><b>Growth Rate</b></div>
              <div><b>Change</b></div>
            </div>
          </div>
          ${this.countyList.map(
            item => html`
              <div class="layout horizontal center data-table-row">
                <div>${item.County}:</div>
                <div class="layout horizontal center data-table-row">
                  <div>${item.Confirmed_POPADJ_GF}</div>
                  <div>(${item.Confirmed_POPADJ_GF_Change})</div>
                </div>
              </div>
            `
          )}
        </div>
        <div class="module-footer">
          ${(this.counts && this.counts.national && this.counts.national.lastUpdate) ? `Updated ${this.counts.national.lastUpdate}` : ""}
        </div>
      </div>
      <div class="footer layout vertical center-justified">
        <div>
          Powered by <a href="https://www.hank.ai/" class="buttonlink">Hank.ai</a> and <a href="https://www.krum.io/" class="buttonlink">Krumware</a>
        </div>
      </div>


    `;
  }

  firstUpdated() {
    this.getData();
    this.counts = {};
  }

  getData() {
    const statesToInclude = ['SC', 'NC', 'GA']; // we'll include the cases, deaths, and symptoms for these states
    const confirmedCircles = {};
    const deathCircles = {};
    const symptomCircles = {};
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);

    // var jsonfile = "https://mymed.udifi.com/data/covid_latest.json";
    // var jsonfile = "http://covidsc.com.s3-website.us-east-2.amazonaws.com/data/covid_latest.json";
    // var jsonfile = "https://d3e6xqdw3pm38f.cloudfront.net/data/covid_latest.json";
    const jsonfile = "https://covidsc.com/data/covid_latest.json?v=6";
    // var jsonfile = "data/covid_latest.json";
    console.log(`loading json file ${  jsonfile}`);
    function commas(num, decimalPlaces=0){
      return num.toLocaleString(undefined, {maximumFractionDigits:decimalPlaces})

    }


    fetch(jsonfile)
    .then(response => response.json())
    .then(data => {
      const strokeOpacity = 0.8;

      let HotCounties = [];

      data.forEach((d) => {
        d.LastUpdate = d.LastUpdate.replace(' ', 'T');
        if (d.Country === 'USA' && statesToInclude.includes(d.State) && d.County !== 'ALL'){
          HotCounties.push({State: d.State, County: d.County, Confirmed_POPADJ_GF: d.Confirmed_POPADJ_GF, Confirmed_POPADJ_GF_Change: d.Confirmed_POPADJ_GF_Change});
          // if (d.Deaths_Change != 0) { console.log(d.County + ' deaths up ' + d.Deaths_Change); }
          if (d.Confirmed > 0){
            confirmedCircles[d.County] = {
              center: {lat: d.Lat, lng: d.Long},
              population: d.Confirmed * 500,
              header: `${d.County  }, ${  d.State  } Confirmed Cases`,
              content: `${d.Confirmed  } confirmed cases (+${d.Confirmed_Change} since yesterday)`,
              color: '#FF0000',
              strokeOpacity
            };
          }
          if (d.Deaths>0) {
            deathCircles[d.County] = {
              center: {lat: d.Lat, lng: d.Long},
              population: d.Deaths * 700,
              header: `${d.County  }, SC Deaths`,
              content: `${d.Deaths  } deaths (+${d.Deaths_Change} since yesterday)`,
              color: '#0000FF',
              strokeOpacity
            };
          }
        }

        // calculate state counts
        if (d.Country === 'USA' && d.State === 'SC' && d.County === 'ALL') {
          this.counts.state = { "confirmed" : commas(d.Confirmed), "deaths" : commas(d.Deaths), "confirmedChanged" : commas(d.Confirmed_Change), "deathsChanged" : commas(d.Deaths_Change)};
          if(d.Confirmed_Change > 0) this.counts.state.confirmedChanged = `+${this.counts.state.confirmedChanged }`;
          if(d.Deaths_Change > 0) this.counts.state.deathsChanged = `+${this.counts.state.deathsChanged }`;
          this.counts.state.lastUpdate = new Date(d.LastUpdate).toLocaleDateString();
          console.log("State Counts", this.counts.state);
        }

        // this looks like the header counts for USA
        if (d.Country === 'USA' && d.State === 'ALL'){
          this.counts.national = { "confirmed" : commas(d.Confirmed), "deaths" : commas(d.Deaths), "confirmedChanged" : commas(d.Confirmed_Change), "deathsChanged" : commas(d.Deaths_Change)};
          if(d.Confirmed_Change > 0) this.counts.national.confirmedChanged = `+${this.counts.national.confirmedChanged }`;
          if(d.Deaths_Change > 0) this.counts.national.deathsChanged = `+${this.counts.national.deathsChanged }`;
          this.counts.national.lastUpdate = new Date(d.LastUpdate).toLocaleDateString();
          console.log("National Counts", this.counts.national);
        }

      });
      HotCounties = HotCounties.sort((a,b) => b.Confirmed_POPADJ_GF - a.Confirmed_POPADJ_GF); // sort descending

      for (let i = 0; i<HotCounties.length; i++){
        const countyObj = HotCounties[i];
        if (countyObj.Confirmed_POPADJ_GF > 10){
          // console.log(c.County + ': ' + c.Confirmed_POPADJ_GF);
          countyObj.County += " County";
          countyObj.Confirmed_POPADJ_GF = countyObj.Confirmed_POPADJ_GF.toFixed(2);
          countyObj.Confirmed_POPADJ_GF_Change = countyObj.Confirmed_POPADJ_GF_Change.toFixed(2);
          if (countyObj.Confirmed_POPADJ_GF_Change >= 0) {
            countyObj.Confirmed_POPADJ_GF_Change = `+${  countyObj.Confirmed_POPADJ_GF_Change}`;
          }
          this.countyList = [...this.countyList, countyObj];
        }
      }
      this.hotspots = { "confirmedCircles" : confirmedCircles, "deathCircles" : deathCircles };
      // console.log(confirmedCircles);
      this.requestUpdate();

    });
  }

}


customElements.define('covid-sc-page-home', CovidScPageHome);
