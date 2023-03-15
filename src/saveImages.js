const fs = require("fs");

const saveImg = async () => {
  for (const country of require("../data/scrappedCountries.json")) {
    const response = await fetch(country.flag);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    let prefix = "";
    if (country.id < 10) {
      prefix += "0";
    }
    if (country.id < 100) {
      prefix += "0";
    }
    const name =
      prefix +
      country.id +
      "." +
      country.name.replaceAll(" ", "").toLowerCase();
    const noAcc = name
      .replaceAll("á", "a")
      .replaceAll("é", "e")
      .replaceAll("í", "i")
      .replaceAll("ó", "o")
      .replaceAll("ú", "u");
    const outputFileName = `${noAcc}.png`;
    fs.createWriteStream(`C:\\Users\\rafae\\Desktop\\Scrapping countries\\img\\${outputFileName}`).write(buffer);
  }
};

saveImg();
