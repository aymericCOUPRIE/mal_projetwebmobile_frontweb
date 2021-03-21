import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";

const FormSociete = ({onSubmit}) => {

    const [nom, setNom] = useState("");
    const [ville, setVille] = useState("");
    const [rue, setRue] = useState("");
    const [codePostal, setCodePostal] = useState("");
    const [pays, setPays] = useState("");


    function validateForm() {
        return nom.length > 0;
    }

    return (
        <Form onSubmit={onSubmit}>
            <h4 id="titleGameForm">Informations societe</h4>

            <Form.Group size="lg" controlId="nom">
                <Form.Label>Nom*</Form.Label>
                <Form.Control autoFocus value={nom} onChange={(e) => setNom(e.target.value)}/>
            </Form.Group>
            <Form.Group size="lg" controlId="ville">
                <Form.Label>Ville</Form.Label>
                <Form.Control autoFocus value={ville} onChange={(e) => setVille(e.target.value)}/>
            </Form.Group>
            <Form.Group size="lg" controlId="rue">
                <Form.Label>Rue</Form.Label>
                <Form.Control autoFocus value={rue} onChange={(e) => setRue(e.target.value)}/>
            </Form.Group>
            <Form.Group size="lg" controlId="codePostal">
                <Form.Label>Code Postal</Form.Label>
                <Form.Control autoFocus value={codePostal} onChange={(e) => setCodePostal(e.target.value)}/>
            </Form.Group>
            <Form.Group size="lg" controlId="pays">
                <Form.Label>Pays</Form.Label>
                <Form.Control autoFocus value={pays} onChange={(e) => setPays(e.target.value)}/>
            </Form.Group>

            <p>* Champ obligatoire</p>
            <div className="form-group">
                <Button id="btn-formGame" block size="lg" type="submit" disabled={!validateForm()}>
                    Submit
                </Button>
            </div>

        </Form>
    )
}

export default FormSociete
