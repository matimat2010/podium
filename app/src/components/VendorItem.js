import React from "react";

function VendorItem({ vendor }) {
    const { category, code, name, votes } = vendor;

    return (
        <tr>
            <td>{category}</td>
            <td>{code}</td>
            <td>{name}</td>
            <td>{votes}</td>
        </tr>
    );
}

export default VendorItem;
