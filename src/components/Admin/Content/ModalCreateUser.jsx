import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';

const ModalCreateUser = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="modal-add-user">
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control"/>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">User name</label>
                            <input type="text" className="form-control"/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select">
                                <option selected value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor="labelUpload">
                                <FcPlus/>
                                Upload image file
                            </label>
                            <input type="file" hidden id="labelUpload"/>
                        </div>
                        <div className="col-md-12 img-preview">
                            {/* <span>Image Preview</span> */}
                            <img src="https://media.discordapp.net/attachments/1215130743001587802/1223359050033397812/7d89df00-a9be-11eb-8e05-66965511d7fb.png?ex=6622cb66&is=66105666&hm=736977ab2545d59dacc985f5792a86e8277065cee25797c7834e9da28a525f48&=&format=webp&quality=lossless&width=2240&height=1120" alt="test"/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateUser;