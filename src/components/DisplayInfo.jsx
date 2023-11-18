import React, { useState } from 'react';
import "./DisplayInfo.scss";
import logo from "./../logo.svg";

// class DisplayInfo extends React.Component {
//     state = {
//         showHide: true,
//     }

//     showHideList = (event) => {
//         this.setState({
//             showHide: !this.state.showHide
//         });
//     }

//     componentDidMount() {
//         setTimeout(() => {
//             document.title = "Maybe website"
//         }, 3000)
//     }

//     componentDidUpdate(prevProps, prevState) {
//         console.log("Did update ", this.props, prevProps)

//     }

//     render() {
//         const { name, age, listUsers, removeUser } = this.props;
//         const { showHide } = this.state;
//         return (
//             <div className="display-info-container">
//                 <img src={logo} alt="logoImg"/>
//                 <div>
//                     <button onClick={(event) => this.showHideList(event)}>
//                         {showHide === true ? "Hide list user" : "Show list user"}
//                     </button>
//                 </div>
//                 {
//                     showHide &&
//                     <div>
//                         {
//                             listUsers.map((user) => {
//                                 return (
//                                     <label key={user.id} className={+user.age > 18 ? "green" : "red"}>
//                                         User {user.id}, Name: {user.name}, Age: {user.age}
//                                         <button onClick={() => removeUser(user.id)}>X</button>
//                                         <br />
//                                     </label>
//                                 )
//                             })
//                         }
//                     </div>
//                 }

//             </div>
//         )
//     }
// }

const DisplayInfo = (props) => {
    const {listUsers, removeUser} = props;
    const [showHide, setShowHide] = useState(true);

    const showHideList = () => {
        setShowHide(!showHide);
    }

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