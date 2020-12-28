import showCountryStatsTable1 from './showCountryStatsTable1';
import countries from './countries';
import chartBlock from './chartBlock';

export default (country) => {
  chartBlock.setCountryData(country);
  const countryFromStats = countries.stats.find((el) => el.country === country);
  showCountryStatsTable1(countryFromStats);
};
