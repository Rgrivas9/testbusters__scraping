const countries = require("../data/scrappedCountries.json");

const injectCountries = async () => {
  for (const country of countries) {
    await fetch("http://localhost:8080/api/v1/countries", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(country),
    });
  } 
  console.log('injected💚💛')
};
injectCountries();
