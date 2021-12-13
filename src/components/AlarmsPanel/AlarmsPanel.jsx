// Modules
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import 'datejs';

// CSS
import './AlarmsPanel.css';

// Components
import { Card, Form, Alert } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import AddAlarm from '../AddAlarm/AddAlarm';


function AlarmsPanel(props) {
    
    useEffect(() => {
        clearInterval(interval);
        loadAlarms();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    var interval;

    const [alarms, setAlarms] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const [errorConnect, setErrorConnect] = useState(false);
    const [valueRange, setValueRange] = useState(Number(localStorage.getItem('volume')));
    const [arrayTimeAlarms, setArrayTimeAlarms] = useState([]);


    const loadAlarms = async () => {
        
            let allsAlarms;
            
            try {

                allsAlarms = await Axios.get('http://localhost:4000/alarm/');
                localStorage.setItem('ObjectAlarms', JSON.stringify(allsAlarms.data));

            } catch (e) {

                console.log("The connection to Database is wrong, the data on screen is painted by LocalStorage.", e);
                setErrorConnect(true);

            } finally {
                try {

                    if (allsAlarms) {
                        setAlarms(allsAlarms.data);
                        setIsLoad(true);
                        filterAlarms(allsAlarms.data);
                        return;
                    };
        
                    if (!allsAlarms) {
                        let getAlarmsStorage = JSON.parse(localStorage.getItem('ObjectAlarms'));
                        setAlarms(getAlarmsStorage);
                        setIsLoad(true);
                        filterAlarms(getAlarmsStorage);
                        return;
                    };

                } catch (err) {

                    console.log("The connection to Database is wrong, the data on screen is painted by LocalStorage.", err);
                    setErrorConnect(true);

                };
            };
    };
    

    const changeDoActive = async (newDoActive, dataAlarm) => {
        try {
            
            const newChangeDoActive = {
                time: dataAlarm.time,
                description: dataAlarm.description,
                doActive: newDoActive
            };

            await Axios.put('http://localhost:4000/alarm/' + dataAlarm._id, newChangeDoActive);

        } catch (error) {

            console.log("Error in 'changeDoActive'", error);
            setErrorConnect(true);

        } finally {

            loadAlarms();

        };
    };


    const filterAlarms = (allsAlarms) => {
        let activedAlarms = allsAlarms.filter(alarm => checkDoActive(alarm.doActive));

        setArrayTimeAlarms([]);

        let arrayLocalStorage = filterAlarmsFor(activedAlarms);
        
        localStorage.setItem('alarmsOrdered', JSON.stringify(arrayLocalStorage));

        timeIteration();
    };

    function checkDoActive(doActive) {
        return doActive === true;
    };

    function filterAlarmsFor(activedAlarms) {
        let replicArrayTimeAlarms;

        for (let i = 0; i < activedAlarms.length; i++) {

            let oneTimeAlarm = activedAlarms[i].time;
            let alarmDaysWeek = activedAlarms[i].week;
            let alarmSound = activedAlarms[i].directionSound;

            let pushAlarm = {
                time: oneTimeAlarm,
                week: alarmDaysWeek,
                directionSound: alarmSound
            };

            replicArrayTimeAlarms = arrayTimeAlarms;

            replicArrayTimeAlarms.push(pushAlarm);
        };

        return replicArrayTimeAlarms;
    };
    
    
    const timeIteration = () => {
        clearInterval(interval);

        interval = setInterval(() => {

            let dayNameToday = Date.today().getDay();

            let timeNow = new Date().toString("HH:mm");

            let alarmsLocalStorage = JSON.parse(localStorage.getItem('alarmsOrdered'));

            let sameMinute = JSON.parse(localStorage.getItem('sameMinute'));

            comporbateAlarm(alarmsLocalStorage, dayNameToday, timeNow, sameMinute);
            
        }, 1000*15);
    };


    function comporbateAlarm(alarmsLocalStorage, dayNameToday, timeNow, sameMinute) {

        for (let i = 0; i < alarmsLocalStorage.length; i++) {

            let weekFromAlarm = alarmsLocalStorage[i].week;

            for (let e = 0; e < weekFromAlarm.length; e++) {

                if (weekFromAlarm[e] && Number(e) === Number(dayNameToday)) {

                    if (alarmsLocalStorage[i].time === timeNow) {

                        if (sameMinute !== null) {

                            let minuteRepeat = sameMinute[0].time;

                            if (minuteRepeat !== timeNow) {

                                shootAlarm(i, alarmsLocalStorage)
                                return true;
                                
                            };

                        } else {

                            shootAlarm(i, alarmsLocalStorage)
                            return true;

                        };
                    };
                };
            };
        };
    };


    function shootAlarm(i, alarmsLocalStorage) {
        let alarmsSoundDirection = alarmsLocalStorage[i].directionSound;

        handleOnClick(alarmsSoundDirection);
            
        let nowMinute = alarmsLocalStorage.splice(i, 1);
        
        localStorage.setItem('sameMinute', JSON.stringify(nowMinute));
            
        localStorage.setItem('alarmsOrdered', JSON.stringify(alarmsLocalStorage));
    };


    async function deleteAlarm(id) {
        try {

            await Axios.delete('http://localhost:4000/alarm/' + id);

        } catch (error) {

            console.log("Error in 'deleteAlarm'", error);
            setErrorConnect(true);

        } finally {

            loadAlarms();

        };
    };

    
    const handleOnClick = (direction) => {
        const executeAlarm = props.functionAlarm;
        executeAlarm(direction);
    };

    const handleVolume = (volumeNumber) => {
        setValueRange(volumeNumber);
        localStorage.setItem('volume', volumeNumber);
    };
    

    if (!alarms || alarms === null) {
        return (
            <div>
                <Alert variant="danger">
                    <Alert.Heading>Connection failed...</Alert.Heading>
                    <p className="h6 mt-1">You don't have connection now, try to reload this page.</p>
                </Alert>

                <Card className="card-loader">
                    <div className="loader"></div>
                </Card>

                <AddAlarm />
            </div>
        )
    } else if (alarms.length === 0) {
        return (
            <div>
                <Alert variant="warning" className="p-4">
                    <Alert.Heading>
                        No alarms right now
                    </Alert.Heading>
                    Add an alarm with the button at the bottom of the screen
                </Alert>
                
                <Card className="card-loader">
                    <div className="loader"></div>
                </Card>

                <AddAlarm />
            </div>
        )
    } else if (alarms.length > 0) {
        return (
            <div>
                {
                    errorConnect ? 
                    <Alert className="alert-button-close" variant="danger">
                        <button onClick={() => setErrorConnect(false)} className="button-close-alert">X</button>
                        <p className="h6 mt-1">You don't have connection now, you need connection for create and update alarms</p>
                    </Alert>
                    :
                    true
                }
                    <Card className="mb-4" style={{border: "none"}}>
                        <Card.Body className={`volume-card ${props.classNameCard}-card shadow`}>
                            <Card.Title className="time-title">
                                <h3 className="font-volume">Alarm volume: {valueRange}</h3>
                            </Card.Title>
                            <RangeSlider
                                variant="primary"
                                className="flex-range"
                                value={valueRange}
                                onChange={e => handleVolume(e.target.value)}
                                size="lg"
                                tooltip="off"
                            />
                        </Card.Body>
                    </Card>
                {
                    isLoad ? 
                    alarms.map(a => 
                        <Card key={a._id} className="mb-4" style={{border: "none"}}>
                            <Card.Body className={`background ${props.classNameCard}-card shadow`}>
                                <Card.Title className="time-title">
                                    <h3 className="font-sizing">{a.time}</h3>
                                </Card.Title>

                                <Form>
                                    <Form.Group className="mb-3">
                                        <label className="switch">
                                            <input 
                                                type="checkbox"
                                                defaultChecked={a.doActive}
                                                onChange={(e) => changeDoActive(e.target.checked, a)}
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                    </Form.Group>
                                </Form>

                                <div className="btn-container">
                                    <Link type="button" className="btn-edit" to={"/alarm/edit/" + a._id}>
                                        &#9998;
                                    </Link>
                                    <Link 
                                        type="button" 
                                        className="btn-delete" 
                                        to="/"
                                        onClick={() => deleteAlarm(a._id)}
                                    >
                                        &#9747;
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>   
                    )
                    :
                    <Card  className="p-4">
                        <Card.Title>
                            Loadind info...
                        </Card.Title>
                        <Card.Body>
                            Wait a moment please...
                        </Card.Body>
                    </Card>
                }

                <AddAlarm />

            </div>
        )
    }
}

export default AlarmsPanel;
