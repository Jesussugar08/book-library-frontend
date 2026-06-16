import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {getBooks} from '../services/bookService'
import BookCard from '../components/BookCard'
import { Box, Text, SimpleGrid, Button } from '@chakra-ui/react'
import {deleteBook} from '../services/bookService'


function Dashboard() {
  const [books, setBooks] = useState([])
  const navigate = useNavigate()

  useEffect (() =>{

    fetchBooks()
  },[])

  const fetchBooks = async () =>{
    try{
      const data = await getBooks()
      setBooks(data.data)
    }catch(err){
      console.error(err)
    }
  }

  const handleDelete = async (id) =>{
    await deleteBook(id)
    fetchBooks()
  }

  return (
    <Box>
      <Navbar />
        <Button 
          colorScheme="blue"
          onClick={() => navigate('/add-book')}
        >
          + Add Book
        </Button>
      <Box p={8}>
        {books.length === 0 
          ? <Text>No books yet</Text>
          : <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {books.map(book => (
            <BookCard
              key={book.id}
              id={book.id} 
              title={book.title}
              author={book.author}
              status={book.status}
              cover_url={book.cover_url}
              onDelete={() => handleDelete(book.id)}
            />
          ))}
          </SimpleGrid>
        }
      </Box>
    </Box>
  )
}

export default Dashboard