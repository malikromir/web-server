import express from "express";
import path from "path";
import hbs from "hbs";

import { geocode } from "./utils/geocode.js";
import { forecast } from "./utils/forecast.js";

const app = express();

const publicDirPath = path.join(process.cwd(), "/public");
const viewsPath = path.join(process.cwd(), "/templates/views");
const partialPath = path.join(process.cwd(), "/templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirPath)); //for static Html

//for handlebars
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Romir",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Seeking help",
    name: "Romir",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Romir",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
  // res.send([
  //   {
  //     location: "Boston",
  //     weather: "Sunny",
  //     address: req.query.address,
  //   },
  // ]);
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Romir",
    errorMessage: "Help Page Not Found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Romir",
    errorMessage: "Page Not Found",
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
