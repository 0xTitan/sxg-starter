const functions = require("firebase-functions");
const path = require("path");
require("dotenv").config();
// All available logging functions
const {debug, error} = require("firebase-functions/logger");

exports.serveSXG = functions.https.onRequest((req, response) => {
  const page = req.path;
  const headers = req.headers["accept"] || "";
  const sxgPath = path.resolve(
      __dirname,
      "./sxg/" + process.env.SITE_NAME + "." + process.env.SXG_NAME);
  const htmlPath = path.join(__dirname, "../public/" + process.env.PAGE_NAME);

  debug("Page being called:", page);
  debug("sxgPath:", sxgPath);
  debug("htmlPath:", htmlPath);

  if (headers.includes("application/signed-exchange;v=b3")) {
    response.set("Content-Type", "application/signed-exchange;v=b3");
    response.set("X-Content-Type-Options", "nosniff");
    debug("You requested sxg file ! Get it !");
    response.sendFile(sxgPath, (err) => {
      if (err) {
        error("Error serving SXG file:", err);
        response.status(500).send("Error serving SXG file");
      }
    });
  } else {
    response.send(
        `<h1>Hi !</h1></br>Page called: ${page} with headers : ${headers}`,
    );
  }
});
