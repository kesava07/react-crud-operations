import React, { Component } from 'react';
import Header from '../Components/Header';
import Table from '../Components/Table/Table';
import Axios from 'axios';

export default class Home extends Component {
    state = {
        data: [],
        userName: '',
        email: '',
        phoneNumber: '',
        gender: '',
        employee: false,
        selectedCar: '',
        update: false,
        idToUpdate: null
    };

    componentDidMount() {
        this.getData()
    };

    //getting users data fromserver

    getData = () => {
        Axios.get("Your Firebase URL")
            .then(res => {
                const copyData = [];
                for (let keys in res.data) {
                    copyData.push({ ...res.data[keys], key: keys })
                }
                this.setState({ data: copyData });
            });
    };

    //onchanging the input vaalues

    handleOnchange = (event) => {
        const input = event.target;
        const value = event.target.type === "checkbox" ? input.checked : input.value;

        this.setState({ [input.name]: value });
    };

    // submitting the form

    handleSubmitForm = event => {
        event.preventDefault();
        const { userName, email, phoneNumber, gender, employee, selectedCar } = this.state;
        const data = {
            userName: userName,
            email: email,
            phoneNumber: phoneNumber,
            gender: gender,
            employee: employee,
            selectedCar: selectedCar
        };

        Axios.post("Your Firebase URL", data)
            .then(res => {
                console.log("sucess");
                this.setState({ userName: "", email: "", phoneNumber: '', gender: '', employee: false, selectedCar: "" })
                this.getData();
            })
            .catch(err => {
                console.log("failed",err)
            });
    };

    //deleting the form data

    handleDelete = (key) => {
        Axios.delete(`Your Firebase URL/${key}.json`)
            .then(res => {
                let copyUsersdata = this.state.data;
                for (let i = 0; i < copyUsersdata.length; i++) {
                    let user = copyUsersdata[i]
                    if (user.key === key) {
                        copyUsersdata.splice(i, 1);
                    }
                }
                this.setState({ data: copyUsersdata })
            })
            .catch(err => {
                console.log("failed",err)
            });
    };

    // Updating the user 

    handleStartUpdateUser = (user) => {
        if (user) {
            this.setState({
                userName: user.userName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                gender: user.gender,
                employee: user.employee,
                selectedCar: user.selectedCar,
                update: true,
                idToUpdate: user.key
            })
        }
    };

    submitUpdatedData = (event) => {
        event.preventDefault();
        const { userName, email, phoneNumber, gender, employee, selectedCar } = this.state;
        const data = {
            userName: userName,
            email: email,
            phoneNumber: phoneNumber,
            gender: gender,
            employee: employee,
            selectedCar: selectedCar
        }
        Axios.put(`Your Firebase URL/${this.state.idToUpdate}.json`, data)
            .then(res => {
                this.setState({ userName: "", email: "", phoneNumber: '', gender: '', employee: false, selectedCar: "", idToUpdate: null, update: false })
                this.getData();
            })
            .catch(err => {
                console.log("failed",err)
            });
    };

    // cancelling the update
    cancelUpdate = () => {
        this.setState({
            userName: "",
            email: "",
            phoneNumber: "",
            gender: "",
            employee: false,
            selectedCar: "",
            update: false,
            idToUpdate: null
        })
    }



    render() {
        const { data, userName, email, phoneNumber, employee, selectedCar, update } = this.state;
        return (
            <div>
                <Header />
                <h1 className="text-center my-4" >Forms</h1>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card card-body">
                                <h3 className="text-center text-primary">Users Form</h3>
                                <form onSubmit={update ? this.submitUpdatedData : this.handleSubmitForm}>
                                    <input
                                        type="text"
                                        className="form-control mb-3"
                                        placeholder="User name"
                                        onChange={this.handleOnchange}
                                        name="userName"
                                        value={userName}
                                    />
                                    <input
                                        type="email"
                                        className="form-control  mb-3"
                                        placeholder="Email"
                                        onChange={this.handleOnchange}
                                        name="email"
                                        value={email}
                                    />
                                    <input
                                        type="number"
                                        className="form-control  mb-3"
                                        placeholder="User name"
                                        onChange={this.handleOnchange}
                                        name="phoneNumber"
                                        value={phoneNumber}
                                    />
                                    <div className="row mb-3">
                                        <div className="col-md-3">
                                            <div className="custom-control custom-radio">
                                                <input
                                                    type="radio"
                                                    className="custom-control-input"
                                                    id="male"
                                                    name="gender"
                                                    value="Male"
                                                    onChange={this.handleOnchange}
                                                    checked={this.state.gender === "Male"}
                                                />
                                                <label className="custom-control-label" htmlFor="male">Male</label>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="custom-control custom-radio">
                                                <input
                                                    type="radio"
                                                    className="custom-control-input"
                                                    id="female"
                                                    name="gender"
                                                    value="Female"
                                                    onChange={this.handleOnchange}
                                                    checked={this.state.gender === "Female"}
                                                />
                                                <label className="custom-control-label" htmlFor="female">Female</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="custom-control custom-checkbox mb-3">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="Employee"
                                            name="employee"
                                            onChange={this.handleOnchange}
                                            checked={employee}
                                        />
                                        <label className="custom-control-label" htmlFor="Employee">Employee</label>
                                    </div>
                                    <select name="selectedCar" value={selectedCar} className="custom-select mb-3" onChange={this.handleOnchange}>
                                        <option defaultValue>Select your car</option>
                                        <option value="volvo">Volvo</option>
                                        <option value="fiat">Fiat</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                    <button type="submit" className="btn btn-primary">
                                        {update ? "Update" : "Submit"}
                                    </button>
                                </form>
                                <div>
                                    {update && <button onClick={this.cancelUpdate} className="btn btn-danger mt-2">
                                        Cancel
                                    </button>}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card card-body">
                                {
                                    data.length > 0 ?
                                        <Table
                                            title="Users Data"
                                            handleDelete={this.handleDelete}
                                            data={this.state.data}
                                            handleStartUpdateUser={this.handleStartUpdateUser} />
                                        :
                                        <p className="text-center m-0 text-danger">No users found</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
