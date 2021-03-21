import {isLogin} from "../utils/utils";
import {Route, Redirect} from "react-router-dom";

const PrivateRoute = ({component: Component, ...rest}) => {

    return (
        <Route {...rest} render={props => {

            const redirection = {
                pathname: "/login",
                state: {
                    from: props.location
                }
            }
            return !isLogin() ? <Redirect to={redirection}/> : <Component {...props}/>
        }}/>
    )
}

export default PrivateRoute
