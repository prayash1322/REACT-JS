import { Routes, Route } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const App = () => {
  const isDark = useSelector((state) => state.theme.isDark)
  return (
    <div className={`min-h-screen w-full ${isDark ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collection" element={<CollectionPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
