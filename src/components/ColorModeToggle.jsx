import { IconButton, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

function ColorModeToggle({ color = 'white', ...props }) {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      aria-label={colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      icon={colorMode === 'light' ? <MoonIcon boxSize={4} /> : <SunIcon boxSize={4} />}
      onClick={toggleColorMode}
      variant="ghost"
      color={color}
      _hover={{ bg: 'whiteAlpha.200' }}
      {...props}
    />
  )
}

export default ColorModeToggle
