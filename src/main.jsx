import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './pages/App.jsx';
import './index.css';

const container = document.getElementById('root');

// Reactアプリを表示したいDOM要素(<div id="root"></div>)を指定し、その中でReactが管理するルートを作る
// render()はエントリーポイントで使われる
ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);