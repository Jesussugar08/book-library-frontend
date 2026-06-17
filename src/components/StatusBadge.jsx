import { Badge } from '@chakra-ui/react'
import { formatStatus } from '../utils/bookStatus'

const styles = {
  read: { bg: '#C6F6D5', color: '#276749' },
  reading: { bg: '#FEEBC8', color: '#744210' },
  want_to_read: { bg: '#E9D8FD', color: '#553C9A' },
}

function StatusBadge({ status }) {
  if (!status) return null
  const s = styles[status] || { bg: 'gray.100', color: 'gray.600' }

  return (
    <Badge
      bg={s.bg}
      color={s.color}
      fontSize="11px"
      fontWeight="500"
      px="10px"
      py="3px"
      borderRadius="full"
      textTransform="none"
    >
      {formatStatus(status)}
    </Badge>
  )
}

export default StatusBadge
