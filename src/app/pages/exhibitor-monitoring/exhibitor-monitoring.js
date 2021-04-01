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
import FormReservation from "./reservationForm";
import FormContact from "../../components/contact/FormContact";
import {isAdmin} from "../../utils/utils";
import Table from "react-bootstrap/Table"


const ExhibitorMonitoring = () => {

    const {idExposant} = useParams();

    const [contactList, setContactList] = useState([]);
    const [name, setName] = useState("");
    const [show, setShow] = useState(false);
    const [showNewContact, setShowNewContact] = useState(false);
    const [showAdress, setShowAdress] = useState(false);
    const [soc_ville, setSoc_ville] = useState("");
    const [soc_rue, setSoc_rue] = useState("");
    const [soc_codePostal, setSoc_codePostal] = useState("");
    const [soc_pays, setSoc_pays] = useState("");
    const [detailSuivi, setDetailSuivi] = useState([]);
    const [suivi, setSuivi] = useState([]);
    const [reservation, setReservation] = useState([]);
    const [commentaire, setCommentaire] = useState("");
    const [espaces, setEspaces] = useState([]);

    const [resaExist, setResaExist] = useState(false);



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
        //Récupérerles infos réservation
        const fes_id = localStorage.getItem("currentFestival")
        Axios.get(`/server/reservations/festival/${fes_id}/societe/${idExposant}`).then((res) => {
            if (res.data) {
                setReservation(res.data)
                setCommentaire(res.data.suivE_commentaire)
                if(res.data.length !== 0) {
                    setResaExist(true)
                }
            }
            console.log("RESERVATION", res.data)
        })
    }, []);

    useEffect(() => {
        //Récupérerles infos de suivi
        const fes_id = localStorage.getItem("currentFestival")
        Axios.get(`/server/suiviExposant/festival/${fes_id}/societe/${idExposant}`)
            .then((res) => {
            setSuivi(res.data)
            console.log("SUIVI", res)
        })
    }, []);

   useEffect(() => {
       if(resaExist) {
           const fes_id = localStorage.getItem("currentFestival")
           const res_id = reservation.res_id

           Axios.get(`http://localhost:3000/server/localisation/${fes_id}/allEspace/reservation/${res_id}`)
               .then((res) => {
                   setEspaces(res.data)
                   console.log("ESPACES", res.data)
               })
       }

   }, [resaExist]) //se declenche lorsque la valeur entre crochet cha   nfe

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

        Axios.post(`/server/suiviExposant/${idExposant}/update-commentaire`, {
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
            prenom: event.target.prenom.value,
            telPortable: event.target.telPortable.value,
            telFixe: event.target.telFixe.value,
            email: event.target.email.value,
            rue: event.target.rue.value,
            ville: event.target.ville.value,
            codePostal: event.target.codePostal.value,
            pays: event.target.pays.value,
            fonction: event.target.fonction.value,
            principal: event.target.principal.value,
        }).then((res) => {
            //afficher alert succes
            setShowNewContact(true);


        })
    };

    //créer une réservation
    const onSubmitReservation = (event) => {

        //Ne pas oublier cette ligne!!!
        event.preventDefault(event);
        console.log("EVENT RESA",event);
        console.log("LOC",event.target.loc_id)
        /*
                Axios.post("/server/", {
                    //récupérer les valeurs du formulaire
                    // title: event.target.title.value,

                }).then((res) => {
                    //afficher alert succes
                    //setShow(true);


                })*/
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

    //update besoin de benevoles
    const updateStatusBenevole = (value) => {
        Axios.put("/server/suiviExposant/updateBenevole", {
            suivE_id: suivi.suivE_id,
            suivE_benevole: value
        })
    }

    //changer si il se déplace ou non
    const updateStatusSeDeplace = (value) => {

        console.log("VALUES DEPLPPOEPZOE", value)
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

    const updateDatePaiement = (value) => {
        Axios.put("/server/reservations/updateDatePaiement", {
            res_id: reservation.res_id,
            res_datePaiement: value,
        })
    }


    const updateDateFacturation = (value) => {
        Axios.put("/server/reservations/updateDateFacturation", {
            res_id: reservation.res_id,
            res_dateFacturation: value,
        })
    }

    const updateEnvoieDebut = (value) => {
        Axios.put("/server/reservations/updateEnvoieJeuxDebut", {
            res_id: reservation.res_id,
            res_envoiDebut: value,
        })
    }

    const updatePrixRetour = (value) => {
        Axios.put("/server/reservations/updatePrixRetour", {
            res_id: reservation.res_id,
            res_prixRetour: value,
        })
    }

    const CalculerPrixTOT = () => {
        let prix = 0
        espaces.map((e,i) => {
            console.log(e)
            if(e.espaces[0].esp_enTables){
                prix += e.loc_prixTable * e.espaces[0].esp_qte
            }else{
                prix += e.loc_prixM2 * e.espaces[0].esp_qte
            }


        })
        return prix
    }

    const CalculerPrix = (e) => {

            if(e.espaces[0].esp_enTables){
                return e.loc_prixTable * e.espaces[0].esp_qte
            }else{
               return e.loc_prixM2 * e.espaces[0].esp_qte
            }

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
                    <Form onSubmit={updateCommentaire}>

                    <textarea id="commentaireStickyNote" value={commentaire} onChange={(e) => {
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
                                <Container triggerText="Ajouter un contact" onSubmit={onSubmit}
                                           component={FormContact}/>
                            </div>

                            <Card className="flex-item">
                                <Card.Header>Adresse: {name}</Card.Header>
                                <div id="cardContacts">
                                    <Form onSubmit={updateAdress}>
                                        <div>
                                            <textarea id="expoAdress" value={soc_rue} onChange={(e) => {
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
                                    <label>1er contact: </label>
                                    <input id="labelNomExposant" type="date"
                                           defaultValue={suivi.suivE_dateContact1}
                                           onChange={(event) => updateDateContact(event.target.value, 1)}
                                    />
                                </div>
                                <div>
                                    <label>2ème contact: </label>
                                    <input id="labelNomExposant" type="date"
                                           defaultValue={suivi.suivE_dateContact2}
                                           onChange={(event) => updateDateContact(event.target.value, 2)}
                                    />
                                </div>
                                <div>
                                    <label>3ème contact: </label>
                                    <input id="labelNomExposant" type="date"
                                           defaultValue={suivi.suivE_dateContact3}
                                           onChange={(event) => updateDateContact(event.target.value, 3)}
                                    />
                                </div>
                            </div>

                            {
                                reservation.length != 0 ?
                                    <div className="flex-item">
                                        <div>
                                            <label id="labelCheckbox">Se déplace: </label>

                                            <input
                                                type="checkbox"
                                                defaultChecked={suivi.suivE_deplacement}
                                                onClick={(e) => updateStatusSeDeplace(e.target.checked ? 1 : 0)}
                                            />

                                        </div>
                                        <div>
                                            <label id="labelCheckbox">Besoin de bénévoles: </label>

                                            <input
                                                type="checkbox"
                                                defaultChecked={suivi.suivE_benevole}
                                                onClick={(e) => updateStatusBenevole(e.target.checked ? 1 : 0)}
                                            />

                                        </div>
                                        <div>
                                            <label id="labelCheckbox">Nombre de bénévols nécessaires: </label>

                                            <input
                                                type="number"
                                                min="0"
                                                defaultValue={suivi.suivE_nbBenevoles}
                                                onChange={(event) => updateNbBenevoles(event.target.value)}
                                            />
                                        </div>
                                        <div>

                                            <label id="labelCheckbox">Il envoie ses jeux ?  </label>
                                            <input
                                                type="checkbox"
                                                defaultChecked= {reservation.res_envoiDebut}
                                                onClick={(e) => updateEnvoieDebut(e.target.checked ? 1 : 0)}
                                            />

                                        </div>
                                        <label id="labelCheckbox">Prix retour: </label>

                                        <input
                                            type="number"
                                            min="0"
                                            defaultValue={reservation.res_prixRetour}
                                            onChange={(event) => updatePrixRetour(event.target.value)}
                                        />
                                        €
                                        <div>

                                        </div>

                                        <div>
                                            <label id="labelCheckbox">A été facturé?</label>
                                            <input
                                                type="checkbox"
                                                defaultChecked={reservation.res_facture}
                                                onClick={(event) => updateFacture(event.target.checked ? 1 : 0)}
                                            />
                                            <label id="labelCheckbox">Date de facturation:</label>


                                            <input  type="date"
                                                    defaultValue= {reservation.res_dateFacturation}
                                                    onChange={(event) => updateDateFacturation(event.target.value)}
                                            />

                                        </div>
                                        <div>
                                            <label id="labelCheckbox"> A payé? </label>
                                            <input
                                                type="checkbox"
                                                defaultChecked={reservation.res_paiement}
                                                onClick={(event) => updatePaiement(event.target.checked ? 1 : 0)}

                                            />

                                            <label id="labelCheckbox">Date de paiement:</label>

                                            <input  type="date"
                                                   defaultValue={reservation.res_datePaiement}
                                                   onChange={(event) => updateDatePaiement(event.target.value)}
                                            />

                                        </div>


                                    </div>
                                    :

                                    null

                            }


                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                {
                    isAdmin() ?

                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                        Réservation
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>
                            {
                                reservation.length != 0 ?
                                    <div>
                                        <Table responsive >
                                            <thead>
                                            <td className="tdUnderline"></td>
                                            <td className="tdUnderline"></td>
                                            <td className="tdUnderline"></td>
                                            <td className="tdUnderline">Prix calculé</td>
                                            </thead>
                                            <tbody>
                                            {espaces.map((e,i) => {
                                                    return(
                                                    <tr >
                                                        <td className="tdUnderline">{e.loc_libelle}</td>
                                                        <td className="tdUnderline">{e.espaces[0].esp_qte}</td>
                                                        {e.espaces[0].esp_enTables ? <td className="tdUnderline"> tables </td> : <td className="tdUnderline">M²</td>}
                                                        <td className="tdUnderline">{CalculerPrix(e)}</td>
                                                    </tr>
                                                    )
                                                })
                                            }

                                            <tr>
                                                <td>Prix TOTAL calculé</td>
                                                <td></td>
                                                <td></td>
                                                <td>{CalculerPrixTOT()} €</td>
                                            </tr>
                                            <tr id="prixNego">
                                                <td>Prix TOTAL négocié</td>
                                                <td>{reservation.res_prixNegocie}€</td>


                                            </tr>
                                            </tbody>
                                        </Table>
                                    </div>


                                    :
                                    <div>
                                        <div id="btnNewJeu">
                                            <Container triggerText="Créer une réservation"
                                                       onSubmitReservation={onSubmitReservation} component={FormReservation}/>
                                        </div>
                                    </div>
                            }
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                        : null
                }
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