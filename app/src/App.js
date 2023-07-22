// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use "Router" instead of "Route" for BrowserRouter

import ViewVendorScreen from "./screens/ViewVendorScreen";
import CreateVendorScreen from "./screens/CreateVendorScreen";

const App = () => {
    return (
        <Router>
            {" "}
            {/* Use "Router" here instead of "Routes" */}
            <Routes>
                <Route path='/' element={<ViewVendorScreen />} />{" "}
                {/* Use "element" prop instead of "component" */}
                <Route path='/create' element={<CreateVendorScreen />} />{" "}
                {/* Use "element" prop instead of "component" */}
                {/* Add more routes for edit, delete, and any other pages */}
            </Routes>
        </Router>
    );
};

export default App;
