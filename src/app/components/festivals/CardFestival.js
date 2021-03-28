import React, {useEffect, useState} from "react";
import Card from "@material-ui/core/Card";
import {CardBody, CardText, CardTitle} from "reactstrap";
import CardAction from '@material-ui/core/CardActions';
import Axios from "axios";
import NumberFormat from 'react-number-format';
import Moment from "moment";
import Button from "react-bootstrap/Button";
import FormLocalisation from "./FormLocalisation";
import {Container} from "../ModalForm/container";
import "./CardFestival.css";
import Alert from "react-bootstrap/Alert";

const CardFestival = ({fes, updateDate, updateNbTables}) => {

    const [festivalDate, setDate] = useState(fes.fes_date)
    const [localisationList, setLocalList] = useState([])
    const [show, setShow] = useState(false) // for the form of the localisation

    const changeDate = event => {
        updateDate(fes.fes_id, event.target.value) // update in the database
        setDate(event.target.value) // update the value of the input calendar
    }

    const changeNbTables = event => {
        updateNbTables(fes.fes_id, event.target.value)
    }

    /**
     * Method called when the form is validated
     * @param event
     */
    const onSubmitLocalisation = (event) => {
        event.preventDefault(event);
        //get the information of the form
        console.log("front lib :", event.target.loc_libelle.value);
        console.log("front id : ", fes.fes_id);
        Axios.post(`http://localhost:3000/server/localisation/add/${fes.fes_id}`, {
            loc_libelle: event.target.loc_libelle.value,
            loc_prixTable: event.target.loc_prixTable.value,
            loc_prixM2: event.target.loc_prixM2.value
        })
            .then((res) => {
                // to show the success with an alert
                setShow(true);
            })
    };

    return (
        <div>
            <Alert id="alertSuccesLoc" variant="success" show={show}>
                Espace créé avec succès!
            </Alert>
            <Card className="card">
                <CardBody>
                    <CardTitle>
                        <strong>Festival du {Moment(festivalDate).format('DD/MM/YYYY')}</strong>
                    </CardTitle>
                    <CardText>
                        Date
                        <input type={'date'}
                               className="inputCss"
                               value={festivalDate}
                               onChange={changeDate}

                        />
                    </CardText>
                    <CardText>
                        Nombre de tables
                        <NumberFormat
                            className="inputCss"
                            value={fes.fes_nbTables}
                            onChange={changeNbTables}
                        />
                    </CardText>

                    <CardAction>
                        <Container triggerText="Créer un nouvel espace" onSubmit={onSubmitLocalisation} component={FormLocalisation}/>
                    </CardAction>
                </CardBody>
            </Card>
        </div>
    );
}

// <FormLocalisation show={show} />

export default CardFestival;
