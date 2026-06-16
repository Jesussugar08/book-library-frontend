import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Text, Image, Button, 
         Badge, HStack, Heading } from '@chakra-ui/react'
import { getBookById, updateStatus } from '../services/bookService'
import Navbar from '../components/Navbar'

function BookDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [book, setBook] = useState(null)

    useInsertionEffect(() => {
        fetchBook()
    }, [])

    const fetchBook = async() =>{
        try{
            const data = await getBookById()
            setBook(data.data)
        }catch(err){
            console.log(err)
        }
    }
  return (
    <Box>
      <Navbar />
      <Box p={8}>
        <Text>Book ID: {id}</Text>
      </Box>
    </Box>
  )
}

export default BookDetail