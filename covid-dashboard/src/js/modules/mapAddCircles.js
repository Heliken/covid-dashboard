import countries from './countries.js';
import toFixed from './toFixed.js';

export const circles = {};

export default (map) => {
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
        fillOpacity: 0.3,
        radius,
      }).addTo(map);
      const tooltip = `<strong>${country.country}</strong><br>
      Today infected: ${todayCases}<br>
      ${toFixed((todayCases / population) * 100, 3)}% of population
      `;
      circles[country.country].bindTooltip(tooltip);
    }
  });
};
