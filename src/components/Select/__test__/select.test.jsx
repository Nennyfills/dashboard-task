import { render, screen } from '@testing-library/react';

import Select from '..';

const options = [{ value: 'working', label: 'project' }];
it('Should render an select with select-container class', () => {
  render(<Select active={{ value: 'working', label: 'project' }} options={options} />);
  const select = screen.getByTestId('select-container');
  expect(select).toHaveClass('select-container');
});

it('Simulates selection', () => {
  render(<Select active={{ value: 'working', label: 'project' }} options={options} />);
  expect((screen.getByTestId('select 1')).value).toBeTruthy();
});
