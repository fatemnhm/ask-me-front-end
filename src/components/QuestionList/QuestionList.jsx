import { Link } from 'react-router-dom'
import styles from './Question.module.css';
import Icon from '../Icon/Icon';
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo';
import { Cpu, Heart, BookOpen, Globe, Users, Smile, Baby, Gamepad, Book, Dumbbell, Star, Briefcase } from 'lucide-react';


const categoryIcons = {
  'Technology': <Cpu color="#352CAB" />,
  'Health': <Heart color="#352CAB" />,
  'Education': <BookOpen color="#352CAB" />,
  'Travel': <Globe color="#352CAB" />,
  'Relationships': <Users color="#352CAB" />,
  'Lifestyle': <Smile color="#352CAB" />,
  'Parenting': <Baby color="#352CAB" />,
  'Gaming': <Gamepad color="#352CAB" />,
  'Books': <Book color="#352CAB" />,
  'Fitness': <Dumbbell color="#352CAB" />,
  'Beauty': <Star color="#352CAB" />,
  'Business': <Briefcase color="#352CAB" />
};



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
              {categoryIcons[question.category] }
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