import React, { useState } from "react";

function VendorItem({ vendor, onVendorUpdate }) {
    const { category, code, name, votes } = vendor;
    const [isEditing, setIsEditing] = useState(false);
    const [updatedName, setUpdatedName] = useState(name);
    const [updatedCategory, setUpdatedCategory] = useState(category);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleSaveClick = () => {
        // Prepare the updated vendor data to send in the PUT request
        const updatedVendorData = {
            ...vendor,
            name: updatedName,
            category: updatedCategory,
        };

        // Call the onVendorUpdate callback function to update the vendor on the server
        onVendorUpdate(code, updatedVendorData);

        setIsEditing(false);
    };

    return (
        <tr>
            <td>
                {isEditing ? (
                    <input
                        value={updatedCategory}
                        onChange={(e) => setUpdatedCategory(e.target.value)}
                    />
                ) : (
                    category
                )}
            </td>
            <td>{code}</td>
            <td>
                {isEditing ? (
                    <input
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                    />
                ) : (
                    name
                )}
            </td>
            <td>{votes}</td>
            <td>
                {isEditing ? (
                    <div>
                        <button onClick={handleSaveClick}>Save</button>
                        <button onClick={handleCancelClick}>Cancel</button>
                    </div>
                ) : (
                    <button onClick={handleEditClick}>Edit</button>
                )}
            </td>
        </tr>
    );
}

export default VendorItem;
