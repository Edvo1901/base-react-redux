import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuiz } from '../../../services/APIService';

const ModalDeleteQuiz = ({ showDeleteModal, setShowDeleteModal, fetchQuizList, dataQuiz, resetDeleteQuizData }) => {

    const handleClose = () => {
        setShowDeleteModal(false)
        resetDeleteQuizData()
    }

    const handleSubmitDeleteUser = async () => {
        let data = await deleteQuiz(dataQuiz.id)

        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }

        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            await fetchQuizList()
        }
    }

    return (
        <>
            <Modal show={showDeleteModal} onHide={handleClose} size="xl" backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete quiz?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure that you want to delete quiz <b>
                    {dataQuiz && dataQuiz.name ? dataQuiz.name : ""}?
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

export default ModalDeleteQuiz;