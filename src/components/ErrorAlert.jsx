import { Alert, AlertIcon } from '@chakra-ui/react'

function ErrorAlert({ message }) {
  if (!message) return null

  return (
    <Alert status="error" borderRadius="md" mb={4}>
      <AlertIcon />
      {message}
    </Alert>
  )
}

export default ErrorAlert
