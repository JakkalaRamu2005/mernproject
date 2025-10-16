import { useEffect } from "react";
import { createContext, useState, useContext } from "react";

const AuthContext = createContext();


const AuthProvider =({children})=>{


    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetch("http://localhost:5000/auth/profile",{
            method:"GET",
            credentials: "include",
        })
        .then(res=>{
            if(res.ok){
                setIsLoggedIn(true);
                setLoading(false);
            }
        })
        .catch(()=>{
            
        })
        .finally(()=>{
            setLoading(false);
        })
    },[]);  

    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>{children}</AuthContext.Provider>
    )

}

export default AuthProvider

export const useAuth =()=> useContext(AuthContext);