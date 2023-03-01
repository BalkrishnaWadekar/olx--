import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik"
import * as yup from "yup"
import { Modal, Form, Button, FloatingLabel } from 'react-bootstrap'
import { editRejectedProduct } from '../redux/action/productActions'

export default function EditModal({ seteditModal, editModal, editData, seteditData, setshowOffcanvas, showOffcanvas, showToastMessage, setrejecteds }) {
    const dispatch = useDispatch()
    const [imagePreview, setimagePreview] = useState()

    const handleImageChange = e => {
        seteditData({ ...editData, productImage: e.target.files[0] })
        const url = URL.createObjectURL(e.target.files[0])
        setimagePreview(url)
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            pname: editData.productName,
            pdesc: editData.productDescription,
            pprice: editData.productPrice,
            pcategory: editData.productCategory
        },
        validationSchema: yup.object({
            pname: yup
                .string("string is required")
                .required("This is required"),
            pdesc: yup
                .string("string is required")
                .required("This is required"),
            pprice: yup
                .string("string is required")
                .required("This is required"),
            pcategory: yup
                .string("string is required")
                .required("This is required")
        }),
        onSubmit: (values) => {
            const fd = new FormData()
            fd.append("productName", values.pname)
            fd.append("productDescription", values.pdesc)
            fd.append("productImage", editData.productImage)
            fd.append("productPrice", values.pprice)
            fd.append("productCategory", values.pcategory)
            fd.append("adminRefused", false)

            for (const item of fd.entries()) {
                console.log(`key${item[0]} : value ${item[1]}`)
            }

            dispatch(editRejectedProduct(editData.productId, fd))
            seteditModal(false)
            setshowOffcanvas({ ...showOffcanvas, myProducts: false })
            // console.log(values);
            showToastMessage()
            setrejecteds([])
        }
    })

    return <>

        <Modal
            size="lg"
            show={editModal}
            onHide={() => seteditModal(false)}
            aria-labelledby="example-modal-sizes-title-lg"
            className='mt-4'
        >

            <Modal.Header closeButton>
                {/* {JSON.stringify(editData)} */}
                <h4 className='offset-4 ps-5'>UPDATE PRODUCT</h4>
            </Modal.Header>
            <Modal.Body>
                <form className=" mt-1 shadow-lg p-3 mb-5 bg-white  rounded" onSubmit={formik.handleSubmit}>

                    <FloatingLabel label="Product Name" className='my-3'>
                        <Form.Control
                            name='pname'
                            value={formik.values.pname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={formik.errors.pname && formik.touched.pname ? "form-control is-invalid" : formik.values.pname === "" ? "form-control" : "form-control is-valid"}
                            type="text"
                        />
                    </FloatingLabel>

                    <FloatingLabel label="Product Description" className='my-1'>
                        <Form.Control
                            // onChange={e => setproductData({ ...productData, productDescription: e.target.value })}
                            // value={productData.productDescription}
                            name='pdesc'
                            value={formik.values.pdesc}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={formik.errors.pdesc && formik.touched.pdesc ? "form-control is-invalid" : formik.values.pdesc === "" ? "form-control" : "form-control is-valid"}
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                    {
                        imagePreview && <img src={imagePreview} alt="" height={200} width={200} className="mt-2" />
                    }
                    <FloatingLabel className='my-1'>
                        <Form.Control
                            onChange={handleImageChange}
                            type="file"
                            placeholder="Enter URL" />
                    </FloatingLabel>

                    <FloatingLabel label="Enter Price " className='my-2 mt-3'>
                        <Form.Control
                            // onChange={e => setproductData({ ...productData, productPrice: e.target.value })}
                            //   value={productData.productPrice}
                            name='pprice'
                            value={formik.values.pprice}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={formik.errors.pprice && formik.touched.pprice ? "form-control is-invalid" : formik.values.pprice === "" ? "form-control" : "form-control is-valid"}
                            type="number"
                            placeholder="Password" />
                    </FloatingLabel>

                    <Form.Label className='mt-1'>Category</Form.Label>
                    <Form.Select
                        name='pcategory'
                        value={formik.values.pcategory}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.errors.pcategory && formik.touched.pcategory ? "form-control is-invalid" : formik.values.pcategory === "" ? "form-control" : "form-control is-valid"}

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
                        type='submit'
                        className='mt-3 col-sm-6 offset-3 text-danger '
                        id='addProductBtn'>
                        <b>Send To Reverify</b>
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    </>
}
