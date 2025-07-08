import { Routes, Route } from 'react-router-dom';
import Home from './index.jsx';
import Select from './Select.jsx';
import Roulette from './Roulette.jsx';
import Result from './Result.jsx';
import Detail from './Detail.jsx';
import Reason from './Reason.jsx';

export default function App() {
    return (
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/select' element={<Select />} />
          <Route path='/roulette' element={<Roulette />} />
          <Route path='/result' element={<Result />} />
          <Route path='/detail' element={<Detail />} />
          <Route path='/reason' element={<Reason />} />
        </Routes>
      </div>
    );
  }


