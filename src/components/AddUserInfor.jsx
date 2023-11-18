import React, { useState } from "react";

// class AddUserInfor extends React.Component {
//     state = {
//         name: "Maybe",
//         address: "Somewhere",
//         age: 22,
//         content: "Today is a wonderful day",
//         count: 0
//     }

//     handleClick = (event) => {
//         this.setState({
//             name: "Edward",
//             address: "Nash"
//         })
//     }

//     handleOnChange = (event) => {
//         this.setState({
//             name: event.target.value
//         })
//     }

//     handleAgeChange = (event) => {
//         this.setState({
//             age: event.target.value
//         })
//     }

//     handleOnSubmit = (event) => {
//         event.preventDefault()
//         this.props.addNewUser({
//             id: Math.floor((Math.random() * 100) + 1) + "-random",
//             name: this.state.name,
//             age: this.state.age,
//         })
//     }

//     render() {
//         const {name, address, age, content} = this.state;
//         return (
//             <div>
//                 <span>
//                     Hello {name} ({age}), I am at {address}
//                     <br />
//                     {content}
//                 </span>
//                 <br></br>
//                 <form onSubmit={(event) => {this.handleOnSubmit(event)}}>
//                     <label>Name</label>
//                     <input
//                         type="text"
//                         onChange={(event) => this.handleOnChange(event)}
//                     />
//                     <br/>
//                     <label>Age</label>
//                     <input
//                         type="number"
//                         onChange={(event) => this.handleAgeChange(event)}
//                     />
//                     <br/>
//                     <button>Submit</button>
//                 </form>
//             </div>
//         )
//     }
// }

const AddUserInfor = (props) => {
    const [name, setName] = useState("Maybe");
    const [address, setAddress] = useState("Somewhere");
    const [age, setAge] = useState(22);
    const [content, setContent] = useState("Wonderful days");
    const [count, setCount] = useState(0);
    const {addNewUser} = props;

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    }

    const handleOnChange = (event) => {
        setName(event.target.value);
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        addNewUser({
            id: Math.floor((Math.random() * 100) + 1) + "-random",
            name: name,
            age: age,
        })
    }

    return (
        <div>
            <span>
                Hello {name} ({age}), I am at {address}
                <br />
                {content}
            </span>
            <br></br>
            <form onSubmit={(event) => handleOnSubmit(event)}>
                <label>Name</label>
                <input
                    type="text"
                    onChange={(event) => handleOnChange(event)}
                />
                <br/>
                <label>Age</label>
                <input
                    type="number"
                    onChange={(event) => handleAgeChange(event)}
                />
                <br/>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default AddUserInfor;