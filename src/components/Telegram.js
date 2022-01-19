import React from 'react';

// Styles
import '../sass/components_styles/Telegram.scss';

//* COMPONENTS
import Sidebar from './Sidebar'
import Thread from './Thread'

function Telegram() {
    return (
        <div className = "telegram">
            {/* content section ( in the left side ) */}
            <Sidebar />
            {/* messages section */}
            <Thread />
        </div>
    )
}

export default Telegram;
