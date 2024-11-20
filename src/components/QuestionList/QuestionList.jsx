import { Link } from 'react-router-dom'
import styles from './Question.module.css';
import Icon from '../Icon/Icon';
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo';
//import { Cpu } from 'lucide-react';


const QuestionList = (props) => {

  console.log(props);
  return (
    <main className={styles.container}>
      {props.questions.map((question) => (
        <Link key={question._id} to={`/questions/${question._id}`}>
          <article>
            <header>
              <div>
              <h2>{question.title}</h2>
              <Icon category={question.category} />
              </div>
              <AuthorInfo content={question} />
              
            </header>
            <p>{question.text}</p>
          </article>
        </Link>
      ))}
    </main>
  )
}

export default QuestionList