import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Button, Input, FormControl, FormLabel, VStack, Textarea, Image, Text, Flex, SimpleGrid,
} from '@chakra-ui/react'
import { createBook } from '../services/bookService'
import AppLayout from '../components/AppLayout'
import ErrorAlert from '../components/ErrorAlert'
import api from '../services/api'
import { getApiErrorMessage } from '../utils/apiError'

function SectionTitle({ children }) {
  return (
    <Text
      fontSize="13px"
      fontWeight="600"
      color="text.primary"
      mb={3}
      pb={2}
      borderBottom="1px"
      borderColor="surface.border"
    >
      {children}
    </Text>
  )
}

function AddBook() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [pages, setPages] = useState('')
  const [genre, setGenre] = useState('')
  const [year, setYear] = useState('')
  const [description, setDescription] = useState('')
  const [coverUrl, setCoverUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [validationError, setValidationError] = useState('')
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('cover', file)
      const response = await api.post('/upload/cover', formData)
      setCoverUrl(response.data.data.url)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to upload cover image'))
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidationError('')

    if (!title.trim() || !author.trim()) {
      setValidationError('Title and author are required.')
      return
    }

    setLoading(true)
    setError('')
    try {
      await createBook({
        title: title.trim(),
        author: author.trim(),
        cover_url: coverUrl,
        pages: pages || null,
        genre: genre || null,
        year: year || null,
        description: description || null,
      })
      navigate('/dashboard')
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to create book'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppLayout maxW="600px" navTitle="Add new book" backTo="/dashboard">
      <Box bg="surface.bg" borderRadius="12px" border="1px" borderColor="surface.border" p={5}>
        <ErrorAlert message={validationError || error} />

        <VStack spacing={4} as="form" onSubmit={handleSubmit} align="stretch">
          <Box>
            <SectionTitle>Book cover</SectionTitle>
            <Box
              border="2px dashed"
              borderColor="surface.border"
              borderRadius="10px"
              p={6}
              textAlign="center"
              bg="surface.muted"
              cursor="pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                display="none"
                onChange={handleImageUpload}
              />
              {coverUrl ? (
                <Image src={coverUrl} maxH="160px" mx="auto" borderRadius="8px" objectFit="cover" />
              ) : (
                <>
                  <Text fontSize="32px" color="text.tertiary" mb={2}>📤</Text>
                  <Text fontSize="12px" color="text.secondary" lineHeight="tall">
                    <Text as="span" color="brand.500" fontWeight="500">Click to upload</Text>
                    {' '}cover image
                    <br />
                    JPG, PNG up to 2MB
                  </Text>
                </>
              )}
              {uploading && <Text fontSize="sm" color="gray.500" mt={2}>Uploading...</Text>}
            </Box>
          </Box>

          <Box>
            <SectionTitle>Book info</SectionTitle>

            <FormControl isRequired mb={3.5}>
              <FormLabel fontSize="13px" fontWeight="500" color="text.primary" mb={1.5}>Title *</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} borderRadius="8px" />
            </FormControl>

            <FormControl isRequired mb={3.5}>
              <FormLabel fontSize="13px" fontWeight="500" color="text.primary" mb={1.5}>Author *</FormLabel>
              <Input value={author} onChange={(e) => setAuthor(e.target.value)} borderRadius="8px" />
            </FormControl>

            <SimpleGrid columns={2} spacing={2.5} mb={3.5}>
              <FormControl>
                <FormLabel fontSize="13px" fontWeight="500" color="text.primary" mb={1.5}>Genre</FormLabel>
                <Input value={genre} onChange={(e) => setGenre(e.target.value)} borderRadius="8px" />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="13px" fontWeight="500" color="text.primary" mb={1.5}>Year</FormLabel>
                <Input type="number" value={year} onChange={(e) => setYear(e.target.value)} borderRadius="8px" />
              </FormControl>
            </SimpleGrid>

            <FormControl mb={3.5}>
              <FormLabel fontSize="13px" fontWeight="500" color="text.primary" mb={1.5}>Pages</FormLabel>
              <Input type="number" value={pages} onChange={(e) => setPages(e.target.value)} borderRadius="8px" />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="13px" fontWeight="500" color="text.primary" mb={1.5}>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                borderRadius="8px"
                minH="80px"
                resize="none"
              />
            </FormControl>
          </Box>

          <Flex gap={2} mt={1}>
            <Button
              variant="outline"
              borderColor="surface.border"
              color="text.secondary"
              borderRadius="8px"
              fontSize="13px"
              px={5}
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </Button>
            <Button
              flex={1}
              type="submit"
              bg="brand.600"
              color="white"
              borderRadius="8px"
              fontSize="13px"
              _hover={{ bg: 'brand.700' }}
              isLoading={loading}
            >
              Save book
            </Button>
          </Flex>
        </VStack>
      </Box>
    </AppLayout>
  )
}

export default AddBook
