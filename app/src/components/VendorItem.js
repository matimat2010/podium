import React, { useState } from "react";
import "./VendorItem.css"; // Import the CSS file

function VendorItem({ vendor, onVendorUpdate, onVendorDelete }) {
    const { category, code, name, votes } = vendor;
    const [isEditing, setIsEditing] = useState(false);
    const [isArchived, setIsArchived] = useState(false);
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

    const handleArchiveClick = () => {
        setIsArchived(!isArchived);
    };

    const handleDeleteClick = () => {
        // Call the API endpoint to delete the vendor
        onVendorDelete(code);
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
                    <span className={isArchived ? "archived" : ""}>
                        {category}
                    </span>
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
                    <span className={isArchived ? "archived" : ""}>{name}</span>
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
                    <div>
                        <button onClick={handleEditClick}>Edit</button>
                        <button onClick={handleArchiveClick}>
                            {isArchived ? "Unarchive" : "Archive"}
                        </button>
                        {isArchived && (
                            <button onClick={handleDeleteClick}>Delete</button>
                        )}
                    </div>
                )}
            </td>
        </tr>
    );
}

export default VendorItem;
