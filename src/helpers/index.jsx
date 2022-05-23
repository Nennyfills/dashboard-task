const currencyFormat = (currency)=>{
  if (!currency) return 'N/A';
  const formatter = new Intl.NumberFormat('en-US', { currency: 'USD', });
  return `${formatter.format(currency)} USD`;
};

export const dateFormat = (val) => {
  if (!val) return 'N/A';
  const date = new Date(val);
  return date.toLocaleDateString('en-US');
};

export default currencyFormat;
