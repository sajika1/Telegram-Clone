import React from 'react';

// Styles
import '../sass/components_styles/ShowInfo.scss';

import { Avatar, IconButton } from '@material-ui/core';
import CloseOutlined from '@material-ui/icons/CloseOutlined';

function ShowInfo({name , email , photo , hideInfo }) {
    return (
        <div className='showinfo'>
           <div className="showinfo__content">
                <IconButton className='showinfo__content__close' onClick={()=>hideInfo()}>
                    <CloseOutlined/>
                </IconButton>
                <div className="showinfo__contact">
                    <Avatar 
                        src={photo}
                        style={{ height: '80px', width: '80px' }}
                    />
                    <h4>{name}</h4>
                    <p>{email}</p>
                </div>
           </div>
        </div>
    )
}

export default ShowInfo
