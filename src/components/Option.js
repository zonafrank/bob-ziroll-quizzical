import React from "react";
import { decodeHtmlEntities } from "../utils";

const Option = ({ answer, question, resultChecked, handleOptionClicked }) => {
  const isCorrectAnswer = answer.selected && answer.correct ? true : false;
  const isSuccess = resultChecked && isCorrectAnswer ? true : false;

  return (
    <div
      className={`option ${answer.selected ? "selected" : ""} ${
        !resultChecked ? "" : isSuccess ? "correct" : "wrong"
      } ${resultChecked ? "checked" : ""}`}
      onClick={() => handleOptionClicked(question.id, answer.id)}
    >
      {decodeHtmlEntities(answer.text)}
    </div>
  );
};

export default Option;
