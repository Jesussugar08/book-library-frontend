export function getApiErrorMessage(err, fallback = 'Something went wrong') {
  return err?.response?.data?.error || err?.message || fallback
}
