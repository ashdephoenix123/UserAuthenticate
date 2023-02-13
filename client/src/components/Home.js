import React, { useEffect, useState } from 'react'

const Home = (props) => {
    const { setProgress } = props
    const [isloaded, setIsLoaded] = useState(false)
    const [userData, setUserData] = useState('')
    const [isLoggedIn, setIsLoggedin] = useState(false)

    useEffect(() => {
        const userInfo = async () => {
            try {
                const response = await fetch('/getData', {
                    method: "GET",
                    header: {
                        "Content-Type": "application/json"
                    }
                })
    
                const data = await response.json();
                
                if (response.status === 200) {
                    setUserData(data.name)
                    setIsLoggedin(true)
                }
                setIsLoaded(true)
    
            } catch (error) {
                console.log(error)
            }
        }
        userInfo();
        setProgress(100)
    }, [setProgress])

    return (
        <>
            {isloaded &&
                <div className="mt-4 p-5 bg-primary text-white rounded">
                    <h3 className="ftwt-400">Welcome {userData}</h3>
                    <h1>{isLoggedIn ? 'Happy to see you back!' : 'We are the MERN Developers'}</h1>
                </div>
            }
        </>
    )
}

export default Home;