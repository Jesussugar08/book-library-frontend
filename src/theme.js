import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#ebf8ff',
      100: '#bee3f8',
      200: '#90cdf4',
      300: '#63b3ed',
      400: '#4299e1',
      500: '#3182ce',
      600: '#2b6cb0',
      700: '#2c5282',
      800: '#2a4365',
      900: '#1a365d',
    },
  },
  semanticTokens: {
    colors: {
      'page.bg': { default: '#EDF2F7', _dark: 'gray.900' },
      'surface.bg': { default: 'white', _dark: 'gray.800' },
      'surface.border': { default: '#E2E8F0', _dark: 'gray.600' },
      'surface.muted': { default: '#F7FAFC', _dark: 'gray.700' },
      'text.primary': { default: '#1A202C', _dark: 'gray.100' },
      'text.secondary': { default: '#718096', _dark: 'gray.400' },
      'text.tertiary': { default: '#A0AEC0', _dark: 'gray.500' },
    },
  },
  fonts: {
    heading: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : '#EDF2F7',
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : '#1A202C',
      },
    }),
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
})

export default theme
