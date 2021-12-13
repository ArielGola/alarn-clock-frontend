// Modules
import React from 'react';
import { Link } from 'react-router-dom';

// Bootstram components
import { Navbar, Container, Nav } from 'react-bootstrap';

// CSS
import './NavBar.css';


function NavBar() {
    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container>
                <div className="in-row">
                    <Link className="no-sub" to="/">
                        <img alt="icon" className="handle-size" src="/android-chrome-192x192.png"/>
                    </Link>

                    <Link className="no-sub title" to="/">
                        AlarmClock
                    </Link>
                </div>
                <Nav className="navs-div">
                    <Link className="no-sub a-link" to="/">
                        Home
                    </Link>
                    <Link className="no-sub a-link margin-left" to="/themes">
                        Themes
                    </Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar;
