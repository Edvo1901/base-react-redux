import { useState } from 'react';
import Select from 'react-select';
import "./Questions.scss";
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle, AiFillPlusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { toast } from 'react-toastify';
import Lightbox from "react-awesome-lightbox";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const Questions = () => {
    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: "Question 1",
            imageFile: "",
            imageName: "",
            answers: [
                { id: uuidv4(), description: "Answer 1", isCorrect: false },
            ]
        },
    ])
    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [dataImagePreview, setDataImagePreview] = useState({
        title: "",
        url: ""
    })

    const handleAddRemoveQuestion = (type, id) => {
        if (type === "ADD") {
            const newQuestion = {
                id: uuidv4(),
                description: "",
                imageFile: "",
                imageName: "",
                answers: [
                    { id: uuidv4(), description: "", isCorrect: false },
                ]
            }
            setQuestions([...questions, newQuestion])
        } else if (type === "REMOVE") {
            let questionsClone = _.cloneDeep(questions)

            questionsClone = questionsClone.filter(item => item.id !== id)
            setQuestions(questionsClone)
        }
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions)

        if (type === "ADD") {
            const newAnswer = {
                id: uuidv4(),
                description: "",
                isCorrect: false
            }

            let index = questionsClone.findIndex(item => item.id === questionId)
            if (index < 0) return toast.error("Something went wrong")
            questionsClone[index].answers.push(newAnswer)
            setQuestions(questionsClone)
        } else if (type === "REMOVE") {
            let index = questionsClone.findIndex(item => item.id === questionId)
            if (index < 0) return toast.error("Something went wrong")
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionsClone)
        }
    }

    const handleOnChange = (type, questionId, value) => {
        if (type === "QUESTION") {
            let questionsClone = _.cloneDeep(questions)
            let index = questionsClone.findIndex(item => item.id === questionId)
            if (index < 0) return toast.error("Something went wrong")
            questionsClone[index].description = value
            setQuestions(questionsClone)
        }
    }

    const handleOnChangeFileQuestion = (questionId, e) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index < 0) return toast.error("Something went wrong")
        if (!e.target || !e.target.files) return toast.error("Cannot find the image file")
        questionsClone[index].imageFile = e.target.files[0]
        questionsClone[index].imageName = e.target.files[0].name
        setQuestions(questionsClone)
    }

    const handleAnswerQuestion = (type, questionId, answerId, value) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index < 0) return toast.error("Something went wrong")
        questionsClone[index].answers = questionsClone[index].answers.map(answer => {
            if (answer.id === answerId) {
                if (type === "CHECKBOX") {
                    answer.isCorrect = value
                } else if (type === "INPUT") {
                    answer.description = value
                }
            }
            return answer;
        })
        setQuestions(questionsClone)
    }

    const handleSubmitQuestionForQuiz = () => {

    }

    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index < 0) return toast.error("Something went wrong")
        setDataImagePreview({
            title: questionsClone[index].imageName,
            url: URL.createObjectURL(questionsClone[index].imageFile)
        })
        setIsPreviewImage(true)
    }

    return (
        <div className="question-container">
            <div className="title">
                Manage questions
            </div>
            <hr />
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label className="mb-2">Select quiz:</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>
                <div className="mt-3 mb-2">
                    Add new question:
                </div>
                {
                    questions && questions.length > 0 && questions.map((question, index) => {
                        return (
                            <div className="q-main mb-4" key={question.id}>
                                <div className="question-content">
                                    <div className="form-floating description">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="name@example.com"
                                            value={question.description}
                                            onChange={(e) => handleOnChange("QUESTION", question.id, e.target.value)}
                                        />
                                        <label>Question {index + 1} description</label>
                                    </div>
                                    <div className="group-upload">
                                        <label htmlFor={`${question.id}`}>
                                            <RiImageAddFill className="label-up" />
                                        </label>
                                        <input
                                            id={`${question.id}`}
                                            type="file"
                                            hidden
                                            onChange={(e) => handleOnChangeFileQuestion(question.id, e)}
                                        />
                                        <span>
                                            {question.imageName ?
                                                <span
                                                    onClick={() => handlePreviewImage(question.id)}
                                                    style={{ cursor: "pointer" }}
                                                >{question.imageName}</span>
                                                :
                                                "No file uploaded"}
                                        </span>
                                    </div>
                                    <div className="btn-add">
                                        <span onClick={() => handleAddRemoveQuestion("ADD", "")}>
                                            <BsFillPatchPlusFill className="icon-add" />
                                        </span>
                                        {
                                            questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion("REMOVE", question.id)}>
                                                <BsFillPatchMinusFill className="icon-remove" />
                                            </span>
                                        }
                                    </div>
                                </div>
                                {
                                    question.answers && question.answers.length > 0 && question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className="answer-content mb-4">
                                                <input
                                                    className="form-check-input is-correct"
                                                    type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onChange={(e) => handleAnswerQuestion("CHECKBOX", question.id, answer.id, e.target.checked)}
                                                />
                                                <div className="form-floating answer-name">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="name@example.com"
                                                        value={answer.description}
                                                        onChange={(e) => handleAnswerQuestion("INPUT", question.id, answer.id, e.target.value)}
                                                    />
                                                    <label>Answer {index + 1}</label>
                                                </div>
                                                <div className="btn-group">
                                                    <span onClick={() => handleAddRemoveAnswer("ADD", question.id)}>
                                                        <AiFillPlusSquare className="icon-add" />
                                                    </span>
                                                    {
                                                        question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer("REMOVE", question.id, answer.id)}>
                                                            <AiOutlineMinusCircle className="icon-remove" />
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                {
                                    questions && questions.length > 0 &&
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => handleSubmitQuestionForQuiz()}
                                    >
                                        Save questions
                                    </button>
                                }
                            </div>
                        )
                    })
                }
                {
                    isPreviewImage &&
                    <Lightbox
                        image={dataImagePreview.url}
                        title={dataImagePreview.title}
                        onClose={() => setIsPreviewImage(false)}
                    ></Lightbox>
                }
            </div>
        </div>
    )
}

export default Questions;