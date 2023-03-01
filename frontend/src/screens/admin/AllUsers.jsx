import React, { useEffect, useState } from 'react'
import { Button, Card, Modal, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { destroyUserProducts, getAllProductAction, getUserProducts } from '../../redux/action/productActions'
import { deleteSingleUserAction, getAllUsersAction } from '../../redux/action/userAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AllUsers() {
    const { allUsers, userDeleted, loading } = useSelector(state => state.user)
    const { userProducts } = useSelector(state => state.products)
    const dispatch = useDispatch()
    const [show, setshow] = useState(false)
    const [userId, setuserId] = useState()

    const deleteUserToast = () => {
        toast.success('User and user products are deleted successful!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2700
        });
    };

    const handleDeleteUser = () => {
        dispatch(deleteSingleUserAction(userId))
        dispatch(destroyUserProducts(userId))
        setshow(false)
        deleteUserToast()
    }

    const getUserwiseProducts = id => {
        dispatch(getUserProducts(id))
    }

    useEffect(() => {
        dispatch(getAllUsersAction())
        dispatch(getAllProductAction())
    }, [userDeleted])

    return <>
        <ToastContainer />
        <div className="container-fluid">
            <div className="row">
                {
                    loading && <div className='spinner-border text-primary position-fixed'></div>
                }
                <div className='col-md-8 col-sm-12'>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Sr.no.</th>
                                <th>User Id</th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>User Contact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allUsers?.map((item, index) => <tr key={item._id} onClick={e => {
                                    getUserwiseProducts(item._id)
                                }}>
                                    <td>{index + 1}</td>
                                    <td>{item._id}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.userEmail}</td>
                                    <td>{item.userContact}

                                        <Button
                                            onClick={e => {
                                                setuserId(item._id)
                                                setshow(true)
                                            }}
                                            className='btn-sm mx-5 text-end' variant='warning'>
                                            <i class="bi bi-trash text-dark"></i>
                                        </Button>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </Table>

                </div>
                <div className='col-md-4 col-sm-12'>
                    {
                        userProducts?.map(item => <Card
                            style={{ width: '30rem' }}
                            className="mt-1 offCart">
                            <Card.Body>
                                <div className="row">
                                    <div className='d-flex'>
                                        <div className="col-md-6">
                                            <Card.Img variant="top" src={`http://localhost:5000/${item.productImage}`} width={280} height={180} />
                                        </div>
                                        <div className="col-md-6 p-3">
                                            <div className='mt-2'>
                                                <span>Name : <strong className='h5'>{item.productName}</strong></span><br />
                                                <span>Discription : <strong className='text-dark'>{item.productDescription}</strong></span> <br />
                                                <div>
                                                    <span>Category : <strong className='text-dark'>{item.productCategory}</strong></span>
                                                </div>
                                                <span>Price : <strong className='text-dark'>₹ {item.productPrice}</strong></span><br />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>

                        </Card>)
                    }
                </div>

            </div>
        </div>


        {/* Delete Modal */}
        <Modal show={show} onHide={e => setshow(pre => !pre)} className="mt-5">
            <Modal.Body>
                <h5 className='text-danger text-center'>
                    Are you sure want to delete this User?
                </h5>
                <div className='offset-4'>
                    <Button
                        className='btn-sm mx-1' variant="info"
                        onClick={e => setshow(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteUser}
                        className='btn-sm mx-1' id='removePublishButton' variant="primary" >
                        Delete
                    </Button>
                </div>
            </Modal.Body>

        </Modal>
    </>
}
