console.log("Serverless function: Starting initialization...");

// Import necessary modules
const { ChemicalServer } = require("chemicaljs");
const express = require("express");

console.log("Serverless function: Modules imported (chemicaljs, express).");

try {
    // Initialize ChemicalServer, which provides an Express app instance.
    const [app] = new ChemicalServer({
        default: "scramjet",
        scramjet: true,
    });
    console.log("Serverless function: ChemicalServer initialized successfully.");

    // This tells ChemicalServer to expose its client-side JavaScript files
    app.serveChemical();
    console.log("Serverless function: Chemical scripts served.");

    // Define a basic 404 error handler
    app.use((req, res) => {
        console.log(`Serverless function: Handling request for ${req.url} - 404 Not Found.`);
        res.status(404);
        res.send("404 Error: This route was not handled by the proxy serverless function.");
    });
    console.log("Serverless function: 404 handler configured.");

    // Export the Express app instance
    module.exports = app;
    console.log("Serverless function: App exported.");

} catch (error) {
    console.error("Serverless function: CRITICAL ERROR during setup:", error);
    // Re-throw the error so Vercel captures it.
    throw error;
}

console.log("Serverless function: Initialization sequence complete.");
