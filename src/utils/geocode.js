import { createRequire } from "module";
const require = createRequire(import.meta.url);

const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoicm9taXItbWFsaWsiLCJhIjoiY2t4N3AwM3hnMDhsazJvcWMxeDVwemFxZyJ9.GcxzFLEGqKXgpIaxxIQ0UQ&limit=1";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.features.length === 0) {
      callback("Invalid location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

export { geocode };
