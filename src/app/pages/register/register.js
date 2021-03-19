import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormText from "react-bootstrap/FormText";

import './register.css'
import logo from "../../../assets/img/logo.png";

export default function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [estAdmin, setEstAdmin] = useState(0);
    const [errortext, setErrortext] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        setErrortext("")
        //variable à envoyer au back sous format JSON
        let dataToSend = JSON.stringify({
            email,
            password,
            estAdmin,
        });

        //appel au back
        fetch("http://localhost:3000/server/register", {
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
                        //afficher message de réussite
                        console.log("compte crée")
                    } else {
                        setErrortext(responseJson.error);
                    }
                })
            }
        });
        event.preventDefault();
    }
    return (
        <>
            <img id="logo" src={logo} />
            <div className="Register">
                <Form onSubmit={handleSubmit}>
                    {/* equivalent du if/else */}
                    {errortext !== "" ? (
                        <FormText id="errorLabel">{errortext}</FormText>
                    ) : null}
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="role">
                        <Form.Check inline label="admin" defaultChecked={estAdmin} onChange={(event)=> setEstAdmin(event.target.checked)} />
                        <p>*Si cette case n'est pas coché, ce sera un compte organisateur.</p>
                    </Form.Group>
                    <Button id="btn-valider" block size="lg" type="submit" disabled={!validateForm()}>
                        Créer le compte
                    </Button>

                </Form>
            </div>

        </>
    );
}