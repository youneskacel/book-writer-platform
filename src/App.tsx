import React from "react";
import "./App.css";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Layout from "./components/Layout";
import Account from "./pages/Account";
import { Routes, Route } from "react-router-dom";
import SectionPage from "./pages/SectionPage";

function App() {
  return (
    <div className="h-[100vh] w-[100vw]">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/account"
          element={
            <Layout>
              <Account />
            </Layout>
          }
        />
        <Route
          path="/section"
          element={
            <Layout>
              <SectionPage />
            </Layout>
          }
        />
        <Route
          path="/*"
          element={
            <Layout>
              <></>
            </Layout>
          }
        />
      </Routes>
      {/* <Layout children={null} /> */}
    </div>
  );
}

export default App;
