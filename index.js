require("dotenv").config();
const puppeteer = require("puppeteer");
const moment = require("moment");
const chalk = require("chalk");

const { USERNAME, PASSWORD, DAYS_TO_LOOK_AHEAD } = process.env;
const nextAvailableDate = moment().add(DAYS_TO_LOOK_AHEAD || 14, "days");

const formattedDate = nextAvailableDate.format("dddd, MMMM DD, YYYY");

let BEST_PLAYING_TIME = [
  "7:00 PM - 8:00 PM",
  "8:00 PM - 9:00 PM",
  "9:00 AM - 10:00 PM",
  "7:30 PM - 8:30 PM",
  "8:30 PM - 9:30 PM",
  "9:30 PM - 10:30 PM",
];

// If its a weekend, I have more available times.
// const DAY_SATURDAY = 6;
// const DAY_SUNDAY = 0;
// if (nextAvailableDate.day() === DAY_SATURDAY || nextAvailableDate.day() === DAY_SUNDAY) {
//   AVAILABLE_TIMES.concat([
//   "9:00 AM - 10:00 AM",
//   "10:00 AM - 11:00 AM",
//   "11:00 AM - 12:00 PM",
//     "12:00 PM - 1:00 PM",
//     "12:00 PM - 1:00 PM"
//   ])
// }

async function start() {
  const DATE_SELECTOR = `td[title="${nextAvailableDate.format(
    "dddd, MMMM DD, YYYY",
  )}"]`;
  console.log(
    chalk.blue(
      `🎾 Searching for Court Bookings on ${chalk.bold(formattedDate)}.`,
    ),
  );

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const navigationPromise = page.waitForNavigation();

  await page.goto("https://buildinglink.com/v2/global/login/login.aspx");

  await page.setViewport({ width: 1440, height: 766 });

  await page.waitForSelector("table #ctl00_Login1_UserName");
  await page.click("table #ctl00_Login1_UserName");

  await page.waitForSelector("table #ctl00_Login1_UserName");
  await page.click("table #ctl00_Login1_UserName");

  await page.waitForSelector("table #ctl00_Login1_UserName");
  await page.click("table #ctl00_Login1_UserName");

  await page.waitForSelector("table > tbody > tr > td > h2");
  await page.click("table > tbody > tr > td > h2");

  await page.waitForSelector("table #ctl00_Login1_UserName");
  await page.click("table #ctl00_Login1_UserName");
  await page.type("#ctl00_Login1_UserName", USERNAME);

  await page.waitForSelector("table #ctl00_Login1_Password");
  await page.click("table #ctl00_Login1_Password");
  await page.type("#ctl00_Login1_Password", PASSWORD);

  await page.waitForSelector(
    "#LoginBoxInner > table:nth-child(3) > tbody > tr > td",
  );
  await page.click("#LoginBoxInner > table:nth-child(3) > tbody > tr > td");

  await page.waitForSelector("table #LoginButton");
  await page.click("table #LoginButton");
  await navigationPromise;

  await page.waitForSelector(
    "#leftMenu > div.scrollable.ps.ps--theme_default > ul > li:nth-child(2) > ul > li:nth-child(2) > span",
  );
  await page.click(
    "#leftMenu > div.scrollable.ps.ps--theme_default > ul > li:nth-child(2) > ul > li:nth-child(2) > span",
  );

  await navigationPromise;

  await page.waitForSelector(
    "#ctl00_ContentPlaceHolder1_NewReservatrionButton",
  );
  await page.click("#ctl00_ContentPlaceHolder1_NewReservatrionButton");

  await navigationPromise;

  await page.waitForSelector(
    "#ctl00_ContentPlaceHolder1_AmenitiesDataList_ctl20_SelectAmenityLink",
  );
  await page.click(
    "#ctl00_ContentPlaceHolder1_AmenitiesDataList_ctl20_SelectAmenityLink",
  );

  await navigationPromise;

  await page.waitForSelector(DATE_SELECTOR);
  await page.click(DATE_SELECTOR);

  await page.waitFor(2000);

  await page.waitForSelector(
    "#ctl00_ContentPlaceHolder1_AvailabileTimeSlotsList",
  );
  const availableTimesText = await page.$eval(
    "#ctl00_ContentPlaceHolder1_AvailabileTimeSlotsList",
    e => e.innerText,
  );
  const availableTimes = availableTimesText.split("/").map(m => m.trim());

  let isTimeAvailable = false;
  availableTimes.forEach(t => {
    console.log(t);
    if (BEST_PLAYING_TIME.indexOf(t) > -1) {
      isTimeAvailable = true;
      console.log(`✅ ${chalk.green.bold(t)}`);
    }
  });
  if (isTimeAvailable) {
    console.log(chalk.yellow("Better jump on those available times!"));
  } else {
    await browser.close();
  }
}

start();
