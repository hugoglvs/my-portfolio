
// Format date for display
export function formatDate(dateString: string): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Generate a random ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}
