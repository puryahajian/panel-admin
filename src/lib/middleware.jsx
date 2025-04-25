import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from "js-cookie";


function Middleware() {
    const accessToken = Cookies.get('access');
    const location = useLocation();
    const isAuthenticated = true;

    if (accessToken && location.pathname !== '/') {
        return <Navigate to="/" replace />;
    }

    if (!accessToken && location.pathname !== '/login') {
        return <Navigate to="/login" replace />;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default Middleware