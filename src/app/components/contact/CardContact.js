import {CardBody, CardText} from "reactstrap";

const CardContact = (contact, ...res) => {

    const {
        co_nom,
        co_prenom,
        co_telPortable,
        co_telFixe,
        co_principal
    } = contact.props

    return (
        <div>
                <CardText style={{color: co_principal ? "red" : "default"}}>
                    {co_nom.toUpperCase()} {co_prenom}
                    <br/>
                    <span style={{marginRight: '1rem'}}>
                    Portable : {co_telPortable}
                </span>
                    <span>
                    Fixe : {co_telFixe}
                </span>
                </CardText>
        </div>
    );
}

export default CardContact;
