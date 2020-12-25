import React from 'react';
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Question from './components/Question';
import Questions from './components/Questions';

const App: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Route exact path="/" component={Questions} />
      <Route exact path="/questions/:questionId" component={Question} />
    </div>
  );
};

export default App;
