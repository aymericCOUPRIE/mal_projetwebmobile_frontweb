import React, {useEffect, useMemo, useState} from "react";
import Axios from "axios";
import {useLocation, useParams} from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import './exhibitor-monitoring.css'
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import CardContact from "../../components/contact/CardContact";

const ExhibitorMonitoring = () => {

    const {idExposant} = useParams();

    console.log(idExposant);
    const [contactList, setContactList] = useState([]);
    const [name, setName] = useState("");
    const [show, setShow] = useState(false);
    const [showAdress, setShowAdress] = useState(false);
    const [soc_ville, setSoc_ville] = useState("");
    const [soc_rue, setSoc_rue] = useState("");
    const [soc_codePostal, setSoc_codePostal] = useState("");
    const [soc_pays, setSoc_pays] = useState("");

    //méthode qui s'appelle au chargement de la page
    useEffect(() => {
        //Récupérer les infos de tous les jeux
        Axios.get(`http://localhost:3000/server/societe/${idExposant}/contacts`)
            .then((res) => {
                setContactList(res.data)
                setName(res.data.soc_nom)

                setSoc_rue(res.data.soc_rue)
                setSoc_ville(res.data.soc_ville)
                setSoc_codePostal(res.data.soc_codePostal)
                setSoc_pays(res.data.soc_pays)
                console.log(res.data)

            });

    }, []);

    function validateForm() {
        return name.length > 0;
    }

    function validateFormAdress() {
        return soc_ville.length > 0 && soc_rue.length > 0 && soc_codePostal.length > 0 && soc_pays.length > 0
    }

    //changer le nom
    const updateNom = (event) => {
        event.preventDefault()

        Axios.post(`http://localhost:3000/server/societe/${idExposant}/update-name`, {
            name: name,
        }).then((res) => {
            setShow("true");
        })
    }

    //changer adresse exposant
    const updateAdress = (event) => {
        event.preventDefault()

        Axios.post(`http://localhost:3000/server/societe/${idExposant}/update-adress`, {
            soc_ville: soc_ville,
            soc_rue: soc_rue,
            soc_codePostal: soc_codePostal,
            soc_pays: soc_pays
        }).then((res) => {
            setShowAdress("true");
        })
    }

    return (
        <div className="EspaceFooter">
            <div id="titlePageJeuxFestival">
                <h1>
                    {name}
                </h1>
            </div>

            <Form onSubmit={updateNom} id="nomExposant">

                <label id="labelNomExposant">Changer le nom: </label>
                <input value={name} onChange={(e) => {
                    setName(e.target.value);
                    setShow(false)
                }}/>
                <Button type="submit" id="btnCheck" disabled={!validateForm()}>
                    <FontAwesomeIcon className="faicon" id="validateButton" icon={faCheckCircle}/>
                </Button>

                <Alert id="alertSucces" variant="success" show={show}>
                    Nom modifié !
                </Alert>
            </Form>
            <Alert id="alertSucces" variant="success" show={showAdress}>
                Adresse modifiée !
            </Alert>

            <Accordion>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Contacts
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">

                        <Card.Body className="flex-container-Contacts">
                            <Card className="flex-item">

                                <Card.Header>Adresse: {name}</Card.Header>
                                <div id="cardContacts">
                                    <Form onSubmit={updateAdress}>
                                        <div>
                                            <input id="expoAdress" value={soc_rue} onChange={(e) => {
                                                setSoc_rue(e.target.value);
                                                setShowAdress(false)
                                            }}/>

                                        </div>
                                        <div>
                                            <input id="expoAdress" value={soc_codePostal}
                                                   onChange={(e) => setSoc_codePostal(e.target.value)}/>

                                        </div>

                                        <div>
                                            <input id="expoAdress" value={soc_ville}
                                                   onChange={(e) => setSoc_ville(e.target.value)}/>

                                        </div>
                                       <div>
                                           <input id="expoAdress" value={soc_pays}
                                                  onChange={(e) => setSoc_pays(e.target.value)}/>

                                       </div>

                                        <Button type="submit" id="btnCheck" disabled={!validateFormAdress()}>
                                            <FontAwesomeIcon className="faicon" id="validateButton"
                                                             icon={faCheckCircle}/>
                                        </Button>
                                    </Form>
                                </div>
                            </Card>

                            {contactList.contacts.map((value, index) => {
                                    return (
                                        <Card className="flex-item">
                                            <Card.Header
                                                style={{"background-color": value.co_principal ? "#E74C3C " : "default"}}>Contact</Card.Header>
                                            <div id="cardContacts"
                                                 style={{"background-color": value.co_principal ? "#EC7063" : "default"}}>
                                                <div>{value.co_prenom}</div>
                                                <div>{value.co_nom}</div>
                                                <div>{value.co_mail}</div>
                                                <div>{value.co_telFixe}</div>
                                                <div>{value.co_telPortable}</div>
                                                <div>{value.co_rue}</div>
                                                <div> {value.co_codePostal}{value.co_ville}{value.co_pays}</div>

                                            </div>
                                        </Card>
                                    )
                                }
                            )}

                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        Détails suivi
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>Hello! I'm another body</Card.Body>
                    </Accordion.Collapse>
                </Card>

                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                        Réservation
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>Hello! I'm another body</Card.Body>
                    </Accordion.Collapse>
                </Card>

                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="3">
                        Jeux de la réservation
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="3">
                        <Card.Body>Hello! I'm another body</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    )
}
export default ExhibitorMonitoring