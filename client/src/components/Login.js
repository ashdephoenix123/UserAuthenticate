import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../App';

const Login = (props) => {
    const {setProgress} = props
    const [display, setDisplay] = useState({
        status: false,
        message: ""
    })
    const {dispatch} = useContext(UserContext);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const check = (e) => {
        const { name, value } = e.target;

        setUser((prev) => {
            return ({
                ...prev,
                [name]: value
            })
        })
    }

    const sendData = async (e)=> {
        e.preventDefault();

        const {email, password} = user;
        setProgress(30)
        const res = await fetch('/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        setProgress(70)
        const data = await res.json();
        setProgress(100)


        if(res.status === 400 || res.status === 404 || !data){
            setDisplay({
                status: true,
                message: data.message
            })
            setTimeout(()=> {
                setDisplay({
                    status: false,
                    message: ""
                }) 
            }, 2000)
            // console.log("Login Failed", data);
        } else {
            
            dispatch({type: 'USER', payload: true})
            // console.log(data.message)
            // console.log("Login Successful", data)
            navigate('/', {replace: true});
        }
    }

    useEffect(()=> {
        setProgress(100)
    },[setProgress])

    return (
        <>
            <h2 className='form-title center-inline mt-2'>Log In</h2>
            <form className='w-25 mt-5 center' method="POST">

                <div className="form-group mt-2">
                    <input type="email" name="email" onChange={check} value={user.email} className="form-control" autoComplete='off' placeholder="Enter Email" />
                </div>

                <div className="form-group mt-2">
                    <input type="password" name="password" onChange={check} value={user.password} className="form-control" autoComplete='off' placeholder="Password" />
                </div>

                <div className='center-inline'>
                    <button type="submit" onClick={sendData} className="btn btn-primary mt-4 ">Log in</button>
                </div>
            </form>
            
            <div className="center-inline mt-4">
                <NavLink to="/signup" className="links">Create a new Account</NavLink><br />
                {/* <div className='p-3'>{display}</div> */}
            </div>
            <div className="container d-flex justify-content-center text-center p-3">
                {display.status && <div className="alert alert-danger w-25" role="alert">
                    {display.message}
                </div>}
            </div>
        </>
    )
}

export default Login