import React, { useEffect, useState } from 'react'
import logo from '../images/photo.jpg'
import { NavLink, useNavigate } from "react-router-dom"

const About = (props) => {
    const { setProgress } = props;
    const [isLoaded, setIsLoaded] = useState(false)

    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        _id: "",
        name: "",
        email: "",
        phone: "",
        work: ""
    })

    useEffect(() => {
        const callAboutPage = async () => {
            try {
                setProgress(10)
                const res = await fetch('https://backend-jyr1.onrender.com/about', {
                    method: 'GET',
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                })
                setProgress(30)
                const data = await res.json();
                setProgress(100)

                if (res.status !== 200) {
                    const error = new Error(res.error)
                    throw error;
                }
                setUserData(data)
                setIsLoaded(true)
                
            } catch (error) {
                // console.log(error);
                navigate('/login')
            }
        }
        callAboutPage();
    }, [navigate, setProgress]);
    return (
        <>
            {isLoaded &&
                <div className='center-inline mt-5'>
                    <form method='GET'>
                        <div className="card w-25 center stylingit">
                            <img src={logo} className="card-img-top imagehere center mt-4 mb-2" alt="img" />
                            <div className="card-body">
                                <h5 className="card-title">User Details</h5>
                                <p className="card-text">
                                    Id: {userData._id} <br />
                                    Name: {userData.name} <br />
                                    Email: {userData.email} <br />
                                    Phone: {userData.phone} <br />
                                    Profession: {userData.work}


                                </p>

                                <NavLink to="#" className="btn btn-primary">Edit</NavLink>
                            </div>
                        </div>
                    </form>
                </div>}
        </>
    )
}

export default About