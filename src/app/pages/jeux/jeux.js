import './jeux.css'
import React, {useEffect, useState, useMemo} from "react";
import Axios from "axios"

import TableContainer from "../../components/tables/TableContainer";
import {SelectColumnFilter} from "../../components/tables/Filters";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChessKnight} from "@fortawesome/free-solid-svg-icons";
import {Container} from "../../components/ModalForm/container";
import FormJeu from "./formJeu";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

export const Jeux = () => {



    const [listeJeux, setListeJeux] = useState([]);
    const [gameTypeList, setGameTypeList] = useState([]);
    const [editeursList, setEditeursList] = useState([]);

    const [show, setShow] = useState(false)


    const onSubmit = (event) => {

        //Ne pas oublier cette ligne!!!
        event.preventDefault(event);

        Axios.post("http://localhost:3000/server/jeux/add", {
            //récupérer les valeurs du formulaire
            title: event.target.title.value,
            minAge : event.target.minAge.value,
            duration : event.target.duration.value,
            maxNumPlayers : event.target.maxNumPlayers.value,
            minNumPlayers : event.target.minNumPlayers.value,
            rulesLink : event.target.rulesLink.value,
            companyId : event.target.companyId.value,
            gameTypeId : event.target.gameTypeId.value,
        }).then((res) => {
         //afficher alert succes
            setShow(true);


        })
    };


    //méthode qui s'appelle au chargement de la page
    useEffect(() => {
        //Récupérer les infos de tous les jeux
        Axios.get("http://localhost:3000/server/Jeux/allDetails")
            .then((res) => {

                setListeJeux(res.data)
            });

    }, []);

    useEffect(() => {
        //Récupérer tous les types
        Axios.get("http://localhost:3000/server/typeJeu/all")
            .then((res) => {
                setGameTypeList(res.data)
            })
    }, [])

    useEffect(() => {
        //récupérer tous les éditeurs
        Axios.get("http://localhost:3000/server/societe/allEditeurs")
            .then((res) => {
                setEditeursList(res.data)
            })
    }, [])


    // update Editeur
    const updateEditeurId = (data, value) => {
        Axios.post(`http://localhost:3000/server/Jeux/${data.j_id}/update-editeurId`, {
            editeurId: value,
        })
    }
    // updtate Type jeu
    const updateGameTypeId = (data, value) => {
        const j_id = data.j_id
        Axios.post(`http://localhost:3000/server/Jeux/${j_id}/update-typeId`, {
            typeId: value,
        })
    }
    //update ageMin
    const updateageMin = (rowIndex, data, value) => {
        const j_id = data[rowIndex].j_id
        Axios.post(`http://localhost:3000/server/Jeux/${j_id}/update-ageMin`, {
            ageMin: value,
        })
    }
    // update joueurs Min
    const updatenbjMin = (rowIndex, data, value) => {
        const j_id = data[rowIndex].j_id
        Axios.post(`http://localhost:3000/server/Jeux/${j_id}/update-nbjMin`, {
            nbjMin: value,
        })
    }
    // update joueurs Max
    const updatenbjMax = (rowIndex, data, value) => {
        const j_id = data[rowIndex].j_id
        Axios.post(`http://localhost:3000/server/Jeux/${j_id}/update-nbjMax`, {
            nbjMax: value,
        })
    }

    // update DUREE
    const updateDuree = (rowIndex, data, value) => {
        const j_id = data[rowIndex].j_id
        Axios.post(`http://localhost:3000/server/Jeux/${j_id}/update-duree`, {
            duree: value,
        })
    }

    //  update NOTICE
    const updateNotice = (rowIndex, data, value) => {
        const j_id = data[rowIndex].j_id
        Axios.post(`http://localhost:3000/server/Jeux/${j_id}/update-lienNotice`, {
            lienNotice: value,
        })
    }

    //déclarer toutes les colonnes
    const columns = useMemo(() => [

        {
            Header: "Nom",
            accessor: "j_titre",
        },
        {
            Header: "Éditeur",
            accessor: "societe.soc_nom",


            disableSortBy: true,
            Filter: SelectColumnFilter,
            filter: 'equals',


            Cell: row => {

                return (
                    <div>
                        <Form.Group>
                            <Form.Control style={{width: 'auto'}} as="select" onChange={(e) => updateEditeurId(row.row.original, e.target.value)}>
                                {editeursList.map((object, i) =>
                                    <option selected={row.value === object.soc_nom} value={object.soc_id} key={object.soc_id} > {object.soc_nom}</option>
                                )}
                            </Form.Control>
                        </Form.Group>
                    </div>
                )
            }


        },
        {
            Header: "Type de jeu",
            accessor: "type_jeu.typJ_libelle",

            disableSortBy: true,
            Filter: SelectColumnFilter,
            filter: 'equals',


            Cell: row => {
                return (
                    <div>
                        <Form.Group>
                            <Form.Control style={{width: 'auto'}} as="select" onChange={(e) => updateGameTypeId(row.row.original, e.target.value)}>
                                {gameTypeList.map((object, i) =>
                                    <option selected={row.value === object.typJ_libelle} value={object.typJ_id} key={object.typJ_id} > {object.typJ_libelle}</option>
                                )}
                            </Form.Control>
                        </Form.Group>
                    </div>
                )
            }


        },
        {
            Header: "Age min",
            accessor: "j_ageMin",
            Cell: row => {
                return (
                    <Form.Control  autoFocus type="number" min="0" defaultValue={row.value}
                                  onChange={(e) => updateageMin(parseInt(row.row.id), row.data, e.target.value)}/>
                )
            },
        },
        {
            Header: "nb joueurs min",
            accessor: "j_nbMinJoueurs",
            Cell: row => {
                return (
                    <Form.Control autoFocus type="number" min="0" defaultValue={row.value}
                                  onChange={(e) => updatenbjMin(parseInt(row.row.id), row.data, e.target.value)}/>
                )
            },
        },
        {
            Header: "nb joueurs max",
            accessor: "j_nbMaxJoueurs",
            Cell: row => {
                return (
                    <Form.Control autoFocus type="number" min={row.row.original.j_nbMinJoueurs} defaultValue={row.value}
                                  onChange={(e) => updatenbjMax(parseInt(row.row.id), row.data, e.target.value)}/>
                )
            },
        },
        {
            Header: "Durée",
            accessor: "j_duree",

            Cell: row => {
                return (
                    <Form.Control autoFocus type="time" defaultValue={row.value}
                                  onChange={(e) => updateDuree(parseInt(row.row.id), row.data, e.target.value)}/>

                )
            },
        },
        {
            Header: "Notice",
            accessor: "j_lienNotice",

            Cell: row => {
                return (
                    <Form.Control autoFocus type="url" defaultValue={row.value}
                                  onChange={(e) => updateNotice(parseInt(row.row.id), row.data, e.target.value)}/>

                )
            },
        }
    ], [listeJeux, editeursList, gameTypeList]) //les variables du tableau


    return (
        <>
            <div id="titlePageJeux">
                <h1>
                    <FontAwesomeIcon className="faicon" icon={faChessKnight}/>
                    Jeux
                </h1>

            </div>
            <Alert id="alertSucces" variant="success" show={show}>
                Le jeu a été crée avec succès!
            </Alert>
            <div id="btnNewJeu">
                <Container triggerText="Créer un nouveau jeu" onSubmit={onSubmit} component={FormJeu}/>
            </div>
            <div style={{marginTop: `50px`}}>
                <TableContainer columns={columns} data={listeJeux}/>
            </div>
        </>
    )
}

