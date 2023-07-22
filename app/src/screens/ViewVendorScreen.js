import React from "react";
import VendorList from "../components/VendorList";
let jsonData = [
    {
        category: "Steaks",
        code: "430",
        name: "Hi Point Steakhouse",
        sms_votes: 0,
    },
];

function ViewVendorScreen() {
    return (
        <div>
            <VendorList jsonData={jsonData} />
        </div>
    );
}

export default ViewVendorScreen;
