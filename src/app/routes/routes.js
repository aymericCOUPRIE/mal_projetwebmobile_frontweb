import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


//les pages accessibles depuis la navbar
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import UpdatePassword from "../pages/update-password/update-password";
import AfficherExposant from "../pages/societe/AfficherExposant";
import HandleAccounts from "../pages/handle-accounts/handle-accounts";
import Festivals from "../pages/festivals/Festivals";
import TypeJeux from "../pages/type-jeux/type-jeux"
import {Jeux} from "../pages/jeux/jeux";
import PrivateRoute from "./privateRoute";
import FestivalGames from "../pages/festival-games/festival-games";
import ExhibitorMonitoring from "../pages/exhibitor-monitoring/exhibitor-monitoring";
import AfficherSocieteRole from "../pages/societe/AfficherSocieteRole";
import FormLocalisation from "../components/festivals/FormLocalisation";
import Reservation from "../pages/reservation/Reservation";


// DANS LE SWITCH
//exact permet de dire que c'est la page par defaut
//Private route = route accessibe que quand login
function Routes() {
    return (
        <div className="App">

            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/festival-games' component={FestivalGames}/>
                <Route path='/reservations' component={Reservation}/>
                <PrivateRoute path='/update-password' component={UpdatePassword}/>
                <PrivateRoute path='/exposants' component={AfficherExposant}/>
                <PrivateRoute path='/societes' component={AfficherSocieteRole}/>
                <PrivateRoute path='/handle-accounts' component={HandleAccounts}/>
                <PrivateRoute path='/festivals' component={Festivals}/>
                <PrivateRoute path='/localisation' component={FormLocalisation}/>
                <PrivateRoute path='/jeux' component={Jeux}/>
                <PrivateRoute path='/type-jeux' component={TypeJeux}/>
                <PrivateRoute path='/exhibitor-monitoring/:idExposant' component={ExhibitorMonitoring}/>
            </Switch>
        </div>
    )
}

export default Routes
