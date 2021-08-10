import Alert from 'react-bootstrap/Alert';


function AlertMessage(props) {
    let { info } = props;

    return (
        <>
            {info === null ? null : (<Alert variant={info.type}>{info.message}</Alert>)}
        </>
    );

}

export default AlertMessage;