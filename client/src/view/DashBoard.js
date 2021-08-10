import { useContext, useEffect } from 'react';
import { PostContext } from '../contexts/PostContext';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { AuthContext } from '../contexts/AuthContext';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Col from 'react-bootstrap/Col';
import SinglePost from '../components/posts/SinglePost';
import AddPostModal from '../components/posts/AddPostModal';
import UpdatePostModal from '../components/posts/UpdatePostModal';
import addIcon from '../assets/plus-circle-fill.svg'

function DashBoard(props) {
    const {
        authState: {
            user: { username }
        }
    } = useContext(AuthContext)

    const { postState, getPosts, setShowAddPostModal, showToast, setShowToast } = useContext(PostContext);
    const { posts, postLoading } = postState
    const { show, message, type } = showToast
    useEffect(() => {
        getPosts()
    }, [])
    // console.log(postState)
    let body
    if (postLoading) {
        body = (
            <div className='d-flex justify-content-center mt-5'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    }
    else if (posts.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>Hi {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to LearnIt</Card.Title>
                        <Card.Text>
                            Click the button below to track your first skill to learn
                        </Card.Text>
                        <Button
                            variant='primary'
                            onClick={() => { setShowAddPostModal(true) }}
                        >
                            LearnIt!
                        </Button>
                    </Card.Body>
                </Card>
            </>
        )
    }
    else {
        body = (
            <>
                <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
                    {posts.map(post => (
                        <Col key={post._id} className='my-2'>
                            <SinglePost post={post} />
                        </Col>
                    ))}
                </Row>

                {/* Open Add Post Modal */}
                <OverlayTrigger
                    placement='left'
                    overlay={<Tooltip>Add a new thing to learn</Tooltip>}
                >
                    <Button
                        className='btn-floating'
                        onClick={() => { setShowAddPostModal(true) }}
                    >
                        <img src={addIcon} alt='add-post' width='60' height='60' />
                    </Button>
                </OverlayTrigger>
            </>
        )
    }

    return (
        <div>
            {body}
            <AddPostModal />
            <UpdatePostModal />
            {/* <ToastContainer position="top-end" className="p-3"> */}
            <Toast
                show={show}
                style={{
                    position: 'fixed',
                    top: '30px',
                    right: '55px'
                }}
                className={`bg-${type} text-white`}
                delay={3000}
                autohide={true}
                onClose={() => {
                    setShowToast({
                        show: false,
                        message: '',
                        type: ''
                    })
                }}
            >
                {/* <Toast.Header closeButton={false}>
                    <strong className="me-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                </Toast.Header> */}
                <Toast.Body>{message}</Toast.Body>
            </Toast>
            {/* </ToastContainer> */}
        </div>
    );
}

export default DashBoard;