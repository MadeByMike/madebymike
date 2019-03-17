const axios = require("axios");
const seed = require("../../../utils/save-seed.js");

/*
  Get presentation details from Notist
*/

module.exports = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://noti.st/madebymike.json")
      .then(function(response) {
        var events = response.data.data[0].relationships.data;
        var eventURLs = [];
        events.forEach(element => {
          eventURLs.push(element.links.event);
        });

        // Fetch all of the presentation data
        axios.all(eventURLs.map(l => axios.get(l))).then(
          axios.spread(function(...res) {
            // gather the data about for each presentation and
            // collect them in future and past arrays
            var talks = {
              future: [],
              past: []
            };
            var now = new Date();
            for (var talk in res) {
              var thisTalk = res[talk].data.data[0].attributes;
              var when = new Date(thisTalk.ends_on);
              var future = now - when < 0 ? true : false;
              if (future) {
                talks.future.push(thisTalk);
              } else {
                talks.past.push(thisTalk);
              }
            }

            seed(JSON.stringify(talks), `${__dirname}/../dev/events.json`);
            resolve();
          })
        );
      })
      .catch(function(error) {
        reject();
        console.log(error);
      });
  });
};
