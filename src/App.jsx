import { Routes, Route } from 'react-router-dom';
import Home from './pages/index';
import Select from './pages/Select';
import Roulette from './pages/Roulette';
import Result from './pages/Result';
import Detail from './pages/Detail';
import Reason from './pages/Reason';

export default function App() {
    return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/select' element={<Select />} />
        <Route path='/roulette' element={<Roulette />} />
        <Route path='/result' element={<Result />} />
        <Route path='/detail' element={<Detail />} />
        <Route path='/reason' element={<Reason />} />
      </Routes>
    );
  }


