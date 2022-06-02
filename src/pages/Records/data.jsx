import currencyFormat, { dateFormat } from 'helpers';

export const tableSchema = [
  {
    title: 'Date',
    render: (rowData) => <span>{dateFormat(rowData?.created) || 'N/A'}</span>,
  },
  {
    title: 'Gateway',
    render: (rowData) => <span>{rowData.gatewayId || 'N/A'}</span>,
  },
  {
    title: 'Transaction ID',
    render: (rowData) => <span>{rowData.paymentId || 'N/A'}</span>,
  },
  {
    title: 'Amount',
    render: (rowData) => <span>{currencyFormat(rowData?.amount)}</span>,
  },
];

export const tableSchema2 = [
  {
    title: 'Date',
    render: (rowData) => <span>{dateFormat(rowData?.created) || 'N/A'}</span>,
  },
  {
    title: 'Transaction ID',
    render: (rowData) => <span>{rowData.paymentId || 'N/A'}</span>,
  },
  {
    title: 'Amount',
    render: (rowData) => <span>{currencyFormat(rowData?.amount)}</span>,
  },
];
