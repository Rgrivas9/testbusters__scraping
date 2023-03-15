const puppeteer = require("puppeteer");
const fs = require("fs");
const hrefList = require("../data/hrefCountries.json");
const { Console } = require("console");

const scrapping = async () => {
  const BASE_URL = `https://flagpedia.net`;

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();
  const scrappedCountries = [];
  let index = 0;
  for (const href of hrefList) {
    index++;
    await page.goto(BASE_URL + href);
    await page.waitForTimeout(200);
    const flag = await page.$eval(".flag-detail > picture > img", (n) => {
      return (
        "https://flagpedia.net/" +
        n.getAttribute("src").replace("w580", "w1160")
      );
    });
    const name = await page.$eval("#breadcrumbs > ol > .current", (n) => {
      return n.innerHTML;
    });
    const tableList = await page.$$eval(
      "#content > .table-dl > tbody > tr",
      (nodes) => {
        return nodes.map((node) => [
          node.querySelector("th").innerHTML,
          node.querySelector("td").innerHTML,
        ]);
      }
    );
    const table = {};
    for (const value of tableList) {
      table[value[0]] = value[1];
    }
    const status = table.Independent.replace("</span>", "").split(">");
    const area = parseInt(
      table["Total area"].split(" ")[0].match(/[0-9]/g).join("")
    );

    const population = parseInt(
      table.Population.split(" ")[0].match(/[0-9]/g).join("")
    );
    let continent = "";
    if (table.Continent != undefined) {
      const continent1 = table.Continent.replace("</a>", "").split(">");
      continent = continent1[continent1.length - 1];
    }
    const country = {
      id: index,
      name: name,
      official_name: table["Official name"],
      flag: flag,
      status: status[status.length - 1],
      capital: table["Capital city"],
      area: area,
      population: population,
      cities: [],
      currency: table.Currency != undefined ? table.Currency.split("<em>")[0].trim() : "",
      continent: continent,
    };
    scrappedCountries.push(country);
    await page.waitForTimeout(300);
    console.log(country);
  }
  await browser.close();

  const jsonCountriesScrapped = JSON.stringify(scrappedCountries);
  fs.writeFile(
    "C:\\Users\\rafae\\Desktop\\Scrapping countries\\data\\scrappedCountries.json",
    jsonCountriesScrapped,
    () => {
      console.log("Created 💚💚");
    }
  );
};
scrapping();
