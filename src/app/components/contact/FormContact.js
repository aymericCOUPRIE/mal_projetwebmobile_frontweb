import React, {useEffect, useState} from 'react';
import './formContact.css'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useParams} from "react-router-dom";


export const FormContact = ({onSubmitContact}) => {

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [telPortable, setTelPortable] = useState("");
    const [telFixe, setTelFixe] = useState("");
    const [rue, setRue] = useState("");
    const [ville, setVille] = useState("");
    const [codePostal, setCodePostal] = useState("");
    const [fonction, setFonction] = useState("");

    function validateForm() {
        return true;
    }


    return (

        <Form onSubmit={onSubmitContact}>
            <h4 id="titleGameForm">Contact</h4>

            {
                console.log("SOC", soc_id)
            }
            <Form.Group size="lg" controlId="nom">
                <Form.Label>Nom*</Form.Label>
                <Form.Control autoFocus value={nom} onChange={(e) => setNom(e.target.value)}/>
            </Form.Group>
            <Form.Group size="lg" controlId="prenom">
                <Form.Label>Prenom</Form.Label>
                <Form.Control autoFocus value={prenom}
                              onChange={(e) => setPrenom(e.target.value)}/>
            </Form.Group>
            <Form.Group size="lg" controlId="telPortable">
                <Form.Label>Téléphone protable</Form.Label>
                <Form.Control autoFocus value={telPortable} onChange={(e) => setTelPortable(e.target.value)}/>
            </Form.Group>
            <Form.Group size="lg" controlId="telFixe">
                <Form.Label>Téléphone fixe</Form.Label>
                <Form.Control autoFocus value={telFixe}
                              onChange={(e) => setTelFixe(e.target.value)}/>
            </Form.Group>
            <Form.Group size="lg" controlId="rue">
                <Form.Label>Rue</Form.Label>
                <Form.Control autoFocus value={rue}
                              onChange={(e) => setRue(e.target.value)}/>
            </Form.Group>
            <Form.Group size="lg" controlId="ville">
                <Form.Label>Ville</Form.Label>
                <Form.Control autoFocus value={ville} onChange={(e) => setVille(e.target.value)}/>
            </Form.Group>
            <Form.Group size="lg" controlId="codePostal">
                <Form.Label>Code postal</Form.Label>
                <Form.Control autoFocus value={codePostal} onChange={(e) => setCodePostal(e.target.value)}/>
            </Form.Group>
            <Form.Group size="lg" controlId="fonction">
                <Form.Label>Fonction</Form.Label>
                <Form.Check autoFocus value={fonction} type={"checkbox"} onChange={(e) => setFonction(e.target.value)}/>
            </Form.Group>

            <p>* Champ obligatoire</p>

            <div className="form-group">
                <Button id="btn-formContact" block size="lg" type="submit" disabled={!validateForm()}>
                    Valider
                </Button>
            </div>

        </Form>
    );
};
export default FormContact;
