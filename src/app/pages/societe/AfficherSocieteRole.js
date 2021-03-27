import React, {useEffect, useState, useMemo} from "react";
import Axios from "axios"
import TableContainer from "../../components/tables/TableContainer";
import {SelectColumnFilter} from "../../components/tables/Filters";
import {CardBody, CardText, CardTitle} from "reactstrap";
import {Card, Form} from "react-bootstrap";
import {Container} from "../../components/ModalForm/container";
import FormSociete from "./formSociete";
import './AfficherSociete.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEyeSlash, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";


export default function AfficherSocieteRole() {

    const [societe, setListSociete] = useState([])

    /**
     * This method is used to fetch data from DB every time it is been updated
     */
    useEffect(() => {
        const fetchData = async () => {
            const response = await Axios.get(`http://localhost:3000/server/festivals/affichageRole/${localStorage.getItem("currentFestival")}`);
            setListSociete(response.data[0].societes)
        };
        fetchData();
    }, [])


    /**
     * This method is used to update the status (soc_estInactif) of a societe
     *
     * @param rowIndex
     * @param columnId
     * @param value
     */
    const updateStatusInactif = (data, value) => {
        console.log("RESULT", data, value)
        Axios.put("http://localhost:3000/server/societe/updateStatusInactif", {
            soc_id: data.soc_id, //row id=0 <==> soc_id = 1 --> d'où le +1
            soc_estInactif: value //'true' or 'false'
        })
    }

    const updateStatusEditeur = (data, value) => {
        console.log("RESULT", data, value)

        Axios.put("http://localhost:3000/server/societe/updateStatusEditeur", {
            soc_id: data.soc_id, //row id=0 <==> soc_id = 1 --> d'où le +1
            fes_id: localStorage.getItem("currentFestival"),
            rolF_estEditeur: value //'true' or 'false'
        })
    }

    const updateStatusExposant = (data, value) => {
        console.log("RESULT", data, value)

        Axios.put("http://localhost:3000/server/societe/updateStatusExposant", {
            soc_id: data.soc_id, //row id=0 <==> soc_id = 1 --> d'où le +1
            fes_id: localStorage.getItem("currentFestival"),
            rolF_estExposant: value //'true' or 'false'
        })
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
                id: "inactif",
                Header: "Inactif",
                accessor: d => d.soc_estInactif, //required cast from boolea to string

                //Allows column to be sorted depending on all content type (true/false)
                disableSortBy: true,
                Filter: SelectColumnFilter,
                filter: 'equals',

                //Displays checkox for each row
                //Calls updateStatusInactif every time a checkbox is been updated
                Cell: row => {
                    return (
                        <div style={{'textAlign': 'center'}}>

                            {
                                console.log(row)
                            }

                            <input
                                type="checkbox"
                                defaultChecked={row.value}
                                onChange={(event) => updateStatusInactif(row.row.original, event.target.checked ? 1 : 0)}/>
                        </div>
                    )
                },
            },
            {
                id: "estExposant",
                Header: "Exposant",
                accessor: d => d.role_festival.rolF_estExposant, //required cast from boolean to string

                //Allows column to be sorted depending on all content type (true/false)
                disableSortBy: true,
                Filter: SelectColumnFilter,
                filter: 'equals',

                Cell: row => {
                    return (

                        <div style={{'textAlign': 'center'}}>
                            {
                                console.log("ROW VALUE", row)
                            }
                            <input
                                type="checkbox"
                                defaultChecked={row.value == 1 ? true : false}
                                onChange={(event) => updateStatusExposant(row.row.original, event.target.checked)}
                            />
                        </div>
                    )
                },
            },
            {
                id: "estEditeur",
                Header: "Editeur",
                accessor: d => d.role_festival.rolF_estEditeur, //required cast from boolean to string


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
                                onChange={(event) => updateStatusEditeur(row.row.original, event.target.checked ? true : false)}
                            />
                        </div>
                    )
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

    };


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
        <div style={{marginTop: `50px`}} className="EspaceFooter">
            <TableContainer columns={columns} data={societe} renderRowSubComponent={detailsSociete}/>
        </div>
    )
}

