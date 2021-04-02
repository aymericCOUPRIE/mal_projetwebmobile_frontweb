import React, {useEffect, useState, useMemo} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTh} from "@fortawesome/free-solid-svg-icons";

export default function ZonesFestivals() {

    return (
        <div style={{marginTop: `50px`}} className="EspaceFooter">

            <div id="titlePageJeux">
                <h1>
                    <FontAwesomeIcon className="faicon" icon={faTh}/>
                    Zones du Festival
                </h1>
            </div>

        </div>
    )
}
