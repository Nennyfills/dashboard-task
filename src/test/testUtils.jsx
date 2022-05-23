import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { attributeSlice } from 'redux/attribute';
import { configureStore } from '@reduxjs/toolkit';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const state = mockStore({
  allProject: [],
  gateways: [],
  projects: [],
  user: {},
  loading: true,
});

export const store = configureStore({
  reducer: attributeSlice.reducer,
  initialState: state,
});

export const withoutRender = (component, store) => (
  <Provider store={store}>
    <Router location={history.location} navigator={history}>
      {component}
    </Router>
  </Provider>
);

export const textTender = (component, store) =>
  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        {component}
      </Router>
    </Provider>
  );
