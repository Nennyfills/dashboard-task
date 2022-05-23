import { render, screen } from '@testing-library/react';
import EmptyState from '..';

it('Should render an EmptyState with class empty-state', () => {
  render(<EmptyState />);
  const emptyClass = screen.getByTestId('empty-state');
  expect(emptyClass).toHaveClass('empty-state');
});

it('renders a message', () => {
  const { getByText } = render(<EmptyState title="No Data" desc="No data was found" />);
  expect(getByText('No Data')).toBeInTheDocument();
  expect(getByText('No data was found')).toBeInTheDocument();
});
