import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  campaigns: [],
  campaign: null,
  error: '',
  message: '',
};

const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    fetchCampaigns: (state, action) => {
        state.campaigns = action.payload;
        state.error = '';
        state.message = '';
      },
    // fetchSingleJob: (state, action) => {
    //     state.campagin = action.payload;
    //   },

    initiatePending: (state) => {
      state.isLoading = true;
      state.error = '';
      state.message = '';
    },
    clearUser: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = campaignSlice;

export const {
 fetchCampaigns,
//  fetchSingleJob,
} = actions;

export default reducer;


