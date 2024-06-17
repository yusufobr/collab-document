import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://collab-doc-editing-0f228492f9d4.herokuapp.com/api/document";

const initialState = {
  docs: [],
  isLoading: false,
};

export const fetchDocuments = createAsyncThunk(
  "docs/fetchDocuments",
  async () => {
    const response = await axios.get(URL);
    return response.data;
  }
);

export const deleteDocument = createAsyncThunk(
  "docs/deleteDocument",
  async (id) => {
    await axios.delete(`${URL}/${id}`);
  }
);

export const docsSlice = createSlice({
  name: "docs",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.docs = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.docs = state.docs.filter((doc) => doc._id !== action.meta.arg);
      });
  },
});

export default docsSlice.reducer;
