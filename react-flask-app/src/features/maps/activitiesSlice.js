import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

const activitiesAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.date.localeCompare(b.date)
});

const initialState = activitiesAdapter.getInitialState({
    status: 'idle',
    error: null,
})

export const getActivities = createAsyncThunk(
    "activities/getActivities",
    async () => {
        const response = await fetch('/api/activities').then((res) => res.json());
        return response
    }
);

export const activitiesSlice = createSlice({
    name: 'activities',
    initialState,
    extraReducers: {
      [getActivities.pending]: (state, action) => {
        state.status = 'loading'
      },
      [getActivities.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        activitiesAdapter.upsertMany(state, action.payload)
      },
      [getActivities.rejected]: (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      },
    },
});

export default activitiesSlice.reducer;

export const {
    selectAll: selectAllActivities,
    selectById: selectActivityById,
    selectIds: selectActivityIds,
} = activitiesAdapter.getSelectors((state) => state.activities)