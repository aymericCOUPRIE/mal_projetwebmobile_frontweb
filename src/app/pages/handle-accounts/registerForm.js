import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";


export const RegisterForm = ({ onSubmit }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [estAdmin, setEstAdmin] = useState(false);

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }


    return(

        <Form onSubmit={onSubmit}>
            <h4 id="titleGameForm"> Créer un compte</h4>

            <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    autoFocus
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Form.Group size="lg" controlId="role">
                <Form.Check inline label="admin"  value={estAdmin} onChange={(e)=> setEstAdmin(e.target.checked)} />
                <p>*Si cette case n'est pas coché, ce sera un compte organisateur.</p>
            </Form.Group>
            <div className="form-group">
            <Button id="btn-valider" block size="lg" type="submit" disabled={!validateForm()}>
                Créer le compte
            </Button>
            </div>
        </Form>
    );
};
export default RegisterForm;