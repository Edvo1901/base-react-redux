import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from 'react-icons/fc';
import { useEffect, useState } from "react";
import { getAllUsers, getUSerWithPaginate } from "../../services/APIService";
import TableUser from "./TableUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
import { set } from "lodash";

const ManageUser = (props) => {
    const LIMIT_USER = 5;
    const [pageCount, setPageCount] = useState(0)
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [showModalViewUser, setShowModalViewUser] = useState(false)
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
    const [dataUpdate, setDataUpdate] = useState({})
    const [dataView, setDataView] = useState({})
    const [dataDelete, setDataDelete] = useState({})
    const [listUsers, setListUsers] = useState([])

    useEffect(() => {
        //fetchListUsers()
        fetchListUsersWithPaginate(1)
    }, [])

    const fetchListUsers = async () => {
        let res = await getAllUsers()
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }

    const fetchListUsersWithPaginate = async (page) => {
        let res = await getUSerWithPaginate(page, LIMIT_USER)
        if (res.EC === 0) {
            setListUsers(res.DT.users)
            setPageCount(res.DT.totalPages)
        }
    }

    const handleClickBtnUpdateUser = (user) => {
        setDataUpdate(user)
        setShowModalUpdateUser(true)
    }

    const handleClickBtnViewUser = (user) => {
        setDataView(user)
        setShowModalViewUser(true)
    }

    const handleClickBtnDeleteUser = (user) => {
        setDataDelete(user)
        setShowModalDeleteUser(true)
    }

    const resetUpdateData = () => {
        setDataUpdate({})
    }

    const resetViewData = () => {
        setDataView({})
    }

    const resetDeleteData = () => {
        setDataDelete({})
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
                    {/* <TableUser
                        listUsers={listUsers}
                        handleClickBtnUpdateUser={handleClickBtnUpdateUser}
                        handleClickBtnViewUser={handleClickBtnViewUser}
                        handleClickBtnDeleteUser={handleClickBtnDeleteUser}
                    /> */}
                    <TableUserPaginate
                        listUsers={listUsers}
                        handleClickBtnUpdateUser={handleClickBtnUpdateUser}
                        handleClickBtnViewUser={handleClickBtnViewUser}
                        handleClickBtnDeleteUser={handleClickBtnDeleteUser}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    fetchListUsers={fetchListUsers}
                    dataUpdate={dataUpdate}
                    resetUpdateData={resetUpdateData}
                />
                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    fetchListUsers={fetchListUsers}
                    dataView={dataView}
                    resetViewData={resetViewData}
                />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    fetchListUsers={fetchListUsers}
                    dataDelete={dataDelete}
                    resetDeleteData={resetDeleteData}
                />
            </div>
        </div>
    )
}

export default ManageUser;