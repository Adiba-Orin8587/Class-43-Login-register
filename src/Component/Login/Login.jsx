/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../Firebase/firebase.init'
import { Link } from 'react-router-dom';

const auth = getAuth(app)


const Login = () => {


    const [success, setSuccess] = useState(false)

    const handleOnSubmit = event => {
        event.preventDefault();
        setSuccess(false)


        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;



        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true)
                form.reset()
            })

            .catch(error => {
                console.log('error', error);

            })


    }


    return (
        <div className='register'>
            <form onSubmit={handleOnSubmit}>
                <h3 className='mb-4 py-2'>Please Login</h3>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" placeholder='Email' name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" placeholder='Password' name='password' className="form-control" id="exampleInputPassword1" />
                </div>

                <p>New in website? <Link to='/register'>Please Register</Link></p>

                <button type="submit" className="btn btn-primary">Login</button>

                {
                    success && <p className='text-success py-3'>
                        Login Successfully
                    </p>
                }
            </form>

        </div>
    );
};

export default Login;