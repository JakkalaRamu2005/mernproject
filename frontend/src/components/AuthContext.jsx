import { useEffect } from "react";
import { createContext, useState, useContext } from "react";

const AuthContext = createContext();


const AuthProvider =({children})=>{


    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetch("http://localhost:1234/auth/profile",{
            method:"GET",
            credentials: "include",
        })
        .then(res=>{
            if(res.ok){
                setIsLoggedIn(true);
                
            }else{
                setIsLoggedIn(false);
            }
        })
        .catch(()=>{
            setIsLoggedIn(false);
        })
        .finally(()=>{
            setLoading(false);
        })
    },[]);  

    const login = async (credentials)=>{
        try{
            const res = await fetch("http://localhost:1234/auth/login",{
                method:"POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(credentials),
                credentials: "include",
            });

            const data = await res.json();
            console.log(data);

            if(res.ok){
                setIsLoggedIn(true);
                return {success: true, message: data.message};
            }else{
                return {success: false, message: data.message};
            }
        }catch(error){
            return {success: false, message: "An error occurred. Please try again"};
        }
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, loading, login}}>{children}</AuthContext.Provider>
    )

}

export default AuthProvider

export const useAuth =()=> useContext(AuthContext);