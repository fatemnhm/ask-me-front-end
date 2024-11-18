import { Link } from 'react-router-dom'

const QuestionList = props => {
  return (
    <main>
      {props.questions.map(question => (
        <Link key={question._id} to={`/questions/${question._id}`}>
          <article>
            <header>
              <h2>{question.title}</h2>
              <p>
                {question.author.username} posted on{' '}
                {new Date(question.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{question.text}</p>
          </article>
        </Link>
      ))}
    </main>
  )
}

export default QuestionList