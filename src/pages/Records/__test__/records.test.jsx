import { textTender, withoutRender } from 'test/testUtils';

import { attributeSlice } from 'redux/attribute';
import { configureStore } from '@reduxjs/toolkit';
import { screen, waitFor } from '@testing-library/react';
import { allProjectPayload } from 'test/fakeData';
import Records from '..';

const store = configureStore({
  reducer: attributeSlice.reducer,
  initialState: { allProject: allProjectPayload },
});

const getAll = () => ({
  type: 'report/getAll/fulfilled',
  payload: allProjectPayload,
});
const loadEmpty = () => ({
  type: 'report/getAll/fulfilled',
  payload: [],
});

it('Should take a snapshot', () => {
  const { asFragment } = textTender(<Records />, store);
  expect(asFragment(withoutRender(<Records />, store))).toMatchSnapshot();
});

it('Should render records without crashing', () => {
  textTender(<Records />, store);
  const element = screen.getByTestId('records');
  expect(element).toBeInTheDocument();
});
it('Should show records empty card when data is null', () => {
  store.dispatch(loadEmpty());
  textTender(<Records />, store);
  const element = screen.getByTestId('empty-state');
  expect(element).toBeInTheDocument();
});

it('Should show records', async () => {
  store.dispatch(getAll());

  await waitFor(() => {
    expect('Project 1').toEqual(store.getState()?.allProject?.[0]?.name);
  });
  await waitFor(() =>
    expect(400000).toEqual(store.getState()?.allProject?.[0]?.total));
});
