import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Select from './pages/Select';
import Roulette from './pages/Roulette';
import Result from './pages/Result';
import Detail from './pages/Detail';

function App() {
    return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/select' element={<Select />} />
        <Route path='/roulette' element={<Roulette />} />
        <Route path='/result' element={<Result />} />
        <Route path='/detail' element={<Detail />} />
      </Routes>
    );
  }
export default App;

