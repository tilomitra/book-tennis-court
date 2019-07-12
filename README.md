# Book a Tennis Court

![](https://p59.f1.n0.cdn.getcloudapp.com/items/xQuZ2d7n/carbon.png)

This is a quick and dirty Puppeteer script that I wrote one evening to automatically notify me if the tennis court is available for booking at a preferred time.

It basically logs in as me and checks the Tennis Court website to see if a new day has opened up, and lets me know if there is a booking at one of my desired times.

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
