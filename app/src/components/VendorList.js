import React, { useState, useEffect } from "react";
import VendorItem from "./VendorItem";

function VendorList() {
    const [vendorsData, setVendorsData] = useState([]);

    useEffect(() => {
        // Fetch the data from the server when the component mounts
        fetch("http://localhost:4000/printvendors")
            .then((response) => response.json())
            .then((data) => {
                setVendorsData(data);
            })
            .catch((error) => {
                console.error("Error fetching vendors:", error);
            });
    }, []);

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
                    return response.json();
                } else {
                    return response.text().then((text) => {
                        if (text.includes("Vendor not found")) {
                            console.log(`Vendor with code ${code} not found.`);
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
                    console.log("Vendor updated successfully:", data);
                    const updatedVendors = vendorsData.map((vendor) =>
                        vendor.code === code ? updatedVendor : vendor
                    );
                    setVendorsData(updatedVendors);
                }
            })
            .catch((error) => {
                console.error("Error updating vendor:", error);
            });
    };

    const handleVendorDelete = (code) => {
        // Call the API endpoint to delete the vendor
        fetch(`http://localhost:4000/deletevendor/${code}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Vendor deleted successfully.");
                    const updatedVendors = vendorsData.filter(
                        (vendor) => vendor.code !== code
                    );
                    setVendorsData(updatedVendors);
                } else {
                    throw new Error("Failed to delete vendor.");
                }
            })
            .catch((error) => {
                console.error("Error deleting vendor:", error);
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
                        onVendorUpdate={handleVendorUpdate}
                        onVendorDelete={handleVendorDelete} // Pass the callback function for delete
                    />
                ))}
            </tbody>
        </table>
    );
}

export default VendorList;
