import React, {useEffect, useState} from "react";
import Axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const FormGameReservation = ({onSubmit}) => {
    const [gameList, setGameList] = useState([]);
    const [j_id, setJ_id] = useState("");
    const [validateForm,setValidateForm] = useState("false");

    useEffect(() => {
        //Récupérerles les jeux qui existent déjà

        Axios.get("/server/jeux/allTitres")
            .then((res) => {
                console.log("GameList du component", res.data)
                if (res.data) {
                    setGameList(res.data)
                }

            })
    }, []);

    return (

        <Form onSubmit={onSubmit}>
            <h4 id="titleGameForm">Ajouter un jeu à la réservation</h4>
            <Form.Group size="lg"  controlId="j_id">
                <Form.Label>Choisir un jeu</Form.Label>
                <Form.Control autoFocus value={j_id} as="select" onChange={(e) => {setJ_id(e.target.value) && setValidateForm(true)}} >
                    {gameList.map((object) =><option value={object.j_id}>{object.j_titre} </option> )}
                </Form.Control>
            </Form.Group>
            <div className="form-group">
                <Button id="btn-formGame" block size="lg" type="submit" disabled={!validateForm}>
                    Valider
                </Button>
            </div>
        </Form>
    )
}
export default FormGameReservation;