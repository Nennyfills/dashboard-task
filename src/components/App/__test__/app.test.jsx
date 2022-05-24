import { screen } from '@testing-library/react';
import { textTender, withoutRender } from 'test/testUtils';
import configureMockStore from 'redux-mock-store';
import { attributeSlice } from 'redux/attribute';
import { configureStore } from '@reduxjs/toolkit';
import App from '..';

const mockStore = configureMockStore();
const state = mockStore({
  allProject: [],
  gateways: [],
  projects: [],
  user: {},
  loading: true,
});

const store = configureStore({
  reducer: attributeSlice.reducer,
  initialState: state,
});

const actionName = () => ({
  type: 'report/getUser/fulfilled',
  payload: {
    userId: 'rahej',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
  },
});

it('Should take a snapshot', () => {
  store.dispatch(actionName());
  const { asFragment } = textTender(<App />, store);
  expect(asFragment(withoutRender(<App />, store))).toMatchSnapshot();
});
it('Should render app without crashing', () => {
  textTender(<App />, store);
  const appElement = screen.getByTestId('app');
  expect(appElement).toBeInTheDocument();
});
