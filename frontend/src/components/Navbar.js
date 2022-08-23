import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { auth } from "../firebase-config";

const Navbar = () => {
  const { toggleModals } = useContext(UserContext);

const Navigate = useNavigate();

const logOut = async () => {
try {
await signOut(auth)
Navigate("/")
}
 catch {
alert("For some reasons we can't deconnect, please check your internet connexion")
 }
}

  return (
    <nav className="navbar navbar-light bg-light px-4">
      <Link to="/" className="navbar-brand">
        AuthJS
      </Link>

      <div>
        <button onClick={() => toggleModals("signUp")} className=" btn btn-primary">
          Sign Up
        </button>
        <button onClick={() => toggleModals("signIn")} className=" btn btn-primary ms-2">
          Sign In
        </button>
        <button onClick = {logOut} className=" btn btn-danger ms-2">Log Out</button>
      </div>
    </nav>
  );
};

export default Navbar;
