import { useRef } from "react"
import CountDown from "./CountDown"

const RightContent = ({ dataQuiz, handleFinish, setIndex }) => {
    const refDiv = useRef([])

    const onTimeUp = () => {
        handleFinish()
    }

    const getClassQuestion = (index, question) => {
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(a => a.isSelected === true)
            if (isAnswered) {
                return "question selected"
            }
        }
        return "question"
    }

    const handleClickQuestion = (question, index) => {
        refDiv?.current?.forEach(item => {
            if (item && item.className === "question clicked") {
                item.className="question"
            }
        })

        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(a => a.isSelected === true)
            if (isAnswered) {
                return
            }
        }
        setIndex(index)
        refDiv.current[index].className = "question clicked"
    }

    return (
        <>
            <div className="main-timer">
                <CountDown
                    onTimeUp={onTimeUp}
                />
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div
                                key={`question-abc-${index}`}
                                className={getClassQuestion(index, item)}
                                onClick={() => handleClickQuestion(item, index)}
                                ref={ref => (refDiv.current[index] = ref)}
                            >
                                {index + 1}
                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}

export default RightContent