export function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Добавляем ведущий ноль, если месяц однозначный
    const day = ('0' + currentDate.getDate()).slice(-2); // Добавляем ведущий ноль, если день однозначный
  
    return new Date(`${year}-${month}-${day}`);
  }