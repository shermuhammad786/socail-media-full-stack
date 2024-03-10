// import { SignUp } from "./singup/singup";
import "./app.css"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./Pages/HomePage/HomePage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import { SignUpForm } from "./Pages/SignUpPage/SignUp"
import { LoginPage } from "./Pages/LoginPage/Login";
import { Routes, Route } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";



function App() {


  const [userProfilePic, setUserProfilePic] = useState()
  const gettingData = useMemo(async () => {
    const { data } = await axios.get(`http://localhost:8000/auth/user/${localStorage.getItem("user")}`)
    
    setUserProfilePic(data.user)

  }, [setUserProfilePic]
  )
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/home" element={<HomePage userProfilePic={userProfilePic} />} />
        <Route path="/profilepage" element={<ProfilePage
          userProfilePic={userProfilePic}
          setUserProfilePic={setUserProfilePic}
        />} />
      </Routes>
    </div>
  );
}

export default App;

