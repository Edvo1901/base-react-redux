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

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

const postUserLogin = (email, password) => {
    return axios.post("/api/v1/login", { email, password, delay:5000 })
}

const postUserRegister = (email, username, password) => {
    return axios.post("/api/v1/register", { email, username, password })
}

const getQuizByUser = () => {
    return axios.get("/api/v1/quiz-by-participant")
}

const getDataQuiz = (quizId) => {
    return axios.get(`/api/v1/questions-by-quiz?quizId=${quizId}`)
}

const postSubmitQuiz = (data) => {
    return axios.post("/api/v1/quiz-submit", { ...data })
}

const createNewQuiz = (description, name, difficulty, image) => {
    const data = new FormData()
    data.append("description", description)
    data.append("name", name)
    data.append("difficulty", difficulty)
    data.append("quizImage", image)

    return axios.post("/api/v1/quiz", data)
}

const getAllQuizForAdmin = () => {
    return axios.get("api/v1/quiz/all")
}

const putUpdateQuiz = (id, description, name, difficulty, quizImage) => {
    const data = new FormData()
    data.append("id", id)
    data.append("description", description)
    data.append("name", name)
    data.append("difficulty", difficulty)
    data.append("quizImage", quizImage)

    return axios.put("api/v1/quiz", data)
}

export {
    postCreateNewUser,
    getAllUsers,
    putUpdateUser,
    deleteUser,
    getUserWithPaginate,
    postUserLogin,
    postUserRegister,
    getQuizByUser,
    getDataQuiz,
    postSubmitQuiz,
    createNewQuiz,
    getAllQuizForAdmin,
    putUpdateQuiz
}