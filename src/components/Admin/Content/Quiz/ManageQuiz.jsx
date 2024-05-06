import { useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";

const options = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
]

const ManageQuiz = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('EASY')
    const [image, setImage] = useState('')

    const handleChangeFile = (e) => {

    }

    return (
        <div className="quiz-container">
            <div className="title">
                Manage Quiz
            </div>
            <hr />
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
                            value={type}
                            options={options}
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
                </fieldset>
            </div>
            <div className="list-detail">
                table
            </div>
        </div>
    )
}

export default ManageQuiz;