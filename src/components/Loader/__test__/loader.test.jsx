import { render, screen } from '@testing-library/react';
import Loader from '..';

it('should take a snapshot', () => {
  const { asFragment } = render(<Loader />);
  expect(asFragment(<Loader />)).toMatchSnapshot();
});

it('Should render a Loader with test id single-loader', () => {
  render(<Loader cols={5} rows={7} notTable />);
  expect(screen.queryByTestId('single-loader')).toBeTruthy();
  expect(screen.queryAllByTestId('single-loader')).toHaveLength(1);
});

it('Should render a Loader with test id col', () => {
  render(<Loader cols={2} rows={3} />);
  expect(screen.queryAllByTestId('col')).toBeTruthy();
  expect(screen.queryAllByTestId('col')).toHaveLength(6);
});
