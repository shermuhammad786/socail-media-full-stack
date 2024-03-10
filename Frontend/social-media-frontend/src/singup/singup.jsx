// import axios from 'axios';
// import React, { useState } from 'react';
// import './signup.css';
// import { useNavigate } from 'react-router-dom';
// import { Email, Lock, Person } from '@mui/icons-material';
// import dotenv from "dotenv";
// import { Login } from '../login/login';
// dotenv.config();


// export function SignUp() {

//     const navigate = useNavigate();
//     const [errors, setErrors] = useState('')

//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//     });

//     const handleChange = (e) => {
//         setErrors("")
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async () => {
//         try {
//             const response = await axios.post(process.env.Singup_API, formData);
//             console.log(response)
//             if (response.data.status) {
//                 alert(response.data.message)
//                 navigate(Login)
//             } else {
//                 let firstWord = response.data.message.split(' ')[0];
//                 setErrors(firstWord)
//             }
//         } catch (error) {
//             alert(error.message);
//         }
//     };
//     return (
//         <div className="singupMainContainer">
//             <div className="SignUpContainer">
//                 <Person />
//                 <input
//                     type="text"
//                     name="username"
//                     placeholder="Username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     className="SignUpInput"
//                 />
//                 <p className='showError' >{errors === "Username" ? "Username is already exists" : ""} </p>
//                 <Email />
//                 <input
//                     type="text"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="SignUpInput"
//                 />
//                 <p className='showError' >{errors === "Email" ? "Email is already exists" : ""} </p>
//                 <Lock />
//                 <input
//                     type="text"
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="SignUpInput"
//                 />

//                 <button onClick={handleSubmit} className="SignUpButton">
//                     Sign Up
//                 </button>
//             </div>
//         </div>
//     );
// }
