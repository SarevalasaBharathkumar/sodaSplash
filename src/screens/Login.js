import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatchCart} from '../components/ContextReducer';
import './formstyle.css';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const dispatch = useDispatchCart();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);

    try {
      const response = await fetch("http://localhost:5000/api/loginUser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        localStorage.setItem("authToken", json.authToken);
        localStorage.setItem("currentUserEmail", credentials.email); // Store the email
        dispatch({ type: "RESET_CART" });
        console.log(localStorage.getItem("authToken"), localStorage.getItem("currentUserEmail"));
        setMessage("User logged in successfully");
        setIsError(false);
        // Clear the form
        setCredentials({ email: "", password: "" });
        // Redirect to home after a short delay
        setTimeout(() => {
          navigate('/');
        }, 1000); // 1 second delay
      } else {
        // Display error message
        if (json.errors) {
          const errors = json.errors.map(err => err.msg).join(', ');
          setMessage(errors);
        } else {
          setMessage(json.message || "Enter valid credentials");
        }
        setIsError(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while connecting to the server");
      setIsError(true);
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className='form-box-container'>
      <div className='form-box'>
        <form onSubmit={handleSubmit}>
          <div className='heading'>Login Form</div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} required />
          </div>
          <button type="submit" className="btn btn-success">Login</button>
        </form>
        {message && (
          <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`} role="alert">
            {message}
          </div>
        )}
        <Link to="/SignUp" className='text-warning'>New user? Sign up here</Link>
      </div>
    </div>
  );
}
