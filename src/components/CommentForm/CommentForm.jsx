import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as questionService from '../../services/questionService'

const CommentForm = props => {
  const { questionId, commentId } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    text: '',
  })

  useEffect(() => {
    const fetchQuestion = async () => {
      const QuestionData = await questionService.show(questionId)
      const comment = questionData.comments.find(comment => comment._id === commentId)
      if (comment) {
        setFormData({ text: comment.text })
      }
    }
    if (questionId && commentId) fetchQuestion()
  }, [questionId, commentId])

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (questionId && commentId) {
      await questionService.updateComment(questionId, commentId, formData)
      navigate(`/questions/${questionId}`)
    } else {
      props.handleAddComment(formData)
    }
    setFormData({ text: '' })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your comment:</label>
      <textarea
        value={formData.text}
        name="text"
        id="text-input"
        required
        onChange={handleChange}
      ></textarea>
      <button type="submit">SUBMIT COMMENT</button>
    </form>
  )
}

export default CommentForm