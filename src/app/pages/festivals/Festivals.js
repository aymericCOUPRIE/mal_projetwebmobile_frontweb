import {isAdmin} from "../../utils/utils";

import React, {useEffect, useState} from "react";
import './Festivals.css';
import FormFestival from './FormFestival';
import {Container} from "../../components/ModalForm/container";
import CardFestival from "../../components/festivals/CardFestival";
import Axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTheaterMasks} from "@fortawesome/free-solid-svg-icons";
import Alert from "react-bootstrap/Alert";
//const CardFestival = require('')

const Festivals = () => {

    const [form, setForm] = useState(false)
    const [festivals, setListFestivals] = useState([]);

    const [show, setShow] = useState(false)

    /**
     * Method which is called at the loading of the page
     * to show all the festivals
     */
    useEffect(() => {
        Axios.get("http://localhost:3000/server/Festivals/allDetails")
            .then((res) => {
                setListFestivals(res.data.allFestivals)
            });
    }, []);

    /**
     * Method called when the form is validated
     * @param event
     */
    const onSubmit = (event) => {
        event.preventDefault(event);
        //get the information of the form
        Axios.post("http://localhost:3000/server/festivals/add", {
            fes_date: event.target.fes_date.value,
            fes_nbTables: event.target.fes_nbTables.value
        })
            .then((res) => {
                // to show the success with an alert
                setShow(true);
            })
    };

    /**
     * Method called by the input date to update the date of the festival of the card
     * @param old_date : the current date
     * @param new_date : the new date of the festival
     */
    const updateDateFestival = async (fes_id, new_date) => {
        const res = await Axios.put("http://localhost:3000/server/festivals/updateDate", {
            fes_id: fes_id,
            new_date: new_date
        })
    }

    /**
     *
     * @param fes_date
     * @param new_number
     */
    const updateNbTables = (fes_id, new_nbTables) => {
        Axios.put("http://localhost:3000/server/festivals/updateNbTables", {
            fes_id : fes_id,
            new_nbTables : new_nbTables
        })
    }

    //ATTENTION : faire if  isAdmin la page admin else la page organisateur
    return (
        <>
            <div className="EspaceFooter">
                <div id="titlePageFestivals">
                    <h1>
                        <FontAwesomeIcon className="faicon" icon={faTheaterMasks}/>
                        Festivals
                    </h1>

                </div>
                <Alert id="alertSucces" variant="success" show={show}>
                    Le festival a été créé !
                </Alert>
                <div id="btnNewFestival">
                    <Container triggerText="Créer un nouveau festival" onSubmit={onSubmit} component={FormFestival}/>
                </div>
                <div className="flex-container">
                    {festivals.map((fest, i) =>
                        <div className="flex-item" >
                            <CardFestival fes={fest} updateDate={updateDateFestival} updateNbTables={updateNbTables}/>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Festivals;
