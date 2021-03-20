import React, {useEffect, useState} from 'react';
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import FormText from "react-bootstrap/FormText";
import {Input} from "reactstrap";
import Button from "react-bootstrap/Button";


const FormFestival = (props) => {

    const [fes_date, setDate] = useState("");
    const [fes_nbTables, setNbTables] = useState(0);
    const [errortext, setErrortext] = useState("");

    const [show, setShow] = useState(false);

    function validateForm() {
        return fes_date.length > 0;
    }

    function handleSubmit(event) {
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

    return (
        <div>

            <p> TEST </p>
            <Alert id="alertSucces" variant="success" show={show}>
                Festival créé avec succès!
            </Alert>
            <div className="CreateFestival">
                <Form onSubmit={handleSubmit}>
                    {errortext !== "" ? (
                        <FormText id="errorLabel">{errortext}</FormText>
                    ) : null}
                    <Form.Group size="lg" controlId="fes_date">
                        <Form.Label>Date du festival</Form.Label>
                        <Input type="date"></Input>
                        <div className="col-md-3">
                            <div className="input-group">
                                <div className="input-group-addon" id="calendar1">
                                    <i className="fa fa-calendar"></i>
                                </div>
                                <input type="text" name="start_date" id="start_date" className="form-control start_date"
                                       data-inputmask="'alias':'mm/dd/yyyy'" data-mask="" value=""></input>
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group size="lg" controlId="fes_nbTables">
                        <Form.Label>Nombre de tables total</Form.Label>
                        <Form.Control
                            type="nbTables"
                            value={fes_nbTables}
                            onChange={(e) => setNbTables(e.target.value)}
                        />
                    </Form.Group>
                    <Button id="btn-valider" block size="lg" type="submit" disabled={!validateForm()}>
                        Créer le festival
                    </Button>
                </Form>
            </div>
        </div>
    )

}

export default FormFestival;



