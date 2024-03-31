import React, { useEffect, useState } from 'react';
import "./DisplayInfo.scss";
import logo from "./../logo.svg";

const DisplayInfo = (props) => {
    const {listUsers, removeUser} = props;
    const [showHide, setShowHide] = useState(true);

    const showHideList = () => {
        setShowHide(!showHide);
    }

    useEffect(() => {
        if (listUsers.length === 0) {
            alert("Deleted all")
        }
        console.log("Call me useffect")
    }, [listUsers])

    return (
        <div className="display-info-container">
            <img src={logo} alt="logoImg" />
            <div>
                <button onClick={() => showHideList()}>
                    {showHide === true ? "Hide list user" : "Show list user"}
                </button>
            </div>
            {
                showHide &&
                <div>
                    {
                        listUsers.map((user) => {
                            return (
                                <label key={user.id} className={+user.age > 18 ? "green" : "red"}>
                                    User {user.id}, Name: {user.name}, Age: {user.age}
                                    <button onClick={() => removeUser(user.id)}>X</button>
                                    <br />
                                </label>
                            )
                        })
                    }
                </div>
            }

        </div>
    )
}

export default DisplayInfo;