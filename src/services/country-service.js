import Continents from '../constants/continents';


// public api
let CountryService = {
  getCountryName: getCountryName
}
export default CountryService;


// methods definitions
function getCountryName(code) {
  // get all countries in a single array
  let all = [];
  all.push.apply(all, Continents.africa.countries);
  all.push.apply(all, Continents.asia.countries);
  all.push.apply(all, Continents.europe.countries);
  all.push.apply(all, Continents.northAmerica.countries);
  all.push.apply(all, Continents.southAmerica.countries);
  all.push.apply(all, Continents.oceania.countries);

  // get country matching code
  let country = _.filter(all, {code: code})[0];

  // get name of country
  let name = country.name || 'undefined';

  return name;
}