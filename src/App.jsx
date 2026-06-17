import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AddBook from './pages/AddBook'
import BookDetail from './pages/BookDetail'
import EditBook from './pages/EditBook'
import Stats from './pages/Stats'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'

function BookDetailPage() {
  const { id } = useParams()
  return <BookDetail key={id} />
}

function EditBookPage() {
  const { id } = useParams()
  return <EditBook key={id} />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/add-book" element={
          <ProtectedRoute>
            <AddBook />
          </ProtectedRoute>
        } />
        <Route path="/books/:id" element={
          <ProtectedRoute>
            <BookDetailPage />
          </ProtectedRoute>
        } />
        <Route path="/books/:id/edit" element={
          <ProtectedRoute>
            <EditBookPage />
          </ProtectedRoute>
        } />
        <Route path="/stats" element={
          <ProtectedRoute>
            <Stats />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
