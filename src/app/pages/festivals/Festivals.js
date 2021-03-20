import {isAdmin} from "../../utils/utils";

import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormText from "react-bootstrap/FormText";
import Alert from "react-bootstrap/Alert";
import './Festivals.css';
import {Input} from "reactstrap";

import FormFestival from '../../components/festivals/FormFestival';

const Festivals = () => {

    const [form, setForm] = useState(false)
    //ATTENTION : faire if  isAdmin la page admin else la page organisateur
    return (
        <>
            <div>
                <p>ee<br/>
                    ee<br/>
                    ee<br/>
                    ee<br/>
                    ee<br/>
                    ee</p>
                <button onClick={() => {
                    setForm(!form)
                }}>
                    Ajouter un festival
                </button>

                {form ? <FormFestival/> : null}

            </div>
        </>
    )
}

export default Festivals;
