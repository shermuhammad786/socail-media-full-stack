import { Input } from "@mui/material"
import { Button } from "@mui/material"
import { Person, Message } from "@mui/icons-material";
import PropTypes from 'prop-types';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { CssTransition } from '@mui/base/Transitions';
import { PopupContext } from '@mui/base/Unstable_Popup';
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios";

export default function Navbar() {
    const [userProfilePic, setUserProfilePic] = useState()
    const [profile, setProfile] = useState("Profile")


    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {

        const gettingData = async () => {
            const { data } = await axios.get(`http://localhost:8000/auth/user/${localStorage.getItem("user")}`)
            setUserProfilePic(data.user)
        }
        gettingData()

        if (location.pathname === "/home") {
            setProfile("Profile")
        } else {
            setProfile("Home")
        }
    }, [location.pathname])

    const profilePage = () => {
        if (location.pathname === "/home") {
            navigate("/profilepage")
        } else if (location.pathname === "/profilepage") {
            navigate("/home")
        }
    }

    const logout = () => {
        alert("Loggin Out Successfully")
        localStorage.setItem("user", false);
        navigate("/login")
    }



    return (
        <header className="bg-indigo-600 flex items-center justify-center h-16 w-full px-4 border-b bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-850">
            {/* <Link className="mr-4" href="#"> */}
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only"></span>
            {/* </Link> */}
            <div className="flex-1 grid w-full max-w-md mx-auto items-center gap-4">
                <div className="flex items-center gap-2">
                    <SearchIcon className="h-4 w-4 opacity-25" />
                    <Input className="w-full sm:w-64" placeholder="Search" type="search" />
                </div>
            </div>
            <div className="flex gap-4">
                <p>Home </p>
                <p> Timeline</p>
            </div>
            <div className="flex items-center ml-auto space-x-4">
                <Button size="icon" variant="ghost">
                    <Person className="h-4 w-4" />
                    <span className="sr-only">Notifications</span>
                </Button>
                <Button size="icon" variant="ghost">
                    <Message className="h-4 w-4" />
                    <span className="sr-only">Notifications</span>
                </Button>
                <Button size="icon" variant="ghost">
                    <BellIcon className="h-4 w-4" />
                    <span className="sr-only">Notifications</span>
                </Button>
                <Button size="icon" variant="ghost">

                    <Dropdown>
                        <MenuButton>
                            <img
                                alt="Avatar"
                                className="rounded-full"
                                height="32"
                                src={userProfilePic?.profilePicture === "" ? "assests/userProfile.png" : userProfilePic?.profilePicture}
                                style={{
                                    aspectRatio: "32/32",
                                    objectFit: "cover",
                                }}
                                width="32"
                            />
                            <span className="sr-only"></span>
                        </MenuButton>
                        <Menu slots={{ listbox: AnimatedListbox }}>
                            <MenuItem onClick={profilePage}>{profile}</MenuItem>

                            <MenuItem onClick={logout}>Log out</MenuItem>
                        </Menu>
                    </Dropdown>


                </Button>




















            </div>
        </header>
    )
}

function BellIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
    )
}


function MountainIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    )
}


function SearchIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}




const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#99CCF3',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E6',
    700: '#0059B3',
    800: '#004C99',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Listbox = styled('ul')(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 200px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
    z-index: 1;
  
    .closed & {
      opacity: 0;
      transform: scale(0.95, 0.8);
      transition: opacity 200ms ease-in, transform 200ms ease-in;
    }
    
    .open & {
      opacity: 1;
      transform: scale(1, 1);
      transition: opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48);
    }
  
    .placement-top & {
      transform-origin: bottom;
    }
  
    .placement-bottom & {
      transform-origin: top;
    }
    `,
);

const AnimatedListbox = React.forwardRef(function AnimatedListbox(props, ref) {
    const { ownerState, ...other } = props;
    const popupContext = React.useContext(PopupContext);

    if (popupContext == null) {
        throw new Error(
            'The `AnimatedListbox` component cannot be rendered outside a `Popup` component',
        );
    }

    const verticalPlacement = popupContext.placement.split('-')[0];

    return (
        <CssTransition
            className={`placement-${verticalPlacement}`}
            enterClassName="open"
            exitClassName="closed"
        >
            <Listbox {...other} ref={ref} />
        </CssTransition>
    );
});

AnimatedListbox.propTypes = {
    ownerState: PropTypes.object.isRequired,
};

const MenuItem = styled(BaseMenuItem)(
    ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: default;
    user-select: none;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &.${menuItemClasses.focusVisible} {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
  
    &.${menuItemClasses.disabled} {
      color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }
  
    &:hover:not(.${menuItemClasses.disabled}) {
      background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[50]};
      color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
    }
    `,
);

const MenuButton = styled(BaseMenuButton)(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }
  
    &:active {
      background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
    }
  
    &:focus-visible {
      box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
      outline: none;
    }
    `,
)