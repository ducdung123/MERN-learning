import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

function Login(props) {

    //Context
    const { loginUser } = useContext(AuthContext)

    //Router
    const history = useHistory();

    //Local state
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const [alert, setAlert] = useState(null)

    const onChangeLoginForm = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            const loginData = await loginUser(loginForm)
            // console.log(loginData)
            if (loginData.success) {
                // console.log('access');
                // history.push("/dashboard")
            }
            else {
                setAlert(
                    {
                        type: 'danger',
                        message: loginData.message
                    }
                )
                setTimeout(()=>{
                    setAlert(null)
                },3000)
            }
        }
        catch (err) {
            console.log(err)
        }

    }

    return (
        <>
            <Form className='my-4' onSubmit={onLogin}>
                <AlertMessage info={alert}/>
                <Form.Group className='my-2'>
                    <Form.Control
                        type='text'
                        placeholder='Username'
                        name='username'
                        required
                        onChange={onChangeLoginForm}
                        value={loginForm.username}
                    />
                </Form.Group>
                <Form.Group className='my-2'>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name='password'
                        required
                        onChange={onChangeLoginForm}
                        value={loginForm.password}
                    />
                </Form.Group>
                <Button variant='success' type='submit'>
                    Login
                </Button>
            </Form>
            <p>
                Don't have an account?
                <Link to='/register'>
                    <Button variant='info' size='sm' className='ml-2'>
                        Register
                    </Button>
                </Link>
            </p>
        </>
    );
}

export default Login;