# Book a Tennis Court

![](https://p59.f1.n0.cdn.getcloudapp.com/items/xQuZ2d7n/carbon.png)

This is a quick and dirty Puppeteer script that I wrote one evening to automatically notify me if the tennis court is available for booking at a preferred time.

It logs in as me and checks the Tennis Court website to see if a new day has opened up and lets me know if there is a booking at one of my desired times.

You can set an array of desired playing times. On weekdays, I am only free in the evenings, so my desired playing times are the following:

```js
let BEST_PLAYING_TIME = [
  "7:00 PM - 8:00 PM",
  "8:00 PM - 9:00 PM",
  "9:00 AM - 10:00 PM",
  "7:30 PM - 8:30 PM",
  "8:30 PM - 9:30 PM",
  "9:30 PM - 10:30 PM",
];
```

The script will then compare available times to your desired playing times, and let you know if there is an opening.

If your condo uses BuildingLink to manage amenities, you can probably use this.

## To use

1. Clone this repo.
2. Create a `.env` file with the following parameters:

```
USERNAME=your-buildinglink-username
PASSWORD=your-buildinglink-password
DAYS_TO_LOOK_AHEAD=how-many-days-to-look-ahead (default to 14 days)
```

3. npm install
4. npm start
