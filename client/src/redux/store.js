import { configureStore } from "@reduxjs/toolkit";
import docsReducer from "./docs/docsSlice";

const store = configureStore({
  reducer: {
    docs: docsReducer,
  },
});

export default store;
