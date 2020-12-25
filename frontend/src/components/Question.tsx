import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import auth0Client from '../Auth';
import axios from 'axios';

import { IQuestion } from './Questions';
import SubmitAnswer from './SubmitAnswer';

const Question: React.FC = () => {
  const [question, setQuestion] = useState<IQuestion>();
  const { questionId } = useParams<{ questionId: string }>();

  const refreshQuestion = async () => {
    const res = await axios.get(
      `http://localhost:8081/questions/${questionId}`
    );
    setQuestion(res.data);
  };

  const submitAnswer = async (answer: string) => {
    await axios.post(
      `http://localhost:8081/answers/${questionId}`,
      {
        answer,
      },
      {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` },
      }
    );
    await refreshQuestion();
  };

  useEffect(() => {
    (async () => {
      await refreshQuestion();
    })();
  }, [setQuestion]);

  if (!question) {
    return <p>Loading</p>;
  } else {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{question.title}</h1>
            <p className="lead">{question.description}</p>
            <hr className="my-4" />
            <SubmitAnswer submitAnswer={submitAnswer} />
            <p>Answers:</p>
            {question.answers.map((answer, idx) => {
              return (
                <p className="lead" key={idx}>
                  {answer.answer}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default Question;
