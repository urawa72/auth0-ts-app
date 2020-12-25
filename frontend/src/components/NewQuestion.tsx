import React, { useState } from 'react';
import auth0Client from '../Auth';
import axios from 'axios';
import { useHistory } from 'react-router';

const NewQuestion: React.FC = () => {
  const history = useHistory();
  const [disabled, setDisabled] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const updateTitle = (value: string) => {
    setTitle(value);
  };
  const updateDescription = (value: string) => {
    setDescription(value);
  };

  const submit = async () => {
    setDisabled(true);
    await axios.post(
      'http://localhost:8081/questions',
      {
        title: title,
        description: description,
      },
      {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` },
      }
    );
    history.push('/');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card border-primary">
            <div className="card-header">New Question</div>
            <div className="card-body text-left">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Title:</label>
                <input
                  disabled={disabled}
                  type="text"
                  onBlur={(e) => {
                    updateTitle(e.target.value);
                  }}
                  className="form-control"
                  placeholder="Give your question a title."
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Description:</label>
                <input
                  disabled={disabled}
                  type="text"
                  onBlur={(e) => {
                    updateDescription(e.target.value);
                  }}
                  className="form-control"
                  placeholder="Give more context to your question."
                />
              </div>
              <button
                disabled={disabled}
                className="btn btn-primary"
                onClick={() => {
                  submit();
                }}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewQuestion;
