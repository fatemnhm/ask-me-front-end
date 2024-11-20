import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as questionService from '../../services/questionService'

const ReplyForm = props => {
  const { questionId, commentId, replyId } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    text: '',
  })

  useEffect(() => {
    const fetchQuestion = async () => {
      const questionData = await questionService.show(questionId)
      
      const reply = questionData.comments.find(comment => comment._id === commentId)
                          .replies.find(reply => reply._id === replyId)
      if (reply) {
        setFormData({ text: reply.text })
      }
    }
    
    if (questionId && commentId) fetchQuestion()
  }, [questionId, commentId])

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (questionId && commentId && replyId) {
      await questionService.updateCommentReply(questionId, commentId, replyId, formData)
      navigate(`/questions/${questionId}`)
    } else {
      props.handleReplyComment(formData)
    }
    setFormData({ text: '' })
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={formData.text}
        name="text"
        id="text-input"
        required
        onChange={handleChange}
      ></textarea>
      <button type="submit">SUBMIT REPLY</button>
    </form>
  )
}

export default ReplyForm