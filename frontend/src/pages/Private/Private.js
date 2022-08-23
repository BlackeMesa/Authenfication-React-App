import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';

const Private = () => {
    
    const {currentUser} = useContext(UserContext)
    console.log("Private", currentUser);
    
    if(!currentUser) {
        return <Navigate to="/" />
    }
    
    return (
        <div className="container">

<Outlet />

        </div>
    );
};

export default Private;