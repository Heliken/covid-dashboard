/* eslint-disable no-undef */
import 'leaflet/dist/leaflet-src.js';
import 'leaflet.bigimage';
import mapAddMarkers from './mapAddMarkers.js';
import mapLegendInit from './mapLegendInit.js';
import mapMenuInit from './mapMenuInit.js';
import mapFullscreenInit from './mapFullscreenInit.js';
import dom from './dom.js';

export default () => {
  const mymap = L.map('leafletMap', {
    maxBounds: ([[-90, -180], [90, 180]]),
    center: [47, 20],
    zoom: 5,
    zoomControl: false,
  });

  dom.map = mymap;

  L.control.zoom({ position: 'topright' }).addTo(mymap);
  L.control.BigImage({ printControlLabel: '💾' }).addTo(mymap);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    minZoom: 2,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'sk.eyJ1IjoiaGVsaWFzMTciLCJhIjoiY2tpeDA5bXM3M21qbjJzbGJzNG1xeHNjMSJ9.QSoz8QBNsWCVeXdMLQuvgQ',
  }).addTo(mymap);

  mapAddMarkers(mymap);

  mymap.whenReady(() => {
    mapLegendInit();
    mapMenuInit();
    mapFullscreenInit();
  });
};
