import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import {isAdmin, isLogin, email} from "../../utils/utils";
import Button from "react-bootstrap/Button";
import './navigation.css';

//mettre dans isAdmin les pages accecibles uniquement à l'admin
const Navigation = () => {

    function logout() {
        localStorage.removeItem("userToken")
    }

    return (
        <>
        <header>
            <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark'>
                <Container>
                    <Navbar.Toggle aria-cpntrols='responsive-navbar-nav'/>
                    <Navbar.Collapse id='responsive-navbar-nav'>

                        {isLogin() ? (
                                <NavDropdown title={email()} id="who">
                                    <NavDropdown.Item> <Button variant="link" onClick={logout}>Se déconnecter</Button></NavDropdown.Item>
                                </NavDropdown>

                        ) : (
                            <Nav>
                                <Nav.Link href='/login'>Se connecter</Nav.Link>
                            </Nav>
                        )}


                        {isAdmin() ? (
                            <Nav>
                                <Nav.Link href='/societes'>Societes</Nav.Link>
                            </Nav>
                        ) : null}


                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </header>
        </>
    );
}

export default Navigation;
