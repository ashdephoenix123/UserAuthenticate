import React, { useEffect, useState } from 'react'

const Contact = (props) => {
    const { setProgress } = props;
    const [isLoaded, setIsLoaded] = useState(false)
    const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });
    const [display, setDisplay] = useState({
        status: false,
        code: 0,
        message: ""
    })

    const callContactPage = async () => {
        try {
            const res = await fetch('https://backend-jyr1.onrender.com/getData', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json();
            setUserData((prevValue) => {
                return ({
                    ...prevValue,
                    name: data.name,
                    email: data.email,
                    phone: data.phone
                })
            })
            setIsLoaded(true)

            // if (res.status !== 200) { throw new Error(res.error) }

        } catch (error) {
            console.log(error)
        }
    }

    const saveMessage = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => {
            return ({
                ...prev,
                [name]: value
            })
        })
    }

    const sendMessage = async (e) => {
        e.preventDefault();

        const { name, email, phone, message } = userData;

        const response = await fetch('/contact', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                message: message
            })
        })

        const data = await response.json();
        setDisplay({
            status: true,
            code: response.status,
            message: data.message
        })
        setTimeout(() => {
            setDisplay({
                status: false,
                code: 0,
                message: ""
            })
        }, 2000)

        if (!data) {
            // console.log("Message not posted");
        } else {
            // console.log("Message sent successfully")
            setUserData({ ...userData, message: "" });
        }

    }

    useEffect(() => {
        setProgress(30)
        callContactPage();
        setProgress(100)
    }, [setProgress])
    return (
        <>
            {isLoaded &&
                <div>
                    <h2 className='form-title center-inline mt-2'>Get In Touch</h2>
                    <form className='w-50 mt-5 center' onSubmit={sendMessage} method="POST">

                        <div className="form-group inlineit">
                            <input type="text" onChange={saveMessage} name="name" value={userData.name} className="form-control mr" autoComplete='off' placeholder="Your Name" />
                            <input type="email" onChange={saveMessage} name="email" value={userData.email} className="form-control mr" placeholder="Your Email" />
                            <input type="number" onChange={saveMessage} name="phone" value={userData.phone} className="form-control mr" inputMode='numeric' autoComplete='off' placeholder="Your Mobile Number" />


                        </div>

                        <div className="form-group mt-2">
                            {/* <input type="number" name="phone" className="form-control" inputmode='numeric' autoComplete='off' placeholder="Your Mobile Number" /> */}
                            <textarea name="message" onChange={saveMessage} value={userData.message} className="form-control" rows="10" autoComplete='off' placeholder="Your Message" ></textarea>
                        </div>

                        <div className='center-inline'>
                            <button type="submit" className="btn btn-primary mt-4 ">Send Message</button>
                        </div>
                    </form>
                    <div className="container d-flex justify-content-center text-center p-3 mt-3">
                        {display.status && <div className="alert alert-secondary w-25" role="alert">
                            {display.message}
                        </div>}
                    </div>
                </div>
            }

        </>
    )
}

export default Contact