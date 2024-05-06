import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { putUpdateQuiz } from '../../../services/APIService';

const ModalUpdateQuiz = ({ showUpdateModal, setShowUpdateModal, fetchQuizList, dataQuiz, resetUpdateQuizData }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (_.isEmpty(dataQuiz)) return
        setName(dataQuiz.name)
        setDescription(dataQuiz.description)
        setType(dataQuiz.difficulty)
        setImage("")
        if (dataQuiz.image) {
            setPreviewImage(`data:image/png;base64,${dataQuiz.image}`)
        }
    }, [dataQuiz])

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }

    const handleClose = () => {
        setShowUpdateModal(false)
        setName("")
        setDescription("")
        setType("EASY")
        setImage("")
        setPreviewImage("")
        resetUpdateQuizData()
    }

    const handleSubmitUser = async () => {
        let data = await putUpdateQuiz(dataQuiz.id, description, name, type, image)

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
            <Modal show={showUpdateModal} onHide={handleClose} size="xl" backdrop="static" className="modal-add-user">
                <Modal.Header closeButton>
                    <Modal.Title>Update current quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Difficulty</label>
                            <select
                                className="form-select"
                                value={type}
                                onChange={(event) => setType(event.target.value)}
                            >
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor="labelUpload">
                                <FcPlus />
                                Upload image file
                            </label>
                            <input
                                type="file"
                                hidden
                                id="labelUpload"
                                onChange={(event) => handleUploadImage(event)}
                            />
                        </div>
                        <div className="col-md-12 img-preview">
                            {previewImage ?
                                <img src={previewImage} alt="test" />
                                :
                                <span>Image Preview</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateQuiz;