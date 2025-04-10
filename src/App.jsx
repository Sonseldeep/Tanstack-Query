import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import AboutUs from "./components/AboutUs";
import ProtectedRouting from "./components/ProtectedRouting";
import Login from "./components/Login";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          <Route element={<ProtectedRouting />}>
            <Route path="/about" element={<AboutUs />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
