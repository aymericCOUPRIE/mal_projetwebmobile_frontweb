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
import FormText from "react-bootstrap/FormText";
import Alert from "react-bootstrap/Alert";

const ExhibitorMonitoring = () => {

    const {idExposant} = useParams();

    console.log(idExposant);
    const [contactList, setContactList] = useState([]);
    const [name,setName] = useState("");
    const [show, setShow] = useState(false);

    //méthode qui s'appelle au chargement de la page
    useEffect(() => {
        //Récupérer les infos de tous les jeux
        Axios.get(`http://localhost:3000/server/societe/${idExposant}/contacts`)
            .then((res) => {
                setContactList(res.data)
                setName(res.data.soc_nom)
                console.log(res.data)
            });

    }, []);

    function validateForm() {
        return name.length > 0 ;
    }

    //changer le nom
    const updateNom = (event) => {
        event.preventDefault()

        Axios.post(`http://localhost:3000/server/societe/${idExposant}/update-name`, {
            name: name,
        }) .then((res) => {
            console.log(res)
            setShow("true");
        })
    }

    return (
        <div className="EspaceFooter">
            <div id="titlePageJeuxFestival">
                <h1>
                    {name}
                </h1>
            </div>

            <Form onSubmit={updateNom}  id="nomExposant">

                    <label id="labelNomExposant">Changer le nom: </label>
                    <input value={name} onChange={(e) => {setName(e.target.value); setShow(false)}}/>
                     <Button type="submit" id="btnCheck" disabled={!validateForm()}>
                         <FontAwesomeIcon className="faicon" id="validateButton" icon={faCheckCircle} />
                     </Button>

                <Alert id="alertSucces" variant="success" show={show}>
                   Nom modifié !
                </Alert>
            </Form>


            <Accordion>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Contacts
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>Hello! I'm the body</Card.Body>
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