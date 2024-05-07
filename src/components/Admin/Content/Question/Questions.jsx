import { useState } from 'react';
import Select from 'react-select';
import "./Questions.scss";
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle, AiFillPlusSquare } from "react-icons/ai";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const Questions = () => {
    const [selectedQuiz, setSelectedQuiz] = useState({})

    return (
        <div className="question-container">
            <div className="title">
                Manage questions
            </div>
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label>Select quiz:</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    //className="form-control"
                    />
                </div>
                <div className="mt-3">
                    Add new question:
                </div>
                <div>
                    <div className="question-content">
                        <div className="form-floating description">
                            <input type="text" className="form-control" placeholder="name@example.com" />
                            <label>Question description</label>
                        </div>
                        <div className="group-upload">
                            <label className="label-up">Upload image</label>
                            <input type="file" hidden />
                            <span>No file uploaded</span>
                        </div>
                        <div className="btn-add">
                            <span>
                                <BsFillPatchPlusFill className="icon-add" />
                            </span>
                            <span>
                                <BsFillPatchMinusFill className="icon-remove" />
                            </span>
                        </div>

                        {/* <div className="answer">
                        <input file="text" />
                    </div> */}
                    </div>
                    <div className="answer-content">
                        <input
                            className="form-check-input is-correct"
                            type="checkbox"
                        />
                        <div className="form-floating answer-name">
                            <input type="text" class="form-control" placeholder="name@example.com" />
                            <label>Answer 1</label>
                        </div>
                        <div className="btn-group">
                            <span>
                                <AiFillPlusSquare className="icon-add" />
                            </span>
                            <span>
                                <AiOutlineMinusCircle className="icon-remove" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Questions;