import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import qusService from '../../services/qusService'
const QuestionForm = props => {
    const [formData, setFormData] = useState({
        title: '',
        text: '',
        category: '',
    })

const {questionId} = useParams();

useEffect(() => {
    const fetchQusetion = async() => {
        const questionData = await qusService.show(questionId)
        setFormData(questionData);
    }

    if (questionId){
        fetchQusetion()
    }else {
        setFormData({
            title: '',
        text: '',
        category: '',
        })
    }
},[questionId])

const handleChange = event => {
    event.preventDefault()
    if (questionId){
        props.handleUpdateQuestion(questionId, formData)
    } else {
        props.handleAddQuestion(forData)
    }
}





}