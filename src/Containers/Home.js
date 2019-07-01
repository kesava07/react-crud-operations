import React, { Component } from 'react'
import Header from '../Components/Header';
import Axios from 'axios';

export default class Home extends Component {
    state = {
        data: [],
        error: null,
        loading: false
    };

    componentDidMount() {
        this.setState({ loading: true })
        Axios.get("/users")
            .then(res => this.setState({ data: res.data, loading: false }))
            .catch(err => this.setState({ error: err, loading: false }))
    };

    getUserData = (user) => console.log(user);

    // displayDataFunc = (data) => data && data.map((user) =>
    //     <div className="col-md-4 mb-3" key={user.id} onClick={() => this.getUserData(user)}>
    //         <div className="card card-body">
    //             <h1>{user.id}</h1>
    //             <p>{user.name}</p>
    //         </div>
    //     </div>
    // )

    postData = () => {
        const data = {
            name: "Jhon",
            age: "23",
            location: "Chennai"
        };

        Axios.post("your firebase URL /usersData.json", data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    render() {
        const { data, loading } = this.state;
        let displayData = null;

        if (data.length > 0) {
            displayData = (
                data.map((user) =>
                    <div className="col-md-4 mb-3" key={user.id} onClick={() => this.getUserData(user)}>
                        <div className="card card-body">
                            <h1>{user.id}</h1>
                            <p>{user.name}</p>
                        </div>
                    </div>
                ));
        };

        return (
            <div>
                <Header />
                <h1 className="text-center mt-2">Home</h1>
                <div className="text-center">
                    <button className="btn btn-primary" onClick={this.postData}>Post Data</button>
                </div>
                <div className="row">
                    {loading && <h1 className="text-center">Loding...</h1>}

                    {/* Displaying data by viriable */}

                    {displayData}

                    {/* displaying data by function */}

                    {/* {this.displayDataFunc(data)} */}


                    {/* Displaying data by jsx code */}

                    {/* {
                        data && data.map((user) =>
                            <div className="col-md-4 mb-3" key={user.id} onClick={() => this.getUserData(user)}>
                                <div className="card card-body">
                                    <h1>{user.id}</h1>
                                    <p>{user.name}</p>
                                </div>
                            </div>
                        )
                    } */}

                </div>
            </div>
        )
    }
}
