import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    const login = (email, cookie) => {
        console.log(email);
        setUser({ email, cookie });
    };

    const checkUser = () => {
        if (user.email != null && user.cookie != null) {
            return true;
        }
        else {
            return false;
        }

    };

    const logout = () => {

        doSignOut()
    };
    async function doSignOut() {
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + 'logout',
                {
                    withCredentials: true
                }
            );
            console.log(response)
            setUser(null);
            document.cookie = null;

            router.push('./login');


        } catch (error) {
            console.error('error failed: ', error);
        }
    }
    return (
        <AuthContext.Provider value={{ user, login, logout, checkUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);