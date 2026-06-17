import { HStack, useColorModeValue } from '@chakra-ui/react'
import { StarIcon } from './icons/AppIcons'

function StarRating({ value, size = 'md', onChange }) {
  const stars = [1, 2, 3, 4, 5]
  const boxSize = size === 'sm' ? 3.5 : 4
  const emptyColor = useColorModeValue('#E2E8F0', 'gray.600')

  return (
    <HStack spacing={0.5}>
      {stars.map((star) => (
        <StarIcon
          key={star}
          boxSize={boxSize}
          color={star <= Number(value) ? '#F6AD55' : emptyColor}
          cursor={onChange ? 'pointer' : 'default'}
          onClick={() => onChange?.(star)}
        />
      ))}
    </HStack>
  )
}

export default StarRating
