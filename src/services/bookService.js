import api from './apitemp'

// Ejemplo con getBooks:
export const getBooks = async () => {
    const response = await api.get('/books')
    return response.data
  }
  
  export const createBook = async (data) => {
    const response = await api.post('/books', data)
    return response.data
  }

  export const deleteBook = async (id) => {
    const response = await api.delete(`/books/${id}`)
    return response.data
  }

  export const updateStatus = async (id, data) => {
    const response = await api.post(`/books/${id}/status`, data)
    return response.data
  }

  export const getBookById = async (id) => {
    const response = await api.get(`/books/${id}`)
    return response.data
  }
  