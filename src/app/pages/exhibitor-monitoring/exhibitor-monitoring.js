import React, {useEffect, useMemo, useState} from "react";
import Axios from "axios";
import { useLocation, useParams } from "react-router-dom";

const ExhibitorMonitoring = () => {
    //const location = useLocation();

   //console.log("LOCATION", location.state)
    //console.log("STATE",location.state.detail)

    const {idExposant} = useParams();

    console.log(idExposant);

    return(
        <div className="EspaceFooter">
                Hello tu es sur la page de l'exposant
        </div>
    )
}
export default ExhibitorMonitoring