import currencyFormat, { dateFormat } from 'helpers';

export const labels = [
  { color: '#A259FF', label: 'Project 1' },
  { color: '#6497B1', label: 'Project 2' },
  { color: '#FFC107', label: 'Project 3' },
  { color: '#F24E1E', label: 'Project 4' }
];

export const chartData = {
  datasets: [
    {
      label: '# of Votes',
      data: [15, 15, 10, 60],
      backgroundColor: [
        '#F24E1E',
        '#FFC107',
        '#6497B1',
        '#A259FF',
      ],
    },
  ],
};
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
