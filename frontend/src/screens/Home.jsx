import React, { useEffect } from 'react'
import { Card, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { AddToCartAction, getAllProductAction, productDetailAction } from '../redux/action/productActions'
import OlxCarousel from './OlxCarousel'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { allProducts, loading, editRejProduct } = useSelector(state => state.products)
    const { signin } = useSelector(state => state.userSignIn)

    const publishedProducts = allProducts.filter(item => item.published === true)
    // console.log(publishedProducts);

    const showToastMessage = () => {
        toast.success('Item added to your Cart !', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 3000
        });
    };

    const handleAddToCard = cartData => {
        signin
            ? dispatch(AddToCartAction({ ...cartData, buyerId: signin.id, buyerEmail: signin.userEmail }))
            : navigate("/signin")
        showToastMessage()
    }

    const productDetail = productData => {
        console.log(productData);
        dispatch(productDetailAction(productData))
        navigate("/product/detail")
    }

    useEffect(() => {
        dispatch(getAllProductAction())
        console.log(allProducts);
    }, [editRejProduct])

    return <React.Fragment>
        {/* {JSON.stringify(allProducts)} */}

        <div style={{ height: "30px" }}>
            {
                loading && <div className='spinner-border text-primary position-fixed'></div>

            }
        </div>

        <div className="container">
            <ToastContainer />
            <div className="row">
                <div id='olxCarousel'>
                    <OlxCarousel />
                </div>
                {
                    publishedProducts.slice(0).reverse()?.map((item, index) => <>
                        <Card
                            style={{ width: '18rem' }} className="mx-3 my-2 bg-light shadowCard"
                        >
                            <div className="homeProducts">
                                {/* style={{ height: "3px" }} */}
                                <Card.Img
                                    onClick={() => productDetail(item)}
                                    variant="top" src={`http://localhost:5000/${item.productImage}`} width={286} height={205} className="rounded-1" />
                                <Card.Body>
                                    {/* <Card.Title>{item.productName}</Card.Title>
                                    <Card.Text>
                                        {item.productDescription}
                                    </Card.Text> */}
                                    <div onClick={() => productDetail(item)}>
                                        <span>Name : <strong className='h'>{item.productName}</strong></span><br />
                                        <span>Discription : <strong className='text-dark'>{item.productDescription}</strong></span> <br />
                                        <div>
                                            <span>Category : <strong className='text-dark'>{item.productCategory}</strong></span>
                                        </div>
                                        <span>Price : <strong className='text-dark'>₹ {item.productPrice}</strong></span><br />
                                    </div>

                                    <Button
                                        onClick={e => handleAddToCard({
                                            productId: item._id,
                                            productOwnerId: item.userId
                                        })}
                                        variant="dark"
                                        id='buttonATC'
                                        className='btn btn-sm col-sm-6 offset-sm-3 '>
                                        Add to cart
                                    </Button>
                                </Card.Body>
                            </div>
                        </Card>
                    </>)
                }

            </div>
        </div>
    </React.Fragment>
}
