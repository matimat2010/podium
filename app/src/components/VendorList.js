import React, { useState, useEffect } from "react";
import VendorItem from "./VendorItem";

function VendorList({ jsonData, onVendorUpdate }) {
    const [vendorsData, setVendorsData] = useState(jsonData);

    useEffect(() => {
        // Update the state with the initial data from the parent component
        setVendorsData(jsonData);
    }, [jsonData]);

    const handleVendorUpdate = (code, updatedVendor) => {
        fetch(`http://localhost:4000/updatevendor/${code}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedVendor),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json(); // Parse the response as JSON
                } else {
                    // Check if the response contains the "Vendor not found" error message
                    return response.text().then((text) => {
                        if (text.includes("Vendor not found")) {
                            console.log(`Vendor with code ${code} not found.`);
                            // Optionally, remove the vendor from the state if needed
                            const updatedVendors = vendorsData.filter(
                                (vendor) => vendor.code !== code
                            );
                            setVendorsData(updatedVendors);
                        } else {
                            throw new Error("Failed to update vendor.");
                        }
                    });
                }
            })
            .then((data) => {
                if (data) {
                    // Handle successful update if needed
                    console.log("Vendor updated successfully:", data);

                    // Update the state with the new vendor data
                    const updatedVendors = vendorsData.map((vendor) =>
                        vendor.code === code ? updatedVendor : vendor
                    );
                    setVendorsData(updatedVendors);

                    // Notify the parent component about the updated data
                    onVendorUpdate(updatedVendors);
                }
            })
            .catch((error) => {
                console.error("Error updating vendor:", error);
                // Handle other errors if necessary.
            });
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Votes</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {vendorsData.map((vendor) => (
                    <VendorItem
                        key={vendor.code}
                        vendor={vendor}
                        onVendorUpdate={handleVendorUpdate} // Pass the callback function
                    />
                ))}
            </tbody>
        </table>
    );
}

export default VendorList;
