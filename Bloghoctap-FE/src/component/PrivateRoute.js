import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const navigate = useNavigate()

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("userInfo"))?.token) {
            navigate("/login");
        }
    }, [navigate]);
    return (
        children
    )
}

export default PrivateRoute