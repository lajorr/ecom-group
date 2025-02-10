import { Navigate, Route, Routes } from "react-router-dom";

// components

import FooterSmall from "components/Footers/FooterSmall.js";
import Navbar from "components/Navbars/AuthNavbar.js";

// views

import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";

export default function Auth() {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/register_bg_2.png").default + ")",
            }}
          ></div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/auth/login" />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
