import { useEffect, useState } from "react"
import { getAllQuizForAdmin } from "../../../services/APIService"


const TableQuiz = () => {
    const [listQuiz, setListQuiz] = useState([])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin()

        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }

    useEffect(() => {
        fetchQuiz()
    }, [])

    return (
        <>
            <div>List quizzes:</div>
            <table className="table table-hover table-bordered mt-2">
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
                                        <button className="btn btn-warning mx-2">Edit</button>
                                        <button className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default TableQuiz