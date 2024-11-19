const functions = require("firebase-functions");
const path = require("path");
const dotenv = require("dotenv");
// All available logging functions
const { debug, error } = require("firebase-functions/logger");

// Resolve the path to the .env file in the upper directory
const envPath = path.resolve(__dirname, "../.env");

// Load the .env file
dotenv.config({ path: envPath });

exports.serveSXG = functions.https.onRequest((req, response) => {
  const page = req.path;
  const headers = req.headers["accept"] || "";
  const sxgPath = path.resolve(
    __dirname,
    "./sxg/" + process.env.SITE_NAME + "." + process.env.SXG_NAME
  );
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
    // eslint-disable-next-line max-len
    response.send(
      `<h1>Hi !</h1></br>Page called: ${page} with headers : ${headers}`
    );
  }
});
