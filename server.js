"user strict";

var express = require("express");
var path = require("path");
var http = require("http");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

require("dotenv").config();

var db = require("./server/mongoose.js");

var api = require("./server/routes/api");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

app.use(express.static(path.join(__dirname, "dist")));

app.use("/api", api);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

app.use((err, req, res, next) => {
  res
    .status(500)
    .render("error", { error: err, message: "THINGS AIN'T WORKING!" });
});

var port = process.env.PORT || 8080;
app.set("port", port);

var server = http.createServer(app);

server.listen(port, () => console.log("Chilling on port ", +port));
