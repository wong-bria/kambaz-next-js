import { createSlice } from "@reduxjs/toolkit";

type Choice = {
  _id: string;
  text: string;
  isCorrect: boolean;
};

type Question = {
  _id: string;
  title: string;
  points: number;
  question: string;
  type: "MULTIPLE CHOICE" | "TRUE FALSE" | "FILL IN THE BLANK";
  choices: Choice[];
  correctAnswer?: boolean;
  possibleAnswers?: string[];
};

type QuestionsState = {
  questions: Question[];
};

const initialState: QuestionsState = {
  questions: [],
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },

    addQuestion: (state, { payload }) => {
      state.questions.push(payload);
    },

    updateQuestion: (state, { payload }) => {
      state.questions = state.questions.map((q) =>
        q._id === payload._id ? payload : q
      );
    },

    deleteQuestion: (state, { payload }) => {
      state.questions = state.questions.filter(
        (q) => q._id !== payload
      );
    },
  },
});

export const {
  setQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} = questionsSlice.actions;

export default questionsSlice.reducer;