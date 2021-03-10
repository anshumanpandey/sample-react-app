import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from 'react-google-login';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <GoogleLogin
        clientId="855173656817-auvud7iccrujivpsan50pgph97di7ho4.apps.googleusercontent.com"
        buttonText="Login"
        responseType="code"
        prompt='consent'
        onSuccess={(r) => console.log(r)}
        onFailure={(r) => console.log(r)}
        scope={[
          'profile',
          'email',
          'https://www.googleapis.com/auth/plus.me',
          'https://www.googleapis.com/auth/userinfo.email',
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/profile.emails.read",
          "https://www.googleapis.com/auth/user.addresses.read"
        ].join(' ')}
      />
    </div>
  );
}

export default App;
