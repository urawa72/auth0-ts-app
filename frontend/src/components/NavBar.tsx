import React from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import auth0Client from '../Auth';

const NavBar = () => {
  const history = useHistory();
  const signOut = () => {
    auth0Client.signOut();
    history.push('/');
  };

  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/">
        Q&App
      </Link>
      {!auth0Client.isAuthenticated() && (
        <div>
          <button className="btn btn-dark" onClick={auth0Client.signIn}>
            Sign In
          </button>
        </div>
      )}
      {auth0Client.isAuthenticated() && (
        <div>
          <label className="mr-2 text-white">
            {auth0Client.getProfile().name}
          </label>
          <button
            className="btn btn-dark"
            onClick={() => {
              signOut();
            }}>
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
};

// FIXME: Do not use withRouter
export default withRouter(NavBar);
