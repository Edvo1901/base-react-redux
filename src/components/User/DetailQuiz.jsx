import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../services/APIService";
import _ from "lodash";
import "./DetailQuiz.scss";

const DetailQuiz = () => {
    const params = useParams()
    const location = useLocation()
    const quizId = params.id

    console.log(location)

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
                    answers.push(item.answers)
                })
                return { questionId: key, data: value, questionDescription, image }
            }).value();
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
                <hr/>
                <div className="q-Body">
                    <img />
                </div>
                <div className="q-content">
                    <div className="question">Question 1: How are you</div>
                    <div className="answer">
                        <div>
                            A. Testing
                        </div>
                        <div>
                            B. Testing
                        </div>
                        <div>
                            C. Testing
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button className="btn btn-secondary">Prev</button>
                    <button className="btn btn-primary">Next</button>
                </div>

            </div>
            <div className="right-content">
                Countdown
            </div>
        </div>
    )
}

export default DetailQuiz;
