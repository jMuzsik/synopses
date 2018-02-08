"user strict";

var express = require("express");
var path = require("path");
var http = require("http");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var jwt = require("express-jwt");
var jwks = require("jwks-rsa");

require("dotenv").config();

var db = require("./server/mongoose.js");

var api = require("./server/routes/api");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

app.use(express.static(path.join(__dirname, "src")));

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://synopses.auth0.com/.well-known/jwks.json"
  }),
  audience: "http://localhost:3000",
  issuer: "https://synopses.auth0.com/",
  algorithms: ["RS256"]
});

app.use(jwtCheck);

app.use("/api", api);

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "src/index.html"));
});

app.get("/authorized", function(req, res) {
  res.send("Secured Resource");
});

app.use((err, req, res, next) => {
  res
    .status(500)
    .render("error", { error: err, message: "THINGS AIN'T WORKING!" });
});

var port = process.env.PORT || "3000";
app.set("port", port);

var server = http.createServer(app);

server.listen(port, () => console.log("Chilling on port ", +port));
