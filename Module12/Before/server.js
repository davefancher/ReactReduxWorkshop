var path = require("path");
var express = require("express");

var port = 3000;
var app = express();

app.use(express.static(__dirname));
app.listen(port, () => console.log("Started listening on port", 3000));
app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "index.html")));