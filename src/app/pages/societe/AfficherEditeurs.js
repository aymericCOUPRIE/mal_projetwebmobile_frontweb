import React, {useEffect, useState, useMemo} from "react";
import Axios from "axios"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressBook, faEyeSlash, faInfoCircle, faShapes} from "@fortawesome/free-solid-svg-icons";
import TableContainer from "../../components/tables/TableContainer";
import {CardBody, CardTitle} from "reactstrap";
import CardContact from "../../components/contact/CardContact";
import {Card} from "react-bootstrap";
import GameCard from "../../components/game/GameCard";

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
            {
                Header: "Addresse",
                accessor: d => `${d.soc_rue} - ${d.soc_ville} ${d.soc_codePostal}`,
            },
            {
                Header: "Nombre de jeux",
                accessor: d => d.jeus.length,
            },

        ]
    )

    const detailsEditeur = (row) => {

        const games = row.original.jeus

        return (
            <div style={{columnCount: 2, display: 'flex', padding: '1rem'}}>
                {
                    games.map((game) => {
                        return (
                            <GameCard props={game}/>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div style={{marginTop: `50px`}} className="EspaceFooter">
            <div id="titlePageJeux">
                <h1>
                    <FontAwesomeIcon className="faicon" icon={faAddressBook}/>
                    Editeurs
                </h1>
            </div>

            <TableContainer columns={columns} data={societe} renderRowSubComponent={detailsEditeur}/>
        </div>
    )

}
