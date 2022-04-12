export const moneyFormat = (number, formatFront = 'Rp ', formatBack = ',-') => {
  return (
    formatFront + number?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  );
};
