
import {isAdmin} from "../../utils/utils";

import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormText from "react-bootstrap/FormText";
import Alert from "react-bootstrap/Alert";
import './Festivals.css';
import {Input} from "reactstrap";

const FormFestival = require('../../components/festivals/FormFestival');

const Festivals = () => {

    //ATTENTION : faire if  isAdmin la page admin else la page organisateur
    return(
        <>
            <div>
                <p>ee<br/>
                ee<br/>
                ee<br/>
                ee<br/>
                ee<br/>
                ee</p>
                <button onClick={ () => {return(<FormFestival/>)}}>
                    Ajouter un festival
                </button>
            </div>

        </>
    )
}

export default Festivals;