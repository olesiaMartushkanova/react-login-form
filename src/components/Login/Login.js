import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.includes('@'),
    };
  }
  if (action.type === 'USER_BLUR') {
    return {
      value: state.value,
      isValid: state.value.includes('@'),
    };
  }
  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6,
    };
  }
  if (action.type === 'USER_BLUR') {
    return {
      value: state.value,
      isValid: state.value.trim().length > 6,
    };
  }
  return { value: '', isValid: false };
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchedEmail] = useReducer(emailReducer, {
    value: '',
    state: null,
  });
  const [passwordState, dispatchedPassword] = useReducer(passwordReducer, {
    value: '',
    state: null,
  });

  // With empty array of dependencies, useEffect() runs only once
  useEffect(() => {
    console.log('Second useEffect');
  }, []);

  // Alias assignment inside destructuring: we assign 'isValidEmail' name to 'isValid'
  const { isValid: isValidEmail } = emailState;
  const { isValid: isValidPassword } = passwordState;

  // After each re-run this will be run only if dependencies are met
  // Every time when component is revaluated and enteredEmail or enteredPassword state has been changed
  // This code runs only of email and password are entered
  // Use effect is handling side effect
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Side effect function');
      setFormIsValid(isValidEmail && isValidPassword);
    }, 500);

    // Clean up function
    // Runs before every next side effect function execution
    return () => {
      console.log('Clean up');
      clearTimeout(identifier);
    };
  }, [isValidEmail, isValidPassword]);

  const emailChangeHandler = (event) => {
    dispatchedEmail({ type: 'USER_INPUT', val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchedPassword({ type: 'USER_INPUT', val: event.target.value });
  };

  const validateEmailHandler = () => {
    // Input lost focus here
    dispatchedEmail({ type: 'USER_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchedPassword({ type: 'USER_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}>
          <label htmlFor='email'>E-Mail</label>
          <input
            type='email'
            id='email'
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type='submit' className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
