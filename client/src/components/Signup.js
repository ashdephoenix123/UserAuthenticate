import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
//useHistory is replaced with useNavigate

const Signup = (props) => {
    const { setProgress } = props
    const navigate = useNavigate();
    const [display, setDisplay] = useState({
        status: false,
        code: 0,
        message: ""
    })
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        work: "",
        password: "",
        cpassword: ""
    })

    const registerUser = (e) => {
        const { name, value } = e.target;

        setUser((prevValue) => {
            return ({
                ...prevValue,
                [name]: value
            })
        })
    }

    const sendData = async (e) => {
        e.preventDefault();

        const { name, email, phone, work, password, cpassword } = user;
        setProgress(30)
        const res = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ name, email, phone, work, password, cpassword })
        })
        setProgress(70)
        const data = await res.json();
        setProgress(100)
        setDisplay({
            status: true,
            code: res.status,
            message: data.message
        })
        setTimeout(() => {
            setDisplay({
                status: false,
                code: 0,
                message: ""
            })
        }, 2000)

        if (res.status === 422 || !data) {
            // console.log(data.message)
        } else {
            setTimeout(() => {
                navigate('/login');
            }, 2000)
        }

    }

    useEffect(() => {
        setProgress(100)
    }, [setProgress])

    return (
        <>
            <h2 className='form-title center-inline mt-2'>Sign Up</h2>
            <form method='POST' className='w-25 mt-5 center' onSubmit={sendData}>
                <div className="form-group">
                    <input onChange={registerUser} type="text" value={user.name} name="name" className="form-control" autoComplete='off' placeholder="Enter Name" />
                </div>
                <div className="form-group mt-2">
                    <input onChange={registerUser} type="email" value={user.email} name="email" className="form-control" autoComplete='off' placeholder="Enter Email" />
                </div>
                <div className="form-group mt-2">
                    <input onChange={registerUser} type="number" value={user.phone} name="phone" className="form-control" inputMode='numeric' autoComplete='off' placeholder="Mobile Number" />
                </div>
                <div className="form-group mt-2">
                    <input onChange={registerUser} type="text" value={user.work} name="work" className="form-control" autoComplete='off' placeholder="Your Profession" />
                </div>
                <div className="form-group mt-2">
                    <input onChange={registerUser} type="password" value={user.password} name="password" className="form-control" autoComplete='off' placeholder="Password" />
                </div>
                <div className="form-group mt-2">
                    <input onChange={registerUser} type="password" value={user.cpassword} name="cpassword" className="form-control" autoComplete='off' placeholder="Confirm your Password" />
                </div>
                <div className='center-inline'>
                    <button type="submit" className="btn btn-primary mt-4">Sign Up</button>
                </div>
            </form>
            <div className="d-flex justify-content-center mt-4">

                <NavLink to="/login" className="links">I already have an account</NavLink>
                <br />
            </div>
            <div className="container d-flex justify-content-center text-center p-3">
                {display.status && <div className="alert alert-secondary w-25" role="alert">
                    {display.message}
                </div>}
            </div>
        </>
    )
}

export default Signup
// center-inline