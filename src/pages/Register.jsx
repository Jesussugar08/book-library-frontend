
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
  import { register } from '../services/authService'
  
function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login: loginContext } = useContext(AuthContext)
    const navigate = useNavigate()
  
    const handleSubmit = async () => {
      try {
        // 1. Llamar al backend
        const response = await register(name, email, password)
        
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
        <Text textAlign="center">Create your account</Text>
  
        {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
        )}
        <VStack spacing = {3}>


        <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
        </FormControl>

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
            Sign up
          </Button>
        </VStack>
  
        <Text textAlign = "center"
          color = "blue.500" 
          cursor = "pointer"
          onClick={()=> navigate('/login')}
          >
  
        Already have an account? Sign in
        </Text>
  
      
        </Box>
  
      </Box>
     
    )
  }
  
  export default Register
