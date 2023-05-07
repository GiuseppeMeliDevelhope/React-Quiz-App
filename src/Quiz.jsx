import { useState } from "react";
import { resultInitialState } from "./constants";

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const { question, choices, correctAnswer } = questions[currentQuestion];
  const [showResult, setShowResult] = useState(false);

  const onAnswerClick = (answer, index) => {
    setAnswerIdx(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onClickNext = () => {
    setAnswerIdx(null);
    setResult((prev)=> 
        answer
        ?{
            ...prev, 
            score: prev.score + 5,
            correctAnswer: prev.correctAnswer +1,
         } : {
            ...prev,
            wrongAnswers : prev.wrongAnswers + 1,
         }
    )

    if(currentQuestion !== questions.length -1){
       
        setCurrentQuestion((prev)=> prev +1);

    } else {
        setCurrentQuestion(0);
        setShowResult(true);
        }
  }

  const onTryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
  }

  return (
   
   
   <div className="quiz-container">
        {!showResult ? (
      <>
      <h1 className="title-quiz">by Giuseppe Meli ®</h1>
        <span className="active-question-no">{currentQuestion + 1}</span>
        <span className="total-questions">/{questions.length}</span>
        <h2>{question}</h2>
        <ul>
          {choices.map((chioce, index) => (
            <li
              onClick={() => onAnswerClick(chioce, index)}
              key={chioce}
              className={answerIdx === index ? "selected-answer" : null}
            >
              {chioce}
            </li>
          ))}
        </ul>
        <div className="footer">
          <button onClick={onClickNext} disabled={answerIdx === null}>
            {currentQuestion === questions.length -1 ? "Finish" : "Next"}
          </button>
        </div>
      </>) : (
      <div className="result">
        <h3>Result:</h3>
        <p>
            Total Questions: <span>{questions.length}</span>
        </p>
        <p>
            Total Score: <span>{result.score}</span>
        </p>
        <p>
            Correct Answers: <span>{result.correctAnswer}</span>
        </p>
        <p>
            Wrong Answers: <span>{result.wrongAnswers}</span>
        </p>
        <button onClick={onTryAgain}>Try again</button>
      </div> 
      )}
    </div>
  );
};

export default Quiz;
