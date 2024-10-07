import React, { useEffect, useState } from 'react';
import QuestionForm from '../components/QuestionForm';
import { IQuiz } from '../constant/Question';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../css/Question.css';
import { useNavigate } from 'react-router-dom';
import { API_DELETE } from '../service/Quiz';
const QuizDetail: React.FC<{q: IQuiz }> = ({ q }) => {
    const [ quiz, setQuizD ] = useState<IQuiz>(q);
    const deleteQues = async (quesId : string) => {
        try {
            await API_DELETE(`/quizzes/questions/${quesId}`);
            setQuizD({ ...quiz,  questions: quiz.questions.filter(question => question._id !== quesId)});
        } catch {
            alert('Error deleting quiz');
        }
    };
    useEffect(() => {
       setQuizD(q);
    }, [q]);
    const navigate = useNavigate();
    return (
        <div>
            <h2>{quiz.title}</h2>
            <p>{quiz.description}</p>
            <h3>Câu Hỏi</h3>
                {quiz.questions.map(question => (
                    <ul>

                        <li>{question.text}
                        <button className='ml-4' onClick={()=>{deleteQues(question._id)}}>
                        <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button className="btn btn-warning me-2" onClick={(e) => { e.stopPropagation(); navigate(`/edit/question/${question._id}`,{ state: { question } });}}>
                            <i className="bi bi-pencil"></i>
                        </button>
                        </li>
                        {question.options.map((option,index) =>(
                            <li key={index}>{option}</li>
                        ))}
                    </ul>
                ))}
            <QuestionForm quizId={quiz._id} setQuizD={(newQ) => { setQuizD({ ...quiz, questions: [...quiz.questions, newQ] })}} />
        </div>
    );
};

export default QuizDetail;
