import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
export default function UserForm() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, seterror] = useState(null)
    const{setnotification}= useStateContext()
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const navigate=useNavigate()
    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`users/${id}`).then(({ data }) => {
                setLoading(false);
                setUser(data.data);
                console.log(data)
            }).catch(() => {
                setLoading(false);
            })
       },[])
   }
    
    const Submit = (e) => {
        e.preventDefault()
        if (user.id) {
            if (user.password && user.password_confirmation && user.password == user.password_confirmation) {
                axiosClient.put(`/users/${user.id}`, user).then(() => {
                    //notifi
                    setnotification("User was successfully updated");
                    navigate('/users')
                }).catch(err => {
                    const response = err.response;
                    if (response && response.status == 422) {
                        seterror(response.data.errors)
                    }
                })
            }
        } else {
            if (user.password && user.password_confirmation && user.password == user.password_confirmation) {
                axiosClient.post(`/users/`, user).then(() => {
                    //notifi
                    setnotification("User was successfully created");
                    navigate('/users');
                }).catch(err => {
                    const response = err.response;
                    if (response && response.status == 422) {
                        seterror(response.data.errors)
                    }
                })
            }
        } }

    return (
        <>
            {user.id && <h1>Update User : {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">Loading...</div>
                )}
                {error && <div className="alert">
                    {Object.keys(error).map(key => (
                        <p key={key}>{error[key][0]}</p>
                    ))}
                </div>}
                {!loading && 
                    <form onSubmit={Submit}>
                        <input type="text" placeholder="Name" value={user.name} onChange={e=>setUser({...user,name:e.target.value})}/>
                        <input type="email" placeholder="Email" value={user.email}onChange={e=>setUser({...user,email:e.target.value})}/>
                        <input type="password" placeholder="Password" onChange={e=>setUser({...user,password:e.target.value})}/>
                        <input type="password" placeholder="Password Confirmation" onChange={e => setUser({ ...user, password_confirmation: e.target.value })} />
                        <button className="btn">Save</button>
                   </form> 
                
                }
            </div>
        </>
    )
};