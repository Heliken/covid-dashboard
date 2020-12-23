import dom from './dom.js';

export default (stats, country) => {
  dom.t1country.textContent = country;
  if (dom.t1radioLastDay.checked && dom.t1radioAllPopulation.checked) {
    dom.t1infected.textContent = stats.todayCases;
    dom.t1recovered.textContent = stats.todayRecovered;
    dom.t1dead.textContent = stats.todayDeaths;
  } else if (dom.t1radioLastDay.checked && dom.t1radioPer100k.checked) {
    dom.t1infected.textContent = parseInt((stats.todayCases * 100000)
      / stats.population, 10);
    dom.t1recovered.textContent = parseInt((stats.todayRecovered * 100000)
      / stats.population, 10);
    dom.t1dead.textContent = parseInt((stats.todayDeaths * 100000)
      / stats.population, 10);
  } else if (dom.t1radioAllTime.checked && dom.t1radioAllPopulation.checked) {
    dom.t1infected.textContent = stats.cases;
    dom.t1recovered.textContent = stats.recovered;
    dom.t1dead.textContent = stats.deaths;
  } else if (dom.t1radioAllTime.checked && dom.t1radioPer100k.checked) {
    dom.t1infected.textContent = parseInt((stats.cases * 100000)
        / stats.population, 10);
    dom.t1recovered.textContent = parseInt((stats.recovered * 100000)
        / stats.population, 10);
    dom.t1dead.textContent = parseInt((stats.deaths * 100000)
        / stats.population, 10);
  }
};
