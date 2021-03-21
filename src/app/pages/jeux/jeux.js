import './jeux.css'
import React, {useEffect, useState, useMemo} from "react";
import Axios from "axios"
import TableContainer from "../../components/tables/TableContainer";
import {SelectColumnFilter} from "../../components/tables/Filters";
import {closeModal} from '../../components/ModalForm/container';

import {Container} from "../../components/ModalForm/container";
import FormJeu from "./formJeu";
import Form from "react-bootstrap/Form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChessKnight} from "@fortawesome/free-solid-svg-icons";
import {Nav} from "react-bootstrap";

export const Jeux = () => {


    const [listeJeux, setListeJeux] = useState([]);
    const [gameTypeList,setGameTypeList] = useState([]);
    const [editeursList,setEditeursList] = useState([]);



    const onSubmit = (event) => {

        //Ne pas oublier cette ligne!!!
        event.preventDefault(event);

        //récupérer les valeurs du formulaire
        Axios.post("http://localhost:3000/server/jeux/add", {
            title: event.target.title.value,
            minAge : event.target.minAge.value,
            duration : event.target.duration.value,
            maxNumPlayers : event.target.maxNumPlayers.value,
            minNumPlayers : event.target.minNumPlayers.value,
            rulesLink : event.target.rulesLink.value,
            companyId : event.target.companyId.value,
            gameTypeId : event.target.gameTypeId.value,
        })
            .then((res) => {
                //faire quelque chose genre message succès

            })
    };


    //méthode qui s'appelle au chargement de la page
    useEffect(() => {
        //Récupérer les infos de tous les jeux
        Axios.get("http://localhost:3000/server/Jeux/allDetails")
            .then((res) => {
                console.log(res.data)
                setListeJeux(res.data)
            })
       }, []);

    useEffect(() => {
        Axios.get("http://localhost:3000/server/jeux/allGameType")
            .then((res) => {
                setGameTypeList(res.data)
            })
    }, [])

    useEffect(() => {
        Axios.get("http://localhost:3000/server/societe/allEditeurs")
            .then((res) => {
                setEditeursList(res.data)
            })
    }, [])

       //TODO update Editeur
    const updateEditeurId = (rowIndex, data, value) => {
        const j_id = data[rowIndex].j_id
        Axios.post(`http://localhost:3000/server/Jeux/${j_id}/update-editeurId`, {
            editeurId: value,
        })
    }
       //TODO updtate Type jeu
       const updateGameTypeId = (rowIndex, data, value) => {
           const j_id = data[rowIndex].j_id
           Axios.post(`http://localhost:3000/server/Jeux/${j_id}/update-typeId`, {
               typeId: value,
           })
       }
       //TODO update ageMin
       const updateageMin = (rowIndex, data, value) => {
           const j_id = data[rowIndex].j_id
           Axios.post(`http://localhost:3000/server/Jeux/${j_id}/update-ageMin`, {
               ageMin: value,
           })
       }
       //TODO update joueurs Min
       const updatenbjMin = (rowIndex, data, value) => {
           const j_id = data[rowIndex].j_id
           Axios.post(`http://localhost:3000/server/Jeux/${j_id}/update-nbjMin`, {
               nbjMin: value,
           })
       }
       //TODO update joueurs Max
       const updatenbjMax = (rowIndex, data, value) => {
           const j_id = data[rowIndex].j_id
           Axios.post(`http://localhost:3000/server/Jeux/${j_id}/update-nbjMax`, {
               nbjMax: value,
           })
       }

       //TODO update DUREE
       const updateDuree = (rowIndex, data, value) => {
           const j_id = data[rowIndex].j_id
           Axios.post(`http://localhost:3000/server/Jeux/${j_id}/update-duree`, {
               duree: value,
           })
       }

       //TODO  update NOTICE
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
               accessor: "nom_editeur"
               /*
              disableSortBy: true,
              Filter: SelectColumnFilter,
              filter: 'equals',

              Cell: row => {
                  return (
                      <Form.Control autoFocus  as="select" value={row.value} onChange={(e) => updateEditeurId(parseInt(row.row.id), row.data, e.target.value)} >
                          {editeursList.map((object,i) =><option value={editeursList[i].soc_id}>{editeursList[i].soc_nom} </option> )}
                      </Form.Control>
                  )
              }

               */
           },
           {
               Header: "Type de jeu",
               accessor: "typeJeu",


               disableSortBy: true,
               Filter: SelectColumnFilter,
               filter: 'equals',

               Cell: row => {
                   return (
                       <Form.Control autoFocus  as="select" value={row.value} onChange={(e) => updateGameTypeId(parseInt(row.row.id), row.data, e.target.value)} >
                           {gameTypeList.map((object,i) =><option value={gameTypeList[i].typJ_id}>{gameTypeList[i].typJ_libelle} </option> )}
                       </Form.Control>
                   )
               }


        },
        {
            Header: "Age min",
            accessor: "j_ageMin",
            Cell: row =>{
                return (
                    <Form.Control autoFocus  type="number" min="0" defaultValue={row.value} onChange={(e) => updateageMin(parseInt(row.row.id), row.data, e.target.value)} />
                )
            },
        },
        {
            Header: "nb joueurs min",
            accessor: "j_nbMinJoueurs",
            Cell: row =>{
                return (
                    <Form.Control autoFocus  type="number" min="0" defaultValue={row.value} onChange={(e) => updatenbjMin(parseInt(row.row.id), row.data, e.target.value)} />
                )
            },
        },
        {
            Header: "nb joueurs max",
            accessor: "j_nbMaxJoueurs",
            Cell: row =>{
                return (
                    <Form.Control autoFocus  type="number" min={row.row.original.j_nbMinJoueurs} defaultValue={row.value} onChange={(e) => updatenbjMax(parseInt(row.row.id), row.data, e.target.value)} />
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
                    <Form.Control autoFocus  type="url" defaultValue={row.value} onChange={(e) => updateNotice(parseInt(row.row.id), row.data, e.target.value)} />

                )
            },
        }
    ], [])


    return (
        <>
            <div id="titlePageJeux">
                <h1>
                    <FontAwesomeIcon className="faicon" icon={faChessKnight}/>
                    Jeux</h1>
            </div>

            <div id="btnNewJeu">
                <Container triggerText="Créer un nouveau jeu" onSubmit={onSubmit} component={FormJeu}/>

            </div>
            <div style={{marginTop: `50px`}}>
                <TableContainer columns={columns} data={listeJeux}/>
            </div>

        </>
    )
}

