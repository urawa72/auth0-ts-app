import React, { useState } from 'react';
import auth0Client from '../Auth';

interface SubmitAnswerProps {
  submitAnswer: (value: string) => void;
}

const SubmitAnswer: React.FC<SubmitAnswerProps> = (props) => {
  const [answer, setAnswer] = useState('');

  const updateAnswer = (value: string) => {
    setAnswer(value);
  };

  const submit = () => {
    props.submitAnswer(answer);
    setAnswer('');
  };

  if (!auth0Client.isAuthenticated()) {
    return null;
  } else {
    return (
      <>
        <div className="form-group text-center">
          <label htmlFor="exampleInputEmail1">Answer:</label>
          <input
            type="text"
            onChange={(e) => {
              updateAnswer(e.target.value);
            }}
            className="form-control"
            placeholder="Share your answer."
            value={answer}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            submit();
          }}>
          Submit
        </button>
        <hr className="my-4" />
      </>
    );
  }
};

export default SubmitAnswer;
