import { Link } from "react-router-dom"
import { useState, useRef } from "react"
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
export default function Login() {
    const [error, seterror] = useState();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = useStateContext()
    
    const onSubmit = (e) => {
        e.preventDefault()
         const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        seterror(null);
        axiosClient.post('/login', payload)
            .then(({ data }) => {
                setUser(data.user)
                setToken(data.token)
            }).catch(error => {
                const response = error.response;
                if (response && response.status == 422) {
                    if (response.data.errors) {
                        seterror(response.data.errors)
                    } else{seterror({
                            email:[response.data.message]
                        })
                    }
                } 
            })
        
    
    }
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form action="" onSubmit={onSubmit}>
                    <h1 className="title">Login into your account</h1>
                    {
                        error && <div className="alert">
                            {Object.keys(error).map(key => (
                                <p key={key}>{error[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input ref={emailRef} type="email" placeholder="Email"/>
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registred? <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}