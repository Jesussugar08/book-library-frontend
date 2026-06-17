import {
  Box,
  Flex,
  Text,
  Spacer,
  IconButton,
  useDisclosure,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getUserInitials } from '../utils/userInitials'

function Navbar({ title, backTo }) {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const { isOpen, onToggle } = useDisclosure()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleTitleClick = () => {
    if (backTo) navigate(backTo)
    else navigate('/dashboard')
  }

  return (
    <Box bg="brand.600" color="white" px={5} py={3}>
      <Flex align="center">
        <Text
          fontWeight="600"
          fontSize="15px"
          cursor="pointer"
          onClick={handleTitleClick}
          display="flex"
          alignItems="center"
          gap={2}
        >
          {title ? `← ${title}` : '📚 Book Library'}
        </Text>
        <Spacer />

        {!title && (
          <Flex align="center" gap={3} display={{ base: 'none', md: 'flex' }}>
            <Text
              fontSize="18px"
              cursor="pointer"
              opacity={0.85}
              _hover={{ opacity: 1 }}
              onClick={() => navigate('/stats')}
              aria-label="Statistics"
            >
              📊
            </Text>
            <Menu>
              <MenuButton>
                <Flex
                  w="30px"
                  h="30px"
                  borderRadius="full"
                  bg="#63B3ED"
                  align="center"
                  justify="center"
                  fontSize="11px"
                  fontWeight="600"
                  color="#1A365D"
                  cursor="pointer"
                >
                  {getUserInitials(user)}
                </Flex>
              </MenuButton>
              <MenuList bg="white" color="#1A202C" borderColor="#E2E8F0">
                <MenuItem
                  color="#1A202C"
                  _hover={{ bg: '#EDF2F7' }}
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </MenuItem>
                <MenuItem
                  color="#1A202C"
                  _hover={{ bg: '#EDF2F7' }}
                  onClick={handleLogout}
                >
                  Log out
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        )}

        {!title && (
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onToggle}
            icon={<Text fontSize="xl" lineHeight={1}>{isOpen ? '✕' : '☰'}</Text>}
            variant="ghost"
            color="white"
            aria-label="Toggle navigation"
          />
        )}
      </Flex>

      {isOpen && !title && (
        <Stack spacing={2} pt={3} display={{ md: 'none' }}>
          <Text cursor="pointer" onClick={() => { navigate('/stats'); onToggle() }}>📊 Statistics</Text>
          <Text cursor="pointer" onClick={handleLogout}>Log out</Text>
        </Stack>
      )}
    </Box>
  )
}

export default Navbar
