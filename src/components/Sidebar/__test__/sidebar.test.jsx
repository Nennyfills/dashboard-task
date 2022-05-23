import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import SideBar from '..';

const history = createMemoryHistory();

let TagRender;
let Tag;

beforeEach(() => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  TagRender = render(
    <Router location={history.location} navigator={history}>
      <SideBar />
    </Router>
  );
  Tag = (
    <Router location={history.location} navigator={history}>
      <SideBar />
    </Router>
  );
});

it('should take a snapshot', () => {
  const { asFragment } = TagRender;
  expect(asFragment(Tag)).toMatchSnapshot();
});

it('Should render an sidebar with class sidebar', () => {
  const tableClass = screen.getByTestId('sidebar');
  expect(tableClass).toHaveClass('sidebar');
});

it('Should render an sidebar with class sidebar--body', () => {
  const tableClass = screen.getByTestId('sidebar--body');
  expect(tableClass).toHaveClass('sidebar--body');
});

it('Should render the links in sidebar"', () => {
  const tableClass = screen.getAllByTestId('sidebar--link');
  expect(tableClass).toBeTruthy();
});
