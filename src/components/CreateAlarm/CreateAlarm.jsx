// Modules
import React, { useState } from 'react';
import Axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

// CSS
import './CreateAlarm.css';

// Bootstrap components
import { Form, Card } from 'react-bootstrap';

function CreateAlarm() {

    const [time, setTime] = useState(null);
    const [newActive, setNewActive] = useState(true);
    const [description, setDescription] = useState("");

    const [mondayCr, setMondayCr] = useState(false);
    const [tuesdayCr, setTuesdayCr] = useState(false);
    const [wednesdayCr, setWednesdayCr] = useState(false);
    const [thursdayCr, setThursdayCr] = useState(false);
    const [fridayCr, setFridayCr] = useState(false);
    const [saturdayCr, setSaturdayCr] = useState(false);
    const [sundayCr, setSundayCr] = useState(false);

    const [directionSound, setDirectionSound] = useState("");

    let history = useHistory();

    const onSubmitButton = async () => {

        const newAlarm = {
            time: time,
            description: description,
            doActive: newActive,
            week: [
                sundayCr,
                mondayCr,
                tuesdayCr,
                wednesdayCr,
                thursdayCr,
                fridayCr,
                saturdayCr
            ],
            directionSound
        };

        try {
        
            await Axios.post('http://localhost:4000/alarm/', newAlarm);
                
        } catch (error) {

            try {

                let getAlarmsStorage = JSON.parse(localStorage.getItem('ObjectAlarms'));
    
                getAlarmsStorage.push(newAlarm);
    
                console.log(getAlarmsStorage);
    
                localStorage.setItem('ObjectAlarms', JSON.stringify(getAlarmsStorage));
                
            } catch (e) {
                console.log("Error in 'onSubmitButton' function", e);
            };

        } finally {
            history.push('/');
        };
    };


    return (
        <div className="father-div">
            <Card className="background-card-create">
                <Card.Body>
                    <Card.Title className="mb-4 flex-links">
                            <h3>Create New Alarm</h3>
                            <Link to="/" className="back-link">
                                <p>&#8617; Volver</p>
                            </Link>
                    </Card.Title>

                    <Form>
                        <Form.Group className="mb-4" controlId="formBasicEmail">
                            <Form.Label>Alarm Time</Form.Label>
                            <Form.Control 
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
                                        type="checkbox"
                                        defaultChecked={newActive}
                                        onChange={(e) => setNewActive(Boolean(e.target.checked))}
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
                                    id="monday"
                                    onClick={(e) => setMondayCr(`monday ${e.target.checked}`)}
                                />
                                <Form.Check
                                    inline
                                    label="Tue"
                                    name="tuesday"
                                    type="checkbox"
                                    id="tuesday"
                                    onClick={(e) => setTuesdayCr(`tuesday ${e.target.checked}`)}
                                />
                                <Form.Check
                                    inline
                                    label="Wed"
                                    name="wednesday"
                                    type="checkbox"
                                    id="wednesday"
                                    onClick={(e) => setWednesdayCr(`wednesday ${e.target.checked}`)}
                                />
                                <Form.Check
                                    inline
                                    label="Thu"
                                    name="thursday"
                                    type="checkbox"
                                    id="thursday"
                                    onClick={(e) => setThursdayCr(`thursday ${e.target.checked}`)}
                                />
                                <Form.Check
                                    inline
                                    label="Fri"
                                    name="friday"
                                    type="checkbox"
                                    id="friday"
                                    onClick={(e) => setFridayCr(`friday ${e.target.checked}`)}
                                />
                                <Form.Check
                                    inline
                                    label="Sat"
                                    name="saturday"
                                    type="checkbox"
                                    id="saturday"
                                    onClick={(e) => setSaturdayCr(`saturday ${e.target.checked}`)}
                                />
                                <Form.Check
                                    inline
                                    label="Sun"
                                    name="sunday"
                                    type="checkbox"
                                    id="sunday"
                                    onClick={(e) => setSundayCr(`sunday ${e.target.checked}`)}
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
                        className="full-width btn btn-primary mt-2"
                        onClick={onSubmitButton}
                    >
                        Create &#10004;
                    </button>

                </Card.Body>
            </Card>
        </div>
    )
}

export default CreateAlarm;
