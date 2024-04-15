import { useState } from "react";
import { useEffect } from "react";
import { getQuizByUser } from "../services/APIService";
import "./ListQuiz.scss";
import { useSelector } from "react-redux";

const ListQuiz = () => {
    const [arrQuiz, setArrQuiz] = useState([]);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    const getQuizData = async () => {
        if (!isAuthenticated) return
        const res = await getQuizByUser()
        if (!res || (res && +res.EC !== 0)) return
        if (res && +res.EC === 0) {
            setArrQuiz(res.DT)
        }
    }

    useEffect(() => {
        getQuizData()
    }, [])

    return (
        <div className="list-quiz-container container">
            {arrQuiz && arrQuiz.length > 0 &&
                arrQuiz.map((item, index) => {
                    return (
                        <div className="card" style={{ width: "18rem" }} key={`${index}-quiz`}>
                            <img src={`data:image/jpeg;base64,${item.image}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{item.description}</p>
                                <button href="#" className="btn btn-primary">Start now</button>
                            </div>
                        </div>
                    )
                })}
            {arrQuiz && arrQuiz.length === 0 &&
                <div className="no-quiz">You don't have any quiz yet</div>}
        </div>
    )
}

export default ListQuiz;