import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    setUser: () => { },
    setToken: () => { },
    setnotification:()=>{}
})

export const ContextProvider = ({ children }) => {
    const [notification , _setnotification]=useState('')
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"))
    const setnotification = (message) => {
        _setnotification(message);
        setTimeout(() => {
            _setnotification("")
        }, 5000);
    }
    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token)
        } else {
            localStorage.removeItem("ACCESS_TOKEN")
        }
    }
    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            notification,
            setnotification
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
