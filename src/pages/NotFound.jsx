import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <Box minH="100vh" bg="gray.100" display="flex" alignItems="center" justifyContent="center" px={4}>
      <VStack spacing={4} textAlign="center">
        <Heading size="2xl">404</Heading>
        <Text color="gray.600" fontSize="lg">Page not found</Text>
        <Button colorScheme="blue" onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </Button>
      </VStack>
    </Box>
  )
}

export default NotFound
