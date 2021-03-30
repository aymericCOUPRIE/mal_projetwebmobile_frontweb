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
import {Container} from "../../components/ModalForm/container";
import FormContact from "../../components/contact/FormContact";

const ExhibitorMonitoring = () => {

    const {idExposant} = useParams();

    console.log(idExposant);
    const [contactList, setContactList] = useState([]);
    const [name, setName] = useState("");
    const [show, setShow] = useState(false);
    const [showNewContact,setShowNewContact] = useState(false);
    const [showAdress, setShowAdress] = useState(false);
    const [soc_ville, setSoc_ville] = useState("");
    const [soc_rue, setSoc_rue] = useState("");
    const [soc_codePostal, setSoc_codePostal] = useState("");
    const [soc_pays, setSoc_pays] = useState("");
    const [detailSuivi, setDetailSuivi] = useState([]);
    const [suivi, setSuivi] = useState([]);
    const [reservation, setReservation] = useState([]);
    const [commentaire, setCommentaire] = useState("");

    //méthode qui s'appelle au chargement de la page
    useEffect(() => {
        //Récupérer les infos des contacts
        Axios.get(`/server/societe/${idExposant}/contacts`)
            .then((res) => {
                setContactList(res.data)
                setName(res.data.soc_nom)
                setSoc_rue(res.data.soc_rue)
                setSoc_ville(res.data.soc_ville)
                setSoc_codePostal(res.data.soc_codePostal)
                setSoc_pays(res.data.soc_pays)
            });

    }, []);

    useEffect(() => {
        //Récupérerles infos de suivi et de la réservation
        const fes_id = localStorage.getItem("currentFestival")
        Axios.get(`/server/reservations/festival/${fes_id}/societe/${idExposant}`).then((res) => {
            if(res.data) {
                setReservation(res.data)
                setCommentaire(res.data.suivE_commentaire)
            }
            console.log("RESERVATION", res)
        })
    }, []);

    useEffect(() => {
        //Récupérerles infos de suivi et de la réservation
        const fes_id = localStorage.getItem("currentFestival")
        Axios.get(`/server/suiviExposant/festival/${fes_id}/societe/${idExposant}`).then((res) => {
            setSuivi(res.data)
            console.log("SUIVI", res)
        })
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

        Axios.post(`/server/societe/${idExposant}/update-name`, {
            name: name,
        }).then((res) => {
            setShow("true");
        })
    }

    //update commentaire
    const updateCommentaire = (event) => {
        event.preventDefault()

        Axios.post(`/server/suiviExposant/${idExposant}/update-commentaire`,{
            fes_id: localStorage.getItem("currentFestival"),
            suivE_commentaire: commentaire,
        }).then((res) => {
            console.log(res)
        })
    }
//ajouter un contact
    const onSubmit = (event) => {

        event.preventDefault(event);

        console.log("EVENT", event)

        Axios.post(`/server/contacts/add/${idExposant}"`, {
            //récupérer les valeurs du formulaire
            nom: event.target.nom.value,
            prenom : event.target.prenom.value,
            telPortable : event.target.telPortable.value,
            telFixe : event.target.telFixe.value,
            email: event.target.email.value,
            rue : event.target.rue.value,
            ville : event.target.ville.value,
            codePostal : event.target.codePostal.value,
            pays: event.target.pays.value,
            fonction : event.target.fonction.value,
            principal: event.target.principal.value,
        }).then((res) => {
            //afficher alert succes
            setShowNewContact(true);


        })
    };

    //changer adresse exposant
    const updateAdress = (event) => {
        event.preventDefault()

        Axios.post(`/server/societe/${idExposant}/update-adress`, {
            soc_ville: soc_ville,
            soc_rue: soc_rue,
            soc_codePostal: soc_codePostal,
            soc_pays: soc_pays
        }).then((res) => {
            setShowAdress("true");
        })
    }

    //changer date contact
    const updateDateContact = (value, numeroRelance) => {

        Axios.put(`/server/suiviExposant/updateDateContact/${numeroRelance}`, {
            suivE_id: suivi.suivE_id,
            suivE_dateContact: value
        })
    }

    //changer nombre de bénévols
    const updateNbBenevoles = (value) => {
        Axios.put("/server/suiviExposant/updateNbBenevole", {
            suivE_id: suivi.suivE_id,
            suivE_nbBenevoles: value
        })
    }

    //changer si il se déplace ou non
    const updateStatusSeDeplace = (value) => {
        Axios.put("/server/suiviExposant/updateSeDeplace", {
            suivE_id: suivi.suivE_id,
            suivE_deplacement: value
        }).then((res) => console.log(res))
    }

    const updateFacture = (value) => {

        Axios.put("/server/reservations/updateReservationFacture", {
            res_id: reservation.res_id,
            res_facture: value
        })
    }

    const updatePaiement = (value) => {

        Axios.put("/server/reservations/updateReservationPaiement", {
            res_id: reservation.res_id,
            res_paiement: value
        })
    }

    return (
        <div className="EspaceFooter">
            <div id="titlePageJeuxFestival">
                <h1>
                    {name}
                </h1>
            </div>
            <div className="flex-container-Contacts">

                <div className="flex-item">
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
                    <Alert id="alertSucces" variant="success" show={showNewContact}>
                        Contact ajouté !
                    </Alert>

                </div>


                <div className="flex-item">
                    <Form onSubmit={updateCommentaire} >

                    <textarea id="commentaireStickyNote" value=  {commentaire} onChange={ (e) => {
                        setCommentaire(e.target.value)
                    }}/>

                    <Button type="submit" id="btnCheck">
                        Mettre à jour la note
                        <FontAwesomeIcon className="faicon" id="validateButton" icon={faCheckCircle}/>
                    </Button>
                    </Form>

                </div>
            </div>


            <Accordion>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Contacts
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">

                        <Card.Body className="flex-container-Contacts">
                            <div id="btnNewJeu">
                                <Container triggerText="Ajouter un contact" onSubmit={onSubmit} component={FormContact}/>
                            </div>

                            <Card className="flex-item">
                                <Card.Header>Adresse: {name}</Card.Header>
                                <div id="cardContacts">
                                    <Form onSubmit={updateAdress}>
                                        <div>
                                            <textarea id="expoAdress"  value={soc_rue} onChange={(e) => {
                                                setSoc_rue(e.target.value);
                                                setShowAdress(false)
                                            }}/>

                                        </div>
                                        <div>
                                            <textarea id="expoAdress" value={soc_codePostal}
                                                   onChange={(e) => setSoc_codePostal(e.target.value)}/>

                                        </div>

                                        <div>
                                            <textarea id="expoAdress" value={soc_ville}
                                                   onChange={(e) => setSoc_ville(e.target.value)}/>

                                        </div>
                                        <div>
                                            <textarea id="expoAdress" value={soc_pays}
                                                   onChange={(e) => setSoc_pays(e.target.value)}/>

                                        </div>

                                        <Button type="submit" id="btnCheck" disabled={!validateFormAdress()}>
                                            <FontAwesomeIcon className="faicon" id="validateButton"
                                                             icon={faCheckCircle}/>
                                        </Button>
                                    </Form>
                                </div>

                            </Card>

                                {contactList.contacts ? contactList.contacts.map((value, index) => {
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
                            ) : null}




                        </Card.Body>

                    </Accordion.Collapse>
                </Card>

                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        Détails suivi
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body className="flex-container-Contacts">
                            <div className="flex-item">
                                <div>
                                    <label >1er contact: </label>
                                    <input id="labelNomExposant" type="date"
                                           defaultValue= {suivi.suivE_dateContact1}
                                           onChange={(event) => updateDateContact(event.target.value,1)}
                                    />
                                </div>
                                <div>
                                    <label >2ème contact: </label>
                                    <input id="labelNomExposant" type="date"
                                           defaultValue= {suivi.suivE_dateContact2}
                                           onChange={(event) => updateDateContact(event.target.value,2)}
                                    />
                                </div>
                                <div>
                                    <label >3ème contact: </label>
                                    <input id="labelNomExposant" type="date"
                                           defaultValue=  {suivi.suivE_dateContact3}
                                           onChange={(event) => updateDateContact(event.target.value,3)}
                                    />
                                </div>
                            </div>

                            {
                                reservation.length > 0 ?
                                <div className="flex-item">
                                    <div>
                                        <label >Se déplace: </label>
                                        {suivi.suivE_deplacement}

                                    </div>
                                    <div>
                                        Besoin de bénévoles: {suivi.suivE_benevole}

                                    </div>
                                    <div>
                                        <label >Nombre de bénévols nécessaires: </label>

                                        <input
                                            type="number"
                                            defaultValue={suivi.suivE_nbBenevoles}
                                            onChange={(event) => updateNbBenevoles(event.target.value)}
                                        />
                                    </div>
                                    <div>
                                        Il envoie ses jeux ? {reservation.res_envoiDebut}
                                    </div>


                                    <div>
                                        <label>A été facturé?</label>

                                        {reservation.res_facture}
                                        {reservation.res_dateFacturation}

                                    </div>
                                    <div>
                                        <label> A payé? </label>
                                        {reservation.res_paiement}
                                        {reservation.res_datePaiement}
                                    </div>


                                </div>
                                    : null
                            }



                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                        Réservation
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>
                            {
                                reservation.length > 0  ?
                                    <div>Afficher la réservation et pouvoir la modifier</div>
                                    :
                                <div>
                                bouton créer une réservation
                                </div>
                            }
                        </Card.Body>
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