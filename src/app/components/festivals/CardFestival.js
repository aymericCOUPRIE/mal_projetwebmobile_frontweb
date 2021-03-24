import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import {CardBody, CardText, CardTitle} from "reactstrap";
import {Modal} from "../ModalForm/modal";
import Axios from "axios";
import NumberFormat from 'react-number-format';
import Moment from "moment";
//import * as _scope from "mysql";

const CardFestival = ({fes, updateDate, updateNbTables}) => {

    const [festivalDate, setDate] = useState(fes.fes_date)

    const changeDate = event => {
        updateDate(fes.fes_id, event.target.value) // update in the database
        setDate(event.target.value) // update the value of the input calendar
    }

    const changeNbTables = event => {
        updateNbTables(fes.fes_id, event.target.value)
    }

    return (
        <Card className="card">
            <CardBody>
                <CardTitle>
                    <strong>Festival du {Moment(festivalDate).format('DD/MM/YYYY')}</strong>
                </CardTitle>
                <CardText>
                    <strong>Date </strong>
                    <input type={'date'}
                           value={festivalDate}
                            onChange={changeDate}
                    />
                </CardText>
                <CardText>
                    <strong>Nombre de tables </strong>
                    <NumberFormat
                           value={fes.fes_nbTables}
                           onChange={changeNbTables}
                    />
                </CardText>
            </CardBody>
        </Card>
    );
}

export default CardFestival;
