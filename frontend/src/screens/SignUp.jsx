import React, { useEffect } from 'react'
import { Form, Button } from "react-bootstrap"
import { useFormik } from "formik"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { closeToast, signupUserAction } from '../redux/action/userAction'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
    const { signup } = useSelector(state => state.userSignUp)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const showToastMessage = () => {
        toast.success('Sign up successful !', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2700
        });
    };

    const formik = useFormik({
        initialValues: {
            userName: "john",
            userEmail: "john@gmail.com",
            userContact: 1234567895,
            userPassword: "123"
        },
        validationSchema: yup.object({
            userName: yup
                .string("string is required")
                .required("Please enter your good name"),
            userEmail: yup
                .string("string is required")
                .required("Please enter your email address"),
            userContact: yup.number()
                .min(1111111111, "Must be more than 10 characters")
                .required("Please enter your contact number"),
            userPassword: yup
                .string("string is required")
                .required("Please enter your password")
        }),
        onSubmit: (values) => {
            console.log(values);
            dispatch(signupUserAction(values))
        }
    })

    useEffect(() => {
        if (signup) {
            showToastMessage()
            setTimeout(() => {
                navigate("/signin")
            }, 2200);
        }
        dispatch(closeToast())
    }, [signup])


    return <>
        <div className="container">
            <ToastContainer />
            <div className="row">
                <div className="col-sm-6 offset-sm-3 ">
                    <h4 className='text-center text-dark  mt-5'>Sign Up</h4>
                    <Form onSubmit={formik.handleSubmit} className='mt-lg-4'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>
                                <strong className='text-dark'>
                                    Name
                                </strong>
                            </Form.Label>
                            <Form.Control
                                name='userName'
                                value={formik.values.userName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.errors.userName && formik.touched.userName ? "form-control is-invalid shadowCard" : formik.values.userName === "" ? "form-control shadowCard" : "form-control is-valid shadowCard"}
                                type="text"
                                placeholder="Enter Name" />
                            <div className="invalid-feedback">{formik.errors.userName}</div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>
                                <strong className='text-dark'>
                                    Email
                                </strong>
                            </Form.Label>
                            <Form.Control
                                name='userEmail'
                                value={formik.values.userEmail}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.errors.userEmail && formik.touched.userEmail ? "form-control is-invalid shadowCard" : formik.values.userEmail === "" ? "form-control shadowCard" : "form-control shadowCard is-valid"}
                                type="email"
                                placeholder="Enter email" />
                            <div className="invalid-feedback">{formik.errors.userEmail}</div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>
                                <strong className='text-dark'>
                                    Contact
                                </strong>
                            </Form.Label>
                            <Form.Control
                                name='userContact'
                                value={formik.values.userContact}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.errors.userContact && formik.touched.userContact ? "form-control is-invalid shadowCard" : formik.values.userContact === "" ? "form-control shadowCard" : "form-control shadowCard is-valid"}
                                type="number"
                                placeholder="Enter contact" />
                            <div className="invalid-feedback">{formik.errors.userContact}</div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>
                                <strong className='text-dark'>
                                    Password
                                </strong>
                            </Form.Label>
                            <Form.Control
                                name='userPassword'
                                value={formik.values.userPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.errors.userPassword && formik.touched.userPassword ? "form-control is-invalid shadowCard" : formik.values.userPassword === "" ? "form-control shadowCard" : "form-control shadowCard is-valid"}
                                type="password"
                                placeholder="Enter Password" />
                            <div className="invalid-feedback">{formik.errors.userPassword}</div>
                        </Form.Group>

                        <Button
                            className='col-sm-4 offset-sm-4'
                            variant="info"
                            type="submit">
                            Sign-Up
                        </Button>

                        <hr />
                        <div className='mt-4 text-center'>
                            <strong className='text-dark'>
                                Already have a account?
                            </strong>
                            <Link to="/signin"> Sign In </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </>
}
