import {
    Box,      
    Flex,     
    Heading,  
    Button,   
    Spacer,   
  } from '@chakra-ui/react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

    function Navbar() {
    const { logout } = useContext(AuthContext)
    const navigate = useNavigate()
  
    const handleLogout = () => {
      logout()
      navigate('/login')
    }
  
    return (
      <Flex bg="blue.700" p={4} color="white">
        <Heading size="md">📚 Book Library</Heading>
        <Spacer />
        <Button onClick={handleLogout}>Salir</Button>
        
      </Flex>
    )
  }

  export default Navbar