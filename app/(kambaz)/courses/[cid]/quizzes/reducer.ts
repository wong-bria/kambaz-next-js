import { createSlice } from "@reduxjs/toolkit"; 
import { v4 as uuidv4 } from "uuid"; 

const initialState = { 
  quizzes: [], 
}; 

const quizzesSlice = createSlice({ 
  name: "quizzes", 
  initialState, 
  reducers: { 
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quiz }) => { 
      const newQuiz: any = { 
        _id: uuidv4(), 
        title: quiz.title, 
        course: quiz.course,
        available: quiz.available,
        due: quiz.due,
        points: quiz.points,
        description: quiz.description,
        assignmentGroup: quiz.assignmentGroup,
        display: quiz.display,
        type: quiz.type,
        options: quiz.options,
        assign: quiz.assign,
        until: quiz.until
      }; 
      state.quizzes = [...state.quizzes, newQuiz] as any; 
    }, 
    deleteQuiz: (state, { payload: quizId }) => { 
      state.quizzes = state.quizzes.filter( 
        (q: any) => q._id !== quizId); 
    }, 
    updateQuiz: (state, { payload: quiz }) => { 
      state.quizzes = state.quizzes.map((q: any) => 
        q._id === quiz._id ? quiz : q 
      ) as any; 
    }, 
    editQuiz: (state, { payload: quizId }) => { 
      state.quizzes = state.quizzes.map((q: any) => 
        q._id === quizId ? { ...q, editing: true } : q 
      ) as any; 
    }, 
  }, 
}); 
export const { addQuiz, deleteQuiz, updateQuiz, editQuiz, setQuizzes } = 
  quizzesSlice.actions; 
export default quizzesSlice.reducer;