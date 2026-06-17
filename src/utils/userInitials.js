export function getUserInitials(user) {
  if (!user?.name) return '?'
  return user.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
