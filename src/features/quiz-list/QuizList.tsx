// QuizList.tsx
import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { RootState } from '../../app/store';
import { fetchQuizzes } from "./QuizListSlice"

export const QuizList: React.FC = () => {
  const quizzes = useSelector((state: RootState) => state.quizList.quizzes);
  console.log("inside list: ", useSelector((state: RootState) => state.quizList));
  const dispatch = useDispatch();
  return (
    <div>
      {quizzes.map((quiz, index) => (
        quiz && (
          <div key={index}>
            <h2>{quiz.name}</h2>
            <ul>
              {quiz.questions.map((question, questionIndex) => (
                <li key={questionIndex}>
                  <h3>{question.question}</h3>
                  <ul>
                    {question.choices.map((choice, choiceIndex) => (
                      <li key={choiceIndex}>{choice}</li>
                    ))}
                  </ul>
                  <p>Correct Answer: {question.correctAnswer}</p>
                </li>
              ))}
            </ul>
          </div>
        )
      ))}
      <span>
        <button onClick={() => console.log(quizzes)}>Fetch Quizzes</button>
      </span>
    </div>
  );
};

export default QuizList

//
// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../../app/store';
// import { fetchQuizzes, setQuizzes } from "./QuizListSlice"
//
// export const QuizList: React.FC = () => {
//   const quizzes = useSelector((state: RootState) => state.quizList.quizzes);
//   const dispatch = useDispatch();
//
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchQuizzes();
//         // dispatch(setQuizzes(data));
//       } catch (error) {
//         console.error('Error fetching quizzes:', error);
//       }
//     };
//     fetchData();
//   }, [dispatch]);
//
//   return (
//     <div>
//       {quizzes.map((quiz, index) => (
//         quiz && (
//           <div key={index}>
//             <h2>{quiz.name}</h2>
//             <ul>
//               {quiz.questions.map((question, questionIndex) => (
//                 <li key={questionIndex}>
//                   <h3>{question.question}</h3>
//                   <ul>
//                     {question.choices.map((choice, choiceIndex) => (
//                       <li key={choiceIndex}>{choice}</li>
//                     ))}
//                   </ul>
//                   <p>Correct Answer: {question.correctAnswer}</p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )
//       ))}
//       <span>
//         <button onClick={() => dispatch(fetchQuizzes())}>Fetch Quizzes</button>
//       </span>
//     </div>
//   );
// };
//
// export default QuizList;
