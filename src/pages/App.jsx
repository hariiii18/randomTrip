import { Routes, Route } from 'react-router-dom';
import Home from './index';
import Select from './Select';
import Roulette from './Roulette';
import Result from './Result';
import Detail from './Detail';
import Reason from './Reason';

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


