import { createContext, useState, useEffect } from 'react'
import { setUnauthorizedHandler } from '../services/api'

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()

function getStoredUser() {
  try {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  } catch {
    localStorage.removeItem('user')
    return null
  }
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(getStoredUser)

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setToken(null)
      setUser(null)
    })
  }, [])

  const login = (newToken, newUser) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser))
      setUser(newUser)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
