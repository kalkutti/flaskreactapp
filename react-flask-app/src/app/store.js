import { configureStore } from "@reduxjs/toolkit";
import mapsReducer from "../features/maps/mapsSlice"
import activitiesReducer from "../features/maps/activitiesSlice"

const store = configureStore({
    reducer: {
        maps: mapsReducer,
        activities: activitiesReducer,
    }
});

export default store;
