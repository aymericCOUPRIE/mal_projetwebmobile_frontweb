import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


//les pages accessibles depuis la navbar
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import UpdatePassword from "../pages/update-password/update-password";
import AfficherSociete from "../pages/societe/AfficherSociete";
import Register from "../pages/register/register";
import Festivals from "../pages/festivals/Festivals";
import Jeux from "../pages/jeux/jeux";

// DANS LE SWITCH
//exact permet de dire que c'est la page par defaut
//
function Routes() {
    return (
        <div className="App">
            
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/update-password' component={UpdatePassword}/>
                <Route path='/societes' component={AfficherSociete}/>
                <Route path='/register' component={Register}/>
                <Route path='/festival' component={Festivals}/>
                <Route path='/jeux' component={Jeux}/>
            </Switch>

        </div>
    )
}

export default Routes
