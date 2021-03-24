import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import {CardBody, CardTitle} from "reactstrap";

const CardFestival = (fes) => {
    //const [fes_date, setDate] = useState("");

    return (
        <Card className="card">
            <CardBody>
                <CardTitle>
                    <strong>Festival du {fes.fes.fes_date}</strong>
                </CardTitle>
            </CardBody>
        </Card>
    );
}

export default CardFestival;

/* pour des boutons par exemple
    <CardActions>
            </CardActions>

    <Card className={classes.root}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Festival du {fes_date}
                </Typography>
            </CardContent>
        </Card>
 */