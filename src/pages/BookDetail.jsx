import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box, Text, Image, Button, Flex, VStack, Divider, Textarea,
} from '@chakra-ui/react'
import { getBookById, updateStatus, deleteBook } from '../services/bookService'
import AppLayout from '../components/AppLayout'
import LoadingState from '../components/LoadingState'
import ErrorAlert from '../components/ErrorAlert'
import StatusBadge from '../components/StatusBadge'
import StarRating from '../components/StarRating'
import { formatStatus } from '../utils/bookStatus'
import { getApiErrorMessage } from '../utils/apiError'

const STATUS_TABS = ['want_to_read', 'reading', 'read']

const tabActiveStyle = {
  want_to_read: { bg: '#E9D8FD', color: '#553C9A', borderColor: '#E9D8FD' },
  reading: { bg: '#FEEBC8', color: '#744210', borderColor: '#FEEBC8' },
  read: { bg: '#C6F6D5', color: '#276749', borderColor: '#C6F6D5' },
}

function BookDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [readingStatus, setReadingStatus] = useState(null)
  const [rating, setRating] = useState(0)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [savingRating, setSavingRating] = useState(false)

  useEffect(() => {
    let active = true

    getBookById(id)
      .then((bookData) => {
        if (!active) return
        const data = bookData.data
        setBook(data)
        if (data.status) {
          setReadingStatus({
            status: data.status,
            rating: data.rating,
            notes: data.notes,
          })
          setRating(Number(data.rating) || 0)
          setNotes(data.notes || '')
        }
      })
      .catch((err) => {
        if (!active) return
        if (err.response?.status === 404) {
          setNotFound(true)
        } else {
          setError(getApiErrorMessage(err, 'Failed to load book'))
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => { active = false }
  }, [id])

  const currentStatus = readingStatus?.status

  const handleStatusChange = async (newStatus) => {
    try {
      const payload = { status: newStatus }
      if (newStatus === 'read') {
        payload.rating = rating || null
        payload.notes = notes
      }
      const result = await updateStatus(id, payload)
      setReadingStatus(result.data)
      if (result.data.rating) setRating(Number(result.data.rating))
      if (result.data.notes) setNotes(result.data.notes)
      setError('')
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to update status'))
    }
  }

  const handleSaveRating = async () => {
    setSavingRating(true)
    try {
      const result = await updateStatus(id, {
        status: currentStatus || 'read',
        rating: rating || null,
        notes,
      })
      setReadingStatus(result.data)
      setError('')
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to save rating'))
    } finally {
      setSavingRating(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this book?')) return
    try {
      await deleteBook(id)
      navigate('/dashboard')
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to delete book'))
    }
  }

  const metaParts = [book?.genre, book?.year, book?.pages ? `${book.pages} pages` : null].filter(Boolean)

  return (
    <AppLayout maxW="600px" navTitle="Book detail" backTo="/dashboard">
      <ErrorAlert message={error} />

      {loading ? (
        <LoadingState message="Loading book..." />
      ) : notFound ? (
        <VStack spacing={4}>
          <Text fontSize="lg" color="gray.500">Book not found.</Text>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </VStack>
      ) : book ? (
        <Box bg="white" borderRadius="12px" border="1px" borderColor="#E2E8F0" p={5}>
          <Flex gap={4} mb={4}>
            {book.cover_url ? (
              <Image
                src={book.cover_url}
                w="90px"
                h="120px"
                borderRadius="10px"
                objectFit="cover"
                border="1px"
                borderColor="#E2E8F0"
                flexShrink={0}
              />
            ) : (
              <Flex
                w="90px"
                h="120px"
                bg="#EDF2F7"
                borderRadius="10px"
                border="1px"
                borderColor="#E2E8F0"
                align="center"
                justify="center"
                fontSize="40px"
                flexShrink={0}
              >
                📗
              </Flex>
            )}

            <Box flex={1}>
              <Text fontSize="17px" fontWeight="600" color="#1A202C" mb={1}>{book.title}</Text>
              <Text fontSize="13px" color="#718096" mb={1.5}>{book.author}</Text>
              {metaParts.length > 0 && (
                <Text fontSize="12px" color="#A0AEC0" mb={2.5}>
                  {metaParts.join(' · ')}
                </Text>
              )}
              {currentStatus && <StatusBadge status={currentStatus} />}
            </Box>
          </Flex>

          <Flex gap={1.5}>
            {STATUS_TABS.map((status) => {
              const active = currentStatus === status
              const style = active ? tabActiveStyle[status] : { bg: 'white', color: '#718096', borderColor: '#E2E8F0' }
              return (
                <Button
                  key={status}
                  flex={1}
                  size="sm"
                  fontSize="11px"
                  fontWeight="500"
                  border="1px"
                  borderRadius="8px"
                  bg={style.bg}
                  color={style.color}
                  borderColor={style.borderColor}
                  _hover={{ bg: style.bg }}
                  onClick={() => handleStatusChange(status)}
                >
                  {formatStatus(status)}
                </Button>
              )
            })}
          </Flex>

          <Divider my={4} borderColor="#E2E8F0" />

          <Text fontSize="12px" color="#718096" fontWeight="500" mb={1}>Rating</Text>
          <Box mb={3}>
            <StarRating value={rating} onChange={(v) => { setRating(v); }} />
          </Box>

          <Text fontSize="12px" color="#718096" fontWeight="500" mb={1}>My notes</Text>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            bg="#F7FAFC"
            borderColor="#E2E8F0"
            borderRadius="8px"
            fontSize="13px"
            minH="80px"
            mb={3}
            placeholder="Your thoughts on this book..."
          />

          {book.description && (
            <Box mb={3}>
              <Text fontSize="12px" color="#718096" fontWeight="500" mb={1}>Description</Text>
              <Text fontSize="14px" color="#2D3748">{book.description}</Text>
            </Box>
          )}

          <Button
            w="full"
            bg="brand.600"
            color="white"
            borderRadius="8px"
            fontSize="13px"
            mb={3}
            _hover={{ bg: 'brand.700' }}
            onClick={handleSaveRating}
            isLoading={savingRating}
          >
            Save rating & notes
          </Button>

          <Flex gap={2}>
            <Button
              flex={1}
              bg="brand.600"
              color="white"
              borderRadius="8px"
              fontSize="13px"
              _hover={{ bg: 'brand.700' }}
              onClick={() => navigate(`/books/${id}/edit`)}
            >
              ✏️ Edit book
            </Button>
            <Button
              bg="white"
              color="#E53E3E"
              border="1px"
              borderColor="#FEB2B2"
              borderRadius="8px"
              fontSize="13px"
              px={4}
              _hover={{ bg: 'red.50' }}
              onClick={handleDelete}
            >
              🗑️ Delete
            </Button>
          </Flex>
        </Box>
      ) : null}
    </AppLayout>
  )
}

export default BookDetail
