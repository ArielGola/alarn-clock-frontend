// Modules
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';

// CSS
import './EditAlarm.css';

// Bootstrap components
import { Form, Card, Alert } from 'react-bootstrap';


function EditAlarm(props) {

    useEffect(() => {
        
        const onLoadData = async () => {
            try {
    
                const response = await Axios.get('http://localhost:4000/alarm/' + id);
    
                setDirectionSound(response.data.directionSound);
    
                setDaysCheckedWeek(weekCheckedFunction(response));
    
                setOneAlarm(response.data);
    
                setTime(response.data.time);
                setDescription(response.data.description);
                setNewActive(response.data.doActive);
    
                setSunday(response.data.week[0]);
                setMonday(response.data.week[1]);
                setTuesday(response.data.week[2]);
                setWednesday(response.data.week[3]);
                setThursday(response.data.week[4]);
                setFriday(response.data.week[5]);
                setSaturday(response.data.week[6]);
    
                loadSoundAlarm(response.data.directionSound);
    
            } catch (error) {
                console.log("Error in 'onloadData' function", error);
                setErrorLoad(true);
            };
        };

        onLoadData();

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const [errorLoad, setErrorLoad] = useState(false);

    const [id] = useState(props.match.params.id);
    
    const [oneAlarm, setOneAlarm] = useState(null);

    const [time, setTime] = useState(null);
    const [newActive, setNewActive] = useState(false);
    const [description, setDescription] = useState("");

    const [daysCheckedWeek, setDaysCheckedWeek] = useState({});

    const [directionSound, setDirectionSound] = useState("");

    const [monday, setMonday] = useState(false);
    const [tuesday, setTuesday] = useState(false);
    const [wednesday, setWednesday] = useState(false);
    const [thursday, setThursday] = useState(false);
    const [friday, setFriday] = useState(false);
    const [saturday, setSaturday] = useState(false);
    const [sunday, setSunday] = useState(false);


    let history = useHistory();
    

    function loadSoundAlarm(directionSound) {
        try {

            let check1 = document.getElementById('check1');
            let check2 = document.getElementById('check2');
            let check3 = document.getElementById('check3');
            let check4 = document.getElementById('check4');
            let check5 = document.getElementById('check5');
            let check6 = document.getElementById('check6');
            
            if (check1.value === directionSound) {
                check1.checked = true;
            };
            if (check2.value === directionSound) {
                check2.checked = true;
            };
            if (check3.value === directionSound) {
                check3.checked = true;
            };
            if (check4.value === directionSound) {
                check4.checked = true;
            };
            if (check5.value === directionSound) {
                check5.checked = true;
            };
            if (check6.value === directionSound) {
                check6.checked = true;
            };
            
        } catch (error) {
            console.log("Error in 'loadSoundAlarm'", error);
        };
    };


    function weekCheckedFunction(response) {
        let weekChecked = {
            sunday: !response.data.week[0] ? 
            false : JSON.parse(response.data.week[0].split(' ')[1].toLowerCase()) ? 
            true : false,
            monday: !response.data.week[1] ? 
            false : JSON.parse(response.data.week[1].split(' ')[1].toLowerCase()) ? 
            true : false,
            tuesday: !response.data.week[2] ? 
            false : JSON.parse(response.data.week[2].split(' ')[1].toLowerCase()) ? 
            true : false,
            wednesday: !response.data.week[3] ? 
            false : JSON.parse(response.data.week[3].split(' ')[1].toLowerCase()) ? 
            true : false,
            thursday: !response.data.week[4] ? 
            false : JSON.parse(response.data.week[4].split(' ')[1].toLowerCase()) ? 
            true : false,
            friday: !response.data.week[5] ? 
            false : JSON.parse(response.data.week[5].split(' ')[1].toLowerCase()) ? 
            true : false,
            saturday: !response.data.week[6] ? 
            false : JSON.parse(response.data.week[6].split(' ')[1].toLowerCase()) ? 
            true : false
        };
        return weekChecked;
    };


    const onUpdateSubmit = async () => {

        try {
            
            const newUpdatedAlarm = {
                time: time,
                description: description,
                doActive: newActive,
                week: [
                    sunday,
                    monday,
                    tuesday,
                    wednesday,
                    thursday,
                    friday,
                    saturday
                ],
                directionSound
            };

            await Axios.put('http://localhost:4000/alarm/' + id, newUpdatedAlarm);

        } catch (error) {
            console.log("Error in 'onUpdateSubmit'", error);  
        } finally {
            history.push('/');
        };
    };

    if (errorLoad) {
        return (
            <div>
                <Alert variant="danger">
                    <Alert.Heading>Connection failed...</Alert.Heading>
                    <p className="h6 mt-1">
                        You don't have connection now, try to reload this page.
                        <Link variant="danger" to="/" className="link-home">
                            &nbsp;Press here for back to home
                        </Link>
                    </p>
                </Alert>
            </div>
        )
    } else {
        return (
            <div className="father-div">
                    {
                        oneAlarm ? 
                        <Card className="card-background-edit">
                        <Card.Body>
                            <Card.Title className="mb-4 flex-links">
                                    <h3>Edit Alarm</h3>
                                    <Link to="/" className="back-link">
                                        <p>&#8617; Volver</p>
                                    </Link>
                            </Card.Title>

                            <Form>
                                <Form.Group className="mb-4" controlId="formBasicEmail">
                                    <Form.Label>Alarm Time</Form.Label>
                                    <Form.Control 
                                        defaultValue={oneAlarm.time}
                                        type="time" 
                                        required 
                                        onChange={(e) => setTime(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Activation</Form.Label>
                                    <div className="align-switch">
                                        <label className="switch">
                                            <input 
                                                defaultChecked={oneAlarm.doActive}
                                                type="checkbox"
                                                onClick={(e) => setNewActive(e.target.checked)}
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                        <p className="text-label">
                                            Do you want activate the alarm now?
                                        </p>
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formBasicEmail">
                                    <Form.Label>Text with the alarm</Form.Label>
                                    <Form.Control 
                                        defaultValue={oneAlarm.description}
                                        as="textarea" 
                                        rows={3} 
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <Form.Text className="text-muted">
                                        If you don't want write nothing, only leave it empty 
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formBasicEmail">
                                    <Form.Label>This alarm will sound...</Form.Label>
                                    <div className="align-radio">
                                        <Form.Check
                                            inline
                                            label="Mon"
                                            name="monday"
                                            type="checkbox"
                                            id="inline-checkbox-1"
                                            onClick={(e) => setMonday(`monday ${e.target.checked}`)}
                                            defaultChecked={daysCheckedWeek.monday}
                                        />
                                        <Form.Check
                                            inline
                                            label="Tue"
                                            name="tuesday"
                                            type="checkbox"
                                            id="inline-checkbox-2"
                                            onClick={(e) => setTuesday(`tuesday ${e.target.checked}`)}
                                            defaultChecked={daysCheckedWeek.tuesday}
                                        />
                                        <Form.Check
                                            inline
                                            label="Wed"
                                            name="wednesday"
                                            type="checkbox"
                                            id="inline-checkbox-3"
                                            onClick={(e) => setWednesday(`wednesday ${e.target.checked}`)}
                                            defaultChecked={daysCheckedWeek.wednesday}
                                        />
                                        <Form.Check
                                            inline
                                            label="Thu"
                                            name="thursday"
                                            type="checkbox"
                                            id="inline-checkbox-4"
                                            onClick={(e) => setThursday(`thursday ${e.target.checked}`)}
                                            defaultChecked={daysCheckedWeek.thursday}
                                        />
                                        <Form.Check
                                            inline
                                            label="Fri"
                                            name="friday"
                                            type="checkbox"
                                            id="inline-checkbox-5"
                                            onClick={(e) => setFriday(`friday ${e.target.checked}`)}
                                            defaultChecked={daysCheckedWeek.friday}
                                        />
                                        <Form.Check
                                            inline
                                            label="Sat"
                                            name="saturday"
                                            type="checkbox"
                                            id="inline-checkbox-6"
                                            onClick={(e) => setSaturday(`saturday ${e.target.checked}`)}
                                            defaultChecked={daysCheckedWeek.saturday}
                                        />
                                        <Form.Check
                                            inline
                                            label="Sun"
                                            name="sunday"
                                            type="checkbox"
                                            id="inline-checkbox-7"
                                            onClick={(e) => setSunday(`sunday ${e.target.checked}`)}
                                            defaultChecked={daysCheckedWeek.sunday}
                                        />
                                    </div>
                                </Form.Group>
                            
                                <Form.Group className="mb-4" required>
                                    <Form.Label>Alarm sound...</Form.Label>
                                    <div className="align-radio">

                                        <Form.Check
                                            inline
                                            label="By the way"
                                            name="groupSounds"
                                            type="radio"
                                            id="check1"
                                            value="sounds/By the Way.m4a"
                                            onClick={(e) => setDirectionSound(e.target.value)}
                                        />

                                        <Form.Check
                                            inline
                                            label="Can't hold us"
                                            name="groupSounds"
                                            type="radio"
                                            id="check2"
                                            value="sounds/Cant Hold Us (feat. Ray Dalton).mp3"
                                            onClick={(e) => setDirectionSound(e.target.value)}
                                        />

                                        <Form.Check
                                            inline
                                            label="Stay"
                                            name="groupSounds"
                                            type="radio"
                                            id="check3"
                                            value="sounds/Chet Porter - Stay (feat. Chelsea Cutler).mp3"
                                            onClick={(e) => setDirectionSound(e.target.value)}
                                        />

                                        <Form.Check
                                            inline
                                            label="Hard to say goodbye"
                                            name="groupSounds"
                                            type="radio"
                                            id="check4"
                                            value="sounds/Ekali  Illenium - Hard To Say Goodbye (ft. Chloe Angelides).mp3"
                                            onClick={(e) => setDirectionSound(e.target.value)}
                                        />

                                        <Form.Check
                                            inline
                                            label="Stories with unhappy endings"
                                            name="groupSounds"
                                            type="radio"
                                            id="check5"
                                            value="sounds/Stories with unhappy endings - hundred reasons (Uncensored).mp3"
                                            onClick={(e) => setDirectionSound(e.target.value)}
                                        />

                                        <Form.Check
                                            inline
                                            label="Doves"
                                            name="groupSounds"
                                            type="radio"
                                            id="check6"
                                            value="sounds/y2mate.com - we_are_all_astronauts_doves_7AoJwMImQZE.mp3"
                                            onClick={(e) => setDirectionSound(e.target.value)}
                                        />
                                        
                                    </div>
                                </Form.Group>
                            </Form>

                            <button
                                className="full-width btn btn-primary"
                                onClick={onUpdateSubmit}
                            >
                                Complete edit &#10004;
                            </button>

                        </Card.Body>
                        </Card>
                        :
                        <div>
                            <Alert variant="warning">
                                <h5>Loading info...</h5>
                            </Alert>

                            <Card className="card-loader">
                                <div className="loader"></div>
                            </Card>
                        </div>
                    }
            </div>
        )
    }
}

export default EditAlarm;
