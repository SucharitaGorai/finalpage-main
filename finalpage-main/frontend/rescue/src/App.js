import{ Navigate, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import YouTubeVideos from './pages/yy';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to="/login"/> } />
        <Route path='/login' element={<Login/> } />
        <Route path='/signup' element={<SignUp/> } />
        <Route path='/home' element={<Home/> } />
        <Route path='/youtube-videos' element={<YouTubeVideos />} />
      </Routes>
    </div>
  );
}

export default App;
