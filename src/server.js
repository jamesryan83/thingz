var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
app.use(express.static(__dirname + "/public"));



// home page
app.get("/", function (req, res) {
    res.sendStatus(200);  // serving static files, but send this anyway
});

// about page
app.get("/about", function (req, res) {
    res.sendFile("public/about.html", { root: __dirname });
});

// contact page
app.get("/contact", function (req, res) {
    res.sendFile("public/contact.html", { root: __dirname });
});

// store page
app.get("/store", function (req, res) {
    res.sendFile("public/store.html", { root: __dirname });
});


// redirect everything to home page
app.all("*", function (req, res) {
    res.redirect("/");
});


// Start Server
var port = process.env.PORT || 1337;

app.listen(port, function() {
    console.log("listening on port : " + port);
});
