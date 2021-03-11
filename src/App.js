import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from 'react-google-login';
import { useEffect, useState } from 'react';
import { messaging } from './firebase';

messaging.onMessage((payload) => {
  //notification when browser is on focus
  console.log('Message received. ', payload);
  var options = {
    body: payload.notification.body,
    icon: payload.notification.icon || payload.notification.image || "https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  };
  new Notification(payload.notification.title, options)
});

const login = () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({"email":"mail4@mail.com","password":"s7mQZRFjOF"});

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch("http://localhost:3000/api/v1/sessions/", requestOptions)
    .then((r) => {
      if (!r.ok) {
        return Promise.reject("could set the web push token")
      } else {
        return r.json()
      }
    })
    .catch(error => console.log('error', error));
}

const updateUserPushToken = ({ pushToken, jwtToken }) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${jwtToken}`);

  var formdata = new FormData();
  formdata.append("webPushNotificationToken", pushToken);

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  return fetch("http://localhost:3000/api/v1/users/me", requestOptions)
  .then((r) => {
    if (!r.ok) {
      return Promise.reject("could set the web push token")
    } else {
      return r.json()
    }
  })
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

const postMessage = ({ jwtToken }) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${jwtToken}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({"network":"telegram","text":"some","starred":false,"clientId":"db9aa797-caca-4985-99f5-946ddfe690df"});

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch("http://localhost:3000/api/v1/messages", requestOptions)
    .then((r) => {
      if (!r.ok) {
        return Promise.reject("error creating the message")
      } else {
        return r.json()
      }
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function App() {
  const [jwtToken, setJwtToken] = useState("")
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
      <button onClick={() => {
        login()
        .then((r) => {
          setJwtToken(r.token)
          return Notification.requestPermission()
        })
        .then(async function(granted) {
          console.log({granted})
          return messaging.getToken()
        })
        .then((firebaseToken) => {
          return updateUserPushToken({ pushToken: firebaseToken, jwtToken })
        })
        .then(() => {
          return postMessage({ jwtToken })
        })
        .catch(function(err) {
          console.log(err);
        });
      }}>Ask message</button>
      <GoogleLogin
        clientId="766018113614-6dm1s0hnl6msinupb4l7ukpi69j9kmql.apps.googleusercontent.com"
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
