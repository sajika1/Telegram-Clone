import React from 'react';
// styles
import '../sass/components_styles/Login.scss';

//* USE FIREBASE TO SIGN IN USER WITH GOOGLE ACCOUNT
import { auth, provider} from '../firebase';

//* MATRIAL UI COMPONENTS AND ICONS
import { Button } from '@material-ui/core';

const Login = () => { 
    const signIn = () =>{
        auth.signInWithRedirect(provider)
        .catch((err) =>{
            alert(err.message)
        })
    }



    return (
        <div className = "login">
            <div className = "login__telegram">
                <img 
                     src= {`${process.env.PUBLIC_URL}telegram-logo.png`}
                    alt = "telgram logo"
                />
                <h1>Telegram</h1>
                <Button className = "login__button" onClick = {signIn} >Sign In</Button>
            </div> 
        </div>
    )
}

export default Login
