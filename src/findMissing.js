const findMissingCountries = async () => {
  const data = await fetch("http://localhost:8080/api/v1/countries");
  const countries = await data.json();
  console.log(countries[0]);
  const ids = countries.map((country)=>country.id);
  ids.sort((a, b) => a - b);
  const missing = [];
  let index = 0;
  for (const id of ids) {
    index++;
    if (id != index) {
      missing.push(index);
      index++;
    }
  }
  console.log(missing);
};

findMissingCountries();
