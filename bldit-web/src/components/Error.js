import React from 'react';

//Small p component that displays an error message in red
const Error = (props) => {
  return (
    <p style={{ color: "red", marginTop: 3 }} {...props}>
      {props.msg}
    </p>
  );
}

export default Error;