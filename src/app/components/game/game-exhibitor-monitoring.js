import React, {useEffect, useState} from "react";
import Axios from "axios";
import {Container} from "../ModalForm/container";
import FormGameReservation from "./FormGameReservation";


const GameExhibitor = (reservation) => {

console.log("res_id du component",reservation.res_id)

    const onSubmit = (event) => {

        //Ne pas oublier cette ligne!!!
        event.preventDefault(event);

        /*
        Axios.post("/server/jeux/add", {
            //récupérer les valeurs du formulaire
            title: event.target.title.value,
            minAge : event.target.minAge.value,
            duration : event.target.duration.value,
            maxNumPlayers : event.target.maxNumPlayers.value,
            minNumPlayers : event.target.minNumPlayers.value,
            rulesLink : event.target.rulesLink.value,
            companyId : event.target.companyId.value,
            gameTypeId : event.target.gameTypeId.value,
        }).then((res) => {
            //afficher alert succes
            setShow(true);
        })

         */
    };


    return(
        <>
            <div id="btnNewJeu">
                <Container triggerText="Ajouter un jeu à la réservation" onSubmit={onSubmit} component={FormGameReservation}/>
            </div>
        </>
    )
}
export default GameExhibitor;