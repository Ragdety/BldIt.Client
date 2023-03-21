import { useState } from "react";

//apiFunc is the axios call
export default (apiFunc) => {
    const [data, setData] = useState(null);
    const [success, setSuccess] = useState(false);
    const [status, setStatus] = useState(0);
    const [errorData, setErrorData] = useState([]);
    const [loading, setLoading] = useState(false);

    //args is the parameters for the axios call depending on the apiFunc passed in
    const request = async (...args) => {
        setLoading(true);
        try {
            const response = await apiFunc(...args);

            setData(response.data);
            setStatus(response.status);

            setSuccess(true);
            setErrorData([]);
        } catch (err) {
            //console.log(err)
            setSuccess(false);

            setErrorData(err.response.data);
            setStatus(err.response.status);
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        success,
        status,
        errorData,
        loading,
        request
    };
};