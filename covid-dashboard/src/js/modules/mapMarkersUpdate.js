import countries from './countries.js';
import dom from './dom.js';
import { circles } from './mapAddMarkers.js';
import toFixed from './toFixed.js';

export default () => {
  const lastDay = dom.legendRadioLastDay.checked;
  const allTime = dom.legendRadioAllTime.checked;
  const allPopulation = dom.legendRadioAllPopulation.checked;
  const per100k = dom.legendRadioPer100k.checked;
  const select = dom.legendSelect.value;

  countries.stats.forEach((el) => {
    let toolTip = '';
    let ratio = 1; // radius ratio

    switch (select) {
      case 'cases':
        if (lastDay && allPopulation) {
          toolTip = `<strong>${el.country}</strong><br>
          Last day infected: ${el.todayCases}<br>
          ${toFixed((el.todayCases / el.population) * 100, 3)}% of population
          `;
          ratio = el.todayCases / el.population ? toFixed((el.todayCases / el.population) * 10000, 2) : 1;
        } else if (lastDay && per100k) {
          toolTip = `<strong>${el.country}</strong><br>
          Last day infected: ${parseInt(el.casesPerOneMillion / 10, 10)}<br> per 100K
          `;
          ratio = el.casesPerOneMillion ? toFixed(el.casesPerOneMillion / 10000, 2) : 1;
        } else if (allTime && allPopulation) {
          toolTip = `<strong>${el.country}</strong><br>
          Infected for all time: ${el.cases}<br>
          ${toFixed((el.cases / el.population) * 100, 3)}% of population
          `;
          ratio = el.cases / el.population ? toFixed((el.cases / el.population) * 100, 2) : 1;
        } else if (allTime && per100k) {
          toolTip = `<strong>${el.country}</strong><br>
          Infected per 100K: ${parseInt((el.cases * 100000) / el.population, 10)}<br> for all time
          `;
          ratio = el.cases / el.population ? toFixed(((el.cases * 100000) / el.population) / 1000, 2) * 0.9 : 1;
        }
        break;

        case 'recovered':
        if (lastDay && allPopulation) {
          toolTip = `<strong>${el.country}</strong><br>
          Last day recovered: ${el.todayRecovered}
          `;
          ratio = el.todayRecovered / el.population ? toFixed((el.todayRecovered / el.population) * 10000, 2) : 1;
        } else if (lastDay && per100k) {
          toolTip = `<strong>${el.country}</strong><br>
          Last day recovered: ${parseInt(el.recoveredPerOneMillion / 10, 10)}<br> per 100K
          `;
          ratio = el.todayRecovered / el.population ? toFixed((el.todayRecovered * 100000) / el.population, 2) / 8 : 1;
        } else if (allTime && allPopulation) {
          toolTip = `<strong>${el.country}</strong><br>
          Recovered for all time: ${el.cases}<br>
          ${toFixed((el.recovered / el.population) * 100, 3)}% of population
          `;
          ratio = el.recovered / el.population ? toFixed((el.recovered / el.population) * 200, 2) : 1;
        } else if (allTime && per100k) {
          toolTip = `<strong>${el.country}</strong><br>
          Recovered per 100K: ${parseInt(el.recoveredPerOneMillion, 10)}<br> for all time
          `;
          ratio = el.recoveredPerOneMillion ? toFixed((el.recoveredPerOneMillion / el.population) * 1000, 2) : 1;
        }
        break;

        case 'deaths':
        if (lastDay && allPopulation) {
          toolTip = `<strong>${el.country}</strong><br>
          Last day deaths: ${el.todayDeaths}
          `;
          ratio = el.todayDeaths / el.population ? toFixed((el.todayDeaths / el.population) * 1000000, 2) / 2 : 1;
        } else if (lastDay && per100k) {
          toolTip = `<strong>${el.country}</strong><br>
          Last day deaths: ${toFixed(el.deathsPerOneMillion / 10)}<br> per 100K
          `;
          ratio = el.todayDeaths / el.population ? toFixed((el.todayDeaths * 100000) / el.population, 2) * 4 : 1;
        } else if (allTime && allPopulation) {
          toolTip = `<strong>${el.country}</strong><br>
          Deaths for all time: ${el.deaths}<br>
          ${toFixed((el.deaths / el.population) * 100, 3)}% of population
          `;
          ratio = el.deaths / el.population ? toFixed((el.deaths / el.population) * 10000, 2) : 1;
        } else if (allTime && per100k) {
          toolTip = `<strong>${el.country}</strong><br>
          Deaths per 100K: ${el.deathsPerOneMillion / 10}<br> for all time
          `;
          ratio = el.deathsPerOneMillion ? toFixed(el.deathsPerOneMillion / 100, 2) / 1.5 : 1;
        }
        break;

      default: break;
    }

    circles[el.country].setTooltipContent(toolTip);

    const radiusMin = 15000;
    const radiusMax = 100000;
    let radius = radiusMin * ratio;
    radius = radius < radiusMax ? radius : radiusMax;
    radius = radius > radiusMin ? radius : radiusMin;

    circles.[el.country].setRadius(radius);
  });

};
