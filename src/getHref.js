const puppeteer = require("puppeteer");
const fs = require("fs");

const scrapping = async () => {
  const BASE_URL = "https://flagpedia.net/index";

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();

  await page.goto(BASE_URL);
  await page.waitForTimeout(500);

  const countriesHref = await page.$$eval(".flag-grid > li ", (nodes) => {
    return nodes.map((n) => n.querySelector("a").getAttribute("href"));
  });
  await browser.close();

  const jsonCountriesHref = JSON.stringify(countriesHref);
  fs.writeFile(
    "C:\\Users\\rafae\\Desktop\\Scrapping countries\\data\\hrefCountries.json",
    jsonCountriesHref,
    () => {
      console.log("Created 💚💚");
    }
  );
};
scrapping();
