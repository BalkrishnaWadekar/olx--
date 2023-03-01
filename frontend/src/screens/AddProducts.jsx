import React, { useEffect, useState } from 'react'
import { FloatingLabel, Form, Button, Alert } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { addProductAction } from '../redux/action/productActions'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddProducts() {
    const { signin } = useSelector(state => state.userSignIn)
    const [imagePreview, setimagePreview] = useState()
    const dispatch = useDispatch()
    const [productData, setproductData] = useState({
        productImage: ""
    })


    const showToastMessage = () => {
        toast.success('Product Added Successful !', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000
        });
    };

    const handleImageChange = e => {
        setproductData({ ...productData, productImage: e.target.files[0] })
        const url = URL.createObjectURL(e.target.files[0])
        setimagePreview(url)
    }

    const formik = useFormik({
        initialValues: {
            productName: "",
            productDescription: "",
            productPrice: "",
            productCategory: ""
        },
        validationSchema: yup.object({
            productName: yup
                .string("Please Enter String Value")
                .required("Please Enter Product Name"),
            productDescription: yup
                .string("Please Enter String Value")
                .required("Please Enter Description About Product"),
            productPrice: yup
                .string("Please Enter String Value")
                .required("Please Enter Product Price"),
            productCategory: yup
                .string("Please Enter String Value")
                .required("Please Enter Product Price")
        }),
        onSubmit: (values) => {
            const fd = new FormData()
            fd.append("productName", values.productName)
            fd.append("productDescription", values.productDescription)
            fd.append("productImage", productData.productImage)
            fd.append("productPrice", values.productPrice)
            fd.append("productCategory", values.productCategory)
            fd.append("userId", signin.id)
            fd.append("productOwner", signin.userEmail)
            fd.append("adminRefused", false)
            fd.append("adminVerified", false)
            fd.append("published", false)

            for (const item of fd.entries()) {
                console.log(`key${item[0]} : value ${item[1]}`)
            }

            dispatch(addProductAction(fd))
            setproductData({
            })
            showToastMessage()
        }
    })


    return <>

        {/* {
            JSON.stringify(productData)
        } */}

        {
            !signin
                ? <Alert key={'danger'} variant={'danger'} className="text-center" >
                    <h6>   Please sign-in to olx to add products !</h6>
                </Alert>

                : <div className="container">
                    <div className="row mt-4">
                        <div className="col-sm-6 offset-3 ">
                            <div>
                                <form className=" mt-1 shadow-lg p-3 mb-5 bg-white  rounded" onSubmit={formik.handleSubmit}>

                                    <FloatingLabel label="Product Name" className='my-3'>
                                        <Form.Control
                                            // onChange={e => setproductData({ ...productData, productName: e.target.value })}
                                            // value={productData.productName}
                                            name='productName'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={formik.errors.productName && formik.touched.productName ? "form-control is-invalid" : formik.values.productName === "" ? "form-control" : "form-control is-valid"}
                                            type="text" />
                                    </FloatingLabel>

                                    <FloatingLabel label="Product Description">
                                        <Form.Control
                                            name='productDescription'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={formik.errors.productDescription && formik.touched.productDescription ? "form-control is-invalid" : formik.values.productDescription === "" ? "form-control" : "form-control is-valid"}
                                            placeholder="Leave a comment here"
                                            style={{ height: '100px' }}
                                        />
                                    </FloatingLabel>
                                    {
                                        imagePreview && <img src={imagePreview} alt="" height={200} width={200} />
                                    }

                                    <FloatingLabel className='my-3'>
                                        <Form.Control
                                            onChange={handleImageChange}
                                            className={
                                                productData.productImage === "" ? "form-control" : "form-control is-valid"}
                                            type="file"
                                            placeholder="Enter URL" />
                                    </FloatingLabel>

                                    <FloatingLabel label="Enter Price " className='my-3'>
                                        <Form.Control
                                            name='productPrice'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={formik.errors.productPrice && formik.touched.productPrice ? "form-control is-invalid" : formik.values.productPrice === "" ? "form-control" : "form-control is-valid"}
                                            type="number"
                                            placeholder="Password" />
                                    </FloatingLabel>

                                    <Form.Label className='mt-3'>Category</Form.Label>
                                    <Form.Select
                                        name='productCategory'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={formik.errors.pname && formik.touched.pname ? "form-control is-invalid" : formik.values.productCategory === "" ? "form-control" : "form-control is-valid"}
                                        aria-label="Floating label select example">
                                        <option>Select Category For Your Task</option>
                                        <option value="T-shirt">T-shirt</option>
                                        <option value="T-shirt">Shirt</option>
                                        <option value="Sarees">Sarees</option>
                                        <option value="Shoes">Shoes</option>
                                        <option value="Jeans">Jeans</option>
                                        <option value="Education">Goggle</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Accessories">Accessories</option>
                                        <option value="Mens-Fashion">Mens-Fashion</option>
                                        <option value="Women-Fashion">Women-Fashion</option>
                                    </Form.Select>

                                    <Button
                                        // onClick={handleSubmit}
                                        type="submit"
                                        className='mt-3 col-sm-6 offset-3 text-danger '
                                        id='addProductBtn'>
                                        <i class="bi bi-file-earmark-plus"></i>
                                        <b>Submit for Verify and Post</b>
                                    </Button>
                                    <ToastContainer />
                                </form>
                            </div>

                        </div>

                    </div>
                </div>
        }
    </>
}
