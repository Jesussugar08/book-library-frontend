import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  Login  from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<h1>Register</h1>} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
