import './jeux.css'
import React, {useEffect, useState, useMemo} from "react";
import Axios from "axios"
import TableContainer from "../../components/tables/TableContainer";
import {SelectColumnFilter} from "../../components/tables/Filters";
import {CardBody, CardText, CardTitle} from "reactstrap";
import {Card} from "react-bootstrap";
import {Container} from "../../components/ModalForm/container";
import FormJeu from "./formJeu";

export const Jeux = () => {

    const [jeux, setListJeux] = useState([])

    const onSubmit = (event) => {
        event.preventDefault(event);
        //récupérer les valeurs du formulaire
        //console.log("TARGET",event.target.title.value)
        Axios.post("http://localhost:3000/server/jeux/add", {
            title: event.target.title.value,
        })
            .then((res) => {
                //faire quelque chose genre message succès
            })
    };

    return (
        <>
            <h1>Jeux</h1>
            <Container triggerText="Créer un nouveau jeu" onSubmit={onSubmit} component={FormJeu}/>
        </>
    );
}
