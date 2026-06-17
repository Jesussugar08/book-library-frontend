import {
  Button,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { login } from '../services/authService'
import AuthLayout from '../components/AuthLayout'
import ErrorAlert from '../components/ErrorAlert'
import PasswordInput from '../components/PasswordInput'
import { getApiErrorMessage } from '../utils/apiError'

function Login() {
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
      const response = await login(email, password)
      loginContext(response.data.token, response.data.user)
      navigate('/dashboard')
    } catch (err) {
      setError(getApiErrorMessage(err, 'Invalid credentials'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      subtitle="Sign in to your account"
      onSubmit={handleSubmit}
      footer={{
        text: "Don't have an account? Sign up",
        onClick: () => navigate('/register'),
      }}
    >
      <ErrorAlert message={error} />

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
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        Sign in
      </Button>
    </AuthLayout>
  )
}

export default Login
