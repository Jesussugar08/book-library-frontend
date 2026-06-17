import { useNavigate } from 'react-router-dom'
import { Box, Text, Image } from '@chakra-ui/react'
import StatusBadge from './StatusBadge'
import { BookIcon } from './icons/AppIcons'

function BookCard({ title, author, status, cover_url, id }) {
  const navigate = useNavigate()

  return (
    <Box
      border="1px"
      borderColor="surface.border"
      borderRadius="10px"
      overflow="hidden"
      bg="surface.bg"
      cursor="pointer"
      transition="transform 0.15s"
      _hover={{ transform: 'translateY(-2px)' }}
      onClick={() => navigate(`/books/${id}`)}
    >
      {cover_url ? (
        <Image src={cover_url} h="100px" w="100%" objectFit="cover" />
      ) : (
        <Box h="100px" bg="page.bg" display="flex" alignItems="center" justifyContent="center" color="text.tertiary">
          <BookIcon boxSize={8} />
        </Box>
      )}

      <Box p="10px">
        <Text
          fontSize="12px"
          fontWeight="600"
          color="text.primary"
          mb="2px"
          noOfLines={1}
        >
          {title}
        </Text>
        <Text fontSize="11px" color="text.secondary" mb="6px" noOfLines={1}>
          {author}
        </Text>
        <StatusBadge status={status} />
      </Box>
    </Box>
  )
}

export default BookCard
