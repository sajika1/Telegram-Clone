import React, { useEffect, useState } from 'react';

// Styles
import '../sass/components_styles/SidebarThread.scss';

//* FOR PASSING NEEDED CONTENT INTO COMPONENT FROM REDUX 
import { useDispatch } from 'react-redux';
import { setThread } from '../features/counter/threadSlice';

//* MATRIAL UI COMPONENTS AND ICONS
import { Avatar } from '@material-ui/core';

//* db for manage firebase realtime database
import db from '../firebase';

const SidebarThread = ({ id, threadName }) => {

    const dispatch = useDispatch();
    const [threadInfo, setThreadInfo] = useState([])

    useEffect(() => {
        //! GET CONTACTS WITH MESSAGES FROM DATABASE
        db.collection('threads')
            .doc(id)
            .collection('messages')
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => 
                setThreadInfo(snapshot.docs.map((doc) => doc.data()))
             )
    },[id])

    return (
        <div 
            className = "sidebarThread"
            onClick = {() => 
                dispatch(setThread({
                    threadId: id,
                    threadName: threadName
                }))
            }    
        >
            <Avatar 
                src = {threadInfo[0]?.photo}
            />
            <div className = "sidebarThread__details">
                <h4>{threadName}</h4>
                <p>{threadInfo[0]?.message}</p>
        <small className = "sidebarThread__timestamp">{new Date(threadInfo[0]?.timestamp?.toDate()).toLocaleString()}</small>
            </div>
        </div>
    )
}

export default SidebarThread
