import React, { useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav=() => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }

    /*const [profilePic, setProfilePic] = useState('');

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const userData = JSON.parse(user);
            setProfilePic(`http://localhost:5000${userData.profilePic}`);
        }
    }, []);

    console.warn(profilePic);*/

    return (
        <div>
            {auth ? <ul className='nav-ul'>
                <div className='nav-div'>
                    <div className='pic-div'>
                        <img src='' className='profile-pic' alt='profile-pic'></img>
                    </div>
                    <div>
                        <li><Link to="/">Products</Link></li>
                        <li><Link to="/add">Add Product</Link></li>
                        <li><Link to="/profile/:id">Profile</Link></li> 
                        <li><Link onClick={logout} to="/signup">Logout:- {JSON.parse(auth).name}</Link></li>
                    </div>
                </div>
            </ul>
                :
                <ul className='nav-ul'>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }
        </div>
    );
}

export default Nav;