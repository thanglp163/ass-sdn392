import React, { useState } from 'react';
import { API_PUT } from '../service/Quiz';
import Header from '../components/Header';
import '../css/Quiz.css'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const EditQuiz: React.FC<{}> = () => {
    const { state } = useLocation();
    const { quiz } = state;
    const [ title, setTitle ] = useState<string>(quiz.title);
    const [ description, setDescription ] = useState<string>(quiz.description);
    const navigate = useNavigate();
    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        await API_PUT(`/quizzes/${quiz._id}`, { title, description });
        navigate('/');
    };
    return (
        <div className='container'>
            <Header/>
        <form onSubmit={handleSubmit}>
            <h2>Sửa Quiz</h2>
            <div className="mb-3 row">
    <label htmlFor="input-quiz" className="col-sm-2 col-form-label">Tiêu đề</label>
    <input
        className="form-control"
        type="text"
        placeholder="Tiêu đề"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        id="input-quiz"
    />
</div>
<div className="mb-3 row">
    <label htmlFor="text-area-quiz" className="col-sm-2 col-form-label">Mô tả</label>
    <textarea
        className="form-control"
        placeholder="Mô tả"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        id="text-area-quiz"
    />
</div>
<button className="btn btn-success" type="submit">Sửa Quiz</button>
        </form>
        </div>
    );
};
export default EditQuiz;