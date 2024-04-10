import ReactPaginate from 'react-paginate';
import React, { useState } from 'react';

const TableUserPaginate = ({ listUsers, handleClickBtnUpdateUser, handleClickBtnViewUser, handleClickBtnDeleteUser, fetchListUsersWithPaginate, pageCount }) => {

    const handlePageClick = (event) => {
        fetchListUsersWithPaginate(+event.selected + 1)
    };

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUsers && listUsers.length > 0 &&
                        listUsers.map((user, index) => (
                            <tr key={`table-user-${index}`}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => handleClickBtnViewUser(user)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="btn btn-warning mx-3"
                                        onClick={() => handleClickBtnUpdateUser(user)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleClickBtnDeleteUser(user)}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))
                    }

                    {
                        listUsers && listUsers.length === 0 &&
                        <tr>
                            <td colSpan="4" className="text-center">No data</td>
                        </tr>
                    }
                </tbody>
            </table>
            <div className="user-pagination d-flex justify-content-center">
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </div>
        </>
    )
}

export default TableUserPaginate;