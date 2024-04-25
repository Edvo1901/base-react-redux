import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../services/APIService";
import _ from "lodash";

const DetailQuiz = () => {
    const params = useParams()
    const quizId = params.id

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
                return {questionId: key, data: value, questionDescription, image}
            }).value();
        }
    }

    useEffect(() => {
        fetchQuestions()
    }, [quizId])
    
    return (
        <div className="detail-quiz-container">
            DetailQuiz
        </div>
    )
}

export default DetailQuiz;
