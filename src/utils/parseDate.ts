export function parseDate(date: Date){
  return date.toISOString().split('T')[0]
}