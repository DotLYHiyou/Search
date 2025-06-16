// Import necessary modules
const { ChemicalServer } = require("chemicaljs");
const express = require("express");
const path = require('path'); // Re-adding path for consistency, though Glitch might configure differently

// Initialize ChemicalServer, which provides an Express app instance.
// We destructure both 'app' and 'listen' now, as Glitch will use the listen function.
const [app, listen] = new ChemicalServer({
    default: "scramjet", // Set Scramjet as the default proxy service
    scramjet: true,      // Enable Scramjet
    // You can enable other proxy services here if needed (e.g., uv: true, rh: true)
});

// Serve static files from the 'public' directory.
// Glitch usually sets process.env.PORT for your app.
app.use(express.static(path.join(__dirname, '../public'), { // Corrected path to public, as index.js is now in /api
    index: "index.html",
    extensions: ["html"]
}));


// This tells ChemicalServer to expose its client-side JavaScript files
// (like /chemical.js and /chemical.components.js) via this server.
app.serveChemical();

// Define a basic 404 error handler for any routes not explicitly handled
app.use((req, res) => {
    res.status(404);
    res.send("404 Error: Page not found on proxy server.");
});

// Define the port to listen on. Glitch will provide a PORT environment variable.
const port = process.env.PORT || 3000;

// Start the server and listen for incoming requests on the specified port
listen(port, () => {
    console.log(`Chemical proxy server listening on port ${port}`);
    console.log(`Access your proxy locally at: http://localhost:${port}`);
    console.log("On Glitch, your app will be accessible at its Glitch URL.");
});

// IMPORTANT: Do NOT include module.exports = app; for Glitch.
// Glitch runs your server directly using the listen call.
