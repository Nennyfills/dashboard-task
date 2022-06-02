/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpWrapper from 'api/axiosWrapper';
import { sortAsc } from 'helpers';

export const getAllData = createAsyncThunk('report/getAll', async ({ url, id, typeName, typeId, filterPayload }) =>{
  const res = await httpWrapper({ url });
  const check = typeId ? { [typeName]: typeId } : {};
  if (res) {
    const calls = res?.data?.map(async (value)=> await httpWrapper({
      url: 'report',
      payload: { [id]: value?.[id], ...check, ...filterPayload },
      method: 'post',
    }));
    const result = await Promise.all(calls);
    const allProject = result.map((val, index)=> {
      val.name = res?.data[index]?.name;
      val.id = res?.data[index]?.[id];
      val.total = val?.data?.reduce((current, next)=> next.amount + current, 0);
      val.data = sortAsc(val.data);
      return val;
    });
    return allProject;
  }
  return [];
});

export const getReport = createAsyncThunk('report/getReport', async ({ allTypes, filterPayload, title }) =>{
  const eachReport = await httpWrapper({ url: 'report', payload: { ...allTypes, ...filterPayload }, method: 'post' });
  const data = [{
    name: title,
    data: eachReport?.data,
    total: eachReport?.data?.reduce((current, next)=> next.amount + current, 0)
  }];
  return data;
});

export const getProjects = createAsyncThunk('report/getProjects', async () =>{
  const projects = await httpWrapper({ url: 'projects' });
  return projects?.data || [];
});

export const getGateways = createAsyncThunk('report/getGateways', async () =>{
  const gateways = await httpWrapper({ url: 'gateways' });
  return gateways?.data || [];
});

export const getUser = createAsyncThunk('report/getUser', async () =>{
  const users = await httpWrapper({ url: 'users' });
  return users?.data[0];
});

export const initialState = {
  allProject: [],
  gateways: [],
  projects: [],
  user: {},
  loading: true,
};
export const attributeSlice = createSlice({
  name: 'attributes',
  initialState,
  extraReducers: {
    [getUser.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.loading = false;
    },
    [getUser.pending]: (state) => {
      state.loading = true;
    },
    [getAllData.fulfilled]: (state, { payload }) => {
      state.allProject = payload;
      state.loading = false;
    },
    [getAllData.pending]: (state) => {
      state.loading = true;
    },
    [getReport.fulfilled]: (state, { payload }) => {
      state.allProject = payload;
      state.loading = false;
    },
    [getReport.pending]: (state) => {
      state.loading = true;
    },
    [getProjects.fulfilled]: (state, { payload }) => {
      state.projects = payload;
      state.loading = false;
    },
    [getProjects.pending]: (state) => {
      state.loading = true;
    },
    [getGateways.fulfilled]: (state, { payload }) => {
      state.gateways = payload;
      state.loading = false;
    },
    [getGateways.pending]: (state) => {
      state.loading = true;
    },
  },
});

export default attributeSlice.reducer;
