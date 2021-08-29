import React from 'react'
import messages from '../../../public/assets/messages.png'
import MailOutlineSharpIcon from '@material-ui/icons/MailOutlineSharp'
import { Link } from 'react-router-dom'

const Header = ({ realtors, currentRealtor, onRealtorSelectChange }) => (
    <header className='app-header'>
        <nav className='left-panel'>
            <Link to='/'>
                <img className='app-logo' src={messages} />
            </Link>
        </nav>
        <nav className='right-panel'>
            {realtors && currentRealtor && (
                <>
                    <span
                        className={`unread-message-counter ${
                            currentRealtor.unread_messages === 0 ? 'no-message' : ''
                        }`}>
                        <MailOutlineSharpIcon className='email-icon' />
                        <data value='Messages non lus'>{currentRealtor.unread_messages}</data>
                    </span>
                    <select name='realtors' onChange={onRealtorSelectChange} defaultValue={currentRealtor.id}>
                        {realtors.map((realtor) => (
                            <option key={realtor.id} value={realtor.id}>
                                {realtor.name}
                            </option>
                        ))}
                    </select>
                </>
            )}
        </nav>
    </header>
)

export default Header
