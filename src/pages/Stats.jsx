import { useState, useEffect, useMemo } from 'react'
import { Text, SimpleGrid, Box, Flex } from '@chakra-ui/react'
import { getStats, getBooks } from '../services/bookService'
import AppLayout from '../components/AppLayout'
import LoadingState from '../components/LoadingState'
import ErrorAlert from '../components/ErrorAlert'
import StarRating from '../components/StarRating'
import { getApiErrorMessage } from '../utils/apiError'

function StatMainCard({ icon, value, label, color }) {
  return (
    <Box bg="surface.bg" borderRadius="10px" border="1px" borderColor="surface.border" p={4}>
      <Text fontSize="22px" mb={2}>{icon}</Text>
      <Text fontSize="28px" fontWeight="600" color={color}>{value}</Text>
      <Text fontSize="12px" color="text.secondary" mt="2px">{label}</Text>
    </Box>
  )
}

function BarRow({ label, count, max, color }) {
  const width = max > 0 ? `${Math.round((count / max) * 100)}%` : '0%'
  return (
    <Box mb={2.5}>
      <Flex justify="space-between" fontSize="12px" color="text.secondary" mb={1.5}>
        <Text>{label}</Text>
        <Text>{count}</Text>
      </Flex>
      <Box bg="page.bg" borderRadius="4px" h="8px" overflow="hidden">
        <Box bg={color} h="8px" borderRadius="4px" w={width} transition="width 0.3s" />
      </Box>
    </Box>
  )
}

function Stats() {
  const [stats, setStats] = useState(null)
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    Promise.all([getStats(), getBooks()])
      .then(([statsData, booksData]) => {
        if (!active) return
        setStats(statsData.data)
        setBooks(booksData.data)
      })
      .catch((err) => {
        if (active) setError(getApiErrorMessage(err, 'Failed to load statistics'))
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => { active = false }
  }, [])

  const wantToRead = stats
    ? Number(stats.want_to_read) || 0
    : 0

  const avgRating = stats?.promedio
    ? Number(stats.promedio).toFixed(1)
    : '0'

  const statusCounts = useMemo(() => ({
    read: Number(stats?.leidos) || 0,
    reading: Number(stats?.leyendo) || 0,
    want: wantToRead,
  }), [stats, wantToRead])

  const maxStatus = Math.max(statusCounts.read, statusCounts.reading, statusCounts.want, 1)

  const topRated = useMemo(() =>
    [...books]
      .filter((b) => b.rating)
      .sort((a, b) => Number(b.rating) - Number(a.rating))
      .slice(0, 3),
  [books])

  return (
    <AppLayout maxW="700px" navTitle="My statistics" backTo="/dashboard">
      <ErrorAlert message={error} />

      {loading ? (
        <LoadingState message="Loading statistics..." />
      ) : stats ? (
        <>
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={2.5} mb={4}>
            <StatMainCard icon="📚" value={stats.total} label="Total books" color="#2B6CB0" />
            <StatMainCard icon="⭐" value={avgRating} label="Avg rating" color="#744210" />
            <StatMainCard icon="📖" value={stats.leyendo} label="Reading now" color="#553C9A" />
            <StatMainCard icon="✅" value={stats.leidos} label="Read" color="#276749" />
          </SimpleGrid>

          <Box bg="surface.bg" borderRadius="10px" border="1px" borderColor="surface.border" p={4} mb={3.5}>
            <Text fontSize="13px" fontWeight="600" color="text.primary" mb={3.5}>
              Books by status
            </Text>
            <BarRow label="Read" count={statusCounts.read} max={maxStatus} color="#38A169" />
            <BarRow label="Reading" count={statusCounts.reading} max={maxStatus} color="#DD6B20" />
            <BarRow label="Want to read" count={statusCounts.want} max={maxStatus} color="#805AD5" />
          </Box>

          <Box bg="surface.bg" borderRadius="10px" border="1px" borderColor="surface.border" p={4}>
            <Text fontSize="13px" fontWeight="600" color="text.primary" mb={3}>
              Top rated books
            </Text>
            {topRated.length === 0 ? (
              <Text fontSize="13px" color="text.secondary">No rated books yet.</Text>
            ) : (
              topRated.map((book, i) => (
                <Flex
                  key={book.id}
                  align="center"
                  gap={3}
                  py={2.5}
                  borderBottom={i < topRated.length - 1 ? '1px' : 'none'}
                  borderColor="surface.muted"
                >
                  <Text fontSize="13px" fontWeight="600" color="text.tertiary" w="18px">
                    {i + 1}
                  </Text>
                  <Box flex={1}>
                    <Text fontSize="13px" fontWeight="500" color="text.primary">{book.title}</Text>
                    <Text fontSize="11px" color="text.secondary">{book.author}</Text>
                  </Box>
                  <StarRating value={book.rating} size="sm" />
                </Flex>
              ))
            )}
          </Box>
        </>
      ) : (
        <Text color="gray.500" fontSize="sm">No statistics available yet. Start adding books!</Text>
      )}
    </AppLayout>
  )
}

export default Stats
