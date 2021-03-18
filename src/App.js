import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

//pour avoir la navbar sur toutes les pages on l'a mise dans un component
import Navigation from "./app/components/navigation/navigation";

//les pages accessibles depuis la navbar
import Login from './app/pages/login/login';
import AfficherSociete from './app/pages/societe/AfficherSociete'
import Home from './app/pages/home/home'
import UpdatePassword from './app/pages/update-password/update-password'
// DANS LE SWITCH
//exact permet de dire que c'est la page par defaut
//
function App() {

    return (
        <>
            <div className="App">

                <Navigation/>
                <Switch>
                    <Route exact path='/home' component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/update-password' component={UpdatePassword}/>
                    <Route path='/societes' component={AfficherSociete}/>
                </Switch>

            </div>


        </>
    );

}

export default App;
