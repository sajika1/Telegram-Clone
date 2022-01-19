import React, { useEffect } from 'react';

// STYLES
import './sass/rootStyles/App.scss';

//* FOR PASSING NEEDED CONTENT INTO COMPONENT FROM REDUX 
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/counter/userSlice';

//* COMPONENTS
import Login from './components/Login';
import Telegram from './components/Telegram';

//* GOOGLE AUTHENTICATION (use auth from firebase.js file)
import {auth} from './firebase';

function App() {

  // get user and dispatch from redux
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() =>{
    //! SET USER WHEN USER WAS SELECTED GOOGLE ACCOUNT
    auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          displayName: authUser.displayName,
          email: authUser.email
        }))
      } else {
        dispatch(logout())
      }
    })
  },[dispatch])

  return (
    <div className="App">
      {user ? <Telegram /> : <Login />}
    </div>
  );
}

export default App;
