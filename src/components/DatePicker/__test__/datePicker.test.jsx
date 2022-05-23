import { render, screen, fireEvent } from '@testing-library/react';
import Input from '..';

it('Should render an input with class date-picker', () => {
  render(<Input />);
  const datePicker = screen.getByTestId('date-picker');
  expect(datePicker).toHaveClass('date-picker');
});

const setup = () => {
  const utils = render(<Input />);
  const input = utils.getByTestId('input');
  return {
    input,
    ...utils,
  };
};

it('It should no allow invalid date', () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: 6777 } });
  expect(input.value).toBe('');
});
it('It should allow only valid date', () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: '2020-05-24' } });
  expect(input.value).toBe('2020-05-24');
});
