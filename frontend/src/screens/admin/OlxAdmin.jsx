import React, { useEffect, useState } from 'react'
import { Card, Button, Badge } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { adminProductControll, getAllRejectedProducts, getAllVerifiedProducts, getDataToProductVerification } from '../../redux/action/productActions'

export default function OlxAdmin() {
    const { verifyProducts, allRejectedProducts, allVerifiedProducts, loading } = useSelector(state => state.products)
    const [toggle, settoggle] = useState(false)
    const dispatch = useDispatch()

    const handleSelect = async (Id, method) => {
        await dispatch(adminProductControll(Id, method))
        settoggle(!toggle)
    }

    useEffect(() => {
        dispatch(getDataToProductVerification())
        dispatch(getAllRejectedProducts())
        dispatch(getAllVerifiedProducts())
    }, [toggle])

    return <>
        {/* {JSON.stringify(verifyProducts, null, 2)} */}
        {/* <h4>This is admin page</h4> */}
        <div style={{ height: "30px" }}>
            {
                loading && <div className='spinner-border text-primary'></div>

            }
        </div>
        <div className="container">
            <div className="row">
                <div className="col-md-4 text-danger text-center">
                    <Badge bg="danger">Rejected Products</Badge>
                    {
                        allRejectedProducts?.map((item, index) => <Card style={{ width: '22rem' }} className="mx-3 my-2 d-flex shadowCard">
                            <Card.Img variant="top" src={`https://olx-express-backend.vercel.app/${item.productImage}`} width={286} height={190} />
                            <Card.Body>
                                <span className='text-secondary'>Product Owner : {item.productOwner}</span>
                                <Card.Title className='text-center'>{item.productName}</Card.Title>
                                <Card.Text className='text-center'>
                                    {item.productDescription}
                                </Card.Text>

                                <div className='d-flex justify-content-around'>
                                    <Button
                                        onClick={e => handleSelect(item._id, "cancelreject")}
                                        variant="danger" className='btn btn-sm' style={{ width: '5rem' }} >UnReject</Button>
                                    <Button variant="success" className='btn btn-sm disabled' style={{ width: '5rem' }} >Verify</Button>
                                    <Button variant="info" className='btn btn-sm disabled' style={{ width: '5rem' }} >Publish</Button>
                                </div>
                            </Card.Body>
                        </Card>)
                    }
                </div>

                <div className="col-md-4 text-center">
                    <Badge bg="info" >Please Verify This Item</Badge>

                    {

                        verifyProducts?.map((item, index) => <Card style={{ width: '22rem' }} className="mx-3 my-2 d-flex">
                            <Card.Img variant="top" src={`https://olx-express-backend.vercel.app/${item.productImage}`} width={286} height={190} />
                            <Card.Body>
                                <span className='text-secondary'>Product Owner : {item.productOwner}</span>
                                <Card.Title className='text-center'>{item.productName}</Card.Title>
                                <Card.Text className='text-center'>
                                    {item.productDescription}
                                </Card.Text>

                                <div className='d-flex justify-content-around'>

                                    <Button onClick={e => handleSelect(item._id, "reject")}
                                        variant="danger" className='btn btn-sm' style={{ width: '5rem' }} >Reject</Button>

                                    <Button
                                        onClick={e => handleSelect(item._id, "verify")}
                                        variant="success" className='btn btn-sm ' style={{ width: '5rem' }} >Verify</Button>

                                    <Button variant="info" className='btn btn-sm disabled' style={{ width: '5rem' }} >Publish</Button>
                                </div>

                            </Card.Body>
                        </Card>)
                    }

                </div>

                <div className="col-md-4 text-center text-success">
                    <Badge bg="success">Verified Products</Badge>

                    {
                        allVerifiedProducts?.map((item, index) => <Card style={{ width: '22rem' }} className="mx-3 my-2 d-flex">
                            <Card.Img variant="top" src={`https://olx-express-backend.vercel.app/${item.productImage}`} width={286} height={190} />
                            <Card.Body>
                                <span className='text-secondary'>Product Owner : {item.productOwner}</span>
                                <Card.Title className='text-center'>{item.productName}</Card.Title>
                                <Card.Text className='text-center'>
                                    {item.productDescription}
                                </Card.Text>

                                <div className='d-flex justify-content-around'>
                                    <Button variant="danger" className='btn btn-sm disabled' style={{ width: '5rem' }} >Reject</Button>
                                    <Button
                                        onClick={e => handleSelect(item._id, "cancelVerify")}
                                        variant="success" className='btn btn-sm ' style={{ width: '5rem' }} >UnVerify</Button>

                                    <Button
                                        onClick={e => handleSelect(item._id, "publish")}
                                        variant="primary"
                                        id='publishButton'
                                        className='btn btn-sm '
                                        style={{ width: '5rem' }} >Publish</Button>
                                </div>

                            </Card.Body>
                        </Card>)
                    }
                </div>
            </div>
        </div>
    </>
}
