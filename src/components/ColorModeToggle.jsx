import { IconButton, Text, useColorMode } from '@chakra-ui/react'

function ColorModeToggle({ color = 'white', ...props }) {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      aria-label={colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      icon={<Text fontSize="lg" lineHeight={1}>{colorMode === 'light' ? '🌙' : '☀️'}</Text>}
      onClick={toggleColorMode}
      variant="ghost"
      color={color}
      _hover={{ bg: 'whiteAlpha.200' }}
      {...props}
    />
  )
}

export default ColorModeToggle
