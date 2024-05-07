import { useEffect, useState } from "react"
import ModalUpdateQuiz from "./ModalUpdateQuiz"
import ModalDeleteQuiz from "./ModalDeleteQuiz"

const TableQuiz = ({listQuiz, setListQuiz, fetchQuizList}) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [dataQuiz, setDataQuiz] = useState({})
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const handleClickUpdateQuiz = (quiz) => {
        setDataQuiz(quiz)
        setShowUpdateModal(true)
    }

    const resetUpdateQuizData = () => {
        setDataQuiz({})
    }

    const handleClickDeleteQuiz = (quiz) => {
        setDataQuiz(quiz)
        setShowDeleteModal(true)
    }

    const resetDeleteQuizData = () => {
        setDataQuiz({})
    }

    useEffect(() => {
        fetchQuizList()
    }, [])

    return (
        <>
            <div>List quizzes:</div>
            <table className="table table-hover table-bordered mt-2 my-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listQuiz && listQuiz.map((item, index) => {
                            return (
                                <tr key={`table-quiz-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.difficulty}</td>
                                    <td>
                                        <button className="btn btn-warning mx-2" onClick={() => handleClickUpdateQuiz(item)}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => handleClickDeleteQuiz(item)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <ModalUpdateQuiz
                showUpdateModal={showUpdateModal}
                setShowUpdateModal={setShowUpdateModal}
                fetchQuizList={fetchQuizList}
                dataQuiz={dataQuiz}
                resetUpdateQuizData={resetUpdateQuizData}
            />
            <ModalDeleteQuiz
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                fetchQuizList={fetchQuizList}
                dataQuiz={dataQuiz}
                resetDeleteQuizData={resetDeleteQuizData}
            />
        </>
    )
}

export default TableQuiz