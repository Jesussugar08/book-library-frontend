import { useState } from 'react'
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
} from '@chakra-ui/react'

function PasswordInput(props) {
  const [show, setShow] = useState(false)

  return (
    <InputGroup>
      <Input
        type={show ? 'text' : 'password'}
        pr="2.75rem"
        borderRadius="8px"
        {...props}
      />
      <InputRightElement h="full" pr={1}>
        <IconButton
          type="button"
          aria-label={show ? 'Hide password' : 'Show password'}
          icon={<Text fontSize="sm" lineHeight={1}>{show ? '🙈' : '👁️'}</Text>}
          variant="ghost"
          size="sm"
          color="text.tertiary"
          _hover={{ bg: 'transparent', color: 'text.secondary' }}
          onClick={() => setShow((prev) => !prev)}
        />
      </InputRightElement>
    </InputGroup>
  )
}

export default PasswordInput
