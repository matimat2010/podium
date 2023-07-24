import React, { useState, useEffect } from "react";
import VendorList from "../components/VendorList";

function ViewVendorScreen() {
    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
        // Fetch the JSON data from the endpoint
        fetch("http://localhost:4000/printvendors")
            .then((response) => response.json())
            .then((data) => setJsonData(data))
            .catch((error) => {
                console.error("Error fetching data:", error);
                setJsonData([]); // Set an empty array if there's an error
            });
    }, []);

    // Callback function to handle updates from VendorList component
    const handleVendorUpdate = (updatedData) => {
        setJsonData(updatedData);
    };

    return (
        <div>
            <VendorList
                jsonData={jsonData}
                onVendorUpdate={handleVendorUpdate}
            />
        </div>
    );
}

export default ViewVendorScreen;
