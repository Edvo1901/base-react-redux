import React, { useState } from 'react';
import AddUserInfor from './AddUserInfor';
import DisplayInfo from './DisplayInfo';

// class MyComponents extends React.Component {
//     state = {
//         listUsers: [
//             { id: 1, name: "User 1", age: 10 },
//             { id: 2, name: "User 2", age: 22 },
//             { id: 3, name: "User 3", age: 30 },
//         ]
//     }

//     addNewUser = (userObj) => {
//         console.log(userObj);
//         this.setState({
//             listUsers: [userObj, ...this.state.listUsers]
//         })
//     }

//     removeUser = (userId) => {
//         let newList = this.state.listUsers;
//         newList = newList.filter(user => user.id !== userId);
//         this.setState({
//             listUsers: newList
//         })
//     }

//     render() {
//         return (
//             <div>
//                 <AddUserInfor
//                     addNewUser={this.addNewUser}
//                 />
//                 <br />
//                 <br />
//                 <DisplayInfo
//                     listUsers={this.state.listUsers}
//                     removeUser={this.removeUser}
//                 />
//             </div>
//         )
//     }
// }

const MyComponents = () => {
    const [listUsers, setListUsers] = useState([
        { id: 1, name: "User 1", age: 11 },
        { id: 2, name: "User 2", age: 22 },
        { id: 3, name: "User 3", age: 35 },
    ])

    const addNewUser = (userObj) => {
        console.log(userObj)
        setListUsers([...listUsers, userObj])
    }

    const removeUser = (userId) => {
        let newList = listUsers;
        newList = newList.filter(user => user.id !== userId);
        setListUsers(newList);
    }

    return (
        <div>
            <AddUserInfor
                addNewUser={addNewUser}
            />
            <br />
            <br />
            <DisplayInfo
                listUsers={listUsers}
                removeUser={removeUser}
            />
        </div>
    )
}

export default MyComponents;