import React, {useEffect, useMemo, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

import './handle-accounts.css'
import Alert from "react-bootstrap/Alert";
import RegisterForm from "./registerForm"
import {Container} from "../../components/ModalForm/container";
import Axios from "axios";
import FormText from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"

import TableContainer from "../../components/tables/TableContainer";
import {SelectColumnFilter} from "../../components/tables/Filters";




export default function HandleAccounts(){
    const [errortext, setErrortext] = useState("");
    const [show, setShow] = useState(false)
    const [userList,setUserList] = useState([]);

    const onSubmit = (event) => {

        //Ne pas oublier cette ligne!!!
        event.preventDefault(event);


        Axios.post("http://localhost:3000/server/register", {
            //récupérer les valeurs du formulaire
            email: event.target.email.value,
            password : event.target.password.value,
            estAdmin : event.target.role.value,

        }).then((res) => {
            //afficher alert succes
                    if (res.data.success) {
                        //afficher message de réussite
                        console.log("compte crée")
                        setShow(true)
                    } else {
                        setErrortext(res.data.error);
                    }
        })
    };
    //méthode qui s'appelle au chargement de la page
    useEffect(() => {
        //Récupérer les infos de tous les users
        Axios.get("http://localhost:3000/server/allUsers")
            .then((res) => {
                setUserList(res.data);
            });

    }, []);



    const deleteUser = (data) => {

        Axios.delete(`http://localhost:3000/server/delete-profile/${data.user_email}`)
            .then(
                //userList.splice(userList.indexOf(data),1)
                window.location.reload(false)
            )



    }

    const columns = useMemo(() => [
        {
            Header: "User",
            accessor: "user_email"
        },
        {
            Header: "Admin",
            accessor: d => d.user_estAdmin != null ? d.user_estAdmin.toString() : null, //required cast from boolea to string

            disableSortBy: true,
            Filter: SelectColumnFilter,
            filter: 'equals',

        },
        {
            id: 'supprimer',

            Cell: row => {
                return (
                    <div>
                        <Button id="btndelete" onClick={(e) => deleteUser(row.row.original)}>Supprimer</Button>
                    </div>
                    )
            },


        }
        ], [userList])

    return (
        <>
            <div id="titlePageJeux">
                <h1>
                    <FontAwesomeIcon className="faicon" icon={faUser}/>
                    Gérer les comptes
                </h1>
            </div>
            <Alert id="alertSucces" variant="success" show={show}>
                Compté crée avec succès!
            </Alert>

            {/* equivalent du if/else */}
            {errortext !== "" ? (
                <FormText id="errorLabel">{errortext}</FormText>
            ) : null}
            <div id="btn-NewUser">
                <Container triggerText="Créer un nouveau compte" onSubmit={onSubmit} component={RegisterForm}/>
            </div>

            <div style={{marginTop: `50px`}}>
                <TableContainer columns={columns} data={userList}/>
            </div>


        </>
    );
}
