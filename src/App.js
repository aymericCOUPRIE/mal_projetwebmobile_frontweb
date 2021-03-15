import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

//pour avoir la navbar sur toutes les pages on l'a mise dans un component
import Navigation from "./app/components/navigation";

//les pages accessibles depuis la navbar
import Login from './app/pages/login/login';
// DANS LE SWITCH
//  <Route exact path='/' component={Home}/>  exact permet de dire que c'est la page par defaut
//
function App() {
    return(
        <>
            <div className="App">
                <Navigation/>
                <Switch>
                    <Route path='/login' component={Login}/>
                </Switch>
            </div>

        </>
    );

}

export default App;
