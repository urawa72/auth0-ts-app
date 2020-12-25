import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import auth0Client from '../Auth';

const Callback: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    (async () => {
      await auth0Client.handleAuthentication();
      history.push('/');
    })();
  });

  return <p>Loading profile</p>;
};

export default Callback;
