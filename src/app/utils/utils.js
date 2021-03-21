import jwt_decode from "jwt-decode";
import jwt from "jsonwebtoken";

export function isAdmin() {
    const token = localStorage.getItem("userToken");
    return token ? jwt_decode(token).user_estAdmin : null;
}

export function isLogin() {
    const token = localStorage.getItem("userToken");
    if (token) {
        return jwt.verify(token, "secret", (err, decoded) => {
            return !err;
        })

    } else {
        return false
    }
}

export function email(){
    const token = localStorage.getItem("userToken");
    return token ? jwt_decode(token).user_email : null
}

