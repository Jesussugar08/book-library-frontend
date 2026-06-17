import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBooks } from '../services/bookService'
import BookCard from '../components/BookCard'
import AppLayout from '../components/AppLayout'
import LoadingState from '../components/LoadingState'
import ErrorAlert from '../components/ErrorAlert'
import {
  Text, SimpleGrid, Button, Flex, Box, Input, InputGroup, InputLeftElement,
} from '@chakra-ui/react'
import { getApiErrorMessage } from '../utils/apiError'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'read', label: 'Read' },
  { key: 'reading', label: 'Reading' },
  { key: 'want_to_read', label: 'Want' },
]

function StatMini({ value, label, color }) {
  return (
    <Box bg="white" borderRadius="10px" border="1px" borderColor="#E2E8F0" p={3.5} textAlign="center">
      <Text fontSize="2xl" fontWeight="600" color={color}>{value}</Text>
      <Text fontSize="11px" color="#718096" mt="2px">{label}</Text>
    </Box>
  )
}

function Dashboard() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const navigate = useNavigate()

  useEffect(() => {
    let active = true
    getBooks()
      .then((data) => {
        if (active) setBooks(data.data)
      })
      .catch((err) => {
        if (active) setError(getApiErrorMessage(err, 'Failed to load books'))
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => { active = false }
  }, [])

  const counts = useMemo(() => ({
    total: books.length,
    read: books.filter((b) => b.status === 'read').length,
    reading: books.filter((b) => b.status === 'reading').length,
    want: books.filter((b) => b.status === 'want_to_read').length,
  }), [books])

  const filteredBooks = useMemo(() => {
    const q = search.trim().toLowerCase()
    return books.filter((book) => {
      const matchesFilter = filter === 'all' || book.status === filter
      const matchesSearch = !q
        || book.title?.toLowerCase().includes(q)
        || book.author?.toLowerCase().includes(q)
      return matchesFilter && matchesSearch
    })
  }, [books, search, filter])

  return (
    <AppLayout>
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={2.5} mb={5}>
        <StatMini value={counts.total} label="Total" color="#2B6CB0" />
        <StatMini value={counts.read} label="Read" color="#276749" />
        <StatMini value={counts.reading} label="Reading" color="#744210" />
        <StatMini value={counts.want} label="Want" color="#553C9A" />
      </SimpleGrid>

      <Flex align="center" justify="space-between" mb={3.5}>
        <Text fontSize="15px" fontWeight="600" color="#1A202C">My library</Text>
        <Button
          bg="brand.600"
          color="white"
          size="sm"
          borderRadius="8px"
          px={4}
          fontSize="13px"
          fontWeight="500"
          _hover={{ bg: 'brand.700' }}
          onClick={() => navigate('/add-book')}
        >
          + Add book
        </Button>
      </Flex>

      <InputGroup mb={3.5}>
        <InputLeftElement pointerEvents="none" color="#A0AEC0" pl={1}>
          🔍
        </InputLeftElement>
        <Input
          pl={10}
          bg="white"
          borderColor="#CBD5E0"
          borderRadius="8px"
          fontSize="13px"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      <Flex gap={2} mb={3.5} flexWrap="wrap">
        {FILTERS.map(({ key, label }) => (
          <Button
            key={key}
            size="sm"
            borderRadius="full"
            fontSize="12px"
            fontWeight="normal"
            px={3.5}
            py={1}
            bg={filter === key ? 'brand.600' : 'white'}
            color={filter === key ? 'white' : '#718096'}
            border="1px"
            borderColor={filter === key ? 'brand.600' : '#CBD5E0'}
            _hover={{ bg: filter === key ? 'brand.700' : 'gray.50' }}
            onClick={() => setFilter(key)}
          >
            {label}
          </Button>
        ))}
      </Flex>

      <ErrorAlert message={error} />

      {loading ? (
        <LoadingState message="Loading your library..." />
      ) : filteredBooks.length === 0 ? (
        <Text color="gray.500" fontSize="sm">
          {books.length === 0 ? 'No books yet. Add your first book!' : 'No books match your search.'}
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={3}>
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              status={book.status}
              cover_url={book.cover_url}
            />
          ))}
        </SimpleGrid>
      )}
    </AppLayout>
  )
}

export default Dashboard
