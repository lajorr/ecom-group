import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import BrandProvider from "providers/BrandProvider";
import CategoryProvider from "providers/CategoryProvider";
import ProductProvider from "providers/ProductProvider";
import Index from "views/Index.js";
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProductProvider>
      <BrandProvider>
        <CategoryProvider>
          <Routes>
            {/* add routes with layouts */}
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/auth/*" element={<Auth />} />
            {/* add routes without layouts */}
            <Route path="/landing/*" element={<Landing />} />
            <Route path="/profile/*" element={<Profile />} />
            <Route path="/" element={<Index />} />
            {/* add redirect for first page */}
            <Route path="*" element={<Index />} />
          </Routes>
        </CategoryProvider>
      </BrandProvider>
    </ProductProvider>
  </BrowserRouter>
);
