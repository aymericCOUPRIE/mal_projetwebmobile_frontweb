import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


import Navigation from "../components/navigation/navigation";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import UpdatePassword from "../pages/update-password/update-password";
import AfficherSociete from "../pages/societe/AfficherSociete";
import Register from "../pages/register/register";


function Routes() {
    return (
        <div className="App">

            <Navigation/>

            <Switch>
                {console.log("OKKKKKKKKKKKKKKKKKKKKK")}
                <Route exact path='/' component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/update-password' component={UpdatePassword}/>
                <Route path='/societes' component={AfficherSociete}/>
                <Route path='/register' component={Register}/>
            </Switch>

        </div>
    )
}

export default Routes
