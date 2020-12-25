import auth0 from 'auth0-js';

/* eslint-disable @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any */
const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN!;
const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID!;

class Auth {
  auth0: auth0.WebAuth;
  idToken: string | null | undefined = null;
  profile: any;
  expiresAt: number | null | undefined = null;

  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: AUTH0_DOMAIN,
      audience: `https://${AUTH0_DOMAIN}/userinfo`,
      clientID: AUTH0_CLIENT_ID,
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'id_token',
      scope: 'openid profile',
    });
    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  isAuthenticated() {
    return this.expiresAt ? new Date().getTime() < this.expiresAt : false;
  }

  signIn() {
    this.auth0.authorize();
  }

  signOut() {
    this.auth0.logout({
      returnTo: 'http://localhost:3000',
      clientID: AUTH0_CLIENT_ID,
    });
  }

  handleAuthentication(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    });
  }

  setSession(authResult: auth0.Auth0DecodedHash) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    this.expiresAt = authResult.idTokenPayload.exp * 1000;
  }

  silentAuth(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult);
        resolve();
      });
    });
  }
}
/* eslint-enable */

const auth0Client = new Auth();
export default auth0Client;
