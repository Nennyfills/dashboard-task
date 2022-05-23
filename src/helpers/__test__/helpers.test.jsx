import currencyFormat, { dateFormat } from 'helpers';

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
    expect(result).toEqual('1/1/1970');
  });

  it('dateFormat should return formatted amount with number', () => {
    const result = dateFormat('4-3-2022');
    expect(result).toEqual('4/3/2022');
  });
});
