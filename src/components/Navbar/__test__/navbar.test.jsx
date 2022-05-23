/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/prefer-presence-queries */
import { render, screen } from '@testing-library/react';
import Navbar from '..';

it('Should take a snapshot', () => {
  const { asFragment } = render(<Navbar />);
  expect(asFragment(<Navbar />)).toMatchSnapshot();
});

it('Should render a navbar with test id navbar', () => {
  render(<Navbar />);
  const navbarClass = screen.getByTestId('navbar');
  expect(navbarClass).toBeTruthy();
  expect(navbarClass).toHaveClass('navbar');
});

it('Should render a navbar with test id icons', () => {
  render(<Navbar />);
  const navbarClass = screen.getByTestId('icons');
  expect(screen.queryByTestId('icons')).toBeTruthy();
  expect(navbarClass).toHaveClass('navbar__icon');
});

it('Should render a navbar with test id initials', () => {
  render(<Navbar />);
  const navbarClass = screen.getByTestId('initials');
  expect(screen.queryByTestId('initials')).toBeTruthy();
  expect(navbarClass).toHaveClass('navbar__avatar--initials');
});

it('Should render a navbar with test id details', () => {
  render(<Navbar />);
  const navbarClass = screen.getByTestId('details');
  expect(screen.queryByTestId('details')).toBeTruthy();
  expect(navbarClass).toHaveClass('navbar__avatar__details');
});

it('renders a message', () => {
  const { getByText } = render(<Navbar firstName="Joe" lastName="Doe" />);
  expect(getByText('Joe Doe')).toBeInTheDocument();
});
