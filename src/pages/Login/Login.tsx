import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Heading from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";
import { FormEvent, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../../assets/helpers/api";
import { LoginResponce } from "../../assets/helpers/interfaces/auth.interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { login, userActions } from "../../store/user.slice";
import { RootState } from "@reduxjs/toolkit/query";

export type LoginForm = {
    email: {
        value: string;
    },
    password: {
        value: string;
    }
}

export function Login() {
	const [error, setError] = useState<string | null>();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const {jwt, loginErrorMessage} = useSelector((s: RootState)=> s.user);

	useEffect(()=>{
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const submit = async (e:FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearLoginError());
		const target = e.target as typeof e.target & LoginForm;
		const { email, password}= target;
		console.log(email.value, password.value);
		await sendLogin(email.value, password.value);
	};


	const sendLogin = async (email: string, password: string) => {
		dispatch(login({email, password}));

	};

	return <div >
		<Heading>Вход</Heading>
		{loginErrorMessage && <div>Вышла ошибочка: {loginErrorMessage}</div>}
		<form onSubmit={submit}>
			<div>
				<label htmlFor='email'>
                    Ваш email
				</label>
				<Input id='email' name='email' />
			</div>
			<div>
				<label htmlFor='password'>
                    Ваш пароль
				</label>
				<Input id='password' name='password' type="password"/>
			</div>
			<Button appearance="big">Вход</Button>
			<div>Нет аккаунта?</div>
			<div>
				<Link to='/auth/register'>Зарегистрироваться</Link>
			</div>
		</form>
	</div>;
}