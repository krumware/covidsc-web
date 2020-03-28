import { LitElement, html, css } from 'lit-element';

// TODO: move these dependencies out of here
// UNUSED // import { google } from '@google/maps';

export class CovidScMap extends LitElement {

  constructor() {
    super();
    // redundant placeholder
  }

  static get properties() {
    return {

    };
  }

  static get styles() {
    return css`
      :host {
        height: inherit;
        width: inherit;
      }
    `;
  }

  render() {
    return html`
      <div id="map" style="height:inherit; width: inherit"></div>
    `;
  }

  firstUpdated() {

    this.initMap();
  }

  initMap() {
    if (typeof window.google === 'undefined') {
      const script = document.createElement('script');
      // <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBx6seaJUAP-r-6eePDE1IGQCXosHcQZbY"></script>\
      const apiKey = "AIzaSyBx6seaJUAP-r-6eePDE1IGQCXosHcQZbY";
      script.src = `//maps.googleapis.com/maps/api/js?key=${apiKey}`;
      // script.async = true;
      script.onload = this.otherStuff.bind(this);
      document.body.append(script);

    } else {
      this.otherStuff();
    }
    // Create the map.
  }

  otherStuff() {

    var map = new window.google.maps.Map(this.shadowRoot.getElementById("map"), {
      zoom: 7.1,
      center: {lat: 33.7100, lng: -81.0348},
      mapTypeId: 'terrain'
    });
    //var map = initMap();
    //drawCircles(map, confirmedCircles);
    //drawCircles(map, deathCircles);
    return map;
  }
}

customElements.define('covid-sc-map', CovidScMap);
