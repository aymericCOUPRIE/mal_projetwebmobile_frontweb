import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {email, isAdmin, isLogin} from "../../utils/utils";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom"

import {
    faUser,
    faAddressBook,
    faCalendarAlt,
    faDice,
    faClipboardList,
    faFileInvoiceDollar,
    faTh,
    faShapes,
    faTheaterMasks,
    faChessKnight,
    faUserTag
} from "@fortawesome/free-solid-svg-icons";
import './CustomHeader.css'
import React, {useContext, useEffect, useState} from "react";
import Axios from "axios";
import Moment from "moment";
import {FestivalContext} from "../../../App";


const CustomHeader = () => {

    const [dateFestivalCourant, setDateFestivalCourant] = useState(null);

    const {selectedFestival} = useContext(FestivalContext)

    const history = useHistory();

    function logout() {
        localStorage.removeItem("userToken")
        history.push("/")
        window.location.reload(false)
    }

    //méthode qui s'appelle au chargement de la page
    useEffect(() => {

        const fes_id = localStorage.getItem("currentFestival");

        Axios.get(`/server/festivals/${fes_id}`)
            .then((res) => {
                setDateFestivalCourant(res.data.festival.fes_date)
            })


    });


    //mettre dans isAdmin les pages accecibles uniquement à l'admin
//idem pour isLogin ---------------------------------- si on est connecté
// à la fin les pages accéssibles à tous

    return (
        <div>
            <header>
                <Navbar collapseOnSelect fixed='top' expand='lg' bg='dark' variant='dark'>
                    <Container>
                        <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                        <Navbar.Collapse id='responsive-navbar-nav'>
                            {
                                isLogin() ? (
                                    <Nav>
                                        <NavDropdown title={email()} id="who">
                                            <Link className="nav-link" id="dropdownItem" to='/update-password'>Changer
                                                de mot de
                                                passe
                                            </Link>
                                            <Button variant="link" onClick={logout}>Se déconnecter</Button>
                                        </NavDropdown>
                                    </Nav>
                                ) : (

                                    <Nav>
                                        <Link className="nav-link" to='/login'>Se connecter</Link>
                                    </Nav>
                                )
                            }
                            {
                                isLogin() ? (
                                    <Nav>
                                        <NavDropdown title="Paramètres">
                                            <Link  className="nav-link"id ="dropdownItem" to='/type-jeux'>
                                                <FontAwesomeIcon className="faicon" icon={faShapes}/>
                                                Types de jeux
                                            </Link>
                                            <Link  className="nav-link" id="dropdownItem" to='/jeux'>
                                                <FontAwesomeIcon className="faicon" icon={faChessKnight}/>
                                                Jeux
                                            </Link>

                                            {
                                                isAdmin() ? (
                                                    <Link className="nav-link" id="dropdownItem" to='/handle-accounts'>
                                                        <FontAwesomeIcon className="faicon" icon={faUser}/>
                                                        Gérer les comptes
                                                    </Link>

                                                ) : null
                                            }

                                        </NavDropdown>
                                        <Nav>
                                            <div id="fesC">
                                                <FontAwesomeIcon className="faicon" icon={faTheaterMasks}/> Festival
                                                courant:
                                            </div>

                                            <NavDropdown title={Moment(selectedFestival.fes_date).format('DD/MM/YYYY')}
                                                         id="who">
                                                <Link  className="nav-link" id="dropdownItem" to='/festivals'>
                                                    <FontAwesomeIcon className="faicon" icon={faCalendarAlt}/>
                                                    Festivals
                                                </Link>
                                            </NavDropdown>

                                            <Link className="nav-link" to='/reservations'>
                                                <FontAwesomeIcon className="faicon" icon={faClipboardList}/>
                                                Reservations
                                            </Link>
                                            {
                                                isAdmin() ? (
                                                    <Link  className="nav-link" to='/'>
                                                        <FontAwesomeIcon className="faicon" icon={faFileInvoiceDollar}/>
                                                        Facture
                                                    </Link>
                                                ) : null
                                            }
                                        </Nav>
                                    </Nav>
                                ) : null
                            }


                            <Nav>

                                {
                                    isAdmin() ? (

                                        <NavDropdown title={"Gestion sociétés"} id="who">

                                            <Link className="nav-link" to='/exposants' id="dropdownItem">
                                                <FontAwesomeIcon className="faicon" icon={faAddressBook}/>
                                                Exposants
                                            </Link>

                                            <Link className="nav-link" to='/societes' id="dropdownItem">
                                                <FontAwesomeIcon className="faicon" icon={faUserTag}/>
                                                Rôles Societes
                                            </Link>
                                        </NavDropdown>
                                    ) : null
                                }


                                <Link className="nav-link" to='/festival-games'>
                                    <FontAwesomeIcon className="faicon" icon={faDice}/>
                                    Jeux festival
                                </Link>
                                <Link className="nav-link" to='/'>
                                    <FontAwesomeIcon className="faicon" icon={faTh}/>
                                    Zones festival
                                </Link>
                                <Link className="nav-link" to='/editeurs'>
                                    <FontAwesomeIcon className="faicon" icon={faAddressBook}/>
                                    Editeurs
                                </Link>
                            </Nav>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </div>
    )
}

export default CustomHeader
