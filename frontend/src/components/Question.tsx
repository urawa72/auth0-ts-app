import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { IQuestion } from './Questions';

const Question: React.FC = () => {
  const [question, setQuestion] = useState<IQuestion>();
  const { questionId } = useParams<{ questionId: string }>();

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `http://localhost:8081/questions/${questionId}`
      );
      setQuestion(res.data);
    })();
  }, [setQuestion]);

  console.log(question);

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
            <p>Answers:</p>
            {question.answers.map((answer, idx) => {
              return (
                <p className="lead" key={idx}>
                  {answer}
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
