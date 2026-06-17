import {
  Box,
  Heading,
  Text,
  VStack,
  Divider,
  Flex,
} from '@chakra-ui/react'

function AuthLayout({ subtitle, children, footer, onSubmit }) {
  return (
    <Box
      minH="100vh"
      bg="#EDF2F7"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box
        bg="white"
        p={{ base: 8, md: 9 }}
        borderRadius="16px"
        border="1px"
        borderColor="#E2E8F0"
        w="full"
        maxW="360px"
      >
        <Flex
          w="52px"
          h="52px"
          bg="brand.600"
          borderRadius="12px"
          align="center"
          justify="center"
          fontSize="24px"
          color="white"
          mx="auto"
          mb={5}
        >
          📚
        </Flex>

        <Heading textAlign="center" size="md" color="#1A202C" mb={1}>
          Book Library
        </Heading>
        <Text textAlign="center" fontSize="13px" color="#718096" mb={7}>
          {subtitle}
        </Text>

        <VStack spacing={4} as="form" onSubmit={onSubmit}>
          {children}
        </VStack>

        {footer && (
          <>
            <Divider my={5} borderColor="#E2E8F0" />
            <Text
              textAlign="center"
              fontSize="13px"
              color="brand.500"
              cursor="pointer"
              onClick={footer.onClick}
            >
              {footer.text}
            </Text>
          </>
        )}
      </Box>
    </Box>
  )
}

export default AuthLayout
