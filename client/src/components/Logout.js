import {  useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App';

const Logout = () => {
    const {dispatch} = useContext(UserContext)
    const navigate = useNavigate();

    const implementLogout = async () => {
        try {
            const response = await fetch('https://backend-jyr1.onrender.com/logout', {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            // const data = await response.json();

            if (response.status !== 200) {
                console.log('logout failed')
                throw new Error("Logout failed!")
            } else {
                dispatch({type: 'USER', payload: false})
                console.log('logout success')
                navigate('/login', {replace: true})
             }


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        implementLogout();
    })
   
}

export default Logout;