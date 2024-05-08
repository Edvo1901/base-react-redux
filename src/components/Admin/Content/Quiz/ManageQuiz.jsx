import { useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import { createNewQuiz } from "../../../services/APIService.jsx";
import { toast } from 'react-toastify';
import TableQuiz from "./TableQuiz.jsx";
import { Accordion } from "react-bootstrap";
import { getAllQuizForAdmin } from "../../../services/APIService";
import QuizQA from "./QuizQA.jsx";
import AssignQuiz from "./AssignQuiz.jsx";

const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
]

const ManageQuiz = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('EASY')
    const [image, setImage] = useState('')
    const [listQuiz, setListQuiz] = useState([])

    const handleChangeFile = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const fetchQuizList = async () => {
        let res = await getAllQuizForAdmin()

        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }

    const handleSubmitQuiz = async () => {
        if (!name || !description) return toast.error("Please fill all the value!")

        let res = await createNewQuiz(description, name, type?.value, image)

        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName("")
            setDescription("")
            setType("EASY")
            await fetchQuizList()
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage Quiz</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">Add new quiz:</legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    <label>Name</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                    <label>Description</label>
                                </div>
                                <div className="my-3">
                                    <Select
                                        options={options}
                                        defaultValue={type}
                                        onChange={setType}
                                        placeholder={"Quiz type"}
                                    />
                                </div>
                                <div className="more-action form-group">
                                    <label className="mb-1">
                                        Upload image
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={(e) => handleChangeFile(e)}
                                    />
                                </div>
                                <div className="mt-3">
                                    <button
                                        className="btn btn-warning"
                                        onClick={handleSubmitQuiz}
                                    >
                                        Save
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                        <div className="list-detail">
                            <TableQuiz
                                listQuiz={listQuiz}
                                setListQuiz={setListQuiz}
                                fetchQuizList={fetchQuizList}
                            />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Update Q/A quiz</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Assign to user</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default ManageQuiz;