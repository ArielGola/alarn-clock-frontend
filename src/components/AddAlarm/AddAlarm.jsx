// Modules
import React from 'react';
import { Link } from 'react-router-dom';

// CSS
import './AddAlarm.css';

function AddAlarm() {
    return (
        <div className="footer-add">
            <Link to="/alarm/create" className="btn-center">
                <span className="btn-icon">+</span>
            </Link>
        </div>
    )
}

export default AddAlarm;
