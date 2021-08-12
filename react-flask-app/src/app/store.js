import { configureStore } from "@reduxjs/toolkit";
import mapsReducer from "../features/maps/mapsSlice"

const store = configureStore({
    reducer: {
        maps: mapsReducer
    }
});

export default store;
