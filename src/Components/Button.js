import React from 'react';

const Button = (props) => {
    let btnColor = "btn-primary";
    if (props.visibility) {
        btnColor = "btn-danger"
    }
    return (
        <div>
            <button
                className={`btn ${btnColor}`}
                onClick={props.handleVisibility}>{props.visibility ? "HIDE" : "SHOW"}
            </button>
            {
                props.visibility ? <h1>I'm Visible</h1> : null
            }
        </div>
    )
}

export default Button;