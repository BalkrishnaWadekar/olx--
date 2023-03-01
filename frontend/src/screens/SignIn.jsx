import React, { useEffect } from 'react'
import { Form, Button } from "react-bootstrap"
import { useFormik } from "formik"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { signinUserAction } from '../redux/action/userAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignIn() {
    const { signin } = useSelector(state => state.userSignIn)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const showLoginMessage = () => {
        toast.success('Login Successful!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
        });
    };

    const formik = useFormik({
        initialValues: {
            email: "john@gmail.com",
            password: "123",

        },
        validationSchema: yup.object({
            email: yup
                .string("string is required")
                .required("Please enter your email address"),
            password: yup
                .string("string is required")
                .required("Please enter your password"),
        }),
        onSubmit: (values) => {
            console.log(values);
            dispatch(signinUserAction(values))

        }
    })

    useEffect(() => {
        if (signin) {
            setTimeout(() => {
                showLoginMessage()
                navigate("/")
            }, 400);
        }
    }, [signin])

    return <>
        <ToastContainer />
        {/* {JSON.stringify(adminLogin)} */}
        <h4 h4 className='text-center text-dark mt-5' >Sign In </h4 >

        <div className="container">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <Form onSubmit={formik.handleSubmit} className='mt-lg-4'>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>
                                <strong className='text-dark'>
                                    Email address
                                </strong>
                            </Form.Label>
                            <Form.Control
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.errors.email && formik.touched.email ? "form-control is-invalid shadowCard" : formik.values.email === "" ? "form-control shadowCard" : "form-control is-valid shadowCard"}
                                type="email"
                                placeholder="Enter email" />
                            <div className="invalid-feedback">{formik.errors.email}</div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label >
                                <strong className='text-dark'>
                                    Password
                                </strong>
                            </Form.Label>
                            <Form.Control
                                name='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.errors.password && formik.touched.password ? "form-control is-invalid shadowCard" : formik.values.password === "" ? "form-control shadowCard" : "form-control is-valid shadowCard"}
                                type="password"
                                placeholder="Password" />
                            <div className="invalid-feedback">{formik.errors.password}</div>
                        </Form.Group>


                        <Button className='col-sm-4 offset-sm-4' variant="info" type="submit">
                            Sign-In
                        </Button>
                        <hr />
                        <div className='mt-4 text-center'>
                            <strong className='text-dark'> Not have a account ?</strong>
                            <Link to="/signup"> Sign-Up </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </>
}