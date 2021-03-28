import React, {useEffect, useState} from "react";
import Card from "@material-ui/core/Card";
import {CardBody, CardText, CardTitle} from "reactstrap";
import Axios from "axios";
import NumberFormat from 'react-number-format';
import Moment from "moment";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import FormText from "react-bootstrap/FormText";

const FormLocalisation = ({onSubmitLocalisation}) => {
    const [loc_libelle, setLibelle] = useState("");
    const [loc_prixTable, setPrixTable] = useState(0);
    const [loc_prixM2, setPrixM2] = useState(0);

    const [errortext, setErrortext] = useState("");


    function validateForm() {
        return loc_libelle.length > 0;
    }

    return (
        <div>
            <div className="CreateFestival">
                <Form onSubmit={onSubmitLocalisation}>
                    {errortext !== "" ? (
                        <FormText id="errorLabel">{errortext}</FormText>
                    ) : null}
                    <h4 id="titleForm">Création d'un espace</h4>
                    <Form.Group size="lg" controlId="loc_libelle">
                        <Form.Label>Nom de l'espace *</Form.Label>
                        <Form.Control
                            type="text"
                            value={loc_libelle}
                            onChange={(e) => setLibelle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="loc_prixTable">
                        <Form.Label>Prix d'une table </Form.Label>
                        <Form.Control
                            type="text"
                            min="0"
                            value={loc_prixTable}
                            onChange={(e) => setPrixTable(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="loc_prixM2">
                        <Form.Label>Prix d'un m² </Form.Label>
                        <Form.Control
                            type="text"
                            min="0"
                            value={loc_prixM2}
                            onChange={(e) => setPrixM2(e.target.value)}
                        />
                    </Form.Group>
                    <p>* Champ obligatoire</p>
                    <div className="form-group">
                        <Button id="btn-formLoc" block size="lg" type="submit" disabled={!validateForm()}>
                            Créer l'espace
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default FormLocalisation;