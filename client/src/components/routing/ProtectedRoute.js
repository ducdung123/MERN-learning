import { Redirect, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner';
import NavbarMenu from '../layout/NavbarMenu'

function ProtectedRoute(props) {
    let { authState } = useContext(AuthContext)
    let { authLoading, isAuthenticated } = authState
    let { component, ...rest } = props;
    let Component = component
    // console.log('isAuthenticated =', isAuthenticated)
    if (authLoading) {
        return (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    }

    return (
        <Route
            {...rest}
            // component={component}
            render={(props) => {
                return isAuthenticated ?
                    (<>
                        <NavbarMenu />
                        <Component {...rest} {...props} />
                    </>) :
                    (<Redirect to="/login" />)
            }}
        />
    );
}

export default ProtectedRoute;