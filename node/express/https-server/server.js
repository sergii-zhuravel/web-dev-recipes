const express = require("express");
const path = require("path");
const app = express();
const https = require("https");
const fs = require("fs");

app.use(express.static(path.join(__dirname, "static_files")));

// try to use redirection
// app.use(function(req, res, next) {
//   if (req.secure) {
//     // request was via https, so do no special handling
//     next();
//   } else {
//     // request was via http, so redirect to https
//     res.redirect('https://' + req.headers.host + req.url);
//   }
// });

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "static_files", "index.html"));
});

// HTTPS configuration
const keyFilePath = "./ssl/key.pem";
const certFilePath = "./ssl/cert.pem";
const pkcs12FilePath = __dirname + "/ssl/wildcard.absio.com.p12";
const KEY_STORE_PASSWORD = process.env.KEY_STORE_PASSWORD;
const PORT = process.env.PORT || 3000;

const p12File = fs.readFileSync(pkcs12FilePath);

// using p12 file
const HTTPS_OPTIONS = {
  pfx: p12File,
  passphrase: KEY_STORE_PASSWORD
};

// using PEM format for the key and cert
// const HTTPS_OPTIONS = {
//   key: fs.readFileSync(keyFilePath),
//   cert: fs.readFileSync(certFilePath),
//   passphrase: KEY_STORE_PASSWORD
// };

try {
  const server = https.createServer(HTTPS_OPTIONS, app);
  server.on("error", function(e) {
    console.log(e);
  });
  server.listen(PORT, () =>
    console.log(`Application available on https://localhost:${PORT}`)
  );
} catch (e) {
  if (e.message === "mac verify failure") {
    console.log("Error: --- Key store password is incorrect ---");
  }
  console.log(e);
}
