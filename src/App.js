import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import './App.css'
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
import JeuxFestival from './app/pages/jeux-festival/jeux-festival'

// DANS LE SWITCH
//exact permet de dire que c'est la page par defaut
//
function App() {

    return (
        <>
            <div className="App">

                <Navigation/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/update-password' component={UpdatePassword}/>
                    <Route path='/societes' component={AfficherSociete}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/festivals' component={Festivals}/>
                    <Route path='/jeux-festival' component={JeuxFestival}/>
                </Switch>

            </div>

            <footer className="footer">
                <div className="footer-left col-md-4 col-sm-6">
                    <p className="about">
                        <span> A propos</span> Depuis 2015, l’organisation du Festival du Jeu de Montpellier est soutenue par un collectif d’associations.

                        Les bénévoles qui animent notre Festival sont bien souvent membres de ces associations. Et c’est bien normal, le reste de l’année, les joueurs jouent et se retrouvent lors d’événements organisés par leurs associations : soirées jeux, week-end jeux, festivals de jeux, etc.

                    </p>
                    <div className="icons">
                        <a href="https://www.facebook.com/festivaldujeudemontpellier/"><FontAwesomeIcon icon={faFacebook} /></a>
                        <a href="https://twitter.com/FestivalJeuMpl"><FontAwesomeIcon icon={faTwitter} /></a>
                        <a href="https://www.instagram.com/festivaldujeumontpellier/"><FontAwesomeIcon icon={faInstagram} /></a>
                    </div>
                </div>
                <div className="footer-center col-md-4 col-sm-6">
                    <div>
                        <FontAwesomeIcon id="fa" icon={faMapMarker} />
                        <p><span> Boulevard Charles Warnery</span> Montpellier, France</p>
                    </div>
                    <div>
                        <FontAwesomeIcon id="fa" icon={faPhone} />
                        <p> (+00) 0000 000 000</p>
                    </div>
                    <div>
                        <FontAwesomeIcon id="fa" icon={faEnvelope} />
                        <p>contact@festivaldujeu-montpellier.org</p>
                    </div>
                </div>
                <div className="footer-right col-md-4 col-sm-6">
                    <img id="logoFestival" src={logo} />
                    <p className="menu">
                        <a href="#"> Home</a> |
                        <a href="#"> About</a> |
                        <a href="#"> Services</a> |
                        <a href="#"> Portfolio</a> |
                        <a href="#"> News</a> |
                        <a href="#"> Contact</a>
                    </p>
                    <p className="name"> Festival du jeu de Montpellier &copy; 2021</p>
                    <p className="name"> Marine Téroitin - Laura Biasibetti - Aymeric Couprie</p>
                </div>
            </footer>


        </>
    );

}

export default App;
