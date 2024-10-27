export function formatTransactionDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit'
  };
  
  return date.toLocaleDateString('es-AR', options);
};
