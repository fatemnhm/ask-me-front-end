import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as questionService from '../../services/questionService';
import styles from './QuestionForm.module.css';
const QuestionForm = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    category: 'Technology',
  });

  const { questionId } = useParams();

  useEffect(() => {
    const fetchQuestion = async () => {
      const questionData = await questionService.show(questionId);
      setFormData(questionData);
    };
    if (questionId) {
      fetchQuestion();
    } else {
      setFormData({
        title: '',
        text: '',
        category: 'Technology',
      });
    }
  }, [questionId]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (questionId) {
      props.handleUpdateQuestion(questionId, formData);
    } else {
      props. handleAddQuestion(formData);
    }
  };

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title-input">Title</label>
        <input
          type="text"
          required
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="text-input">Text</label>
        <textarea
          required
          name="text"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
        />
        <label htmlFor="category-input">Category</label>
        <select
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Travel">Travel</option>
          <option value="Relationships">Relationships</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Parenting">Parenting</option>
          <option value="Gaming">Gaming</option>
          <option value="Books">Books</option>
          <option value="Fitness">Fitness</option>
          <option value="Beauty">Beauty</option>
          <option value="Business">Business</option>
        </select>
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default QuestionForm;