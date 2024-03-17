import React, { useEffect, useState } from 'react'

import { Nav, Button, Offcanvas, Card, Modal, Form, Dropdown, Alert, Spinner } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { userLogOutAction } from '../redux/action/userAction'
import { adminLogOutAction } from '../redux/action/adminActions'
import { cartDataRAO, getAllProductAction, getCartItemsAction, placeOrderAction, receivedOrdersActions, removeFromCart, userOrderedItems } from '../redux/action/productActions'
import EditModal from '../screens/EditModal'
import DeleteModal from '../screens/DeleteModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function OlxNav() {
    const navigate = useNavigate()

    const [show, setshow] = useState({
        billBox: false,
        orderBox: false,
        spinner: false,
        orderAlert: false,
        ctoButton: true,
    })
    const [showFSM, setshowFSM] = useState(false)
    const [userProducts, setuserProducts] = useState([])
    const [rejecteds, setrejecteds] = useState([])
    const [allUserProducts, setallUserProducts] = useState([])
    const [editModal, seteditModal] = useState(false)
    const [delModalData, setdelModalData] = useState({})
    const [showOffcanvas, setshowOffcanvas] = useState({
        myProducts: false,
        myOrders: false,
        receivedOrders: false,
        showAlert: false
    })

    const [editData, seteditData] = useState({
        productId: "",
        productImage: ""
    })

    const { allProducts, cartItems, removedFromCart, orderedItems, receivedOrders, orderPlaced, deleteProduct } = useSelector(state => state.products)
    const { adminLoginData } = useSelector(state => state.adminSignIn)
    const { signin } = useSelector(state => state.userSignIn)
    // const { editRejProduct,  } = useSelector(state => state.products)
    const dispatch = useDispatch()

    const showToastMessage = () => {
        toast.success('Updated and send for verification successful !', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2700
        });
    };

    const displayDeleteToast = () => {
        toast.success('Product deleted successful !', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2700
        });
    };

    const orderPlacedToast = () => {
        toast.success('Order Placed Successful!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000
        });
    };

    const cartData = allProducts.filter(item => {
        return cartItems.find(val => {
            return item._id === val.productId
        })
    })

    const myOrders = allProducts.filter(item => {
        return orderedItems.find(val => {
            return item._id === val.productId
        })
    })

    // console.log(cartData);
    // console.log(cartItems);

    const getCartItems = () => {
        setshowFSM(true)
        dispatch(getCartItemsAction(signin.id))
    }

    const handleRemoveFromCart = productId => {
        const filteredData = cartItems.filter(item => item.productId === productId)
        console.log(filteredData);
        dispatch(removeFromCart(filteredData[0]._id))
        setshow({ ...show, orderBox: false, ctoButton: true })
    }

    const placeOrder = () => {
        dispatch(placeOrderAction(cartItems))
        dispatch(cartDataRAO(cartItems))
        setshow({ ...show, spinner: true })
        setTimeout(() => {
            setshow({
                billBox: false,
                orderBox: false,
                spinner: false,
                orderAlert: true,
                ctoButton: true
            })
            orderPlacedToast()
        }, 1400);
    }

    const handleGetMyOrders = () => {
        dispatch(userOrderedItems(signin.id))
        setshowOffcanvas({ ...Offcanvas, myOrders: true })
    }

    const handleGetReceivedOrders = () => {
        dispatch(receivedOrdersActions(signin.id))
        setshowOffcanvas({ ...Offcanvas, receivedOrders: true })
    }

    const handleLogOut = () => {
        signin && dispatch(userLogOutAction())
        adminLoginData && dispatch(adminLogOutAction())
    }

    var total = 0
    for (let i = 0; i < cartData.length; i++) {
        // settotalPrice(totalPrice + totalPrice[i].productPrice)
        // JSON.parse(JSON.stringify(cartData))
        total += cartData[i].productPrice
        console.log(cartData[i].productPrice);
    }

    useEffect(() => {
        dispatch(getAllProductAction())
        setshowOffcanvas({ ...Offcanvas, myProducts: false })
        setallUserProducts([])
    }, [deleteProduct])

    useEffect(() => {
        dispatch(getCartItemsAction(signin?.id))
        setshow({ ...show, billBox: cartData.length <= 0 ? false : true })

    }, [removedFromCart, orderPlaced])

    return <>
        <ToastContainer />
        {/* {JSON.stringify(adminLoginData)} */}
        <Nav style={{ backgroundColor: '#d21ecc' }} className="justify-content-between sticky-top olx-Navbar navShadow" activeKey="/home">
            {

                adminLoginData
                    ? <>
                        <img src='../../images/animLogo.gif' height={66.2} width={180} alt="logo" />

                        <div className='d-flex'>
                            <Nav.Item>
                                <Link className="nav-link my-2 text-light mx-3 LinkDesign" to="/admin/home">Home</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link className="nav-link my-2 text-light mx-2 LinkDesign" to="/admin">Admin</Link>
                            </Nav.Item>

                        </div>

                        <div>
                            <Dropdown>
                                <Dropdown.Toggle
                                    className='my-3 btn-sm me-4 mx-1 '
                                    variant="dark"
                                    style={{ backgroundColor: "indigo" }}
                                    size="sm"
                                    id="dropdown-basic"
                                >
                                    <i class="bi bi-person-circle text-info"></i> Mr. {adminLoginData?.adminName}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={e => navigate("/admin/users")}>All Users</Dropdown.Item>

                                    <Dropdown.Item onClick={handleLogOut} className="text-danger">
                                        - Log-out
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                    </>
                    : !signin
                        ? <>

                            {/* <img src='../../images/logo.png' height={63} width={100} alt="logo" /> */}
                            <img src='../../images/animLogo.gif' height={63} width={180} alt="logo" />

                            <div className='d-flex'>
                                <Nav.Item>
                                    <Link className="nav-link my-2 text-light mx-3 LinkDesign" to="/">Home</Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Link className="nav-link my-2 text-light mx-3 LinkDesign" to="/addproducts">Add-Product</Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Link className="nav-link my-2 text-light LinkDesign" to="/signin">Sign-In</Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Link className="nav-link my-2 text-light LinkDesign" to="/signup">Sign-Up</Link>
                                </Nav.Item>
                            </div>
                            <span>
                                <Link className="nav-link my-2 text-light LinkDesign" to="/admin/login">Admin Login</Link>
                            </span>
                        </>
                        : <>
                            <div className='text-info d-flex'>
                                <img src='../../images/animLogo.gif' height={66.2} width={180} alt="logo" />
                            </div>
                            <div className='d-flex align-items-center'>
                                <Nav.Item>
                                    <Link className="nav-link my-2 text-light mx-3 LinkDesign" to="/">Home</Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Link className="nav-link my-2 text-light mx-3 LinkDesign" to="/addproducts">Add-Product</Link>
                                </Nav.Item>
                            </div>
                            <div className='d-flex'>
                                <Button
                                    onClick={getCartItems}
                                    // setshowOffcanvas(true)
                                    className='my-3 btn-sm mx-1'
                                    variant={'dark'}
                                    style={{ backgroundColor: "violet" }}
                                >
                                    <i class="bi bi-cart4 text-primary p-1">
                                    </i>
                                    <span class="badge bg-light text-primary">{cartData.length !== 0 ? cartData.length : null}</span>
                                </Button>

                                <Dropdown>
                                    <Dropdown.Toggle
                                        className='my-3 btn-sm me-4 mx-1 '
                                        variant="dark"
                                        style={{ backgroundColor: "violet" }}
                                        size="sm"
                                        id="dropdown-basic"
                                    >
                                        <i class="bi bi-person-circle text-dark"></i>  Mr. {signin.userName}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            onClick={handleGetMyOrders}>
                                            My Orders
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={e => setshowOffcanvas({ ...showOffcanvas, myProducts: true })}>
                                            My Products
                                        </Dropdown.Item>

                                        <Dropdown.Item
                                            onClick={handleGetReceivedOrders}>
                                            Orders received
                                            <span class="badge text-success">{receivedOrders.length !== 0 ? receivedOrders.length : null}</span>
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={handleLogOut} className="text-danger">
                                            - Log-out
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </>
            }
        </Nav>

        {/* offcanvas */}
        <Offcanvas id="offCanvas" show={showOffcanvas.myProducts} placement={'end'} size="lg" onHide={e => setshowOffcanvas({ ...Offcanvas, myProducts: false })}>
            <Offcanvas.Header closeButton>
                {/* <Offcanvas.Title>Offcanvas</Offcanvas.Title> */}
                <div>
                    <Button onClick={e => {
                        const userAllProducts = allProducts.filter(item => item.userId === signin.id)
                        setallUserProducts(userAllProducts)
                        setuserProducts([])
                        setrejecteds([])
                    }} variant='secondary' className='btn-sm mx-3'><i class="bi bi-chevron-down"></i> All-Products</Button>

                    <Button onClick={e => {
                        const userPublishedProducts = allProducts.filter(item => item.userId === signin.id && item.published === true)
                        setuserProducts(userPublishedProducts)
                        setrejecteds([])
                        setallUserProducts([])
                    }} variant='secondary' className='btn-sm mx-3'><i class="bi bi-chevron-down"></i> Published</Button>

                    <Button onClick={e => {
                        const userUnderScrutinyProducts = allProducts.filter(item => item.userId === signin.id && item.adminRefused === false && item.published === false)
                        setuserProducts(userUnderScrutinyProducts)
                        setrejecteds([])
                        setallUserProducts([])
                    }} variant='secondary' className='btn-sm mx-3'><i class="bi bi-chevron-down"></i> Under-Scrutiny</Button>

                    <Button onClick={e => {
                        const userRefusedProducts = allProducts.filter(item => item.userId === signin.id && item.adminRefused === true)
                        setrejecteds(userRefusedProducts)
                        setuserProducts([])
                        setallUserProducts([])
                    }} variant='secondary' className='btn-sm mx-3'><i class="bi bi-chevron-down"></i> Rejected</Button>
                </div>

            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className="row">
                    <div className="col-sm-6">
                        {
                            allUserProducts?.map(item => <Card
                                style={{ width: '30rem' }}
                                // id="offCard"
                                className="mt-1 offCart">
                                <Card.Body>
                                    <div className="row">
                                        <div className='d-flex'>
                                            <div className="col-md-6">
                                                <Card.Img variant="top" src={`https://olx-express-backend.vercel.app/${item.productImage}`} width={280} height={180} />
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
                                    <Button
                                        onClick={e => setdelModalData({ ...delModalData, productId: item._id, show: true })}
                                        id='removePublishButton'
                                        className='btn btn-sm  btn-danger position-absolute top-0 end-0'>
                                        Delete
                                    </Button>

                                </Card.Body>

                            </Card>)
                        }
                        {
                            userProducts?.map(item => <Card
                                style={{ width: '30rem' }}
                                // id="offCard"
                                className="mt-1 offCart">
                                <Card.Body className='d-flex'>
                                    <div className="row">
                                        <div className="col-md-7">
                                            <Card.Img variant="top" src={`https://olx-express-backend.vercel.app/${item.productImage}`} width={286} height={180} />
                                        </div>
                                        <div className="col-md-5">
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
                                </Card.Body>
                            </Card>)
                        }
                        {
                            rejecteds?.map(item => <Card
                                style={{ width: '30rem' }}
                                // id="offCard"
                                className="mt-1 offCartRej bg-danger">
                                <Card.Body className='d-flex'>
                                    <div className="row">
                                        <div className="col-md-7">
                                            <Card.Img variant="top" src={`https://olx-express-backend.vercel.app/${item.productImage}`} width={286} height={180} />
                                        </div>
                                        <div className="col-md-5">
                                            <div className='mt-2'>
                                                <span>Name : <strong className='h5'>{item.productName}</strong></span><br />
                                                <span>Discription : <strong className='text-dark'>{item.productDescription}</strong></span> <br />
                                                <div>
                                                    <span>Category : <strong className='text-dark'>{item.productCategory}</strong></span>
                                                </div>
                                                <span>Price : <strong className='text-dark'>₹ {item.productPrice}</strong></span><br />

                                                <Button
                                                    onClick={e => {
                                                        seteditModal(true)
                                                        seteditData({
                                                            ...editData,
                                                            productId: item._id,
                                                            productName: item.productName,
                                                            productCategory: item.productCategory,
                                                            productPrice: item.productPrice,
                                                            productDescription: item.productDescription,
                                                        })
                                                    }}
                                                    variant='warning'
                                                    className='btn-sm m-2'>Edit & reverify</Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>)
                        }


                    </div>

                </div>
            </Offcanvas.Body>
        </Offcanvas >

        {/* offcanvas 01 */}
        <Offcanvas id="offCanvas" show={showOffcanvas.myOrders} placement={'end'} size="lg" onHide={e => setshowOffcanvas({ ...Offcanvas, myOrders: false })}>
            <Offcanvas.Header closeButton>
                my orders

            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className="row">
                    <div className="col-sm-6">

                        {
                            myOrders.map(item => <Card
                                style={{ width: '30rem' }}
                                // id="offCard"
                                className="mt-1 offCart ">
                                <Card.Body className='d-flex'>
                                    <div className="row">
                                        <div className="col-md-7">
                                            <Card.Img variant="top" src={`https://olx-express-backend.vercel.app/${item.productImage}`} width={286} height={180} />
                                        </div>
                                        <div className="col-md-5">
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
                                </Card.Body>
                            </Card>)
                        }

                    </div>

                </div>
            </Offcanvas.Body>
        </Offcanvas >


        {/* offcanvas 02 */}
        <Offcanvas id="offCanvas" show={showOffcanvas.receivedOrders} placement={'end'} size="lg" onHide={e => setshowOffcanvas({ ...Offcanvas, receivedOrders: false })}>
            <Offcanvas.Header closeButton>
                {/* <Offcanvas.Title>Offcanvas</Offcanvas.Title> */}
                received orders
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className="row">
                    <div className="col-sm-8">
                        {
                            receivedOrders.slice(0).reverse().map(item => <Alert key={item._id} variant={'success'} className="shadowCard">
                                You have received order of product (ID : {item.productId}) from {item.buyerEmail}
                            </Alert>
                            )
                        }

                    </div>
                </div>
            </Offcanvas.Body>
        </Offcanvas >

        {/* full screen modal */}
        <Modal style={{ marginTop: 63 }} show={showFSM} fullscreen={true} onHide={() => {
            setshowFSM(false)
            setshow({ ...show, orderAlert: false })
        }}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {
                        cartData.length === 0
                            ? <>
                                <h5 className='text-center text-danger'>
                                    No Item In Your Cart, Lets go
                                    <Alert.Link href="/" className='h5'> shopping </Alert.Link>
                                    to add items.
                                </h5>
                                <img src='../../images/emptycart.gif' height={170} width={220} alt="logo" className='cartLogo' />
                            </>
                            : <>
                                <img src='../../images/animCart.gif' height={100} width={120} alt="logo" className='cartLogo' />
                            </>
                    }
                </Modal.Title>
                {
                    show.orderAlert && <Alert variant={'success'} className="mx-auto">
                        Hurray! your order placed successfully...! you can check My Orders for more detail.
                    </Alert>
                }
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-md-4">

                            {
                                cartData.map(item => <Card style={{ width: '30rem' }} className="mt-1 shadowCard">
                                    <Card.Body className='d-flex'>
                                        <div className="row">
                                            <div className="col-md-8">
                                                <Card.Img variant="top" src={`https://olx-express-backend.vercel.app/${item.productImage}`} width={286} height={180} className="rounded-1" />
                                            </div>
                                            <div className="col-md-4">
                                                <div className='mx-1'>
                                                    <span>Name : <strong className='h'>{item.productName}</strong></span><br />
                                                    <span>Discription : <strong className='text-dark'>{item.productDescription}</strong></span> <br />
                                                    <div>
                                                        <span>Category : <strong className='text-dark'>{item.productCategory}</strong></span>
                                                    </div>
                                                    <span>Price : <strong className='text-dark'>₹ {item.productPrice}</strong></span><br />
                                                </div>
                                                <Button onClick={e => handleRemoveFromCart(item._id)} variant='outline-warning' className='w-100 btn-sm mt-1'><i class="bi bi-trash3-fill text-danger"></i></Button>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>

                                )
                            }
                        </div>
                        <div className="col-md-4">
                            {
                                show.billBox && <>

                                    {
                                        cartData.map(item => <>
                                            <h5 className='mx-5 my-2 text-dark'>{item.productName} - Price : {item.productPrice}</h5>
                                        </>)
                                    }
                                    <hr />
                                    <h4 className='mx-5 text-dark'>  Total Price : {total}</h4>
                                    <br /><br />
                                    {
                                        show.ctoButton && <Button
                                            onClick={e => setshow({ ...show, orderBox: true, ctoButton: false })}
                                            variant='outline-info' className='col-md-10 btn-sm offset-1 shadowCard'>
                                            Continue To Order
                                        </Button>
                                    }
                                </>
                            }
                        </div>
                        <div className="col-md-4">
                            {
                                show.orderBox && <>
                                    <h5 className='text-center my-2'>Choose Payment Method</h5>
                                    <br /><br />
                                    <div className="mb-3 ms-5">

                                        <Form.Check
                                            inline
                                            label="Online (Phone-Pe, Google-Pe, Paytm)"
                                            name="group1"
                                            type={'radio'}
                                        />
                                        <br />
                                        <Form.Check
                                            inline
                                            label="Cash On Delivery"
                                            name="group1"
                                            type={'radio'}
                                        />

                                    </div>
                                    <br /><br />
                                    <Button onClick={e => setshow({ ...show, orderBox: false, ctoButton: true })}
                                        variant='outline-warning'
                                        className='col-md-10 btn-sm offset-1 shadowCard'>
                                        Cancel
                                    </Button>
                                    <Button onClick={placeOrder}
                                        variant='outline-success' className='col-md-10 btn-sm offset-1 shadowCard'>
                                        {show.spinner
                                            ? <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                            : "Place Order"
                                        }
                                    </Button>
                                    <br /><br /><br />
                                </>
                            }
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>

        {/* Delete Modal */}
        <DeleteModal delModalData={delModalData} setdelModalData={setdelModalData} displayDeleteToast={displayDeleteToast} />

        {/* Edit Modal */}
        <EditModal seteditModal={seteditModal} editModal={editModal} seteditData={seteditData} editData={editData} setshowOffcanvas={setshowOffcanvas} showOffcanvas={showOffcanvas} showToastMessage={showToastMessage} setrejecteds={setrejecteds} />
    </>
}
