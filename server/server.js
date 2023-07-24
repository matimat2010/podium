const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors package
const vendors = [];
const app = express();
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

app.post("/webhook", (req, res) => {
    console.log(req.body); // Logs the received JSON data
    res.sendStatus(200); // Sends a success response to the client
});

app.post("/loadvendors", (req, res) => {
    const vendorData = req.body;

    if (Array.isArray(vendorData)) {
        // If the request body is an array, add each object to the "vendors" array
        vendorData.forEach((vendorObj) => {
            vendors.push(vendorObj);
            console.log("Vendor data added:", vendorObj);
        });
    } else if (typeof vendorData === "object") {
        // If the request body is a single object, add it to the "vendors" array
        vendors.push(vendorData);
        console.log("Vendor data added:", vendorData);
    } else {
        return res.status(400).send("Invalid JSON format.");
    }

    res.sendStatus(200); // Sends a success response to the client
});

app.put("/updatevendor/:code", (req, res) => {
    const codeToUpdate = req.params.code;
    const updatedVendor = req.body;

    // Find the index of the vendor with the matching code
    const indexToUpdate = vendors.findIndex(
        (vendor) => vendor.code === codeToUpdate
    );

    if (indexToUpdate === -1) {
        // If the code is not found in the array, respond with 404 Not Found
        return res.status(404).send("Vendor not found.");
    }

    // Update the vendor in the "vendors" array using the index
    vendors[indexToUpdate] = updatedVendor;
    console.log("Vendor updated:", updatedVendor);

    res.status(200).json({ message: "Vendor updated successfully." });
});

app.delete("/deletevendor/:code", (req, res) => {
    const codeToDelete = req.params.code;

    // Find the index of the vendor with the matching code
    const indexToDelete = vendors.findIndex(
        (vendor) => vendor.code === codeToDelete
    );

    if (indexToDelete === -1) {
        // If the code is not found in the array, respond with 404 Not Found
        return res.status(404).send("Vendor not found.");
    }

    // Remove the vendor from the "vendors" array using the index
    const deletedVendor = vendors.splice(indexToDelete, 1)[0];
    console.log("Vendor deleted:", deletedVendor);

    res.sendStatus(200); // Sends a success response to the client
});

app.get("/printvendors", (req, res) => {
    res.json(vendors); // Respond with the "vendors" array in JSON format
});

app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
});
