import { useParams, Link } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import * as questionService from '../../services/questionService'
import Loading from '../Loading/Loading'
import CommentForm from '../CommentForm/CommentForm'
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo';
import { AuthedUserContext } from '../../App'
import styles from './QuestionDetails.module.css';
import Icon from '../Icon/Icon';

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

  const handleDeleteComment = async (commentId) => {
    await questionService.deleteComment(questionId, commentId);
    setQuestion({
      ...question,
      comments: question.comments.filter((comment) => comment._id !== commentId),
    });
  };
  if (!question) return <Loading />

  return (
    <main className={styles.container}>
      <section>
      <header>
        <p>{question.category.toUpperCase()}</p>
        <h1>{question.title}</h1>
        <p>
          {question.author.username} posted on{' '}
          {new Date(question.createdAt).toLocaleDateString()}
        </p>
        {question.author._id === user._id && (
          <>
          <div>
            <Link to={`/questions/${questionId}/edit`}>
            <Icon category="Edit" />
            </Link>
            <button onClick={() => props.handleDeleteQuestion(questionId)}>
            <Icon category="Trash" />
            </button>
          </div>
          </>
        )}
      </header>
      <p>{question.text}</p>
      </section>
      <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment} />
        {!question.comments.length && <p>There are no comments.</p>}
        {question.comments.map(comment => (
          <article key={comment._id}>
            <header>
              <div>
              <AuthorInfo content={comment} />
                {comment.author._id === user._id && (
                  <>
                    <Link to={`/questions/${questionId}/comments/${comment._id}/edit`}>
                      <Icon category="Edit" />
                    </Link>
                    <button onClick={() => handleDeleteComment(comment._id)}>
                      <Icon category="Trash" />
                    </button>
                  </>
                )}
              </div>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default QuestionDetails