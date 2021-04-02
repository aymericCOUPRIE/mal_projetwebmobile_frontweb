import {CardBody, CardText, CardTitle} from "reactstrap";
import {Card} from "react-bootstrap";
import React from "react";


const GameCard = (game, ...res) => {

    const {
        j_titre,
        j_ageMin,
        j_nbMaxJoueurs,
        j_nbMinJoueurs,
        j_lienNotice,
        j_duree,
    } = game.props

    return (
        <Card style={{width: '50%', margin: '0 auto', marginLeft: '1rem'}}>

            <CardBody>

                <CardTitle>
                    <strong> {j_titre} </strong>
                </CardTitle>

                <CardText>
                    Age Minimun : {j_ageMin}
                    < br/>
                    Nombre max de joueurs : {j_nbMaxJoueurs}
                    < br/>
                    Nombre min de joueurs : {j_nbMinJoueurs}
                    < br/>
                    Durée estimée : {j_duree}
                    < br/>
                    Lien notice : {j_lienNotice}
                </CardText>

            </CardBody>

        </Card>
    )
}


export default GameCard
