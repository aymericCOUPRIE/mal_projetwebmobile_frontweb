import React, {useEffect, useState, useMemo} from "react";
import Axios from "axios"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEyeSlash, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import TableContainer from "../../components/tables/TableContainer";
import {CardBody, CardTitle} from "reactstrap";
import CardContact from "../../components/contact/CardContact";
import {Card} from "react-bootstrap";

export default function AfficherEditeur() {

    const [societe, setListSociete] = useState([])


    useEffect(() => {

        Axios.get(`/server/festivals/affichageEditeur/${localStorage.getItem("currentFestival")}`).then((result) => {
            setListSociete(result.data[0].societes)
            console.log(result.data[0].societes)
        })
    }, [])

    const columns = useMemo(() => [
            {
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
        ]
    )

    const detailsEditeur = (row) => {

        const games = row.original.jeus

        return (
            <div>

                {
                    console.log("ORIGINAL", row.original)
                }

                <Card style={{width: '50%', margin: '0 auto'}}>
                    <CardBody>
                        <CardTitle>
                            <strong> Games </strong>
                        </CardTitle>
                        {
                            games.map((game) => {
                                return (
                                    //<CardContact props={contact}/>
                                    <span>
                                    {game.j_titre}
                                    </span>
                                )
                            })
                        }
                    </CardBody>
                </Card>
            </div>
        )
    }

    return (
        <div style={{marginTop: `50px`}} className="EspaceFooter">
            <TableContainer columns={columns} data={societe} renderRowSubComponent={detailsEditeur}/>
        </div>
    )

}
