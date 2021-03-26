import React, {useEffect, useMemo, useState} from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";

const ExhibitorMonitoring = () => {
    const location = useLocation();

    //console.log("LOCATION", location.state)
    //console.log("STATE",location.state.detail)


    return(
        <div className="EspaceFooter">
                Hello tu es sur la page de l'exposant
        </div>
    )
}
export default ExhibitorMonitoring