import './jeux-festival.css'
import React, {useEffect, useState, useMemo} from "react";
import Axios from "axios"
import TableContainer from "../../components/tables/TableContainer";
import {SelectColumnFilter} from "../../components/tables/Filters";
import {CardBody, CardText, CardTitle} from "reactstrap";
import {Card} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import Button from "react-bootstrap/Button";

export default function JeuxFestival() {

    const [jeux, setListJeux] = useState([])


    return(
     <>
         <h1 id="title">Jeux du festival</h1>
         <Button id="addGame" > <FontAwesomeIcon id="plus" icon={faPlus} /> Créer un nouveau jeu</Button>

     </>
 );
}