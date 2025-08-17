import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from "js-cookie";

function Middleware() {
    const accessToken = Cookies.get('access');
    const refreshToken = Cookies.get('refresh');
    const location = useLocation();

    // اگر توکن وجود نداره
    if (!accessToken || !refreshToken) {
        // فقط اجازه دسترسی به /login داشته باشه
        if (location.pathname !== '/login') {
        return <Navigate to="/login" replace />;
        }
    }

    // اگر توکن وجود داره
    if (accessToken && refreshToken) {
        // اگه روی لاگین هست، بفرستش به داشبورد
        if (location.pathname === '/login') {
        return <Navigate to="/" replace />;
        }
    }

    // در غیر این صورت اجازه عبور بده
    return <Outlet />;
}

export default Middleware;
