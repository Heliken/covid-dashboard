import 'leaflet/dist/leaflet-src.js';
import countries from './countries.js';

export default () => {
  // eslint-disable-next-line no-undef
  const mymap = L.map('leafletMap', {
    maxBounds: ([[-90, -180], [90, 180]]),
    center: [47, 20],
    zoom: 5,
  });

  // eslint-disable-next-line no-undef
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'sk.eyJ1IjoiaGVsaWFzMTciLCJhIjoiY2tpeDA5bXM3M21qbjJzbGJzNG1xeHNjMSJ9.QSoz8QBNsWCVeXdMLQuvgQ',
  }).addTo(mymap);

  const circles = {};

  countries.stats.forEach((country) => {
    const { lat, long } = country.countryInfo;
    const { population, todayCases, cases } = country;
    const ratio = todayCases / population ? parseInt((todayCases / population) * 10000, 10) : 1;
    const radiusMin = 15000;
    const radiusMax = 100000;
    let radius = radiusMin * ratio;
    radius = radius < radiusMax ? radius : radiusMax;
    radius = radius > radiusMin ? radius : radiusMin;

    // if we have coordinates, then add circle on the map
    if (typeof lat === 'number' && typeof long === 'number') {
      // eslint-disable-next-line no-undef
      circles[country.country] = L.circle([lat, long], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius,
      }).addTo(mymap);
      const tooltip = `<strong>${country.country}</strong><br>
      Today infected: ${todayCases}<br>
      ${toFixed((todayCases / population) * 100, 3)}% of population
      `;
      circles[country.country].bindTooltip(tooltip);
    }
  });
};

// round float number to X digits after dot
function toFixed(value, precisionVal) {
  const precision = precisionVal || 0;
  const power = 10 ** precision;
  const absValue = Math.abs(Math.round(value * power));
  let result = (value < 0 ? '-' : '') + String(Math.floor(absValue / power));

  if (precision > 0) {
    const fraction = String(absValue % power);
    const padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
    result += `.${padding}${fraction}`;
  }
  return result;
}
