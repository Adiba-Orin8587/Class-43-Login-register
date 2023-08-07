/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Register.css'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../Firebase/firebase.init'
import { Link } from 'react-router-dom';

const auth = getAuth(app)


const Register = () => {

    const [passwordError, setPasswordError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleOnSubmit = event => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        console.log(name, email, password);

        if (/(?=.*?[A-Z].*[A-Z])/.test(password)) {
            setPasswordError('Please Provid At Least Two Uppercase')
        }
        if (password.length < 6) {
            setPasswordError('Password should have 6 characters ')
        }
        if (/(?=.*?[#?!@$%^&*-])/.test(password)) {
            setPasswordError('Password should have a special character ')
        }

        setPasswordError('')

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true)
                form.reset()
                // Verify Email
                verifyEmail()
                // update user
                updateUserName()


            })
            .catch(error => {
                console.log('error', error);
                setPasswordError(error.message)
            })

        const verifyEmail = () => {
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    alert('Please Check Your Email And Verify Your Email Address')
                })
        }


        const updateUserName = (name) => {
            updateProfile(auth.currentUser, {
                displayName: name,
            })
                .then(() => {
                    console.log('Update done successfully');
                })
                .catch(error => console.log(error))
        }


    }


    return (
        <div className='register'>
            <form onSubmit={handleOnSubmit}>
                <h3 className='mb-4 py-2'>Register Here</h3>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" placeholder='Name' name='name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" placeholder='Email' name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" placeholder='Password' name='password' className="form-control" id="exampleInputPassword1" />
                </div>

                <p>Already Registered <Link to='/login'>Please Login</Link></p>

                <button type="submit" className="btn btn-primary">Register</button>
                <p className='text-danger'>{passwordError}</p>
                {
                    success && <p className='text-success'>
                        Registered Successfully Done
                    </p>
                }
            </form>

        </div>
    );
};

export default Register;