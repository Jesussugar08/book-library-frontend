import Navbar from '../components/Navbar'
import { Box } from '@chakra-ui/react'

function Dashboard() {
  return (
    <Box>
      <Navbar />
      <Box p={8}>
        <h1>Dashboard</h1>
      </Box>
    </Box>
  )
}

export default Dashboard