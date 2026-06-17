import { HStack, Text } from '@chakra-ui/react'

function StarRating({ value, size = 'md', onChange }) {
  const stars = [1, 2, 3, 4, 5]
  const fontSize = size === 'sm' ? '13px' : '16px'

  return (
    <HStack spacing={1}>
      {stars.map((star) => (
        <Text
          key={star}
          as="span"
          fontSize={fontSize}
          color={star <= Number(value) ? '#F6AD55' : '#E2E8F0'}
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
