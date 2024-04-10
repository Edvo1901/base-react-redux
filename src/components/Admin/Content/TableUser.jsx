const TableUser = ({ listUsers, handleClickBtnUpdateUser, handleClickBtnViewUser, handleClickBtnDeleteUser }) => {
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
        </>
    )
}

export default TableUser;