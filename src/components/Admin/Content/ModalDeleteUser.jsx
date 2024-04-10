import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../services/APIService';
import { toast } from 'react-toastify';

const ModalDeleteUser = ({ show, setShow, fetchListUsers, dataDelete, resetDataDelete }) => {
    const handleClose = () => {
        setShow(false)
    }

    const handleSubmitDeleteUser = async () => {
        let data = await deleteUser(dataDelete.id)

        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }

        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            await fetchListUsers()
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete user?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure that you want to delete user <b>
                    {dataDelete && dataDelete.email ? dataDelete.email : ""}?
                </b> This action cannot be revoked
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;