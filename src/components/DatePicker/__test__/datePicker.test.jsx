import { render, screen, } from '@testing-library/react';
import Input from '..';

it('Should render an input with class date-picker', () => {
  render(<Input />);
  const datePicker = screen.getByTestId('date-picker');
  expect(datePicker).toHaveClass('date-picker');
});

it('It should no allow invalid date', () => {
  render(<Input value="" />);
  expect((screen.getByTestId('input')).value).toEqual('');
});
it('It should allow only valid date', () => {
  render(<Input value="2020-05-24" />);
  expect((screen.getByTestId('input')).value).toEqual('2020-05-24');
});
