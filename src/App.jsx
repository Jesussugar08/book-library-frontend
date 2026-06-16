import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  Login  from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AddBook from './pages/AddBook'
import BookDetail from './pages/BookDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/books/:id" element={<BookDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
