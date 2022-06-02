/* eslint-disable no-unused-vars */
const currencyFormat = (currency)=>{
  if (!currency) return 'N/A';
  const formatter = new Intl.NumberFormat('en-US', { currency: 'USD', });
  return `${formatter.format(currency)} USD`;
};

export const dateFormat = (val) => {
  if (!val) return 'N/A';
  const date = new Date(val);
  const result = date.toLocaleDateString('en-AU');
  return result?.split('/').join('.');
};

export const sortAsc = (arr) => {
  if (!arr?.length) return [];
  arr.sort((first, second)=> Number(new Date(first.created)) - Number(new Date(second.created)));
  return arr;
};

const backgroundColor = [
  '#F24E1E',
  '#FFC107',
];

export const getLabels = (arr) => {
  if (!arr?.length) return [];
  return arr.map((item, index)=> ({
    color: backgroundColor[index],
    name: item?.name
  }));
};

export const chartData = (arr) => {
  if (!arr?.length) return { datasets: [] };
  const data = [];
  arr?.forEach((itm)=> {
    const percent = (100 * itm.data.length) / itm.total;
    data.push(percent);
  });
  return {
    datasets: [{ data, backgroundColor }],
  };
};
export default currencyFormat;
