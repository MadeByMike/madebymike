const axios = require("axios");
const seed = require("../../../utils/save-seed.js");

/*
Get presentation details from Notist
*/
async function getData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

module.exports = () =>
  new Promise(async resolve => {
    const events = await getData("https://noti.st/madebymike.json").then(
      response => response.data[0].relationships.data
    );

    var talks = {
      future: [],
      past: []
    };

    await asyncForEach(events, async item => {
      const event = await getData(item.links.event);
      const presentation = await getData(item.links.related);

      const now = new Date();
      const thisEvent = event.data[0].attributes;
      const thisPresentation = presentation.data[0].attributes;
      const when = new Date(thisEvent.ends_on);
      const future = now - when < 0 ? true : false;

      const image = item.attributes.image;
      const link = item.links.self;

      if (future) {
        talks.future.push({
          image,
          link,
          event: thisEvent,
          presentation: thisPresentation
        });
      } else {
        talks.past.push({
          image,
          link,
          event: thisEvent,
          presentation: thisPresentation
        });
      }
    });

    seed(JSON.stringify(talks), `${__dirname}/../dev/events.json`);
    resolve(talks);
  });
