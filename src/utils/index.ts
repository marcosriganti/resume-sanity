export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    // month: 'numeric',
    // day: 'numeric',
    year: 'numeric',
  })
}
