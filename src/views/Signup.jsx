import { Link } from "react-router-dom"
import { useRef , useState} from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const { setUser, setToken } = useStateContext()
    const [error, seterror] = useState(null);
    const onSubmit = (e) => {
        
        e.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        axiosClient.post('/signup', payload)
            .then(({ data }) => {

                
                setUser(data.user)
                setToken(data.token)
            }).catch(error => {
                const response = error.response;
                if (response && response.status == 422) {
                    seterror(response.data.errors)
                } 
            })
        
    }
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form action="" onSubmit={onSubmit}>
                    <h1 className="title">Signup for free</h1>
                    {
                        error && <div className="alert">
                            {Object.keys(error).map(key => (
                                <p key={key}>{error[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input ref={nameRef} type="text" placeholder="Full Name"/>
                    <input ref={emailRef} type="email" placeholder="Email Adress"/>
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation" />
                    <button className="btn btn-block">Sign Up</button>
                    <p className="message">
                       Already Registred? <Link to="/login">Sign in</Link>
                    </p>
                </form> 
            </div>
        </div>
    )
}