
import { useState } from 'react';
import './App.css'
import { IQuiz } from './constant/Question';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EditQuiz from './pages/EditQuiz'
import CreateQuiz from './pages/CreateQuiz'
import EditQuestion from './pages/EditQuestion';

function App() {
  const [ newQuiz, setNewQuiz] = useState<IQuiz>();

  return (
      <div className="App">
         <Router>
      <Routes>
        <Route path="/" element={<Home  newQuiz={newQuiz}/>} />
        <Route path="/create" element={<CreateQuiz setNewQuiz={(quiz) => setNewQuiz(quiz)} />} />
        <Route path="/edit/:id" element={<EditQuiz/>} />
        <Route path="/edit/question/:id" element={<EditQuestion/>} />
      </Routes>
    </Router>
      </div>
  );
}

export default App
