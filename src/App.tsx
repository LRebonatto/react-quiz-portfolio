import "./App.css"
import React from 'react';
import { QuizList } from "./features/quiz-list/QuizList"
import { Quotes } from "./features/quotes/Quotes"
import { Counter } from "./features/counter/Counter"

const App = () => {

  return (
    <div className="App">
      <header className="App-header py-4">
        <h1>
          Lista de Quizzes
        </h1>
        <Counter />
        <QuizList/>
        <Quotes />
      </header>
    </div>
)
}

export default App
