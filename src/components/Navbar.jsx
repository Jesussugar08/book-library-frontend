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
  useColorModeValue,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, ArrowBackIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getUserInitials } from '../utils/userInitials'
import ColorModeToggle from './ColorModeToggle'
import { BookIcon, ChartBarIcon } from './icons/AppIcons'

function Navbar({ title, backTo }) {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const { isOpen, onToggle } = useDisclosure()
  const menuBg = useColorModeValue('white', 'gray.800')
  const menuColor = useColorModeValue('#1A202C', 'gray.100')
  const menuHover = useColorModeValue('#EDF2F7', 'gray.700')
  const menuBorder = useColorModeValue('#E2E8F0', 'gray.600')

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
        <Flex
          align="center"
          gap={2}
          fontWeight="600"
          fontSize="15px"
          cursor="pointer"
          onClick={handleTitleClick}
        >
          {title ? (
            <>
              <ArrowBackIcon boxSize={4} />
              <Text>{title}</Text>
            </>
          ) : (
            <>
              <BookIcon boxSize={4} />
              <Text>Book Library</Text>
            </>
          )}
        </Flex>
        <Spacer />

        <Flex align="center" gap={1}>
          <ColorModeToggle display={{ base: title ? 'flex' : 'none', md: 'flex' }} />

          {!title && (
            <Flex align="center" gap={2} display={{ base: 'none', md: 'flex' }}>
              <IconButton
                aria-label="Statistics"
                icon={<ChartBarIcon boxSize={4} />}
                variant="ghost"
                color="white"
                opacity={0.85}
                _hover={{ opacity: 1, bg: 'whiteAlpha.200' }}
                onClick={() => navigate('/stats')}
              />
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
                <MenuList bg={menuBg} color={menuColor} borderColor={menuBorder}>
                  <MenuItem
                    color={menuColor}
                    _hover={{ bg: menuHover }}
                    onClick={() => navigate('/dashboard')}
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem
                    color={menuColor}
                    _hover={{ bg: menuHover }}
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
              icon={isOpen ? <CloseIcon boxSize={4} /> : <HamburgerIcon boxSize={4} />}
              variant="ghost"
              color="white"
              aria-label="Toggle navigation"
            />
          )}
        </Flex>
      </Flex>

      {isOpen && !title && (
        <Stack spacing={2} pt={3} display={{ md: 'none' }}>
          <Flex align="center" justify="space-between">
            <Text fontSize="sm">Theme</Text>
            <ColorModeToggle size="sm" />
          </Flex>
          <Flex
            align="center"
            gap={2}
            cursor="pointer"
            onClick={() => { navigate('/stats'); onToggle() }}
          >
            <ChartBarIcon boxSize={4} />
            <Text fontSize="sm">Statistics</Text>
          </Flex>
          <Text cursor="pointer" onClick={handleLogout}>Log out</Text>
        </Stack>
      )}
    </Box>
  )
}

export default Navbar
