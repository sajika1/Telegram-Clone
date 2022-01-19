import React, { useEffect, useRef, useState } from 'react';

// Styles
import '../sass/components_styles/Thread.scss';

//* manage firebase realtime database
import firebase from 'firebase';
import db from '../firebase';

//* FOR PASSING NEEDED CONTENT INTO COMPONENT FROM REDUX 
import { useSelector } from 'react-redux';
import { selectThreadId, selectThreadName } from '../features/counter/threadSlice';
import { selectUser } from '../features/counter/userSlice';

//* COMPONENTS 
import Message from './Message';

//? this packages for show timeago for message and show messages with soft animations
import * as timeago from 'timeago.js';
import FlipMove from 'react-flip-move';

//* MATRIAL UI COMPONENTS AND ICONS
import { Avatar, IconButton } from '@material-ui/core';
import  MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import  MicNoneOutlinedIcon from '@material-ui/icons/MicNoneOutlined';
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined';
import { CloseOutlined } from '@material-ui/icons';

const Thread = () => {

    const[input, setInput] = useState('');

    // set messages in each threads
    const [messages, setMessages] = useState([]);

    // if click on message for replay this state set with message content
    const [replayText , setReplayText] = useState('');
    const [replayImage , setReplayImage] = useState('');

    // get content of contacts from redux 
    const threadName = useSelector(selectThreadName)
    const threadId = useSelector(selectThreadId)
    const user = useSelector(selectUser)
    
    // this ref for manage chat scrollbar
    const messageEl = useRef(null)

    // this ref for manage focus from user chat input
    const inputRef = useRef(null);

    useEffect(() =>{
        if(threadId){
            db
            .collection('threads')
            .doc(threadId)
            .collection('messages')
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) => 
            setMessages(snapshot.docs.map((doc) =>({
                id : doc.id,
                data: doc.data()
        }))))
        }
    },[threadId])

    const sendMessage = (e) => {
        e.preventDefault();
        if (threadId && input) {
            db
            .collection('threads')
            .doc(threadId)
            .collection('messages')
            .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName,
            replayText : replayText , 
            replayImage : replayImage
        })
        }
        setInput('');
        setReplayImage('');
        setReplayText('');
    }

    const sendMessageWithDelay = (e) =>{
        e.preventDefault();
        if (threadId && input) {
            const sendMessage = input;
            setInput('message will be sent in the next 2 second ...') 
            setTimeout(() => {
                db
                .collection('threads')
                .doc(threadId)
                .collection('messages')
                .add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    message: sendMessage,
                    uid: user.uid,
                    photo: user.photo,
                    email: user.email,
                    displayName: user.displayName, 
                    replayText : replayText , 
                    replayImage : replayImage
            
                    })
                setInput('');
                setReplayImage('');
                setReplayText('');
            }, 2000);
        }
    }

    useEffect(()=>{
        const scroll = messageEl.current.scrollHeight - messageEl.current.clientHeight;
        messageEl.current.scrollTo(0, scroll);
    } , [messages])

    const replayHandler = (image , text) => {
        inputRef.current.focus();
        setReplayImage(image);
        setReplayText(text);
    }
    return (
        <div className = "thread">
            <div className = "thread__header">
                <div className = "thread__headerDetails">
                    {threadId ? (<Avatar 
                        src = {user.photo}
                    />) : (<Avatar />)}
                    
                    <div className = "thread__headerDetails_info">
                        <h4>{ threadId ? threadName : "Click on any chat Name"}</h4>
                        <h5>{ threadId ? (timeago.format(messages[0]?.timestamp?.toDate())) : "last seen"}</h5>
                    </div>
                </div>
                <IconButton>
                    <MoreHorizIcon className = "thread__headerMoreHoriz"/>
                </IconButton>
            </div>
                <div className = "thread__messages" ref={messageEl}>
                    <FlipMove className="thread__message__box">
                        { messages.map(({ id, data }) =>(
                        <Message key = {id} id = {id} data = {data} replayHandler={replayHandler} />
                        ))}
                    </FlipMove>
                </div>
                <div className = "thread__input">
                    {replayImage && 
                    <div className="replay__content">
                       
                            <Avatar src={replayImage} alt="replay message" />
                         
                        <p>{replayText}</p>
                        
                        <IconButton
                            onClick={()=>{setReplayImage('') ; setReplayText('')}}
                            className="close"
                        >
                           <CloseOutlined/>
                       </IconButton>
                   
                    </div>
                    }
                    <form>
                    <input 
                        ref={inputRef}
                        placeholder = "Enter a message..." 
                        type = "text" 
                        value = {input}
                        onChange = {(e) => setInput(e.target.value)}
                    /> 
                    <IconButton onClick = {sendMessageWithDelay}>
                            <TimerOutlinedIcon />
                        </IconButton> 
                    <IconButton 
                        onClick = {sendMessage} type = "sumbit">
                            <SendRoundedIcon />
                    </IconButton>       
                    <IconButton>
                            <MicNoneOutlinedIcon />
                        </IconButton>           
                    </form>
                </div>
        </div>
    )
}

export default Thread
