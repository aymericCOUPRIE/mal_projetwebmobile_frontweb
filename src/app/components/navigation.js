import {Navbar, Nav, Container} from 'react-bootstrap';

const Navigation = () => {
    return (
        <>
            <header>
                <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark'>
                    <Container>
                        <Navbar.Toggle aria-cpntrols='responsive-navbar-nav'/>
                        <Navbar.Collapse id='responsive-navbar-nav'>
                            <Nav>
                                <Nav.Link href='/login'>Se connecter</Nav.Link>
                            </Nav>

                            <Nav>
                                <Nav.Link href='/societes'>Societes</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    );
}

export default Navigation;
