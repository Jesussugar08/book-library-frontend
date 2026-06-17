import {
  Box,
  Heading,
  Text,
  VStack,
  Divider,
  Flex,
} from '@chakra-ui/react'
import ColorModeToggle from './ColorModeToggle'
import { BookIcon } from './icons/AppIcons'

function AuthLayout({ subtitle, children, footer, onSubmit }) {
  return (
    <Box
      minH="100vh"
      bg="page.bg"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
      position="relative"
    >
      <Box position="absolute" top={4} right={4}>
        <ColorModeToggle color="text.secondary" />
      </Box>
      <Box
        bg="surface.bg"
        p={{ base: 8, md: 9 }}
        borderRadius="16px"
        border="1px"
        borderColor="surface.border"
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
          color="white"
          mx="auto"
          mb={5}
        >
          <BookIcon boxSize={6} />
        </Flex>

        <Heading textAlign="center" size="md" color="text.primary" mb={1}>
          Book Library
        </Heading>
        <Text textAlign="center" fontSize="13px" color="text.secondary" mb={7}>
          {subtitle}
        </Text>

        <VStack spacing={4} as="form" onSubmit={onSubmit}>
          {children}
        </VStack>

        {footer && (
          <>
            <Divider my={5} borderColor="surface.border" />
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
