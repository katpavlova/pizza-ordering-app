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
import { register, userActions } from "../../store/user.slice";
import { RootState } from "@reduxjs/toolkit/query";

export type RegisterForm = {
    email: {
        value: string;
    },
    password: {
        value: string;
    },
	name: {
		value: string;
	}
}

export function Register() {
	const [error, setError] = useState<string | null>();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const {jwt, registerErrorMessage} = useSelector((s: RootState)=> s.user);

	useEffect(()=>{
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const submit = async (e:FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearRegisterError());
		const target = e.target as typeof e.target & RegisterForm;
		const { email, password, name}= target;
		dispatch(register({email: email.value, password: password.value, name: name.value}));
	};


	return <div>
		<Heading>Регистрация</Heading>
		{registerErrorMessage && <div>Вышла ошибочка: {registerErrorMessage}</div>}
		<form onSubmit={submit}>
			<div>
				<label htmlFor='email'>
                    Ваше имя
				</label>
				<Input id='name' name='name' />
			</div>
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
			<Button appearance="big">Зарегистрироваться</Button>
			<div>Уже есть аккаунт?</div>
			<div>
				<Link to='/auth/login'>Войти</Link>
			</div>
		</form>
	</div>;
}