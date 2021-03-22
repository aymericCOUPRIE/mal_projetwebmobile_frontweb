import React, {useState} from 'react';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const FormType = ({onSubmit}) => {
    const [libelle, setLibelle] = useState("");

    function validateForm(){
        return libelle.length > 0;
    }

    return(
        <Form onSubmit={onSubmit}>
            <h4 id="titleGameForm">Détails du jeu</h4>

            <Form.Group size="lg"  controlId="libelle">
                <Form.Label>Type de jeu*</Form.Label>
                <Form.Control autoFocus value={libelle} onChange={(e) => setLibelle(e.target.value)} />
            </Form.Group>

            <p>* Champ obligatoire</p>


            <div className="form-group">
                <Button id="btn-formGame" block size="lg" type="submit" disabled={!validateForm()}>
                    Valider
                </Button>
            </div>

        </Form>
    );
};
export default FormType;
