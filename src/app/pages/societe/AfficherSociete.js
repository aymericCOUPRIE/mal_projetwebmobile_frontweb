import React, {useEffect, useState, useMemo} from "react";
import Axios from "axios"
import TableContainer from "../../components/tables/TableContainer";
import {SelectColumnFilter} from "../../components/tables/Filters";
import {CardBody, CardText, CardTitle} from "reactstrap";
import {Card} from "react-bootstrap";


export default function AfficherSociete() {

    const [societe, setListSociete] = useState([])

    /**
     * This method is used to fetch data from DB every time it is been updated
     */
    useEffect(() => {
        const fetchData = async () => {
            const response = await Axios.get("http://localhost:3000/societe/affichage");
            setListSociete(response.data.societes)
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
    const updateStatusInactif = (rowIndex, columnId, value) => {
        Axios.put("http://localhost:3000/societe/updateStatus", {
            soc_id: rowIndex + 1, //row id=0 <==> soc_id = 1 --> d'où le +1
            soc_estInactif: value //'true' or 'false'
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
                accessor: d => d.soc_estInactif.toString(), //required cast from boolea to string

                //Allows column to be sorted depending on all content type (true/false)
                disableSortBy: true,
                Filter: SelectColumnFilter,
                filter: 'equals',

                //Displays checkox for each row
                //Calls updateStatusInactif every time a checkbox is been updated
                Cell: row => {
                    return (
                        <div style={{'text-align': 'center'}}>
                            <input
                                type="checkbox"
                                defaultChecked={row.value == "true" ? true : false}
                                onChange={(event) => updateStatusInactif(parseInt(row.row.id), row.column.id, event.target.checked ? "true" : "false")}/>
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
        //Name of the attributes in a societe
        const {
            soc_nom,
            soc_rue,
            soc_ville,
            soc_codePostal
        } = row.original;

        //Display the cards (more details)
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
        </div>
    )
}

