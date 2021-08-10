import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { PostContext } from '../../contexts/PostContext'
import { useContext } from 'react'

const ActionButtons = ({ post }) => {
	// console.log(post)
	const { _id, status, title, description, url } = post;
	const { showUpdatePostModal,
		setShowUpdatePostModal,
		deletePost } = useContext(
			PostContext
		)

	const handleChoosePost = () => {
		setShowUpdatePostModal({
			isDisplay: true,
			post: { _id, status, title, description, url },
		})
		// findPost(postId)
		// setShowUpdatePostModal(true)
	}
	const handleDeletePost = async() => {
		deletePost(_id)
	}
	return (
		<>
			<Button className='post-button' href={url} target='_blank'>
				<img src={playIcon} alt='play' width='32' height='32' />
			</Button>
			<Button className='post-button' onClick={handleChoosePost}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={handleDeletePost}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}

export default ActionButtons
