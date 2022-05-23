import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpWrapper from 'api/axiosWrapper';

export const getAllData = createAsyncThunk('report/getAll', async ({ url, id, filterPayload }) =>{
  const res = await httpWrapper({ url });
  if (res) {
    const calls = res?.data?.map(async ()=> await httpWrapper({
      url: 'report',
      payload: filterPayload,
      method: 'post',
    }));
    const result = await Promise.all(calls);
    const allProject = result.map((val, index)=> {
      val.name = res?.data[index]?.name;
      val.id = res?.data[index]?.[id];
      val.total = val?.data?.reduce((current, next)=> next.amount + current, 0);
      return val;
    });
    return allProject;
  }
  return [];
});

export const getReport = createAsyncThunk('report/getReport', async ({ filterPayload, title }) =>{
  const eachReport = await httpWrapper({ url: 'report', payload: filterPayload, method: 'post' });
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
