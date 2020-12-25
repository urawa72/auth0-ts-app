import React, { useCallback, useEffect, useState } from 'react';
import { Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Question from './components/Question';
import Questions from './components/Questions';
import NewQuestion from './components/NewQuestion';
import SecureRoute from './components/SecureRoute';
import Callback from './components/Callback';
import auth0Client from './Auth';

const App: React.FC = () => {
  const location = useLocation();
  const [, setState] = useState<number>(0);
  const [checkingSession, setCheckingSession] = useState(true);

  // use dummy state instead of component forceUpdate
  const forceUpdate = useCallback(() => setState(1), []);

  useEffect(() => {
    (async () => {
      if (location.pathname === '/callback') {
        setCheckingSession(false);
        return;
      }
      try {
        await auth0Client.silentAuth();
        forceUpdate();
      } catch (err) {
        if (err.error !== 'login_required') console.log(err.error);
      }
      setCheckingSession(false);
    })();
  }, [location]);

  return (
    <div>
      <NavBar />
      <Route exact path="/" component={Questions} />
      <Route exact path="/questions/:questionId" component={Question} />
      <Route exact path="/callback" component={Callback} />
      <SecureRoute
        path="/new-question"
        component={NewQuestion}
        checkingSession={checkingSession}
      />
    </div>
  );
};

export default App;
