import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './formstyle.css'
export default function SignUp() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "" });
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous message
        setIsError(false);

        try {
            const response = await fetch("http://localhost:5000/api/creatuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const json = await response.json(); // Await the json promise
            console.log(json);

            if (json.success) {
                setMessage("User created successfully");
                setIsError(false);
                // Clear the form
                setCredentials({ name: "", email: "", password: "", location: "" });
                // Redirect to login after a short delay
                setTimeout(() => {
                    navigate('/login');
                }, 5000);
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
                    <div className='headding'>SignUp Form</div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange}  required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Address</label>
                        <input type="text" className="form-control" name='location' value={credentials.location} onChange={onChange} required />
                    </div>
                    <button type="submit" className="btn btn-success">Sign Up</button>
                </form>
                {message && (
                    <div className={`alert mt-3 ${isError ? 'alert-danger' : 'alert-success'}`}>
                        {message}
                    </div>
                )}
                <Link to="/login" className='text-warning'> already a user</Link>

            </div>
        </div>
    );
}
