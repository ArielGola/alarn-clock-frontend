// Modules
import React from 'react';
import { Card } from 'react-bootstrap';

// CSS
import './ThemesSelect.css';

function ThemesSelect(props) {

    const handleClickBackgrounds = (e) => {
        const changeBackground = props.classBackgrounds;
        changeBackground(e.target.className);
    };

    const handleClickAlarmScreen = (e) => {
        const changeAlarmScreen = props.classAlarmScreen;
        changeAlarmScreen(e.target.className);
    };

    const handleClickCardStyle = (e) => {
        const changeCardStyle = props.classCardStyle;
        changeCardStyle(e.target.className);
    };

    return (
        <div>
            <Card className="m-3">
                <Card.Body>
                    <Card.Title>
                        Background Style
                    </Card.Title>

                    <div className="rectangle-grid">
                        <div 
                            id="background-app" 
                            className="one hover-img" 
                            onClick={(e) => handleClickBackgrounds(e)}
                        ></div>
                        <div 
                            id="background-app" 
                            className="two hover-img"
                            onClick={(e) => handleClickBackgrounds(e)}
                        ></div>
                        <div 
                            id="background-app" 
                            className="three hover-img"
                            onClick={(e) => handleClickBackgrounds(e)}
                        ></div>
                        <div 
                            id="background-app" 
                            className="four hover-img"
                            onClick={(e) => handleClickBackgrounds(e)}
                        ></div>
                    </div>
                </Card.Body>
            </Card>

            <Card className="m-3">
                <Card.Body>
                    <Card.Title>
                        Alarm Screen Style
                    </Card.Title>

                    <div className="rectangle-grid">
                        <div 
                            id="screen-alarm" 
                            className="five hover-img"
                            onClick={(e) => handleClickAlarmScreen(e)}
                        ></div>
                        <div 
                            id="screen-alarm" 
                            className="six hover-img"
                            onClick={(e) => handleClickAlarmScreen(e)}
                        ></div>
                        <div 
                            id="screen-alarm" 
                            className="seven hover-img"
                            onClick={(e) => handleClickAlarmScreen(e)}
                        ></div>
                        <div 
                            id="screen-alarm" 
                            className="eight hover-img"
                            onClick={(e) => handleClickAlarmScreen(e)}
                        ></div>
                    </div>
                </Card.Body>
            </Card>

            <Card className="m-3">
                <Card.Body>
                    <Card.Title>
                        Card Background Style
                    </Card.Title>

                    <div className="rectangle-grid">
                        <div 
                            id="card-background" 
                            className="nine hover-img"
                            onClick={(e) => handleClickCardStyle(e)}
                        ></div>
                        <div 
                            id="card-background" 
                            className="ten hover-img"
                            onClick={(e) => handleClickCardStyle(e)}
                        ></div>
                        <div 
                            id="card-background" 
                            className="eleven hover-img"
                            onClick={(e) => handleClickCardStyle(e)}
                        ></div>
                        <div 
                            id="card-background" 
                            className="twelve hover-img"
                            onClick={(e) => handleClickCardStyle(e)}
                        ></div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ThemesSelect;
