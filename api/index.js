/*const { ChemicalServer } = require("chemicaljs");
const express = require("express");


const [app, listen] = new ChemicalServer({
    default: "scramjet",
    scramjet: true,
});

const port = process.env.PORT || 3000;


app.serveChemical();

app.use((req, res) => {
    res.status(404);
    res.send("404 Error: Page not found");
});

// EXPORT THE APP FOR VERCEL
module.exports = app;
*/
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello from Vercel!");
});

// Export the app for Vercel's serverless function
module.exports = app;