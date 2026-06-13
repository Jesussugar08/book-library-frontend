import { createContext, useState } from "react";

export const AuthContext = createContext()


export const AuthProvider = ({children }) => {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

    const login = (newToken) => {
        localStorage.setItem('token', newToken)
        setToken(newToken)
      }
    
    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
    }
    
      return (
        <AuthContext.Provider value={{ token, user,login ,logout  }}>
          {children}
        </AuthContext.Provider>
      )
    }

  
