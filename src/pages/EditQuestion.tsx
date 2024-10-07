/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react'
import { API_PUT } from '../service/Quiz';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const EditQuestion:React.FC<{}> = () => {
    const { state } = useLocation();
    const { question } = state;
    const [text, setText] = useState(question.text);
    const [options, setOptions] = useState(question.options);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState<string>(question.correctAnswerIndex);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await API_PUT(`/quizzes/question/${question._id}`, { text, options, correctAnswerIndex });
        navigate('/');
    };

    return (
        <div>
            <Header/>
        <form onSubmit={(e) => { handleSubmit(e); }}>
            <h2 className="text-center">Sửa Câu Hỏi</h2>
            <div className="mb-3 row">
            <label htmlFor="question" className="col-sm-2 col-form-label">Câu hỏi</label>
            <div className="col-sm-10">
                <input
                    id="question"
                    type="text"
                    className="form-control form-control-sm" 
                    placeholder="Câu hỏi"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                />
            </div>
        </div>

        {options.map((option: any, index:number) => (
            <div className="mb-3 row" key={index}>
                <label htmlFor={`option-${index}`} className="col-sm-2 col-form-label">{`Lựa chọn ${index + 1}`}</label>
                <div className="col-sm-10">
                    <input
                        id={`option-${index}`}
                        type="text"
                        className="form-control form-control-sm" 
                        placeholder={`Lựa chọn ${index + 1}`}
                        value={option}
                        onChange={e => {
                            const newOptions = [...options];
                            newOptions[index] = e.target.value;
                            setOptions(newOptions);
                        }}
                        required
                    />
                </div>
            </div>
        ))}

        <div className="mb-3 row">
            <label htmlFor="correct-answer-index" className="col-sm-2 col-form-label">Chỉ số câu trả lời đúng</label>
            <div className="col-sm-10">
                <input
                    id="correct-answer-index"
                    type="number"
                    className="form-control form-control-sm" 
                    min="0"
                    max={options.length - 1}
                    value={correctAnswerIndex}
                    onChange={e => setCorrectAnswerIndex(e.target.value)}
                    required
                    placeholder="Chỉ số câu trả lời đúng"
                />
            </div>
        </div>

        <button className="btn btn-primary w-100" type="submit">Sửa Câu Hỏi</button>
        </form>
        </div>
    );
};

export default EditQuestion;