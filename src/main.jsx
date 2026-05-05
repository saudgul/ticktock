import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TimesheetPage from "./pages/TimesheetPage";
import TimesheetWeek from "./pages/TimesheetWeek";
import Index from "./pages/Index";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<TimesheetPage />} />
        <Route path="/week" element={<TimesheetWeek />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
