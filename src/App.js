import './App.css'
import React from "react";

//pour avoir la navbar sur toutes les pages on l'a mise dans un component
import CustomHeader from "./app/components/headerfooter/CustomHeader";
import Routes from "./app/routes/routes"
import CustomFooter from "./app/components/headerfooter/CustomFooter"

function App() {

    return (
        <div className="App">
                <CustomHeader/>
                <Routes/>
                <CustomFooter/>
        </div>
    );

}

export default App;
