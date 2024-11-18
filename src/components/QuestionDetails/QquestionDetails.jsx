import { useParams, Link } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import * as questionService from '../../services/questionService'
import Loading from '../Loading/Loading'
import CommentForm from '../CommentForm/CommentForm'
import { AuthedUserContext } from '../../App'

const QuestionDetails = props => {
  const { questionId } = useParams()
  const user = useContext(AuthedUserContext)

  const [question, setQuestion] = useState(null)

  useEffect(() => {
    const fetchQuestion = async () => {
      const questionData = await questionService.show(questionId)
      setQuestion(questionData)
    }
    fetchQuestion()
  }, [questionId])

  const handleAddComment = async commentFormData => {
    const newComment = await questionService.createComment(questionId, commentFormData)
    setQuestion({ ...question, comments: [...question.comments, newComment] })
  }

  if (!question) return <Loading />

  return (
    <main>
      <header>
        <p>{question.category.toUpperCase()}</p>
        <h1>{question.title}</h1>
        <p>
          {question.author.username} posted on{' '}
          {new Date(question.createdAt).toLocaleDateString()}
        </p>
        {question.author._id === user._id && (
          <>
            <Link to={`/questions/${questionId}/edit`}>EDIT</Link>
            <button onClick={() => props.handleDeleteQuestion(questionId)}>
              DELETE
            </button>
          </>
        )}
      </header>
      <p>{question.text}</p>
      <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment} />
        {!question.comments.length && <p>There are no comments.</p>}
        {question.comments.map(comment => (
          <article key={comment._id}>
            <header>
              <p>
                {comment.author.username} posted on{' '}
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default QuestionDetails