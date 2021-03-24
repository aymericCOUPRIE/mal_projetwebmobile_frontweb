import React, {useEffect, useState} from 'react';
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import FormText from "react-bootstrap/FormText";
import {Input} from "reactstrap";
import Button from "react-bootstrap/Button";

import './FormFestival.css';


const FormFestival = ({onSubmit}) => {

    const [fes_date, setDate] = useState("");
    const [fes_nbTables, setNbTables] = useState(0);
    const [errortext, setErrortext] = useState("");

    const [show, setShow] = useState(false);

    function validateForm() {
        console.log("dateeee : ",fes_date);
        return fes_date.length > 0;
    }

/*
    function onSubmit(event) {
        setErrortext("")
        //variable to send in json format
        let dataToSend = JSON.stringify({
            fes_date,
            fes_nbTables
        });

        fetch("http://localhost:3000/server/festivals/add", {
            method: "POST",
            body: dataToSend,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then((res) => {

            // If response was successful parse the json and dispatch an update
            if (res.ok) {
                res.json().then((resJson) => {
                    if (resJson.success) {
                        //afficher message de réussite
                        console.log("festival créé")
                        setShow(true)
                    } else {
                        setErrortext(resJson.error);
                    }
                })
            }
        });
        event.preventDefault();
    }
*/

    return (
        <div>
            <Alert id="alertSucces" variant="success" show={show}>
                Festival créé avec succès!
            </Alert>
            <div className="CreateFestival">
                <Form onSubmit={onSubmit}>
                    {errortext !== "" ? (
                        <FormText id="errorLabel">{errortext}</FormText>
                    ) : null}
                    <h4 id="titleFestivalForm">Création d'un festival</h4>
                    <Form.Group size="lg" controlId="fes_date">
                        <Form.Label>Date du festival*</Form.Label>
                        <Form.Control
                            autoFocus
                            type="date"
                            value={fes_date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="fes_nbTables">
                        <Form.Label>Nombre de tables total</Form.Label>
                        <Form.Control
                            type="nbTables"
                            min="0"
                            value={fes_nbTables}
                            onChange={(e) => setNbTables(e.target.value)}
                        />
                    </Form.Group>
                    <p>* Champ obligatoire</p>
                    <div className="form-group">
                        <Button id="btn-formFestival" block size="lg" type="submit" disabled={!validateForm()}>
                            Créer le festival
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
};

export default FormFestival;