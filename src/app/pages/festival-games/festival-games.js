import './festival-games.css'
import {isLogin} from "../../utils/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDice, faInfoCircle, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useMemo, useState} from "react";
import Axios from "axios";
import {useHistory} from "react-router"
import TableContainer from "../../components/tables/TableContainer";
import {SelectColumnFilter} from "../../components/tables/Filters";
import {CardBody, CardLink, CardText, CardTitle} from "reactstrap";
import {Card, Form} from "react-bootstrap";
import Moment from "moment";
import {Link} from "react-router-dom";

const FestivalGames = () => {
    const [listeJeux, setListeJeux] = useState([]);
    const [editeursList, setEditeursList] = useState([]);
    const [gameTypeList, setGameTypeList] = useState([]);
    const [zoneList, setZoneList] = useState([]);

    const history = useHistory();


    //méthode qui s'appelle au chargement de la page
    useEffect(() => {
        //Récupérer les infos de tous les jeux
        Axios.get(`/server/jeuxFestival/${localStorage.getItem("currentFestival")}/allDetails`)
            .then((res) => {
                setListeJeux(res.data)
                console.log(res.data)
            });

    }, []);

    useEffect(() => {
        //récupérer tous les éditeurs
        Axios.get("/server/societe/allEditeurs")
            .then((res) => {
                setEditeursList(res.data)
            })
    }, [])

    useEffect(() => {
        //Récupérer tous les types
        Axios.get("/server/typeJeu/all")
            .then((res) => {
                setGameTypeList(res.data)
            })
    }, [])

    useEffect(() => {
        Axios.get(`/server/zones/all/${localStorage.getItem("currentFestival")}`)
            .then((res) => {
                setZoneList(res.data)
            })
    }, [])


    //redirection page suivi éditeur
    const goToExhibitorMonitoring = (soc_id) => {

        history.push('/exhibitor-monitoring/' + soc_id);

        window.location.reload(false)

    }

    // update Editeur
    const updateEditeurId = (data, value) => {
        Axios.post(`/server/Jeux/${data.j_id}/update-editeurId`, {
            editeurId: value,
        }).then((res) => {
            console.log(res)
        })
    }

    // updtate Type jeu
    const updateGameTypeId = (data, value) => {
        Axios.post(`/server/Jeux/${data.j_id}/update-typeId`, {
            typeId: value,
        }).then((res) => {
            console.log(res)
        })
    }

    //update prototype
    const updatePrototype = (data, value) => {

        Axios.post(`/server/jeuxFestival/update-prototype/${data.suivJ_id}`, {
            suivJ_prototype: value,
        })
            .then((res) => {
                console.log(res)
            })
    }

    //update zone
    const updateZone = (data, value) => {
        Axios.post(`/server/jeuxFestival/update-zone/${data.suivJ_id}`, {
            zo_id: value,
        })
            .then((res) => {
                console.log(res)
            })
    }
    //update place
    const updatePlace = (data, value) => {
        Axios.post(`/server/JeuxFestival/update-place/${data.suivJ_id}`, {
            suivJ_place: value,
        })
            .then((res) => {
                console.log(res)
            })
    }

    //update tombola
    const updateTombola = (data, value) => {

        Axios.post(`/server/JeuxFestival/update-tombola/${data.suivJ_id}`, {
            suivJ_tombola: value,
        })
            .then((res) => {
                console.log(res)
            })
    }

    //update dotation
    const updateDotation = (data, value) => {
        Axios.post(`/server/JeuxFestival/update-dotation/${data.suivJ_id}`, {
            suivJ_dotation: value,
        })
            .then((res) => {
                console.log(res)
            })
    }

    //update nombre de jeux reçus
    const updateNbJeuxRecus = (data, value) => {
        Axios.post(`/server/JeuxFestival/update-nbJeuxRecus/${data.suivJ_id}`, {
            suivJ_nbJeuxRecus: value,
        })
            .then((res) => {
                console.log(res)
            })
    }

    //update nombre de jeux exposés
    const updateNbJeuxExposes = (data, value) => {
        Axios.post(`/server/JeuxFestival/update-nbJeuxExposes/${data.suivJ_id}`, {
            suivJ_nbJeuxExposes: value,
        })
            .then((res) => {
                console.log(res)
            })
    }
    //update ageMin
    const updateageMin = (data, value) => {

        Axios.post(`/server/Jeux/${data.j_id}/update-ageMin`, {
            ageMin: value,
        })
    }
    // update joueurs Min
    const updatenbjMin = (data, value) => {

        Axios.post(`/server/Jeux/${data.j_id}/update-nbjMin`, {
            nbjMin: value,
        })
    }
    // update joueurs Max
    const updatenbjMax = (data, value) => {

        Axios.post(`/server/Jeux/${data.j_id}/update-nbjMax`, {
            nbjMax: value,
        })
    }

    // update DUREE
    const updateDuree = (data, value) => {

        Axios.post(`/server/Jeux/${data.j_id}/update-duree`, {
            duree: value,
        })
    }

    //  update NOTICE
    const updateNotice = (data, value) => {

        Axios.post(`/server/Jeux/${data.j_id}/update-lienNotice`, {
            lienNotice: value,
        })
    }

    //update recu
    const updateRecu = (data, value) => {

        Axios.post(`/server/JeuxFestival/update-recu/${data.suivJ_id}`, {
            suivJ_recu: value,
        })
    }

    //update a renvoyer
    const updateARenvoyer = (data, value) => {

        Axios.post(`/server/JeuxFestival/update-aRenvoyer/${data.suivJ_id}`, {
            suivJ_aRenvoyer: value,
        })
            .then((res) => {
                console.log(res)
            })
    }

    //update renvoyé
    const updateRenvoye = (data, value) => {

        Axios.post(`/server/JeuxFestival/update-renvoye/${data.suivJ_id}`, {
            suivJ_renvoye: value,
        })
            .then((res) => {
                console.log(res)
            })
    }

//déclarer toutes les colonnes
    const columns = useMemo(() => {

        const result = [
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
            },
            {
                Header: "Nom",
                accessor: "jeu.j_titre",
            },
            {
                Header: "Éditeur",
                accessor: "jeu.societe.soc_nom",


                Cell: row => {

                    return (
                        isLogin() ?
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
                            : <p>{row.value}</p>
                    )
                }
            },
            {
                Header: "Type",
                accessor: "jeu.type_jeu.typJ_libelle",

                disableSortBy: true,
                Filter: SelectColumnFilter,
                filter: 'equals',

                Cell: row => {
                    return (
                        isLogin() ?
                            <div>
                                <Form.Group>
                                    <Form.Control style={{width: 'auto'}} as="select"
                                                  onChange={(e) => updateGameTypeId(row.row.original, e.target.value)}>
                                        {gameTypeList.map((object, i) =>
                                            <option selected={row.value === object.typJ_libelle}
                                                    value={object.typJ_id}
                                                    key={object.typJ_id}> {object.typJ_libelle}</option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            : <p>{row.value}</p>
                    )
                }
            },

            {
                Header: "Zone",
                accessor: "zone.zo_libelle",

                disableSortBy: true,
                Filter: SelectColumnFilter,
                filter: 'equals',


                Cell: row => {

                    return (
                        isLogin() ?
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
                            : <p>{row.value}</p>
                    )
                }

            },


        ];

        if (isLogin()) {
            result.push(
                {

                    Header: "Exposant",
                    accessor: "reservation.societe.soc_nom",

                    Cell: row => {

                        return (

                            <a href="#"
                               onClick={() => goToExhibitorMonitoring(row.row.original.reservation.societe.soc_id)}>{row.value}</a>

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
                    Header: "Placé plan",
                    accessor: d => d.suivJ_place != null ? d.suivJ_place.toString() : null, //required cast from boolea to string


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
                    accessor: d => d.reservation == null ? null : d.reservation.res_envoiDebut != null ? d.reservation.res_envoiDebut.toString() : null, //required cast from boolea to string

                    disableSortBy: true,
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                },

                {
                    Header: "Reçu ?",
                    accessor: d => d.suivJ_recu != null ? d.suivJ_recu.toString() : null, //required cast from boolea to string

                    disableSortBy: true,
                    Filter: SelectColumnFilter,
                    filter: 'equals',

                    Cell: row => {
                        return (
                            <div style={{'textAlign': 'center'}}>
                                <input
                                    type="checkbox"
                                    defaultChecked={row.value === "true"}
                                    onChange={(event) => updateRecu(row.row.original, event.target.checked)}/>
                            </div>
                        )
                    },
                },
                {
                    Header: "A renvoyer ?",
                    accessor: d => d.suivJ_aRenvoyer != null ? d.suivJ_aRenvoyer.toString() : null, //required cast from boolea to string

                    disableSortBy: true,
                    Filter: SelectColumnFilter,
                    filter: 'equals',

                    Cell: row => {
                        return (
                            <div style={{'textAlign': 'center'}}>
                                <input
                                    type="checkbox"
                                    defaultChecked={row.value === "true"}
                                    onChange={(event) => updateARenvoyer(row.row.original, event.target.checked)}/>
                            </div>
                        )
                    },
                },
                {
                    Header: "Renvoyé ?",
                    accessor: d => d.suivJ_renvoye != null ? d.suivJ_renvoye.toString() : null, //required cast from boolea to string

                    disableSortBy: true,
                    Filter: SelectColumnFilter,
                    filter: 'equals',

                    Cell: row => {
                        return (
                            <div style={{'textAlign': 'center'}}>
                                <input
                                    type="checkbox"
                                    defaultChecked={row.value === "true"}
                                    onChange={(event) => updateRenvoye(row.row.original, event.target.checked)}/>
                            </div>
                        )
                    },
                },
                {
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
            )
        }
        return result

    }, [listeJeux, editeursList, zoneList])

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
                {isLogin() ?
                    <div className="flex-item">
                        <CardTitle>
                            <h5>Détails réservation </h5>
                        </CardTitle>
                        <CardText>
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
                                    defaultValue={row.original.suivJ_nbJeuxExposes}
                                    onChange={(event) => updateageMin(row.original, event.target.value)}/>

                            </p>
                        </CardText>
                    </div>
                    : null}
                <div className="flex-item">
                    <CardTitle>
                        <h5> Détails jeu </h5>
                    </CardTitle>
                    <CardText>
                        <p>
                            <label id="checboxCardGames">Age minimum:</label>
                            {isLogin() ?
                                <input
                                    type="number"
                                    min="0"
                                    defaultValue={row.original.jeu.j_ageMin}
                                    onChange={(event) => updateNbJeuxExposes(row.original, event.target.value)}/>
                                : row.original.jeu.j_ageMin}
                            an(s)
                        </p>
                        <p>
                            <label id="checboxCardGames">Nombre de joueurs minimum: </label>
                            {isLogin() ?
                                <input
                                    type="number"
                                    min="0"
                                    defaultValue={row.original.jeu.j_nbMinJoueurs}
                                    onChange={(event) => updatenbjMin(row.original, event.target.value)}/>
                                : row.original.jeu.j_nbMinJoueurs}
                        </p>
                        <p>
                            <label id="checboxCardGames"> Nombre de joueurs maximum: </label>
                            {isLogin() ?
                                <input
                                    type="number"
                                    min={row.original.jeu.j_nbMinJoueurs}
                                    defaultValue={row.original.jeu.j_nbMaxJoueurs}
                                    onChange={(event) => updatenbjMax(row.original, event.target.value)}/>
                                : row.original.jeu.j_nbMaxJoueurs}
                        </p>
                        <p>
                            <label id="checboxCardGames">Durée: </label>
                            {isLogin() ?
                                <input
                                    type="time"
                                    defaultValue={row.original.jeu.j_duree}
                                    onChange={(event) => updateDuree(row.original, event.target.value)}/>
                                : row.original.jeu.j_duree}
                        </p>
                        <p>
                            {row.original.jeu.j_lienNotice !== "'NULL'" ? (
                                <CardLink href={row.original.jeu.j_lienNotice}>Voir les règles du jeu</CardLink>
                            ) : null}

                        </p>
                        {
                            isLogin() ? <p><label id="checboxCardGames"> Changer le lien des règles: </label>
                                    <input
                                        type="url"
                                        defaultValue={row.original.jeu.j_lienNotice}
                                        onChange={(event) => updateNotice(row.original, event.target.value)}/>
                                </p>
                                : null
                        }


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
