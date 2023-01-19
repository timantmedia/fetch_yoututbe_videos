const puppeteer = require("puppeteer");
const queryup = "nodejs+tutorial";
const query = encodeURI(queryup);
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: "youtube.csv",
  header: [
      {id: 'title', title: 'TITLE'},
      {id: 'video', title: 'VIDEO'}
  ]
});

async function YTSearch(searchQuery) {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(
    `https://www.youtube.com/@AntMediaServer/videos`
  );
  await page.waitForSelector("div#contents");
  await page.waitForTimeout(10000);

  const titles = await page.evaluate(function () {

    return Array.from(
      document.querySelectorAll("ytd-rich-item-renderer a#video-title-link")
    ).map((el) => ({
      title: el.getAttribute("title"),
      video: "https://www.youtube.com" + el.getAttribute("href"),
    }));

  });

  await browser.close();

  const records = titles;

  await csvWriter.writeRecords(records);
  console.log(titles);
}

YTSearch(query);