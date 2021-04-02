import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import './reservationForm.css'
import Table from "react-bootstrap/Table"


export const FormReservation = ({onSubmit}) => {
    const [localisations, setLocalisations] = useState([]);

//récupérer toutes les localisations
    useEffect(() => {
        const fes_id = localStorage.getItem("currentFestival");
        Axios.get(`/server/localisation/allDetails/${fes_id}`)
            .then((res) => {
                setLocalisations(res.data)
                console.log("LOCALISATIONS", res.data)
            })

    }, []);


    return (
        <Form onSubmit={onSubmit}>

            <div className="form-group">
                <h4 id="titleGameForm">Nouvelle réservation</h4>

                {
                    localisations ?
                        localisations.map((value, index) => {
                            return (
                                <div id="loc">
                                    <Table>
                                        <tr>
                                            <td>
                                                <Form.Group size="lg"  controlId="loc_id" >
                                                    <text value={value.loc_id}>{value.loc_libelle}</text>

                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group size="lg"  controlId="esp_qte" >
                                                     <input type="number"
                                                                min="0"
                                                                defaultValue="0"
                                                    />
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Control autoFocus  as="select" controlId="esp_enTables"
                                                              defaultValue={true}
                                                >
                                                    <option value={true}>Tables </option>
                                                    <option value={false}>M²</option>
                                                </Form.Control>
                                            </td>
                                        </tr>
                                    </Table>



                                </div>
                            )
                        })
                        :
                        <div>Y a un problème Arthur, ton festival n'a pas de localisations ..</div>
                }


                <Button id="btn-formGame" block size="lg" type="submit" >
                    Valider
                </Button>
            </div>
        </Form>
    );
};

export default FormReservation