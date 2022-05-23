import fakeFetch from 'test/fakeFetch';

import {
  allProjectPayload,
  allRecordPayload,
  gatewaysPayload,
  projectsPayload,
  userPayload,
} from 'test/fakeData';
import { configureStore } from '@reduxjs/toolkit';
import attributeReducer, {
  initialState,
  getUser,
  getAllData,
  getReport,
  getProjects,
  getGateways,
  attributeSlice,
} from '../attribute';

jest.mock('test/fakeFetch');

describe('Attribute Slice', () => {
  describe('reducers', () => {
    it('returns initial state', () => {
      const nextState = attributeReducer(undefined, {});
      expect(nextState).toBe(initialState);
    });
  });

  describe('extra reducers', () => {
    it('getUser.pending', () => {
      const nextState = attributeReducer(initialState, getUser.pending());
      expect(nextState.user).toBe(initialState.user);
      expect(nextState.loading).toBe(true);
    });

    it('getUser.fulfilled', () => {
      const nextState = attributeReducer(
        initialState,
        getUser.fulfilled(userPayload)
      );
      expect(nextState.user).toBe(userPayload);
      expect(nextState.loading).toBe(false);
    });

    it('getAllData.pending', () => {
      const nextState = attributeReducer(initialState, getAllData.pending());
      expect(nextState.allProject).toBe(initialState.allProject);
      expect(nextState.loading).toBe(true);
    });

    it('getAllData.fulfilled', () => {
      const nextState = attributeReducer(
        initialState,
        getAllData.fulfilled(allProjectPayload)
      );
      expect(nextState.allProject).toBe(allProjectPayload);
      expect(nextState.loading).toBe(false);
    });

    it('getReport.pending', () => {
      const nextState = attributeReducer(initialState, getReport.pending());
      expect(nextState.allProject).toBe(initialState.allProject);
      expect(nextState.loading).toBe(true);
    });

    it('getReport.fulfilled', () => {
      const nextState = attributeReducer(
        initialState,
        getReport.fulfilled(allRecordPayload)
      );
      expect(nextState.allProject).toBe(allRecordPayload);
      expect(nextState.loading).toBe(false);
    });
    it('getProjects.pending', () => {
      const nextState = attributeReducer(initialState, getProjects.pending());
      expect(nextState.projects).toBe(initialState.projects);
      expect(nextState.loading).toBe(true);
    });

    it('getProjects.fulfilled', () => {
      const nextState = attributeReducer(
        initialState,
        getProjects.fulfilled(projectsPayload)
      );
      expect(nextState.projects).toBe(projectsPayload);
      expect(nextState.loading).toBe(false);
    });

    it('gateways.pending', () => {
      const nextState = attributeReducer(initialState, getGateways.pending());
      expect(nextState.gateways).toBe(initialState.gateways);
      expect(nextState.loading).toBe(true);
    });

    it('gateways.fulfilled', () => {
      const nextState = attributeReducer(
        initialState,
        getGateways.fulfilled(gatewaysPayload)
      );
      expect(nextState.gateways).toBe(gatewaysPayload);
      expect(nextState.loading).toBe(false);
    });
  });

  describe('Api call', () => {
    it('getUser', async () => {
      const store = configureStore({
        reducer: attributeSlice.reducer,
        initialState,
      });
      const expectedAction = getUser.fulfilled(userPayload);

      fakeFetch.mockReturnValue(Promise.resolve(userPayload));

      const thunk = store.dispatch(getUser());

      thunk.then(() => {
        const actionsCalled = store.getActions();
        expect(actionsCalled).toContainEqual(expectedAction);
      });
    });

    it('getAllData', async () => {
      const store = configureStore({
        reducer: attributeSlice.reducer,
        initialState,
      });
      const expectedAction = getAllData.fulfilled(allProjectPayload);

      fakeFetch.mockReturnValue(Promise.resolve(allProjectPayload));

      const thunk = store.dispatch(getAllData({ url: 'go', id: 2, filterPayload: { gatewayId: '66677' } }));

      thunk.then(() => {
        const actionsCalled = store.getActions();
        expect(actionsCalled).toContainEqual(expectedAction);
      });
    });

    it('getReport', async () => {
      const store = configureStore({
        reducer: attributeSlice.reducer,
        initialState,
      });
      const expectedAction = getReport.fulfilled(allRecordPayload);

      fakeFetch.mockReturnValue(Promise.resolve(allRecordPayload));

      const thunk = store.dispatch(getReport({ title: 'google', filterPayload: { gatewayId: '66677' } }));

      thunk.then(() => {
        const actionsCalled = store.getActions();
        expect(actionsCalled).toContainEqual(expectedAction);
      });
    });

    it('getProjects', async () => {
      const store = configureStore({
        reducer: attributeSlice.reducer,
        initialState,
      });
      const expectedAction = getProjects.fulfilled(projectsPayload);

      fakeFetch.mockReturnValue(Promise.resolve(projectsPayload));

      const thunk = store.dispatch(getProjects());

      thunk.then(() => {
        const actionsCalled = store.getActions();
        expect(actionsCalled).toContainEqual(expectedAction);
      });
    });

    it('getGateways', async () => {
      const store = configureStore({
        reducer: attributeSlice.reducer,
        initialState,
      });
      const expectedAction = getGateways.fulfilled(gatewaysPayload);

      fakeFetch.mockReturnValue(Promise.resolve(gatewaysPayload));

      const thunk = store.dispatch(getGateways());

      thunk.then(() => {
        const actionsCalled = store.getActions();
        expect(actionsCalled).toContainEqual(expectedAction);
      });
    });
  });
});
