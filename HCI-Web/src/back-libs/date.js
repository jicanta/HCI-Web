const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth() + 1;
const currentYear = today.getFullYear();

export const formatTransactionDate = (transactionDate) => {
    const { day, month, year } = transactionDate;
    
    if (day === currentDay && month === currentMonth && year === currentYear) {
    return "Hoy";
    }

    const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    return `${day} de ${monthNames[month - 1]}`;
};