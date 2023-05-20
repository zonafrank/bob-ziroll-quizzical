import React from "react";
import { useNavigate } from "react-router-dom";
import topImage from "../images/image-top-right.png";
import bottomImage from "../images/image-bottom-left.png";

const IntroPage = () => {
  const navigate = useNavigate();
  function startQuiz() {
    navigate("/questions");
  }

  return (
    <>
      <div className="top-image">
        <img src={topImage} alt="top right design" />
      </div>
      <h1>Quizzical</h1>
      <p>Click the button below to start</p>
      <button id="start-quiz" onClick={startQuiz}>
        Start quiz
      </button>
      <div className="bottom-image">
        <img src={bottomImage} alt="bottom left design" />
      </div>
    </>
  );
};

export default IntroPage;
