import React, { useEffect, useState } from "react";
import Question from "../components/Question";
import Header from "../components/Header";
import { shuffleArray, getCategories } from "../utils";
import { v4 } from "uuid";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [result, setResult] = useState(0);
  const [resultChecked, setResultChecked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [playStarted, setPlayStarted] = useState(false);

  const categories = getCategories();

  const apiUrl = `https://opentdb.com/api.php?amount=10${
    selectedCategory ? "&category=" + selectedCategory : ""
  }`;

  function handleSelectCategoryChange(e) {
    setSelectedCategory(e.target.value);
  }

  function handleOptionClicked(questionId, optionId) {
    if (!playStarted) {
      setPlayStarted(true);
    }

    const updatedQuestions = questions.map((q) => {
      if (q.id === questionId) {
        return {
          ...q,
          answers: q.answers.map((a) => ({
            ...a,
            selected: a.id === optionId
          }))
        };
      } else {
        return q;
      }
    });

    setQuestions(updatedQuestions);
  }

  function checkAnswers() {
    const correctAnswers = questions.reduce((acc, q) => {
      for (let answer of q.answers) {
        if (answer.selected && answer.correct) {
          acc += 1;
        }
      }
      return acc;
    }, 0);

    setResult(correctAnswers);
    setResultChecked(true);
  }

  async function getDataFromApi(url, abortController = null) {
    try {
      const response = await fetch(url, {
        signal: abortController?.signal
      });

      const data = await response.json();
      if (data.results.length) {
        const modifiedData = data.results.map((d) => {
          return {
            id: v4(),
            type: d.type,
            category: d.category,
            difficulty: d.difficulty,
            question: d.question,
            answers: shuffleArray([
              {
                id: v4(),
                text: d.correct_answer,
                correct: true,
                selected: false
              },
              ...d.incorrect_answers.map((item) => ({
                id: v4(),
                text: item,
                correct: false,
                selected: false
              }))
            ])
          };
        });
        return modifiedData;
      }
      return [];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  useEffect(() => {
    const abortController = new AbortController();
    if (!dataFetched) {
      getDataFromApi(apiUrl, abortController).then((data) => {
        setQuestions(data);
        setDataFetched(true);
      });
    }

    return () => {
      abortController.abort();
    };
  }, [dataFetched]);

  useEffect(() => {
    const abortController = new AbortController();

    getDataFromApi(apiUrl, abortController).then((data) => {
      setQuestions(data);
      setDataFetched(true);
    });

    return () => {
      abortController.abort();
    };
  }, [selectedCategory, apiUrl]);

  function resetQuiz() {
    setResultChecked(false);
    setPlayStarted(false);
    setResult(0);
    getDataFromApi(apiUrl).then((data) => {
      setQuestions(data);
    });
  }

  if (!questions.length) return null;

  return (
    <div className="container">
      <Header
        categories={categories}
        handleSelectCategoryChange={handleSelectCategoryChange}
        playStarted={playStarted}
      />
      <main>
        <div className="questions">
          {questions.map((q) => (
            <Question
              key={q.id}
              question={q}
              handleOptionClicked={handleOptionClicked}
              resultChecked={resultChecked}
            />
          ))}
        </div>
        <div className="questions-page-btns">
          {!resultChecked && (
            <button className="check-answers" onClick={checkAnswers}>
              Check answers
            </button>
          )}
          {resultChecked && (
            <>
              <span>
                You scored {result}/{questions.length} correct answers
              </span>{" "}
              <button className="reset-quiz-btn" onClick={resetQuiz}>
                Play again
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default React.memo(QuestionsPage);
