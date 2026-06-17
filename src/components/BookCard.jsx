import { useNavigate } from 'react-router-dom'
import { Box, Text, Image } from '@chakra-ui/react'
import StatusBadge from './StatusBadge'

function BookCard({ title, author, status, cover_url, id }) {
  const navigate = useNavigate()

  return (
    <Box
      border="1px"
      borderColor="#E2E8F0"
      borderRadius="10px"
      overflow="hidden"
      bg="white"
      cursor="pointer"
      transition="transform 0.15s"
      _hover={{ transform: 'translateY(-2px)' }}
      onClick={() => navigate(`/books/${id}`)}
    >
      {cover_url ? (
        <Image src={cover_url} h="100px" w="100%" objectFit="cover" />
      ) : (
        <Box h="100px" bg="#EDF2F7" display="flex" alignItems="center" justifyContent="center">
          <Text fontSize="36px">📖</Text>
        </Box>
      )}

      <Box p="10px">
        <Text
          fontSize="12px"
          fontWeight="600"
          color="#1A202C"
          mb="2px"
          noOfLines={1}
        >
          {title}
        </Text>
        <Text fontSize="11px" color="#718096" mb="6px" noOfLines={1}>
          {author}
        </Text>
        <StatusBadge status={status} />
      </Box>
    </Box>
  )
}

export default BookCard
