import React from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase.js";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const userSignOut = await signOut(auth)
      .then((res) => console.log("Logged out ! ", res))
      .catch((err) => console.log("Error"));
    navigate('..');
    console.log("userSignOut : ",userSignOut);
    
  };
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark" aria-label="Fourth navbar example">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <button className="btn btn-dark" >Home</button>
              </li>
              <li className="nav-item">
                <button className="btn btn-dark" >Shop</button>
              </li>
              <li className="nav-item">
                <button className="btn btn-dark " >Calculator</button>
              </li>
            </ul>
            <form role="search">
              <button className="form-control " type="text" onClick={handleLogout} >Logout</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}
