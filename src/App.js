import React from 'react';
import AppRouter from './router/AppRouter'
import alertify from 'alertifyjs'
import './App.scss'

function App() {
  alertify.set('notifier', 'position', 'top-left');
  return (
    <div className="main">
      <div className="main-container">
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
