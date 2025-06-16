
// Import necessary modules
const { ChemicalServer } = require("chemicaljs");
const express = require("express");

// Initialize ChemicalServer, which provides an Express app instance.
// We only destructure 'app' here because 'listen' is for local development,
// and Vercel's serverless environment handles the listening itself.
const [app] = new ChemicalServer({
    default: "scramjet", // Set Scramjet as the default proxy service
    scramjet: true,      // Enable Scramjet
    // You can enable other proxy services here if needed (e.g., uv: true, rh: true)
});

// IMPORTANT: Do NOT use app.use(express.static(path.join(__dirname, 'public'))) here.
// Vercel will directly serve files from your 'public' directory as static assets.
// Your Express app (this serverless function) will primarily handle the ChemicalJS client scripts
// and any dynamic proxy requests.

// This tells ChemicalServer to expose its client-side JavaScript files
// (like /chemical.js and /chemical.components.js) via this serverless function.
// These routes will be handled by the 'routes' configuration in vercel.json.
app.serveChemical();

// Define a basic 404 error handler for any routes not explicitly handled by ChemicalServer
// or matched by Vercel's static asset serving.
app.use((req, res) => {
    res.status(404);
    res.send("404 Error: This route was not handled by the proxy serverless function.");
});

// Export the Express app instance. This is how Vercel runs your serverless function.
module.exports = app;
