import React, { useState, useEffect } from 'react'
import { Form, Button } from "react-bootstrap"
import { useFormik } from "formik"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { adminLoginAction } from '../../redux/action/adminActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLogin() {
    const { adminLoginData } = useSelector(state => state.adminSignIn)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const adminLoggedInToast = adminName => {
        toast.success(`Admin Login Success! Welcome ${adminName} Sir`, {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 4000
        });
    };

    const formik = useFormik({
        initialValues: {
            email: "pramod@gmail.com",
            password: "123",

        },
        validationSchema: yup.object({
            email: yup
                .string("string is required")
                .required("This is required"),
            password: yup
                .string("string is required")
                .required("This is required"),
        }),
        onSubmit: (values) => {
            dispatch(adminLoginAction(values))
        }
    })

    useEffect(() => {
        console.log(adminLoginData);
        adminLoginData && adminLoginData.adminEmail && navigate("/admin")
        adminLoginData && adminLoginData.adminEmail && adminLoggedInToast(adminLoginData.adminName)
    }, [adminLoginData])

    return <>
        <ToastContainer />
        {/* {JSON.stringify(adminLogin)} */}
        <h4 h4 className='text-center text-dark mt-5' > Admin Login </h4 >

        <div className="container">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <Form onSubmit={formik.handleSubmit} className='mt-lg-4'>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.errors.email && formik.touched.email ? "form-control is-invalid" : formik.values.email === "" ? "form-control" : "form-control is-valid"}
                                type="email"
                                placeholder="Enter email" />
                            <div className="invalid-feedback">{formik.errors.email}</div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.errors.password && formik.touched.password ? "form-control is-invalid" : formik.values.password === "" ? "form-control" : "form-control is-valid"}
                                type="password"
                                placeholder="Password" />
                            <div className="invalid-feedback">{formik.errors.password}</div>
                        </Form.Group>

                        <Button className='col-sm-4 offset-sm-4' variant="info" type="submit">
                            Sign-In
                        </Button>

                    </Form>
                </div>
            </div>
        </div>
    </>
}










