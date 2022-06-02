import currencyFormat, { chartData, dateFormat, getLabels, sortAsc } from 'helpers';

describe('Helper', () => {
  it('currencyFormat should return N/A if value is not provided', () => {
    const result = currencyFormat();

    expect(result).toEqual('N/A');
  });
  it('currencyFormat should return formatted amount with string', () => {
    const result = currencyFormat('3334444434');
    expect(result).toEqual('3,334,444,434 USD');
  });

  it('currencyFormat should return formatted amount with number', () => {
    const result = currencyFormat(45443333);
    expect(result).toEqual('45,443,333 USD');
  });

  it('dateFormat should return N/A if value is not provided', () => {
    const result = dateFormat();
    expect(result).toEqual('N/A');
  });
  it('dateFormat should return formatted amount with string', () => {
    const result = dateFormat('3334444434');
    expect(result).toEqual('Invalid Date');
  });

  it('dateFormat should return formatted amount with number', () => {
    const result = dateFormat('1/1/1970');
    expect(result).toEqual('01.01.1970');
  });

  it('dateFormat should return formatted amount with number', () => {
    const result = dateFormat('12-04-2022');
    expect(result).toEqual('04.12.2022');
  });

  it('sortAsc should return [] with parameter is empty', () => {
    const result = sortAsc([]);
    expect(result).toEqual([]);
  });

  it('sortAsc should be define with parameter', () => {
    const result = sortAsc([{ name: 'peter', created: '02-2-2022', data: ['here'], total: 9000990 }]);
    expect(result).toBeDefined();
  });

  it('getLabels should return [] with parameter is empty', () => {
    const result = getLabels([]);
    expect(result).toEqual([]);
  });

  it('getLabels should be define with parameter', () => {
    const result = getLabels([{ name: 'peter', created: '02-2-2022', data: ['here'], total: 9000990 }]);
    expect(result).toBeDefined();
  });

  it('chartData should return [] with parameter is empty', () => {
    const result = chartData([]);
    expect(result).toEqual({ datasets: [] });
  });

  it('chartData should be define with parameter', () => {
    const result = chartData([{ name: 'peter', created: '02-2-2022', data: ['here'], total: 9000990 }]);
    expect(result).toBeDefined();
  });
});
