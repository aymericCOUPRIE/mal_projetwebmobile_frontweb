import './festival-games.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDice,faInfoCircle,faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useMemo, useState} from "react";
import Axios from "axios";

import TableContainer from "../../components/tables/TableContainer";
import {SelectColumnFilter} from "../../components/tables/Filters";
import {CardBody, CardLink, CardText, CardTitle} from "reactstrap";
import {Card, Form} from "react-bootstrap";

const FestivalGames = () => {
    const [listeJeux, setListeJeux] = useState([]);


    //méthode qui s'appelle au chargement de la page
    useEffect(() => {
        //Récupérer les infos de tous les jeux
        Axios.get(`http://localhost:3000/server/jeuxFestival/${localStorage.getItem("currentFestival")}/allDetails`)
            .then((res) => {
                console.log(res.data)
                setListeJeux(res.data)
            });

    }, []);


    //déclarer toutes les colonnes
    const columns = useMemo(() => [
        {
            //This column is used for displaying more/less details
            Header: () => null,
            id: 'expander', // 'id' is required

            Cell: ({row}) => (
                <span {...row.getToggleRowExpandedProps()}>
                        {row.isExpanded ? <FontAwesomeIcon className="faiconDetail" icon={faEyeSlash}/> :  <FontAwesomeIcon className="faiconDetail" icon={faInfoCircle}/>}
                    </span>
            ),
        },{
            Header:"Nom",
            accessor: "j_titre",
        },{
            Header: "Éditeur",
            accessor: "societe.soc_nom",
        }, {
            Header: "Exposant",
            accessor: "suivi_jeus[0].reservation.societe.soc_nom",
        }, {
            Header: "Type",
            accessor: "type_jeu.typJ_libelle"
        }, {
            Header: "Prototype",
            accessor: d => d.suivi_jeus[0].suivJ_prototype != null ? d.suivi_jeus[0].suivJ_prototype.toString() : null, //required cast from boolea to string

        },{
            Header: "Zone",
            accessor: "suivi_jeus[0].zone.zo_libelle"
        },{
            Header: "Placé plan",
            accessor: d => d.suivi_jeus[0].suivJ_place != null ? d.suivi_jeus[0].suivJ_place.toString() : null, //required cast from boolea to string
        },{
            Header: "Envoie ?",
            accessor: d => d.suivi_jeus[0].reservation.res_envoiDebut != null ? d.suivi_jeus[0].reservation.res_envoiDebut.toString() : null, //required cast from boolea to string

        },{
            Header: "Reçu ?",
            accessor: d => d.suivi_jeus[0].reservation.res_recu != null ? d.suivi_jeus[0].reservation.res_recu.toString() : null, //required cast from boolea to string

        },{
            Header: "Dernière modifications",
            accessor: "suivi_jeus[0].suivJ_dateSaisie"
        }
    ],[listeJeux])

    /**
     * This method is used to display more details for a given object
     * It is actived when clicking on the first column for a specific row
     *
     * @param row
     * @returns {JSX.Element}
     */
    const detailsGame = (row) =>{

        //attributs à afficher dans détails
        const suivJ_tombola = row.original.suivi_jeus[0].suivJ_tombola;
        const suivJ_nbJeuxRecus = row.original.suivi_jeus[0].suivJ_nbJeuxRecus;
        const suivJ_nbJeuxExposes = row.original.suivi_jeus[0].suivJ_nbJeuxExposes;
        const suivJ_dotation = row.original.suivi_jeus[0].suivJ_dotation;


        const {
            j_lienNotice,
            j_ageMin,
            j_duree,
            j_nbMaxJoueurs,
            j_nbMinJoueurs
        } = row.original;
        console.log("ROW ORIGINAL",row.original)

        //Display the cards (more details)
        return(
            <Card style={{width: '50rem', margin: '0 auto'}}>
            <CardTitle>
                <h5>Détails réservation </h5>
            </CardTitle>
                <CardText>
                    <p>Tombola: {`${suivJ_tombola}`}</p>
                    <p>Dotation: {`${suivJ_dotation}`}</p>
                    <p>Nombre de jeux reçus: {`${suivJ_nbJeuxRecus}`}</p>
                    <p>Nombre de jeux exposés: {`${suivJ_nbJeuxExposes}`}</p>
                </CardText>
                <CardTitle>
                   <h5> Détails jeu </h5>
                </CardTitle>
                <CardText>
                    <p>Age minimum: {`${j_ageMin}`}</p>
                    <p>Nombre de joueurs minimum: {`${j_nbMinJoueurs}`}</p>
                    <p>Nombre de joueurs maximum: {`${j_nbMaxJoueurs}`}</p>
                    <p>Durée: {`${j_duree}`}</p>
                    <CardLink href={j_lienNotice}>Voir les règles du jeu</CardLink>
                </CardText>
            </Card>
        )
    }

    return(
        <>
            <div id="titlePageJeuxFestival">
                <h1>
                    <FontAwesomeIcon className="faicon" icon={faDice}/>
                    Suivi des jeux du festival
                </h1>
            </div>
            <div style={{marginTop: `50px`}}>
                <TableContainer columns={columns} data={listeJeux} renderRowSubComponent={detailsGame}/>
            </div>
        </>
    )
}

export default FestivalGames