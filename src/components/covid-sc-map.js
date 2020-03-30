import { LitElement, html, css } from 'lit-element';

// TODO: move these dependencies out of here
// UNUSED // import { google } from '@google/maps';

export class CovidScMap extends LitElement {

  constructor() {
    super();
    // redundant placeholder
    this.spotmap = {};
    this.hotspots = [];
  }

  static get properties() {
    return {
      spotmap: { type: Object },
      hotspots: { type: Object },
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

    this.loadMap();
  }

  loadMap() {
    if (typeof window.google === 'undefined') {
      const script = document.createElement('script');
      // <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBx6seaJUAP-r-6eePDE1IGQCXosHcQZbY"></script>\
      const apiKey = "AIzaSyBx6seaJUAP-r-6eePDE1IGQCXosHcQZbY";
      script.src = `//maps.googleapis.com/maps/api/js?key=${apiKey}`;
      // script.async = true;
      script.onload = (function(){this.map = this.initMap();
        window.map = this.map;}).bind(this);
      document.body.append(script);

    } else {
      this.map = this.initMap();
      window.map = this.map;
    }
    // Create the map.
  }

  initMap() {
    const map = new window.google.maps.Map(this.shadowRoot.getElementById("map"), {
      zoom: 7.1,
      center: {lat: 33.7100, lng: -81.0348},
      mapTypeId: 'terrain'
    });
    // var map = initMap();
    // drawCircles(map, confirmedCircles);
    // drawCircles(map, deathCircles);

    console.log(map);
    return map;
  }

  drawCircles(map, spotmap){
    let infoWindow;
    // Construct the circle for each value in citymap.
    // Note: We scale the area of the circle based on the population.
    for (const spot in spotmap) {
      // Add the circle for this city to the map.
      // console.log('drawing circle @ ', spotmap[spot].center);
      spotmap[spot].center = {'lat': parseFloat(spotmap[spot].center.lat), 'lng': parseFloat(spotmap[spot].center.lng)};
      // console.log('drawing circle @ ', spotmap[spot].center);
      if (!spotmap[spot].hasOwnProperty('fillOpacity')){ spotmap[spot].fillOpacity = 0.35; }
      const spotCircle = new window.google.maps.Circle({
        strokeColor: spotmap[spot].color,
        strokeOpacity: spotmap[spot].strokeOpacity,
        strokeWeight: 0,
        fillColor: spotmap[spot].color,
        fillOpacity: spotmap[spot].fillOpacity,
        map,
        center: spotmap[spot].center,
        radius: Math.sqrt(spotmap[spot].population) * 100,
        clickable: true
      });
      spotmap[spot].contentString = `${'<div id="content">'+
        '<div id="covidDataInfo">'+
        '</div>'+
        '<h5 id="firstHeading" class="firstHeading">'}${spotmap[spot].header}</h5>`+
        `<div id="bodyContent">${spotmap[spot].content}</div>`+
        `</div>`;
      // create info window
/*
      google.maps.event.addListener(marker, 'mouseover', (function(marker) {
         return function() {
             var content = contentString;
             infoWindow.setContent(content);
             infoWindow.open(map, marker);
         }
       })(marker));  */

       infoWindow = new google.maps.InfoWindow();
       // console.log('Adding listener for ' + spotmap[spot].contentString);
       // console.log(spotCircle.getCenter());
       google.maps.event.addListener(spotCircle, 'click', (function(spotCircle, spot) {
        return function() {
            infoWindow.setContent(spotmap[spot].contentString);
            infoWindow.setPosition(spotCircle.getCenter());
            infoWindow.open(map);
        }
       })(spotCircle, spot));

    }
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      console.log(`${propName} changed. oldValue: ${oldValue}, ${changedProperties.get(propName)}`);
      if(propName === "hotspots"){
        if(this.hotspots.confirmedCircles){
          if(window.map) this.drawCircles(window.map, this.hotspots.confirmedCircles);
        }
      }
      if(propName === "hotspots"){
        if(this.hotspots.deathCircles){
          if(window.map) this.drawCircles(window.map, this.hotspots.deathCircles);
        }
      }

    });
  }

}

customElements.define('covid-sc-map', CovidScMap);
