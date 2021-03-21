import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


//les pages accessibles depuis la navbar
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import UpdatePassword from "../pages/update-password/update-password";
import AfficherSociete from "../pages/societe/AfficherSociete";
import Register from "../pages/register/register";
import Festivals from "../pages/festivals/Festivals";
import {Jeux} from "../pages/jeux/jeux";
import PrivateRoute from "./privateRoute";

// DANS LE SWITCH
//exact permet de dire que c'est la page par defaut
//
function Routes() {
    return (
        <div className="App">

            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/login' component={Login}/>
                <PrivateRoute path='/update-password' component={UpdatePassword}/>
                <PrivateRoute path='/societes' component={AfficherSociete}/>
                <PrivateRoute path='/register' component={Register}/>
                <PrivateRoute path='/festivals' component={Festivals}/>
                <Route path='/jeux' component={Jeux}/>
            </Switch>

        </div>
    )
}

export default Routes
