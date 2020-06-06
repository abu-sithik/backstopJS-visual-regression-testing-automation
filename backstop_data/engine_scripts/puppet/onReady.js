const fs = require('fs');
const  cookiePath = "backstop_data/engine_scripts/cookies.json";

module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('./clickAndHoverHelper')(page, scenario);

  // add more ready handlers here...
  
};
