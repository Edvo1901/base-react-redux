import { useEffect, useState } from 'react';
import Select from 'react-select';
import "./QuizQA.scss";
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle, AiFillPlusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { toast } from 'react-toastify';
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin, getQuizWithQA } from '../../../services/APIService';
import { postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion } from '../../../services/APIService';

const QuizQA = () => {
    const initQuestion = [
        {
            id: uuidv4(),
            description: "",
            imageFile: "",
            imageName: "",
            isValidQuestion: true,
            answers: [
                { id: uuidv4(), description: "", isCorrect: false, isValidAnswer: true },
            ]
        },
    ]
    const [questions, setQuestions] = useState(initQuestion)
    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [dataImagePreview, setDataImagePreview] = useState({
        title: "",
        url: ""
    })
    const [listQuiz, setListQuiz] = useState([])
    const [selectedQuiz, setSelectedQuiz] = useState({})

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

    const handleSubmitQuestionForQuiz = async () => {
        if (_.isEmpty(selectedQuiz)) return toast.error("Please choose a quiz to assign")

        // Validate question
        let isValidQuestion = true
        let indexQuestionCheck = 0
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQuestion = false
                indexQuestionCheck = i
                questions[i].isValidQuestion = false
                break
            }
        }

        if (!isValidQuestion) return toast.error(`Please fill the question! Question ${indexQuestionCheck + 1}`)

        // Validate answer
        let isValidAnswer = true
        let isCheckedBox = false
        let indexQuestion = 0
        let indexAnswer = 0
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false
                    indexAnswer = j
                    questions[i].answers[j].isValidAnswer = false
                    break
                }

                if (questions[i].answers[j].isCorrect) {
                    isCheckedBox = true
                }
            }
            indexQuestion = i
            if (!isValidAnswer) break
        }

        if (!isValidAnswer) return toast.error(`Please fill all the answer field! Answer ${indexAnswer + 1} at Question ${indexQuestion + 1}`)
        if (!isCheckedBox) return toast.error(`The question need at least one right answer! Question ${indexQuestion + 1}`)

        // Submit question
        for (const question of questions) {
            const q = await postCreateNewQuestionForQuiz(+selectedQuiz.value, question.description, question.imageFile)

            // Submit answer
            for (const answer of question.answers) {
                await postCreateNewAnswerForQuestion(answer.description, answer.isCorrect, q.DT.id)
            }
        }

        toast.success("Create questions and answers succeed!")
        setQuestions(initQuestion)
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

    const urlToFile = (url, fileName, mimeType) => {
        return (
            fetch(url)
            .then(function (res) {return res.arrayBuffer()})
            .then(function (buf) {return new File([buf], fileName, {type: mimeType})})
        )
    }

    const fetchQuizList = async () => {
        let res = await getAllQuizForAdmin()

        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz)
        }
    }

    const fetchQuizWithQA = async () => {
        let res = await getQuizWithQA(selectedQuiz.value)

        if (res && res.EC === 0) {
            let newQA = []
            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i]
                if (q.imageFile) {
                    q.imageName = `Question-${q.id}.png`
                    q.imageFile = await urlToFile(`data:image/png;base64,${q.imageFile}`, `Question-${q.id}.png`, "image/png")
                }
                newQA.push(q)
            }
            setQuestions(newQA)
        }
    }

    useEffect(() => {
        fetchQuizList()
    }, [])

    useEffect(() => {
        if (!selectedQuiz || !selectedQuiz.value) return
        fetchQuizWithQA()
    }, [selectedQuiz])

    return (
        <div className="question-container">
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label className="mb-2">Select quiz:</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
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
                                            placeholder="question"
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
                                            <div key={answer.id} className="answer-content mb-2">
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
                                                        placeholder="Answer"
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

export default QuizQA;