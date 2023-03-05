import React from "react";
import { Routes, Route } from "react-router-dom";

import IndexProduct from "../components/products/IndexProduct";
import NewProduct from "../components/products/NewProduct";
import EditProduct from "../components/products/EditProduct";

import NotFound from "../components/NotFound";

const Router = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<IndexProduct />} />
                <Route path="/product/new" element={<NewProduct />} />
                <Route path="/product/edit/:id" element={<EditProduct />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default Router;
