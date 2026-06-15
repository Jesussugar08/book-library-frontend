import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Button, Input, FormControl,
  FormLabel, VStack, Heading, Textarea
} from '@chakra-ui/react'
import { createBook } from '../services/bookService'
import Navbar from '../components/Navbar'
import api from '../services/apitemp'

function AddBook() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [pages, setPages] = useState('')
  const [genre, setGenre] = useState('')
  const [year, setYear] = useState('')
  const [description, setDescription] = useState('')
  const [coverUrl, setCoverUrl] = useState('')
  const navigate = useNavigate()

  const handleImageUpload = async (e) => {
    console.log('Archivo seleccionado:', e.target.files[0])
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('cover', file)
    const response = await api.post('/upload/cover', formData)
    setCoverUrl(response.data.data.url)
  }

  const handleSubmit = async () => {
    try {
      await createBook({
        title,
        author,
        cover_url: coverUrl,
        pages,
        genre,
        year,
        description
      })
      navigate('/dashboard')
    } catch(err) {
      console.error(err)
    }
  }



    return(
        <Box >
            <Navbar/>
            <Box bg="gray.100" minH="100vh" p={8}>
                <Box bg="white" borderRadius="xl" 
                     border="1px" borderColor="gray.200" 
                     p={8} maxW="600px" margin="0 auto">
                    
                    <Heading mb = {6}>Add New Book</Heading>

                    <VStack spacing={4}>

                        <FormControl>
                            <FormLabel>Cover Image</FormLabel>
                            <Input type="file" accept="image/*" onChange={handleImageUpload}/>
                            
                        </FormControl>

                        <FormControl>
                            <FormLabel>Title *</FormLabel>
                            <Input
                                value = {title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Author *</FormLabel>
                            <Input 
                                value={author} 
                                onChange={(e) => setAuthor(e.target.value)} 
                            />
                            </FormControl>

                            <FormControl>
                            <FormLabel>Genre</FormLabel>
                            <Input 
                                value={genre} 
                                onChange={(e) => setGenre(e.target.value)} 
                            />
                            </FormControl>

                            <FormControl>
                            <FormLabel>Year</FormLabel>
                            <Input 
                                type="number"
                                value={year} 
                                onChange={(e) => setYear(e.target.value)} 
                            />
                            </FormControl>

                            <FormControl>
                            <FormLabel>Pages</FormLabel>
                            <Input 
                                type="number"
                                value={pages} 
                                onChange={(e) => setPages(e.target.value)} 
                            />
                            </FormControl>

                            <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                            />
                            </FormControl>

                            <Button 
                            colorScheme="blue" 
                            width="100%" 
                            onClick={handleSubmit}
                            >
                            Save Book
                            </Button>

                            <Button 
                            width="100%" 
                            onClick={() => navigate('/dashboard')}
                            >
                            Cancel
                            </Button>


                    </VStack>


                </Box>
            </Box>
        </Box>

    )

}

export default AddBook