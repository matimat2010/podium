import React from "react";
import VendorItem from "./VendorItem";

function VendorList({ jsonData }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Votes</th>
                </tr>
            </thead>
            <tbody>
                {jsonData.map((vendor, index) => (
                    <VendorItem key={index} vendor={vendor} />
                ))}
            </tbody>
        </table>
    );
}

export default VendorList;
