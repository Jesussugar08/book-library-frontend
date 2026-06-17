import {
  Button,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { register } from '../services/authService'
import AuthLayout from '../components/AuthLayout'
import ErrorAlert from '../components/ErrorAlert'
import { getApiErrorMessage } from '../utils/apiError'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login: loginContext } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await register(name, email, password)
      loginContext(response.data.token, response.data.user)
      navigate('/dashboard')
    } catch (err) {
      setError(getApiErrorMessage(err, 'Registration failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      subtitle="Create your account"
      onSubmit={handleSubmit}
      footer={{
        text: 'Already have an account? Sign in',
        onClick: () => navigate('/login'),
      }}
    >
      <ErrorAlert message={error} />

      <FormControl isRequired>
        <FormLabel fontSize="13px" fontWeight="500" color="text.primary">Name</FormLabel>
        <Input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          borderRadius="8px"
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel fontSize="13px" fontWeight="500" color="text.primary">Email address</FormLabel>
        <Input
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          borderRadius="8px"
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel fontSize="13px" fontWeight="500" color="text.primary">Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          borderRadius="8px"
        />
      </FormControl>

      <Button
        w="full"
        bg="brand.600"
        color="white"
        borderRadius="8px"
        fontSize="14px"
        fontWeight="500"
        _hover={{ bg: 'brand.700' }}
        type="submit"
        isLoading={loading}
      >
        Sign up
      </Button>
    </AuthLayout>
  )
}

export default Register
