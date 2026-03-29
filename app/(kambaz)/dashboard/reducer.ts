import { createSlice } from "@reduxjs/toolkit"; 
// import { enrollments } from "../database"; 
import { v4 as uuidv4 } from "uuid";

const initialState = { 
 enrollments: [], 
}; 

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    enroll: (state, { payload: enrollment }) => {
      const newEnrollment = { ...enrollment, _id: uuidv4() };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    unenroll: (state, { payload }) => {
      state.enrollments = state.enrollments.filter(
        (enrollment: any) => !(enrollment.user === payload.user && enrollment.course === payload.course)
      );
    }
  }
})

export const { enroll, unenroll, setEnrollments } = 
 enrollmentsSlice.actions; 
export default enrollmentsSlice.reducer;