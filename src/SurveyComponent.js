// SurveyComponent.js
import React, { useState, useEffect } from 'react';
import './SurveyComponent.css'; 

const SurveyComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState([]);
  const [answerInput, setAnswerInput] = useState('');
  const [showThankYouScreen, setShowThankYouScreen] = useState(false);

  const questions = [
    "How satisfied are you with our products?",
    "How fair are the prices compared to similar retailers?",
    "How satisfied are you with the value for money of your purchase?",
    "On a scale of 1-10, how would you recommend us to your friends and family?",
    "What could we do to improve our service?"
  ];

  const startSurvey = () => {
    setCurrentQuestion(1);
  };

  const nextQuestion = () => {
    setSurveyAnswers([...surveyAnswers, { question: currentQuestion, answer: answerInput }]);
    setAnswerInput('');
    setCurrentQuestion(currentQuestion + 1);
  };

  const prevQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const skipQuestion = () => {
    setSurveyAnswers([...surveyAnswers, { question: currentQuestion, answer: 'Skipped' }]);
    setCurrentQuestion(currentQuestion + 1);
  };

  const submitSurvey = () => {
    setSurveyAnswers([...surveyAnswers, { question: currentQuestion, answer: answerInput }]);
    setShowThankYouScreen(true);
  };

  const resetSurvey = () => {
    setSurveyAnswers([]);
    setCurrentQuestion(0);
    setShowThankYouScreen(false);
  };

  useEffect(() => {
    let timer;
    if (showThankYouScreen) {
      timer = setTimeout(() => {
        resetSurvey();
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [showThankYouScreen]);

  const renderRatingStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index + 1}
        className={`star ${index + 1 <= answerInput ? 'filled' : ''}`}
        onClick={() => setAnswerInput(index + 1)}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="survey-container">
      {showThankYouScreen ? (
        <div className="thank-you-screen">
          <h1>Thank You for Your Time <br/>🙂</h1>
        </div>
      ) : currentQuestion === 0 ? (
        <div>
          <h1>Welcome to Our Survey</h1>
          <button onClick={startSurvey}>Start Survey</button>
        </div>
      ) : currentQuestion <= questions.length ? (
        <div className="survey-question-container">
          <h3>{`Question ${currentQuestion}/${questions.length}`}</h3>
          <label>{questions[currentQuestion - 1]}</label>
          {currentQuestion >= 1 && currentQuestion <= 3 ? (
            <div className="star-rating">{renderRatingStars()}</div>
          ) : currentQuestion === 4 ? (
            <input
              type="number"
              min="1"
              max="10"
              value={answerInput}
              onChange={(e) => setAnswerInput(e.target.value)}
            />
          ) : (
            <input
              type="text"
              value={answerInput}
              onChange={(e) => setAnswerInput(e.target.value)}
            />
          )}
          <div className="survey-buttons">
            <button onClick={prevQuestion}>Previous</button>
            <button onClick={nextQuestion}>Next</button>
            <button onClick={skipQuestion}>Skip</button>
            <button onClick={submitSurvey}>Submit</button>
          </div>
        </div>
      ) : (
        <div className="survey-question-container">
          <h3>Submit Survey?</h3>
          <button onClick={submitSurvey}>Yes</button>
          <button onClick={() => setCurrentQuestion(questions.length)}>No</button>
        </div>
      )}
    </div>
  );
};

export default SurveyComponent;
