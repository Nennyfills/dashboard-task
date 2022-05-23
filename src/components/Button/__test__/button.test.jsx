import { render, screen, fireEvent } from '@testing-library/react';
import Button from '..';

it('Should render a button with the class of primary', () => {
  render(<Button>I am primary</Button>);
  const primaryButton = screen.getByRole('button', { class: 'primary' });
  expect(primaryButton).toHaveClass('primary');
});

it('Should render a button with the class of secondary', () => {
  render(<Button variant="secondary">I am secondary</Button>);
  const secondaryButton = screen.getByRole('button', { class: 'secondary' });
  expect(secondaryButton).toHaveClass('secondary');
});

it('Should render a button when loading', () => {
  render(<Button loading>I am secondary</Button>);
  const secondaryButton = screen.getByText(/Processing/i);
  expect(secondaryButton).toBeVisible();
});

it('Should onClick prop when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>click</Button>);
  fireEvent.click(screen.getByText(/click/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
