import React, {useEffect, useState, useMemo, useContext} from "react";
import Card from "@material-ui/core/Card";
import {CardBody, CardText, CardTitle} from "reactstrap";
import Axios from "axios";
import Moment from "moment";
import FormLocalisation from "./FormLocalisation";
import {Container} from "../ModalForm/container";
import "./CardFestival.css";
import Alert from "react-bootstrap/Alert";
import SimpleTableContainer from "../../components/tables/SimpleTableContainer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {FestivalContext} from "../../../App";
import {isAdmin, isLogin} from "../../utils/utils";
import Table from "react-bootstrap/Table";


const CardFestival = ({fes, updateDate}) => {

    const [festivalDate, setDate] = useState(fes.fes_date)
    const [localisationList, setLocalList] = useState([])
    const [show, setShow] = useState(false) // for the form of the localisation
    const {selectedFestival, setSelectedFestival} = useContext(FestivalContext)

    const [espaces, setEspaces] = useState([]);

    useEffect(() => {
        // Get details for the festivals
        Axios.get(`/server/localisation/allDetails/${fes.fes_id}`)
            .then((res) => {
                setLocalList(res.data)
            })
    }, []);

    useEffect(() => {
        // Get all the espaces with a fes_id (need reservation table)
        Axios.get(`/server/espaces/getAll/${fes.fes_id}/`)
            .then((res) => {
                setEspaces(res.data)
            })
    }, []);

    const changeDate = event => {
        updateDate(fes.fes_id, event.target.value) // update in the database
        setDate(event.target.value) // update the value of the input calendar
    }

    /*
    const changeNbTables = event => {
        updateNbTables(fes.fes_id, event.target.value)
    }
     */

    const updateCurrentFestival = event => {
        localStorage.setItem("currentFestival", fes.fes_id)
        setSelectedFestival(fes);
    }

    /**
     * Method called when the form is validated
     * @param event
     */
    const onSubmit = (event) => {

        event.preventDefault(event);
        //get the information of the form
        console.log("front lib :", event.target.loc_libelle.value);
        console.log("front id : ", fes.fes_id);


        Axios.post(`/server/localisation/add/${fes.fes_id}`, {
            loc_libelle: event.target.loc_libelle.value,
            loc_prixTable: event.target.loc_prixTable.value,
            loc_prixM2: event.target.loc_prixM2.value
        }).then((res) => {
            // to show the success with an alert
            setShow(true);
        })

        window.location.reload(true)
    }

    /**
     * Method to update the unit price of the table
     * @param rowIndex
     * @param data
     * @param value
     */
    function updatePriceTable(rowIndex, data, value) {
        const loc_id = data[rowIndex].loc_id;
        Axios.put("/server/localisation/updatePriceTable/", {
            loc_id: loc_id,
            new_priceTable: value
        });
    }

    /**
     * Method to update the price of m²
     * @param rowIndex
     * @param data
     * @param value
     */
    function updatePriceM2(rowIndex, data, value) {
        const loc_id = data[rowIndex].loc_id;
        Axios.put("/server/localisation/updatePriceM2/", {
            loc_id: loc_id,
            new_priceM2: value
        });
    }


    //(e.esp_id,event.target.value)}
    const updateQteEspace = (id, qte) => {
        Axios.put("/server/espace/updateQte", {
            esp_id: id,
            esp_qte: qte
        })

    }

    const updateEnTables = (id, value) => {
        console.log("ID", id)
        console.log("VALUUE", value)
        Axios.put("/server/espace/updateEnTables", {
            esp_id: id,
            esp_enTables: value
        })
    }

    const CalculerPrix = (e) => {

        if (e.esp_enTables) {
            return e.loc_prixTable * e.esp_qte
        } else {
            return e.loc_prixM2 * e.esp_qte
        }

    }

    const CalculerPrixTOT = () => {
        let prix = 0
        espaces.map((e, i) => {
            console.log(e)
            if (e.esp_enTables) {
                prix += e.loc_prixTable * e.esp_qte
            } else {
                prix += e.loc_prixM2 * e.esp_qte
            }


        })
        return prix
    }

    const columns = useMemo(() => [
        {
            Header: "Nom",
            accessor: "loc_libelle"
        }, {
            Header: "Prix table",
            accessor: "loc_prixTable",

            Cell: row => {
                return (
                    <Form.Control
                        autoFocus
                        type="text"
                        min="0"
                        defaultValue={row.value}
                        onChange={(e) => updatePriceTable(row.row.id, row.data, e.target.value)}
                    />
                )
            }
        }, {
            Header: "Prix m²",
            accessor: "loc_prixM2",

            Cell: row => {
                return (
                    <Form.Control
                        autoFocus
                        type="text"
                        min="0"
                        defaultValue={row.value}
                        onChange={(e) => updatePriceM2(row.row.id, row.data, e.target.value)}
                    />
                )
            }
        }
    ], [localisationList])


    return (
        <div>
            <Alert id="alertSucces" variant="success" show={show}>
                Espace créé avec succès!
            </Alert>
            <Card className="card">
                <CardBody>
                    <CardTitle>
                        <strong>Festival du {Moment(festivalDate).format('DD/MM/YYYY')}</strong>
                    </CardTitle>
                    <CardText>
                        <Button block size="lg" type="submit" onClick={updateCurrentFestival}>
                            Définir en tant que festival courant
                        </Button>
                    </CardText>
                    {isAdmin() ? // user has to be logged to access to this page festivals
                        <CardText>
                            Date
                            <input type={'date'}
                                   className="inputCss"
                                   value={festivalDate}
                                   onChange={changeDate}
                            />
                        </CardText>
                        : null}
                    {isAdmin() ?

                        /*
                        <Card.Body>
                            <div>
                                <Table responsive>
                                    <thead>
                                    <td className="tdUnderline"></td>
                                    <td className="tdUnderline"></td>
                                    <td className="tdUnderline"></td>
                                    <td className="tdUnderline">Prix calculé</td>
                                    </thead>
                                    <tbody>
                                    {espaces.map((e, i) => {
                                        return (
                                            <tr>
                                                <td className="tdUnderline">{e.localisation.loc_libelle}</td>
                                                <td className="tdUnderline">

                                                    <input
                                                        type="number"
                                                        defaultValue={e.esp_qte}
                                                        style={{width: 'auto'}}
                                                        onChange={(event) => updateQteEspace(e.esp_id, event.target.value)}
                                                    />

                                                </td>
                                                <td className="tdUnderline">
                                                    <Form.Control
                                                        style={{width: 'auto'}}
                                                        as="select"
                                                        onChange={(event) => updateEnTables(e.esp_id, event.target.value ? 1 : 0)}>

                                                        {console.log("[00000]", e)}
                                                        <option selected={e.esp_enTables} value={true}
                                                                key={e.esp_enTables}>tables
                                                        </option>
                                                        <option selected={e.esp_enTables} value={false}
                                                                key={e.esp_enTables}>M²
                                                        </option>
                                                    </Form.Control>
                                                </td>
                                                <td className="tdUnderline">{CalculerPrix(e)}</td>
                                            </tr>
                                        )
                                    })
                                    }

                                    <tr>
                                        <td>Prix TOTAL calculé</td>
                                        <td></td>
                                        <td></td>
                                        <td>{CalculerPrixTOT()} €</td>
                                    </tr>
                                    {/*<tr id="prixNego">
                                        <td>Prix TOTAL négocié</td>
                                        <td>
                                            <input
                                                id="prixNego"
                                                type="number"
                                                step={".01"}
                                                defaultValue={reservation.res_prixNegocie}
                                                onChange={(event) => updatePrixNegocie(event.target.value)}
                                            />€
                                        </td>


                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>*/



                        <div className="tableLocalisation">
                            <SimpleTableContainer columns={columns} data={localisationList}/>
                        </div>

                        :null}

                    {isAdmin() ?
                        <Container triggerText="Créer un nouvel espace" onSubmit={onSubmit}
                                   component={FormLocalisation}/>
                        : null}
                </CardBody>
            </Card>

        </div>
    );
}

export default CardFestival;
