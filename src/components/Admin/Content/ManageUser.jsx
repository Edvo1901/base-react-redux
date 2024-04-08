import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from 'react-icons/fc';
import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/APIService";
import TableUser from "./TableUser";

const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [listUsers, setListUsers] = useState([])

    useEffect(() => {
        fetchListUsers()
    }, [])

    const fetchListUsers = async () => {
        let res = await getAllUsers()
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }


    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="user-content-container">
                <div className="btn-add-new">
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowModalCreateUser(true)}
                    >
                        <FcPlus />
                        Add new user
                    </button>
                </div>
                <div>
                    <TableUser listUsers={listUsers}/>
                </div>
                <ModalCreateUser
                show={showModalCreateUser}
                setShow={setShowModalCreateUser}
                fetchListUsers={fetchListUsers}
                />
            </div>
        </div>
    )
}

export default ManageUser;