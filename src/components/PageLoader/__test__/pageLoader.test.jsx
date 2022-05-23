import { render, screen } from '@testing-library/react';
import Loader from '..';

it('Should take a snapshot', () => {
  const { asFragment } = render(<Loader />);
  expect(asFragment(<Loader />)).toMatchSnapshot();
});

it('Should render a PageLoader with test id page-loader', () => {
  render(<Loader />);
  const pageLoadClass = screen.getByTestId('page-loader');
  expect(pageLoadClass).toBeTruthy();
  expect(pageLoadClass).toHaveClass('page-loader');
});

it('Should render a PageLoader with test id page-loader-flex', () => {
  render(<Loader />);
  const pageLoadClass = screen.getByTestId('page-loader-flex');
  expect(screen.queryByTestId('page-loader-flex')).toBeTruthy();
  expect(pageLoadClass).toHaveClass('flex');
});

it('Should render a PageLoader with test id page-loader-override', () => {
  render(<Loader />);
  const pageLoadClass = screen.getByTestId('page-loader-override');
  expect(screen.queryByTestId('page-loader-override')).toBeTruthy();
  expect(pageLoadClass).toHaveClass('override');
});

it('Should render a PageLoader with test id page-loader-bottom', () => {
  render(<Loader />);
  const pageLoadClass = screen.getByTestId('page-loader-bottom');
  expect(screen.queryByTestId('page-loader-bottom')).toBeTruthy();
  expect(pageLoadClass).toHaveClass('loader');
});
