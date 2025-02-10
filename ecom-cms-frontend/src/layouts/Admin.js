import { Navigate, Route, Routes } from "react-router-dom";

// components

import FooterAdmin from "components/Footers/FooterAdmin.js";
import HeaderStats from "components/Headers/HeaderStats";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";

// views

import { useBrandContext } from "providers/BrandProvider";
import { useCategoryContext } from "providers/CategoryProvider";
import { useProductContext } from "providers/ProductProvider";
import { useEffect } from "react";
import AddBrand from "views/admin/Brand/AddBrand";
import ViewBrands from "views/admin/Brand/ViewBrands";
import AddCategories from "views/admin/Category/AddCategory";
import ViewCategories from "views/admin/Category/ViewCategories";
import Dashboard from "views/admin/Dashboard";
import Maps from "views/admin/Maps.js";
import AddProduct from "views/admin/Product/AddProduct";
import ViewProducts from "views/admin/Product/ViewProducts";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";

export default function Admin() {
  const brandContext = useBrandContext();
  const categoryContext = useCategoryContext();
  const productContext = useProductContext();

  useEffect(() => {
    brandContext.getAllBrands();
    categoryContext.getAllCategories();
    productContext.getAllProducts();
  }, []);
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />

        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Routes>
            <Route path="/" element={<Navigate to="/admin/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/brands/add" element={<AddBrand />} />
            <Route path="/brands/all" element={<ViewBrands />} />
            <Route path="/categories/add" element={<AddCategories />} />
            <Route path="/categories/all" element={<ViewCategories />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/all" element={<ViewProducts />} />
            <Route
              path="/brands"
              element={<Navigate to="/admin/brands/all" />}
            />
            <Route
              path="/categories"
              element={<Navigate to="/admin/categories/all" />}
            />
            <Route
              path="/products"
              element={<Navigate to="/admin/products/all" />}
            />
          </Routes>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
