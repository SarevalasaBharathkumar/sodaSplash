import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../Slider.css';
import { Badge } from 'react-bootstrap';
import { useCart } from './ContextReducer';

export default function Head() {
  let data = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUserEmail");
    navigate("/");
  }

  const currentUserEmail = localStorage.getItem("currentUserEmail");
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
        <div className="container-fluid">
          <NavLink className="navbar-brand fs-1 fst-italic" to='/'>ChillMart</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link fs-5 ${isActive ? 'active' : ''}`} to='/'>Home</NavLink>
              </li>
              {localStorage.getItem("authToken") &&
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link fs-5 ${isActive ? 'active' : ''}`} to='/orders'>My Orders</NavLink>
                </li>
              }
            </ul>

            {!localStorage.getItem("authToken") ?
              <div className='d-flex'>
                <NavLink className="btn bg-success" to='/login'>Login</NavLink>
                <NavLink className="btn bg-white ms-2" to='/SignUp'>SignUp</NavLink>
              </div> :
              <div>
                <div className="me-3 text-white">
                  {currentUserEmail}
                </div>
                <NavLink to='/Cart' className='h3 text-light text-decoration-none'>
                <Badge pill bg='danger' style={{"position":'absolute',"font-size":"0.6rem"}}>{data.length}</Badge>

                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cart3" viewBox="0 0 16 16" color='white'>
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                  cart
                  {/*<Badge pill bg='danger'>{data.length}</Badge>*/}
                </NavLink>
                <button className='btn bg-white text-danger ms-3' onClick={handleLogout}>
                  Logout
                </button>
              </div>
            }
          </div>
        </div>
      </nav>
    </>
  );
}
