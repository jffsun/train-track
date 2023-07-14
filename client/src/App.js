import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Workout from './pages/Workout'
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Root path of application */}
        <Route path="/" element={<Home />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
      
  );
};

export default App;
