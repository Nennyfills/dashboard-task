import { render, screen } from '@testing-library/react';
import Footer from '..';

it('Should render footer with class footer-container', () => {
  render(<Footer />);
  const footerClass = screen.getByTestId('footer-container');
  expect(footerClass).toHaveClass('footer-container');
});

it('renders a message', () => {
  const { getByText } = render(<Footer />);
  expect(getByText('Terms&Conditions | Privacy policy')).toBeInTheDocument();
});
