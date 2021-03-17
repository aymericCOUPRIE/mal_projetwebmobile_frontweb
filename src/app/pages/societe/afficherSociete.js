import React, {useEffect, useState, useMemo} from "react";
import Axios from "axios"
import ReactTable from "react-table"
import TableContainer from "../../components/TableContainer";
import {SelectColumnFilter} from "../../components/Filters";


export default function afficherSociete() {

    const [societe, setListSociete] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await Axios.get("http://localhost:3000/societe/affichage");
            setListSociete(response.data.societes)
        };
        fetchData();
    }, [setListSociete])

    const display = () => {
        console.log(societe)
    }

    const updateMyData = (rowIndex, columnId, value) => {
        Axios.put("http://localhost:3000/societe/updateStatus", {
            soc_id: rowIndex,
            soc_estInactif: value
        })
    }

    const columns = useMemo(
        () => [
            {
                Header: "Nom",
                accessor: "soc_nom",
            },
            {
                id: "inactif",
                Header: "Inactif",
                accessor: d => d.soc_estInactif.toString(),
                disableSortBy: true,
                Filter: SelectColumnFilter,
                filter: 'equals',

                Cell: row => {
                    return (
                        <div style={{'text-align': 'center'}}>
                            <input
                                type="checkbox"
                                defaultChecked={row.value == "true" ? true : false}
                                onChange={(event) => updateMyData(parseInt(row.row.id), row.column.id, event.target.checked ? "true" : "false")}/>
                        </div>)
                }
            },
            {
                Header: "Ville",
                accessor: "soc_ville",
            },
            {
                Header: "Rue",
                accessor: "soc_rue",
            },
            {
                Header: "Code Postal",
                accessor: "soc_codePostal",
            },

        ],
        []
    )

    return (
        <TableContainer columns={columns} data={societe}/>
    )
}

