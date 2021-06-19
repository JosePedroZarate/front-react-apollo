import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useMutation, gql } from '@apollo/client';
import { AUTH_TOKEN } from '../constants';
import { Link } from 'react-router-dom';


const SIGNUP_MUTATION = gql`
mutation SignupMutation(
  $email: String!
  $password: String!
  $username: String!
) {
  createUser(
    email: $email
    password: $password
    username: $username
  ) {
   user{
    id
    email
    password
    username
  }
  }

  tokenAuth(username: $username,password: $password){
  token
  }
}
`;

const LOGIN_MUTATION = gql`
  mutation TokenAuth(
    $username: String!
    $password: String!
  ) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;



const Login = () => {
  const history = useHistory();
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    name: ''
  });

const [login] = useMutation(LOGIN_MUTATION, {
  variables: {
    username: formState.email,
    password: formState.password
  },
  onCompleted: ({ tokenAuth }) => {
    console.log(tokenAuth);
    localStorage.setItem(AUTH_TOKEN, tokenAuth.token);
    history.push('/');
  }
});


function refreshPage(){
  window.location.reload(true);
}

const [signup] = useMutation(SIGNUP_MUTATION, {
  variables: {
    username: formState.name,
    email: formState.email,
    password: formState.password
  },
  onCompleted: ({ tokenAuth }) => {
    localStorage.setItem(AUTH_TOKEN, tokenAuth.token);
    history.push('/');

  }
});



  return (
    <div>
      <h4 className="mv3">
        {formState.login ? 'Login' : 'Sign Up'}
      </h4>
      <div className="flex flex-column">
        {!formState.login && (
          <input
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value
              })
            }
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value
            })
          }
          type="text"
          placeholder="Your name"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value
            })
          }
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">

<button
    className="pointer mr2 button"
    onClick={() => {
      //formState.login ? login : signup ()
      if (formState.login ) {
        login(formState.username, formState.password ).then(()=>{
          window.location.reload()

        })

      } else {
        signup(formState.name, formState.password)
      }
    }}
  >
    {formState.login ? 'login' : 'create account' }


  </button >
  <button
    className="pointer button"
    onClick={(e) =>
      setFormState({
        ...formState,
        login: !formState.login
      })
    }
  >
          {formState.login
            ? 'need to create an account?'
            : 'already have an account?'}
        </button>
      </div>
    </div>
  );
};

export default Login;
