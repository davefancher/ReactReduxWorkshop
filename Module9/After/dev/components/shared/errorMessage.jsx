import React from "react"

const ErrorMessage = (props) => (
    props.message
    ? <div>
        <h2 className="text-danger">Error</h2>
        <p className="text-danger">{props.message}</p>
      </div>
    : null);

export default ErrorMessage;