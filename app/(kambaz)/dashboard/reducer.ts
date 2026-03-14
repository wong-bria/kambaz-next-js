import { createSlice } from "@reduxjs/toolkit"; 
import { enrollments } from "../database"; 
import { v4 as uuidv4 } from "uuid";

const initialState = { 
 enrollments: enrollments, 
}; 

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
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

export const { enroll, unenroll } = 
 enrollmentsSlice.actions; 
export default enrollmentsSlice.reducer;