import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {email, isAdmin, isLogin} from "../../utils/utils";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";

const CustomHeader = () => {

    const history = useHistory();

    function logout() {
        localStorage.removeItem("userToken")
        history.push("/")
        window.location.reload(false)
    }


    //mettre dans isAdmin les pages accecibles uniquement à l'admin
//idem pour isLogin ---------------------------------- si on est connecté
// à la fin les pages accéssibles à tous

    return (
        <div>
            <header>
                <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark'>
                    <Container>
                        <Navbar.Toggle aria-cpntrols='responsive-navbar-nav'/>
                        <Navbar.Collapse id='responsive-navbar-nav'>

                            {isLogin() ? (
                                <NavDropdown title={email()} id="who">
                                    <Nav.Link id="dropdownItem" href='/update-password'>Changer de mot de passe</Nav.Link>
                                    <Button variant="link" onClick={logout}>Se déconnecter</Button>
                                </NavDropdown>

                            ) : (

                                <Nav>
                                    <Nav.Link href='/login'>Se connecter</Nav.Link>
                                </Nav>
                            )}

                            {isAdmin() ? (
                                <Nav>
                                    <NavDropdown title="Comptes" >
                                        <Nav.Link id="dropdownItem" href='/register'>Créer un nouveau compte</Nav.Link>
                                    </NavDropdown>
                                    <Nav.Link href='/societes'>Societes</Nav.Link>
                                    <Nav.Link href='/festivals'>Festivals</Nav.Link>
                                </Nav>
                            ) : null}

                            <Nav>
                                <Nav.Link href='/jeux-festival'>Jeux</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>

                    </Container>
                </Navbar>
            </header>
        </div>
    )
}

export default CustomHeader
