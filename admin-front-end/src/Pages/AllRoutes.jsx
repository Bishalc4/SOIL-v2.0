import { Route, Routes } from "react-router-dom";
import { Dashboard, Products, Customers, Reviews, Statistics } from "./index.js";

function AllRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/products" element={<Products />} />
            <Route path="/reviews" element={<Reviews/>} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/statistics" element={<Statistics />} />
        </Routes>
    );
}

export default AllRoutes;