import axios from "axios";
import AuthForm from "./AuthForm";
import { authenticationResponse, userCredentials } from "./auth.models";
import { urlAccounts } from "../endpoints";
import { useState, useContext } from "react";
import { getClaims, saveToken } from "./handleJWT";
import AuthenticationContext from "./AuthenticationContext";
import { useHistory } from "react-router";

export default function Login(){

    const[errors, setErrors]=useState<string[]>([]);
    const {update} = useContext(AuthenticationContext);
    const history= useHistory();

    async function login(credentials: userCredentials) {
        try{
            setErrors([]);
            const response = await axios
            .post<authenticationResponse>(`${urlAccounts}/login`, credentials);
            saveToken(response.data);
            update(getClaims());
            history.push('/');
        }
        catch(error: any){
            setErrors(error.response.data);
        }
    }
    return(
        <>
            <h3>Login</h3>

            <AuthForm model={{email:'', password:''}}
            onSubmit={async values => await login(values)}
            />
        </>
    )
}