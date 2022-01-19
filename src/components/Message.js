import React, { forwardRef } from 'react';

// Styles
import '../sass/components_styles/Message.scss';

//* MATRIAL UI COMPONENTS AND ICONS
import { Avatar } from '@material-ui/core';

//* FOR PASSING NEEDED CONTENT INTO COMPONENT FROM REDUX 
import { useSelector } from 'react-redux';
import { selectUser } from '../features/counter/userSlice';

//* TO USE TOOLTIPS
import ReactTooltip from 'react-tooltip';

const Message = forwardRef(({
    id, data: {
            timestamp,
            displayName,
            email,
            message,
            photo,
            uid,
            replayText,
            replayImage
    } ,
    replayHandler
}, ref) => {

    const user = useSelector(selectUser)

    const messageReplayContent = (e) => {
        const targetImage = e.target.parentNode.parentNode.querySelector('.message__photo img').src;
        const targetText = e.target.parentNode.parentNode.querySelector('.message__content').innerText ;
        replayHandler(targetImage , targetText);
    }
    return (
        <div ref = {ref} 
            className = "message__flex"
            onClick={messageReplayContent}
        >
            {replayImage && 
            <div
                className = {`${user.email !== email ? `flex__left` : `replay`}`}
            >
                    <Avatar  
                        src={replayImage} 
                        style={{width:'20px' , height:'20px'}}
                    />  
                <p>{replayText}</p>
            </div>
            }
            <div className={`message ${user.email === email && `message__sender`}`}>
                
                <Avatar
                src = {photo} 
                className = "message__photo"
                />
                
                <div className = "message__contents" data-tip="click to replay">
                    <p className = "message__content">{message}</p>
                    <small className = "message__timestamp">{new Date(timestamp?.toDate()).toLocaleString()}</small>
                </div>
            </div>
            <ReactTooltip/>
        </div>
    )
})

export default Message
