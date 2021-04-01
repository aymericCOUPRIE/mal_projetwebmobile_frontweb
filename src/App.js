import React, {createContext, useEffect, useState} from "react";

//pour avoir la navbar sur toutes les pages on l'a mise dans un component
import CustomHeader from "./app/components/headerfooter/CustomHeader";
import Routes from "./app/routes/routes"
import CustomFooter from "./app/components/headerfooter/CustomFooter"
import Axios from "axios";


export const FestivalContext = createContext({
    selectedFestival: {
        fes_id: 0,
        fes_date: new Date()
    },
    setSelectedFestival: Function
})

function App() {

    const [prochainFestival, setProchainFestival] = useState({
        fes_id: 0,
        fes_date: new Date()
    });
    const [isWhatever, setIsWhatever] = useState(false); // used to update the date in the header instead of reloading the page
    const value = {selectedFestival: prochainFestival, setSelectedFestival: setProchainFestival}

    //méthode qui s'appelle au chargement de la page
    useEffect(() => {
        console.log("je recharge")
        Axios.get("/server/festivals/closest")
            .then((res) => {
                localStorage.setItem("currentFestival", res.data.closestFestival[0].fes_id);
                setProchainFestival(res.data.closestFestival[0]);
            })
    }, [isWhatever]);

    return (
        <div className="App">
            {prochainFestival &&
            <FestivalContext.Provider value={value}>
                <CustomHeader/>
                <Routes/>
                <CustomFooter/>
            </FestivalContext.Provider>
            }
        </div>
    );

}

export default App;
