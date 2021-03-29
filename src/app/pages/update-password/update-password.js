import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormText from "react-bootstrap/FormText";
import Alert from 'react-bootstrap/Alert';
import logo from "../../../assets/img/logo.png";
import {email} from "../../utils/utils";

import './update-password.css'

export default function UpdatePassword(){
    const [olderPassword, setOlderPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [errortext, setErrortext] = useState("");
    const [show, setShow] = useState(false)

    function validateForm() {
        return olderPassword.length > 0 && newPassword.length > 0 && confirmedPassword.length > 0;
    }

    function handleSubmit(event) {

        if(newPassword != confirmedPassword){
            setErrortext("Les deux mots de passe doivent être identiques");
        }else{
            setErrortext("");
            //variable à envoyer au back sous format JSON
            let dataToSend = JSON.stringify({
                newPassword,
                olderPassword
            });
            //appel au back
            fetch(`/server/update-password/${email()}`, {
                method: "POST",
                body: dataToSend,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then((res) => {

                // If response was successful parse the json and dispatch an update
                if (res.ok) {
                    res.json().then((responseJson) => {
                        if (responseJson.success) {
                            setShow(true)
                        } else {
                            setErrortext(responseJson.error);
                        }
                    })
                }
            });
            event.preventDefault();
        }

    }
    return(
        <div className="EspaceFooter">
            <Alert id="alertSucces" variant="success" show={show}>
                Mot de passe modifié avec succès!
            </Alert>
            <img id="logo" src={logo} />
            <div className="Password">
                <Form onSubmit={handleSubmit}>
                    {/* equivalent du if/else */}
                    {errortext !== "" ? (
                        <FormText id="errorLabel">{errortext}</FormText>
                    ) : null}
                    <Form.Group size="lg" controlId="oldPassword">
                        <Form.Label>Ancien mot de passe</Form.Label>
                        <Form.Control
                            autoFocus
                            type="password"
                            value={olderPassword}
                            onChange={(e) => setOlderPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="newPassword">
                        <Form.Label>Nouveau mot de passe</Form.Label>
                        <Form.Control
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="confirmedPassword">
                        <Form.Label>Confirmer le nouveau mot de passe</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmedPassword}
                            onChange={(e) => setConfirmedPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button id="btn-validate" block size="lg" type="submit" disabled={!validateForm()}>
                        Valider
                    </Button>
                </Form>
            </div>

        </div>
    );
}