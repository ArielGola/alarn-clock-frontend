// Modules
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// CSS
import './App.css';

// Bootstrap components
import { Container, Modal, Button } from 'react-bootstrap';

// Components
import NavBar from './components/NavBar/NavBar';
import AlarmsPanel from './components/AlarmsPanel/AlarmsPanel';
import CreateAlarm from './components/CreateAlarm/CreateAlarm.jsx';
import EditAlarm from './components/EditAlarm/EditAlarm.jsx';
import ScreenAlarm from './components/ScreenAlarm/ScreenAlarm.jsx';
import ThemesSelect from './components/ThemesSelect/ThemesSelect';


function App() {

  const [alarmScreen, setAlarmScreen] = useState(false);
  const [directionSound, setDirectionSound] = useState('');
  const [backgroundClass, setBackgroundClass] = useState(localStorage.getItem('background'));
  const [alarmScreenClass, setAlarmScreenClass] = useState(localStorage.getItem('alarmScreen'));
  const [cardStyleClass, setCardStyleClass] = useState(localStorage.getItem('cardStyle'));
  const [warning, setWarning] = useState(true);


  const handleCssBackgrounds = (className) => {
    setBackgroundClass(className.split(' ')[0]);
    localStorage.setItem('background', className.split(' ')[0]);
  };

  const handleCssAlarmScreen = (className) => {
    setAlarmScreenClass(className.split(' ')[0]);
    localStorage.setItem('alarmScreen', className.split(' ')[0]);
  };

  const handleCssCardStyle = (className) => {
    setCardStyleClass(className.split(' ')[0]);
    localStorage.setItem('cardStyle', className.split(' ')[0]);
  };

  const handleAlarmScreen = (direction) => {
    setAlarmScreen(true);
    setDirectionSound(direction);
  };

  const dissableAlarm = (e) => {
    setAlarmScreen(false);
  };

  if (warning) {
    return (
      <div className={`app-background ${backgroundClass}-app scrollbar`}>
      
        <Modal
          animation={false}
          show={warning}
          onHide={() => setWarning(false)}
          backdrop="static"
          keyboard={false}
          className="flex-screen"
        >
          <Modal.Header>
            <Modal.Title>Warning!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This app does not can use on background plane, this happen for google chrome's politics about "peryodic background sync" that blocked real time scripts for update the state of the alarms, so you only can use this app in first plane or in another tab opened.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setWarning(false)}>Accept</Button>
          </Modal.Footer>
        </Modal>

      </div>
    )
  } else {
    return (
      <Router>
        {
          !alarmScreen ?
            <div className={`app-background ${backgroundClass}-app scrollbar`}>
          
              <NavBar />

              <Container className="p-4">
                <Route path="/" exact>

                  <AlarmsPanel functionAlarm={handleAlarmScreen} classNameCard={cardStyleClass} />

                </Route>
                <Route path="/themes" exact>

                  <ThemesSelect 
                    classBackgrounds={handleCssBackgrounds} 
                    classAlarmScreen={handleCssAlarmScreen}
                    classCardStyle={handleCssCardStyle}
                  />

                </Route>
                <Route path="/alarm/create" exact>

                  <CreateAlarm />

                </Route>
                <Route path="/alarm/edit/:id" component={EditAlarm} />
              </Container>
              
            </div>
          
          :
          <div className={`app-screen-alarm ${alarmScreenClass}-app scrollbar`}>
            <Container className="p-4">
              <ScreenAlarm functionDissAlarm={dissableAlarm} direction={directionSound} />
            </Container>
          </div>
        }
      </Router>
    );
  }
}

export default App;
