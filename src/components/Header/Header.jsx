import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate()

    const handleLogin = () => {
        navigate("/login")
    }

    const handleSignUp = () => {
        navigate("/signup")
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to="/" className="navbar-brand">React</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">Home</NavLink>
                        <NavLink to="/user" className="nav-link">User</NavLink>
                        <NavLink to="/admin" className="nav-link">Admin</NavLink>
                    </Nav>
                    <Nav>
                        <button className="btn-login" onClick={() => handleLogin()}>Log in</button>
                        <button className="btn-signup" onClick={() => handleSignUp()}>Sign up</button>
                        {/* <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item>Login</NavDropdown.Item>
                            <NavDropdown.Item>Logout</NavDropdown.Item>
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;