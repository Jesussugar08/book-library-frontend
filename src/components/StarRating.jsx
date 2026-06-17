import { HStack, Text, useColorModeValue } from '@chakra-ui/react'

function StarRating({ value, size = 'md', onChange }) {
  const stars = [1, 2, 3, 4, 5]
  const fontSize = size === 'sm' ? '13px' : '16px'
  const emptyColor = useColorModeValue('#E2E8F0', 'gray.600')

  return (
    <HStack spacing={1}>
      {stars.map((star) => (
        <Text
          key={star}
          as="span"
          fontSize={fontSize}
          color={star <= Number(value) ? '#F6AD55' : emptyColor}
          cursor={onChange ? 'pointer' : 'default'}
          letterSpacing="1px"
          onClick={() => onChange?.(star)}
        >
          ★
        </Text>
      ))}
    </HStack>
  )
}

export default StarRating
