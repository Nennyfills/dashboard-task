/* eslint-disable testing-library/prefer-screen-queries */
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Layout from '..';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  Attribute: { user: { firstName: 'Joe', lastName: 'Low' } },
});

const renderLayout = () => render(
  <Provider store={store}>
    <Router location={history.location} navigator={history}>
      <Layout>
        <div> I am report</div>
      </Layout>
    </Router>
  </Provider>
);

it('Should take a snapshot', () => {
  const { asFragment } = renderLayout();
  expect(
    asFragment(
      <Layout>
        <div> I am report</div>
      </Layout>
    )
  ).toMatchSnapshot();
});

it('Should render a layout with test id layout', () => {
  renderLayout();
  const layoutClass = screen.getByTestId('layout');
  expect(layoutClass).toBeTruthy();
  expect(layoutClass).toHaveClass('layout');
});

it('Should render a layout with test id layout--navbar', () => {
  renderLayout();
  const layoutClass = screen.getByTestId('layout--navbar');
  expect(layoutClass).toBeTruthy();
  expect(layoutClass).toHaveClass('layout--navbar');
});

it('Should render a layout with test id layout--sidebar', () => {
  renderLayout();
  const layoutClass = screen.getByTestId('layout--sidebar');
  expect(layoutClass).toBeTruthy();
  expect(layoutClass).toHaveClass('layout--sidebar');
});

it('Should render a layout with test id layout--section', () => {
  renderLayout();
  const layoutClass = screen.getByTestId('layout--section');
  expect(layoutClass).toBeTruthy();
  expect(layoutClass).toHaveClass('layout--section');
});

it('Should render a layout with test id layout--section--content', () => {
  renderLayout();
  const layoutClass = screen.getByTestId('layout--section--content');
  expect(layoutClass).toBeTruthy();
  expect(layoutClass).toHaveClass('layout--section--content');
});

it('Should render a layout with test id layout--footer', () => {
  renderLayout();
  const layoutClass = screen.getByTestId('layout--footer');
  expect(layoutClass).toBeTruthy();
  expect(layoutClass).toHaveClass('layout--footer');
});

it('Renders a message', () => {
  const { getByText } = renderLayout();
  expect(getByText('I am report')).toBeInTheDocument();
});
