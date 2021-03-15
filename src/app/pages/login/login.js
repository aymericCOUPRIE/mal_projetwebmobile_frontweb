import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./login.css";
import FormText from "react-bootstrap/FormText";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
        });

        //appel au back
        fetch("http://localhost:3000/server/login", {
            method: "POST",
            body: dataToSend,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                // If response was successful parse the json and dispatch an update
                if (res.ok) {
                    res.json().then((responseJson) => {
                        if (responseJson.token) {
                            console.log(responseJson.token)
                            //stock le token en local
                            //localStorage.getItem("userToken") pour y acceder
                            localStorage.setItem("userToken", responseJson.token)
                        } else {
                            setErrortext(responseJson.error);
                            console.log(responseJson.error)
                        }
                    })
                }

            });
        event.preventDefault();
    }

    return (
        <div className="Login">
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
                <Button id="btn-connexion" block size="lg" type="submit" disabled={!validateForm()}>
                    Connexion
                </Button>
            </Form>
        </div>
    );
}