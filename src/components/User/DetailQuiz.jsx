import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../services/APIService";

const DetailQuiz = () => {
    const params = useParams()
    const quizId = params.id

    const fetchQuestions = async () => {
        const res = await getDataQuiz(quizId)
        console.log(res)
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
