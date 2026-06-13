import { Box, Input, Button, Text } from '@chakra-ui/react'

function Login() {
  return (
    <Box>
      <Text>Email</Text>
      <Input placeholder="email@example.com" />
      <Button colorScheme="blue">Login</Button>
    </Box>
  )
}

export default Login
