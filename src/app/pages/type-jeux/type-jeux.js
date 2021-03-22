import React, {useEffect, useState} from "react";
import Axios from "axios"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShapes} from "@fortawesome/free-solid-svg-icons";

 function TypeJeu(){
    return(
        <>
            <div id="titlePageJeux">
                <h1>
                    <FontAwesomeIcon className="faicon" icon={faShapes}/>
                    Type de jeux</h1>
            </div>
        </>
    )
}
export default TypeJeu