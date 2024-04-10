import axios from '../utils/AxiosCustomise.jsx';

const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData()
    data.append("email", email)
    data.append("password", password)
    data.append("username", username)
    data.append("role", role)
    data.append("userImage", image)

    return axios.post("/api/v1/participant", data)
}

const putUpdateUser = (id, username, role, image) => {
    const data = new FormData()
    data.append("id", id)
    data.append("username", username)
    data.append("role", role)
    data.append("userImage", image)

    return axios.put("/api/v1/participant", data)
}

const getAllUsers = () => {
    return axios.get("/api/v1/participant/all")
}

const deleteUser = (id) => {
    return axios.delete("api/v1/participant", { "data": { "id": id } })
}

const getUSerWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

export { postCreateNewUser, getAllUsers, putUpdateUser, deleteUser, getUSerWithPaginate }