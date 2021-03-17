import React, {useEffect, useState, useMemo} from "react";
import Axios from "axios"
import TableContainer from "../../components/TableContainer";
import {SelectColumnFilter} from "../../components/Filters";
import {CardBody, CardText, CardTitle} from "reactstrap";
import {Card} from "react-bootstrap";


export default function AfficherSociete() {

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
            soc_id: rowIndex + 1, //row id=0 <==> soc_id = 1 --> d'où le +1
            soc_estInactif: value //'true' or 'false'
        })
    }

    const columns = useMemo(
        () => [
            {
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
                },

            },
        ],
        []
    )

    const renderRowSubComponent = (row) => {
        const {
            soc_nom,
            soc_rue,
            soc_ville,
            soc_codePostal
        } = row.original;
        return (
            <Card style={{width: '18rem', margin: '0 auto'}}>
                <CardBody>
                    <CardTitle>
                        <strong>{`${soc_nom}`} </strong>
                    </CardTitle>
                    <CardText>
                        <strong>Address:</strong>{' '}
                        {`${soc_rue} ${soc_ville} - ${soc_codePostal}`}
                    </CardText>
                </CardBody>
            </Card>
        );
    };


    return (
        <div style={{marginTop: `50px`}}>
            <TableContainer columns={columns} data={societe} renderRowSubComponent={renderRowSubComponent}/>
        </div>
    )
}

