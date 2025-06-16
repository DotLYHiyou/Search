const { ChemicalServer } = require("chemicaljs");
const express = require("express");
const path = require('path');

const [app, listen] = new ChemicalServer({
    default: "scramjet",
    scramjet: true,
});

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public'), {
    index: "index.html",
    extensions: ["html"]
}));

app.serveChemical();

app.use((req, res) => {
    res.status(404);
    res.send("404 Error: Page not found");
});

// EXPORT THE APP FOR VERCEL
module.exports = app;
