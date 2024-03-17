import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AddToCartAction } from '../redux/action/productActions'

export default function ProductDetail() {
    const navigate = useNavigate()
    const { signin } = useSelector(state => state.userSignIn)
    const { productInfo } = useSelector(state => state.products)
    const dispatch = useDispatch()

    const handleAddToCard = cartData => {
        signin
            ? dispatch(AddToCartAction({ ...cartData, buyerId: signin.id, buyerEmail: signin.userEmail }))
            : navigate("/signin")
    }


    // useEffect(() => {
    //     productInfo
    //         ? navigate("/home")
    //         : null
    // }, [])

    return <>
        <div className="container">
            <div className="row">
                <div className='col-sm-6 offset-sm-3 mt-2'>
                    <img src={`https://olx-express-backend.vercel.app/${productInfo?.productImage}`} alt={productInfo.productName} height={430} className="rounded-3" />

                    <div>
                        <h5>Name : <span className='h3 text-dark'>{productInfo.productName}</span></h5>
                        <h5 >Discription : <span className='h4 text-dark'>{productInfo.productDescription}</span></h5>

                        <h5>Category : <span className='h4 text-dark'>{productInfo.productCategory}</span></h5>

                        <h5>Price : <span className='h4 text-dark'>₹ {productInfo.productPrice}</span></h5>
                        <Button
                            onClick={e => handleAddToCard({
                                productId: productInfo._id,
                                productOwnerId: productInfo.userId
                            })}
                            variant="dark"
                            id='buttonATC'
                            // className='btn btn-sm col-sm-8 offset-sm-3 mb-5 position-absolute'>
                            className='position-absolute top-75 start-50 translate-middle col-sm-2 btn-sm shadowCard'>
                            Add to cart
                        </Button>
                        <Button
                            onClick={e => navigate("/")}
                            id='backButton' >
                            <i class="bi bi-arrow-left"></i>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </>

}
