import React, {useEffect, useState} from 'react';
import './formContact.css'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


export const FormContact = ({onSubmit}) => {

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [telPortable, setTelPortable] = useState("");
    const [telFixe, setTelFixe] = useState("");
    const [email, setEmail] =useState("");
    const [rue, setRue] = useState("");
    const [ville, setVille] = useState("");
    const [codePostal, setCodePostal] = useState("");
    const [pays, setPays] = useState("")
    const [fonction, setFonction] = useState("");
    const [principal, setPrincipal] = useState(false);

    function validateForm() {
        return nom.length > 0 && prenom.length > 0;
    }


    return (

        <Form onSubmit={onSubmit}>
            <h4 id="titleGameForm">Contact</h4>



            <Form.Group size="lg" controlId="nom">
                <Form.Label>Nom*</Form.Label>
                <Form.Control autoFocus value={nom} onChange={(e) => setNom(e.target.value)}/>
            </Form.Group>
            <Form.Group size="lg" controlId="prenom">
                <Form.Label>Prenom*</Form.Label>
                <Form.Control autoFocus value={prenom}
                              onChange={(e) => setPrenom(e.target.value)}/>
            </Form.Group>
            <Form.Group size="lg" controlId="principal">
                <Form.Check inline label="Contact principal ?"  value={principal} onChange={(e)=> setPrincipal(e.target.checked)} />
            </Form.Group>
            <Form.Group size="lg" controlId="telPortable">
                <Form.Label>Téléphone protable</Form.Label>
                <Form.Control autoFocus value={telPortable} type="tel"
                              onChange={(e) => setTelPortable(e.target.value)}/>
            </Form.Group>
            <Form.Group size="lg" controlId="telFixe">
                <Form.Label>Téléphone fixe</Form.Label>
                <Form.Control autoFocus value={telFixe} type="tel"
                              onChange={(e) => setTelFixe(e.target.value)}/>
            </Form.Group>
            <Form.Group  size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control autoFocus value={email} type="email"
                                       onChange={(e) => setEmail(e.target.value)}/>
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
            <Form.Group size="lg" controlId="pays">
                <Form.Label>Pays</Form.Label>
                <Form.Control autoFocus value={pays} onChange={(e) => setPays(e.target.value)}/>
            </Form.Group>

            <Form.Group size="lg" controlId="fonction">
                <Form.Label>Fonction</Form.Label>
                <Form.Control autoFocus value={fonction} onChange={(e) => setFonction(e.target.value)}/>
            </Form.Group>



            <p>* Champs obligatoire</p>

            <div className="form-group">
                <Button id="btn-formContact" block size="lg" type="submit" disabled={!validateForm()}>
                    Valider
                </Button>
            </div>

        </Form>
    );
};
export default FormContact;
