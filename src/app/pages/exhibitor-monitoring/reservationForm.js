import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import './reservationForm.css'



export const FormReservation = ({ onSubmitReservation }) => {
const [localisations, setLocalisations] = useState([]);

//récupérer toutes les localisations
    useEffect(() => {
        const fes_id = localStorage.getItem("currentFestival");
       Axios.get(`/server/localisation/allDetails/${fes_id}`)
         .then((res) => {
             setLocalisations(res.data)
             console.log("LOCALISATIONS",res.data)
           })

    }, []);

    function validateForm() {
        //return title.length > 0 ;
    }



    return (
    <Form onSubmit={onSubmitReservation}>

        <div className="form-group">
            <h4 id="titleGameForm">Nouvelle réservation</h4>

            {
                localisations ?
                    localisations.map((value, index) => {
                        return (
                            <div id="loc">
                                {value.loc_libelle}

                                stock dans une hasmap: clé = id localisation, valeur = nb tables et nb m2

                            </div>
                        )
                    })
                    :
                    <div>Y a un problème Arthur, ton festival n'a pas de localisations ..</div>
            }


            <Button id="btn-formGame" block size="lg" type="submit" disabled={!validateForm()}>
                Valider
            </Button>
        </div>
    </Form>
    );
};

export default FormReservation;