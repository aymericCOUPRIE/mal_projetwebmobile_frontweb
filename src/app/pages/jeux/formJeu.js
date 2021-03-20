import React, {useEffect, useState} from 'react';
import './formJeu.css'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormText from "react-bootstrap/FormText";
import Axios from "axios";

export const FormJeu = ({ onSubmit }) => {
    const [title,setTitle] = useState("");
    const [minAge,setMinAge] = useState(null);
    const [duration,setDuration] = useState(null);
    const [maxNumPlayers,setMaxNumPlayers] = useState(null);
    const [minNumPlayers,setMinNumPlayers] = useState(null);
    const [rulesLink,setRulesLink] = useState("");
    const [companyId,setCompanyId] = useState("");
    const [gameTypeId,setGameTypeId] = useState("");

    const [errortext, setErrortext] = useState("");

    const [gameTypeList,setGameTypeList] = useState([]);
    const [editeursList,setEditeursList] = useState([]);


    //méthode qui s'appelle au chargement de la page
    useEffect(() => {
        //Récupérer tous les types de jeux
        Axios.get("http://localhost:3000/server/jeux/allGameType")
            .then((res) => {
               setGameTypeList(res.data)
            })

        //requetes tous les éditeurs
        Axios.get("http://localhost:3000/server/societe/allEditeurs")
            .then((res) => {
               setEditeursList(res.data)
            })

    });

    function validateForm() {
        return title.length > 0 ;
    }



    return (

        <Form onSubmit={onSubmit}>
            <h4 id="titleGameForm">Détails du jeu</h4>
            {/* equivalent du if/else */}
            {errortext !== "" ? (
                <FormText id="errorLabel">{errortext}</FormText>
            ) : null}
            <Form.Group size="lg"  controlId="title">
                <Form.Label>Nom*</Form.Label>
                <Form.Control autoFocus value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group size="lg"  controlId="minAge">
                <Form.Label>Age minimum</Form.Label>
                <Form.Control autoFocus value={minAge} type="number" min="0"  onChange={(e) => setMinAge(e.target.value)} />
            </Form.Group>
            <Form.Group size="lg"  controlId="duration">
                <Form.Label>Durée</Form.Label>
                <Form.Control autoFocus value={duration} type="time" onChange={(e) => setDuration(e.target.value)} />
            </Form.Group>
            <Form.Group size="lg"  controlId="minNumPlayers">
                <Form.Label>Min joueurs</Form.Label>
                <Form.Control autoFocus value={minNumPlayers} type="number" min="0" onChange={(e) => setMinNumPlayers(e.target.value)} />
            </Form.Group>
            <Form.Group size="lg"  controlId="maxNumPlayers">
                <Form.Label>Max joueurs</Form.Label>
                <Form.Control autoFocus value={maxNumPlayers} type="number" min="0" onChange={(e) => setMaxNumPlayers(e.target.value)} />
            </Form.Group>
            <Form.Group size="lg"  controlId="rulesLink">
                <Form.Label>Lien règles du jeu</Form.Label>
                <Form.Control autoFocus value={rulesLink} type="url" onChange={(e) => setRulesLink(e.target.value)} />
            </Form.Group>
            <Form.Group size="lg"  controlId="gameTypeId">
                <Form.Label>Type de jeux</Form.Label>
                <Form.Control autoFocus value={gameTypeId} as="select" onChange={(e) => setGameTypeId(e.target.value)} >

                {gameTypeList.map((object,i) =><option value={gameTypeList[i].typJ_id}>{gameTypeList[i].typJ_libelle} </option> )}
                </Form.Control>
            </Form.Group>
            <Form.Group size="lg"  controlId="companyId">
                <Form.Label>Éditeur</Form.Label>
                <Form.Control autoFocus value={companyId} as="select" onChange={(e) => setCompanyId(e.target.value)} >
                    {editeursList.map((object,i) =><option value={editeursList[i].soc_id}>{editeursList[i].soc_nom} </option> )}
                </Form.Control>
            </Form.Group>

            <p>* Champ obligatoire</p>
            <div className="form-group">
                <Button id="btn-formGame" block size="lg" type="submit" disabled={!validateForm()}>
                    Submit
                </Button>
            </div>

        </Form>
    );
};
export default FormJeu;
