import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import {getBooks} from '../services/bookService'
import BookCard from '../components/BookCard'
import { Box, Text, SimpleGrid } from '@chakra-ui/react'


function Dashboard() {
  const [books, setBooks] = useState([])

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

  return (
    <Box>
      <Navbar />
      <Box p={8}>
        {books.length === 0 
          ? <Text>No books yet</Text>
          : <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {books.map(book => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              status={book.status}
              cover_url={book.cover_url}
            />
          ))}
          </SimpleGrid>
        }
      </Box>
    </Box>
  )
}

export default Dashboard