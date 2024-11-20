import { useState, createContext, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Landing from './components/Landing/Landing'
import Dashboard from './components/Dashboard/Dashboard'
import SignupForm from './components/SignupForm/SignupForm'
import SigninForm from './components/SigninForm/SigninForm'
import * as authService from '../src/services/authService' // import the authservice
import * as questionService from '../src/services/questionService'
import QuestionList from './components/QuestionList/QuestionList'
import QuestionDetails from './components/QuestionDetails/QuestionDetails'
import QuestionForm from './components/QuestionForm/QuestionForm'
import CommentForm from './components/CommentForm/CommentForm';


export const AuthedUserContext = createContext(null)

const App = () => {
  const [user, setUser] = useState(authService.getUser()) // using the method from authservice
  const [questions, setQuestions] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchAllQuestions = async () => {
      const questionsData = await questionService.index()
      setQuestions(questionsData)
      //console.log(questions)
    }
    if (user) fetchAllQuestions()
  }, [user])

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }

  const handleAddQuestion = async (questionFormData) => {
    const newQuestion = await questionService.createQuestion(questionFormData)
    setQuestions([newQuestion, ...questions])
    navigate('/questions')
  }

  const handleDeleteQuestion = async (questionId) => {
    const deletedQuestion = await questionService.deleteQuestion(questionId)
    setQuestions(questions.filter(question => question._id !== deletedQuestion._id))
    navigate('/questions')
  }

  const handleUpdateQuestion = async (questionId, questionFormData) => {
    const updatedQuestion = await questionService.updateQuestion(questionId, questionFormData)
    setQuestions(questions.map(question => (
      questionId === question._id ? updatedQuestion : question
    )))
    navigate(`/questions/${questionId}`)
  }

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
             <Route user={user} handleSignout={handleSignout} />
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/questions" element={<QuestionList questions={questions} />} />
              <Route path="/questions/:questionId" element={<QuestionDetails handleDeleteQuestion={handleDeleteQuestion} />} />
              <Route path="/questions/new" element={<QuestionForm handleAddQuestion={handleAddQuestion} />} />
              <Route path="/questions/:questionId/edit" element={<QuestionForm handleUpdateQuestion={handleUpdateQuestion} />} />
              <Route path="/questions/:questionsId/comments/new" element={<CommentForm />} />
              
              
            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  )
}

export default App