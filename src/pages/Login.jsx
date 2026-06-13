import {
  Box,
  Button,
  Input,
  Text,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { login } from '../services/authService'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login: loginContext } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      // 1. Llamar al backend
      const response = await login(email, password)
      
      // 2. Guardar token
      loginContext(response.data.token)
      
      // 3. Redirigir
      navigate('/dashboard')
      
    } catch(err) {
      // 4. Mostrar error
      setError('Invalid credentials')
    }
  }

  return (
    <Box minH="100vh" bg="gray.100" display="flex" 
    alignItems="center" justifyContent="center" >

      <Box bg="white" p={8} borderRadius="xl" 
      border="1px" borderColor="gray.200" w="380px">

      <Heading textAlign="center">Book Library</Heading>
      <Text textAlign="center">Sign in to your account</Text>

      {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
      )}
      <VStack spacing = {3}>
        <FormControl >
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Button
          
          colorScheme = "blue"
          width = "100%"
          onClick={handleSubmit}
        >
          Sign in
        </Button>
      </VStack>

      <Text textAlign = "center"
        color = "blue.500" 
        cursor = "pointer"
        onClick={()=> navigate('/register')}
        >

        Don't have an account? Sign up


      </Text>

    
      </Box>

    </Box>
   
  )
}

export default Login
