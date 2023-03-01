import React, { useEffect, useState } from 'react'
import { Card, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { adminProductControll, getAllProductAction } from '../../redux/action/productActions'
import OlxCarousel from '../OlxCarousel'

export default function AdminHome() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [toggle, settoggle] = useState(false)
    const { allProducts, loading, editRejProduct } = useSelector(state => state.products)
    const { signin } = useSelector(state => state.userSignIn)

    const publishedProducts = allProducts.filter(item => item.published === true)
    // console.log(publishedProducts);

    const handleSelect = async (Id, method) => {
        await dispatch(adminProductControll(Id, method))
        settoggle(!toggle)
    }

    useEffect(() => {
        dispatch(getAllProductAction())
        console.log(allProducts);
    }, [editRejProduct, toggle])

    return <React.Fragment>
        {/* {JSON.stringify(allProducts)} */}

        <div style={{ height: "30px" }}>
            {
                loading && <div className='spinner-border text-primary position-fixed'></div>

            }
        </div>

        <div className="container">
            <div className="row">
                <div id='olxCarousel'>
                    <OlxCarousel />
                </div>
                {
                    publishedProducts.slice(0).reverse()?.map((item, index) => <>
                        <Card style={{ width: '18rem' }} className="mx-3 my-2 bg-light shadowCard">
                            <div className="homeProducts">
                                {/* style={{ height: "3px" }} */}
                                <Card.Img variant="top" src={`http://localhost:5000/${item.productImage}`} width={286} height={205} />
                                <Card.Body>
                                    {/* <Card.Title>{item.productName}</Card.Title>
                                    <Card.Text>
                                        {item.productDescription}
                                    </Card.Text> */}
                                    <div>
                                        <span>Name : <strong className='h'>{item.productName}</strong></span><br />
                                        <span>Discription : <strong className='text-dark'>{item.productDescription}</strong></span> <br />
                                        <div>
                                            <span>Category : <strong className='text-dark'>{item.productCategory}</strong></span>
                                        </div>
                                        <span>Price : <strong className='text-dark'>₹ {item.productPrice}</strong></span><br />
                                    </div>


                                </Card.Body>
                                <Button
                                    onClick={e => handleSelect(item._id, "unPublish")}
                                    variant="dark"
                                    id='removePublishButton'
                                    className='btn btn-sm  btn-danger position-absolute top-0 end-0'>
                                    <i class="bi bi-x-lg text-light"></i>
                                </Button>
                            </div>
                        </Card>
                    </>)
                }

            </div>
        </div>
    </React.Fragment >
}
