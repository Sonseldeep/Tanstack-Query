import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRouting = () => {
  const { isAuthenicate } = useAuth();
  return isAuthenicate ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRouting;
