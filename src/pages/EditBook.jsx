import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box, Button, Input, FormControl, FormLabel, VStack, Textarea, Text, Flex, SimpleGrid,
} from '@chakra-ui/react'
import { getBookById, updateBook } from '../services/bookService'
import AppLayout from '../components/AppLayout'
import LoadingState from '../components/LoadingState'
import ErrorAlert from '../components/ErrorAlert'
import { getApiErrorMessage } from '../utils/apiError'

function SectionTitle({ children }) {
  return (
    <Text
      fontSize="13px"
      fontWeight="600"
      color="#2D3748"
      mb={3}
      pb={2}
      borderBottom="1px"
      borderColor="#E2E8F0"
    >
      {children}
    </Text>
  )
}

function EditBook() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [pages, setPages] = useState('')
  const [genre, setGenre] = useState('')
  const [year, setYear] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    let active = true
    getBookById(id)
      .then((data) => {
        if (!active) return
        const book = data.data
        setTitle(book.title || '')
        setAuthor(book.author || '')
        setPages(book.pages?.toString() || '')
        setGenre(book.genre || '')
        setYear(book.year?.toString() || '')
        setDescription(book.description || '')
      })
      .catch((err) => {
        if (active) setError(getApiErrorMessage(err, 'Failed to load book'))
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => { active = false }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidationError('')

    if (!title.trim() || !author.trim()) {
      setValidationError('Title and author are required.')
      return
    }

    setSaving(true)
    setError('')
    try {
      await updateBook(id, {
        title: title.trim(),
        author: author.trim(),
        pages: pages || null,
        genre: genre || null,
        year: year || null,
        description: description || null,
      })
      navigate(`/books/${id}`)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to update book'))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AppLayout maxW="600px" navTitle="Edit book" backTo={`/books/${id}`}>
        <LoadingState message="Loading book..." />
      </AppLayout>
    )
  }

  return (
    <AppLayout maxW="600px" navTitle="Edit book" backTo={`/books/${id}`}>
      <Box bg="white" borderRadius="12px" border="1px" borderColor="#E2E8F0" p={5}>
        <ErrorAlert message={validationError || error} />

        <VStack spacing={4} as="form" onSubmit={handleSubmit} align="stretch">
          <Box>
            <SectionTitle>Book info</SectionTitle>

            <FormControl isRequired mb={3.5}>
              <FormLabel fontSize="13px" fontWeight="500" color="#2D3748" mb={1.5}>Title *</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} borderRadius="8px" />
            </FormControl>

            <FormControl isRequired mb={3.5}>
              <FormLabel fontSize="13px" fontWeight="500" color="#2D3748" mb={1.5}>Author *</FormLabel>
              <Input value={author} onChange={(e) => setAuthor(e.target.value)} borderRadius="8px" />
            </FormControl>

            <SimpleGrid columns={2} spacing={2.5} mb={3.5}>
              <FormControl>
                <FormLabel fontSize="13px" fontWeight="500" color="#2D3748" mb={1.5}>Genre</FormLabel>
                <Input value={genre} onChange={(e) => setGenre(e.target.value)} borderRadius="8px" />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="13px" fontWeight="500" color="#2D3748" mb={1.5}>Year</FormLabel>
                <Input type="number" value={year} onChange={(e) => setYear(e.target.value)} borderRadius="8px" />
              </FormControl>
            </SimpleGrid>

            <FormControl mb={3.5}>
              <FormLabel fontSize="13px" fontWeight="500" color="#2D3748" mb={1.5}>Pages</FormLabel>
              <Input type="number" value={pages} onChange={(e) => setPages(e.target.value)} borderRadius="8px" />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="13px" fontWeight="500" color="#2D3748" mb={1.5}>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                borderRadius="8px"
                minH="80px"
                resize="none"
              />
            </FormControl>
          </Box>

          <Flex gap={2}>
            <Button
              variant="outline"
              borderColor="#CBD5E0"
              color="#718096"
              borderRadius="8px"
              fontSize="13px"
              px={5}
              onClick={() => navigate(`/books/${id}`)}
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
              isLoading={saving}
            >
              Save changes
            </Button>
          </Flex>
        </VStack>
      </Box>
    </AppLayout>
  )
}

export default EditBook
