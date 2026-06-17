import { Center, Spinner, Text, VStack } from '@chakra-ui/react'

function LoadingState({ message = 'Loading...' }) {
  return (
    <Center minH="200px" py={12}>
      <VStack spacing={4}>
        <Spinner size="xl" color="blue.500" thickness="4px" />
        <Text color="gray.500">{message}</Text>
      </VStack>
    </Center>
  )
}

export default LoadingState
