import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, cookieUser } from '../../actions/user_action';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Auth from '../../hoc/auth';
import { socketUserLogin } from '../../actions/socket_action';
import { useCookies } from 'react-cookie';
import moment from 'moment';

const Div1 = styled.div`
  margin: auto;
  width: 500px;
  /* padding: 300px; */
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 500px) {
    width: 100% !important;
  }
  h1 {
    font-weight: 700;
    font-size: 40px;
    color: #cecc7f;
    margin-bottom: 30px;
  }
`;
const Input = styled.input`
  width: 350px;
  height: 50px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1.5px solid black;
  outline: none;
  @media screen and (max-width: 350px) {
    width: 300px !important;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 70vh;
`;
const Div2 = styled.div`
  text-align: center;
  /* margin-top: -250px; */
  margin-top: 30px;
  width: 100%;
  align-items: center;
  button {
    background-color: #cecc7f;
    color: #f3e9e9;
    border-radius: 4px;
    border-color: #cecc7f;
    box-shadow: 0 2px 8px rgba(140, 218, 161, 0.25);
    display: inline-block;
    margin-right: 10px;
  }
`;
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const socket = useSelector((state) => state.socket.socket);
  const roomList = useSelector((state) => state.socket.roomList);

  const [Cookies, setCookie, removeCookie] = useCookies();

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault(); //?????? ?????? ???????????? ??????????????? ?????? ?????? ??? ??????.
    // console.log('Email', Email);
    // console.log('Password', Password);
    // const expires = moment().add('100', 'm').toDate();
    // setCookie('coookeee', true, { expires });
    let body = {
      email: Email,
      password: Password,
    };
    dispatch(loginUser(body))
      //???????????????(?????????????????? ??????)
      //????????? ????????? '/home'??? ??????.
      .then((response) => {
        // ?????? ??? ?????? ????????????
        if (response.payload.loginSuccess) {
          socket.emit('userLogin', roomList[0], response.payload);
          navigate('/home');
          alert(`${Email}??? ????????? ????????? ?????? ????????????????`);
        } else {
          alert('???????????? ???????????? ????????? ??????????????????????');
        }
      });
  };
  const navigateToJoin = () => {
    navigate('/Join');
  };

  return (
    <>
      <Form onSubmit={onSubmitHandler}>
        <Div1>
          <h1>LOGIN</h1>
          <label style={{ fontSize: '1.3rem' }}>ID</label>
          <Input type="text" value={Email} onChange={onEmailHandler} />
          <label style={{ fontSize: '1.3rem', marginTop: '20px' }}>
            Password
          </label>
          <Input
            type="password"
            value={Password}
            onChange={onPasswordHandler}
          />
          <Div2>
            <button type="submit">?????????</button>
            <button onClick={navigateToJoin}>????????????</button>
          </Div2>
        </Div1>
      </Form>
    </>
  );
}
export default Auth(Login, null);
