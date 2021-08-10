import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

function RegisterForm(props) {
	//Context
	const { registerUser } = useContext(AuthContext)

	//Local state
	const [registerForm, setRegisterForm] = useState({
		username: '',
		password: '',
		confirmPassword: '',
	})

	const [alert, setAlert] = useState(null)

	const onChangeRegisterForm = (e) => {
		setRegisterForm({
			...registerForm,
			[e.target.name]: e.target.value
		})
	}

	const onRegister = async (e) => {
		e.preventDefault();
		if (registerForm.password !== registerForm.confirmPassword) {
			setAlert(
				{
					type: 'danger',
					message: 'password must to match'
				}
			)
			setTimeout(() => {
				setAlert(null)
			}, 3000)
			return
		}
		try {
			const registerData = await registerUser(registerForm)
			//console.log(loginData)
			if (!registerData.success) {
				setAlert(
					{
						type: 'danger',
						message: registerData.message
					}
				)
				setTimeout(() => {
					setAlert(null)
				}, 3000)
			}
		}
		catch (err) {
			console.log(err)
		}

	}

	return (
		<>
			<Form className='my-4' onSubmit={onRegister}>
				<AlertMessage info={alert} />
				<Form.Group className='my-2'>
					<Form.Control
						type='text'
						placeholder='Username'
						name='username'
						required
						onChange={onChangeRegisterForm}
						value={registerForm.username}
					/>
				</Form.Group>
				<Form.Group className='my-2'>
					<Form.Control
						type='password'
						placeholder='Password'
						name='password'
						required
						onChange={onChangeRegisterForm}
						value={registerForm.password}
					/>
				</Form.Group>
				<Form.Group className='my-2'>
					<Form.Control
						type='password'
						placeholder='Confirm Password'
						name='confirmPassword'
						required
						onChange={onChangeRegisterForm}
						value={registerForm.confirmPassword}
					/>
				</Form.Group>
				<Button variant='success' type='submit'>
					Register
				</Button>
			</Form>
			<p>
				Already have an account?
				<Link to='/login'>
					<Button variant='info' size='sm' className='ml-2'>
						Login
					</Button>
				</Link>
			</p>
		</>
	);
}

export default RegisterForm;