import { Routes, Route } from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Login />} path="/login" />
      <Route element={<Dashboard />} path="/dashboard" />
    </Routes>
  );
};
