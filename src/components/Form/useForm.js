import React, {useState} from 'react';


export function useForm(initialFValues) {


    const [values, setValues] = useState(initialFValues);

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const resetForm = () => {
        setValues(initialFValues);
    }

    return {
        values,
        setValues,
        handleChange,
        resetForm,

    }
}


export function Form(props) {
    const { children, ...other } = props;
    return (
        <form autoComplete="off" noValidate {...other}>
            {props.children}
        </form>
    )
}
