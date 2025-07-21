import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from "js-cookie";


function Middleware() {
    const accessToken = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');
    const location = useLocation();

    if (accessToken && refreshToken && location.pathname !== '/') {
        return <Navigate to="/" replace />;
    }

    if (!accessToken && !refreshToken && location.pathname !== '/login') {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default Middleware