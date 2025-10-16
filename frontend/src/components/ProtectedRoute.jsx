import {Navigate, Outlet} from 'react-router'
import { useState, useEffect } from 'react';

export default function ProtectedRoute(){
    const [isAuth, setIsAuth] = useState(null);


    useEffect(()=>{
        fetch("http://localhost:5000/auth/profile", {
            method: 'GET',
            credentials: "include",
        })
        .then(res => {
            if (res.ok) {
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
        })
    }, [])

    if(isAuth === null) return <p>checking authentication</p>;
    return isAuth ? <Outlet /> : <Navigate to="/login" />;


}