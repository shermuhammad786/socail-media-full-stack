import React, { useEffect, useState } from 'react'
import "./SignUp.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from "axios"



export function SignUpForm() {

  const navigate = useNavigate()
  useEffect(() => {
    const getUserFromLocalStorage = localStorage.getItem("user");
    if (getUserFromLocalStorage === "false") {
      navigate("/signup")
    } else {
      navigate("/home")
    }

  }, [])

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cPassword, setCPassword] = useState("")
  const SignUpHandler = async () => {




    const apiUrl = "http://localhost:8000/auth/register";

    function isValidEmail(emailAdd) {
      // Regular expression for a simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      return emailRegex.test(emailAdd);
    }
    if (!isValidEmail(email)) return alert("Invalid Email Address")


    if (password !== cPassword) {
      alert("Password and Conform Password are not matched")
    } else {
      try {
        const user = {
          username: name,
          email: email,
          password: password,
          desc: "hey i am signed up"
        }
        const { data } = await axios.post(apiUrl, user);

        if (data.status) {
          alert(data.message)
          navigate("/login")
        } else {
          alert(data.message)
        }
      } catch (error) {
        console.error("Error during signup:", error);
      }
    }
  }
  const loginPage = () => {
    navigate("/login")
  }
  return (
    <div className='flex justify-evenly items-center w-screen h-screen'>
      <div className='w-5/12 p-4 font-extrabold'>
        <h1 className='text-amber-700 text-4xl'>This Is My Social Media Application Which Is Ready To Use</h1>
      </div>

      <div className='signUpFrom p-4 w-5/12'>
        <h1 className='mb-12'>SIGNUP FORM</h1>
        <div>
          <TextField onChange={e => setName(e.target.value)} required fullWidth label="Enter Your Name" id="fullWidth" />
          <TextField onChange={e => setEmail(e.target.value)} required fullWidth label="Enter Your Email" id="fullWidth" />
          <TextField onChange={e => setPassword(e.target.value)} required fullWidth label="Enter Your Password" id="fullWidth" />
          <TextField onChange={e => setCPassword(e.target.value)} required fullWidth label="Enter Conform Password" id="fullWidth" />
        </div>
        <div>
          <Button onClick={SignUpHandler} variant="contained" size="large" fullWidth={true} color="success" disableElevation>
            SignUp
          </Button>
        </div>
        <div style={{ textAlign: "center", padding: "10px" }}>
          <span>Aleady have an account &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <Button onClick={loginPage} variant="contained" color="success" disableElevation>
            Login
          </Button>
        </div>
      </div>
      <h1 className='absolute bottom-40 left-20 text-amber-700 text-4xl'>Delveloper Hafiz SM Abro</h1>
    </div>
  )
}
