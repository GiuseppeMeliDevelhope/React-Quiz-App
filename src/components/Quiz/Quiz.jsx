import { useState } from "react";
import { resultInitialState } from "../../constants";
import "./Quiz.scss";
import Timer from "../Timer/Timer";
import Result from "../Result/Result";



const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const { question, choices, correctAnswer, type } = questions[currentQuestion];
  const [showResult, setShowResult] = useState(false);
  const [showTimer, setShowTimer]= useState(true);
  const [inputAnswer, setInputAnswer] = useState('')

  const onAnswerClick = (answer, index) => {
    setAnswerIdx(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onClickNext = (finalAnswer) => {
    setAnswerIdx(null);
    setShowTimer(false);
    setInputAnswer("");
    setResult((prev)=> 
        finalAnswer
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

        setTimeout(() => {
          setShowTimer(true);
        });
  }

  const onTryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
  }

  const handleTimeUp = () => {
     setAnswer(false)
     onClickNext(false)
  }

  const handleInputChange = (evt)=>{
    setInputAnswer(evt.target.value);

    if(evt.target.value === correctAnswer){
      setAnswer(true);
    }else{
      setAnswer(false);
    }
  };

  const getAnswerUI= () => {

if(type === 'FIB'){
  return <input value={inputAnswer} onChange={handleInputChange}/>
}

    return(
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
    )
  }

  return (
   
   
   <div className="quiz-container">
        {!showResult ? (
      <>
      <h1 className="title-quiz">by Giuseppe Meli ®</h1>
       {showTimer && <Timer duration={10} onTimeUp={handleTimeUp} />}
        <span className="active-question-no">{currentQuestion + 1}</span>
        <span className="total-questions">/{questions.length}</span>
        <h2>{question}</h2>
       {getAnswerUI()}
        <div className="footer">
          <button onClick={() =>onClickNext(answer)} disabled={answerIdx === null & !inputAnswer}>
            {currentQuestion === questions.length -1 ? "Finish" : "Next"}
          </button>
        </div>
      </>) : (
       <Result result={result} onTryAgain={onTryAgain} totalQuestions={questions.length} />
      )}
    </div>
  );
};

export default Quiz;
