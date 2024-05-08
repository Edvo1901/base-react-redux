import { useState, useEffect } from "react";
import Select from "react-select";
import { getAllQuizForAdmin, getAllUsers, postAssignQuiz } from "../../../services/APIService";
import { toast } from "react-toastify";

const AssignQuiz = () => {
    const [listQuiz, setListQuiz] = useState([])
    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [listUser, setListUser] = useState([])
    const [selectedUser, setSelectedUser] = useState({})

    const fetchQuizList = async () => {
        let res = await getAllQuizForAdmin()

        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`
                }
            })
            setListQuiz(newQuiz)
        }
    }

    const fetchUserList = async () => {
        let res = await getAllUsers()

        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            })
            setListUser(newQuiz)
        }
    }

    const handleAssign = async () => {
        let res = await postAssignQuiz(+selectedQuiz.value, +selectedUser.value)

        if (res && res.EC === 0) {
            toast.success(res.EM)
        } else {
            toast.error(res.EM)
        }
    }

    useEffect(() => {
        fetchQuizList()
        fetchUserList()
    }, [])

    return (
        <div className="assign-quiz-container row">
            <div className="col-6 form-group">
                <label className="mb-2">Select quiz:</label>
                <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>
            <div className="col-6 form-group">
                <label className="mb-2">Select user:</label>
                <Select
                    defaultValue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>
            <div>
                <button
                className="btn btn-warning mt-3"
                onClick={() => handleAssign()}
                >Assign
                </button>
            </div>
        </div>
    )
}

export default AssignQuiz