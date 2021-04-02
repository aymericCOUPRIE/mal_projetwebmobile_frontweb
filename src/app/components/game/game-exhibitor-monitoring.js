import React, {useEffect, useState} from "react";
import Axios from "axios";
import {Container} from "../ModalForm/container";
import FormGameReservation from "./FormGameReservation";


const GameExhibitor = (reservation) => {

console.log("res_id du component",reservation.res_id)
    const [res_id, setRes_id] = useState(reservation)
    const [reservationGames, setReservationGames] = useState([])

    const onSubmit = (event) => {

        //Ne pas oublier cette ligne!!!
        event.preventDefault(event);

        Axios.post("/server/jeuxFestival/add/game/${event.target.j_id.value}/reservation/${res_id}", {
          fes_id: localStorage.getItem("currentFestival")
        }).then((res) => {
            console.log(res)
        })


    };

//Récupérer toutes les infos /reservation/:res_id
    useEffect(() => {
        //Récupérer les infos des contacts
        Axios.get(`/server/jeuxFestival /reservation/${res_id}`)
            .then((res) => {
                setReservationGames(res.data)

            });

    }, []);

    return(
        <>
            <div id="btnNewJeu">
                <Container onSubmit={onSubmit} res={reservation} component={FormGameReservation}  triggerText="Ajouter un jeu à la réservation" />
            </div>
        </>
    )
}
export default GameExhibitor;