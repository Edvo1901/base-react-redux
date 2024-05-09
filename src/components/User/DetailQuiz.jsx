import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../services/APIService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import { postSubmitQuiz } from "../services/APIService";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";

const DetailQuiz = () => {
    const params = useParams()
    const location = useLocation()
    const quizId = params.id
    const [dataQuiz, setDataQuiz] = useState([])
    const [index, setIndex] = useState(0)
    const [isShowModalResult, setShowModalResult] = useState(false)
    const [dataModalResult, setDataModalResult] = useState({})

    const fetchQuestions = async () => {
        const res = await getDataQuiz(quizId)

        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw).groupBy("id").map((value, key) => {
                let answers = []
                let questionDescription, image = null
                value.forEach((item, index) => {
                    if (index === 0) {
                        questionDescription = item.description
                        image = item.image
                    }
                    item.answers.isSelected = false
                    answers.push(item.answers)
                })
                answers = _.orderBy(answers, ["id"], ["asc"])
                return { questionId: key, answers, questionDescription, image }
            }).value();
            setDataQuiz(data)
        }
    }

    const handlePrev = () => {
        if (index - 1 < 0) return
        setIndex(index - 1)
    }

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length === index + 1) return
        setIndex(index + 1)
    }

    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz)
        let question = dataQuizClone.find(item =>
            +item.questionId === +questionId
        )

        if (question && question.answers) {
            let b = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected
                }
                return item
            })
            question.answers = b
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question
            setDataQuiz(dataQuizClone)
        }
    }

    const handleFinish = async () => {
        let payload = {
            quizId: +quizId,
            answers: []
        }
        let answerArr = []
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(item => {
                let questionId = item.questionId;
                let userAnswerId = []
                item.answers.forEach(a => {
                    if (a.isSelected) {
                        userAnswerId.push(a.id)
                    }
                })
                answerArr.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
        }
        payload.answers = answerArr

        let res = await postSubmitQuiz(payload)
        if (res && res.EC === 0) {
            setDataModalResult({
                countCorrect: res.DT.countCorrect,
                countTotal: res.DT.countTotal,
                quizData: res.DT.quizData
            })
            setShowModalResult(true)
        } else {
            alert("Sth is wrong")
        }
    }

    useEffect(() => {
        fetchQuestions()
    }, [quizId])

    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <hr />
                <div className="q-Body">
                    <img />
                </div>
                <div className="q-content">
                    <Question
                        index={index}
                        data={
                            dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []
                        }
                        handleCheckBox={handleCheckBox}
                    />
                </div>
                <div className="footer">
                    <button className="btn btn-secondary" onClick={() => handlePrev()}>Prev</button>
                    <button className="btn btn-primary" onClick={() => handleNext()}>Next</button>
                    <button className="btn btn-warning" onClick={() => handleFinish()}>Finish</button>
                </div>

            </div>
            <div className="right-content">
                <RightContent
                    dataQuiz={dataQuiz}
                    handleFinish={handleFinish}
                    setIndex={setIndex}
                />
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>
    )
}

export default DetailQuiz;
