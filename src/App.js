import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import './App.css'
import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMapMarker, faPhone, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {faFacebook, faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons'
import logo from "./assets/img/logo.png";

//pour avoir la navbar sur toutes les pages on l'a mise dans un component
import Navigation from "./app/components/navigation/navigation";


//les pages accessibles depuis la navbar
import Login from './app/pages/login/login';
import AfficherSociete from './app/pages/societe/AfficherSociete'
import Home from './app/pages/home/home'
import UpdatePassword from './app/pages/update-password/update-password'
import Register from './app/pages/register/register'
import Festivals from './app/pages/festivals/Festivals'

import Jeux from './app/pages/jeux/jeux'

import Routes from "./app/routes/routes"
import CustomFooter from "./app/components/headerfooter/CustomFooter"
// DANS LE SWITCH
//exact permet de dire que c'est la page par defaut
//
function App() {

    return (
        <div className="App">

            <Navigation/>


            <Routes/>
            <CustomFooter/>

        </div>
    );

}

export default App;
