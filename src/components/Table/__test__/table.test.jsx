/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen } from '@testing-library/react';
import Table from '..';

const schema = [
  {
    title: 'Transaction ID',
    render: (rowData) => <span>{rowData.paymentId || 'N/A'}</span>,
  },
  {
    title: 'Amount',
    render: (rowData) => <span>{rowData?.amount}</span>,
  },
];
const data = [
  {
    paymentId: '347677',
    amount: '676777',
  },
];

it('Should render an Table with class table-container', () => {
  render(<Table schema={schema} data={data} />);
  const tableClass = screen.getByTestId('table-container');
  expect(tableClass).toHaveClass('table-container');
});

it('renders a message', () => {
  const { getByText } = render(<Table schema={schema} data={data} />);

  expect(getByText('347677')).toBeInTheDocument();
  expect(getByText('676777')).toBeInTheDocument();
  expect(getByText('Transaction ID')).toBeInTheDocument();
  expect(getByText('Amount')).toBeInTheDocument();
});
