import _ from 'lodash';

// constants
import Continents from '../constants/continents';


// public api
let CountryService = {
  getContinentIdWithCountryCode: getContinentIdWithCountryCode,
  getContinentNameWithId: getContinentNameWithId,
  getCountryName: getCountryName,
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

function getContinentIdWithCountryCode(code) {
  let id = undefined;

  if (isAfricanCountry(code)) {
    id = Continents.africa.id;
  }
  if (isAsianCountry(code)) {
    id = Continents.asia.id;
  }
  if (isEuropeanCountry(code)) {
    id = Continents.europe.id;
  }
  if (isNorthAmericanCountry(code)) {
    id = Continents.northAmerica.id;
  }
  if (isOceanianCountry(code)) {
    id = Continents.oceania.id;
  }
  if (isSouthAmericanCountry(code)) {
    id = Continents.southAmerica.id;
  }

  return id;
}

function getContinentNameWithId(id) {
  let name = '';

  let continent = _.filter(Continents, {id: id})[0];

  name = _.get(continent, 'name');

  return name;
}


// utils
function isAfricanCountry(code) {
  let country = _.filter(
    Continents.africa.countries,
    {code: code}
  );
  return country.length > 0;
}

function isAsianCountry(code) {
  let country = _.filter(
    Continents.asia.countries,
    {code: code}
  );
  return country.length > 0;
}

function isEuropeanCountry(code) {
  let country = _.filter(
    Continents.europe.countries,
    {code: code}
  );
  return country.length > 0;
}

function isNorthAmericanCountry(code) {
  let country = _.filter(
    Continents.northAmerica.countries,
    {code: code}
  );
  return country.length > 0;
}

function isOceanianCountry(code) {
  let country = _.filter(
    Continents.oceania.countries,
    {code: code}
  );
  return country.length > 0;
}

function isSouthAmericanCountry(code) {
  let country = _.filter(
    Continents.southAmerica.countries,
    {code: code}
  );
  return country.length > 0;
}
