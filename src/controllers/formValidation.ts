interface Values {
    username: string;
    password: string;
}

interface Errors {
    username: string;
    password: string;
    main: string;
}

const validateLogin = (values: Values) => {
    let errors: Errors | {} = {username: '', password: ''};

    if (!values.username) return {...errors, username: 'Please fill username'};
    if (!values.password) return {...errors, password: 'Please fill password'};

    return {};
};

export default validateLogin;