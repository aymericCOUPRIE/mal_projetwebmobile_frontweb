import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope, faMapMarker, faPhone} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/img/logo.png";
import React from "react";

function CustomFooter() {

    return (
        <div>
            <footer className="footer">
                <div className="footer-left col-md-4 col-sm-6">
                    <p className="about">
                        <span> A propos</span> Depuis 2015, l’organisation du Festival du Jeu de Montpellier est
                        soutenue par un collectif d’associations.

                        Les bénévoles qui animent notre Festival sont bien souvent membres de ces associations. Et c’est
                        bien normal, le reste de l’année, les joueurs jouent et se retrouvent lors d’événements
                        organisés par leurs associations : soirées jeux, week-end jeux, festivals de jeux, etc.

                    </p>
                    <div className="icons">
                        <a href="https://www.facebook.com/festivaldujeudemontpellier/"><FontAwesomeIcon
                            icon={faFacebook}/></a>
                        <a href="https://twitter.com/FestivalJeuMpl"><FontAwesomeIcon icon={faTwitter}/></a>
                        <a href="https://www.instagram.com/festivaldujeumontpellier/"><FontAwesomeIcon
                            icon={faInstagram}/></a>
                    </div>
                </div>
                <div className="footer-center col-md-4 col-sm-6">
                    <div>
                        <FontAwesomeIcon id="fa" icon={faMapMarker}/>
                        <p><span> Boulevard Charles Warnery</span> Montpellier, France</p>
                    </div>
                    <div>
                        <FontAwesomeIcon id="fa" icon={faPhone}/>
                        <p> (+00) 0000 000 000</p>
                    </div>
                    <div>
                        <FontAwesomeIcon id="fa" icon={faEnvelope}/>
                        <p>contact@festivaldujeu-montpellier.org</p>
                    </div>
                </div>
                <div className="footer-right col-md-4 col-sm-6">
                    <img id="logoFestival" src={logo}/>
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
        </div>
    )
}


export default CustomFooter
