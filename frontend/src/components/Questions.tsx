import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export interface IQuestion {
  id: number;
  title: string;
  description: string;
  answers: string[];
}

const Questions = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get('http://localhost:8081/');
      setQuestions(res.data);
    })();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {questions === null && <p>Loading questions...</p>}
        {questions &&
          questions.map((question) => {
            return (
              <div key={question.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/questions/${question.id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">
                      Answers: {question.answers.length}
                    </div>
                    <div className="card-body">
                      <h4 className="card-title">{question.title}</h4>
                      <p className="card-text">{question.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Questions;
