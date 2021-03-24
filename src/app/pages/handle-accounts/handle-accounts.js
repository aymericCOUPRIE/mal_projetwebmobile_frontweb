import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

import './handle-accounts.css'
import Alert from "react-bootstrap/Alert";
import RegisterForm from "./registerForm"
import {Container} from "../../components/ModalForm/container";
import Axios from "axios";
import FormText from "react-bootstrap/Form";




export default function HandleAccounts(){
    const [errortext, setErrortext] = useState("");
    const [show, setShow] = useState(false)



    const onSubmit = (event) => {

        //Ne pas oublier cette ligne!!!
        event.preventDefault(event);


        Axios.post("http://localhost:3000/server/register", {
            //récupérer les valeurs du formulaire
            email: event.target.email.value,
            password : event.target.password.value,
            estAdmin : event.target.role.value,

        }).then((res) => {
            //afficher alert succes

                    if (res.data.success) {
                        //afficher message de réussite
                        console.log("compte crée")
                        setShow(true)
                    } else {
                        setErrortext(res.data.error);
                    }







        })
    };


    return (
        <>
            <div id="titlePageJeux">
                <h1>
                    <FontAwesomeIcon className="faicon" icon={faUser}/>
                    Gérer les comptes
                </h1>
            </div>
            <Alert id="alertSucces" variant="success" show={show}>
                Compté crée avec succès!
            </Alert>

            {/* equivalent du if/else */}
            {errortext !== "" ? (
                <FormText id="errorLabel">{errortext}</FormText>
            ) : null}
            <div id="btn-NewUser">
                <Container triggerText="Créer un nouveau compte" onSubmit={onSubmit} component={RegisterForm}/>
            </div>


        </>
    );
}