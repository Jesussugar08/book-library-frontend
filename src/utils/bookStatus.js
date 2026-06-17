export const getBadgeColor = (status) => {
  if (status === 'read') return 'green'
  if (status === 'reading') return 'orange'
  if (status === 'want_to_read') return 'purple'
  return 'gray'
}

export const formatStatus = (status) => {
  if (status === 'want_to_read') return 'Want to Read'
  if (status === 'reading') return 'Reading'
  if (status === 'read') return 'Read'
  return status
}
