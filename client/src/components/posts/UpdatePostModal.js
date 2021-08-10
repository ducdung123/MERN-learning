import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { PostContext } from '../../contexts/PostContext'

const UpdatePostModal = () => {
    // Contexts
    const {
        addPost,
        showUpdatePostModal,
        setShowUpdatePostModal,
        updatedPost,
        // setShowToast
    } = useContext(PostContext)

    const { isDisplay, post } = showUpdatePostModal;
    // console.log(showUpdatePostModal)
    // // State
    const [updatePost, setUpdatePost] = useState(
        // title: '',
        // description: '',
        // url: '',
        // status: 'TO LEARN'
        { ...post }
    )

    useEffect(() => {
        setUpdatePost({ ...post })
    }, [post])
    // console.log(updatePost)
    const { title, description, url, status, _id } = updatePost

    const onChangeNewPostForm = event =>
        setUpdatePost({ ...updatePost, [event.target.name]: event.target.value })

    const closeDialog = () => {
        setShowUpdatePostModal({
            isDisplay: false,
            post: null,
        })
        // setUpdatePost(null)
        // resetAddPostData()
    }

    const onSubmit = async event => {
        event.preventDefault()
        const data = await updatedPost(updatePost, _id)
        // console.log(data)
        closeDialog()
        // console.log(message, success)
        // resetAddPostData()
        // setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
    }

    // const resetAddPostData = () => {
    //     setUpdatePost({ title: '', description: '', url: '', status: 'TO LEARN' })
    //     setShowAddPostModal(false)
    // }

    return (
        <Modal show={isDisplay} animation={true} onHide={closeDialog}>
            <Modal.Header >
                <Modal.Title>Update your post</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>

                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type='text'
                            placeholder='Title'
                            name='title'
                            required
                            aria-describedby='title-help'
                            value={title}
                            onChange={onChangeNewPostForm}
                        />
                        <Form.Text id='title-help' muted>
                            Required
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            as='textarea'
                            rows={3}
                            placeholder='Description'
                            name='description'
                            value={description}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type='text'
                            placeholder='Youtube Tutorial URL'
                            name='url'
                            value={url}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>

                    <select class="form-select" value={status}
                        onChange={onChangeNewPostForm}
                        name='status'
                    >
                        <option value="LEARNED">LEARNED</option>
                        <option value="LEARNING">LEARNING</option>
                        <option value="TO LEARN">TO LEARN</option>
                    </select>


                </Modal.Body>
                {/* <Form.Select >
                        <option>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select> */}
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button variant='primary' type='submit'>
                        Update It!
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdatePostModal
