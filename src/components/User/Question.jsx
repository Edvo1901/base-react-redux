import _ from 'lodash';

const Question = ({ index, data }) => {
    if (_.isEmpty(data)) {
        return (<></>)
    }

    return (
        <>
            {data.image &&
                <div className="q-image">
                    <img src={`data:image/png;base64,${data.image}`} alt="" />
                </div>
            }
            <div className="question">Question number {index + 1}: {data.questionDescription}</div>
            <div className="answer">
                {data.answers &&
                    data.answers.map((item, index) => {
                        return (
                            <div key={`answer-${index}`}>
                                <div class="form-check">
                                    <input className="form-check-input" type="checkbox" value="" />
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