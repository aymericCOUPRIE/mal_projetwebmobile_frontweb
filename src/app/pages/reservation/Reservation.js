import React, {useEffect, useState, useMemo} from "react";
import Axios from "axios"
import TableContainer from "../../components/tables/TableContainer";
import {SelectColumnFilter} from "../../components/tables/Filters";


export default function Reservation() {

    const [listReservations, setListReservations] = useState([])
    const [listLocalisation, setListLocalisation] = useState([])

    const fes_id = localStorage.getItem("currentFestival")

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

    const columns = useMemo(() => [
        {
            Header: () => null,
            id: "expander"

        },
        {
            Header: "Exposant",
            accessor: "societe.soc_nom"
        },
        {
            Header: "Zone",
            accessor: "espace.localisation.loc_libelle"
        },
        {
            Header: "Facture",
            accessor: d => d.res_facture ? 'true' : 'false',

            disableSortBy: true,
            Filter: SelectColumnFilter,
            filter: 'equals',
        },
        {
            Header: "Paiement",
            accessor: d => d.res_paiement ? 'true' : 'false',

            disableSortBy: true,
            Filter: SelectColumnFilter,
            filter: 'equals',
        },

    ])

    return (
        <div>
            <div style={{marginTop: `50px`}}>
                <TableContainer columns={columns} data={listReservations}/>
            </div>
        </div>
    )

}
