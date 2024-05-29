import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchComments = createAsyncThunk(
  "comments/fetchComment",
  async () => {
    const { data } = await axios.get(`/posts/comments`);
    return data;
  }
);

export const fetchCreateComment = createAsyncThunk(
  "comments/fetchCreateComment",
  async (commentData) => {
    await axios.post(`/posts/${commentData.id}/comments`, commentData.fields);
  }
);

const initialState = {
  items: [],
  status: "loading",
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchComments.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "loaded";
    },
    [fetchComments.rejected]: (state, action) => {
      state.status = "error";
    },
  },
});

export const commentsReducer = commentsSlice.reducer;
