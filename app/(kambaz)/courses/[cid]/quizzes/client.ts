import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const createQuizForCourse = async (courseId: string, quiz: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/quizzes`,
    quiz,
  );
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const updateQuiz = async (quiz: any) => { 
  const { data } = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz); 
  return data; 
}; 

export const findQuestionsForQuiz = async (quizId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};

export const createQuestionForQuiz = async (quizId: string, question: any) => {
  const response = await axios.post(`${QUIZZES_API}/${quizId}/questions`,
    question,
  );
  return response.data;
}

export const deleteQuestion = async (quizId: string, questionId: string) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}/questions/${questionId}`);
  return response.data;
};

export const updateQuestion = async (quizId: string, question: any) => { 
  const { data } = await axios.put(`${QUIZZES_API}/${quizId}/questions/${question._id}`, question); 
  return data; 
};