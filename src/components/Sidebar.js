import React, {useEffect, useState} from 'react';

// Styles
import '../sass/components_styles/Sidebar.scss';

//* COMPONENTS
import SidebarThread from './SidebarThread';
import ShowInfo from './ShowInfo';

//* FOR PASSING NEEDED CONTENT INTO COMPONENT FROM REDUX 
import { useSelector } from 'react-redux';
import { selectUser } from '../features/counter/userSlice';

//* MATRIAL UI COMPONENTS AND ICONS
import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ExitToApp from '@material-ui/icons/ExitToApp';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';

//* use auth for sign out from account and db for manage firebase realtime database
import db, { auth } from '../firebase';

const Sidebar = () => {

    const user = useSelector(selectUser);
    const[thread, setThreads] = useState([]);

    const [info , setInfo] = useState(false);

    useEffect(() =>{
        db.collection('threads').onSnapshot((snapshot) =>
            setThreads(snapshot.docs.map((doc) =>({
                id: doc.id,
                data: doc.data()
            })))
        )
    }, [])

    const showInfo = () => {
      setInfo(true);
    }
    const hideInfo = () => {
        setInfo(false);
    }

    const addThread = () =>{
        const threadName = prompt('Enter a thread name')
        if (threadName) {
            db.collection('threads').add({
                threadName: threadName,
            })
        }
    }


    return (
        <div className = "sidebar">
            {
                info &&  <ShowInfo 
                            name = { user.displayName }
                            email = { user.email }  
                            photo = { user.photo } 
                            hideInfo = { hideInfo }     
                        />
            }
            <div className = "sidebar__header">
                <div className = "sidebar__search">
                    <SearchIcon className = "sidebar__searchIcon" />
                    <input placeholder = "Search" className = "sidebar__input"/>
                </div>
                <IconButton variant = "outlined" id = "sidebar__button">
                    <BorderColorOutlinedIcon onClick = {addThread}/>
                </IconButton>
                
            </div>
            <div className = "sidebar__threads">
                { thread.map(({id, data: {threadName}}) => (
                    <SidebarThread
                        key = {id}
                        id = {id}
                        threadName = {threadName}
                    />
                ))}
            </div>
            <div className = "sidebar__bottom">
                <Avatar 
                    src = {user.photo}
                    className = "sidebar__bottom_avatar"
                    onClick={showInfo}
                />
                <IconButton>
                    <PhoneOutlinedIcon />
                </IconButton>
                <IconButton>
                    <QuestionAnswerOutlinedIcon />
                </IconButton>
                <IconButton>
                    <ExitToApp onClick = {() => auth.signOut()}/>
                </IconButton>
            </div>
        </div>
    )
}

export default Sidebar;
