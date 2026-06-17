import { Box, Container } from '@chakra-ui/react'
import Navbar from './Navbar'

function AppLayout({ children, maxW = 'container.xl', navTitle, backTo }) {
  return (
    <Box minH="100vh" bg="#EDF2F7">
      <Navbar title={navTitle} backTo={backTo} />
      <Container maxW={maxW} py={5} px={{ base: 4, md: 5 }}>
        {children}
      </Container>
    </Box>
  )
}

export default AppLayout
