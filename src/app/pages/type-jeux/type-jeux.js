import React, {useEffect, useState, useMemo} from "react";
import Axios from "axios"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShapes} from "@fortawesome/free-solid-svg-icons";
import TableContainer from "../../components/tables/TableContainer";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import {Container} from "../../components/ModalForm/container";
import FormType from './formType';

const TypeJeu = () => {

    const [gameTypeList, setGameTypeList] = useState([]);
    const [show, setShow] = useState(false)


    useEffect(() => {
        //Récupérer tous les types
        Axios.get("http://localhost:3000/server/typeJeu/all")
            .then((res) => {
                setGameTypeList(res.data)
            })
    }, [])


    const onSubmit = (event) => {
        //Ne pas oublier cette ligne!!!
        event.preventDefault(event);

        Axios.post("http://localhost:3000/server/typeJeu/add", {
            libelle: event.target.libelle.value
        }).then((res) => {
            //afficher alert succes
            setShow(true);
        })

    }

    const updateType = (rowIndex, data, value) => {
        const typJ_id = data[rowIndex].typJ_id
        Axios.post(`http://localhost:3000/server/typeJeu/${typJ_id}/update`,{
            libelle: value,
        })
    }

    const columns = useMemo ( () => [
        {
            Header: 'Type de jeu',
            accessor: 'typJ_libelle',
            Cell: row => {
                return (
                    <Form.Control autoFocus  defaultValue={row.value}
                                  onChange={(e) => updateType(parseInt(row.row.id), row.data, e.target.value)}/>

                )
            },
        }
    ], [gameTypeList])

    return(
        <>
            <div id="titlePageJeux">
                <h1>
                    <FontAwesomeIcon className="faicon" icon={faShapes}/>
                    Type de jeux</h1>
            </div>
            <Alert id="alertSucces" variant="success" show={show}>
                Le type a été crée avec succès!
            </Alert>
            <div id="btnNewJeu">
                <Container triggerText="Créer un nouveau type" onSubmit={onSubmit} component={FormType}/>
            </div>
            <div style={{marginTop: `50px`}}>
                <TableContainer columns={columns} data={gameTypeList}/>
            </div>
        </>
    )
}
export default TypeJeu