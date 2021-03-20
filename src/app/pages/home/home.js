import logo from "../../../assets/img/logo.png";
import React, {useEffect, useState} from "react";
import Axios from "axios";
import Moment from 'moment';
import './home.css';

export default function Home() {
    const [dateProchainFestival, setdateProchainFestival] = useState(null);

    //méthode qui s'appelle au chargement de la page
    useEffect(() => {
        Axios.get("http://localhost:3000/server/festivals/closest")
            .then((res) => {
                localStorage.setItem("currentFestival", res.data.closestFestival[0].fes_id);
                setdateProchainFestival(res.data.closestFestival[0].fes_date);
            })


    });

    return (

        <div>
            <body id="home">

            <div className="flex-container">
                <div className="flex-item">
                    <img id="image" src={logo}/>
                </div>
                <div className="flex-item">
                    <h1>SORTONS JOUER !</h1>
                    <h2> RENDEZ VOUS</h2>
                    <h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                            <path
                                d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                        </svg>
                        {Moment(dateProchainFestival).format('DD-MM-YYYY')}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                            <path
                                d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                        </svg>
                    </h3>
                    <p>Entrée libre est gratuite</p>
                </div>
            </div>

            </body>
        </div>
    );
}
