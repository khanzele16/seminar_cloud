import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Seminar } from "../../shared/types";

const axiosDefaultUrl = "http://localhost:3000";

// для получения семинаров
export const getSeminars = createAsyncThunk("seminar/getSeminars", async () => {
  const { data } = await axios.get(`${axiosDefaultUrl}/seminars`);
  return data;
});

// для удаления семинара
export const deleteSeminar = createAsyncThunk(
  "seminar/deleteSeminar",
  async (id) => {
    const { data } = await axios.delete(`${axiosDefaultUrl}/seminars/${id}`);
    return data;
  }
);

// для редактирования семинара
export const editSeminar = createAsyncThunk(
  "seminar/editSeminar",
  async (seminar: Seminar) => {
    const { data } = await axios.put(
      `${axiosDefaultUrl}/seminars/${seminar.id}`,
      seminar
    );
    return data;
  }
);

const initialState = {
  seminarId: null,
  status: "loading",
  seminars: [],
};

const seminarSlice = createSlice({
  name: "seminar",
  initialState,
  reducers: {
    editSeminarId(state, action) {
      state.seminarId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSeminars.pending, (state) => {
      state.status = "loading";
      state.seminars = [];
    });
    builder.addCase(getSeminars.fulfilled, (state, action) => {
      state.status = "loaded";
      state.seminars = action.payload;
    });
    builder.addCase(getSeminars.rejected, (state) => {
      state.status = "error";
      state.seminars = [];
    });
    builder.addCase(deleteSeminar.fulfilled, (state, action) => {
      state.seminars = state.seminars.filter(
        (seminar) => seminar.id !== action.payload.id
      );
    });
    builder.addCase(editSeminar.fulfilled, (state, action) => {
      state.seminars = state.seminars.map((seminar) =>
        seminar.id === action.payload.id ? action.payload : seminar
      );
    });
  },
});

export const { editSeminarId } = seminarSlice.actions;
export default seminarSlice.reducer;
