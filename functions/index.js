/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const path = require("path");

// All available logging functions
const {debug, error} = require("firebase-functions/logger");

// app.get("/index.html", (req, res) => {
//   const acceptHeader = req.headers["accept"] || "";
//   const sxgPath = path.join(__dirname, "../public/zk-sxg.web.app.index.sxg");
//   const htmlPath = path.join(__dirname, "../public/index.html");
//   // eslint-disable-next-line max-len
//   log(
//       "Request received for index.html with Accept header:",
//       acceptHeader,
//   );
//   if (acceptHeader.includes("application/signed-exchange;v=b3")) {
//     res.set("Content-Type", "application/signed-exchange;v=b3");
//     res.set("X-Content-Type-Options", "nosniff");
//     res.sendFile(sxgPath, (err) => {
//       if (err) {
//         error("Error serving SXG file:", err);
//         res.status(500).send("Error serving SXG file");
//       }
//     });
//   } else {
//     res.sendFile(htmlPath, (err) => {
//       if (err) {
//         error("Error serving HTML file:", err);
//         res.status(500).send("Error serving HTML file");
//       }
//     });
//   }
// });

exports.serveSXG = functions.https.onRequest((req, response) => {
  debug("Hello logs");
  // debug("Hello logs", req);
  // error("Hello logs");
  const page = req.path; // This will give you the path, e.g., '/hello.html'
  const headers = req.headers["accept"] || "";
  const sxgPath = path.resolve(__dirname, "./sxg/zk-sxg.web.app.hello.sxg");
  const htmlPath = path.join(__dirname, "../public/hello.html");

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
    response.send(`<h1>Hi !</h1></br>Page called: ${page} with headers : ${headers}`);
  }
});
