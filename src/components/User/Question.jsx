import _ from 'lodash';

const Question = ({ index, data, handleCheckBox }) => {
    if (_.isEmpty(data)) {
        return (<></>)
    }

    const handleHandleCheckBox = (e, aId, qId) => {
        // console.log(data, id)
        handleCheckBox(aId, qId)
    }

    return (
        <>
            {data.image ?
                <div className="q-image">
                    <img src={`data:image/png;base64,${data.image}`} alt="" />
                </div>
                :
                <div className="q-image">

                </div>
            }
            <div className="question">Question number {index + 1}: {data.questionDescription}</div>
            <div className="answer">
                {data.answers &&
                    data.answers.map((item, index) => {
                        return (
                            <div key={`answer-${index}`} className="a-child">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" checked={item.isSelected} onChange={(e) => handleHandleCheckBox(e, item.id, data.questionId)} />
                                    <label className="form-check-label">
                                        {item.description}
                                    </label>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </>
    )
}

export default Question;