import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

const mapsAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.title.localeCompare(b.title)
});

const initialState = mapsAdapter.getInitialState({
    status: 'idle',
    error: null,
})

export const getMaps = createAsyncThunk(
    "maps/getMaps",
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos').then((res) => res.json());
        return response
    }
);

export const mapsSlice = createSlice({
    name: 'maps',
    initialState,
    extraReducers: {
      [getMaps.pending]: (state, action) => {
        state.status = 'loading'
      },
      [getMaps.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        mapsAdapter.upsertMany(state, action.payload)
      },
      [getMaps.rejected]: (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      },
    },
});

export default mapsSlice.reducer;

export const {
    selectAll: selectAllMaps,
    selectById: selectMapById,
    selectIds: selectMapIds,
} = mapsAdapter.getSelectors((state) => state.maps)