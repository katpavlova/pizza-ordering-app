import styles from './Input.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';
import { forwardRef, isValidElement } from 'react';
import { InputProps } from './Input.props';

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({isValid = true, className, ...props},ref) {
	return (
		<input ref = {ref} 
			className= { cn(styles['input'], className, {
				[styles['invalid']]: isValid
			})} {...props} />
	);
});

export default Input;