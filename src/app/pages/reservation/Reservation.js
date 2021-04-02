import React, {useEffect, useState, useMemo} from "react";
import Axios from "axios"
import TableContainer from "../../components/tables/TableContainer";
import {SelectColumnFilter} from "../../components/tables/Filters";
import {Form} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboardList, faFileInvoiceDollar} from "@fortawesome/free-solid-svg-icons";


export default function Reservation() {

    const [listReservations, setListReservations] = useState([])
    const [listLocalisation, setListLocalisation] = useState([])

    const fes_id = localStorage.getItem("currentFestival")
    const history = useHistory()

    useEffect(() => {
        Axios.get(`/server/reservations/afficherAllReservation/${fes_id}`).then((result) => {
                setListReservations(result.data)
                console.log(result.data)
            }
        )
    }, [])


    useEffect(() => {

        Axios.get(`/server/localisation/allDetails/${fes_id}`).then((result) => {
            setListLocalisation(result.data)
            console.log(result.data)

        })
    }, [])


    const updateFacture = (data, value) => {
        console.log("DATA", data)

        Axios.put("/server/reservations/updateReservationFacture", {
            res_id: data.res_id,
            res_facture: value
        })
    }

    const updatePaiement = (data, value) => {

        console.log("DATA", data)
        Axios.put("/server/reservations/updateReservationPaiement", {
            res_id: data.res_id,
            res_paiement: value
        })
    }

    const updateEspaceReservation = (data, value) => {

        console.log("DATA", data)
        Axios.put("/server/reservations/updateReservationLocalisation", {
            res_id: data.res_id,
            loc_id: value
        })
    }

    const updatePrixRetour = (data, value) => {

        console.log("DATA", data)
        Axios.put("/server/reservations/updateReservationPrixRetour", {
            res_id: data.res_id,
            res_prixRetour: value
        })
    }

    const updatePrixNegocie = (data, value) => {

        console.log("DATA", data, value)
        Axios.put("/server/reservations/updateReservationPrixNegocie", {
            res_id: data.res_id,
            res_prixNegocie: value
        })
    }

    const goToExhibitorMonitoring = (soc_id) => {
        history.push('/exhibitor-monitoring/' + soc_id);
        window.location.reload(false)

    }

    const columns = useMemo(() => [
        {
            Header: () => null,
            id: "expander"

        },
        {
            Header: "Exposant",
            accessor: "societe.soc_nom",

            Cell: row => {
                return (
                    <a href="#" onClick={() => goToExhibitorMonitoring(row.row.original.societe.soc_id)}>{row.value}</a>
                )
            }
        },
        /*{
            Header: "Zone",
            accessor: "espace.localisation.loc_id",

            disableSortBy: true,
            Filter: SelectColumnFilter,
            filter: 'equals',

            Cell: row => {
                return (
                    <div>
                        <Form.Control as={"select"}
                                      onChange={(e) => updateEspaceReservation(row.row.original, e.target.value)}>
                            {
                                listLocalisation.length != 0 ?
                                    listLocalisation.map((option) =>
                                        <option value={option.loc_id}
                                                selected={option.loc_id == parseInt(row.value)}
                                                key={option.loc_id}>
                                            {option.loc_libelle}
                                        </option>
                                    )
                                    : null
                            }
                        </Form.Control>
                    </div>
                )
            }
        },*/
        {
            Header: "Facture",
            accessor: d => d.res_facture ? 'true' : 'false',

            disableSortBy: true,
            Filter: SelectColumnFilter,
            filter: 'equals',

            Cell: row => {
                return (
                    <div style={{'textAlign': 'center'}}>
                        <input
                            type="checkbox"
                            disabled={row.value == null}
                            defaultChecked={(row.value == null || row.value == 'false') ? false : true}
                            onChange={(event) => updateFacture(row.row.original, event.target.checked ? 1 : 0)}
                        />
                    </div>)
            },

        },
        {
            Header: "Paiement",
            accessor: d => d.res_paiement ? 'true' : 'false',

            disableSortBy: true,
            Filter: SelectColumnFilter,
            filter: 'equals',

            Cell: row => {
                return (
                    <div style={{'textAlign': 'center'}}>
                        <input
                            type="checkbox"
                            disabled={row.value == null}
                            defaultChecked={(row.value == null || row.value == 'false') ? false : true}
                            onChange={(event) => updatePaiement(row.row.original, event.target.checked ? 1 : 0)}
                        />
                    </div>)
            },


        },
        {
            Header: "Prix retour",
            accessor: d => d.res_prixRetour,

            Cell: row => {
                return (
                    <div style={{'textAlign': 'center'}}>
                        {
                            console.log("ROW", row.value)
                        }
                        <input
                            type="number"
                            step={".01"}
                            disabled={row.value == null}
                            defaultValue={row.value}
                            onChange={(event) => updatePrixRetour(row.row.original, event.target.value)}
                        />
                    </div>)
            },
        },
        {
            Header: "Prix Negocie",
            accessor: d => d.res_prixNegocie,

            Cell: row => {
                return (
                    <div style={{'textAlign': 'center'}}>
                        {
                            console.log("ROW", row.value)
                        }
                        <input
                            type="number"
                            step={".01"}
                            disabled={row.value == null}
                            defaultValue={row.value}
                            onChange={(event) => updatePrixNegocie(row.row.original, event.target.value)}
                        />
                    </div>)
            },
        }

    ])

    return (
        <div>
            <div id="titlePageJeux">
                <h1>
                    <FontAwesomeIcon className="faicon" icon={faClipboardList}/>
                  Réservations
                </h1>
            </div>
            <div style={{marginTop: `50px`}} className="EspaceFooter">
                <TableContainer columns={columns} data={listReservations}/>
            </div>
        </div>
    )

}
