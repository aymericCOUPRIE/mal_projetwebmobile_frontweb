import {isAdmin} from "../../utils/utils";

import React, {useEffect, useState} from "react";
import './Festivals.css';
import Form from "react-bootstrap/Form";
import FormFestival from './FormFestival';
import {Container} from "../../components/ModalForm/container";
import Axios from "axios";
import {Card} from "react-bootstrap";
import {CardBody, CardText, CardTitle} from "reactstrap";

const Festivals = () => {

    const [form, setForm] = useState(false)
    const [festivals, setListFestivals] = useState([])


    /**
     * This method is used to fetch data from DB every time it is been updated
     */
    /*
    useEffect(() => {
        const fetchData = async () => {
            const response = await Axios.get("http://localhost:3000/server/festivals/show");
            setListFestivals(response.data.res)
        };
        fetchData();
    }, [setListFestivals])

    const detailsSociete = (row) => {

        console.log("ROW VALUES", row)

        //Name of the attributes in a festival
        const {
            fes_date,
            fes_nbTables
        } = row.original;

        //Display the cards (more details)
        return (
            <Card style={{width: '50rem', margin: '0 auto'}}>
                <CardBody>
                    <CardTitle>
                        <strong>{`${soc_nom}`} </strong>
                    </CardTitle>
                    <CardText>
                        <strong>Address : </strong>
                        {`${soc_rue} ${soc_ville} - ${soc_codePostal}`}
                    </CardText>
                </CardBody>
            </Card>
        );
    };
*/

    const onSubmit = (event) => {
        event.preventDefault(event);
        //récupérer les valeurs du formulaire
        Axios.post("http://localhost:3000/server/festivals/add", {
            fes_date: event.target.fes_date.value,
            fes_nbTables: event.target.fes_nbTables.value
        })
            .then((res) => {
                //faire quelque chose genre message succès
            })
    };

    //ATTENTION : faire if  isAdmin la page admin else la page organisateur
    return (
        <>
            <h1>Festivals</h1>
            <Container  triggerText="Créer un nouveau festival" onSubmit={onSubmit} component={FormFestival}/>
        </>
    )
}

export default Festivals;
