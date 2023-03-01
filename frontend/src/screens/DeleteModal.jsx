import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { deleteUserProduct } from '../redux/action/productActions';


export default function DeleteModal({ delModalData, setdelModalData, displayDeleteToast }) {

    const dispatch = useDispatch()

    const handleDeleteProduct = () => {
        dispatch(deleteUserProduct(delModalData.productId))
        setdelModalData({ ...delModalData, show: false })
        displayDeleteToast()
    }

    return <>
        <Modal show={delModalData.show} onHide={e => setdelModalData({ ...delModalData, show: false })} className="mt-5">
            <Modal.Body>
                <h5 className='text-danger text-center'>
                    Are you sure want to delete this product?
                </h5>
                <div className='offset-4'>
                    <Button className='btn-sm mx-1' variant="info" onClick={e => setdelModalData({ ...delModalData, show: false })}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteProduct}
                        className='btn-sm mx-1' id='removePublishButton' variant="primary" >
                        Delete
                    </Button>
                </div>
            </Modal.Body>

        </Modal>
    </>
}
