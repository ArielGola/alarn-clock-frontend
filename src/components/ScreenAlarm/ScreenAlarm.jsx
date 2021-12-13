// Modules
import React, { Fragment, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Howler } from 'howler';

// CSS
import './ScreenAlarm.css';


function ScreenAlarm(props) {

    useEffect(() => {

        function runAlarm() {
            setTimeout(() => {
                handleDissableAlarm();
                clearTimeout();
            }, 1000*60);
        };

        runAlarm();

        Howler.volume(Number(localStorage.getItem('volume')/100));
        
    }, []);

    
    const handleDissableAlarm = (props) => {
        const dissableAlarm = props.functionDissAlarm;
        dissableAlarm();
    };


    return (
        <Fragment>
            <Container>
                <audio src={props.direction} autoPlay></audio>
                <div className="first-align">
                    <div className="header">
                        <h3>GET UP!</h3>
                    </div>
                    <div className="button-footer">
                        <button 
                            className="off-button"
                            onClick={handleDissableAlarm}
                        >
                            Alarm Off
                        </button>
                    </div>
                </div>
            </Container>
        </Fragment>
    )
}

export default ScreenAlarm;
