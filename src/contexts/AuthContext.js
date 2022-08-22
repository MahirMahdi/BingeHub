import React,{ createContext,useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase.js'

export const AuthContext = createContext();

export default function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState();
    
    onAuthStateChanged(auth,(user)=>{
        setCurrentUser(user)
    });
    
    return(
        <AuthContext.Provider value={[currentUser,setCurrentUser]}>
            {children}
        </AuthContext.Provider>
    )
};
