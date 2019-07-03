import React from 'react';
import PropTypes from 'prop-types';
const Table = (props) => {
    // console.log(props)

    return (
        <div>
            <h3 className="text-center text-primary">{props.title}</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Gender</th>
                        <th>Employee</th>
                        <th>Car type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.data && props.data.map(user => (
                            <tr key={user.key}>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.gender}</td>
                                <td>{user.employee ? "Yes" : "No"}</td>
                                <td>{user.selectedCar}</td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => props.handleStartUpdateUser(user)}
                                    > <i className="fa fa-pencil"></i>
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => props.handleDelete(user.key)}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
};

Table.defaultProps = {
    title: "default title"
};

Table.propTypes = {
    data: PropTypes.array,
    handleDelete: PropTypes.func
};



export default Table;