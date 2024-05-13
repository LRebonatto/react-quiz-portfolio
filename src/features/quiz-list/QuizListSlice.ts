import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { getDatabase, ref, onValue, DataSnapshot } from "firebase/database"
import { initializeApp } from "firebase/app"
import { firebaseConfig } from "../../utils/firebase-connection"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Return a Promise that resolves with the quizzes - Get once
// const fetchQuizzes = async () => {
//   const quizzesRef = ref(database, 'quiz');
//   const snapshot = await get(quizzesRef);
//   if (snapshot.exists()) {
//     return snapshot.val();
//   } else {
//     console.log('No data available');
//     return null;
//   }
// };

// Return a Promise that resolves with the quizzes - Realtime
export const fetchQuizzes = () => {
  return new Promise((resolve, reject) => {
    const quizzesRef = ref(database, 'quiz');
    onValue(quizzesRef, (snapshot: DataSnapshot) => {
      if (snapshot.exists()) {
        setQuizzes(snapshot.val()); // Atualiza o Redux com os novos dados
        resolve(snapshot.val());
      } else {
        console.log('No data available');
        resolve(null);
      }
    }, (error: Error) => {
      console.error('Error fetching quizzes:', error);
      reject(error);
    });
  });
};

// Chamada da função para buscar os quizzes
fetchQuizzes().then(r => console.log("Suceess: ", r)).catch(e => console.log("Error: ", e));

interface Quiz {
  id: number;
  name: string;
  questions: Question[];
}

interface Question {
  id: number;
  question: string;
  choices: string[];
  correctAnswer: string;
}

interface QuizListSliceState {
  quizzes: (Quiz | null)[];
}

const initialState: QuizListSliceState = {
  quizzes: [],
};

export const quizListSlice = createSlice({
  name: 'quizList',
  initialState,
  reducers: {
    setQuizzes(state, action: PayloadAction<(Quiz | null)[]>) {
      state.quizzes = action.payload;
    },
  },
});

export const { setQuizzes } = quizListSlice.actions;

export const selectQuizzes = (state: RootState) => state.quizList.quizzes;

export default quizListSlice.reducer;
