import React, {useEffect, useState, useMemo} from "react";
import Axios from "axios"

import TableContainer from "../../components/tables/TableContainer";
import {SelectColumnFilter} from "../../components/tables/Filters";
import {Container} from "../../components/ModalForm/container";
import FormSociete from "./formSociete";
import CardContact from "../../components/contact/Contact";

import './AfficherSociete.css'

import {Card, Form, Button} from "react-bootstrap";
import {CardBody, CardText, CardTitle} from "reactstrap";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEyeSlash, faInfoCircle} from "@fortawesome/free-solid-svg-icons";


export default function AfficherExposant() {

    const [societe, setListSociete] = useState([])
    const [optionsDiscussion, setOptionsDiscussion] = useState([])


    const options = [
        {libelle: "En discussion", color: "rgb(204, 255, 51)"},
        {libelle: "Présence confirmée", color: "rgb(57,171,57)"},
        {libelle: "Présent (liste jeux demandée)", color: "rgb(57,171,57)"},
        {libelle: "Présent (liste jeux reçus)", color: "rgb(57,171,57)"},
        {libelle: "Absent", color: "rgb(200,56,56)"},
        {libelle: "Considéré absent", color: "rgb(255, 165, 0)"},
        {libelle: "Présent via distributeur", color: "rgb(57,171,57)"},
        {libelle: null, color: "default"},
    ]

    /**
     * This method is used to fetch data from DB every time it is been updated
     */
    useEffect(() => {
        Axios.get(`http://localhost:3000/server/festivals/affichageExposant/${localStorage.getItem("currentFestival")}`)
            .then((response) => {
                setListSociete(response.data[0].societes)
            })
    }, [])


    useEffect(() => {
        Axios.get("http://localhost:3000/server/suiviExposant/getDiscussions")
            .then((response) => {
                setOptionsDiscussion(response.data)
            });
    }, [])


    /**
     * This method is used to update the status (soc_estInactif) of a societe
     *
     * @param rowIndex
     * @param columnId
     * @param value
     */
    const updateStatusInactif = (rowIndex, data, value) => {
        Axios.put("http://localhost:3000/server/societe/updateStatusInactif", {
            soc_id: data[rowIndex].soc_id, //row id=0 <==> soc_id = 1 --> d'où le +1
            soc_estInactif: value //'true' or 'false'
        })
    }

    const updateStatusEditeur = (rowIndex, data, value) => {
        Axios.put("http://localhost:3000/server/societe/updateStatusEditeur", {
            soc_id: data[rowIndex].soc_id, //row id=0 <==> soc_id = 1 --> d'où le +1
            fes_id: data[rowIndex].fes_id,
            rolF_estEditeur: value //'true' or 'false'
        })
    }

    const updateStatusExposant = (rowIndex, data, value) => {
        Axios.put("http://localhost:3000/server/societe/updateStatusExposant", {
            soc_id: data[rowIndex].soc_id, //row id=0 <==> soc_id = 1 --> d'où le +1
            fes_id: data[rowIndex].fes_id,
            rolF_estExposant: value //'true' or 'false'
        })
    }

    const updateDateContact = (suivE_id, value, numeroRelance) => {
        console.log("DATA", numeroRelance)
        Axios.put(`http://localhost:3000/server/societe/updateDateContact/${numeroRelance}`, {
            suivE_id: suivE_id, //row id=0 <==> soc_id = 1 --> d'où le +1
            suivE_dateContact: value //'true' or 'false'
        })
    }

    const updateStatusFacture = (data, value) => {
        Axios.put("http://localhost:3000/server/reservations/updateReservationFacture", {
            res_id: data.res_id, //row id=0 <==> soc_id = 1 --> d'où le +1
            res_facture: value //'true' or 'false'
        })
    }

    const updateStatusBenevole = (data, value) => {
        Axios.put("http://localhost:3000/server/suiviExposant/updateBenevole", {
            suivE_id: data.suivE_id,
            suivE_benevole: value
        })
    }

    const updateStatusWorkflow = (data, value) => {
        console.log("RETOURNE", value)
        Axios.put("http://localhost:3000/server/suiviExposant/updateWorkflow", {
            suivE_id: data.suivE_id,
            suivD_id: value
        })
    }

    const setAllAbsent = () => {

    }

    /**
     * This method is declaring all the columns for the table
     *
     * @type {[{Header: (function(): null), id: string, Cell: (function({row: *}))}, {Header: string, accessor: string}, {filter: string, Header: string, Filter: (function({column: {filterValue: *, setFilter: *, preFilteredRows: *, id?: *}}): *), accessor: (function(*): string), id: string, disableSortBy: boolean, Cell: (function(*))}]}
     */
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
            },
            {
                Header: "Nom",
                accessor: "soc_nom",
            },

            {
                Header: "Commentaire",
                accessor: d => d,

                Cell: row => {
                    return (
                        <Form.Control as={"textarea"}
                                      value={row.value.suivi_exposants.length == 0 ? "" : row.value.suivi_exposants.[0].suivE_commentaire}></Form.Control>
                    )
                }
            },

            /*            {
                            id: "inactif",
                            Header: "Inactif",
                            accessor: d => d.soc_estInactif.toString(), //required cast from boolea to string

                            //Allows column to be sorted depending on all content type (true/false)
                            disableSortBy: true,
                            Filter: SelectColumnFilter,
                            filter: 'equals',

                            //Displays checkox for each row
                            //Calls updateStatusInactif every time a checkbox is been updated
                            Cell: row => {
                                return (
                                    <div style={{'textAlign': 'center'}}>
                                        <input
                                            type="checkbox"
                                            defaultChecked={row.value == 1 ? true : false}
                                            onChange={(event) => updateStatusInactif(parseInt(row.row.id), row.data, event.target.checked ? true : false)}/>
                                    </div>)
                            },
                        },*/

            {
                Header: "WorkFlow",
                accessor: d => d.suivi_exposants.length == 0 ? null : d.suivi_exposants[0].suivD_id.toString(), //required cast from boolean to string

                disableSortBy: true,
                Filter: SelectColumnFilter,
                filter: 'equals',

                Cell: row => {
                    return (
                        <div>
                            <Form.Control as={"select"}
                                          onChange={(e) => updateStatusWorkflow()}
                                          style={{backgroundColor: options[row.value].color}}>
                                {
                                    optionsDiscussion.map((option) =>
                                        <option value={option.suivD_id}
                                                selected={option.suivD_id == row.value}
                                                key={option.suivD_id}
                                                style={{backgroundColor: options[option.suivD_id].color}}>
                                            {option.suivD_libelle}
                                        </option>
                                    )
                                }
                            </Form.Control>
                        </div>
                    )
                }

            },
            /*
                {
                    id: "estExposant",
                    Header: "Exposant",
                    accessor: d => d.rolF_estExposant != null ? d.rolF_estExposant.toString() : null, //required cast from boolea to string

                    //Allows column to be sorted depending on all content type (true/false)
                    disableSortBy: true,
                    Filter: SelectColumnFilter,
                    filter: 'equals',

                    Cell: row => {
                        return (
                            <div style={{'textAlign': 'center'}}>
                                <input
                                    type="checkbox"
                                    defaultChecked={row.value == 1 ? true : false}
                                    onChange={(event) => updateStatusExposant(parseInt(row.row.id), row.data, event.target.checked)}
                                />
                            </div>)
                    },
                },
                {
                    id: "estEditeur",
                    Header: "Editeur",
                    accessor: d => d.rolF_estEditeur != null ? d.rolF_estEditeur.toString() : null, //required cast from boolea to string


                    //Allows column to be sorted depending on all content type (true/false)
                    disableSortBy: true,
                    Filter: SelectColumnFilter,
                    filter: 'equals',

                    Cell: row => {
                        return (
                            <div style={{'textAlign': 'center'}}>
                                <input
                                    type="checkbox"
                                    defaultChecked={row.value == 1 ? true : false}
                                    onChange={(event) => updateStatusEditeur(parseInt(row.row.id), row.data, event.target.checked ? true : false)}
                                />
                            </div>)
                    },
                },
                {
                    id: "espaceQte",
                    Header: "Tables",
                    accessor: d => String(`${d.esp_qte == null ? "0" : d.esp_qte}` + ' ' + `${d.esp_enTables == 0 ? "m²" : "Tables"}`), //required cast from boolea to string
                },*/
            {
                id: "benevoles",
                Header: "Bénévoles",
                accessor: d => d.reservations.length == 0 ? null : d.reservations[0].res_facture.toString(), //required cast from boolean to string

                //Allows column to be sorted depending on all content type (true/false)
                disableSortBy: true,
                Filter: SelectColumnFilter,
                filter: 'equals',
                /*
                                Cell: row => {
                                    return (
                                        <div style={{'textAlign': 'center'}}>
                                            <input
                                                type="checkbox"
                                                defaultChecked={(row.value == null || row.value == 0) ? false : true}
                                                onChange={(event) => updateStatusBenevole(row.row.original, event.target.checked ? true : false)}
                                            />
                                        </div>)
                                },*/
            },
            {
                id: "facture",
                Header: "Facture",
                accessor: d => d.suivi_exposants.length == 0 ? null : d.suivi_exposants[0].suivE_benevole.toString(), //required cast from boolean to string

                //Allows column to be sorted depending on all content type (true/false)
                /*disableSortBy: true,
                Filter: SelectColumnFilter,
                filter: 'equals',

                Cell: row => {
                    return (
                        <div style={{'textAlign': 'center'}}>
                            <input
                                disabled={row.value == null ? true : false}
                                type="checkbox"
                                defaultChecked={(row.value == null || row.value == 0) ? false : true}
                                onChange={(event) => updateStatusFacture(row.row.original, event.target.checked ? true : false)}
                            />
                        </div>)
                },*/
            },

        ], [optionsDiscussion, societe]
    )

    /**
     * This method is used to display more details for a given object
     * It is actived when clicking on the first column for a specific row
     *
     * @param row
     * @returns {JSX.Element}
     */
    const detailsExposant = (row) => {

        let suivE_dateContact1 = null
        let suivE_dateContact2 = null
        let suivE_dateContact3 = null

        if (row.original.suivi_exposants.length != 0) {
            suivE_dateContact1 = row.original.suivi_exposants[0].suivE_dateContact1;
            suivE_dateContact2 = row.original.suivi_exposants[0].suivE_dateContact2;
            suivE_dateContact3 = row.original.suivi_exposants[0].suivE_dateContact3;
        }

        const contacts = row.original.contacts;

        console.log("CONTACTS", contacts)

        //Name of the attributes in a societe
        const {
            soc_nom,
            soc_rue,
            soc_ville,
            soc_codePostal,
            suivE_id
        } = row.original;

        //Display the cards (more details)
        return (
            <div style={{columnCount: 2, display: 'flex', padding: '1rem'}}>
                <Card style={{width: '50%', margin: '0 auto', marginRight: '1rem'}}>
                    <CardBody>
                        <CardTitle>
                            <strong>{`${soc_nom}`} </strong>
                        </CardTitle>
                        <CardText>
                            <strong>Address : </strong>
                            {`${soc_rue} ${soc_ville} - ${soc_codePostal}`}
                        </CardText>
                        <CardText>
                            <strong>Date contact 1 </strong>
                            <input type={'date'}
                                   defaultValue={`${suivE_dateContact1}`}
                                   onChange={(event) => updateDateContact(suivE_id, event.target.value, 1)}
                            />
                        </CardText>
                        <CardText>
                            <strong>Date contact 2 </strong>
                            <input type={'date'}
                                   defaultValue={`${suivE_dateContact2}`}
                                   onChange={(event) => updateDateContact(suivE_id, event.target.value, 2)}
                            />
                        </CardText>
                        <CardText>
                            <strong>Date contact 3 </strong>
                            <input type={'date'}
                                   defaultValue={`${suivE_dateContact3}`}
                                   onChange={(event) => updateDateContact(suivE_id, event.target.value, 3)}
                            />
                        </CardText>
                    </CardBody>
                </Card>


                <Card style={{width: '50%', margin: '0 auto'}}>
                    <CardBody>
                        <CardTitle>
                            <strong> Contacts </strong>
                        </CardTitle>
                        {
                            contacts.map((contact) => {
                                return (
                                    <CardContact props={contact}/>
                                )
                            })
                        }
                    </CardBody>
                </Card>
            </div>
        );
    };

    const onSubmit = (event) => {
        event.preventDefault(event);

        Axios.post("http://localhost:3000/server/societe/add", {
            soc_nom: event.target.nom.value,
            soc_ville: event.target.ville.value,
            soc_rue: event.target.rue.value,
            soc_codePostal: event.target.codePostal.value,
            soc_pays: event.target.pays.value
        }).then((response) => {
            console.log(response)
        })
    }

    /**
     * Display the table
     *
     * required :
     *      the columns set up above
     *      the data (list of societes)
     * optional :
     *      {renderRowSubComponent} only if you want the ability to display more details
     */
    return (
        <div style={{marginTop: `50px`}}>

            <Container triggerText="Créer une societe" onSubmit={(e) => onSubmit(e)} component={FormSociete}/>
            <Button onClick={setAllAbsent()}> Mettre tous les exposant absent </Button>

            <TableContainer columns={columns} data={societe} renderRowSubComponent={detailsExposant}/>

        </div>
    )
}
