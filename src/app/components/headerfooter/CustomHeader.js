import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {email, isAdmin, isLogin} from "../../utils/utils";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faAddressBook, faCalendarAlt, faDice, faClipboardList,faFileInvoiceDollar, faTh, faShapes} from "@fortawesome/free-solid-svg-icons";
import './CustomHeader.css'
import {faFacebook} from "@fortawesome/free-brands-svg-icons";
import React from "react";

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
                                    <NavDropdown title="Paramètres" >
                                        <Nav.Link id="dropdownItem" href='/register'>
                                            <FontAwesomeIcon className="faicon" icon={faUser}/>
                                            Créer un nouveau compte
                                        </Nav.Link>
                                        <Nav.Link id="dropdownItem" href='/'>
                                            <FontAwesomeIcon className="faicon" icon={faShapes}/>
                                            Types de jeux
                                        </Nav.Link>
                                        <Nav.Link id="dropdownItem" href='/'>
                                            <FontAwesomeIcon className="faicon" icon={faTh}/>
                                            Zones festival
                                        </Nav.Link>
                                    </NavDropdown>
                                    <Nav.Link href='/festivals'>
                                        <FontAwesomeIcon className="faicon" icon={faCalendarAlt}/>
                                        Festivals</Nav.Link>

                                    <Nav.Link href='/societes'>
                                        <FontAwesomeIcon className="faicon" icon={faAddressBook}/>
                                        Societes
                                    </Nav.Link>
                                    <Nav.Link href='/'>
                                        <FontAwesomeIcon className="faicon" icon={faClipboardList}/>
                                        Reservations</Nav.Link>
                                    <Nav.Link href='/'>
                                        <FontAwesomeIcon className="faicon" icon={faFileInvoiceDollar}/>
                                        Facture</Nav.Link>
                                </Nav>
                            ) : null}

                            <Nav>
                                <Nav.Link href='/jeux'>
                                    <FontAwesomeIcon className="faicon" icon={faDice}/>
                                    Jeux</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>

                    </Container>
                </Navbar>
            </header>
        </div>
    )
}

export default CustomHeader
