import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
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
    page: {
      bg: '#EDF2F7',
    },
  },
  fonts: {
    heading: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: '#EDF2F7',
        color: '#1A202C',
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
    Input: {
      defaultProps: {
        bg: '#F7FAFC',
        borderColor: '#CBD5E0',
      },
    },
    Textarea: {
      defaultProps: {
        bg: '#F7FAFC',
        borderColor: '#CBD5E0',
      },
    },
  },
})

export default theme
