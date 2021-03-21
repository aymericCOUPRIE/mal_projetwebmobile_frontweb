import React, {useEffect, useState, useMemo} from "react";
import Axios from "axios"
import TableContainer from "../../components/tables/TableContainer";
import {SelectColumnFilter} from "../../components/tables/Filters";
import {CardBody, CardText, CardTitle} from "reactstrap";
import {Card, Form} from "react-bootstrap";
import {rgbToHex} from "@material-ui/core";
import {Container} from "../../components/ModalForm/container";
import FormSociete from "./formSociete";


export default function AfficherSociete() {

    const [societe, setListSociete] = useState([])
    const [optionsDiscussion, setOptionsDiscussion] = useState([])


    const options = [
        "En discussion",
        "Présence confirmée",
        "Présent (liste jeux demandée)",
        "Présent (liste jeux reçus)",
        "Absent",
        "Considéré absent",
        "Présent via distributeur"
    ]

    /**
     * This method is used to fetch data from DB every time it is been updated
     */
    useEffect(() => {
        const fetchData = async () => {
            const response = await Axios.get("http://localhost:3000/server/societe/affichage");
            setListSociete(response.data.res)
        };
        fetchData();
    }, [setListSociete])


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

    const updateDateContact1 = (suivE_id, value) => {
        console.log("DATA", suivE_id, value)
        Axios.put("http://localhost:3000/server/societe/updateDateContact1", {
            suivE_id: suivE_id, //row id=0 <==> soc_id = 1 --> d'où le +1
            suivE_dateContact: value //'true' or 'false'
        })
    }

    const updateDateContact2 = (suivE_id, value) => {
        console.log("DATA", suivE_id, value)
        Axios.put("http://localhost:3000/server/societe/updateDateContact2", {
            suivE_id: suivE_id, //row id=0 <==> soc_id = 1 --> d'où le +1
            suivE_dateContact: value //'true' or 'false'
        })
    }

    const updateDateContact3 = (suivE_id, value) => {
        console.log("DATA", suivE_id, value)
        Axios.put("http://localhost:3000/server/societe/updateDateContact3", {
            suivE_id: suivE_id, //row id=0 <==> soc_id = 1 --> d'où le +1
            suivE_dateContact: value //'true' or 'false'
        })
    }

    const updateStatusFacture = (rowValue, value) => {
        Axios.put("http://localhost:3000/server/reservations/updateReservationFacture", {
            res_id: rowValue.res_id, //row id=0 <==> soc_id = 1 --> d'où le +1
            res_facture: value //'true' or 'false'
        })
    }

    const updateStatusBenevole = () => {

    }

    const updateStatusWorkflow = () => {
        Axios.put("http://localhost:3000/server/reservations/updateReservationFacture", {})
    }


    useEffect( () => {
        Axios.get("http://localhost:3000/server/suivi_discussion/getDiscussions", {}).then((response) => {
            setOptionsDiscussion(res.data)
            console.log(res.data)
        })
    })

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
                        {row.isExpanded ? 'v' : '>'}
                    </span>
                ),
            },
            {
                Header: "Nom",
                accessor: "soc_nom",
            },
            {
                Header: "Commentaire",
                accessor: "suivE_commentaire",

                Cell: row => {
                    return (
                        <div>
                            {/* TODO wait for updating into DB + update comment*/}
                            <Form.Control as={"textarea"} value={row.value == null ? "" : row.value}></Form.Control>
                        </div>
                    )
                }
            },
            {
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
            },
            {
                Header: "WorkFlow",
                accessor: "suivD_libelle",

                disableSortBy: true,
                Filter: SelectColumnFilter,
                filter: 'equals',


                Cell: row => {
                    return (
                        <div>
                            <select value={row.value}>
                                {
                                    options.map(option => {
                                        return (
                                            <option value={option} key={option}
                                                    onSelect={updateStatusWorkflow()}> {option} </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    )
                }
            },
            {
                id: "estExposant",
                Header: "Exposant",
                accessor: d => d.rolF_estExposant.toString(), //required cast from boolea to string

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
                                onChange={(event) => updateStatusExposant(parseInt(row.row.id), row.data, event.target.checked ? true : false)}
                            />
                        </div>)
                },
            },
            {
                id: "estEditeur",
                Header: "Editeur",
                accessor: d => d.rolF_estEditeur.toString(), //required cast from boolea to string

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
            },
            {
                id: "benevoles",
                Header: "Bénévoles",
                accessor: d => d.suivE_benevole, //required cast from boolean to string

                //Allows column to be sorted depending on all content type (true/false)
                disableSortBy: true,
                Filter: SelectColumnFilter,
                filter: 'equals',

                Cell: row => {
                    return (
                        <div style={{'textAlign': 'center'}}>
                            <input
                                type="checkbox"
                                defaultChecked={(row.value == null || row.value == 0) ? false : true}
                                onChange={(event) => updateStatusBenevole(row.row.original, event.target.checked ? true : false)}
                            />
                        </div>)
                },
            },
            {
                id: "facture",
                Header: "Facture",
                accessor: d => d.res_facture, //required cast from boolean to string

                //Allows column to be sorted depending on all content type (true/false)
                disableSortBy: true,
                Filter: SelectColumnFilter,
                filter: 'equals',

                Cell: row => {
                    return (
                        <div style={{'textAlign': 'center'}}>
                            <input
                                type="checkbox"
                                defaultChecked={(row.value == null || row.value == 0) ? false : true}
                                onChange={(event) => updateStatusFacture(row.row.original, event.target.checked ? true : false)}
                            />
                        </div>)
                },
            },

        ], []
    )

    /**
     * This method is used to display more details for a given object
     * It is actived when clicking on the first column for a specific row
     *
     * @param row
     * @returns {JSX.Element}
     */
    const detailsSociete = (row) => {

        console.log("ROW VALUES", row)

        //Name of the attributes in a societe
        const {
            soc_nom,
            soc_rue,
            soc_ville,
            soc_codePostal,
            suivE_dateContact1,
            suivE_dateContact2,
            suivE_dateContact3,
            suivE_id
        } = row.original;

        //Display the cards (more details)
        return (
            <Card style={{width: '50rem', margin: '0 auto'}}>
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
                               onChange={(event) => updateDateContact1(suivE_id, event.target.value)}
                        />
                    </CardText>
                    <CardText>
                        <strong>Date contact 2 </strong>
                        <input type={'date'}
                               defaultValue={`${suivE_dateContact2}`}
                               onChange={(event) => updateDateContact2(suivE_id, event.target.value)}
                        />
                    </CardText>
                    <CardText>
                        <strong>Date contact 3 </strong>
                        <input type={'date'}
                               defaultValue={`${suivE_dateContact3}`}
                               onChange={(event) => updateDateContact3(suivE_id, event.target.value)}
                        />
                    </CardText>
                </CardBody>
            </Card>
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
            <TableContainer columns={columns} data={societe} renderRowSubComponent={detailsSociete}/>
            <Container triggerText="Créer une societe" onSubmit={(e) => onSubmit(e)} component={FormSociete}/>
        </div>
    )
}

