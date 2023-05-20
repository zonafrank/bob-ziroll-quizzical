import React from "react";
import Option from "./Option";
import { decodeHtmlEntities } from "../utils";

const Question = ({ question, resultChecked, handleOptionClicked }) => {
  return (
    <div className="question-card">
      <h3>{decodeHtmlEntities(question.question)}</h3>
      <div className="options">
        {question.answers.map((a) => {
          return (
            <Option
              key={a.id}
              answer={a}
              question={question}
              handleOptionClicked={handleOptionClicked}
              resultChecked={resultChecked}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Question;
