import { createContext, useState, useEffect } from 'react'
import { setUnauthorizedHandler } from '../services/api'
import * as authStorage from '../utils/authStorage'

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => authStorage.getToken())
  const [user, setUser] = useState(() => authStorage.getUser())

  useEffect(() => {
    setUnauthorizedHandler(() => {
      authStorage.clearAuth()
      setToken(null)
      setUser(null)
    })
  }, [])

  const login = (newToken, newUser) => {
    authStorage.setToken(newToken)
    setToken(newToken)
    if (newUser) {
      authStorage.setUser(newUser)
      setUser(newUser)
    }
  }

  const logout = () => {
    authStorage.clearAuth()
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
