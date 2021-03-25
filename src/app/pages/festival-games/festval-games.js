import './festival-games.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDice, faInfoCircle, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useMemo, useState} from "react";
import Axios from "axios";

import TableContainer from "../../components/tables/TableContainer";
import {SelectColumnFilter} from "../../components/tables/Filters";
import {CardBody, CardLink, CardText, CardTitle} from "reactstrap";
import {Card, Form} from "react-bootstrap";
import Moment from "moment";
import FormText from "react-bootstrap/FormText";

const FestivalGames = () => {
    const [listeJeux, setListeJeux] = useState([]);
    const [editeursList, setEditeursList] = useState([]);
    const [gameTypeList, setGameTypeList] = useState([]);
    const [zoneList, setZoneList] = useState([]);


    //méthode qui s'appelle au chargement de la page
    useEffect(() => {
        //Récupérer les infos de tous les jeux
        Axios.get(`http://localhost:3000/server/jeuxFestival/${localStorage.getItem("currentFestival")}/allDetails`)
            .then((res) => {
                setListeJeux(res.data)
            });

    }, []);

    useEffect(() => {
        //récupérer tous les éditeurs
        Axios.get("http://localhost:3000/server/societe/allEditeurs")
            .then((res) => {
                setEditeursList(res.data)
            })
    }, [])

    useEffect(() => {
        //Récupérer tous les types
        Axios.get("http://localhost:3000/server/typeJeu/all")
            .then((res) => {
                setGameTypeList(res.data)
            })
    }, [])

    useEffect(() => {
        Axios.get(`http://localhost:3000/server/zones/all/${localStorage.getItem("currentFestival")}`)
            .then((res) => {
                setZoneList(res.data)
            })
    }, [])

    // update Editeur
    const updateEditeurId = (data, value) => {
        Axios.post(`http://localhost:3000/server/Jeux/${data.j_id}/update-editeurId`, {
            editeurId: value,
        }).then((res) => {
            console.log(res)
        })
    }

    // updtate Type jeu
    const updateGameTypeId = (data, value) => {
        Axios.post(`http://localhost:3000/server/Jeux/${data.j_id}/update-typeId`, {
            typeId: value,
        }) .then((res) => {
            console.log(res)
        })
    }

    //update prototype
    const updatePrototype = (data, value) => {

        Axios.post(`http://localhost:3000/server/jeuxFestival/update-prototype/${data.suivJ_id}`, {
            suivJ_prototype: value,
        })
            .then((res) => {
                console.log(res)
            })
    }

    //update zone
    const updateZone = (data, value) => {
        Axios.post(`http://localhost:3000/server/jeuxFestival/update-zone/${data.suivJ_id}`,{
             zo_id: value,
        })
            .then((res) => {
                console.log(res)
            })
}
    //update place
    const updatePlace = (data,value) => {
        Axios.post(`http://localhost:3000/server/JeuxFestival/update-place/${data.suivJ_id}`,{
            suivJ_place: value,
        })
            .then((res) => {
                console.log(res)
            })
    }

    //update tombola
    const updateTombola = (data,value) => {

        Axios.post(`http://localhost:3000/server/JeuxFestival/update-tombola/${data.suivJ_id}`,{
            suivJ_tombola: value,
        })
            .then((res) => {
                console.log(res)
            })
    }

    //update dotation
    const updateDotation = (data,value) => {
        Axios.post(`http://localhost:3000/server/JeuxFestival/update-dotation/${data.suivJ_id}`,{
            suivJ_dotation: value,
        })
            .then((res) => {
                console.log(res)
            })
    }

    //update nombre de jeux reçus
    const updateNbJeuxRecus = (data,value) => {
        Axios.post(`http://localhost:3000/server/JeuxFestival/update-nbJeuxRecus/${data.suivJ_id}`,{
            suivJ_nbJeuxRecus: value,
        })
            .then((res) => {
                console.log(res)
            })
    }

    //update nombre de jeux exposés
    const updateNbJeuxExposes = (data,value) => {
        Axios.post(`http://localhost:3000/server/JeuxFestival/update-nbJeuxExposes/${data.suivJ_id}`,{
            suivJ_nbJeuxExposes: value,
        })
            .then((res) => {
                console.log(res)
            })
    }
    //update ageMin
    const updateageMin = (data,value) => {

        Axios.post(`http://localhost:3000/server/Jeux/${data.j_id}/update-ageMin`, {
            ageMin: value,
        })
    }
    // update joueurs Min
    const updatenbjMin = (data,value) => {

        Axios.post(`http://localhost:3000/server/Jeux/${data.j_id}/update-nbjMin`, {
            nbjMin: value,
        })
    }
    // update joueurs Max
    const updatenbjMax = (data,value) => {

        Axios.post(`http://localhost:3000/server/Jeux/${data.j_id}/update-nbjMax`, {
            nbjMax: value,
        })
    }

    // update DUREE
    const updateDuree = (data,value) => {

        Axios.post(`http://localhost:3000/server/Jeux/${data.j_id}/update-duree`, {
            duree: value,
        })
    }

    //  update NOTICE
    const updateNotice = (data,value) => {

        Axios.post(`http://localhost:3000/server/Jeux/${data.j_id}/update-lienNotice`, {
            lienNotice: value,
        })
    }

//déclarer toutes les colonnes
const columns = useMemo(() => [
    {
        //This column is used for displaying more/less details
        Header: () => null,
        id: 'expander', // 'id' is required

        Cell: ({row}) => (
            <span {...row.getToggleRowExpandedProps()}>
                        {row.isExpanded ? <FontAwesomeIcon className="faiconDetail" icon={faEyeSlash}/> :
                            <FontAwesomeIcon className="faiconDetail" icon={faInfoCircle}/>}
                    </span>
        ),
    }, {
        Header: "Nom",
        accessor: "jeu.j_titre",
    },
    {
        Header: "Éditeur",
        accessor: "jeu.societe.soc_nom",

        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: 'equals',

        Cell: row => {

            return (
                <div>
                    <Form.Group>
                        <Form.Control style={{width: 'auto'}} as="select"
                                      onChange={(e) => updateEditeurId(row.row.original, e.target.value)}>
                            {editeursList.map((object, i) =>
                                <option selected={row.value === object.soc_nom} value={object.soc_id}
                                        key={object.soc_id}> {object.soc_nom}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                </div>
            )
        }
    },
    {
        Header: "Exposant",
        accessor: "reservation.societe.soc_nom",
    },
    {
        Header: "Type",
        accessor: "jeu.type_jeu.typJ_libelle",

        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: 'equals',

        Cell: row => {
            return (
                <div>
                    <Form.Group>
                        <Form.Control style={{width: 'auto'}} as="select"
                                      onChange={(e) => updateGameTypeId(row.row.original, e.target.value)}>
                            {gameTypeList.map((object, i) =>
                                <option selected={row.value === object.typJ_libelle}
                                        value={object.typJ_id} key={object.typJ_id}> {object.typJ_libelle}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                </div>
            )
        }
    },
    {

        Header: "Prototype",
        accessor: d => d.suivJ_prototype != null ? d.suivJ_prototype.toString() : null, //required cast from boolea to string


        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: 'equals',

        Cell: row => {
            return (
                <div style={{'textAlign': 'center'}}>
                    <input
                        type="checkbox"
                        defaultChecked={row.value === "true"}
                        onChange={(event) => updatePrototype(row.row.original, event.target.checked)}/>
                </div>
            )
        },
    },
    {
        Header: "Zone",
        accessor: "zone.zo_libelle",

        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: 'equals',


        Cell: row => {

            return (
                <div>
                    <Form.Group>
                        <Form.Control style={{width: 'auto'}} as="select"
                                      onChange={(e) => updateZone(row.row.original, e.target.value)}>
                            {zoneList.map((object, i) =>
                                <option selected={row.value === object.zo_libelle} value={object.zo_id}
                                        key={object.zo_id}> {object.zo_libelle}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                </div>
            )
        }

    },

    {
        Header: "Placé plan",
        accessor:  d => d.suivJ_place != null ? d.suivJ_place.toString() : null, //required cast from boolea to string


        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: 'equals',

        Cell: row => {
            return (
                <div style={{'textAlign': 'center'}}>
                    <input
                        type="checkbox"
                        defaultChecked={row.value === "true"}
                        onChange={(event) => updatePlace(row.row.original, event.target.checked)}/>
                </div>
            )
        },
    },


    {
        Header: "Envoie ?",
        accessor: d => d.reservation.res_envoiDebut != null ? d.reservation.res_envoiDebut.toString() : null, //required cast from boolea to string

        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: 'equals',
    },
    {
        Header: "Reçu ?",
        accessor: d => d.reservation.res_recu != null ? d.reservation.res_recu.toString() : null, //required cast from boolea to string

        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: 'equals',
    }, {
        Header: "Dernière modifications",
        accessor: "suivJ_dateSaisie",

        Cell: row => {
            return (
                <div>
                    {Moment(row.row.original.suivJ_dateSaisie).format('DD/MM/YYYY')}
                </div>
            )
        },
    }


], [listeJeux, editeursList, zoneList])

/**
 * This method is used to display more details for a given object
 * It is actived when clicking on the first column for a specific row
 *
 * @param row
 * @returns {JSX.Element}
 */
const detailsGame = (row) => {
    //Display the cards (more details)
    return (
        <Card className="CardGames">
            <div className="flex-item">
                <CardTitle>
                    <h5>Détails réservation </h5>
                </CardTitle>
                <CardText>
                    {console.log("ROW", row.original)}

                    <p>
                        <label id="checboxCardGames">Tombola:</label>
                        <input
                            type="checkbox"
                            defaultChecked={row.original.suivJ_tombola}
                            onChange={(event) => updateTombola(row.original, event.target.checked)}/>
                    </p>
                    <p>
                        <label id="checboxCardGames">Dotation:</label>
                        <input
                            type="checkbox"
                            defaultChecked={row.original.suivJ_dotation}
                            onChange={(event) => updateDotation(row.original, event.target.checked)}/>

                    </p>
                    <p>
                        <label id="checboxCardGames">Nombre de jeux reçus:</label>
                        <input
                            type="number"
                            min="0"
                            defaultValue={row.original.suivJ_nbJeuxRecus}
                            onChange={(event) => updateNbJeuxRecus(row.original, event.target.value)}/>

                    </p>
                    <p>
                        <label id="checboxCardGames">Nombre de jeux exposés:</label>
                        <input
                            type="number"
                            min="0"
                            defaultValue={row.original.jeu.j_ageMin}
                            onChange={(event) => updateageMin(row.original, event.target.value)}/>

                    </p>
                </CardText>
            </div>
            <div className="flex-item">
                <CardTitle>
                    <h5> Détails jeu </h5>
                </CardTitle>
                <CardText>
                    <p>
                        <label id="checboxCardGames">Age minimum:</label>
                        <input
                            type="number"
                            min="0"
                            defaultValue={row.original.suivJ_nbJeuxExposes}
                            onChange={(event) => updateNbJeuxExposes(row.original, event.target.value)}/>

                      </p>
                    <p>
                        <label id="checboxCardGames">Nombre de joueurs minimum: </label>
                        <input
                            type="number"
                            min="0"
                            defaultValue={row.original.jeu.j_nbMinJoueurs}
                            onChange={(event) => updatenbjMin(row.original, event.target.value)}/>

                    </p>
                    <p>
                        <label id="checboxCardGames"> Nombre de joueurs maximum: </label>
                        <input
                            type="number"
                            min={row.original.jeu.j_nbMinJoueurs}
                            defaultValue={row.original.jeu.j_nbMaxJoueurs}
                            onChange={(event) => updatenbjMax(row.original, event.target.value)}/>
                    </p>
                    <p>
                        <label id="checboxCardGames">Durée: </label>
                        <input
                            type="time"
                            defaultValue={row.original.jeu.j_duree}
                            onChange={(event) => updateDuree(row.original, event.target.value)}/>
                    </p>
                    <p>
                        {row.original.jeu.j_lienNotice !== "'NULL'" ? (
                            <CardLink href={row.original.jeu.j_lienNotice}>Voir les règles du jeu</CardLink>
                        ) : null}

                    </p>
                    <p> <label id="checboxCardGames"> Changer le lien des règles: </label>
                        <input
                            type="url"
                            defaultValue={row.original.jeu.j_lienNotice}
                            onChange={(event) => updateNotice(row.original, event.target.value)}/>
                    </p>

                </CardText>
            </div>
        </Card>
    )


}

return (
    <div className="EspaceFooter">
        <div id="titlePageJeuxFestival">
            <h1>
                <FontAwesomeIcon className="faicon" icon={faDice}/>
                Suivi des jeux du festival
            </h1>
        </div>
        <div style={{marginTop: `50px`}}>
            <TableContainer columns={columns} data={listeJeux} renderRowSubComponent={detailsGame}/>
        </div>
    </div>
)
}

export default FestivalGames