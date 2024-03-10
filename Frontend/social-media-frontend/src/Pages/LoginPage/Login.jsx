import React, { useEffect, useState } from 'react'
import "./login.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export function LoginPage() {
    const navigate = useNavigate()





    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    useEffect(() => {
        const getUserFromLocalStorage = localStorage.getItem("user");
        if (getUserFromLocalStorage === "false") {
            navigate("/login")
        } else {
            navigate("/home")
        }

    }, [])


    const LoginHanler = async () => {
        if (!email || !password) return alert("Please Fill All The Fields")

        try {
            const loginUser = {
                email: email,
                password: password,
            }
            const Login_API = "http://localhost:8000/auth/login";
            const { data } = await axios.post(Login_API, loginUser)
            if (data.status) {
                localStorage.setItem("user", data.user._id)
                alert(data.message)
                navigate("/home")
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.log(error)
        }

    }
    const signUpPage = () => {
        navigate("/signup")
    }
    return (
        <div className='flex justify-around items-center w-screen h-screen'>
            <div className='w-1/2 p-4 font-extrabold'>
                <h1 className='text-amber-700 text-4xl'>This Is My Social Media Application Which Is Ready To Use</h1>
            </div>

            <div className='signUpFrom p-4 w-5/12'>
                <h1 className='mb-12'>LOGIN FORM</h1>
                <div>

                    <TextField onChange={e => setEmail(e.target.value)} required fullWidth label="Enter Your Email" id="fullWidth" />
                    <TextField onChange={e => setPassword(e.target.value)} required fullWidth label="Enter Your Password" id="fullWidth" />

                </div>
                <div>
                    <Button onClick={LoginHanler} variant="contained" size="large" fullWidth={true} color="success" disableElevation>
                        Login
                    </Button>
                </div>
                <div style={{ textAlign: "center", padding: "10px" }}>
                    <span>New Registration &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Button onClick={signUpPage} variant="contained" color="success" disableElevation>
                        SignUp
                    </Button>
                </div>
            </div>

            <h1 className='absolute bottom-40 left-20 text-amber-700 text-4xl'>Delveloper Hafiz SM Abro</h1>
        </div>
    )
}
