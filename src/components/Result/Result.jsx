import "./Result.scss";
import { useState, useEffect } from "react";

const Result = ({ totalQuestions, result, onTryAgain }) => {
  const [name, setName] = useState("");
  const [highScore, setHighScore] = useState([]);
  const [showScore, setShowScore] = useState(false);

  useEffect(()=>{
   setHighScore(JSON.parse(localStorage.getItem('highScore')) || []);
  },[])

  const handleSave = () => {
    const score = {
      name,
      score: result.score,
    };
    const newHighScore = [...highScore, score].sort(
      (a, b) => b.score - a.score
    );
    setHighScore(newHighScore);
    setShowScore(true);
    localStorage.setItem("highScore", JSON.stringify(newHighScore));
  };

  const handleTryAgain= () => {
    setShowScore(false);
    setHighScore([]);
    onTryAgain();
  }

  return (
    <div className="result">
      <h3>Result:</h3>
      <p>
        Total Questions: <span>{totalQuestions}</span>
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
      <button onClick={handleTryAgain}>Try again</button>
      {!showScore ? (
        <>
          <h3>
            Enter your name below <br /> to save your score !
          </h3>
          <input
            placeholder="Your Name"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Ranking</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {highScore.map((highScore, i) => {
                return (
                  <tr key={`${highScore.name} ${highScore.score} ${i}`}>
                    <td>{i + 1}</td>
                    <td>{highScore.name}</td>
                    <td>{highScore.score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Result;
