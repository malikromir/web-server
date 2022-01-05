import { createRequire } from "module";
const require = createRequire(import.meta.url);
const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=fe0c823151754e775922c625948f5b5f&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, response) => {
    const info = response.body.current;
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, "Currently: " + info.temperature + " degrees");
    }
  });
};

export { forecast };
