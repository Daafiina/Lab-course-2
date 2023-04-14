import { Redirect } from "react-router";

export default function RedirectToLandingPage(){
    return <Redirect to={{pathname: '/'}} />
}