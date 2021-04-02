import React, {useEffect, useState, useMemo} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileInvoiceDollar, faTh} from "@fortawesome/free-solid-svg-icons";

export default function Facturation() {

    return (
        <div style={{marginTop: `50px`}} className="EspaceFooter">

            <div id="titlePageJeux">
                <h1>
                    <FontAwesomeIcon className="faicon" icon={faFileInvoiceDollar}/>
                    Factures
                </h1>
            </div>

        </div>
    )
}
