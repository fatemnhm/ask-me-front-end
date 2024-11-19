const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/questions`


const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const show = async (questionId) => {
    try {
        const res = await fetch(`${BASE_URL}/${questionId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const createQuestion = async (questionFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionFormData)
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const createComment = async (questionId, commentFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${questionId}/comments`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentFormData)
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const deleteQuestion = async (questionId) => {
    try {
        const res = await fetch(`${BASE_URL}/${questionId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}
const update = async (questionId, questionFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${questionId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionFormData)
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const updateComment = async (questionId, commentId, commentFormData) => {
    try {
      const res = await fetch(`${BASE_URL}/${questionId}/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

const deleteComment = async (questionId, commentId) => {
    try {
        const res = await fetch(`${BASE_URL}/${questionId}/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export { index, show, createQuestion, createComment, deleteQuestion, updateQuestion, updateComment, deleteComment };