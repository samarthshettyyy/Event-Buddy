import { Dropdown, Avatar, Navbar } from "flowbite-react";
import logo from '../assets/logo.png'; // Adjust the path according to your project structure
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    };

    return (
        <Navbar fluid={true} rounded={true}>
            <Navbar.Brand href="https://flowbite-react.com">
                <img
                    src={logo}
                    className="mr-3 h-6 sm:h-9"
                    alt="Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Event Buddy
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline={true}
                    label={
                        <Avatar
                            alt="User settings"
                            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            rounded={true}
                        />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">Samarth Shetty</span>
                        <span className="block truncate text-sm font-medium">samarthshetty04@gmail.com</span>
                    </Dropdown.Header>
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Earnings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>

            <Navbar.Collapse>
    {auth ? (
        <ul className="nav-ul flex items-center space-x-4"> {/* Adjust layout here */}
            <li>
                <Navbar.Link href="/" active>
                    Home
                </Navbar.Link>
            </li>
            <li>
                <Navbar.Link href="/create">
                    Create
                </Navbar.Link>
            </li>
            <li>
                <Navbar.Link href="/list">
                    List of Events
                </Navbar.Link>
            </li>
            <li>
                <Navbar.Link href="/chat">
                    Chat
                </Navbar.Link>
            </li>
            
        </ul>
    ) : (
        <ul className="nav-ul flex space-x-4">
            <li>
                <Link to="/signup">Signup</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    )}
</Navbar.Collapse>


        </Navbar>
    );
};

export default Nav;