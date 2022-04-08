import { Formik, Form, Field }  from 'formik'
import React, {  useState } from 'react';
import { useToggle } from 'react-use';
import styled from 'styled-components';
import { Color } from '../assets/colors';
import useRequest from '../utils/hooks/useRequest';


const Container = styled.div`
display :flex;
height:100%;
background-color: ${Color.BACKGROUND};
`

const FormContainer = styled(Form)`
display:flex;
width: 50%;
flex-direction: column;
gap:10px;
padding:20px;`

const Error = styled.div`

`


type Values = {
    email: string;
    password: string;
  };



const Login = () => {

    const [hasAccount, toggle] = useToggle(false);

    const [error, setError ] = useState<string>();

    const login = useRequest();

    const onSubmit = async (values:Values) => {
    const url = hasAccount ? '/auth/signin' : '/auth/signup'
       const res = await login(url,values,'POST'); 
    } 

    return <Container>
        <Formik
    initialValues={{
      email: '',
      password: '',
    }}
    onSubmit={onSubmit}>
      <FormContainer>
        <Field type='text' name='email'/> 
        <Field type='password' name='password'/>
        <button  type="submit">{hasAccount ? 'signin': 'signup'} </button> 
        <div onClick={toggle}>deja un compte ?</div>
        <Error>{error}</Error>
      </FormContainer>
        </Formik>
      </Container>
}
export default Login;



