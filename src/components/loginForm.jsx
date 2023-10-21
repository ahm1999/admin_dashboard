import { useState } from "react";
import SERVER_DOMAIN from "./pages/server";
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form'
import { Container } from "react-bootstrap";
export default function LogInForm(props) {
    
const [formEmail,setFormEmail] = useState('') 
const [formPassword,setFormPassword] = useState('') 
/* const [errorMassege,setErrorMassege] = useState('') */
const submitHandler = async (e)=>{
    e.preventDefault()
    //console.log(formEmail,formPassword);
    let body = await fetch(SERVER_DOMAIN()+"/auth/adminLogIn",{
        method: "POST", // or 'PUT'
         headers: {
        "Content-Type": "application/json",
      } ,
        body:JSON.stringify({
        email:formEmail
        ,password:formPassword
        })
    })
    let response =  await body.json()

    if (response.success === false){
       /*  setErrorMassege(body.message) */
        return
    }
    if(response.status ==="logged in"){
        
        props.setLoggedin({loggedin : true})
        localStorage.setItem("jwt token",response.loginToken)
    }
   /*  console.log(e);
    props.setLoggedin({loggedin : true}) */
    
}
const emailHandler = e =>{
    setFormEmail(e.target.value)
}

const passwordHandler = e =>{
    setFormPassword(e.target.value)
}
    return(
       
        <>
        {/* {()=>{if (errorMassege !== undefined){
           return <div>error :{errorMassege}</div>
        }}} */}
        <div className="center">
        <Container  >
        <Form onSubmit={submitHandler } action={SERVER_DOMAIN()+"/auth/adminLogIn"} method="post">
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label htmlFor="email">email</Form.Label>
            <input  className="form-control" onChange={emailHandler} type="text" name="email" id="email" />
            <br />
            </Form.Group>
            <Form.Label htmlFor="password">password</Form.Label>
            <input className="form-control" onChange={passwordHandler} type="password" name="password" id="password" />
            <br />
            <button className="btn btn-primary" type="submit">Log in</button>
            
        </Form>
        </Container>
        </div>
        </>
    )
    
}
LogInForm.propTypes = {
    setLoggedin: PropTypes.func
}