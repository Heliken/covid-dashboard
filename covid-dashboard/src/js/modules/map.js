/* eslint-disable no-undef */
import 'leaflet/dist/leaflet-src.js';
import mapAddCircles, { circles } from './mapAddCircles.js';

export default () => {
  const mymap = L.map('leafletMap', {
    maxBounds: ([[-90, -180], [90, 180]]),
    center: [47, 20],
    zoom: 5,
    zoomControl: false,
  });

  L.control.zoom({ position: 'topright' }).addTo(mymap);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'sk.eyJ1IjoiaGVsaWFzMTciLCJhIjoiY2tpeDA5bXM3M21qbjJzbGJzNG1xeHNjMSJ9.QSoz8QBNsWCVeXdMLQuvgQ',
  }).addTo(mymap);

  mapAddCircles(mymap);
  console.log(circles);

  const testTooltip = document.querySelector('#testTooltip');
  testTooltip.addEventListener('click', () => {
    circles.Belarus.setTooltipContent('Stop Luka!');
  });
};
